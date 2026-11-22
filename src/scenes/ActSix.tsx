import React from 'react';
import {C} from '../theme';
import {Ink, Label, Pop, useP, useT} from '../scene';
import {cue} from '../timings';
import {
  SourceIcon,
  Apple,
  Brain,
  Bridge,
  Cloud,
  Face,
  Network,
  Neuron,
  Panel,
  Photo,
  Profile,
  Spider,
  SpiderMask,
  StickyNote,
  Txt,
} from '../components/drawings';
import {arcD, circleD, dotField, ellipseD, lineD, polyD, rectD, waveD} from '../sketch/rough';

/* ------------------------------------------------------------------ */
/* 35 — Hidden instructions inside images                              */
/* ------------------------------------------------------------------ */

const MiniChip: React.FC<{x: number; y: number; p: number; scale?: number}> = ({x, y, p, scale = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={p}>
    <Ink d={rectD(-60, -46, 120, 92, 3500 + x, 0.7, 12)} p={p} color={C.ink} width={2.8} fill={C.recess} fillOpacity={0.6} />
    {[-1, 1].map((sy) =>
      [-1, 0, 1].map((sx) => (
        <Ink key={`${sy}-${sx}`} d={lineD(sx * 30, sy * 46, sx * 30, sy * 58, 3510 + Math.round(x + sx * 3 + sy), 0.4)} p={p} color={C.ink} width={2} opacity={0.45} />
      )),
    )}
    <Ink d={circleD(0, 0, 16, 3520 + x, 0.6)} p={p} color={C.cyan} width={2.4} fill={C.cyan} fillOpacity={0.1} />
    {[0, 1, 2, 3].map((i) => {
      const a = (i / 4) * Math.PI * 2;
      return <Ink key={i} d={lineD(Math.cos(a) * 19, Math.sin(a) * 19, Math.cos(a) * 30, Math.sin(a) * 30, 3530 + i + x, 0.4)} p={p} color={C.cyan} width={2} />;
    })}
  </g>
);

const EyeIcon: React.FC<{x: number; y: number; p: number; s?: number}> = ({x, y, p, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <Ink d={arcD(0, 0, 72, Math.PI * 0.08, Math.PI * 0.92, 3540, 1.4)} p={p} color={C.ink} width={3.4} />
    <Ink d={arcD(0, 0, 72, Math.PI * 1.08, Math.PI * 1.92, 3541, 1.4)} p={p} color={C.ink} width={3.4} />
    <Ink d={circleD(0, 0, 28, 3542, 1.2)} p={p} color={C.cyan} width={2.8} fill={C.cyan} fillOpacity={0.14} />
    <Ink d={circleD(0, 0, 10, 3543, 0.8)} p={p} color={C.cyan} width={2.2} fill={C.cyan} fillOpacity={0.3} />
  </g>
);

const Magnifier: React.FC<{x: number; y: number; p: number; s?: number}> = ({x, y, p, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
    <Ink d={circleD(0, 0, 52, 3550, 1.1)} p={p} color={C.cyan} width={3.6} fill={C.cyan} fillOpacity={0.05} />
    <Ink d={lineD(36, 38, 86, 88, 3551, 0.7)} p={p} color={C.cyan} width={5} />
    <Ink d={arcD(0, 0, 38, -2.4, -0.9, 3552, 0.8)} p={p} color={C.cyan} width={2} opacity={0.5} />
  </g>
);

export const Scene35: React.FC = () => {
  const t = useT();
  const chipsP = useP(653.4, 0.7);
  const imageP = useP(662.1, 0.8);
  const hiddenP = useP(662.6, 0.8);
  const magP = useP(665.0, 0.7);
  const liftP = useP(667.9, 0.7);
  const readP = useP(670.4, 0.6);
  return (
    <g>
      <g opacity={chipsP * (1 - imageP)}>
        {[700, 830, 960, 1090, 1220].map((x, i) => (
          <MiniChip key={i} x={x} y={500} p={chipsP} scale={0.9} />
        ))}
      </g>

      <g opacity={imageP}>
        <Ink d={rectD(650, 470, 620, 380, 3560, 1.3, 14)} p={imageP} color={C.ink} width={3.6} fill={C.recess} fillOpacity={0.65} />
        {/* abstract photo: hills and sun */}
        <Ink d={circleD(820, 565, 38, 3561, 1)} p={imageP} color={C.yellow} width={2.8} fill={C.yellow} fillOpacity={0.12} />
        <Ink d={polyD([[670, 800], [800, 660], [900, 750], [1010, 630], [1250, 810]], 3562, 1.2)} p={imageP} color={C.cyan} width={3} opacity={0.6} />
        <Ink d={lineD(680, 818, 1240, 818, 3563, 0.5)} p={imageP} color={C.deep} width={2.2} opacity={0.3} />
        {/* hidden text lines */}
        <g opacity={hiddenP}>
          {[0, 1, 2, 3].map((i) => (
            <Ink
              key={i}
              d={lineD(760, 668 + i * 33, 1130, 668 + i * 33, 3570 + i, 0.7)}
              p={hiddenP}
              color={liftP > 0.3 ? C.red : C.muted}
              width={2.6}
              opacity={0.3 + (liftP > 0.3 ? 0.4 : 0)}
            />
          ))}
        </g>
        <g opacity={magP}>
          <Magnifier x={1060} y={728} p={magP} s={0.82} />
        </g>
        {liftP > 0 ? (
          <g opacity={liftP}>
            <Ink d={rectD(760, 320, 400, 118, 3580, 1, 16)} p={liftP} color={C.red} width={2.8} fill={C.surface} fillOpacity={0.85} />
            <Ink d={polyD([[900, 438], [918, 466], [942, 440]], 3581, 0.6)} p={liftP} color={C.red} width={2.4} fill={C.surface} fillOpacity={0.85} />
            {[0, 1, 2].map((i) => (
              <Ink key={i} d={lineD(800, 350 + i * 28, 1110, 350 + i * 28, 3590 + i, 0.6)} p={liftP} color={C.red} width={2.6} opacity={0.7} />
            ))}
          </g>
        ) : null}
      </g>

      <g opacity={Math.max(chipsP * 0.7, imageP)}>
        <MiniChip x={960} y={220} p={Math.max(chipsP * 0.6, imageP)} scale={1.0} />
        {readP > 0 ? (
          <g opacity={readP}>
            <Ink d={`M 960 300 C 960 340, 900 330, 890 360`} p={readP} color={C.cyan} width={2.2} dash="2 11" opacity={0.5} />
          </g>
        ) : null}
      </g>
      <Label x={960} y={920} size={36} at={cue('hidden', 663)} color={C.muted} opacity={hiddenP * (1 - readP)}>
        hidden text
      </Label>
      <Label x={960} y={920} size={36} at={cue('instructions', 665.5)} color={C.red} opacity={readP}>
        instruction
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 36 — Internet baggage and the ugly associations                     */
/* ------------------------------------------------------------------ */

const MapPin: React.FC<{x: number; y: number; p: number; color?: string}> = ({x, y, p, color = C.orange}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[0, -62], [44, -26], [28, 30], [0, 66], [-28, 30], [-44, -26]], 3600, 1, true)} p={p} color={color} width={3.2} fill={color} fillOpacity={0.12} />
    <Ink d={circleD(0, -18, 18, 3601, 0.9)} p={p} color={color} width={2.8} />
    <Ink d={circleD(0, -18, 7, 3602, 0.6)} p={p} color={color} width={2.2} fill={color} fillOpacity={0.4} />
  </g>
);

const Threat: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[0, -62], [66, 56], [-66, 56]], 3610, 1.1, true)} p={p} color={C.red} width={3.2} fill={C.red} fillOpacity={0.1} />
    <Ink d={lineD(0, -26, 0, 18, 3611, 0.6)} p={p} color={C.red} width={4} />
    <circle cx={0} cy={36} r={4} fill={C.red} opacity={p} />
  </g>
);

