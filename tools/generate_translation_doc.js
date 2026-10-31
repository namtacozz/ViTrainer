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

const sbEn = { G: { I18n: { add: (d) => Object.assign(en, d) } }, console };
sbEn.window = sbEn;
vm.createContext(sbEn);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/data/lang-en.js'), 'utf8'), sbEn);
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
  if (TYPES.includes(key)) return '01_TYPES_REGIONS';

  // Moves & Descriptions
  if (key === 'Ascuas' || key === 'Lanzallamas' || key === 'Placaje' || key === 'Surf' || key.includes('perforantes') || key.includes('ataque') || key.includes('daño') && key.length > 50 && (enVal.includes('damage') || enVal.includes('leaves') || enVal.includes('punch') || enVal.includes('beam') || enVal.includes('burst'))) {
    // If it's a move description or name
  }

  // Let's use structural rules based on key position or keyword
  const lk = key.toLowerCase();
  const le = (enVal || '').toLowerCase();

  // Evolution / Level up
  if (key === 'EVOLUCION' || key === 'Evoluciona' || key === 'Mejora' || key.startsWith('Nuevo ·') || key.includes('nivel') || le.includes('level up') || le.includes('evolves') || le.includes('evolution')) {
    return '04_LEVEL_UP';
  }

  // Items
  if (key === 'Restos' || key === 'Cinta Elección' || key === 'Garra Rápida' || key === 'Banda Focus' || key === 'Vidasfera' || key === 'Cascabel Alivio' || key === 'Imán' || key === 'Chaleco Asalto' || key === 'Perla Grande' || key === 'Moneda Amuleto' || key === 'Gafas Especiales' || le.includes('leftovers') || le.includes('choice band') || le.includes('focus sash') || le.includes('life orb')) {
    return '03_ITEMS';
  }

  // Permanent Upgrades
  if (key === 'Vitalidad' || key === 'Fuerza' || key === 'Zancada' || key === 'Fortuna' || key === 'Sabiduría' || key === 'Repertorio' || le.includes('vitality') || le.includes('stride') || le.includes('fortune') || le.includes('repertoire')) {
    return '05_PERMANENT_UPGRADES';
  }

  // Arenas / Maps
  if (key === 'Pradera Eterna' || key === 'Volcán Ígneo' || key === 'Gruta Marina' || key === 'Selva Esmeralda' || key === 'Desierto Tormenta' || key === 'Cueva Cristal' || key === 'Pico Helado' || key === 'Cementerio Sombrío' || key === 'Ruinas del Juicio' || key.includes('Huerto de Calabazas') || le.includes('meadow') || le.includes('volcano') || le.includes('grotto') || le.includes('jungle')) {
    return '06_ARENAS_MAPS';
  }

  // Kecleon Shop & Natures / Abilities
  if (key.includes('Kecleon') || le.includes('kecleon') || key.includes('naturaleza') || le.includes('nature') || key.includes('habilidad') || le.includes('ability') || key.startsWith('+35 %') || key.startsWith('+20 %') || key.startsWith('+10 %')) {
    return '07_KECLEON_ABILITIES';
  }

  // Gacha & Orbs
  if (key.includes('Gacha') || key.includes('gacha') || key.includes('Tirada') || le.includes('gacha') || le.includes('pull') || key.includes('esfera') || key.includes('Esfera') || le.includes('orb')) {
    return '08_GACHA_ORBS';
  }

  // Halloween
  if (key.includes('Halloween') || le.includes('halloween') || key.includes('Calabaza') || le.includes('pumpkin')) {
    return '16_HALLOWEEN';
  }

  // Changelog & Updates
  if (key.includes('Arreglos') || key.includes('Cambios') || key.includes('Nuevo') && key.length < 15 || key.includes('2026-10') || key.includes('Versión') || le.includes('fixes') || le.includes('changes') || key.length > 120 && (key.includes('Móvil:') || key.includes('Guardado en la nube:') || key.includes('Cooperativo:') || key.includes('Gacha con mando:'))) {
    return '17_CHANGELOG';
  }

  // Multiplayer / Friends / Room
  if (key.includes('sala') || key.includes('amigo') || key.includes('compañero') || key.includes('invitación') || key.includes('anfitrión') || le.includes('room') || le.includes('friend') || le.includes('teammate') || le.includes('host') || le.includes('co-op') || le.includes('lobby')) {
    return '13_FRIENDS_COOP';
  }

  // Leaderboards
  if (key.includes('ranking') || key.includes('Ranking') || key.includes('clasificación') || le.includes('leaderboard') || le.includes('rank') || le.includes('survival time') || key === 'Diario' || key === 'Semanal' || key === 'Mensual' || key === 'Anual' || key === 'Histórico') {
    return '14_LEADERBOARDS';
  }

  // Settings & Controls
  if (key.includes('Ajustes') || key.includes('Sonido') || key.includes('Gráficos') || key.includes('Controles') || key.includes('Música') || key.includes('Efectos') || le.includes('settings') || le.includes('sound') || le.includes('graphics') || le.includes('controls') || le.includes('volume') || le.includes('joystick') || le.includes('gamepad')) {
    return '15_SETTINGS';
  }

  // Missions & Achievements
  if (key.includes('Misiones') || key.includes('Logros') || key.includes('Perfil') || key.includes('Medalla') || le.includes('achievement') || le.includes('mission') || le.includes('profile') || le.includes('badge')) {
    return '12_MISSIONS_PROFILE';
  }

  // Login & Account
  if (key.includes('sesión') || key.includes('cuenta') || key.includes('contraseña') || key.includes('correo') || key.includes('nube') || le.includes('log in') || le.includes('sign up') || le.includes('password') || le.includes('account') || le.includes('cloud')) {
    return '09_ACCOUNT_LOGIN';
  }

  // In-Game Alerts & Combat
  if (key.startsWith('¡') || key.includes('apareció') || key.includes('salvaje') || key.includes('horda') || key.includes('Horda') || le.includes('appeared') || le.includes('wild') || le.includes('horde') || le.includes('power!')) {
    return '10_COMBAT_ALERTS';
  }

  // Pause & End Run
  if (key === 'Pausa' || key === 'Continuar' || key === 'Abandonar run' || key.includes('Derrotado') || key.includes('Victoria') || le.includes('pause') || le.includes('continue') || le.includes('quit run') || le.includes('game over') || le.includes('victory') || key.includes('Resumen')) {
    return '11_PAUSE_END';
  }

  // Main Menu & Navigation
  if (key === 'Jugar' || key === 'Pokémon' || key === 'Colección' || key === 'Tienda' || key === 'Bolsa' || key === 'Salir' || le.includes('play') || le.includes('collection') || le.includes('bag') || le.includes('exit')) {
    return '02_MAIN_MENU';
  }

  // Default to Moves / Descriptions if it looks like a move or general text
  if (key.length < 35 && !key.includes('<')) {
    return '02_MOVES_GENERAL';
  }

  return '18_GENERAL_TEXT';
}

