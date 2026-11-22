import React from 'react';
import {C} from '../theme';
import {Ink, Label, Pop, useP, useT} from '../scene';
import {cue} from '../timings';
import {FiringNeuron, Head, Link, Neuron, Panel, Photo, Profile, SoundWave, SourceIcon, SourceImage, Txt} from '../components/drawings';
import {arcD, circleD, ellipseD, lineD, polyD, rectD, waveD} from '../sketch/rough';

const MOD_X = [585, 835, 1085, 1335];

export const Scene01: React.FC = () => {
  const t = useT();
  const neuronP = useP(0.05, 1.25);
    const photoP = useP(cue('photo', 3.9), 0.55);
  const sketchP = useP(cue('pencil', 4.95), 0.55);
  const nameP = useP(cue('written', 6.1), 0.55);
  const spokenP = useP(cue('said', 7.5), 0.55);

  const tokens = [photoP, sketchP, nameP, spokenP];
  return (
    <g>
      {/* central cell */}
      <Neuron x={960} y={478} scale={1.3} p={neuronP} accent={C.cyan} />

      <Label x={960} y={258} size={66} color={C.ink} at={cue('Halle', 2.9)} opacity={0.96} letterSpacing={1}>
        Halle Berry
      </Label>

      {/* four ways in */}
      {MOD_X.map((x, i) => (
        <Ink key={`slot-${i}`} d={rectD(x - 109, 778 - 121, 218, 242, 600 + i, 1.0, 18)} p={1} color={C.deep} width={2.2} opacity={photoP * 0.22} />
      ))}
      {tokens.map((p, i) => (
        <Ink
          key={i}
          d={`M 960 606 C 960 660, ${MOD_X[i]} 650, ${MOD_X[i]} 658`}
          p={p}
          color={C.deep}
          width={2.6}
          dash="1 13"
          opacity={0.7}
        />
      ))}

      <Pop at={cue('photo', 3.9)} originX={MOD_X[0]} originY={778}>
        <Photo x={MOD_X[0]} y={778} w={218} h={242} p={photoP} seed={301}>
          <SourceImage src="source/halle_photo.jpg" x={MOD_X[0] - 93} y={673} w={186} h={182} opacity={photoP} fit="slice" />
        </Photo>
      </Pop>

      <Pop at={cue('pencil', 4.95)} originX={MOD_X[1]} originY={778}>
        <Panel x={MOD_X[1]} y={778} w={218} h={242} p={sketchP} seed={302} />
        <SourceImage src="source/halle_sketch.png" x={MOD_X[1] - 96} y={674} w={192} h={208} opacity={sketchP} fit="slice" />
        <Ink d={rectD(MOD_X[1] - 96, 674, 192, 208, 310, 0.7, 3)} p={sketchP} color={C.ink} width={2} opacity={0.35} />
      </Pop>

      <Pop at={cue('written', 6.1)} originX={MOD_X[2]} originY={778}>
        <Panel x={MOD_X[2]} y={778} w={218} h={242} p={nameP} seed={303} />
        <Txt x={MOD_X[2]} y={786} size={42} color={C.ink} opacity={nameP}>
          Halle
        </Txt>
        <Txt x={MOD_X[2]} y={838} size={42} color={C.ink} opacity={nameP}>
          Berry
        </Txt>
        <Ink d={lineD(MOD_X[2] - 84, 864, MOD_X[2] + 84, 864, 304, 0.7)} p={nameP} color={C.purple} width={3} opacity={0.6} />
      </Pop>

      <Pop at={cue('said', 7.5)} originX={MOD_X[3]} originY={778}>
        <Panel x={MOD_X[3]} y={778} w={218} h={242} p={spokenP} seed={305} />
        <SoundWave x={MOD_X[3]} y={778} w={150} p={spokenP} color={C.cyan} />
        <Ink d={arcD(MOD_X[3] - 46, 778, 10, -0.7, 0.7, 306, 0.7)} p={spokenP} color={C.cyan} width={3} />
      </Pop>

    </g>
  );
};

