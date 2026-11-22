import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C} from './theme';
import {ApeProfile, Cat, Dog, HumanProfile, Neuron, Spider, Txt} from './components/drawings';

const Cell: React.FC<{x: number; y: number; label: string; children: React.ReactNode}> = ({x, y, label, children}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-230} y={-180} width={460} height={360} fill="none" stroke={C.current} strokeWidth={2} opacity={0.35} />
    {children}
    <Txt x={0} y={205} size={38} color={C.muted}>{label}</Txt>
  </g>
);

export const DrawTest: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080">
      <Cell x={340} y={280} label="dog"><Dog x={0} y={0} s={1.35} /></Cell>
      <Cell x={960} y={280} label="poodle"><Dog x={0} y={0} s={1.25} poodle /></Cell>
      <Cell x={1580} y={280} label="cat"><Cat x={0} y={20} s={1.25} /></Cell>
      <Cell x={340} y={780} label="spider"><Spider x={0} y={20} s={1.15} /></Cell>
      <Cell x={960} y={780} label="human profile"><HumanProfile x={0} y={10} s={1.1} /></Cell>
      <Cell x={1580} y={780} label="ape profile"><ApeProfile x={0} y={10} s={1.1} /></Cell>
      <Cell x={960} y={280} label=""><Neuron x={150} y={-120} scale={0.5} /></Cell>
    </svg>
  </AbsoluteFill>
);
