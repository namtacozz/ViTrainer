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
    steel: 'Acero',
    dragon: 'Dragón',
    fairy: 'Hada',
    ground: 'Tierra',
    dark: 'Siniestro',
    psychic: 'Psíquico',
    rock: 'Roca',
    ghost: 'Fantasma',
    poison: 'Veneno',
    flying: 'Volador',
    fighting: 'Lucha',
    bug: 'Bicho'
  }
};
global.G.Weather = { current: { kind: 'sun' } };

require('../js/data/abilities.js');
require('../js/data/ability-fx.js');
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

test('Ability Overhaul: 100% of dex abilities have active mechanics with zero generic fallbacks', () => {
  const allAbils = new Set();
  for (const dex in G.DEX_ABIL) {
    const row = G.DEX_ABIL[dex];
    row.forEach(id => {
      if (typeof id === 'string' && id) allAbils.add(id);
    });
  }

  assert.ok(allAbils.size >= 270, `Expected at least 270 unique abilities, found ${allAbils.size}`);

  const genericList = [];
  for (const a of allAbils) {
    const fx = G.AbilityFX.of(a, { types: ['normal'] });
    assert.ok(fx, `Ability ${a} must resolve to an effect object`);
    assert.ok(fx.d && fx.d.length > 5, `Ability ${a} must have a valid description string`);
    if (fx.generic) {
      genericList.push(a);
    }
  }

  assert.equal(genericList.length, 0, `All canonical abilities must have dedicated effects! Found generic: ${genericList.join(', ')}`);
});

test('Ability Overhaul: Iconic and Legendary mechanics are configured correctly', () => {
  const disguise = G.AbilityFX.of('disguise', { types: ['ghost', 'fairy'] });
  assert.equal(disguise.disguise, true);

  const hadron = G.AbilityFX.of('hadron-engine', { types: ['electric', 'dragon'] });
  assert.equal(hadron.electricSurge, true);

  const dmaw = G.AbilityFX.of('dragons-maw', { types: ['dragon'] });
  assert.equal(dmaw.dragonsMawBurst, true);
  assert.equal(dmaw.out({}, { type: 'dragon' }), 1.45);

  const transistor = G.AbilityFX.of('transistor', { types: ['electric'] });
  assert.equal(transistor.transistorLightning, true);
  assert.equal(transistor.out({}, { type: 'electric' }), 1.45);

  const chill = G.AbilityFX.of('chilling-neigh', { types: ['ice'] });
  assert.equal(chill.chillingNeigh, true);

  const grim = G.AbilityFX.of('grim-neigh', { types: ['ghost'] });
  assert.equal(grim.grimNeigh, true);

  const beast = G.AbilityFX.of('beast-boost', { types: ['rock', 'poison'] });
  assert.equal(beast.beastBoost, true);
});
