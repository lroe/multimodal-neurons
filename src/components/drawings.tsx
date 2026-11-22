import React from 'react';
import {staticFile} from 'remotion';
import {C, FONT} from '../theme';
import {Ink, Label, useT} from '../scene';
import {
  arcD,
  arrowD,
  circleD,
  curveD,
  ellipseD,
  lineD,
  polyD,
  rectD,
  spikesD,
  waveD,
} from '../sketch/rough';

export const Txt: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
  font?: 'hand' | 'display';
  weight?: number;
  opacity?: number;
  letterSpacing?: number;
  rotate?: number;
  baseline?: 'middle' | 'top' | 'auto';
}> = ({
  x,
  y,
  children,
  size = 44,
  color = C.ink,
  anchor = 'middle',
  font = 'hand',
  weight = 400,
  opacity = 1,
  letterSpacing = 0.5,
  rotate = 0,
  baseline = 'middle',
}) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontFamily={font === 'display' ? FONT.display : FONT.hand}
    fontWeight={weight}
    fontSize={size}
    letterSpacing={letterSpacing}
    textAnchor={anchor}
    dominantBaseline={baseline}
    opacity={opacity}
    transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
    style={{whiteSpace: 'pre'}}
  >
    {children}
  </text>
);

export const Tag: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  children: React.ReactNode;
  color?: string;
  fill?: string;
  size?: number;
  seed?: number;
  p?: number;
  opacity?: number;
  font?: 'hand' | 'display';
  weight?: number;
}> = ({
  x,
  y,
  w = 260,
  h = 82,
  children,
  color = C.ink,
  fill = C.surface,
  size = 46,
  seed = 4,
  p = 1,
  opacity = 1,
  font = 'hand',
  weight = 400,
}) => (
  <g opacity={opacity}>
    <Ink
      d={rectD(x - w / 2, y - h / 2, w, h, seed, 1.1, 14)}
      p={p}
      width={3.2}
      color={color}
      fill={fill}
      fillOpacity={0.72}
    />
    <Txt x={x} y={y + 1} size={size} color={color} font={font} weight={weight} opacity={p}>
      {children}
    </Txt>
  </g>
);

export const Panel: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  p?: number;
  color?: string;
  fill?: string;
  fillOpacity?: number;
  r?: number;
  seed?: number;
  width?: number;
  children?: React.ReactNode;
}> = ({
  x,
  y,
  w,
  h,
  p = 1,
  color = C.ink,
  fill = C.surface,
  fillOpacity = 0.55,
  r = 20,
  seed = 8,
  width = 3.4,
  children,
}) => (
  <g>
    <Ink
      d={rectD(x - w / 2, y - h / 2, w, h, seed, 1.15, r)}
      p={p}
      width={width}
      color={color}
      fill={fill}
      fillOpacity={fillOpacity}
    />
    {children}
  </g>
);

export const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  p?: number;
  color?: string;
  width?: number;
  head?: number;
  seed?: number;
  opacity?: number;
  dash?: boolean;
}> = ({x1, y1, x2, y2, p = 1, color = C.ink, width = 3.4, head = 15, seed = 21, opacity = 1, dash}) => {
  const a = arrowD(x1, y1, x2, y2, seed, head);
  return (
    <g opacity={opacity}>
      <Ink d={a.shaft} p={p} width={width} color={color} dash={dash ? '2 12' : undefined} />
      <Ink d={a.head} p={Math.max(0, (p - 0.72) / 0.28)} width={width} color={color} />
    </g>
  );
};

export const Link: React.FC<{
  d: string;
  p?: number;
  color?: string;
  width?: number;
  dotted?: boolean;
  opacity?: number;
}> = ({d, p = 1, color = C.muted, width = 3, dotted = false, opacity = 1}) => (
  <Ink d={d} p={p} color={color} width={width} opacity={opacity} dash={dotted ? '1 14' : undefined} />
);

export const Dot: React.FC<{
  x: number;
  y: number;
  r?: number;
  color?: string;
  p?: number;
  fill?: boolean;
}> = ({x, y, r = 4, color = C.ink, p = 1, fill = true}) => (
  <circle
    cx={x}
    cy={y}
    r={r}
    fill={fill ? color : 'none'}
    stroke={fill ? 'none' : color}
    strokeWidth={3}
    opacity={p}
  />
);

/* ------------------------------------------------------------------ */
/* Neuron                                                              */
/* ------------------------------------------------------------------ */

const DENDRITES = [
  'M -22 -14 C -38 -22 -48 -46 -68 -50 C -82 -53 -90 -64 -96 -78',
  'M -25 -4 C -50 -2 -66 -14 -88 -8 C -104 -4 -112 -12 -122 -22',
  'M -24 8 C -42 20 -52 42 -74 46 C -86 48 -94 58 -100 70',
  'M -8 -24 C -18 -44 -12 -66 -26 -84 C -34 -94 -34 -102 -30 -112',
  'M 12 -20 C 26 -34 38 -52 58 -52 C 72 -52 80 -60 86 -72',
  'M 8 20 C 16 42 12 62 24 78 C 32 88 30 98 24 108',
  'M 18 12 C 40 22 48 42 62 44 C 74 46 82 54 88 64',
];

const FORKS = [
  'M -96 -78 C -108 -86 -112 -98 -122 -98',
  'M -68 -50 C -70 -66 -60 -74 -56 -84',
  'M -88 -8 C -98 -20 -110 -22 -116 -30',
  'M -74 46 C -82 58 -92 62 -98 72',
  'M -26 -84 C -40 -92 -42 -104 -50 -110',
  'M 58 -52 C 62 -68 70 -74 80 -80',
  'M 24 78 C 38 86 40 96 50 100',
];

const AXON = 'M 24 0 C 52 -10 64 8 90 2 C 112 -3 124 -16 146 -12 C 160 -9 170 -14 182 -8';
const AXON_TERMINALS = [
  'M 146 -12 C 154 -24 160 -30 168 -34',
  'M 146 -12 C 154 0 162 6 170 10',
  'M 182 -8 C 190 -18 196 -22 204 -22',
  'M 182 -8 C 188 2 196 6 204 8',
];

