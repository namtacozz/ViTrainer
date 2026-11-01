# -*- coding: utf-8 -*-
# Tạo các trang tĩnh cho công cụ tìm kiếm (SEO) bằng Tiếng Việt và Tiếng Anh.
#   node tools/export_data.js && python tools/make_seo_pages.py
# Các trang văn bản tĩnh giúp Google Search Bot lập chỉ mục đầy đủ:
#   vi: cam-nang/ pokedex/ huyen-thoai/ shinies/ he-pokemon/ chieu-thuc/ vat-pham/ thanh-tuu/ tin-tuc/ ung-ho/
#   en: en/ (game tiếng Anh) en/guide/ en/pokedex/ en/legendaries/ ... en/news/
#   404.html, robots.txt, sitemap.xml
import json, os, re, datetime, html

ROOT = os.path.join(os.path.dirname(__file__), '..')
SITE = 'https://namtaccozz.github.io/ViTrainer/'
TODAY = datetime.date.today().isoformat()
D = json.load(open(os.path.join(ROOT, 'tools', 'cache', 'gamedata.json'), encoding='utf-8'))
DEX = D['dex']; BY = {p['dex']: p for p in DEX}
META = {}
for m in re.finditer(r'^\s*(\d+): (\{.*\}),?\s*$', open(os.path.join(ROOT, 'js/data/sprites-meta.js'), encoding='utf-8').read(), re.M):
    try: META[int(m.group(1))] = json.loads(m.group(2))
    except Exception: pass
esc = html.escape
N = len(DEX)

# ---------------- Từ điển chuyển ngữ ----------------
EN = D.get('en', {})
VI = D.get('vi', {})

PATS_EN = []
for k, v in EN.items():
    if '{x}' in k:
        parts = [re.escape(p) for p in k.split('{x}')]
        PATS_EN.append((re.compile('^' + '(.+?)'.join(parts) + '$'), v))

PATS_VI = []
for k, v in VI.items():
    if '{x}' in k:
        parts = [re.escape(p) for p in k.split('{x}')]
        PATS_VI.append((re.compile('^' + '(.+?)'.join(parts) + '$'), v))

def tr_en(s):
    if s in EN: return EN[s]
    for rx, v in PATS_EN:
        m = rx.match(s)
        if m:
            g = iter(m.groups())
            return re.sub(r'\{x\}', lambda _: tr_en(next(g)), v)
    return s

def tr_vi(s):
    if s in VI: return VI[s]
    for rx, v in PATS_VI:
        m = rx.match(s)
        if m:
            g = iter(m.groups())
            return re.sub(r'\{x\}', lambda _: tr_vi(next(g)), v)
    return s

def L(lang, key, vi_val=None, en_val=None):
    if lang == 'vi':
        return vi_val if vi_val is not None else tr_vi(key)
    return en_val if en_val is not None else tr_en(key)

GEN = {1: 'Kanto', 2: 'Johto', 3: 'Hoenn', 4: 'Sinnoh', 5: 'Unova', 6: 'Kalos', 7: 'Alola', 8: 'Galar', 9: 'Paldea'}
def gen_name(g, lang): return GEN[g]
TN = D['typeName']; TC = D['typeColor']; TYPES = D['typeOrder']
def tname(t, lang): return L(lang, TN.get(t, t))
def tbadge(t, lang): return f'<i class="ty" style="background:{TC.get(t, "#888")}">{esc(tname(t, lang))}</i>'
LEG = set(D['legends'])

# ---------------- Định tuyến trang ----------------
PAGES = ['home', 'guide', 'pokedex', 'legends', 'shinies', 'types', 'moves', 'items', 'achievements', 'news', 'support']
PATH = {
    'vi': {'home': '', 'guide': 'cam-nang/', 'pokedex': 'pokedex/', 'legends': 'huyen-thoai/', 'shinies': 'shinies/', 'types': 'he-pokemon/',
           'moves': 'chieu-thuc/', 'items': 'vat-pham/', 'achievements': 'thanh-tuu/', 'news': 'tin-tuc/', 'support': 'ung-ho/'},
    'en': {'home': 'en/', 'guide': 'en/guide/', 'pokedex': 'en/pokedex/', 'legends': 'en/legendaries/', 'shinies': 'en/shinies/', 'types': 'en/types/',
           'moves': 'en/moves/', 'items': 'en/items/', 'achievements': 'en/achievements/', 'news': 'en/news/', 'support': 'en/support/'},
}
NAV = {'vi': [('guide', 'Cẩm nang'), ('pokedex', 'Pokédex'), ('legends', 'Huyền thoại'), ('moves', 'Chiêu thức'), ('types', 'Hệ Pokémon')],
       'en': [('guide', 'Guide'), ('pokedex', 'Pokédex'), ('legends', 'Legendaries'), ('moves', 'Moves'), ('types', 'Types')]}
FOOT = {'vi': [('guide', 'Cẩm nang'), ('pokedex', 'Pokédex'), ('legends', 'Huyền thoại & Đấu trường'), ('shinies', 'Pokémon Shiny'), ('types', 'Bảng tương khắc hệ'),
               ('moves', 'Chiêu thức'), ('items', 'Trang bị'), ('achievements', 'Thành tựu'), ('news', 'Tin tức'), ('support', 'Ủng hộ dự án')],
        'en': [('guide', 'Guide'), ('pokedex', 'Pokédex'), ('legends', 'Legendaries & arenas'), ('shinies', 'Shinies'), ('types', 'Type chart'),
               ('moves', 'Moves'), ('items', 'Items'), ('achievements', 'Achievements'), ('news', 'News'), ('support', 'Support the project')]}

def rel(frm, to):
    up = '../' * frm.count('/')
    return up + to if (up + to) else './'

def page(pid, lang, title, desc, body, ld=None):
    me = PATH[lang][pid]
    other = 'en' if lang == 'vi' else 'vi'
    up = '../' * me.count('/')
    alts = ''.join(f'<link rel="alternate" hreflang="{l}" href="{SITE}{PATH[l][pid]}">\n' for l in ('vi', 'en'))
    alts += f'<link rel="alternate" hreflang="x-default" href="{SITE}{PATH["vi"][pid]}">\n'
    nav = ''.join(f'<a href="{rel(me, PATH[lang][p])}">{esc(t)}</a>' for p, t in NAV[lang])
    foot = ' · '.join(f'<a href="{rel(me, PATH[lang][p])}">{esc(t)}</a>' for p, t in FOOT[lang])
    play = 'Chơi miễn phí' if lang == 'vi' else 'Play free'
    switch = f'<a class="lang" hreflang="{other}" href="{rel(me, PATH[other][pid])}">{"English" if lang == "vi" else "Tiếng Việt"}</a>'
    legal = ('ViTrainer là trò chơi người hâm mộ <b>hoàn toàn miễn phí và phi lợi nhuận</b>, không có quảng cáo hay nạp tiền. Không liên kết với Nintendo, Creatures, '
             'GAME FREAK hay The Pokémon Company; Pokémon và các nhân vật thuộc quyền sở hữu của các chủ sở hữu tương ứng. Sprites từ PMD SpriteCollab '
             '(CC BY-NC 4.0) · dữ liệu từ PokéAPI · âm nhạc và hiệu ứng âm thanh gốc. Trò chơi không phát hành bất kỳ token hay tiền điện tử nào. '
             '<b>Trang web chính thức duy nhất là namtaccozz.github.io/ViTrainer</b> và trò chơi sẽ luôn luôn miễn phí. '
             'Mã nguồn phát hành theo PolyForm Noncommercial 1.0.0 (MIT đến 14-10-2026).') if lang == 'vi' else (
             'ViTrainer is a <b>free, non-profit</b> fan game with no ads or purchases. It is not affiliated with Nintendo, Creatures, GAME FREAK '
             'or The Pokémon Company; Pokémon and its characters are owned by their respective owners. Sprites from PMD SpriteCollab (CC BY-NC 4.0) '
             '· data from PokéAPI · original music and sounds. It has no official cryptocurrency or token: any using its name '
             'belongs to third parties and we take no responsibility for purchases or investments. '
             '<b>The only official website is namtaccozz.github.io/ViTrainer</b> and the game is and always will be free. '
             'Code under PolyForm Noncommercial 1.0.0 (MIT up to 14-10-2026).')
    ldj = ('<script type="application/ld+json">\n' + json.dumps(ld, ensure_ascii=False) + '\n</script>') if ld else ''
    return f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{SITE}{me}">
{alts}<meta name="theme-color" content="#0a1430">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ViTrainer">
<meta property="og:locale" content="{'vi_VN' if lang == 'vi' else 'en_US'}">
<meta property="og:url" content="{SITE}{me}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{SITE}assets/icons/ViTrainer.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{up}assets/icons/ViTrainer.ico" sizes="any">
<link rel="icon" href="{up}favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="{up}assets/icons/icon-48.png">
<link rel="icon" type="image/png" sizes="96x96" href="{up}assets/icons/icon-96.png">
<link rel="icon" type="image/png" sizes="144x144" href="{up}assets/icons/icon-144.png">
<link rel="apple-touch-icon" href="{up}assets/icons/icon-180.png">
<link rel="stylesheet" href="{up}css/pages.css">
{ldj}
</head>
<body>
<header class="top">
  <a class="brand" href="{rel(me, PATH[lang]['home'])}">ViTrainer</a>
  <nav>{nav}{switch}<a class="play" href="{rel(me, PATH[lang]['home'])}">{play}</a></nav>
