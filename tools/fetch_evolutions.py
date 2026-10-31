#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Tải dữ liệu chuỗi tiến hóa từ PokeAPI cho tất cả 540 evolution chains và
tạo file js/data/evolutions.js phục vụ Gacha, Bộ sưu tập và Tiến hóa in-run.
"""
import json
import os
import re
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE_DIR = os.path.join(ROOT, 'tools', 'cache', 'evo')
POKEDEX_JS = os.path.join(ROOT, 'js', 'data', 'pokedex.js')
OUT_JS = os.path.join(ROOT, 'js', 'data', 'evolutions.js')

os.makedirs(CACHE_DIR, exist_ok=True)


def parse_pokedex():
    """Đọc pokedex.js để lấy danh sách Pokémon hiện có trong game."""
    with open(POKEDEX_JS, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    dex_map = {}
    for line in lines:
        line = line.strip()
        if line.startswith('{"dex":'):
            if line.endswith(','):
                line = line[:-1]
            try:
                p = json.loads(line)
                dex_map[p['dex']] = p
            except Exception:
                pass
    return dex_map


def fetch_chain(cid):
    path = os.path.join(CACHE_DIR, f'{cid}.json')
    if os.path.exists(path):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    url = f'https://pokeapi.co/api/v2/evolution-chain/{cid}/'
    req = urllib.request.Request(url, headers={'User-Agent': 'pokesurvivor/1.0'})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=15) as res:
                data = json.load(res)
                with open(path, 'w', encoding='utf-8') as f:
                    json.dump(data, f)
                return data
        except Exception:
            pass
    return None


def get_dex_from_url(url):
    m = re.search(r'/pokemon-species/(\d+)/', url)
    return int(m.group(1)) if m else None


STARTER_DEX = {
    1, 4, 7, 152, 155, 158, 252, 255, 258,
    387, 390, 393, 495, 498, 501, 650, 653, 656,
    722, 725, 728, 810, 813, 816, 906, 909, 912
}

PSEUDO_DEX = {
    147, 246, 371, 374, 443, 633, 704, 782, 885, 996
}

def calc_rarity(dex, base_bst, max_bst, is_legendary=False):
    if is_legendary:
        return 5
    if dex in PSEUDO_DEX or max_bst >= 600:
        return 4
    if dex in STARTER_DEX:
        return 3
    if base_bst <= 275 and max_bst < 510:
        return 1
    if max_bst >= 535:
        return 4
    if max_bst >= 495:
        return 3
    if max_bst >= 450:
        return 2
    return 1


def main():
    print("Đang đọc pokedex.js...")
    dex_by_id = parse_pokedex()
    print(f"Đã đọc {len(dex_by_id)} Pokémon từ G.DEX.")

    print("Đang tải/đọc 540 chuỗi tiến hóa từ PokeAPI...")
    with ThreadPoolExecutor(max_workers=20) as ex:
        all_chains = list(ex.map(fetch_chain, range(1, 541)))

    chains = {}
    evo_by_dex = {}

    for cid, data in enumerate(all_chains, 1):
        if not data or 'chain' not in data:
            continue
        c = data['chain']
        root_dex = get_dex_from_url(c['species']['url'])
        if not root_dex:
            continue

        stage1 = [root_dex]
        stage2 = []
        stage3 = []

        is_branching = False

        # Parse Stage 2
        for s2_node in c.get('evolves_to', []):
            d2 = get_dex_from_url(s2_node['species']['url'])
            if d2:
                stage2.append(d2)
                # Parse Stage 3
                for s3_node in s2_node.get('evolves_to', []):
                    d3 = get_dex_from_url(s3_node['species']['url'])
                    if d3:
                        stage3.append(d3)

        if len(stage2) > 1 or len(stage3) > len(stage2):
            is_branching = True

        all_members = stage1 + stage2 + stage3
        # Lọc chỉ những con có trong game
        present_members = [d for d in all_members if d in dex_by_id]
        if not present_members:
            continue

        max_stage = 3 if stage3 else (2 if stage2 else 1)
        if is_branching:
            chain_type = 'branch'
        elif max_stage == 3:
            chain_type = '3stage'
        elif max_stage == 2:
            chain_type = '2stage'
        else:
            chain_type = 'single'

        # Tính maxBST của cả dòng để quyết định rarity gacha cho Bậc 1
        max_bst = max(dex_by_id[d].get('bst', 300) for d in present_members)
        is_leg = any(dex_by_id[d].get('leg', False) for d in present_members)
        root_bst = dex_by_id.get(root_dex, {}).get('bst', 300)
        base_rarity = calc_rarity(root_dex, root_bst, max_bst, is_leg)

        root_name = dex_by_id.get(root_dex, {}).get('name', c['species']['name'].capitalize())

        chain_obj = {
            'chainId': cid,
            'baseDex': root_dex,
            'name': root_name,
            'type': chain_type,
            'maxStage': max_stage,
            'maxBst': max_bst,
            'baseRarity': base_rarity,
            'stages': [stage1, stage2, stage3],
            'members': all_members
        }
        chains[root_dex] = chain_obj

        # Map từng Pokémon vào evo_by_dex
        for d in stage1:
            evo_by_dex[d] = {
                'chainId': cid,
                'baseDex': root_dex,
                'stage': 1,
                'type': chain_type,
                'maxStage': max_stage,
                'next': stage2,
                'prev': None
            }
        for s2_node in c.get('evolves_to', []):
            d2 = get_dex_from_url(s2_node['species']['url'])
            if not d2:
                continue
            s3_next = [get_dex_from_url(n['species']['url']) for n in s2_node.get('evolves_to', []) if get_dex_from_url(n['species']['url'])]
            evo_by_dex[d2] = {
                'chainId': cid,
                'baseDex': root_dex,
                'stage': 2,
                'type': chain_type,
                'maxStage': max_stage,
                'next': s3_next,
                'prev': root_dex
            }
            for d3 in s3_next:
                evo_by_dex[d3] = {
                    'chainId': cid,
                    'baseDex': root_dex,
                    'stage': 3,
                    'type': chain_type,
                    'maxStage': max_stage,
                    'next': [],
                    'prev': d2
                }

    # Đối với bất kỳ Pokémon nào có trong G.DEX mà không thuộc 540 chain trên, tạo single chain
    single_cid = 1000
    for dex, p in dex_by_id.items():
        if dex not in evo_by_dex:
            single_cid += 1
            chain_obj = {
                'chainId': single_cid,
                'baseDex': dex,
                'name': p['name'],
                'type': 'single',
                'maxStage': 1,
                'maxBst': p.get('bst', 300),
                'baseRarity': calc_rarity(dex, p.get('bst', 300), p.get('bst', 300), p.get('leg', False)),
                'stages': [[dex], [], []],
                'members': [dex]
            }
            chains[dex] = chain_obj
            evo_by_dex[dex] = {
                'chainId': single_cid,
                'baseDex': dex,
                'stage': 1,
                'type': 'single',
                'maxStage': 1,
                'next': [],
                'prev': None
            }

    print(f"Tổng số chuỗi tiến hóa: {len(chains)}")
    print(f"Tổng số Pokémon được định danh tiến hóa: {len(evo_by_dex)}")

    # Ghi ra js/data/evolutions.js
    header = """/* ============ evolutions.js — Dữ liệu chuỗi tiến hóa Pokémon ============
 * Sinh tự động từ tools/fetch_evolutions.py dựa trên dữ liệu chính thức PokeAPI.
 * Chứa chuỗi tiến hóa, phân loại (3-stage, 2-stage, single, branch), và
 * độ hiếm Gacha cập nhật theo BST cao nhất của dòng.
 */
"""
    js_content = header + f"G.EVO_CHAINS = {json.dumps(chains, ensure_ascii=False, indent=2)};\n\n"
    js_content += f"G.EVO_BY_DEX = {json.dumps(evo_by_dex, ensure_ascii=False, indent=2)};\n"

    helpers = """
G.getEvoChain = function(dex) {
  if (!G.EVO_BY_DEX) return null;
  const info = G.EVO_BY_DEX[dex];
  if (!info) return null;
  return G.EVO_CHAINS[info.baseDex] || null;
};

G.getEvoInfo = function(dex) {
  return (G.EVO_BY_DEX && G.EVO_BY_DEX[dex]) || null;
};

G.getBaseDex = function(dex) {
  const info = G.getEvoInfo(dex);
  return info ? info.baseDex : dex;
};

G.getStage = function(dex) {
  const info = G.getEvoInfo(dex);
  return info ? info.stage : 1;
};

G.isBaseStage = function(dex) {
  const info = G.getEvoInfo(dex);
  return !info || info.stage === 1;
};
"""
    js_content += helpers


    with open(OUT_JS, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"Đã tạo thành công {OUT_JS}!")


if __name__ == '__main__':
    main()