export const Neuron: React.FC<{
  x: number;
  y: number;
  scale?: number;
  p?: number;
  color?: string;
  accent?: string;
  pulse?: number | null;
  opacity?: number;
  showNucleus?: boolean;
  flip?: boolean;
}> = ({x, y, scale = 1, p = 1, color = C.ink, accent = C.cyan, pulse = null, opacity = 1, showNucleus = true, flip = false}) => {
  const pulseR = 30 + (pulse ?? 0) * 130;
  const pulseO = pulse === null ? 0 : (1 - pulse) * 0.85;
  return (
    <g
      transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * scale} ${scale})`}
      opacity={opacity}
    >
      {pulse !== null ? (
        <>
          <circle r={pulseR} fill="none" stroke={accent} strokeWidth={4} opacity={pulseO} />
          <circle r={pulseR * 0.68} fill="none" stroke={accent} strokeWidth={2.5} opacity={pulseO * 0.55} />
        </>
      ) : null}
      {DENDRITES.map((d, i) => (
        <Ink key={`d${i}`} d={d} p={p} color={color} width={3.3} />
      ))}
      {FORKS.map((d, i) => (
        <Ink key={`f${i}`} d={d} p={p} color={color} width={2.7} opacity={0.85} />
      ))}
      <Ink d={AXON} p={p} color={color} width={3.4} />
      {AXON_TERMINALS.map((d, i) => (
        <Ink key={`t${i}`} d={d} p={p} color={color} width={2.9} />
      ))}
      <Ink d={circleD(0, 0, 27, 5, 1.2)} p={p} color={color} width={3.8} fill={accent} fillOpacity={pulse === null ? 0.07 : 0.12 + 0.22 * (1 - (pulse ?? 0))} />
      {showNucleus ? <Ink d={circleD(2, -1, 9.5, 9, 0.9)} p={p} color={pulse !== null ? accent : color} width={2.6} fill={accent} fillOpacity={0.5} /> : null}
      {pulse !== null && pulse < 0.75 ? (
        <g opacity={(1 - pulse) * 0.9} stroke={accent} strokeWidth={3} strokeLinecap="round">
          <line x1={-58} y1={-42} x2={-76} y2={-58} />
          <line x1={48} y1={-52} x2={64} y2={-70} />
          <line x1={-46} y1={48} x2={-64} y2={66} />
          <line x1={54} y1={42} x2={72} y2={58} />
        </g>
      ) : null}
    </g>
  );
};

export const FiringNeuron: React.FC<{
  x: number;
  y: number;
  scale?: number;
  p?: number;
  color?: string;
  accent?: string;
  fireAt?: number | null;
  period?: number;
  opacity?: number;
}> = ({x, y, scale = 1, p = 1, color = C.ink, accent = C.cyan, fireAt = null, period = 1.1, opacity = 1}) => {
  const t = useT();
  let pulse: number | null = null;
  if (fireAt !== null && t >= fireAt) {
    pulse = ((t - fireAt) % period) / period;
  }
  return (
    <Neuron
      x={x}
      y={y}
      scale={scale}
      p={p}
      color={color}
      accent={accent}
      pulse={pulse}
      opacity={opacity}
    />
  );
};

/* ------------------------------------------------------------------ */
/* Objects                                                             */
/* ------------------------------------------------------------------ */

export const Apple: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  fill?: string;
  fillOpacity?: number;
}> = ({x, y, s = 1, p = 1, color = C.ink, fill = C.red, fillOpacity = 0.1}) => {
  const body = polyD(
    [
      [0, -52],
      [28, -70],
      [68, -58],
      [88, -14],
      [82, 34],
      [56, 70],
      [20, 84],
      [-8, 76],
      [-44, 84],
      [-74, 48],
      [-86, 6],
      [-74, -42],
      [-36, -68],
      [-10, -58],
      [0, -52],
    ],
    12,
    1.5,
    true,
    0.6,
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d={body} p={p} color={color} width={4} fill={fill} fillOpacity={fillOpacity} />
      <Ink d={lineD(-2, -60, 5, -102, 14, 1.2)} p={p} color={color} width={4} />
      <Ink
        d={curveD(
          [
            [7, -101],
            [42, -116],
            [66, -96],
            [52, -82],
            [18, -88],
          ],
          16,
          1.2,
        )}
        p={p}
        color={C.green}
        width={3.4}
        fill={C.green}
        fillOpacity={0.1}
      />
      <Ink d={arcD(-22, -12, 36, 2.25, 2.9, 18, 1)} p={p} color={color} width={3} opacity={0.5} />
    </g>
  );
};

export const StickyNote: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  text?: string;
  p?: number;
  rotate?: number;
  color?: string;
  textColor?: string;
  size?: number;
  seed?: number;
  bright?: boolean;
}> = ({x, y, w = 168, h = 138, text = '', p = 1, rotate = -7, color = C.yellow, textColor = C.ink, size = 62, seed = 25, bright = false}) => (
  <g transform={`rotate(${rotate} ${x} ${y})`}>
    {text ? (
      <Ink
        d={rectD(x - w / 2, y - h / 2, w, h, seed, 1.2, 3)}
        p={p}
        color={color}
        width={3.4}
        fill={bright ? C.yellow : color}
        fillOpacity={bright ? 0.92 : 0.1}
      />
    ) : null}
    <Ink d={lineD(x + w / 2 - 26, y - h / 2 + 3, x + w / 2 - 3, y - h / 2 + 26, seed + 1, 0.8)} p={p} color={color} width={2.6} opacity={0.65} />
    <Txt x={x} y={y + 4} size={size} color={bright ? C.bg : textColor} font="display" weight={700} opacity={p}>
      {text}
    </Txt>
  </g>
);

export const Spider: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  thread?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.pink, thread = false}) => {
  const legs = [-1, 1].flatMap((side) =>
    [
      [[14 * side, -26], [46 * side, -44], [76 * side, -26], [94 * side, 4]],
      [[16 * side, -16], [56 * side, -14], [84 * side, 6], [96 * side, 36]],
      [[14 * side, -4], [52 * side, 10], [80 * side, 36], [90 * side, 66]],
      [[10 * side, 10], [40 * side, 28], [60 * side, 54], [68 * side, 84]],
    ].map((pts, i) => polyD(pts as [number, number][], 70 + i * 3 + (side > 0 ? 0 : 11), 1.1, false, 0.5)),
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {thread ? <Ink d={lineD(0, -165, 0, -42, 4, 0.7)} p={p} color={color} width={2.6} opacity={0.5} /> : null}
      {legs.map((d, i) => (
        <Ink key={i} d={d} p={p} color={color} width={3.2} />
      ))}
      <Ink d={ellipseD(0, 18, 26, 34, 5, 1.1)} p={p} color={color} width={3.6} fill={accent} fillOpacity={0.1} />
      <Ink d={circleD(0, -24, 16, 7, 1)} p={p} color={color} width={3.4} fill={accent} fillOpacity={0.08} />
      {[[-7, -30], [7, -30], [-11, -23], [11, -23]].map(([ex, ey], i) => (
        <circle key={i} cx={ex} cy={ey} r={i < 2 ? 2.6 : 1.8} fill={accent} opacity={p} />
      ))}
      <Ink d={lineD(-3, -10, -8, -1, 8, 0.4)} p={p} color={color} width={2.2} opacity={0.7} />
      <Ink d={lineD(3, -10, 8, -1, 9, 0.4)} p={p} color={color} width={2.2} opacity={0.7} />
    </g>
  );
};

export const SpiderMask: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
}> = ({x, y, s = 1, p = 1, color = C.red, accent = C.ink}) => {
  const head = ellipseD(0, 0, 64, 78, 31, 1.4);
  const webs = [
    lineD(0, -72, 0, 66, 41, 0.6),
    lineD(-56, -22, 56, -22, 42, 0.6),
    lineD(-48, 26, 48, 26, 43, 0.6),
    lineD(-56, -22, 0, 66, 44, 0.5),
    lineD(56, -22, 0, 66, 45, 0.5),
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d={head} p={p} color={color} width={4} fill={color} fillOpacity={0.09} />
      {webs.map((d, i) => (
        <Ink key={i} d={d} p={p} color={color} width={2.6} opacity={0.55} />
      ))}
      {[-1, 1].map((side) => (
        <g key={side}>
          <path
            d={`M ${side * 14} -14 C ${side * 38} -46, ${side * 56} -38, ${side * 50} -8 C ${side * 44} 18, ${side * 24} 18, ${side * 14} -14 Z`}
            fill={C.ink}
            opacity={0.92 * p}
          />
          <path
            d={`M ${side * 20} -12 C ${side * 35} -32, ${side * 46} -27, ${side * 43} -8`}
            fill="none"
            stroke={C.bg}
            strokeWidth={2.4}
            opacity={p}
          />
        </g>
      ))}
    </g>
  );
};

export const Dog: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  fill?: string;
  poodle?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.ink, fill = C.current, poodle = false}) => {
  if (poodle) {
    return (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <Ink d="M -70 4 C -94 -10 -108 -36 -100 -54" p={p} color={color} width={3} />
        <Ink d={circleD(-108, -60, 16, 701, 1.4)} p={p} color={color} width={3.2} fill={fill} fillOpacity={0.15} />
        {[
          [-6, 10, 30],
          [26, -2, 27],
          [54, 16, 22],
          [-38, 20, 22],
        ].map(([cx, cy, r], i) => (
          <Ink key={i} d={circleD(cx, cy, r, 702 + i, 2.2)} p={p} color={color} width={3.1} fill={fill} fillOpacity={0.14} />
        ))}
        <Ink d="M 48 -6 C 56 -22 64 -34 72 -42" p={p} color={color} width={3} opacity={0.6} />
        <Ink d={circleD(78, -46, 23, 710, 1.2)} p={p} color={color} width={3.3} fill={fill} fillOpacity={0.14} />
        <Ink d={circleD(78, -74, 14, 711, 1.4)} p={p} color={color} width={3} fill={fill} fillOpacity={0.16} />
        <Ink d={polyD([[94, -50], [120, -42], [124, -28], [98, -26]], 712, 0.8, true)} p={p} color={color} width={3.1} fill={fill} fillOpacity={0.08} />
        <circle cx={120} cy={-36} r={4} fill={color} opacity={p} />
        <circle cx={86} cy={-50} r={2.8} fill={color} opacity={p} />
        <Ink d="M 64 -58 C 54 -74 48 -46 52 -22 C 54 -6 62 0 68 -10" p={p} color={color} width={3} fill={fill} fillOpacity={0.14} />
        <Ink d={lineD(100, -28, 116, -25, 713, 0.5)} p={p} color={color} width={2.2} opacity={0.55} />
        {[0, 1, 2, 3].map((i) => (
          <Ink key={i} d={lineD(-34 + i * 24, 38, -34 + i * 24, 94, 714 + i, 0.6)} p={p} color={color} width={3} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <Ink key={i} d={circleD(-34 + i * 24, 98, 7, 718 + i, 0.6)} p={p} color={color} width={2.4} fill={fill} fillOpacity={0.1} />
        ))}
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d="M -76 6 C -100 0 -112 -24 -104 -44 C -100 -54 -92 -56 -86 -50" p={p} color={color} width={4} />
      <Ink d="M -76 32 C -84 52 -88 80 -86 98 L -86 106 L -70 106 L -70 98 C -70 78 -68 54 -64 32" p={p} color={color} width={3.2} fill={fill} fillOpacity={0.05} />
      <Ink d="M -54 36 C -58 56 -56 82 -52 100 L -52 108 L -36 108 L -36 100 C -34 80 -36 58 -40 36" p={p} color={color} width={3.2} fill={fill} fillOpacity={0.05} />
      <Ink d={ellipseD(-6, 12, 70, 30, 61, 1.2)} p={p} color={color} width={3.8} fill={fill} fillOpacity={0.11} />
      <Ink d="M 24 38 C 28 56 26 80 24 98 L 24 106 L 38 106 L 38 98 C 36 78 34 56 32 38" p={p} color={color} width={3.2} fill={fill} fillOpacity={0.05} />
      <Ink d="M 42 36 C 46 54 46 76 44 94 L 44 104 L 60 104 L 60 96 C 58 76 56 54 54 36" p={p} color={color} width={3.2} fill={fill} fillOpacity={0.05} />
      <Ink d={circleD(78, -22, 24, 62, 1.1)} p={p} color={color} width={3.6} fill={fill} fillOpacity={0.11} />
      <Ink d="M 88 -34 C 108 -37 126 -30 132 -20 C 136 -12 126 -5 108 -7 L 88 -11 Z" p={p} color={color} width={3.3} fill={fill} fillOpacity={0.08} />
      <Ink d="M 74 -44 C 56 -54 46 -34 50 -14 C 53 0 62 8 72 2 C 82 -4 84 -28 74 -44 Z" p={p} color={color} width={3.1} fill={fill} fillOpacity={0.17} />
      <Ink d={arcD(60, -18, 15, -1.0, 0.7, 644, 0.5)} p={p} color={color} width={2.1} opacity={0.4} />
      <circle cx={88} cy={-28} r={3.2} fill={color} opacity={p} />
      <circle cx={130} cy={-19} r={4.5} fill={color} opacity={p} />
      <Ink d="M 104 -7 C 116 -6 126 -10 131 -16" p={p} color={color} width={2.5} opacity={0.65} />
      <Ink d="M 62 -2 C 68 -12 72 -22 74 -32" p={p} color={color} width={2.8} opacity={0.5} />
      <Ink d="M 64 20 C 72 12 78 2 80 -6" p={p} color={color} width={2.8} opacity={0.5} />
      <Ink d={lineD(68, -2, 80, -4, 645, 0.4)} p={p} color={color} width={2.4} opacity={0.35} />
    </g>
  );
};

export const PiggyBank: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.green}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d={ellipseD(0, 4, 100, 62, 71, 1.3)} p={p} color={color} width={4} fill={C.pink} fillOpacity={0.1} />
    <Ink d={circleD(78, -8, 36, 72, 1.4)} p={p} color={color} width={3.6} fill={C.pink} fillOpacity={0.1} />
    <Ink d={ellipseD(106, 4, 18, 22, 73, 1.1)} p={p} color={color} width={3.3} />
    <circle cx={101} cy={0} r={3} fill={color} opacity={p} />
    <circle cx={112} cy={0} r={3} fill={color} opacity={p} />
    <circle cx={86} cy={-22} r={3.2} fill={color} opacity={p} />
    <Ink d={polyD([[-72, -40], [-88, -74], [-52, -54]], 74, 1.2, true)} p={p} color={color} width={3.2} fill={C.pink} fillOpacity={0.08} />
    <Ink d={rectD(-28, -64, 44, 10, 75, 0.7, 4)} p={p} color={accent} width={3.2} fill={accent} fillOpacity={0.2} />
    {[-48, 40].map((lx, i) => (
      <Ink key={i} d={lineD(lx, 50, lx, 82, 76 + i, 0.8)} p={p} color={color} width={3.4} />
    ))}
    <Ink d={circleD(-28, -98, 18, 77, 1.2)} p={p} color={accent} width={3.2} fill={accent} fillOpacity={0.14} />
    <Txt x={-28} y={-96} size={26} color={accent} opacity={p}>$</Txt>
  </g>
);

export const Toaster: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d={rectD(-76, -48, 152, 108, 81, 1.2, 18)} p={p} color={color} width={3.8} fill={C.current} fillOpacity={0.22} />
    <Ink d={lineD(-44, -48, -44, -18, 82, 0.7)} p={p} color={color} width={3.2} />
    <Ink d={lineD(10, -48, 10, -18, 83, 0.7)} p={p} color={color} width={3.2} />
    <Ink d={rectD(-50, -92, 46, 48, 84, 1, 6)} p={p} color={color} width={3.1} fill={C.yellow} fillOpacity={0.08} />
    <Ink d={rectD(2, -98, 46, 54, 85, 1, 6)} p={p} color={color} width={3.1} fill={C.yellow} fillOpacity={0.08} />
    <Ink d={lineD(64, -20, 92, -20, 86, 0.7)} p={p} color={C.orange} width={4} />
    <Ink d={circleD(64, -20, 8, 87, 0.8)} p={p} color={C.orange} width={3} fill={C.orange} fillOpacity={0.3} />
  </g>
);

export const Volcano: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink
      d={polyD(
        [
          [-120, 80],
          [-40, -42],
          [-18, -42],
          [-10, -24],
          [2, -46],
          [22, -46],
          [120, 80],
        ],
        91,
        1.2,
      )}
      p={p}
      color={color}
      width={4}
      fill={C.current}
      fillOpacity={0.15}
    />
    <Ink d={arcD(-6, -46, 22, Math.PI, Math.PI * 2, 92, 1, 12)} p={p} color={C.red} width={3.4} fill={C.red} fillOpacity={0.1} />
    <Ink d={waveD(-34, -92, 30, -112, 16, 1.5, 93)} p={p} color={C.muted} width={3} opacity={0.7} />
    <Ink d={lineD(-54, 54, -4, -30, 94, 0.8)} p={p} color={C.red} width={3.2} opacity={0.8} />
  </g>
);

/* ------------------------------------------------------------------ */
/* People & faces                                                      */
/* ------------------------------------------------------------------ */

export const Face: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  mood?: 'neutral' | 'happy' | 'sad' | 'fear' | 'anger';
  accent?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink, mood = 'neutral', accent = C.yellow}) => {
  const mouth =
    mood === 'happy'
      ? arcD(0, 8, 36, 0.25, Math.PI - 0.25, 101, 1, 24)
      : mood === 'sad'
        ? arcD(0, 34, 36, Math.PI + 0.25, Math.PI * 2 - 0.25, 102, 1, 24)
        : mood === 'fear'
          ? ellipseD(0, 26, 14, 18, 103, 1)
          : mood === 'anger'
            ? arcD(0, 42, 36, Math.PI + 0.3, Math.PI * 2 - 0.3, 104, 1, 18)
            : lineD(-18, 24, 18, 24, 105, 0.8);
  const brows =
    mood === 'sad' || mood === 'fear'
      ? [lineD(-36, -22, -12, -30, 106, 0.7), lineD(12, -30, 36, -22, 107, 0.7)]
      : mood === 'anger'
        ? [lineD(-38, -34, -12, -18, 106, 0.7), lineD(12, -18, 38, -34, 107, 0.7)]
        : [lineD(-36, -26, -14, -26, 106, 0.6), lineD(14, -26, 36, -26, 107, 0.6)];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d={circleD(0, 0, 80, 100, 1.8)} p={p} color={color} width={4} fill={accent} fillOpacity={0.04} />
      <circle cx={-28} cy={-8} r={4.2} fill={color} opacity={p} />
      <circle cx={28} cy={-8} r={4.2} fill={color} opacity={p} />
      {brows.map((d, i) => (
        <Ink key={i} d={d} p={p} color={color} width={3} opacity={0.75} />
      ))}
      <Ink d={lineD(0, -2, -4, 18, 108, 0.6)} p={p} color={color} width={2.8} opacity={0.55} />
      <Ink d={mouth} p={p} color={color} width={3.4} />
    </g>
  );
};

export const Head: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  variant?: 'berry' | 'obama' | 'jesus' | 'trump' | 'generic';
  label?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.purple, variant = 'generic', label}) => {
  const hair =
    variant === 'berry'
      ? polyD(
          [
            [-46, 28],
            [-58, -18],
            [-48, -62],
            [-14, -84],
            [24, -82],
            [52, -60],
            [58, -20],
            [50, 18],
            [55, 48],
            [42, 68],
            [30, 46],
            [20, 24],
            [-18, 24],
            [-30, 46],
            [-42, 70],
            [-55, 50],
            [-50, 18],
          ],
          121,
          1.8,
          true,
          0.6,
        )
      : variant === 'jesus'
        ? polyD(
            [
              [-46, 30],
              [-58, -22],
              [-42, -70],
              [0, -88],
              [42, -70],
              [58, -22],
              [50, 28],
              [54, 66],
              [32, 78],
              [18, 48],
              [0, 26],
              [-20, 50],
              [-34, 78],
              [-56, 64],
            ],
            122,
            1.8,
            true,
          )
        : variant === 'trump'
          ? polyD(
              [
                [-46, 16],
                [-58, -40],
                [-30, -76],
                [16, -84],
                [48, -62],
                [52, -32],
                [36, -50],
                [4, -42],
                [-28, -28],
                [-40, -4],
              ],
              123,
              1.8,
            )
          : polyD(
              [
                [-44, 8],
                [-48, -40],
                [-26, -70],
                [16, -76],
                [44, -52],
                [46, -16],
                [28, -34],
                [-4, -36],
                [-34, -24],
              ],
              124,
              1.5,
            );
  const shoulders = polyD(
    [
      [-72, 132],
      [-56, 104],
      [-24, 88],
      [24, 88],
      [56, 104],
      [72, 132],
    ],
    131,
    1.4,
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {variant === 'jesus' ? (
        <Ink d={arcD(0, -18, 78, -2.75, -0.39, 126, 1.2)} p={p} color={accent} width={3.4} opacity={0.8} />
      ) : null}
      <Ink d={shoulders} p={p} color={color} width={3.2} opacity={0.55} />
      <Ink d={hair} p={p} color={color} width={3.2} fill={C.current} fillOpacity={0.42} />
      <Ink d={ellipseD(0, -2, 40, 48, 120, 1.2)} p={p} color={color} width={3.7} fill={C.bg} fillOpacity={0.55} />
      {variant === 'berry' ? (
        <>
          <Ink d={arcD(0, -10, 44, Math.PI * 1.06, Math.PI * 1.94, 132, 0.8)} p={p} color={color} width={2.8} opacity={0.7} />
          <Ink d={lineD(-42, -8, -30, 24, 133, 0.7)} p={p} color={color} width={2.4} opacity={0.5} />
          <Ink d={lineD(42, -8, 30, 24, 134, 0.7)} p={p} color={color} width={2.4} opacity={0.5} />
        </>
      ) : null}
      <circle cx={-15} cy={-4} r={3.4} fill={color} opacity={p} />
      <circle cx={15} cy={-4} r={3.4} fill={color} opacity={p} />
      <Ink d={lineD(0, 4, -3, 18, 125, 0.6)} p={p} color={color} width={2.6} opacity={0.55} />
      {variant === 'jesus' ? (
        <Ink d={polyD([[-26, 26], [-16, 58], [0, 66], [16, 58], [26, 26]], 135, 1.2)} p={p} color={color} width={2.8} fill={C.current} fillOpacity={0.5} />
      ) : null}
      <Ink
        d={variant === 'jesus' ? lineD(-14, 36, 14, 36, 136, 0.6) : arcD(0, 18, 16, 0.35, Math.PI - 0.35, 137, 0.5, 7)}
        p={p}
        color={color}
        width={2.8}
        opacity={0.75}
      />
      {variant === 'obama' || variant === 'trump' ? (
        <>
          <Ink d={lineD(-26, 88, -8, 112, 138, 0.6)} p={p} color={color} width={2.6} opacity={0.5} />
          <Ink d={lineD(26, 88, 8, 112, 139, 0.6)} p={p} color={color} width={2.6} opacity={0.5} />
          <Ink d={polyD([[-7, 94], [0, 106], [7, 94], [5, 128], [0, 138], [-5, 128]], 140, 0.6, true)} p={p} color={variant === 'trump' ? C.red : C.purple} width={2.4} fill={variant === 'trump' ? C.red : C.purple} fillOpacity={0.4} />
        </>
      ) : null}
      {label ? <Txt x={0} y={164} size={36} color={C.muted} opacity={p}>{label}</Txt> : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* Systems                                                             */
/* ------------------------------------------------------------------ */

export const Chip: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  p?: number;
  color?: string;
  children?: React.ReactNode;
  label?: string;
}> = ({x, y, w = 380, h = 300, p = 1, color = C.ink, children, label}) => {
  const pins = 6;
  return (
    <g>
      <Ink d={rectD(x - w / 2, y - h / 2, w, h, 140, 1.2, 24)} p={p} color={color} width={3.8} fill={C.recess} fillOpacity={0.55} />
      {Array.from({length: pins}).map((_, i) => {
        const px = x - w / 2 + 38 + (i * (w - 76)) / (pins - 1);
        return (
          <g key={i}>
            <Ink d={lineD(px, y - h / 2, px, y - h / 2 - 20, 141 + i, 0.5)} p={p} color={color} width={3} opacity={0.6} />
            <Ink d={lineD(px, y + h / 2, px, y + h / 2 + 20, 151 + i, 0.5)} p={p} color={color} width={3} opacity={0.6} />
          </g>
        );
      })}
      {label ? (
        <Txt x={x} y={y + h / 2 - 26} size={30} color={C.muted} opacity={p} letterSpacing={3}>
          {label}
        </Txt>
      ) : null}
      {children}
    </g>
  );
};

export const Network: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  layers?: number[];
  opacity?: number;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.cyan, layers = [4, 5, 3], opacity = 1}) => {
  const gapX = 110;
  const nodes = layers.map((n, li) => {
    const gapY = 74;
    return Array.from({length: n}).map((_, ni) => ({
      x: (li - (layers.length - 1) / 2) * gapX,
      y: (ni - (n - 1) / 2) * gapY,
    }));
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      {nodes.slice(0, -1).map((layer, li) =>
        layer.map((a, ai) =>
          nodes[li + 1].map((b, bi) => (
            <line
              key={`${li}-${ai}-${bi}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={C.deep}
              strokeWidth={1.6}
              opacity={0.32 * p}
            />
          )),
        ),
      )}
      {nodes.map((layer, li) =>
        layer.map((n, ni) => (
          <g key={`${li}-${ni}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r={13}
              fill={C.surface}
              stroke={li === nodes.length - 1 && ni === 0 ? accent : color}
              strokeWidth={2.8}
              opacity={p}
            />
            {li === nodes.length - 1 && ni === 0 ? (
              <circle cx={n.x} cy={n.y} r={5} fill={accent} opacity={p} />
            ) : null}
          </g>
        )),
      )}
    </g>
  );
};

export const World: React.FC<{
  x: number;
  y: number;
  r?: number;
  p?: number;
  color?: string;
  markers?: {x: number; y: number; label?: string; color?: string; at?: number}[];
}> = ({x, y, r = 230, p = 1, color = C.ink, markers = []}) => {
  const latitudes = [-0.55, 0, 0.55].map((v) =>
    arcD(0, 0, r, 0, Math.PI * 2, 160 + Math.round(v * 10), 0.8, r * Math.abs(v) * 0.9 || 2),
  );
  // Longitude arcs as ellipses of varying widths.
  const longs = [0.42, 0.72, 1].map((v, i) =>
    ellipseD(0, 0, r * v, r, 170 + i, 1),
  );
  const t = useT();
  return (
    <g transform={`translate(${x} ${y})`}>
      <Ink d={circleD(0, 0, r, 159, 1.6)} p={p} color={color} width={4} />
      {longs.map((d, i) => (
        <Ink key={`l${i}`} d={d} p={p} color={color} width={2.4} opacity={0.28} />
      ))}
      {latitudes.map((d, i) => (
        <Ink key={`a${i}`} d={d} p={p} color={color} width={2.4} opacity={0.28} />
      ))}
      <Ink
        d={polyD(
          [
            [-120, -66],
            [-78, -92],
            [-44, -64],
            [-58, -26],
            [-30, -6],
            [-54, 24],
            [-88, 8],
            [-118, 24],
            [-144, -10],
          ],
          175,
          3,
          true,
        )}
        p={p}
        color={color}
        width={3}
        fill={C.current}
        fillOpacity={0.18}
      />
      <Ink
        d={polyD(
          [
            [-26, -38],
            [26, -54],
            [52, -20],
            [36, 16],
            [52, 48],
            [14, 70],
            [-6, 36],
            [-20, 4],
          ],
          176,
          3,
          true,
        )}
        p={p}
        color={color}
        width={3}
        fill={C.current}
        fillOpacity={0.18}
      />
      <Ink
        d={polyD(
          [
            [64, -78],
            [132, -86],
            [168, -40],
            [138, 0],
            [104, 28],
            [88, -8],
            [108, -44],
          ],
          177,
          3,
          true,
        )}
        p={p}
        color={color}
        width={3}
        fill={C.current}
        fillOpacity={0.18}
      />
      <Ink
        d={polyD(
          [
            [70, 36],
            [112, 30],
            [138, 54],
            [112, 82],
            [78, 70],
          ],
          178,
          2.4,
          true,
        )}
        p={p}
        color={color}
        width={2.8}
        fill={C.current}
        fillOpacity={0.14}
      />
      {markers.map((m, i) => {
        const vis = m.at === undefined ? 1 : t >= m.at ? 1 : 0;
        const mx = m.x * r;
        const my = m.y * r;
        return (
          <g key={i} opacity={vis * p}>
            <circle cx={mx} cy={my} r={7} fill={m.color ?? C.orange} />
            <circle cx={mx} cy={my} r={13} fill="none" stroke={m.color ?? C.orange} strokeWidth={2.2} opacity={0.6} />
            {m.label ? <Txt x={mx} y={my - 30} size={36} color={m.color ?? C.orange}>{m.label}</Txt> : null}
          </g>
        );
      })}
    </g>
  );
};

export const Balance: React.FC<{
  x: number;
  y: number;
  s?: number;
  tilt?: number;
  p?: number;
  color?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}> = ({x, y, s = 1, tilt = 0, p = 1, color = C.ink, left, right}) => {
  const beamY = -100;
  const lx = -150;
  const rx = 150;
  const leftY = beamY + Math.tan(tilt) * lx;
  const rightY = beamY + Math.tan(tilt) * rx;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d={lineD(0, 150, 0, -40, 181, 0.8)} p={p} color={color} width={4} />
      <Ink d={polyD([[-90, 154], [90, 154]], 182, 0.7)} p={p} color={color} width={4} />
      <Ink d={lineD(-150, leftY, 150, rightY, 183, 0.9)} p={p} color={color} width={4.2} />
      <Ink d={circleD(0, -40, 12, 184, 0.8)} p={p} color={color} width={3.2} fill={C.current} fillOpacity={0.5} />
      {[-150, 150].map((px, i) => {
        const py = i === 0 ? leftY : rightY;
        return (
          <g key={i}>
            <Ink d={lineD(px, py, px, py + 66, 185 + i, 0.5)} p={p} color={color} width={2.6} opacity={0.7} />
            <Ink d={arcD(px, py + 66, 62, 0, Math.PI, 187 + i, 0.8, 15)} p={p} color={color} width={3.4} />
            <g transform={`translate(${px} ${py + 66})`}>{i === 0 ? left : right}</g>
          </g>
        );
      })}
    </g>
  );
};

export const Bars: React.FC<{
  x: number;
  y: number;
  values: number[];
  labels?: string[];
  colors?: string[];
  p?: number;
  w?: number;
  h?: number;
  max?: number;
}> = ({x, y, values, labels = [], colors = [], p = 1, w = 520, h = 230, max}) => {
  const m = max ?? Math.max(...values, 1);
  const bw = w / (values.length * 1.8);
  return (
    <g>
      <Ink d={lineD(x - w / 2, y + h / 2, x + w / 2, y + h / 2, 190, 0.8)} p={p} color={C.muted} width={3.4} opacity={0.7} />
      {values.map((v, i) => {
        const bx = x - w / 2 + bw * 0.9 + i * (w / values.length);
        const bh = (v / m) * h;
        return (
          <g key={i}>
            <Ink
              d={rectD(bx, y + h / 2 - bh, bw, bh, 191 + i, 0.8, 3)}
              p={p}
              color={colors[i] ?? C.ink}
              width={3.2}
              fill={colors[i] ?? C.ink}
              fillOpacity={0.16}
            />
            {labels[i] ? (
              <Txt x={bx + bw / 2} y={y + h / 2 + 34} size={30} color={C.muted} opacity={p}>
                {labels[i]}
              </Txt>
            ) : null}
          </g>
        );
      })}
    </g>
  );
};

export const Bridge: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {/* water */}
    <Ink d={waveD(-260, 92, 260, 92, 7, 7, 200)} p={p} color={C.cyan} width={2.4} opacity={0.55} />
    {/* deck */}
    <Ink d={lineD(-260, 46, 260, 46, 201, 0.8)} p={p} color={color} width={4} />
    {/* towers */}
    <Ink d={lineD(-112, 46, -112, -140, 202, 0.7)} p={p} color={color} width={4.2} />
    <Ink d={lineD(112, 46, 112, -140, 203, 0.7)} p={p} color={color} width={4.2} />
    <Ink d={lineD(-124, -132, -100, -132, 204, 0.4)} p={p} color={color} width={3} />
    <Ink d={lineD(100, -132, 124, -132, 205, 0.4)} p={p} color={color} width={3} />
    {/* main cable: anchors, towers, center sag */}
    <Ink d="M -260 34 C -220 -30, -160 -104, -112 -140 C -60 -152, -20 -74, 0 -62 C 20 -74, 60 -152, 112 -140 C 160 -104, 220 -30, 260 34" p={p} color={color} width={3.2} />
    {/* vertical suspenders */}
    {Array.from({length: 9}).map((_, i) => {
      const t = i / 8;
      const bx = -260 + t * 520;
      let top = 46;
      if (bx > -112 && bx < 0) {
        const k = (bx + 112) / 112;
        top = -140 + (78 * k * k);
      } else if (bx >= 0 && bx < 112) {
        const k = bx / 112;
        top = -62 + (-78 * k * k);
      } else if (bx <= -112) {
        const k = (bx + 260) / 148;
        top = 34 + (-174 * Math.sin(k * Math.PI * 0.5));
      } else {
        const k = (260 - bx) / 148;
        top = 34 + (-174 * Math.sin(k * Math.PI * 0.5));
      }
      return <Ink key={i} d={lineD(bx, top, bx, 46, 210 + i, 0.35)} p={p} color={color} width={1.8} opacity={0.5} />;
    })}
    {/* lamps */}
    {[-112, 112].map((bx, i) => (
      <circle key={i} cx={bx} cy={-146} r={4} fill={C.yellow} opacity={0.6 * p} />
    ))}
  </g>
);
export const Speech: React.FC<{
  x: number;
  y: number;
  p?: number;
  color?: string;
  size?: number;
}> = ({x, y, p = 1, color = C.cyan, size = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${size})`}>
    {[0, 1, 2].map((i) => (
      <Ink
        key={i}
        d={arcD(-46, 0, 20 + i * 20, -0.75, 0.75, 230 + i, 1)}
        p={p}
        color={color}
        width={3.2}
        opacity={0.8 - i * 0.18}
      />
    ))}
  </g>
);

export const SoundWave: React.FC<{
  x: number;
  y: number;
  w?: number;
  p?: number;
  color?: string;
  seed?: number;
}> = ({x, y, w = 260, p = 1, color = C.cyan, seed = 240}) => {
  const bars = 18;
  return (
    <g>
      {Array.from({length: bars}).map((_, i) => {
        const bx = x - w / 2 + (i * w) / (bars - 1);
        const h = 10 + Math.abs(Math.sin(i * 1.7 + seed)) * 46;
        return <Ink key={i} d={lineD(bx, y - h / 2, bx, y + h / 2, seed + i, 0.5)} p={p} color={color} width={3.4} />;
      })}
    </g>
  );
};

export const Pen: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  rotate?: number;
  marker?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.ink, rotate = -35, marker = false}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
    <Ink
      d={polyD(
        [
          [-150, -22],
          [90, -22],
          [128, -10],
          [128, 10],
          [90, 22],
          [-150, 22],
        ],
        250,
        0.9,
        true,
      )}
      p={p}
      color={color}
      width={3.4}
      fill={marker ? C.current : C.surface}
      fillOpacity={0.5}
    />
    <Ink d={lineD(-96, -22, -96, 22, 251, 0.5)} p={p} color={color} width={2.8} opacity={0.6} />
    <Ink d={polyD([[-150, -22], [-186, 0], [-150, 22]], 252, 0.8, true)} p={p} color={marker ? C.ink : C.orange} width={3.2} fill={marker ? C.ink : C.orange} fillOpacity={0.15} />
  </g>
);

export const Paper: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  p?: number;
  color?: string;
  lines?: number;
  title?: string;
}> = ({x, y, w = 300, h = 380, p = 1, color = C.ink, lines = 8, title}) => (
  <g>
    <Ink d={rectD(x - w / 2, y - h / 2, w, h, 260, 1.1, 6)} p={p} color={color} width={3.4} fill={C.ink} fillOpacity={0.03} />
    {title ? (
      <Txt x={x} y={y - h / 2 + 48} size={34} color={color} opacity={p}>
        {title}
      </Txt>
    ) : null}
    {Array.from({length: lines}).map((_, i) => {
      const yy = y - h / 2 + (title ? 92 : 50) + i * 30;
      return <Ink key={i} d={lineD(x - w / 2 + 28, yy, x + w / 2 - 28 - (i % 3 === 2 ? 60 : 0), yy, 261 + i, 0.5)} p={p} color={C.muted} width={2.6} opacity={0.55} />;
    })}
  </g>
);