</header>
<main>
{body}
</main>
<footer>
  <p>{foot}</p>
  <p>{legal}</p>
  <p><a href="https://github.com/namtacozz/ViTrainer">GitHub</a></p>
</footer>
</body>
</html>
'''

def write(pid, lang, html_):
    p = os.path.join(ROOT, PATH[lang][pid], 'index.html')
    os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w', encoding='utf-8').write(html_)

def crumbs(pid, lang, name):
    return {'@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': 1, 'name': 'ViTrainer', 'item': SITE + PATH[lang]['home']},
        {'@type': 'ListItem', 'position': 2, 'name': name, 'item': SITE + PATH[lang][pid]}]}

def sprite(d, shiny=False, up='../', anim='Idle'):
    m = META.get(d, {}).get('a', {}).get(anim)
    if not m: return ''
    k = 2 if max(m['w'], m['h']) <= 48 else 1
    src = f'{up}assets/pokemon/{d}/{"s/" if shiny else ""}{anim}.png'
    return (f'<span class="spr" style="width:{m["w"] * k}px;height:{m["h"] * k}px"><img loading="lazy" decoding="async" src="{src}" '
            f'width="{m["w"]}" height="{m["h"]}" style="transform:scale({k})" alt="{esc(BY[d]["name"])}{" shiny" if shiny else ""}"></span>')

def upof(pid, lang): return '../' * PATH[lang][pid].count('/')
def cta(pid, lang, text):
    return f'<p class="cta"><a class="btn" href="{rel(PATH[lang][pid], PATH[lang]["home"])}">{esc(text)}</a></p>'

# ================= Cẩm nang / Guide =================
FAQ = {
 'vi': [
  ('ViTrainer có miễn phí không?', 'Có, hoàn toàn 100% miễn phí. Đây là fan game phi lợi nhuận: không quảng cáo, không nạp tiền hay gói vật phẩm trả phí.'),
  ('Tôi có cần tải hay cài đặt gì không?', 'Không. Trò chơi chạy trực tiếp trên trình duyệt web của PC, máy tính bảng hoặc điện thoại. Bạn có thể thêm vào màn hình chính (PWA) để mở nhanh như ứng dụng.'),
  ('Có thể chơi trên điện thoại không?', 'Có, chơi ở chế độ màn hình ngang (Landscape). Chạm và kéo ngón tay bất kỳ đâu để di chuyển, chạm biểu tượng chiêu để chuyển chiêu, bấm ngọc để kích hoạt và nút góc trên để tạm dừng. Trong Cài Đặt > Điều Khiển có thể tùy biến vị trí nút bấm.'),
  ('Có hỗ trợ tay cầm (Gamepad) không?', 'Có: hỗ trợ đầy đủ tay cầm Xbox, PlayStation và Nintendo Switch khi kết nối với máy tính. Dùng cần analog hoặc D-pad để di chuyển, LB/RB đổi chiêu, X dùng ngọc, Y đổi ngọc và Start tạm dừng.'),
  ('Trò chơi hỗ trợ những ngôn ngữ nào?', 'Hỗ trợ hai ngôn ngữ chuẩn mực: Tiếng Việt và Tiếng Anh. Trò chơi tự động nhận diện ngôn ngữ trình duyệt của bạn và có thể thay đổi bất kỳ lúc nào trong phần Cài Đặt.'),
  ('Tôi có thể chơi cùng bạn bè không?', 'Có: chế độ Co-op Online hỗ trợ tổ đội lên đến 8 người chơi. Thêm bạn bè qua biệt danh, mời vào phòng và cùng nhau chiến đấu. Điểm kinh nghiệm được chia sẻ và có thể hồi sinh đồng đội khi đứng cạnh 3 giây.'),
  ('Có bao nhiêu loài Pokémon trong game?', f'Có đầy đủ {N} Pokémon thuộc 9 thế hệ (từ Kanto đến Paldea), tất cả đều có thể làm bạn đồng hành và đều có hình thái Shiny.'),
  ('Làm thế nào để chiêu mộ thêm Pokémon?', 'Thông qua tính năng Gacha, sử dụng Vé chiêu mộ nhận được khi chơi: quái thường rớt vé lẻ, Boss và thần thú rớt vé ×10. Mỗi vùng có Banner riêng và khi hoàn thành Pokédex một vùng, bạn nhận được Bùa Iris (nhân đôi tỷ lệ Shiny). Không thể mua vé bằng tiền thật.'),
  ('Tiệm Kecleon bán những gì?', 'Mua bằng Pokémonedas (Vàng) kiếm được trong trận: Mentas (đổi bản tính), Ability Capsules (đổi nội tại) và 8 Đĩa Dạy Chiêu TM mới mỗi ngày.'),
  ('Vết Nứt Thứ Nguyên (Rifts) là gì?', 'Những cánh cổng không gian bí ẩn mở ra ngẫu nhiên. Khi bước vào, bạn sẽ đối đầu với Pokémon Huyền Thoại trong đấu trường nguyên tố tương ứng. Chiến thắng sẽ mở khóa Dung hợp chiêu thức (Bond System).'),
  ('Tiến trình của tôi có được lưu không?', 'Khi tạo tài khoản (Tên đăng nhập hoặc Google), dữ liệu của bạn được lưu trữ trên đám mây và đồng bộ xuyên suốt mọi thiết bị. Chơi Khách (Guest) sẽ không lưu tiến trình lâu dài.'),
  ('Đây có phải trò chơi chính thức của Pokémon không?', 'Không. Đây là dự án của người hâm mộ (fan-made), phi lợi nhuận và hoàn toàn không liên kết với Nintendo, GAME FREAK hay The Pokémon Company.')],
 'en': [
  ('Is ViTrainer free?', 'Yes, completely. It\'s a non-profit fan game with no ads or purchases. If you like, you can support it with a voluntary donation, which only pays for the servers and gives no advantages.'),
  ('Do I need to download anything?', 'No. You play in your browser on PC, tablet or phone. If you like, you can install it as an app with “Add to Home Screen”.'),
  ('Can I play on my phone?', 'Yes, in landscape mode. Put your finger anywhere on the screen and drag to move, tap a move to switch to it, an orb to use it and the top-right button to pause. In Settings > Controls you can place the buttons wherever you like.'),
  ('Can I play with a controller?', 'Yes: any Xbox, PlayStation or Switch controller connected to your PC. Stick or D-pad to move, LB / RB to switch moves, X to use an orb and Y to pick another one, and Start to pause.'),
  ('Which languages is it in?', 'Two official languages: Vietnamese and English. It uses your browser language and you can change it anytime in Settings.'),
  ('Can I play with my friends?', 'Yes: online co-op supports up to 8 players. Add your friends by nickname, invite them to your room and start the game. Experience is shared and you can revive a fallen teammate by standing next to them for 3 seconds.'),
  ('How many Pokémon are there?', f'{N} Pokémon from all 9 regions (Kanto to Paldea), all playable as your partner, with their shiny form when one exists.'),
  ('How do I get more Pokémon?', 'From the gacha, which uses tickets you earn by playing: regular Pokémon drop tickets now and then, and bosses and rift legendaries sometimes drop ×10 tickets. Each region has its own banner and completing a region\'s Pokédex awards its Shiny Charm. Tickets can\'t be bought with real money.'),
  ('What is in the Kecleon Shop?', 'You buy with PokéCoins you earn by playing: Mints (change nature), Ability Capsules (change ability) and 8 new TMs every day, which permanently teach a move outside its types. Purchases go to your Bag.'),
  ('What are rifts?', 'Mysterious portals that open during runs. If you enter, you battle a legendary Pokémon in its elemental arena (18 arenas). Win to receive rewards and unlock move bonding.'),
  ('Is my progress saved?', 'With an account (username and password, or Google) your game is saved in the cloud and you can continue on any device. Guests can play right away, but nothing is saved permanently.'),
  ('Is this an official Pokémon game?', 'No. It\'s a free, non-profit fan project, unrelated to Nintendo, GAME FREAK or The Pokémon Company.')]}

def guide(lang):
    pid = 'guide'; me = PATH[lang][pid]; NA = len(D['achievements'])
    lk = lambda p: rel(me, PATH[lang][p])
    if lang == 'vi':
        body = f'''<article class="doc">
