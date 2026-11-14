// Cloudflare Worker: returns what is playing on Spotify right now, as JSON the site can read.
// Secrets (set with `wrangler secret put`): SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN.
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const ORIGINS = ['https://amusharaf.xyz', 'http://localhost:3000'];
const CACHE_SECONDS = 20;

// Anything other than a track that is actively playing counts as not playing.
export function toNowPlaying(status, body) {
  const item = body && body.item;
  if (status !== 200 || !item || !body.is_playing || !item.name) return { playing: false };
  const images = (item.album && item.album.images) || [];
  return {
    playing: true,
    title: item.name,
    artist: (item.artists || []).map((a) => a.name).join(', '),
    url: item.external_urls && item.external_urls.spotify,
    cover: images.length ? images[images.length - 1].url : undefined,
  };
}

async function load(env) {
  try {
    const token = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: env.SPOTIFY_REFRESH_TOKEN }),
    });
    const { access_token } = await token.json();
    const res = await fetch(NOW_URL, { headers: { Authorization: `Bearer ${access_token}` } });
    return toNowPlaying(res.status, res.status === 200 ? await res.json() : null);
  } catch {
    return { playing: false };
  }
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin');
    const headers = {
      'Access-Control-Allow-Origin': ORIGINS.includes(origin) ? origin : ORIGINS[0],
      Vary: 'Origin',
      'Cache-Control': 'no-store',
    };
    // One Spotify lookup serves every visitor for CACHE_SECONDS.
    const key = new Request(new URL('/now-playing', request.url));
    const hit = await caches.default.match(key);
    if (hit) return Response.json(await hit.json(), { headers });
    const data = await load(env);
    ctx.waitUntil(caches.default.put(key, Response.json(data, { headers: { 'Cache-Control': `max-age=${CACHE_SECONDS}` } })));
    return Response.json(data, { headers });
  },
};
