#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Descarga sprites de Mega Evoluciones y Primal Reversions desde SpriteCollab
y genera js/data/megas.js y actualiza de forma segura js/data/sprites-meta.js.

No toca ni altera los sprites de los 966 Pokémon estándar (1-1025).
"""
import io
import json
import os
import re
import sys
import shutil
import urllib.error
import urllib.request
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
OUT_MEGAS = os.path.join(ROOT, 'js', 'data', 'megas.js')
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
REQUIRED = {'Idle', 'Walk', 'Attack'}

# Mapeo de Megas que tienen sprites en SpriteCollab
# (pokeapi_id, base_dex, name, slug, form_tag, sub_form, has_pmd_sprite)
SPRITE_MEGAS = [
    (10034, 6, "Mega Charizard X", "charizard-mega-x", "0006", "0001"),
    (10037, 65, "Mega Alakazam", "alakazam-mega", "0065", "0001"),
    (10071, 80, "Mega Slowbro", "slowbro-mega", "0080", "0002"),
    (10038, 94, "Mega Gengar", "gengar-mega", "0094", "0001"),
    (10039, 115, "Mega Kangaskhan", "kangaskhan-mega", "0115", "0001"),
    (10042, 142, "Mega Aerodactyl", "aerodactyl-mega", "0142", "0001"),
    (10044, 150, "Mega Mewtwo Y", "mewtwo-mega-y", "0150", "0002"),
    (10072, 208, "Mega Steelix", "steelix-mega", "0208", "0001"),
    (10049, 229, "Mega Houndoom", "houndoom-mega", "0229", "0001"),
    (10050, 248, "Mega Tyranitar", "tyranitar-mega", "0248", "0001"),
    (10054, 282, "Mega Gardevoir", "gardevoir-mega", "0282", "0001"),
    (10055, 302, "Mega Sableye", "sableye-mega", "0302", "0001"),
    (10056, 303, "Mega Mawile", "mawile-mega", "0303", "0001"),
    (10058, 308, "Mega Medicham", "medicham-mega", "0308", "0001"),
    (10059, 310, "Mega Manectric", "manectric-mega", "0310", "0001"),
    (10060, 319, "Mega Sharpedo", "sharpedo-mega", "0319", "0001"),
    (10061, 323, "Mega Camerupt", "camerupt-mega", "0323", "0001"),
    (10062, 334, "Mega Altaria", "altaria-mega", "0334", "0001"),
    (10063, 354, "Mega Banette", "banette-mega", "0354", "0001"),
    (10064, 359, "Mega Absol", "absol-mega", "0359", "0001"),
    (10065, 362, "Mega Glalie", "glalie-mega", "0362", "0001"),
    (10068, 380, "Mega Latias", "latias-mega", "0380", "0001"),
    (10069, 381, "Mega Latios", "latios-mega", "0381", "0001"),
    (10077, 382, "Primal Kyogre", "kyogre-primal", "0382", "0001"),
    (10078, 383, "Primal Groudon", "groudon-primal", "0383", "0001"),
    (10079, 384, "Mega Rayquaza", "rayquaza-mega", "0384", "0001"),
    (10087, 428, "Mega Lopunny", "lopunny-mega", "0428", "0001"),
    (10089, 448, "Mega Lucario", "lucario-mega", "0448", "0001"),
    (10091, 475, "Mega Gallade", "gallade-mega", "0475", "0001"),
    (10075, 719, "Mega Diancie", "diancie-mega", "0719", "0001"),
]

# Megas canónicas sin sprite dedicado en PMD (usan sprite base con aura Mega brillante)
FALLBACK_MEGAS = [
    (10033, 3, "Mega Venusaur", "venusaur-mega", ["grass", "poison"], "thick-fat", 80, 82, 123, 100, 122, 80),
    (10035, 6, "Mega Charizard Y", "charizard-mega-y", ["fire", "flying"], "drought", 78, 104, 78, 159, 115, 100),
    (10036, 9, "Mega Blastoise", "blastoise-mega", ["water"], "mega-launcher", 79, 103, 120, 135, 115, 78),
    (10040, 127, "Mega Pinsir", "pinsir-mega", ["bug", "flying"], "aerilate", 65, 155, 120, 65, 90, 105),
    (10041, 130, "Mega Gyarados", "gyarados-mega", ["water", "dark"], "mold-breaker", 95, 155, 109, 70, 130, 81),
    (10043, 150, "Mega Mewtwo X", "mewtwo-mega-x", ["psychic", "fighting"], "steadfast", 106, 190, 100, 154, 100, 130),
    (10045, 181, "Mega Ampharos", "ampharos-mega", ["electric", "dragon"], "mold-breaker", 90, 95, 105, 165, 110, 45),
    (10046, 212, "Mega Scizor", "scizor-mega", ["bug", "steel"], "technician", 70, 150, 140, 65, 100, 75),
    (10047, 214, "Mega Heracross", "heracross-mega", ["bug", "fighting"], "skill-link", 80, 185, 115, 40, 105, 75),
    (10051, 254, "Mega Sceptile", "sceptile-mega", ["grass", "dragon"], "lightning-rod", 70, 110, 75, 145, 85, 145),
    (10052, 257, "Mega Blaziken", "blaziken-mega", ["fire", "fighting"], "speed-boost", 80, 160, 80, 130, 80, 100),
    (10053, 260, "Mega Swampert", "swampert-mega", ["water", "ground"], "swift-swim", 100, 150, 110, 95, 110, 70),
    (10057, 306, "Mega Aggron", "aggron-mega", ["steel"], "filter", 70, 140, 230, 60, 80, 50),
    (10066, 373, "Mega Salamence", "salamence-mega", ["dragon", "flying"], "aerilate", 95, 145, 130, 120, 90, 120),
    (10067, 376, "Mega Metagross", "metagross-mega", ["steel", "psychic"], "tough-claws", 80, 145, 150, 105, 110, 110),
    (10088, 445, "Mega Garchomp", "garchomp-mega", ["dragon", "ground"], "sand-force", 108, 170, 115, 120, 95, 92),
    (10090, 460, "Mega Abomasnow", "abomasnow-mega", ["grass", "ice"], "snow-warning", 90, 132, 105, 132, 105, 30),
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


def process_mega(item):
    mega_id, base_dex, name, slug, form_tag, sub_form = item
    cache_file = os.path.join(CACHE, f'{mega_id}.json')
    out_dir = os.path.join(OUT_ASSETS, str(mega_id))

    if os.path.exists(cache_file):
        try:
            meta = json.load(open(cache_file, encoding='utf-8'))
            if all(os.path.exists(os.path.join(out_dir, a + '.png')) for a in meta['a']):
                return mega_id, meta
        except Exception:
            pass

    url_normal = f'{BASE}/{form_tag}/{sub_form}'
    xml = fetch(f'{url_normal}/AnimData.xml')
    if not xml:
        print(f"  ! AnimData 404 for {name} ({url_normal})")
        return mega_id, None

    anims, shadow = parse_animdata(xml.decode('utf-8', 'replace'))
    normal = download_set(url_normal, out_dir, anims)
    if not REQUIRED & set(normal):
        print(f"  ! Missing required anims for {name}")
        return mega_id, None

    meta = {'s': shadow, 'a': normal}

    # Shiny subfolder
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

    print(f"  ✓ Downloaded {name} -> assets/pokemon/{mega_id}")
    return mega_id, meta


def fetch_pokeapi_mega(mega_id, base_dex, name, slug):
    url = f'https://pokeapi.co/api/v2/pokemon/{mega_id}'
    raw = fetch(url)
    if not raw:
        return None
    try:
        p = json.loads(raw.decode('utf-8'))
        base = {st['stat']['name']: st['base_stat'] for st in p['stats']}
        bst = sum(base.values())
        types = [t['type']['name'] for t in p['types']]
        abilities = [a['ability']['name'] for a in p['abilities']]
        ability = abilities[0] if abilities else 'tough-claws'

        # Derived stats matching pokesurvivor formula
        hp = round(70 + base['hp'] * 0.45)
        spd = round(78 + base['speed'] * 0.42)
        atk = round(0.70 + max(base['attack'], base['special-attack']) / 100 * 0.55, 2)
        pa = round(0.70 + base['attack'] / 100 * 0.55, 2)
        sa = round(0.70 + base['special-attack'] / 100 * 0.55, 2)

        return {
            'id': mega_id,
            'baseDex': base_dex,
            'name': name,
            'slug': slug,
            'types': types,
            'ability': ability,
            'hp': hp,
            'spd': spd,
            'atk': atk,
            'pa': pa,
            'sa': sa,
            'df': base['defense'],
            'sd': base['special-defense'],
            'bst': bst,
            'spriteDex': mega_id,
        }
    except Exception as e:
        print(f"  ! PokeAPI error for {slug}: {e}")
        return None


def main():
    os.makedirs(OUT_ASSETS, exist_ok=True)
    os.makedirs(CACHE, exist_ok=True)

    print("=== GIAI ĐOẠN 1: Tải Sprites & Dữ liệu Mega Evolution ===")

    # 1. Sao lưu sprites-meta.js
    backup_file = os.path.join(ROOT, 'js', 'data', 'sprites-meta.backup.js')
    if os.path.exists(OUT_META) and not os.path.exists(backup_file):
        shutil.copy2(OUT_META, backup_file)
        print(f"✓ Đã sao lưu an toàn: {backup_file}")

    # 2. Tải các sprite Mega từ SpriteCollab
    mega_metas = {}
    print(f"Đang tải {len(SPRITE_MEGAS)} dạng Mega có sprite PMD...")
    with ThreadPoolExecutor(max_workers=8) as ex:
        for mid, meta in ex.map(process_mega, SPRITE_MEGAS):
            if meta:
                mega_metas[mid] = meta

    # 3. Tải thông số PokeAPI cho tất cả các dạng Mega
    print("Đang nạp thông số PokeAPI cho các dạng Mega...")
    mega_data_dict = {}

    def get_data(item):
        mid, b_dex, name, slug = item[0], item[1], item[2], item[3]
        d = fetch_pokeapi_mega(mid, b_dex, name, slug)
        return mid, d

    with ThreadPoolExecutor(max_workers=8) as ex:
        for mid, d in ex.map(get_data, SPRITE_MEGAS):
            if d:
                # Nếu sprite tải thành công thì spriteDex = mid, ngược lại dùng fallback
                d['spriteDex'] = mid if mid in mega_metas else d['baseDex']
                mega_data_dict[mid] = d

    # Thêm các Fallback Megas (Venusaur, Blastoise, Scizor, Swampert, Sceptile, Metagross...)
    for (mid, bd, name, slug, types, abil, hp_b, atk_b, def_b, spa_b, spd_b, spe_b) in FALLBACK_MEGAS:
        bst = hp_b + atk_b + def_b + spa_b + spd_b + spe_b
        hp = round(70 + hp_b * 0.45)
        spd = round(78 + spe_b * 0.42)
        atk = round(0.70 + max(atk_b, spa_b) / 100 * 0.55, 2)
        pa = round(0.70 + atk_b / 100 * 0.55, 2)
        sa = round(0.70 + spa_b / 100 * 0.55, 2)
        mega_data_dict[mid] = {
            'id': mid,
            'baseDex': bd,
            'name': name,
            'slug': slug,
            'types': types,
            'ability': abil,
            'hp': hp,
            'spd': spd,
            'atk': atk,
            'pa': pa,
            'sa': sa,
            'df': def_b,
            'sd': spd_b,
            'bst': bst,
            'spriteDex': bd,  # Fallback sang sprite loài gốc
        }

    # 4. Tạo file js/data/megas.js
    megas_by_base = {}
    for mid, m in mega_data_dict.items():
        bd = m['baseDex']
        megas_by_base.setdefault(bd, []).append(mid)

    lines_megas = [
        "/* ============ megas.js — Mega Evolutions & Primal Reversions ============ */",
        "/* Dữ liệu các hình thái Mega Evolution và Primal Reversion trong PokéSurvivor */",
        "G.MEGAS = " + json.dumps(mega_data_dict, ensure_ascii=False, indent=2) + ";",
        "",
        "G.MEGAS_BY_BASE = " + json.dumps(megas_by_base, ensure_ascii=False, indent=2) + ";",
        "",
        "G.getMegasFor = function(dex) {",
        "  const ids = G.MEGAS_BY_BASE[dex] || [];",
        "  return ids.map(id => G.MEGAS[id]).filter(Boolean);",
        "};",
        "",
        "G.getMega = function(id) {",
        "  return G.MEGAS[id] || null;",
        "};",
        "",
    ]
    with io.open(OUT_MEGAS, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(lines_megas))
    print(f"✓ Đã ghi dữ liệu {len(mega_data_dict)} Mega vào {OUT_MEGAS}")

    # 5. Hợp nhất không phá hủy vào js/data/sprites-meta.js
    # Đọc lại sprites-meta.js hiện tại
    with io.open(OUT_META, 'r', encoding='utf-8') as f:
        content = f.read()

    # Tìm phần dictionary G.SPRITE_META = { ... };
    # Ghép thêm các Mega mới vào trước dấu đóng '};'
    insertion_lines = []
    for mid in sorted(mega_metas.keys()):
        # Kiểm tra xem ID này đã có trong sprites-meta.js chưa
        if f"  {mid}:" not in content and f"'{mid}':" not in content and f'"{mid}":' not in content:
            meta_json = json.dumps(mega_metas[mid], separators=(",", ":"))
            insertion_lines.append(f"  {mid}: {meta_json},")

    if insertion_lines:
        insert_idx = content.rfind('};')
        if insert_idx != -1:
            new_content = content[:insert_idx] + '\n' + '\n'.join(insertion_lines) + '\n' + content[insert_idx:]
            with io.open(OUT_META, 'w', encoding='utf-8', newline='\n') as f:
                f.write(new_content)
            print(f"✓ Đã bổ sung an toàn {len(insertion_lines)} sprite meta vào {OUT_META}")
    else:
        print("✓ Sprite meta đã cập nhật đầy đủ.")

    print("Hoàn tất Giai đoạn 1 thành công rực rỡ!\n")


if __name__ == '__main__':
    main()