<h1>Cẩm nang ViTrainer: Hướng dẫn chơi & Sinh tồn</h1>
<p class="lead">ViTrainer là trò chơi <b>hành động sinh tồn Pokémon</b> miễn phí trên trình duyệt kết hợp phong cách Mystery Dungeon và Survivor.io:
chọn bạn đồng hành, khám phá hầm ngục vô tận, tự động kích hoạt chiêu thức và chống chọi trước bầy quái vật hoang dã.
Bạn có thể sống sót trong bao lâu?</p>
{cta(pid, lang, 'Chơi miễn phí ngay')}
<h2>Cách chơi cơ bản</h2>
<ul>
<li><b>Trên PC:</b> Di chuyển bằng <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> hoặc các phím mũi tên. Đổi chiêu chủ động bằng <kbd>1</kbd>–<kbd>4</kbd>, <kbd>Q</kbd>/<kbd>E</kbd> hoặc nhấp chuột vào biểu tượng. Sử dụng Ngọc bằng <kbd>5</kbd>–<kbd>8</kbd>. Tạm dừng bằng <kbd>Esc</kbd>.</li>
<li><b>Trên điện thoại hoặc máy tính bảng (xoay ngang):</b> Chạm và kéo ngón tay bất kỳ đâu để di chuyển, chạm vào ô chiêu để kích hoạt, chạm vào ngọc để dùng và nút góc trên bên phải để tạm dừng.</li>
<li><b>Với tay cầm:</b> Cần analog hoặc D-pad để di chuyển, <kbd>LB</kbd>/<kbd>RB</kbd> đổi chiêu, <kbd>X</kbd> dùng ngọc, <kbd>Y</kbd> đổi ngọc, <kbd>Start</kbd> tạm dừng.</li>
<li>Pokémon của bạn <b>tự động tấn công</b> bằng chiêu thức chủ động đang chọn. Nhiệm vụ của bạn là né tránh đòn đánh và định vị khoảng cách an toàn.</li>
<li>Nhặt hạt kinh nghiệm để <b>lên cấp</b> và chọn 1 trong 3 thẻ bài nâng cấp: học <a href="{lk('moves')}">chiêu thức mới</a>, thăng cấp chiêu hiện có hoặc gia tăng chỉ số Pokémon.</li>
</ul>
<h2>Tính năng nổi bật</h2>
<ul class="feat">
<li><b>{N} Pokémon từ cả 9 vùng đất</b> (<a href="{lk('pokedex')}">xem Pokédex</a>), mỗi loài sở hữu <b>bản tính (Nature)</b> và <b>nội tại (Ability)</b> riêng biệt tác động trực tiếp lên chiến đấu.</li>
<li><a href="{lk('moves')}"><b>Chiêu thức Vật Lý và Đặc Biệt</b></a>: Tính toán sát thương chuẩn xác dựa trên Attack / Special Attack của bạn và Defense / Special Defense của mục tiêu.</li>
<li><b>Tiến hóa chiêu thức 3 cấp</b>: Đạt cấp tối đa kết hợp thẻ tương thích giúp chiêu thức thức tỉnh thành dạng tối thượng. Hạ gục Boss thần thú để mở khóa <b>Dung Hợp (Bond)</b> kết hợp tối đa 4 chiêu vào 1 slot.</li>
<li><b>Kẻ địch thông minh</b>: Quái vật biết hồi máu, tạo giáp chắn, triệu hồi bầy đàn và báo hiệu vệt tấn công trước khi ra đòn.</li>
<li><b>Boss hùng mạnh</b>, <a href="{lk('legends')}"><b>18 Đấu trường Vết Nứt Nguyên Tố</b></a> và trận chiến định mệnh <b>Phán Quyết Arceus</b> tại phút 30.</li>
<li><a href="{lk('types')}"><b>Thời tiết và Bảng tương khắc hệ</b></a>: Mưa tăng cường hệ Nước và giảm hệ Lửa; nắng gắt, bão cát, tuyết rơi và sương mù.</li>
<li><a href="{lk('shinies')}"><b>Pokémon Shiny</b></a> xuất hiện ngoài tự nhiên (tỷ lệ 1/4096), trong Vết Nứt và vòng quay Gacha.</li>
<li><b>Gacha máy xèng theo từng vùng đất</b>, quay 10 hoặc 100 lần bằng vé thưởng trong trận. Hoàn thành Pokédex nhận ngay <b>Bùa Iris</b>.</li>
<li><b>Tiệm Kecleon</b>: Mentas, Ability Capsules và 8 đĩa dạy chiêu TM mới mỗi ngày.</li>
<li><a href="{lk('items')}"><b>Trang bị giữ</b></a> như Leftovers, Choice Band, Focus Sash, Life Orb và <b>Ngọc thần bí</b> kích hoạt một lần.</li>
<li><b>Chơi Co-op Online tới 8 người</b>: Cùng bạn bè chia sẻ kinh nghiệm và hỗ trợ hồi sinh nhau.</li>
<li><b>Nhiệm vụ hàng ngày</b>, <a href="{lk('achievements')}"><b>{NA} thành tựu</b></a> với huy hiệu danh giá và bảng xếp hạng vinh danh.</li>
</ul>
<h2>Mẹo sinh tồn hiệu quả</h2>
<ol>
<li>Tuyệt đối không đứng yên: hãy di chuyển thành những vòng tròn lớn để gom quái vật thành hàng dài phía sau.</li>
<li>Tận dụng bảng tương khắc hệ: chuyển sang chiêu thức có hệ khắc chế đàn quái đang áp sát bạn.</li>
<li>Vệt báo hiệu trên mặt đất (vòng tròn và đường thẳng sáng lên) là đòn đánh sắp giáng xuống: hãy nhanh chóng thoát ra ngoài.</li>
<li>Ưu tiên tiêu diệt trước những quái vật có khả năng hồi máu hoặc dựng khiên bảo vệ cho bầy đàn.</li>
<li>Giữ lại Ngọc Ru Ngủ hoặc Ngọc Đẩy Lùi để sử dụng trong những tình huống nguy cấp khi bị bao vây.</li>
<li>Dành tiền vàng nâng cấp chỉ số cho Pokémon ruột và thường xuyên ghé Tiệm Kecleon để sắm đĩa TM phù hợp.</li>
</ol>
<h2>Câu hỏi thường gặp</h2>
{''.join(f'<h3>{esc(q)}</h3><p>{esc(a)}</p>' for q, a in FAQ[lang])}
{cta(pid, lang, 'Chơi ViTrainer miễn phí ngay')}
</article>'''
        title = 'Cẩm nang ViTrainer: Hướng dẫn chơi, mẹo sinh tồn & câu hỏi thường gặp'
        desc = f'Hướng dẫn chơi ViTrainer trên PC, di động và tay cầm: {N} Pokémon, co-op tới 8 người, Vết Nứt Thứ Nguyên, Tiệm Kecleon, mẹo sinh tồn.'
    else:
        body = f'''<article class="doc">