export const Photo: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  p?: number;
  seed?: number;
  children?: React.ReactNode;
  border?: string;
  fill?: string;
}> = ({x, y, w = 210, h = 250, p = 1, seed = 280, children, border = C.ink, fill = C.current}) => (
  <g>
    <Ink
      d={rectD(x - w / 2, y - h / 2, w, h, seed, 1.1, 8)}
      p={p}
      color={border}
      width={3.3}
      fill={fill}
      fillOpacity={0.18}
    />
    <Ink d={rectD(x - w / 2 + 16, y - h / 2 + 16, w - 32, h - 60, seed + 1, 0.8, 4)} p={p} color={border} width={2.4} opacity={0.5} />
    {children}
  </g>
);

export const MiniLabel: React.FC<{
  x: number;
  y: number;
  children: React.ReactNode;
  color?: string;
  size?: number;
  opacity?: number;
}> = ({x, y, children, color = C.muted, size = 38, opacity = 1}) => (
  <Txt x={x} y={y} size={size} color={color} opacity={opacity}>
    {children}
  </Txt>
);

/** Side-profile portrait, used for the Halle Berry concept. */
export const Profile: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  hair?: boolean;
  mask?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.pink, hair = true, mask = false}) => {
  const face = polyD(
    [
      [8, -56],
      [-18, -50],
      [-38, -34],
      [-44, -20],
      [-50, -4],
      [-42, 2],
      [-46, 12],
      [-36, 16],
      [-38, 26],
      [-26, 34],
      [-8, 40],
      [8, 52],
      [8, 68],
      [30, 68],
      [38, 40],
      [50, 10],
      [52, -20],
      [38, -50],
    ],
    701,
    1.4,
    true,
    0.55,
  );
  const hairPath = polyD(
    [
      [8, -58],
      [-16, -60],
      [-34, -50],
      [-42, -34],
      [-24, -44],
      [0, -45],
      [24, -40],
      [44, -50],
      [58, -32],
      [64, -2],
      [58, 30],
      [66, 62],
      [56, 92],
      [42, 70],
      [44, 42],
      [34, 18],
      [30, 54],
      [16, 72],
      [4, 50],
      [2, 22],
    ],
    702,
    1.5,
    true,
    0.5,
  );
  const shoulders = polyD(
    [
      [-58, 126],
      [-36, 102],
      [-10, 88],
      [16, 88],
      [48, 102],
      [66, 126],
    ],
    703,
    1.2,
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d={shoulders} p={p} color={color} width={3.2} opacity={0.5} />
      {hair ? <Ink d={hairPath} p={p} color={color} width={3.2} fill={C.current} fillOpacity={0.35} /> : null}
      <Ink d={face} p={p} color={color} width={3.7} fill={C.bg} fillOpacity={0.72} />
      {!mask ? (
        <>
          <circle cx={-24} cy={-18} r={3.2} fill={color} opacity={p} />
          <Ink d={lineD(-36, -28, -20, -30, 704, 0.5)} p={p} color={color} width={2.4} opacity={0.7} />
          <Ink d={lineD(-33, 14, -23, 14, 705, 0.4)} p={p} color={color} width={2.4} opacity={0.65} />
          <Ink d={lineD(-40, -2, -46, 4, 706, 0.4)} p={p} color={color} width={2.2} opacity={0.55} />
        </>
      ) : null}
      {mask ? (
        <>
          <path d={face} fill={C.red} opacity={0.1 * p} />
          <path
            d="M -52 -12 C -66 -38, -70 12, -46 22 C -26 30, -8 16, -8 -2 C -8 -24, -34 -34, -52 -12 Z"
            fill={C.red}
            opacity={0.16 * p}
          />
          <path
            d="M -44 -8 C -58 -26, -62 6, -44 14 C -28 20, -14 8, -14 -4 C -14 -20, -30 -24, -44 -8 Z"
            fill="none"
            stroke={C.red}
            strokeWidth={3.2}
            opacity={p}
          />
          <path d="M 4 -55 L 10 -88 L 26 -65" fill="none" stroke={C.red} strokeWidth={3.2} opacity={p} strokeLinecap="round" />
        </>
      ) : null}
      <Ink d={arcD(30, -18, 30, -1.6, 0.9, 707, 0.8)} p={p} color={accent} width={2.6} opacity={0.35} />
    </g>
  );
};

