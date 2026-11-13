// One-time helper: authorizes your Spotify app and prints a refresh token.
// Usage: SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node worker/get-token.mjs
// The Spotify app's redirect URI must be exactly http://127.0.0.1:8888/callback
import http from 'node:http';
import crypto from 'node:crypto';

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) throw new Error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.');
const redirect = 'http://127.0.0.1:8888/callback';
const state = crypto.randomUUID();
const auth = new URL('https://accounts.spotify.com/authorize');
auth.search = new URLSearchParams({ client_id: id, response_type: 'code', redirect_uri: redirect, scope: 'user-read-currently-playing', state });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirect);
  if (url.pathname !== '/callback') return res.end();
  if (url.searchParams.get('state') !== state) return res.end('State mismatch. Run the script again.');
  const token = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { Authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code: url.searchParams.get('code'), redirect_uri: redirect }),
  }).then((r) => r.json());
  res.end(token.refresh_token ? 'Done. Go back to the terminal.' : 'Spotify did not return a refresh token. See the terminal.');
  console.log(token.refresh_token ? `\nSPOTIFY_REFRESH_TOKEN=${token.refresh_token}\n` : token);
  server.close();
});
server.listen(8888, '127.0.0.1', () => console.log(`Open this in your browser:\n\n${auth}\n`));