<h1>ViTrainer guide</h1>
<p class="lead">ViTrainer is a free <b>Pokémon survival game</b> in the style of Survivor.io and Mystery Dungeon that you play in your
browser: pick a partner, roam an endless dungeon and your moves fire on their own while hordes of wild Pokémon try to surround you.
How long can you last?</p>
{cta(pid, lang, 'Play free now')}
<h2>How to play</h2>
<ul>
<li><b>On PC:</b> move with <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or arrow keys. Switch moves with <kbd>1</kbd>–<kbd>4</kbd>, <kbd>Q</kbd>/<kbd>E</kbd> or by clicking their icon. Use orbs with <kbd>5</kbd>–<kbd>8</kbd>. Pause with <kbd>Esc</kbd>.</li>
<li><b>On phone or tablet (landscape):</b> drag your finger anywhere to move, tap a move to switch to it, an orb to use it and the top-right button to pause.</li>
<li><b>With a controller:</b> stick or D-pad to move, <kbd>LB</kbd>/<kbd>RB</kbd> to switch moves, <kbd>X</kbd> to use an orb and <kbd>Y</kbd> to pick another, <kbd>Start</kbd> to pause.</li>
<li>Your Pokémon <b>attacks on its own</b> with the active move. Your job is to dodge and position yourself well.</li>
<li>Collect experience to <b>level up</b> and pick one of three cards: new <a href="{lk('moves')}">moves</a>, upgrades to the ones you have, or boosts for your Pokémon.</li>
</ul>
<h2>Features</h2>
<ul class="feat">
<li><b>{N} Pokémon from all 9 regions</b> (<a href="{lk('pokedex')}">see Pokédex</a>), each with its own <b>nature</b> and <b>ability</b> impacting combat.</li>
<li><a href="{lk('moves')}"><b>Physical and Special moves</b></a>: accurately calculated based on Attack / Special Attack vs Defense / Special Defense.</li>
<li><b>Moves evolve in 3 tiers</b>: reach max level with compatible upgrades to unlock devastating evolutions. Defeat rift bosses to unlock <b>Bonds</b> fusing up to 4 moves into one slot.</li>
<li><b>Smart enemies</b>: enemies heal, shield, summon swarms, and telegraph their heavy attacks.</li>
<li><b>Boss battles</b>, <a href="{lk('legends')}"><b>18 Elemental Rift Arenas</b></a> and the final <b>Judgment of Arceus</b> at minute 30.</li>
<li><a href="{lk('types')}"><b>Weather and Type Chart</b></a>: Rain powers up Water and weakens Fire; sunshine, sandstorm, snow and fog.</li>
<li><a href="{lk('shinies')}"><b>Shiny Pokémon</b></a> in the wild (1 in 4096), in rifts and in the gacha.</li>
<li><b>Regional slot machine gacha</b>: pull 10 or 100 with earned tickets. Complete a regional Pokédex for the <b>Shiny Charm</b>.</li>
<li><b>Kecleon Shop</b>: Mints, Ability Capsules and 8 new TMs daily.</li>
<li><a href="{lk('items')}"><b>Held items</b></a> like Leftovers, Choice Band, Focus Sash, Life Orb and tactical single-use <b>Orbs</b>.</li>
<li><b>Online Co-op up to 8 players</b>: share XP and revive fallen teammates.</li>
<li><b>Daily quests</b>, <a href="{lk('achievements')}"><b>{NA} achievements</b></a> with medals, titles and global rankings.</li>
</ul>
<h2>Survival tips</h2>
<ol>
<li>Never stand still: move in wide circles so the hordes follow in a line behind you.</li>
<li>Leverage the type chart: switch to super effective moves against approaching waves.</li>
<li>Telegraphed markers on the ground indicate imminent attacks: step out immediately.</li>
<li>Prioritize taking down support enemies that heal or shield other Pokémon.</li>
<li>Save Slumber Orbs or Blowback Orbs for moments when you get cornered.</li>
<li>Spend coins upgrading your favorite partner and check the Kecleon Shop for synergistic TMs.</li>
</ol>
<h2>Frequently Asked Questions</h2>
{''.join(f'<h3>{esc(q)}</h3><p>{esc(a)}</p>' for q, a in FAQ[lang])}
{cta(pid, lang, 'Play ViTrainer now')}
</article>'''
        title = 'ViTrainer guide: how to play, tips & FAQ'
        desc = f'How to play ViTrainer on PC, mobile and controller: {N} Pokémon, co-op up to 8 players, Dimensional Rifts, Kecleon Shop, survival tips.'
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'FAQPage', 'inLanguage': lang, 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in FAQ[lang]]},
        crumbs(pid, lang, 'Cẩm nang' if lang == 'vi' else 'Guide')]}
    write(pid, lang, page(pid, lang, title, desc, body, ld))

# ================= Pokédex =================
def dexcard(e, lang, up):
    d = e['dex']
    tag = f'<b class="leg">{"Huyền Thoại" if lang == "vi" else "Legendary"}</b>' if d in LEG else (
          f'<b class="st">{"Khởi Đầu" if lang == "vi" else "Starter"}</b>' if e.get('starter') else '')
    return (f'<li id="p{d}">{sprite(d, up=up)}<span class="n">#{d:03d}</span><span class="nm">{esc(e["name"])}</span>'
            f'<span class="tys">{"".join(tbadge(t, lang) for t in e.get("types", []))}</span>{tag}</li>')

def pokedex(lang):
    pid = 'pokedex'; up = upof(pid, lang)
    secs = []
    for g in range(1, 10):
        mons = [e for e in DEX if e.get('gen') == g]
        gn = gen_name(g, lang)
        head = f'(Thế hệ {g} · {len(mons)} Pokémon)' if lang == 'vi' else f'(Generation {g} · {len(mons)} Pokémon)'
        secs.append(f'<section id="{gn.lower()}"><h2>{gn} <small>{head}</small></h2><ul class="dexgrid">{"".join(dexcard(e, lang, up) for e in mons)}</ul></section>')
    gens = ''.join(f'<a href="#{gen_name(g, lang).lower()}">{gen_name(g, lang)}</a>' for g in range(1, 10))
    if lang == 'vi':
        h1, lead, c = f'Pokédex ViTrainer: Đầy đủ {N} Pokémon có thể nhập vai', (f'Tất cả Pokémon này đều có thể trở thành bạn đồng hành của bạn trong ViTrainer, tựa game sinh tồn roguelite miễn phí trên trình duyệt và di động. '
              f'Bao gồm {N} loài từ cả 9 vùng đất; nhận qua bạn đồng hành khởi đầu hoặc chiêu mộ gacha (bằng vé kiếm được trong trận), cũng như xuất hiện dưới dạng quái hoang dã, Boss và Thần Thú trong Vết Nứt.'), 'Chọn bạn đồng hành & chơi miễn phí'
        title, desc = f'Pokédex ViTrainer: Toàn bộ {N} Pokémon có thể chơi (9 vùng đất)', f'Danh sách đầy đủ {N} Pokémon bạn có thể điều khiển trong ViTrainer, từ Kanto đến Paldea, kèm hệ và thông số.'
    else:
        h1, lead, c = f'ViTrainer Pokédex: all {N} playable Pokémon', (f'Every one of these Pokémon can be your partner in ViTrainer, the free Pokémon survival roguelite game for browser and mobile. '
              f'There are {N} from all 9 regions; available as starters or from the gacha (with tickets earned in runs), as well as wild enemies, bosses and rift legendaries.'), 'Pick your partner and play free'
        title, desc = f'ViTrainer Pokédex: all {N} playable Pokémon (9 regions)', f'The full list of {N} Pokémon you can play in ViTrainer, from Kanto to Paldea, with their types.'
    body = f'<article class="doc wide"><h1>{esc(h1)}</h1><p class="lead">{esc(lead)}</p><nav class="gens">{gens}</nav>{"".join(secs)}{cta(pid, lang, c)}</article>'
    ld = {'@context': 'https://schema.org', '@graph': [{'@type': 'CollectionPage', 'name': h1, 'url': SITE + PATH[lang][pid], 'inLanguage': lang}, crumbs(pid, lang, 'Pokédex')]}
    write(pid, lang, page(pid, lang, title, desc, body, ld))

# ================= Huyền thoại & Vết nứt =================
def legends(lang):
    pid = 'legends'; up = upof(pid, lang)
    cards = ''.join(dexcard(BY[d], lang, up) for d in sorted(LEG))
    ar = ''.join(f'<li>{tbadge(t, lang)} <b>{esc(L(lang, D["arenas"][t]))}</b></li>' for t in TYPES if t in D['arenas'])
    if lang == 'vi':
        h1 = 'Thần Thú & Vết Nứt Thứ Nguyên: 18 Đấu Trường ViTrainer'
        intro = ('<p class="lead">Trong lúc sinh tồn, các <b>Vết Nứt Thứ Nguyên bí ẩn</b> sẽ ngẫu nhiên xuất hiện trên bản đồ. Khi bước vào, bạn sẽ đối đầu với một <b>Pokémon Huyền Thoại</b> '
                 'trong đấu trường nguyên tố tương ứng, mang địa hình và thời tiết đặc thù. Đánh bại Thần Thú sẽ mang về vé gacha, vàng (và 50% cơ hội nhận <b>Vé ×10</b>), '
                 'ngọc thần bí và <b>Dung Hợp (Bond)</b> cho phép ghép 2 chiêu thức vào cùng một ô kỹ năng. Nếu thất bại, bạn sẽ quay lại bản đồ chính. Trong chế độ Co-op, cả đội sẽ cùng bước vào chiến đấu.</p>'
                 '<p>Đặc biệt, nếu bạn kiên cường sống sót đến <b>phút thứ 30</b>, trận chiến <b>Phán Quyết Arceus (Judgment)</b> sẽ bắt đầu: Arceus đưa bạn đến Tàn Tích Phán Quyết trong trạng thái bất tử, truy đuổi bạn '
                 'với tốc độ ngày càng nhanh, đồng thời cứ mỗi 5 giây lại triệu hồi thêm một thần thú mạnh mẽ hơn. Bảng xếp hạng sẽ ghi nhận <b>thời gian sinh tồn</b> và <b>lượng sát thương gây ra cho Arceus</b>.</p>')
        h2a, h2b = '18 Đấu trường nguyên tố', f'Toàn bộ {len(LEG)} Pokémon Huyền Thoại'
        tip = '<p>Thần thú mang 2 hệ sẽ chọn ngẫu nhiên 1 hệ cho đấu trường. Địa hình đóng vai trò chiến lược: dung nham thiêu đốt, băng trơn trượt, nước làm chậm…</p>'
        title, desc, c = 'Thần Thú & Vết Nứt ViTrainer: 18 Đấu Trường Nguyên Tố', f'Cách hoạt động của Vết Nứt trong ViTrainer, 18 đấu trường huyền thoại theo hệ và danh sách {len(LEG)} Pokémon Thần Thú.', 'Tìm Vết Nứt: Chơi miễn phí ngay'
    else:
        h1 = 'Legendaries & Rifts: ViTrainer\'s 18 Arenas'
        intro = ('<p class="lead">During runs, <b>mysterious dimensional rifts</b> open on the map. Enter and face a <b>legendary Pokémon</b> in an elemental arena '
                 'matching its type, with custom terrain and weather. Victory awards gacha tickets, coins (with a 50% chance for a <b>×10 ticket</b>), '
                 'orbs and a <b>Bond</b> to fuse two moves into one slot. If defeated, you return to the main map. In co-op, the entire team enters together.</p>'
                 '<p>Surviving until <b>minute 30</b> triggers the <b>Judgment of Arceus</b>: Arceus transports you to the Ruins of Judgment, chases you with escalating speed, '
                 'and summons stronger legendaries every 5 seconds. Leaderboards rank both <b>survival time</b> and <b>damage dealt to Arceus</b>.</p>')
        h2a, h2b = '18 Arenas, one per type', f'All {len(LEG)} Legendary Pokémon'
        tip = '<p>Dual-type legendaries pick one of their types at random. Terrain matters: lava burns, ice is slippery, water slows movement…</p>'
        title, desc, c = 'ViTrainer Legendaries & Rifts: 18 Type Arenas', f'How dimensional rifts work in ViTrainer, 18 elemental arenas and {len(LEG)} legendary Pokémon you can challenge.', 'Find a rift: play free'
    body = f'<article class="doc wide"><h1>{esc(h1)}</h1>{intro}<h2>{h2a}</h2><ul class="arenas">{ar}</ul>{tip}<h2>{h2b}</h2><ul class="dexgrid">{cards}</ul>{cta(pid, lang, c)}</article>'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Shinies =================
SHOW = [1, 4, 7, 25, 133, 6, 150, 151, 152, 155, 158, 249, 250, 252, 255, 258, 384, 393, 448, 445, 495, 658, 722, 906]
def shinies(lang):
    pid = 'shinies'; up = upof(pid, lang)
    pairs = ''.join(f'<li><span class="pair">{sprite(d, up=up)}{sprite(d, True, up=up)}</span><span class="nm">{esc(BY[d]["name"])}</span></li>'
                    for d in SHOW if META.get(d, {}).get('sh'))
    if lang == 'vi':
        h1 = 'Pokémon Shiny trong ViTrainer: Tỷ Lệ & Cách Săn'
        body = f'''<article class="doc wide"><h1>{h1}</h1>