export const Brain: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  opacity?: number;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.pink, opacity = 1}) => {
  const outline = polyD(
    [
      [-148, -12],
      [-158, -64],
      [-122, -108],
      [-72, -116],
      [-36, -146],
      [14, -136],
      [64, -144],
      [112, -116],
      [146, -74],
      [158, -22],
      [144, 18],
      [154, 62],
      [120, 92],
      [72, 88],
      [40, 118],
      [0, 106],
      [-42, 122],
      [-82, 98],
      [-126, 98],
      [-152, 56],
      [-144, 18],
    ],
    801,
    2,
    true,
    0.55,
  );
  const folds = [
    'M -118 -24 C -82 -62 -56 -20 -20 -46 C 4 -62 26 -36 52 -58',
    'M -130 44 C -92 22 -64 66 -26 40 C 4 18 18 54 52 32',
    'M 38 -112 C 22 -78 58 -58 44 -22 C 34 4 64 16 54 50',
    'M -58 86 C -46 58 -12 66 2 44',
    'M 74 78 C 64 46 94 28 108 8',
    'M -92 -94 C -82 -70 -106 -54 -96 -30',
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <Ink d={outline} p={p} color={color} width={4} fill={accent} fillOpacity={0.05} />
      {folds.map((d, i) => (
        <Ink key={i} d={d} p={p} color={color} width={2.8} opacity={0.55} />
      ))}
      <Ink d={lineD(-4, -138, -2, 108, 810, 1.2)} p={p} color={color} width={2.4} opacity={0.3} />
    </g>
  );
};

