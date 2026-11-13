import { paneLayout } from './Home';

test('the current window stays on screen and the trail is at most a quarter of the width', () => {
  for (const W of [375, 700, 900, 1000, 1200, 1600]) {
    for (const d of [0, 1, 2]) {
      const { w, left } = paneLayout(W, d);
      expect(left[d]).toBeGreaterThanOrEqual(16);
      expect(left[d] + w[d]).toBeLessThanOrEqual(W - 16);
      const trail = w.slice(0, d).reduce((sum, x) => sum + x + 16, 0);
      if (W >= 900) expect(trail).toBeLessThanOrEqual(W * 0.25);
    }
  }
});

test('the landing window is centered', () => {
  const { w, left } = paneLayout(1200, 0);
  expect(left[0]).toBe((1200 - w[0]) / 2);
});