<p class="lead"><b>Pokémon Shiny</b> là những biến thể đổi màu quý hiếm. Trong ViTrainer, gần như toàn bộ {N} Pokémon đều có phiên bản Shiny với hoạt ảnh sprite hoàn chỉnh.</p>
<h2>Cách sở hữu Pokémon Shiny</h2>
<ul><li><b>Ngoài hoang dã:</b> Mỗi Pokémon xuất hiện có tỷ lệ <b>1/4096</b> trở thành Shiny (chuẩn nguyên bản). Khi xuất hiện, màn hình sẽ phát sáng và hiện mũi tên chỉ hướng: hãy tiêu diệt nó để thu phục vĩnh viễn!</li>
<li><b>Trong Vết Nứt Thứ Nguyên:</b> Thần thú huyền thoại trong Vết Nứt có tỷ lệ Shiny lên tới <b>1/512</b>.</li>
<li><b>Vòng quay Gacha:</b> Mỗi lượt quay có tỷ lệ <b>1/100</b> ra Shiny, và tăng lên <b>1/50</b> đối với Banner vùng mà bạn đã hoàn thành Pokédex (nhờ vào <b>Bùa Iris</b>).</li>
<li>Trong Gacha, Pokémon Shiny không bị trùng lặp: nếu đã sở hữu, hệ thống sẽ ưu tiên chọn một Shiny khác cùng độ hiếm mà bạn chưa có.</li>
<li>Khi đã mở khóa dạng Shiny của bạn đồng hành, bạn có thể tự do chuyển đổi trong bộ sưu tập.</li></ul>
<h2>So sánh dạng Thường và Shiny</h2><ul class="dexgrid pairs">{pairs}</ul>{cta(pid, lang, 'Bắt đầu săn Shiny ngay')}</article>'''
        title, desc = 'Pokémon Shiny trong ViTrainer: Tỷ lệ và cách sở hữu', f'Hướng dẫn săn Pokémon Shiny trong ViTrainer: 1/4096 ngoài tự nhiên, 1/512 trong Vết Nứt và 1/100 qua Gacha (1/50 với Bùa Iris). Bộ sưu tập sprite dạng thường và Shiny.'
    else:
        h1 = 'Shinies in ViTrainer: Odds & Hunting Guide'
        body = f'''<article class="doc wide"><h1>{h1}</h1>
<p class="lead"><b>Shiny</b> Pokémon are rare, uniquely colored variants. In ViTrainer, virtually all {N} Pokémon have fully realized shiny sprites.</p>
<h2>How to get them</h2>
<ul><li><b>In the wild:</b> Every spawning Pokémon has a <b>1 in 4096</b> chance of being shiny. You'll see sparkle effects and an on-screen tracker: defeat it to claim it forever.</li>
<li><b>In rifts:</b> Rift legendaries carry an increased <b>1 in 512</b> shiny rate.</li>
<li><b>From the gacha:</b> Every pull has a <b>1 in 100</b> shiny rate, boosted to <b>1 in 50</b> in banners where you earned the regional <b>Shiny Charm</b>.</li>
<li>Gacha shinies are duplicate-protected until you own all shinies of that rarity tier.</li>
<li>Once unlocked, toggle your partner's shiny form anytime in the collection menu.</li></ul>
<h2>Normal and Shiny Showcase</h2><ul class="dexgrid pairs">{pairs}</ul>{cta(pid, lang, 'Go shiny hunting')}</article>'''
        title, desc = 'Shinies in ViTrainer: Odds and how to get them', 'How to hunt shiny Pokémon in ViTrainer: 1 in 4096 wild odds, 1 in 512 in rifts, and 1 in 100 from gacha (1 in 50 with Shiny Charm).'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Bảng tương khắc hệ / Types =================
def types_page(lang):
    pid = 'types'
    M = D['matrix']
    def cell(v):
        cls = 'x16' if v > 1.05 else ('x03' if v < 0.35 else ('x06' if v < 0.95 else ''))
        num = f'{v:g}'
        return f'<td class="{cls}">{"×" + num if cls else ""}</td>'
    head = ''.join(f'<th class="vt" title="{esc(tname(t, lang))}"><span style="background:{TC[t]}">{esc(tname(t, lang)[:3])}</span></th>' for t in TYPES)
    rows = ''.join(f'<tr><th>{tbadge(a, lang)}</th>{"".join(cell(M[a][d]) for d in TYPES)}</tr>' for a in TYPES)
    table = f'<div class="tablewrap"><table class="chart" id="chart"><thead><tr><th></th>{head}</tr></thead><tbody>{rows}</tbody></table></div>'
    script = '''<script>