export const Monitor: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  p?: number;
  color?: string;
  children?: React.ReactNode;
  stand?: boolean;
}> = ({x, y, w = 520, h = 320, p = 1, color = C.ink, children, stand = true}) => (
  <g>
    <Ink d={rectD(x - w / 2, y - h / 2, w, h, 820, 1.3, 18)} p={p} color={color} width={3.8} fill={C.recess} fillOpacity={0.6} />
    <Ink d={rectD(x - w / 2 + 22, y - h / 2 + 22, w - 44, h - 44, 821, 0.9, 8)} p={p} color={color} width={2.2} opacity={0.4} />
    {stand ? (
      <>
        <Ink d={lineD(x, y + h / 2, x, y + h / 2 + 42, 822, 0.6)} p={p} color={color} width={3.2} opacity={0.6} />
        <Ink d={lineD(x - 58, y + h / 2 + 44, x + 58, y + h / 2 + 44, 823, 0.5)} p={p} color={color} width={3.2} opacity={0.6} />
      </>
    ) : null}
    {children}
  </g>
);

export const Building: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  floors?: number;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.red, floors = 2}) => {
  const w = 460;
  const h = 340;
  const win: React.ReactNode[] = [];
  for (let r = 0; r < 2; r++) {
    for (const side of [-1, 1]) {
      for (let c = 0; c < 2; c++) {
        const wx = side * 118 + (c === 0 ? -42 : 6);
        const wy = -88 + r * 74;
        win.push(<Ink key={`${r}-${side}-${c}`} d={rectD(wx, wy, 46, 46, 831 + r * 9 + c * 3 + side, 0.7, 4)} p={p} color={color} width={2.6} opacity={0.55} />);
      }
    }
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d={lineD(-300, 174, 300, 174, 830, 0.8)} p={p} color={color} width={4} opacity={0.55} />
      <Ink d={rectD(-w / 2, -h / 2, w, h, 832, 1.2, 6)} p={p} color={color} width={4} fill={C.surface} fillOpacity={0.18} />
      <Ink d={lineD(-w / 2 - 14, -h / 2 - 10, w / 2 + 14, -h / 2 - 10, 833, 0.7)} p={p} color={color} width={3.2} opacity={0.7} />
      {win}
      <Ink d={rectD(-56, 56, 112, 118, 836, 0.8, 3)} p={p} color={color} width={3.4} fill={C.recess} fillOpacity={0.5} />
      <Ink d={lineD(0, 58, 0, 172, 837, 0.5)} p={p} color={color} width={2.2} opacity={0.35} />
      <Ink d={circleD(34, 116, 3.5, 838, 0.5)} p={p} color={accent} width={2.2} fill={accent} fillOpacity={0.6} />
      {/* cross sign */}
      <Ink d={rectD(-37, -72, 74, 74, 839, 0.9, 6)} p={p} color={accent} width={3.2} fill={accent} fillOpacity={0.1} />
      <Ink d={lineD(-18, -35, 18, -35, 840, 0.5)} p={p} color={accent} width={6} />
      <Ink d={lineD(0, -53, 0, -17, 841, 0.5)} p={p} color={accent} width={6} />
    </g>
  );
};

