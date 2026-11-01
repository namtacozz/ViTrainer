const { test } = require('node:test');
const assert = require('node:assert/strict');

global.G = global.G || {};
require('../js/systems/status-engine.js');
require('../js/data/move-traits.js');
require('../js/data/reactions.js');

test('Move Traits: canon traits are configured for iconic moves', () => {
  const T = G.MoveTraits;
  const solar = T.getTrait('solar-beam');
  assert.ok(solar, 'Solar Beam trait must exist');
  assert.equal(solar.delivery, 'charge_beam');
  assert.equal(solar.instantUnderWeather, 'sun');

  const hyper = T.getTrait('hyper-beam');
  assert.ok(hyper, 'Hyper Beam trait must exist');
  assert.equal(hyper.rechargeDelay, 0.8);

  const freezeDry = T.getTrait('freeze-dry');
  assert.ok(freezeDry.waterSuperEffective);
});

test('Reactions: all 6 reactions can trigger on valid condition', () => {
  const R = G.Reactions;
  assert.ok(R.REACTIONS.conductive);
  assert.ok(R.REACTIONS.deep_freeze);
  assert.ok(R.REACTIONS.wildfire);
  assert.ok(R.REACTIONS.melt);
  assert.ok(R.REACTIONS.glassify);
  assert.ok(R.REACTIONS.vapor_explosion);

  // Test conductive trigger
  const wetTarget = { x: 100, y: 100, hurt: () => {} };
  G.StatusEngine.applyStatus(wetTarget, 'wet', 4.0);
  const res = R.checkAndTrigger('electric', wetTarget, 50, {});
  assert.ok(res.bonusMult > 1.0, 'Conductive must provide bonus multiplier');
});