const Border: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    {[0, 1, 2, 3].map((i) => (
      <Ink key={i} d={lineD(-42 + i * 28, -60, -42 + i * 28, 60, 3620 + i, 0.6)} p={p} color={C.ink} width={3} />
    ))}
    <Ink d={lineD(-56, -60, 56, -60, 3630, 0.5)} p={p} color={C.ink} width={2.6} />
    <Ink d={lineD(-56, 60, 56, 60, 3631, 0.5)} p={p} color={C.ink} width={2.6} />
  </g>
);

const LatinShape: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[-40, -66], [18, -56], [44, -18], [34, 24], [8, 66], [-16, 44], [-32, 6], [-54, -22]], 3640, 1.4, true, 0.6)} p={p} color={C.green} width={3.2} fill={C.green} fillOpacity={0.1} />
    <Ink d={lineD(-28, -34, 24, -26, 3641, 0.5)} p={p} color={C.green} width={2.2} opacity={0.45} />
    <Ink d={lineD(-22, 10, 26, 0, 3642, 0.5)} p={p} color={C.green} width={2.2} opacity={0.45} />
  </g>
);

const HumanBust: React.FC<{x: number; y: number; p: number; color?: string}> = ({x, y, p, color = C.ink}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={circleD(0, -36, 34, 3650, 1.2)} p={p} color={color} width={3} fill={color} fillOpacity={0.06} />
    <Ink d={arcD(0, 58, 62, Math.PI, Math.PI * 2, 3651, 1.0)} p={p} color={color} width={3} />
    <Ink d={polyD([[-62, 58], [62, 58]], 3652, 0.6)} p={p} color={color} width={2.6} opacity={0.4} />
  </g>
);