export const Scene02: React.FC = () => {
  const t = useT();
  const chipP = useP(9.2, 0.9);
  const neuronP = useP(9.8, 1.1);
  const spideyP = useP(cue('Spider', 14.0), 0.5);
  const realP = useP(cue('real', 15.7), 0.55);
  const comicP = useP(cue('comics', 17.2), 0.55);
  const wordP = useP(18.0, 0.5);

  return (
    <g>
      {/* chip */}
      <g>
        <Ink d={rectD(960 - 320, 366 - 150, 640, 300, 320, 1.4, 30)} p={chipP} color={C.ink} width={4} fill={C.recess} fillOpacity={0.5} />
        {Array.from({length: 8}).map((_, i) => {
          const px = 960 - 320 + (i * 640) / 7;
          return (
            <React.Fragment key={i}>
              <Ink d={lineD(px, 216, px, 192, 321 + i, 0.5)} p={chipP} color={C.ink} width={3} opacity={0.45} />
              <Ink d={lineD(px, 516, px, 540, 331 + i, 0.5)} p={chipP} color={C.ink} width={3} opacity={0.45} />
            </React.Fragment>
          );
        })}
        <Ink d={rectD(960 - 280, 366 - 108, 560, 216, 340, 1.0, 18)} p={chipP} color={C.current} width={2.4} opacity={0.65} />
        <Txt x={960} y={468} size={26} color={C.muted} opacity={chipP * 0.8} letterSpacing={5}>
          AI
        </Txt>
      </g>

      <FiringNeuron x={960} y={366} scale={1.02} p={neuronP} accent={C.pink} fireAt={cue('fires', 13.3)} period={1.1} />

      {/* spider-man clue above? no - below in a row */}
      {[720, 960, 1200].map((x, i) => (
        <Ink key={`slot2-${i}`} d={rectD(x - 92, 752 - 98, 184, 196, 610 + i, 1.0, 16)} p={1} color={C.deep} width={2.2} opacity={realP * 0.22} />
      ))}
      <Pop at={cue('real', 15.79)} originX={720} originY={778}>
        <Panel x={720} y={752} w={184} h={196} p={realP} seed={350} />
        <SourceIcon src="source/icons/animal_spider.png" cx={720} cy={752} size={150} opacity={realP} />
      </Pop>

      <Pop at={cue('comics', 17.36)} originX={960} originY={778}>
        <Panel x={960} y={752} w={184} h={196} p={comicP} seed={351} />
        <SourceIcon src="source/icons/hero_mask.png" cx={960} cy={752} size={140} opacity={comicP} />
        {[0, 1, 2].map((i) => (
          <Ink key={i} d={lineD(912 - i * 12, 702 + i * 14, 886 - i * 18, 688 + i * 22, 352 + i, 0.5)} p={comicP} color={C.yellow} width={2.6} opacity={0.55} />
        ))}
      </Pop>

      <Pop at={cue('word', 18.76)} originX={1200} originY={778}>
        <Panel x={1200} y={752} w={184} h={196} p={wordP} seed={353} />
        <Txt x={1200} y={754} size={52} color={C.cyan} opacity={wordP}>
          spider
        </Txt>
      </Pop>

      <Link d={`M 960 544 C 960 610, 720 630, 720 652`} p={realP} color={C.deep} dotted />
      <Link d={`M 960 544 C 960 610, 960 630, 960 652`} p={comicP} color={C.deep} dotted />
      <Link d={`M 960 544 C 960 610, 1200 630, 1200 652`} p={wordP} color={C.deep} dotted />

    </g>
  );
};

const SpiderGlyph: React.FC<{p: number}> = ({p}) => {
  const legs = [-1, 1].flatMap((side) =>
    [0, 1, 2, 3].map((i) => {
      const y0 = -16 + i * 12;
      return polyD(
        [
          [14 * side, y0],
          [50 * side, y0 - 30 + i * 10],
          [82 * side, y0 + (i % 2 ? 36 : -26)],
        ],
        400 + i + (side > 0 ? 0 : 7),
        1,
      );
    }),
  );
  return (
    <g>
      {legs.map((d, i) => (
        <Ink key={i} d={d} p={p} color={C.ink} width={3.3} />
      ))}
      <Ink d={circleD(0, 8, 31, 401, 1.2)} p={p} color={C.ink} width={3.4} fill={C.pink} fillOpacity={0.1} />
      <Ink d={circleD(0, -24, 16, 402, 1)} p={p} color={C.ink} width={3.2} />
      <circle cx={-6} cy={-27} r={3} fill={C.pink} opacity={p} />
      <circle cx={6} cy={-27} r={3} fill={C.pink} opacity={p} />
    </g>
  );
};

