import React, {createContext, ReactNode, useContext} from 'react';
import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT} from './theme';

export const SceneContext = createContext({start: 0, end: 0});

export const useScene = () => useContext(SceneContext);

/** Absolute timeline seconds. */
export const useT = () => {
  const {start} = useScene();
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return start + frame / fps;
};

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const useP = (at: number, dur = 0.55, ease: (v: number) => number = Easing.out(Easing.cubic)) => {
  const t = useT();
  return ease(clamp01((t - at) / Math.max(0.001, dur)));
};

export const useLinear = (at: number, dur: number) => {
  const t = useT();
  return clamp01((t - at) / Math.max(0.001, dur));
};

/** Spring scale/opacity entrance. */
export const useAppear = (at: number, stiffness = 170, damping = 18) => {
  const t = useT();
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {start} = useScene();
  const localFrame = frame - Math.round((at - start) * fps);
  const s = spring({
    fps,
    frame: Math.max(0, localFrame),
    config: {stiffness, damping, mass: 0.7},
  });
  const vis = t >= at ? 1 : 0;
  return {
    visible: vis,
    opacity: vis * clamp01(s * 1.6),
    scale: 0.78 + 0.22 * s,
    y: (1 - s) * 12,
  };
};

/** Fade to/from the scene's dark edge. */
export const useSceneFade = (start: number, end: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = start + frame / fps;
  const fadeIn = interpolate(t, [start, start + 0.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fadeOut = interpolate(t, [end - 0.1, end], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return Math.min(fadeIn, fadeOut);
};

export const SceneFrame: React.FC<{start: number; end: number; children: ReactNode}> = ({
  start,
  end,
  children,
}) => {
  const fade = useSceneFade(start, end);
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = Math.max(0, Math.min(1, frame / Math.max(1, (end - start) * fps)));
  const zoom = 1 + p * 0.006;
  return (
    <SceneContext.Provider value={{start, end}}>
      <g
        opacity={fade}
        transform={`translate(960 540) scale(${zoom}) translate(-960 -540)`}
      >
        {children}
      </g>
    </SceneContext.Provider>
  );
};

type InkProps = {
  d: string;
  p?: number;
  color?: string;
  width?: number;
  opacity?: number;
  fill?: string;
  fillOpacity?: number;
  dash?: string;
  linecap?: 'butt' | 'round' | 'square';
  linejoin?: 'miter' | 'round' | 'bevel';
  style?: React.CSSProperties;
};

export const Ink: React.FC<InkProps> = ({
  d,
  p = 1,
  color = C.ink,
  width = 3.4,
  opacity = 1,
  fill,
  fillOpacity = 0,
  dash,
  linecap = 'round',
  linejoin = 'round',
}) => {
  if (!d) return null;
  return (
    <g opacity={opacity}>
      {fill && fillOpacity > 0 ? (
        <path d={d} fill={fill} opacity={fillOpacity * clamp01(p * 1.8)} stroke="none" />
      ) : null}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap={linecap}
        strokeLinejoin={linejoin}
        strokeDasharray={dash ?? (p < 0.999 ? 1 : undefined)}
        strokeDashoffset={dash ? undefined : 1 - p}
        pathLength={dash ? undefined : 1}
        opacity={p <= 0 ? 0 : 1}
      />
    </g>
  );
};

/** Two-pass ink adds a soft second pen line to hero shapes. */
export const Ink2: React.FC<InkProps & {seedOffset?: number}> = ({seedOffset = 0, ...props}) => (
  <>
    <Ink {...props} />
    <Ink
      {...props}
      opacity={(props.opacity ?? 1) * 0.22}
      width={(props.width ?? 3.4) * 0.7}
      p={(props.p ?? 1) * 0.96}
    />
  </>
);

type LabelProps = {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  color?: string;
  at?: number;
  dur?: number;
  opacity?: number;
  anchor?: 'start' | 'middle' | 'end';
  font?: 'hand' | 'display';
  weight?: number;
  letterSpacing?: number;
  rotate?: number;
  align?: 'middle' | 'top' | 'bottom';
};

export const Label: React.FC<LabelProps> = ({
  x,
  y,
  children,
  size = 56,
  color = C.ink,
  at,
  dur = 0.35,
  opacity = 1,
  anchor = 'middle',
  font = 'hand',
  weight = 400,
  letterSpacing = 0.5,
  rotate = 0,
  align = 'middle',
}) => {
  const t = useT();
  const p = at === undefined ? 1 : clamp01((t - at) / dur);
  if (p <= 0) return null;
  const rise = (1 - Easing.out(Easing.cubic)(p)) * 10;
  const sc = 0.96 + 0.04 * Easing.out(Easing.cubic)(p);
  return (
    <text
      x={x}
      y={y + rise}
      fill={color}
      fontFamily={font === 'display' ? FONT.display : FONT.hand}
      fontWeight={weight}
      fontSize={size}
      letterSpacing={letterSpacing}
      textAnchor={anchor}
      dominantBaseline={align === 'middle' ? 'middle' : align === 'top' ? 'hanging' : 'auto'}
      opacity={opacity * p}
      transform={`rotate(${rotate} ${x} ${y}) translate(${x} ${y}) scale(${sc}) translate(${-x} ${-y})`}
      style={{whiteSpace: 'pre'}}
    >
      {children}
    </text>
  );
};

export const Pop: React.FC<{
  at: number;
  children: ReactNode;
  originX?: number;
  originY?: number;
  stiffness?: number;
  damping?: number;
  opacity?: number;
}> = ({at, children, originX = 0, originY = 0, stiffness = 170, damping = 18, opacity = 1}) => {
  const a = useAppear(at, stiffness, damping);
  if (!a.visible) return null;
  return (
    <g
      opacity={a.opacity * opacity}
      transform={`translate(${originX} ${originY + a.y}) scale(${a.scale}) translate(${-originX} ${-originY})`}
    >
      {children}
    </g>
  );
};

export const Ticker: React.FC<{
  at: number;
  dur: number;
  children: ReactNode;
  opacity?: number;
}> = ({at, dur, children, opacity = 1}) => {
  const p = useP(at, dur, Easing.inOut(Easing.cubic));
  return <g opacity={opacity * p}>{children}</g>;
};

export const Camera: React.FC<{
  children: ReactNode;
  zoom?: number;
  x?: number;
  y?: number;
}> = ({children, zoom = 1, x = 0, y = 0}) => (
  <g transform={`translate(${960 + x} ${540 + y}) scale(${zoom}) translate(-960 -540)`}>{children}</g>
);
