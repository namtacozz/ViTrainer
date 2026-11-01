/* ============ world-events.js — Sự Kiện Sinh Tồn Trong Trận (In-Run World Events) ============
 * Triển khai theo Mục 5 & Mục 6 Master Plan 2.0:
 * 1. Chu kỳ Ngày / Đêm & Thời Tiết Toàn Cục (Day/Night & Global Weather):
 *    - 00:00 - 06:00: Ban Ngày (Hoang Dã)
 *    - 06:00 - 12:00: Hoàng Hôn (Căng Thẳng)
 *    - 12:00 - 18:00: Ban Đêm (+20% tỉ lệ sinh quái Ma/Bóng Tối)
 *    - 18:00 - 24:00: Bão Tố (+20% sát thương chiêu Điện/Nước, tầm nhìn mờ)
 *    - 24:00 - 30:00: Hư Không Vũ Trụ
 * 2. Quái Đầu Đàn (Alpha / Noble Pokémon) tại 1:30, 4:30, 7:30...
 * 3. Shiny Tẩu Thoát (Fleeing Shiny) với hào quang sao & rương vàng khi hạ.
 * 4. Bụi Quả Mọng Tự Nhiên (Berry Bushes: Sitrus, Lum, Salac).
 * 5. Căn Nhà Quái Vật (Monster House: Khóa lồng 300px trong 45s sinh tồn).
 * 6. Đoàn Phục Kích Team Rocket (Meowth giật 30% tiền, truy đuổi trong 30s).
 * 7. Quả Cầu Poké Viện Trợ (Assist Poké Ball triệu hồi đồng minh 45s).
 * 8. Thương Nhân Kecleon Lang Thang (Wandering Kecleon Shop phút 8, 16, 24).
 * 9. Hợp Đồng Thợ Săn (In-Run Bounty Contracts chọn 1 trong 3 đầu trận).
 * 10. Khiên Tinh Thể Tera Shield cho Boss Phase 2 & Thanh Choáng Stagger.
 * 11. Chế Độ Vô Tận: Thế Giới Đảo Lộn Giratina (Distortion Realm) sau phút 30.
 */
