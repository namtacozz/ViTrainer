/* ============ run-quests.js — Nhiệm vụ & Thử thách trong Run ============
 * Bảng nhiệm vụ compact nằm ở giữa bên phải màn hình (middle-right).
 * Hỗ trợ hiển thị song song tất cả các nhiệm vụ khả dụng (Mega Quest + Archetype Quest)
 * để người chơi theo dõi tiến độ trực quan ngay từ khi vào trận.
 */
G.RunQuests = (() => {
  let activeQuests = [];
  let collapsed = false;
  let bannerNotify = null; // { text, time, color }

  const FONT = (weight, size) => `${weight} ${size}px Pixelify,"Segoe UI",system-ui,sans-serif`;

  /** Khởi tạo nhiệm vụ khi bắt đầu Run */
  function startRun(pl) {
    activeQuests = [];
    collapsed = false;
    bannerNotify = null;
    if (!pl) return;

    setupQuestsFor(pl);
  }

  /** Thiết lập danh sách nhiệm vụ dựa theo Pokémon */
  function setupQuestsFor(pl) {
    let dex = pl.dex;
    let baseDex = pl.baseDex || dex;
    if (typeof G !== 'undefined') {
      if (G.MEGAS && G.MEGAS[dex] && G.MEGAS[dex].baseDex) {
        baseDex = G.MEGAS[dex].baseDex;
      } else if (G.getBaseDex) {
        baseDex = G.getBaseDex(dex) || dex;
      }
    }
    const mon = pl.mon || (G.DEX_BY && (G.DEX_BY[dex] || G.DEX_BY[baseDex]));
    if (!mon) return;

    // 1. Kiểm tra Dạng Huyền Thoại / Đặc biệt
    if (baseDex === 718) {
      // Zygarde: farm 3500 quái & đạt Nv. 50 để mở khóa Mega Zygarde & Nihil Light
      activeQuests.push({
        id: 'mega_718',
        type: 'mega',
        title: 'THỬ THÁCH MEGA: Zygarde',
        desc: 'Đạt Nv. 50 & hạ 3500 kẻ địch',
        targetKills: 3500,
        targetLv: 50,
        kills: (pl && pl.kills) || 0,
        rewardType: 'zygarde_mega',
        rewardName: 'Mega Zygarde & Nihil Light',
        color: '#f43f5e',
        icon: 'megaBadge',
        completed: false
      });
    } else if (baseDex === 384) {
      // Rayquaza: có sẵn Dragon Ascent, đạt Nv. 25 là mở khóa Mega Rayquaza
      activeQuests.push({
        id: 'mega_384',
        type: 'mega',
        title: 'THỬ THÁCH MEGA: Rayquaza',
        desc: 'Đạt Nv. 25 để thức tỉnh Chúa Tể Bầu Trời',
        targetLv: 25,
        rewardType: 'rayquaza_mega',
        rewardItem: 'meteorite',
        rewardName: 'Mega Rayquaza & Thiên Thạch',
        color: '#22c55e',
        icon: 'megaBadge',
        completed: false
      });
    } else if (baseDex === 646) {
      // Kyurem
      activeQuests.push({
        id: 'legend_kyurem',
        type: 'legend_form',
        title: 'HỢP THỂ DNA: Kyurem',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: (pl && pl.kills) || 0,
        rewardType: 'item',
        rewardItem: 'dnasplicers',
        rewardName: 'Punta ADN (Kyurem)',
        color: '#38bdf8',
        icon: 'dnasplicers',
        completed: false
      });
    } else if (baseDex === 800) {
      // Necrozma
      activeQuests.push({
        id: 'legend_necrozma',
        type: 'legend_form',
        title: 'ÁNH SÁNG TỐI THƯỢNG',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: (pl && pl.kills) || 0,
        rewardType: 'item',
        rewardItem: 'ultranecroziumz',
        rewardName: 'Ultranecrostal Z',
        color: '#facc15',
        icon: 'ultranecroziumz',
        completed: false
      });
    } else if (baseDex === 487) {
      // Giratina
      activeQuests.push({
        id: 'legend_giratina',
        type: 'legend_form',
        title: 'DẠNG NGUYÊN BẢN: Giratina',
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
    } else if (baseDex === 888) {
      // Zacian Crowned
      activeQuests.push({
        id: 'legend_zacian',
        type: 'legend_form',
        title: 'GƯƠM BÁ VƯƠNG: Zacian',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: (pl && pl.kills) || 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Gươm Rỉ Sét (Crowned)',
        color: '#38bdf8',
        icon: 'star',
        completed: false
      });
    } else if (baseDex === 889) {
      // Zamazenta Crowned
      activeQuests.push({
        id: 'legend_zamazenta',
        type: 'legend_form',
        title: 'KHIÊN HỘ QUỐC: Zamazenta',
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: (pl && pl.kills) || 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Khiên Rỉ Sét (Crowned)',
        color: '#f43f5e',
        icon: 'star',
        completed: false
      });
    }

    // 2. Kiểm tra Mega Evolution cho Pokémon hiện tại hoặc trong chuỗi tiến hóa
    let megas = (typeof G !== 'undefined' && G.getMegasFor) ? G.getMegasFor(baseDex) : [];
    let megaDex = baseDex;
    if ((!megas || megas.length === 0) && typeof G !== 'undefined' && G.getEvoChain) {
      const chain = G.getEvoChain(baseDex);
      if (chain && chain.members) {
        for (const mDex of chain.members) {
          const mList = G.getMegasFor ? G.getMegasFor(mDex) : [];
          if (mList && mList.length > 0) {
            megas = mList;
            megaDex = mDex;
            break;
          }
        }
      }
    }
    if (megas && megas.length > 0 && !activeQuests.some(q => q.type === 'mega')) {
      const mName = megas[0].name.replace(/^Mega\s+/, 'M-').replace(/^Primal\s+/, 'P-');
      activeQuests.unshift({
        id: 'mega_' + megaDex,
        type: 'mega',
        title: 'THỬ THÁCH MEGA: ' + mName,
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: (pl && pl.kills) || 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Mega Aro (Keystone)',
        color: '#f43f5e',
        icon: 'megaBadge',
        completed: false
      });
    }

    // 3. Gán Thử thách Archetype song song
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
        desc: 'Bắt Duende HOẶC Nv. 25 trước p.12',
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
        rewardName: '+15% ST.Vật lý & 150 xu',
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
      const mName = megas[0].name.replace(/^Mega\s+/, 'M-').replace(/^Primal\s+/, 'P-');
      const q = {
        id: 'mega_' + newDex,
        type: 'mega',
        title: 'THỬ THÁCH MEGA: ' + mName,
        desc: 'Đạt Nv. 25 & hạ 350 kẻ địch',
        targetKills: 350,
        targetLv: 25,
        kills: (pl && pl.kills) || 0,
        rewardType: 'item',
        rewardItem: 'keystone',
        rewardName: 'Mega Aro (Keystone)',
        color: '#f43f5e',
        icon: 'megaBadge',
        completed: false
      };
      activeQuests.unshift(q);
      if (G.Spawner && G.Spawner.say) {
        G.Spawner.say(`¡Nhiệm vụ Mega: ${mon.name} mở khóa!`, 3.2, true);
      }
      if (G.Audio && G.Audio.sfx) G.Audio.sfx('legend');
    }
  }

  /** Khi tiêu diệt kẻ địch */
  function onKill(e, pl) {
    if (!e) return;
    pl = pl || ((typeof G !== 'undefined' && G.Game && G.Game.player) ? G.Game.player : null);
    const isPhys = e.lastHitMove && e.lastHitMove.cat === 'physical';
    const isRunner = e.behavior === 'thief' || e.shiny || e.golden;

    for (const q of activeQuests) {
      if (q.completed) continue;
      if (q.targetKills !== undefined) {
        q.kills = Math.max((q.kills || 0) + 1, (pl && pl.kills) || 0);
      }
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

  /** Cập nhật tiến độ nhiệm vụ trong vòng lặp game */
  function update(dt, pl, st) {
    if (!pl || activeQuests.length === 0 || G.Game.state !== 'playing') return;
    const curTime = (st && st.time) || 0;

    for (const q of activeQuests) {
      if (q.completed) continue;

      let isDone = false;
      if (q.type === 'mega' || q.type === 'legend_form') {
        if (q.id === 'mega_384') {
          if ((pl.level || 1) >= (q.targetLv || 25)) isDone = true;
        } else if (q.targetMoveId && q.targetMoveTier) {
          let curTier = 0;
          if (pl.slots) {
            for (const g of pl.slots) {
              const list = Array.isArray(g) ? g : [g];
              for (const m of list) {
                if (m && m.id === q.targetMoveId) {
                  curTier = Math.max(curTier, m.evoTier || (m.evolved ? 1 : 0));
                }
              }
            }
          }
          if (curTier >= q.targetMoveTier) isDone = true;
        } else if (q.targetKills !== undefined && q.targetLv !== undefined) {
          const curKills = Math.max(q.kills || 0, (pl && pl.kills) || 0);
          if (curKills >= q.targetKills && (pl.level || 1) >= q.targetLv) isDone = true;
        } else if (q.id === 'legend_giratina') {
          if (curTime >= q.targetTime || (pl.bosses || 0) >= q.targetBosses) isDone = true;
        }
      } else if (q.type === 'archetype') {
        if (q.archetype === 'berserker') {
          if ((q.physKills || 0) >= q.targetPhysKills) isDone = true;
        } else if (q.archetype === 'arcane') {
          if ((q.specialEvos || 0) >= q.targetSpecialEvos && (q.riftWins || 0) >= q.targetRifts) isDone = true;
        } else if (q.archetype === 'juggernaut') {
          if ((q.lockedChests || 0) >= q.targetChests && curTime >= q.targetTime) isDone = true;
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
      if (G.Game && G.Game.offerItem) {
        G.Game.offerItem(q.rewardItem);
      } else if (G.Game && G.Game.item) {
        G.Game.item(q.rewardItem);
      }
    } else if (q.rewardType === 'rayquaza_mega') {
      if (pl.megaEvolve) pl.megaEvolve(10034);
      if (G.UI && G.UI.toast) G.UI.toast('Rayquaza đã thức tỉnh thành Chúa Tể Bầu Trời Mega Rayquaza!', 4500);
    } else if (q.rewardType === 'zygarde_mega') {
      if (pl.megaEvolve) pl.megaEvolve(10121);
      if (pl.upgradeToNihilLight) pl.upgradeToNihilLight();
      if (G.UI && G.UI.toast) G.UI.toast('Zygarde thức tỉnh dạng Mega & Nhận chiêu Nihil Light!', 4500);
    } else if (q.rewardType && q.rewardType.startsWith('passive_')) {
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
    if (q.completed) return { current: 100, max: 100, pct: 1.0, label: '✓ Xong!' };

    if (q.type === 'mega' || q.type === 'legend_form') {
      if (q.id === 'mega_384' && q.targetLv !== undefined) {
        const curLv = (pl && pl.level) || 1;
        const pct = Math.min(1, curLv / q.targetLv);
        return { current: curLv, max: q.targetLv, pct, label: `Nv.${curLv}/${q.targetLv}` };
      }
      if (q.targetMoveId && q.targetMoveTier) {
        let curTier = 0;
        if (pl && pl.slots) {
          for (const g of pl.slots) {
            const list = Array.isArray(g) ? g : [g];
            for (const m of list) {
              if (m && m.id === q.targetMoveId) {
                curTier = Math.max(curTier, m.evoTier || (m.evolved ? 1 : 0));
              }
            }
          }
        }
        const pct = Math.min(1, curTier / q.targetMoveTier);
        const stars = curTier === 0 ? '0' : '+'.repeat(curTier);
        return { current: curTier, max: q.targetMoveTier, pct, label: `Dragon Ascent: ${stars}/+++` };
      }
      if (q.targetKills !== undefined && q.targetLv !== undefined) {
        const curKills = Math.max(q.kills || 0, (pl && pl.kills) || 0);
        const curLv = (pl && pl.level) || 1;
        const killF = Math.min(1, curKills / q.targetKills);
        const lvF = Math.min(1, curLv / q.targetLv);
        const pct = (killF + lvF) * 0.5;
        return {
          current: curKills,
          max: q.targetKills,
          pct,
          label: `${curKills}/${q.targetKills} (Nv.${curLv}/${q.targetLv})`
        };
      }
      if (q.id === 'legend_giratina') {
        const tF = Math.min(1, curTime / q.targetTime);
        return { current: Math.floor(curTime), max: q.targetTime, pct: tF, label: `${G.U.mmss(curTime)} / 10:00` };
      }
    } else if (q.type === 'archetype') {
      if (q.archetype === 'berserker') {
        const cur = q.physKills || 0;
        return { current: cur, max: q.targetPhysKills, pct: Math.min(1, cur / q.targetPhysKills), label: `${cur}/${q.targetPhysKills}` };
      }
      if (q.archetype === 'arcane') {
        const ev = q.specialEvos || 0;
        const rf = (q.riftWins || 0) + ((pl && pl.bosses) || 0);
        const pct = Math.min(1, (ev / 2 + Math.min(1, rf)) * 0.5);
        return { current: ev, max: 2, pct, label: `Chiêu:${ev}/2 · Khe:${rf}/1` };
      }
      if (q.archetype === 'juggernaut') {
        const ch = Math.min(2, q.lockedChests || 0);
        const tF = Math.min(1, curTime / q.targetTime);
        const pct = (ch / 2 + tF) * 0.5;
        return { current: ch, max: 2, pct, label: `Rương:${ch}/2 · ${G.U.mmss(curTime)}/15:00` };
      }
      if (q.archetype === 'speedster') {
        if (q.caughtRunner) return { current: 1, max: 1, pct: 1.0, label: 'Đã bắt Duende!' };
        const lv = (pl && pl.level) || 1;
        const lvF = Math.min(1, lv / q.targetLv);
        return { current: lv, max: q.targetLv, pct: lvF, label: `Nv.${lv}/${q.targetLv} (<12:00)` };
      }
      if (q.archetype === 'purist') {
        const tF = Math.min(1, curTime / q.targetTime);
        return { current: Math.floor(curTime), max: q.targetTime, pct: tF, label: `${G.U.mmss(curTime)} / 15:00` };
      }
    }
    return { current: 0, max: 1, pct: 0, label: '0%' };
  }

  /**
   * Vẽ TẤT CẢ nhiệm vụ khả dụng cùng lúc trên HUD (Vertical Stack)
   * Giúp người chơi theo dõi tiến độ đồng thời mọi nhiệm vụ
   */
  function draw(ctx, w, h, pl, st, F, roundRect, bar) {
    if (!pl || activeQuests.length === 0 || G.Game.state !== 'playing') return;

    const sa = (G.Touch && G.Touch.safeArea) ? G.Touch.safeArea() : { top: 0, right: 0, bottom: 0, left: 0 };
    const panelW = 174;
    const cardH = collapsed ? 22 : 56;
    const gap = 5;
    const totalH = activeQuests.length * cardH + (activeQuests.length - 1) * gap;

    // Vị trí trục X và Y ở cạnh phải màn hình
    const px = w - panelW - 10 - sa.right;
    const startY = Math.floor((h - totalH) * 0.46);

    ctx.save();
    ctx.textBaseline = 'alphabetic';

    for (let i = 0; i < activeQuests.length; i++) {
      const q = activeQuests[i];
      const cy = startY + i * (cardH + gap);
      const info = getProgressInfo(q, pl, st);

      // 1. Nền Dark Glassmorphic
      roundRect(ctx, px, cy, panelW, cardH, 7);
      ctx.fillStyle = q.completed ? 'rgba(15, 25, 20, 0.90)' : 'rgba(8, 14, 28, 0.88)';
      ctx.fill();

      // Viền phát sáng theo màu hoặc vàng kim nếu hoàn thành
      ctx.lineWidth = q.completed ? 1.8 : 1.2;
      ctx.strokeStyle = q.completed ? '#ffd23f' : (q.color || 'rgba(79,209,255,0.7)');
      ctx.stroke();

      // Đăng ký nút click thu gọn / mở rộng
      if (G.Touch && G.Touch.addButton) {
        G.Touch.addButton(px, cy, panelW, cardH, () => {
          collapsed = !collapsed;
          if (G.Audio && G.Audio.sfx) G.Audio.sfx('click');
        }, 4);
      }

      if (collapsed) {
        // Chế độ thu gọn mini
        ctx.textAlign = 'left';
        ctx.font = F(800, 9);
        ctx.fillStyle = q.completed ? '#ffd23f' : (q.color || '#4fd1ff');
        const shortTitle = q.title.replace('THỬ THÁCH ', '').substring(0, 14);
        ctx.fillText(shortTitle, px + 6, cy + 15);

        ctx.textAlign = 'right';
        ctx.font = F(700, 8.5);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(info.label, px + panelW - 6, cy + 15);
        continue;
      }

      // 2. Chế độ mở rộng chi tiết
      // Dòng 1: Tiêu đề nhiệm vụ
      ctx.textAlign = 'left';
      ctx.font = F(800, 9.5);
      ctx.fillStyle = q.completed ? '#ffd23f' : (q.color || '#4fd1ff');
      const titleTxt = G.T ? G.T(q.title) : q.title;
      ctx.fillText(titleTxt, px + 7, cy + 15);

      // Nhãn tiến độ góc trên phải
      ctx.textAlign = 'right';
      ctx.font = F(700, 8.5);
      ctx.fillStyle = q.completed ? '#5fe08a' : '#d5e1f5';
      ctx.fillText(info.label, px + panelW - 7, cy + 15);

      // Dòng 2: Thanh tiến trình (Bar)
      const barY = cy + 22;
      const barW = panelW - 14;
      bar(ctx, px + 7, barY, barW, 7, info.pct, q.completed ? '#ffd23f' : (q.color || '#4fd1ff'));

      // Dòng 3: Mô tả mục tiêu / Phần thưởng
      ctx.textAlign = 'left';
      ctx.font = F(600, 8);
      ctx.fillStyle = '#9cb3d4';
      const descTxt = G.T ? G.T(q.desc) : q.desc;
      ctx.fillText(descTxt, px + 7, cy + 40);

      // Dòng 4: Phần thưởng
      ctx.font = F(700, 8);
      ctx.fillStyle = q.completed ? '#ffd23f' : '#f59e0b';
      const rewTxt = q.completed ? '✓ Đã nhận thưởng' : ('Thưởng: ' + (q.rewardName || ''));
      ctx.fillText(rewTxt, px + 7, cy + 50);
    }

    ctx.restore();
  }

  return {
    startRun,
    update,
    draw,
    onEvolve,
    onKill,
    onProgressEvent,
    get activeQuests() { return activeQuests; }
  };
})();
