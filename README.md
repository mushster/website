This is the code for my website, which you can find here: https://amusharaf.xyz/

## Now playing (Spotify)

The home page shows a "Listening now" strip while a track is playing on Spotify. Nothing shows when
nothing is playing, or until the steps below are done.

The site is static, so a small Cloudflare Worker in `worker/` holds the Spotify credentials and
returns the current track as JSON. One-time setup:

1. Create an app at https://developer.spotify.com/dashboard with the redirect URI
   `http://127.0.0.1:8888/callback`. The owning account needs Spotify Premium.
2. Get a refresh token:
   `SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node worker/get-token.mjs`
3. Deploy the worker and store the three secrets:
   ```
   cd worker
   npx wrangler deploy
   npx wrangler secret put SPOTIFY_CLIENT_ID
   npx wrangler secret put SPOTIFY_CLIENT_SECRET
   npx wrangler secret put SPOTIFY_REFRESH_TOKEN
   ```
4. Put the worker's URL in a `.env` file at the repo root, then build and deploy the site:
   `REACT_APP_NOW_PLAYING_URL=https://now-playing.<your-subdomain>.workers.dev`

Spotify refresh tokens expire six months after you authorize. When the strip stops appearing,
repeat step 2 and update the `SPOTIFY_REFRESH_TOKEN` secret.

Worker tests: `node --test worker/now-playing.test.mjs`
