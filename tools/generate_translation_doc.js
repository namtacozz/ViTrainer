const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');

// 1. Load English sources
const en = {
  'Rankings': 'Rankings',
  'Los rankings se han reiniciado': 'The leaderboards have been reset',
  'The leaderboards have been reset': 'The leaderboards have been reset',
  'Importante: guarda tu partida': 'Important: save your game',
  'Important: save your game': 'Important: save your game',
  '<p>Debido a problemas con el guardado, a partir de ahora la partida se guarda en la nube automáticamente <b>cada 10 minutos</b>.</p><p>Hemos incorporado un botón <b class="gold">Guardar</b> arriba a la derecha. Úsalo antes de cerrar el juego o de cambiar de aparato: <b>es muy importante para no perder tu partida</b>.</p>':
    '<p>Due to saving issues, from now on the game saves to the cloud automatically <b>every 10 minutes</b>.</p><p>We added a <b class="gold">Save</b> button on the top right. Use it before closing the game or switching devices: <b>it is very important to avoid losing your progress</b>.</p>',
  '<p>Hemos ajustado la <b>Sentencia de Arceus</b>: huir corriendo con toda la velocidad subida y el veneno ya no sirven para aguantar para siempre.</p><p>Para que todos compitáis en igualdad, <b>todos los rankings empiezan de cero</b> (hoy, semana, mes, año e histórico). ¡A por el primer puesto!</p>':
    '<p>We adjusted <b>Arceus Judgment</b>: running away with max speed and poison no longer lets you survive forever.</p><p>So everyone competes on equal footing, <b>all leaderboards start from zero</b> (today, week, month, year and all-time). Go for first place!</p>',
  'Nv. {x}': 'Lv. {x}',
  'monedas': 'coins',
  'Tiradas': 'Pulls'
};

const rawEnFile = fs.readFileSync(path.join(ROOT, 'js/data/lang-en.js'), 'utf8');

