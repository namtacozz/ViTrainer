/* ============ gacha.js — un banner por generación ============
 * Lógica pura: no toca la interfaz. La pantalla está en ui/gacha-ui.js.
 *
 * 9 banners (Kanto ... Paldea). Cada uno con su propio pity.
 * Probabilidades por tirada:  1★ 45% · 2★ 30% · 3★ 17% · 4★ 6.5% · 5★ 1.5%
 * Garantías:
 *   - la tirada ×10 trae al menos un 4★ o superior
 *   - a las 70 tiradas sin 5★ en ese banner, el siguiente es 5★ seguro
 * Shiny: 1 de cada 100 tiradas sale en su versión shiny (2 de cada 100 con el
 *   Amuleto Iris de esa generación).
 * Amuleto Iris: uno por generación. Se tiene al completar su Pokédex (todos sus
 *   Pokémon, legendarios incluidos). No se guarda aparte: sale de lo que tienes.
 * Repetidos: se convierten en Pokémonedas (los shiny repetidos, el triple).
 * Halloween (30-10 al 2-11, systems/halloween.js): banner Noche Espectral
 *   (gen 10, SPOOKY): los Pokémon Fantasma de todas las regiones, con shiny al
 *   doble (2 %) y su propio pity. No tiene Amuleto Iris ni está en BANNERS.
 *
 * Se tira con TICKETS (se consiguen jugando):
 *   ×1   1 ticket (ya sin botón: desde el 22-10-2026 se tira de 10 en 10 o de 100 en 100)
 *   ×10  10 tickets normales, o 1 ticket ×10 (eliges con qué)
 *   ×100 100 tickets normales, o 10 tickets ×10: son diez ×10 seguidas (cada
 *        una con su Épica asegurada)
 */
