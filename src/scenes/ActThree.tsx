import React from 'react';
import {C} from '../theme';
import {Ink, Label, Pop, useP, useT} from '../scene';
import {cue} from '../timings';
import {
  Apple,
  Bars,
  Cake,
  Cat,
  Dog,
  Face,
  IPod,
  Link,
  Neuron,
  Panel,
  Photo,
  Profile,
  SourceIcon,
  SourceImage,
  Spider,
  SpiderMask,
  Txt,
} from '../components/drawings';
import {arcD, circleD, ellipseD, lineD, mulberry32, polyD, rectD, waveD} from '../sketch/rough';

/* ------------------------------------------------------------------ */
/* 17 — Benchmark scoreboard and the harder test                       */
/* ------------------------------------------------------------------ */

const BenchmarkChart: React.FC<{p: number; eqP: number}> = ({p, eqP}) => {
  const baseY = 545;
  const fullH = 175;
  const h = fullH * p;
  const top = baseY - h;
  return (
    <g>
      <Txt x={960} y={268} size={38} color={C.muted} opacity={p} letterSpacing={2}>ImageNet</Txt>
      <Ink d={lineD(720, baseY, 1200, baseY, 3100, 0.8)} p={p} color={C.muted} width={3.2} opacity={0.65} />
      {[720, 1200].map((x, i) => (
        <Ink key={i} d={lineD(x, baseY - 10, x, baseY + 10, 3101 + i, 0.4)} p={p} color={C.muted} width={2.4} opacity={0.55} />
      ))}
      <g opacity={p}>
        <rect x={770} y={top} width={180} height={h} rx={2} fill={C.cyan} fillOpacity={0.12} stroke={C.cyan} strokeWidth={3} />
        <rect x={970} y={top} width={180} height={h} rx={2} fill={C.deep} fillOpacity={0.14} stroke={C.deep} strokeWidth={3} />
        <path d={`M 800 ${top} L 920 ${top}`} stroke={C.cyan} strokeWidth={3} strokeLinecap="round" />
        <path d={`M 1000 ${top} L 1120 ${top}`} stroke={C.deep} strokeWidth={3} strokeLinecap="round" />
      </g>
      <Txt x={860} y={top - 18} size={30} color={C.cyan} opacity={p}>76.2%</Txt>
      <Txt x={1060} y={top - 18} size={30} color={C.deep} opacity={p}>76.1%</Txt>
      <Txt x={860} y={584} size={32} color={C.muted} opacity={p}>CLIP</Txt>
      <Txt x={860} y={612} size={24} color={C.cyan} opacity={p * 0.75}>zero-shot</Txt>
      <Txt x={1060} y={584} size={32} color={C.muted} opacity={p}>ResNet-50</Txt>
      <Txt x={1060} y={612} size={24} color={C.deep} opacity={p * 0.75}>supervised</Txt>
      {eqP > 0 ? <Txt x={960} y={315} size={52} color={C.green} opacity={eqP}>≈</Txt> : null}
    </g>
  );
};

export const Scene17: React.FC = () => {
  const t = useT();
  const scoreP = useP(255.0, 0.8);
  const eqP = useP(259.6, 0.5);
  const hardP = useP(262.7, 0.8);
  const checksP = useP(267.0, 0.7);
  return (
    <g>
      <g opacity={1 - hardP}>
        <BenchmarkChart p={scoreP} eqP={eqP} />
      </g>

      <g opacity={hardP}>
        {[
          {x: 700, kind: 'sketch'},
          {x: 960, kind: 'cartoon'},
          {x: 1220, kind: 'odd'},
        ].map((it, i) => (
          <g key={i}>
            <Ink d={rectD(it.x - 112, 590, 224, 250, 2100 + i, 0.9, 10)} p={hardP} color={C.ink} width={2.8} fill={C.surface} fillOpacity={0.4} />
            <SourceIcon src={`source/sprites/cat_${it.kind}.png`} cx={it.x} cy={700} size={190} opacity={hardP} />
            <Txt x={it.x} y={816} size={36} color={C.muted} opacity={hardP * 0.9}>{it.kind}</Txt>
            <g opacity={checksP}>
              <Ink d={lineD(it.x - 54, 874, it.x - 30, 898, 2140 + i, 0.6)} p={checksP} color={C.green} width={4.2} />
              <Ink d={lineD(it.x - 30, 898, it.x + 26, 826, 2141 + i, 0.6)} p={checksP} color={C.green} width={4.2} />
            </g>
          </g>
        ))}
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 18 — What you'd need to know / the bakery sign                      */
/* ------------------------------------------------------------------ */

const Star: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[0, -44], [12, -14], [44, -14], [18, 6], [28, 36], [0, 18], [-28, 36], [-18, 6], [-44, -14], [-12, -14]], 2200, 0.8, true)} p={p} color={C.yellow} width={3} fill={C.yellow} fillOpacity={0.16} />
  </g>
);

