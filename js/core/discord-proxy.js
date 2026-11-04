/* ============ discord-proxy.js ============
 * Tự động chuyển hướng (remap) các request của Firebase Auth, Firestore và RTDB
 * khi chạy trong Discord Activity nhằm tuân thủ Content Security Policy của Discord.
 * Hỗ trợ thử qua /.proxy/... trước (URL Mappings) và tự động fallback nếu cần.
 */
(function () {
  const isDiscord = typeof location !== 'undefined' && /discordsays\.com|discord\.com|discordapp\.com/.test(location.hostname);
  if (!isDiscord) return;

  const MAPPINGS = [
    { target: 'https://identitytoolkit.googleapis.com', prefix: '/.proxy/google-auth' },
    { target: 'https://securetoken.googleapis.com', prefix: '/.proxy/google-token' },
    { target: 'https://firestore.googleapis.com', prefix: '/.proxy/firestore-api' },
    { target: 'https://vitrainer-7a1bf-default-rtdb.asia-southeast1.firebasedatabase.app', prefix: '/.proxy/rtdb' }
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
    window.fetch = async function (input, init) {
      let url = typeof input === 'string' ? input : (input instanceof URL ? input.href : (input && input.url ? input.url : ''));
      let remappedUrl = remap(url);

      if (remappedUrl !== url) {
        // Thử qua proxy của Discord trước để tránh lỗi CSP connect-src
        try {
          let proxyInput = remappedUrl;
          if (input instanceof Request) {
            try { proxyInput = new Request(remappedUrl, input); } catch (e) { proxyInput = remappedUrl; }
          }
          const proxyRes = await origFetch.call(this, proxyInput, init);
          // Nếu proxy phản hồi (200 OK, 400 Bad Request cho auth, 403, v.v. khác 404/502)
          if (proxyRes && proxyRes.status !== 404 && proxyRes.status !== 502) {
            return proxyRes;
          }
        } catch (proxyErr) {
          // Fallback thử kết nối trực tiếp nếu proxy gặp lỗi
        }

        try {
          return await origFetch.call(this, input, init);
        } catch (directErr) {
          throw directErr;
        }
      }
      return origFetch.call(this, input, init);
    };
  }

  // 2. Monkey-patch XMLHttpRequest
  if (typeof window !== 'undefined' && window.XMLHttpRequest) {
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
      const targetUrl = typeof url === 'string' ? remap(url) : url;
      return origOpen.call(this, method, targetUrl, ...args);
    };
  }

  // 3. Monkey-patch WebSocket cho RTDB
  if (typeof window !== 'undefined' && window.WebSocket) {
    const OrigWebSocket = window.WebSocket;
    const WS_TARGET = 'wss://vitrainer-7a1bf-default-rtdb.asia-southeast1.firebasedatabase.app';
    window.WebSocket = function (url, protocols) {
      let targetUrl = url;
      if (typeof targetUrl === 'string' && targetUrl.startsWith(WS_TARGET)) {
        targetUrl = targetUrl.replace(WS_TARGET, 'wss://' + location.host + '/.proxy/rtdb');
      }
      return protocols !== undefined ? new OrigWebSocket(targetUrl, protocols) : new OrigWebSocket(targetUrl);
    };
    window.WebSocket.prototype = OrigWebSocket.prototype;
  }
})();