export const IPod: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.cyan}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d={rectD(-34, -58, 68, 116, 850, 1.0, 8)} p={p} color={color} width={3.6} fill={C.surface} fillOpacity={0.4} />
    <Ink d={rectD(-25, -48, 50, 38, 851, 0.6, 3)} p={p} color={color} width={2.4} fill={C.recess} fillOpacity={0.8} />
    <Ink d={circleD(0, 28, 19, 852, 1)} p={p} color={color} width={2.8} />
    <Ink d={circleD(0, 28, 7, 853, 0.7)} p={p} color={accent} width={2.2} fill={accent} fillOpacity={0.25} />
    <Ink d={lineD(0, 6, 0, 13, 854, 0.4)} p={p} color={color} width={2.2} opacity={0.5} />
  </g>
);

export const Cake: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.yellow}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d={rectD(-62, -6, 124, 58, 860, 1, 6)} p={p} color={color} width={3.2} fill={C.pink} fillOpacity={0.1} />
    <Ink d={waveD(-62, -6, 62, -2, 12, 3, 861)} p={p} color={accent} width={3} />
    <Ink d={lineD(-52, 52, 52, 52, 862, 0.5)} p={p} color={color} width={3.2} opacity={0.55} />
    {[-34, 0, 34].map((cx, i) => (
      <g key={i}>
        <Ink d={lineD(cx, -8, cx, -34, 863 + i, 0.5)} p={p} color={color} width={2.8} />
        <Ink d={polyD([[cx, -52], [cx + 6, -38], [cx, -36], [cx - 6, -38]], 866 + i, 0.5, true)} p={p} color={accent} width={2.2} fill={accent} fillOpacity={0.5} />
      </g>
    ))}
  </g>
);

