/* ============ upgrades.js — Cây kỹ năng MMORPG cày cuốc lâu dài giữa các runs ============
 * Thiết kế theo 3 nhánh: Tấn Công (Offense) · Phòng Thủ (Defense) · Chiến Thuật (Utility)
 * Mỗi Pokémon cày cuốc nâng cấp chỉ số và mở khóa các mốc đột phá nội tại (Milestone Talents).
 */
G.Upgrades = (() => {
  const TREES = {
    offense: { id: 'offense', name: 'Tấn Công', nameEn: 'Offense', color: '#ef4444', icon: 'fist' },
    defense: { id: 'defense', name: 'Phòng Thủ', nameEn: 'Defense', color: '#38bdf8', icon: 'shield' },
    utility: { id: 'utility', name: 'Chiến Thuật', nameEn: 'Utility', color: '#10b981', icon: 'gear' }
  };

  const LIST = [
    // --- NHÁNH 1: TẤN CÔNG (OFFENSE) ---
    {
      id: 'atk', tree: 'offense', icon: 'fist',
      name: 'Kình Lực (Sức Mạnh)', nameEn: 'Strength',
      unit: '+3% sát thương toàn diện', unitEn: '+3% all damage',
      max: 25, base: 70, grow: 1.28,
      milestones: [
        { lvl: 10, name: 'Kình Lực Bộc Phá', nameEn: 'Fierce Pulse', desc: 'Đòn đánh có 12% cơ hội phóng ra sóng xung kích gây 60% sát thương nổ diện rộng.' },
        { lvl: 20, name: 'Sát Thần Uy Áp', nameEn: 'Overlord Aura', desc: 'Tăng vĩnh viễn +15% sát thương lên Boss và quái Tinh Anh.' }
      ]
    },
    {
      id: 'crit', tree: 'offense', icon: 'star',
      name: 'Tử Huyệt (Chí Mạng)', nameEn: 'Critical Strike',
      unit: '+1.5% tỉ lệ chí mạng', unitEn: '+1.5% crit rate',
      max: 20, base: 80, grow: 1.30,
      milestones: [
        { lvl: 10, name: 'Vết Cắt Sâu', nameEn: 'Deep Wounds', desc: 'Đòn chí mạng gây hiệu ứng Chảy Máu rút thêm 15% sát thương trong 3s.' },
        { lvl: 20, name: 'Tất Sát', nameEn: 'Fatal Execution', desc: 'Chí mạng có 20% cơ hội bỏ qua 100% giáp của kẻ địch.' }
      ]
    },
    {
      id: 'critMul', tree: 'offense', icon: 'witch',
      name: 'Bạo Kích (Sát Thương Chí Mạng)', nameEn: 'Critical Power',
      unit: '+4% sát thương khi chí mạng', unitEn: '+4% crit damage',
      max: 20, base: 90, grow: 1.32,
      milestones: [
        { lvl: 10, name: 'Bạo Nộ', nameEn: 'Savage Rage', desc: 'Mỗi cú chí mạng tăng thêm 5% tốc độ đánh trong 2s.' }
      ]
    },
    {
      id: 'pierce', tree: 'offense', icon: 'cursor',
      name: 'Xuyên Thấu (Bỏ Qua Giáp)', nameEn: 'Armor Pierce',
      unit: '+1.5% bỏ qua giáp & kháng phép quái', unitEn: '+1.5% armor pierce',
      max: 20, base: 85, grow: 1.30,
      milestones: [
        { lvl: 10, name: 'Phá Giáp Trụ', nameEn: 'Armor Breaker', desc: 'Đòn đánh làm giảm 10% phòng ngự của mục tiêu trong 4s.' }
      ]
    },
    {
      id: 'aoe', tree: 'offense', icon: 'cards',
      name: 'Khí Áp (Phạm Vi Kỹ Năng)', nameEn: 'AoE Range',
      unit: '+2% bán kính & vùng tác động của chiêu', unitEn: '+2% skill AoE range',
      max: 15, base: 90, grow: 1.32,
      milestones: [
        { lvl: 10, name: 'Thiên Địa Khí Trường', nameEn: 'Colossal Field', desc: 'Chiêu thức độc quyền tăng thêm 20% phạm vi sát thương.' }
      ]
    },

    // --- NHÁNH 2: PHÒNG THỦ & SINH LỰC (DEFENSE) ---
    {
      id: 'hp', tree: 'defense', icon: 'heart',
      name: 'Khí Huyết (Sinh Mệnh)', nameEn: 'Vitality',
      unit: '+12 Máu tối đa', unitEn: '+12 max HP',
      max: 25, base: 60, grow: 1.26,
      milestones: [
        { lvl: 10, name: 'Lá Chắn Bất Khuất', nameEn: 'Undying Shield', desc: 'Khi Máu tụt dưới 30%, lập tức nhận Khiên Năng Lượng bằng 25% Max HP trong 5s (hồi 60s).' },
        { lvl: 20, name: 'Tái Sinh Vô Tận', nameEn: 'Eternal Surge', desc: 'Mỗi 25 giây tự động hồi phục tức thì 8% Máu tối đa.' }
      ]
    },
    {
      id: 'def', tree: 'defense', icon: 'shield',
      name: 'Thiết Bích (Giáp Trụ)', nameEn: 'Defense',
      unit: '+1.5% giảm sát thương nhận vào', unitEn: '+1.5% damage reduction',
      max: 20, base: 75, grow: 1.28,
      milestones: [
        { lvl: 10, name: 'Thể Kim Cương', nameEn: 'Diamond Body', desc: 'Giảm thêm 15% sát thương từ tất cả các đòn đánh của Boss.' }
      ]
    },
    {
      id: 'regen', tree: 'defense', icon: 'sprout',
      name: 'Tức Sinh (Hồi Phục Tự Nhiên)', nameEn: 'Regeneration',
      unit: '+0.25 Máu hồi phục mỗi giây', unitEn: '+0.25 HP regen/sec',
      max: 15, base: 100, grow: 1.34,
      milestones: [
        { lvl: 10, name: 'Dưỡng Khí', nameEn: 'Meditation', desc: 'Khi đứng yên hoặc di chuyển chậm, tốc độ hồi máu tăng gấp đôi.' }
      ]
    },
    {
      id: 'lifesteal', tree: 'defense', icon: 'ball',
      name: 'Hấp Huyết (Hút Máu)', nameEn: 'Lifesteal',
      unit: '+0.3% hút máu theo sát thương gây ra', unitEn: '+0.3% lifesteal from damage',
      max: 15, base: 110, grow: 1.35,
      milestones: [
        { lvl: 10, name: 'Huyết Tế', nameEn: 'Blood Feast', desc: 'Hạ gục Boss hoặc quái Tinh Anh hồi phục ngay 10% Máu tối đa.' }
      ]
    },
    {
      id: 'tenacity', tree: 'defense', icon: 'boot',
      name: 'Kiên Cường (Kháng Khống Chế)', nameEn: 'Tenacity',
      unit: '+2% giảm thời gian bị làm chậm & khống chế', unitEn: '+2% CC & slow reduction',
      max: 15, base: 80, grow: 1.30,
      milestones: [
        { lvl: 10, name: 'Bất Động Thần Tâm', nameEn: 'Unstoppable Will', desc: 'Miễn nhiễm hoàn toàn với các hiệu ứng khống chế dưới 0.6s.' }
      ]
    },

    // --- NHÁNH 3: CHIẾN THUẬT & TIỆN ÍCH (UTILITY) ---
    {
      id: 'spd', tree: 'utility', icon: 'boot',
      name: 'Thần Hành (Nhanh Nhẹn)', nameEn: 'Agility',
      unit: '+2% tốc độ di chuyển', unitEn: '+2% move speed',
      max: 20, base: 65, grow: 1.28,
      milestones: [
        { lvl: 10, name: 'Tật Phong Bộ', nameEn: 'Gale Step', desc: 'Di chuyển liên tục 2.5s nhận thêm +15% tốc độ và né 1 đòn đánh kế tiếp.' }
      ]
    },
    {
      id: 'cd', tree: 'utility', icon: 'clock',
      name: 'Linh Hoạt (Hồi Chiêu)', nameEn: 'Cooldown Reduction',
      unit: '-1.5% thời gian hồi chiêu', unitEn: '-1.5% cooldown reduction',
      max: 20, base: 85, grow: 1.30,
      milestones: [
        { lvl: 10, name: 'Khai Hoa Hoàn Chiêu', nameEn: 'Instant Flow', desc: 'Mỗi lần tung chiêu có 8% cơ hội hồi chiêu ngay lập tức (0s Cooldown).' }
      ]
    },
    {
      id: 'magnet', tree: 'utility', icon: 'magnet',
      name: 'Từ Tính (Thu Gom Vật Phẩm)', nameEn: 'Magnet',
      unit: '+10% phạm vi nhặt vật phẩm', unitEn: '+10% pickup radius',
      max: 15, base: 50, grow: 1.28,
      milestones: [
        { lvl: 10, name: 'Đại Hút Vô Cực', nameEn: 'Vacuum Surge', desc: 'Mỗi 20 giây tự động hút toàn bộ ngọc kinh nghiệm trên màn hình.' }
      ]
    },
    {
      id: 'xp', tree: 'utility', icon: 'book',
      name: 'Ngộ Tính (Kinh Nghiệm)', nameEn: 'Wisdom (XP)',
      unit: '+4% kinh nghiệm nhận được', unitEn: '+4% XP gain',
      max: 15, base: 90, grow: 1.30,
      milestones: [
        { lvl: 10, name: 'Khai Ngộ Thần Tốc', nameEn: 'Awakened Spark', desc: 'Mỗi khi lên cấp nhận thêm +12% tốc độ di chuyển và +10% sát thương trong 5s.' }
      ]
    },
    {
      id: 'coins', tree: 'utility', icon: 'coin',
      name: 'Tài Phú (Tiền Vàng)', nameEn: 'Fortune (Coins)',
      unit: '+6% PokéCoins nhận được', unitEn: '+6% PokéCoins gain',
      max: 15, base: 100, grow: 1.32,
      milestones: [
        { lvl: 10, name: 'Vận May Thần Tài', nameEn: 'Golden Touch', desc: 'Nhặt vàng có 15% cơ hội nhân đôi số tiền nhận được.' }
      ]
    },
    {
      id: 'reroll', tree: 'utility', icon: 'up',
      name: 'Trùng Tu (Đổi Thẻ Chiêu)', nameEn: 'Card Rerolls',
      unit: '+1 lượt đổi thẻ khi lên cấp', unitEn: '+1 card reroll per run',
      max: 5, base: 160, grow: 1.5,
      milestones: []
    },
    {
      id: 'ban', tree: 'utility', icon: 'ban',
      name: 'Cấm Kỵ (Khóa Chiêu Thức)', nameEn: 'Move Ban',
      unit: 'Khóa 1 chiêu thức không mong muốn', unitEn: 'Ban 1 move from appearing',
      max: 3, base: 320, grow: 1.8,
      milestones: []
    },
    {
      id: 'moves', tree: 'utility', icon: 'cards',
      name: 'Song Đao (Bắt Đầu 2 Chiêu)', nameEn: 'Dual Start Moves',
      unit: 'Bắt đầu ván đấu với 2 chiêu thức', unitEn: 'Start run with 2 moves',
      max: 1, base: 1600, grow: 1,
      milestones: []
    },
    {
      id: 'start', tree: 'utility', icon: 'cursor',
      name: 'Khởi Đầu Tùy Chọn', nameEn: 'Pick Start Move',
      unit: 'Tự do chọn chiêu thức bắt đầu', unitEn: 'Freely pick starting move',
      max: 1, base: 450, grow: 1,
      milestones: []
    },
    {
      id: 'start2', tree: 'utility', icon: 'cursor',
      name: 'Khởi Đầu Thứ Hai', nameEn: 'Pick 2nd Start Move',
      unit: 'Tự do chọn chiêu khởi đầu thứ 2 (cần Song Đao)', unitEn: 'Pick 2nd starting move (requires Dual)',
      max: 1, base: 450, grow: 1, needs: 'moves',
      milestones: []
    }
  ];

  const BY = {};
  for (const u of LIST) BY[u.id] = u;

  function cost(id, lvl) {
    const u = BY[id];
    if (!u) return 100;
    return Math.round(u.base * Math.pow(u.grow, lvl) / 10) * 10;
  }

  function totalSpentOnMon(levels = {}) {
    let total = 0;
    for (const id in levels) {
      const u = BY[id];
      if (!u) continue;
      const curLvl = Math.min(u.max, Math.floor(+levels[id] || 0));
      for (let l = 0; l < curLvl; l++) {
        total += cost(id, l);
      }
    }
    return total;
  }

  /** Chuyển đổi toàn bộ levels đã mua thành chỉ số Perks và Mốc Đột Phá cho G.Player */
  function perks(levels = {}) {
    const L = id => (BY[id] ? Math.max(0, Math.min(BY[id].max, Math.floor(+levels[id] || 0))) : 0);

    const mPerks = {
      fiercePulse: L('atk') >= 10,
      overlordAura: L('atk') >= 20,
      deepWounds: L('crit') >= 10,
      fatalExecution: L('crit') >= 20,
      savageRage: L('critMul') >= 10,
      armorBreaker: L('pierce') >= 10,
      colossalField: L('aoe') >= 10,
      undyingShield: L('hp') >= 10,
      eternalSurge: L('hp') >= 20,
      diamondBody: L('def') >= 10,
      meditation: L('regen') >= 10,
      bloodFeast: L('lifesteal') >= 10,
      unstoppableWill: L('tenacity') >= 10,
      galeStep: L('spd') >= 10,
      instantFlow: L('cd') >= 10,
      vacuumSurge: L('magnet') >= 10,
      awakenedSpark: L('xp') >= 10,
      goldenTouch: L('coins') >= 10
    };

    return {
      hp: L('hp') * 12,
      atkMul: 1 + L('atk') * 0.03,
      spdMul: 1 + L('spd') * 0.02,
      cdMul: Math.max(0.40, 1 - L('cd') * 0.015),
      dmgReduce: Math.min(0.65, L('def') * 0.015),
      regen: L('regen') * 0.25,
      magnetMul: 1 + L('magnet') * 0.10,
      xpMul: 1 + L('xp') * 0.04,
      coinMul: 1 + L('coins') * 0.06,
      startMoves: 1 + L('moves'),
      crit: L('crit') * 0.015,
      critMul: 1.5 + L('critMul') * 0.04,
      pierce: L('pierce') * 0.015,
      aoeMul: 1 + L('aoe') * 0.02,
      lifesteal: L('lifesteal') * 0.003,
      tenacity: L('tenacity') * 0.025,
      rerolls: L('reroll'),
      bans: L('ban'),
      milestones: mPerks
    };
  }

  return { TREES, LIST, BY, cost, perks, totalSpentOnMon };
})();
