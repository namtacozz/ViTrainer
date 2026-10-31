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
      if (G.EnemyMgr && G.EnemyMgr.enemies) {
        G.EnemyMgr.enemies.push(pursuitBoss);
      }
    }

    current = {
      id: evDef.id,
      type: 'pursuit',
      boss: pursuitBoss,
      bossX: sp.x,
      bossY: sp.y,
      dex: dex,
      t: maxT,
      maxT: maxT,
      hazardTimer: 2.2
    };

    if (G.Coop && G.Coop.isHost) {
      G.Coop.broadcast(['inrun_ev', 'start_hunt', evDef.id, maxT, Math.round(sp.x), Math.round(sp.y), dex]);
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

    // Comprobar inicio de evento desde Timeline
    if (authority() && !current && G.Timeline) {
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
        if (inside > 0 && G.EnemyMgr && G.EnemyMgr.enemies) {
          for (const e of G.EnemyMgr.enemies) {
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

        if (current.progress >= 1.0) {
          completeEvent();
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
          if (current.boss && G.EnemyMgr) {
            if (G.FX && G.FX.ring) G.FX.ring(current.boss.x, current.boss.y, 20, 160, '#9a4dff', 0.8, 5);
            G.EnemyMgr.remove(current.boss, false);
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

    // 3. Generar racimo de recompensas de alto valor
    if (authority() && G.Pickups) {
      const spot = centerOfPlayers();
      // Ticket de gacha garantizado
      const hasT10 = Math.random() < 0.35;
      G.Pickups.push({ kind: hasT10 ? 'ticket10' : 'ticket', x: spot.x, y: spot.y, value: 1 });

      // Monedas y orbes de experiencia masivos
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * 6.28, d = G.U.rand(20, 80);
        G.Pickups.push({ kind: 'coin', x: spot.x + Math.cos(a) * d, y: spot.y + Math.sin(a) * d, value: 25 });
        G.Pickups.push({ kind: 'xpBig', x: spot.x + Math.sin(a) * d, y: spot.y + Math.cos(a) * d, value: 120 });
      }
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

      // Área interior coloreada
      const g = ctx.createRadialGradient(current.x, current.y, 10, current.x, current.y, r);
      g.addColorStop(0, 'rgba(255, 210, 63, 0.25)');
      g.addColorStop(0.85, 'rgba(255, 175, 20, 0.12)');
      g.addColorStop(1, 'rgba(255, 175, 20, 0.0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(current.x, current.y, r, 0, Math.PI * 2);
      ctx.fill();

      // Anillo perimetral base
      ctx.strokeStyle = 'rgba(255, 210, 63, 0.4)';
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
        // Empezar en la parte superior (-PI/2) y barrer en el sentido de las agujas del reloj
        ctx.arc(current.x, current.y, r, -Math.PI / 2, -Math.PI / 2 + sweepAngle);
        ctx.stroke();

        // Relleno sectorial sutil
        ctx.fillStyle = 'rgba(95, 224, 138, 0.15)';
        ctx.beginPath();
        ctx.moveTo(current.x, current.y);
        ctx.arc(current.x, current.y, r, -Math.PI / 2, -Math.PI / 2 + sweepAngle);
        ctx.closePath();
        ctx.fill();
      }

      // Icono central e indicador de porcentaje
      ctx.fillStyle = 'rgba(10, 16, 32, 0.85)';
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

        // Sombra en el suelo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.beginPath();
        ctx.ellipse(it.x, it.y + 12, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Resplandor del cristal
        const g = ctx.createRadialGradient(it.x, hoverY, 2, it.x, hoverY, 18);
        g.addColorStop(0, 'rgba(127, 224, 255, 0.8)');
        g.addColorStop(1, 'rgba(127, 224, 255, 0.0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(it.x, hoverY, 18, 0, Math.PI * 2);
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
      // Aura oscura alrededor del boss de persecución
      const bx = current.boss.x, by = current.boss.y;
      const g = ctx.createRadialGradient(bx, by, 10, bx, by, 65);
      g.addColorStop(0, 'rgba(154, 77, 255, 0.55)');
      g.addColorStop(0.7, 'rgba(255, 45, 90, 0.25)');
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, 65, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // ---------------- Dibujado de HUD e Indicadores de Brújula ----------------

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

    if (!current) return;

    // 2. Indicadores de brújula HUD para cristales no recogidos fuera de pantalla
    if (current.type === 'scavenger' && G.Camera) {
      ctx.save();
      const cx = G.Camera.x, cy = G.Camera.y;
      const pad = 34;

      for (const it of current.items) {
        if (it.collected) continue;

        // Coordenadas en pantalla
        const sx = it.x - cx + w / 2;
        const sy = it.y - cy + h / 2;

        const isOffscreen = (sx < pad || sx > w - pad || sy < pad || sy > h - pad);
        if (isOffscreen) {
          const dx = sx - w / 2;
          const dy = sy - h / 2;
          const angle = Math.atan2(dy, dx);

          // Limitar flecha al borde de la pantalla
          const edgeX = G.U.clamp(w / 2 + Math.cos(angle) * (w / 2 - pad), pad, w - pad);
          const edgeY = G.U.clamp(h / 2 + Math.sin(angle) * (h / 2 - pad), pad, h - pad);

          // Flecha indicadora limpia
          ctx.translate(edgeX, edgeY);
          ctx.rotate(angle);

          ctx.fillStyle = '#7fe0ff';
          ctx.strokeStyle = '#051026';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(12, 0);
          ctx.lineTo(-8, -7);
          ctx.lineTo(-4, 0);
          ctx.lineTo(-8, 7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.rotate(-angle);
          ctx.translate(-edgeX, -edgeY);
        }
      }
      ctx.restore();
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
