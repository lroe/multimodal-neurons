import React from 'react';
import {C} from '../theme';
import {Ink, Label, Pop, useP, useT} from '../scene';
import {cue} from '../timings';
import {
  Apple,
  Brain,
  Cake,
  Cat,
  Cloud,
  Dog,
  Face,
  Link,
  Panel,
  Pen,
  PiggyBank,
  Profile,
  SourceIcon,
  SourceImage,
  StickyNote,
  Tag,
  Txt,
  World,
} from '../components/drawings';
import {arcD, circleD, ellipseD, lineD, polyD, rectD, waveD} from '../sketch/rough';

/* ------------------------------------------------------------------ */
/* 22 — People neurons                                                 */
/* ------------------------------------------------------------------ */

const PersonCard: React.FC<{
  x: number;
  p: number;
  name: string;
  image: string;
  note?: string;
  opacity?: number;
}> = ({x, p, name, image, note, opacity = 1}) => (
  <g opacity={opacity}>
    <Ink d={rectD(x - 118, 380, 236, 340, 2600 + x, 1.0, 14)} p={p} color={C.ink} width={3.2} fill={C.surface} fillOpacity={0.55} />
    <Txt x={x} y={438} size={44} color={C.ink} font="display" weight={700} opacity={p}>{name}</Txt>
    <Ink d={lineD(x - 78, 462, x + 78, 462, 2610 + x, 0.5)} p={p} color={C.deep} width={2.4} opacity={0.6} />
    <Ink d={rectD(x - 94, 497, 188, 188, 2615 + x, 0.8, 6)} p={p} color={C.deep} width={2.2} fill={C.bg} fillOpacity={0.7} />
    <SourceImage src={image} x={x - 90} y={501} w={180} h={180} opacity={p} fit="slice" />
    {note ? <Txt x={x} y={706} size={21} color={C.muted} opacity={p * 0.7}>{note}</Txt> : null}
  </g>
);

const FlagIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={lineD(x - 34, y - 34, x - 34, y + 34, 2660, 0.5)} p={p} color={C.ink} width={2.6} />
    <Ink d={waveD(x - 32, y - 30, x + 42, y - 28, 10, 1.7, 2661)} p={p} color={C.cyan} width={2.6} fill={C.cyan} fillOpacity={0.1} />
    <Ink d={lineD(x - 30, y - 10, x + 42, y - 8, 2662, 0.4)} p={p} color={C.cyan} width={2} opacity={0.45} />
  </g>
);

const PersonIcon: React.FC<{x: number; y: number; p: number; scale?: number}> = ({x, y, p, scale = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={p}>
    <Ink d={circleD(0, -28, 16, 2670, 0.7)} p={p} color={C.purple} width={2.6} />
    <Ink d={arcD(0, 24, 28, Math.PI, Math.PI * 2, 2671, 0.6)} p={p} color={C.purple} width={2.6} />
    <Ink d={lineD(0, -12, 0, 16, 2672, 0.4)} p={p} color={C.purple} width={2.2} />
  </g>
);

const CrossIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={lineD(x - 36, y, x + 36, y, 2680, 0.5)} p={p} color={C.ink} width={5} />
    <Ink d={lineD(x, y - 60, x, y + 42, 2681, 0.5)} p={p} color={C.ink} width={5} />
  </g>
);

const BookIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={polyD([[x - 28, y - 18], [x, y - 28], [x + 28, y - 18], [x + 28, y + 18], [x, y + 8], [x - 28, y + 18]], 2690, 0.5, true)} p={p} color={C.yellow} width={2.4} />
    <Ink d={lineD(x, y - 28, x, y + 8, 2691, 0.4)} p={p} color={C.yellow} width={2} opacity={0.5} />
  </g>
);

const PodiumIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={polyD([[x - 60, y - 16], [x + 60, y - 16], [x + 42, y + 44], [x - 42, y + 44]], 2700, 0.6, true)} p={p} color={C.ink} width={2.8} fill={C.surface} fillOpacity={0.4} />
    <Ink d={lineD(x, y - 16, x, y - 54, 2701, 0.4)} p={p} color={C.ink} width={2.2} opacity={0.5} />
    <Ink d={lineD(x - 44, y - 54, x + 44, y - 54, 2702, 0.4)} p={p} color={C.ink} width={2.2} opacity={0.5} />
  </g>
);

