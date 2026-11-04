/* ============ ability-fx.js — qué hace cada habilidad en el juego ============
 * (20-10-2026, del PR #236 de TheAdro7, adaptado a este juego.)
 *
 * Los nombres están en data/abilities.js. Aquí, el efecto en PokéSurvivor de las
 * que tienen sentido en un survivor; las demás dan una pasiva sencilla de su tipo
 * principal (+8 % de daño con sus movimientos), con su nombre de siempre.
 *
 * Ganchos (todos opcionales):
 *   start(pl)             al empezar la partida (stats fijos)
 *   out(pl, m, e)         × al daño que hace el movimiento m al enemigo e (combat.js)
 *   hit(pl, e, m)         ha golpeado a e (después del daño)
 *   inMul(pl, type, cls)  × al daño que recibe (cls 'p' físico, 's' especial)
 *   absorb: 'tipo'        ese tipo no le hace daño: le cura un poco
 *   dodge(pl, type, cls)  probabilidad de esquivar un golpe
 *   hurt(pl, type, cls)   le acaban de golpear
 *   contact(pl, e)        un enemigo le ha golpeado cuerpo a cuerpo
 *   tick(pl, dt)          cada fotograma
 *   kill(pl, e)           ha caído un enemigo
 *   speed(pl)             × a la velocidad
 *   healMul               × a lo que le curan
 *   statusCd              × a la recarga de los potenciadores · cdMul × a todas
 *   critMul               daño del crítico (normal ×1,5)
 *   summon: 'clima'       pone su clima al empezar y cada 3 min (si no hay otro)
 *   levitate / steady / sturdy / sheer / serene / lavaProof / damp / touchPoison  (marcas)
 * Las descripciones van en español; las traducciones, en lang-en.js y lang-updates.js
 * (muchas son el mismo texto con otro tipo: '+20 % de daño con movimientos de tipo {x}.').
 */