G.Gacha = (() => {
  /** ¿Qué gasta una tirada de n? → { t1, t10 } o null si no te llega. */
  /** @param use  't1' (tickets normales) o 't10' (un ticket ×10, sólo para la ×10) */
  function costOf(save, n, use = 't1') {
    const t = save.tickets || { t1: 0, t10: 0 };
    if (n === 100 && use === 't10') return t.t10 >= 10 ? { t1: 0, t10: 10 } : null;
    if (n === 10 && use === 't10') return t.t10 >= 1 ? { t1: 0, t10: 1 } : null;
    return t.t1 >= n ? { t1: n, t10: 0 } : null;
  }
  const RATES = [[1, 45], [2, 30], [3, 17], [4, 6.5], [5, 1.5]];
  const PITY_5 = 70;
  const SHINY_RATE = 1 / 100;
  const SHINY_RATE_IRIS = 2 / 100;
  const REFUND = { 1: 15, 2: 30, 3: 60, 4: 120, 5: 300 };
  let forceShiny = 0;           // para pruebas y vídeos: las N próximas salen shiny

  const RARITY_NAME = { 1: 'Común', 2: 'Poco común', 3: 'Rara', 4: 'Épica', 5: 'Legendaria' };
  const RARITY_COLOR = { 1: '#9fb1c9', 2: '#5fe08a', 3: '#4fb4ff', 4: '#c47bff', 5: '#ffcb3d' };

  const BANNERS = [
    { gen: 1, name: 'Kanto',   color: ['#3a1d6e', '#1b2f78', '#0f4d6e'] },
    { gen: 2, name: 'Johto',   color: ['#5a2a1a', '#7a3d1f', '#2d4a6e'] },
    { gen: 3, name: 'Hoenn',   color: ['#0f4d6e', '#1b6a5a', '#2a3d78'] },
    { gen: 4, name: 'Sinnoh',  color: ['#2a2a5e', '#3d3d8a', '#5a2a6e'] },
    { gen: 5, name: 'Teselia', color: ['#1a1a2a', '#3a3a4e', '#2a4a6e'] },
    { gen: 6, name: 'Kalos',   color: ['#4a1a3a', '#2a3a7a', '#1a5a7a'] },
    { gen: 7, name: 'Alola',   color: ['#7a3a1a', '#1a6a6a', '#2a4a8a'] },
    { gen: 8, name: 'Galar',   color: ['#4a1a5a', '#1a3a6a', '#6a1a3a'] },
    { gen: 9, name: 'Paldea',  color: ['#6a2a1a', '#4a1a5a', '#1a4a6a'] }
  ];

  const SPOOKY = { gen: 10, name: 'Noche Espectral', event: true, color: ['#1a0f2a', '#3d2266', '#7a3a12'] };
  /** El banner de un número (1-9 las generaciones, 10 el de Halloween). */
  const banner = gen => (gen === SPOOKY.gen ? SPOOKY : BANNERS[gen - 1]);
  /** ¿Se puede tirar hoy en ese banner? (el de Halloween, sólo esos días) */
  const isOpen = gen => (gen === SPOOKY.gen ? !!(G.Halloween && G.Halloween.on) : !!BANNERS[gen - 1]);

  function getRarity(p) {
    if (typeof G !== 'undefined' && G.getEvoChain) {
      const c = G.getEvoChain(p.dex);
      if (c && c.baseRarity) return c.baseRarity;
    }
    return p.rarity;
  }

  function inBanner(p, gen) {
    if (!G.SPRITE_META[p.dex]) return false;
    // CHỈ cho phép Bậc 1 (Base Stage) và Pokémon Đơn bậc (Single Stage / Legendary)
    if (typeof G !== 'undefined' && G.isBaseStage && !G.isBaseStage(p.dex)) return false;
    return gen === SPOOKY.gen ? p.types.includes('ghost') : p.gen === gen;
  }

  /** Pokémon de una rareza en un banner. */
  function pool(rarity, gen) { return G.DEX.filter(p => inBanner(p, gen) && getRarity(p) === rarity); }

  /** Pool no vacío más cercano (algunas generaciones tienen rarezas casi vacías). */
  function poolNear(rarity, gen) {
    for (const d of [0, -1, 1, -2, 2, -3, 3, -4, 4]) {
      const r = rarity + d;
      if (r < 1 || r > 5) continue;
      const p = pool(r, gen);
      if (p.length) return { rarity: r, list: p };
    }
    return { rarity, list: G.DEX.filter(p => inBanner(p, gen)) };
  }

  /** Cuántos tienes de una generación → { have, total }. */
  function dexOf(save, gen) {
    const list = gen === SPOOKY.gen ? G.DEX.filter(p => p.types.includes('ghost')) : G.DEX.filter(p => p.gen === gen);
    return { have: list.filter(p => save.owned[p.dex]).length, total: list.length };
  }

  /** ¿Tiene el Amuleto Iris de esa generación (su Pokédex completa)? */
  function hasIris(save, gen) {
    if (gen === SPOOKY.gen) return false;
    const d = dexOf(save, gen); return d.have >= d.total;
  }

  function shinyRate(save, gen) { return gen === SPOOKY.gen || hasIris(save, gen) ? SHINY_RATE_IRIS : SHINY_RATE; }

  function rollRarity(min = 1) {
    const rates = RATES.filter(([r]) => r >= min);
    const total = rates.reduce((a, [, w]) => a + w, 0);
    let x = Math.random() * total;
    for (const [r, w] of rates) { x -= w; if (x <= 0) return r; }
    return rates[rates.length - 1][0];
  }

  /** Los 3 más fuertes de la generación, para el cartel del banner. */
  function featured(gen) {
    return G.DEX.filter(p => inBanner(p, gen) && getRarity(p) === 5)
      .sort((a, b) => {
        const ca = typeof G !== 'undefined' && G.getEvoChain ? (G.getEvoChain(a.dex)?.maxBst || a.bst) : a.bst;
        const cb = typeof G !== 'undefined' && G.getEvoChain ? (G.getEvoChain(b.dex)?.maxBst || b.bst) : b.bst;
        return cb - ca;
      }).slice(0, 3).map(p => p.dex);
  }

  /**
   * Hace `n` tiradas en el banner `gen` sobre el guardado `save` (lo modifica).
   * Devuelve null si no hay monedas, o la lista de resultados:
   *   { dex, rarity, shiny, isNew, refund }
   * (y en .iris la generación si estas tiradas te han dado su Amuleto Iris).
   */
  function pull(save, n, gen = 1, use = 't1') {
    if (!isOpen(gen)) return null;
    if (n === 100) {
      if (!costOf(save, 100, use)) return null;
      const hadIris = hasIris(save, gen);
      const out = [];
      for (let k = 0; k < 10; k++) out.push(...pull(save, 10, gen, use));
      out.iris = !hadIris && hasIris(save, gen) ? gen : 0;
      return out;
    }
    const cost = costOf(save, n, use);
    if (!cost) return null;
    save.tickets.t1 -= cost.t1;
    save.tickets.t10 -= cost.t10;
    save.pity = save.pity || {};
    save.shiny = save.shiny || {};
    save.pity[gen] = save.pity[gen] || 0;
    const hadIris = hasIris(save, gen), rate = shinyRate(save, gen);

    const out = [];
    for (let i = 0; i < n; i++) {
      save.pity[gen]++;
      let want;
      if (save.pity[gen] >= PITY_5) want = 5;
      else if (n === 10 && i === n - 1 && !out.some(r => r.rarity >= 4)) want = rollRarity(4);
      else want = rollRarity();

      const { rarity, list } = poolNear(want, gen);
      if (rarity === 5) save.pity[gen] = 0;
      let mon = G.U.pick(list);
      let shiny = G.Sprites.hasShiny(mon.dex) && (forceShiny > 0 ? (forceShiny--, true) : Math.random() < rate);
      // Los shiny no se repiten: si ya tienes ese, sale otro de la misma rareza
      // cuyo shiny te falte; si los tienes todos, sale normal.
      if (shiny && save.shiny[mon.dex]) {
        const missing = list.filter(p => G.Sprites.hasShiny(p.dex) && !save.shiny[p.dex]);
        if (missing.length) mon = G.U.pick(missing);
        else shiny = false;
      }

      const effectiveRarity = getRarity(mon);
      const chain = typeof G !== 'undefined' && G.getEvoChain ? G.getEvoChain(mon.dex) : null;
      save.evoTiers = save.evoTiers || {};
      save.evoBranches = save.evoBranches || {};

      let isNew = false, refund = 0, evoStatus = '', unlockedDex = null;

      if (!save.owned[mon.dex]) {
        // Lần đầu sở hữu Bậc 1
        isNew = true;
        save.owned[mon.dex] = { at: Date.now(), from: 'gacha' };
        save.evoTiers[mon.dex] = 1;
        evoStatus = 'new';
      } else {
        // Đã sở hữu Bậc 1 -> Xử lý Quay trùng (Duplicate Logic)
        const curTier = save.evoTiers[mon.dex] || 1;
        const chainType = chain ? chain.type : 'single';

        if (chainType === '3stage') {
          if (curTier === 1) {
            const d2 = chain.stages[1] && chain.stages[1][0];
            if (d2) {
              save.evoTiers[mon.dex] = 2;
              save.owned[d2] = { at: Date.now(), from: 'gacha_evo' };
              if (save.shiny[mon.dex]) save.shiny[d2] = { at: Date.now(), from: 'inherited' };
              evoStatus = 'stage2';
              unlockedDex = d2;
            } else {
              refund = REFUND[effectiveRarity];
              evoStatus = 'refund';
            }
          } else if (curTier === 2) {
            const d3 = chain.stages[2] && chain.stages[2][0];
            if (d3) {
              save.evoTiers[mon.dex] = 3;
              save.owned[d3] = { at: Date.now(), from: 'gacha_evo' };
              if (save.shiny[mon.dex]) save.shiny[d3] = { at: Date.now(), from: 'inherited' };
              evoStatus = 'stage3';
              unlockedDex = d3;
            } else {
              refund = REFUND[effectiveRarity];
              evoStatus = 'refund';
            }
          } else {
            refund = REFUND[effectiveRarity];
            evoStatus = 'refund';
          }
        } else if (chainType === '2stage') {
          if (curTier === 1) {
            const d2 = chain.stages[1] && chain.stages[1][0];
            if (d2) {
              save.evoTiers[mon.dex] = 2;
              save.owned[d2] = { at: Date.now(), from: 'gacha_evo' };
              if (save.shiny[mon.dex]) save.shiny[d2] = { at: Date.now(), from: 'inherited' };
              evoStatus = 'stage2';
              unlockedDex = d2;
            } else {
              refund = REFUND[effectiveRarity];
              evoStatus = 'refund';
            }
          } else if (curTier === 2) {
            save.evoTiers[mon.dex] = 3;
            evoStatus = 'apex';
          } else {
            refund = REFUND[effectiveRarity];
            evoStatus = 'refund';
          }
        } else if (chainType === 'single') {
          if (curTier === 1) {
            save.evoTiers[mon.dex] = 2;
            evoStatus = 'awake1';
          } else if (curTier === 2) {
            save.evoTiers[mon.dex] = 3;
            evoStatus = 'apex';
          } else {
            refund = REFUND[effectiveRarity];
            evoStatus = 'refund';
          }
        } else if (chainType === 'branch') {
          save.evoBranches[mon.dex] = save.evoBranches[mon.dex] || [];
          const allBranches = (chain.stages[1] || []).concat(chain.stages[2] || []);
          const locked = allBranches.filter(d => !save.evoBranches[mon.dex].includes(d));
          if (locked.length > 0) {
            const pickBranch = G.U.pick(locked);
            save.evoBranches[mon.dex].push(pickBranch);
            save.owned[pickBranch] = { at: Date.now(), from: 'gacha_branch' };
            if (save.shiny[mon.dex]) save.shiny[pickBranch] = { at: Date.now(), from: 'inherited' };
            save.evoTiers[mon.dex] = Math.max(save.evoTiers[mon.dex] || 1, G.getStage(pickBranch));
            evoStatus = 'branch';
            unlockedDex = pickBranch;
          } else {
            if (curTier < 3) {
              save.evoTiers[mon.dex] = 3;
              evoStatus = 'apex';
            } else {
              refund = REFUND[effectiveRarity];
              evoStatus = 'refund';
            }
          }
        }
      }

      if (shiny) {
        const isShinyNew = !save.shiny[mon.dex];
        save.shiny[mon.dex] = { at: Date.now(), from: 'gacha' };
        if (chain) {
          for (const d of chain.members) {
            if (save.owned[d] && !save.shiny[d]) {
              save.shiny[d] = { at: Date.now(), from: 'inherited' };
            }
          }
        }
        if (!isShinyNew && refund > 0) refund *= 3;
        else if (!isShinyNew && refund === 0 && !isNew) refund = REFUND[effectiveRarity] * 3;
      }

      save.coins += refund;
      out.push({ dex: mon.dex, rarity: effectiveRarity, shiny, isNew, refund, evoStatus, unlockedDex });
    }
    save.stats.pulls = (save.stats.pulls || 0) + n;
    out.iris = !hadIris && hasIris(save, gen) ? gen : 0;
    return out;
  }

  return { debugForceShiny(n = 1) { forceShiny = n; },
           costOf, RATES, PITY_5, SHINY_RATE, SHINY_RATE_IRIS, REFUND, RARITY_NAME, RARITY_COLOR, BANNERS, SPOOKY, banner, isOpen,
           pool, featured, pull, dexOf, hasIris, shinyRate, getRarity };
})();