G.WorldEvents = (() => {
  // State
  let activeEvents = [];
  let dayNightPhase = 'day';
  let distortionRealm = false;
  let distortionTime = 0;
  let activeMonsterHouse = null;
  let activeRocketAmbush = null;
  let activeAssistAlly = null;
  let berryBushes = [];
  let kecleonShop = null;
  let activeContract = null;
  let contractChoices = null;
  let alphaTimer = 0;
  let shinyTimer = 0;
  let berryTimer = 0;
  let assistTimer = 0;

  const BOUNTY_TEMPLATES = [
    { id: 'mob_survivor', title: 'Thợ Săn Hoang Dã', es: 'Cazador Salvaje', en: 'Wild Hunter', desc: 'Tiêu diệt 250 quái vật', target: 250, current: 0, reward: 'coins_300' },
    { id: 'boss_quick', title: 'Sát Thủ Trùm', es: 'Asesino de Jefes', en: 'Boss Slayer', desc: 'Hạ gục 1 Đại Boss', target: 1, current: 0, reward: 'chest_gold' },
    { id: 'berry_forager', title: 'Chuyên Gia Hái Quả', es: 'Recolector de Bayas', en: 'Berry Forager', desc: 'Hái 3 Bụi Quả Tự Nhiên', target: 3, current: 0, reward: 'xp_large' }
  ];

  function reset() {
    activeEvents = [];
    dayNightPhase = 'day';
    distortionRealm = false;
    distortionTime = 0;
    activeMonsterHouse = null;
    activeRocketAmbush = null;
    activeAssistAlly = null;
    berryBushes = [];
    kecleonShop = null;
    activeContract = null;
    contractChoices = null;
    alphaTimer = 0;
    shinyTimer = 0;
    berryTimer = 0;
    assistTimer = 0;
  }

  /**
   * Tính chu kỳ ngày/đêm theo thời gian trận đấu (giây)
   */
  function getDayNightCycle(t) {
    if (distortionRealm) {
      return { phase: 'distortion', name: 'Thế Giới Đảo Lộn', es: 'Mundo Distorsión', en: 'Distortion Realm', darkGhostBonus: 0.35, elecWaterBonus: 0.25 };
    }
    const minute = t / 60;
    if (minute < 6) {
      return { phase: 'day', name: 'Ban Ngày', es: 'Día', en: 'Day', darkGhostBonus: 0, elecWaterBonus: 0 };
    } else if (minute < 12) {
      return { phase: 'dusk', name: 'Hoàng Hôn', es: 'Atardecer', en: 'Dusk', darkGhostBonus: 0.10, elecWaterBonus: 0 };
    } else if (minute < 18) {
      return { phase: 'night', name: 'Ban Đêm', es: 'Noche', en: 'Night', darkGhostBonus: 0.20, elecWaterBonus: 0 };
    } else if (minute < 24) {
      return { phase: 'storm', name: 'Bão Tố', es: 'Tormenta', en: 'Storm', darkGhostBonus: 0, elecWaterBonus: 0.20 };
    } else {
      return { phase: 'void', name: 'Hư Không', es: 'Vacío Cósmico', en: 'Cosmic Void', darkGhostBonus: 0.15, elecWaterBonus: 0.15 };
    }
  }

  /**
   * Khởi tạo 3 Hợp Đồng Thợ Săn lúc đầu trận
   */
  function initContracts() {
    contractChoices = BOUNTY_TEMPLATES.map(t => Object.assign({}, t, { current: 0, completed: false }));
    // Mặc định kích hoạt hợp đồng đầu tiên nếu chưa chọn
    activeContract = contractChoices[0];
  }

  function selectContract(contractId) {
    const found = contractChoices ? contractChoices.find(c => c.id === contractId) : null;
    if (found) activeContract = found;
  }

  function recordProgress(kind, amount) {
    if (!activeContract || activeContract.completed) return;
    if (kind === 'kill') activeContract.current += (amount || 1);
    if (kind === 'boss') activeContract.current += (amount || 1);
    if (kind === 'berry') activeContract.current += (amount || 1);

    if (activeContract.current >= activeContract.target) {
      activeContract.completed = true;
      claimContractReward(activeContract);
    }
  }

  function claimContractReward(contract) {
    const pl = G.PlayerMgr ? G.PlayerMgr.local : null;
    if (!pl) return;
    if (contract.reward === 'coins_300') {
      pl.coins = (pl.coins || 0) + 300;
      if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 40, '+300 VÀNG HỢP ĐỒNG!', '#ffd23f', true);
    } else if (contract.reward === 'xp_large') {
      pl.gainXp(pl.xpNext * 0.75);
      if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 40, '+EXP HỢP ĐỒNG!', '#38bdf8', true);
    } else if (contract.reward === 'chest_gold') {
      if (G.Pickups && G.Pickups.spawnChest) G.Pickups.spawnChest(pl.x + 40, pl.y, true);
    }
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('win');
  }

  /**
   * Sinh quái Đầu Đàn Alpha (1:30, 4:30, 7:30...)
   */
  function checkAlphaSpawn(t, players) {
    // Không sinh nếu đang có Boss lớn hoặc đang trong Breathing Window
    if (G.Spawner && G.Spawner.bossAlive) return;
    if (G.Director && G.Director.isBreathingWindow && G.Director.isBreathingWindow()) return;

    // Khoảng cách 180s, bắt đầu từ 90s
    if (t >= 90 && Math.floor((t - 90) % 180) === 0 && (t - alphaTimer) > 60) {
      alphaTimer = t;
      spawnAlphaPokemon(players, t);
    }
  }

  function spawnAlphaPokemon(players, t) {
    if (!players || !players.length) return;
    const p = players[0];
    const angle = Math.random() * 6.2832;
    const dist = 380;
    const ax = p.x + Math.cos(angle) * dist;
    const ay = p.y + Math.sin(angle) * dist;

    // Chọn ngẫu nhiên Pokémon tiến hóa giai đoạn 2-3 làm Alpha
    const alphaCandidates = [130, 143, 248, 445, 635, 706, 887, 905]; // Gyarados, Snorlax, Tyranitar, Garchomp, Hydreigon, Goodra, Dragapult, Enamorus
    const dex = G.U.pick(alphaCandidates) || 143;

    if (G.EnemyMgr && G.EnemyMgr.spawn) {
      const alpha = G.EnemyMgr.spawn(ax, ay, dex, {
        alpha: true,
        scaleBonus: 1.45,
        hpMul: 4.5,
        dmgMul: 1.6,
        color: '#dc2626'
      });
      if (alpha) {
        alpha.isAlpha = true;
        if (G.Spawner && G.Spawner.say) {
          G.Spawner.say('👹 QUÁI ĐẦU ĐÀN ALPHA ĐÃ XUẤT HIỆN!', 3.0, true);
        }
        if (G.Audio && G.Audio.sfx) G.Audio.sfx('roar');
        if (G.FX && G.FX.ring) G.FX.ring(ax, ay, 20, 120, '#dc2626', 0.8, 6);
      }
    }
  }

  /**
   * Sinh Shiny Tẩu Thoát (Fleeing Shiny)
   */
  function checkShinySpawn(t, players) {
    if (t < 60) return;
    if (t - shinyTimer > 120 && Math.random() < 0.25) {
      shinyTimer = t;
      spawnFleeingShiny(players);
    }
  }

  function spawnFleeingShiny(players) {
    if (!players || !players.length) return;
    const p = players[0];
    const angle = Math.random() * 6.2832;
    const sx = p.x + Math.cos(angle) * 360;
    const sy = p.y + Math.sin(angle) * 360;

    const shinyDexes = [25, 39, 52, 129, 133, 175, 280, 447]; // Pikachu, Jigglypuff, Meowth, Magikarp, Eevee, Togepi, Ralts, Riolu
    const dex = G.U.pick(shinyDexes) || 129;

    if (G.EnemyMgr && G.EnemyMgr.spawn) {
      const shiny = G.EnemyMgr.spawn(sx, sy, dex, {
        isShiny: true,
        fleeing: true,
        spdMul: 1.5,
        hpMul: 0.8
      });
      if (shiny) {
        shiny.isFleeingShiny = true;
        shiny.fleeTimer = 25.0; // 25s để hạ gục
        if (G.Spawner && G.Spawner.say) {
          G.Spawner.say('✨ SHINY ĐANG TẨU THOÁT! HÃY TRUY ĐUỔI!', 3.0, true);
        }
        if (G.FX && G.FX.burst) G.FX.burst(sx, sy, '#fde047', 25, 180);
      }
    }
  }

  /**
   * Sinh và cập nhật Bụi Quả Mọng Tự Nhiên
   */
  function updateBerryBushes(dt, players, t) {
    berryTimer += dt;
    if (berryTimer >= 80 && berryBushes.length < 5) {
      berryTimer = 0;
      spawnBerryBush(players);
    }

    // Check tương tác nhặt quả
    for (let i = berryBushes.length - 1; i >= 0; i--) {
      const bush = berryBushes[i];
      bush.life -= dt;
      if (bush.life <= 0) {
        berryBushes.splice(i, 1);
        continue;
      }
      for (const pl of players) {
        if (pl.dead) continue;
        const d = Math.hypot(pl.x - bush.x, pl.y - bush.y);
        if (d < 36) {
          collectBerry(pl, bush.type);
          berryBushes.splice(i, 1);
          recordProgress('berry', 1);
          break;
        }
      }
    }
  }

  function spawnBerryBush(players) {
    if (!players || !players.length) return;
    const p = players[0];
    const angle = Math.random() * 6.2832;
    const dist = 120 + Math.random() * 220;
    const bx = p.x + Math.cos(angle) * dist;
    const by = p.y + Math.sin(angle) * dist;
    const type = G.U.pick(['sitrus', 'lum', 'salac']) || 'sitrus';
    berryBushes.push({ x: bx, y: by, type, life: 60 });
    if (G.FX && G.FX.ring) G.FX.ring(bx, by, 6, 36, type === 'sitrus' ? '#22c55e' : type === 'lum' ? '#38bdf8' : '#eab308', 0.5, 3);
  }

  function collectBerry(pl, type) {
    if (type === 'sitrus') {
      pl.heal(pl.maxHp * 0.25);
      if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 30, '+25% HP Baya Sitrus!', '#22c55e', true);
    } else if (type === 'lum') {
      if (G.StatusEngine && G.StatusEngine.clearAll) G.StatusEngine.clearAll(pl);
      pl.ccImmuneT = 4.0;
      if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 30, '✦ Lum Berry: Miễn Khống!', '#38bdf8', true);
    } else if (type === 'salac') {
      pl.spdMul = (pl.spdMul || 1) * 1.35;
      setTimeout(() => { pl.spdMul = Math.max(1, (pl.spdMul || 1) / 1.35); }, 8000);
      if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 30, '⚡ Salac Berry: Tốc Biến!', '#eab308', true);
    }
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('heal');
  }

  /**
   * Kích hoạt Monster House (Khóa lồng 45s)
   */
  function triggerMonsterHouse(x, y) {
    if (activeMonsterHouse) return;
    activeMonsterHouse = {
      x, y,
      radius: 300,
      timer: 45.0,
      spawnCooldown: 0
    };
    if (G.Spawner && G.Spawner.say) {
      G.Spawner.say('🏚️ CĂN NHÀ QUÁI VẬT! SỐNG SÓT QUA 45 GIÂY!', 4.0, true);
    }
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('boss');
  }

  function updateMonsterHouse(dt, players) {
    if (!activeMonsterHouse) return;
    const mh = activeMonsterHouse;
    mh.timer -= dt;
    mh.spawnCooldown -= dt;

    // Giữ chân người chơi trong vòng 300px
    for (const pl of players) {
      if (pl.dead) continue;
      const d = Math.hypot(pl.x - mh.x, pl.y - mh.y);
      if (d > mh.radius) {
        const a = Math.atan2(pl.y - mh.y, pl.x - mh.x);
        pl.x = mh.x + Math.cos(a) * (mh.radius - 2);
        pl.y = mh.y + Math.sin(a) * (mh.radius - 2);
      }
    }

    // Đợt sóng quái tràn vào
    if (mh.spawnCooldown <= 0) {
      mh.spawnCooldown = 1.2;
      if (G.Spawner && G.Spawner.spawnDirectorWave) {
        G.Spawner.spawnDirectorWave(players, 6);
      }
    }

    // Hoàn thành sinh tồn
    if (mh.timer <= 0) {
      if (G.Spawner && G.Spawner.say) {
        G.Spawner.say('🎉 BẠN ĐÃ SỐNG SÓT CĂN NHÀ QUÁI VẬT!', 3.5, true);
      }
      if (G.FX && G.FX.burst) G.FX.burst(mh.x, mh.y, '#eab308', 60, 400);
      if (G.Pickups && G.Pickups.spawnChest) G.Pickups.spawnChest(mh.x, mh.y, true);
      activeMonsterHouse = null;
    }
  }

  /**
   * Phục Kích Team Rocket (Rocket Ambush)
   */
  function triggerRocketAmbush(players) {
    if (activeRocketAmbush || !players || !players.length) return;
    const p = players[0];
    const immune = (p.abil && p.abil.id === 'sticky-hold') || (p.mon && p.mon.ability === 'sticky-hold');
    const stolen = immune ? 0 : Math.round((p.coins || 0) * 0.30);
    if (!immune) p.coins = Math.max(0, (p.coins || 0) - stolen);

    activeRocketAmbush = {
      meowthX: p.x + 200,
      meowthY: p.y - 150,
      stolenCoins: stolen,
      timer: 30.0,
      hp: 1500
    };

    if (G.Spawner && G.Spawner.say) {
      const msg = immune ? '🚀 TEAM ROCKET XUẤT HIỆN! NỘI TẠI STICKY HOLD CHẶN ĐỨNG TRỘM!' : '🚀 TEAM ROCKET ĐÃ CƯỚP 30% TIỀN VÀNG! HÃY TRUY ĐUỔI TRONG 30S!';
      G.Spawner.say(msg, 3.5, true);
    }
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('rocket');
  }

  /**
   * Nhặt Poké Ball Viện Trợ (Assist Poké Ball)
   */
  function triggerAssistBall(pl) {
    const allies = [
      { dex: 448, name: 'Lucario', move: 'aura-sphere' },
      { dex: 282, name: 'Gardevoir', move: 'moonblast' },
      { dex: 143, name: 'Snorlax', move: 'body-slam' },
      { dex: 94, name: 'Gengar', move: 'shadow-ball' }
    ];
    const ally = G.U.pick(allies) || allies[0];
    activeAssistAlly = {
      dex: ally.dex,
      name: ally.name,
      move: ally.move,
      x: pl.x + 40,
      y: pl.y + 40,
      life: 45.0,
      castTimer: 1.5
    };
    if (G.Spawner && G.Spawner.say) {
      G.Spawner.say(`🔴 QUẢ CẦU VIỆN TRỢ: ${ally.name.toUpperCase()} XUẤT CHIẾN TRONG 45S!`, 3.0, true);
    }
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('legend');
    if (G.FX && G.FX.burst) G.FX.burst(pl.x, pl.y, '#f43f5e', 20, 160);
  }

  function updateAssistAlly(dt, players) {
    if (!activeAssistAlly) return;
    const a = activeAssistAlly;
    a.life -= dt;
    a.castTimer -= dt;

    const leader = players.find(p => !p.dead) || players[0];
    if (leader) {
      // Đi theo người chơi
      const dx = leader.x - a.x;
      const dy = leader.y - a.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 60) {
        a.x += (dx / dist) * 180 * dt;
        a.y += (dy / dist) * 180 * dt;
      }
    }

    // Thi triển chiêu thức hỗ trợ
    if (a.castTimer <= 0) {
      a.castTimer = 2.5;
      if (G.Combat && G.Combat.castMove) {
        const moveData = G.Moves ? G.Moves.BY_ID[a.move] : null;
        if (moveData) {
          G.Combat.castMove(a, moveData);
        }
      }
    }

    if (a.life <= 0) {
      if (G.FX && G.FX.burst) G.FX.burst(a.x, a.y, '#ffffff', 20, 120);
      activeAssistAlly = null;
    }
  }

  /**
   * Cửa Hàng Kecleon Lang Thang (Wandering Kecleon Shop phút 8, 16, 24)
   */
  function checkKecleonShop(t, players) {
    const m = Math.floor(t / 60);
    if ((m === 8 || m === 16 || m === 24) && !kecleonShop && (t % 60 < 5)) {
      spawnKecleonShop(players);
    }
    if (kecleonShop) {
      kecleonShop.timer -= 1;
      if (kecleonShop.timer <= 0) {
        kecleonShop = null;
      }
    }
  }

  function spawnKecleonShop(players) {
    if (!players || !players.length) return;
    const p = players[0];
    kecleonShop = {
      x: p.x + 80,
      y: p.y - 60,
      timer: 60.0,
      stock: [
        { id: 'reroll_token', name: 'Thẻ Tẩy Chiêu (Reroll)', cost: 50 },
        { id: 'swap_item', name: 'Đổi Trang Bị Giữ', cost: 100 },
        { id: 'full_restore', name: 'Thuốc Trị Thương Toàn Diện', cost: 75 }
      ]
    };
    if (G.Spawner && G.Spawner.say) {
      G.Spawner.say('🎒 THƯƠNG NHÂN KECLEON ĐÃ DỰNG SẠP HÀNG (60S)!', 3.5, true);
    }
    if (G.Audio && G.Audio.sfx) G.Audio.sfx('shop');
  }

  /**
   * Tera Shield cho Boss Phase 2
   */
  function applyTeraShield(boss) {
    if (!boss || boss.teraShieldApplied) return;
    const types = ['fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy'];
    boss.teraShield = true;
    boss.teraShieldApplied = true;
    boss.teraType = G.U.pick(types) || 'steel';
    boss.phaseShield = Math.round(boss.maxHp * 0.30);
    boss.shield = boss.phaseShield;
    boss.shieldT = 999;

    const title = `🛡️ THẦN KHÍ TERA SHIELD [HỆ ${boss.teraType.toUpperCase()}] KÍCH HOẠT!`;
    if (G.Spawner && G.Spawner.say) G.Spawner.say(title, 3.5, true);
    if (G.FX && G.FX.ring) G.FX.ring(boss.x, boss.y, 10, boss.r * 3, '#38bdf8', 0.8, 6);
  }

  /**
   * Chuyển vào Thế Giới Đảo Lộn Giratina (Distortion Realm)
   */
  function enterDistortionRealm() {
    distortionRealm = true;
    distortionTime = 0;
    if (G.Spawner && G.Spawner.say) {
      G.Spawner.say('🌀 BẠN ĐÃ BƯỚC VÀO THẾ GIỚI ĐẢO LỘN CỦA GIRATINA! CHẾ ĐỘ SINH TỒN VÔ TẬN!', 5.0, true);
    }
    if (G.Audio && G.Audio.sfx) { G.Audio.sfx('legend'); G.Audio.sfx('warp'); }
    if (G.Camera && G.Camera.kick) G.Camera.kick(2.0);
  }

  /**
   * Vòng lặp cập nhật chính mỗi frame
   */
  function update(dt, players, t) {
    dayNightPhase = getDayNightCycle(t).phase;

    if (!contractChoices) initContracts();

    checkAlphaSpawn(t, players);
    checkShinySpawn(t, players);
    updateBerryBushes(dt, players, t);
    updateMonsterHouse(dt, players);
    updateAssistAlly(dt, players);
    checkKecleonShop(t, players);

    // Xử lý Thế Giới Đảo Lộn
    if (distortionRealm) {
      distortionTime += dt;
      // Mỗi 60s quái vật tăng 15% chỉ số không trần
      const entropyCycles = Math.floor(distortionTime / 60);
      if (G.Director) {
        G.Director.distortionScale = 1.0 + entropyCycles * 0.15;
      }
    }
  }

  return {
    reset,
    update,
    getDayNightCycle,
    initContracts,
    selectContract,
    recordProgress,
    triggerMonsterHouse,
    triggerRocketAmbush,
    triggerAssistBall,
    applyTeraShield,
    enterDistortionRealm,
    get berryBushes() { return berryBushes; },
    get activeContract() { return activeContract; },
    get isDistortionRealm() { return distortionRealm; },
    get activeMonsterHouse() { return activeMonsterHouse; },
    get kecleonShop() { return kecleonShop; }
  };
})();