document.querySelectorAll('#chart td').forEach(td => {
  td.onmouseenter = () => { const r = td.parentElement, i = [...r.children].indexOf(td);
    document.querySelectorAll('#chart tr').forEach(tr => tr.children[i] && tr.children[i].classList.add('hl')); r.classList.add('hl'); };
  td.onmouseleave = () => document.querySelectorAll('#chart .hl').forEach(e => e.classList.remove('hl'));
});
</script>'''
    if lang == 'vi':
        h1 = 'Bảng Tương Khắc Hệ ViTrainer'
        intro = ('<p class="lead">Bảng tương khắc 18 hệ Pokémon chuẩn canon, được <b>tối ưu cân bằng</b> cho thể loại sinh tồn roguelite: '
                 'Đòn siêu hiệu quả gây <b>×1.6</b> sát thương, không hiệu quả nhận <b>×0.6</b>, và miễn nhiễm quy đổi thành <b>×0.3</b>. Hai hệ phòng thủ nhân dồn (tối đa trần ×2.4). '
                 'Quy tắc áp dụng cho cả đòn đánh của bạn lẫn sát thương nhận vào từ kẻ địch.</p><p>Hàng ngang: Hệ tấn công · Cột dọc: Hệ của mục tiêu chịu đòn.</p>')
        wx = ('<h2>Ảnh hưởng của Thời Tiết</h2><ul><li><b>Mưa (Rain):</b> Tăng cường chiêu hệ Nước (+50%) và làm yếu hệ Lửa (-50%).</li>'
              '<li><b>Nắng gắt (Harsh Sunlight):</b> Tăng cường hệ Lửa (+50%) và làm yếu hệ Nước (-50%).</li>'
              '<li><b>Bão cát (Sandstorm):</b> Tăng phòng thủ cho hệ Đá, Đất, Thép; các hệ khác chịu sát thương định kỳ.</li>'
              '<li><b>Tuyết rơi (Snowfall):</b> Tăng phòng thủ hệ Băng và làm chậm tốc độ kẻ địch.</li>'
              '<li><b>Sương mù (Fog):</b> Tăng cường chiêu thức hệ Ma, Tiên và Siêu Linh.</li></ul>')
        title, desc, c = 'Bảng tương khắc 18 hệ ViTrainer & Hiệu ứng thời tiết', 'Bảng tra cứu tương khắc 18 hệ Pokémon tương tác trực quan: hệ số ×1.6 / ×0.6 / ×0.3 và hiệu ứng thời tiết Mưa, Nắng, Bão Cát, Tuyết Rơi.', 'Thử nghiệm chiến thuật: Chơi ngay'
    else:
        h1 = 'ViTrainer Type Chart'
        intro = ('<p class="lead">The canonical 18-type chart, <b>streamlined</b> for survival roguelite combat: '
                 'super effective deals <b>×1.6</b>, not very effective deals <b>×0.6</b>, and immunities scale to <b>×0.3</b>. Dual-type multipliers cap at ×2.4. '
                 'Applies bidirectionally to both outgoing attacks and incoming enemy damage.</p><p>Rows: Attacking type · Columns: Defending type.</p>')
        wx = ('<h2>Weather Effects</h2><ul><li><b>Rain:</b> Water boosted (+50%), Fire weakened (-50%).</li><li><b>Harsh Sunlight:</b> Fire boosted (+50%), Water weakened (-50%).</li>'
              '<li><b>Sandstorm:</b> Rock, Ground and Steel buffed; others take passive damage.</li><li><b>Snowfall:</b> Ice buffed; slows down targets.</li>'
              '<li><b>Fog:</b> Ghost, Fairy and Psychic boosted.</li></ul>')
        title, desc, c = 'ViTrainer Type Chart (Interactive) & Weather Effects', 'Interactive 18-type Pokémon chart: ×1.6 / ×0.6 / ×0.3 multipliers plus rain, sun, sandstorm, snow and fog mechanics.', 'Test your strategy: play free'
    body = f'<article class="doc wide"><h1>{h1}</h1>{intro}{table}{wx}{cta(pid, lang, c)}</article>{script}'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Chiêu thức / Moves =================
KIND = {'vi': {'projectile': 'Đạn đạo', 'melee': 'Cận chiến', 'beam': 'Tia sáng', 'orbit': 'Quỹ đạo', 'nova': 'Bộc phá', 'aura': 'Hào quang', 'buff': 'Cường hóa',
               'boomerang': 'Boomerang', 'chain': 'Dây xích', 'mine': 'Địa lôi', 'meteor': 'Thiên thạch', 'turret': 'Trụ súng', 'dash': 'Lướt tới',
               'trail': 'Vệt tích', 'cone': 'Hình nón'},
        'en': {'projectile': 'Projectile', 'melee': 'Melee', 'beam': 'Beam', 'orbit': 'Orbit', 'nova': 'Burst', 'aura': 'Aura', 'buff': 'Buff',
               'boomerang': 'Boomerang', 'chain': 'Chain', 'mine': 'Mines', 'meteor': 'Meteors', 'turret': 'Turret', 'dash': 'Dash',
               'trail': 'Trail', 'cone': 'Spray'}}

def moves_page(lang):
    pid = 'moves'
    rows = []
    for t in TYPES:
        for m in [x for x in D['moves'] if x['type'] == t]:
            evo = m['evo']
            evo_txt = (f'<b>{esc(L(lang, m["name"]))} +</b><small>{"với" if lang == "vi" else "with"} {esc(L(lang, evo["needs"]))} · {esc(L(lang, evo["text"]))}</small>' if evo else '—')
            cat = {'physical': ('Vật Lý', 'Physical'), 'special': ('Đặc Biệt', 'Special')}.get(m.get('cat'), ('—', '—'))[0 if lang == 'vi' else 1]
            rows.append(f'<tr><td><b>{esc(L(lang, m["name"]))}</b></td><td>{tbadge(t, lang)}</td><td>{cat}</td><td>{KIND[lang].get(m["kind"], m["kind"])}</td>'
                        f'<td>{esc(L(lang, m["desc"]))}</td><td class="evo">{evo_txt}</td></tr>')
    th = ('<th>Chiêu thức</th><th>Hệ</th><th>Thể loại</th><th>Dạng thức</th><th>Mô tả hiệu ứng</th><th>Tiến hóa thành</th>' if lang == 'vi'
          else '<th>Move</th><th>Type</th><th>Category</th><th>Kind</th><th>Description</th><th>Evolves into</th>')
    nevo = sum(1 for m in D['moves'] if m['evo'])
    nm = len(D['moves'])
    if lang == 'vi':
        h1 = f'Toàn bộ {nm} Chiêu Thức ViTrainer & Tiến Hóa'
        intro = (f'<p class="lead">Có tổng cộng <b>{nm} chiêu thức chiến đấu</b> thuộc 18 hệ. Bạn đồng hành tự động kích hoạt chiêu đang chọn, và khi lên cấp bạn chọn thẻ '
                 f'để học chiêu mới hoặc nâng cấp tối đa lên Level 5. <b>{nevo} chiêu có thể tiến hóa</b>: đạt cấp tối đa kết hợp thẻ bổ trợ tương ứng '
                 f'(Uy Lực, Thể Lực, Phản Xạ…) sẽ kích hoạt thẻ tiến hóa hoàng kim.</p>'
                 f'<p>Mỗi chiêu thức được phân định rõ <b>Vật Lý</b> hoặc <b>Đặc Biệt</b> dựa theo Attack / Special Attack của Pokémon. '
                 f'Với các đĩa dạy chiêu <b>TM</b> tại Tiệm Kecleon (8 đĩa mới mỗi ngày), bạn có thể dạy vĩnh viễn chiêu thức ngoại hệ tương thích.</p>')
        title, desc, c = f'Chiêu thức ViTrainer: Danh sách {nm} chiêu thức & tiến hóa', f'Bảng tra cứu {nm} chiêu thức ViTrainer theo hệ, thể loại và công thức tiến hóa (Ember → Fire Blast, Bubble → Surf…).', 'Thử nghiệm ngay: Chơi miễn phí'
    else:
        h1 = f'ViTrainer Moves & Evolutions ({nm} Attacks)'
        intro = (f'<p class="lead">There are <b>{nm} moves</b> across all 18 types. Your Pokémon attacks automatically with the active move, and leveling up '
                 f'lets you learn new moves or upgrade existing ones to Level 5. <b>{nevo} moves can evolve</b> into enhanced forms when paired with matching upgrades.</p>'
                 f'<p>Every move is strictly categorized as <b>Physical</b> or <b>Special</b>. With daily <b>TMs</b> from the Kecleon Shop, teach compatible off-type moves permanently.</p>')
        title, desc, c = f'ViTrainer moves: all {nm} attacks and evolutions', f'All {nm} ViTrainer moves by type, descriptions and evolution pairings.', 'Try them: play free'
    body = f'<article class="doc wide"><h1>{h1}</h1>{intro}<div class="tablewrap"><table class="list"><thead><tr>{th}</tr></thead><tbody>{"".join(rows)}</tbody></table></div>{cta(pid, lang, c)}</article>'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Trang bị / Items =================
def items_page(lang):
    pid = 'items'
    rows = ''.join(f'<li><b>{esc(L(lang, i["name"]))}</b><span>{esc(L(lang, i["desc"]))}</span></li>' for i in D['items'])
    ni = len(D['items'])
    if lang == 'vi':
        h1 = f'Trang Bị Giữ Trong ViTrainer ({ni} Vật Phẩm)'
        intro = ('<p class="lead">Trong trận đấu, bạn có thể tìm thấy <b>Trang Bị Giữ (Held Items)</b> khi mở rương hoặc hạ gục Boss. Bạn có thể mang <b>một trang bị</b> '
                 'cùng lúc: nếu nhặt trang bị mới, bạn có thể chọn giữ lại hoặc thay thế. Hiệu ứng duy trì xuyên suốt trận đấu.</p>')
        title, desc, c = f'Trang bị ViTrainer: {ni} vật phẩm giữ hỗ trợ sinh tồn', f'Danh mục {ni} trang bị giữ trong ViTrainer (Leftovers, Choice Band, Focus Sash, Life Orb, Assault Vest, Eviolite…) và chi tiết nội tại.', 'Tìm trang bị: Chơi miễn phí'
    else:
        h1 = f'ViTrainer Held Items ({ni} Items)'
        intro = ('<p class="lead">During runs, discover <b>Held Items</b> from chests and fallen bosses. You can hold <b>one item</b> at a time, '
                 'choosing to keep or swap when new ones drop. Effects persist for the entire run.</p>')
        title, desc, c = f'ViTrainer Items: all {ni} held items', f'The {ni} held items in ViTrainer (Leftovers, Choice Band, Focus Sash, Life Orb, Assault Vest, Eviolite…) and their effects.', 'Find items: play free'
    orbs = D.get('orbs') or []
    orows = ''.join(f'<li><b>{esc(L(lang, o["name"]))}</b><span>{esc(L(lang, o["desc"]))}</span></li>' for o in orbs)
    if lang == 'vi':
        oh = (f'<h2>Ngọc Thần Bí (Orbs)</h2><p>Ngoài ra còn có {len(orbs)} loại <b>Ngọc Thần Bí</b> sử dụng một lần như trong Mystery Dungeon. Rớt ra từ rương hoặc khi đánh bại quái vật. '
              'Bạn có thể mang tối đa 4 loại khác nhau (3 viên mỗi loại), kích hoạt bằng phím 5-8 hoặc nút bấm trên màn hình.</p>')
    else:
        oh = (f'<h2>Tactical Orbs</h2><p>There are also {len(orbs)} single-use <b>Orbs</b> from Mystery Dungeon. Dropped from chests and defeated enemies. '
              'Carry up to 4 distinct types (3 charges each), activated with keys 5-8 or touch buttons.</p>')
    osec = f'{oh}<ul class="items">{orows}</ul>' if orbs else ''
    body = f'<article class="doc"><h1>{h1}</h1>{intro}<ul class="items">{rows}</ul>{osec}{cta(pid, lang, c)}</article>'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Thành tựu / Achievements =================
def ach_page(lang):
    pid = 'achievements'
    cats = D['achCats'] or []
    secs = []
    for cid, cname in cats:
        items = [a for a in D['achievements'] if a['cat'] == cid]
        if not items: continue
        li = ''.join('<li><b>' + esc(L(lang, a['name'])) + '</b><span>' + esc(L(lang, a['desc'])) + '</span>'
                     + ('<em>' + esc(L(lang, a['title'])) + '</em>' if a['title'] else '') + '</li>' for a in items)
        secs.append(f'<h2>{esc(L(lang, cname))} <small>({len(items)})</small></h2><ul class="items ach">{li}</ul>')
    na = len(D['achievements'])
    if lang == 'vi':
        h1 = f'Hệ Thống {na} Thành Tựu ViTrainer'
        intro = ('<p class="lead">Mỗi thành tựu mở khóa sẽ trao thưởng <b>huy hiệu danh giá</b>, <b>vé gacha</b> và <b>tiền vàng</b>. '
                 'Một số thành tựu đặc biệt còn trao tặng <b>danh hiệu độc quyền</b> hiển thị trên hồ sơ người chơi của bạn.</p>')
        title, desc, c = f'{na} Thành tựu ViTrainer: Huy hiệu, phần thưởng & danh hiệu', f'Danh sách đầy đủ {na} thành tựu trong ViTrainer phân chia theo từng danh mục: Sinh tồn, Chiến đấu, Thu thập và Tiến hóa.', 'Mở khóa thành tựu ngay'
    else:
        h1 = f'ViTrainer Achievements ({na} Milestones)'
        intro = ('<p class="lead">Every achievement awards a <b>medal</b>, <b>gacha tickets</b> and <b>coins</b>. '
                 'Special achievements grant <b>exclusive titles</b> displayed on your public player profile.</p>')
        title, desc, c = f'ViTrainer Achievements: all {na} milestones and titles', f'The full list of {na} achievements in ViTrainer categorized by Survival, Combat, Collection, and Evolution.', 'Unlock achievements: play free'
    body = f'<article class="doc wide"><h1>{h1}</h1>{intro}{"".join(secs)}{cta(pid, lang, c)}</article>'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Tin tức / News =================
SECT = {'new': ('Mới', 'New'), 'chg': ('Thay đổi', 'Changes'), 'fix': ('Sửa lỗi', 'Fixes')}
def news(lang):
    pid = 'news'
    i = 0 if lang == 'vi' else 1
    items = ''
    for e in D['changelog']:
        secs = ''.join(f'<h3>{SECT[k][i]}</h3><ul>' + ''.join(f'<li>{esc(x[i] if i < len(x) else x[0])}</li>' for x in e[k]) + '</ul>'
                       for k in ('new', 'chg', 'fix') if e.get(k))
        title_txt = e['title'][i] if i < len(e['title']) else e['title'][0]
        items += f'<article class="news"><time datetime="{e["d"]}">{e["d"]}</time><h2>{esc(title_txt)}</h2>{secs}</article>'
    h1 = 'Nhật Ký Cập Nhật ViTrainer' if lang == 'vi' else 'ViTrainer Updates & Changelog'
    title = h1 + (' · Bản vá & Tính năng mới' if lang == 'vi' else ' · Game updates')
    desc = ('Nhật ký các bản cập nhật mới nhất của ViTrainer: tính năng mới, cân bằng chỉ số và sửa lỗi.' if lang == 'vi'
            else 'The latest ViTrainer updates: new features, balance adjustments, and bug fixes.')
    body = f'<div class="doc"><h1>{h1}</h1>{items}{cta(pid, lang, "Chơi miễn phí" if lang == "vi" else "Play free")}</div>'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Ủng hộ dự án / Support =================
def support(lang):
    pid = 'support'
    F = D['funding']
    val = lambda v: (f'{v} €/tháng' if lang == 'vi' else f'€{v}/month') if isinstance(v, (int, float)) else esc(L(lang, v))
    rows = ''.join(f'<tr><td>{esc(L(lang, c))}</td><td class="num">{val(v)}</td></tr>' for c, v in F['costs'])
    kofi = f'https://ko-fi.com/{F["kofi"]}' if F['kofi'] else ''
    spons = f'https://github.com/sponsors/{F["sponsors"]}' if F['sponsors'] else ''
    if lang == 'vi':
        h1 = 'Ủng Hộ Dự Án ViTrainer'
        btns = ''.join(x for x in [f'<a class="btn" href="{kofi}" rel="noopener">Ủng hộ qua Ko-fi</a>' if kofi else '',
                                   f'<a class="btn ghost" href="{spons}" rel="noopener">GitHub Sponsors</a>' if spons else ''])
        body = f"""<article class="doc"><h1>{h1}</h1>
<p class="lead">ViTrainer luôn luôn là tựa game <b>hoàn toàn miễn phí</b>: không quảng cáo, không nạp thẻ và không trả tiền để chiến thắng. Nếu bạn yêu thích trò chơi và mong muốn đồng hành duy trì máy chủ,
bạn có thể đóng góp một khoản <b>ủng hộ tự nguyện</b>. <b>Toàn bộ tiền quyên góp chỉ được dùng để chi trả chi phí máy chủ và tên miền</b>.</p>
<p>Ủng hộ hoàn toàn không đem lại bất kỳ đặc quyền hay lợi thế nào trong trò chơi: tất cả người chơi đều trải nghiệm công bằng như nhau.</p>
<h2>Chi phí duy trì dự án</h2>
<table class="list"><tbody>{rows}</tbody></table>
<p>Máy chủ lưu trữ dữ liệu đám mây, bảng xếp hạng và các phòng chơi co-op WebRTC.</p>
<h2>Hình thức ủng hộ</h2>
<p>{btns or 'Cổng ủng hộ tự nguyện sẽ sớm được mở tại đây.'}</p>
<p>Cách hỗ trợ tuyệt vời và hoàn toàn miễn phí khác: Chia sẻ trò chơi tới bạn bè, giới thiệu cộng đồng và gửi phản hồi báo lỗi.</p>
{cta(pid, lang, 'Quay lại trò chơi')}</article>"""
        title, desc = 'Ủng hộ ViTrainer: Quyên góp duy trì máy chủ', 'ViTrainer hoàn toàn miễn phí và không quảng cáo. Đóng góp tự nguyện chỉ nhằm mục đích duy trì hạ tầng máy chủ.'
    else:
        h1 = 'Support ViTrainer'
        btns = ''.join(x for x in [f'<a class="btn" href="{kofi}" rel="noopener">Donate on Ko-fi</a>' if kofi else '',
                                   f'<a class="btn ghost" href="{spons}" rel="noopener">GitHub Sponsors</a>' if spons else ''])
        body = f"""<article class="doc"><h1>{h1}</h1>
<p class="lead">ViTrainer is and will always remain <b>free</b>: no ads, no microtransactions and no pay-to-win mechanics. If you enjoy the game and wish to support server hosting costs,
you can make a <b>voluntary donation</b>. <b>All funds go directly toward domain and server operations</b>.</p>
<p>Donations grant zero in-game advantages: every trainer competes on equal footing.</p>
<h2>Operational Costs</h2>
<table class="list"><tbody>{rows}</tbody></table>
<p>Servers manage cloud saves, real-time rankings and WebRTC co-op multiplayer sessions.</p>
<h2>How to support</h2>
<p>{btns or 'Donation links will be available here soon.'}</p>
<p>You can also support for free by sharing the game with friends, recommending it and submitting bug reports.</p>
{cta(pid, lang, 'Back to the game')}</article>"""
        title, desc = 'Support ViTrainer: server hosting donations', 'ViTrainer is free and ad-free. Voluntary donations cover server infrastructure.'
    write(pid, lang, page(pid, lang, title, desc, body, {'@context': 'https://schema.org', '@graph': [crumbs(pid, lang, h1)]}))

# ================= Trò chơi phiên bản tiếng Anh (/en/) =================
def game_en():
    dev = open(os.path.join(ROOT, 'dev.html'), encoding='utf-8').read()
    idx = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    app = re.search(r'<script defer src="js/app\.min\.js\?v=[^"]+"></script>', idx).group(0)
    loc = re.search(r'<script src="js/core/locales\.js\?v=[^"]+"></script>', idx).group(0)
    css = re.search(r'<link rel="stylesheet" href="css/style\.css\?v=[^"]+">', idx).group(0)
    a, b = dev.index('<!-- scripts:begin -->'), dev.index('<!-- scripts:end -->') + len('<!-- scripts:end -->')
    src = dev[:a] + app + dev[b:]
    src = src.replace('<script src="js/core/locales.js"></script>', loc)
    src = src.replace('<link rel="stylesheet" href="css/style.css">', css)
    src = re.sub(r'<!-- seo:(begin|end) -->\n?', '', src)
    src = re.sub(r'<meta name="robots" content="noindex">\s*', '', src)
    src = re.sub(r'<!-- dev\.html: trang nguồn gốc[^>]*-->\n?', '', src)
    s = src.replace('<html lang="vi">', '<html lang="en">')
    s = s.replace('<head>\n<meta charset="utf-8">', '<head>\n<meta charset="utf-8">\n<base href="../">', 1)
    rep = [
        ('<title>ViTrainer – Trò chơi sinh tồn Pokémon trực tuyến miễn phí (kiểu Survivor.io)</title>', '<title>ViTrainer – Free online Pokémon survival game (Survivor.io style)</title>'),
        ('content="ViTrainer – Sinh tồn cùng đồng đội Pokémon trước các đàn quái trong fan game miễn phí cho trình duyệt và di động. 1022 Pokémon, dạng Mega, shinies và tổ đội tới 8 người."',
         f'content="ViTrainer: survive hordes of Pokémon with your partner in this free fan game for browser and mobile: {N} Pokémon, shinies, mega forms and online co-op with up to 8 friends. No downloads, no ads."'),
        (f'<link rel="canonical" href="{SITE}">', f'<link rel="canonical" href="{SITE}en/">'),
        ('<meta property="og:locale" content="vi_VN">', '<meta property="og:locale" content="en_US">'),
        (f'<meta property="og:url" content="{SITE}">', f'<meta property="og:url" content="{SITE}en/">'),
        ('<meta property="og:title" content="ViTrainer – Trò chơi sinh tồn Pokémon trực tuyến miễn phí">', '<meta property="og:title" content="ViTrainer – Survive the Pokémon hordes">'),
        ('<meta property="og:description" content="ViTrainer – Fan game miễn phí trên trình duyệt và di động: 1022 Pokémon, shinies, dạng Mega và chế độ tổ đội tới 8 người chơi.">',
         f'<meta property="og:description" content="A free fan game for browser and mobile: {N} Pokémon, shinies, mega forms and co-op with up to 8 friends. No downloads, no ads.">'),
        ('<meta name="twitter:title" content="ViTrainer – Sinh tồn cùng Pokémon">', '<meta name="twitter:title" content="ViTrainer – Survive the Pokémon hordes">'),
        ('<meta name="twitter:description" content="ViTrainer – Fan game miễn phí cho trình duyệt và di động, tổ đội tới 8 người. Không quảng cáo.">',
         '<meta name="twitter:description" content="A free fan game for browser and mobile, with co-op for up to 8. No downloads, no ads.">'),
        ('<p class="boot-ld">Đang tải…</p>', '<p class="boot-ld">Loading…</p>'),
    ]
    for a, b in rep:
        if a in s:
            s = s.replace(a, b)
    s = s.replace('href="cam-nang/"', 'href="en/guide/"').replace('href="pokedex/"', 'href="en/pokedex/"')
    s = s.replace('"inLanguage": "vi"', '"inLanguage": "en"')
    os.makedirs(os.path.join(ROOT, 'en'), exist_ok=True)
    open(os.path.join(ROOT, 'en', 'index.html'), 'w', encoding='utf-8').write(s)

# ================= 404, robots và sitemap =================
def extra():
    nf = f'''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>404 · Lạc lối trong hầm ngục · ViTrainer</title><link rel="icon" href="{SITE}assets/icons/ViTrainer.ico" sizes="any"><link rel="icon" type="image/png" sizes="48x48" href="{SITE}assets/icons/icon-48.png"><link rel="stylesheet" href="{SITE}css/pages.css"></head>
