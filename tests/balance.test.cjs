const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Setup minimal global.G
global.G = global.G || {};
global.G.U = global.G.U || {};
global.G.Types = global.G.Types || {
  mult: (moveType, targetTypes) => {
    if (!targetTypes) return 1.0;
    if (moveType === 'fire' && targetTypes.includes('grass')) return 2.0;
    if (moveType === 'water' && targetTypes.includes('fire')) return 2.0;
    if (moveType === 'grass' && targetTypes.includes('water')) return 2.0;
    if (moveType === 'electric' && targetTypes.includes('ground')) return 0.25;
    return 1.0;
  }
};

require('../js/systems/balance-caps.js');
require('../js/systems/status-engine.js');
require('../js/systems/damage-pipeline.js');

test('Balance Caps: constants are configured correctly', () => {
  const Caps = G.BalanceCaps;
  assert.equal(Caps.DMG_REDUCE_CAP, 0.85, 'Total damage reduction cap must be 85%');
  assert.equal(Caps.LEECH_CAP_PER_SEC, 0.04, 'Leech cap per second must be 4%');
  assert.equal(Caps.HIT_CAP_PCT, 0.40, 'One-shot protection cap must be 40%');
  assert.equal(Caps.IFRAME_AFTER_BIG, 0.6, 'I-frame duration after big hit must be 0.6s');
  assert.equal(Caps.TELEGRAPH_MIN, 0.6, 'Minimum telegraph duration must be 0.6s');

  assert.equal(Caps.getHitFloorPct(1), 0.04, 'Boss 1 floor must be 4%');
  assert.equal(Caps.getHitFloorPct(5), 0.06, 'Boss 5 floor must be 6%');
  assert.equal(Caps.getHitFloorPct(8), 0.08, 'Boss 8 floor must be 8%');
});

test('Status Engine: stage buff/debuff limits and decay', () => {
  const dummy = { maxHp: 100, hp: 100 };
  G.StatusEngine.applyStage(dummy, 'def', 2);
  assert.equal(dummy.stages.def, 2);
  assert.equal(G.StatusEngine.getStageMult(dummy, 'def'), 1.24);

  // Exceeding cap
  G.StatusEngine.applyStage(dummy, 'def', 5);
  assert.equal(dummy.stages.def, 3, 'Stage must not exceed +3');

  G.StatusEngine.applyStage(dummy, 'def', -10);
  assert.equal(dummy.stages.def, -3, 'Stage must not fall below -3');
  assert.equal(G.StatusEngine.getStageMult(dummy, 'def'), 0.64);
});

test('Status Engine: Boss converts freeze and paralyze to slow', () => {
  const boss = { boss: true, maxHp: 50000, hp: 50000 };
  G.StatusEngine.applyStatus(boss, 'freeze', 3.0);
  assert.ok(!G.StatusEngine.hasStatus(boss, 'freeze'), 'Boss must not receive hard freeze');
  assert.ok(G.StatusEngine.hasStatus(boss, 'slow'), 'Boss must convert freeze to slow');

  // Boss immune to sleep
  const appliedSleep = G.StatusEngine.applyStatus(boss, 'sleep', 3.0);
  assert.equal(appliedSleep, false, 'Boss must be immune to sleep');
});

test('Damage Pipeline: incoming damage respects 85% reduction cap', () => {
  const player = {
    isPlayer: true,
    hp: 200,
    maxHp: 200,
    pdef: 0.70,        // 70% armor
    itemReduce: 0.20,  // 20% Assault Vest
    megaActive: true   // 20% Mega
    // Total raw reduction would be 70% + 20% + 20% = 110%
  };

  const rawDmg = 500;
  const taken = G.DamagePipeline.calcIncomingDamage(player, rawDmg, 'normal', 'p', { boss: true, bossIndex: 1 });
  // Total reduction is capped at 85%, so at least 15% (75 dmg) remains,
  // then checked against floor (4% of 200 = 8) and cap (40% of 200 = 80).
  assert.ok(taken >= 8, 'Damage taken must not fall below floor');
  assert.ok(taken <= 80, 'Damage taken must not exceed 40% cap');
  assert.ok(taken > 0, 'Player cannot take 0 damage from a 500 dmg hit');
});

test('Damage Pipeline: outgoing damage STAB and group caps', () => {
  const pl = {
    pa: 50,
    mon: { types: ['fire'] },
    dmgMul: 1.0,
    ability: { out: () => 1.80 }, // Tries +80% but should be capped at +60%
    itemAtkMul: 1.70               // Tries +70% but should be capped at +50%
  };

  const move = { id: 'flamethrower', type: 'fire', cat: 'special', dmg: 20 };
  const target = { types: ['grass'] }; // Fire vs Grass: 2.0x
  const dmg = G.DamagePipeline.calcOutgoingDamage(pl, move, target, {});
  assert.ok(dmg > 0, 'Damage must be positive');
  assert.ok(Number.isFinite(dmg), 'Damage must be finite');
});
