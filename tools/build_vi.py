import json
import os
import re
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMBINED_PATH = os.path.join(ROOT, 'tools', 'combined_keys.json')
CACHE_PATH = os.path.join(ROOT, 'tools', 'vi_cache.json')
OUT_JS = os.path.join(ROOT, 'js', 'data', 'lang-vi.js')

with open(COMBINED_PATH, 'r', encoding='utf-8') as f:
    combined = json.load(f)

# Load existing cache if any
cache = {}
if os.path.exists(CACHE_PATH):
    try:
        with open(CACHE_PATH, 'r', encoding='utf-8') as f:
            cache = json.load(f)
        print(f"Loaded {len(cache)} cached translations.")
    except Exception as e:
        print(f"Cache load error: {e}")

OVERRIDES = {
    # Types - user specifically requested KEEP IN ENGLISH:
    'Acero': 'Steel', 'Agua': 'Water', 'Bicho': 'Bug', 'Dragón': 'Dragon', 'Eléctrico': 'Electric',
    'Fantasma': 'Ghost', 'Fuego': 'Fire', 'Hada': 'Fairy', 'Hielo': 'Ice', 'Lucha': 'Fighting',
    'Planta': 'Grass', 'Psíquico': 'Psychic', 'Roca': 'Rock', 'Siniestro': 'Dark', 'Tierra': 'Ground',
    'Veneno': 'Poison', 'Volador': 'Flying', 'Normal': 'Normal', 'Teselia': 'Unova',

    # Items - user agreed to keep names in English:
    'Restos': 'Leftovers',
    'Cinta Elección': 'Choice Band',
    'Garra Rápida': 'Quick Claw',
    'Banda Focus': 'Focus Sash',
    'Cascabel Concha': 'Shell Bell',
    'Moneda Amuleto': 'Amulet Coin',
    'Huevo Suerte': 'Lucky Egg',
    'Vidasfera': 'Life Orb',
    'Pañuelo Elección': 'Choice Scarf',
    'Casco Dentado': 'Rocky Helmet',
    'Chaleco Asalto': 'Assault Vest',
    '¡Banda Focus!': 'Focus Sash!',

    # Core UI
    'Guardar': 'Lưu',
    'Jugar': 'Chơi',
    'Ajustes': 'Cài đặt',
    'Pausa': 'Tạm dừng',
    'Continuar': 'Tiếp tục',
    'Volver': 'Quay lại',
    'Atrás': 'Quay lại',
    'Cerrar': 'Đóng',
    'Cancelar': 'Hủy',
    'Aceptar': 'Chấp nhận',
    'Elegir': 'Chọn',
    'Elegir otro': 'Chọn khác',
    '¡Vamos juntos!': 'Cùng đi nào!',
    'Tu compañero:': 'Bạn đồng hành:',
    'Elige a tu compañero': 'Chọn bạn đồng hành của bạn',
    'Compañero': 'Bạn đồng hành',
    '(compañero)': '(bạn đồng hành)',
    'Es tu compañero': 'Là bạn đồng hành của bạn',
    'Elegir de compañero{x}': 'Chọn làm bạn đồng hành{x}',
    '{x} es ahora tu compañero': '{x} giờ là bạn đồng hành của bạn',
    '{x} shiny es ahora tu compañero': '{x} Shiny giờ là bạn đồng hành của bạn',
    'Ranking': 'Bảng xếp hạng',
    'Rankings': 'Bảng xếp hạng',
    'Los rankings se han reiniciado': 'Bảng xếp hạng (rankings) đã được làm mới',
    'The leaderboards have been reset': 'Bảng xếp hạng (rankings) đã được làm mới',
    'Importante: guarda tu partida': 'Quan trọng: lưu tiến trình của bạn',
    'Important: save your game': 'Quan trọng: lưu tiến trình của bạn',

    # Notice bodies for login.js (strict test requirement for 10 min and 3 bold tags)
    '<p>Debido a problemas con el guardado, a partir de ahora la partida se guarda en la nube automáticamente <b>cada 10 minutos</b>.</p><p>Hemos incorporado un botón <b class="gold">Guardar</b> arriba a la derecha. Úsalo antes de cerrar el juego o de cambiar de aparato: <b>es muy importante para no perder tu partida</b>.</p>':
    '<p>Do sự cố khi lưu, từ giờ tiến trình sẽ tự động lưu lên đám mây <b>mỗi 10 phút</b>.</p><p>Chúng tôi đã bổ sung nút <b class="gold">Lưu</b> ở góc trên bên phải. Hãy dùng trước khi đóng game hoặc đổi thiết bị: <b>rất quan trọng để không mất dữ liệu của bạn</b>.</p>',

    '<p>Hemos ajustado la <b>Sentencia de Arceus</b>: huir corriendo con toda la velocidad subida y el veneno ya no sirven para aguantar para siempre.</p><p>Para que todos compitáis en igualdad, <b>todos los rankings empiezan de cero</b> (hoy, semana, mes, año e histórico). ¡A por el primer puesto!</p>':
    '<p>Chúng tôi đã điều chỉnh <b>Phán Quyết Của Arceus</b>: việc chạy trốn với tốc độ tối đa và dùng độc không còn giúp bạn sống sót mãi mãi.</p><p>Để mọi người cạnh tranh công bằng, <b>toàn bộ bảng xếp hạng (rankings) bắt đầu lại từ đầu</b> (ngày, tuần, tháng, năm và lịch sử). Cùng tranh ngôi đầu bảng nhé!</p>',

    # Stats
    'Vida': 'HP',
    'Ataque': 'Tấn công',
    'At. Esp.': 'Đặc công',
    'Defensa': 'Phòng thủ',
    'Def. Esp.': 'Đặc thủ',
    'Velocidad': 'Tốc độ',
    'Físico': 'Vật lý',
    'Especial': 'Đặc biệt',
    'Crítico': 'Chí mạng',
    'Recarga': 'Hồi chiêu',
    'Daño': 'Sát thương',
    'Tiempo': 'Thời gian',
    'Nivel': 'Cấp độ',
    'Nv.': 'Cấp',
    'Nv. {x}': 'Cấp {x}',
    '¡Nivel {x}!': 'Lên cấp {x}!',
    '¡Nivel': 'Cấp',
    'Derrotados': 'Đã hạ gục',
    'Jefes': 'Trùm',
    'Pokémonedas ganadas': 'PokéCoins nhận được',
    'Movimientos': 'Chiêu thức',
    'Tickets del gacha': 'Vé gacha',
    'Nivel máximo': 'Cấp tối đa',
    'EVOLUCIÓN': 'TIẾN HÓA',
    'Evoluciona': 'Tiến hóa',
    'Mejora': 'Nâng cấp',
    'Nuevo · {x}': 'Mới · {x}',
    'Elige una recompensa ·': 'Chọn một phần thưởng ·',
    'Elige tu carta': 'Chọn thẻ của bạn',
    'Baya Zidra': 'Quả Sitrus',
    'Recupera el 45% de tu vida ahora mismo.': 'Hồi phục 45% HP ngay lập tức.',
    'Se guarda en la nube en {x} s.': 'Lưu vào đám mây sau {x} s.',
    'Solicitud enviada a {x}': 'Đã gửi lời mời tới {x}',
    'Esperando a {x}…': 'Đang chờ {x}…',

    # Login / Account
    'Entrar': 'Đăng nhập',
    'Crear cuenta': 'Tạo tài khoản',
    'Nombre': 'Tên',
    'Contraseña': 'Mật khẩu',
    'Entrar con Google': 'Đăng nhập bằng Google',
    'Jugar como invitado': 'Chơi với tư cách khách',
    'Invitado': 'Khách',
    'Entrenador': 'Huấn luyện viên',
    'Cerrar sesión': 'Đăng xuất',
    'Borrar cuenta': 'Xóa tài khoản',

    # Settings
    'Sonido': 'Âm thanh',
    'Gráficos': 'Đồ họa',
    'Controles': 'Điều khiển',
    'Cuenta': 'Tài khoản',
    'Acerca de': 'Giới thiệu',
    'Música': 'Nhạc nền',
    'Efectos': 'Hiệu ứng',
    'Silenciar todo': 'Tắt toàn bộ âm thanh',
    'Activar sonido': 'Bật âm thanh',
    'Calidad': 'Chất lượng',
    'Auto': 'Tự động',
    'Alta': 'Cao',
    'Media': 'Trung bình',
    'Baja': 'Thấp',
    'Pantalla': 'Màn hình',
    'Pantalla completa': 'Toàn màn hình',
    'Mostrar FPS': 'Hiện FPS',
    'Idioma': 'Ngôn ngữ',
    'Vibración': 'Rung'
}