export const Scene22: React.FC = () => {
  const t = useT();
  const cardP = useP(363.0, 0.6);
  const obamaP = useP(366.7, 0.6);
  const jesusP = useP(370.3, 0.6);
  const trumpP = useP(375.4, 0.6);
  const manyP = useP(383.1, 0.7);
  return (
    <g>
      <g opacity={manyP * 0.22}>
        <SourceImage src="source/elvis_neuron.png" x={330} y={250} w={130} h={130} opacity={1} fit="slice" />
        <SourceImage src="source/ladygaga_neuron.png" x={1460} y={250} w={130} h={130} opacity={1} fit="slice" />
        <SourceImage src="source/ariana_neuron.png" x={330} y={700} w={130} h={130} opacity={1} fit="slice" />
      </g>
      <g opacity={manyP * 0.24}>
        {Array.from({length: 8}).map((_, r) =>
          Array.from({length: 14}).map((__, c) => (
            <Ink key={`${r}-${c}`} d={rectD(280 + c * 100, 260 + r * 74, 54, 42, 2710 + r * 14 + c, 0.5, 2)} p={manyP} color={C.deep} width={1.6} opacity={0.7} />
          )),
        )}
      </g>
      {[720, 960, 1200].map((x, i) => (
        <Ink key={`pslot-${i}`} d={rectD(x - 118, 380, 236, 340, 2605 + i, 0.8, 14)} p={1} color={C.deep} width={2} opacity={cardP * 0.2} />
      ))}
      <PersonCard x={720} p={cardP * obamaP} name="Obama" image="source/obama.jpg" note="photo example" opacity={cardP * (1 - jesusP * 0.72)} />
      <PersonCard x={960} p={cardP * jesusP} name="Jesus" image="source/jesus_neuron.png" note="neuron view" opacity={cardP * (1 - trumpP * 0.72)} />
      <PersonCard x={1200} p={cardP * trumpP} name="Trump" image="source/trump_neuron.png" note="neuron view" opacity={cardP} />
      <Label x={960} y={250} size={34} at={363.2} color={C.muted} opacity={cardP * 0.7}>
        person neurons
      </Label>
      <Label x={960} y={940} size={28} at={383.2} color={C.muted} opacity={manyP * 0.75}>
        1,500 hand-labeled images
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 23 — Not a dimmer switch                                            */
/* ------------------------------------------------------------------ */

export const Scene23: React.FC = () => {
  const t = useT();
  const dimmerP = useP(389.5, 0.7);
  const xP = useP(390.2, 0.5);
  const graphP = useP(392.5, 0.9);
  const dotsP = useP(394.0, 0.6);
  const negP = useP(396.1, 0.6);
  return (
    <g>
      <g opacity={dimmerP * (1 - graphP)}>
        <Ink d={circleD(960, 520, 150, 2730, 1.4)} p={dimmerP} color={C.ink} width={4} fill={C.surface} fillOpacity={0.4} />
        {Array.from({length: 11}).map((_, i) => {
          const a = Math.PI * 0.75 + (i / 10) * Math.PI * 1.5;
          return <Ink key={i} d={lineD(960 + Math.cos(a) * 164, 520 + Math.sin(a) * 164, 960 + Math.cos(a) * 184, 520 + Math.sin(a) * 184, 2731 + i, 0.4)} p={dimmerP} color={i < 3 ? C.red : i > 7 ? C.green : C.muted} width={2.6} opacity={0.55} />;
        })}
        <Ink d={lineD(960, 520, 1064, 420, 2740, 0.6)} p={dimmerP} color={C.ink} width={4} />
        <Ink d={circleD(960, 520, 18, 2741, 0.7)} p={dimmerP} color={C.ink} width={3} fill={C.current} fillOpacity={0.5} />
        <Ink d={lineD(880, 420, 1040, 620, 2742, 1.2)} p={xP} color={C.red} width={5} />
        <Ink d={lineD(1040, 420, 880, 620, 2743, 1.2)} p={xP} color={C.red} width={5} />
      </g>

      <g opacity={graphP}>
        <Ink d={lineD(690, 660, 1230, 660, 2750, 0.7)} p={graphP} color={C.muted} width={3.2} opacity={0.55} />
        <Ink d={lineD(960, 360, 960, 700, 2751, 0.5)} p={graphP} color={C.muted} width={2.4} opacity={0.22} />
        <Ink
          d={polyD(
            [
              [700, 600],
              [780, 590],
              [850, 540],
              [910, 560],
              [965, 500],
              [1010, 610],
              [1060, 605],
              [1110, 470],
              [1160, 430],
              [1220, 425],
            ],
            2752,
            1.4,
            false,
            0.55,
          )}
          p={graphP}
          color={C.cyan}
          width={4}
          fill={C.cyan}
          fillOpacity={0.04}
        />
        {[
          {x: 760, y: 592, color: C.red},
          {x: 965, y: 500, color: C.yellow},
          {x: 1190, y: 430, color: C.green},
        ].map((d, i) => (
          <g key={i} opacity={dotsP}>
            <circle cx={d.x} cy={d.y} r={7} fill={d.color} />
            <circle cx={d.x} cy={d.y} r={15} fill="none" stroke={d.color} strokeWidth={2.2} opacity={0.4} />
          </g>
        ))}
        {negP > 0 ? (
          <g opacity={negP}>
            <Ink d={lineD(760, 590, 760, 720, 2760, 1)} p={negP} color={C.red} width={2.4} dash="2 10" />
            <Ink d={lineD(745, 735, 760, 718, 2761, 0.4) + ' ' + lineD(775, 735, 760, 718, 2762, 0.4)} p={negP} color={C.red} width={2.4} />
          </g>
        ) : null}
      </g>
      <Label x={960} y={760} size={44} at={390.4} color={C.muted} opacity={dimmerP * (1 - graphP) * 0.9}>
        not a dimmer
      </Label>
      <Label x={790} y={610} size={26} at={392.6} color={C.red} opacity={graphP}>
        weak
      </Label>
      <Label x={995} y={520} size={26} at={392.8} color={C.yellow} opacity={graphP}>
        medium
      </Label>
      <Label x={1220} y={450} size={26} at={393.0} color={C.green} opacity={graphP}>
        strong
      </Label>
      <Label x={800} y={750} size={26} at={396.2} color={C.red} opacity={negP}>
        negative
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 24 — Places / regions                                               */
/* ------------------------------------------------------------------ */

const FoodIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={ellipseD(x, y + 10, 42, 14, 2800, 0.8)} p={p} color={C.ink} width={2.6} />
    <Ink d={arcD(x, y + 6, 30, Math.PI, Math.PI * 2, 2801, 0.8, 20)} p={p} color={C.ink} width={2.4} />
    <Ink d={waveD(x - 8, y - 28, x + 8, y - 44, 6, 1.5, 2802)} p={p} color={C.orange} width={2.2} opacity={0.7} />
  </g>
);

const SignPost: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={lineD(x, y - 54, x, y + 40, 2810, 0.5)} p={p} color={C.ink} width={2.8} />
    <Ink d={polyD([[x - 44, y - 46], [x + 44, y - 46], [x + 54, y - 28], [x + 44, y - 10], [x - 44, y - 10]], 2811, 0.6, true)} p={p} color={C.yellow} width={2.2} fill={C.yellow} fillOpacity={0.1} />
    <Ink d={lineD(x - 26, y - 28, x + 22, y - 28, 2812, 0.4)} p={p} color={C.yellow} width={2} opacity={0.55} />
  </g>
);

const WriteIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    {[0, 1, 2].map((i) => (
      <Ink key={i} d={lineD(x - 40, y - 24 + i * 22, x + (i === 2 ? 0 : 40), y - 24 + i * 22, 2820 + i, 0.4)} p={p} color={C.cyan} width={2.4} opacity={0.65} />
    ))}
  </g>
);

const PeopleIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={circleD(x - 18, y - 20, 13, 2830, 0.6)} p={p} color={C.purple} width={2.2} />
    <Ink d={arcD(x - 18, y + 24, 22, Math.PI, Math.PI * 2, 2831, 0.5)} p={p} color={C.purple} width={2.2} />
    <Ink d={circleD(x + 22, y - 12, 10, 2832, 0.5)} p={p} color={C.purple} width={2} />
    <Ink d={arcD(x + 22, y + 24, 17, Math.PI, Math.PI * 2, 2833, 0.5)} p={p} color={C.purple} width={2} />
  </g>
);

