/**
 * Proxy do feed RSS do Medium para luizcarvalho.com/api/medium-feed
 *
 * O Medium não envia cabeçalhos CORS, então o navegador não consegue ler o
 * feed direto. Este Worker busca o RSS, guarda em cache na borda e devolve o
 * XML com Access-Control-Allow-Origin. O script.js faz o parse com DOMParser.
 */

const FEED_URL = 'https://medium.com/feed/luizcarvalho-com/tagged/Palestra';
const CACHE_SECONDS = 900; // 15 minutos

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: CORS_HEADERS });
    }

    const cache = caches.default;
    const cacheKey = new Request(new URL(request.url).origin + '/api/medium-feed');
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const upstream = await fetch(FEED_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (luizcarvalho.com feed proxy)' },
    });
    const body = await upstream.text();

    // Só cacheia respostas que são realmente RSS (evita guardar páginas de bloqueio)
    if (!upstream.ok || !body.includes('<rss')) {
      return new Response('Feed indisponível', { status: 502, headers: CORS_HEADERS });
    }

    const response = new Response(body, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
      },
    });
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  },
};