const ApeBust: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={circleD(0, -30, 42, 3660, 1.4)} p={p} color={C.muted} width={3} fill={C.muted} fillOpacity={0.05} />
    <Ink d={ellipseD(0, -8, 30, 24, 3661, 1.0)} p={p} color={C.muted} width={2.6} opacity={0.7} />
    <Ink d={arcD(0, 64, 70, Math.PI, Math.PI * 2, 3662, 1.0)} p={p} color={C.muted} width={3} />
    <circle cx={-13} cy={-38} r={2.6} fill={C.muted} opacity={p} />
    <circle cx={13} cy={-38} r={2.6} fill={C.muted} opacity={p} />
  </g>
);

export const Scene36: React.FC = () => {
  const t = useT();
  const netP = useP(673.8, 0.8);
  const flowP = useP(676.0, 0.8);
  const filterP = useP(683.9, 0.6);
  const rowsP = useP(687.6, 0.7);
  const row1 = useP(687.8, 0.5);
  const row2 = useP(690.2, 0.5);
  const row3 = useP(692.6, 0.5);
  return (
    <g>
      <g opacity={netP * (1 - rowsP)}>
        <Cloud x={960} y={250} s={1.65} p={netP} accent={C.cyan} />
        <g opacity={flowP}>
          {Array.from({length: 24}).map((_, i) => {
            const x = 800 + ((i * 97) % 320);
            const y = 330 + ((i * 53) % 220);
            const col = i % 5 === 0 ? C.red : i % 3 === 0 ? C.yellow : C.green;
            return <circle key={i} cx={x} cy={y} r={3.2 + (i % 3)} fill={col} opacity={0.35 + (i % 4) * 0.12} />;
          })}
        </g>
        <g opacity={filterP}>
          <Ink d={rectD(780, 500, 360, 70, 3670, 0.8, 8)} p={filterP} color={C.deep} width={2.4} fill={C.recess} fillOpacity={0.5} />
          {Array.from({length: 12}).map((_, i) => (
            <Ink key={i} d={lineD(796 + i * 28, 502, 796 + i * 28, 568, 3671 + i, 0.4)} p={filterP} color={C.deep} width={2} opacity={0.6} />
          ))}
          <Ink d={lineD(820, 568, 820, 620, 3680, 0.4)} p={filterP} color={C.red} width={2.2} opacity={0.4} dash="3 8" />
          <Ink d={lineD(1090, 568, 1090, 620, 3681, 0.4)} p={filterP} color={C.green} width={2.2} opacity={0.4} dash="3 8" />
        </g>
        <Neuron x={960} y={760} scale={0.55} p={netP} accent={C.red} />
      </g>

      <g opacity={rowsP}>
        <g opacity={row1}>
          <MapPin x={700} y={300} p={row1} color={C.orange} />
          <Threat x={1200} y={300} p={row1} />
          <Ink d={waveD(780, 300, 1120, 300, 22, 2.2, 3690)} p={row1} color={C.red} width={2.6} opacity={0.55} />
        </g>
        <g opacity={row2}>
          <Border x={700} y={520} p={row2} />
          <LatinShape x={1200} y={520} p={row2} />
          <Ink d={waveD(770, 520, 1130, 520, 20, 2.2, 3691)} p={row2} color={C.red} width={2.6} opacity={0.55} />
        </g>
        <g opacity={row3}>
          <SourceIcon src="source/icons/animal_human.png" cx={700} cy={740} size={185} opacity={row3} />
          <SourceIcon src="source/icons/animal_ape.png" cx={1200} cy={740} size={185} opacity={row3} />
          <Ink d={waveD(770, 740, 1130, 740, 18, 2.2, 3692)} p={row3} color={C.red} width={2.6} opacity={0.55} />
        </g>
      </g>
      <Label x={960} y={392} size={28} at={cue('Middle', 688)} color={C.red} opacity={row1}>
        Middle East → terrorism
      </Label>
      <Label x={960} y={612} size={28} at={cue('immigration', 690)} color={C.red} opacity={row2}>
        immigration → Latin America
      </Label>
      <Label x={960} y={872} size={26} at={cue('dark', 692)} color={C.red} opacity={row3}>
        dark-skinned people ↔ gorillas
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 37 — The same mechanism                                             */
/* ------------------------------------------------------------------ */

export const Scene37: React.FC = () => {
  const t = useT();
  const topP = useP(702.9, 0.7);
  const bottomP = useP(710.5, 0.7);
  const eqP = useP(713.0, 0.6);
  return (
    <g>
      <g opacity={topP}>
        <SourceIcon src="source/icons/animal_spider.png" cx={700} cy={320} size={230} opacity={topP} />
        <SourceIcon src="source/icons/hero_mask.png" cx={1200} cy={320} size={205} opacity={topP} />
        <Ink d={waveD(790, 320, 1100, 320, 18, 2.4, 3700)} p={topP} color={C.pink} width={2.8} opacity={0.6} />
        <Ink d={lineD(820, 210, 1130, 210, 3701, 0.5)} p={topP} color={C.deep} width={2.2} opacity={0.25} />
      </g>
      <g opacity={bottomP}>
        <MapPin x={700} y={720} p={bottomP} color={C.orange} />
        <Threat x={1200} y={720} p={bottomP} />
        <Ink d={waveD(790, 720, 1100, 720, 18, 2.4, 3702)} p={bottomP} color={C.red} width={2.8} opacity={0.65} />
        <Ink d={lineD(820, 830, 1130, 830, 3703, 0.5)} p={bottomP} color={C.deep} width={2.2} opacity={0.25} />
      </g>
      <g opacity={eqP}>
        <Txt x={960} y={545} size={104} color={C.green} opacity={eqP} font="display" weight={700}>=</Txt>
        <Ink d={circleD(960, 545, 88, 3710, 1.2)} p={eqP} color={C.green} width={2} opacity={0.15} />
      </g>
      <Label x={960} y={430} size={28} at={703.0} color={C.muted} opacity={topP}>
        spider ↔ Spider-Man
      </Label>
      <Label x={960} y={840} size={28} at={710.5} color={C.muted} opacity={bottomP}>
        region ↔ threat
      </Label>
      <Label x={960} y={650} size={30} at={713.0} color={C.green} opacity={eqP}>
        same mechanism
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 38 — Two points and a warning                                       */
/* ------------------------------------------------------------------ */

const Pointer: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={polyD([[0, 0], [0, 54], [16, 40], [28, 66], [42, 60], [30, 36], [50, 34]], 3720, 0.6, true)} p={p} color={C.ink} width={2.6} fill={C.surface} fillOpacity={0.7} />
  </g>
);

export const Scene38: React.FC = () => {
  const t = useT();
  const visibleP = useP(718.0, 0.8);
  const blackP = useP(718.55, 0.8);
  const secondP = useP(725.4, 0.8);
  const warnP = useP(731.5, 0.8);
  return (
    <g>
      <g opacity={visibleP * (1 - secondP)}>
        <Neuron x={700} y={520} scale={0.8} p={visibleP} accent={C.cyan} />
        <Pointer x={790} y={570} p={visibleP * 0.9} />
      </g>
      <g opacity={blackP * (1 - secondP)}>
        <Ink d={rectD(1090, 0, 260, 260, 3730, 1.4, 10)} p={blackP} color={C.current} width={3.6} fill={C.recess} fillOpacity={0.95} />
        <Txt x={1220} y={140} size={76} color={C.muted} opacity={blackP * 0.5} font="display" weight={700}>?</Txt>
      </g>

      <g opacity={secondP * (1 - warnP)}>
        <Neuron x={960} y={360} scale={0.75} p={secondP} accent={C.cyan} />
        <Ink d={lineD(960, 460, 960, 690, 3740, 1)} p={secondP} color={C.deep} width={2.8} dash="4 14" opacity={0.6} />
        <Txt x={1040} y={590} size={64} color={C.yellow} opacity={secondP} font="display" weight={700}>?</Txt>
        <Ink d={rectD(820, 700, 280, 150, 3741, 0.8, 10)} p={secondP} color={C.ink} width={2.6} fill={C.surface} fillOpacity={0.6} />
        {[0, 1, 2].map((i) => (
          <Ink key={i} d={lineD(850, 738 + i * 32, 1070 - i * 30, 738 + i * 32, 3742 + i, 0.5)} p={secondP} color={C.muted} width={2.2} opacity={0.45} />
        ))}
      </g>

      <g opacity={warnP}>
        <Ink d={polyD([[960, 280], [1180, 720], [740, 720]], 3750, 1.4, true)} p={warnP} color={C.red} width={4} fill={C.red} fillOpacity={0.06} />
        <Ink d={lineD(960, 400, 960, 590, 3751, 0.8)} p={warnP} color={C.red} width={8} />
        <circle cx={960} cy={650} r={8} fill={C.red} opacity={warnP} />
        <Ink d={circleD(960, 540, 300, 3752, 1.8)} p={warnP} color={C.red} width={2} dash="2 14" opacity={0.2} />
      </g>
      <Label x={960} y={220} size={30} at={cue('warning', 731)} color={C.red} opacity={warnP}>
        the author's warning
      </Label>
      <Label x={960} y={880} size={38} at={cue('unchecked', 732)} color={C.muted} opacity={warnP}>
        unchecked associations
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 39 — Limits and convergence                                         */
/* ------------------------------------------------------------------ */

const TextLines: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    {[0, 1, 2].map((i) => (
      <Ink key={i} d={lineD(x - 34, y - 18 + i * 18, x + 34 - (i === 2 ? 18 : 0), y - 18 + i * 18, 3760 + i, 0.4)} p={p} color={C.pink} width={2.4} opacity={0.65} />
    ))}
  </g>
);
const SoundSmall: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g opacity={p}>
    {[0, 1, 2, 3].map((i) => (
      <Ink key={i} d={lineD(x - 30 + i * 20, y - (12 + i * 5), x - 30 + i * 20, y + (12 + i * 5), 3770 + i, 0.4)} p={p} color={C.cyan} width={2.4} opacity={0.7} />
    ))}
  </g>
);
const PencilSmall: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y}) rotate(-35)`} opacity={p}>
    <Ink d={rectD(-34, -8, 58, 16, 3780, 0.5, 2)} p={p} color={C.orange} width={2.4} fill={C.surface} fillOpacity={0.5} />
    <Ink d={polyD([[24, -8], [44, 0], [24, 8]], 3781, 0.5, true)} p={p} color={C.orange} width={2.2} fill={C.orange} fillOpacity={0.2} />
  </g>
);

export const Scene39: React.FC = () => {
  const t = useT();
  const brainP = useP(742.0, 0.8);
  const netP = useP(742.6, 0.8);
  const spreadP = useP(747.6, 0.7);
  const lineP = useP(754.4, 0.7);
  const modalitiesP = useP(756.5, 0.8);
  return (
    <g>
      <g opacity={brainP * (1 - modalitiesP * 0.35)}>
        <SourceIcon src="source/icons/animal_brain.png" cx={700} cy={500} size={340} opacity={brainP} />
      </g>
      <g opacity={netP * (1 - modalitiesP * 0.35)}>
        <Network x={1220} y={500} s={0.9} p={netP} layers={[4, 5, 3]} accent={C.cyan} />
        {spreadP > 0 ? (
          <g opacity={spreadP}>
            {dotField(1220, 500, 210, 150, 26, 3790).map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill={i % 4 === 0 ? C.cyan : C.deep} opacity={0.25 + (i % 4) * 0.12} />
            ))}
          </g>
        ) : null}
      </g>

      {lineP > 0 ? (
        <g opacity={lineP * (1 - modalitiesP)}>
          <Ink d={lineD(922, 462, 998, 538, 3802, 1.2)} p={lineP} color={C.red} width={6} />
          <Ink d={lineD(998, 462, 922, 538, 3803, 1.2)} p={lineP} color={C.red} width={6} />
        </g>
      ) : null}

      <g opacity={modalitiesP}>
        <Ink d={lineD(850, 500, 886, 500, 3804, 0.5)} p={modalitiesP} color={C.deep} width={2.2} dash="2 9" opacity={0.45} />
        <Ink d={lineD(1034, 500, 1070, 500, 3805, 0.5)} p={modalitiesP} color={C.deep} width={2.2} dash="2 9" opacity={0.45} />
        <Ink d={circleD(960, 500, 72, 3800, 1.2)} p={modalitiesP} color={C.ink} width={3.2} fill={C.current} fillOpacity={0.2} />
        <Ink d={circleD(960, 500, 20, 3801, 0.8)} p={modalitiesP} color={C.cyan} width={2.6} fill={C.cyan} fillOpacity={0.2} />
        {[
          {x: 620, y: 800, icon: <EyeIcon x={620} y={800} p={modalitiesP} s={0.55} />},
          {x: 840, y: 800, icon: <TextLines x={840} y={800} p={modalitiesP} />},
          {x: 1080, y: 800, icon: <SoundSmall x={1080} y={800} p={modalitiesP} />},
          {x: 1300, y: 800, icon: <PencilSmall x={1300} y={800} p={modalitiesP} />},
        ].map((it, i) => (
          <g key={i}>
            <Ink d={`M ${it.x} ${730} C ${it.x} 660, 900 620, 916 566`} p={modalitiesP} color={C.deep} width={2.2} dash="2 12" opacity={0.5} />
            {it.icon}
          </g>
        ))}
      </g>
      <Label x={700} y={700} size={32} at={742.2} color={C.muted} opacity={brainP}>
        brain
      </Label>
      <Label x={1220} y={700} size={32} at={742.8} color={C.muted} opacity={netP}>
        one network
      </Label>
      <Label x={620} y={900} size={24} at={cue('seen', 762)} color={C.muted} opacity={modalitiesP}>
        seen
      </Label>
      <Label x={840} y={900} size={24} at={cue('written', 762.5)} color={C.pink} opacity={modalitiesP}>
        written
      </Label>
      <Label x={1080} y={900} size={24} at={cue('spoken', 763)} color={C.cyan} opacity={modalitiesP}>
        spoken
      </Label>
      <Label x={1300} y={900} size={24} at={cue('drawn', 763.5)} color={C.orange} opacity={modalitiesP}>
        drawn
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 40 — Same place: strength and weakness / reading the clue           */
/* ------------------------------------------------------------------ */

const BrightNote: React.FC<{x: number; y: number; w?: number; h?: number; p: number; rotate?: number; text?: string}> = ({x, y, w = 166, h = 122, p, rotate = -7, text = 'iPod'}) => (
  <g transform={`rotate(${rotate} ${x} ${y})`}>
    <Ink d={rectD(x - w / 2, y - h / 2, w, h, 5000, 0.8, 2)} p={p} color={C.yellow} width={3} fill={C.yellow} fillOpacity={0.92} />
    <Ink d={lineD(x + w / 2 - 24, y - h / 2 + 3, x + w / 2 - 3, y - h / 2 + 24, 5001, 0.5)} p={p} color={C.bg} width={2.2} opacity={0.4} />
    <Txt x={x} y={y + 4} size={Math.round(h * 0.38)} color={C.bg} font="display" weight={700} opacity={p}>{text}</Txt>
  </g>
);

export const Scene40: React.FC = () => {
  const t = useT();
  const circleP = useP(765.1, 0.8);
  const iconsP = useP(768.2, 0.7);
  const eyeP = useP(779.9, 0.8);
  const appleP = useP(779.9, 0.8);
  return (
    <g>
      <g opacity={circleP * (1 - eyeP)}>
        <Ink d={circleD(960, 500, 170, 3810, 1.6)} p={circleP} color={C.ink} width={4} fill={C.ink} fillOpacity={0.02} />
        <path d={`M 960 330 A 170 170 0 0 1 960 670 Z`} fill={C.green} opacity={0.06 * circleP} />
        <path d={`M 960 330 A 170 170 0 0 0 960 670 Z`} fill={C.red} opacity={0.06 * circleP} />
        <Ink d={lineD(960, 330, 960, 670, 3811, 0.6)} p={circleP} color={C.muted} width={2.2} opacity={0.35} />
        <g opacity={iconsP}>
          <SourceIcon src="source/icons/animal_spider.png" cx={700} cy={310} size={185} opacity={iconsP} />
          <SourceIcon src="source/icons/apple_clean.png" cx={1220} cy={300} size={185} opacity={iconsP} />
          <SourceIcon src="source/halle_sketch.png" cx={700} cy={692} size={175} opacity={iconsP} />
          <Ink d={rectD(610, 602, 180, 180, 5005, 0.5, 3)} p={iconsP} color={C.deep} width={2.4} opacity={0.5} />
          <MapPin x={1220} y={700} p={iconsP} color={C.orange} />
        </g>
      </g>

      <g opacity={eyeP * (1 - appleP * 0.9)}>
        <EyeIcon x={960} y={300} p={eyeP} s={1.05} />
        <Ink d={`M 960 386 C 960 450, 1010 470, 1010 510`} p={eyeP} color={C.cyan} width={2.2} dash="2 11" opacity={0.45} />
        <Ink d={`M 1006 520 C 1040 530, 1080 550, 1096 566`} p={eyeP} color={C.cyan} width={2} dash="2 10" opacity={0.3} />
      </g>

      <g opacity={appleP}>
        <SourceIcon src="source/icons/apple_clean.png" cx={900} cy={600} size={300} opacity={appleP} />
        <BrightNote x={940} y={610} w={166} h={122} p={appleP} rotate={-7} />
        <Magnifier x={1120} y={600} p={appleP} s={1.0} />
        <Ink d={lineD(840, 770, 1140, 770, 3820, 0.5)} p={appleP} color={C.muted} width={2.4} opacity={0.3} />
      </g>
      <Label x={850} y={520} size={28} at={765.3} color={C.green} opacity={circleP * (1 - eyeP)}>
        strength
      </Label>
      <Label x={1070} y={520} size={28} at={766.2} color={C.red} opacity={circleP * (1 - eyeP)}>
        weakness
      </Label>
      <Label x={960} y={850} size={34} at={cue('clue', 785)} color={C.muted} opacity={eyeP}>
        reads the label
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 41 — Descendants / Golden Gate / final question                     */
/* ------------------------------------------------------------------ */

const ImageGen: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={rectD(-58, -48, 116, 96, 3850, 0.7, 8)} p={p} color={C.cyan} width={2.8} fill={C.surface} fillOpacity={0.5} />
    <Ink d={polyD([[-40, 30], [-8, -8], [18, 18], [38, -18]], 3851, 0.6)} p={p} color={C.cyan} width={2.4} />
    <Ink d={polyD([[50, -44], [56, -62], [62, -44], [78, -40], [62, -34], [56, -16], [50, -34], [34, -40]], 3852, 0.5, true)} p={p} color={C.yellow} width={2} fill={C.yellow} fillOpacity={0.3} />
  </g>
);
const SearchIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={circleD(-8, -10, 40, 3860, 1)} p={p} color={C.pink} width={3} />
    <Ink d={lineD(20, 18, 58, 56, 3861, 0.6)} p={p} color={C.pink} width={4} />
  </g>
);
const AssistantIcon: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
  <g transform={`translate(${x} ${y})`} opacity={p}>
    <Ink d={rectD(-62, -44, 124, 76, 3870, 0.9, 16)} p={p} color={C.purple} width={2.8} fill={C.surface} fillOpacity={0.5} />
    <Ink d={polyD([[-18, 32], [-6, 60], [12, 32]], 3871, 0.5)} p={p} color={C.purple} width={2.4} fill={C.surface} fillOpacity={0.5} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={-24 + i * 24} cy={-6} r={4} fill={C.purple} opacity={0.8 * p} />
    ))}
  </g>
);
const LangMark: React.FC<{x: number; y: number; p: number; seed: number}> = ({x, y, p, seed}) => (
  <g opacity={p}>
    {[0, 1, 2].map((i) => (
      <Ink key={i} d={lineD(x - 26 + (i % 2) * 8, y - 18 + i * 15, x + 26 - (i % 2) * 6, y - 18 + i * 15, seed + i, 0.5)} p={p} color={C.muted} width={2.4} opacity={0.55} />
    ))}
  </g>
);

export const Scene41: React.FC = () => {
  const t = useT();
  const appleP = useP(795.9, 0.8);
  const descP = useP(801.8, 0.8);
  const bridgeP = useP(808.9, 0.9);
  const langP = useP(812.0, 0.7);
  const backP = useP(825.7, 0.8);
  const readP = useP(830.9, 0.7);
  return (
    <g>
      <g opacity={appleP * (1 - bridgeP)}>
        <g opacity={1 - backP}>
          <SourceIcon src="source/icons/apple_clean.png" cx={960} cy={560} size={330} opacity={appleP} />
          <BrightNote x={920} y={590} w={160} h={118} p={appleP} rotate={-7} />
        </g>
        <g opacity={descP}>
          <ImageGen x={680} y={330} p={descP} />
          <SearchIcon x={1240} y={330} p={descP} />
          <AssistantIcon x={960} y={840} p={descP} />
          <Ink d={`M 680 390 C 780 500, 860 520, 900 540`} p={descP} color={C.deep} width={2} dash="2 10" opacity={0.35} />
          <Ink d={`M 1240 390 C 1140 500, 1060 520, 1020 540`} p={descP} color={C.deep} width={2} dash="2 10" opacity={0.35} />
          <Ink d={`M 960 790 C 960 720, 960 680, 960 650`} p={descP} color={C.deep} width={2} dash="2 10" opacity={0.35} />
        </g>
      </g>

      <g opacity={bridgeP * (1 - backP)}>
        <Bridge x={960} y={580} s={1.25} p={bridgeP} />
        <Ink d={circleD(960, 400, 26, 3880, 0.8)} p={bridgeP} color={C.pink} width={2.6} fill={C.pink} fillOpacity={0.2} />
        <Ink d={lineD(960, 426, 960, 490, 3881, 0.5)} p={bridgeP} color={C.pink} width={2.2} opacity={0.5} />
        {[
          {x: 540, y: 430},
          {x: 540, y: 540},
          {x: 540, y: 650},
          {x: 1380, y: 430},
          {x: 1380, y: 540},
          {x: 1380, y: 650},
        ].map((m, i) => (
          <g key={i}>
            <LangMark x={m.x} y={m.y} p={langP} seed={3890 + i} />
            <Ink d={`M ${m.x + (m.x < 960 ? 38 : -38)} ${m.y} C ${m.x + (m.x < 960 ? 120 : -120)} ${m.y}, 820 500, 930 520`} p={langP} color={C.deep} width={1.8} dash="2 12" opacity={0.35} />
          </g>
        ))}
        <Ink d={lineD(960, 690, 1160, 690, 3900, 0.5)} p={bridgeP} color={C.cyan} width={2.6} opacity={0.3} />
      </g>

      <g opacity={backP}>
        <SourceIcon src="source/icons/apple_clean.png" cx={900} cy={600} size={350} opacity={backP} />
        <BrightNote x={890} y={610} w={178} h={128} p={backP} rotate={-7} />
        <Magnifier x={1060} y={560} p={backP} s={1.05} />
        {readP > 0 ? (
          <g opacity={readP}>
            <EyeIcon x={960} y={300} p={readP} s={0.85} />
            <Ink d={`M 960 386 C 960 460, 1000 480, 1006 520`} p={readP} color={C.cyan} width={2.2} dash="2 12" opacity={0.45} />
          </g>
        ) : null}
      </g>
      <Label x={960} y={950} size={26} at={801.9} color={C.muted} opacity={descP * (1 - bridgeP)}>
        image generators · search · assistants
      </Label>
      <Label x={960} y={850} size={30} at={cue('languages', 817)} color={C.muted} opacity={bridgeP * (1 - backP)}>
        one concept, many languages
      </Label>
      <Label x={960} y={940} size={44} at={833.6} color={C.ink} opacity={readP}>
        what is it reading?
      </Label>
    </g>
  );
};