export const Cloud: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  storm?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.cyan, storm = false}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <Ink d={circleD(-42, -10, 32, 870, 1.4)} p={p} color={color} width={3.2} fill={storm ? C.current : C.ink} fillOpacity={0.08} />
    <Ink d={circleD(0, -28, 40, 871, 1.4)} p={p} color={color} width={3.2} fill={storm ? C.current : C.ink} fillOpacity={0.08} />
    <Ink d={circleD(40, -8, 30, 872, 1.4)} p={p} color={color} width={3.2} fill={storm ? C.current : C.ink} fillOpacity={0.08} />
    <Ink d={rectD(-72, -10, 146, 42, 873, 0.8, 18)} p={p} color={color} width={3.2} fill={storm ? C.current : C.ink} fillOpacity={0.08} />
    {storm ? (
      <Ink d={polyD([[-8, 34], [10, 34], [-2, 58], [18, 58], [-8, 94], [0, 64], [-20, 64]], 874, 0.8, true)} p={p} color={accent} width={2.8} fill={accent} fillOpacity={0.25} />
    ) : (
      <>
        <Ink d={lineD(-30, 56, -30, 76, 875, 0.4)} p={p} color={accent} width={3} />
        <Ink d={lineD(10, 56, 10, 76, 876, 0.4)} p={p} color={accent} width={3} />
      </>
    )}
  </g>
);

export const Cat: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  accent?: string;
  cartoon?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.ink, accent = C.yellow, cartoon = false}) => {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Ink d="M -80 2 C -106 -12 -122 -38 -114 -58 C -110 -70 -100 -72 -94 -64" p={p} color={color} width={4.2} />
      <Ink d={ellipseD(-8, 12, 64, 28, 880, 1.2)} p={p} color={color} width={3.4} fill={C.current} fillOpacity={0.11} />
      <Ink d="M 50 -6 C 58 -18 66 -28 74 -34" p={p} color={color} width={2.8} opacity={0.55} />
      {[-1, 1].map((side) => (
        <g key={side}>
          <Ink d={polyD([[62 + side * 10, -36], [56 + side * 16, -66], [78 + side * 10, -44]], 882 + side, 0.7, true)} p={p} color={color} width={3} fill={C.current} fillOpacity={0.1} />
          <Ink d={lineD(64 + side * 10, -42, 62 + side * 14, -58, 884 + side, 0.4)} p={p} color={color} width={2} opacity={0.45} />
        </g>
      ))}
      <Ink d={circleD(76, -20, 23, 881, 1.1)} p={p} color={color} width={3.2} fill={C.current} fillOpacity={0.11} />
      <Ink d={polyD([[88, -22], [104, -20], [100, -10], [88, -12]], 885, 0.6, true)} p={p} color={color} width={2.8} fill={C.current} fillOpacity={0.08} />
      <circle cx={64} cy={-26} r={3} fill={color} opacity={p} />
      <circle cx={86} cy={-26} r={3} fill={color} opacity={p} />
      <Ink d={polyD([[100, -18], [105, -16], [100, -13]], 886, 0.4, true)} p={p} color={accent} width={2} fill={accent} fillOpacity={0.5} />
      {[-1, 1].map((side) =>
        [0, 1, 2].map((i) => (
          <Ink key={`${side}-${i}`} d={lineD(102, -14 + i * 2, 102 + side * 26, -22 + i * 10, 887 + i + (side > 0 ? 5 : 0), 0.4)} p={p} color={color} width={1.7} opacity={0.5} />
        )),
      )}
      {[0, 1, 2, 3].map((i) => (
        <Ink key={i} d={lineD(-48 + i * 28, 38, -48 + i * 28, 96, 888 + i, 0.6)} p={p} color={color} width={2.9} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Ink key={i} d={lineD(-56 + i * 28, 96, -40 + i * 28, 96, 892 + i, 0.3)} p={p} color={color} width={2.1} opacity={0.5} />
      ))}
      {cartoon ? (
        <Ink d={polyD([[48, -66], [53, -80], [60, -66], [72, -63], [62, -54], [64, -42], [54, -50], [42, -42], [44, -57]], 896, 0.5, true)} p={p} color={accent} width={2} fill={accent} fillOpacity={0.2} />
      ) : null}
    </g>
  );
};

/** A real-source image used as a small evidence card. */
export const SourceImage: React.FC<{
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  opacity?: number;
  fit?: 'slice' | 'meet';
}> = ({src, x, y, w, h, opacity = 1, fit = 'slice'}) => (
  <image
    href={src.startsWith('http') || src.startsWith('/') ? src : staticFile(src)}
    x={x}
    y={y}
    width={w}
    height={h}
    opacity={opacity}
    preserveAspectRatio={`xMidYMid ${fit}`}
  />
);

