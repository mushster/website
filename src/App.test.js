import { crossing, paneLayout } from './Home';

// The test environment has no browser random source, so borrow Node's.
if (!global.crypto) global.crypto = require('crypto').webcrypto;

test('the current window stays on screen and the trail is one left column, at most a quarter wide', () => {
  for (const W of [375, 700, 900, 1000, 1200, 1600]) {
    for (const d of [0, 1, 2]) {
      const { w, left } = paneLayout(W, d);
      expect(left[d]).toBeGreaterThanOrEqual(16);
      expect(left[d] + w[d]).toBeLessThanOrEqual(W - 16);
      for (let j = 0; j < d; j++) {
        expect(left[j]).toBe(16);
        if (W >= 700) expect(left[j] + w[j]).toBeLessThanOrEqual(Math.min(W * 0.25, left[d]));
      }
    }
  }
});

test('the landing window is centered', () => {
  const { w, left } = paneLayout(1200, 0);
  expect(left[0]).toBe((1200 - w[0]) / 2);
});

test('an item page gets a wide column that stays clear of the trail', () => {
  const { w, left } = paneLayout(1400, 2);
  expect(w[2]).toBe(680);
  expect(left[2]).toBeGreaterThanOrEqual(left[0] + w[0] + 16);
  expect(left[2] + w[2]).toBeLessThanOrEqual(1400 - 16);
  const narrow = paneLayout(800, 2);
  expect(narrow.left[2]).toBeGreaterThanOrEqual(narrow.left[0] + narrow.w[0] + 16);
  expect(narrow.left[2] + narrow.w[2]).toBeLessThanOrEqual(800 - 16);
});

test('a crossing starts and ends off screen on different edges, and no two are alike', () => {
  const [W, H, w, h] = [1400, 830, 300, 24];
  const off = ([x, y]) => x <= -w || x >= W || y <= -h || y >= H;
  const xy = (f) => f.transform.match(/-?[\d.]+/g).map(Number);
  const a = crossing(W, H, w, h);
  expect(off(xy(a.frames[0]))).toBe(true);
  expect(off(xy(a.frames[48]))).toBe(true);
  expect(xy(a.frames[0])).not.toEqual(xy(a.frames[48]));
  a.frames.forEach((f, n) => n && expect(f.offset).toBeGreaterThanOrEqual(a.frames[n - 1].offset));
  expect(crossing(W, H, w, h).frames).not.toEqual(a.frames);
  expect(xy(crossing(W, H, w, h, [500, 300]).frames[0])).toEqual([500, 300]);
});
