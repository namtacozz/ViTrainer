const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const mapFile = path.join(ROOT, 'tools/translation_map.json');
const mdFile = path.join(ROOT, 'TRANSLATIONS.md');
const viFile = path.join(ROOT, 'js/data/lang-vi.js');

if (!fs.existsSync(mapFile) || !fs.existsSync(mdFile)) {
  console.error('Missing translation_map.json or TRANSLATIONS.md');
  process.exit(1);
}

const mapData = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
const mdContent = fs.readFileSync(mdFile, 'utf8');

// Parse markdown table rows: | # | EN | VI |
const updatedViById = {};
const lines = mdContent.split(/\r?\n/);

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|')) continue;
  const parts = trimmed.split('|').map(s => s.trim());
  // Expected parts: ['', id, en, vi, '']
  if (parts.length < 4) continue;
  const idStr = parts[1];
  const id = parseInt(idStr, 10);
  if (isNaN(id)) continue; // Header or separator row

  // Unescape <br> back to \n if needed, unescape \|
  let viVal = parts[3].replace(/<br>/g, '\n').replace(/\\\|/g, '|');
  updatedViById[id] = viVal;
}

// Load existing lang-vi.js
const currentVi = {};
const sbVi = { G: { I18n: { add: (d) => Object.assign(currentVi, d) } }, console };
sbVi.window = sbVi;
vm.createContext(sbVi);
vm.runInContext(fs.readFileSync(viFile, 'utf8'), sbVi);

// Update translations from parsed markdown
let changedCount = 0;
for (const [id, entry] of Object.entries(mapData)) {
  const newVi = updatedViById[id];
  if (newVi !== undefined && newVi !== currentVi[entry.key]) {
    currentVi[entry.key] = newVi;
    changedCount++;
  }
}

// Re-serialize lang-vi.js preserving nice formatting
const header = `/* ============ lang-vi.js — Bản dịch tiếng Việt ============
 * Tự động tạo và đồng bộ từ TRANSLATIONS.md
 */
G.I18n.add({
`;

const body = Object.entries(currentVi).map(([k, v]) => {
  return `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`;
}).join(',\n');

const footer = `\n}, 'vi');\n`;

fs.writeFileSync(viFile, header + body + footer, 'utf8');
console.log(`Successfully synced! Updated ${changedCount} translation strings in lang-vi.js.`);

// Run build_langs.js to update js/lang/vi.js
require('./build_langs.js');
console.log('Regenerated js/lang/vi.js successfully.');