const MaskGlyph: React.FC<{p: number}> = ({p}) => (
  <g>
    <Ink d={circleD(0, 0, 78, 410, 2)} p={p} color={C.red} width={4} fill={C.red} fillOpacity={0.09} />
    {[
      lineD(0, -70, 0, 66, 411, 0.5),
      lineD(-66, -18, 66, -18, 412, 0.5),
      lineD(-56, 24, 56, 24, 413, 0.5),
      lineD(-60, -30, 0, 64, 414, 0.4),
      lineD(60, -30, 0, 64, 415, 0.4),
    ].map((d, i) => (
      <Ink key={i} d={d} p={p} color={C.red} width={2.2} opacity={0.5} />
    ))}
    {[-1, 1].map((side) => (
      <path
        key={side}
        d={`M ${side * 14} -14 C ${side * 40} -46, ${side * 58} -34, ${side * 50} -4 C ${side * 42} 20, ${side * 24} 18, ${side * 14} -14 Z`}
        fill={C.ink}
        opacity={0.95 * p}
      />
    ))}
  </g>
);

export const Scene03: React.FC = () => {
  const photoP = useP(20.2, 0.7);
  const outP = useP(cue('fooled', 24.2), 0.6);
  const uglyP = useP(cue('ugliest', 27.1), 0.8);
  const dim = 1 - uglyP;

  return (
    <g>
      <g opacity={photoP * dim}>
        <Ink d={rectD(750, 220, 420, 420, 511, 0.8, 4)} p={photoP} color={C.ink} width={3} fill={C.bg} fillOpacity={0.4} />
        <SourceImage src="source/apple_ipod.jpg" x={752} y={222} w={416} h={416} opacity={photoP} fit="slice" />
        {outP > 0 ? (
          <g opacity={outP}>
            <Ink d={rectD(862, 318, 196, 132, 512, 0.9, 10)} p={outP} color={C.cyan} width={2.8} dash="4 9" opacity={0.75} />
            <Ink d={`M 960 456 C 960 530, 960 640, 960 704`} p={outP} color={C.cyan} width={2.4} dash="2 10" opacity={0.55} />
          </g>
        ) : null}
        <Pop at={cue('fooled', 24.2)} originX={960} originY={720}>
          <Txt x={960} y={746} size={66} color={C.pink} opacity={outP}>
            iPod
          </Txt>
        </Pop>
        <g opacity={outP}>
          <Txt x={900} y={812} size={38} color={C.pink}>iPod 99%</Txt>
          <Txt x={1060} y={812} size={38} color={C.muted}>apple 1%</Txt>
          <Ink d={rectD(770, 830, 380, 10, 515, 0.5, 5)} p={outP} color={C.deep} width={2} fill={C.bg} fillOpacity={0.8} />
          <Ink d={rectD(772, 832, 374, 6, 516, 0.3, 3)} p={outP} color={C.pink} width={0.1} fill={C.pink} fillOpacity={0.9} />
        </g>
      </g>

      <g opacity={uglyP}>
        <Neuron x={960} y={360} scale={0.78} p={uglyP} color={C.ink} accent={C.red} />
        <SourceIcon src="source/icons/animal_human.png" cx={700} cy={700} size={190} opacity={uglyP} />
        <SourceIcon src="source/icons/animal_ape.png" cx={1220} cy={700} size={190} opacity={uglyP} flipX />
        <Ink d={lineD(760, 560, 1160, 560, 520, 0.8)} p={uglyP} color={C.red} width={3.2} opacity={0.9} />
        <Ink d={lineD(760, 560, 760, 598, 521, 0.5)} p={uglyP} color={C.red} width={3.2} opacity={0.9} />
        <Ink d={lineD(1160, 560, 1160, 598, 522, 0.5)} p={uglyP} color={C.red} width={3.2} opacity={0.9} />
        <Ink d={lineD(960, 560, 960, 480, 523, 0.6)} p={uglyP} color={C.red} width={3.2} opacity={0.9} />
        <circle cx={960} cy={560} r={5} fill={C.red} opacity={uglyP * 0.9} />
        <Txt x={960} y={860} size={46} color={C.muted} opacity={uglyP * 0.9}>a learned association</Txt>
      </g>
    </g>
  );
};