G.AbilityFX = (() => {
  const low = pl => pl.hp < pl.maxHp / 3;
  const half = pl => pl.hp < pl.maxHp / 2;
  const wx = () => (G.Weather.current || {}).kind;
  const mult = (type, types) => G.Types.mult(type, types || []);
  const cls = m => (m && m.cat === 'physical' ? 'p' : m && m.cat === 'special' ? 's' : '');
  const TN = t => G.U.TYPE_NAME[t];
  const heal = (pl, k) => { pl.hp = Math.min(pl.maxHp, pl.hp + pl.maxHp * k); };

  const pinch = type => ({ d: '+35 % de daño de tipo ' + TN(type) + ' con poca vida (menos de 1/3).',
    out: (pl, m) => (m.type === type && low(pl) ? 1.35 : 1) });
  const boost = type => ({ d: '+20 % de daño con movimientos de tipo ' + TN(type) + '.',
    out: (pl, m) => (m.type === type ? 1.2 : 1) });
  const byName = (re, es, k = 1.3) => ({ d: '+' + Math.round((k - 1) * 100) + ' % de daño con ' + es + '.',
    out: (pl, m) => (re.test(m.id) ? k : 1) });
  const absorb = type => ({ d: 'Los ataques de tipo ' + TN(type) + ' no le hacen daño: le curan un poco.', absorb: type });
  const rush = (w, es) => ({ d: '+50 % de velocidad con ' + es + '.', speed: () => (wx() === w ? 1.5 : 1) });
  const summon = (w, es) => ({ d: 'Pone ' + es + ' al empezar la partida y cada 3 minutos.', summon: w });
  const steady = { d: 'No le frenan las trampas pegajosas ni el terreno.', steady: true };
  const moxie = { d: 'Cada enemigo derrotado le da +0,5 % de daño (hasta +15 %).',
    kill: pl => { pl.moxie = Math.min(0.15, (pl.moxie || 0) + 0.005); }, out: pl => 1 + (pl.moxie || 0) };
  const contact = (fn, d) => ({ d, contact: fn });
  const dmgBack = pl => 10 + pl.level * 3;
  const superEff = (pl, type) => type && mult(type, pl.mon.types) > 1;

  const FX = {
    // --- más daño ---
    'overgrow': pinch('grass'), 'blaze': pinch('fire'), 'torrent': pinch('water'), 'swarm': pinch('bug'),
    'steelworker': boost('steel'), 'steely-spirit': boost('steel'),
    'dragons-maw': {
      d: 'Hàm Rồng: +20 % sát thương chiêu thức hệ Dragon và +8 % tỉ lệ chí mạng.',
      out: (pl, m) => (m.type === 'dragon' ? 1.20 : 1),
      start: pl => { pl.critChance += 0.08; }
    },
    'transistor': {
      d: 'Bóng Bán Dẫn: +20 % sát thương chiêu thức hệ Electric và +12 % tốc độ di chuyển.',
      out: (pl, m) => (m.type === 'electric' ? 1.20 : 1),
      speed: () => 1.12
    },
    'water-bubble': { d: 'Bong Bóng Nước: +25 % sát thương hệ Nước và giảm 30 % sát thương hệ Lửa.',
      out: (pl, m) => (m.type === 'water' ? 1.25 : 1), inMul: (pl, type) => (type === 'fire' ? 0.70 : 1) },
    'technician': { d: '+35 % de daño con los ataques de golpes flojos.', out: (pl, m) => ((m.def || m).dmg <= 12 ? 1.35 : 1) },
    'huge-power': { d: '+50 % de daño con movimientos físicos.', out: (pl, m) => (cls(m) === 'p' ? 1.5 : 1) },
    'hustle': { d: '+25 % de daño con movimientos físicos, pero 1 de cada 6 golpes físicos sale flojo.',
      out: (pl, m) => (cls(m) !== 'p' ? 1 : Math.random() < 1 / 6 ? 0.3 : 1.25) },
    'guts': { d: '+30 % de daño físico con menos de la mitad de vida.', out: (pl, m) => (cls(m) === 'p' && half(pl) ? 1.3 : 1) },
    'adaptability': { d: '+25 % de daño con los movimientos de sus tipos.', out: (pl, m) => (pl.mon.types.includes(m.type) ? 1.25 : 1) },
    'protean': { d: 'El tipo del Pokémon se adapta a cada ataque ejecutado, asegurando +25 % de daño STAB.', protean: true, out: () => 1.25 },
    'libero': { d: 'El tipo del Pokémon se adapta a cada ataque ejecutado, asegurando +25 % de daño STAB.', protean: true, out: () => 1.25 },
    'parental-bond': { d: 'Cada ataque golpea una segunda vez tras 0,15 s causando un 35 % de daño.', parentalBond: true },
    'pixilate': { d: 'Los movimientos de tipo Normal se convierten en Hada y hacen +25 % de daño.', pixilate: true, out: (pl, m) => (m.type === 'normal' || m.type === 'fairy' ? 1.25 : 1) },
    'aerilate': { d: 'Los movimientos de tipo Normal se convierten en Volador y hacen +25 % de daño.', aerilate: true, out: (pl, m) => (m.type === 'normal' || m.type === 'flying' ? 1.25 : 1) },
    'refrigerate': { d: 'Los movimientos de tipo Normal se convierten en Hielo và hacen +25 % de daño.', refrigerate: true, out: (pl, m) => (m.type === 'normal' || m.type === 'ice' ? 1.25 : 1) },
    'sheer-force': { d: '+25 % de daño con movimientos que queman, envenenan, frenan o empujan, pero pierden ese efecto.',
      out: (pl, m) => (m.burn || m.poison || m.slow || m.knock ? 1.25 : 1), sheer: true },
    'serene-grace': { d: 'Las quemaduras, venenos y frenazos de sus movimientos son el doble de fuertes.', serene: true },
    'tough-claws': { d: '+35 % de daño con ataques de contacto, cuerpo a cuerpo, mordiscos y cortes.', out: (pl, m) => (m.kind === 'melee' || m.kind === 'dash' || /slash|cut|bite|fang|punch|claw|strike/.test(m.id) ? 1.35 : 1) },
    'reckless': { d: '+25 % de daño con las embestidas.', out: (pl, m) => (m.kind === 'dash' ? 1.25 : 1) },
    'iron-fist': byName(/punch/, 'los puñetazos', 1.25),
    'strong-jaw': byName(/bite|fang|crunch|jaw/, 'los mordiscos'),
    'mega-launcher': byName(/pulse|aura-sphere/, 'los pulsos y esferas'),
    'sharpness': byName(/cut|slash|blade|razor|scissor|sword/, 'los cortes'),
    'punk-rock': byName(/voice|buzz|boom|noise|sing|echo|uproar|snarl/, 'los sonidos'),
    'tinted-lens': { d: 'Sus movimientos poco eficaces hacen daño normal.',
      out: (pl, m, e) => { const k = e ? mult(m.type, e.types) : 1; return k < 1 && k > 0 ? 1 / k : 1; } },
    'scrappy': { d: 'Sus movimientos Normal y Lucha dañan del todo a los Fantasma.',
      out: (pl, m, e) => ((m.type === 'normal' || m.type === 'fighting') && e && (e.types || []).includes('ghost') ? 1 / Math.max(0.3, mult(m.type, e.types)) : 1) },
    'sand-force': { d: '+30 % de daño Roca, Tierra y Acero con tormenta de arena.',
      out: (pl, m) => (wx() === 'sand' && ['rock', 'ground', 'steel'].includes(m.type) ? 1.3 : 1) },
    'solar-power': { d: '+40 % de daño especial con sol, pero el sol le quita algo de vida.',
      out: (pl, m) => (wx() === 'sun' && cls(m) === 's' ? 1.4 : 1),
      tick: (pl, dt) => { if (wx() === 'sun' && pl.hp > pl.maxHp * 0.1) pl.hp -= pl.maxHp * 0.004 * dt; } },
    'sniper': { d: 'Sus golpes críticos hacen ×2 de daño (en vez de ×1,5).', critMul: 2 },
    'super-luck': { d: '+10 % de probabilidad de golpe crítico.', start: pl => { pl.critChance += 0.1; } },
    'compound-eyes': { d: '+6 % de probabilidad de golpe crítico.', start: pl => { pl.critChance += 0.06; } },
    'moxie': moxie,
    'chilling-neigh': {
      d: 'Hí Tiếng Băng Giá: Mỗi kẻ địch bị hạ gục tăng +0.5 % công vật lý (tối đa +15 %).',
      kill: pl => { pl.chillK = Math.min(0.15, (pl.chillK || 0) + 0.005); },
      out: (pl, m) => (cls(m) === 'p' ? 1 + (pl.chillK || 0) : 1)
    },
    'grim-neigh': {
      d: 'Hí Tiếng Hắc Ám: Mỗi kẻ địch bị hạ gục tăng +0.5 % công phép (tối đa +15 %).',
      kill: pl => { pl.grimK = Math.min(0.15, (pl.grimK || 0) + 0.005); },
      out: (pl, m) => (cls(m) === 's' ? 1 + (pl.grimK || 0) : 1)
    },
    'beast-boost': {
      d: 'Tăng Cường Quái Thú: Mỗi kẻ địch hạ gục tăng +0.5 % sát thương (tối đa +15 %) và +0.3 % tốc độ (tối đa +10 %).',
      kill: (pl, e) => {
        pl.beastK = Math.min(0.15, (pl.beastK || 0) + 0.005);
        pl.beastSpd = Math.min(0.10, (pl.beastSpd || 0) + 0.003);
      },
      out: pl => 1 + (pl.beastK || 0),
      speed: pl => 1 + (pl.beastSpd || 0)
    },
    'as-one-glastrier': {
      d: 'Hợp Nhất (Bạch Mã): Áp chế đối thủ (+15 % sát thương) và mỗi hạ gục tăng +0.5 % công vật lý (tối đa +15 %).',
      out: (pl, m) => 1.15 * (1 + (pl.chillK || 0)), inMul: () => 0.90,
      kill: pl => { pl.chillK = Math.min(0.15, (pl.chillK || 0) + 0.005); }
    },
    'as-one-spectrier': {
      d: 'Hợp Nhất (Hắc Mã): Áp chế đối thủ (+15 % sát thương) và mỗi hạ gục tăng +0.5 % công phép (tối đa +15 %).',
      out: (pl, m) => 1.15 * (1 + (pl.grimK || 0)), inMul: () => 0.90,
      kill: pl => { pl.grimK = Math.min(0.15, (pl.grimK || 0) + 0.005); }
    },

    // --- velocidad ---
    'speed-boost': { d: 'Cada 8 segundos gana +3 % de velocidad y -2 % de recarga (hasta +30 % vel, -20 % recarga).',
      tick: (pl, dt) => { pl.boostT = (pl.boostT || 0) + dt; if (pl.boostT >= 8) { pl.boostT = 0; pl.abSpd = Math.min(0.3, (pl.abSpd || 0) + 0.03); pl.abCd = Math.min(0.2, (pl.abCd || 0) + 0.02); } },
      speed: pl => 1 + (pl.abSpd || 0), cdMul: pl => 1 - (pl.abCd || 0) },
    'swift-swim': rush('rain', 'lluvia'), 'chlorophyll': rush('sun', 'sol'),
    'sand-rush': rush('sand', 'tormenta de arena'), 'slush-rush': rush('snow', 'nieve'),
    'run-away': { d: '+8 % de velocidad.', speed: () => 1.08 },

    // --- climas ---
    'drought': {
      d: 'Sequía Devastadora: invoca sol, +35 % daño Fuego y Tierra, inmune a lava y deja magma ardiente al caminar que quema a rivales.',
      summon: 'sun', droughtMagma: true, lavaProof: true,
      out: (pl, m) => (m.type === 'fire' || m.type === 'ground' ? 1.35 : 1)
    },
    'drizzle': {
      d: 'Llovizna Mítica: invoca lluvia, +35 % daño Agua, recupera 1,5 % vida/s en lluvia y descarga rayos celestiales cada 2,5 s.',
      summon: 'rain', drizzleThunder: true,
      out: (pl, m) => (m.type === 'water' ? 1.35 : 1),
      tick: (pl, dt) => { if (wx() === 'rain') heal(pl, 0.015 * dt); }
    },
    'primordial-sea': {
      d: 'Diluvio Primordial: anula movimientos de Fuego, +60 % daño Agua, recupera 2 % vida/s e inunda el campo frenando rivales.',
      summon: 'rain', primordialSeaTide: true,
      out: (pl, m) => (m.type === 'water' ? 1.6 : 1),
      inMul: (pl, type) => (type === 'fire' ? 0 : 0.85),
      tick: (pl, dt) => heal(pl, 0.02 * dt)
    },
    'desolate-land': {
      d: 'Tierra del Ocaso: anula movimientos de Agua, +60 % daño Fuego y Tierra, inmune a lava y ola de calor que quema rivales cada 2,5 s.',
      summon: 'sun', desolateHeat: true, lavaProof: true,
      out: (pl, m) => (m.type === 'fire' || m.type === 'ground' ? 1.6 : 1),
      inMul: (pl, type) => (type === 'water' ? 0 : 0.85)
    },
    'delta-stream': {
      d: 'Ráfaga Delta Primordial: corrientes que otorgan +25 % vel, +50 % daño Volador y Dragón, anula debilidades y genera vórtices protectores.',
      lavaProof: true, steady: true, speed: () => 1.25, deltaStreamVortex: true,
      out: (pl, m) => (m.type === 'flying' || m.type === 'dragon' ? 1.5 : 1),
      inMul: (pl, type) => (['electric', 'ice', 'rock'].includes(type) ? 0.6 : 0.85)
    },
    'orichalcum-pulse': {
      d: 'Latido Oricalco: desata sol prehistórico, +40 % daño físico, +20 % velocidad y ondas de choque incandescentes.',
      summon: 'sun', speed: () => 1.2, out: (pl, m) => (cls(m) === 'p' ? 1.4 : 1), orichalcumPulse: true
    },
    'sand-stream': summon('sand', 'una tormenta de arena'), 'snow-warning': summon('snow', 'nieve'),
    'rain-dish': { d: 'Con lluvia recupera un 1,5 % de vida por segundo.', tick: (pl, dt) => { if (wx() === 'rain') heal(pl, 0.015 * dt); } },
    'ice-body': { d: 'Con nieve recupera un 1,5 % de vida por segundo.', tick: (pl, dt) => { if (wx() === 'snow') heal(pl, 0.015 * dt); } },
    'dry-skin': { d: 'El Agua le cura y con lluvia recupera vida, pero el Fuego le hace un 25 % más.',
      absorb: 'water', inMul: (pl, type) => (type === 'fire' ? 1.25 : 1), tick: (pl, dt) => { if (wx() === 'rain') heal(pl, 0.012 * dt); } },

    // --- defensa ---
    'levitate': { d: 'Flota: no le afectan el agua, la lava ni las trampas, y la Tierra le hace muy poco.',
      levitate: true, inMul: (pl, type) => (type === 'ground' ? 0.3 : 1) },
    'thick-fat': { d: 'Recibe un 40 % menos de daño de Fuego y Hielo.', inMul: (pl, type) => (type === 'fire' || type === 'ice' ? 0.6 : 1) },
    'heatproof': { d: 'Recibe la mitad de daño de Fuego.', inMul: (pl, type) => (type === 'fire' ? 0.5 : 1) },
    'water-absorb': absorb('water'), 'storm-drain': absorb('water'), 'volt-absorb': absorb('electric'),
    'lightning-rod': absorb('electric'), 'motor-drive': absorb('electric'), 'flash-fire': absorb('fire'),
    'well-baked-body': absorb('fire'), 'sap-sipper': absorb('grass'), 'earth-eater': absorb('ground'),
    'multiscale': {
      d: 'Multiescama Dracónica: con más del 65 % de vida recibe la mitad de daño y al ser golpeado desata vientos que repelen.',
      multiscale: true,
      inMul: pl => (pl.hp >= pl.maxHp * 0.65 ? 0.5 : 1)
    },
    'shadow-shield': {
      d: 'Escudo de Luna Primordial: con más del 60 % de vida recibe mitad de daño; cada 25 s un velo lunar anula un golpe y ciega a rivales.',
      shadowShield: true,
      inMul: pl => (pl.hp >= pl.maxHp * 0.6 ? 0.5 : 1)
    },
    'filter': { d: 'Los ataques muy eficaces le hacen un 25 % menos.', inMul: (pl, type) => (superEff(pl, type) ? 0.75 : 1) },
    'solid-rock': { d: 'Los ataques muy eficaces le hacen un 25 % menos.', inMul: (pl, type) => (superEff(pl, type) ? 0.75 : 1) },
    'prism-armor': {
      d: 'Armadura Prisma: recibe un 25 % menos de daño (40 % menos en supereficaz) y refracta rayos láser prismáticos cada 2,5 s.',
      prismArmor: true,
      inMul: (pl, type) => (superEff(pl, type) ? 0.60 : 0.75)
    },
    'neuroforce': {
      d: 'Fuerza Cerebral: +30 % daño (+60 % adicional en golpes supereficaces) y desata una supernova de fotones en 260 px cada 3,5 s.',
      neuroforce: true,
      out: () => 1.30
    },
    'mind-eye': {
      d: 'Ojo Mental: ataques Normal y Tierra ignoran escudos e inmunidades Fantasma, +15 % crítico y dispara rayos de Luna Carmesí cada 3,5 s.',
      mindEye: true, unseenFist: true,
      out: (pl, m) => (m.type === 'normal' || m.type === 'ground' ? 1.25 : 1),
      start: pl => { pl.critChance += 0.15; }
    },
    'tera-shell': {
      d: 'Caparazón Tera: con más del 50 % de vida reduce un 35 % todo el daño recibido, +25 % daño general y pulsos de cristal cada 4 s.',
      teraShell: true,
      inMul: pl => (half(pl) ? 1 : 0.65),
      out: () => 1.25
    },
    'power-construct': {
      d: 'Agrupamiento: al bajar del 50 % de vida se transforma en Forma Completa: sana un 35 %, +35 % daño Tierra/Dragón, +30 % def y pulso Núcleo Castigo.',
      powerConstruct: true,
      steady: true,
      out: (pl, m) => (pl.powerConstructUsed && (m.type === 'ground' || m.type === 'dragon') ? 1.35 : 1),
      inMul: pl => (pl.powerConstructUsed ? 0.70 : 1)
    },
    'fur-coat': { d: 'Recibe un 40 % menos de daño físico.', inMul: (pl, type, c) => (c === 'p' ? 0.6 : 1) },
    'fluffy': { d: 'Recibe un 30 % menos de daño físico.', inMul: (pl, type, c) => (c === 'p' ? 0.7 : 1) },
    'ice-scales': { d: 'Recibe un 40 % menos de daño especial.', inMul: (pl, type, c) => (c === 's' ? 0.6 : 1) },
    'shell-armor': { d: 'Recibe un 8 % menos de daño.', inMul: () => 0.92 },
    'battle-armor': { d: 'Recibe un 8 % menos de daño.', inMul: () => 0.92 },
    'intimidate': { d: 'Los enemigos le hacen un 12 % menos de daño físico.', inMul: (pl, type, c) => (c === 'p' ? 0.88 : 1) },
    'pressure': {
      d: 'Aura de Presión Cósmica: reduce un 25 % la velocidad y un 15 % el daño de enemigos en 220 px, +20 % daño y cada 3 s emite un pulso gravitatorio.',
      pressureAura: true,
      inMul: () => 0.85,
      out: () => 1.20
    },
    'sturdy': {
      d: 'Titán Inamovible: inmune a golpes fatales cada 45 s, recibe un 20 % menos de daño físico y no retrocede.',
      sturdy: true, steady: true,
      inMul: (pl, type, c) => (c === 'p' ? 0.80 : 1)
    },
    'regenerator': {
      d: 'Regeneración Fénix: recupera un 2 % de vida/s y una vez por partida renace de las cenizas al 50 % de vida.',
      tick: (pl, dt) => heal(pl, 0.02 * dt),
      phoenixRevive: true
    },
    'magic-guard': { d: 'Sólo le hacen daño los ataques: ni la lava ni las trampas.', lavaProof: true, trapProof: true },
    'stamina': { d: 'Cada golpe cuerpo a cuerpo que recibe le sube un poco la defensa.', contact: pl => pl.addBuff('def', 0.03, 6, 5) },
    'limber': steady, 'own-tempo': steady, 'oblivious': steady, 'inner-focus': steady,
    'clear-body': {
      d: 'Cuerpo Puro Inmutable: inmune a frenazos y trampas, recibe un 20 % menos de daño y devuelve daño por impacto.',
      steady: true, trapProof: true,
      inMul: () => 0.80,
      contact: (pl, e) => e.hurt(20 + pl.level * 4, '#94a3b8')
    },
    'white-smoke': steady,
    'full-metal-body': {
      d: 'Cuerpo de Metal Solar: inmune a frenazos y trampas, recibe un 25 % menos de daño y cada 2 s emite calor solar abrasador a 180 px.',
      fullMetalBody: true,
      steady: true,
      inMul: () => 0.75
    },
    'insomnia': {
      d: 'Trascendencia Psíquica: +40 % daño especial, -25 % recarga de ataques, inmune a trampas y emite ondas psicoquinéticas cada 3 s.',
      steady: true, trapProof: true, psystrikeBurst: true,
      out: (pl, m) => (cls(m) === 's' ? 1.4 : 1),
      cdMul: 0.75
    },
    'vital-spirit': steady,

    // --- contraataques (al recibir un golpe cuerpo a cuerpo) ---
    'static': contact((pl, e) => e.applySlow(0.5, 2.5), 'Quien le golpea cuerpo a cuerpo se queda frenado (paralizado).'),
    'flame-body': contact((pl, e) => e.applyBurn(2), 'Quien le golpea cuerpo a cuerpo se quema.'),
    'poison-point': contact((pl, e) => e.applyPoison(2), 'Quien le golpea cuerpo a cuerpo se envenena.'),
    'cute-charm': contact((pl, e) => e.applySlow(0.4, 2.5), 'Quien le golpea cuerpo a cuerpo se queda embobado (frenado).'),
    'effect-spore': contact((pl, e) => (Math.random() < 0.5 ? e.applySlow(0.45, 2.5) : e.applyPoison(2)), 'Quien le golpea cuerpo a cuerpo se frena o se envenena.'),
    'rough-skin': contact((pl, e) => e.hurt(dmgBack(pl), '#9aa6b5'), 'Quien le golpea cuerpo a cuerpo recibe daño.'),
    'iron-barbs': contact((pl, e) => e.hurt(dmgBack(pl), '#9aa6b5'), 'Quien le golpea cuerpo a cuerpo recibe daño.'),
    'poison-touch': { d: 'Sus ataques cuerpo a cuerpo y embestidas envenenan.', touchPoison: true },

    // --- botín ---
    'pickup': { d: '+15 % de Pokémonedas en la partida.', start: pl => { pl.coinMul *= 1.15; } },
    'honey-gather': { d: '+15 % de Pokémonedas en la partida.', start: pl => { pl.coinMul *= 1.15; } },

    // --- las que en los juegos son un lastre: aquí, un intercambio ---
    'truant': { d: 'Golpes sueltos y fuertes: tarda un 60 % más en recargar, pero cada golpe hace +35 %.', cdMul: 1.6, out: () => 1.35 },
    'slow-start': {
      d: 'Letargo del Titán: resiste un 35 % de daño (vel −15 %) los primeros 25 s (o 35 bajas). ¡Al despertar: +50 % daño, +25 % vel y terremotos que aturden!',
      slowStartAwakening: true,
      inMul: pl => (pl.slowStartAwake ? 0.85 : 0.65),
      speed: pl => (pl.slowStartAwake ? 1.25 : 0.85),
      out: pl => (pl.slowStartAwake ? 1.50 : 1.0)
    },
    'defeatist': { d: 'Cañón de cristal: +15 % de daño con más de la mitad de vida; con menos, −25 %.', out: pl => (half(pl) ? 0.75 : 1.15) },
    'wonder-guard': { d: 'Lo que no es muy eficaz apenas le hace daño (35 %); lo muy eficaz, un 50 % más.',
      inMul: (pl, type) => (superEff(pl, type) ? 1.5 : 0.35) },
    'schooling': { d: 'Forma banco: +25 % de vida y, con más de 1/4 de vida, +50 % de daño.',
      start: pl => { pl.maxHp = Math.round(pl.maxHp * 1.25); pl.hp = pl.maxHp; }, out: pl => (pl.hp > pl.maxHp / 4 ? 1.5 : 1) },
    'zen-mode': { d: 'Con menos de la mitad de vida entra en Modo Daruma: +30 % de daño especial.', plus: true,
      out: (pl, m) => (half(pl) && cls(m) === 's' ? 1.3 : 1) },
    'stance-change': { d: 'Alterna cada 8 s entre filo (+20 % de daño) y escudo (−20 % de daño recibido).',
      tick: (pl, dt) => { pl.stanceT = (pl.stanceT || 0) + dt; if (pl.stanceT >= 8) { pl.stanceT = 0; pl.shieldForm = !pl.shieldForm; } },
      out: pl => (pl.shieldForm ? 1 : 1.2), inMul: pl => (pl.shieldForm ? 0.8 : 1) },
    'imposter': { d: 'Se transforma: pega y aguanta como un Pokémon equilibrado.',
      start: pl => { const m = pl.mon; m.pa = m.sa = m.atk = pl.baseAtk = Math.max(m.atk, 1.12); m.df = Math.max(m.df, 72); m.sd = Math.max(m.sd, 72); } },

    // --- las genéricas más comunes (suman también la pasiva de su tipo: plus) ---
    'keen-eye': { d: '+5 % de probabilidad de golpe crítico.', plus: true, start: pl => { pl.critChance += 0.05; } },
    'frisk': { d: 'Atrae los objetos desde más lejos (+20 % de imán).', plus: true, start: pl => { pl.magnet *= 1.2; } },
    'magnet-pull': { d: 'Atrae los objetos desde más lejos (+20 % de imán).', plus: true, start: pl => { pl.magnet *= 1.2; } },
    'sticky-hold': { d: 'Atrae los objetos desde más lejos (+20 % de imán).', plus: true, start: pl => { pl.magnet *= 1.2; } },
    'illuminate': { d: 'Atrae los objetos desde más lejos (+10 % de imán).', plus: true, start: pl => { pl.magnet *= 1.1; } },
    'sand-veil': { d: 'Con tormenta de arena esquiva el 15 % de los golpes.', plus: true, dodge: () => (wx() === 'sand' ? 0.15 : 0) },
    'snow-cloak': { d: 'Con nieve esquiva el 15 % de los golpes.', plus: true, dodge: () => (wx() === 'snow' ? 0.15 : 0) },
    'gluttony': { d: 'Las curas le curan un 40 % más.', plus: true, healMul: 1.4 },
    'harvest': { d: 'Las curas le curan un 30 % más.', plus: true, healMul: 1.3 },
    'unnerve': {
      d: 'Terror Cósmico: enemigos en 240 px reciben un 25 % más de daño, hacen un 15 % menos y al caer detonan ondas psíquicas.',
      unnerveAura: true,
      inMul: () => 0.85,
      out: () => 1.25
    },
    'infiltrator': { d: 'Sus golpes rompen los escudos de los enemigos.', plus: true,
      hit: (pl, e) => { if (!e.remote && e.shield > 0) { e.shield = 0; e.shieldT = 0; } } },
    'telepathy': {
      d: 'Telepatía Espaciotemporal: esquiva el 18 % de los golpes; al esquivar o cada 4 s ralentiza a rivales a 200 px un 40 % y asegura crítico.',
      telepathyTemporal: true,
      dodge: () => 0.18
    },
    'anticipation': { d: 'Presiente el peligro: esquiva el 6 % de los golpes.', plus: true, dodge: () => 0.06 },
    'forewarn': { d: 'Presiente el peligro: esquiva el 6 % de los golpes.', plus: true, dodge: () => 0.06 },
    'weak-armor': { d: 'Al recibir un golpe físico se aligera: +20 % de velocidad un momento.', plus: true,
      hurt: (pl, type, c) => { if (c === 'p') pl.addBuff('spd', 0.2, 3, 1); } },
    'steadfast': {
      d: 'Ascenso Marcial: +40 % daño físico, inmune a retroceso y cada golpe consecutivo otorga +5 % vel y +10 % daño melee (hasta 5 acum).',
      steady: true,
      out: (pl, m) => (cls(m) === 'p' ? 1.4 : 1) * (1 + (pl.steadfastStacks || 0) * 0.10),
      speed: pl => 1 + (pl.steadfastStacks || 0) * 0.05,
      hit: (pl, e, m) => { if (m && (m.kind === 'melee' || m.kind === 'dash')) pl.steadfastStacks = Math.min(5, (pl.steadfastStacks || 0) + 1); }
    },
    'rattled': { d: 'Los golpes de Bicho, Fantasma o Siniestro le asustan: +25 % de velocidad un momento.', plus: true,
      hurt: (pl, type) => { if (type === 'bug' || type === 'ghost' || type === 'dark') pl.addBuff('spd', 0.25, 4, 1); } },
    'hydration': { d: 'Con lluvia recupera un 1 % de vida por segundo y nada le frena.', plus: true,
      tick: (pl, dt) => { if (wx() === 'rain') { heal(pl, 0.01 * dt); pl.slowT = 0; } } },
    'overcoat': { d: 'Recibe un 5 % menos de daño especial.', plus: true, inMul: (pl, type, c) => (c === 's' ? 0.95 : 1) },
    'shed-skin': { d: 'Cada 5 s muda: se quita los frenazos y recupera un 2 % de vida.', plus: true,
      tick: (pl, dt) => { pl.shedT = (pl.shedT || 0) + dt; if (pl.shedT >= 5) { pl.shedT = 0; pl.slowT = 0; heal(pl, 0.02); } } },
    'natural-cure': { d: 'Recupera un 0,3 % de su vida por segundo.', plus: true, start: pl => { pl.regenFlat += pl.maxHp * 0.003; } },
    'healer': { d: 'Recupera un 0,3 % de su vida por segundo.', plus: true, start: pl => { pl.regenFlat += pl.maxHp * 0.003; } },
    'leaf-guard': { d: 'Con sol no le frena nada y recibe un 15 % menos de daño.', plus: true,
      tick: pl => { if (wx() === 'sun') pl.slowT = 0; }, inMul: () => (wx() === 'sun' ? 0.85 : 1) },
    'mold-breaker': { d: '+12 % de daño a los jefes.', plus: true, out: (pl, m, e) => (e && e.boss ? 1.12 : 1) },
    'damp': { d: 'Las explosiones de los Pokémon kamikaze no le dañan.', plus: true, damp: true },
    'rivalry': { d: '+15 % de daño a los enemigos que comparten un tipo con él.', plus: true,
      out: (pl, m, e) => (e && (e.types || []).some(t => pl.mon.types.includes(t)) ? 1.15 : 1) },
    'synchronize': { d: 'Quien le golpea cuerpo a cuerpo recibe parte del golpe.', plus: true, contact: (pl, e) => e.hurt(6 + pl.level * 2, '#ff9fcf') },
    'prankster': { d: 'Sus potenciadores se recargan un 30 % antes.', plus: true, statusCd: 0.7 },
    'early-bird': Object.assign({}, steady, { plus: true }),
    'shield-dust': Object.assign({}, steady, { plus: true }),
    'sweet-veil': Object.assign({}, steady, { plus: true }),
    'unburden': { d: 'Sin objeto va un 15 % más rápido.', plus: true, speed: pl => (pl.item ? 1 : 1.15) },
    'unaware': { d: 'No se deja impresionar: recibe un 8 % menos de daño.', plus: true, inMul: () => 0.92 },
    'defiant': { d: 'Si le frenan, se pica: +20 % de daño físico mientras dure.', plus: true, out: (pl, m) => (pl.slowT > 0 && cls(m) === 'p' ? 1.2 : 1) },
    'competitive': { d: 'Si le frenan, se pica: +20 % de daño especial mientras dure.', plus: true, out: (pl, m) => (pl.slowT > 0 && cls(m) === 's' ? 1.2 : 1) },
    'soundproof': { d: 'Recibe un 10 % menos de daño especial.', plus: true, inMul: (pl, type, c) => (c === 's' ? 0.9 : 1) },
    'big-pecks': { d: 'Recibe un 8 % menos de daño físico.', plus: true, inMul: (pl, type, c) => (c === 'p' ? 0.92 : 1) },
    'water-veil': { d: 'La lava no le quema y recibe la mitad de daño de Fuego.', plus: true, lavaProof: true, inMul: (pl, type) => (type === 'fire' ? 0.5 : 1) },
    'pickpocket': { d: 'Al recibir golpes, a veces les quita una moneda.', plus: true,
      hurt: pl => { if (Math.random() < 0.12) G.Pickups.drop('coin', pl.x + G.U.rand(-10, 10), pl.y + G.U.rand(-10, 10), 2); } },
    'analytic': { d: '+15 % de daño a enemigos con menos de la mitad de vida.', plus: true, out: (pl, m, e) => (e && e.hp < e.maxHp * 0.5 ? 1.15 : 1) },
    'klutz': { d: 'Sin objeto, +12 % de daño.', plus: true, out: pl => (pl.item ? 1 : 1.12) },
    'hyper-cutter': { d: '+6 % de daño con movimientos físicos.', plus: true, out: (pl, m) => (cls(m) === 'p' ? 1.06 : 1) },
    'contrary': { d: 'Al revés: frenado, va más rápido.', plus: true, speed: pl => (pl.slowT > 0 ? 2.4 : 1) },
    'quick-feet': { d: 'Frenado, va más rápido (en vez de más lento).', plus: true, speed: pl => (pl.slowT > 0 ? 2.5 : 1) },
    'bulletproof': { d: 'Recibe un 15 % menos de daño especial.', plus: true, inMul: (pl, type, c) => (c === 's' ? 0.85 : 1) },
    'magic-bounce': { d: '50 % de probabilidad de reflejar proyectiles enemigos hacia el atacante e inmune a trampas.', magicBounce: true, steady: true,
      inMul: (pl, type, c) => (c === 's' ? 0.85 : 1), dodge: (pl, type, c) => (c === 's' ? 0.1 : 0) },
    'friend-guard': { d: 'Recibe un 6 % menos de daño.', plus: true, inMul: () => 0.94 },
    'stench': { d: 'Sus golpes a veces frenan (1 de cada 10).', plus: true, hit: (pl, e) => { if (Math.random() < 0.1) e.applySlow(0.35, 1.5); } },
    'anger-point': { d: 'La primera vez que baja de la mitad de vida se enfurece: +25 % de daño el resto de la partida.',
      tick: pl => { if (!pl.angry && half(pl)) { pl.angry = true; G.FX.dmgText(pl.x, pl.y - pl.bodyH - 16, '¡Irascible!', '#ff6b4d', true); } },
      out: pl => (pl.angry ? 1.25 : 1) },
    'justified': { d: '+15 % de daño a los Pokémon de tipo Siniestro.', plus: true, out: (pl, m, e) => (e && (e.types || []).includes('dark') ? 1.15 : 1) },
    'cursed-body': contact((pl, e) => { if (Math.random() < 0.3) e.applySlow(0.5, 2); }, 'A veces frena a quien le golpea cuerpo a cuerpo.'),
    'plus': { d: '+10 % de daño con movimientos especiales.', out: (pl, m) => (cls(m) === 's' ? 1.1 : 1) },
    'minus': { d: '+10 % de daño con movimientos especiales.', out: (pl, m) => (cls(m) === 's' ? 1.1 : 1) },
    'no-guard': { d: 'Todo acierta: +15 % de daño hecho, pero recibe un 10 % más.', out: () => 1.15, inMul: () => 1.1 },
    'aftermath': { d: 'Una vez por partida, al quedar con poca vida, explota y daña a los de alrededor.', plus: true,
      tick: pl => {
        if (pl.boomed || pl.hp >= pl.maxHp * 0.2 || pl.dead) return;
        pl.boomed = true;
        G.FX.ring(pl.x, pl.y, 10, 140, '#ff7b3d', 0.5, 6); G.Camera.kick(0.6); G.Audio.sfx('break');
        for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, 140)) e.hurt(40 + pl.level * 10, '#ff7b3d', e.x - pl.x, e.y - pl.y, 160);
      } },
    'moody': { d: 'Cada 10 s, +10 % a algo al azar: ataque, ataque especial, velocidad o defensa.', plus: true,
      tick: (pl, dt) => {
        pl.moodT = (pl.moodT || 0) - dt;
        if (pl.moodT > 0) return;
        pl.moodT = 10; pl.mood = G.U.pick(['atk', 'spa', 'spd', 'def']);
        G.FX.ring(pl.x, pl.y, pl.r * 2.4, pl.r * 1.1, { atk: '#ff6b4d', spa: '#ff8ad8', spd: '#7fe0ff', def: '#b0b8c8' }[pl.mood], 0.35, 2.5);
      },
      out: (pl, m) => (pl.mood === (cls(m) === 's' ? 'spa' : 'atk') ? 1.1 : 1),
      speed: pl => (pl.mood === 'spd' ? 1.1 : 1), inMul: pl => (pl.mood === 'def' ? 0.9 : 1) },
    'tangled-feet': { d: 'Frenado, esquiva el 20 % de los golpes.', plus: true, dodge: pl => (pl.slowT > 0 ? 0.2 : 0) },
    'skill-link': { d: '+25 % de daño con los movimientos de varios golpes.', plus: true, out: (pl, m) => ((m.count || 1) > 2 || m.bounce ? 1.25 : 1) },
    'protosynthesis': { d: 'Con sol, +20 % de daño.', plus: true, out: () => (wx() === 'sun' ? 1.2 : 1) },

    // --- escudos, supervivencia y mitigación ---
    'disguise': { d: 'Un disfraz protege de un golpe cada 45 s y ralentiza a los enemigos cercanos al romperse.', disguise: true },
    'ice-face': { d: 'Una máscara de hielo absorbe un golpe físico cada 40 s (se restaura al instante con nieve).', iceFace: true },
    'purifying-salt': { d: 'Inmune a quemaduras, venenos y frenazos, y recibe un 50 % menos de daño Fantasma.', steady: true, inMul: (pl, type) => (type === 'ghost' ? 0.5 : 1) },
    'good-as-gold': { d: 'Inmune a trampas, lava y estados alterados. Recoger monedas libera una onda expansiva dorada.', lavaProof: true, trapProof: true, steady: true, goodAsGold: true },
    'shields-down': { d: 'Con más del 50 % de vida aguanta (−30 % daño e inmune a estados); con menos, +35 % daño y +20 % vel.', inMul: pl => (half(pl) ? 1 : 0.7), out: pl => (half(pl) ? 1.35 : 1), speed: pl => (half(pl) ? 1.2 : 1), steady: true },
    'comatose': { d: 'Totalmente inmune a quemaduras, venenos, parálisis y frenazos, y movimientos Normal hacen +20 %.', steady: true, out: (pl, m) => (m.type === 'normal' ? 1.2 : 1) },
    'armor-tail': { d: 'Impide embestidas sorpresa: −25 % de daño cuerpo a cuerpo y frena a los enemigos rápidos cercanos.', inMul: (pl, type, c) => (c === 'p' ? 0.75 : 1), armorTail: true },
    'dauntless-shield': {
      d: 'Escudo Recio: +35 % defensa permanente; al iniciar o ante jefes gana invulnerabilidad 10 s y contraataque con embestida.',
      dauntlessShield: true,
      inMul: () => 0.65,
      start: pl => { pl.addBuff('def', 0.5, 20, 1); pl.invuln = 10.0; if (G.FX) G.FX.dmgText(pl.x, pl.y - pl.bodyH - 18, '✦ ¡Escudo Recio!', '#fbbf24', true); }
    },

    // --- contraataque, venganza y explosión ---
    'innards-out': { d: 'Al recibir daño, devuelve una onda de contragolpe con el 50 % del daño a los enemigos cercanos.', innardsOut: true },
    'perish-body': { d: 'Quien le golpea cuerpo a cuerpo queda marcado con maldición que estalla a los 3 s.', contact: (pl, e) => { if (!e.dead) setTimeout(() => { if (e && !e.dead) e.hurt(50 + pl.level * 8, '#7e22ce'); }, 3000); } },
    'cotton-down': { d: 'Al recibir un golpe libera pelusa que frena a los enemigos cercanos un 40 % durante 3 s.', cottonDown: true },
    'toxic-debris': { d: 'Al recibir un golpe esparce púas tóxicas que envenenan a los enemigos.', toxicDebris: true },
    'electromorphosis': { d: 'Al recibir daño se sobrecarga: el siguiente ataque hace +40 % daño Eléctrico con descarga.', electromorphosis: true },
    'berserk': { d: 'Al bajar del 50 % de vida, emite una onda expansiva que empuja a los rivales y gana +25 % daño especial.', berserk: true },
    'emergency-exit': { d: 'Al bajar del 35 % de vida, retrocede de golpe, gana invulnerabilidad momentánea y aturde.', emergencyExit: true },
    'seed-sower': { d: 'Al recibir un golpe invoca Campo de Hierba: recupera un 1,5 % de vida/s durante 10 s.', seedSower: true },
    'sand-spit': { d: 'Al recibir un golpe desata una tormenta de arena durante 15 s.', sandSpit: true },
    'thermal-exchange': { d: 'Inmune a quemaduras y recibir daño de Fuego u olas de calor otorga +30 % de ataque 8 s.', steady: true, inMul: (pl, type) => (type === 'fire' ? 0.7 : 1), thermalExchange: true },
    'water-compaction': { d: 'Recibir daño de Agua o entrar en agua sube la defensa un 15 % y recupera un 4 % de vida.', waterCompaction: true },

    // --- auras, campos elementales y terreno ---
    'beads-of-ruin': {
      d: 'Abalorio Debacle: derrite la defensa especial enemiga a 240 px, +35 % daño especial y quema a los rivales cercanos.',
      ruinAura: 'spa', chiYuBurn: true,
      out: (pl, m) => (cls(m) === 's' ? 1.35 : 1)
    },
    'sword-of-ruin': {
      d: 'Espada Debacle: reduce un 30 % la defensa física enemiga a 240 px, +35 % daño físico y +15 % crítico.',
      ruinAura: 'atk',
      out: (pl, m) => (cls(m) === 'p' ? 1.35 : 1),
      start: pl => { pl.critChance += 0.15; }
    },
    'tablets-of-ruin': {
      d: 'Tablilla Debacle: marchita el ataque físico enemigo a 240 px, reduce un 30 % el daño físico recibido y drena 1,5 % vida/s.',
      ruinAura: 'def',
      inMul: (pl, type, c) => (c === 'p' ? 0.70 : 1),
      tick: (pl, dt) => heal(pl, 0.015 * dt)
    },
    'vessel-of-ruin': {
      d: 'Caldero Debacle: extingue el ataque especial enemigo a 240 px, reduce un 30 % el daño especial recibido e hiperarmadura.',
      ruinAura: 'spdef',
      inMul: (pl, type, c) => (c === 's' ? 0.70 : 1),
      steady: true
    },
    'dark-aura': {
      d: 'Aura Oscura: los movimientos Siniestro hacen un 40 % más de daño y drena un 15 % del daño infligido como vida.',
      darkAura: true,
      out: (pl, m) => (m.type === 'dark' ? 1.40 : 1)
    },
    'fairy-aura': {
      d: 'Aura Feérica: +40 % daño Hada, regenera 1,5 % vida/s y derrotar enemigos brota flores curativas que sanan un 2 %.',
      fairyAura: true,
      out: (pl, m) => (m.type === 'fairy' ? 1.40 : 1),
      tick: (pl, dt) => heal(pl, 0.015 * dt),
      kill: pl => heal(pl, 0.02)
    },
    'aura-break': {
      d: 'Rompeaura: invierte las auras cósmicas, +40 % daño Tierra y Dragón y recibe un 30 % menos de daño general.',
      auraBreak: true,
      out: (pl, m) => (m.type === 'ground' || m.type === 'dragon' ? 1.40 : 1),
      inMul: () => 0.70
    },
    'electric-surge': { d: 'Genera Campo Eléctrico: +30 % daño Eléctrico y descarga rayos automáticos cada 3 s.', electricSurge: true, out: (pl, m) => (m.type === 'electric' ? 1.3 : 1) },
    'grassy-surge': { d: 'Genera Campo de Hierba: +30 % daño Planta y regenera un 1,5 % de vida por segundo.', grassySurge: true, out: (pl, m) => (m.type === 'grass' ? 1.3 : 1), tick: (pl, dt) => heal(pl, 0.015 * dt) },
    'psychic-surge': { d: 'Genera Campo Psíquico: +30 % daño Psíquico y 12 % de probabilidad de esquivar.', psychicSurge: true, out: (pl, m) => (m.type === 'psychic' ? 1.3 : 1), dodge: () => 0.12 },
    'misty-surge': { d: 'Genera Campo de Niebla: inmune a estados alterados y recibe un 20 % menos de daño especial.', mistySurge: true, steady: true, inMul: (pl, type, c) => (c === 's' ? 0.8 : 1) },
    'hadron-engine': { d: 'Motor Hadrónico: activa Campo Eléctrico, +35 % daño especial y descarga rayos a rivales cercanos cada 2,5 s.', electricSurge: true, out: (pl, m) => (cls(m) === 's' ? 1.35 : 1) },
    'bad-dreams': { d: 'Los enemigos frenados o aturdidos en un radio de 200 px sufren daño de pesadilla continuo.', badDreams: true },
    'neutralizing-gas': { d: 'Gas Reactivo: los enemigos en un radio de 180 px se ven frenados un 25 % y pierden potencia ofensiva.', neutralizingGas: true },

    // --- combate, ataques letales y mecánicas únicas ---
    'corrosion': { d: 'Sus venenos afectan a cualquier tipo de enemigo y el veneno causa daño un 50 % más rápido.', corrosion: true },
    'merciless': { d: 'Todos los golpes contra enemigos envenenados son golpes críticos asegurados.', merciless: true },
    'unseen-fist': {
      d: 'Puño Invisible: los ataques de contacto ignoran escudos enemigos, causan +35 % de daño y tienen +25 % de golpe crítico.',
      unseenFist: true,
      out: (pl, m) => (m.kind === 'melee' || m.kind === 'dash' ? 1.35 : 1),
      start: pl => { pl.critChance += 0.25; }
    },
    'toxic-chain': { d: 'Cada ataque tiene un 25 % de probabilidad de encadenar con veneno y ralentizar al objetivo.', toxicChain: true },
    'intrepid-sword': {
      d: 'Espada Indómita: +35 % daño físico permanente; al iniciar o ante jefes gana +50 % de daño durante 20 s con ráfagas de corte.',
      intrepidSword: true,
      out: (pl, m) => (cls(m) === 'p' ? 1.35 : 1) * (pl.hasBuff('atk') ? 1.2 : 1),
      start: pl => pl.addBuff('atk', 0.5, 20, 1)
    },
    'download': { d: 'Descarga: analiza a los enemigos para ganar +20 % de daño físico o especial según su menor defensa.', download: true, out: pl => 1.2 },
    'gale-wings': { d: 'Con más del 75 % de vida, los movimientos Volador recargan un 30 % más rápido y va +18 % veloz.', speed: pl => (pl.hp >= pl.maxHp * 0.75 ? 1.18 : 1), cdMul: pl => (pl.hp >= pl.maxHp * 0.75 ? 0.7 : 1) },
    'soul-heart': {
      d: 'Coránima: cada baja aumenta el daño especial un 1 % (hasta +40 %) y recupera un 2 % de vida; derrotar jefes sana un 25 %.',
      soulHeart: true,
      kill: (pl, e) => {
        pl.soulK = (pl.soulK || 0) + 1;
        pl.soulB = Math.min(0.40, (pl.soulB || 0) + 0.01);
        heal(pl, 0.02);
        if (e && e.boss) heal(pl, 0.25);
      },
      out: (pl, m) => (cls(m) === 's' ? 1 + (pl.soulB || 0) : 1)
    },
    'wind-rider': { d: 'Al moverse rápido acumula viento y desata un vórtice cortante cada 5 s.', windRider: true },
    'supreme-overlord': { d: 'Por cada minuto transcurrido de partida gana +2 % de daño (hasta +20 %).', out: () => 1 + Math.min(0.2, Math.floor((G.Game.time || 0) / 60) * 0.02) },
    'zero-to-hero': { d: 'Tras 60 s de partida se transforma en Héroe (+30 % daño, +20 % vida y +15 % vel).', out: pl => ((pl.heroT || 0) >= 60 ? 1.3 : 1), speed: pl => ((pl.heroT || 0) >= 60 ? 1.15 : 1), tick: (pl, dt) => { pl.heroT = (pl.heroT || 0) + dt; } },
    'air-lock': {
      d: 'Bucle Aire del Señor Celestial: anula peligros del clima, inmune a lava/agua, +25 % de daño general y ráfagas sónicas cada 3,5 s.',
      lavaProof: true, steady: true, airLockBlast: true,
      out: () => 1.25
    },
    'multitype': {
      d: 'Multitipo Divino: adopta el tipo del ataque (+35 % STAB), +20 % a todas las estadísticas y ondas de Sentencia cada 4 s.',
      protean: true, multitypeDivine: true,
      out: () => 1.35, inMul: () => 0.80, speed: () => 1.20,
      start: pl => { pl.maxHp = Math.round(pl.maxHp * 1.2); pl.hp = pl.maxHp; }
    },
    'rock-head': { d: 'Cabeza Roca: +30 % de daño con embestidas sin penalización e inmune al retroceso.', steady: true, out: (pl, m) => (m.kind === 'dash' || /tackle|slam|headbutt|bash|charge|smash/.test(m.id) ? 1.3 : 1) },
    'simple': { d: 'Todos los potenciadores de estadísticas (ataque, defensa, velocidad) duplican su efecto.', simple: true },
    'teravolt': {
      d: 'Teravoltaje: ignora resistencias enemigas (+35 % daño mínimo), +40 % daño Eléctrico y electrocuta con parálisis.',
      teravolt: true,
      out: (pl, m) => (m.type === 'electric' ? 1.40 : 1.25),
      hit: (pl, e, m) => { if (m && (m.type === 'electric' || m.type === 'dragon') && !e.dead) e.applySlow(0.4, 2.5); }
    },
    'turboblaze': {
      d: 'Turbollama: ignora resistencias enemigas (+35 % daño mínimo), +40 % daño Fuego e incinera a los rivales.',
      turboblaze: true,
      out: (pl, m) => (m.type === 'fire' ? 1.40 : 1.25),
      hit: (pl, e, m) => { if (m && (m.type === 'fire' || m.type === 'dragon') && !e.dead) e.applyBurn(3); }
    },
    'victory-star': {
      d: 'Tinovictoria: +20 % probabilidad de crítico, crítico causa ×2,2 de daño, +30 % vel proyectiles y +15 % daño a todo el equipo.',
      critMul: 2.2, out: () => 1.15,
      start: pl => { pl.critChance += 0.20; }
    },
    'liquid-voice': { d: 'Todos los ataques de sonido se convierten en Agua y causan +25 % de daño.', liquidVoice: true, out: (pl, m) => (/voice|sing|sound|echo|boom|noise|hyper-voice|snarl/.test(m.id) ? 1.25 : 1) },
    'liquid-ooze': { d: 'Quien le golpee cuerpo a cuerpo recibe daño de ácido corrosivo.', contact: (pl, e) => e.hurt(15 + pl.level * 4, '#a855f7') },
    'quark-drive': { d: 'Potencia la estadística más alta (+25 % de daño o +15 % de velocidad).', out: pl => (pl.mon.pa >= pl.mon.spd ? 1.25 : 1), speed: pl => (pl.mon.spd > pl.mon.pa ? 1.15 : 1) },
    'flare-boost': { d: '+35 % de daño especial cuando está en zonas calientes o sufriendo calor.', out: (pl, m) => (cls(m) === 's' ? 1.35 : 1) },
    'toxic-boost': { d: '+35 % de daño físico cuando se enfrenta a enemigos venenosos o zonas tóxicas.', out: (pl, m) => (cls(m) === 'p' ? 1.35 : 1) },
    'long-reach': { d: 'Sus ataques alcanzan un 20 % más lejos y nunca recibe daño por espinas o contacto.', out: () => 1.15 },
    'magician': { d: 'Los golpes críticos a veces hacen soltar una moneda o gema extra de los enemigos.', magician: true },
    'shadow-tag': { d: 'Los enemigos cercanos no pueden alejarse y reciben un 15 % más de daño.', out: (pl, m, e) => (e && G.U.dist(pl.x, pl.y, e.x, e.y) < 180 ? 1.15 : 1) },
    'color-change': { d: 'Al recibir daño elemental, adopta ese tipo volviéndose resistente a él durante 8 s.', colorChange: true },
    'dancer': { d: 'Usar un ataque o danza de mejora reduce la recarga de sus demás ataques.', statusCd: 0.6 },
    'gooey': { d: 'Quien le golpea cuerpo a cuerpo queda fuertemente frenado un 50 % durante 3 s.', contact: (pl, e) => e.applySlow(0.5, 3.0) },
    'hospitality': { d: 'Recupera un 0,5 % de vida por segundo y en cooperativo cura también a los compañeros cercanos.', tick: (pl, dt) => heal(pl, 0.005 * dt) },
    'heavy-metal': { d: 'Inmune al retroceso y empujón, y las embestidas hacen un 30 % más de daño.', steady: true, out: (pl, m) => (m.kind === 'dash' ? 1.3 : 1) },
    'light-metal': { d: '+15 % de velocidad de movimiento y esquiva el 8 % de los golpes.', speed: () => 1.15, dodge: () => 0.08 },
    'marvel-scale': { d: 'Al recibir un golpe aumenta su defensa física un 35 % durante 5 s.', hurt: pl => pl.addBuff('def', 0.35, 5, 1) },
    'mirror-armor': { d: 'Refleja los frenazos hacia los enemigos y recibe un 15 % menos de daño especial.', inMul: (pl, type, c) => (c === 's' ? 0.85 : 1) },
    'mummy': { d: 'Quien le golpea cuerpo a cuerpo queda debilitado perdiendo velocidad un 30 % durante 3 s.', contact: (pl, e) => e.applySlow(0.3, 3) },
    'power-spot': { d: 'Potencia todos los movimientos propios y de compañeros un 15 %.', out: () => 1.15 },
    'propeller-tail': { d: 'Los proyectiles persiguen con precisión al objetivo más fuerte ignorando obstáculos.', out: () => 1.15 },
    'ripen': { d: 'Las bayas y curaciones recuperan el doble de vida (+100 % curación).', healMul: 2.0 },
    'stakeout': { d: '+25 % de daño a los enemigos que acaban de aparecer en pantalla.', out: (pl, m, e) => (e && (e.t || 0) < 3 ? 1.25 : 1) },
    'supersweet-syrup': { d: 'Al comenzar y cada 45 s, baña a los enemigos en almíbar frenándolos un 35 % durante 6 s.', start: () => { if (G.EnemyMgr && G.Game && G.Game.player) for (const e of G.EnemyMgr.queryCircle(G.Game.player.x, G.Game.player.y, 250)) e.applySlow(0.35, 6); } },
    'triage': { d: 'Las habilidades de recuperación y curas se recargan un 50 % más rápido.', statusCd: 0.5 },
    'wonder-skin': { d: '25 % de probabilidad de esquivar cualquier ataque especial o proyectil.', dodge: (pl, type, c) => (c === 's' ? 0.25 : 0) },
    'ball-fetch': { d: 'Atrae los objetos y gemas desde el doble de distancia (+100 % de imán).', start: pl => { pl.magnet *= 2.0; } }
  };
  FX['pure-power'] = FX['huge-power'];                // Energía Pura = Potencia
  FX['libero'] = FX['protean'];                       // Líbero = Mutatipo
  FX['wimp-out'] = FX['emergency-exit'];
  FX['dazzling'] = FX['armor-tail'];
  FX['queenly-majesty'] = FX['armor-tail'];
  FX['cloud-nine'] = FX['air-lock'];
  // FX['turboblaze'] now custom defined above
  FX['wind-power'] = FX['wind-rider'];
  FX['rks-system'] = {
      d: 'Sistema Alfa: adapta el tipo a cada movimiento (+30 % STAB), +25 % daño general e inmune a alteraciones de estado.',
      protean: true, steady: true, out: () => 1.30, inMul: () => 0.85
    };
  FX['tera-shift'] = {
      d: 'Cambio Tera: canaliza cristales de Terapagos, +30 % daño a todos los tipos y emite pulsos de prisma cada 4 s.',
      protean: true, teraShell: true, out: () => 1.30
    };
  FX['poison-puppeteer'] = FX['toxic-chain'];
  FX['arena-trap'] = FX['shadow-tag'];
  FX['tangling-hair'] = FX['gooey'];
  FX['lingering-aroma'] = FX['mummy'];
  FX['battery'] = FX['power-spot'];
  FX['stalwart'] = FX['propeller-tail'];
  FX['cheek-pouch'] = FX['ripen'];
  FX['cud-chew'] = FX['ripen'];
  FX['flower-gift'] = boost('grass');
  FX['flower-veil'] = steady;
  FX['aroma-veil'] = steady;
  FX['hunger-switch'] = FX['stance-change'];
  FX['illusion'] = FX['disguise'];
  FX['immunity'] = steady;
  FX['magma-armor'] = steady;
  FX['poison-heal'] = FX['regenerator'];
  FX['suction-cups'] = FX['heavy-metal'];
  FX['symbiosis'] = FX['power-spot'];
  FX['trace'] = FX['adaptability'];
  FX['normalize'] = boost('normal');
  FX['grass-pelt'] = FX['grassy-surge'];
  FX['gulp-missile'] = FX['innards-out'];
  FX['commander'] = FX['power-spot'];
  FX['receiver'] = FX['power-spot'];
  FX['forecast'] = FX['protosynthesis'];
  FX['stall'] = steady;
  FX['wandering-spirit'] = FX['mummy'];

  /** Pasiva genérica: +8 % con los movimientos de su tipo principal. */
  function generic(mon) {
    const t = mon.types[0];
    return { generic: true, d: '+8 % de daño con movimientos de tipo ' + TN(t) + '.', out: (pl, m) => (m.type === t ? 1.08 : 1) };
  }

  /**
   * Efecto de la habilidad `id` para el Pokémon `mon` (nunca null). Las que
   * llevan `plus` suman además la pasiva genérica de su tipo (su texto va en d2,
   * aparte, para que cada frase se traduzca entera).
   */
  function of(id, mon) {
    const fx = id && FX[id];
    if (!fx) return generic(mon);
    if (!fx.plus) return fx;
    const g = generic(mon);
    return Object.assign({}, fx, {
      d2: g.d,
      out: (pl, m, e) => (fx.out ? fx.out(pl, m, e) : 1) * g.out(pl, m, e)
    });
  }

  return { FX, of };
})();