def translate_batch_gtx(texts):
    """Translate a list of English texts into Vietnamese using public endpoint."""
    if not texts:
        return []
    
    # Protect placeholders {x} and {name} in each text
    processed = []
    meta = []
    for t in texts:
        placeholders = re.findall(r'\{(?:x|name)\}', t)
        p_text = t
        for idx, ph in enumerate(placeholders):
            p_text = p_text.replace(ph, f'__PH_{idx}__', 1)
        processed.append(p_text)
        meta.append(placeholders)

    # Join with unique delimiter
    DELIM = "\n---QXZ---\n"
    combined_query = DELIM.join(processed)
    
    url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + urllib.parse.quote(combined_query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            full_translated = ''.join(seg[0] for seg in data[0] if seg and seg[0])
            parts = full_translated.split("---QXZ---")
            if len(parts) != len(texts):
                # Delimiter split mismatch: fallback to translating individually
                print(f"Warning: batch split mismatch ({len(parts)} != {len(texts)}). Translating individually...")
                results = []
                for p_t, phs in zip(processed, meta):
                    u = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + urllib.parse.quote(p_t)
                    r = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(r, timeout=10) as s_resp:
                        s_data = json.loads(s_resp.read().decode('utf-8'))
                        s_out = ''.join(seg[0] for seg in s_data[0] if seg and seg[0])
                    for idx, ph in enumerate(phs):
                        s_out = re.sub(rf'__\s*PH_{idx}\s*__', ph, s_out, count=1)
                    results.append(s_out.strip())
                    time.sleep(0.05)
                return results

            results = []
            for part, phs in zip(parts, meta):
                p_clean = part.strip()
                for idx, ph in enumerate(phs):
                    p_clean = re.sub(rf'__\s*PH_{idx}\s*__', ph, p_clean, count=1)
                results.append(p_clean)
            return results
    except Exception as e:
        print(f"Batch translation error: {e}")
        # fallback individual
        results = []
        for p_t, phs in zip(processed, meta):
            try:
                u = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + urllib.parse.quote(p_t)
                r = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(r, timeout=10) as s_resp:
                    s_data = json.loads(s_resp.read().decode('utf-8'))
                    s_out = ''.join(seg[0] for seg in s_data[0] if seg and seg[0])
                for idx, ph in enumerate(phs):
                    s_out = re.sub(rf'__\s*PH_{idx}\s*__', ph, s_out, count=1)
                results.append(s_out.strip())
            except Exception as se:
                print(f"Error on single translation: {se}")
                # fallback to English
                results.append(p_t)
            time.sleep(0.05)
        return results

to_translate = []
final_dict = {}

for k, v in combined.items():
    if k in OVERRIDES:
        final_dict[k] = OVERRIDES[k]
    elif v.get('isMove') or v.get('isItem') or v.get('isType'):
        # Keep English name
        final_dict[k] = v['en']
    elif k in cache:
        final_dict[k] = cache[k]
    else:
        to_translate.append((k, v['en']))

print(f"Keys ready: {len(final_dict)}. Keys to translate: {len(to_translate)}.")

BATCH_SIZE = 30
for i in range(0, len(to_translate), BATCH_SIZE):
    batch = to_translate[i:i+BATCH_SIZE]
    texts = [b[1] for b in batch]
    print(f"Translating batch {i//BATCH_SIZE + 1} of {(len(to_translate) + BATCH_SIZE - 1)//BATCH_SIZE} ({len(batch)} items)...")
    trans_list = translate_batch_gtx(texts)
    
    for (k, en_text), vi_text in zip(batch, trans_list):
        # Validate placeholders count
        ph_k = re.findall(r'\{(?:x|name)\}', k)
        ph_v = re.findall(r'\{(?:x|name)\}', vi_text)
        if len(ph_k) != len(ph_v):
            print(f"Placeholder mismatch for {k}: key has {ph_k}, trans has {ph_v}. Falling back to en.")
            vi_text = en_text
        
        final_dict[k] = vi_text
        cache[k] = vi_text

    # Save cache intermittently
    if (i // BATCH_SIZE) % 5 == 0:
        with open(CACHE_PATH, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
    time.sleep(0.2)

# Final cache save
with open(CACHE_PATH, 'w', encoding='utf-8') as f:
    json.dump(cache, f, ensure_ascii=False, indent=2)

# Always ensure all OVERRIDES are in final_dict
for k, v in OVERRIDES.items():
    final_dict[k] = v

print(f"All {len(final_dict)} keys prepared! Validating placeholder contracts...")

mismatches = 0
for k, v in final_dict.items():
    ph_k = re.findall(r'\{(?:x|name)\}', k)
    ph_v = re.findall(r'\{(?:x|name)\}', v)
    if len(ph_k) != len(ph_v):
        print(f"CONTRACT VIOLATION: {k} -> {v}")
        # Fix by falling back to English key value
        final_dict[k] = combined[k]['en']
        mismatches += 1

if mismatches == 0:
    print("All placeholder contracts PASS!")
else:
    print(f"Fixed {mismatches} placeholder mismatches.")

# Now write js/data/lang-vi.js
header = """/* ============ lang-vi.js: bản dịch Tiếng Việt ============
 * Tên Pokémon, tên chiêu thức, tên trang bị và hệ (types) giữ nguyên tiếng Anh chuẩn quốc tế.
 * Toàn bộ giao diện, mô tả chiêu thức, thẻ nâng cấp, trắc nghiệm và thông báo được Việt hóa hoàn chỉnh.
 */
G.I18n.add("""

content = header + json.dumps(final_dict, ensure_ascii=False, indent=2) + ", 'vi');\n"

with open(OUT_JS, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully generated {OUT_JS} with {len(final_dict)} entries!")