export const Scene24: React.FC = () => {
  const t = useT();
  const globeP = useP(400.8, 0.9);
  const usP = useP(cue('United', 404.5), 0.5);
  const euP = useP(cue('Europe', 405.5), 0.5);
  const afP = useP(cue('Africa', 406.4), 0.5);
  const meP = useP(cue('Middle', 407.4), 0.5);
  const iconsP = useP(408.5, 0.6);
  const camP = useP(418.2, 0.6);
  return (
    <g>
      <SourceIcon src="source/sprites/globe_regions.png" cx={960} cy={500} size={480} opacity={globeP} />
      <g opacity={globeP}>
        {[
          {x: -0.5, y: -0.28, color: C.orange, at: cue('United', 404.5)},
          {x: 0.28, y: -0.26, color: C.cyan, at: cue('Europe', 405.5)},
          {x: 0.3, y: 0.3, color: C.green, at: cue('Africa', 406.4)},
          {x: 0.68, y: -0.07, color: C.purple, at: cue('Middle', 407.4)},
        ].map((m, i) => {
          const vis = t >= m.at ? 1 : 0;
          const mx = 960 + m.x * 235;
          const my = 500 + m.y * 235;
          return (
            <g key={i} opacity={vis}>
              <circle cx={mx} cy={my} r={6} fill={C.ink} stroke={m.color} strokeWidth={3} />
              <circle cx={mx} cy={my} r={13} fill="none" stroke={m.color} strokeWidth={2.2} opacity={0.7} />
            </g>
          );
        })}
      </g>
      <g>
        <circle cx={560} cy={772} r={5} fill={C.orange} opacity={t >= cue('United', 404.5) ? 1 : 0} />
        <Label x={574} y={772} size={24} at={cue('United', 404.5)} color={C.orange} anchor="start">United States</Label>
        <circle cx={800} cy={772} r={5} fill={C.cyan} opacity={t >= cue('Europe', 405.5) ? 1 : 0} />
        <Label x={814} y={772} size={24} at={cue('Europe', 405.5)} color={C.cyan} anchor="start">Europe</Label>
        <circle cx={1040} cy={772} r={5} fill={C.green} opacity={t >= cue('Africa', 406.4) ? 1 : 0} />
        <Label x={1054} y={772} size={24} at={cue('Africa', 406.4)} color={C.green} anchor="start">Africa</Label>
        <circle cx={1240} cy={772} r={5} fill={C.purple} opacity={t >= cue('Middle', 407.4) ? 1 : 0} />
        <Label x={1254} y={772} size={24} at={cue('Middle', 407.4)} color={C.purple} anchor="start">Middle East</Label>
      </g>
      <g opacity={iconsP}>
        <SourceIcon src="source/sprites/place_flag.png" cx={480} cy={890} size={180} opacity={1} />
        <SourceIcon src="source/sprites/place_landmark.png" cx={672} cy={890} size={180} opacity={1} />
        <SourceIcon src="source/sprites/place_food.png" cx={864} cy={890} size={180} opacity={1} />
        <SourceIcon src="source/sprites/place_sign.png" cx={1056} cy={890} size={180} opacity={1} />
        <SourceIcon src="source/sprites/place_writing.png" cx={1248} cy={890} size={180} opacity={1} />
        <SourceIcon src="source/sprites/place_people.png" cx={1440} cy={890} size={180} opacity={1} />
      </g>
      <g opacity={camP}>
        <Ink d={rectD(870, 190, 180, 116, 2840, 0.8, 10)} p={camP} color={C.ink} width={3} fill={C.surface} fillOpacity={0.5} />
        <Ink d={circleD(960, 246, 28, 2841, 0.8)} p={camP} color={C.ink} width={3} />
        <Ink d={circleD(960, 246, 12, 2842, 0.6)} p={camP} color={C.cyan} width={2.4} fill={C.cyan} fillOpacity={0.18} />
        <Ink d={rectD(992, 208, 36, 18, 2843, 0.5, 5)} p={camP} color={C.ink} width={2.2} />
        <Ink d={lineD(960, 308, 960, 330, 2844, 0.5)} p={camP} color={C.cyan} width={2.2} dash="2 9" opacity={0.6} />
      </g>
    </g>
  );
};

