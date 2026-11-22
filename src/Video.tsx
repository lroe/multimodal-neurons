import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, Sequence, staticFile, useVideoConfig} from 'remotion';
import {C} from './theme';
import {SceneFrame} from './scene';
import {Stage} from './Stage';
import {Scene01, Scene02, Scene03} from './scenes/Opening';
import {Scene04, Scene05, Scene06, Scene07, Scene08, Scene09} from './scenes/ActOne';
import {Scene10, Scene11, Scene12, Scene13, Scene14, Scene15, Scene16} from './scenes/ActTwo';
import {Scene17, Scene18, Scene19, Scene20, Scene21} from './scenes/ActThree';
import {Scene22, Scene23, Scene24, Scene25, Scene26, Scene27, Scene28} from './scenes/ActFour';
import {Scene29, Scene30, Scene31, Scene32, Scene33, Scene34} from './scenes/ActFive';
import {Scene35, Scene36, Scene37, Scene38, Scene39, Scene40, Scene41} from './scenes/ActSix';

export const DURATION_SECONDS = 835.72;
const FPS = 30;

type SceneDef = {
  from: number;
  to: number;
  Comp: React.FC;
  name: string;
};

export const SCENES: SceneDef[] = [
  {from: 0.0, to: 9.15, Comp: Scene01, name: 'one-cell'},
  {from: 9.15, to: 19.94, Comp: Scene02, name: 'spider-cell'},
  {from: 19.94, to: 30.9, Comp: Scene03, name: 'sticky-note'},
  {from: 30.9, to: 46.35, Comp: Scene04, name: 'hospital'},
  {from: 46.35, to: 64.75, Comp: Scene05, name: 'listening'},
  {from: 64.75, to: 82.88, Comp: Scene06, name: 'halle-evidence'},
  {from: 82.88, to: 99.59, Comp: Scene07, name: 'concept'},
  {from: 99.59, to: 122.56, Comp: Scene08, name: 'grandmother-caution'},
  {from: 122.56, to: 133.24, Comp: Scene09, name: 'ai-question'},
  {from: 133.24, to: 147.49, Comp: Scene10, name: 'labels'},
  {from: 147.49, to: 172.88, Comp: Scene11, name: 'assembly'},
  {from: 172.88, to: 181.17, Comp: Scene12, name: 'clip-release'},
  {from: 181.17, to: 192.47, Comp: Scene13, name: 'internet-pairs'},
  {from: 192.47, to: 211.47, Comp: Scene14, name: 'matching-game'},
  {from: 211.47, to: 229.09, Comp: Scene15, name: 'shared-space'},
  {from: 229.09, to: 254.88, Comp: Scene16, name: 'zero-shot'},
  {from: 254.88, to: 274.88, Comp: Scene17, name: 'benchmark'},
  {from: 274.88, to: 295.76, Comp: Scene18, name: 'reading'},
  {from: 295.76, to: 321.0, Comp: Scene19, name: 'two-tools'},
  {from: 321.0, to: 349.17, Comp: Scene20, name: 'spider-neuron'},
  {from: 349.17, to: 362.52, Comp: Scene21, name: 'sensible-noise'},
  {from: 362.52, to: 389.37, Comp: Scene22, name: 'people'},
  {from: 389.37, to: 400.6, Comp: Scene23, name: 'dimmer'},
  {from: 400.6, to: 422.52, Comp: Scene24, name: 'places'},
  {from: 422.52, to: 452.32, Comp: Scene25, name: 'feelings'},
  {from: 452.32, to: 471.17, Comp: Scene26, name: 'strange'},
  {from: 471.17, to: 500.84, Comp: Scene27, name: 'votes'},
  {from: 500.84, to: 524.05, Comp: Scene28, name: 'typographic-attacks'},
  {from: 524.05, to: 554.04, Comp: Scene29, name: 'technical-vs-marker'},
  {from: 554.04, to: 571.95, Comp: Scene30, name: 'why-it-works'},
  {from: 571.95, to: 588.56, Comp: Scene31, name: 'stroop'},
  {from: 588.56, to: 607.65, Comp: Scene32, name: 'predicted'},
  {from: 607.65, to: 631.76, Comp: Scene33, name: 'concern'},
  {from: 631.76, to: 653.16, Comp: Scene34, name: 'benchmark-2025'},
  {from: 653.16, to: 673.57, Comp: Scene35, name: 'hidden-text'},
  {from: 673.57, to: 702.63, Comp: Scene36, name: 'baggage'},
  {from: 702.63, to: 717.81, Comp: Scene37, name: 'mechanism'},
  {from: 717.81, to: 741.73, Comp: Scene38, name: 'two-points'},
  {from: 741.73, to: 764.95, Comp: Scene39, name: 'limits'},
  {from: 764.95, to: 795.61, Comp: Scene40, name: 'same-place'},
  {from: 795.61, to: 835.72, Comp: Scene41, name: 'finale'},
];

const fontCss = `
@font-face {
  font-family: 'Patrick Hand';
  src: url(${staticFile('fonts/PatrickHand.ttf')}) format('truetype');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Caveat';
  src: url(${staticFile('fonts/Caveat.ttf')}) format('truetype');
  font-weight: 400 700;
  font-style: normal;
}
`;

const FontGate: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [handle] = useState(() => delayRender('Loading hand-lettered fonts'));
  useEffect(() => {
    let alive = true;
    Promise.all([
      document.fonts.load('400 64px "Patrick Hand"'),
      document.fonts.load('700 64px "Caveat"'),
      document.fonts.ready,
    ])
      .then(() => {
        if (alive) continueRender(handle);
      })
      .catch(() => {
        if (alive) continueRender(handle);
      });
    return () => {
      alive = false;
    };
  }, [handle]);
  return <>{children}</>;
};

export const Video: React.FC = () => {
  const {fps, durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{backgroundColor: C.bg}}>
      <style>{fontCss}</style>
      <FontGate>
        <Audio src={staticFile('audio.wav')} volume={1} />
        {SCENES.map((s) => {
          const from = Math.round(s.from * fps);
          const to = Math.round(s.to * fps);
          const Comp = s.Comp;
          return (
            <Sequence key={s.name} name={s.name} from={from} durationInFrames={to - from} premountFor={fps}>
              <Stage>
                <SceneFrame start={s.from} end={s.to}>
                  <Comp />
                </SceneFrame>
              </Stage>
            </Sequence>
          );
        })}
        {SCENES.length === 0 ? <AbsoluteFill style={{backgroundColor: C.bg}} /> : null}
        <div style={{display: 'none'}}>{durationInFrames}</div>
      </FontGate>
    </AbsoluteFill>
  );
};