const Flag: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={lineD(0, -52, 0, 48, 2210, 0.6)} p={p} color={C.ink} width={3.2} />
    <Ink d={waveD(2, -48, 82, -46, 14, 1.6, 2211)} p={p} color={C.red} width={3} fill={C.red} fillOpacity={0.1} />
    <Ink d={lineD(2, -26, 82, -24, 2212, 0.5)} p={p} color={C.red} width={2.4} opacity={0.5} />
  </g>
);

const Landmark: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[0, -64], [-34, 52], [34, 52]], 2220, 0.8, true)} p={p} color={C.ink} width={3} />
    <Ink d={lineD(-42, 58, 42, 58, 2221, 0.5)} p={p} color={C.ink} width={3.2} />
    <Ink d={lineD(-18, 18, 18, 18, 2222, 0.5)} p={p} color={C.ink} width={2.4} />
    <Ink d={lineD(0, -40, 0, 44, 2223, 0.4)} p={p} color={C.ink} width={2} opacity={0.4} />
  </g>
);

const Meme: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={circleD(0, 0, 54, 2230, 1.2)} p={p} color={C.ink} width={3.4} fill={C.yellow} fillOpacity={0.08} />
    <circle cx={-18} cy={-8} r={4} fill={C.ink} opacity={p} />
    <circle cx={18} cy={-8} r={4} fill={C.ink} opacity={p} />
    <Ink d={arcD(0, 10, 30, 0.25, Math.PI - 0.25, 2231, 0.8, 18)} p={p} color={C.ink} width={3} />
  </g>
);