const Flag2Small: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={lineD(x, y - 36, x, y + 36, 2850, 0.4)} p={p} color={C.ink} width={2.4} />
    <Ink d={waveD(x + 2, y - 32, x + 52, y - 30, 8, 1.4, 2851)} p={p} color={C.red} width={2.4} fill={C.red} fillOpacity={0.1} />
  </g>
);
const LandmarkSmall: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    <Ink d={polyD([[x, y - 50], [x - 28, y + 38], [x + 28, y + 38]], 2860, 0.6, true)} p={p} color={C.ink} width={2.4} />
    <Ink d={lineD(x - 34, y + 44, x + 34, y + 44, 2861, 0.4)} p={p} color={C.ink} width={2.4} />
  </g>
);

/* ------------------------------------------------------------------ */
/* 25 — Feelings                                                       */
/* ------------------------------------------------------------------ */

export const Scene25: React.FC = () => {
  const t = useT();
  const faceP = useP(422.9, 0.7);
  const cakeP = useP(429.5, 0.5);
  const stormP = useP(430.9, 0.5);
  const blendP = useP(432.3, 0.7);
  const vennP = useP(432.6, 0.8);
  const caveatP = useP(440.8, 0.7);
  const mentalP = useP(436.5, 0.5);
  return (
    <g>
      <g opacity={faceP * (1 - blendP)}>
        <SourceIcon src="source/icons/face_neutral.png" cx={960} cy={430} size={315} opacity={faceP * (1 - stormP)} />
        <SourceIcon src="source/icons/face_fear.png" cx={960} cy={430} size={315} opacity={faceP * stormP} />
        <g opacity={cakeP * (1 - blendP)}><SourceIcon src="source/icons/icon_cake.png" cx={650} cy={690} size={210} opacity={cakeP} /></g>
        <g opacity={stormP * (1 - blendP)}><SourceIcon src="source/icons/icon_cloud.png" cx={1270} cy={660} size={220} opacity={stormP} /></g>
      </g>

      <g opacity={blendP * (1 - caveatP)}>
        {[
          {x: 880, y: 500, color: C.purple},
          {x: 1040, y: 500, color: C.pink},
          {x: 960, y: 620, color: C.cyan},
        ].map((c, i) => (
          <Ink key={i} d={circleD(c.x, c.y, 132, 2870 + i, 1.2)} p={vennP} color={c.color} width={2.8} fill={c.color} fillOpacity={0.08} />
        ))}
        {vennP > 0 ? (
          <>
            <Txt x={850} y={468} size={36} color={C.purple} opacity={vennP}>sadness</Txt>
            <Txt x={1070} y={468} size={36} color={C.pink} opacity={vennP}>distress</Txt>
            <Txt x={960} y={786} size={36} color={C.cyan} opacity={vennP}>depression</Txt>
            <g opacity={mentalP}>
              <Ink d={rectD(888, 505, 144, 144, 2660, 0.7, 5)} p={mentalP} color={C.deep} width={2.2} fill={C.bg} fillOpacity={0.7} />
              <SourceImage src="source/mental_fv.png" x={891} y={508} w={138} h={138} opacity={mentalP} fit="slice" />
            </g>
          </>
        ) : null}
      </g>

      <g opacity={caveatP}>
        <SourceIcon src="source/icons/face_neutral.png" cx={960} cy={500} size={300} opacity={caveatP} />
        <Ink d={circleD(960, 500, 165, 2880, 1.4)} p={caveatP} color={C.muted} width={2.2} dash="2 12" opacity={0.5} />
        <Label x={1210} y={390} size={96} at={440.8} color={C.yellow} font="display" weight={700}>?</Label>
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 26 — Stranger neurons                                               */
/* ------------------------------------------------------------------ */

const CalendarIcon: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g opacity={p}>
    <Ink d={rectD(x - 44, y - 42, 88, 84, 2900, 0.7, 6)} p={p} color={C.ink} width={2.6} fill={C.surface} fillOpacity={0.3} />
    <Ink d={lineD(x - 44, y - 16, x + 44, y - 16, 2901, 0.4)} p={p} color={C.ink} width={2.2} />
    <Ink d={lineD(x - 26, y - 54, x - 26, y - 36, 2902, 0.4)} p={p} color={C.ink} width={2.4} />
    <Ink d={lineD(x + 26, y - 54, x + 26, y - 36, 2903, 0.4)} p={p} color={C.ink} width={2.4} />
    <Ink d={circleD(x - 18, y + 18, 10, 2904, 0.5)} p={p} color={C.yellow} width={2.2} fill={C.yellow} fillOpacity={0.2} />
    <Ink d={polyD([[x + 4, y + 8], [x + 34, y + 8], [x + 20, y + 32]], 2905, 0.5, true)} p={p} color={C.cyan} width={2.2} />
  </g>
);
const CoffeeIcon: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g opacity={p}>
    <Ink d={rectD(x - 34, y - 16, 68, 54, 2910, 0.7, 6)} p={p} color={C.ink} width={2.8} fill={C.surface} fillOpacity={0.3} />
    <Ink d={arcD(x + 38, y + 8, 20, -1.2, 1.2, 2911, 0.6)} p={p} color={C.ink} width={2.6} />
    {[0, 1, 2].map((i) => (
      <Ink key={i} d={waveD(x - 18 + i * 18, y - 28, x - 10 + i * 18, y - 56, 6, 1.2, 2912 + i)} p={p} color={C.muted} width={2} opacity={0.45} />
    ))}
    <Ink d={ellipseD(x, y - 14, 34, 6, 2915, 0.5)} p={p} color={C.ink} width={2.2} fill={C.current} fillOpacity={0.4} />
  </g>
);
const CountIcon: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g opacity={p}>
    {[0, 1, 2].map((i) => (
      <Ink key={i} d={circleD(x - 34 + i * 34, y, 12, 2920 + i, 0.6)} p={p} color={i === 2 ? C.green : C.ink} width={2.4} fill={i === 2 ? C.green : C.bg} fillOpacity={i === 2 ? 0.2 : 0.4} />
    ))}
    <Ink d={lineD(x - 50, y + 34, x + 50, y + 34, 2924, 0.4)} p={p} color={C.muted} width={2.2} opacity={0.4} />
  </g>
);
const ArtIcon: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g opacity={p}>
    <Ink d={ellipseD(x - 6, y + 6, 48, 38, 2930, 1.2)} p={p} color={C.ink} width={2.8} fill={C.surface} fillOpacity={0.3} />
    <Ink d={circleD(x + 12, y + 16, 9, 2931, 0.6)} p={p} color={C.bg} width={2.4} fill={C.bg} fillOpacity={1} />
    {[[-26, -14, C.pink], [-4, -22, C.yellow], [18, -14, C.cyan]].map(([dx, dy, col], i) => (
      <circle key={i} cx={x + (dx as number)} cy={y + (dy as number)} r={6} fill={col as string} opacity={0.7 * p} />
    ))}
    <Ink d={lineD(x + 34, y - 46, x + 4, y + 6, 2932, 0.5)} p={p} color={C.orange} width={3} />
  </g>
);
const AlteredIcon: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g opacity={p}>
    <Ink d={rectD(x - 42, y - 38, 84, 76, 2940, 0.7, 4)} p={p} color={C.ink} width={2.6} fill={C.surface} fillOpacity={0.3} />
    <Ink d={polyD([[x - 34, y + 28], [x - 6, y - 8], [x + 14, y + 14], [x + 34, y - 6]], 2941, 0.5)} p={p} color={C.orange} width={2.4} />
    <Ink d={lineD(x - 34, y - 20, x + 34, y + 18, 2942, 0.5)} p={p} color={C.cyan} width={2} opacity={0.5} />
    <Ink d={circleD(x + 22, y - 20, 8, 2943, 0.5)} p={p} color={C.orange} width={2} opacity={0.6} />
  </g>
);
const DetectorIcon: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g opacity={p}>
    <Ink d={circleD(x - 6, y - 10, 32, 2950, 0.8)} p={p} color={C.cyan} width={3.2} fill={C.cyan} fillOpacity={0.08} />
    <Ink d={lineD(x + 18, y + 14, x + 48, y + 44, 2951, 0.6)} p={p} color={C.cyan} width={4} />
    <Ink d={polyD([[x - 22, y - 4], [x - 6, y - 24], [x + 10, y - 2], [x + 2, y + 12]], 2952, 0.5)} p={p} color={C.orange} width={2.2} />
    {[0, 1, 2].map((i) => (
      <Ink key={i} d={lineD(x + 40 + i * 8, y - 34 + i * 8, x + 64 + i * 8, y - 34 + i * 8, 2953 + i, 0.3)} p={p} color={C.orange} width={2} opacity={0.5} />
    ))}
  </g>
);

