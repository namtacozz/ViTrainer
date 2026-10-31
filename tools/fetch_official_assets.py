import os
import urllib.request
import sys

sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('assets/items', exist_ok=True)
os.makedirs('assets/types', exist_ok=True)

# 1. Official Item Sprites
ITEM_MAP = {
    'leftovers': 'leftovers',
    'choiceband': 'choice-band',
    'quickclaw': 'quick-claw',
    'focussash': 'focus-sash',
    'shellbell': 'shell-bell',
    'amuletcoin': 'amulet-coin',
    'luckyegg': 'lucky-egg',
    'lifeorb': 'life-orb',
    'choicescarf': 'choice-scarf',
    'rockyhelmet': 'rocky-helmet',
    'assaultvest': 'assault-vest',
    'eviolite': 'eviolite',
    'weaknesspolicy': 'weakness-policy',
    'expertbelt': 'expert-belt',
    'loadeddice': 'loaded-dice',
    'heavydutyboots': 'heavy-duty-boots',
    'keystone': 'mega-ring',
    'dnasplicers': 'dna-splicers',
    'ultranecroziumz': 'ultranecrozium-z--held',
    'griseousorb': 'griseous-orb',
    'meteorite': 'meteorite'
}

print('--- Tải Sprite Vật phẩm Chính thức Nintendo ---')
for local_id, pokeapi_id in ITEM_MAP.items():
    dest_path = f'assets/items/{local_id}.png'
    url = f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/{pokeapi_id}.png'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = response.read()
            with open(dest_path, 'wb') as f:
                f.write(data)
        print(f'  ✓ Item: {local_id} -> {dest_path} ({len(data)} bytes)')
    except Exception as e:
        print(f'  ✗ Failed {local_id} from {url}: {e}')

# 2. Official Type Badges (Scarlet & Violet)
TYPE_MAP = {
    'normal': 1, 'fighting': 2, 'flying': 3, 'poison': 4, 'ground': 5,
    'rock': 6, 'bug': 7, 'ghost': 8, 'steel': 9, 'fire': 10,
    'water': 11, 'grass': 12, 'electric': 13, 'psychic': 14,
    'ice': 15, 'dragon': 16, 'dark': 17, 'fairy': 18
}

print('--- Tải Huy hiệu Hệ (Types) Chính thức Scarlet & Violet ---')
for type_name, type_id in TYPE_MAP.items():
    dest_path = f'assets/types/{type_name}.png'
    url = f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/{type_id}.png'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = response.read()
            with open(dest_path, 'wb') as f:
                f.write(data)
        print(f'  ✓ Type: {type_name} -> {dest_path} ({len(data)} bytes)')
    except Exception as e:
        print(f'  ✗ Failed {type_name} from {url}: {e}')

print('Hoàn thành tải toàn bộ sprite chính thức!')
