/* ============ status-engine.js — Hệ Thống Trạng Thái & Stage Thống Nhất ============
 * Quản lý trạng thái bất lợi, Kháng CC, Diminishing Returns và Stage Buff/Debuff [-3, +3]
 * cho cả người chơi, quái thường và Đại Boss.
 */
var G = (typeof window !== 'undefined' ? window.G : (typeof global !== 'undefined' ? global.G : null)) || {};
if (typeof window !== 'undefined') window.G = G;
if (typeof global !== 'undefined') global.G = G;

G.StatusEngine = (() => {
  const STAGE_MULT = {
    '-3': 0.64,
    '-2': 0.76,
    '-1': 0.88,
    '0': 1.00,
    '1': 1.12,
    '2': 1.24,
    '3': 1.36
  };

  /** Khởi tạo hoặc làm sạch bộ lưu trữ trạng thái của một thực thể */
  function initEntity(ent) {
    if (!ent.statuses) ent.statuses = {};
    if (!ent.stages) ent.stages = { def: 0, sdef: 0, atk: 0, spd: 0, acc: 0 };
    if (!ent.stageTimers) ent.stageTimers = { def: 0, sdef: 0, atk: 0, spd: 0, acc: 0 };
    if (!ent.ccImmunity) ent.ccImmunity = 0;
  }

  /** Áp dụng trạng thái bất lợi lên thực thể */
  function applyStatus(ent, statusId, duration, opts = {}) {
    initEntity(ent);
    const isBoss = !!ent.boss;
    const isPlayer = !!ent.isPlayer;

    // Boss xử lý CC cứng
    if (isBoss) {
      if (statusId === 'sleep') return false; // Miễn nhiễm ngủ
      if (ent.ccImmunity > 0 && !ent.vulnerable) {
        if (statusId === 'freeze' || statusId === 'paralyze' || statusId === 'stun' || statusId === 'trap') {
          return false;
        }
      }
      if (statusId === 'freeze') {
        statusId = 'slow';
        duration = Math.min(2.5, duration);
        opts.potency = 0.40; // Freeze biến thành Slow -40%
      } else if (statusId === 'paralyze' || statusId === 'stun') {
        statusId = 'slow';
        duration = Math.min(2.0, duration);
        opts.potency = 0.30; // Paralyze biến thành Slow -30%
      } else if (statusId === 'trap') {
        // Chỉ nhận sát thương, không bị giữ chân cứng
        opts.noRoot = true;
      }
    }

    // Xử lý xung khắc: Burn xóa Freeze
    if (statusId === 'burn' && ent.statuses['freeze']) {
      delete ent.statuses['freeze'];
    }

    const cur = ent.statuses[statusId];
    if (cur) {
      cur.dur = Math.max(cur.dur, duration);
      if (opts.maxStacks && opts.maxStacks > 1) {
        cur.stacks = Math.min(opts.maxStacks, (cur.stacks || 1) + 1);
      }
      if (opts.potency) cur.potency = opts.potency;
      if (opts.dmg) cur.dmg = Math.max(cur.dmg || 0, opts.dmg);
    } else {
      ent.statuses[statusId] = {
        id: statusId,
        dur: duration,
        stacks: 1,
        potency: opts.potency || 0.30,
        dmg: opts.dmg || 0,
        source: opts.source || null,
        tickTimer: 0,
        noRoot: !!opts.noRoot
      };
    }

    // Kích hoạt CC Diminishing Returns cho quái
    if (!isPlayer && (statusId === 'freeze' || statusId === 'paralyze' || statusId === 'stun')) {
      ent.ccImmunity = duration + 3.0;
    }

    return true;
  }

  /** Cập nhật các trạng thái theo thời gian mỗi khung hình */
  function update(ent, dt) {
    initEntity(ent);

    // Cập nhật miễn nhiễm CC
    if (ent.ccImmunity > 0) {
      ent.ccImmunity = Math.max(0, ent.ccImmunity - dt);
    }

    // Cập nhật Stage Buff/Debuff (tự phục hồi sau 8s)
    for (const stat in ent.stages) {
      if (ent.stages[stat] !== 0) {
        ent.stageTimers[stat] -= dt;
        if (ent.stageTimers[stat] <= 0) {
          ent.stages[stat] += ent.stages[stat] > 0 ? -1 : 1;
          ent.stageTimers[stat] = 8.0;
        }
      }
    }

    // Cập nhật từng trạng thái
    for (const id in ent.statuses) {
      const st = ent.statuses[id];
      st.dur -= dt;
      st.tickTimer = (st.tickTimer || 0) + dt;

      // Tick sát thương đốt hoặc độc
      if (st.tickTimer >= 0.5) {
        st.tickTimer -= 0.5;
        if (id === 'burn') {
          const burnDmg = Math.max(1, (st.dmg || 10) * 0.05);
          if (ent.hurt) ent.hurt(burnDmg, '#ff6b4d');
        } else if (id === 'poison' || id === 'toxic') {
          const maxHp = ent.maxHp || 100;
          const rate = ent.boss ? 0.003 : 0.01;
          const poisonDmg = Math.max(1, maxHp * rate * (st.stacks || 1));
          if (ent.hurt) ent.hurt(poisonDmg, '#a040a0');
        } else if (id === 'trap') {
          const trapDmg = Math.max(1, (st.dmg || 15) * 0.15);
          if (ent.hurt) ent.hurt(trapDmg, '#d08030');
        }
      }

      // Toxic tự tăng stack mỗi giây
      if (id === 'toxic') {
        st.stackTimer = (st.stackTimer || 0) + dt;
        if (st.stackTimer >= 1.0) {
          st.stackTimer -= 1.0;
          st.stacks = Math.min(6, (st.stacks || 1) + 1);
        }
      }

      if (st.dur <= 0) {
        delete ent.statuses[id];
      }
    }
  }

  /** Thay đổi Stage Buff/Debuff [-3, +3] */
  function applyStage(ent, stat, delta) {
    initEntity(ent);
    if (!(stat in ent.stages)) return;
    ent.stages[stat] = Math.max(-3, Math.min(3, ent.stages[stat] + delta));
    ent.stageTimers[stat] = 8.0;
  }

  /** Lấy hệ số khuếch đại của Stage */
  function getStageMult(ent, stat) {
    if (!ent || !ent.stages || !(stat in ent.stages)) return 1.0;
    const stage = ent.stages[stat];
    return STAGE_MULT[String(stage)] || 1.0;
  }

  function hasStatus(ent, statusId) {
    return !!(ent && ent.statuses && ent.statuses[statusId] && ent.statuses[statusId].dur > 0);
  }

  function getStatus(ent, statusId) {
    return ent && ent.statuses ? ent.statuses[statusId] : null;
  }

  function clearStatus(ent, statusId) {
    if (ent && ent.statuses && ent.statuses[statusId]) {
      delete ent.statuses[statusId];
    }
  }

  return {
    applyStatus,
    update,
    applyStage,
    getStageMult,
    hasStatus,
    getStatus,
    clearStatus
  };
})();
