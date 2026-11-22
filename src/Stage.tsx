import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, H, W} from './theme';

/** Shared static frame for every scene. */
export const Stage: React.FC<{children: React.ReactNode; veil?: number}> = ({children, veil = 0}) => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0}}>
      {children}
      {veil > 0 ? <rect x={0} y={0} width={W} height={H} fill={C.bg} opacity={veil} /> : null}
    </svg>
  </AbsoluteFill>
);
