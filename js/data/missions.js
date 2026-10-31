/* ============ missions.js — plantillas de misiones diarias y semanales ============
 * Cada día salen 3 diarias y cada semana 2 semanales (hora de España), con
 * objetivos y tipos sorteados. Se completan jugando y el premio se recoge en
 * la pantalla de Misiones. La lógica está en systems/progress.js.
 *
 *   ev      evento que la hace avanzar (ver G.Progress.event)
 *   match   (datos, parámetro) -> ¿cuenta este evento?
 *   value   datos -> cuánto vale; con mode 'max' se queda el mayor, con
 *           'add' (por defecto) se suma (1 si no hay value)
 *   param   'type': sortea un tipo Pokémon para la misión
 */
G.MissionDefs = (() => {
  const T = t => G.U.TYPE_NAME[t];
  const min = d => Math.floor(d.time / 60);

  const daily = [
    { id: 'kill', ev: 'kill', goals: [300, 500, 800], reward: { t1: 2, coins: 150 },
      text: n => `Derrota a ${n} Pokémon` },
    { id: 'killType', ev: 'kill', param: 'type', goals: [30, 50, 80], reward: { t1: 2, coins: 200 },
      match: (d, t) => d.types.includes(t), text: (n, t) => `Derrota a ${n} Pokémon de tipo ${T(t)}` },
    { id: 'survive', ev: 'runEnd', mode: 'max', value: min, goals: [5, 7, 9], reward: { t1: 3, coins: 200 },
      text: n => `Aguanta ${n} minutos en una run` },
    { id: 'level', ev: 'runEnd', mode: 'max', value: d => d.level, goals: [8, 12, 15], reward: { t1: 2, coins: 200 },
      text: n => `Llega al nivel ${n} en una run` },
    { id: 'boss', ev: 'kill', match: d => d.boss, goals: [1, 2], reward: { t1: 3, coins: 250 },
      text: n => (n === 1 ? 'Derrota a un jefe' : `Derrota a ${n} jefes`) },
    { id: 'chest', ev: 'chest', goals: [1, 2], reward: { t1: 2, coins: 200 },
      text: n => (n === 1 ? 'Abre un cofre con candado' : `Abre ${n} cofres con candado`) },
    { id: 'coins', ev: 'runEnd', value: d => d.coins, goals: [100, 200, 300], reward: { t1: 2, coins: 150 },
      text: n => `Recoge ${n} monedas en tus runs` },
    { id: 'playType', ev: 'runEnd', param: 'type', mode: 'max', value: min, goals: [3], reward: { t1: 3, coins: 200 },
      match: (d, t) => d.types.includes(t), text: (n, t) => `Aguanta ${n} minutos con un Pokémon de tipo ${T(t)}` },
    { id: 'item', ev: 'item', goals: [1], reward: { t1: 2, coins: 150 },
      text: () => 'Encuentra un objeto equipable' },
    { id: 'evolve', ev: 'evolve', goals: [1], reward: { t1: 3, coins: 250 },
      text: () => 'Evoluciona un movimiento' },
    { id: 'mega', ev: 'mega', goals: [1, 2], reward: { t1: 3, coins: 250 },
      text: n => (n === 1 ? 'Activa una Mega Evolución' : `Activa ${n} Mega Evoluciones`) },
    { id: 'dodge', ev: 'dodge', goals: [30, 50], reward: { t1: 2, coins: 200 },
      text: n => `Esquiva ${n} ataques de peligro` },
    { id: 'trees', ev: 'trees', goals: [10, 20], reward: { t1: 2, coins: 150 },
      text: n => `Derriba ${n} árboles con tus ataques` },
    { id: 'evoMulti', ev: 'evo_plus', goals: [1, 2], reward: { t1: 3, coins: 300 },
      text: n => (n === 1 ? 'Mejora un movimiento a nivel +' : `Mejora ${n} movimientos a nivel + o superior`) },
    { id: 'legendKill', ev: 'kill', match: d => d.legend, goals: [1], reward: { t1: 4, coins: 350 },
      text: () => 'Derrota a un Pokémon Legendario en una grieta' },
    { id: 'coopPlay', ev: 'runEnd', match: d => d.group, goals: [1], reward: { t1: 3, coins: 250 },
      text: () => 'Juega una partida en cooperativo' },
    { id: 'inrunEvent', ev: 'inrun_event', goals: [1, 2], reward: { t1: 3, coins: 250 },
      text: n => (n === 1 ? 'Completa un evento en partida' : 'Completa ' + n + ' eventos en partida') },
    { id: 'runEvo', ev: 'run_evo', goals: [1, 2], reward: { t1: 3, coins: 250 },
      text: n => (n === 1 ? 'Evoluciona a tu Pokémon en partida' : 'Evoluciona ' + n + ' veces a tu Pokémon en partida') },
    { id: 'candies', ev: 'candy', goals: [30, 60], reward: { t1: 2, coins: 200 },
      text: n => 'Recoge ' + n + ' caramelos en tus partidas' },
    { id: 'damageRun', ev: 'runEnd', value: d => d.dmg || 0, goals: [30000, 60000], reward: { t1: 3, coins: 250 },
      text: n => 'Inflige ' + n.toLocaleString('es') + ' de daño en una run' }
  ];

  const weekly = [
    { id: 'wkill', ev: 'kill', goals: [4000, 6000], reward: { t10: 1, coins: 800 },
      text: n => `Derrota a ${n.toLocaleString('es')} Pokémon` },
    { id: 'wrift', ev: 'rift', goals: [1, 2], reward: { t10: 1, coins: 1000 },
      text: n => (n === 1 ? 'Gana una pelea en una grieta' : `Gana ${n} peleas en grietas`) },
    { id: 'wboss', ev: 'kill', match: d => d.boss, goals: [4, 6], reward: { t10: 1, coins: 900 },
      text: n => `Derrota a ${n} jefes` },
    { id: 'wsurvive', ev: 'runEnd', mode: 'max', value: min, goals: [12, 15], reward: { t10: 1, coins: 1000 },
      text: n => `Aguanta ${n} minutos en una run` },
    { id: 'wevolve', ev: 'evolve', goals: [3, 5], reward: { t10: 1, coins: 900 },
      text: n => `Evoluciona ${n} movimientos` },
    { id: 'wdaily', ev: 'missionDone', match: d => d.daily, goals: [8, 12], reward: { t10: 1, coins: 800 },
      text: n => `Completa ${n} misiones diarias` },
    { id: 'wmega', ev: 'mega', goals: [5, 8], reward: { t10: 1, coins: 1000 },
      text: n => `Activa ${n} Mega Evoluciones en tus runs` },
    { id: 'wtrees', ev: 'trees', goals: [50, 80], reward: { t10: 1, coins: 800 },
      text: n => `Derriba ${n} árboles en total` },
    { id: 'wevoPlus', ev: 'evo_plus', match: d => d.tier >= 2, goals: [3, 5], reward: { t10: 1, coins: 1200 },
      text: n => `Alcanza el nivel ++ o +++ en ${n} movimientos` },
    { id: 'wmaster', ev: 'kill', match: d => d.legend, goals: [4, 6], reward: { t10: 2, coins: 1500 },
      text: n => `Derrota a ${n} Pokémon Legendarios` },
    { id: 'wjudge', ev: 'judge', goals: [1, 2], reward: { t10: 1, coins: 1200 },
      text: n => (n === 1 ? 'Llega a la Sentencia de Arceus (minuto 30)' : `Llega ${n} veces a la Sentencia de Arceus`) },
    { id: 'wcoop', ev: 'runEnd', match: d => d.group, goals: [3, 5], reward: { t10: 1, coins: 1000 },
      text: n => `Juega ${n} partidas en cooperativo con amigos` }
  ];

  const BY = {};
  for (const m of daily.concat(weekly)) BY[m.id] = m;

  return { daily, weekly, BY };
})();
