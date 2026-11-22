/** Deterministic hand-drawn path geometry. No randomness between frames. */

export const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const f = (n: number) => Math.round(n * 100) / 100;

type P = [number, number];

const wobble = (seed: number, amp: number, i: number, phase = 0) => {
  const r = mulberry32(seed + i * 977 + 13);
  const low = Math.sin(i * 1.7 + phase) * 0.55 + Math.sin(i * 0.31 + seed) * 0.45;
  return (r() * 2 - 1) * amp + low * amp * 0.45;
};

export const lineD = (x1: number, y1: number, x2: number, y2: number, seed = 1, amp = 1.1) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const n = Math.max(4, Math.min(14, Math.round(len / 55)));
  let d = `M ${f(x1)} ${f(y1)}`;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const e = i === n ? 0 : 1;
    const bow = Math.sin(t * Math.PI) * ((seed % 5) - 2) * 0.16;
    const x = x1 + dx * t + nx * (wobble(seed, amp, i) * e + bow * amp);
    const y = y1 + dy * t + ny * (wobble(seed + 41, amp, i) * e + bow * amp);
    d += ` L ${f(x)} ${f(y)}`;
  }
  return d;
};

export const polyD = (
  points: P[],
  seed = 1,
  amp = 1,
  closed = false,
  tension = 0.5,
) => {
  if (points.length < 2) return '';
  const pts = points.map(([x, y], i) => {
    if (i === 0 || i === points.length - 1) return [x, y] as P;
    return [x + wobble(seed, amp, i), y + wobble(seed + 77, amp, i + 3)] as P;
  });
  if (closed) pts.push(pts[0]);
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  if (pts.length === 2) return d + ` L ${f(pts[1][0])} ${f(pts[1][1])}`;
  // Catmull-Rom to cubic bezier, lightly tensioned for an inked feel.
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + ((p2[0] - p0[0]) / 6) * tension;
    const c1y = p1[1] + ((p2[1] - p0[1]) / 6) * tension;
    const c2x = p2[0] - ((p3[0] - p1[0]) / 6) * tension;
    const c2y = p2[1] - ((p3[1] - p1[1]) / 6) * tension;
    d += ` C ${f(c1x)} ${f(c1y)} ${f(c2x)} ${f(c2y)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
};

export const circleD = (cx: number, cy: number, r: number, seed = 1, amp = 1.1) => {
  const n = 64;
  const pts: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r + wobble(seed, amp, i, 0.4);
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
  }
  return polyD(pts, seed, 0, true);
};

export const ellipseD = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  seed = 1,
  amp = 1.1,
  rot = 0,
) => {
  const n = 64;
  const pts: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = 1 + wobble(seed, amp / Math.max(rx, ry), i, 0.4);
    const x = Math.cos(a) * rx * rr;
    const y = Math.sin(a) * ry * rr;
    pts.push([
      cx + x * Math.cos(rot) - y * Math.sin(rot),
      cy + x * Math.sin(rot) + y * Math.cos(rot),
    ]);
  }
  return polyD(pts, seed, 0, true);
};

export const rectD = (
  x: number,
  y: number,
  w: number,
  h: number,
  seed = 1,
  amp = 1,
  r = 0,
) => {
  const rr = Math.min(r, w / 2, h / 2);
  const pts: P[] = [];
  const corner = (cx: number, cy: number, a0: number) => {
    const n = 5;
    for (let i = 0; i <= n; i++) {
      const a = a0 + (i / n) * (Math.PI / 2);
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
  };
  if (rr > 0) {
    corner(x + rr, y + rr, Math.PI);
    corner(x + w - rr, y + rr, -Math.PI / 2);
    corner(x + w - rr, y + h - rr, 0);
    corner(x + rr, y + h - rr, Math.PI / 2);
  } else {
    pts.push([x, y], [x + w, y], [x + w, y + h], [x, y + h]);
  }
  return polyD(pts, seed, amp, true);
};

export const arcD = (
  cx: number,
  cy: number,
  r: number,
  a0: number,
  a1: number,
  seed = 1,
  amp = 1,
  ry = r,
) => {
  const n = Math.max(8, Math.round((Math.abs(a1 - a0) / (Math.PI * 2)) * 64));
  const pts: P[] = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    const rr = 1 + wobble(seed, amp / Math.max(r, ry), i, 0.8);
    pts.push([cx + Math.cos(a) * r * rr, cy + Math.sin(a) * ry * rr]);
  }
  return polyD(pts, seed, 0);
};

export const curveD = (points: P[], seed = 1, amp = 0.8) => polyD(points, seed, amp);

export const arrowD = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed = 1,
  head = 16,
) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const spread = 0.48;
  const h1x = x2 - Math.cos(a - spread) * head;
  const h1y = y2 - Math.sin(a - spread) * head;
  const h2x = x2 - Math.cos(a + spread) * head;
  const h2y = y2 - Math.sin(a + spread) * head;
  return {
    shaft: lineD(x1, y1, x2, y2, seed, 0.8),
    head: lineD(h1x, h1y, x2, y2, seed + 1, 0.6) + ' ' + lineD(h2x, h2y, x2, y2, seed + 2, 0.6),
  };
};

export const waveD = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  amp: number,
  cycles: number,
  seed = 1,
) => {
  const n = Math.max(24, cycles * 12);
  const pts: P[] = [];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const off = Math.sin(t * Math.PI * 2 * cycles) * amp * Math.sin(t * Math.PI);
    pts.push([x1 + dx * t + nx * off, y1 + dy * t + ny * off]);
  }
  return polyD(pts, seed, 0.4);
};

/** A spiky response trace. */
export const spikesD = (
  x1: number,
  y1: number,
  width: number,
  spikes: { at: number; h: number }[],
  seed = 1,
) => {
  const pts: P[] = [[x1, y1]];
  for (const s of spikes) {
    const x = x1 + width * s.at;
    pts.push([x - 5, y1], [x, y1 - s.h], [x + 4, y1 + 3], [x + 9, y1]);
  }
  pts.push([x1 + width, y1]);
  return polyD(pts, seed, 0.5);
};

export const zigzagD = (x1: number, y1: number, x2: number, y2: number, n = 7) => {
  const pts: P[] = [[x1, y1]];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    pts.push([x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + (i % 2 ? -18 : 18)]);
  }
  pts.push([x2, y2]);
  return polyD(pts, 7, 0.4);
};

/** Sampling helpers for dot fields and constellations. */
export const dotField = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  count: number,
  seed = 1,
) => {
  const r = mulberry32(seed);
  const pts: P[] = [];
  for (let i = 0; i < count; i++) {
    const a = r() * Math.PI * 2;
    const rad = Math.sqrt(r());
    pts.push([cx + Math.cos(a) * rx * rad, cy + Math.sin(a) * ry * rad]);
  }
  return pts;
};
