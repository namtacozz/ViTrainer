/* ============ inrun-events.js — Eventos Secuenciales en Partida ============
 * 1. Toma de Zona (King of the Hill): círculo en zona libre, barrido horario, más spawns y agresión.
 * 2. Búsqueda de Cristales (Scavenger): recogida de cristales con brújula HUD y tiempo límite.
 * 3. Supervivencia Extrema (Pursuit): huir de un Pokémon Alfa inmortal durante un tiempo determinado.
 * Recompensas: reanimación en cooperativo, potenciadores permanentes, tickets y gemas.
 */
G.InRunEvents = (() => {
  let current = null;        // Evento activo actual
  let lastStartedId = '';
  let syncTimer = 0;
  let banner = null;         // { title, sub, timer, color }
  const authority = () => !G.Coop || !G.Coop.active || G.Coop.isHost;

  function reset() {
    current = null;
    lastStartedId = '';
    syncTimer = 0;
    banner = null;
  }

  function getPlayers() {
    return (G.Game && G.Game.everyone) ? G.Game.everyone() : [G.Game.player];
  }

  function getAlivePlayers() {
    return getPlayers().filter(p => p && !p.dead);
  }

  function centerOfPlayers() {
    const ps = getAlivePlayers();
    if (!ps.length) return { x: G.Game.player.x, y: G.Game.player.y };
    let sx = 0, sy = 0;
    for (const p of ps) { sx += p.x; sy += p.y; }
    return { x: sx / ps.length, y: sy / ps.length };
  }

  /** Busca una posición transitable despejada alrededor de un punto */
  function findFreeSpot(cx, cy, minD = 380, maxD = 580, radius = 40) {
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * 6.2832;
      const dist = G.U.rand(minD, maxD);
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist * 0.85;
      if (G.World && G.World.isFree && G.World.isFree(x, y, radius)) {
        return { x, y };
      }
    }
    return { x: cx + 380, y: cy + 100 };
  }

  // ---------------- Iniciar Eventos ----------------

  function startZone(evDef) {
    const ps = getPlayers();
    const c = centerOfPlayers();
    const spot = findFreeSpot(c.x, c.y, 350, 520, 100);
    const r = 135 + 20 * Math.max(0, ps.length - 1);

    current = {
      id: evDef.id,
      type: 'zone',
      x: spot.x,
      y: spot.y,
      r: r,
      progress: 0.0,
      playersInside: 0,
      pulse: 0,
      t: 0
    };

    if (G.Coop && G.Coop.isHost) {
      G.Coop.broadcast(['inrun_ev', 'start_zone', evDef.id, Math.round(spot.x), Math.round(spot.y), Math.round(r)]);
    }

    showBanner(G.T('Toma de Zona'), G.T('Permanece en la zona para capturarla'), '#ffd23f');
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('confirm');
  }

  function startScavenger(evDef) {
    const ps = getPlayers();
    const c = centerOfPlayers();
    const count = 5 + 2 * Math.max(0, ps.length - 1);
    const maxT = 40 + 8 * Math.max(0, ps.length - 1);
    const items = [];

    for (let i = 0; i < count; i++) {
      const sp = findFreeSpot(c.x, c.y, 320, 640, 24);
      items.push({
        id: i + 1,
        x: sp.x,
        y: sp.y,
        collected: false,
        bob: Math.random() * 6.28
      });
    }

    current = {
      id: evDef.id,
      type: 'scavenger',
      items: items,
      total: count,
      collectedCount: 0,
      t: maxT,
      maxT: maxT
    };

    if (G.Coop && G.Coop.isHost) {
      const flatItems = items.map(it => [it.id, Math.round(it.x), Math.round(it.y)]);
      G.Coop.broadcast(['inrun_ev', 'start_scav', evDef.id, maxT, flatItems]);
    }

    showBanner(G.T('Búsqueda de Cristales'), G.T('Recoge todos los cristales'), '#7fe0ff');
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('confirm');
  }

  function startPursuit(evDef) {
    const ps = getPlayers();
    const c = centerOfPlayers();
    const maxT = 30 + 5 * Math.max(0, ps.length - 1);
    const sp = findFreeSpot(c.x, c.y, 620, 780, 50);

    // Seleccionar dex de Pokémon temible (Darkrai, Giratina o Tyranitar/Gengar)
    const bossPool = [491, 487, 248, 94, 448, 384];
    const dex = G.U.pick(bossPool.filter(d => G.SPRITE_META && G.SPRITE_META[d])) || 491;

    let pursuitBoss = null;
    if (authority()) {
      const bDef = {
        dex: dex,
        name: 'Shadow Alpha',
        hp: 9999999,
        spd: 75,
        dmg: 35,
        xp: 0,
        behavior: 'chase'
      };
      pursuitBoss = new G.Enemy(bDef, sp.x, sp.y, 1, false);
      pursuitBoss.isPursuit = true;
      pursuitBoss.invulnerable = true;
      if (G.EnemyMgr && G.EnemyMgr.add) {
        G.EnemyMgr.add(pursuitBoss);
      }
    }

    current = {
      id: evDef.id,
      type: 'pursuit',
      boss: pursuitBoss,
      bossId: pursuitBoss ? pursuitBoss.id : 0,
      bossX: sp.x,
      bossY: sp.y,
      dex: dex,
      t: maxT,
      maxT: maxT,
      hazardTimer: 2.2
    };

    if (G.Coop && G.Coop.isHost) {
      G.Coop.broadcast(['inrun_ev', 'start_hunt', evDef.id, maxT, Math.round(sp.x), Math.round(sp.y), dex, pursuitBoss ? pursuitBoss.id : 0]);
    }

    showBanner(G.T('Supervivencia Extrema'), G.T('¡Sobrevive antes de que acabe el tiempo!'), '#ff5f6d');
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('boss');
  }

  function showBanner(title, sub, color = '#ffd23f') {
    banner = { title, sub, color, timer: 3.8 };
  }

  // ---------------- Bucle Principal de Actualización ----------------

  function update(dt, time) {
    if (banner) {
      banner.timer -= dt;
      if (banner.timer <= 0) banner = null;
    }

    // Comprobar inicio de evento desde Timeline (chặn kích hoạt khi đang ở trong đấu trường Rift hoặc trận Arceus)
    if (authority() && !current && G.Timeline) {
      if ((G.Rift && G.Rift.inArena) || (G.Judgment && G.Judgment.active)) return;
      const upcoming = G.Timeline.getUpcoming(time, 4);
      for (const ev of upcoming) {
        if (ev.type.startsWith('event_') && Math.abs(time - ev.time) < 1.5 && lastStartedId !== ev.id) {
          lastStartedId = ev.id;
          if (ev.evType === 'zone') startZone(ev);
          else if (ev.evType === 'scavenger') startScavenger(ev);
          else if (ev.evType === 'pursuit') startPursuit(ev);
          break;
        }
      }
    }

    if (!current) return;

    if (current.type === 'zone') {
      current.pulse += dt * 3;
      const alive = getAlivePlayers();
      let inside = 0;
      for (const p of alive) {
        if (G.U.dist2(p.x, p.y, current.x, current.y) <= current.r * current.r) {
          inside++;
        }
      }
      current.playersInside = inside;

      if (authority()) {
        const speed = (0.075 + 0.035 * Math.min(4, inside)) / (1 + 0.15 * Math.max(0, getPlayers().length - 1));
        if (inside > 0) {
          current.progress = Math.min(1.0, current.progress + speed * dt);
        } else {
          current.progress = Math.max(0, current.progress - 0.02 * dt);
        }

        // Atraer enemigos hacia la zona
        if (inside > 0 && G.EnemyMgr) {
          for (const e of G.EnemyMgr.all()) {
            if (!e.boss && Math.random() < 0.04) {
              e.targetX = current.x + (Math.random() - 0.5) * current.r;
              e.targetY = current.y + (Math.random() - 0.5) * current.r;
            }
          }
        }

        syncTimer -= dt;
        if (syncTimer <= 0) {
          syncTimer = 0.6;
          if (G.Coop && G.Coop.isHost) {
            G.Coop.broadcast(['inrun_ev', 'sync_zone', Math.round(current.progress * 100), inside]);
          }
        }

        if (authority()) {
          if (current.progress >= 1.0) {
            completeEvent();
          }
        }
      }
    } else if (current.type === 'scavenger') {
      current.t -= dt;
      for (const it of current.items) {
        if (!it.collected) it.bob += dt * 3;
      }

      // Comprobar recolección por parte de jugadores locales o anfitrión
      const alive = getAlivePlayers();
      for (const it of current.items) {
        if (it.collected) continue;
        for (const p of alive) {
          if (G.U.dist2(p.x, p.y, it.x, it.y) < 28 * 28) {
            it.collected = true;
            current.collectedCount++;
            if (G.FX && G.FX.ring) G.FX.ring(it.x, it.y, 8, 48, '#7fe0ff', 0.4, 3);
            if (G.Audio && G.Audio.sfx) G.Audio.sfx('select');
            if (G.Coop && G.Coop.active) {
              G.Coop.broadcast(['inrun_ev', 'collect', it.id]);
            }
            break;
          }
        }
      }

      if (authority()) {
        if (current.collectedCount >= current.total) {
          completeEvent();
        } else if (current.t <= 0) {
          failEvent();
        }
      }
    } else if (current.type === 'pursuit') {
      current.t -= dt;
      current.hazardTimer -= dt;

      // El jefe lanza zonas de peligro telegrafiadas periódicamente
      if (current.hazardTimer <= 0) {
        current.hazardTimer = 2.4;
        const target = G.U.pick(getAlivePlayers()) || G.Game.player;
        if (target && G.Hazards && G.Hazards.telegraph) {
          G.Hazards.telegraph(target.x, target.y, 65, 1.2, 30);
        }
      }

      if (authority()) {
        if (current.t <= 0) {
          // Desaparece el jefe con efecto
          const b = current.boss || (current.bossId && G.EnemyMgr ? G.EnemyMgr.get(current.bossId) : null);
          if (b && G.EnemyMgr && G.EnemyMgr.remove) {
            if (G.FX && G.FX.ring) G.FX.ring(b.x, b.y, 20, 160, '#9a4dff', 0.8, 5);
            G.EnemyMgr.remove(b, false);
          }
          completeEvent();
        }
      }
    }
  }

  // ---------------- Recompensas & Finalización ----------------

  function completeEvent() {
    const type = current ? current.type : 'event';
    current = null;

    if (G.Coop && G.Coop.isHost) {
      G.Coop.broadcast(['inrun_ev', 'complete', type]);
    }

    applyRewards(type);
    showBanner(G.T('¡Evento completado!'), G.T('¡Compañeros revividos y recompensa obtenida!'), '#5fe08a');
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('confirm');
  }

  function failEvent() {
    if (current && current.type === 'pursuit') {
      const b = current.boss || (current.bossId && G.EnemyMgr ? G.EnemyMgr.get(current.bossId) : null);
      if (b && G.EnemyMgr && G.EnemyMgr.remove) G.EnemyMgr.remove(b, false);
    }
    current = null;
    if (G.Coop && G.Coop.isHost) {
      G.Coop.broadcast(['inrun_ev', 'fail']);
    }
  }

  function applyRewards(type) {
    const pl = G.Game.player;
    if (!pl) return;

    // 1. Reanimar a compañeros caídos en cooperativo con 50% vida y escudo
    if (G.Coop && G.Coop.mates) {
      for (const m of G.Coop.mates) {
        if (m.pl && m.pl.dead) {
          m.pl.dead = false;
          m.pl.hp = Math.round(m.pl.maxHp * 0.5);
          m.pl.shield = 3.5;
        }
      }
    }
    if (pl.dead) {
      pl.dead = false;
      pl.hp = Math.round(pl.maxHp * 0.5);
      pl.shield = 3.5;
    }

    // 2. Potenciador permanente para la run: +15% Daño y +8 Velocidad
    pl.atkMul = (pl.atkMul || 1) + 0.15;
    pl.spd = (pl.spd || 100) + 8;
    if (pl.buffs && pl.buffs.atk) {
      pl.buffs.atk.n = (pl.buffs.atk.n || 0) + 1;
    }

    // 3. Monedas directas para todos los jugadores
    pl.coins = (pl.coins || 0) + 180;
    if (G.DB && G.DB.save) {
      G.DB.save.coins = (G.DB.save.coins || 0) + 180;
    }

    // 4. Generar racimo de recompensas de alto valor en el suelo
    if (authority() && G.Pickups) {
      const spot = centerOfPlayers();
      // Ticket de gacha garantizado
      const hasT10 = Math.random() < 0.40;
      if (G.Pickups.drop) {
        G.Pickups.drop(hasT10 ? 'ticket10' : 'ticket', spot.x, spot.y - 14, 1);
        for (let i = 0; i < 14; i++) {
          const a = Math.random() * 6.28, d = G.U.rand(15, 80);
          G.Pickups.drop('coin', spot.x + Math.cos(a) * d, spot.y + Math.sin(a) * d, 25);
        }
        if (G.Pickups.dropXp) {
          G.Pickups.dropXp(spot.x, spot.y, 950, true);
        }
        G.Pickups.drop('heal', spot.x + 24, spot.y, 0);
        G.Pickups.drop('magnet', spot.x - 24, spot.y, 0);
        if (G.Items && G.Items.roll) {
          G.Pickups.drop('item', spot.x, spot.y + 24, G.Items.roll());
        }
        if (G.Orbs && G.Orbs.roll && Math.random() < 0.65) {
          G.Pickups.drop('sphere', spot.x + 18, spot.y - 18, G.Orbs.roll());
        }
      }
      // Atraer los orbes hacia los jugadores tras un breve instante
      setTimeout(() => {
        if (G.Pickups && G.Pickups.pullAll) G.Pickups.pullAll();
      }, 1000);
    }
  }

  // ---------------- Sincronización Remota Cooperativa ----------------

  function onRemoteEvent(ev) {
    const action = ev[1];
    if (action === 'start_zone') {
      current = {
        id: ev[2],
        type: 'zone',
        x: ev[3],
        y: ev[4],
        r: ev[5],
        progress: 0.0,
        playersInside: 0,
        pulse: 0
      };
      showBanner(G.T('Toma de Zona'), G.T('Permanece en la zona para capturarla'), '#ffd23f');
    } else if (action === 'start_scav') {
      const items = (ev[4] || []).map(raw => ({
        id: raw[0],
        x: raw[1],
        y: raw[2],
        collected: false,
        bob: 0
      }));
      current = {
        id: ev[2],
        type: 'scavenger',
        items: items,
        total: items.length,
        collectedCount: 0,
        t: ev[3],
        maxT: ev[3]
      };
      showBanner(G.T('Búsqueda de Cristales'), G.T('Recoge todos los cristales'), '#7fe0ff');
    } else if (action === 'start_hunt') {
      current = {
        id: ev[2],
        type: 'pursuit',
        bossId: ev[7] || 0,
        bossX: ev[4],
        bossY: ev[5],
        dex: ev[6],
        t: ev[3],
        maxT: ev[3],
        hazardTimer: 2.2
      };
      showBanner(G.T('Supervivencia Extrema'), G.T('¡Sobrevive antes de que acabe el tiempo!'), '#ff5f6d');
    } else if (action === 'sync_zone' && current && current.type === 'zone') {
      current.progress = ev[2] / 100;
      current.playersInside = ev[3];
    } else if (action === 'collect' && current && current.type === 'scavenger') {
      const it = current.items.find(x => x.id === ev[2]);
      if (it && !it.collected) {
        it.collected = true;
        current.collectedCount++;
        if (G.FX && G.FX.ring) G.FX.ring(it.x, it.y, 8, 48, '#7fe0ff', 0.4, 3);
        if (G.Audio && G.Audio.sfx) G.Audio.sfx('select');
      }
    } else if (action === 'complete') {
      applyRewards(ev[2] || 'event');
      current = null;
      showBanner(G.T('¡Evento completado!'), G.T('¡Compañeros revividos y recompensa obtenida!'), '#5fe08a');
      if (G.Audio && G.Audio.sfx) G.Audio.sfx('confirm');
    } else if (action === 'fail') {
      if (current && current.type === 'pursuit') {
        const b = current.boss || (current.bossId && G.EnemyMgr ? G.EnemyMgr.get(current.bossId) : null);
        if (b && G.EnemyMgr && G.EnemyMgr.remove) G.EnemyMgr.remove(b, false);
      }
      current = null;
    }
  }

  // ---------------- Dibujado en el Mundo (Coordenadas de Mundo) ----------------

  function drawWorld(ctx) {
    if (!current) return;

    if (current.type === 'zone') {
      ctx.save();
      const pulseK = 1 + Math.sin(current.pulse) * 0.04;
      const r = current.r * pulseK;

      // Cột sáng định vị thiên không (Sky Beacon Beam)
      const beamG = ctx.createLinearGradient(current.x, current.y, current.x, current.y - 500);
      beamG.addColorStop(0, 'rgba(255, 210, 63, 0.45)');
      beamG.addColorStop(0.35, 'rgba(255, 210, 63, 0.22)');
      beamG.addColorStop(1, 'rgba(255, 210, 63, 0.0)');
      ctx.fillStyle = beamG;
      ctx.beginPath();
      ctx.moveTo(current.x - 28, current.y);
      ctx.lineTo(current.x - 8, current.y - 500);
      ctx.lineTo(current.x + 8, current.y - 500);
      ctx.lineTo(current.x + 28, current.y);
      ctx.closePath();
      ctx.fill();

      // Área interior coloreada
      const g = ctx.createRadialGradient(current.x, current.y, 10, current.x, current.y, r);
      g.addColorStop(0, 'rgba(255, 210, 63, 0.28)');
      g.addColorStop(0.85, 'rgba(255, 175, 20, 0.14)');
      g.addColorStop(1, 'rgba(255, 175, 20, 0.0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(current.x, current.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Anillo perimetral base
      ctx.strokeStyle = 'rgba(255, 210, 63, 0.45)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(current.x, current.y, r, 0, Math.PI * 2);
      ctx.stroke();

      // Arco de barrido horario (Clockwise Sweep Arc)
      if (current.progress > 0) {
        const sweepAngle = current.progress * Math.PI * 2;
        ctx.strokeStyle = '#5fe08a';
        ctx.lineWidth = 6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(current.x, current.y, r, -Math.PI / 2, -Math.PI / 2 + sweepAngle);
        ctx.stroke();

        ctx.fillStyle = 'rgba(95, 224, 138, 0.15)';
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.arc(current.x, current.y, r, -Math.PI / 2, -Math.PI / 2 + sweepAngle);
        ctx.closePath();
        ctx.fill();
      }

      // Icono central e indicador de porcentaje
      ctx.fillStyle = 'rgba(10, 16, 32, 0.88)';
      ctx.beginPath();
      ctx.arc(current.x, current.y, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffd23f';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 12px Pixelify,sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(Math.floor(current.progress * 100) + '%', current.x, current.y);
      ctx.restore();

    } else if (current.type === 'scavenger') {
      ctx.save();
      for (const it of current.items) {
        if (it.collected) continue;
        const hoverY = it.y + Math.sin(it.bob) * 5;

        // Cột sáng mảnh trên đầu mỗi tinh thể
        const cBeam = ctx.createLinearGradient(it.x, hoverY, it.x, hoverY - 180);
        cBeam.addColorStop(0, 'rgba(127, 224, 255, 0.45)');
        cBeam.addColorStop(0.5, 'rgba(127, 224, 255, 0.18)');
        cBeam.addColorStop(1, 'rgba(127, 224, 255, 0)');
        ctx.fillStyle = cBeam;
        ctx.beginPath();
        ctx.moveTo(it.x - 10, hoverY);
        ctx.lineTo(it.x - 3, hoverY - 180);
        ctx.lineTo(it.x + 3, hoverY - 180);
        ctx.lineTo(it.x + 10, hoverY);
        ctx.closePath();
        ctx.fill();

        // Sombra en el suelo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(it.x, it.y + 12, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Resplandor del cristal
        const g = ctx.createRadialGradient(it.x, hoverY, 2, it.x, hoverY, 20);
        g.addColorStop(0, 'rgba(127, 224, 255, 0.85)');
        g.addColorStop(1, 'rgba(127, 224, 255, 0.0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(it.x, hoverY, 20, 0, Math.PI * 2);
        ctx.fill();

        // Dibujar cristal poligonal con canvas
        ctx.fillStyle = '#7fe0ff';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(it.x, hoverY - 12);
        ctx.lineTo(it.x + 8, hoverY - 3);
        ctx.lineTo(it.x + 5, hoverY + 10);
        ctx.lineTo(it.x - 5, hoverY + 10);
        ctx.lineTo(it.x - 8, hoverY - 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();

    } else if (current.type === 'pursuit' && current.boss) {
      ctx.save();
      const bx = current.boss.x, by = current.boss.y;
      const g = ctx.createRadialGradient(bx, by, 10, bx, by, 70);
      g.addColorStop(0, 'rgba(154, 77, 255, 0.6)');
      g.addColorStop(0.7, 'rgba(255, 45, 90, 0.3)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ---------------- Dibujado de HUD e Indicadores de Brújula ----------------

  function edgeArrow(ctx, w, h, cam, x, y, col, label) {
    if (!cam) return;
    const sx = (x - cam.left()) * cam.scale;
    const sy = (y - cam.top()) * cam.scale;
    const pad = 44;
    // Si ya está en pantalla cerca del centro, no dibuja flecha de borde
    if (sx > pad && sx < w - pad && sy > pad && sy < h - pad) return;

    const ex = G.U.clamp(sx, pad, w - pad);
    const ey = G.U.clamp(sy, pad + 70, h - pad - 80);
    const a = Math.atan2(sy - ey, sx - ex);
    const ca = Math.cos(a), sa = Math.sin(a);
    const pulse = 0.7 + Math.sin(performance.now() / 150) * 0.3;

    ctx.save();
    ctx.translate(ex, ey);
    ctx.globalAlpha = pulse;

    // Flecha triangular
    ctx.beginPath();
    ctx.moveTo(ca * 28, sa * 28);
    ctx.lineTo(Math.cos(a + 2.4) * 14, Math.sin(a + 2.4) * 14);
    ctx.lineTo(Math.cos(a - 2.4) * 14, Math.sin(a - 2.4) * 14);
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#051026';
    ctx.stroke();
    ctx.fillStyle = col;
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.font = '800 11px Pixelify,sans-serif';
    ctx.textAlign = ca > 0.3 ? 'right' : ca < -0.3 ? 'left' : 'center';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(5,10,24,0.9)';
    ctx.strokeText(label, -ca * 24, -sa * 22 + 4);
    ctx.fillStyle = col;
    ctx.fillText(label, -ca * 24, -sa * 22 + 4);
    ctx.restore();
  }

  function drawHUD(ctx, w, h, pl) {
    // 1. Banner superior de aviso de evento
    if (banner) {
      ctx.save();
      const bw = Math.min(360, w - 40);
      const bx = (w - bw) / 2;
      const by = 80;

      ctx.fillStyle = 'rgba(8, 14, 28, 0.9)';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, by, bw, 38, 8) : ctx.rect(bx, by, bw, 38);
      ctx.fill();
      ctx.strokeStyle = banner.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.font = '800 13px Pixelify,sans-serif';
      ctx.fillStyle = banner.color;
      ctx.fillText(banner.title, w / 2, by + 16);

      ctx.font = '600 10.5px Pixelify,sans-serif';
      ctx.fillStyle = '#f4f8ff';
      ctx.fillText(banner.sub, w / 2, by + 30);
      ctx.restore();
    }

    if (!current || !pl || !G.Camera) return;

    // 2. Indicadores de brújula HUD hacia la ubicación del evento
    if (current.type === 'zone') {
      const dM = Math.round(Math.hypot(current.x - pl.x, current.y - pl.y) / 32);
      const label = `🚩 ${G.T('Toma de Zona')} (${dM}m)`;
      edgeArrow(ctx, w, h, G.Camera, current.x, current.y, '#ffd23f', label);
    } else if (current.type === 'scavenger') {
      for (const it of current.items || []) {
        if (it.collected) continue;
        const dM = Math.round(Math.hypot(it.x - pl.x, it.y - pl.y) / 32);
        const label = `💎 ${G.T('Cristal')} (${dM}m)`;
        edgeArrow(ctx, w, h, G.Camera, it.x, it.y, '#7fe0ff', label);
      }
    } else if (current.type === 'pursuit') {
      const b = current.boss || (current.bossId && G.EnemyMgr ? G.EnemyMgr.get(current.bossId) : null);
      if (!b || !b.dead) {
        const bx = (b && b.x) || current.bossX || pl.x;
        const by = (b && b.y) || current.bossY || pl.y;
        const dM = Math.round(Math.hypot(bx - pl.x, by - pl.y) / 32);
        const label = `⚠️ ${G.T('Jefe')} (${dM}m)`;
        edgeArrow(ctx, w, h, G.Camera, bx, by, '#ff4757', label);
      }
    }
  }

  return {
    reset,
    update,
    drawWorld,
    drawHUD,
    onRemoteEvent,
    get current() { return current; }
  };
})();
