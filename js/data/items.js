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
    { id: 'leftovers', name: 'Restos', desc: 'Recuperas 1,0% de vida/s (+1,6% si llevas 3 s sin recibir golpes).',
      on: p => { p.leftoversActive = true; p.regenFlat += p.maxHp * 0.010; p._itemRegen = p.maxHp * 0.010; },
      off: p => { p.leftoversActive = false; p.regenFlat -= p._itemRegen || 0; } },
    { id: 'choiceband', name: 'Cinta Elección', desc: '+40% de daño, pero no puedes cambiar de movimiento en ranura 1.',
      on: p => { p.atkMul *= 1.4; p.choiceBandLocked = true; },
      off: p => { p.atkMul /= 1.4; p.choiceBandLocked = false; } },
    { id: 'quickclaw', name: 'Garra Rápida', desc: '-20% de recarga en todos tus movimientos.',
      on: p => { p.cdMul *= 0.8; }, off: p => { p.cdMul /= 0.8; } },
    { id: 'focussash', name: 'Banda Focus', desc: 'Un golpe que te dejaría KO te deja con 1 de vida (cada 60 s).',
      on: () => {}, off: () => {} },
    { id: 'shellbell', name: 'Cascabel Concha', desc: 'Recuperas vida con el daño que haces (hasta 4% máx/s, exceso a escudo).',
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
    { id: 'eviolite', name: 'Mineral Evolutivo', desc: '+40% Def./Def. Esp. Si no evoluciona a Lv15/30, +35% Ataque y +20% Vel.',
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
      off: p => { p.meteorite = false; } },
    // 10 Trang bị đặc trưng khóa theo loài (Species-Specific Items)
    { id: 'lightball', name: 'Bola Luminosa', desc: '+45% daño Eléctrico y los ataques disparan rayos en cadena.',
      on: p => { p.lightball = true; p.electricAtkMul = (p.electricAtkMul || 1) * 1.45; },
      off: p => { p.lightball = false; p.electricAtkMul = (p.electricAtkMul || 1) / 1.45; } },
    { id: 'thickclub', name: 'Hueso Grueso', desc: '+60% de daño físico y Huesomerang golpea con mayor radio.',
      on: p => { p.thickclub = true; p.physAtkMul = (p.physAtkMul || 1) * 1.60; },
      off: p => { p.thickclub = false; p.physAtkMul = (p.physAtkMul || 1) / 1.60; } },
    { id: 'leek', name: 'Puerro', desc: '+35% probabilidad crítica y mayor área de corte para Farfetch\'d.',
      on: p => { p.leek = true; p.critChance = (p.critChance || 0) + 0.35; },
      off: p => { p.leek = false; p.critChance = Math.max(0, (p.critChance || 0) - 0.35); } },
    { id: 'metalpowder', name: 'Polvo Metálico', desc: '+35% Def. y Def. Esp. y +25% de vida máxima para Ditto.',
      on: p => { p.metalpowder = true; p.pdefReduce = (p.pdefReduce || 0) + 0.35; },
      off: p => { p.metalpowder = false; p.pdefReduce = Math.max(0, (p.pdefReduce || 0) - 0.35); } },
    { id: 'deepseatooth', name: 'Diente Marino', desc: '+55% de daño especial y vórtice de agua para Clamperl y evoluciones.',
      on: p => { p.deepseatooth = true; p.spAtkMul = (p.spAtkMul || 1) * 1.55; },
      off: p => { p.deepseatooth = false; p.spAtkMul = (p.spAtkMul || 1) / 1.55; } },
    { id: 'luckypunch', name: 'Puño Suerte', desc: 'Convierte un 8% de vida máxima en daño directo y +20% crítico.',
      on: p => { p.luckypunch = true; p.critChance = (p.critChance || 0) + 0.20; },
      off: p => { p.luckypunch = false; p.critChance = Math.max(0, (p.critChance || 0) - 0.20); } },
    { id: 'twistedspoon_alakazam', name: 'Cuchara Torcida', desc: '+35% daño Psíquico y cucharas mágicas protectoras.',
      on: p => { p.twistedspoon = true; p.psychicAtkMul = (p.psychicAtkMul || 1) * 1.35; },
      off: p => { p.twistedspoon = false; p.psychicAtkMul = (p.psychicAtkMul || 1) / 1.35; } },
    { id: 'charcoal_torkoal', name: 'Carbón Candente', desc: '+30% radio de llamas y curación al pisar fuego.',
      on: p => { p.charcoal = true; p.fireAtkMul = (p.fireAtkMul || 1) * 1.30; },
      off: p => { p.charcoal = false; p.fireAtkMul = (p.fireAtkMul || 1) / 1.30; } },
    { id: 'blacksludge', name: 'Lodo Negro', desc: 'Regenera 1,2% vida por segundo y deja un rastro de lodo tóxico.',
      on: p => { p.blacksludge = true; p.regenFlat += (p.maxHp || 100) * 0.012; },
      off: p => { p.blacksludge = false; p.regenFlat = Math.max(0, (p.regenFlat || 0) - (p.maxHp || 100) * 0.012); } }
  ];
  const BY = {};
  for (const it of LIST) BY[it.id] = it;

  /** Uno al azar, distinto del que ya llevas. */
  function roll(except, pl) {
    const specialIds = ['keystone', 'dnasplicers', 'ultranecroziumz', 'griseousorb', 'meteorite',
      'lightball', 'thickclub', 'leek', 'metalpowder', 'deepseatooth', 'luckypunch', 'twistedspoon_alakazam', 'charcoal_torkoal', 'blacksludge'];
    const pool = LIST.filter(i => {
      if (i.id === except) return false;
      if (specialIds.includes(i.id)) {
        if (!pl) return false;
        if (i.id === 'keystone' && (!G.getMegasFor || G.getMegasFor(pl.dex).length === 0)) return false;
        if (i.id === 'dnasplicers' && pl.dex !== 646) return false;
        if (i.id === 'ultranecroziumz' && pl.dex !== 800) return false;
        if (i.id === 'griseousorb' && pl.dex !== 487) return false;
        if (i.id === 'meteorite' && pl.dex !== 386) return false;
        // Khóa theo loài biểu tượng
        if (i.id === 'lightball' && ![25, 26, 172].includes(pl.dex)) return false;
        if (i.id === 'thickclub' && ![104, 105].includes(pl.dex)) return false;
        if (i.id === 'leek' && ![83, 865].includes(pl.dex)) return false;
        if (i.id === 'metalpowder' && pl.dex !== 132) return false;
        if (i.id === 'deepseatooth' && ![366, 367, 368].includes(pl.dex)) return false;
        if (i.id === 'luckypunch' && ![113, 242, 440].includes(pl.dex)) return false;
        if (i.id === 'twistedspoon_alakazam' && ![63, 64, 65].includes(pl.dex)) return false;
        if (i.id === 'charcoal_torkoal' && ![219, 323, 324].includes(pl.dex)) return false;
        if (i.id === 'blacksludge' && !(pl.mon && pl.mon.types && pl.mon.types.includes('poison'))) return false;
      }
      return true;
    });
    return G.U.pick(pool).id;
  }

  return { LIST, BY, roll };
})();
