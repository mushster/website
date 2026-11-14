import { CORNER, leg, paneLayout } from './Home';

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

test('the bounce stays on the page, always ends a leg on a wall, and never enters a corner', () => {
  for (const [W, H, w, h] of [[1400, 830, 200, 23], [900, 600, 200, 23], [375, 700, 200, 23], [2560, 1300, 200, 23]]) {
    const maxX = W - w;
    const maxY = H - h;
    const corner = (x, y) => (x < CORNER || x > maxX - CORNER) && (y < CORNER || y > maxY - CORNER);
    let from = [maxX / 2, maxY / 2];
    let heading = [0.8, 0.6];
    for (let n = 0; n < 3000; n++) {
      const l = leg(W, H, w, h, from, heading);
      for (let s = 0; s <= 40; s++) {
        const x = l.from[0] + ((l.to[0] - l.from[0]) * s) / 40;
        const y = l.from[1] + ((l.to[1] - l.from[1]) * s) / 40;
        expect(x >= -0.01 && x <= maxX + 0.01 && y >= -0.01 && y <= maxY + 0.01).toBe(true);
        expect(corner(x, y)).toBe(false);
      }
      const [x, y] = l.to;
      expect(Math.min(x, maxX - x, y, maxY - y)).toBeLessThan(0.01);
      expect(l.length).toBeGreaterThan(0);
      from = l.to;
      heading = l.heading;
    }
  }
});

test('no two bounces are alike', () => {
  const a = leg(1400, 830, 200, 23, [600, 400], [0.8, 0.6]);
  const b = leg(1400, 830, 200, 23, [600, 400], [0.8, 0.6]);
  expect(a.to).toEqual(b.to);
  expect(a.heading).not.toEqual(b.heading);
});
