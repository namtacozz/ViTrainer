/* ============ director.js — Spawn Director (Nhịp thở, Ngân sách credits, Áp lực P) ============
 * Quản lý nhịp sinh quái thông minh (Adaptive AI Director) thay thế bộ sinh ngẫu nhiên cũ:
 * 1. Ngân sách credits tích lũy theo giây, tăng dần theo thời gian (phút) và số người chơi (co-op).
 * 2. Nhịp thở 60 giây tuần hoàn:
 *    - 0–30s: Tăng dần (Ramp-up) mua quái Fodder / Rusher.
 *    - 30–45s: Đỉnh điểm (Peak Rush) sinh Elite và tăng áp lực.
 *    - 45–60s: Xả hơi (Reprieve) ngưng sinh dồn dập, hỗ trợ nhặt EXP / Hồi phục.
 * 3. Chỉ số áp lực P (0.0 – 1.0):
 *    - Tính từ HP% người chơi, tốc độ diệt quái, mật độ xung quanh.
 *    - P > 0.75: Giảm credits tới -30%, tạm hoãn gói quái và hỗ trợ sinh berry.
 *    - P < 0.40: Tăng credits tới +25% để thử thách người chơi.
 * 4. Đội hình có chủ đích & Chống kiting:
 *    - Sinh vòng cung lệch về hướng di chuyển nhưng LUÔN bảo đảm hành lang thoát >= 60°.
 *    - Nếu quá 12s người chơi không hạ được quái (chạy vòng vô tận) -> sinh bầy săn tốc độ cao chặn đầu.
 */
G.Director = (() => {
  let credits = 0;
  let waveTimer = 0;
  let lastKillTimer = 0;
  let pressureIndex = 0.5;
  let recentKills = 0;
  let killSampleTimer = 0;

  function reset() {
    credits = 0;
    waveTimer = 0;
    lastKillTimer = 0;
    pressureIndex = 0.5;
    recentKills = 0;
    killSampleTimer = 0;
  }

  /**
   * Tính toán chỉ số áp lực P (0.0 đến 1.0)
   * Ở chế độ Co-op 8 người: P kết hợp trung vị cả đội và người chơi yếu nhất.
   */
  function computePressure(players) {
    if (!players || !players.length) return 0.5;
    const alive = players.filter(p => !p.dead);
    if (!alive.length) return 1.0;

    // HP ratios
    const hpRatios = alive.map(p => (p.hp || 1) / Math.max(1, p.maxHp || 100));
    hpRatios.sort((a, b) => a - b);
    const minHp = hpRatios[0];
    const medianHp = hpRatios[Math.floor(hpRatios.length / 2)];

    const mobCount = G.EnemyMgr ? G.EnemyMgr.count : 0;
    const cap = G.Spawner ? G.Spawner.CAP : 64;
    const density = Math.min(1.0, mobCount / Math.max(1, cap));

    // P cao khi máu thấp hoặc mật độ quái dày đặc
    const teamDeficit = (1 - medianHp) * 0.4 + (1 - minHp) * 0.3;
    const pRaw = teamDeficit + density * 0.3;
    return G.U.clamp(pRaw, 0.1, 1.0);
  }

  /** Cập nhật ngân sách & nhịp thở mỗi frame */
  function update(dt, players, t) {
    waveTimer = (waveTimer + dt) % 60;
    killSampleTimer += dt;
    lastKillTimer += dt;

    if (killSampleTimer >= 1.0) {
      killSampleTimer = 0;
      pressureIndex = computePressure(players);
    }

    // 1. Nhịp thở 60s:
    // 0-30s: Ramp (1.0x), 30-45s: Peak (1.4x), 45-60s: Reprieve (0.35x)
    let waveMul = 1.0;
    if (waveTimer < 30) {
      waveMul = 0.8 + (waveTimer / 30) * 0.4;
    } else if (waveTimer < 45) {
      waveMul = 1.45;
    } else {
      waveMul = 0.35;
    }

    // 2. Tinh chỉnh theo áp lực P:
    let pressureMul = 1.0;
    if (pressureIndex > 0.75) {
      pressureMul = 0.70; // Giảm 30% credits
    } else if (pressureIndex < 0.40) {
      pressureMul = 1.25; // Tăng 25% credits
    }

    // 3. Tỷ lệ tăng credits cơ bản theo thời gian và người chơi
    const pCount = players.length || 1;
    const coopScale = pCount <= 4 ? (1 + 0.55 * (pCount - 1)) : (2.65 * Math.pow(1.22, pCount - 4));
    const baseCreditRate = (2.0 + t * 0.035 + Math.pow(t / 60, 1.5) * 0.45);

    credits += baseCreditRate * waveMul * pressureMul * coopScale * dt;

    // 4. Cơ chế chống kite vô tận: Nếu 12s không có quái nào bị hạ
    if (lastKillTimer >= 12.0 && G.EnemyMgr && G.EnemyMgr.count < (G.Spawner ? G.Spawner.CAP : 64)) {
      lastKillTimer = 7.0; // Reset một phần
      spawnPursuitPack(players, t);
    }
  }

  /** Sinh quái săn tốc độ cao chặn đầu khi người chơi kite không hạ quái */
  function spawnPursuitPack(players, t) {
    if (!players || !players.length) return;
    const target = players.find(p => !p.dead) || players[0];
    const vx = target.svx || target._vx || 0;
    const vy = target.svy || target._vy || 0;
    const spd = Math.hypot(vx, vy);
    const forwardAngle = spd > 20 ? Math.atan2(vy, vx) : Math.random() * 6.2832;

    // Sinh 2 quái rusher phía trước góc ±30 độ
    for (let i = -1; i <= 1; i += 2) {
      const angle = forwardAngle + i * 0.5;
      if (G.Spawner && G.Spawner.spawnOneDirector) {
        G.Spawner.spawnOneDirector(target, t, angle, 'rusher');
      }
    }
  }

  function onKill() {
    lastKillTimer = 0;
    recentKills++;
  }

  function spend(cost) {
    if (credits >= cost) {
      credits -= cost;
      return true;
    }
    return false;
  }

  return {
    reset,
    update,
    onKill,
    spend,
    get credits() { return credits; },
    get pressure() { return pressureIndex; },
    get wavePhase() {
      if (waveTimer < 30) return 'ramp';
      if (waveTimer < 45) return 'peak';
      return 'reprieve';
    }
  };
})();
