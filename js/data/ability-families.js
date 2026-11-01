/* ============ ability-families.js — 16 Họ Ability Chuẩn Hóa Theo Tham Số ============
 * Cung cấp khuôn mẫu tham số cho hàng trăm Ability của Pokémon chuẩn Canon,
 * tương thích tuyệt đối với hệ thống G.AbilityFX sẵn có.
 */
var G = (typeof window !== 'undefined' ? window.G : (typeof global !== 'undefined' ? global.G : null)) || {};
if (typeof window !== 'undefined') window.G = G;
if (typeof global !== 'undefined') global.G = G;

G.AbilityFamilies = (() => {
  const TN = t => (G.U && G.U.TYPE_NAME && G.U.TYPE_NAME[t]) ? G.U.TYPE_NAME[t] : t;
  const wx = () => (G.Weather && G.Weather.current ? G.Weather.current.kind : null);

  const FAMILIES = {
    // 1. Pinch: Tăng sát thương hệ khi HP dưới ngưỡng (Blaze, Overgrow, Torrent, Swarm)
    pinch: {
      validate: p => p && p.type && typeof p.mult === 'number',
      build: p => ({
        d: `+${Math.round((p.mult - 1) * 100)} % de daño de tipo ${TN(p.type)} con poca vida (menos de 1/3).`,
        out: (pl, m) => (m && m.type === p.type && pl.hp < (pl.maxHp / 3) ? p.mult : 1)
      })
    },

    // 2. Absorb: Hấp thụ một hệ sát thương để hồi máu hoặc tăng bùa (Water Absorb, Volt Absorb, Flash Fire, Earth Eater)
    absorb: {
      validate: p => p && p.type,
      build: p => ({
        d: `Los ataques de tipo ${TN(p.type)} no le hacen daño: le curan un poco.`,
        absorb: p.type
      })
    },

    // 3. Type Boost: Tăng sát thương thường trực cho một hệ chiêu (Steelworker, Transistor, Dragon's Maw)
    typeBoost: {
      validate: p => p && p.type && typeof p.mult === 'number',
      build: p => ({
        d: `+${Math.round((p.mult - 1) * 100)} % de daño con movimientos de tipo ${TN(p.type)}.`,
        out: (pl, m) => (m && m.type === p.type ? p.mult : 1)
      })
    },

    // 4. Type Convert: Đổi chiêu Normal sang hệ khác và tăng công (Pixilate, Aerilate, Refrigerate, Galvanize)
    typeConvert: {
      validate: p => p && p.toType && typeof p.mult === 'number',
      build: p => ({
        d: `Los movimientos Normal se convierten en ${TN(p.toType)} y hacen +${Math.round((p.mult - 1) * 100)} % de daño.`,
        convertType: p.toType,
        out: (pl, m) => (m && (m.type === 'normal' || m.type === p.toType) ? p.mult : 1)
      })
    },

    // 5. Weather Speed: Tăng 50% tốc độ chạy dưới thời tiết thích hợp (Chlorophyll, Swift Swim, Sand Rush, Slush Rush)
    weatherSpeed: {
      validate: p => p && p.weather,
      build: p => ({
        d: `+50 % de velocidad con clima favorable (${p.weather}).`,
        speed: () => (wx() === p.weather ? 1.5 : 1)
      })
    },

    // 6. Weather Summon: Gọi thời tiết tương ứng khi vào trận và định kỳ (Drought, Drizzle, Snow Warning, Sand Stream)
    weatherSummon: {
      validate: p => p && p.weather,
      build: p => ({
        d: `Pone clima ${p.weather} al empezar y cada 3 minutos.`,
        summon: p.weather
      })
    },

    // 7. Status React: Tăng chỉ số khi bị dính trạng thái xấu (Guts, Marvel Scale, Quick Feet, Toxic Boost)
    statusReact: {
      validate: p => p && p.stat && typeof p.mult === 'number',
      build: p => ({
        d: `Aumenta ${p.stat} un +${Math.round((p.mult - 1) * 100)} % si sufre un estado alterado.`,
        out: (pl, m) => {
          const hasBadStatus = pl.statuses && Object.keys(pl.statuses).length > 0;
          return (p.stat === 'atk' && hasBadStatus) ? p.mult : 1;
        },
        inMul: pl => {
          const hasBadStatus = pl.statuses && Object.keys(pl.statuses).length > 0;
          return (p.stat === 'def' && hasBadStatus) ? (1 / p.mult) : 1;
        }
      })
    },

    // 8. Contact Trigger: Tỉ lệ gây trạng thái khi bị đánh cận chiến (Static, Flame Body, Poison Point, Rough Skin)
    contactTrigger: {
      validate: p => p && p.status && typeof p.chance === 'number',
      build: p => ({
        d: `${Math.round(p.chance * 100)} % de probabilidad de causar ${p.status} al recibir un golpe cuerpo a cuerpo.`,
        contact: (pl, e) => {
          if (Math.random() < p.chance && G.StatusEngine && e) {
            G.StatusEngine.applyStatus(e, p.status, 3.0);
          }
        }
      })
    },

    // 9. Kill Stack: Cộng dồn chỉ số khi hạ gục kẻ địch (Moxie, Beast Boost, Chilling Neigh, Grim Neigh)
    killStack: {
      validate: p => p && typeof p.perKill === 'number' && typeof p.cap === 'number',
      build: p => ({
        d: `Cada enemigo derrotado otorga +${(p.perKill * 100).toFixed(1)} % de daño (hasta +${Math.round(p.cap * 100)} %).`,
        kill: pl => {
          pl.killStacks = Math.min(p.cap, (pl.killStacks || 0) + p.perKill);
        },
        out: pl => 1 + (pl.killStacks || 0)
      })
    },

    // 10. Stat Stack: Tích lũy stack chỉ số khi bị đánh trúng (Stamina, Weak Armor, Berserk)
    statStack: {
      validate: p => p && p.stat && typeof p.perHit === 'number',
      build: p => ({
        d: `Acumula bonificaciones de ${p.stat} al recibir ataques.`,
        hurt: pl => {
          pl.statStacks = Math.min(p.cap || 0.30, (pl.statStacks || 0) + p.perHit);
        },
        inMul: pl => (p.stat === 'def' ? (1 - (pl.statStacks || 0)) : 1),
        out: pl => (p.stat === 'atk' ? (1 + (pl.statStacks || 0)) : 1)
      })
    },

    // 11. Crit Boost: Tăng tỉ lệ hoặc sát thương chí mạng (Super Luck, Sniper, Merciless)
    critBoost: {
      validate: p => p && (p.critChance || p.critMul),
      build: p => ({
        d: p.critMul ? 'Sus golpes críticos causan daño aumentado.' : `+${Math.round((p.critChance || 0) * 100)} % de probabilidad crítica.`,
        critMul: p.critMul || 1.5,
        start: pl => {
          if (p.critChance) pl.critChance = (pl.critChance || 0) + p.critChance;
        }
      })
    },

    // 12. Status Immune: Miễn nhiễm danh sách trạng thái xấu (Limber, Insomnia, Water Veil, Magma Armor)
    statusImmune: {
      validate: p => p && Array.isArray(p.immuneList),
      build: p => ({
        d: `Inmune a ${p.immuneList.join(', ')}.`,
        start: pl => {
          pl.immuneStatuses = p.immuneList;
        }
      })
    },

    // 13. Regen: Hồi máu theo thời gian hoặc điều kiện (Regenerator, Ice Body, Rain Dish)
    regen: {
      validate: p => p && typeof p.rate === 'number',
      build: p => ({
        d: `Regenera vida gradualmente (+${(p.rate * 100).toFixed(1)} %/s).`,
        tick: (pl, dt) => {
          if (pl.hp < pl.maxHp && !pl.dead) {
            pl.hp = Math.min(pl.maxHp, pl.hp + pl.maxHp * p.rate * dt);
          }
        }
      })
    },

    // 14. Aura Debuff: Hào quang làm suy yếu quái vật xung quanh (Intimidate, Dazzling, Pressure)
    auraDebuff: {
      validate: p => p && p.radius && typeof p.debuff === 'number',
      build: p => ({
        d: `Debilita a los enemigos en un radio de ${p.radius} px (${Math.round(p.debuff * 100)} %).`,
        tick: (pl, dt) => {
          pl.auraTimer = (pl.auraTimer || 0) + dt;
          if (pl.auraTimer >= 0.25) {
            pl.auraTimer = 0;
            if (G.EnemyMgr && G.EnemyMgr.queryCircle) {
              const foes = G.EnemyMgr.queryCircle(pl.x, pl.y, p.radius);
              for (const e of foes) {
                e.auraDebuffed = true;
                e.auraDebuffAmt = p.debuff;
              }
            }
          }
        }
      })
    },

    // 15. Multi Hit: Tối ưu các chiêu đánh nhiều đòn (Skill Link, Parental Bond)
    multiHit: {
      validate: p => p && p.type,
      build: p => ({
        d: 'Maximiza el número de golpes de los ataques múltiples.',
        skillLink: true,
        out: (pl, m) => ((m && (m.count > 1 || m.bounce)) ? 1.25 : 1)
      })
    },

    // 16. Def Reduce By: Giảm sát thương nhận vào từ nhóm chiêu nhất định (Thick Fat, Filter, Solid Rock, Fluffy)
    defReduceBy: {
      validate: p => p && p.types && typeof p.reduction === 'number',
      build: p => ({
        d: `Reduce el daño recibido de tipo ${p.types.map(TN).join(', ')} un ${Math.round(p.reduction * 100)} %.`,
        inMul: (pl, type) => (p.types.includes(type) ? (1 - p.reduction) : 1)
      })
    }
  };

  function validate(family, params) {
    if (!FAMILIES[family]) return false;
    return FAMILIES[family].validate(params);
  }

  function build(family, params) {
    if (!FAMILIES[family] || !validate(family, params)) return null;
    return FAMILIES[family].build(params);
  }

  return {
    FAMILIES,
    validate,
    build
  };
})();
