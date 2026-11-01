/* ============ move-traits.js — Ngữ Pháp Chiêu Thức & Nét Canon Đặc Trưng ============
 * Gán các hành vi Canon (Charge, Homing, Boomerang, Weather synergy, Stun...)
 * cho từng chiêu thức, biến mỗi chiêu thành một kỹ năng sống động bám sát nguyên tác.
 */
var G = (typeof window !== 'undefined' ? window.G : (typeof global !== 'undefined' ? global.G : null)) || {};
if (typeof window !== 'undefined') window.G = G;
if (typeof global !== 'undefined') global.G = G;

G.MoveTraits = (() => {
  const TRAITS = {
    'solar-beam': {
      delivery: 'charge_beam',
      chargeTime: 1.2,
      instantUnderWeather: 'sun',
      desc: 'Tụ năng lượng 1.2s rồi xả chùm tia; dưới Nắng Gắt xả tức thì.'
    },
    'hyper-beam': {
      delivery: 'beam',
      rechargeDelay: 0.8,
      dmgMult: 1.6,
      desc: 'Chùm tia hủy diệt cực mạnh, người chơi cần 0.8s hồi sức sau khi bắn.'
    },
    'thunder': {
      delivery: 'strike',
      guaranteedUnderWeather: 'rain',
      paralyzeChance: 0.40,
      desc: 'Giáng sét cực mạnh từ trời cao; dưới Trời Mưa đánh trúng chắc chắn 100%.'
    },
    'magnitude': {
      delivery: 'quake',
      rollMagnitude: () => {
        const r = Math.random();
        if (r < 0.1) return { mag: 4, mult: 0.5 };
        if (r < 0.3) return { mag: 6, mult: 0.8 };
        if (r < 0.7) return { mag: 7, mult: 1.0 };
        if (r < 0.9) return { mag: 8, mult: 1.4 };
        return { mag: 10, mult: 2.2 };
      },
      desc: 'Gây động đất ngẫu nhiên từ cấp 4 đến 10 với sức hủy diệt tương ứng.'
    },
    'sucker-punch': {
      delivery: 'dash',
      telegraphMultiplier: 2.2,
      desc: 'Lao tới tấn công bất ngờ; gây hơn gấp đôi sát thương nếu mục tiêu đang niệm chiêu.'
    },
    'bonemerang': {
      delivery: 'boomerang',
      doubleHit: true,
      desc: 'Phóng khúc xương bay đi và quay về, gây sát thương hai lần liên tiếp.'
    },
    'outrage': {
      delivery: 'berserk_rush',
      duration: 2.5,
      exhaustStun: 0.5,
      desc: 'Cuồng loạn tấn công bầy quái trong 2.5s rồi khựng lại 0.5s do kiệt sức.'
    },
    'u-turn': {
      delivery: 'hit_and_run',
      recoilDistance: 150,
      desc: 'Lao lên chém mạnh vào kẻ địch rồi bật lùi 150px về vị trí an toàn.'
    },
    'freeze-dry': {
      delivery: 'projectile',
      waterSuperEffective: true,
      freezeChance: 0.30,
      desc: 'Bắn tia sương giá; gây sát thương nhân đôi lên quái vật hệ Nước.'
    },
    'toxic': {
      delivery: 'projectile',
      applyToxic: true,
      desc: 'Phóng luồng độc cực mạnh, sát thương độc tự nhân lên theo từng giây.'
    },
    'giga-drain': {
      delivery: 'tether_drain',
      tetherTargets: 3,
      leechPct: 0.20,
      desc: 'Phóng dây tơ xanh hút sinh lực từ 3 kẻ địch cùng lúc để hồi phục máu.'
    },
    'aura-sphere': {
      delivery: 'homing_projectile',
      neverMiss: true,
      desc: 'Quả cầu sóng xung kích tự tìm đường chuẩn xác, không bao giờ trượt.'
    },
    'sand-tomb': {
      delivery: 'vortex_trap',
      trapDuration: 2.5,
      desc: 'Tạo vòng xoáy cát giữ chân quái vật và gây sát thương liên tục.'
    },
    'fire-spin': {
      delivery: 'vortex_trap',
      trapDuration: 2.5,
      burnChance: 1.0,
      desc: 'Giam hãm kẻ địch trong cột lửa xoáy cuồng bạo.'
    }
  };

  function getTrait(moveId) {
    return TRAITS[moveId] || null;
  }

  return {
    TRAITS,
    getTrait
  };
})();
