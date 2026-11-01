/* ============ hud.js — interfaz dentro del canvas ============
 * Se dibuja en coordenadas de PANTALLA (sin la transformación de cámara).
 */
G.HUD = (() => {
  const F = (w, s) => `${w} ${s}px Pixelify,"Segoe UI",system-ui,sans-serif`;
  /** Parte un texto en líneas de como mucho maxW de ancho (con la letra que tenga ctx). */
  function wrap(ctx, text, maxW) {
    const out = [];
    let cur = '';
    for (const word of String(text).split(' ')) {
      const t = cur ? cur + ' ' + word : word;
      if (cur && ctx.measureText(t).width > maxW) { out.push(cur); cur = word; } else cur = t;
    }
    if (cur) out.push(cur);
    return out;
  }

  /** Cartel encima de una esfera: su nombre y, con el ratón encima, también lo que hace. */
  function orbTip(ctx, id, cx, by, full, w) {
    const o = G.Orbs.BY[id], name = G.T(o.name);
    const lines = [];
    if (full) {
      ctx.font = F(600, 11);
      let cur = '';
      for (const word of G.T(o.desc).split(' ')) {
        const t = cur ? cur + ' ' + word : word;
        if (ctx.measureText(t).width > 240 && cur) { lines.push(cur); cur = word; } else cur = t;
      }
      if (cur) lines.push(cur);
    }
    ctx.font = F(800, 12);
    let bw = ctx.measureText(name).width;
    ctx.font = F(600, 11);
    for (const l of lines) bw = Math.max(bw, ctx.measureText(l).width);
    bw += 16;
    const bh = 20 + lines.length * 14, bx = G.U.clamp(cx - bw / 2, 4, w - bw - 4), y = by - bh;
    ctx.save();
    roundRect(ctx, bx, y, bw, bh, 8);
    ctx.fillStyle = 'rgba(10,14,28,.92)'; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = o.col; ctx.stroke();
    ctx.textAlign = 'center';
    ctx.font = F(800, 12); ctx.fillStyle = o.col;
    ctx.fillText(name, bx + bw / 2, y + 14);
    ctx.font = F(600, 11); ctx.fillStyle = '#e6ecff';
    lines.forEach((l, k) => ctx.fillText(l, bx + bw / 2, y + 28 + k * 14));
    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function bar(ctx, x, y, w, h, frac, col, bg = 'rgba(0,0,0,.55)') {
    roundRect(ctx, x, y, w, h, h / 2); ctx.fillStyle = bg; ctx.fill();
    if (frac > 0) {
      ctx.save();
      roundRect(ctx, x, y, w, h, h / 2); ctx.clip();
      ctx.fillStyle = col;
      ctx.fillRect(x, y, w * G.U.clamp(frac, 0, 1), h);
      ctx.restore();
    }
  }

  
  function drawTimelineBadge(ctx, x, y, ev) {
    ctx.save();
    if (ev.type === "boss") {
      ctx.fillStyle = "#ff3344";
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 2.5, y - 1.5, 1.6, 1.6);
      ctx.fillRect(x + 0.9, y - 1.5, 1.6, 1.6);
    } else if (ev.type === "rift") {
      ctx.fillStyle = "#a05bff";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#9ae6ff";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 1.5);
      ctx.stroke();

      // Hiển thị rõ mốc thời gian xuất hiện của cổng Rift
      ctx.font = F(700, 7.5);
      ctx.fillStyle = "#d8b4fe";
      ctx.textAlign = "center";
      ctx.fillText(G.U.mmss(ev.time), x, y - 8);
    } else if (ev.type === "event_zone") {
      ctx.fillStyle = "#ffd23f";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#101424";
      ctx.fillRect(x - 1.5, y - 3.5, 1.2, 7);
      ctx.beginPath();
      ctx.moveTo(x - 0.5, y - 3.5);
      ctx.lineTo(x + 3.5, y - 1.5);
      ctx.lineTo(x - 0.5, y + 0.5);
      ctx.closePath();
      ctx.fill();
    } else if (ev.type === "event_scavenger") {
      ctx.fillStyle = "#7fe0ff";
      ctx.beginPath();
      ctx.moveTo(x, y - 6.5);
      ctx.lineTo(x + 5, y);
      ctx.lineTo(x, y + 6.5);
      ctx.lineTo(x - 5, y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (ev.type === "event_pursuit") {
      ctx.fillStyle = "#ff7b3d";
      ctx.beginPath();
      ctx.moveTo(x, y - 6);
      ctx.lineTo(x + 6, y + 5);
      ctx.lineTo(x - 6, y + 5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 0.7, y - 1.5, 1.4, 3.5);
      ctx.fillRect(x - 0.7, y + 3, 1.4, 1.4);
    } else if (ev.type === "judgment") {
      ctx.fillStyle = "#ffe664";
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    ctx.restore();
  }

  
  // ---------- Bảng chỉ số thực tế & Delta Tracking (Góc dưới trái) ----------
  let lastStatValues = null;
  const statDeltas = {};
  let lastStatTime = 0;
  let hudEvoAnim = null, hudEvoDex = null, hudEvoShiny = null;

  function drawLiveStatsPanel(ctx, w, h, pl, F, roundRect, sa, touch) {
    if (!pl || !pl.mon) return;
    const now = performance.now() / 1000;
    const dt = lastStatTime ? Math.min(0.1, now - lastStatTime) : 0.016;
    lastStatTime = now;

    // Tính toán toàn diện mọi chỉ số từ lõi game (canon stats)
    const patkVal = Math.round(pl.atkFor ? pl.atkFor({ cat: 'physical' }) * 100 : pl.atk * 100);
    const satkVal = Math.round(pl.atkFor ? pl.atkFor({ cat: 'special' }) * 100 : (pl.mon.sa || 1) * pl.atkMul * 100);
    const pdefVal = Math.round(pl.pdef ? pl.pdef : (pl.mon && pl.mon.df) || 50);
    const sdefVal = Math.round(pl.sdef ? pl.sdef : (pl.mon && pl.mon.sd) || 50);
    const spdVal = Math.round(pl.spd);
    const critVal = Math.round((pl.critChance || 0.05) * 100);
    const cdrVal = Math.round(Math.max(0, (1 - (pl.cdMul || 1)) * 100));
    const drVal = Math.round((pl.dmgReduce || 0) * 100);

    const curStats = {
      patk: patkVal,
      satk: satkVal,
      pdef: pdefVal,
      sdef: sdefVal,
      spd: spdVal,
      crit: critVal,
      cdr: cdrVal,
      dr: drVal
    };

    if (lastStatValues) {
      for (const k in curStats) {
        const diff = curStats[k] - lastStatValues[k];
        if (diff !== 0) {
          statDeltas[k] = { val: diff, timer: 2.5 };
        }
      }
    }
    lastStatValues = Object.assign({}, curStats);

    // Cập nhật timer delta
    for (const k in statDeltas) {
      if (statDeltas[k].timer > 0) {
        statDeltas[k].timer -= dt;
        if (statDeltas[k].timer <= 0) delete statDeltas[k];
      }
    }

    const panelW = 210, panelH = 74;
    const px = 14 + sa.left;
    const py = h - panelH - 12 - sa.bottom - (touch ? 46 : 0);

    ctx.save();
    roundRect(ctx, px, py, panelW, panelH, 10);
    ctx.fillStyle = 'rgba(8, 14, 28, 0.88)';
    ctx.fill();
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = 'rgba(79, 209, 255, 0.45)';
    ctx.stroke();

    const renderStat = (label, val, deltaKey, x, y, col) => {
      ctx.textAlign = 'left';
      ctx.font = F(700, 8.5);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(label, x, y);

      ctx.font = F(800, 9.5);
      ctx.fillStyle = col || '#eaf2ff';
      const valStr = String(val);
      ctx.fillText(valStr, x + 40, y);

      const d = statDeltas[deltaKey];
      if (d && d.timer > 0) {
        const alpha = Math.min(1, d.timer);
        ctx.font = F(800, 8);
        if (d.val > 0) {
          ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
          ctx.fillText(`+${d.val}▲`, x + 72, y);
        } else {
          ctx.fillStyle = `rgba(248, 113, 113, ${alpha})`;
          ctx.fillText(`${d.val}▼`, x + 72, y);
        }
      }
    };

    const isVi = (typeof G !== 'undefined' && G.I18n && G.I18n.lang === 'vi');
    const L_PATK = isVi ? 'CÔNG.VẬT' : 'P.ATK';
    const L_SATK = isVi ? 'CÔNG.PHÉP' : 'SP.ATK';
    const L_PDEF = isVi ? 'GIÁP.VẬT' : 'P.DEF';
    const L_SDEF = isVi ? 'GIÁP.PHÉP' : 'SP.DEF';
    const L_SPD  = isVi ? 'TỐC ĐỘ' : 'SPD';
    const L_CRIT = isVi ? 'CHÍ MẠNG' : 'CRIT';
    const L_CDR  = isVi ? 'HỒI CHIÊU' : 'CDR';
    const L_DR   = isVi ? 'GIẢM ST' : 'DMG.RED';

    // Cột 1
    renderStat(L_PATK, curStats.patk + '%', 'patk', px + 6, py + 16, '#ff6b4d');
    renderStat(L_PDEF, curStats.pdef, 'pdef', px + 6, py + 34, '#94a3b8');
    renderStat(L_SPD, curStats.spd, 'spd', px + 6, py + 52, '#7fe0ff');
    renderStat(L_CDR, curStats.cdr + '%', 'cdr', px + 6, py + 69, '#4ade80');

    // Cột 2
    renderStat(L_SATK, curStats.satk + '%', 'satk', px + 106, py + 16, '#c47bff');
    renderStat(L_SDEF, curStats.sdef, 'sdef', px + 106, py + 34, '#38bdf8');
    renderStat(L_CRIT, curStats.crit + '%', 'crit', px + 106, py + 52, '#fbbf24');
    renderStat(L_DR, curStats.dr + '%', 'dr', px + 106, py + 69, '#fb923c');

    ctx.restore();
  }

  function drawTimelineBar(ctx, w, h, time) {
    if (!G.Timeline) return;
    const sa = (typeof G !== 'undefined' && G.Touch && G.Touch.safeArea) ? G.Touch.safeArea() : { top: 0, left: 0, bottom: 0, right: 0 };
    const touch = G.Touch && G.Touch.active;
    // Phóng to thanh tiến trình thêm 30%
    const barW = Math.min(312, Math.max(208, Math.floor(w * 0.364)));
    if (barW < 120) return;
    const barH = 21; // 16 * 1.30 ≈ 21px
    const rightMargin = 16 + sa.right + (touch ? 52 : 0);
    const barX = w - barW - rightMargin;
    const wx = G.Weather && G.Weather.current;
    const barY = 16 + sa.top + (wx ? 34 : 0);
    const windowSecs = 135;
    const nowX = barX + 16;

    // Nền thanh thời gian kính mờ bo tròn
    ctx.save();
    roundRect(ctx, barX, barY, barW, barH, 9);
    ctx.fillStyle = 'rgba(10, 15, 30, 0.78)';
    ctx.fill();
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.stroke();

    // Vạch đánh dấu hiện tại
    ctx.fillStyle = '#ff5f6d';
    roundRect(ctx, nowX - 2, barY + 2, 4, barH - 4, 2);
    ctx.fill();

    ctx.save();
    roundRect(ctx, barX + 2, barY + 1, barW - 4, barH - 2, 8);
    ctx.clip();

    const upcoming = G.Timeline.getUpcoming(time, windowSecs);
    for (const ev of upcoming) {
      const dt = ev.time - time;
      const markerX = nowX + (dt / windowSecs) * (barW - 42);
      if (markerX >= barX - 14 && markerX <= barX + barW + 14) {
        drawTimelineBadge(ctx, markerX, barY + barH / 2, ev);
      }
    }
    ctx.restore();

    // Văn bản sự kiện sắp tới
    const upcomingList = G.Timeline.getUpcoming(time, windowSecs);
    const futureEvents = upcomingList.filter(ev => ev.time > time).sort((a, b) => a.time - b.time);
    const nextEv = futureEvents[0];
    if (nextEv) {
      const dt = Math.ceil(nextEv.time - time);
      const isVi = (typeof G !== 'undefined' && G.I18n && G.I18n.lang === 'vi');
      let eventTitle = nextEv.title;
      if (nextEv.type === 'rift') {
        const timeStr = G.U.mmss(nextEv.time);
        eventTitle = isVi ? ('Cổng Rift [' + timeStr + ']') : ('Rift [' + timeStr + ']');
      } else if (nextEv.type === 'boss') {
        eventTitle = isVi ? nextEv.title.replace(/Jefe/g, 'Trùm') : nextEv.title.replace(/Jefe/g, 'Boss');
      }
      const label = isVi ? ('Sắp tới: ' + eventTitle + ' (' + dt + 's)') : ('Next: ' + eventTitle + ' (' + dt + 's)');
      ctx.font = F(700, 10.5);
      ctx.fillStyle = '#ffd23f';
      ctx.textAlign = 'right';
      ctx.fillText(label, barX + barW, barY + barH + 13);
    }

    if (G.InRunEvents && G.InRunEvents.current) {
      const cur = G.InRunEvents.current;
      const pulse = 0.5 + Math.sin(Date.now() / 180) * 0.5;
      ctx.strokeStyle = cur.type === "zone" ? ("rgba(255, 210, 63, " + (0.4 + pulse * 0.5) + ")")
                      : cur.type === "scavenger" ? ("rgba(127, 224, 255, " + (0.4 + pulse * 0.5) + ")")
                      : ("rgba(255, 95, 109, " + (0.4 + pulse * 0.5) + ")");
      ctx.lineWidth = 2.2;
      roundRect(ctx, barX - 1, barY - 1, barW + 2, barH + 2, 10);
      ctx.stroke();

      ctx.font = F(700, 10);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      if (cur.type === "zone") {
        const pct = Math.floor(cur.progress * 100);
        ctx.fillText(G.T("Toma de Zona") + ": " + pct + "%", barX + barW / 2, barY + barH + 12);
      } else if (cur.type === "survival") {
        const left = Math.max(0, Math.ceil(cur.duration - cur.elapsed));
        ctx.fillText(G.T("Supervivencia") + ": " + left + "s", barX + barW / 2, barY + barH + 12);
      } else if (cur.type === "scavenger") {
        ctx.fillText(G.T("Chatarrero") + ": " + (cur.found || 0) + "/" + (cur.total || 5), barX + barW / 2, barY + barH + 12);
      }
    }
    ctx.restore();
  }

  function drawTimelineBadge(ctx, x, y, ev) {
    ctx.save();
    if (ev.type === "boss") {
      ctx.fillStyle = "#ff3344";
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 2.5, y - 1.5, 1.6, 1.6);
      ctx.fillRect(x + 0.9, y - 1.5, 1.6, 1.6);
    } else if (ev.type === "rift") {
      ctx.fillStyle = "#a05bff";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#9ae6ff";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 1.5);
      ctx.stroke();

      // Hiển thị rõ mốc thời gian xuất hiện của cổng Rift
      ctx.font = F(700, 7.5);
      ctx.fillStyle = "#d8b4fe";
      ctx.textAlign = "center";
      ctx.fillText(G.U.mmss(ev.time), x, y - 8);
    } else if (ev.type === "event_zone") {
      ctx.fillStyle = "#ffd23f";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#101424";
      ctx.fillRect(x - 1.5, y - 3.5, 1.2, 7);
      ctx.beginPath();
      ctx.moveTo(x - 0.5, y - 3.5);
      ctx.lineTo(x + 3.5, y - 1.5);
      ctx.lineTo(x - 0.5, y + 0.5);
      ctx.closePath();
      ctx.fill();
    } else if (ev.type === "event_scavenger") {
      ctx.fillStyle = "#7fe0ff";
      ctx.beginPath();
      ctx.moveTo(x, y - 6.5);
      ctx.lineTo(x + 5, y);
      ctx.lineTo(x, y + 6.5);
      ctx.lineTo(x - 5, y);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();
    } else if (ev.type === "event_pursuit") {
      ctx.fillStyle = "#ff7b3d";
      ctx.beginPath();
      ctx.moveTo(x, y - 6);
      ctx.lineTo(x + 6, y + 5);
      ctx.lineTo(x - 6, y + 5);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 0.7, y - 1.5, 1.4, 3.5);
      ctx.fillRect(x - 0.7, y + 3, 1.4, 1.4);
    } else if (ev.type === "judgment") {
      ctx.fillStyle = "#ffe664";
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    ctx.restore();
  }

  
  
  function draw(ctx, w, h, pl, st) {
    ctx.save();
    ctx.textBaseline = 'alphabetic';
    G.Touch.clearButtons();
    const touch = G.Touch.active;

    // ---------- barra de experiencia (borde superior) ----------
    const xpF = pl.xp / pl.xpNext;
    ctx.fillStyle = 'rgba(0,0,0,.5)';
    ctx.fillRect(0, 0, w, 7);
    const g = ctx.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, '#4fd1ff'); g.addColorStop(1, '#a98bff');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w * G.U.clamp(xpF, 0, 1), 7);

    // ---------- vida + nivel (Scale +30%) ----------
    const sa = G.Touch.safeArea();
    const px = 16 + sa.left, py = 18 + sa.top;
    ctx.font = F(800, 17);
    ctx.fillStyle = '#eaf2ff';
    ctx.textAlign = 'left';
    ctx.fillText(pl.mon.name, px, py + 12);
    if (pl.isMega && G.Icons) {
      const nw = ctx.measureText(pl.mon.name).width;
      G.Icons.draw(ctx, 'megaBadge', px + nw + 6, py - 3, 20);
    }

    ctx.font = F(700, 14.5);
    ctx.fillStyle = '#ffcb3d';
    ctx.fillText('Lv. ' + pl.level, px, py + 33);

    bar(ctx, px + 62, py + 20, 218, 15, pl.hp / pl.maxHp, '#ff5f6d');
    ctx.font = F(700, 11);
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.textAlign = 'center';
    ctx.fillText(Math.ceil(pl.hp) + ' / ' + Math.round(pl.maxHp), px + 62 + 109, py + 32);

    // ---------- HUD ĐẶC TÍNH (ABILITY BADGE) NGAY DƯỚI THANH MÁU ----------
    if (pl.abilId || pl.abil) {
      const isVi = (typeof G !== 'undefined' && G.I18n && G.I18n.lang === 'vi');
      const abName = (G.Mons && G.Mons.abilityName) ? G.Mons.abilityName(pl.abilId) : (pl.abilId || 'Đặc tính');

      // Xác định trạng thái động / bộ đếm kích hoạt của ability
      let statusText = '';
      if (pl.moxieStacks) statusText = ' (' + pl.moxieStacks + 'x)';
      else if (pl.speedBoostT != null) statusText = ' (' + Math.ceil(pl.speedBoostT) + 's)';
      else if (pl.sumT != null) statusText = ' (' + Math.max(0, Math.ceil(pl.sumT)) + 's)';
      else if (pl.abilId === 'disguise') statusText = pl.disguiseBroken ? (isVi ? ' [Đã vỡ]' : ' [Broken]') : (isVi ? ' [Sẵn sàng]' : ' [Ready]');

      const rawDesc = (pl.abil && pl.abil.d) ? (G.T ? G.T(pl.abil.d) : pl.abil.d) : '';
      const abBoxX = px + 62, abBoxY = py + 39, abBoxW = 270;

      ctx.save();
      ctx.font = F(500, 8.5);
      // Tách dòng tự nhiên để hiển thị đầy đủ 100% mô tả, không bao giờ cắt '...'
      const descLines = rawDesc ? wrap(ctx, rawDesc, abBoxW - 14) : [];
      const lineH = 11;
      const abBoxH = 16 + descLines.length * lineH + 4;

      roundRect(ctx, abBoxX, abBoxY, abBoxW, abBoxH, 6);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
      ctx.fill();
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.60)';
      ctx.stroke();

      // Dòng 1: Tiêu đề đặc tính
      ctx.textAlign = 'left';
      ctx.font = F(700, 9);
      ctx.fillStyle = '#e9d5ff';
      ctx.fillText('✦ ' + abName + statusText, abBoxX + 6, abBoxY + 12);

      // Các dòng tiếp theo: Mô tả trọn vẹn của đặc tính
      ctx.font = F(500, 8.5);
      ctx.fillStyle = '#cbd5e1';
      for (let i = 0; i < descLines.length; i++) {
        ctx.fillText(descLines[i], abBoxX + 6, abBoxY + 23 + i * lineH);
      }
      ctx.restore();
    }

    // ---------- Ô vuông Mục tiêu Tiến hóa & Cấp độ kế tiếp (Evolution Target Box) ----------
    function getEvoTarget() {
      const bDex = pl.baseDex || (pl.mon && pl.mon.dex) || pl.dex;
      const cDex = pl.dex;
      const curLv = pl.level || 1;

      // 1. Zygarde đặc biệt: 10% (Lv. 1 - 24) -> 50% (Lv. 25 - 49) -> 100% (Lv. 50+, Core Enforcer) -> Mega (Lv. 50 + 3500 quái)
      if (bDex === 718) {
        if (pl.isMega && (cDex === 10121 || pl.megaId === 10121)) {
          return { dex: 10121, label: 'Hoàn thiện', isFinal: true };
        }
        if (cDex === 10120 || curLv >= 50) {
          const kills = (pl && pl.kills) || 0;
          const reqLv = 50;
          const ready = kills >= 3500 && curLv >= reqLv;
          return {
            dex: 10121,
            label: ready ? 'Sẵn sàng Mega!' : (curLv < reqLv ? `Lv. ${curLv}/${reqLv}` : `Mega ${kills}/3500`),
            ready,
            icon: 'megaBadge'
          };
        }
        if (cDex === 718 || curLv >= 25) {
          return { dex: 10120, exactDex: true, label: `Lv. ${curLv}/50` };
        }
        return { dex: 718, exactDex: true, label: `Lv. ${curLv}/25` };
      }

      // 2. Huyền thoại tiến hóa qua chiêu độc quyền + (EXCLUSIVE_PLUS_EVO)
      const EXCLUSIVE_PLUS_EVO = {
        384: { move: 'dragon-ascent', targetDex: 10079, name: 'Dragon Ascent' },
        382: { move: 'origin-pulse', targetDex: 10077, name: 'Origin Pulse' },
        383: { move: 'precipice-blades', targetDex: 10078, name: 'Precipice Blades' },
        483: { move: 'roar-of-time', targetDex: 10008, name: 'Roar of Time' },
        484: { move: 'spacial-rend', targetDex: 10009, name: 'Spacial Rend' },
        487: { move: 'shadow-force', targetDex: 10007, name: 'Shadow Force' },
        888: { move: 'behemoth-blade', targetDex: 10188, name: 'Behemoth Blade' },
        889: { move: 'behemoth-bash', targetDex: 10189, name: 'Behemoth Bash' },
        646: { move: 'glaciate', targetDex: 10022, name: 'Glaciate' },
        800: { move: 'prismatic-laser', targetDex: 10157, name: 'Prismatic Laser' },
        801: { move: 'fleur-cannon', targetDex: 10801, name: 'Fleur Cannon' },
        807: { move: 'plasma-fists', targetDex: 10807, name: 'Plasma Fists' },
        643: { move: 'fusion-flare', targetDex: 643, name: 'Fusion Flare' },
        644: { move: 'fusion-bolt', targetDex: 644, name: 'Fusion Bolt' },
        10022: { move: 'freeze-shock', targetDex: 10022, name: 'Freeze Shock' },
        10023: { move: 'ice-burn', targetDex: 10023, name: 'Ice Burn' }
      };

      const leg = EXCLUSIVE_PLUS_EVO[bDex];
      if (leg) {
        if (pl.isMega || cDex >= 10000) {
          return { dex: leg.targetDex, label: 'Hoàn thiện', isFinal: true };
        }
        let curTier = 0;
        if (pl.slots) {
          for (const g of pl.slots) {
            const list = Array.isArray(g) ? g : [g];
            for (const m of list) {
              if (m && (m.id === leg.move || (m.def && m.def.id === leg.move))) {
                curTier = Math.max(curTier, m.evoTier || (m.evolved ? 1 : 0));
              }
            }
          }
        }
        const ready = curTier >= 1;
        return {
          dex: leg.targetDex,
          label: ready ? 'Sẵn sàng!' : `${leg.name} +`,
          ready
        };
      }

      // 3. Chuỗi tiến hóa thông thường
      const ch = (typeof G !== 'undefined' && G.getEvoChain) ? G.getEvoChain(bDex) : null;
      const stg = pl.evoStage || 1;
      const mList = (typeof G !== 'undefined' && G.getMegasFor) ? G.getMegasFor(bDex) : [];
      const hasM = mList && mList.length > 0;
      const mDex = hasM ? (mList[0].spriteDex || mList[0].id) : null;

      if (pl.isMega) {
        return { dex: mDex || cDex, label: 'Hoàn thiện', isFinal: true };
      }

      if (ch && ch.type === '3stage') {
        if (stg === 1) {
          const nDex = ch.stages[1] ? ch.stages[1][0] : cDex;
          return { dex: nDex, label: `Lv. ${curLv}/15` };
        } else if (stg === 2) {
          const nDex = ch.stages[2] ? ch.stages[2][0] : cDex;
          return { dex: nDex, label: `Lv. ${curLv}/30` };
        } else {
          if (hasM) {
            return { dex: mDex, label: `Mega (Lv. ${curLv}/30)`, icon: 'megaBadge' };
          }
          if (!pl.isApex) {
            return { icon: 'crown', label: `Apex+ ${curLv}/30` };
          }
          return { dex: cDex, label: 'Hoàn thiện', isFinal: true };
        }
      } else if (ch && ch.type === '2stage') {
        if (stg === 1) {
          const nDex = ch.stages[1] ? ch.stages[1][0] : cDex;
          return { dex: nDex, label: `Lv. ${curLv}/18` };
        } else {
          if (hasM) {
            return { dex: mDex, label: `Mega (Lv. ${curLv}/30)`, icon: 'megaBadge' };
          }
          if (!pl.isApex) {
            return { icon: 'crown', label: `Apex+ ${curLv}/30` };
          }
          return { dex: cDex, label: 'Hoàn thiện', isFinal: true };
        }
      } else if (ch && ch.type === 'branch') {
        if (stg === 1) {
          const nDex = (ch.members || []).find(d => d !== bDex) || cDex;
          return { dex: nDex, label: `Lv. ${curLv}/15` };
        } else {
          if (hasM) {
            return { dex: mDex, label: `Mega (Lv. ${curLv}/30)`, icon: 'megaBadge' };
          }
          if (!pl.isApex) {
            return { icon: 'crown', label: `Apex+ ${curLv}/30` };
          }
          return { dex: cDex, label: 'Hoàn thiện', isFinal: true };
        }
      } else {
        if (hasM) {
          return { dex: mDex, label: `Mega (Lv. ${curLv}/30)`, icon: 'megaBadge' };
        }
        if (pl.awakeningTier === 0) {
          return { icon: 'star', label: `Thức tỉnh ${curLv}/15` };
        } else if (pl.awakeningTier === 1) {
          return { icon: 'crown', label: `Apex+ ${curLv}/30` };
        } else {
          return { dex: cDex, label: 'Hoàn thiện', isFinal: true };
        }
      }
    }

    const target = getEvoTarget();
    if (target) {
      const boxX = px + 288, boxY = py + 7, boxW = 46, boxH = 46;

      // Nền hộp vuông (Glassmorphic)
      roundRect(ctx, boxX, boxY, boxW, boxH, 8);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
      ctx.fill();

      // Viền hộp: Gold nếu hoàn thiện, Xanh nếu sẵn sàng, Viền xám sáng nếu đang cày
      ctx.lineWidth = 1.5;
      if (target.isFinal) {
        ctx.strokeStyle = '#fbbf24';
        ctx.shadowColor = 'rgba(251, 191, 36, 0.4)';
        ctx.shadowBlur = 8;
      } else if (target.ready) {
        ctx.strokeStyle = '#22c55e';
        ctx.shadowColor = 'rgba(34, 197, 94, 0.5)';
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Vẽ sprite / biểu tượng bên trong ô
      ctx.save();
      roundRect(ctx, boxX + 1, boxY + 1, boxW - 2, boxH - 2, 7);
      ctx.clip();

      if (target.dex) {
        const drawDex = (target.dex === 718 && !target.exactDex) ? 10118 : target.dex;
        if (hudEvoDex !== drawDex || hudEvoShiny !== pl.shiny) {
          hudEvoDex = drawDex;
          hudEvoShiny = pl.shiny;
          hudEvoAnim = new G.Sprites.Animator(drawDex, 1, pl.shiny);
          if (G.Sprites.preload) G.Sprites.preload([drawDex], 8000, pl.shiny);
        }
        if (hudEvoAnim) {
          hudEvoAnim.update(0.016);
          const meta = G.Sprites.animMeta(drawDex, 'Idle', pl.shiny);
          const maxDim = meta ? Math.max(meta.w || 32, meta.h || 32) : 32;
          hudEvoAnim.scale = Math.min(1.2, 34 / (maxDim * G.Sprites.PX));
          hudEvoAnim.draw(ctx, boxX + boxW / 2, boxY + boxH - 5);
        }
        if (target.icon && G.Icons) {
          G.Icons.draw(ctx, target.icon, boxX + boxW - 16, boxY + 3, 13);
        }
      } else if (target.icon && G.Icons) {
        G.Icons.draw(ctx, target.icon, boxX + (boxW - 26) / 2, boxY + (boxH - 26) / 2, 26);
      }
      ctx.restore();

      // Nhãn chữ ngay dưới ô vuông (ví dụ: Thức tỉnh 1/15, Lv. 15/25, Hoàn thiện)
      ctx.font = F(700, 9.5);
      ctx.textAlign = 'center';
      ctx.fillStyle = target.isFinal ? '#fbbf24' : (target.ready ? '#4ade80' : 'rgba(255, 255, 255, 0.95)');
      ctx.fillText(target.label, boxX + boxW / 2, boxY + boxH + 11);
    }

    // buffs activos
    const COL = { atk: '#ff6b4d', patk: '#ff6b4d', satk: '#c47bff', spd: '#7fe0ff', def: '#b0b8c8', regen: '#5fe08a' };
    const LBL = { atk: 'ATK', patk: 'ATK', satk: 'AT.E', spd: 'VEL', def: 'DEF', regen: 'REG' };
    let bx = px;
    ctx.textAlign = 'left';
    for (const k in pl.buffs) {
      const b = pl.buffs[k];
      if (b.n <= 0) continue;
      ctx.font = F(800, 9);
      const txt = LBL[k] + ' ×' + b.n;
      const tw = ctx.measureText(txt).width + 12;
      roundRect(ctx, bx, py + 41, tw, 15, 7);
      ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fill();
      ctx.fillStyle = COL[k];
      ctx.fillText(txt, bx + 6, py + 52);
      bx += tw + 5;
    }

    // ---------- reloj / bioma / kills ----------
    ctx.textAlign = 'center';
    ctx.font = F(800, 26);
    ctx.fillStyle = 'rgba(255,255,255,.95)';
    ctx.fillText(G.U.mmss(st.time), w / 2, 42);
    ctx.font = F(600, 10);
    ctx.fillStyle = '#8fa3c4';
    // Halloween: también los caramelos que llevas en esta partida.
    const cn = G.Halloween.inRun ? '  ·  ' + (pl.candy || 0) + ' CARAMELOS' : '';
    ctx.fillText(G.World.biomeName().toUpperCase() + ' · ' + pl.kills + ' DERROTADOS · ' + pl.coins + ' MONEDAS' + cn, w / 2, 58);
    drawTimelineBar(ctx, w, h, st.time);
    drawLiveStatsPanel(ctx, w, h, pl, F, roundRect, sa, touch);

    // ---------- clima (arriba a la derecha) ----------
    const wx = G.Weather.current;
    if (wx) {
      ctx.font = F(800, 11);
      ctx.textAlign = 'left';
      const txt = wx.name.toUpperCase() + ' · ' + Math.ceil(wx.left) + 's';
      const tw = ctx.measureText(txt).width + 40;
      const x0 = w - tw - 16 - sa.right - (touch ? 56 : 0), y0 = 14 + sa.top;
      roundRect(ctx, x0, y0, tw, 26, 9);
      ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fill();
      G.Icons.draw(ctx, wx.icon, x0 + 6, y0 + 3, 20);
      ctx.fillStyle = wx.color;
      ctx.fillText(txt, x0 + 32, y0 + 17);
    }

    // ---------- barra del jefe ----------
    const boss = G.EnemyMgr.all().find(e => e.boss && !e.dead && !e.isPursuit);
    if (boss) {
      const bw = Math.min(300, w - 80);
      const bY = 68;
      bar(ctx, (w - bw) / 2, bY, bw, 12, boss.hp / boss.maxHp, '#ffcb3d');
      ctx.font = F(800, 9.5);
      ctx.fillStyle = '#20160a';
      const phaseTag = boss.bossPhase > 1 ? ' [FASE ' + boss.bossPhase + ']' : '';
      ctx.fillText(boss.name.toUpperCase() + phaseTag, w / 2, bY + 9.5);
    }

    // ---------- aviso ----------
    // ---------- shinies fuera de pantalla: destello en el borde ----------
    const cam = G.Camera, pulse = 0.6 + Math.sin(performance.now() / 160) * 0.4;
    for (const e of G.EnemyMgr.shinies()) {
      const sx = (e.x - cam.left()) * cam.scale, sy = (e.y - cam.top()) * cam.scale;
      if (sx > 0 && sx < w && sy > 0 && sy < h) continue;
      const M = 34;
      const ex = G.U.clamp(sx, M, w - M), ey = G.U.clamp(sy, M + 60, h - M - 70);
      const a = Math.atan2(sy - ey, sx - ex);
      ctx.save();
      ctx.globalAlpha = pulse;
      ctx.translate(ex, ey);
      ctx.fillStyle = '#9ae6ff';
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 24, Math.sin(a) * 24);
      ctx.lineTo(Math.cos(a + 2.5) * 12, Math.sin(a + 2.5) * 12);
      ctx.lineTo(Math.cos(a - 2.5) * 12, Math.sin(a - 2.5) * 12);
      ctx.fill();
      ctx.globalAlpha = 1;
      G.Icons.draw(ctx, 'shiny', -12, -12, 24);
      ctx.restore();
    }

    // Poder de altar activo.
    if (pl.power) {
      const pw = pl.power, txt = pw.def.name.toUpperCase() + ' ' + Math.ceil(pw.t) + 's';
      ctx.font = F(800, 9);
      ctx.textAlign = 'left';
      const tw = ctx.measureText(txt).width + 12;
      roundRect(ctx, bx, py + 34, tw, 15, 7);
      ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fill();
      ctx.fillStyle = pw.def.color;
      ctx.fillText(txt, bx + 6, py + 45);
      bx += tw + 5;
    }

    if (G.Coop.active) drawCoop(ctx, w, h, pl, px, py + (bx > px ? 65 : 48));

    // Grieta: flecha grande que late en el borde si no se ve, y si se ve, una
    // flecha que bota encima; en la arena, cuenta atrás.
    const rift = G.Rift.rift;
    if (rift) {
      const sx = (rift.x - cam.left()) * cam.scale, sy = (rift.y - 40 - cam.top()) * cam.scale;
      const now = performance.now() / 1000, beat = 0.5 + Math.sin(now * 7) * 0.5;
      const label = 'GRIETA · ' + Math.round(G.U.dist(pl.x, pl.y, rift.x, rift.y) / 32) + ' m · ' + Math.ceil(rift.ttl) + ' s';
      const off = sx < 0 || sx > w || sy < 0 || sy > h;
      ctx.save();
      if (off) {
        const M = 52, ex = G.U.clamp(sx, M, w - M), ey = G.U.clamp(sy, M + 70, h - M - 80);
        const a = Math.atan2(sy - ey, sx - ex), ca = Math.cos(a), sa = Math.sin(a);
        ctx.translate(ex, ey);
        // Halo que late.
        ctx.globalAlpha = 0.18 + beat * 0.22;
        ctx.fillStyle = '#b48aff';
        ctx.beginPath(); ctx.arc(0, 0, 30 + beat * 8, 0, 6.2832); ctx.fill();
        ctx.globalAlpha = 1;
        const tri = (k) => {
          ctx.beginPath();
          ctx.moveTo(ca * 40 * k, sa * 40 * k);
          ctx.lineTo(Math.cos(a + 2.45) * 20 * k, Math.sin(a + 2.45) * 20 * k);
          ctx.lineTo(Math.cos(a - 2.45) * 20 * k, Math.sin(a - 2.45) * 20 * k);
          ctx.closePath();
        };
        tri(1.12); ctx.fillStyle = '#1a0b33'; ctx.fill();
        tri(1); ctx.fillStyle = beat > 0.5 ? '#e2d0ff' : '#a06bff'; ctx.fill();
        ctx.font = F(800, 12);
        ctx.textAlign = ca > 0.3 ? 'right' : ca < -0.3 ? 'left' : 'center';
        const lx = -ca * 34, ly = -sa * 30 + 4;
        ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.85)';
        ctx.strokeText(label, lx, ly);
        ctx.fillStyle = '#e2d0ff';
        ctx.fillText(label, lx, ly);
      } else {
        // Encima de la grieta: flecha hacia abajo que bota.
        const by = sy - 46 - Math.abs(Math.sin(now * 4)) * 10;
        ctx.translate(sx, by);
        ctx.beginPath(); ctx.moveTo(-15, -12); ctx.lineTo(15, -12); ctx.lineTo(0, 8); ctx.closePath();
        ctx.lineWidth = 4; ctx.strokeStyle = '#1a0b33'; ctx.stroke();
        ctx.fillStyle = beat > 0.5 ? '#e2d0ff' : '#a06bff'; ctx.fill();
        ctx.font = F(800, 11); ctx.textAlign = 'center';
        ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.85)';
        const l2 = 'GRIETA · ' + Math.ceil(rift.ttl) + ' s';
        ctx.strokeText(l2, 0, -18); ctx.fillStyle = '#e2d0ff'; ctx.fillText(l2, 0, -18);
      }
      ctx.restore();
    }
    if (G.Rift.inArena) {
      ctx.textAlign = 'center';
      ctx.font = F(800, 12);
      ctx.fillStyle = '#d9c2ff';
      ctx.fillText('GRIETA · ' + G.U.mmss(G.Rift.timeLeft), w / 2, boss ? 98 : 76);
    }

    // Eventos: cuenta atrás, flecha al Pokémon perdido / a la marca y a los duendes.
    G.Events.drawHud(ctx, w, h, pl, F);

    // Aviso propio al abrirse una grieta (no lo tapan los otros avisos).
    if (rift && rift.t < 4.5) {
      const a = Math.min(1, rift.t * 4, (4.5 - rift.t) * 2), pop = 1 + Math.max(0, 0.25 - rift.t) * 1.6;
      const y0 = h * 0.2;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(w / 2, y0); ctx.scale(pop, pop);
      ctx.font = F(800, 20);
      const t1 = '¡SE HA ABIERTO UNA GRIETA!', t2 = 'Sigue la flecha morada: dentro te espera un legendario';
      const bw = Math.min(w - 24, Math.max(ctx.measureText(t1).width, (ctx.font = F(700, 11), ctx.measureText(t2).width)) + 36);
      roundRect(ctx, -bw / 2, -26, bw, 52, 10);
      ctx.fillStyle = 'rgba(26,11,51,.88)'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = '#b48aff'; ctx.stroke();
      ctx.textAlign = 'center';
      ctx.font = F(800, 20); ctx.fillStyle = '#e2d0ff'; ctx.fillText(t1, 0, -2);
      ctx.font = F(700, 11); ctx.fillStyle = '#c9b0ff'; ctx.fillText(t2, 0, 16);
      ctx.restore();
    }

    const ban = G.Spawner.banner();
    if (ban) {
      const a = Math.min(1, ban.t * 1.6);
      ctx.save();
      ctx.globalAlpha = a;
      // Siempre centrado (antes heredaba la alineación de lo último dibujado, p.
      // ej. la flecha de un duende del tesoro, y salía descolocado).
      ctx.textAlign = 'center';
      // En el móvil las frases largas (las esferas) se salían por los dos lados:
      // se parten en líneas y, si aún no caben en tres, la letra baja.
      let size = 22, lines;
      for (;;) {
        ctx.font = F(800, size);
        lines = wrap(ctx, ban.text, w - 40);
        if (lines.length <= 3 || size <= 14) break;
        size -= 2;
      }
      ctx.fillStyle = '#ffcb3d';
      ctx.strokeStyle = 'rgba(0,0,0,.7)'; ctx.lineWidth = 4;
      // (Nunca por encima de la línea de bioma, derrotados y monedas, bajo el reloj.)
      const y0 = Math.max(78 + size * 0.5, h * 0.3 - (lines.length - 1) / 2 * size * 1.25);
      lines.forEach((ln, i) => {
        const y = y0 + i * size * 1.25;
        ctx.strokeText(ln, w / 2, y);
        ctx.fillText(ln, w / 2, y);
      });
      ctx.restore();
    }

    // ---------- ranura de movimientos ----------
    const S = 54, GAP = 9;
    const n = Math.max(1, pl.slots.length);
    const totalW = n * S + (n - 1) * GAP;
    let sx = (w - totalW) / 2;
    // Por encima de la barra de inicio del iPhone (allí los toques a veces no llegan).
    let sy = h - S - 18 - (touch ? Math.min(28, G.Touch.safeArea().bottom) : 0);
    // En móvil, donde la haya puesto el jugador: el bloque objeto + todos los
    // huecos (aunque aún no estén llenos), por su centro, como en el editor
    // (layout-ui.js); los ataques nuevos van saliendo hacia la derecha.
    const pb = touch && G.Touch.spot('bar');
    if (pb) {
      const nAll = Math.max(n, pl.maxMoves), bw = S + 18 + nAll * S + (nAll - 1) * GAP;
      sx = G.U.clamp(pb[0] * w - bw / 2, 6, Math.max(6, w - bw - 6)) + S + 18;
      sy = G.U.clamp(pb[1] * h - S / 2, 24, h - S - 6);
    }
    const BOND = '#ff8ad8';
    const cdOf = m => m.kind === 'orbit' ? 0 : G.U.clamp(m.t / (m.cd * pl.cdMul), 0, 1);

    for (let i = 0; i < n; i++) {
      const g = pl.slots[i] || [];
      const m = g[0];
      const fused = g.length > 1;
      const on = i === pl.active;
      const x = sx + i * (S + GAP);
      const y = on ? sy - 6 : sy;
      // Tocar (o hacer clic en) un icono activa ese movimiento.
      if (m) G.Touch.addButton(x, y, S, S, () => { if (G.Game.state === 'playing' && pl.active !== i) { pl.setActive(i); G.Audio.sfx('click'); } }, GAP / 2 + 3);
      const col = m ? G.U.TYPE_COLOR[m.type] : '#4a5468';

      // fondo
      roundRect(ctx, x, y, S, S, 12);
      ctx.fillStyle = on ? 'rgba(20,30,50,.95)' : 'rgba(10,16,28,.8)';
      ctx.fill();
      ctx.lineWidth = on ? 2.5 : fused || (m && m.evolved) ? 2 : 1.2;
      // Vínculo: borde rosa. Evolucionado: dorado.
      ctx.strokeStyle = fused ? BOND : m && m.evolved ? '#ffd23f' : on ? col : 'rgba(140,170,210,.22)';
      ctx.stroke();

      if (!m) continue;

      if (fused) {
        // Vínculo: los movimientos en una cuadrícula de 2×2, cada uno con su recarga.
        const C = 22, P = (S - C * 2) / 3;
        g.forEach((gm, k) => {
          const cx = x + P + (k % 2) * (C + P), cy = y + P + Math.floor(k / 2) * (C + P);
          G.Icons.draw(ctx, 'move:' + gm.id, cx, cy, C);
          const f = cdOf(gm);
          if (f > 0) { ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(cx, cy, C, C * f); }
          if (gm.evolved) { ctx.strokeStyle = '#ffd23f'; ctx.lineWidth = 1; ctx.strokeRect(cx + 0.5, cy + 0.5, C - 1, C - 1); }
          // Destello al lanzarse.
          const fl = 1 - (performance.now() - (gm.castAt || 0)) / 180;
          if (fl > 0) { ctx.fillStyle = 'rgba(255,255,255,' + (fl * 0.55).toFixed(2) + ')'; ctx.fillRect(cx, cy, C, C); }
        });
      } else {
        // recarga: se vacía de abajo a arriba
        const cdFrac = cdOf(m);
        if (cdFrac > 0) {
          ctx.save();
          roundRect(ctx, x, y, S, S, 12); ctx.clip();
          ctx.fillStyle = 'rgba(0,0,0,.6)';
          ctx.fillRect(x, y, S, S * cdFrac);
          ctx.restore();
        }

        // emblema del tipo + insignia de la familia
        G.Icons.draw(ctx, 'move:' + m.id, x + (S - 32) / 2, y + (S - 32) / 2 - 2, 32);

        // nivel del movimiento (puntitos)
        const dots = m.def.maxLvl;
        const dw = 4, dgap = 2;
        const tw = dots * dw + (dots - 1) * dgap;
        for (let d = 0; d < dots; d++) {
          ctx.fillStyle = d < m.lvl ? col : 'rgba(255,255,255,.18)';
          ctx.fillRect(x + (S - tw) / 2 + d * (dw + dgap), y + S - 9, dw, 3);
        }
        drawMoveKindBadge(ctx, m.kind, x + S - 13, y + S - 13, 9);
      }

      // tecla
      ctx.font = F(800, 9);
      ctx.fillStyle = fused ? BOND : on ? col : 'rgba(180,200,230,.6)';
      ctx.textAlign = 'left';
      ctx.fillText(String(i + 1), x + 3, y + 10);

      // nombre encima del activo (con un vínculo: "Ascuas +2")
      if (on) {
        ctx.font = F(700, 10);
        ctx.textAlign = 'center';
        ctx.fillStyle = fused ? BOND : col;
        ctx.fillText(fused ? G.T(m.name, 'move') + ' +' + (g.length - 1) : G.T(m.name, 'move'), x + S / 2, y - 7);
      }
    }

    // ---------- vínculo guardado (aún no hay dos movimientos sueltos) ----------
    if (pl.bonds > 0) {
      const bx = sx + totalW + 12, by = sy + S / 2 - 12;
      G.Icons.draw(ctx, 'bond', bx, by, 24);
      if (pl.bonds > 1) {
        ctx.font = F(800, 10);
        ctx.textAlign = 'left';
        ctx.fillStyle = BOND;
        ctx.fillText('×' + pl.bonds, bx + 25, by + 20);
      }
    }

    // ---------- objeto equipado (a la izquierda de los movimientos) ----------
    {
      const ix = sx - S - 18, iy = sy;
      roundRect(ctx, ix, iy, S, S, 12);
      ctx.fillStyle = pl.item ? 'rgba(40,30,10,.9)' : 'rgba(10,16,28,.55)';
      ctx.fill();
      ctx.lineWidth = pl.item ? 2 : 1;
      ctx.strokeStyle = pl.item ? '#ffd23f' : 'rgba(140,170,210,.18)';
      ctx.stroke();
      if (pl.item) {
        G.Icons.draw(ctx, pl.item, ix + (S - 36) / 2, iy + (S - 36) / 2, 36);
        ctx.font = F(700, 9);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffd23f';
        ctx.fillText(G.Items.BY[pl.item].name, ix + S / 2, iy - 6);
      }
    }

    // ---------- esferas (encima de los ataques; teclas 5-8) y sus mejoras activas ----------
    const orbs = pl.orbs || [], ob = pl.orbBuff || {};
    const buffs = Object.keys(ob).filter(id => ob[id] > 0);
    if (orbs.some(Boolean) || buffs.length) {
      const OS = 40, OG = 6, ow = G.Orbs.SLOTS * OS + (G.Orbs.SLOTS - 1) * OG;
      const ox = sx + totalW / 2 - ow / 2, oy = sy - 30 - OS;
      const cdF = G.U.clamp(G.Orbs.cd, 0, 1);
      for (let i = 0; i < G.Orbs.SLOTS; i++) {
        const o = orbs[i], x = ox + i * (OS + OG);
        roundRect(ctx, x, oy, OS, OS, 9);
        ctx.fillStyle = o ? 'rgba(20,24,44,.88)' : 'rgba(10,16,28,.45)';
        ctx.fill();
        const pick = o && !!G.Pad.name && i === G.Orbs.sel;      // con mando: la que usa X
        ctx.lineWidth = pick ? 2.5 : 1.2;
        ctx.strokeStyle = pick ? '#ffd23f' : o ? G.Orbs.BY[o.id].col : 'rgba(140,170,210,.18)';
        ctx.stroke();
        if (!o) continue;
        G.Touch.addButton(x, oy, OS, OS, () => G.Orbs.use(pl, i), OG / 2 + 2);
        G.Icons.draw(ctx, 'orb:' + o.id, x + (OS - 24) / 2, oy + (OS - 24) / 2, 24);
        if (cdF > 0) {
          ctx.save(); roundRect(ctx, x, oy, OS, OS, 9); ctx.clip();
          ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(x, oy, OS, OS * cdF);
          ctx.restore();
        }
        ctx.font = F(800, 9);
        // Con mando: X usa la elegida, Y pasa a la siguiente (las teclas 5-8 no sirven ahí).
        if (G.Pad.name) { ctx.textAlign = 'left'; ctx.fillStyle = pick ? '#ffd23f' : 'rgba(180,200,230,.7)'; ctx.fillText(pick ? 'X' : 'Y', x + 3, oy + 10); }
        else if (!touch) { ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(180,200,230,.7)'; ctx.fillText(String(i + 5), x + 3, oy + 10); }
        if (o.n > 1) { ctx.textAlign = 'right'; ctx.fillStyle = '#f4f8ff'; ctx.fillText('×' + o.n, x + OS - 3, oy + OS - 4); }
      }
      // Qué hace cada una: ratón encima (PC), la elegida con mando, o la que acabas de coger (3 s).
      const mo = G.Input.mouse(), fresh = pl.orbNew && performance.now() - pl.orbNew.at < 3000 ? pl.orbNew.i : -1;
      let tip = -1, full = false;
      if (!touch) for (let i = 0; i < G.Orbs.SLOTS; i++) {
        const x = ox + i * (OS + OG);
        if (orbs[i] && mo.x >= x && mo.x <= x + OS && mo.y >= oy && mo.y <= oy + OS) { tip = i; full = true; }
      }
      if (tip < 0 && G.Pad.name && orbs[G.Orbs.sel]) tip = G.Orbs.sel;
      if (tip < 0 && fresh >= 0 && orbs[fresh]) tip = fresh;
      if (fresh >= 0 && orbs[fresh]) {
        const x = ox + fresh * (OS + OG), a = 1 - (performance.now() - pl.orbNew.at) / 3000;
        ctx.save(); ctx.globalAlpha = a;
        roundRect(ctx, x - 2, oy - 2, OS + 4, OS + 4, 11);
        ctx.lineWidth = 3; ctx.strokeStyle = G.Orbs.BY[orbs[fresh].id].col; ctx.stroke();
        ctx.restore();
      }
      if (tip >= 0) orbTip(ctx, orbs[tip].id, ox + tip * (OS + OG) + OS / 2, oy - 8, full, w);

      // Mejoras activas: icono y segundos que quedan.
      buffs.forEach((id, k) => {
        const bx = ox + ow + 10 + k * 30, by = oy + 4;
        G.Icons.draw(ctx, 'orb:' + id, bx, by, 24);
        ctx.font = F(800, 10); ctx.textAlign = 'center';
        ctx.fillStyle = G.Orbs.BY[id].col;
        ctx.fillText(Math.ceil(ob[id]) + 's', bx + 12, by + 35);
      });
    }

    // ---------- botón de pausa (táctil) ----------
    if (touch) {
      const sa = G.Touch.safeArea();
      const pp = G.Touch.spot('pause');
      const bx = pp ? G.U.clamp(pp[0] * w - 20, 4, w - 44) : w - 52 - Math.min(44, sa.right);
      const by = pp ? G.U.clamp(pp[1] * h - 20, 10, h - 44) : 12 + Math.min(20, sa.top), bs = 40;
      roundRect(ctx, bx, by, bs, bs, 10);
      ctx.fillStyle = 'rgba(10,16,28,.7)'; ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(244,248,255,.8)'; ctx.stroke();
      ctx.fillStyle = '#f4f8ff';
      ctx.fillRect(bx + 13, by + 11, 5, 18); ctx.fillRect(bx + 22, by + 11, 5, 18);
      G.Touch.addButton(bx, by, bs, bs, () => G.Game.togglePause(), 8);
    }

    // pista de controles
    if (st.time < 14) {
      ctx.font = F(600, 10);
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(180,200,230,.55)';
      ctx.fillText(touch ? 'Arrastra el dedo para moverte  ·  toca un ataque para cambiarlo'
                         : 'WASD moverse  ·  1-4 / Q / E o clic en un ataque para cambiarlo  ·  Esc pausa', w / 2, h - 4);
    }

    // ---------- Bảng nhiệm vụ & Thử thách trong Run (Middle-Right) ----------
    if (G.RunQuests && G.RunQuests.draw) {
      G.RunQuests.draw(ctx, w, h, pl, st, F, roundRect, bar);
    }

    ctx.restore();
  }

  // ---------------- cooperativo ----------------

  /**
   * - Vida de cada compañero debajo de la tuya.
   * - Flecha en el borde de la pantalla hacia los que no se ven, con su nombre
   *   y a cuántos metros están (roja y parpadeando si está caído).
   * - Si has caído tú: aviso y barra de "te están levantando".
   */
  function drawCoop(ctx, w, h, pl, px, top) {
    const cam = G.Camera;
    const t = performance.now() / 1000;
    const sa = (typeof G !== 'undefined' && G.Touch && G.Touch.safeArea) ? G.Touch.safeArea() : { top: 0, left: 0, bottom: 0, right: 0 };
    // Dời thanh máu đồng đội xuống vị trí giữa mép trái màn hình
    const coopX = 14 + sa.left;
    let y = Math.floor(h * 0.38);
    ctx.textAlign = 'left';
    for (const m of G.Coop.mates) {
      if (!m.connected) continue;
      const o = m.pl;
      ctx.font = F(800, 10);
      ctx.fillStyle = m.color;
      G.I18n.rawCanvas(ctx, 'fillText', m.name, coopX, y + 9);
      const lx = coopX + 78;
      bar(ctx, lx, y + 1, 100, 8, o.dead ? 0 : o.hp / o.maxHp, o.dead ? '#ff5f6d' : '#5fe08a');
      if (o.dead) {
        ctx.font = F(800, 9);
        ctx.fillStyle = Math.sin(t * 8) > 0 ? '#ff8a96' : '#ffd0d5';
        ctx.fillText(G.T ? G.T('NGÃ') : 'NGÃ', lx + 106, y + 9);
      }
      y += 18;
    }

    // Flechas hacia los compañeros fuera de la vista.
    for (const m of G.Coop.mates) {
      if (!m.connected) continue;
      const o = m.pl;
      const sx = (o.x - cam.left()) * cam.scale, sy = (o.y - o.bodyH * 0.5 - cam.top()) * cam.scale;
      if (sx > 0 && sx < w && sy > 0 && sy < h) continue;
      const M = 42;
      const ex = G.U.clamp(sx, M, w - M), ey = G.U.clamp(sy, M + 70, h - M - 80);
      const a = Math.atan2(sy - ey, sx - ex);
      const metres = Math.round(G.U.dist(pl.x, pl.y, o.x, o.y) / 32);
      const col = o.dead ? (Math.sin(t * 8) > 0 ? '#ff5f6d' : '#ffd0d5') : m.color;
      ctx.save();
      ctx.translate(ex, ey);
      // Flecha
      ctx.fillStyle = 'rgba(0,0,0,.55)';
      ctx.beginPath(); ctx.arc(0, 0, 17, 0, 6.2832); ctx.fill();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * 28, Math.sin(a) * 28);
      ctx.lineTo(Math.cos(a + 2.4) * 14, Math.sin(a + 2.4) * 14);
      ctx.lineTo(Math.cos(a - 2.4) * 14, Math.sin(a - 2.4) * 14);
      ctx.closePath(); ctx.fill();
      // Inicial del compañero dentro del círculo
      ctx.font = F(800, 14);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      G.I18n.rawCanvas(ctx, 'fillText', m.name.charAt(0).toUpperCase(), 0, 5);
      // Nombre y distancia: al lado contrario de la flecha, para que no se salga
      const lx = -Math.cos(a) * 30, ly = -Math.sin(a) * 26 + 4;
      ctx.font = F(800, 12);
      const label = o.dead ? G.I18n.f('¡{x} necesita ayuda! · {x} m', m.name, metres) : m.name + ' · ' + metres + ' m';
      ctx.textAlign = Math.cos(a) > 0.3 ? 'right' : Math.cos(a) < -0.3 ? 'left' : 'center';
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,0,0,.8)';
      G.I18n.rawCanvas(ctx, 'strokeText', label, lx, ly);
      ctx.fillStyle = col;
      G.I18n.rawCanvas(ctx, 'fillText', label, lx, ly);
      ctx.restore();
    }

    // Tú, caído.
    if (pl.dead) {
      ctx.save();
      ctx.textAlign = 'center';
      ctx.font = F(800, 20);
      ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.75)';
      const msg = G.Coop.players().every(p => p.dead) ? 'Habéis caído todos…' : 'Has caído: un compañero puede levantarte';
      ctx.strokeText(msg, w / 2, h * 0.62);
      ctx.fillStyle = '#ffb0b8';
      ctx.fillText(msg, w / 2, h * 0.62);
      const f = (pl.reviveT || 0) / G.Player.REVIVE_TIME;
      if (f > 0) bar(ctx, w / 2 - 110, h * 0.62 + 12, 220, 10, f, '#5fe08a');
      // Mirar a un compañero vivo mientras tanto (botón, Q / E o LB / RB).
      const w0 = G.Game.watching;
      if (w0 || G.Coop.puppets().some(p => !p.dead)) {
        const m = w0 && G.Coop.mates.find(x => x.pl === w0);
        const label = (m ? G.I18n.f('Viendo a {x}', m.name) + ' · ' + G.I18n.t('cambiar') : G.I18n.t('Ver a un compañero'))
          + (G.Touch.active ? '' : '  (E)');
        ctx.font = F(800, 13);
        const bw = ctx.measureText(label).width + 28, bh = 28, bx = w / 2 - bw / 2, by = h * 0.62 + 32;
        roundRect(ctx, bx, by, bw, bh, 8);
        ctx.fillStyle = 'rgba(10,16,28,.75)'; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = m ? m.color : 'rgba(244,248,255,.8)'; ctx.stroke();
        ctx.fillStyle = '#f4f8ff';
        G.I18n.rawCanvas(ctx, 'fillText', label, w / 2, by + 19);
        G.Touch.addButton(bx, by, bw, bh, () => G.Game.cycleWatch(1), 8);
      }
      ctx.restore();
    }
  }


  /** Dibuja un microicono de 10x10 en la esquina inferior derecha para indicar el tipo de efecto del movimiento */
  function drawMoveKindBadge(ctx, kind, bx, by, sz) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(bx + sz / 2, by + sz / 2, sz / 2 + 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10, 16, 28, 0.9)';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    const cx = bx + sz / 2, cy = by + sz / 2;
    ctx.lineWidth = 1.2;

    switch (kind) {
      case 'buff':
        // Flecha hacia arriba verde
        ctx.strokeStyle = '#4ade80';
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.moveTo(cx, cy - 3);
        ctx.lineTo(cx - 3, cy + 2);
        ctx.lineTo(cx + 3, cy + 2);
        ctx.closePath();
        ctx.fill();
        break;
      case 'beam':
      case 'charge':
        // Rayo recto azul cian
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(cx - 3.5, cy - 3.5);
        ctx.lineTo(cx + 3.5, cy + 3.5);
        ctx.stroke();
        break;
      case 'aura':
      case 'nova':
      case 'spin':
      case 'shove':
      case 'quake':
        // Círculo concéntrico naranja/oro
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case 'melee':
      case 'dash':
        // Espada / corte diagonal rojo
        ctx.strokeStyle = '#f87171';
        ctx.beginPath();
        ctx.moveTo(cx - 3, cy + 3);
        ctx.lineTo(cx + 3, cy - 3);
        ctx.stroke();
        break;
      case 'stun':
      case 'vortex':
        // Espiral / destello amarillo
        ctx.strokeStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(cx, cy, 2.8, 0, Math.PI * 1.5);
        ctx.stroke();
        break;
      case 'projectile':
      case 'homing':
      case 'bounce':
      case 'cone':
      default:
        // Bala / punto blanco con estela
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 2, 0, Math.PI * 2);
        ctx.fill();
        break;
    }
    ctx.restore();
  }

  return { draw, roundRect, drawMoveKindBadge, bar };
})();
