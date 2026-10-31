/* ============ run-quests.js — Nhiệm vụ & Thử thách trong Run ============
 * Bảng nhiệm vụ compact nằm ở giữa bên phải màn hình (middle-right).
 * Hỗ trợ:
 *   1. Nhiệm vụ Mega/Primal & Dạng Legend đặc biệt -> Thưởng Item tiến hoá (Keystone, DNA Splicers...)
 *      Khi hoàn thành, gọi G.Game.offerItem() cho phép giữ hoặc đổi trang bị.
 *   2. 5 Thử thách Archetype (Berserker, Arcane Blaster, Juggernaut, Speedster, Purist)
 *      mở khóa nội tại vĩnh viễn/trong trận + 150 PokéCoins / 3 Vé Gacha.
 */
G.RunQuests = (() => {
  let activeQuests = [];
  let collapsed = false;
  let activeIndex = 0;
  let bannerNotify = null; // { text, time, color }

  const FONT = (weight, size) => `${weight} ${size}px Pixelify,"Segoe UI",system-ui,sans-serif`;

  /** Khởi tạo nhiệm vụ khi bắt đầu Run */
  function startRun(pl) {
    activeQuests = [];
    collapsed = false;
    activeIndex = 0;
    bannerNotify = null;
    if (!pl) return;

    setupQuestsFor(pl);
  }

  /** Thiết lập danh sách nhiệm vụ dựa theo Pokémon */
  function setupQuestsFor(pl) {
    const dex = pl.dex;
    const baseDex = pl.baseDex || dex;
    const mon = pl.mon || G.DEX_BY[dex];
    if (!mon) return;

    // 1. Kiểm tra Dạng Huyền Thoại đặc biệt
    if (dex === 646) {
      // Kyurem
      activeQuests.push({
        id: 'legend_kyurem',
        type: 'legend_form',
        title: 'HỢP THỂ DNA',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: 0,
        rewardType: 'item',
        rewardItem: 'dnasplicers',
        rewardName: 'Punta ADN (Kyurem)',
        color: '#38bdf8',
        icon: 'dnasplicers',
        completed: false
      });
    } else if (dex === 800) {
      // Necrozma
      activeQuests.push({
        id: 'legend_necrozma',
        type: 'legend_form',
        title: 'ÁNH SÁNG TỐI THƯỢNG',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: 0,
        rewardType: 'item',
        rewardItem: 'ultranecroziumz',
        rewardName: 'Ultranecrostal Z',
        color: '#facc15',
        icon: 'ultranecroziumz',
        completed: false
      });
    } else if (dex === 487) {
      // Giratina
      activeQuests.push({
        id: 'legend_giratina',
        type: 'legend_form',
        title: 'DẠNG NGUYÊN BẢN',
        desc: 'Sống sót 10 phút hoặc hạ 1 Boss',
        targetTime: 600,
        targetBosses: 1,
        rewardType: 'item',
        rewardItem: 'griseousorb',
        rewardName: 'Griseosfera (Origin)',
        color: '#a855f7',
        icon: 'griseousorb',
        completed: false
      });
    } else if (dex === 386) {
      // Deoxys
      activeQuests.push({
        id: 'legend_deoxys',
        type: 'legend_form',
        title: 'SỰ HỢP NHẤT VŨ TRỤ',
        desc: 'Đạt Nv. 20 & hạ 300 kẻ địch',
        targetKills: 300,
        targetLv: 20,
        kills: 0,
        rewardType: 'item',
        rewardItem: 'meteorite',
        rewardName: 'Meteorito Cósmico',
        color: '#f97316',
        icon: 'meteorite',
        completed: false
      });
    } else if (dex === 888) {
      // Zacian Crowned
      activeQuests.push({
        id: 'legend_zacian',
        type: 'legend_form',
        title: 'GƯƠM BÁ VƯƠNG',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Gươm Rỉ Sét (Crowned)',
        color: '#38bdf8',
        icon: 'star',
        completed: false
      });
    } else if (dex === 889) {
      // Zamazenta Crowned
      activeQuests.push({
        id: 'legend_zamazenta',
        type: 'legend_form',
        title: 'KHIÊN HỘ QUỐC',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Khiên Rỉ Sét (Crowned)',
        color: '#f43f5e',
        icon: 'star',
        completed: false
      });
    } else if (dex === 718) {
      // Zygarde
      activeQuests.push({
        id: 'legend_zygarde',
        type: 'legend_form',
        title: 'DẠNG HOÀN THIỆN',
        desc: 'Thu thập 40 giọt kinh nghiệm hoặc máu dưới 50%',
        targetXpDrops: 40,
        xpDrops: 0,
        rewardType: 'zygarde_awaken',
        rewardName: 'Zygarde Hoàn Thiện (Titan)',
        color: '#22c55e',
        icon: 'star',
        completed: false
      });
    }

    // 2. Kiểm tra Mega Evolution cho Pokémon hiện tại
    const megas = (typeof G !== 'undefined' && G.getMegasFor) ? G.getMegasFor(dex) : [];
    if (megas && megas.length > 0 && !activeQuests.some(q => q.type === 'mega')) {
      activeQuests.unshift({
        id: 'mega_' + dex,
        type: 'mega',
        title: 'THỬ THÁCH MEGA',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Mega Aro (Keystone)',
        color: '#f43f5e',
        icon: 'megaBadge',
        completed: false
      });
    }

    // 3. Gán Thử thách Archetype (nếu chưa có hoặc song song)
    const atk = mon.atk || pl.baseAtk || 1.0;
    const sa = mon.sa || 1.0;
    const df = mon.df || 50;
    const sd = mon.sd || 50;
    const hp = mon.hp || pl.maxHp || 100;
    const spd = mon.spd || pl.baseSpd || 100;

    let arch = 'berserker';
    if (spd >= 110 || (spd > 95 && spd >= atk * 85)) {
      arch = 'speedster';
    } else if ((df + sd) >= 180 || hp >= 120) {
      arch = 'juggernaut';
    } else if (sa > atk * 1.05) {
      arch = 'arcane';
    } else if (atk >= sa) {
      arch = 'berserker';
    }

    // Nếu là đơn hệ, cho thêm Purist Build
    if (mon.types && mon.types.length === 1 && !activeQuests.some(q => q.archetype === 'purist')) {
      activeQuests.push({
        id: 'arch_purist',
        type: 'archetype',
        archetype: 'purist',
        title: 'CHUYÊN HỆ THUẦN',
        desc: 'Sống sót 15 phút với 4 chiêu cùng hệ',
        targetTime: 900,
        rewardType: 'passive_purist',
        rewardName: '+35% STAB & 3 Vé Gacha',
        color: '#38bdf8',
        icon: 'star',
        completed: false
      });
    }

    // Thêm Archetype chính
    if (arch === 'speedster') {
      activeQuests.push({
        id: 'arch_speedster',
        type: 'archetype',
        archetype: 'speedster',
        title: 'THỬ THÁCH TỐC ĐỘ',
        desc: 'Bắt Duende/Shiny HOẶC Nv. 25 trước p.12',
        targetLv: 25,
        targetTime: 720,
        caughtRunner: false,
        rewardType: 'passive_speedster',
        rewardName: '+25% Tốc độ → Bạo kích & 150 xu',
        color: '#38bdf8',
        icon: 'speed',
        completed: false
      });
    } else if (arch === 'juggernaut') {
      activeQuests.push({
        id: 'arch_juggernaut',
        type: 'archetype',
        archetype: 'juggernaut',
        title: 'THỬ THÁCH KIÊN CỐ',
        desc: 'Mở 2 Rương khóa & sống sót 15 phút',
        targetChests: 2,
        targetTime: 900,
        lockedChests: 0,
        rewardType: 'passive_juggernaut',
        rewardName: 'Sóng phản chấn 5s & 150 xu',
        color: '#eab308',
        icon: 'shield',
        completed: false
      });
    } else if (arch === 'arcane') {
      activeQuests.push({
        id: 'arch_arcane',
        type: 'archetype',
        archetype: 'arcane',
        title: 'THỬ THÁCH MA PHÁP',
        desc: 'Tiến hóa 2 chiêu Đặc biệt & thắng 1 Khe nứt',
        targetSpecialEvos: 2,
        targetRifts: 1,
        specialEvos: 0,
        riftWins: 0,
        rewardType: 'passive_arcane',
        rewardName: '-12% Hồi chiêu, +1 Xuyên & 150 xu',
        color: '#c084fc',
        icon: 'spark',
        completed: false
      });
    } else {
      activeQuests.push({
        id: 'arch_berserker',
        type: 'archetype',
        archetype: 'berserker',
        title: 'THỬ THÁCH CUỒNG BẠO',
        desc: 'Hạ 1.200 địch bằng đòn Vật lý',
        targetPhysKills: 1200,
        physKills: 0,
        rewardType: 'passive_berserker',
        rewardName: '+15% Kích thước & ST.Vật lý & 150 xu',
        color: '#ef4444',
        icon: 'sword',
        completed: false
      });
    }
  }

  /** Khi Pokémon tiến hóa trong trận */
  function onEvolve(newDex, pl) {
    if (!pl) return;
    const megas = (typeof G !== 'undefined' && G.getMegasFor) ? G.getMegasFor(newDex) : [];
    if (megas && megas.length > 0 && !activeQuests.some(q => q.type === 'mega')) {
      const mon = G.DEX_BY[newDex] || pl.mon;
      const q = {
        id: 'mega_' + newDex,
        type: 'mega',
        title: 'THỬ THÁCH MEGA',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Mega Aro (Keystone)',
        color: '#f43f5e',
        icon: 'megaBadge',
        completed: false
      };
      activeQuests.unshift(q);
      activeIndex = 0;
      if (G.Spawner && G.Spawner.say) {
        G.Spawner.say(`¡Nhiệm vụ Mega: ${mon.name} mở khóa!`, 3.2, true);
      }
      if (G.Audio && G.Audio.sfx) G.Audio.sfx('legend');
    }
  }

  /** Khi tiêu diệt kẻ địch */
  function onKill(e, pl) {
    if (!e) return;
    const isPhys = e.lastHitMove && e.lastHitMove.cat === 'physical';
    const isRunner = e.behavior === 'thief' || e.shiny || e.golden;

    for (const q of activeQuests) {
      if (q.completed) continue;
      if (q.targetKills !== undefined) q.kills = (q.kills || 0) + 1;
      if (isPhys && q.targetPhysKills !== undefined) q.physKills = (q.physKills || 0) + 1;
      if (isRunner && q.archetype === 'speedster') q.caughtRunner = true;
    }
  }

  /** Khi nhận sự kiện tiến trình (Progress event) */
  function onProgressEvent(kind, d) {
    for (const q of activeQuests) {
      if (q.completed) continue;
      if (kind === 'chest') {
        if (q.targetChests !== undefined) q.lockedChests = (q.lockedChests || 0) + 1;
      } else if (kind === 'rift') {
        if (q.targetRifts !== undefined) q.riftWins = (q.riftWins || 0) + 1;
      } else if (kind === 'evolve') {
        const move = d && d.move && G.Moves && G.Moves.BY && G.Moves.BY[d.move];
        if (move && move.cat === 'special' && q.targetSpecialEvos !== undefined) {
          q.specialEvos = (q.specialEvos || 0) + 1;
        }
      }
    }
  }

  /** Cập nhật tiến độ mỗi frame */
  function update(dt, pl, st) {
    if (!pl || !st || G.Game.state !== 'playing') return;

    if (bannerNotify) {
      bannerNotify.time -= dt;
      if (bannerNotify.time <= 0) bannerNotify = null;
    }

    const curTime = st.time || 0;

    for (let i = 0; i < activeQuests.length; i++) {
      const q = activeQuests[i];
      if (q.completed) continue;

      let isDone = false;

      if (q.type === 'mega' || q.type === 'legend_form') {
        if (q.targetKills !== undefined && q.targetLv !== undefined) {
          if ((q.kills || 0) >= q.targetKills && pl.level >= q.targetLv) isDone = true;
        } else if (q.id === 'legend_giratina') {
          if (curTime >= q.targetTime || (pl.bosses || 0) >= q.targetBosses) isDone = true;
        } else if (q.id === 'legend_zygarde') {
          if ((q.xpDrops || 0) >= q.targetXpDrops || pl.level >= 25 || pl.hp <= pl.maxHp * 0.5) isDone = true;
        }
      } else if (q.type === 'archetype') {
        if (q.archetype === 'berserker') {
          if ((q.physKills || 0) >= q.targetPhysKills) isDone = true;
        } else if (q.archetype === 'arcane') {
          if ((q.specialEvos || 0) >= q.targetSpecialEvos && ((q.riftWins || 0) >= q.targetRifts || (pl.bosses || 0) >= 2)) isDone = true;
        } else if (q.archetype === 'juggernaut') {
          if ((q.lockedChests || 0) >= q.targetChests && curTime >= q.targetTime && !pl.dead) isDone = true;
        } else if (q.archetype === 'speedster') {
          if (q.caughtRunner || (pl.level >= q.targetLv && curTime <= q.targetTime)) isDone = true;
        } else if (q.archetype === 'purist') {
          if (curTime >= q.targetTime && pl.slots && pl.slots.length >= 4) {
            const types = pl.mon.types || [];
            if (pl.slots.every(m => types.includes(m.type))) isDone = true;
          }
        }
      }

      if (isDone) {
        completeQuest(q, pl);
      }
    }
  }

  /** Hoàn thành nhiệm vụ & trao thưởng */
  function completeQuest(q, pl) {
    q.completed = true;
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('legend');
    if (G.FX && G.FX.burst) G.FX.burst(pl.x, pl.y, q.color || '#ffd23f', 45, 240);
    if (G.FX && G.FX.ring) G.FX.ring(pl.x, pl.y, 8, 140, q.color || '#ffd23f', 0.8, 6);

    const titleStr = G.T ? G.T(q.title) : q.title;
    if (G.Spawner && G.Spawner.say) {
      G.Spawner.say(`¡HOÀN THÀNH: ${titleStr}!`, 3.5, true);
    }

    // Trao phần thưởng
    if (q.rewardType === 'item') {
      // Gọi cơ chế trang bị của game: cho phép giữ đồ cũ hoặc đổi đồ mới
      if (G.Game && G.Game.offerItem) {
        G.Game.offerItem(q.rewardItem);
      } else if (G.Game && G.Game.item) {
        G.Game.item(q.rewardItem);
      }
    } else if (q.rewardType === 'zygarde_awaken') {
      if (pl.triggerZygardeComplete) pl.triggerZygardeComplete();
    } else if (q.rewardType.startsWith('passive_')) {
      const arch = q.archetype;
      if (arch === 'berserker') {
        pl.berserkerActive = true;
        pl.physDmgBonus = 0.15;
      } else if (arch === 'arcane') {
        pl.arcaneActive = true;
      } else if (arch === 'juggernaut') {
        pl.juggernautActive = true;
      } else if (arch === 'speedster') {
        pl.speedsterActive = true;
      } else if (arch === 'purist') {
        pl.puristActive = true;
      }

      // Lưu mở khóa vĩnh viễn & thưởng tiền/vé
      const s = typeof G !== 'undefined' && G.DB && G.DB.save;
      if (s) {
        s.trials = s.trials || {};
        const bDex = pl.baseDex || pl.dex;
        s.trials[bDex] = s.trials[bDex] || {};
        s.trials[bDex][arch] = true;

        if (arch === 'purist') {
          s.tickets = (s.tickets || 0) + 3;
        } else {
          s.coins = (s.coins || 0) + 150;
        }
        if (G.DB && G.DB.saveData) G.DB.saveData();
      }
    }
  }

  /** Tính toán % tiến độ hiện tại */
  function getProgressInfo(q, pl, st) {
    const curTime = (st && st.time) || 0;
    if (q.completed) return { current: 100, max: 100, pct: 1.0, label: '100%' };

    if (q.type === 'mega' || q.type === 'legend_form') {
      if (q.targetKills !== undefined && q.targetLv !== undefined) {
        const killF = Math.min(1, (q.kills || 0) / q.targetKills);
        const lvF = Math.min(1, (pl.level || 1) / q.targetLv);
        const pct = (killF + lvF) * 0.5;
        return {
          current: q.kills || 0,
          max: q.targetKills,
          pct,
          label: `${q.kills || 0}/${q.targetKills} (Nv.${pl.level || 1}/${q.targetLv})`
        };
      }
      if (q.id === 'legend_giratina') {
        const tF = Math.min(1, curTime / q.targetTime);
        return { current: Math.floor(curTime), max: q.targetTime, pct: tF, label: `${G.U.mmss(curTime)} / 10:00` };
      }
      if (q.id === 'legend_zygarde') {
        const xF = Math.min(1, (q.xpDrops || 0) / q.targetXpDrops);
        return { current: q.xpDrops || 0, max: q.targetXpDrops, pct: xF, label: `${q.xpDrops || 0}/${q.targetXpDrops}` };
      }
    } else if (q.type === 'archetype') {
      if (q.archetype === 'berserker') {
        const cur = q.physKills || 0;
        return { current: cur, max: q.targetPhysKills, pct: Math.min(1, cur / q.targetPhysKills), label: `${cur} / ${q.targetPhysKills}` };
      }
      if (q.archetype === 'arcane') {
        const ev = q.specialEvos || 0;
        const rf = (q.riftWins || 0) + (pl.bosses || 0);
        const pct = Math.min(1, (ev / 2 + Math.min(1, rf)) * 0.5);
        return { current: ev, max: 2, pct, label: `Chiêu:${ev}/2 · Khe/Jefe:${rf}/1` };
      }
      if (q.archetype === 'juggernaut') {
        const ch = Math.min(2, q.lockedChests || 0);
        const tF = Math.min(1, curTime / q.targetTime);
        const pct = (ch / 2 + tF) * 0.5;
        return { current: ch, max: 2, pct, label: `Rương:${ch}/2 · ${G.U.mmss(curTime)}/15:00` };
      }
      if (q.archetype === 'speedster') {
        if (q.caughtRunner) return { current: 1, max: 1, pct: 1.0, label: 'Đã bắt Duende!' };
        const lvF = Math.min(1, (pl.level || 1) / q.targetLv);
        return { current: pl.level || 1, max: q.targetLv, pct: lvF, label: `Nv.${pl.level || 1}/${q.targetLv} (<12:00)` };
      }
      if (q.archetype === 'purist') {
        const tF = Math.min(1, curTime / q.targetTime);
        return { current: Math.floor(curTime), max: q.targetTime, pct: tF, label: `${G.U.mmss(curTime)} / 15:00` };
      }
    }
    return { current: 0, max: 1, pct: 0, label: '0%' };
  }

  /** Vẽ bảng nhiệm vụ compact trên màn hình canvas */
  function draw(ctx, w, h, pl, st, F, roundRect, bar) {
    if (!pl || activeQuests.length === 0 || G.Game.state !== 'playing') return;

    const q = activeQuests[activeIndex] || activeQuests[0];
    if (!q) return;

    const sa = (G.Touch && G.Touch.safeArea) ? G.Touch.safeArea() : { top: 0, right: 0, bottom: 0, left: 0 };
    const panelW = 168;
    const panelH = collapsed ? 28 : 124;

    // Vị trí: Giữa bên phải sát màn hình
    const px = w - panelW - 10 - sa.right;
    const py = Math.floor((h - panelH) * 0.48);

    ctx.save();
    ctx.textBaseline = 'alphabetic';

    // 1. Khung nền Dark Glassmorphic
    roundRect(ctx, px, py, panelW, panelH, 10);
    ctx.fillStyle = 'rgba(8, 14, 28, 0.88)';
    ctx.fill();

    // Viền phát sáng theo màu của nhiệm vụ
    ctx.lineWidth = q.completed ? 2 : 1.5;
    ctx.strokeStyle = q.completed ? '#ffd23f' : (q.color || 'rgba(79,209,255,0.7)');
    ctx.stroke();

    // Đăng ký nút bấm thu gọn/mở rộng hoặc chuyển tab
    if (G.Touch && G.Touch.addButton) {
      G.Touch.addButton(px, py, panelW, panelH, () => {
        if (activeQuests.length > 1 && !collapsed) {
          activeIndex = (activeIndex + 1) % activeQuests.length;
        } else {
          collapsed = !collapsed;
        }
        if (G.Audio && G.Audio.sfx) G.Audio.sfx('click');
      }, 4);
    }

    const info = getProgressInfo(q, pl, st);

    // 2. Tiêu đề Header
    ctx.textAlign = 'left';
    ctx.font = F(800, 10.5);
    ctx.fillStyle = q.completed ? '#ffd23f' : (q.color || '#4fd1ff');

    const titleTxt = G.T ? G.T(q.title) : q.title;
    ctx.fillText(titleTxt, px + 8, py + 18);

    // Nút trạng thái góc phải: [ - ] hoặc [ + ] hoặc số tab (1/2)
    ctx.textAlign = 'right';
    ctx.font = F(700, 9.5);
    ctx.fillStyle = '#8fa3c4';
    const tagTxt = collapsed ? (info.label.split(' ')[0] + ' ▾') : (activeQuests.length > 1 ? `${activeIndex + 1}/${activeQuests.length} ▾` : '−');
    ctx.fillText(tagTxt, px + panelW - 8, py + 18);

    // Nếu đang thu gọn, dừng ở đây
    if (collapsed) {
      ctx.restore();
      return;
    }

    // 3. Mô tả Mục tiêu
    ctx.textAlign = 'left';
    ctx.font = F(600, 9.5);
    ctx.fillStyle = '#d5e1f5';

    const descTxt = G.T ? G.T(q.desc) : q.desc;
    // Cắt thành 2 dòng gọn gàng
    const words = descTxt.split(' ');
    let line1 = '', line2 = '';
    for (const wd of words) {
      if (line1.length + wd.length < 22 && !line2) {
        line1 += (line1 ? ' ' : '') + wd;
      } else {
        line2 += (line2 ? ' ' : '') + wd;
      }
    }
    ctx.fillText(line1, px + 8, py + 34);
    if (line2) ctx.fillText(line2, px + 8, py + 46);

    // 4. Thanh tiến trình (Progress Bar)
    const barY = py + 56;
    const barW = panelW - 16;
    bar(ctx, px + 8, barY, barW, 9, info.pct, q.completed ? '#ffd23f' : (q.color || '#4fd1ff'));

    // Chữ tiến độ trên thanh
    ctx.textAlign = 'center';
    ctx.font = F(700, 9);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(info.label, px + panelW / 2, barY + 8);

    // 5. Phần thưởng (Reward preview)
    const rY = py + 78;
    ctx.textAlign = 'left';
    ctx.font = F(700, 9);
    ctx.fillStyle = '#ffcb3d';

    if (q.completed) {
      // Banner Hoàn thành lấp lánh
      ctx.fillStyle = '#5fe08a';
      ctx.fillText('✓ ' + (G.T ? G.T('HOÀN THÀNH') : 'HOÀN THÀNH!'), px + 8, rY + 8);
      ctx.font = F(600, 8.5);
      ctx.fillStyle = '#a6b8d4';
      ctx.fillText(q.rewardName, px + 8, rY + 22);
    } else {
      ctx.fillText('Thưởng:', px + 8, rY + 6);
      ctx.font = F(600, 8.5);
      ctx.fillStyle = '#e2ecfc';
      // Cắt ngắn phần thưởng nếu dài
      const rwTxt = q.rewardName.length > 24 ? q.rewardName.slice(0, 22) + '…' : q.rewardName;
      ctx.fillText(rwTxt, px + 8, rY + 20);

      // Gợi ý chuyển tab nếu có nhiều nhiệm vụ
      if (activeQuests.length > 1) {
        ctx.font = F(500, 8);
        ctx.fillStyle = 'rgba(150,175,210,0.7)';
        ctx.fillText('(Chạm để đổi nhiệm vụ)', px + 8, rY + 34);
      }
    }

    ctx.restore();
  }

  return {
    startRun,
    onEvolve,
    onKill,
    onProgressEvent,
    update,
    draw,
    getActiveQuests: () => activeQuests,
    toggleCollapse: () => { collapsed = !collapsed; }
  };
})();
