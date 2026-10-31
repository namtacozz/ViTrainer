/* ============ items.js — objetos equipables (uno por run) ============
 * Se encuentran en los cofres (a veces en los normales, a menudo en los de
 * candado) y los sueltan los jefes. Sólo puedes llevar UNO; si encuentras
 * otro, eliges con cuál quedarte. Duran lo que dura la run.
 *
 *   on(pl)   se lo pones (lo que hace mientras lo llevas)
 *   off(pl)  se lo quitas (deshace lo de on)
 * Los que reaccionan a algo (golpe mortal, daño hecho...) los mira el
 * jugador con pl.hasItem(id).
 */
G.Items = (() => {
  const LIST = [
    { id: 'leftovers', name: 'Restos', desc: 'Recuperas un 1,5% de tu vida por segundo.',
      on: p => { p.regenFlat += p.maxHp * 0.015; p._itemRegen = p.maxHp * 0.015; },
      off: p => { p.regenFlat -= p._itemRegen || 0; } },
    { id: 'choiceband', name: 'Cinta Elección', desc: '+40% de daño, pero no puedes cambiar de movimiento.',
      on: p => { p.atkMul *= 1.4; }, off: p => { p.atkMul /= 1.4; } },
    { id: 'quickclaw', name: 'Garra Rápida', desc: '-20% de recarga en todos tus movimientos.',
      on: p => { p.cdMul *= 0.8; }, off: p => { p.cdMul /= 0.8; } },
    { id: 'focussash', name: 'Banda Focus', desc: 'Un golpe que te dejaría KO te deja con 1 de vida (cada 60 s).',
      on: () => {}, off: () => {} },
    { id: 'shellbell', name: 'Cascabel Concha', desc: 'Recuperas vida con el daño que haces.',
      on: () => {}, off: () => {} },
    { id: 'amuletcoin', name: 'Moneda Amuleto', desc: '+50% de Pokémonedas al acabar la run.',
      on: p => { p.coinMul *= 1.5; }, off: p => { p.coinMul /= 1.5; } },
    { id: 'luckyegg', name: 'Huevo Suerte', desc: '+30% de experiencia.',
      on: p => { p.xpMul *= 1.3; }, off: p => { p.xpMul /= 1.3; } },
    { id: 'lifeorb', name: 'Vidasfera', desc: '+30% de daño, pero cada ataque te quita un poco de vida.',
      on: p => { p.atkMul *= 1.3; }, off: p => { p.atkMul /= 1.3; } },
    { id: 'choicescarf', name: 'Pañuelo Elección', desc: '+35% de velocidad.',
      on: p => { p.spdMul *= 1.35; }, off: p => { p.spdMul /= 1.35; } },
    { id: 'rockyhelmet', name: 'Casco Dentado', desc: 'Los que te golpean cuerpo a cuerpo reciben daño.',
      on: () => {}, off: () => {} },
    { id: 'assaultvest', name: 'Chaleco Asalto', desc: '+20% de reducción de daño recibido.',
      // (aparte del tope del 70 % de las cartas Coraza: ver Player.reduction)
      on: p => { p.itemReduce += 0.2; }, off: p => { p.itemReduce -= 0.2; } },
    { id: 'eviolite', name: 'Mineral Evolutivo', desc: '+40% de Def. y Def. Esp. si el Pokémon no ha alcanzado su fase final.',
      on: p => { p.eviolite = true; }, off: p => { p.eviolite = false; } },
    { id: 'weaknesspolicy', name: 'Seguro Debilidad', desc: 'Al recibir daño muy eficaz, +35% de daño durante 8 s.',
      on: p => { p.weaknesspolicy = true; }, off: p => { p.weaknesspolicy = false; } },
    { id: 'expertbelt', name: 'Cinta Experto', desc: '+30% de daño al acertar ataques muy eficaces.',
      on: p => { p.expertbelt = true; }, off: p => { p.expertbelt = false; } },
    { id: 'loadeddice', name: 'Dado Trucado', desc: '+2 proyectiles o impactos en movimientos de varios golpes.',
      on: p => { p.loadeddice = true; }, off: p => { p.loadeddice = false; } },
    { id: 'heavydutyboots', name: 'Botas Gruesas', desc: 'Inmune a lava, charcos ralentizantes y trampas de suelo.',
      on: p => { p.heavydutyboots = true; }, off: p => { p.heavydutyboots = false; } },
    { id: 'keystone', name: 'Mega Aro', desc: '+10% estadísticas, activa la Megaevolución al instante y +15% de bonus STAB.',
      on: p => { p.keystone = true; p.atkMul *= 1.10; p.spdMul *= 1.10; if (p.triggerMegaIfAvailable) p.triggerMegaIfAvailable(); },
      off: p => { p.keystone = false; p.atkMul /= 1.10; p.spdMul /= 1.10; } },
    { id: 'dnasplicers', name: 'Punta ADN', desc: '+20% Daño Dragón y Hielo. Permite fusionar a Kyurem en Kyurem Negro o Kyurem Blanco.',
      on: p => { p.dnasplicers = true; if (p.triggerFormIfAvailable) p.triggerFormIfAvailable(); },
      off: p => { p.dnasplicers = false; } },
    { id: 'ultranecroziumz', name: 'Ultranecrostal Z', desc: '+25% Daño Psíquico y Dragón. Desata la Luz de Ultra Necrozma.',
      on: p => { p.ultranecroziumz = true; if (p.triggerFormIfAvailable) p.triggerFormIfAvailable(); },
      off: p => { p.ultranecroziumz = false; } },
    { id: 'griseousorb', name: 'Griseosfera', desc: '+20% Daño Fantasma y Dragón. Transforma a Giratina a su Forma Origen.',
      on: p => { p.griseousorb = true; if (p.triggerFormIfAvailable) p.triggerFormIfAvailable(); },
      off: p => { p.griseousorb = false; } },
    { id: 'meteorite', name: 'Meteorito Cósmico', desc: 'Permite sintonizar la forma de Deoxys (Ataque, Defensa o Velocidad).',
      on: p => { p.meteorite = true; if (p.triggerFormIfAvailable) p.triggerFormIfAvailable(); },
      off: p => { p.meteorite = false; } }
  ];
  const BY = {};
  for (const it of LIST) BY[it.id] = it;

  /** Uno al azar, distinto del que ya llevas. */
  function roll(except, pl) {
    const specialIds = ['keystone', 'dnasplicers', 'ultranecroziumz', 'griseousorb', 'meteorite'];
    const pool = LIST.filter(i => {
      if (i.id === except) return false;
      if (specialIds.includes(i.id)) {
        if (!pl) return false;
        if (i.id === 'keystone' && (!G.getMegasFor || G.getMegasFor(pl.dex).length === 0)) return false;
        if (i.id === 'dnasplicers' && pl.dex !== 646) return false;
        if (i.id === 'ultranecroziumz' && pl.dex !== 800) return false;
        if (i.id === 'griseousorb' && pl.dex !== 487) return false;
        if (i.id === 'meteorite' && pl.dex !== 386) return false;
      }
      return true;
    });
    return G.U.pick(pool).id;
  }

  return { LIST, BY, roll };
})();