/** Neutral side-profile bust, used only for the “learned association” beat. */
export const HumanProfile: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  flip?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.ink, flip = false}) => (
  <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})`} opacity={p}>
    <Ink d="M -52 104 L -46 76 C -44 58 -34 46 -24 38 C -42 22 -48 -2 -40 -24 C -32 -46 -4 -58 18 -50 C 38 -43 48 -22 44 -4 C 42 4 38 8 42 12 C 46 16 44 22 36 24 C 34 32 26 38 16 38 C 18 48 28 58 42 66 L 42 104 Z" p={p} color={color} width={3.2} fill={color} fillOpacity={0.05} />
    <Ink d="M 24 -20 L 33 -21" p={p} color={color} width={2.4} opacity={0.65} />
    <Ink d="M 8 -30 C 18 -34 30 -32 38 -24" p={p} color={color} width={2.4} opacity={0.55} />
    <Ink d="M -24 -20 C -14 -38 2 -46 18 -44" p={p} color={color} width={2.2} opacity={0.35} />
    <circle cx={26} cy={-16} r={2.8} fill={color} opacity={p} />
    <Ink d="M -54 106 C -34 88 -14 82 0 82 C 18 82 44 92 62 108" p={p} color={color} width={3} opacity={0.6} />
    <Ink d="M -8 2 C -2 -4 4 -2 6 4 C 8 10 2 14 -4 12" p={p} color={color} width={2.2} opacity={0.45} />
  </g>
);

export const ApeProfile: React.FC<{
  x: number;
  y: number;
  s?: number;
  p?: number;
  color?: string;
  flip?: boolean;
}> = ({x, y, s = 1, p = 1, color = C.muted, flip = false}) => (
  <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * s} ${s})`} opacity={p}>
    <Ink d="M 46 104 L 46 76 C 44 58 36 46 26 38 C 44 22 50 -2 42 -20 C 34 -44 6 -56 -16 -48 C -40 -40 -52 -18 -46 2 C -58 6 -60 16 -48 20 C -44 30 -32 36 -20 34 C -22 46 -30 58 -42 66 L -42 104 Z" p={p} color={color} width={3.2} fill={color} fillOpacity={0.04} />
    <Ink d="M -46 -6 C -34 -16 -16 -16 -6 -8" p={p} color={color} width={2.8} opacity={0.6} />
    <circle cx={-22} cy={-12} r={2.8} fill={color} opacity={p} />
    <Ink d="M -50 10 L -38 12" p={p} color={color} width={2.2} opacity={0.5} />
    <Ink d="M -44 22 C -34 26 -24 24 -16 20" p={p} color={color} width={2.4} opacity={0.55} />
    <Ink d={circleD(10, -10, 10, 5000, 0.8)} p={p} color={color} width={2.4} opacity={0.45} />
    <Ink d="M -62 106 C -44 88 -20 82 0 82 C 18 82 44 92 64 108" p={p} color={color} width={3} opacity={0.5} />
  </g>
);

/** Centered source icon, preserving aspect ratio. */
export const SourceIcon: React.FC<{
  src: string;
  cx: number;
  cy: number;
  size: number;
  opacity?: number;
  flipX?: boolean;
}> = ({src, cx, cy, size, opacity = 1, flipX = false}) => (
  <g transform={flipX ? `translate(${cx * 2} 0) scale(-1 1)` : undefined}>
    <SourceImage
      src={src}
      x={cx - size / 2}
      y={cy - size / 2}
      w={size}
      h={size}
      opacity={opacity}
      fit="meet"
    />
  </g>
);

/** Head, brain, and three separately animatable electrodes for scene 04. */
export const HospitalHead: React.FC<{
  cx: number;
  cy: number;
  w?: number;
  p?: number;
  e1?: number;
  e2?: number;
  e3?: number;
}> = ({cx, cy, w = 620, p = 1, e1 = 0, e2 = 0, e3 = 0}) => {
  const s = w / 760;
  return (
    <g transform={`translate(${cx - 625 * s} ${cy - 615 * s}) scale(${s})`}>
      <g id="hospital-head">
        <Ink
          d="M 600 250 C 535 246 470 292 430 360 C 410 400 408 430 396 458 C 386 480 372 492 350 500 C 366 512 380 532 390 565 C 382 572 383 580 395 585 C 400 602 414 624 430 640 C 452 674 475 700 500 720 C 512 750 510 790 504 830 C 498 880 499 930 500 980 C 620 992 780 992 900 980 C 892 918 858 858 830 820 C 826 740 822 620 820 500 C 817 432 790 345 760 300 C 716 258 660 248 600 250 Z"
          p={p}
          color={C.ink}
          width={8}
        />
        <Ink
          d="M 702 572 C 700 555 720 545 738 552 C 756 559 756 577 745 588 C 736 598 731 608 727 618 C 723 628 711 631 705 624 C 700 617 707 610 713 605"
          p={p}
          color={C.ink}
          width={8}
        />
        <Ink
          d="M 731 574 C 722 567 713 570 713 579 L 713 586 C 713 594 722 594 722 586"
          p={p}
          color={C.ink}
          width={8}
        />
        <circle cx={475} cy={470} r={6} fill={C.ink} opacity={p} />
      </g>
      <g id="hospital-brain">
        <Ink
          d="M 493 418 C 486 388 503 358 533 341 C 553 328 578 327 598 333 C 613 313 648 311 666 331 C 688 323 716 333 730 353 C 754 365 772 393 773 423 C 781 448 776 478 760 498 C 750 523 728 535 708 527 C 696 541 680 541 672 529 C 664 541 660 555 652 561 C 644 567 638 559 642 549 C 645 540 636 537 626 537 C 606 545 586 541 572 529 C 548 538 523 523 513 503 C 496 483 488 448 493 418 Z"
          p={p}
          color={C.pink}
          width={7}
        />
        <Ink d="M 618 335 C 630 361 624 395 604 425" p={p} color={C.pink} width={7} />
        <Ink d="M 546 388 C 566 363 596 359 614 381" p={p} color={C.pink} width={7} />
        <Ink d="M 652 343 C 672 331 698 339 706 363 C 712 383 700 401 682 407" p={p} color={C.pink} width={7} />
        <Ink d="M 554 479 C 576 455 612 453 630 475 C 644 493 632 513 612 517" p={p} color={C.pink} width={7} />
        <Ink d="M 698 439 C 722 427 746 439 750 463 C 754 485 738 501 718 499" p={p} color={C.pink} width={7} />
      </g>
      <g id="hospital-electrode-1">
        <Ink d="M 980 210 C 920 250 820 300 740 380" p={e1} color={C.red} width={6} />
        <circle cx={980} cy={210} r={9} fill={C.red} opacity={e1} />
        <circle cx={740} cy={380} r={6} fill={C.red} opacity={e1} />
      </g>
      <g id="hospital-electrode-2">
        <Ink d="M 1010 280 C 940 330 830 375 720 430" p={e2} color={C.red} width={6} />
        <circle cx={1010} cy={280} r={9} fill={C.red} opacity={e2} />
        <circle cx={720} cy={430} r={6} fill={C.red} opacity={e2} />
      </g>
      <g id="hospital-electrode-3">
        <Ink d="M 1040 350 C 950 400 820 435 700 480" p={e3} color={C.red} width={6} />
        <circle cx={1040} cy={350} r={9} fill={C.red} opacity={e3} />
        <circle cx={700} cy={480} r={6} fill={C.red} opacity={e3} />
      </g>
    </g>
  );
};

/** Muted assembly conveyor. The rollers are separate groups so they can spin. */
export const Conveyor: React.FC<{
  cx: number;
  topY: number;
  w?: number;
  p?: number;
  t: number;
}> = ({cx, topY, w = 900, p = 1, t}) => {
  const s = w / 1600;
  const angle = (t * 80) % 360;
  return (
    <g transform={`translate(${cx - 800 * s} ${topY - 200 * s}) scale(${s})`} opacity={p}>
      <rect x={100} y={180} width={1400} height={120} rx={40} fill={C.recess} fillOpacity={0.55} stroke={C.muted} strokeWidth={6} />
      <path d="M 140 200 L 1460 200" fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <path d="M 140 280 L 1460 280" fill="none" stroke={C.deep} strokeWidth={5} strokeLinecap="round" opacity={0.7} />
      {[140, 1460].map((x) => (
        <g key={`pulley-${x}`}>
          <circle cx={x} cy={240} r={34} fill="none" stroke={C.muted} strokeWidth={6} />
          <circle cx={x} cy={240} r={10} fill={C.cyan} />
        </g>
      ))}
      {[340, 560, 800, 1040, 1280].map((x) => (
        <g key={`roller-${x}`} transform={`translate(${x} 240)`}>
          <g transform={`rotate(${angle})`}>
            <circle r={22} fill="none" stroke={C.cyan} strokeWidth={5} />
            <path d="M 0 0 L 16 0 M 0 0 L -8 13.856 M 0 0 L -8 -13.856" fill="none" stroke={C.cyan} strokeWidth={5} strokeLinecap="round" />
          </g>
        </g>
      ))}
    </g>
  );
};

/** Two mirror-balanced connectors from the encoders into the shared field. */
export const SharedSpaceArrows: React.FC<{p: number}> = ({p}) => (
  <g opacity={p}>
    <Ink d="M 760 440 C 800 510 840 590 880 650" p={p} color={C.cyan} width={6} opacity={0.75} />
    <Ink d="M 880 650 L 862.07 641.14" p={p} color={C.cyan} width={6} opacity={0.75} />
    <Ink d="M 880 650 L 878.71 630.04" p={p} color={C.cyan} width={6} opacity={0.75} />
    <Ink d="M 1160 440 C 1120 510 1080 590 1040 650" p={p} color={C.pink} width={6} opacity={0.75} />
    <Ink d="M 1040 650 L 1041.29 630.04" p={p} color={C.pink} width={6} opacity={0.75} />
    <Ink d="M 1040 650 L 1057.93 641.14" p={p} color={C.pink} width={6} opacity={0.75} />
  </g>
);
