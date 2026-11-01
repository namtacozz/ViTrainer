/* ============ balance-caps.js — Trần & Sàn Cân Bằng Toàn Hệ Thống ============
 * Thiết lập các hằng số bất biến bảo vệ trận đấu, chống One-Shot đột tử, chống
 * bất tử hồi máu và chống lạm phát chỉ số.
 */
var G = (typeof window !== 'undefined' ? window.G : (typeof global !== 'undefined' ? global.G : null)) || {};
if (typeof window !== 'undefined') window.G = G;
if (typeof global !== 'undefined') global.G = G;

G.BalanceCaps = (() => {
  const DMG_REDUCE_CAP = 0.85;       // Giảm sát thương tổng từ mọi nguồn tối đa 85%
  const LEECH_CAP_PER_SEC = 0.04;    // Hút máu tối đa 4% Max HP / giây
  const HIT_CAP_PCT = 0.40;          // Trần sát thương 1 đòn (One-shot protection)
  const IFRAME_AFTER_BIG = 0.6;      // Bất tử 0.6s sau đòn >10% Max HP
  const TELEGRAPH_MIN = 0.6;         // Cảnh báo chiêu thức tối thiểu của Boss
  const MAX_PARTICLES_PC = 250;      // Trần hạt VFX trên PC
  const MAX_PARTICLES_MOBILE = 120;  // Trần hạt VFX trên Mobile

  function getHitFloorPct(bossIndex) {
    if (!bossIndex || bossIndex <= 3) return 0.04;
    if (bossIndex <= 6) return 0.06;
    return 0.08;
  }

  return {
    DMG_REDUCE_CAP,
    LEECH_CAP_PER_SEC,
    HIT_CAP_PCT,
    IFRAME_AFTER_BIG,
    TELEGRAPH_MIN,
    MAX_PARTICLES_PC,
    MAX_PARTICLES_MOBILE,
    getHitFloorPct
  };
})();
