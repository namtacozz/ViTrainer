/* ============ discord-proxy.js ============
 * Tự động chuyển hướng (remap) các request của Firebase Auth, Firestore và RTDB
 * qua Discord Activity URL Mappings (/.proxy/...) khi chạy trong Discord Activity
 * nhằm tuân thủ và vượt qua rào cản Content Security Policy (connect-src 'self') của Discord.
 */
(function () {
  const isDiscord = typeof location !== 'undefined' && /discordsays\.com|discord\.com|discordapp\.com/.test(location.hostname);
  if (!isDiscord) return;

  const MAPPINGS = [
    { target: 'https://identitytoolkit.googleapis.com', prefix: '/.proxy/google-auth' },
    { target: 'https://securetoken.googleapis.com', prefix: '/.proxy/google-token' },
    { target: 'https://firestore.googleapis.com', prefix: '/.proxy/firestore-api' },
    { target: 'https://vitrainer-7a1bf-default-rtdb.asia-southeast1.firebasedatabase.app', prefix: '/.proxy/rtdb' },
    { target: 'wss://vitrainer-7a1bf-default-rtdb.asia-southeast1.firebasedatabase.app', prefix: 'wss://' + location.host + '/.proxy/rtdb' }
  ];

  function remap(url) {
    if (!url || typeof url !== 'string') return url;
    for (let i = 0; i < MAPPINGS.length; i++) {
      const m = MAPPINGS[i];
      if (url.startsWith(m.target)) {
        return url.replace(m.target, m.prefix);
      }
    }
    return url;
  }

  // 1. Monkey-patch window.fetch
  if (typeof window !== 'undefined' && window.fetch) {
    const origFetch = window.fetch;
    window.fetch = function (input, init) {
      if (typeof input === 'string') {
        input = remap(input);
      } else if (input instanceof URL) {
        input = new URL(remap(input.href));
      } else if (input && typeof input === 'object' && input.url) {
        const remappedUrl = remap(input.url);
        if (remappedUrl !== input.url) {
          try {
            input = new Request(remappedUrl, input);
          } catch (e) {
            // Trường hợp Request không thể clone
          }
        }
      }
      return origFetch.call(this, input, init);
    };
  }

  // 2. Monkey-patch XMLHttpRequest
  if (typeof window !== 'undefined' && window.XMLHttpRequest) {
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
      if (typeof url === 'string') {
        url = remap(url);
      }
      return origOpen.call(this, method, url, ...args);
    };
  }

  // 3. Monkey-patch WebSocket
  if (typeof window !== 'undefined' && window.WebSocket) {
    const OrigWebSocket = window.WebSocket;
    const PatchedWebSocket = function (url, protocols) {
      if (typeof url === 'string') {
        url = remap(url);
      }
      return protocols ? new OrigWebSocket(url, protocols) : new OrigWebSocket(url);
    };
    PatchedWebSocket.prototype = OrigWebSocket.prototype;
    window.WebSocket = PatchedWebSocket;
  }
})();
