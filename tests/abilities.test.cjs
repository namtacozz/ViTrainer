const { test } = require('node:test');
const assert = require('node:assert/strict');

// Setup minimal global.G
global.G = global.G || {};
global.G.U = global.G.U || {
  TYPE_NAME: {
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    ice: 'Hielo',
    normal: 'Normal',
    steel: 'Acero'
  }
};
global.G.Weather = { current: { kind: 'sun' } };

require('../js/data/ability-families.js');

test('Ability Families: all 16 families have validate and build', () => {
  const F = G.AbilityFamilies;
  const list = [
    'pinch', 'absorb', 'typeBoost', 'typeConvert', 'weatherSpeed', 'weatherSummon',
    'statusReact', 'contactTrigger', 'killStack', 'statStack', 'critBoost',
    'statusImmune', 'regen', 'auraDebuff', 'multiHit', 'defReduceBy'
  ];

  for (const name of list) {
    assert.ok(F.FAMILIES[name], `Family ${name} must be defined`);
    assert.equal(typeof F.FAMILIES[name].validate, 'function', `Family ${name} must have validate`);
    assert.equal(typeof F.FAMILIES[name].build, 'function', `Family ${name} must have build`);
  }
});

test('Ability Families: pinch family builds valid hook', () => {
  const F = G.AbilityFamilies;
  assert.equal(F.validate('pinch', { type: 'fire', mult: 1.35 }), true);
  assert.equal(F.validate('pinch', { type: 'fire' }), false);

  const blaze = F.build('pinch', { type: 'fire', mult: 1.35 });
  assert.ok(blaze.out, 'Blaze must have out hook');

  const plLow = { hp: 20, maxHp: 100 };
  const plFull = { hp: 100, maxHp: 100 };
  const moveFire = { type: 'fire' };
  const moveWater = { type: 'water' };

  assert.equal(blaze.out(plLow, moveFire), 1.35, 'Low HP fire move gets 1.35x');
  assert.equal(blaze.out(plFull, moveFire), 1, 'Full HP fire move gets 1x');
  assert.equal(blaze.out(plLow, moveWater), 1, 'Low HP water move gets 1x');
});

test('Ability Families: typeConvert builds valid convertType hook', () => {
  const F = G.AbilityFamilies;
  const pixilate = F.build('typeConvert', { toType: 'fairy', mult: 1.25 });
  assert.equal(pixilate.convertType, 'fairy');
  assert.equal(pixilate.out({}, { type: 'normal' }), 1.25);
  assert.equal(pixilate.out({}, { type: 'fairy' }), 1.25);
  assert.equal(pixilate.out({}, { type: 'water' }), 1);
});