// Precise sets from lang-en.js structure
const pMove1 = rawEnFile.indexOf('// ---------------- movimientos ----------------');
const pMove2 = rawEnFile.indexOf('// descripciones de los movimientos');
const moveNames = new Set([...rawEnFile.slice(pMove1, pMove2).matchAll(/'([^']+)'\s*:/g)].map(m => m[1]));

const pDesc1 = rawEnFile.indexOf('// descripciones de los movimientos');
const pDesc2 = rawEnFile.indexOf('// ---------------- cartas al subir de nivel ----------------');
const moveDescs = new Set([...rawEnFile.slice(pDesc1, pDesc2).matchAll(/'([^']+)'\s*:/g)].map(m => m[1]));

const pItem1 = rawEnFile.indexOf('// ---------------- objetos ----------------');
const pItem2 = rawEnFile.indexOf('// ---------------- mejoras permanentes ----------------');
const allItemSectionKeys = new Set([...rawEnFile.slice(pItem1, pItem2).matchAll(/'([^']+)'\s*:/g)].map(m => m[1]));

const itemNames = new Set([
  'Restos', 'Cinta Elección', 'Garra Rápida', 'Banda Focus',
  'Cascabel Concha', 'Moneda Amuleto', 'Huevo Suerte', 'Vidasfera',
  'Pañuelo Elección', 'Casco Dentado', 'Chaleco Asalto',
  'Perla Grande', 'Gafas Especiales', 'Cinta Focus'
]);

const sbEn = { G: { I18n: { add: (d) => Object.assign(en, d) } }, console };
sbEn.window = sbEn;
vm.createContext(sbEn);
vm.runInContext(rawEnFile, sbEn);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data/changelog.js'), 'utf8'), sbEn);
if (sbEn.G.CHANGELOG) {
  for (const c of sbEn.G.CHANGELOG) {
    if (c.title && c.title[0] && c.title[1]) en[c.title[0]] = c.title[1];
    for (const k of ['new', 'chg', 'fix']) {
      for (const row of (c[k] || [])) {
        if (row && row[0] && row[1]) en[row[0]] = row[1];
      }
    }
  }
}

// 2. Load Vietnamese sources
const vi = {};
const sbVi = { G: { I18n: { add: (d) => Object.assign(vi, d) } }, console };
sbVi.window = sbVi;
vm.createContext(sbVi);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data/lang-vi.js'), 'utf8'), sbVi);

// 3. Classify keys into categories
const TYPES = ['Acero', 'Agua', 'Bicho', 'Dragón', 'Eléctrico', 'Fantasma', 'Fuego', 'Hada', 'Hielo', 'Lucha', 'Planta', 'Psíquico', 'Roca', 'Siniestro', 'Tierra', 'Veneno', 'Volador', 'Teselia'];

function getCategory(key, enVal, viVal) {
  // 1. Types & Regions
  if (TYPES.includes(key)) return '01_TYPES_REGIONS';

  // 2. Move Names (Keep EN)
  if (moveNames.has(key)) return '02_MOVE_NAMES';

  // 3. Move Descriptions (Translate)
  if (moveDescs.has(key)) return '03_MOVE_DESCRIPTIONS';

  // 4. Item Names (Keep EN)
  if (itemNames.has(key)) return '04_ITEM_NAMES';

  // 5. Item Descriptions (Translate)
  if (allItemSectionKeys.has(key)) return '05_ITEM_DESCRIPTIONS';

  const lk = key.toLowerCase();
  const le = (enVal || '').toLowerCase();

  // Evolution / Level up
  if (key === 'EVOLUCION' || key === 'Evoluciona' || key === 'Mejora' || key.startsWith('Nuevo ·') || key.includes('nivel') || le.includes('level up') || le.includes('evolves') || le.includes('evolution')) {
    return '06_LEVEL_UP';
  }

  // Permanent Upgrades
  if (key === 'Vitalidad' || key === 'Fuerza' || key === 'Zancada' || key === 'Fortuna' || key === 'Sabiduría' || key === 'Repertorio' || le.includes('vitality') || le.includes('stride') || le.includes('fortune') || le.includes('repertoire')) {
    return '07_PERMANENT_UPGRADES';
  }

  // Arenas / Maps
  if (key === 'Pradera Eterna' || key === 'Volcán Ígneo' || key === 'Gruta Marina' || key === 'Selva Esmeralda' || key === 'Desierto Tormenta' || key === 'Cueva Cristal' || key === 'Pico Helado' || key === 'Cementerio Sombrío' || key === 'Ruinas del Juicio' || key.includes('Huerto de Calabazas') || le.includes('meadow') || le.includes('volcano') || le.includes('grotto') || le.includes('jungle')) {
    return '08_ARENAS_MAPS';
  }

  // Kecleon Shop & Natures / Abilities
  if (key.includes('Kecleon') || le.includes('kecleon') || key.includes('naturaleza') || le.includes('nature') || key.includes('habilidad') || le.includes('ability') || key.startsWith('+35 %') || key.startsWith('+20 %') || key.startsWith('+10 %')) {
    return '09_KECLEON_ABILITIES';
  }

  // Gacha & Orbs
  if (key.includes('Gacha') || key.includes('gacha') || key.includes('Tirada') || le.includes('gacha') || le.includes('pull') || key.includes('esfera') || key.includes('Esfera') || le.includes('orb')) {
    return '10_GACHA_ORBS';
  }

  // Halloween
  if (key.includes('Halloween') || le.includes('halloween') || key.includes('Calabaza') || le.includes('pumpkin')) {
    return '19_HALLOWEEN';
  }

  // Changelog & Updates
  if (key.includes('Arreglos') || key.includes('Cambios') || key.includes('Nuevo') && key.length < 15 || key.includes('2026-10') || key.includes('Versión') || le.includes('fixes') || le.includes('changes') || key.length > 120 && (key.includes('Móvil:') || key.includes('Guardado en la nube:') || key.includes('Cooperativo:') || key.includes('Gacha con mando:'))) {
    return '20_CHANGELOG';
  }

  // Multiplayer / Friends / Room
  if (key.includes('sala') || key.includes('amigo') || key.includes('compañero') || key.includes('invitación') || key.includes('anfitrión') || le.includes('room') || le.includes('friend') || le.includes('teammate') || le.includes('host') || le.includes('co-op') || le.includes('lobby')) {
    return '16_FRIENDS_COOP';
  }

  // Leaderboards
  if (key.includes('ranking') || key.includes('Ranking') || key.includes('clasificación') || le.includes('leaderboard') || le.includes('rank') || le.includes('survival time') || key === 'Diario' || key === 'Semanal' || key === 'Mensual' || key === 'Anual' || key === 'Histórico') {
    return '17_LEADERBOARDS';
  }

  // Settings & Controls
  if (key.includes('Ajustes') || key.includes('Sonido') || key.includes('Gráficos') || key.includes('Controles') || key.includes('Música') || key.includes('Efectos') || le.includes('settings') || le.includes('sound') || le.includes('graphics') || le.includes('controls') || le.includes('volume') || le.includes('joystick') || le.includes('gamepad')) {
    return '18_SETTINGS';
  }

  // Missions & Achievements
  if (key.includes('Misiones') || key.includes('Logros') || key.includes('Perfil') || key.includes('Medalla') || le.includes('achievement') || le.includes('mission') || le.includes('profile') || le.includes('badge')) {
    return '15_MISSIONS_PROFILE';
  }

  // Login & Account
  if (key.includes('sesión') || key.includes('cuenta') || key.includes('contraseña') || key.includes('correo') || key.includes('nube') || le.includes('log in') || le.includes('sign up') || le.includes('password') || le.includes('account') || le.includes('cloud')) {
    return '11_ACCOUNT_LOGIN';
  }

  // In-Game Alerts & Combat
  if (key.startsWith('¡') || key.includes('apareció') || key.includes('salvaje') || key.includes('horda') || key.includes('Horda') || le.includes('appeared') || le.includes('wild') || le.includes('horde') || le.includes('power!')) {
    return '12_COMBAT_ALERTS';
  }

  // Pause & End Run
  if (key === 'Pausa' || key === 'Continuar' || key === 'Abandonar run' || key.includes('Derrotado') || key.includes('Victoria') || le.includes('pause') || le.includes('continue') || le.includes('quit run') || le.includes('game over') || le.includes('victory') || key.includes('Resumen')) {
    return '13_PAUSE_END';
  }

  // Main Menu & Navigation
  if (key === 'Jugar' || key === 'Pokémon' || key === 'Colección' || key === 'Tienda' || key === 'Bolsa' || key === 'Salir' || le.includes('play') || le.includes('collection') || le.includes('bag') || le.includes('exit')) {
    return '14_MAIN_MENU';
  }

  return '21_GENERAL_TEXT';
}

const SECTION_METADATA = {
  '01_TYPES_REGIONS': {
    title: '1. Hệ Pokémon & Vùng đất (Types & Regions)',
    status: '🔒 [GIỮ NGUYÊN TIẾNG ANH - KHỎI DỊCH]',
    desc: 'Tất cả các hệ Pokémon (Fire, Water, Grass, Electric, Dragon...) và vùng đất (Unova...) được giữ nguyên tiếng Anh chuẩn quốc tế.'
  },
  '02_MOVE_NAMES': {
    title: '2. Tên Chiêu thức Pokémon (Move Names)',
    status: '🔒 [GIỮ NGUYÊN TIẾNG ANH - KHỎI DỊCH]',
    desc: 'Tất cả tên chiêu thức (Ember, Flamethrower, Thunderbolt, Hydro Pump, Razor Leaf, Shadow Ball...) giữ nguyên tiếng Anh gốc chuẩn Pokémon.'
  },
  '03_MOVE_DESCRIPTIONS': {
    title: '3. Mô tả Chiêu thức (Move Descriptions)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Giải thích cách thức tung chiêu, số tia đòn, hiệu ứng thiêu đốt/đóng băng/trúng độc, phạm vi sát thương... Bạn có thể sửa câu từ cho mượt mà, chuẩn phong cách game.'
  },
  '04_ITEM_NAMES': {
    title: '4. Tên Trang bị mang theo (Hold Items)',
    status: '🔒 [GIỮ NGUYÊN TIẾNG ANH - KHỎI DỊCH]',
    desc: 'Tên các trang bị chính thống (Leftovers, Choice Band, Focus Sash, Life Orb, Quick Claw, Assault Vest...) giữ nguyên tiếng Anh.'
  },
  '05_ITEM_DESCRIPTIONS': {
    title: '5. Mô tả Trang bị (Item Descriptions)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Mô tả tác dụng hồi phục máu, tăng sức tấn công, giảm hồi chiêu, giữ mạng 1 HP khi bị dồn sát thương...'
  },
  '06_LEVEL_UP': {
    title: '6. Thẻ lên cấp & Tiến hóa (Level-Up Cards & Evolution)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Thông báo tiến hóa, học chiêu thức mới, tăng cấp sao, nâng cấp sát thương/phạm vi/tốc độ.'
  },
  '07_PERMANENT_UPGRADES': {
    title: '7. Nâng cấp vĩnh viễn (Permanent Upgrades)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Các chỉ số nâng cấp chung cho nhân vật: Sinh lực, Sức mạnh, Tốc độ, May mắn, Trí tuệ...'
  },
  '08_ARENAS_MAPS': {
    title: '8. Bản đồ & Khu vực (Arenas & Maps)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Tên các đấu trường: Đồng cỏ Vĩnh cửu, Núi lửa Rực lửa, Rừng rậm Ngọc lục bảo, Động Pha lê...'
  },
  '09_KECLEON_ABILITIES': {
    title: '9. Cửa hàng Kecleon, Đặc tính & Bản tính (Kecleon Shop & Abilities)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Mua bán bạc hà thay đổi bản tính, viên nang đặc tính, và mô tả tác dụng của từng đặc tính Pokémon.'
  },
  '10_GACHA_ORBS': {
    title: '10. Quay Gacha & Ngọc thần bí (Gacha & Mystery Orbs)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Quay gacha x1, x10, x100, ngọc ru ngủ, ngọc hóa đá, ngọc hồi máu từ Dungeon.'
  },
  '11_ACCOUNT_LOGIN': {
    title: '11. Tài khoản, Đăng nhập & Lưu Đám mây (Account & Cloud Save)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Đăng nhập, tạo tài khoản, đồng bộ đám mây tự động, thông báo lưu dữ liệu.'
  },
  '12_COMBAT_ALERTS': {
    title: '12. Cảnh báo trong trận & Sự kiện (In-Game Combat Alerts)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Cảnh báo Boss xuất hiện, Pokémon Shiny xuất hiện, Đợt horda quái vật, Giờ vàng nhân đôi kinh nghiệm, Khe nứt huyền thoại...'
  },
  '13_PAUSE_END': {
    title: '13. Tạm dừng & Kết thúc trận đấu (Pause & Game Over)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Tạm dừng, Bỏ cuộc, Thống kê sát thương từng chiêu, DPS, tổng thời gian sống sót, tiền thưởng.'
  },
  '14_MAIN_MENU': {
    title: '14. Giao diện Menu chính (Main Menu & Navigation)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Các nút chức năng: Chơi, Pokémon, Bộ sưu tập, Nâng cấp, Cửa hàng, Túi đồ, Bảng xếp hạng, Cài đặt...'
  },
  '15_MISSIONS_PROFILE': {
    title: '15. Nhiệm vụ, Hồ sơ & Thành tựu (Missions, Profile & Achievements)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Nhiệm vụ hàng ngày, nhiệm vụ tuần, huy hiệu, kỷ lục sống sót cao nhất của từng Pokémon.'
  },
  '16_FRIENDS_COOP': {
    title: '16. Bạn bè, Phòng chờ & Co-op (Friends & Multiplayer)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Chủ phòng, Đã kết nối, Mời bạn bè, Bắt đầu trò chơi, thông báo đồng đội hồi sinh, chia sẻ EXP...'
  },
  '17_LEADERBOARDS': {
    title: '17. Bảng xếp hạng (Leaderboards & Rankings)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Bảng xếp hạng ngày, tuần, tháng, năm, toàn thời gian, sát thương gây lên Arceus.'
  },
  '18_SETTINGS': {
    title: '18. Cài đặt, Đồ họa, Âm thanh & Điều khiển (Settings & Controls)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Âm lượng nhạc, hiệu ứng, tùy chỉnh tay cầm (gamepad), nhắm bắn thủ công, rung phản hồi...'
  },
  '19_HALLOWEEN': {
    title: '19. Sự kiện Halloween (Halloween Event)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Khu vườn bí ngô, đếm ngược sự kiện, quái vật bí ngô ma quái.'
  },
  '20_CHANGELOG': {
    title: '20. Nhật ký cập nhật & Bản vá (Changelog & Updates)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Nội dung các bản cập nhật mới, sửa lỗi và tính năng mới.'
  },
  '21_GENERAL_TEXT': {
    title: '21. Các văn bản & Giao diện chung khác (General UI & Miscellaneous)',
    status: '✏️ [CẦN VIỆT HÓA - BẠN TỰ DO CHỈNH SỬA]',
    desc: 'Các nút Xác nhận, Hủy, Đóng, Lỗi kết nối, và các nhãn phụ trợ trong game.'
  }
};

// Escape markdown table special characters
function escapeMd(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/\r\n|\n|\r/g, '<br>')
    .replace(/\|/g, '\\|');
}

const allKeys = Object.keys(vi);
const categorized = {};
for (const sec of Object.keys(SECTION_METADATA)) categorized[sec] = [];

let idCounter = 1;
const mapData = {};

for (const key of allKeys) {
  const viText = vi[key] || '';
  const enText = en[key] || key;
  const cat = getCategory(key, enText, viText);
  const entry = {
    id: idCounter++,
    key: key,
    en: enText,
    vi: viText
  };
  (categorized[cat] || categorized['21_GENERAL_TEXT']).push(entry);
  mapData[entry.id] = { key: entry.key, en: entry.en, vi: entry.vi };
}

// Build Markdown
let md = `# BẢN DỊCH GAME POKÉSURVIVOR (VITRAINER)\n\n`;

md += `> [!IMPORTANT]\n`;
md += `> ### 📌 QUY TẮC PHÂN ĐỊNH RÕ RÀNG (THEO YÊU CẦU CỦA BẠN):\n`;
md += `>\n`;
md += `> 🔒 **CÁC PHẦN GIỮ NGUYÊN TIẾNG ANH (KHỎI CẦN DỊCH / KHÔNG SỬA):**\n`;
md += `> 1. **Tên Hệ Pokémon (Types)** (Phần 1): *Fire, Water, Grass, Electric, Dragon, Steel, Ghost, Fairy, Ice...*\n`;
md += `> 2. **Tên Chiêu thức Pokémon (Move Names)** (Phần 2): *Ember, Flamethrower, Fire Blast, Hydro Pump, Thunderbolt, Razor Leaf, Shadow Ball, Close Combat, Swords Dance...*\n`;
md += `> 3. **Tên Trang bị mang theo (Hold Items)** (Phần 4): *Leftovers, Choice Band, Focus Sash, Quick Claw, Life Orb, Assault Vest, Shell Bell...*\n`;
md += `> 4. **Tên các Pokémon**: *Pikachu, Charmander, Squirtle, Machamp, Arceus...* (được giữ gốc 100% trong code game).\n`;
md += `> 5. **Các thuật ngữ quen thuộc**: *Shiny, Solo, Co-op, Host, DPS, HP, Exp...*\n`;
md += `>\n`;
md += `> ✏️ **CÁC PHẦN CẦN VIỆT HÓA (BẠN TỰ DO CHỈNH SỬA CỘT TIẾNG VIỆT):**\n`;
md += `> 1. **Mô tả chiêu thức** (Phần 3): Cách thi triển, gây sát thương, thiêu đốt, làm choáng, hiệu ứng buff.\n`;
md += `> 2. **Mô tả trang bị** (Phần 5): Hồi máu mỗi giây, tăng công, giảm hồi chiêu, giữ mạng 1 HP.\n`;
md += `> 3. **Thẻ lên cấp & Tiến hóa** (Phần 6): Tiến hóa, Thẻ mới, Nâng cấp chỉ số.\n`;
md += `> 4. **Nâng cấp vĩnh viễn** (Phần 7): Sinh lực, Sức mạnh, Tốc độ, May mắn...\n`;
md += `> 5. **Bản đồ & Khu vực** (Phần 8): Tên các đấu trường và vùng đất bí ẩn.\n`;
md += `> 6. **Cửa hàng Kecleon & Đặc tính** (Phần 9): Mua bán bạc hà, tác dụng của Đặc tính (Abilities) và Bản tính (Natures).\n`;
md += `> 7. **Quay Gacha & Ngọc** (Phần 10): Quay x1, x10, x100, ngọc ru ngủ, ngọc hóa đá.\n`;
md += `> 8. **Giao diện toàn game** (Phần 11-18): Menu chính, Bạn bè, Phòng chờ Co-op, Bảng xếp hạng, Cài đặt, Nhiệm vụ, Cảnh báo chiến đấu, Màn hình tạm dừng/kết thúc.\n`;
md += `> 9. **Sự kiện & Nhật ký cập nhật** (Phần 19-21): Halloween, thông báo bản vá.\n\n`;

md += `> [!TIP]\n`;
md += `> **Cách chỉnh sửa:**\n`;
md += `> - Mở file này, tìm đến các mục có gắn nhãn ✏️ **[CẦN VIỆT HÓA]** và sửa trực tiếp chữ ở cột **Tiếng Việt (VI)**.\n`;
md += `> - Các mục có nhãn 🔒 **[GIỮ NGUYÊN TIẾNG ANH - KHỎI DỊCH]** bạn cứ để nguyên.\n`;
md += `> - Giữ nguyên số **#** ở cột đầu tiên (đây là ID khóa định danh để hệ thống nạp lại vào game).\n`;
md += `> - Các ký hiệu \`{x}\`, \`<b>\`, \`</b>\` là biến số của game, vui lòng giữ nguyên vị trí trong câu.\n`;
md += `> - Sửa xong, bạn chỉ cần báo **"Đồng bộ bản dịch từ file md"** là game sẽ tự động cập nhật ngay lập tức!\n\n`;

md += `---\n\n`;

for (const [secKey, meta] of Object.entries(SECTION_METADATA)) {
  const items = categorized[secKey] || [];
  if (!items.length) continue;

  md += `## ${meta.title} ${meta.status}\n\n`;
  md += `> *${meta.desc}*\n\n`;
  md += `| # | Tiếng Anh (EN) | Tiếng Việt (VI) |\n`;
  md += `| :---: | :--- | :--- |\n`;

  for (const item of items) {
    md += `| ${item.id} | ${escapeMd(item.en)} | ${escapeMd(item.vi)} |\n`;
  }
  md += `\n`;
}

fs.writeFileSync(path.join(ROOT, 'TRANSLATIONS.md'), md, 'utf8');
fs.writeFileSync(path.join(ROOT, 'tools/translation_map.json'), JSON.stringify(mapData, null, 2), 'utf8');
console.log(`Generated TRANSLATIONS.md with ${allKeys.length} strings across ${Object.keys(SECTION_METADATA).length} sections!`);