<body><header class="top"><a class="brand" href="{SITE}">ViTrainer</a><nav><a href="{SITE}cam-nang/">Cẩm nang</a><a href="{SITE}en/">English</a><a class="play" href="{SITE}">Chơi miễn phí</a></nav></header>
<main><article class="doc center"><h1>404 · Bạn đã lạc lối trong hầm ngục</h1><p class="lead">Trang này không tồn tại. Nhưng bầy quái vật vẫn đang rình rập ngoài kia…</p>
<p class="lead" lang="en">This page doesn't exist. But the hordes are still waiting…</p>
<p class="cta"><a class="btn" href="{SITE}">Trở lại trò chơi</a> <a class="btn ghost" href="{SITE}en/">Play in English</a></p></article></main></body></html>
'''
    open(os.path.join(ROOT, '404.html'), 'w', encoding='utf-8').write(nf)
    open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8').write(f'# ViTrainer\nUser-agent: *\nAllow: /\nDisallow: /tools/\nDisallow: /docs/\nDisallow: /dev.html\n\nSitemap: {SITE}sitemap.xml\n')
    PRI = {'home': '1.0', 'guide': '0.8', 'pokedex': '0.7', 'legends': '0.7', 'moves': '0.6', 'types': '0.6', 'shinies': '0.6', 'achievements': '0.5', 'items': '0.5', 'news': '0.5', 'support': '0.4'}
    urls = []
    for pid in PAGES:
        for lang in ('vi', 'en'):
            alts = ''.join(f'<xhtml:link rel="alternate" hreflang="{l}" href="{SITE}{PATH[l][pid]}"/>' for l in ('vi', 'en'))
            alts += f'<xhtml:link rel="alternate" hreflang="x-default" href="{SITE}{PATH["vi"][pid]}"/>'
            urls.append(f'  <url><loc>{SITE}{PATH[lang][pid]}</loc><lastmod>{TODAY}</lastmod><priority>{PRI[pid]}</priority>{alts}</url>\n')
    open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + ''.join(urls) + '</urlset>\n')

for lang in ('vi', 'en'):
    guide(lang); pokedex(lang); legends(lang); shinies(lang); types_page(lang); moves_page(lang); items_page(lang); ach_page(lang); news(lang); support(lang)
game_en(); extra()
print('OK: generated', 2 * (len(PAGES) - 1), 'SEO pages (vi/en) + en/ + 404 + robots + sitemap')