const HumanBust: React.FC<{x: number; y: number; p: number; color: string}> = ({x, y, p, color}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={circleD(0, -42, 30, 530, 1.0)} p={p} color={color} width={3} fill={color} fillOpacity={0.05} />
    <Ink d={arcD(0, 24, 54, Math.PI, Math.PI * 2, 531, 0.8)} p={p} color={color} width={3} />
    <Ink d={lineD(-54, 24, 54, 24, 532, 0.5)} p={p} color={color} width={2.4} opacity={0.4} />
  </g>
);

const ApeBust: React.FC<{x: number; y: number; p: number; color: string}> = ({x, y, p, color}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={circleD(0, -42, 36, 535, 1.2)} p={p} color={color} width={3} fill={color} fillOpacity={0.04} />
    <Ink d={ellipseD(0, -20, 26, 18, 536, 0.8)} p={p} color={color} width={2.4} opacity={0.7} />
    <Ink d={arcD(0, 24, 58, Math.PI, Math.PI * 2, 537, 0.8)} p={p} color={color} width={3} />
    <Ink d={lineD(-58, 24, 58, 24, 538, 0.5)} p={p} color={color} width={2.4} opacity={0.4} />
  </g>
);

const AppleGlyph: React.FC<{p: number; noteP: number}> = ({p, noteP}) => (
  <g>
    <g transform="translate(960 462) scale(1.72)">
      <AppleBody p={p} />
      <g transform="translate(82 -60) scale(0.8)">
        <StickyNoteGlyph p={noteP} />
      </g>
    </g>
  </g>
);

const AppleBody: React.FC<{p: number}> = ({p}) => {
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
    ],
    12,
    1.5,
    true,
    0.6,
  );
  return (
    <g>
      <Ink d={body} p={p} color={C.ink} width={4.2} fill={C.red} fillOpacity={0.09} />
      <Ink d={lineD(-2, -60, 5, -102, 14, 1.2)} p={p} color={C.ink} width={4} />
      <Ink
        d={polyD(
          [
            [1, -98],
            [-30, -116],
            [-58, -98],
            [-42, -84],
            [-8, -88],
          ],
          16,
          1.2,
          true,
        )}
        p={p}
        color={C.green}
        width={3.2}
        fill={C.green}
        fillOpacity={0.12}
      />
      <Ink d={arcD(-24, -14, 36, 2.25, 2.9, 18, 1)} p={p} color={C.ink} width={3} opacity={0.45} />
    </g>
  );
};

const StickyNoteGlyph: React.FC<{p: number}> = ({p}) => (
  <g transform="rotate(-7 0 0)">
    <Ink d={rectD(-74, -59, 148, 118, 25, 1.2, 3)} p={p} color={C.yellow} width={3.4} fill={C.surface} fillOpacity={0.97} />
    <Ink d={lineD(44, -56, 71, -29, 26, 0.6)} p={p} color={C.yellow} width={2.4} opacity={0.65} />
    <Txt x={0} y={4} size={52} color={C.yellow} font="display" weight={700} opacity={p}>
      iPod
    </Txt>
  </g>
);

const ArrowDown: React.FC<{p: number}> = ({p}) => (
  <g>
    <Ink d={lineD(960, 640, 960, 688, 600, 0.6)} p={p} color={C.muted} width={3.2} opacity={0.65} />
    <Ink d={lineD(946, 670, 960, 690, 601, 0.4) + ' ' + lineD(974, 670, 960, 690, 602, 0.4)} p={p} color={C.muted} width={3.2} opacity={0.65} />
  </g>
);
