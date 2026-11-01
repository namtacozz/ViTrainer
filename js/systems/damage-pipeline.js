/* ============ damage-pipeline.js — Chuỗi Tính Toán Sát Thương Thống Nhất ============
 * Duy trì trật tự tính toán sát thương duy nhất, gom nhóm hệ số để chống nhân chồng bùng nổ,
 * và áp dụng trần/sàn theo quy chuẩn cân bằng.
 */
var G = (typeof window !== 'undefined' ? window.G : (typeof global !== 'undefined' ? global.G : null)) || {};
if (typeof window !== 'undefined') window.G = G;
if (typeof global !== 'undefined') global.G = G;

G.DamagePipeline = (() => {
  /**
   * Tính toán sát thương gây ra từ người chơi lên quái hoặc Boss
   */
  function calcOutgoingDamage(pl, move, target, ctx = {}) {
    if (!pl || !move) return 0;
    const cat = move.cat || (move.cls === 'p' ? 'physical' : 'special');
    const isPhysical = cat === 'physical';

    // 1. Chỉ số tấn công cơ bản x Sát thương gốc của chiêu
    const baseStat = isPhysical ? (pl.pa || 10) : (pl.sa || 10);
    const moveDmg = move.dmg || (move.def ? move.def.dmg : 15);
    let dmg = baseStat * (moveDmg / 15);

    // 2. Hệ số Stage Balance, Level & Mega
    if (pl.dmgMul) dmg *= pl.dmgMul;

    // 3. STAB (Same-Type Attack Bonus)
    const types = (pl.mon && pl.mon.types) ? pl.mon.types : [];
    const hasSTAB = types.includes(move.type) || pl.proteanActive;
    if (hasSTAB) {
      const stabMult = pl.adaptability ? 1.40 : 1.20;
      dmg *= stabMult;
    }

    // 4. Tương khắc 18 hệ canon
    if (target && target.types && G.Types && G.Types.mult) {
      let typeMult = G.Types.mult(move.type, target.types);
      // Freeze-Dry: x2.0 lên hệ Nước
      if (move.id === 'freeze-dry' && target.types.includes('water')) {
        typeMult = Math.max(typeMult, 2.0);
      }
      // Kháng toàn bộ -> không biến thành 0 mà nhận tối thiểu 0.25x
      dmg *= Math.max(0.25, typeMult);
    }

    // 5. Gom nhóm hệ số Ability & Item (cộng dồn bên trong nhóm có trần)
    let abilBonus = 0;
    if (pl.ability && pl.ability.out) {
      const aOut = pl.ability.out(pl, move, target);
      if (typeof aOut === 'number' && aOut > 1) {
        abilBonus = Math.min(0.60, aOut - 1);
      }
    }
    let itemBonus = 0;
    if (pl.itemAtkMul && pl.itemAtkMul > 1) {
      itemBonus = Math.min(0.50, pl.itemAtkMul - 1);
    }
    dmg *= (1 + abilBonus + itemBonus);

    // 6. Stage debuff của mục tiêu
    if (target && G.StatusEngine) {
      const defStat = isPhysical ? 'def' : 'sdef';
      const targetStageMult = G.StatusEngine.getStageMult(target, defStat);
      if (targetStageMult > 0) {
        dmg *= (1 / targetStageMult);
      }
    }

    // 7. Phản ứng nguyên tố (trần +100%)
    if (ctx.reactionMultiplier && ctx.reactionMultiplier > 1) {
      const rxBonus = Math.min(1.0, ctx.reactionMultiplier - 1);
      dmg *= (1 + rxBonus);
    }

    // 8. Đòn chí mạng (Critical Hit)
    if (ctx.isCrit) {
      const critMul = (pl.ability && pl.ability.critMul) ? pl.ability.critMul : 1.5;
      dmg *= critMul;
    }

    // 9. Cửa sổ VULNERABLE! & Boss Multiplier
    if (target && target.boss) {
      if (target.vulnerable) dmg *= 1.5;
      if (ctx.giantSlayer) {
        // Zacian Behemoth Blade: x1.45 thường trực, x2.0 trên khiên hoặc vulnerable
        const mult = (target.vulnerable || target.phaseShield) ? 2.0 : 1.45;
        dmg *= mult;
      }
    }

    return Math.max(1, Math.round(dmg));
  }

  /**
   * Tính toán sát thương nhận vào của người chơi từ quái hoặc Boss
   */
  function calcIncomingDamage(pl, rawDmg, moveType, cat, attacker, ctx = {}) {
    if (!pl || pl.dead) return 0;
    const isPhysical = cat === 'p' || cat === 'physical';
    const Caps = G.BalanceCaps || {
      DMG_REDUCE_CAP: 0.85,
      HIT_CAP_PCT: 0.40,
      IFRAME_AFTER_BIG: 0.6,
      getHitFloorPct: () => 0.04
    };

    // 1. Sát thương thô ban đầu
    let dmg = rawDmg;

    // 2. Giáp PDEF hoặc SDEF (tối đa 70%)
    const armorPct = Math.min(0.70, (isPhysical ? (pl.pdef || 0) : (pl.sdef || 0)));
    let totalReduction = armorPct;

    // 3. Item phòng thủ (Assault Vest 20%, v.v.)
    if (pl.itemReduce) {
      totalReduction += pl.itemReduce;
    }

    // 4. Ability inMul & Mega dmgReduce (-20%)
    if (pl.ability && pl.ability.inMul) {
      const inFactor = pl.ability.inMul(pl, moveType, isPhysical ? 'p' : 's');
      if (typeof inFactor === 'number' && inFactor < 1) {
        totalReduction += (1 - inFactor);
      }
    }
    if (pl.megaActive) {
      totalReduction += 0.20;
    }

    // 5. Trần giảm sát thương tổng 85%
    totalReduction = Math.min(Caps.DMG_REDUCE_CAP, totalReduction);
    dmg *= (1 - totalReduction);

    // 6. Kiểm tra nội tại Hang On (Gồng mình một lần mỗi 180s)
    if (pl.hangOnTimer > 0) {
      dmg *= 0.50;
    }

    // 7. Hành lang % Máu tối đa (Floor & Cap 40%)
    const maxHp = pl.maxHp || 100;
    const bossIdx = (attacker && attacker.bossIndex) ? attacker.bossIndex : 1;
    const floorPct = Caps.getHitFloorPct(bossIdx);
    const minHit = maxHp * floorPct;
    const maxHit = maxHp * Caps.HIT_CAP_PCT;

    dmg = Math.max(minHit, Math.min(maxHit, dmg));

    // 8. Chặn đòn chí tử (Focus Sash, Sturdy, Disguise)
    if (pl.disguiseReady) {
      pl.disguiseReady = false;
      pl.disguiseCooldown = 45.0;
      if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 20, '¡Disfraz!', '#ffd23f', true);
      return 0;
    }
    if (dmg >= pl.hp && (pl.hasSturdy || pl.hasFocusSash)) {
      if (pl.hp >= maxHp * 0.99) {
        dmg = pl.hp - 1;
        if (pl.hasFocusSash) pl.hasFocusSash = false;
      }
    }

    // 9. Kích hoạt i-frame nếu đòn đánh lấy đi > 10% Max HP
    if (dmg > maxHp * 0.10) {
      pl.iframeTimer = Math.max(pl.iframeTimer || 0, Caps.IFRAME_AFTER_BIG);
    }

    // Kích hoạt Hang On khi máu tụt dưới 25% bởi đòn Boss
    if (attacker && attacker.boss && (pl.hp - dmg) < maxHp * 0.25 && !pl.hangOnUsedThisBoss) {
      pl.hangOnUsedThisBoss = true;
      pl.hangOnTimer = 3.0;
    }

    return Math.max(1, Math.round(dmg));
  }

  return {
    calcOutgoingDamage,
    calcIncomingDamage
  };
})();
