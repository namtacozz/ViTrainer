/* ============ levelup.js — las tres cartas de subida de nivel ============
 * Tipos de carta:
 *   new   aprender un movimiento nuevo (sólo si quedan huecos de los 4; un vínculo libera huecos)
 *   up    mejorar un movimiento que ya tienes
 *   stat  mejora permanente de la run
 */
G.LevelUp = (() => {

  const isVi = () => (typeof G !== 'undefined' && G.I18n && G.I18n.lang === 'vi');

  const STATS = [
    { id: 'hp',   icon: 'heart',
      get title() { return isVi() ? 'Khí Huyết (Máu)' : 'Vitality'; },
      get desc() { return isVi() ? '+20 Máu tối đa (và hồi phục ngay).' : '+20 max HP (and restores it).'; },
      apply: pl => pl.addMaxHp(20) },
    { id: 'atk',  icon: 'fist',
      get title() { return isVi() ? 'Công Lực (Sát Thương)' : 'Power'; },
      get desc() { return isVi() ? '+10 sát thương cố định cho toàn bộ chiêu thức.' : '+10 flat damage for all moves.'; },
      apply: pl => { pl.flatAtk = (pl.flatAtk || 0) + 10; }, max: 40 },
    { id: 'spd',  icon: 'boot',
      get title() { return isVi() ? 'Thần Hành (Tốc Chạy)' : 'Agility'; },
      get desc() { return isVi() ? '+10 tốc độ di chuyển cố định.' : '+10 flat movement speed.'; },
      apply: pl => { pl.flatSpd = (pl.flatSpd || 0) + 10; }, max: 10 },
    { id: 'cd',   icon: 'clock',
      get title() { return isVi() ? 'Linh Hoạt (Hồi Chiêu)' : 'Cooldown'; },
      get desc() { return isVi() ? '-8% thời gian hồi chiêu tất cả kỹ năng.' : '-8% cooldown reduction on all moves.'; },
      apply: pl => { pl.cdMul = Math.max(0.40, (pl.cdMul || 1) * 0.92); }, max: 10 },
    { id: 'pdef', icon: 'shield',
      get title() { return isVi() ? 'Thiết Bích (Giáp Vật Lý)' : 'Iron Guard'; },
      get desc() { return isVi() ? '+10 Phòng Ngự Vật Lý (P.Def).' : '+10 Physical Defense.'; },
      apply: pl => { pl.flatPDef = (pl.flatPDef || 0) + 10; }, max: 15 },
    { id: 'sdef', icon: 'shield',
      get title() { return isVi() ? 'Kim Cương (Giáp Phép)' : 'Diamond Veil'; },
      get desc() { return isVi() ? '+10 Phòng Ngự Đặc Biệt (Sp.Def).' : '+10 Special Defense.'; },
      apply: pl => { pl.flatSDef = (pl.flatSDef || 0) + 10; }, max: 15 },
    { id: 'rgn',  icon: 'sprout',
      get title() { return isVi() ? 'Tức Sinh (Hồi Máu)' : 'Regen'; },
      get desc() { return isVi() ? '+0.9 Máu hồi phục mỗi giây.' : '+0.9 HP regen per second.'; },
      apply: pl => { pl.regenFlat += 0.9; } },
    { id: 'mag',  icon: 'magnet',
      get title() { return isVi() ? 'Từ Tính (Thu Hút)' : 'Magnet'; },
      get desc() { return isVi() ? '+30% bán kính nhặt vật phẩm.' : '+30% pickup radius.'; },
      apply: pl => { pl.magnet *= 1.30; }, max: 6 },
    { id: 'xp',   icon: 'book',
      get title() { return isVi() ? 'Ngộ Tính (Kinh Nghiệm)' : 'Wisdom'; },
      get desc() { return isVi() ? '+8% kinh nghiệm nhận thêm.' : '+8% extra XP gained.'; },
      apply: pl => { pl.xpMul = (pl.xpMul || 1) + 0.08; }, max: 8 },
    { id: 'heal', icon: 'berry',
      get title() { return isVi() ? 'Quả Sitrus (Cấp Cứu)' : 'Sitrus Berry'; },
      get desc() { return isVi() ? 'Hồi phục ngay lập tức 45% Máu tối đa.' : 'Restores 45% max HP immediately.'; },
      apply: pl => pl.heal(pl.maxHp * 0.45) }
  ];

  /** n elementos distintos de list, cada uno con probabilidad según weight(x). */
  function pickWeighted(list, n, weight) {
    const rest = list.map(x => [x, weight(x)]), out = [];
    while (out.length < n && rest.length) {
      let r = Math.random() * rest.reduce((a, [, w]) => a + w, 0), i = 0;
      while (i < rest.length - 1 && (r -= rest[i][1]) > 0) i++;
      out.push(rest.splice(i, 1)[0][0]);
    }
    return out;
  }

  /** Construye el conjunto de cartas candidatas, con pesos. */
  function candidates(pl) {
    const out = [];

    // --- movimientos nuevos (Khóa hoàn toàn nếu mang Choice Band) ---
    if (pl.slots.length < pl.maxMoves && !(pl.hasItem && pl.hasItem('choiceband'))) {
      // Con 2 potenciadores ya no se ofrecen más: los buff no hacen daño y
      // llenar los 4 huecos con ellos deja la run sin salida.
      const buffs = pl.moves.filter(m => m.kind === 'buff').length;
      // Si es de su lado flojo, cuánto rinde (Machamp con Bola Sombra...).
      const fitNote = (mon, cat) => {
        const f = G.Stats.fit(mon, cat);
        if (f >= 0.95) return '';
        const sideKey = G.Stats.sideOf(mon) === 'special' ? 'especiales' : 'físicos';
        const side = G.T ? G.T(sideKey) : sideKey;
        const pct = Math.round(f * 100);
        return ` <span class="fit-low">⚠ ${G.I18n ? G.I18n.f('(Eficacia reducida al {x} %: este Pokémon rinde mejor con ataques {x})', pct, side) : `(Eficacia reducida al ${pct} %)`}</span>`;
      };
      const pool = G.Moves.poolFor(pl.mon).filter(id =>
        !pl.hasMove(id) && !(pl.banned && pl.banned.has(id)) && !(buffs >= 2 && G.Moves.BY_ID[id].kind === 'buff'));
      // Los de su lado bueno (y los empatados y mejoras) salen el doble.
      const weight = id => { const d = G.Moves.BY_ID[id]; return G.Stats.fit(pl.mon, d.cat) >= 0.999 ? 2 : 1; };
      for (const id of pickWeighted(pool, 6, weight)) {
        const d = G.Moves.BY_ID[id];
        out.push({
          w: 10, type: 'new', key: 'new:' + id,
          icon: 'move:' + id, color: G.U.TYPE_COLOR[d.type],
          // (Físico o especial va en su propia etiqueta, con borde: ver run-ui.js. Los
          // potenciadores no tienen categoría, pero Danza Espada y Danza Dragón suben el
          // ataque físico y Maquinación el especial: llevan la del lado que suben.)
          tag: G.U.TYPE_NAME[d.type],
          cat: G.Stats.NAME[d.cat || (d.stat === 'patk' ? 'physical' : d.stat === 'satk' ? 'special' : '')] || '',
          title: G.T(d.name, 'move'), desc: d.desc + fitNote(pl.mon, d.cat),
          apply: p => p.addMove(id)
        });
      }
    }

    // --- Mega Evoluciones (Golden Cards) ---
    if (pl.pendingMegaBranches && pl.pendingMegaBranches.length > 0) {
      for (const mega of pl.pendingMegaBranches) {
        const typesStr = (mega.types || []).map(t => G.U.TYPE_NAME[t] || t).join('/');
        out.push({
          w: 1200, type: 'mega_evo', key: 'mega_evo:' + mega.id,
          icon: 'megaBadge', dex: mega.spriteDex || mega.baseDex || pl.dex, color: '#f43f5e',
          tag: isVi() ? 'TIẾN HÓA MEGA' : 'MEGA EVOLUTION',
          title: G.T(mega.name),
          desc: isVi() ? `Đột phá dạng Mega tối thượng (${typesStr}). BST ${mega.bst}, Đặc tính ${G.T(mega.ability, 'ability') || mega.ability} và uy lực áp đảo.` : `Awaken Mega Evolution (${typesStr}). BST ${mega.bst}, ability ${G.T(mega.ability, 'ability') || mega.ability} and unleashed power.`,
          apply: p => {
            p.pendingMegaBranches = null;
            p.megaEvolve(mega.id);
          }
        });
      }
    }

    // --- ramificaciones de evolución de Pokémon (Golden Cards) ---
    if (pl.pendingEvoBranches && pl.pendingEvoBranches.length > 0) {
      for (const branchDex of pl.pendingEvoBranches) {
        const mon = G.DEX_BY[branchDex];
        if (!mon) continue;
        const typesStr = mon.types.map(t => G.U.TYPE_NAME[t] || t).join('/');
        out.push({
          w: 1000, type: 'evo_mon', key: 'evo_mon:' + branchDex,
          icon: 'star', dex: branchDex, color: '#ffd23f',
          tag: isVi() ? 'TIẾN HÓA' : 'EVOLUTION',
          title: (isVi() ? 'Tiến hóa thành ' : 'Evolve to ') + G.T(mon.name),
          desc: isVi() ? `Tiến hóa lên ${G.T(mon.name)} (${typesStr}). Hồi 40% máu và thăng cấp toàn bộ chỉ số.` : `Evolve to ${G.T(mon.name)} (${typesStr}). Restores 40% HP and upgrades stats.`,
          apply: p => {
            p.pendingEvoBranches = null;
            p.evolveTo(branchDex);
          }
        });
      }
    }

    // --- evoluciones escalonadas (+ / ++ / +++) ---
    const waiting = {};                   // stat -> movimiento que la espera para evolucionar
    for (const m of pl.moves) {
      const ev = G.Moves.evoInfo(m, pl.statsTaken, pl.moves);
      if (!ev) continue;
      if (!ev.ready) {
        if (ev.tier === 1) {
          if (ev.needs === 'def') { waiting['pdef'] = m; waiting['sdef'] = m; }
          else { waiting[ev.needs] = m; }
        }
        continue;
      }
      const tierTag = ev.tier === 1 ? (isVi() ? 'TIẾN HÓA +' : 'EVOLUTION +') : ev.tier === 2 ? (isVi() ? 'TINH ANH ++' : 'MASTERY ++') : (isVi() ? 'TỐI THƯỢNG +++' : 'SUPREME +++');
      const tierColor = ev.tier === 1 ? '#ffd23f' : ev.tier === 2 ? '#38bdf8' : '#ec4899';
      const weight = ev.tier === 3 ? 120 : ev.tier === 2 ? 80 : 40;
      out.push({
        w: weight, type: 'evo', key: 'evo:' + m.id + ':' + ev.tier,
        icon: 'move:' + m.id, color: tierColor, tag: tierTag,
        title: G.T(m.name, 'move') + ' → ' + G.T(ev.name, 'move'), desc: ev.text,
        apply: p => {
          G.Moves.evolve(m, ev.tier);
          G.FX.ring(p.x, p.y, 8, ev.tier * 60 + 80, tierColor, 0.8, 6);
          G.FX.burst(p.x, p.y - p.bodyH * 0.5, tierColor, 40, 240);
          G.Audio.sfx('legend');
          G.Progress.event('evolve', { move: m.id, tier: ev.tier });
          if (ev.tier >= 2) {
            G.Progress.event('evo_plus', { tier: ev.tier });
            const s = G.DB && G.DB.save;
            if (s && s.stats) {
              if (ev.tier === 2) s.stats.movesPlusPlus = (s.stats.movesPlusPlus || 0) + 1;
              if (ev.tier === 3) s.stats.movesPlusPlusPlus = (s.stats.movesPlusPlusPlus || 0) + 1;
            }
          }
        }
      });
    }

    // --- mejoras de movimientos que ya tienes ---
    for (const m of pl.moves) {
      const txt = G.Moves.nextUpText(m);
      if (!txt) continue;
      out.push({
        w: 8, type: 'up', key: 'up:' + m.id,
        icon: 'move:' + m.id, color: G.U.TYPE_COLOR[m.type],
        tag: 'Nv.' + m.lvl + ' > ' + (m.lvl + 1),
        title: G.T(m.name, 'move'), desc: txt,
        apply: () => G.Moves.levelUp(m)
      });
    }

    // --- stats ---
    // Quy tắc: Khi đã đạt full giới hạn tối đa (max) một loại nâng cấp (như tốc chiêu, thủ vật lý, thủ phép...),
    // thẻ đó TUYỆT ĐỐI không bao giờ xuất hiện nữa, nhường chỗ hoàn toàn cho các nâng cấp khác có ích.
    const room = s => !s.max || (pl.statsTaken[s.id] || 0) < s.max;
    const availableStats = STATS.filter(s => room(s));
    const pickStats = G.U.pickN(availableStats.filter(s => !waiting[s.id]), 5)
      .concat(availableStats.filter(s => waiting[s.id]));
    for (const s of pickStats) {
      const evoFor = waiting[s.id];
      out.push({
        w: evoFor ? 14 : pl.slots.length < pl.maxMoves ? 4 : 7,
        type: 'stat', key: 'stat:' + s.id,
        icon: s.icon, color: evoFor ? '#ffd23f' : '#8fa3c4',
        tag: evoFor ? (isVi() ? 'Tiến hóa ' + G.T(evoFor.name, 'move') : 'Evolves ' + G.T(evoFor.name, 'move')) : (isVi() ? 'Nâng cấp' : 'Upgrade'),
        title: s.title, desc: s.desc,
        apply: p => { s.apply(p); p.statsTaken[s.id] = (p.statsTaken[s.id] || 0) + 1; }
      });
    }

    return out;
  }

  /** Devuelve 3 cartas distintas, elegidas por peso. */
  function offer(pl, n = 3) {
    const pool = candidates(pl);
    const picked = [];
    const used = new Set();
    // Si hay cartas de evolución de Pokémon pendientes, salen primero
    // Si hay cartas de evolución de Pokémon o Megaevolución pendientes, salen primero
    const evoMons = pool.filter(c => c.type === 'evo_mon' || c.type === 'mega_evo');
    if (evoMons.length > 0) {
      for (const c of evoMons) {
        if (picked.length < n) {
          const idx = pool.indexOf(c);
          if (idx >= 0) pool.splice(idx, 1);
          used.add(c.key);
          picked.push(c);
        }
      }
    }
    // Si hay una evolución lista, su carta dorada sale siempre.
    const evo = pool.findIndex(c => c.type === 'evo');
    if (evo >= 0 && picked.length < n) { const c = pool.splice(evo, 1)[0]; used.add(c.key); picked.push(c); }

    while (picked.length < n && pool.length) {
      const total = pool.reduce((a, c) => a + c.w, 0);
      let r = Math.random() * total, idx = 0;
      for (let i = 0; i < pool.length; i++) { r -= pool[i].w; if (r <= 0) { idx = i; break; } }
      const c = pool.splice(idx, 1)[0];
      if (used.has(c.key)) continue;
      used.add(c.key);
      picked.push(c);
    }
    return picked;
  }

  function open() {
    if (typeof G !== 'undefined' && G.Game && G.Game.openLevelUp) {
      G.Game.openLevelUp();
    }
  }

  return { offer, STATS, open };
})();
