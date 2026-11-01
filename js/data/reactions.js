/* ============ reactions.js — 6 Phản Ứng Nguyên Tố (Elemental Reactions) ============
 * Học hỏi từ Genshin Impact & Noita, tận dụng các trạng thái sẵn có để tạo chiều sâu
 * chiến thuật kết hợp chiêu thức mà không làm phức tạp hóa mã nguồn.
 */
var G = (typeof window !== 'undefined' ? window.G : (typeof global !== 'undefined' ? global.G : null)) || {};
if (typeof window !== 'undefined') window.G = G;
if (typeof global !== 'undefined') global.G = G;

G.Reactions = (() => {
  const REACTIONS = {
    // 1. Dẫn Điện: Ướt + Điện -> Sét lan sang 3 mục tiêu lân cận trong 160px
    conductive: {
      id: 'conductive',
      name: 'Conductive (Dẫn Điện)',
      check: (type, ent) => type === 'electric' && G.StatusEngine && G.StatusEngine.hasStatus(ent, 'wet'),
      trigger: (type, ent, dmg, pl) => {
        if (G.FX && G.FX.spark) G.FX.spark(ent.x, ent.y, 16, '#7fe0ff');
        if (G.FX && G.FX.ring) G.FX.ring(ent.x, ent.y, 20, 160, '#7fe0ff', 0.3, 3);
        if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
          const chainFoes = G.EnemyMgr.queryCircle(ent.x, ent.y, 160).filter(f => f !== ent).slice(0, 3);
          for (const f of chainFoes) {
            f.hurt(Math.round(dmg * 0.50), '#7fe0ff');
            if (G.FX && G.FX.line) G.FX.line(ent.x, ent.y, f.x, f.y, '#7fe0ff', 0.25, 2);
          }
        }
        return { bonusMult: 1.25, label: '¡Conducción!' };
      }
    },

    // 2. Đóng Băng Sâu: Ướt + Băng -> Tăng thời gian đóng băng và tăng sát thương nhận vào
    deep_freeze: {
      id: 'deep_freeze',
      name: 'Deep Freeze (Đóng Băng Sâu)',
      check: (type, ent) => type === 'ice' && G.StatusEngine && G.StatusEngine.hasStatus(ent, 'wet'),
      trigger: (type, ent, dmg, pl) => {
        if (G.StatusEngine) {
          G.StatusEngine.applyStatus(ent, 'freeze', 2.5, { potency: 0.35 });
          G.StatusEngine.applyStage(ent, 'def', -1);
        }
        if (G.FX && G.FX.ring) G.FX.ring(ent.x, ent.y, 10, 80, '#9fe8ff', 0.4, 4);
        return { bonusMult: 1.35, label: '¡Congelación Profunda!' };
      }
    },

    // 3. Cháy Lan: Cỏ + Lửa -> Bùng cháy dữ dội, rải thảm lửa mặt đất 3s
    wildfire: {
      id: 'wildfire',
      name: 'Wildfire (Cháy Lan)',
      check: (type, ent) => type === 'fire' && (ent.types && ent.types.includes('grass')),
      trigger: (type, ent, dmg, pl) => {
        if (G.StatusEngine) G.StatusEngine.applyStatus(ent, 'burn', 3.5, { dmg: dmg * 0.4 });
        if (G.FX && G.FX.ring) G.FX.ring(ent.x, ent.y, 15, 120, '#ff6b4d', 0.5, 5);
        if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
          const nearFoes = G.EnemyMgr.queryCircle(ent.x, ent.y, 120);
          for (const f of nearFoes) {
            if (G.StatusEngine) G.StatusEngine.applyStatus(f, 'burn', 2.5, { dmg: dmg * 0.25 });
          }
        }
        return { bonusMult: 1.40, label: '¡Ignición!' };
      }
    },

    // 4. Tan Chảy: Băng + Lửa -> Nổ hơi nước bộc phát 150% sát thương
    melt: {
      id: 'melt',
      name: 'Melt (Tan Chảy)',
      check: (type, ent) => type === 'fire' && (G.StatusEngine && G.StatusEngine.hasStatus(ent, 'freeze')),
      trigger: (type, ent, dmg, pl) => {
        if (G.StatusEngine) G.StatusEngine.clearStatus(ent, 'freeze');
        if (G.FX && G.FX.spark) G.FX.spark(ent.x, ent.y, 20, '#ffffff');
        if (G.FX && G.FX.ring) G.FX.ring(ent.x, ent.y, 5, 100, '#ff9040', 0.35, 4);
        return { bonusMult: 1.50, label: '¡Fusión!' };
      }
    },

    // 5. Thủy Tinh Hóa: Đất/Cát + Điện -> Ghim chân 2.0s và giảm 20% giáp
    glassify: {
      id: 'glassify',
      name: 'Glassify (Thủy Tinh Hóa)',
      check: (type, ent) => type === 'electric' && (ent.types && (ent.types.includes('ground') || ent.types.includes('rock'))),
      trigger: (type, ent, dmg, pl) => {
        if (G.StatusEngine) {
          G.StatusEngine.applyStatus(ent, 'slow', 2.0, { potency: 0.60 });
          G.StatusEngine.applyStage(ent, 'def', -2);
        }
        if (G.FX && G.FX.spark) G.FX.spark(ent.x, ent.y, 18, '#ffd23f');
        return { bonusMult: 1.30, label: '¡Vitrificación!' };
      }
    },

    // 6. Nổ Khí Độc: Độc + Lửa -> Kích nổ lượng độc tồn dư
    vapor_explosion: {
      id: 'vapor_explosion',
      name: 'Vapor Explosion (Nổ Khí Độc)',
      check: (type, ent) => type === 'fire' && (G.StatusEngine && (G.StatusEngine.hasStatus(ent, 'poison') || G.StatusEngine.hasStatus(ent, 'toxic'))),
      trigger: (type, ent, dmg, pl) => {
        const poisonSt = G.StatusEngine.getStatus(ent, 'poison') || G.StatusEngine.getStatus(ent, 'toxic');
        const stacks = poisonSt ? (poisonSt.stacks || 1) : 1;
        G.StatusEngine.clearStatus(ent, 'poison');
        G.StatusEngine.clearStatus(ent, 'toxic');
        if (G.FX && G.FX.ring) G.FX.ring(ent.x, ent.y, 10, 140, '#a040d0', 0.45, 6);
        const aoeDmg = Math.round(dmg * (0.30 + stacks * 0.15));
        if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
          for (const f of G.EnemyMgr.queryCircle(ent.x, ent.y, 140)) {
            f.hurt(aoeDmg, '#a040d0');
          }
        }
        return { bonusMult: 1.45, label: '¡Explosión Tóxica!' };
      }
    }
  };

  /**
   * Kiểm tra và kích hoạt phản ứng nguyên tố nếu đủ điều kiện
   */
  function checkAndTrigger(moveType, target, baseDmg, pl) {
    if (!moveType || !target || !target.hurt) return { bonusMult: 1.0 };
    for (const key in REACTIONS) {
      const rx = REACTIONS[key];
      if (rx.check(moveType, target)) {
        const result = rx.trigger(moveType, target, baseDmg, pl);
        if (result && result.label && G.FX && G.FX.dmgText) {
          G.FX.dmgText(target.x, target.y - 15, result.label, '#ffd23f', true);
        }
        return result;
      }
    }
    return { bonusMult: 1.0 };
  }

  return {
    REACTIONS,
    checkAndTrigger
  };
})();
