/* ============ abilities-ext.js — Kho 28+ Ability Đặc Trưng Định Hình Lối Chơi ============
 * Cung cấp cơ chế kỹ năng riêng biệt cho các Pokémon biểu tượng chuẩn Canon,
 * biến Ability thành một luật chơi và phong cách chiến đấu thực thụ.
 */
var G = (typeof window !== 'undefined' ? window.G : (typeof global !== 'undefined' ? global.G : null)) || {};
if (typeof window !== 'undefined') window.G = G;
if (typeof global !== 'undefined') global.G = G;

G.AbilitiesExt = (() => {
  const TN = t => (G.U && G.U.TYPE_NAME && G.U.TYPE_NAME[t]) ? G.U.TYPE_NAME[t] : t;
  const wx = () => (G.Weather && G.Weather.current ? G.Weather.current.kind : null);

  const EXT = {
    // 1. Intimidate (Arcanine, Gyarados): Aura 260px giảm 20% sát thương quái thường; giảm 15% sát thương Boss trong 8s mỗi 20s
    'intimidate': {
      d: 'Aura 260 px: los enemigos normales causan un 20 % menos de daño. Contra jefes: -15 % de daño durante 8 s cada 20 s.',
      tick: (pl, dt) => {
        pl.intimidateTimer = (pl.intimidateTimer || 0) + dt;
        if (pl.intimidateTimer >= 0.25) {
          pl.intimidateTimer = 0;
          if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
            const foes = G.EnemyMgr.queryCircle(pl.x, pl.y, 260);
            for (const f of foes) {
              if (!f.boss) {
                f.intimidated = true;
                f.intimidateDmg = 0.80;
              }
            }
          }
        }
      }
    },

    // 2. Multiscale (Dragonite, Lugia): Giảm 50% sát thương đòn đầu khi HP >90%
    'multiscale': {
      d: 'Con más del 90 % de vida, el primer golpe recibido se reduce a la mitad. Se recarga tras 12 s sin recibir daño.',
      start: pl => { pl.multiscaleReady = true; pl.multiscaleCd = 0; },
      tick: (pl, dt) => {
        if (!pl.multiscaleReady) {
          pl.multiscaleCd = (pl.multiscaleCd || 0) + dt;
          if (pl.multiscaleCd >= 12.0 && pl.hp >= pl.maxHp * 0.90) {
            pl.multiscaleReady = true;
            pl.multiscaleCd = 0;
            if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 20, '¡Multiescamas!', '#38bdf8', true);
          }
        }
      },
      inMul: pl => (pl.multiscaleReady && pl.hp >= pl.maxHp * 0.90 ? 0.50 : 1),
      hurt: pl => {
        if (pl.multiscaleReady) {
          pl.multiscaleReady = false;
          pl.multiscaleCd = 0;
        }
      }
    },

    // 3. Stance Change (Aegislash): Tung chiêu hóa Dạng Kiếm (+25% công, -30% giáp), nghỉ hóa Dạng Khiên (+30% giáp)
    'stance-change': {
      d: 'Al atacar adopta Forma Filo (+25 % daño, -30 % defensa) por 1,5 s; tras descansar vuelve a Forma Escudo (+30 % defensa).',
      start: pl => { pl.swordStance = false; pl.stanceTimer = 0; },
      tick: (pl, dt) => {
        if (pl.swordStance) {
          pl.stanceTimer -= dt;
          if (pl.stanceTimer <= 0) {
            pl.swordStance = false;
            if (G.FX && G.FX.ring) G.FX.ring(pl.x, pl.y, 10, pl.r * 2.2, '#7fe0ff', 0.3, 3);
          }
        }
      },
      out: pl => (pl.swordStance ? 1.25 : 1),
      inMul: pl => (pl.swordStance ? 1.30 : 0.70)
    },

    // 4. Disguise (Mimikyu): Chặn hoàn toàn 1 đòn mỗi 45s
    'disguise': {
      d: 'Bloquea por completo 1 golpe cada 45 segundos (Disfraz).',
      start: pl => { pl.disguiseReady = true; pl.disguiseCooldown = 0; },
      tick: (pl, dt) => {
        if (!pl.disguiseReady) {
          pl.disguiseCooldown = (pl.disguiseCooldown || 0) - dt;
          if (pl.disguiseCooldown <= 0) {
            pl.disguiseReady = true;
            if (G.FX && G.FX.dmgText) G.FX.dmgText(pl.x, pl.y - 20, '¡Disfraz Listo!', '#ffd23f', true);
          }
        }
      }
    },

    // 5. Schooling (Wishiwashi): >25 quái trong 300px hóa School Form
    'schooling': {
      d: 'Cuando hay más de 25 enemigos cerca, se transforma en Forma Banco (+50 % ataque, +30 % vida).',
      tick: (pl, dt) => {
        pl.schoolTimer = (pl.schoolTimer || 0) + dt;
        if (pl.schoolTimer >= 0.5) {
          pl.schoolTimer = 0;
          if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
            const count = G.EnemyMgr.queryCircle(pl.x, pl.y, 300).length;
            pl.schoolingForm = (count >= 25);
          }
        }
      },
      out: pl => (pl.schoolingForm ? 1.50 : 1)
    },

    // 6. Mold Breaker (Excadrill, Haxorus): Bỏ qua kháng CC của Boss và khiên Elite
    'mold-breaker': {
      d: 'Rompe moldes: sus ataques ignoran los escudos de élites y la inmunidad temporal de jefes.',
      moldBreaker: true,
      out: (pl, m, e) => (e && e.boss ? 1.15 : 1)
    },

    // 7. Unaware (Quagsire, Clefable): Bỏ qua buff Cuồng Nộ và Stage của Boss
    'unaware': {
      d: 'Ignora las bonificaciones de Ataque y Furia de los jefes enemigos al recibir daño.',
      unaware: true,
      inMul: () => 0.88
    },

    // 8. Poison Heal (Gliscor, Breloom): Độc hồi máu thay vì mất máu
    'poison-heal': {
      d: 'Estar envenenado o pisar veneno le cura un 2 % de vida máxima por segundo en vez de dañarle.',
      poisonHeal: true,
      tick: (pl, dt) => {
        const hasPoison = pl.statuses && (pl.statuses['poison'] || pl.statuses['toxic']);
        if (hasPoison && pl.hp < pl.maxHp && !pl.dead) {
          pl.hp = Math.min(pl.maxHp, pl.hp + pl.maxHp * 0.02 * dt);
        }
      }
    },

    // 9. Magnet Pull (Magnezone): Hút ngọc xa +50%, kéo quái Thép
    'magnet-pull': {
      d: 'Aumenta el radio de recogida de orbes un +50 % y atrae a los Pokémon de tipo Acero.',
      start: pl => { pl.pickupRadius = (pl.pickupRadius || 100) * 1.50; },
      tick: (pl, dt) => {
        pl.magTimer = (pl.magTimer || 0) + dt;
        if (pl.magTimer >= 0.5) {
          pl.magTimer = 0;
          if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
            const steelFoes = G.EnemyMgr.queryCircle(pl.x, pl.y, 220).filter(f => f.types && f.types.includes('steel') && !f.boss);
            for (const f of steelFoes) {
              const dx = pl.x - f.x, dy = pl.y - f.y, d = Math.hypot(dx, dy);
              if (d > 10) {
                f.x += (dx / d) * 20 * dt;
                f.y += (dy / d) * 20 * dt;
              }
            }
          }
        }
      }
    },

    // 10. Berserk / Zen Mode (Drampa, Darmanitan): HP < 50% đổi phong cách chiến đấu
    'berserk': {
      d: 'Al caer por debajo del 50 % de vida, su Ataque Especial aumenta un +25 %.',
      out: (pl, m) => (pl.hp < pl.maxHp * 0.5 ? 1.25 : 1)
    },
    'zen-mode': {
      d: 'Al caer por debajo del 50 % de vida adopta Modo Daruma: +35 % de defensa si permanece quieto.',
      inMul: pl => (pl.hp < pl.maxHp * 0.5 && pl.idleTime > 0.5 ? 0.65 : 1)
    },

    // 11. Supreme Overlord (Kingambit): Tăng công theo số mini-boss đã hạ hoặc đồng đội gục
    'supreme-overlord': {
      d: 'Cada mini-jefe derrotado o aliado caído otorga +4 % de daño permanente (hasta +30 %).',
      out: pl => 1 + Math.min(0.30, ((pl.bossesDefeated || 0) + (pl.deadAllies || 0)) * 0.04)
    },

    // 12. Gale Wings (Talonflame): Hồi chiêu Bay -25% khi máu >80%
    'gale-wings': {
      d: 'Con más del 80 % de vida, sus movimientos de tipo Volador se recargan un 25 % antes.',
      cdMul: pl => (pl.hp >= pl.maxHp * 0.80 ? 0.75 : 1)
    },

    // 13. Soul-Heart (Magearna): Mỗi quái hạ +0.3% sát thương trong 10s
    'soul-heart': {
      d: 'Cada enemigo derrotado otorga +0,3 % de daño temporal acumulable hasta +12 % durante 10 s.',
      kill: pl => {
        pl.soulHeartStacks = Math.min(40, (pl.soulHeartStacks || 0) + 1);
        pl.soulHeartTimer = 10.0;
      },
      tick: (pl, dt) => {
        if (pl.soulHeartTimer > 0) {
          pl.soulHeartTimer -= dt;
          if (pl.soulHeartTimer <= 0) pl.soulHeartStacks = 0;
        }
      },
      out: pl => 1 + (pl.soulHeartStacks || 0) * 0.003
    },

    // 14. Pressure (Huyền thoại): Boss nhắm vào bị tăng 10% hồi chiêu
    'pressure': {
      d: 'Presión: impone respeto, aumentando el tiempo de recarga de los ataques de los jefes un 10 %.',
      pressureActive: true
    }
  };

  function get(id) {
    return EXT[id] || null;
  }

  return {
    EXT,
    get
  };
})();
