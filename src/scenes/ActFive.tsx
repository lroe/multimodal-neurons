import React from 'react';
import {C} from '../theme';
import {Ink, Label, Pop, useP, useT} from '../scene';
import {cue} from '../timings';
import {
  SourceIcon,
  Apple,
  Balance,
  Chip,
  Dog,
  IPod,
  Neuron,
  Panel,
  Pen,
  Photo,
  Profile,
  Spider,
  SpiderMask,
  StickyNote,
  Tag,
  Txt,
} from '../components/drawings';
import {arcD, circleD, ellipseD, lineD, mulberry32, polyD, rectD, waveD} from '../sketch/rough';

/* ------------------------------------------------------------------ */
/* 29 — Technical attacks then a marker                                */
/* ------------------------------------------------------------------ */

const NoiseSquare: React.FC<{x: number; y: number; p: number; size?: number}> = ({x, y, p, size = 300}) => {
  const rnd = mulberry32(3100);
  const n = 12;
  const c = size / n;
  return (
    <g opacity={p}>
      {Array.from({length: n * n}).map((_, i) => {
        const r = Math.floor(i / n);
        const cc = i % n;
        const v = rnd();
        if (v < 0.55) return null;
        const cols = [C.cyan, C.pink, C.purple, C.yellow, C.orange];
        return <rect key={i} x={x - size / 2 + cc * c + 1} y={y - size / 2 + r * c + 1} width={c - 2} height={c - 2} fill={cols[Math.floor(rnd() * cols.length)]} opacity={0.18 + v * 0.45} />;
      })}
      <circle cx={x} cy={y} r={58} fill="none" stroke={C.red} strokeWidth={2.2} opacity={0.65} />
      <line x1={x - 76} y1={y} x2={x + 76} y2={y} stroke={C.red} strokeWidth={2} opacity={0.5} />
      <line x1={x} y1={y - 76} x2={x} y2={y + 76} stroke={C.red} strokeWidth={2} opacity={0.5} />
    </g>
  );
};

const Patch: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={rectD(-150, -150, 300, 300, 3110, 1.4, 26)} p={p} color={C.ink} width={3.2} fill={C.surface} fillOpacity={0.6} />
    {[
      {r: 118, c: C.pink},
      {r: 92, c: C.yellow},
      {r: 66, c: C.cyan},
      {r: 40, c: C.green},
    ].map((it, i) => (
      <g key={i}>
        <Ink d={circleD(0, 0, it.r, 3120 + i, 2.2)} p={p} color={it.c} width={2.6} dash="4 10" opacity={0.8} />
        <Ink d={circleD(0, 0, it.r * 0.82, 3130 + i, 2.0)} p={p} color={it.c} width={1.8} opacity={0.4} />
      </g>
    ))}
    <Ink d={waveD(-120, -30, 120, -30, 20, 2.2, 3140)} p={p} color={C.orange} width={2.4} opacity={0.55} />
    <Ink d={waveD(-120, 30, 120, 30, 18, 2.2, 3141)} p={p} color={C.purple} width={2.4} opacity={0.55} />
  </g>
);

const Turtle: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[-58, 20], [-30, -34], [30, -34], [58, 20], [28, 52], [-28, 52]], 3150, 1.2, true)} p={p} color={C.ink} width={3.2} fill={C.green} fillOpacity={0.1} />
    <Ink d={circleD(72, 20, 20, 3151, 1)} p={p} color={C.ink} width={3} />
    <circle cx={78} cy={16} r={2.6} fill={C.ink} opacity={p} />
    {[[-46, 52], [-20, 60], [22, 60], [48, 52]].map(([dx, dy], i) => (
      <Ink key={i} d={lineD(dx, dy, dx - 6, dy + 22, 3152 + i, 0.4)} p={p} color={C.ink} width={2.8} />
    ))}
    <Ink d={lineD(-58, 20, -74, 12, 3156, 0.4)} p={p} color={C.ink} width={2.6} />
  </g>
);

