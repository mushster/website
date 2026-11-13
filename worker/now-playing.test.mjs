import test from 'node:test';
import assert from 'node:assert/strict';
import { toNowPlaying } from './now-playing.js';

const track = {
  is_playing: true,
  item: {
    name: 'Song',
    artists: [{ name: 'A' }, { name: 'B' }],
    external_urls: { spotify: 'https://open.spotify.com/track/1' },
    album: { images: [{ url: 'big' }, { url: 'small' }] },
  },
};

test('a playing track maps to title, artists, link and the smallest cover', () => {
  assert.deepEqual(toNowPlaying(200, track), { playing: true, title: 'Song', artist: 'A, B', url: 'https://open.spotify.com/track/1', cover: 'small' });
});

test('paused, empty, missing item and error responses all read as not playing', () => {
  assert.deepEqual(toNowPlaying(200, { ...track, is_playing: false }), { playing: false });
  assert.deepEqual(toNowPlaying(200, { is_playing: true, item: null }), { playing: false });
  assert.deepEqual(toNowPlaying(204, null), { playing: false });
  assert.deepEqual(toNowPlaying(401, { error: {} }), { playing: false });
});
