/* Xuất dữ liệu trò chơi ra tệp JSON để phục vụ việc tạo các trang SEO tĩnh (make_seo_pages.py).
 *   node tools/export_data.js  ->  tools/cache/gamedata.json
 * Tải các tệp dữ liệu tương tự như trò chơi trong môi trường cô lập VM. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const noop = () => {};
const fakeCtx = new Proxy({}, { get: () => noop });
const G = {};
const sandbox = {
  G, window: {}, console, Math, JSON, Date, Map, Set, Object, Array, Number, String, RegExp, Promise, Symbol, Infinity, NaN, isFinite, parseInt, parseFloat,
  location: { pathname: '/', protocol: 'file:' }, navigator: { language: 'vi', languages: ['vi', 'en'] }, localStorage: { getItem: () => 'vi', setItem: noop },
  document: { documentElement: {}, createElement: () => ({ getContext: () => fakeCtx, width: 0, height: 0 }), addEventListener: noop, querySelector: () => null, body: {}, write: noop },
  addEventListener: noop, matchMedia: () => ({ matches: false }), CanvasRenderingContext2D: function () {}, Image: function () {}, performance: { now: () => 0 },
  setTimeout: noop, setInterval: noop, requestAnimationFrame: noop
};
sandbox.window = sandbox;
vm.createContext(sandbox);
const load = f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sandbox, { filename: f });
const EN = {};
const VI = {};
for (const f of ['js/core/locales.js', 'js/core/util.js', 'js/core/i18n.js']) load(f);

// Thu thập từ điển Tiếng Anh và Tiếng Việt
const add = G.I18n.add;
G.I18n.add = (d, language = 'en', context = '') => {
  if (language === 'en' && !context) Object.assign(EN, d);
  if (language === 'vi' && !context) Object.assign(VI, d);
  add(d, language, context);
};

for (const f of ['js/data/lang-en.js', 'js/data/lang-vi.js', 'js/data/lang-updates.js', 'js/core/settings.js', 'js/data/pokedex.js', 'js/data/megas.js', 'js/data/sprites-meta.js', 'js/data/moves.js', 'js/data/types.js',
                 'js/data/items.js', 'js/systems/orbs.js', 'js/data/achievements.js', 'js/world/tiles.js', 'js/data/funding.js',
                 'js/data/changelog.js']) {
  try { load(f); } catch (e) { console.warn('Cảnh báo nạp tệp:', f, e.message); }
}
const moves = Object.values(G.Moves.BY_ID).map(m => {
  const inst = G.Moves.instance(m.id, m.maxLvl || 5);
  const evo = G.Moves.evoInfo(inst, {});
  return { id: m.id, name: m.name, type: m.type, kind: m.kind, cat: m.cat || null, desc: m.desc, maxLvl: m.maxLvl, evo: evo ? { name: evo.name, needs: evo.needName, text: evo.text } : null };
});
const out = {
  dex: G.DEX,
  legends: G.DEX.filter(p => p.leg).map(p => p.dex),
  moves,
  items: (G.Items.LIST || []).map(i => ({ id: i.id, name: i.name, desc: i.desc })),
  orbs: (G.Orbs ? G.Orbs.LIST : []).map(o => ({ id: o.id, name: o.name, desc: o.desc })),
  achievements: (G.AchDefs.LIST || []).map(a => ({ id: a.id, cat: a.cat, name: a.name, desc: a.desc, tier: a.tier, title: a.title || '', reward: a.reward || {} })),
  achCats: G.AchDefs.CATS || null,
  types: G.Types.CHART,
  typeColor: G.U.TYPE_COLOR,
  typeName: G.U.TYPE_NAME,
  typeOrder: Object.keys(G.U.TYPE_NAME),
  matrix: Object.fromEntries(Object.keys(G.U.TYPE_NAME).map(a => [a, Object.fromEntries(Object.keys(G.U.TYPE_NAME).map(d => [d, G.Types.mult(a, [d])]))])),
  arenas: Object.fromEntries(Object.entries(G.ARENA_THEMES || (G.Tiles && G.Tiles.ARENA_THEMES) || {}).filter(([k]) => k !== 'judgment').map(([k, v]) => [k, v.name])),
  funding: { kofi: G.Funding.kofi, sponsors: G.Funding.sponsors, costs: G.Funding.costs },
  changelog: G.CHANGELOG || [],
  en: EN,
  vi: VI
};
fs.mkdirSync(path.join(__dirname, 'cache'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'cache', 'gamedata.json'), JSON.stringify(out));
console.log('Thành công xuất dữ liệu:', out.dex.length, 'Pokémon,', out.moves.length, 'chiêu thức,', out.items.length, 'vật phẩm,', out.achievements.length, 'thành tựu,',
  Object.keys(out.arenas).length, 'đấu trường,', Object.keys(out.vi).length, 'từ điển Tiếng Việt,', Object.keys(out.en).length, 'từ điển Tiếng Anh');