const SECTION_TITLES = {
  '01_TYPES_REGIONS': '1. Hệ Pokémon & Vùng đất (Types & Regions)',
  '02_MOVES_GENERAL': '2. Chiêu thức Pokémon & Mô tả (Moves & Descriptions)',
  '03_ITEMS': '3. Vật phẩm & Trang bị (Items & Hold Items)',
  '04_LEVEL_UP': '4. Thẻ lên cấp & Tiến hóa (Level-Up Cards & Evolution)',
  '05_PERMANENT_UPGRADES': '5. Nâng cấp vĩnh viễn (Permanent Upgrades)',
  '06_ARENAS_MAPS': '6. Bản đồ & Khu vực (Arenas & Maps)',
  '07_KECLEON_ABILITIES': '7. Cửa hàng Kecleon, Đặc tính & Bản tính (Kecleon Shop & Abilities)',
  '08_GACHA_ORBS': '8. Quay Gacha & Ngọc thần bí (Gacha & Mystery Orbs)',
  '09_ACCOUNT_LOGIN': '9. Tài khoản, Đăng nhập & Lưu trữ Đám mây (Account & Cloud Save)',
  '10_COMBAT_ALERTS': '10. Cảnh báo trong trận & Sự kiện (In-Game Combat Alerts)',
  '11_PAUSE_END': '11. Tạm dừng & Kết thúc trận đấu (Pause & Game Over)',
  '02_MAIN_MENU': '12. Giao diện Menu chính (Main Menu & Navigation)',
  '12_MISSIONS_PROFILE': '13. Nhiệm vụ, Hồ sơ & Thành tựu (Missions, Profile & Achievements)',
  '13_FRIENDS_COOP': '14. Bạn bè, Phòng chờ & Chơi nhóm Co-op (Friends & Multiplayer)',
  '14_LEADERBOARDS': '15. Bảng xếp hạng (Leaderboards & Rankings)',
  '15_SETTINGS': '16. Cài đặt, Đồ họa, Âm thanh & Điều khiển (Settings & Controls)',
  '16_HALLOWEEN': '17. Sự kiện Halloween (Halloween Event)',
  '17_CHANGELOG': '18. Nhật ký cập nhật & Bản vá (Changelog & Updates)',
  '18_GENERAL_TEXT': '19. Các văn bản & Giao diện chung khác (General UI & Miscellaneous)'
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
for (const sec of Object.keys(SECTION_TITLES)) categorized[sec] = [];

let idCounter = 1;
const mapData = {};

for (const key of allKeys) {
  const viText = vi[key] || '';
  const enText = en[key] || key; // fallback to key
  const cat = getCategory(key, enText, viText);
  const entry = {
    id: idCounter++,
    key: key,
    en: enText,
    vi: viText
  };
  (categorized[cat] || categorized['18_GENERAL_TEXT']).push(entry);
  mapData[entry.id] = { key: entry.key, en: entry.en, vi: entry.vi };
}

// Build Markdown
let md = `# BẢN DỊCH GAME POKÉSURVIVOR (VITRAINER)\n\n`;
md += `> **Mục đích:** File này chứa toàn bộ **${allKeys.length} chuỗi dịch thuật** của game với 2 cột **Tiếng Anh (EN)** và **Tiếng Việt (VI)** để bạn dễ dàng rà soát và chỉnh sửa.\n`;
md += `> **Cách chỉnh sửa:**\n`;
md += `> 1. Bạn có thể sửa trực tiếp nội dung ở cột **Tiếng Việt (VI)** theo ý muốn.\n`;
md += `> 2. Giữ nguyên số thứ tự **#** ở cột đầu tiên (dùng để định danh chuỗi tương ứng trong game).\n`;
md += `> 3. Các ký hiệu như \`{x}\`, \`<b>\`, \`</b>\`, \`<br>\` là biến số hoặc định dạng của game, vui lòng giữ nguyên vị trí.\n`;
md += `> 4. Sau khi sửa xong, chỉ cần thông báo để hệ thống tự động đồng bộ lại vào game và deploy lên web!\n\n`;
md += `---\n\n`;

for (const [secKey, secTitle] of Object.entries(SECTION_TITLES)) {
  const items = categorized[secKey] || [];
  if (!items.length) continue;

  md += `## ${secTitle}\n\n`;
  md += `| # | Tiếng Anh (EN) | Tiếng Việt (VI) |\n`;
  md += `| :---: | :--- | :--- |\n`;

  for (const item of items) {
    md += `| ${item.id} | ${escapeMd(item.en)} | ${escapeMd(item.vi)} |\n`;
  }
  md += `\n`;
}

fs.writeFileSync(path.join(ROOT, 'TRANSLATIONS.md'), md, 'utf8');
fs.writeFileSync(path.join(ROOT, 'tools/translation_map.json'), JSON.stringify(mapData, null, 2), 'utf8');
console.log(`Generated TRANSLATIONS.md with ${allKeys.length} strings across ${Object.keys(SECTION_TITLES).length} sections!`);