export const Scene18: React.FC = () => {
  const t = useT();
  const iconP = useP(275.1, 0.6);
  const starP = iconP;
  const flagP = iconP;
  const landP = iconP;
  const memeP = iconP;
  const catP = iconP;
  const shopP = useP(282.2, 0.8);
  const signP = useP(283.0, 0.6);
  const readP = useP(286.6, 0.6);
  const captionP = useP(287.4, 0.6);
  const holdP = useP(291.9, 0.6);
  return (
    <g>
      <g opacity={iconP * (1 - shopP)}>
        {[
          {x: 480, src: 'concept_celebrity'},
          {x: 672, src: 'concept_flag'},
          {x: 864, src: 'concept_landmark'},
          {x: 1056, src: 'concept_meme'},
          {x: 1248, src: 'concept_cat_photo'},
          {x: 1440, src: 'concept_cat_drawing'},
        ].map((it, i) => (
          <SourceIcon key={i} src={`source/sprites/${it.src}.png`} cx={it.x} cy={520} size={200} opacity={1} />
        ))}
      </g>

      <g opacity={shopP}>
        {/* bakery */}
        <Ink d={rectD(700, 330, 520, 390, 2240, 1.3, 6)} p={shopP} color={C.ink} width={4} fill={C.surface} fillOpacity={0.2} />
        <Ink d={lineD(660, 330, 1260, 330, 2241, 0.7)} p={shopP} color={C.ink} width={4} />
        {/* awning */}
        <Ink d={lineD(690, 270, 1230, 270, 2242, 0.5)} p={shopP} color={C.ink} width={3} />
        <Ink d={lineD(690, 270, 720, 330, 2243, 0.4)} p={shopP} color={C.ink} width={2.8} />
        <Ink d={lineD(1230, 270, 1200, 330, 2244, 0.4)} p={shopP} color={C.ink} width={2.8} />
        {Array.from({length: 8}).map((_, i) => (
          <Ink key={i} d={lineD(706 + i * 62, 272, 728 + i * 62, 328, 2250 + i, 0.4)} p={shopP} color={i % 2 ? C.red : C.ink} width={i % 2 ? 3 : 2} opacity={i % 2 ? 0.5 : 0.22} />
        ))}
        <Ink d={waveD(720, 330, 1200, 330, 6, 8, 2241)} p={shopP} color={C.ink} width={2.6} opacity={0.55} />
        {/* door */}
        <Ink d={rectD(920, 540, 100, 180, 2251, 0.8, 2)} p={shopP} color={C.ink} width={3.2} fill={C.recess} fillOpacity={0.4} />
        <Ink d={circleD(1002, 630, 3.5, 2252, 0.5)} p={shopP} color={C.yellow} width={2.2} fill={C.yellow} fillOpacity={0.6} />
        {/* window */}
        <Ink d={rectD(740, 500, 130, 150, 2253, 0.8, 4)} p={shopP} color={C.ink} width={2.8} fill={C.recess} fillOpacity={0.4} />
        <Ink d={lineD(805, 502, 805, 648, 2254, 0.5)} p={shopP} color={C.ink} width={2.2} opacity={0.45} />
        <Ink d={rectD(1050, 500, 130, 150, 2255, 0.8, 4)} p={shopP} color={C.ink} width={2.8} fill={C.recess} fillOpacity={0.4} />
        {/* sign */}
        <Ink d={rectD(810, 380, 300, 92, 2256, 0.8, 8)} p={signP} color={readP > 0.3 ? C.cyan : C.ink} width={3} fill={C.surface} fillOpacity={0.85} />
        <Txt x={960} y={428} size={46} color={readP > 0.3 ? C.cyan : C.ink} font="display" weight={700} opacity={shopP}>BAKERY</Txt>
        <Ink d={lineD(830, 452, 1090, 452, 2257, 0.6)} p={readP} color={C.cyan} width={3.2} opacity={0.55} />
      </g>

      <g opacity={captionP}>
        <Ink d={rectD(760, 790, 400, 76, 2260, 0.8, 10)} p={captionP} color={C.ink} width={2.6} fill={C.surface} fillOpacity={0.8} />
        <Txt x={960} y={830} size={36} color={C.ink} opacity={captionP}>Rosie's Bakery</Txt>
        <Ink d={`M 960 786 C 960 740, 960 700, 960 656`} p={captionP} color={C.cyan} width={2.4} dash="3 10" opacity={0.55} />
      </g>
      <g opacity={readP}>
        <Ink d={ellipseD(1190, 400, 46, 28, 2270, 1)} p={readP} color={C.cyan} width={3} />
        <Ink d={circleD(1190, 400, 12, 2271, 0.8)} p={readP} color={C.cyan} width={2.6} fill={C.cyan} fillOpacity={0.18} />
        <Ink d={lineD(1222, 428, 1260, 470, 2272, 0.5)} p={readP} color={C.cyan} width={2.4} opacity={0.6} />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 19 — Top images and optimized static                                */
/* ------------------------------------------------------------------ */

const StaticBlock: React.FC<{x: number; y: number; p: number; w?: number; h?: number; seed?: number; opacity?: number}> = ({x, y, p, w = 360, h = 360, seed = 2300, opacity = 0.55}) => {
  const rnd = mulberry32(seed);
  const cells = 12;
  const cw = w / cells;
  const ch = h / cells;
  const colors = [C.cyan, C.pink, C.purple, C.yellow, C.orange, C.green];
  return (
    <g opacity={p * opacity}>
      {Array.from({length: cells * cells}).map((_, i) => {
        const r = Math.floor(i / cells);
        const c = i % cells;
        const v = rnd();
        if (v < 0.28) return null;
        return <rect key={i} x={x - w / 2 + c * cw + 1} y={y - h / 2 + r * ch + 1} width={cw - 2} height={ch - 2} fill={colors[Math.floor(rnd() * colors.length)]} opacity={0.15 + v * 0.4} />;
      })}
    </g>
  );
};

export const Scene19: React.FC = () => {
  const t = useT();
  const rowP = useP(296.0, 0.7);
  const toolsP = useP(300.6, 0.6);
  const gridP = useP(304.5, 0.7);
  const topP = useP(308.4, 0.6);
  const staticP = useP(311.5, 0.7);
  const spiderP = useP(315.3, 1.3);
  const likeP = useP(317.9, 0.6);
  return (
    <g>
      <g opacity={rowP * (1 - gridP)}>
        <Neuron x={930} y={520} scale={1.0} p={rowP} accent={C.cyan} />
        <Ink d={circleD(1080, 460, 58, 2310, 1.2)} p={rowP} color={C.cyan} width={3.2} opacity={0.75} />
        <Ink d={lineD(1122, 502, 1170, 550, 2311, 0.6)} p={rowP} color={C.cyan} width={4} opacity={0.75} />
      </g>

      <g opacity={gridP * (1 - staticP)}>
        {[
          {x: 720, y: 320, icon: <SourceIcon src="source/icons/animal_spider.png" cx={720} cy={322} size={125} opacity={gridP} />},
          {x: 960, y: 320, icon: <Txt x={960} y={326} size={38} color={C.cyan} opacity={gridP}>spider</Txt>},
          {x: 1200, y: 320, icon: <SourceIcon src="source/icons/hero_mask.png" cx={1200} cy={322} size={115} opacity={gridP} />},
          {x: 720, y: 500, icon: <SourceIcon src="source/icons/animal_dog.png" cx={720} cy={505} size={125} opacity={gridP} />},
          {x: 960, y: 500, icon: <SourceIcon src="source/icons/apple_clean.png" cx={960} cy={505} size={120} opacity={gridP} />},
          {x: 1200, y: 500, icon: <SourceIcon src="source/icons/icon_cake.png" cx={1200} cy={505} size={125} opacity={gridP} />},
        ].map((it, i) => (
          <g key={i}>
            <Ink
              d={rectD(it.x - 105, it.y - 75, 210, 150, 2330 + i, 0.8, 8)}
              p={gridP}
              color={topP > 0.4 && i < 3 ? C.cyan : C.deep}
              width={topP > 0.4 && i < 3 ? 3 : 2.2}
              fill={C.surface}
              fillOpacity={topP > 0.4 && i < 3 ? 0.7 : 0.4}
            />
            {it.icon}
          </g>
        ))}
        <g transform="translate(960 790)">
          <Neuron x={0} y={0} scale={0.55} p={gridP} accent={C.pink} />
        </g>
      </g>

      {staticP > 0 ? (
        <g>
          <StaticBlock x={960} y={500} p={staticP * (1 - spiderP)} w={380} h={380} seed={2340} opacity={0.9} />
          <Ink d={rectD(770, 310, 380, 380, 2341, 1, 6)} p={staticP} color={C.deep} width={2.4} opacity={0.4} />
          <g opacity={spiderP}>
            <Ink d={rectD(850, 390, 220, 220, 2342, 0.8, 6)} p={spiderP} color={C.ink} width={2.8} fill={C.bg} fillOpacity={0.6} />
            <SourceImage src="source/spider_fv.png" x={852} y={392} w={216} h={216} opacity={spiderP} fit="slice" />
          </g>
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 20 — Spider neuron, the Halle Berry cell rebuilt                    */
/* ------------------------------------------------------------------ */

const Costume: React.FC<{p: number; x: number; y: number}> = ({p, x, y}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={circleD(0, -34, 30, 2400, 1.2)} p={p} color={C.red} width={3.2} fill={C.red} fillOpacity={0.1} />
    {[-1, 1].map((side) => (
      <path key={side} d={`M ${side * 8} -50 C ${side * 22} -68, ${side * 34} -58, ${side * 30} -38 C ${side * 26} -22, ${side * 12} -22, ${side * 8} -34 Z`} fill={C.ink} opacity={0.9 * p} />
    ))}
    <Ink d={lineD(0, -4, 0, 54, 2401, 0.6)} p={p} color={C.ink} width={3.2} />
    <Ink d={lineD(0, 10, -36, 38, 2402, 0.5)} p={p} color={C.ink} width={3} />
    <Ink d={lineD(0, 10, 36, 38, 2403, 0.5)} p={p} color={C.ink} width={3} />
    <Ink d={lineD(0, 54, -26, 92, 2404, 0.5)} p={p} color={C.ink} width={3.2} />
    <Ink d={lineD(0, 54, 26, 92, 2405, 0.5)} p={p} color={C.ink} width={3.2} />
    <Ink d={lineD(-18, -30, 18, -30, 2406, 0.5)} p={p} color={C.red} width={2.2} opacity={0.6} />
  </g>
);

export const Scene20: React.FC = () => {
  const t = useT();
  const neuronP = useP(321.1, 0.8);
  const card1 = useP(321.4, 0.5);
  const card2 = useP(323.5, 0.5);
  const card3 = useP(326.2, 0.5);
  const card4 = useP(329.5, 0.5);
  const sameP = useP(336.9, 0.6);
  const allP = useP(341.9, 0.6);
  return (
    <g>
      <Neuron x={960} y={300} scale={0.85} p={neuronP} accent={C.pink} />
      {[660, 860, 1060, 1260].map((x, i) => (
        <Ink key={`slot20-${i}`} d={rectD(x - 90, 676, 180, 210, 2420 + i, 0.8, 12)} p={1} color={C.deep} width={2} opacity={neuronP * 0.2} />
      ))}
      {[
        {x: 660, p: card1, node: <SourceIcon src="source/icons/animal_spider.png" cx={660} cy={780} size={160} opacity={card1} />},
        {x: 860, p: card2, node: <Txt x={860} y={790} size={46} color={C.cyan} opacity={card2}>spider</Txt>},
        {x: 1060, p: card3, node: <SourceIcon src="source/icons/hero_mask.png" cx={1060} cy={780} size={156} opacity={card3} />},
        {x: 1260, p: card4, node: <SourceIcon src="source/icons/hero_costume.png" cx={1260} cy={788} size={178} opacity={card4} />},
      ].map((it, i) => (
        <g key={i} opacity={it.p}>
          <Ink d={rectD(it.x - 90, 676, 180, 210, 2410 + i, 0.9, 12)} p={it.p} color={allP > 0.4 ? C.ink : C.deep} width={2.8} fill={C.surface} fillOpacity={0.55} />
          {it.node}
          <Ink d={`M 960 382 C 960 520, ${it.x} 540, ${it.x} 676`} p={it.p} color={C.deep} width={2.2} dash="2 12" opacity={0.45} />
        </g>
      ))}
      <g opacity={allP}>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={[660, 860, 1060, 1260][i]} cy={676} r={14} fill="none" stroke={C.pink} strokeWidth={2.2} opacity={0.55} />
        ))}
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 21 — Sensible neurons vs static                                     */
/* ------------------------------------------------------------------ */

export const Scene21: React.FC = () => {
  const t = useT();
  const gridP = useP(349.4, 0.8);
  const unusualP = useP(354.1, 0.5);
  const noiseP = useP(355.4, 0.8);
  return (
    <g>
      {[
        {x: 720, y: 420, icon: <SourceIcon src="source/icons/animal_spider.png" cx={720} cy={425} size={150} opacity={gridP} />},
        {x: 960, y: 420, icon: <SourceIcon src="source/icons/animal_dog.png" cx={960} cy={425} size={155} opacity={gridP} />},
        {x: 1200, y: 420, icon: <SourceIcon src="source/icons/apple_clean.png" cx={1200} cy={425} size={150} opacity={gridP} />},
        {x: 720, y: 690, icon: <SourceIcon src="source/icons/face_happy.png" cx={720} cy={695} size={145} opacity={gridP} />},
        {x: 960, y: 690, icon: <SourceIcon src="source/icons/icon_cake.png" cx={960} cy={695} size={155} opacity={gridP} />},
        {x: 1200, y: 690, icon: <SourceIcon src="source/icons/icon_toaster.png" cx={1200} cy={695} size={155} opacity={gridP} />},
      ].map((it, i) => (
        <g key={i}>
          <Ink d={rectD(it.x - 110, it.y - 95, 220, 190, 2500 + i, 0.8, 10)} p={gridP} color={C.ink} width={2.6} fill={C.surface} fillOpacity={0.4} />
          <g opacity={1 - noiseP}>{it.icon}</g>
          <StaticBlock x={it.x} y={it.y} p={noiseP} w={180} h={150} seed={2520 + i * 7} opacity={0.65} />
        </g>
      ))}
    </g>
  );
};

const Flag2: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={lineD(0, -58, 0, 58, 2530, 0.6)} p={p} color={C.ink} width={3.2} />
    <Ink d={waveD(2, -54, 92, -50, 16, 1.7, 2531)} p={p} color={C.purple} width={3} fill={C.purple} fillOpacity={0.12} />
  </g>
);
