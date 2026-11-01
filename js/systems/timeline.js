/* ============ timeline.js — Barra de progreso continua y línea temporal de la partida ============
 * Proyecta de forma infinita los eventos venideros (jefes, grietas, eventos de run)
 * y los sincroniza para todos los jugadores en cooperativo.
 */
G.Timeline = (() => {
  // Intervalos base en segundos
  const BOSS_INTERVAL = 180;       // Cada 3 min un jefe
  const RIFT_START = 90;           // Primera grieta a los 1:30
  const RIFT_INTERVAL = 240;       // Grieta cada 4 min
  const RIFT_TTL = 45;             // Cổng Rift tồn tại 45s
  const EVENT_START = 190;         // Primer evento secuencial a los 3:10 (sau khi Rift 1 đóng)
  const EVENT_INTERVAL = 180;      // Eventos secuenciales cada 3 min

  const EVENT_TYPES = ['zone', 'scavenger', 'pursuit'];

  function reset() {}

  /** Kiểm tra xem thời điểm t có rơi vào vùng chặn của Rift không: 60s trước khi mở và 30s sau khi đóng */
  function isRiftBlocked(t) {
    let riftT = RIFT_START;
    while (riftT <= t + 120) {
      if (t >= riftT - 60 && t <= riftT + RIFT_TTL + 30) return true;
      riftT += RIFT_INTERVAL;
    }
    return false;
  }

  function getRiftTimes(fromT = 0, toT = 3600) {
    const list = [];
    let rt = RIFT_START;
    while (rt <= toT) {
      if (rt >= fromT) list.push(rt);
      rt += RIFT_INTERVAL;
    }
    return list;
  }

  /**
   * Devuelve los eventos dentro de la ventana de tiempo [time - 10, time + windowSecs].
   * Se genera de forma infinita y matemática para que nunca se acabe.
   */
  function getUpcoming(currentTime, windowSecs = 140) {
    const fromT = Math.max(0, currentTime - 12);
    const toT = currentTime + windowSecs;
    const events = [];

    // 1. Jefes (Bosses) cada 180 s
    const firstBossIdx = Math.max(1, Math.floor(fromT / BOSS_INTERVAL));
    const lastBossIdx = Math.floor(toT / BOSS_INTERVAL) + 1;
    for (let i = firstBossIdx; i <= lastBossIdx; i++) {
      const t = i * BOSS_INTERVAL;
      if (t >= fromT && t <= toT) {
        events.push({
          id: 'boss_' + i,
          type: 'boss',
          time: t,
          title: G.T('Jefe') + ' Nv.' + i,
          label: 'BOSS'
        });
      }
    }

    // 2. Grietas (Rifts)
    let riftT = RIFT_START;
    let riftIdx = 1;
    while (riftT <= toT + RIFT_INTERVAL) {
      if (riftT >= fromT && riftT <= toT && (!G.Judgment || riftT < G.Judgment.AT - 120)) {
        events.push({
          id: 'rift_' + riftIdx,
          type: 'rift',
          time: riftT,
          title: G.T('Grieta'),
          label: 'RIFT'
        });
      }
      riftT += RIFT_INTERVAL;
      riftIdx++;
    }

    // 3. Eventos secuenciales (Toma de zona, búsqueda, supervivencia)
    // CHẶN mọi sự kiện xuất hiện 60s trước khi cổng Rift mở và 30s sau khi Rift đóng
    let evT = EVENT_START;
    let evIdx = 0;
    while (evT <= toT + EVENT_INTERVAL) {
      if (evT >= fromT && evT <= toT && !isRiftBlocked(evT)) {
        const evType = EVENT_TYPES[evIdx % EVENT_TYPES.length];
        const titles = {
          zone: G.T('Toma de Zona'),
          scavenger: G.T('Búsqueda de Cristales'),
          pursuit: G.T('Supervivencia Extrema')
        };
        const labels = {
          zone: 'ZONE',
          scavenger: 'RELIQUIA',
          pursuit: 'HUIDA'
        };
        events.push({
          id: 'seq_' + evIdx,
          type: 'event_' + evType,
          evType: evType,
          time: evT,
          title: titles[evType] || 'Evento',
          label: labels[evType] || 'EVENT'
        });
      }
      evT += EVENT_INTERVAL;
      evIdx++;
    }

    // 4. Sentencia de Arceus (minuto 30)
    const judgeT = (G.Judgment && G.Judgment.AT) ? G.Judgment.AT : 1800;
    if (judgeT >= fromT && judgeT <= toT) {
      events.push({
        id: 'judgment',
        type: 'judgment',
        time: judgeT,
        title: G.T('Sentencia'),
        label: 'ARCEUS'
      });
    }

    // Ordenar cronológicamente
    events.sort((a, b) => a.time - b.time);
    return events;
  }

  return {
    reset,
    getUpcoming,
    isRiftBlocked,
    getRiftTimes,
    RIFT_START,
    RIFT_INTERVAL,
    EVENT_TYPES
  };
})();
