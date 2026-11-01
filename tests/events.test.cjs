const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Setup minimal global.G
global.G = global.G || {};
global.G.U = global.G.U || {
  pick: (arr) => arr ? arr[0] : null,
  clamp: (v, min, max) => Math.min(max, Math.max(min, v)),
  rand: (a, b) => (a + b) / 2
};
global.G.Types = global.G.Types || {
  mult: (moveType, targetTypes) => {
    if (!targetTypes) return 1.0;
    if (moveType === 'water' && targetTypes.includes('fire')) return 2.0;
    if (moveType === 'fire' && targetTypes.includes('grass')) return 2.0;
    if (moveType === 'normal' && targetTypes.includes('steel')) return 0.5;
    return 1.0;
  }
};
global.G.FX = global.G.FX || {
  dmgText: () => {},
  burst: () => {},
  ring: () => {}
};
global.G.Audio = global.G.Audio || {
  sfx: () => {}
};

require('../js/net/codec.js');
require('../js/systems/director.js');
require('../js/systems/world-events.js');
require('../js/data/items.js');

test('Network: 0x07 EVENT_WORLD binary codec encodes and decodes all ops and payloads', () => {
  const Codec = G.NetCodec;
  assert.ok(Codec.encodeWorldEvent, 'Codec must provide encodeWorldEvent');
  assert.ok(Codec.decodeWorldEvent, 'Codec must provide decodeWorldEvent');

  const ops = [Codec.OP.START, Codec.OP.UPDATE, Codec.OP.END, Codec.OP.SPAWN, Codec.OP.DESPAWN];
  for (const op of ops) {
    const payload = {
      x: 120.5,
      y: -85.25,
      radius: 300,
      name: 'MonsterHouse',
      mobs: [1, 2, 3]
    };
    const encoded = Codec.encodeWorldEvent(42, op, payload);
    assert.ok(encoded instanceof ArrayBuffer, 'Encoded packet must be an ArrayBuffer');

    const decoded = Codec.decodeWorldEvent(encoded);
    assert.equal(decoded.tag, 'EVENT_WORLD');
    assert.equal(decoded.type, 0x07);
    assert.equal(decoded.eventId, 42);
    assert.equal(decoded.op, op);
    assert.equal(decoded.payload.name, 'MonsterHouse');
    assert.equal(decoded.payload.radius, 300);
    assert.equal(decoded.payload.x, 120.5);
    assert.equal(decoded.payload.y, -85.25);
    assert.deepEqual(decoded.payload.mobs, [1, 2, 3]);
  }
});

test('Network: 0x07 EVENT_WORLD rejects truncated packets and invalid tags', () => {
  const Codec = G.NetCodec;
  const encoded = Codec.encodeWorldEvent(10, Codec.OP.START, { ok: true });
  const bytes = new Uint8Array(encoded);

  // Truncated packet
  assert.throws(() => Codec.decodeWorldEvent(bytes.slice(0, 4).buffer));

  // Invalid tag (e.g. tag is 0x08 instead of 0x07)
  const corrupt = new Uint8Array(bytes);
  corrupt[3] = 0x08;
  assert.throws(() => Codec.decodeWorldEvent(corrupt.buffer));
});

test('Event Director: Major Event Exclusivity and Breathing Window', () => {
  const Director = G.Director;
  Director.reset();

  assert.equal(Director.canStartMajorEvent(), true, 'Should be able to start major event initially');

  // Start event 1
  const started = Director.startMajorEvent('monster_house');
  assert.equal(started, true);
  assert.equal(Director.activeMajorEvent, 'monster_house');

  // Attempt to start a concurrent major event
  const concurrent = Director.startMajorEvent('rift_portal');
  assert.equal(concurrent, false, 'Director must not allow two major events simultaneously');

  // End event 1
  Director.endMajorEvent('monster_house');
  assert.equal(Director.activeMajorEvent, null);
  assert.equal(Director.canStartMajorEvent(), true);

  // Boss kill triggers 20s breathing window
  Director.onBossKill();
  assert.equal(Director.isBreathingWindow(), true);
  assert.ok(Director.breathingTimer >= 19.9);
  assert.equal(Director.canStartMajorEvent(), false, 'Major events forbidden during breathing window');
});