export const Scene26: React.FC = () => {
  const t = useT();
  const gridP = useP(452.4, 0.7);
  const seasonsP = useP(454.1, 0.5);
  const morningP = useP(456.6, 0.5);
  const countP = useP(459.2, 0.5);
  const artP = useP(462.6, 0.5);
  const alteredP = useP(464.4, 0.5);
  const detectP = useP(468.3, 0.6);
  return (
    <g>
      {[
        {x: 720, y: 380, p: seasonsP, icon: <g opacity={0.25 + 0.75 * seasonsP}><SourceIcon src="source/icons/icon_calendar.png" cx={720} cy={380} size={150} opacity={gridP} /></g>},
        {x: 960, y: 380, p: morningP, icon: <g opacity={0.25 + 0.75 * morningP}><SourceIcon src="source/icons/icon_coffee.png" cx={960} cy={380} size={150} opacity={gridP} /></g>},
        {x: 1200, y: 380, p: countP, icon: <g opacity={0.25 + 0.75 * countP}><CountIcon x={1200} y={380} p={gridP} /></g>},
        {x: 720, y: 650, p: artP, icon: <g opacity={0.25 + 0.75 * artP}><SourceIcon src="source/icons/icon_palette.png" cx={720} cy={650} size={150} opacity={gridP} /></g>},
        {x: 960, y: 650, p: alteredP, icon: <g opacity={0.25 + 0.75 * alteredP}><SourceIcon src="source/icons/icon_glitch.png" cx={960} cy={650} size={150} opacity={gridP} /></g>},
        {x: 1200, y: 650, p: detectP, icon: <g opacity={0.25 + 0.75 * detectP}><DetectorIcon x={1200} y={650} p={gridP} /></g>},
      ].map((it, i) => (
        <g key={i} opacity={gridP}>
          <Ink d={rectD(it.x - 112, it.y - 96, 224, 192, 2960 + i, 0.8, 10)} p={gridP} color={i === 4 && alteredP > 0.5 ? C.orange : C.deep} width={i === 4 ? 2.8 : 2.2} fill={C.surface} fillOpacity={0.45} />
          {it.icon}
        </g>
      ))}
      {alteredP > 0 ? (
        <circle cx={960} cy={650} r={126} fill="none" stroke={C.orange} strokeWidth={2.2} opacity={0.25 * alteredP} />
      ) : null}
      <Label x={720} y={510} size={26} at={454.2} color={C.muted} opacity={gridP}>seasons</Label>
      <Label x={960} y={510} size={26} at={456.7} color={C.muted} opacity={gridP}>morning</Label>
      <Label x={1200} y={510} size={26} at={459.3} color={C.muted} opacity={gridP}>counting</Label>
      <Label x={720} y={780} size={26} at={462.7} color={C.muted} opacity={gridP}>art styles</Label>
      <Label x={960} y={780} size={26} at={464.5} color={C.muted} opacity={gridP}>altered</Label>
      <Label x={1200} y={780} size={24} at={468.4} color={C.muted} opacity={gridP}>photoshop detector</Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 27 — Concepts vote / thing vs word                                  */
/* ------------------------------------------------------------------ */

export const Scene27: React.FC = () => {
  const t = useT();
  const bankP = useP(471.35, 0.8);
  const tagsP = useP(477.5, 0.6);
  const votesP = useP(487.4, 0.6);
  const problemP = useP(491.8, 0.7);
  const penP = useP(496.2, 0.6);
  const tags = [
    {x: 600, text: 'pig', up: true},
    {x: 780, text: 'coin', up: true},
    {x: 960, text: 'bank', up: true},
    {x: 1140, text: 'pink', up: false},
    {x: 1320, text: '$', up: false},
  ];
  return (
    <g>
      <g opacity={bankP * (1 - problemP)}>
        <SourceIcon src="source/icons/icon_piggy.png" cx={960} cy={430} size={320} opacity={bankP} />
        {tags.map((tg, i) => (
          <g key={i} opacity={tagsP}>
            <Ink d={lineD(960 + (tg.x - 960) * 0.3, 500, tg.x, 600, 2970 + i, 0.6)} p={tagsP} color={C.deep} width={2} dash="2 10" opacity={0.45} />
            <Tag x={tg.x} y={640} w={130} h={62} color={C.ink} size={38} p={tagsP} seed={2980 + i}>{tg.text}</Tag>
            {votesP > 0 ? (
              <g opacity={votesP}>
                <Ink d={lineD(tg.x, 670, tg.x, tg.up ? 608 : 742, 2990 + i, 0.5)} p={votesP} color={tg.up ? C.green : C.red} width={2.8} />
                <Ink d={lineD(tg.x - 8, tg.up ? 622 : 728, tg.x, tg.up ? 606 : 744, 3000 + i, 0.4) + ' ' + lineD(tg.x + 8, tg.up ? 622 : 728, tg.x, tg.up ? 606 : 744, 3010 + i, 0.4)} p={votesP} color={tg.up ? C.green : C.red} width={2.8} />
              </g>
            ) : null}
          </g>
        ))}
      </g>

      <g opacity={problemP}>
        <SourceIcon src="source/icons/icon_piggy.png" cx={730} cy={500} size={240} opacity={problemP} />
        <Panel x={1180} y={500} w={300} h={170} p={problemP} seed={3020} fill={C.surface} fillOpacity={0.8} />
        <Txt x={1180} y={480} size={38} color={C.ink} opacity={problemP}>piggy</Txt>
        <Txt x={1180} y={524} size={38} color={C.ink} opacity={problemP}>bank</Txt>
        <Txt x={960} y={505} size={72} color={C.red} opacity={problemP} font="display" weight={700}>=</Txt>
        <Ink d={lineD(1030, 610, 1140, 610, 3021, 0.6)} p={problemP} color={C.red} width={2.8} opacity={0.5} />
        {penP > 0 ? <Pen x={1340} y={620} s={0.5} p={penP} rotate={-62} /> : null}
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 28 — Typographic attacks                                            */
/* ------------------------------------------------------------------ */

const OutputTag: React.FC<{x: number; y: number; p: number; text: string; color: string}> = ({x, y, p, text, color}) => (
  <g opacity={p}>
    <Ink d={rectD(x - 150, y - 44, 300, 88, 3030, 0.8, 14)} p={p} color={color} width={3} fill={C.surface} fillOpacity={0.85} />
    <Txt x={x} y={y + 2} size={48} color={color} opacity={p} font="display" weight={700}>{text}</Txt>
  </g>
);

export const Scene28: React.FC = () => {
  const t = useT();
  const appleP = useP(501.2, 0.7);
  const out1P = useP(505.0, 0.5);
  const poodleP = useP(509.5, 0.35);
  const moneyP = useP(510.4, 0.5);
  const out2P = useP(512.6, 0.5);
  const dogP = useP(516.5, 0.35);
  const dogBeforeP = useP(516.6, 0.5);
  const dogAfterP = useP(517.3, 0.7);
  const out3P = useP(519.0, 0.5);
  const attackP = useP(521.0, 0.6);
  return (
    <g>
      <g opacity={appleP * (1 - poodleP)}>
        <Ink d={rectD(745, 245, 430, 430, 3040, 0.8, 4)} p={appleP} color={C.ink} width={3} fill={C.bg} fillOpacity={0.5} />
        <SourceImage src="source/apple_ipod.jpg" x={747} y={247} w={426} h={426} opacity={appleP} fit="slice" />
        <Ink d={lineD(960, 675, 960, 700, 3041, 0.5)} p={out1P} color={C.muted} width={2.4} opacity={0.45} />
        <OutputTag x={960} y={760} p={out1P} text="iPod" color={C.pink} />
      </g>

      <g opacity={poodleP * (1 - dogP)}>
        <SourceIcon src="source/icons/animal_poodle.png" cx={960} cy={470} size={360} opacity={poodleP} />
        <Txt x={960} y={680} size={40} color={C.muted} opacity={poodleP * 0.9}>poodle</Txt>
        {[[-120, 330], [-20, 300], [120, 340], [-70, 520], [90, 530]].map(([dx, dy], i) => (
          <Txt key={i} x={960 + dx} y={dy} size={56} color={C.green} opacity={moneyP * (0.5 + (i % 3) * 0.2)} font="display" weight={700}>$</Txt>
        ))}
        <Ink d={lineD(960, 650, 960, 700, 3041, 0.5)} p={out2P} color={C.muted} width={2.4} opacity={0.45} />
        <OutputTag x={960} y={760} p={out2P} text="piggy bank" color={C.green} />
      </g>

      <g opacity={dogP}>
        <Ink d={rectD(745, 245, 430, 430, 3042, 0.8, 4)} p={dogP} color={C.ink} width={3} fill={C.bg} fillOpacity={0.5} />
        <g opacity={dogBeforeP * (1 - dogAfterP)}>
          <SourceImage src="source/dog_pizza_before.png" x={747} y={247} w={426} h={426} opacity={dogBeforeP} fit="slice" />
        </g>
        <g opacity={dogAfterP}>
          <SourceImage src="source/dog_pizza_after.png" x={747} y={247} w={426} h={426} opacity={dogAfterP} fit="slice" />
        </g>
        <Ink d={lineD(960, 675, 960, 700, 3043, 0.5)} p={out3P} color={C.muted} width={2.4} opacity={0.45} />
        <OutputTag x={960} y={760} p={out3P} text="pizza" color={C.orange} />
      </g>

      <g opacity={attackP}>
        <Ink d={arcD(960, 520, 300, Math.PI * 0.08, Math.PI * 0.92, 3050, 1.2)} p={attackP} color={C.yellow} width={2.6} opacity={0.3} />
      </g>
      <Label x={960} y={930} size={36} at={521.0} color={C.yellow} opacity={attackP}>
        label attack
      </Label>
    </g>
  );
};