const Rifle: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[-110, -8], [70, -14], [110, -6], [110, 8], [40, 14], [10, 40], [-20, 38], [-10, 14], [-110, 10]], 3160, 0.8, true)} p={p} color={C.ink} width={3} fill={C.surface} fillOpacity={0.3} />
    <Ink d={lineD(-60, 12, -36, 54, 3161, 0.5)} p={p} color={C.ink} width={2.6} />
    <Ink d={lineD(30, -14, 30, -40, 3162, 0.5)} p={p} color={C.ink} width={2.2} opacity={0.6} />
  </g>
);

export const Scene29: React.FC = () => {
  const t = useT();
  const cardP = useP(524.2, 0.7);
  const noiseP = useP(524.8, 0.9);
  const patchP = useP(535.5, 0.6);
  const turtleP = useP(540.0, 0.6);
  const markerP = useP(546.8, 0.9);
  const noteP = useP(548.2, 0.7);
  const holdP = useP(550.0, 0.5);
  return (
    <g>
      <g opacity={cardP * (1 - markerP)}>
        <Ink d={rectD(600, 290, 720, 420, 3170, 1.2, 18)} p={cardP} color={C.ink} width={3.2} fill={C.recess} fillOpacity={0.55} opacity={1 - turtleP} />
        <SourceIcon src="source/icons/tech_noise.png" cx={960} cy={500} size={340} opacity={noiseP * (1 - patchP)} />
        <g opacity={patchP * (1 - turtleP)}>
          <SourceIcon src="source/icons/tech_patch.png" cx={960} cy={500} size={340} opacity={patchP} />
          <Ink d={rectD(760, 640, 400, 130, 3180, 0.7, 10)} p={patchP} color={C.deep} width={2.2} opacity={0.3} />
        </g>
        <g opacity={turtleP}>
          <SourceIcon src="source/icons/tech_turtle.png" cx={740} cy={500} size={380} opacity={turtleP} />
          <SourceIcon src="source/icons/tech_rifle.png" cx={1180} cy={500} size={420} opacity={turtleP} />
          <Txt x={740} y={720} size={38} color={C.muted} opacity={turtleP * 0.85}>turtle</Txt>
          <Txt x={1180} y={720} size={38} color={C.muted} opacity={turtleP * 0.85}>rifle</Txt>
          <Ink d={lineD(930, 470, 970, 470, 3190, 0.5)} p={turtleP} color={C.red} width={2.4} opacity={0.5} />
          <Ink d={lineD(958, 456, 978, 470, 3191, 0.4) + ' ' + lineD(958, 484, 978, 470, 3192, 0.4)} p={turtleP} color={C.red} width={2.4} opacity={0.5} />
        </g>
      </g>

      <g opacity={markerP}>
        <g transform="rotate(180 760 610)"><SourceIcon src="source/icons/tech_marker.png" cx={760} cy={610} size={400} opacity={markerP} /></g>
        <Ink d={lineD(700, 700, 1220, 700, 3200, 0.7)} p={markerP} color={C.muted} width={2.6} opacity={0.4} />
        <g opacity={noteP}>
          <StickyNote x={1090} y={560} w={188} h={142} text="iPod" p={noteP} rotate={-6} size={50} bright />
          <Ink d={lineD(760, 640, 860, 640, 3201, 0.5)} p={noteP} color={C.ink} width={3} opacity={0.4} />
        </g>
        {holdP > 0 ? (
          <g opacity={holdP}>
            <Ink d={arcD(960, 620, 210, Math.PI * 0.05, Math.PI * 0.95, 3210, 1.1)} p={holdP} color={C.cyan} width={2.2} opacity={0.16} />
          </g>
        ) : null}
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 30 — Why it works: word = thing, words weigh more                   */
/* ------------------------------------------------------------------ */

export const Scene30: React.FC = () => {
  const t = useT();
  const spiderP = useP(554.3, 0.7);
  const ipodP = useP(561.9, 0.7);
  const weightP = useP(569.3, 0.8);
  const pairDim = 1 - weightP;
  return (
    <g>
      <g opacity={pairDim}>
        <g opacity={spiderP}>
          <Txt x={700} y={360} size={64} color={C.cyan} opacity={spiderP}>spider</Txt>
          <SourceIcon src="source/icons/animal_spider.png" cx={1220} cy={356} size={185} opacity={spiderP} />
          <Txt x={960} y={360} size={80} color={C.red} opacity={spiderP} font="display" weight={700}>=</Txt>
          <Ink d={lineD(780, 430, 1140, 430, 3220, 0.6)} p={spiderP} color={C.deep} width={2.2} opacity={0.3} />
        </g>
        <g opacity={ipodP}>
          <StickyNote x={700} y={690} w={170} h={126} text="iPod" p={ipodP} rotate={-6} size={48} />
          <IPod x={1220} y={690} s={1.2} p={ipodP} />
          <Txt x={960} y={690} size={80} color={C.red} opacity={ipodP} font="display" weight={700}>=</Txt>
          <Ink d={lineD(780, 760, 1140, 760, 3221, 0.6)} p={ipodP} color={C.deep} width={2.2} opacity={0.3} />
        </g>
      </g>

      <g opacity={weightP}>
        <Ink d={lineD(850, 750, 1070, 750, 3300, 0.8)} p={weightP} color={C.ink} width={4} />
        <Ink d={lineD(960, 750, 960, 452, 3301, 0.8)} p={weightP} color={C.ink} width={4} />
        <Ink d={circleD(960, 452, 13, 3302, 0.8)} p={weightP} color={C.ink} width={3.2} fill={C.current} fillOpacity={0.5} />
        <Ink d={lineD(700, 490, 1220, 420, 3303, 0.8)} p={weightP} color={C.ink} width={4.2} />
        <Ink d={lineD(700, 490, 620, 650, 3304, 0.6)} p={weightP} color={C.muted} width={2.6} />
        <Ink d={lineD(700, 490, 780, 650, 3305, 0.6)} p={weightP} color={C.muted} width={2.6} />
        <Ink d={arcD(700, 650, 80, 0, Math.PI, 3306, 0.8, 20)} p={weightP} color={C.ink} width={3.6} />
        <Ink d={lineD(1220, 420, 1140, 620, 3307, 0.6)} p={weightP} color={C.muted} width={2.6} />
        <Ink d={lineD(1220, 420, 1300, 620, 3308, 0.6)} p={weightP} color={C.muted} width={2.6} />
        <Ink d={arcD(1220, 620, 80, 0, Math.PI, 3309, 0.8, 20)} p={weightP} color={C.ink} width={3.6} />
        <Tag x={700} y={500} w={190} h={48} size={36} p={weightP} seed={3230}>spider</Tag>
        <Tag x={700} y={556} w={190} h={48} size={36} p={weightP} seed={3231}>iPod</Tag>
        <Tag x={700} y={612} w={190} h={48} size={36} p={weightP} seed={3232}>bank</Tag>
        <SourceIcon src="source/icons/animal_spider.png" cx={1220} cy={500} size={100} opacity={weightP} />
        <SourceIcon src="source/icons/hero_mask.png" cx={1220} cy={560} size={85} opacity={weightP} />
        <IPod x={1220} y={610} s={0.55} p={weightP} />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 31 — Stroop test                                                    */
/* ------------------------------------------------------------------ */

export const Scene31: React.FC = () => {
  const t = useT();
  const wordP = useP(572.2, 0.8);
  const swatchP = useP(578.0, 0.6);
  const clipP = useP(583.2, 0.6);
  const winP = useP(584.9, 0.6);
  return (
    <g>
      <Txt x={960} y={460} size={214} color={C.red} font="display" weight={700} opacity={wordP} letterSpacing={4}>
        BLUE
      </Txt>
      <g opacity={swatchP}>
        <Ink d={rectD(810, 700, 300, 74, 3240, 0.8, 8)} p={swatchP} color={C.cyan} width={3} fill={C.cyan} fillOpacity={0.22} />
        <Ink d={circleD(770, 737, 28, 3241, 1)} p={swatchP} color={C.cyan} width={2.6} fill={C.cyan} fillOpacity={0.1} />
        <Ink d={circleD(770, 737, 10, 3242, 0.8)} p={swatchP} color={C.cyan} width={2.4} fill={C.cyan} fillOpacity={0.3} />
      </g>
      <g opacity={clipP}>
        <Ink d={arcD(960, 460, 260, Math.PI * 0.15, Math.PI * 0.85, 3250, 1.2)} p={clipP} color={C.purple} width={2.4} opacity={0.25} />
      </g>
      <g opacity={winP}>
        <Ink d={lineD(1190, 430, 1214, 458, 3260, 0.7)} p={winP} color={C.green} width={5} />
        <Ink d={lineD(1214, 458, 1264, 386, 3261, 0.7)} p={winP} color={C.green} width={5} />
        <Ink d={lineD(1150, 712, 1182, 748, 3262, 1.1)} p={winP} color={C.red} width={4.4} />
        <Ink d={lineD(1182, 712, 1150, 748, 3263, 1.1)} p={winP} color={C.red} width={4.4} />
      </g>
      <Label x={960} y={560} size={30} at={572.3} color={C.muted} opacity={wordP}>
        the word
      </Label>
      <Label x={960} y={810} size={30} at={578.1} color={C.cyan} opacity={swatchP}>
        the ink color
      </Label>
      <Label x={960} y={900} size={40} at={584.9} color={C.yellow} opacity={winP}>
        the word wins
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 32 — Prediction, then confirmation                                  */
/* ------------------------------------------------------------------ */

export const Scene32: React.FC = () => {
  const t = useT();
  const neuronP = useP(588.8, 0.8);
  const predP = useP(591.8, 0.8);
  const realP = useP(594.6, 0.8);
  const checkP = useP(596.0, 0.5);
  const lookP = useP(599.9, 0.6);
  return (
    <g>
      <g opacity={neuronP}>
        <Neuron x={960} y={250} scale={0.72} p={neuronP} accent={C.cyan} />
        <Ink d={circleD(1040, 270, 62, 3270, 1)} p={neuronP} color={C.cyan} width={3} opacity={0.75} />
        <Ink d={lineD(1084, 314, 1130, 360, 3271, 0.6)} p={neuronP} color={C.cyan} width={4} opacity={0.75} />
        {lookP > 0 ? <Ink d={circleD(1040, 270, 84, 3272, 1)} p={lookP} color={C.cyan} width={2.2} opacity={0.3} /> : null}
      </g>

      <g opacity={predP}>
        <Ink d={rectD(580, 500, 300, 330, 3280, 1.2, 16)} p={predP} color={C.deep} width={2.4} dash="7 12" opacity={0.7} />
        <g opacity={0.55}>
          <Apple x={720} y={530} s={0.95} p={predP} color={C.muted} fill={C.muted} fillOpacity={0.05} />
        </g>
        <g transform="translate(755 490) rotate(-8)">
          <StickyNote x={0} y={0} w={108} h={80} text="iPod" p={predP} rotate={0} size={32} color={C.muted} textColor={C.muted} />
        </g>
      </g>

      <g opacity={realP}>
        <Ink d={rectD(950, 500, 300, 330, 3281, 1.2, 16)} p={realP} color={C.ink} width={3.2} fill={C.surface} fillOpacity={0.35} />
        <SourceIcon src="source/icons/apple_clean.png" cx={1090} cy={530} size={230} opacity={realP} />
        <g transform="translate(1125 490) rotate(-8)">
          <StickyNote x={0} y={0} w={108} h={80} text="iPod" p={realP} rotate={0} size={32} />
        </g>
      </g>

      <g opacity={checkP}>
        <Ink d={lineD(1290, 560, 1320, 592, 3290, 0.7)} p={checkP} color={C.green} width={5} />
        <Ink d={lineD(1320, 592, 1380, 510, 3291, 0.7)} p={checkP} color={C.green} width={5} />
        <Ink d={lineD(900, 610, 940, 610, 3292, 0.5)} p={checkP} color={C.deep} width={2.4} opacity={0.5} />
      </g>
      <Label x={720} y={870} size={30} at={591.9} color={C.muted} opacity={predP}>
        prediction
      </Label>
      <Label x={1090} y={870} size={30} at={594.7} color={C.ink} opacity={realP}>
        real photo
      </Label>
      <Label x={960} y={940} size={34} at={596.1} color={C.green} opacity={checkP}>
        confirmed
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 33 — Filter and the real concern                                    */
/* ------------------------------------------------------------------ */

export const Scene33: React.FC = () => {
  const t = useT();
  const gateP = useP(607.9, 0.8);
  const slipP = useP(608.4, 2.4);
  const warnP = useP(618.4, 0.6);
  const flexP = useP(626.6, 0.8);
  const y = -slipP * 380;
  return (
    <g>
      <g opacity={1 - flexP}>
        <SourceIcon src="source/icons/tech_gate.png" cx={960} cy={520} size={540} opacity={gateP} />
        <Txt x={960} y={820} size={38} color={C.muted} opacity={gateP * 0.8}>filter</Txt>
        <g transform={`translate(0 ${y})`} opacity={1 - warnP}>
          <Ink d={rectD(860, 650, 200, 150, 3310, 0.9, 8)} p={slipP} color={C.ink} width={2.8} fill={C.surface} fillOpacity={0.7} />
          <Ink d={polyD([[890, 760], [910, 710], [940, 740], [970, 690], [1000, 750], [1020, 700], [1030, 760]], 3311, 0.8)} p={slipP} color={C.cyan} width={2.4} opacity={0.5} />
          <Txt x={960} y={714} size={56} color={warnP > 0.4 ? C.red : C.ink} font="display" weight={700} opacity={slipP}>OK</Txt>
        </g>
        {warnP > 0 ? (
          <g opacity={warnP}>
            <Ink d={polyD([[960, 250], [920, 320], [1000, 320]], 3320, 1, true)} p={warnP} color={C.red} width={3} fill={C.red} fillOpacity={0.1} />
            <Txt x={960} y={306} size={42} color={C.red} opacity={warnP} font="display" weight={700}>!</Txt>
          </g>
        ) : null}
      </g>

      <g opacity={flexP}>
        <Ink d={circleD(960, 520, 190, 3330, 1.6)} p={flexP} color={C.ink} width={4} fill={C.ink} fillOpacity={0.03} />
        <path d={`M 960 330 A 190 190 0 0 1 960 710 Z`} fill={C.green} opacity={0.07 * flexP} />
        <path d={`M 960 330 A 190 190 0 0 0 960 710 Z`} fill={C.red} opacity={0.07 * flexP} />
        <Ink d={lineD(960, 330, 960, 710, 3331, 0.6)} p={flexP} color={C.muted} width={2.2} opacity={0.4} />
        <Ink d={lineD(850, 520, 990, 520, 3332, 0.6)} p={flexP} color={C.green} width={6} />
        <Ink d={lineD(920, 450, 920, 590, 3333, 0.6)} p={flexP} color={C.green} width={6} />
        <Ink d={lineD(1080, 520, 1140, 520, 3334, 0.6)} p={flexP} color={C.red} width={6} />
      </g>
      <Label x={960} y={940} size={30} at={608.6} color={C.red} opacity={slipP * (1 - flexP)}>
        slip past
      </Label>
      <Label x={960} y={350} size={30} at={618.6} color={C.red} opacity={warnP * (1 - flexP)}>
        real concern
      </Label>
      <Label x={960} y={780} size={30} at={626.8} color={C.muted} opacity={flexP}>
        same flexibility
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 34 — 2025 benchmark                                                 */
/* ------------------------------------------------------------------ */

export const Scene34: React.FC = () => {
  const t = useT();
  const barsP = useP(632.3, 0.8);
  const labelsP = useP(633.0, 0.5);
  const shieldP = useP(646.7, 0.8);
  const vals = [95, 55, 40, 32];
  const xs = [720, 900, 1080, 1260];
  return (
    <g>
      <g opacity={1 - shieldP}>
        <Ink d={lineD(600, 640, 1380, 640, 3340, 0.7)} p={barsP} color={C.muted} width={3.2} opacity={0.55} />
        {vals.map((v, i) => {
          const h = (v / 100) * 280;
          return (
            <g key={i}>
              <Ink d={rectD(xs[i] - 45, 640 - h, 90, h, 3341 + i, 0.8, 3)} p={barsP} color={i === 0 ? C.green : C.red} width={3} fill={i === 0 ? C.green : C.red} fillOpacity={0.16} />
            </g>
          );
        })}
        <g opacity={labelsP}>
          <Txt x={960} y={212} size={38} color={C.muted} opacity={labelsP}>handwritten label attack</Txt>
          <Txt x={960} y={252} size={28} color={C.muted} opacity={labelsP * 0.7}>accuracy retained</Txt>
          {vals.map((v, i) => (
            <Txt key={`v-${i}`} x={xs[i]} y={640 - (v / 100) * 280 - 16} size={28} color={i === 0 ? C.green : C.red} opacity={labelsP}>{v}%</Txt>
          ))}
          <Txt x={720} y={700} size={26} color={C.green} opacity={labelsP}>top commercial</Txt>
          <Txt x={720} y={730} size={26} color={C.green} opacity={labelsP}>model</Txt>
          <Txt x={1080} y={700} size={26} color={C.red} opacity={labelsP}>smaller open models</Txt>
        </g>
      </g>

      <g opacity={shieldP}>
        <Ink d={rectD(720, 380, 220, 220, 3380, 1, 18)} p={shieldP} color={C.cyan} width={3.2} fill={C.surface} fillOpacity={0.5} />
        <Ink d={circleD(830, 490, 54, 3381, 1)} p={shieldP} color={C.cyan} width={3} />
        <Ink d={circleD(830, 490, 18, 3382, 0.8)} p={shieldP} color={C.cyan} width={2.6} fill={C.cyan} fillOpacity={0.2} />
        <Ink d={arcD(830, 490, 30, -1.2, 1.2, 3383, 0.6)} p={shieldP} color={C.cyan} width={2.2} />
        <Ink d={rectD(980, 380, 220, 220, 3384, 1, 18)} p={shieldP} color={C.pink} width={3.2} fill={C.surface} fillOpacity={0.5} />
        {[0, 1, 2].map((i) => (
          <Ink key={i} d={lineD(1018, 438 + i * 42, 1162 - i * 18, 438 + i * 42, 3390 + i, 0.5)} p={shieldP} color={C.pink} width={3} />
        ))}
        <Ink d={lineD(950, 490, 970, 490, 3400, 0.6)} p={shieldP} color={C.muted} width={2.4} opacity={0.5} />
        <g transform="translate(960 680)">
          <Ink d={polyD([[0, -62], [58, -34], [58, 18], [0, 62], [-58, 18], [-58, -34]], 3410, 1, true)} p={shieldP} color={C.green} width={3.4} fill={C.green} fillOpacity={0.1} />
          <Ink d={lineD(-24, 0, -6, 20, 3411, 0.6)} p={shieldP} color={C.green} width={4.2} />
          <Ink d={lineD(-6, 20, 30, -24, 3412, 0.6)} p={shieldP} color={C.green} width={4.2} />
        </g>
      </g>
    </g>
  );
};
