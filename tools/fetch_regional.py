#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tools/fetch_regional.py
Descarga e integra 14 formas regionales emblemáticas en PokéSurvivor:
- Alolan Vulpix (11037) & Alolan Ninetales (11038)
- Alolan Sandshrew (11027) & Alolan Sandslash (11028)
- Alolan Raichu (11026)
- Galarian Ponyta (11077) & Galarian Rapidash (11078)
- Galarian Zigzagoon (11263) & Galarian Linoone (11264) -> Obstagoon (862)
- Hisuian Zorua (11570) & Hisuian Zoroark (11571)
- Hisuian Growlithe (11058) & Hisuian Arcanine (11059)
- Paldean Wooper (11194) -> Clodsire (980)

Actualiza:
1. assets/pokemon/<dex>/ (sprites de SpriteCollab con Shiny si está disponible)
2. js/data/sprites-meta.js
3. js/data/pokedex.js
4. js/data/evolutions.js
5. js/data/abilities.js
"""
import io
import json
import os
import re
import sys
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor
from PIL import Image

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

RAW = 'https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master'
BASE = RAW + '/sprite'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_ASSETS = os.path.join(ROOT, 'assets', 'pokemon')
OUT_META = os.path.join(ROOT, 'js', 'data', 'sprites-meta.js')
OUT_DEX = os.path.join(ROOT, 'js', 'data', 'pokedex.js')
OUT_EVO = os.path.join(ROOT, 'js', 'data', 'evolutions.js')
OUT_ABIL = os.path.join(ROOT, 'js', 'data', 'abilities.js')
CACHE = os.path.join(ROOT, 'tools', 'cache')

WANT = ['Idle', 'Walk', 'Attack', 'Shoot', 'Charge', 'Hurt', 'Faint']
FALLBACK = {
    'Idle': ['Walk'],
    'Walk': ['Idle'],
    'Attack': ['Strike', 'Swing', 'Shoot', 'Idle'],
    'Shoot': ['Attack', 'Strike', 'Idle'],
    'Charge': ['DeepBreath', 'Idle'],
    'Hurt': ['Cringe', 'Idle'],
    'Faint': ['Hurt', 'Idle'],
}
REQUIRED = {'Idle', 'Walk'}

# (dex, form_tag, sub_form, name, slug, gen, rarity, types, base_dex, evolves_to, evolve_level)
REGIONAL_DEFS = [
    (11037, "0037", "0001", "Alolan Vulpix", "vulpix-alola", 7, 3, ["ice"], 11037, 11038, 20),
    (11038, "0038", "0001", "Alolan Ninetales", "ninetales-alola", 7, 4, ["ice", "fairy"], 11037, None, None),
    (11027, "0027", "0001", "Alolan Sandshrew", "sandshrew-alola", 7, 3, ["ice", "steel"], 11027, 11028, 22),
    (11028, "0028", "0001", "Alolan Sandslash", "sandslash-alola", 7, 4, ["ice", "steel"], 11027, None, None),
    (11026, "0026", "0001", "Alolan Raichu", "raichu-alola", 7, 4, ["electric", "psychic"], 25, None, None),
    (11077, "0077", "0001", "Galarian Ponyta", "ponyta-galar", 8, 3, ["psychic"], 11077, 11078, 40),
    (11078, "0078", "0001", "Galarian Rapidash", "rapidash-galar", 8, 4, ["psychic", "fairy"], 11077, None, None),
    (11263, "0263", "0001", "Galarian Zigzagoon", "zigzagoon-galar", 8, 2, ["dark", "normal"], 11263, 11264, 20),
    (11264, "0264", "0001", "Galarian Linoone", "linoone-galar", 8, 3, ["dark", "normal"], 11263, 862, 35),
    (11570, "0570", "0001", "Hisuian Zorua", "zorua-hisui", 4, 4, ["normal", "ghost"], 11570, 11571, 30),
    (11571, "0571", "0001", "Hisuian Zoroark", "zoroark-hisui", 4, 5, ["normal", "ghost"], 11570, None, None),
    (11058, "0058", "0001", "Hisuian Growlithe", "growlithe-hisui", 4, 3, ["fire", "rock"], 11058, 11059, 25),
    (11059, "0059", "0001", "Hisuian Arcanine", "arcanine-hisui", 4, 5, ["fire", "rock"], 11058, None, None),
    (11194, "0194", "0002", "Paldean Wooper", "wooper-paldea", 9, 2, ["poison", "ground"], 11194, 980, 20),
]


def fetch(url, retries=3):
    last = None
    for _ in range(retries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'pokesurvivor/1.0'})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            last = e
        except Exception as e:
            last = e
    return None


def parse_animdata(xml):
    anims = {}
    for blk in re.findall(r'<Anim>(.*?)</Anim>', xml, re.S):
        name = re.search(r'<Name>(\w+)</Name>', blk)
        if not name:
            continue
        name = name.group(1)
        copy = re.search(r'<CopyOf>(\w+)</CopyOf>', blk)
        if copy:
            anims[name] = {'copyOf': copy.group(1)}
            continue
        fw = re.search(r'<FrameWidth>(\d+)</FrameWidth>', blk)
        fh = re.search(r'<FrameHeight>(\d+)</FrameHeight>', blk)
        if not (fw and fh):
            continue
        durs = [int(x) for x in re.findall(r'<Duration>(\d+)</Duration>', blk)]
        anims[name] = {'w': int(fw.group(1)), 'h': int(fh.group(1)), 'n': len(durs), 'd': durs}
    shadow = re.search(r'<ShadowSize>(\d+)</ShadowSize>', xml)
    return anims, int(shadow.group(1)) if shadow else 1


def resolve(anims, name, seen=None):
    seen = seen or set()
    if name not in anims or name in seen:
        return None, None
    seen.add(name)
    a = anims[name]
    if 'copyOf' in a:
        return resolve(anims, a['copyOf'], seen)
    return name, a


def ground_anchor(png, w, h):
    try:
        im = Image.open(io.BytesIO(png)).convert('RGBA')
    except Exception:
        return None
    px = im.crop((0, 0, w, h)).load()
    xs = ys = n = 0
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 40:
                xs += x
                ys += y
                n += 1
    return (round(xs / n, 1), round(ys / n, 1)) if n else None


def save_optimized(png, path):
    im = Image.open(io.BytesIO(png)).convert('RGBA')
    cols = im.getcolors(256)
    if cols is None:
        im.save(path, 'PNG', optimize=True)
        return im.size
    colors = [c for _, c in cols]
    colors.sort(key=lambda c: c[3])
    idx = {c: i for i, c in enumerate(colors)}
    pim = Image.new('P', im.size)
    data = im.get_flattened_data() if hasattr(im, 'get_flattened_data') else im.getdata()
    pim.putdata([idx[p] for p in data])
    flat = []
    for c in colors:
        flat += c[:3]
    pim.putpalette(flat + [0] * (768 - len(flat)))
    pim.save(path, 'PNG', optimize=True, transparency=bytes(c[3] for c in colors))
    return im.size


def download_set(url_base, out_dir, anims, geometry_from=None):
    os.makedirs(out_dir, exist_ok=True)
    meta = {}
    for want in WANT:
        src, geom = None, None
        for cand in [want] + FALLBACK[want]:
            src, geom = resolve(anims, cand)
            if geom:
                break
        if not geom:
            continue
        png = fetch(f'{url_base}/{src}-Anim.png')
        if not png:
            continue
        path = os.path.join(out_dir, want + '.png')
        w, h = save_optimized(png, path)
        cols, rows = w // geom['w'], h // geom['h']
        if rows < 1 or cols < 1:
            os.remove(path)
            continue

        ref = geometry_from.get(want) if geometry_from else None
        if ref and ref['w'] == geom['w'] and ref['h'] == geom['h']:
            ax, ay = ref['ax'], ref['ay']
        else:
            sh = fetch(f'{url_base}/{src}-Shadow.png')
            anchor = ground_anchor(sh, geom['w'], geom['h']) if sh else None
            ax, ay = (anchor if anchor else (geom['w'] / 2, geom['h'] * 0.78))
        meta[want] = {'w': geom['w'], 'h': geom['h'], 'n': min(geom['n'], cols), 'r': rows,
                      'd': geom['d'][:cols], 'ax': ax, 'ay': ay}
    return meta


def process_regional_sprite(item):
    dex, form_tag, sub_form, name = item[0], item[1], item[2], item[3]
    cache_file = os.path.join(CACHE, f'{dex}.json')
    out_dir = os.path.join(OUT_ASSETS, str(dex))

    if os.path.exists(cache_file):
        try:
            meta = json.load(open(cache_file, encoding='utf-8'))
            if all(os.path.exists(os.path.join(out_dir, a + '.png')) for a in meta['a']):
                print(f"  ✓ Cache hit {name} (dex {dex})")
                return dex, meta
        except Exception:
            pass

    url_normal = f'{BASE}/{form_tag}/{sub_form}'
    xml = fetch(f'{url_normal}/AnimData.xml')
    if not xml:
        print(f"  ! AnimData 404 for {name} ({url_normal})")
        return dex, None

    anims, shadow = parse_animdata(xml.decode('utf-8', 'replace'))
    normal = download_set(url_normal, out_dir, anims)
    if not REQUIRED & set(normal):
        print(f"  ! Missing required anims for {name}")
        return dex, None

    meta = {'s': shadow, 'a': normal}

    # Shiny subfolder (0001 dentro del sub_form)
    url_shiny = f'{url_normal}/0001'
    sxml = fetch(f'{url_shiny}/AnimData.xml')
    sanims = parse_animdata(sxml.decode('utf-8', 'replace'))[0] if sxml else anims
    shiny = download_set(url_shiny, os.path.join(out_dir, 's'), sanims, normal)
    if REQUIRED <= set(shiny) or ('Idle' in shiny and 'Walk' in shiny):
        meta['sh'] = 1
        diff = {k: v for k, v in shiny.items() if normal.get(k) != v}
        if diff:
            meta['sa'] = diff
        missing_s = [k for k in normal if k not in shiny]
        if missing_s:
            meta['sm'] = missing_s

    with open(cache_file, 'w', encoding='utf-8') as f:
        json.dump(meta, f, separators=(',', ':'))

    print(f"  ✓ Downloaded {name} -> assets/pokemon/{dex}")
    return dex, meta


def fetch_pokeapi_data(item):
    dex, form_tag, sub_form, name, slug, gen, rarity, def_types, base_dex, evo_to, evo_lvl = item
    url = f'https://pokeapi.co/api/v2/pokemon/{slug}'
    raw = fetch(url)
    if not raw:
        print(f"  ! PokeAPI 404 for {slug}, using defaults")
        return dex, None
    try:
        p = json.loads(raw.decode('utf-8'))
        base = {st['stat']['name']: st['base_stat'] for st in p['stats']}
        bst = sum(base.values())
        types = [t['type']['name'] for t in p['types']]
        abilities = [a['ability']['name'] for a in p['abilities']]

        hp = round(70 + base['hp'] * 0.45)
        spd = round(78 + base['speed'] * 0.42)
        atk = round(0.70 + max(base['attack'], base['special-attack']) / 100 * 0.55, 2)
        pa = round(0.70 + base['attack'] / 100 * 0.55, 2)
        sa = round(0.70 + base['special-attack'] / 100 * 0.55, 2)

        return dex, {
            'dex': dex,
            'name': name,
            'types': types,
            'hp': hp,
            'spd': spd,
            'atk': atk,
            'pa': pa,
            'sa': sa,
            'df': base['defense'],
            'sd': base['special-defense'],
            'rarity': rarity,
            'bst': bst,
            'starter': False,
            'gen': gen,
            'abilities': abilities[:3],
        }
    except Exception as e:
        print(f"  ! Error parsing {slug}: {e}")
        return dex, None


def main():
    os.makedirs(OUT_ASSETS, exist_ok=True)
    os.makedirs(CACHE, exist_ok=True)

    print("=== Tải Sprites & Dữ liệu Pokémon Vùng Miền ===")

    # 1. Tải sprites song song
    regional_metas = {}
    with ThreadPoolExecutor(max_workers=6) as ex:
        for dex, meta in ex.map(process_regional_sprite, REGIONAL_DEFS):
            if meta:
                regional_metas[dex] = meta

    # 2. Tải PokeAPI data song song
    regional_pokes = {}
    with ThreadPoolExecutor(max_workers=6) as ex:
        for dex, d in ex.map(fetch_pokeapi_data, REGIONAL_DEFS):
            if d:
                regional_pokes[dex] = d

    # 3. Cập nhật js/data/sprites-meta.js
    with open(OUT_META, 'r', encoding='utf-8') as f:
        meta_content = f.read()

    new_meta_lines = []
    for dex in sorted(regional_metas.keys()):
        if f"  {dex}:" not in meta_content and f"'{dex}':" not in meta_content and f'"{dex}":' not in meta_content:
            meta_json = json.dumps(regional_metas[dex], separators=(",", ":"))
            new_meta_lines.append(f"  {dex}: {meta_json},")

    if new_meta_lines:
        insert_idx = meta_content.rfind('};')
        if insert_idx != -1:
            meta_content = meta_content[:insert_idx] + '\n' + '\n'.join(new_meta_lines) + '\n' + meta_content[insert_idx:]
            with open(OUT_META, 'w', encoding='utf-8', newline='\n') as f:
                f.write(meta_content)
            print(f"✓ Đã bổ sung {len(new_meta_lines)} sprites vào {OUT_META}")

    # 4. Cập nhật js/data/pokedex.js
    with open(OUT_DEX, 'r', encoding='utf-8') as f:
        dex_content = f.read()

    new_poke_lines = []
    for item in REGIONAL_DEFS:
        dex = item[0]
        if f'"dex":{dex},' not in dex_content and f'"dex": {dex},' not in dex_content:
            d = regional_pokes.get(dex)
            if d:
                entry = {
                    "dex": d['dex'],
                    "name": d['name'],
                    "types": d['types'],
                    "hp": d['hp'],
                    "spd": d['spd'],
                    "atk": d['atk'],
                    "pa": d['pa'],
                    "sa": d['sa'],
                    "df": d['df'],
                    "sd": d['sd'],
                    "rarity": d['rarity'],
                    "bst": d['bst'],
                    "starter": False,
                    "gen": d['gen'],
                }
                new_poke_lines.append(f"  {json.dumps(entry, ensure_ascii=False)},")

    if new_poke_lines:
        insert_idx = dex_content.rfind('];')
        if insert_idx != -1:
            dex_content = dex_content[:insert_idx] + '\n'.join(new_poke_lines) + '\n' + dex_content[insert_idx:]
            with open(OUT_DEX, 'w', encoding='utf-8', newline='\n') as f:
                f.write(dex_content)
            print(f"✓ Đã bổ sung {len(new_poke_lines)} Pokémon vào {OUT_DEX}")

    # 5. Cập nhật js/data/abilities.js (G.DEX_ABIL)
    with open(OUT_ABIL, 'r', encoding='utf-8') as f:
        abil_content = f.read()

    new_abil_lines = []
    for item in REGIONAL_DEFS:
        dex = item[0]
        if f"  {dex}:" not in abil_content:
            d = regional_pokes.get(dex)
            abils = d['abilities'] if d else ['tackle']
            while len(abils) < 3:
                abils.append(0)
            new_abil_lines.append(f"  {dex}: {json.dumps(abils)},")

    if new_abil_lines:
        insert_idx = abil_content.rfind('};')
        if insert_idx != -1:
            abil_content = abil_content[:insert_idx] + '\n'.join(new_abil_lines) + '\n' + abil_content[insert_idx:]
            with open(OUT_ABIL, 'w', encoding='utf-8', newline='\n') as f:
                f.write(abil_content)
            print(f"✓ Đã bổ sung {len(new_abil_lines)} abilities vào {OUT_ABIL}")

    # 6. Cập nhật js/data/evolutions.js (G.EVO_CHAINS & G.EVO_BY_DEX)
    with open(OUT_EVO, 'r', encoding='utf-8') as f:
        evo_content = f.read()

    # Chuỗi tiến hóa vùng miền
    # Chuỗi Alolan Vulpix (11037 -> 11038)
    evo_entries_by_dex = {
        11037: {"chainId": 11015, "baseDex": 11037, "stage": 1, "type": "2stage", "maxStage": 2, "next": [11038], "prev": None},
        11038: {"chainId": 11015, "baseDex": 11037, "stage": 2, "type": "2stage", "maxStage": 2, "next": [], "prev": 11037},
        11027: {"chainId": 11011, "baseDex": 11027, "stage": 1, "type": "2stage", "maxStage": 2, "next": [11028], "prev": None},
        11028: {"chainId": 11011, "baseDex": 11027, "stage": 2, "type": "2stage", "maxStage": 2, "next": [], "prev": 11027},
        11026: {"chainId": 10, "baseDex": 25, "stage": 2, "type": "branch", "maxStage": 2, "next": [], "prev": 25},
        11077: {"chainId": 11033, "baseDex": 11077, "stage": 1, "type": "2stage", "maxStage": 2, "next": [11078], "prev": None},
        11078: {"chainId": 11033, "baseDex": 11077, "stage": 2, "type": "2stage", "maxStage": 2, "next": [], "prev": 11077},
        11263: {"chainId": 11135, "baseDex": 11263, "stage": 1, "type": "3stage", "maxStage": 3, "next": [11264], "prev": None},
        11264: {"chainId": 11135, "baseDex": 11263, "stage": 2, "type": "3stage", "maxStage": 3, "next": [862], "prev": 11263},
        11570: {"chainId": 11295, "baseDex": 11570, "stage": 1, "type": "2stage", "maxStage": 2, "next": [11571], "prev": None},
        11571: {"chainId": 11295, "baseDex": 11570, "stage": 2, "type": "2stage", "maxStage": 2, "next": [], "prev": 11570},
        11058: {"chainId": 11024, "baseDex": 11058, "stage": 1, "type": "2stage", "maxStage": 2, "next": [11059], "prev": None},
        11059: {"chainId": 11024, "baseDex": 11058, "stage": 2, "type": "2stage", "maxStage": 2, "next": [], "prev": 11058},
        11194: {"chainId": 11097, "baseDex": 11194, "stage": 1, "type": "2stage", "maxStage": 2, "next": [980], "prev": None},
    }

    evo_chains_new = {
        "11015": {"chainId": 11015, "baseDex": 11037, "name": "Alolan Vulpix", "type": "2stage", "maxStage": 2, "maxBst": 505, "baseRarity": 3, "stages": [[11037], [11038]], "members": [11037, 11038]},
        "11011": {"chainId": 11011, "baseDex": 11027, "name": "Alolan Sandshrew", "type": "2stage", "maxStage": 2, "maxBst": 450, "baseRarity": 3, "stages": [[11027], [11028]], "members": [11027, 11028]},
        "11033": {"chainId": 11033, "baseDex": 11077, "name": "Galarian Ponyta", "type": "2stage", "maxStage": 2, "maxBst": 500, "baseRarity": 3, "stages": [[11077], [11078]], "members": [11077, 11078]},
        "11135": {"chainId": 11135, "baseDex": 11263, "name": "Galarian Zigzagoon", "type": "3stage", "maxStage": 3, "maxBst": 520, "baseRarity": 2, "stages": [[11263], [11264], [862]], "members": [11263, 11264, 862]},
        "11295": {"chainId": 11295, "baseDex": 11570, "name": "Hisuian Zorua", "type": "2stage", "maxStage": 2, "maxBst": 510, "baseRarity": 4, "stages": [[11570], [11571]], "members": [11570, 11571]},
        "11024": {"chainId": 11024, "baseDex": 11058, "name": "Hisuian Growlithe", "type": "2stage", "maxStage": 2, "maxBst": 555, "baseRarity": 3, "stages": [[11058], [11059]], "members": [11058, 11059]},
        "11097": {"chainId": 11097, "baseDex": 11194, "name": "Paldean Wooper", "type": "2stage", "maxStage": 2, "maxBst": 430, "baseRarity": 2, "stages": [[11194], [980]], "members": [11194, 980]},
    }

    # Thêm vào G.EVO_BY_DEX
    new_by_dex_lines = []
    for dex, obj in evo_entries_by_dex.items():
        if f'  "{dex}":' not in evo_content and f"  {dex}:" not in evo_content:
            new_by_dex_lines.append(f'  "{dex}": {json.dumps(obj, separators=(",", ":"))},')

    # Thêm vào G.EVO_CHAINS
    new_chains_lines = []
    for cid, obj in evo_chains_new.items():
        if f'  "{cid}":' not in evo_content:
            new_chains_lines.append(f'  "{cid}": {json.dumps(obj, indent=2)},')

    if new_by_dex_lines:
        idx_by_dex = evo_content.find('G.EVO_BY_DEX = {')
        if idx_by_dex != -1:
            closing_brace = evo_content.rfind('};')
            evo_content = evo_content[:closing_brace] + '\n' + '\n'.join(new_by_dex_lines) + '\n' + evo_content[closing_brace:]

    if new_chains_lines:
        idx_chains = evo_content.find('G.EVO_CHAINS = {')
        if idx_chains != -1:
            brace_pos = idx_chains + len('G.EVO_CHAINS = {\n')
            evo_content = evo_content[:brace_pos] + '\n'.join(new_chains_lines) + '\n' + evo_content[brace_pos:]

    with open(OUT_EVO, 'w', encoding='utf-8', newline='\n') as f:
        f.write(evo_content)
    print(f"✓ Đã bổ sung chuỗi tiến hóa vào {OUT_EVO}")

    print("\nHoàn tất tích hợp Pokémon vùng miền thành công!")


if __name__ == '__main__':
    main()
