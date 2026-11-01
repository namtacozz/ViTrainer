/* ============ noframe.js — el juego sólo se juega en su web ============
 * Hay webs que meten pokesurvivor.com dentro de un marco (iframe) y ponen sus
 * anuncios alrededor. Si esta página está dentro de un marco de otra web, no arranca.
 * Discord Activities, itch.io... van permitidos.
 */
(function () {
  // 1. Si no hay marco, se juega normal
  if (window.top === window.self) return;

  // 2. DISCORD ACTIVITY CHECK (Tuyệt đối không chặn Discord)
  // Discord Activities chạy trong iframe có chứa các tham số hoặc domain của discord
  var loc = window.location;
  var href = loc.href || '';
  var host = loc.hostname || '';
  var search = loc.search || '';

  if (
    host.indexOf('discord') >= 0 ||
    href.indexOf('discord') >= 0 ||
    search.indexOf('frame_id') >= 0 ||
    search.indexOf('platform=discord') >= 0 ||
    search.indexOf('instance_id') >= 0 ||
    search.indexOf('channel_id') >= 0
  ) {
    return; // Cho phép chạy ngay lập tức!
  }

  // Kiểm tra referrer hoặc ancestorOrigins
  if (document.referrer && document.referrer.indexOf('discord') >= 0) return;
  if (loc.ancestorOrigins) {
    for (var i = 0; i < loc.ancestorOrigins.length; i++) {
      if (loc.ancestorOrigins[i].indexOf('discord') >= 0) return;
    }
  }

  var ALLOW = [
    'discord.com',
    'discordapp.com',
    'discord.gg',
    'discordsays.com'
  ];

  function isAllowed(h) {
    if (!h) return false;
    for (var i = 0; i < ALLOW.length; i++) {
      if (h === ALLOW[i] || h.endsWith('.' + ALLOW[i])) return true;
    }
    return false;
  }

  if (isAllowed(host)) return;

  var parent = '';
  try { parent = window.top.location.hostname; } catch (e) {}
  if (parent === host || isAllowed(parent)) return;

  // Nếu rơi vào trang web khác nhúng lén thực sự:
  window.PS_FRAMED = true;

  var lang = (window.PS_LOCALES && window.PS_LOCALES.lang) || document.documentElement.lang || 'en';
  var texts = {
    es: ['Esta no es la web oficial', 'PokéSurvivor sólo se juega en su web oficial, gratis y sin anuncios.', 'Jugar en pokesurvivor.com'],
    en: ['This is not the official website', 'PokéSurvivor can only be played on its official website, free and without ads.', 'Play on pokesurvivor.com'],
    vi: ['Đây không phải trang web chính thức', 'PokéSurvivor chỉ có thể chơi miễn phí và không quảng cáo trên trang chính thức.', 'Chơi trên pokesurvivor.com']
  };
  var copy = texts[lang] || texts.en;

  function show() {
    var url = 'https://pokesurvivor.com' + loc.pathname + loc.search;
    var box = document.createElement('div');
    box.setAttribute('translate', 'no');
    box.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;' +
      'padding:16px;background:#0a1430;color:#fff;font:16px/1.5 system-ui,sans-serif;text-align:center';
    var inner = document.createElement('div');
    inner.style.cssText = 'max-width:440px';
    var h = document.createElement('h1');
    h.style.cssText = 'margin:0 0 12px;font-size:24px;color:#ffd84a';
    h.textContent = copy[0];
    var p = document.createElement('p');
    p.style.cssText = 'margin:0 0 20px';
    p.textContent = copy[1];
    var a = document.createElement('a');
    a.href = url; a.target = '_top'; a.rel = 'noopener';
    a.style.cssText = 'display:inline-block;padding:12px 20px;border-radius:10px;background:#ffd84a;color:#0a1430;font-weight:700;text-decoration:none';
    a.textContent = copy[2];
    inner.appendChild(h); inner.appendChild(p); inner.appendChild(a);
    box.appendChild(inner);
    document.body.appendChild(box);
  }
  if (document.body) show();
  else document.addEventListener('DOMContentLoaded', show);
})();