test('World Events: Day / Night and Global Weather cycle calculation', () => {
  const WE = G.WorldEvents;
  WE.reset();

  // 0 - 6 min: Day
  assert.equal(WE.getDayNightCycle(120).phase, 'day');
  // 6 - 12 min: Dusk
  assert.equal(WE.getDayNightCycle(400).phase, 'dusk');
  // 12 - 18 min: Night (+20% Ghost/Dark spawn bonus)
  const night = WE.getDayNightCycle(800);
  assert.equal(night.phase, 'night');
  assert.equal(night.darkGhostBonus, 0.20);
  // 18 - 24 min: Storm (+20% Elec/Water damage)
  const storm = WE.getDayNightCycle(1200);
  assert.equal(storm.phase, 'storm');
  assert.equal(storm.elecWaterBonus, 0.20);
  // 24 - 30 min: Void
  assert.equal(WE.getDayNightCycle(1600).phase, 'void');
});

test('World Events: In-Run Bounty Contracts lifecycle', () => {
  const WE = G.WorldEvents;
  WE.reset();
  WE.initContracts();

  const c = WE.activeContract;
  assert.ok(c, 'Contract must be active');
  assert.equal(c.completed, false);

  // Record progress
  WE.recordProgress('kill', 100);
  assert.equal(c.current, 100);
  assert.equal(c.completed, false);

  WE.recordProgress('kill', 150);
  assert.equal(c.completed, true, 'Contract should complete when target reached');
});

test('World Events: Tera Shield application and elemental barrier absorption', () => {
  const WE = G.WorldEvents;
  WE.reset();

  const mockBoss = {
    boss: true,
    maxHp: 10000,
    hp: 8000,
    r: 30,
    x: 100,
    y: 100
  };

  WE.applyTeraShield(mockBoss);
  assert.equal(mockBoss.teraShield, true);
  assert.ok(mockBoss.teraType);
  assert.equal(mockBoss.shield, 3000, 'Tera Shield barrier must be 30% of max HP');
});

test('World Events: Distortion Realm (Thế Giới Đảo Lộn) endless scaling', () => {
  const WE = G.WorldEvents;
  WE.reset();
  G.Director.reset();

  assert.equal(WE.isDistortionRealm, false);
  WE.enterDistortionRealm();
  assert.equal(WE.isDistortionRealm, true);

  // Update 65 seconds in Distortion Realm -> 1 entropy cycle (+15% stats)
  WE.update(65, [{ x: 0, y: 0, dead: false }], 1865);
  assert.equal(G.Director.distortionScale, 1.15, 'Entropy must scale mob stats by +15% per 60s in Distortion Realm');
});

test('Held Items: Choice Band, Leftovers, Life Orb, Keystone adjustments', () => {
  const items = G.Items.BY;
  assert.ok(items.choiceband);
  assert.ok(items.leftovers);
  assert.ok(items.lifeorb);
  assert.ok(items.keystone);
  assert.ok(items.deepseascale);

  // Choice Band +30% atk
  const dummy = { atkMul: 1.0 };
  items.choiceband.on(dummy);
  assert.ok(Math.abs(dummy.atkMul - 1.30) < 0.001);
  assert.equal(dummy.choiceBandLocked, true);
  items.choiceband.off(dummy);
  assert.ok(Math.abs(dummy.atkMul - 1.0) < 0.001);

  // Keystone: 50% stat bonus before Lv30, 100% at Lv30+
  const earlyPl = { level: 15, atkMul: 1.0, spdMul: 1.0 };
  items.keystone.on(earlyPl);
  assert.ok(Math.abs(earlyPl.atkMul - 1.05) < 0.001, 'Keystone must grant 5% before Lv30');

  const maturePl = { level: 30, atkMul: 1.0, spdMul: 1.0 };
  items.keystone.on(maturePl);
  assert.ok(Math.abs(maturePl.atkMul - 1.10) < 0.001, 'Keystone must grant 10% at Lv30+');

  // Life Orb +10% crit
  const orbPl = { atkMul: 1.0, critChance: 0 };
  items.lifeorb.on(orbPl);
  assert.equal(orbPl.critChance, 0.10);
});
