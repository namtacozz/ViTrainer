/* ============ combat.js — ejecución de movimientos y colisiones ============
 * Sólo se ejecuta el movimiento ACTIVO del jugador. Cada `kind` tiene aquí su
 * implementación. Todos los ataques dañan también los objetos destructibles
 * del escenario (rocas, cofres, hierba alta).
 *
 * Todo ocurre en el plano del suelo: (x, y) son pies / sombra.
 *
 * Cooperativo: cada ordenador ejecuta los ataques de SU jugador. Los de los
 * compañeros llegan por la red y se repiten como "fantasma" (ghostCast): se
 * ven igual, pero no hacen daño aquí (ya lo hizo su dueño).
 *
 * Lo que se queda en el mapa un rato (minas, meteoros que caen, torretas,
 * charcos del rastro) vive en `fields` y se actualiza/dibuja aquí.
 */
G.Combat = (() => {
  let ghost = false;
  let fields = [];

  // ---------------- ejecutar el movimiento activo ----------------

  function tick(dt, pl, now) {
    if (pl.dead) return;
    // Vínculos: todos los movimientos del hueco activo, cada uno con su recarga.
    for (const m of pl.activeGroup()) tickMove(dt, pl, m, now);
  }

  function tickMove(dt, pl, m, now) {
    if (m.kind === 'orbit') { orbit(pl, m, dt, now); return; }

    m.t -= dt;
    if (m.t > 0) return;
    // Los ataques que necesitan blanco esperan a tenerlo (no gastes animación al aire).
    if (needsTarget(m, pl) && !(pl.target && G.U.dist(pl.x, pl.y, pl.target.x, pl.target.y) <= reach(m))) {
      m.t = 0.05;
      return;
    }
    // (Bromista: los potenciadores se recargan antes, ver data/ability-fx.js.)
    const arcaneCd = (m && m.cat === 'special' && pl && (pl.arcaneActive || (pl.hasTrialBonus && pl.hasTrialBonus('arcane')))) ? 0.88 : 1;
    m.t = Math.max(0.05, m.cd * pl.cdMul * arcaneCd * (m.kind === 'buff' && pl.abil && pl.abil.statusCd || 1));
    pl.cast(m);
    if (G.Coop.active) G.Coop.cast(pl, m);
    // Vínculo: su icono destella en el HUD al lanzarse (uno que explota pegado al
    // enemigo, como Ascuas tras Ataque Rápido, casi no se ve).
    m.castAt = performance.now();

    run(pl, m);
  }

  function countFor(pl, m) {
    let n = Math.max(1, m.count | 0);
    if (pl && pl.hasItem && pl.hasItem('loadeddice') && ((m.count || 1) > 1 || m.bounce || m.waves || (m.pierce && m.pierce > 1) || m.kind === 'boomerang' || m.kind === 'chain')) {
      n += 2;
    }
    return n;
  }

  function run(pl, m) {
    if (pl && pl.abil && m.type === 'normal') {
      if (pl.abil.pixilate) m = Object.assign({}, m, { type: 'fairy' });
      else if (pl.abil.aerilate) m = Object.assign({}, m, { type: 'flying' });
      else if (pl.abil.refrigerate) m = Object.assign({}, m, { type: 'ice' });
    }
    if (pl && pl.abil && pl.abil.protean && pl.mon && m.type) {
      pl.mon.types = [m.type];
    }
    switch (m.kind) {
      case 'projectile': fireProjectiles(pl, m); break;
      case 'melee':      melee(pl, m); break;
      case 'beam':       beam(pl, m); break;
      case 'nova':       nova(pl, m); break;
      case 'aura':       aura(pl, m); break;
      case 'buff':       buff(pl, m); break;
      case 'boomerang':  boomerang(pl, m); break;
      case 'chain':      chain(pl, m); break;
      case 'mine':       mines(pl, m); break;
      case 'meteor':     meteors(pl, m); break;
      case 'turret':     turret(pl, m); break;
      case 'dash':       dash(pl, m); break;
      case 'trail':      trailPatch(pl, m); break;
      case 'cone':       cone(pl, m); break;
      case 'homing':     fireProjectiles(pl, m); break;      // persiguen: m.homing
      case 'bounce':     fireProjectiles(pl, m); break;      // rebotan: m.bounce (ver rebound)
      case 'charge':     chargeUp(pl, m); break;
      case 'spin':       spin(pl, m); break;
      case 'quake':      quake(pl, m); break;
      case 'vortex':     vortex(pl, m); break;
      case 'shove':      shove(pl, m); break;
      case 'stun':       stunZone(pl, m); break;
    }
  }

  const TARGETED = ['melee', 'beam', 'projectile', 'boomerang', 'chain', 'meteor', 'dash', 'cone',
                    'homing', 'bounce', 'charge', 'spin', 'quake', 'vortex', 'shove', 'stun'];
  // Con "Apuntar a mano" éstos se lanzan hacia donde apuntas aunque no haya
  // nadie (los decide el jugador); la cadena y los meteoros siguen esperando blanco.
  const FREE_AIM = ['melee', 'beam', 'projectile', 'boomerang', 'dash', 'cone', 'homing', 'bounce', 'charge', 'spin', 'quake', 'shove'];
  function needsTarget(m, pl) { return TARGETED.includes(m.kind) && !(pl && pl.manualAim && FREE_AIM.includes(m.kind)); }
  function reach(m) {
    if (m.kind === 'melee') return m.radius + 30;
    if (m.kind === 'beam') return m.radius + 20;
    if (m.kind === 'boomerang') return m.radius + 40;
    if (m.kind === 'chain') return 280;
    if (m.kind === 'meteor') return 340;
    if (m.kind === 'dash') return m.radius + 60;
    if (m.kind === 'cone') return m.speed * m.life + 30;
    if (m.kind === 'spin' || m.kind === 'shove' || m.kind === 'charge') return m.radius + 20;
    if (m.kind === 'quake') return (m.count | 0) * QSTEP + m.radius;
    if (m.kind === 'vortex' || m.kind === 'stun') return 300;
    return 520;
  }

  function payload(m) {
    return { burn: m.burn || 0, poison: m.poison || 0, slow: m.slow || 0, knock: m.knock || 0, mtype: m.type, mcat: m.cat, src: m,
             bounce: m.bounce | 0, drain: m.drain || 0 };
  }

  /** Tabla de tipos × clima para un ataque de tipo `type` contra `e`. */
  function typeK(type, e) { return G.Types.mult(type, e.types) * G.Weather.mult(type); }

  /** Un proyectil del movimiento m, de pl hacia el ángulo a. */
  function shot(pl, m, a, col, vis) {
    const extraPierce = (pl && m && m.cat === 'special' && (pl.arcaneActive || (pl.hasTrialBonus && pl.hasTrialBonus('arcane')))) ? 1 : 0;
    const sizeMul = (pl && m && m.cat === 'physical' && (pl.berserkerActive || (pl.hasTrialBonus && pl.hasTrialBonus('berserker')))) ? 1.15 : 1;
    G.Projectiles.spawn(Object.assign({
      x: pl.x + Math.cos(a) * 3, y: pl.y + Math.sin(a) * 3,
      vx: Math.cos(a) * m.speed, vy: Math.sin(a) * m.speed,
      dmg: m.dmg * pl.atkFor(m), r: (m.size || 6) * sizeMul, life: m.life,
      pierce: (m.pierce | 0) + extraPierce, color: col, homing: m.homing || 0,
      hits: new Set(), vis, ghost, owner: pl
    }, payload(m)));
  }

  function fireProjectiles(pl, m) {
    const col = G.U.TYPE_COLOR[m.type];
    const vis = G.VFX.forMove(m);
    const n = countFor(pl, m);
    const spread = m.spread || 0;
    for (let i = 0; i < n; i++) {
      const off = n === 1 ? 0 : (i / (n - 1) - 0.5) * spread * n;
      const a = pl.aim + off + G.U.rand(-0.03, 0.03);
      shot(pl, m, a, col, vis);
    }
    G.FX.spark(pl.x + Math.cos(pl.aim) * pl.r, pl.y - G.LIFT + Math.sin(pl.aim) * pl.r,
               col, Math.cos(pl.aim), Math.sin(pl.aim), 3);
    // Fusion Flare +++ (Reshiram): Cầu lửa bộc phát quầng nhật hoa rực lửa xung quanh Reshiram và bắn thêm 2 cầu lửa phụ
    if (m.id === 'fusion-flare' && (m.evoTier >= 3 || (m.name && m.name.includes('+++')))) {
      G.FX.burst(pl.x, pl.y, '#ef4444', 32, 260);
      G.FX.ring(pl.x, pl.y, pl.r * 1.5, 150, '#f97316', 0.6, 8);
      for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, 150)) {
        hit(pl, e, m.dmg * pl.atkFor(m) * 0.85, '#ef4444', e.x - pl.x, e.y - pl.y, 120, m);
      }
      [-0.35, 0.35].forEach(angOff => {
        shot(pl, m, pl.aim + angOff, '#f97316', vis);
      });
    }
  }

  function nova(pl, m) {
    const col = G.U.TYPE_COLOR[m.type];
    const vis = G.VFX.forMove(m);
    const n = Math.max(3, countFor(pl, m));
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.2832 + G.U.rand(-0.06, 0.06);
      shot(pl, m, a, col, vis);
    }
    G.FX.ring(pl.x, pl.y, pl.r, pl.r * 4, col, 0.3, 3);
    // Dark Void (Darkrai): Hư Vô Ác Mộng kéo xoáy, ru ngủ toàn bộ quái và thiêu đốt ác mộng liên tục
    if (m.id === 'dark-void') {
      const vx = pl.x + Math.cos(pl.aim) * 90, vy = pl.y + Math.sin(pl.aim) * 90;
      fields.push({
        kind: 'vortex', owner: pl, ghost, m, col: '#581c87', vis,
        x: vx, y: vy, t: 0, life: 3.5, r: 150, tick: 0.25, dmg: m.dmg * pl.atkFor(m) * 0.75, pull: 220
      });
      for (const e of G.EnemyMgr.queryCircle(vx, vy, 160)) {
        if (!e.dead && e.applySleep) e.applySleep(3.0);
      }
      G.FX.ring(vx, vy, 10, 160, '#7e22ce', 0.6, 6);
      G.FX.burst(vx, vy, '#3b0764', 30, 240);
    }
    // Fleur Cannon (Magearna): Nổ pháo hoa bung 8 chùm đạn pháo hoa linh hồn truy kích
    if (m.id === 'fleur-cannon') {
      for (let i = 0; i < 8; i++) {
        const fAng = (i / 8) * 6.2832;
        G.Projectiles.spawn(Object.assign({
          x: pl.x, y: pl.y, vx: Math.cos(fAng) * 290, vy: Math.sin(fAng) * 290,
          dmg: m.dmg * pl.atkFor(m) * 0.6, r: 9, life: 2.2, color: '#f472b6',
          homing: 8, hits: new Set(), vis, ghost, owner: pl
        }, payload(m)));
      }
      G.FX.ring(pl.x, pl.y, 10, 160, '#f472b6', 0.5, 5);
    }
    // Glaciate (Kyurem): Hơi thở Băng Cực Độ đóng băng cứng (Freeze Stun) toàn bộ quái trong vùng
    if (m.id === 'glaciate') {
      for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, 170)) {
        if (!e.dead && e.applyStun) e.applyStun(2.2);
        if (e.applySlow) e.applySlow(0.6);
      }
      G.FX.ring(pl.x, pl.y, 12, 170, '#38bdf8', 0.7, 6);
      G.FX.burst(pl.x, pl.y, '#93c5fd', 28, 240);
    }
    // Roar of Time +++: Ngưng đọng thời gian làm đóng băng toàn bộ kẻ địch trong 2.5s
    if (m.id === 'roar-of-time' && (m.evoTier >= 3 || (m.name && m.name.includes('+++')))) {
      for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, (m.radius || 280) * 1.25)) {
        if (!e.dead) e.applyStun(2.5);
      }
      G.FX.ring(pl.x, pl.y, 10, (m.radius || 280) * 1.25, '#38bdf8', 0.6, 5);
      G.FX.burst(pl.x, pl.y, '#93c5fd', 25, 260);
    }
  }

  function inArc(px, py, x, y, aim, half) {
    const a = Math.atan2(y - py, x - px);
    return Math.abs(((a - aim + Math.PI * 3) % 6.2832) - Math.PI) <= half;
  }

  function melee(pl, m) {
    const col = G.U.TYPE_COLOR[m.type];
    const half = Math.min(m.arc, 6.2832) / 2;
    G.FX.slash(pl.x, pl.y - G.LIFT * 0.5, pl.aim, m.radius, m.arc, col, G.VFX.forMove(m));
    if (ghost) return;

    for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, m.radius)) {
      if (!inArc(pl.x, pl.y, e.x, e.y, pl.aim, half)) continue;
      hit(pl, e, m.dmg * pl.atkFor(m), col, e.x - pl.x, e.y - pl.y, m.knock || 0, m);
    }
    for (const p of G.World.propsInCircle(pl.x, pl.y, m.radius)) {
      if (inArc(pl.x, pl.y, p.x, p.y, pl.aim, half)) G.World.damageProp(p, m.dmg * pl.atkFor(m), col);
    }
    // Spacial Rend +++: Để lại vết rách không gian chân không tồn tại 3s liên tục chém chí mạng
    if (m.id === 'spacial-rend' && (m.evoTier >= 3 || (m.name && m.name.includes('+++')))) {
      const rx = pl.x + Math.cos(pl.aim) * (m.radius * 0.75);
      const ry = pl.y + Math.sin(pl.aim) * (m.radius * 0.75);
      fields.push({
        kind: 'patch', owner: pl, ghost, m, col: '#a855f7', vis: G.VFX.forMove(m),
        x: rx, y: ry, t: 0, life: 3.0, r: 80, tick: 0, dmg: m.dmg * pl.atkFor(m) * 1.4
      });
      G.FX.burst(rx, ry, '#c084fc', 20, 200);
      G.FX.ring(rx, ry, 6, 90, '#a855f7', 0.45, 4);
    }
    // Behemoth Blade (Zacian): Kiếm khí ánh bạc cự cực đại + Buff tốc độ và chí mạng + Xuyên thấu
    if (m.id === 'behemoth-blade') {
      const isSupreme = (m.evoTier >= 3 || (m.name && m.name.includes('+++')));
      const waveCount = isSupreme ? 3 : (m.evoTier >= 1 ? 2 : 1);
      const sp = isSupreme ? 650 : 540;
      for (let w = 0; w < waveCount; w++) {
        const wAng = pl.aim + (waveCount === 1 ? 0 : (w - (waveCount - 1) / 2) * 0.24);
        const wca = Math.cos(wAng), wsa = Math.sin(wAng);
        G.Projectiles.spawn(Object.assign({
          x: pl.x + wca * 24, y: pl.y + wsa * 24, vx: wca * sp, vy: wsa * sp,
          dmg: m.dmg * pl.atkFor(m) * (isSupreme ? 2.2 : 1.3), r: 24, life: 1.6, pierce: 999, color: '#38bdf8',
          hits: new Set(), vis: G.VFX.forMove(m), ghost, owner: pl
        }, payload(m)));
      }
      if (pl.addBuff) {
        pl.addBuff('spd', 0.12, 3.5, 3);
        pl.critChance = Math.min(0.5, (pl.critChance || 0) + 0.05);
      }
      G.FX.slash(pl.x + Math.cos(pl.aim) * 50, pl.y + Math.sin(pl.aim) * 50 - G.LIFT * 0.5, pl.aim, m.radius * 1.5, 2.5, '#38bdf8', G.VFX.forMove(m));
    }
    // Plasma Fists (Zeraora): Chuỗi đấm điện quang siêu tốc phóng sét xích (Chain Lightning) lan 5 mục tiêu
    if (m.id === 'plasma-fists') {
      let chainTarget = G.Projectiles.nearest(G.EnemyMgr.all(), pl.x, pl.y, (m.radius || 100) * 1.8);
      let fx = pl.x, fy = pl.y;
      const chained = new Set();
      for (let c = 0; c < 5 && chainTarget; c++) {
        chained.add(chainTarget.id);
        G.FX.beam(fx, fy - G.LIFT, Math.atan2(chainTarget.y - fy, chainTarget.x - fx), Math.hypot(chainTarget.x - fx, chainTarget.y - fy), 14, '#facc15');
        hit(pl, chainTarget, m.dmg * pl.atkFor(m) * 0.85, '#facc15', chainTarget.x - fx, chainTarget.y - fy, 60, m);
        if (chainTarget.applyStun) chainTarget.applyStun(0.7);
        fx = chainTarget.x; fy = chainTarget.y;
        const nextList = G.EnemyMgr.queryCircle(fx, fy, 160).filter(e => !e.dead && !chained.has(e.id));
        chainTarget = nextList.length ? nextList[0] : null;
      }
      G.FX.burst(pl.x, pl.y, '#facc15', 20, 180);
      G.FX.ring(pl.x, pl.y, 6, 120, '#fde047', 0.4, 4);
    }
  }

  function beam(pl, m) {
    const col = G.U.TYPE_COLOR[m.type] || '#ffd23f';

    // Tia beam liên tục: duy trì / làm mới thời gian chiếu đốt
    let existing = fields.find(f => f.kind === 'continuous_beam' && f.owner === pl && f.m.id === m.id);
    if (existing) {
      existing.life = Math.max(existing.life, existing.t + 1.8);
      return;
    }

    fields.push({
      kind: 'continuous_beam',
      owner: pl,
      ghost,
      m,
      col,
      vis: G.VFX.forMove(m),
      t: 0,
      life: 1.8,
      tick: 0,
      target: null,
      aim: pl.aim
    });
  }

  function aura(pl, m) {
    const col = G.U.TYPE_COLOR[m.type];
    G.FX.ring(pl.x, pl.y, m.radius * 0.5, m.radius, col, 0.28, 2);
    const vis = G.VFX.forMove(m);
    if (vis.aura) {
      for (let i = 0; i < 5; i++) {
        const a = Math.random() * 6.2832, r = m.radius * G.U.rand(0.45, 1);
        const x = pl.x + Math.cos(a) * r, y = pl.y + Math.sin(a) * r * 0.8 - G.LIFT * 0.5;
        // Hierba Lazo tira hacia ti; veneno y sombras suben; el resto gira.
        const v = vis.inward ? [-Math.cos(a) * r * 2.2, -Math.sin(a) * r * 1.8]
                : vis.rise ? [G.U.rand(-10, 10), -55]
                : [-Math.sin(a) * 70, Math.cos(a) * 55];
        G.FX.sp(vis.aura, vis.pal, x, y, { vx: v[0], vy: v[1], life: 0.42,
          spin: G.VFX.spins(vis.aura) ? G.U.rand(-6, 6) : 0 });
      }
    }
    if (ghost) return;
    let healed = 0;
    for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, m.radius)) {
      hit(pl, e, m.dmg * pl.atkFor(m), col, e.x - pl.x, e.y - pl.y, 0, m);
      if (m.drain) healed += m.drain;
    }
    for (const p of G.World.propsInCircle(pl.x, pl.y, m.radius)) G.World.damageProp(p, m.dmg * pl.atkFor(m), col);
    if (healed > 0) pl.heal(Math.min(healed, 6));
  }

  function buff(pl, m) {
    if (m.stat) {
      pl.addBuff(m.stat, m.amount, m.dur, m.stacks | 0);
    }
    // Chiêu Roost: chỉ thuần túy hồi 1% máu tối đa mỗi lần cast, không tăng def, không quá OP
    if (m.id === 'roost' || m.healPct) {
      const healAmt = Math.max(1, Math.round(pl.maxHp * (m.healPct || 0.01)));
      pl.heal(healAmt);
      if (G.FX && G.FX.floatText) G.FX.floatText(pl.x, pl.y - pl.r * 1.2, '+' + healAmt, '#5fe08a');
    }
    const col = G.U.TYPE_COLOR[m.type];
    G.FX.ring(pl.x, pl.y, pl.r * 2.4, pl.r * 1.1, col, 0.35, 2.5);
    const vis = G.VFX.forMove(m);
    for (let i = 0; i < 3; i++) {
      G.FX.sp(vis.buff || 'arrow', vis.pal, pl.x + G.U.rand(-pl.r * 1.4, pl.r * 1.4),
              pl.y - G.U.rand(0, pl.bodyH * 0.8), { vy: -70, life: 0.6 });
    }
    // Geomancy (Xerneas): Thần Mộc Khởi Nguyên ban phước hồi 3% HP, buff +25% Công, -20% Hồi chiêu và bắn 8 chùm phấn tiên
    if (m.id === 'geomancy') {
      pl.heal(Math.max(1, Math.round(pl.maxHp * 0.03)));
      if (pl.addBuff) {
        pl.addBuff('atk', 0.25, 6.0, 1);
        pl.addBuff('cd', 0.20, 6.0, 1);
      }
      G.FX.ring(pl.x, pl.y, 8, 160, '#ec4899', 0.7, 6);
      G.FX.ring(pl.x, pl.y, 14, 120, '#a855f7', 0.5, 4);
      const colList = ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'];
      for (let i = 0; i < 8; i++) {
        const pAng = (i / 8) * 6.2832;
        G.Projectiles.spawn(Object.assign({
          x: pl.x, y: pl.y, vx: Math.cos(pAng) * 280, vy: Math.sin(pAng) * 280,
          dmg: (m.dmg || 25) * pl.atkFor(m) * 1.2, r: 10, life: 2.2, color: colList[i % colList.length],
          homing: 8, hits: new Set(), vis, ghost, owner: pl
        }, payload(m)));
      }
    }
  }

  // ---------------- familias nuevas (2026-10-10) ----------------

  /** Bumerán: sale hacia el enemigo, se para y vuelve a ti golpeando a la ida y a la vuelta. */
  function boomerang(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    const n = countFor(pl, m), spread = m.spread || 0.5;
    const out = m.radius / m.speed;                       // segundos de ida
    for (let i = 0; i < n; i++) {
      const a = pl.aim + (n === 1 ? 0 : (i / (n - 1) - 0.5) * spread * Math.min(n, 3));
      G.Projectiles.spawn(Object.assign({
        x: pl.x, y: pl.y, vx: Math.cos(a) * m.speed, vy: Math.sin(a) * m.speed,
        dmg: m.dmg * pl.atkFor(m), r: m.size || 8, life: out * 4 + 1.5, pierce: 999, color: col,
        hits: new Set(), vis, ghost, owner: pl, boom: out, bsp: m.speed * 1.1
      }, payload(m)));
    }
  }

  /** Cadena: golpea a un enemigo y salta a los siguientes más cercanos (cada salto, algo menos). */
  function chain(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    let cur = pl.target && !pl.target.dead && pl.target.hurt ? pl.target : G.Projectiles.nearest(G.EnemyMgr.all(), pl.x, pl.y, reach(m));
    if (!cur) return;
    let fx = pl.x, fy = pl.y - G.LIFT, k = 1;
    const done = new Set();
    const n = countFor(pl, m);
    for (let i = 0; i < n && cur; i++) {
      done.add(cur.id);
      const tx = cur.x, ty = cur.y - cur.bodyH * 0.5;
      G.FX.beam(fx, fy, Math.atan2(ty - fy, tx - fx), Math.hypot(tx - fx, ty - fy), 10, col, vis);
      if (!ghost) {
        // Infortunio: más daño a quien ya sufre un estado.
        // (Una copia del anfitrión no lleva los estados: vienen en net.st.)
        const hex = m.hex && (cur.burn > 0 || cur.poison > 0 || cur.slow > 0 || (cur.net && cur.net.st & 11)) ? m.hex : 1;
        hit(pl, cur, m.dmg * pl.atkFor(m) * k * hex, col, tx - fx, ty - fy, 0, m);
        // Freeze Shock +++ (Black Kyurem): Bão lôi băng bộc phá vòng điện lạnh tuyệt đối, bắn ra 4 luồng tinh thể băng lôi đâm xuyên 4 hướng
        if (m.id === 'freeze-shock' && (m.evoTier >= 3 || (m.name && m.name.includes('+++')))) {
          G.FX.ring(tx, ty, 8, 95, '#38bdf8', 0.4, 6);
          G.FX.burst(tx, ty, '#0284c7', 16, 200);
          for (let ang = 0; ang < 6.28; ang += 1.57) {
            G.Projectiles.spawn(Object.assign({
              x: tx, y: ty, vx: Math.cos(ang) * 320, vy: Math.sin(ang) * 320,
              dmg: m.dmg * pl.atkFor(m) * 0.75, r: 10, life: 0.65, pierce: 4, color: '#38bdf8',
              hits: new Set(), vis, ghost, owner: pl, slow: 0.8, stun: 0.8
            }, payload(m)));
          }
        }
      }
      k *= 0.85;
      fx = tx; fy = ty;
      let best = null, bd = m.radius * m.radius;
      for (const e of G.EnemyMgr.queryCircle(cur.x, cur.y, m.radius)) {
        if (done.has(e.id)) continue;
        const d = G.U.dist2(cur.x, cur.y, e.x, e.y);
        if (d < bd) { bd = d; best = e; }
      }
      cur = best;
    }
    if (!ghost) G.Camera.kick(0.05);
  }

  /** Minas: se quedan en el suelo y estallan cuando un enemigo las pisa. */
  function mines(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    const n = Math.max(1, m.count | 0);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.2832, d = n === 1 ? 0 : G.U.rand(18, 46);
      fields.push({ kind: 'mine', owner: pl, ghost, m, col, vis, x: pl.x + Math.cos(a) * d, y: pl.y + Math.sin(a) * d * 0.8,
                    t: 0, arm: 0.35, life: m.dur || 7, r: m.radius, dmg: m.dmg * pl.atkFor(m) });
    }
    // Como mucho unas pocas por jugador: las más viejas se van.
    const mine = fields.filter(f => f.kind === 'mine' && f.owner === pl);
    for (const f of mine.slice(0, Math.max(0, mine.length - (4 + n * 2)))) f.gone = true;
  }

  /** Meteoros: caen del cielo sobre enemigos cercanos (la sombra avisa dónde). */
  function meteors(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    const n = Math.max(1, m.count | 0);
    const near = G.EnemyMgr.queryCircle(pl.x, pl.y, reach(m)).filter(e => !e.dead);
    G.U.shuffle ? G.U.shuffle(near) : near.sort(() => Math.random() - 0.5);
    for (let i = 0; i < n; i++) {
      const e = near[i];
      const x = e ? e.x + G.U.rand(-8, 8) : pl.x + G.U.rand(-140, 140);
      const y = e ? e.y + G.U.rand(-6, 6) : pl.y + G.U.rand(-110, 110);
      fields.push({ kind: 'meteor', owner: pl, ghost, m, col, vis, x, y, t: -i * 0.09, fall: 0.5, r: m.radius, dmg: m.dmg * pl.atkFor(m) });
    }
  }

  /** Torreta: deja algo en el suelo que dispara solo un rato. */
  function turret(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    const a = pl.aim + Math.PI + G.U.rand(-0.6, 0.6);
    fields.push({ kind: 'turret', owner: pl, ghost, m, col, vis, x: pl.x + Math.cos(a) * 26, y: pl.y + Math.sin(a) * 20,
                  t: 0, life: m.dur || 6, shotT: 0.3, dmg: m.dmg * pl.atkFor(m) });
    const mine = fields.filter(f => f.kind === 'turret' && f.owner === pl && !f.gone);
    for (const f of mine.slice(0, Math.max(0, mine.length - Math.max(1, m.count | 0)))) f.gone = true;
    G.FX.ring(pl.x, pl.y, 4, 30, col, 0.3, 2);
  }

  /** Embestida: cruzas como un rayo hacia el enemigo y golpeas a todo lo del camino. */
  function dash(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    const ca = Math.cos(pl.aim), sa = Math.sin(pl.aim);
    const sx = pl.x, sy = pl.y;
    let len = 0;
    for (let d = 8; d <= m.radius; d += 8) {
      if (!G.World.isFree(sx + ca * d, sy + sa * d, pl.r * 0.8, true)) break;
      len = d;
    }
    // Estela: varias copias del golpe a lo largo del recorrido.
    for (let d = 0; d <= len; d += 22) G.FX.sp(vis.proj || 'streak', vis.pal, sx + ca * d, sy + sa * d - G.LIFT * 0.6, { life: 0.22, angle: pl.aim });
    G.FX.slash(sx + ca * len, sy + sa * len - G.LIFT * 0.5, pl.aim, 34, 2.2, col, vis);
    if (ghost) return;
    pl.x = sx + ca * len; pl.y = sy + sa * len;
    G.World.collide(pl);
    pl.invuln = Math.max(pl.invuln || 0, 0.3);
    const w = m.width || 34;
    const mx = sx + ca * len / 2, my = sy + sa * len / 2;
    for (const e of G.EnemyMgr.queryCircle(mx, my, len / 2 + w)) {
      if (segDist2(sx, sy, pl.x, pl.y, e.x, e.y) <= (w / 2 + e.r) ** 2) hit(pl, e, m.dmg * pl.atkFor(m), col, ca, sa, m.knock || 0, m);
    }
    for (const p of G.World.propsInCircle(mx, my, len / 2 + w)) {
      if (segDist2(sx, sy, pl.x, pl.y, p.x, p.y) <= (w / 2 + p.r) ** 2) G.World.damageProp(p, m.dmg * pl.atkFor(m), col);
    }
    // Cơ chế đặc quyền Dragon Ascent +++: Lúc lướt để lại các vệt nổ tuần tự từ đầu lướt đến đích sau một khoảng thời gian
    if (m.id === 'dragon-ascent' && (m.evoTier >= 3 || (m.name && m.name.includes('+++')))) {
      const steps = 7;
      for (let s = 1; s <= steps; s++) {
        const frac = s / steps;
        const wx = sx + ca * (len * frac);
        const wy = sy + sa * (len * frac);
        fields.push({
          kind: 'dragon_wake',
          owner: pl,
          ghost,
          m,
          col: '#22c55e',
          vis,
          x: wx,
          y: wy,
          t: 0,
          delay: 0.12 + s * 0.07, // nổ tuần tự từ vị trí đầu lướt đến đích sau một khoảng thời gian
          r: 54,
          dmg: m.dmg * pl.atkFor(m) * 1.15,
          ca,
          sa
        });
      }
    }
    // Behemoth Bash (Zamazenta): Thần Khiên Bất Hoại chặn 100% sát thương và phản đòn choáng diện rộng
    if (m.id === 'behemoth-bash') {
      const isSupreme = (m.evoTier >= 3 || (m.name && m.name.includes('+++')));
      pl.invuln = Math.max(pl.invuln || 0, isSupreme ? 1.4 : 0.9);
      const rad = isSupreme ? 180 : 130;
      G.FX.ring(pl.x, pl.y, pl.r * 1.5, rad, '#f43f5e', 0.5, 6);
      G.FX.burst(pl.x, pl.y, '#fb7185', 24, 220);
      for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, rad)) {
        hit(pl, e, m.dmg * pl.atkFor(m) * (isSupreme ? 1.8 : 1.3), '#f43f5e', e.x - pl.x, e.y - pl.y, 350, m);
        if (e.applyStun) e.applyStun(isSupreme ? 1.5 : 0.8);
      }
    }
        // Fusion Bolt +++ (Zekrom): Điểm kết thúc cú lướt để lại điện trường ion hóa tồn tại 3.5s và buff +25% tốc chạy/đánh
    if (m.id === 'fusion-bolt' && (m.evoTier >= 3 || (m.name && m.name.includes('+++')))) {
      fields.push({
        kind: 'patch',
        owner: pl,
        ghost,
        m,
        col: '#38bdf8',
        vis,
        x: pl.x,
        y: pl.y,
        t: 0,
        life: 3.5,
        r: 85,
        tick: 0.35,
        dmg: m.dmg * pl.atkFor(m) * 0.5,
        stun: 0.4
      });
      if (pl.addBuff) pl.addBuff('spd', 0.25, 4.0, 1);
      G.FX.ring(pl.x, pl.y, 12, 170, '#38bdf8', 0.6, 8);
      G.FX.burst(pl.x, pl.y, '#0ea5e9', 30, 260);
    }
    // Sunsteel Strike (Solgaleo): Lao vút như thiên thạch mặt trời, bất tử và để lại vệt lửa nóng chảy thiêu đốt
    if (m.id === 'sunsteel-strike') {
      pl.invuln = Math.max(pl.invuln || 0, 1.0);
      fields.push({
        kind: 'patch', owner: pl, ghost, m, col: '#f59e0b', vis,
        x: pl.x, y: pl.y, t: 0, life: 3.5, r: 75, tick: 0.3, dmg: m.dmg * pl.atkFor(m) * 0.7, burn: 1.5
      });
      G.FX.burst(pl.x, pl.y, '#f59e0b', 24, 220);
      G.FX.ring(pl.x, pl.y, 8, 140, '#fbbf24', 0.5, 6);
    }
    // Shadow Force (Giratina): Tan biến vào Thế giới Hư Không tàng hình vô địch rồi chém 360 độ chí mạng
    if (m.id === 'shadow-force') {
      pl.invuln = Math.max(pl.invuln || 0, 1.2);
      if (pl.addBuff) pl.addBuff('spd', 0.50, 1.2, 1);
      G.FX.ring(pl.x, pl.y, 10, 180, '#8b5cf6', 0.6, 6);
      G.FX.burst(pl.x, pl.y, '#a78bfa', 28, 260);
      for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, 170)) {
        if (!e.dead) hit(pl, e, m.dmg * pl.atkFor(m) * 1.8, '#8b5cf6', e.x - pl.x, e.y - pl.y, 220, m);
      }
    }
    // Spectral Thief (Marshadow): Ám sát từ bóng lưng cướp 25% sát thương quái vật
    if (m.id === 'spectral-thief') {
      if (pl.addBuff) pl.addBuff('atk', 0.25, 5.0, 1);
      G.FX.burst(pl.x, pl.y, '#475569', 20, 180);
      G.FX.ring(pl.x, pl.y, 6, 120, '#64748b', 0.4, 4);
    }
    G.Camera.kick(0.12);
  }

  /** Rastro: vas dejando charcos que dañan a lo que pasa por encima. */
  function trailPatch(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    // Parado no deja uno nuevo encima del anterior (sólo de vez en cuando).
    const last = pl.lastPatch;
    if (last && G.U.dist2(last.x, last.y, pl.x, pl.y) < (m.radius * 0.9) ** 2 && last.t < 1) return;
    const f = { kind: 'patch', owner: pl, ghost, m, col, vis, x: pl.x, y: pl.y, t: 0, life: m.dur || 3, r: m.radius,
                tick: 0, dmg: m.dmg * pl.atkFor(m) };
    fields.push(f);
    pl.lastPatch = f;
    const mine = fields.filter(o => o.kind === 'patch' && o.owner === pl && !o.gone);
    for (const o of mine.slice(0, Math.max(0, mine.length - 18))) o.gone = true;
  }

  /** Abanico corto: muchos disparos rápidos que no llegan lejos (aliento, chorro...). */
  function cone(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    const n = Math.max(2, m.count | 0), arc = m.arc || 0.9;
    for (let i = 0; i < n; i++) {
      const a = pl.aim + (i / (n - 1) - 0.5) * arc + G.U.rand(-0.05, 0.05);
      const sp = m.speed * G.U.rand(0.85, 1.1);
      G.Projectiles.spawn(Object.assign({
        x: pl.x + Math.cos(a) * 4, y: pl.y + Math.sin(a) * 4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        dmg: m.dmg * pl.atkFor(m), r: m.size || 8, life: m.life * G.U.rand(0.85, 1.05), pierce: m.pierce | 0, color: col,
        hits: new Set(), vis, ghost, owner: pl
      }, payload(m)));
    }
    G.FX.spark(pl.x + Math.cos(pl.aim) * pl.r, pl.y - G.LIFT + Math.sin(pl.aim) * pl.r, col, Math.cos(pl.aim), Math.sin(pl.aim), 5);
  }

  // ---------------- familias nuevas (2026-10-19) ----------------

  const QSTEP = 34;             // distancia entre ondas de un terremoto

  /** El blanco de un ataque que va a un sitio (remolino, zona): el de siempre si llega; si no, el más cercano. */
  function spotFor(pl, m) {
    const t = pl.target;
    if (t && !t.dead && t.hurt && G.U.dist(pl.x, pl.y, t.x, t.y) <= reach(m)) return t;
    return G.Projectiles.nearest(G.EnemyMgr.all(), pl.x, pl.y, reach(m));
  }

  /** Carga: brilla un momento y sale un rayo enorme (el de beam, con su grosor). */
  function chargeUp(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m), at = m.charge || 0.75;
    fields.push({ kind: 'charge', owner: pl, ghost, m, col, vis, x: pl.x, y: pl.y, t: 0, at });
    G.FX.ring(pl.x, pl.y - G.LIFT * 0.5, pl.r * 3.2, pl.r * 0.8, col, at, 2);
  }

  /** Giro: golpea todo alrededor `count` veces seguidas (lo hace updateFields). */
  function spin(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    fields.push({ kind: 'spin', owner: pl, ghost, m, col, vis, x: pl.x, y: pl.y, t: 0, n: Math.max(1, m.count | 0), next: 0, a: pl.aim });
  }

  /** Terremoto: una onda avanza en línea delante de ti, explosión tras explosión. */
  function quake(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    fields.push({ kind: 'quake', owner: pl, ghost, m, col, vis, x: pl.x, y: pl.y, t: 0, ca: Math.cos(pl.aim), sa: Math.sin(pl.aim),
                  i: 0, n: Math.max(1, m.count | 0), next: 0, dmg: m.dmg * pl.atkFor(m) });
    // Thousand Arrows (Zygarde): Bắn rơi quái bay (triệt tiêu hover/flying) và ghim chặt quái xuống đất
    if (m.id === 'thousand-arrows') {
      for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, 240)) {
        if (!e.dead) {
          e.flying = false;
          if (e.applyStun) e.applyStun(1.0);
          hit(pl, e, m.dmg * pl.atkFor(m) * 0.9, '#a3e635', 0, 0, 0, m);
        }
      }
      G.FX.ring(pl.x, pl.y, 10, 240, '#a3e635', 0.5, 5);
      G.FX.burst(pl.x, pl.y, '#84cc16', 25, 220);
    }
    // Thousand Waves (Zygarde): 3 đợt sóng địa chấn 360 độ đẩy lùi kẻ thù cực mạnh
    if (m.id === 'thousand-waves') {
      for (let w = 1; w <= 3; w++) {
        setTimeout(() => {
          if (!pl || pl.dead) return;
          const wr = w * 75;
          G.FX.ring(pl.x, pl.y, 8, wr, '#84cc16', 0.4, 4);
          for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, wr)) {
            if (!e.dead) hit(pl, e, m.dmg * pl.atkFor(m) * 0.6, '#84cc16', e.x - pl.x, e.y - pl.y, 320, m);
          }
        }, w * 140);
      }
    }
    // Land's Wrath (Zygarde): Khe nứt dung nham địa chấn nổ tung hình chữ Z
    if (m.id === 'lands-wrath') {
      [-1, 0, 1].forEach((off, idx) => {
        const nx = pl.x + Math.cos(pl.aim) * (idx * 60 + 40) - Math.sin(pl.aim) * (off * 50);
        const ny = pl.y + Math.sin(pl.aim) * (idx * 60 + 40) + Math.cos(pl.aim) * (off * 50);
        fields.push({
          kind: 'patch', owner: pl, ghost, m, col: '#f59e0b', vis,
          x: nx, y: ny, t: 0, life: 3.0, r: 55, tick: 0.3, dmg: m.dmg * pl.atkFor(m) * 0.7, burn: 1.0
        });
        G.FX.ring(nx, ny, 6, 60, '#f59e0b', 0.4, 4);
      });
    }
    if (!ghost) G.Camera.kick(0.1);
  }

  /** Remolino: sale donde está el enemigo, los atrae al centro y les va dañando. */
  function vortex(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m), tg = spotFor(pl, m);
    const x = tg ? tg.x : pl.x + Math.cos(pl.aim) * 120, y = tg ? tg.y : pl.y + Math.sin(pl.aim) * 100;
    fields.push({ kind: 'vortex', owner: pl, ghost, m, col, vis, x, y, t: 0, life: m.dur || 2.6, r: m.radius,
                  tick: 0.15, dmg: m.dmg * pl.atkFor(m), pull: m.pull || 140 });
    G.FX.ring(x, y, m.radius, 6, col, 0.4, 3);
    // Ice Burn +++ (White Kyurem): Tạo 3 vùng lửa băng vĩnh cửu xung quanh tâm xoáy vừa đốt cháy vừa làm chậm
    if (m.id === 'ice-burn' && (m.evoTier >= 3 || (m.name && m.name.includes('+++')))) {
      for (let p = 0; p < 3; p++) {
        const pAng = (p / 3) * 6.28 + Math.random() * 0.5;
        const pDist = G.U.rand(25, (m.radius || 100) * 0.7);
        fields.push({
          kind: 'patch',
          owner: pl,
          ghost,
          m,
          col: '#38bdf8',
          vis,
          x: x + Math.cos(pAng) * pDist,
          y: y + Math.sin(pAng) * pDist,
          t: 0,
          life: 3.8,
          r: 45,
          tick: 0.35,
          dmg: m.dmg * pl.atkFor(m) * 0.45,
          burn: 1.5,
          slow: 0.55
        });
      }
      G.FX.ring(x, y, 12, (m.radius || 100) * 1.3, '#f97316', 0.6, 6);
      G.FX.burst(x, y, '#38bdf8', 25, 200);
    }
    // Como mucho dos a la vez por jugador.
    const mine = fields.filter(f => f.kind === 'vortex' && f.owner === pl && !f.gone);
    for (const f of mine.slice(0, Math.max(0, mine.length - 2))) f.gone = true;
  }

  /** Empujón: onda alrededor que daña y aparta a los enemigos (no a los jefes). */
  function shove(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m);
    G.FX.ring(pl.x, pl.y, pl.r, m.radius, col, 0.35, 4);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * 6.2832;
      G.FX.sp(vis.proj, vis.pal, pl.x + Math.cos(a) * pl.r, pl.y + Math.sin(a) * pl.r * 0.8 - G.LIFT * 0.5,
              { vx: Math.cos(a) * m.radius * 3, vy: Math.sin(a) * m.radius * 2.4, life: 0.3, angle: a });
    }
    if (ghost) return;
    G.Camera.kick(0.1);
    for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, m.radius)) hit(pl, e, m.dmg * pl.atkFor(m), col, e.x - pl.x, e.y - pl.y, m.knock || 300, m);
    for (const p of G.World.propsInCircle(pl.x, pl.y, m.radius)) G.World.damageProp(p, m.dmg * pl.atkFor(m), col);
  }

  /** Aturdir: una zona avisa en el suelo y al momento daña y deja quietos a los que pilla. */
  function stunZone(pl, m) {
    const col = G.U.TYPE_COLOR[m.type], vis = G.VFX.forMove(m), tg = spotFor(pl, m);
    if (!tg) return;
    fields.push({ kind: 'stunzone', owner: pl, ghost, m, col, vis, x: tg.x, y: tg.y, t: 0, delay: 0.45, r: m.radius, dmg: m.dmg * pl.atkFor(m) });
  }

  /** Rebote: el proyectil sale hacia el enemigo más cercano que aún no ha tocado. → true si rebota. */
  function rebound(p, from) {
    if (!(p.bounce > 0)) return false;
    let best = null, bd = 220 * 220;
    for (const e of G.EnemyMgr.queryCircle(from.x, from.y, 220)) {
      if (e.dead || p.hits.has(e.id)) continue;
      const d = G.U.dist2(from.x, from.y, e.x, e.y);
      if (d < bd) { bd = d; best = e; }
    }
    if (!best) return false;
    p.bounce--;
    const sp = Math.hypot(p.vx, p.vy) || 300, [nx, ny] = G.U.norm(best.x - from.x, best.y - from.y);
    p.vx = nx * sp; p.vy = ny * sp; p.x = from.x; p.y = from.y;
    p.t = Math.max(0, p.t - 0.5);                   // un poco más de vida para llegar
    if (Math.random() < 0.6) G.FX.spark(from.x, from.y - G.LIFT, p.color, nx, ny, 3);
    return true;
  }

  /** Cada fotograma de los campos nuevos (los llama updateFields). → true si hay que quitarlo. */
  function tickNewField(f, dt) {
    const pl = f.owner, m = f.m;
    if (f.kind === 'continuous_beam') {
      if (pl.dead || f.t >= f.life) return true;
      const col = f.col;
      const maxReach = reach(m);
      let w = (m.width || 24);
      if (m.id === 'hyper-beam' || m.id === 'solar-beam') w = 55;

      // 1. Tự động tìm & khóa mục tiêu liên tục (Continuous lock-on tracking with instant retargeting on kill)
      if (!f.target || f.target.dead || G.U.dist2(pl.x, pl.y, f.target.x, f.target.y) > (maxReach + 80) * (maxReach + 80)) {
        f.target = G.Projectiles.nearest(G.EnemyMgr.all(), pl.x, pl.y, maxReach);
        f.ramping = 1.0;
      }

      if (f.target && !f.target.dead) {
        f.aim = Math.atan2(f.target.y - pl.y, f.target.x - pl.x);
        pl.aim = f.aim;
        // Bù thêm thời gian chiếu liên tục chừng nào vẫn đang khóa mục tiêu sống
        if (f.life - f.t < 0.8) f.life = f.t + 0.8;
      } else {
        f.aim = pl.aim;
      }

      // Psybeam: sóng tâm linh uốn lượn hình sin ma mị
      let renderAim = f.aim;
      if (m.id === 'psybeam') {
        renderAim += Math.sin(f.t * 22) * 0.12;
      }

      const ca = Math.cos(renderAim), sa = Math.sin(renderAim);

      // 2. Chiều dài tia laser: dừng ở tường trừ Moongeist Beam hoặc Tier 3 xuyên thấu
      let len = maxReach;
      const piercesWall = m.id === 'moongeist-beam' || (m.evoTier >= 3);
      if (!piercesWall) {
        for (let d = 12; d < maxReach; d += 12) {
          if (G.World.isWall(pl.x + ca * d, pl.y + sa * d)) { len = d; break; }
        }
      }

      // 3. Render tia laser liên tục mỗi khung hình với hoạt ảnh đa sắc độc quyền
      const beamColor = (m.id === 'prismatic-laser')
        ? ['#ff0055', '#ff9900', '#ffee00', '#00ff66', '#00ccff', '#aa00ff'][Math.floor((performance.now() * 0.008) % 6)]
        : col;

      G.FX.beam(pl.x, pl.y - G.LIFT, renderAim, len, w, beamColor, f.vis);

      // Hiệu ứng tia phụ cho các chiêu thức độc quyền
      if (m.id === 'core-enforcer' || m.id === 'nihil-light') {
        const sweepAim = renderAim + Math.sin(f.t * 14) * 0.25;
        G.FX.beam(pl.x, pl.y - G.LIFT, sweepAim, len * 0.9, w * 0.5, '#10b981', f.vis);
      } else if (m.id === 'origin-pulse') {
        const perpX = -sa * 14, perpY = ca * 14;
        G.FX.beam(pl.x + perpX, pl.y + perpY - G.LIFT, renderAim, len, w * 0.7, '#38bdf8', f.vis);
        G.FX.beam(pl.x - perpX, pl.y - perpY - G.LIFT, renderAim, len, w * 0.7, '#38bdf8', f.vis);
      } else if (m.id === 'fleur-cannon') {
        const pAng = f.t * 10;
        const perpX = -sa * Math.sin(pAng) * 20, perpY = ca * Math.sin(pAng) * 20;
        G.FX.beam(pl.x + perpX, pl.y + perpY - G.LIFT, renderAim, len * 0.95, w * 0.45, '#f472b6', f.vis);
      }

      // Hạt tia năng lượng tại điểm tiếp xúc
      const tipX = pl.x + ca * len, tipY = pl.y + sa * len - G.LIFT;
      if (Math.random() < dt * 30 && G.Camera.sees(tipX, tipY, 40)) {
        G.FX.spark(tipX, tipY, beamColor, -ca * 60 + G.U.rand(-25, 25), -sa * 60 + G.U.rand(-25, 25), 4);
      }

      // 4. Điểm hồi chiêu (CDR) chuyển hóa thành tốc độ đốt dồn dập (burn tick rate)
      const baseTickRate = 0.065;
      const cdrFactor = Math.max(0.20, Math.min(1.0, ((m.cd || 1) / (m.baseCd || 1)) * (pl.cdMul || 1)));
      const tickInterval = baseTickRate * cdrFactor;

      f.tick -= dt;
      if (f.tick <= 0) {
        f.tick = tickInterval;
        if (!f.ghost) {
          G.Camera.kick(0.03);

          // Dragon Rage: Ramping Damage (càng chiếu lâu sát thương đốt càng tăng vọt)
          if (m.id === 'dragon-rage') {
            f.ramping = Math.min(2.8, (f.ramping || 1.0) + 0.06);
          }
          let tickDmg = m.dmg * pl.atkFor(m) * 0.28 * (f.ramping || 1.0);

          const mx = pl.x + ca * len / 2, my = pl.y + sa * len / 2;
          const onBeam = (x, y, r) => {
            const px = x - pl.x, py = y - pl.y;
            const along = px * ca + py * sa;
            if (along < -r || along > len + r) return false;
            return Math.abs(-px * sa + py * ca) <= w / 2 + r;
          };

          for (const e of G.EnemyMgr.queryCircle(mx, my, len / 2 + w)) {
            if (e.dead) continue;
            if (onBeam(e.x, e.y, e.r)) {
              hit(pl, e, tickDmg, beamColor, ca * 25, sa * 25, 0, m);

              // Ice Beam: tích tầng frostbite, 4 tick đóng băng & nổ Frost Shatter
              if (m.id === 'ice-beam') {
                e._frostTicks = (e._frostTicks || 0) + 1;
                if (e._frostTicks >= 4) {
                  e._frostTicks = 0;
                  e.applyStun(1.4);
                  G.FX.burst(e.x, e.y - e.bodyH * 0.5, '#38bdf8', 14, 200);
                  G.FX.ring(e.x, e.y, 4, 85, '#bae6fd', 0.4, 4);
                  for (const se of G.EnemyMgr.queryCircle(e.x, e.y, 85)) {
                    if (!se.dead && se !== e) {
                      hit(pl, se, tickDmg * 2.2, '#38bdf8', 0, 0, 0, m);
                      se.applySlow ? se.applySlow(0.4, 2.0) : (se.slowT = 2.0);
                    }
                  }
                }
              }

              // Hydro Pump: lực đẩy thủy lực cực mạnh + bắn bọt sóng nước hai bên
              if (m.id === 'hydro-pump') {
                e.x += ca * 220 * dt;
                e.y += sa * 220 * dt;
                if (Math.random() < 0.35) {
                  const perpX = -sa * 28, perpY = ca * 28;
                  G.FX.burst(e.x + perpX, e.y + perpY, '#38bdf8', 4, 90);
                  G.FX.burst(e.x - perpX, e.y - perpY, '#38bdf8', 4, 90);
                  for (const se of G.EnemyMgr.queryCircle(e.x + perpX, e.y + perpY, 40)) if (!se.dead && se !== e) hit(pl, se, tickDmg * 0.5, '#38bdf8', ca * 20, sa * 20, 0, m);
                  for (const se of G.EnemyMgr.queryCircle(e.x - perpX, e.y - perpY, 40)) if (!se.dead && se !== e) hit(pl, se, tickDmg * 0.5, '#38bdf8', ca * 20, sa * 20, 0, m);
                }
              }

              // Psybeam: gây lú lẫn hoảng loạn giật ngược hướng
              if (m.id === 'psybeam') {
                e.x -= ca * 90 * dt;
                e.y -= sa * 90 * dt;
                if (Math.random() < 0.25) G.FX.spark(e.x, e.y - e.bodyH * 0.5, '#c084fc', G.U.rand(-40, 40), G.U.rand(-40, 40), 3);
              }

              // Oblivion Wing: hút 6% sinh lực gây ra hồi máu cho người chơi
              if (m.id === 'oblivion-wing' && pl.heal) {
                pl.heal(Math.max(1, tickDmg * 0.06));
              }

              // Origin Pulse: tạo dòng xoáy kéo mạnh quái vào trục tia nước
              if (m.id === 'origin-pulse') {
                const px = e.x - pl.x, py = e.y - pl.y;
                const along = px * ca + py * sa;
                const centerX = pl.x + ca * along, centerY = pl.y + sa * along;
                e.x += (centerX - e.x) * 0.22;
                e.y += (centerY - e.y) * 0.22;
              }

              // KHI QUÁI CHẾT TRONG LÚC ĐANG BỊ ĐỐT -> LẬP TỨC ĐỔI MỤC TIÊU SANG CON KẾ TIẾP!
              if (e.dead) {
                // Hiệu ứng nổ khi chết theo từng loại chiêu
                if (m.id === 'psybeam') {
                  G.FX.burst(e.x, e.y - e.bodyH * 0.5, '#a855f7', 16, 220);
                  G.FX.ring(e.x, e.y, 6, 95, '#d8b4fe', 0.4, 4);
                  for (const pe of G.EnemyMgr.queryCircle(e.x, e.y, 95)) if (!pe.dead) hit(pl, pe, tickDmg * 2.2, '#a855f7', 0, 0, 0, m);
                } else if (m.id === 'dragon-rage') {
                  G.FX.burst(e.x, e.y - 10, '#f97316', 20, 240);
                  for (const fe of G.EnemyMgr.queryCircle(e.x, e.y, 80)) if (!fe.dead) hit(pl, fe, tickDmg * 2.5, '#f97316', 0, 0, 0, m);
                } else if (m.id === 'oblivion-wing') {
                  G.FX.burst(e.x, e.y, '#e11d48', 16, 200);
                  const nextEnemy = G.Projectiles.nearest(G.EnemyMgr.all(), e.x, e.y, 180);
                  if (nextEnemy && !nextEnemy.dead) hit(pl, nextEnemy, tickDmg * 3.5, '#e11d48', 0, 0, 0, m);
                }

                if (f.target === e) {
                  f.target = G.Projectiles.nearest(G.EnemyMgr.all(), pl.x, pl.y, maxReach);
                  if (f.target) {
                    f.aim = Math.atan2(f.target.y - pl.y, f.target.x - pl.x);
                    pl.aim = f.aim;
                    f.life = Math.max(f.life, f.t + 1.2);
                    f.ramping = 1.0;
                  }
                }
              }
            }
          }

          for (const p of G.World.propsInCircle(mx, my, len / 2 + w)) {
            if (onBeam(p.x, p.y, p.r)) G.World.damageProp(p, tickDmg, beamColor);
          }

          // Flash Cannon: Mỗi 0.35s phóng xung kích từ trường xuyên thấu làm choáng và trừ giáp
          if (m.id === 'flash-cannon') {
            if (!f._fluxT || f.t - f._fluxT >= 0.35) {
              f._fluxT = f.t;
              G.FX.ring(tipX, tipY, 4, 60, '#94a3b8', 0.3, 3);
              for (const fe of G.EnemyMgr.queryCircle(mx, my, len / 2 + w)) {
                if (!fe.dead && onBeam(fe.x, fe.y, fe.r)) {
                  fe.applyStun(0.35);
                  hit(pl, fe, tickDmg * 1.8, '#94a3b8', ca * 50, sa * 50, 0, m);
                }
              }
            }
          }

          // Hyper Beam & Solar Beam: Để lại thảm bức xạ mặt đất thiêu đốt kẻ địch
          if (m.id === 'hyper-beam' || m.id === 'solar-beam') {
            if (Math.random() < 0.3) {
              const rx = pl.x + ca * G.U.rand(30, len), ry = pl.y + sa * G.U.rand(30, len);
              fields.push({
                kind: 'patch', owner: pl, ghost: f.ghost, m, col: beamColor, vis: f.vis,
                x: rx, y: ry, t: 0, life: 3.0, r: 42, tick: 0.3, dmg: tickDmg * 0.9, burn: 1.2
              });
            }
          }

          // Moongeist Beam: Triệu hồi lưỡi liềm nguyệt thực ma ảo chém quái xung quanh mục tiêu
          if (m.id === 'moongeist-beam' && f.target && !f.target.dead) {
            const mAng = f.t * 8;
            const mx1 = f.target.x + Math.cos(mAng) * 45, my1 = f.target.y + Math.sin(mAng) * 45;
            const mx2 = f.target.x - Math.cos(mAng) * 45, my2 = f.target.y - Math.sin(mAng) * 45;
            G.FX.slash(mx1, my1, mAng + 1.57, 40, 2.0, '#c084fc', f.vis);
            G.FX.slash(mx2, my2, mAng - 1.57, 40, 2.0, '#c084fc', f.vis);
            for (const me of G.EnemyMgr.queryCircle(f.target.x, f.target.y, 80)) {
              if (!me.dead && me !== f.target) hit(pl, me, tickDmg * 0.85, '#c084fc', 0, 0, 0, m);
            }
          }

          // Prismatic Laser: Khúc xạ quang phổ thành 4 tia tán xạ cầu vồng khi bắn trúng quái
          if (m.id === 'prismatic-laser' && f.target && !f.target.dead) {
            [-0.78, 0, 0.78, Math.PI].forEach(refrAng => {
              const rAim = f.aim + refrAng;
              const rca = Math.cos(rAim), rsa = Math.sin(rAim);
              const rLen = 150;
              const rCol = ['#38bdf8', '#ec4899', '#a855f7', '#22c55e'][Math.floor(Math.random() * 4)];
              G.FX.beam(f.target.x, f.target.y - G.LIFT, rAim, rLen, w * 0.6, rCol, f.vis);
              for (const re of G.EnemyMgr.queryCircle(f.target.x + rca * 75, f.target.y + rsa * 75, 75)) {
                if (!re.dead && re !== f.target) {
                  hit(pl, re, tickDmg * 0.8, rCol, rca * 40, rsa * 40, 0, m);
                }
              }
            });
          }

          // Core Enforcer: Quét hình chữ Z song song xé toạc phòng thủ
          if (m.id === 'core-enforcer' && (m.evoTier >= 1 || (m.name && m.name.includes('+')))) {
            const zAngle = f.aim + Math.sin(f.t * 12) * 0.35;
            const zca = Math.cos(zAngle), zsa = Math.sin(zAngle);
            G.FX.beam(pl.x, pl.y - G.LIFT, zAngle, len * 0.9, w * 0.6, '#10b981', f.vis);
            for (const ze of G.EnemyMgr.queryCircle(pl.x + zca * (len * 0.45), pl.y + zsa * (len * 0.45), len * 0.5)) {
              if (!ze.dead) hit(pl, ze, tickDmg * 0.65, '#10b981', zca * 25, zsa * 25, 0, m);
            }
          }

          // Nihil Light: Hố đen hư vô nuốt chửng quái vật và phát nổ cực đại
          if (m.id === 'nihil-light') {
            const destX = pl.x + ca * Math.min(len, 240);
            const destY = pl.y + sa * Math.min(len, 240);
            for (const ve of G.EnemyMgr.queryCircle(destX, destY, 130)) {
              if (!ve.dead && !ve.remote) {
                const vdx = destX - ve.x, vdy = destY - ve.y, vd = Math.hypot(vdx, vdy);
                if (vd > 4) { ve.x += (vdx / vd) * 180 * dt; ve.y += (vdy / vd) * 180 * dt; }
              }
            }
            if (Math.random() < 0.4) G.FX.burst(destX, destY, '#f43f5e', 10, 160);
          }
        }
      }
      return false;
    }
    if (f.kind === 'dragon_wake') {
      if (f.t < f.delay) {
        if (G.Camera.sees(f.x, f.y, 40)) {
          G.FX.ring(f.x, f.y, 3, 18, '#22c55e', 0.15, 1.5);
          if (Math.random() < 0.4) G.FX.spark(f.x, f.y - 4, '#86efac', f.ca || 0, f.sa || 0, 3);
        }
        return false;
      }
      // Nổ tuần tự gây sát thương diện rộng và hất tung kẻ địch
      if (G.Camera.sees(f.x, f.y, 40)) {
        G.FX.burst(f.x, f.y - 6, '#22c55e', 16, 200);
        G.FX.ring(f.x, f.y, 8, f.r, '#4ade80', 0.35, 4);
        G.Audio.sfx('hit');
      }
      if (!f.ghost) {
        blast({ ghost: f.ghost, owner: pl, m, col: f.col, dmg: f.dmg, x: f.x, y: f.y }, f.r);
        for (const e of G.EnemyMgr.queryCircle(f.x, f.y, f.r)) {
          if (!e.dead) {
            e.applyStun(0.35);
            hit(pl, e, f.dmg, f.col, (f.ca || 0) * 120, (f.sa || 0) * 120, 160, m);
          }
        }
      }
      return true;
    }
    if (f.kind === 'charge') {
      f.x = pl.x; f.y = pl.y;
      // La energía se junta en ti mientras carga.
      if (Math.random() < dt * 30 && G.Camera.sees(f.x, f.y, 40)) {
        const a = Math.random() * 6.2832, r = G.U.rand(30, 60);
        G.FX.sp(f.vis.proj, f.vis.pal, f.x + Math.cos(a) * r, f.y + Math.sin(a) * r * 0.8 - G.LIFT,
                { vx: -Math.cos(a) * r * 3, vy: -Math.sin(a) * r * 2.4, life: 0.3 });
      }
      if (f.t < f.at) return false;
      if (pl.dead) return true;
      const g = ghost; ghost = f.ghost;
      try { beam(pl, m); } finally { ghost = g; }
      if (!f.ghost) G.Camera.kick(0.25);
      return true;
    }
    if (f.kind === 'spin') {
      f.next -= dt;
      if (f.next > 0) return false;
      f.next = 0.13;
      G.FX.slash(pl.x, pl.y - G.LIFT * 0.5, f.a, m.radius, 3.6, f.col, f.vis);
      f.a += 2.2;
      if (!f.ghost && !pl.dead) {
        const d = m.dmg * pl.atkFor(m);
        for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, m.radius)) hit(pl, e, d, f.col, e.x - pl.x, e.y - pl.y, 40, m);
        for (const p of G.World.propsInCircle(pl.x, pl.y, m.radius)) G.World.damageProp(p, d, f.col);
      }
      return --f.n <= 0;
    }
    if (f.kind === 'quake') {
      f.next -= dt;
      while (f.next <= 0 && f.i < f.n) {
        f.next += 0.07; f.i++;
        const x = f.x + f.ca * f.i * QSTEP, y = f.y + f.sa * f.i * QSTEP, r = m.radius;
        if (G.World.isWall(x, y)) { f.i = f.n; break; }
        if (G.Camera.sees(x, y, 40)) {
          G.FX.ring(x, y, 4, r, f.col, 0.3, 3);
          G.FX.burst(x, y - 4, f.col, 6, 120);
          for (let k = 0; k < 2; k++) G.FX.sp(f.vis.proj, f.vis.pal, x + G.U.rand(-r, r) * 0.5, y - 4, { vy: -G.U.rand(50, 90), vx: G.U.rand(-30, 30), life: 0.35 });
        }
        blast({ ghost: f.ghost, owner: pl, m, col: f.col, dmg: f.dmg, x, y }, r);
      }
      return f.i >= f.n;
    }
    if (f.kind === 'vortex') {
      // Atrae quien tiene los enemigos de verdad: el anfitrión, también con el
      // remolino (fantasma) de un invitado. En el invitado son copias y no se tocan.
      // Antes el fantasma no atraía y en grupo el remolino de un invitado no hacía nada.
      for (const e of G.EnemyMgr.queryCircle(f.x, f.y, f.r * 1.4)) {
        if (e.dead || e.remote) continue;
        const dx = f.x - e.x, dy = f.y - e.y, d = Math.hypot(dx, dy);
        if (d < 4) continue;
        const k = Math.min(d, f.pull * dt * (e.boss || e.judge ? 0.25 : 1));
        e.x += dx / d * k; e.y += dy / d * k;
      }
      f.tick -= dt;
      if (f.tick <= 0) { f.tick = 0.4; blast(f, f.r); }
      if (Math.random() < dt * 16 && G.Camera.sees(f.x, f.y, 40)) {
        const a = Math.random() * 6.2832, rr = f.r * G.U.rand(0.5, 1);
        G.FX.sp(f.vis.proj, f.vis.pal, f.x + Math.cos(a) * rr, f.y + Math.sin(a) * rr * 0.6 - 4,
                { vx: -Math.sin(a) * 110 - Math.cos(a) * 60, vy: Math.cos(a) * 66 - Math.sin(a) * 36, life: 0.45,
                  spin: G.VFX.spins(f.vis.proj) ? 8 : 0 });
      }
      return false;
    }
    if (f.kind === 'stunzone') {
      if (f.t < f.delay) return false;
      G.FX.ring(f.x, f.y, 4, f.r, f.col, 0.35, 4);
      G.FX.burst(f.x, f.y - 6, f.col, 12, 160);
      if (G.Camera.sees(f.x, f.y, 40)) G.Audio.sfx('break');
      if (!f.ghost) {
        for (const e of G.EnemyMgr.queryCircle(f.x, f.y, f.r)) {
          hit(pl, e, f.dmg, f.col, e.x - f.x, e.y - f.y, 0, m);
          if (!e.dead) e.applyStun((m.stun || 1) * (e.boss || e.judge ? 0.35 : 1));
        }
        for (const p of G.World.propsInCircle(f.x, f.y, f.r)) G.World.damageProp(p, f.dmg, f.col);
      }
      return true;
    }
    return false;
  }

  /** Daño de un campo (mina, meteoro, charco) a todo lo que hay en su círculo. */
  function blast(f, r, k = 1) {
    if (f.ghost) return;
    const pl = f.owner, m = f.m;
    for (const e of G.EnemyMgr.queryCircle(f.x, f.y, r)) hit(pl, e, f.dmg * k, f.col, e.x - f.x, e.y - f.y, m.knock || 0, m);
    for (const p of G.World.propsInCircle(f.x, f.y, r)) G.World.damageProp(p, f.dmg * k, f.col);
  }

  const NEW_FIELDS = new Set(['continuous_beam', 'dragon_wake', 'charge', 'spin', 'quake', 'vortex', 'stunzone']);
  function updateFields(dt) {
    for (let i = fields.length - 1; i >= 0; i--) {
      const f = fields[i];
      f.t += dt;
      if (f.gone || !f.owner || (f.life && f.t >= f.life && f.kind !== 'mine')) { fields.splice(i, 1); continue; }
      if (NEW_FIELDS.has(f.kind)) { if (tickNewField(f, dt)) fields.splice(i, 1); continue; }
      if (f.kind === 'mine') {
        const armed = f.t >= f.arm;
        const trig = armed && G.EnemyMgr.queryCircle(f.x, f.y, 14).length > 0;
        if (trig || f.t >= f.life) {
          G.FX.ring(f.x, f.y, 4, f.r, f.col, 0.3, 4);
          G.FX.burst(f.x, f.y - 6, f.col, 10, 150);
          if (G.Camera.sees(f.x, f.y, 40)) G.Audio.sfx('break');
          blast(f, f.r, trig ? 1 : 0.5);
          fields.splice(i, 1);
        }
      } else if (f.kind === 'meteor') {
        if (f.t >= f.fall) {
          G.FX.ring(f.x, f.y, 4, f.r, f.col, 0.35, 4);
          G.FX.burst(f.x, f.y - 6, f.col, 12, 170);
          if (G.Camera.sees(f.x, f.y, 40)) { G.Audio.sfx('break'); G.Camera.kick(0.12); }
          blast(f, f.r);

          // Precipice Blades +++ (Primal Groudon): Cột dung nham bộc phát để lại vết nứt nham thạch thiêu đốt và làm chậm
          if (f.m && f.m.id === 'precipice-blades' && (f.m.evoTier >= 3 || (f.m.name && f.m.name.includes('+++')))) {
            fields.push({
              kind: 'patch',
              owner: f.owner,
              ghost: f.ghost,
              m: f.m,
              col: '#ea580c',
              vis: f.vis,
              x: f.x,
              y: f.y,
              t: 0,
              life: 3.5,
              r: f.r * 0.9,
              tick: 0.35,
              dmg: f.dmg * 0.5,
              burn: 1.5,
              slow: 0.45
            });
            G.FX.ring(f.x, f.y, 10, f.r * 1.35, '#f97316', 0.5, 6);
            G.FX.burst(f.x, f.y - 8, '#ea580c', 22, 220);
          }

          fields.splice(i, 1);
        }
      } else if (f.kind === 'turret') {
        f.shotT -= dt;
        if (f.shotT <= 0) {
          const m = f.m;
          const tg = G.Projectiles.nearest(G.EnemyMgr.all(), f.x, f.y, m.range || 300);
          f.shotT = tg ? m.rate || 0.6 : 0.15;
          if (tg) {
            const a = Math.atan2(tg.y - f.y, tg.x - f.x);
            G.Projectiles.spawn(Object.assign({
              x: f.x, y: f.y, vx: Math.cos(a) * (m.speed || 300), vy: Math.sin(a) * (m.speed || 300),
              dmg: f.dmg, r: m.size || 6, life: 1.4, pierce: m.pierce | 0, color: f.col,
              hits: new Set(), vis: f.vis, ghost: f.ghost, owner: f.owner
            }, payload(m)));
            f.kick = 0.12;
          }
        }
        if (f.kick > 0) f.kick -= dt;
      } else if (f.kind === 'patch') {
        f.tick -= dt;
        if (f.tick <= 0) { f.tick = 0.5; blast(f, f.r); }
        if (f.vis.aura && Math.random() < dt * 3 && G.Camera.sees(f.x, f.y, 20)) {
          G.FX.sp(f.vis.aura, f.vis.pal, f.x + G.U.rand(-f.r, f.r) * 0.6, f.y - 4, { vy: -40, life: 0.4 });
        }
      }
    }
  }

  /** Lo de los campos que va en el suelo (debajo de los Pokémon). */
  function drawGroundFields(ctx) {
    const now = performance.now() / 1000;
    for (const f of fields) {
      if (!G.Camera.sees(f.x, f.y, 60)) continue;
      ctx.save();
      if (f.kind === 'vortex') {
        const a = Math.min(1, (f.life - f.t) * 2, f.t * 6);
        ctx.globalAlpha = 0.22 * a;
        ctx.fillStyle = f.col;
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r, f.r * 0.6, 0, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 0.6 * a;
        ctx.strokeStyle = f.col; ctx.lineWidth = 2;
        for (let k = 0; k < 3; k++) {
          const rr = f.r * (0.35 + k * 0.28), a0 = now * (3 - k * 0.6) + k * 2;
          ctx.beginPath(); ctx.ellipse(f.x, f.y, rr, rr * 0.6, 0, a0, a0 + 3.4); ctx.stroke();
        }
      } else if (f.kind === 'stunzone') {
        const k = G.U.clamp(f.t / f.delay, 0, 1);
        ctx.globalAlpha = 0.15 + 0.25 * k;
        ctx.fillStyle = f.col;
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r * k, f.r * k * 0.6, 0, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = f.col; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r, f.r * 0.6, 0, 0, 6.2832); ctx.stroke();
      } else if (f.kind === 'patch') {
        const a = Math.min(1, (f.life - f.t) * 2, f.t * 6);
        ctx.globalAlpha = 0.32 * a;
        ctx.fillStyle = f.col;
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r, f.r * 0.62, 0, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 0.5 * a;
        ctx.strokeStyle = f.col; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r * 0.8, f.r * 0.5, 0, 0, 6.2832); ctx.stroke();
      } else if (f.kind === 'mine') {
        const armed = f.t >= f.arm, blink = armed && Math.sin(now * 8 + f.x) > 0.3;
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = f.col;
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r * 0.45, f.r * 0.28, 0, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 1;
        G.VFX.draw(ctx, f.vis.proj, f.vis.pal, f.x, f.y - 4, { scale: 1, alpha: blink ? 1 : 0.75, frame: 0 });
      } else if (f.kind === 'meteor') {
        const k = G.U.clamp(f.t / f.fall, 0, 1);
        ctx.globalAlpha = 0.2 + k * 0.3;
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r * (0.3 + k * 0.7), f.r * 0.6 * (0.3 + k * 0.7), 0, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = f.col; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.ellipse(f.x, f.y, f.r, f.r * 0.6, 0, 0, 6.2832); ctx.stroke();
      } else if (f.kind === 'turret') {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.beginPath(); ctx.ellipse(f.x, f.y, 11, 4.5, 0, 0, 6.2832); ctx.fill();
      }
      ctx.restore();
    }
  }

  /** Lo de los campos que va por encima (meteoros cayendo, torretas). */
  function drawAirFields(ctx) {
    const now = performance.now() / 1000;
    for (const f of fields) {
      if (!G.Camera.sees(f.x, f.y, 200)) continue;
      if (f.kind === 'meteor' && f.t > 0) {
        const k = G.U.clamp(f.t / f.fall, 0, 1);
        G.VFX.draw(ctx, f.vis.proj, f.vis.pal, f.x + (1 - k) * 40, f.y - (1 - k) * 170 - 6,
                   { scale: 1.5, angle: Math.atan2(170, -40), frame: Math.floor(now * 12) });
      } else if (f.kind === 'turret') {
        const fade = Math.min(1, (f.life - f.t) * 2, f.t * 5);
        const bob = Math.sin(now * 4 + f.x) * 2 - (f.kick > 0 ? 2 : 0);
        G.VFX.draw(ctx, f.vis.proj, f.vis.pal, f.x, f.y - 16 + bob, { scale: 1.5, alpha: fade, frame: Math.floor(now * 8) });
      }
    }
  }

  function clearFields(owner) { fields = owner ? fields.filter(f => f.owner !== owner) : []; }

  function orbit(pl, m, dt, now, isGhost = false) {
    const col = G.U.TYPE_COLOR[m.type];
    const want = Math.max(1, m.count | 0);
    // Cada movimiento de órbita tiene sus orbes (puede haber dos en un vínculo).
    const mine = p => p.orb && p.owner === pl && p.mid === m.id;
    const orbs = G.Projectiles.all().filter(mine);
    // Si cambia el número de orbes (al mejorar el movimiento), se reparten
    // todos por igual a partir de donde va el primero, sin saltos.
    const relayout = orbs.length !== want;
    const base = orbs.length ? orbs[0].oa : now * m.speed;
    if (orbs.length > want) for (const p of orbs.slice(want)) G.Projectiles.remove(p);

    for (let i = orbs.length; i < want; i++) {
      G.Projectiles.spawnOrb({
        owner: pl, ghost: isGhost, mid: m.id,
        x: pl.x, y: pl.y, r: m.size, color: col, vis: G.VFX.forMove(m),
        dmg: m.dmg * pl.atkFor(m),
        oa: (i / want) * 6.2832, orad: m.radius, ospeed: m.speed,
        rehit: Math.max(0.12, m.cd),
        knock: m.knock || 0, burn: m.burn || 0, poison: m.poison || 0, slow: m.slow || 0, mtype: m.type, mcat: m.cat, src: m
      });
    }
    const live = G.Projectiles.all().filter(mine);
    live.forEach((p, i) => {
      p.dmg = m.dmg * pl.atkFor(m);
      p.orad = m.radius;
      p.ospeed = m.speed;
      p.r = m.size;
      if (relayout) p.oa = base + (i / live.length) * 6.2832;
    });

    // Animación de concentración de vez en cuando, para que se note vivo.
    pl.orbCastT = (pl.orbCastT || 0) - dt;
    if (pl.orbCastT <= 0) { pl.orbCastT = 1.6; pl.cast({ kind: 'orbit', cd: 1.6 }); }
  }

  /** Repite el ataque de un compañero sólo para verlo (sin daño). */
  function ghostCast(pl, id, lvl, aim, evolved) {
    const def = G.Moves.BY_ID[id];
    if (!def || def.kind === 'orbit') return;
    const m = G.Moves.instance(id, lvl);
    if (evolved) G.Moves.evolve(m);
    pl.aim = aim;
    ghost = true;
    try {
      pl.cast(m);
      run(pl, m);
    } finally { ghost = false; }
  }

  /** Orbes de un compañero que tiene activo un movimiento de órbita (sólo visual). */
  function ghostOrbit(pl, dt, now) {
    const m = pl.activeMove();
    if (m && m.kind === 'orbit' && !pl.dead) orbit(pl, m, dt, now, true);
    else if (G.Projectiles.all().some(p => p.orb && p.owner === pl)) G.Projectiles.clearOrbs(pl);
  }

  // Golpe crítico (Mejoras → Golpe Crítico): x1,5 de daño, número naranja y grande.
  const CRIT_MUL = 1.5;
  const isCrit = pl => {
    if (ghost) return false;
    let c = pl.critChance || 0;
    if (pl && (pl.speedsterActive || (pl.hasTrialBonus && pl.hasTrialBonus('speedster')))) {
      const bonusSpd = Math.max(0, (pl.spdMul || 1) - 1);
      c += bonusSpd * 0.25;
    }
    return c > 0 && Math.random() < c;
  };

  // Habilidad de quien pega (data/ability-fx.js): × al daño, crítico, estados y
  // lo que hace al golpear. (Los compañeros no la llevan aquí: pegan en su ordenador.)
  const abilOut = (pl, m, e) => (pl.abil && pl.abil.out && m ? pl.abil.out(pl, m, e) : 1);
  const critMul = pl => {
    let mul = (pl.abil && pl.abil.critMul) || CRIT_MUL;
    if (pl && (pl.speedsterActive || (pl.hasTrialBonus && pl.hasTrialBonus('speedster')))) {
      const bonusSpd = Math.max(0, (pl.spdMul || 1) - 1);
      mul += bonusSpd * 0.25;
    }
    return mul;
  };
  /** × a quemaduras, venenos, frenazos y empujones: Potencia Bruta los quita, Dicha los dobla. */
  const statusK = pl => (!pl.abil ? 1 : pl.abil.sheer ? 0 : pl.abil.serene ? 2 : 1);
  function afterHit(pl, e, m) {
    const a = pl.abil;
    if (!a || e.dead) return;
    if (a.hit) a.hit(pl, e, m);
    if (a.touchPoison && m && (m.kind === 'melee' || m.kind === 'dash')) e.applyPoison(1);
  }

  /** Arceus (Sentencia) sólo recibe una parte (ver Judgment.dmgK). */
  const arcK = e => (e.arceus ? G.Judgment.dmgK() : 1);

  function hit(pl, e, dmg, col, dx, dy, knock, m) {
    let k = typeK(m.type, e) * G.Stats.taken(e.mon, m.cat) * abilOut(pl, m, e) * arcK(e);
    if (pl && pl.hasItem && pl.hasItem('expertbelt') && typeK(m.type, e) > 1.2) {
      k *= 1.30;
    }
    if (pl && pl.hasItem && pl.hasItem('keystone') && (pl.mon.types || []).includes(m.type)) {
      k *= 1.15;
    }
    if (m && m.cat === 'physical' && pl && (pl.berserkerActive || (pl.hasTrialBonus && pl.hasTrialBonus('berserker')))) {
      dmg *= 1.15;
    }

    // Zacian Behemoth Blade giantSlayer tuning
    if (pl && pl.dex === 888 && m && m.id === 'behemoth-blade' && e.boss) {
      k *= (e.vulnerable || e.phaseShield) ? 2.0 : 1.45;
    }

    // Elemental Reactions trigger
    if (typeof G !== 'undefined' && G.Reactions && G.Reactions.checkAndTrigger && m && e) {
      const rx = G.Reactions.checkAndTrigger(m.type, e, dmg, pl);
      if (rx && rx.bonusMult) k *= rx.bonusMult;
    }

    // Boss Stagger Gauge accumulation
    if (e.boss && !e.dead) {
      const staggerAdd = (m && (m.kind === 'melee' || m.kind === 'dash')) ? 2.5 : 1.0;
      e.stagger = (e.stagger || 0) + staggerAdd;
      if (e.stagger >= 100 && !e.vulnerable) {
        e.stagger = 0;
        e.vulnerable = true;
        e.vulnerableTimer = 3.0;
        if (G.FX && G.FX.dmgText) G.FX.dmgText(e.x, e.y - 25, '¡ATURDIDO!', '#ffd23f', true);
        if (G.FX && G.FX.ring) G.FX.ring(e.x, e.y, 10, e.r * 2.5, '#ffd23f', 0.5, 5);
      }
    }

    e.lastHitMove = m;
    const crit = isCrit(pl), sk = statusK(pl);
    dmg *= k * (crit ? critMul(pl) : 1);
    e.hurt(dmg, col, dx, dy, sk ? knock : 0, crit ? 'crit' : G.Types.label(G.Types.mult(m.type, e.types)));
    if (!ghost) pl.onDealt(dmg);
    pl.dmgDealt += dmg;
    m.dealt = (m.dealt || 0) + dmg;
    if (m.burn && sk) e.applyBurn(m.burn * sk);
    if (m.poison && sk) e.applyPoison(m.poison * sk);
    if (m.slow && sk) e.applySlow(Math.min(0.8, m.slow * sk));
    if (m.stun && sk) {
      e.applyStun(m.stun * sk);
      m.stunsDone = (m.stunsDone || 0) + 1;
    }
    afterHit(pl, e, m);

    if (pl && pl.abil && pl.abil.parentalBond && !m._parentalEcho && !e.dead) {
      setTimeout(() => {
        if (e && !e.dead && pl && !pl.dead) {
          const echoM = Object.assign({}, m, { _parentalEcho: true });
          hit(pl, e, dmg * 0.35, col, dx * 0.4, dy * 0.4, 0, echoM);
          G.FX.burst(e.x, e.y - e.bodyH * 0.5, col, 4, 70);
        }
      }, 150);
    }
  }

  // ---------------- colisiones ----------------

  /** Distancia² del punto (cx, cy) al segmento (ax, ay)-(bx, by). */
  function segDist2(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    let t = l2 ? ((cx - ax) * dx + (cy - ay) * dy) / l2 : 0;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const qx = ax + dx * t - cx, qy = ay + dy * t - cy;
    return qx * qx + qy * qy;
  }

  function resolve(dt, pl, now) {
    const projectiles = G.Projectiles.all();

    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];

      // --- disparos enemigos: paredes y objetos sólidos dan cobertura ---
      if (!p.friendly) {
        if (G.World.projectileBlock(p.x, p.y, p.r)) {
          G.FX.burst(p.x, p.y - G.LIFT, p.color, 5, 70);
          projectiles.splice(i, 1);
          continue;
        }
        if (G.U.dist2(p.x, p.y, pl.x, pl.y) < (p.r + pl.r) * (p.r + pl.r)) {
          if (pl.abil && pl.abil.magicBounce && Math.random() < 0.5) {
            p.friendly = true;
            p.vx = -p.vx * 1.3;
            p.vy = -p.vy * 1.3;
            p.owner = pl;
            p.color = '#ff99dd';
            p.dmg = Math.max(p.dmg * 1.5, 30);
            p.life = 2.5;
            p.hits = new Set();
            G.FX.ring(pl.x, pl.y, pl.r, pl.r * 2.5, '#ff99dd', 0.3, 3);
            G.Audio.sfx('break');
            continue;
          }
          pl.hurt(p.dmg, p.mtype, false, p.cat);
          G.FX.burst(p.x, p.y - G.LIFT, p.color, 7, 110);
          projectiles.splice(i, 1);
        }
        continue;
      }

      // --- disparos de jugadores ---
      // Orbes de un compañero: sólo se ven.
      if (p.orb && p.ghost) continue;
      if (!p.orb) {
        const block = G.World.projectileBlock(p.x, p.y, p.r);
        if (block === 'wall' || (block && !block.destructible)) {
          G.FX.burst(p.x, p.y - G.LIFT, p.color, 5, 80);
          projectiles.splice(i, 1);
          continue;
        }
      }

      // Objetos del escenario (rocas, cofres, hierba).
      let consumed = false;
      for (const prop of G.World.propsInCircle(p.x, p.y, p.r)) {
        if (p.orb) {
          const k = 'p' + prop.id, last = p.hitLog.get(k) || -99;
          if (now - last < p.rehit) continue;
          p.hitLog.set(k, now);
          G.World.damageProp(prop, p.dmg, p.color);
          continue;
        }
        if (p.phits.has(prop.id)) continue;
        p.phits.add(prop.id);
        if (!p.ghost) G.World.damageProp(prop, p.dmg, p.color);
        // La hierba no frena; lo sólido sí gasta perforación.
        if (prop.solid) {
          if (p.pierce > 0) p.pierce--;
          else { consumed = true; break; }
        }
      }
      if (consumed) {
        G.FX.burst(p.x, p.y - G.LIFT, p.color, 5, 80);
        projectiles.splice(i, 1);
        continue;
      }

      // Enemigos. Colisión BARRIDA: se comprueba todo el tramo recorrido en este
      // fotograma, no sólo el punto final. Un Impactrueno avanza 8 unidades por
      // fotograma: sin esto atravesaba a los enemigos pegados al jugador, que
      // eran inmunes a todos los movimientos de proyectil.
      const sx = p.orb || p.px == null ? p.x : p.px, sy = p.orb || p.py == null ? p.y : p.py;
      const half = Math.hypot(p.x - sx, p.y - sy) / 2;
      for (const e of G.EnemyMgr.queryCircle((sx + p.x) / 2, (sy + p.y) / 2, half + p.r)) {
        if (segDist2(sx, sy, p.x, p.y, e.x, e.y) > (p.r + e.r) * (p.r + e.r)) continue;
        if (p.orb) {
          const last = p.hitLog.get(e.id) || -99;
          if (now - last < p.rehit) continue;
          p.hitLog.set(e.id, now);
          // Las órbitas duran toda la partida: se olvidan los golpes viejos.
          if (p.hitLog.size > 300) for (const [k, t] of p.hitLog) if (now - t > p.rehit) p.hitLog.delete(k);
        } else {
          if (p.hits.has(e.id)) continue;
          p.hits.add(e.id);
        }

        // Disparo fantasma de un compañero: choca y se ve, pero no daña.
        if (p.ghost) {
          G.FX.sp('impact', p.vis ? p.vis.pal : 'normal', e.x, e.y - e.bodyH * 0.5, { life: 0.12, scale: 1 });
          if (rebound(p, e)) break;
          if (p.pierce > 0) { p.pierce--; continue; }
          G.FX.burst(p.x, p.y - G.LIFT, p.color, 5, 80);
          projectiles.splice(i, 1);
          break;
        }

        const crit = isCrit(pl), sk = statusK(pl);
        const k = (p.mtype ? typeK(p.mtype, e) : 1) * G.Stats.taken(e.mon, p.mcat) * (crit ? critMul(pl) : 1) * abilOut(pl, p.src, e) * arcK(e);
        e.hurt(p.dmg * k, p.color, p.vx || (e.x - pl.x), p.vy || (e.y - pl.y), sk ? p.knock : 0,
               crit ? 'crit' : p.mtype ? G.Types.label(G.Types.mult(p.mtype, e.types)) : null);
        if (Math.random() < 0.5) G.FX.sp('impact', p.vis ? p.vis.pal : 'normal', e.x, e.y - e.bodyH * 0.5, { life: 0.12, scale: 1 });
        pl.dmgDealt += p.dmg * k;
        if (p.src) p.src.dealt = (p.src.dealt || 0) + p.dmg * k;
        pl.onDealt(p.dmg * k);
        if (p.burn && sk) e.applyBurn(p.burn * sk);
        if (p.poison && sk) e.applyPoison(p.poison * sk);
        if (p.slow && sk) e.applySlow(Math.min(0.8, p.slow * sk));
        if (p.drain) pl.heal(p.drain);                    // Beso Drenaje
        afterHit(pl, e, p.src);

        if (!p.orb && rebound(p, e)) break;
        if (!p.orb) {
          if (p.pierce > 0) { p.pierce--; }
          else {
            G.FX.burst(p.x, p.y - G.LIFT, p.color, 5, 80);
            projectiles.splice(i, 1);
            break;
          }
        }
      }
    }

    // --- contacto enemigo <-> jugador ---
    if (pl.dead || (typeof G !== 'undefined' && G.Game && G.Game.state !== 'playing')) return;
    for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, pl.r + 40)) {
      if (G.U.dist2(e.x, e.y, pl.x, pl.y) > (e.r + pl.r) * (e.r + pl.r)) continue;
      if (e.arceus || e.touchCd > 0 || e.behavior === 'thief' || e.stunT > 0 || e.sleepT > 0 || (e.net && e.net.st & 16)) continue;
      e.touchCd = 0.65;
      e.strike(pl);
      const contactCat = e.contactCat || ((e.types && (e.types.includes('ghost') || e.types.includes('psychic')) && e.cat === 'special') ? 'special' : 'physical');
      pl.hurt(e.dmg, e.atkType, false, contactCat);
      if (pl.hasItem('rockyhelmet')) e.hurt(15 + pl.level * 4, '#9aa6b5', e.x - pl.x, e.y - pl.y, 80);
      if (pl.abil && pl.abil.contact && !pl.dead && !e.dead) pl.abil.contact(pl, e);     // Elec. Estática, Cuerpo Llama...
      const [nx, ny] = G.U.norm(e.x - pl.x, e.y - pl.y);
      e.kx += nx * 150; e.ky += ny * 150;
    }
  }

  /** Empuja a los enemigos cercanos y les da tiempo de gracia sin daño por contacto tras elegir mejora. */
  function repelNear(pl, radius = 260) {
    if (!pl) return;
    const r2 = radius * radius;
    if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
      for (const e of G.EnemyMgr.queryCircle(pl.x, pl.y, radius)) {
        if (e.dead || e.arceus) continue;
        const d2 = G.U.dist2(e.x, e.y, pl.x, pl.y);
        if (d2 > r2) continue;
        const [nx, ny] = G.U.norm(e.x - pl.x, e.y - pl.y) || [1, 0];
        e.kx = (e.kx || 0) + nx * 360;
        e.ky = (e.ky || 0) + ny * 360;
        e.touchCd = Math.max(e.touchCd || 0, 1.8);
      }
    }
    if (G.FX && G.FX.ring) G.FX.ring(pl.x, pl.y, 8, radius, '#ffcb3d', 0.5, 4);
  }

  return { tick, resolve, ghostCast, ghostOrbit, repelNear, updateFields, drawGroundFields, drawAirFields, clearFields,
           get fieldCount() { return fields.length; } };
})();
