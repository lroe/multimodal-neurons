import React from 'react';
import {C} from '../theme';
import {Ink, Label, Pop, useP, useT} from '../scene';
import {cue} from '../timings';
import {
  SourceIcon,
  Building,
  Conveyor,
  SharedSpaceArrows,
  Cake,
  Cat,
  Dog,
  Face,
  Link,
  Network,
  Panel,
  Photo,
  Toaster,
  Txt,
  Volcano,
  IPod,
} from '../components/drawings';
import {arcD, arrowD, circleD, dotField, ellipseD, lineD, polyD, rectD, waveD} from '../sketch/rough';

/* ------------------------------------------------------------------ */
/* 10 — A million photos, one fixed label                              */
/* ------------------------------------------------------------------ */

export const Scene10: React.FC = () => {
  const t = useT();
  const slotP = useP(133.6, 0.8);
  const cardsP = useP(137.7, 0.7);
  const dogP = useP(138.2, 0.5);
  const toastP = useP(139.2, 0.5);
  const volcP = useP(140.3, 0.5);
  const netP = useP(142.0, 0.8);
  const checkP = useP(143.8, 0.5);
  return (
    <g>
      {[700, 960, 1220].map((x, i) => (
        <Ink key={`slot10-${i}`} d={rectD(x - 100, 258, 200, 162, 1490 + i, 0.8, 8)} p={1} color={C.deep} width={2} opacity={slotP * 0.38} />
      ))}
      {[
        {x: 700, p: dogP, label: 'dog', node: <SourceIcon src="source/icons/animal_dog.png" cx={700} cy={338} size={150} opacity={dogP} />},
        {x: 960, p: toastP, label: 'toaster', node: <SourceIcon src="source/icons/icon_toaster.png" cx={960} cy={338} size={150} opacity={toastP} />},
        {x: 1220, p: volcP, label: 'volcano', node: <SourceIcon src="source/icons/icon_volcano.png" cx={1220} cy={338} size={150} opacity={volcP} />},
      ].map((it, i) => (
        <g key={i} opacity={it.p}>
          <Ink d={rectD(it.x - 100, 258, 200, 162, 1500 + i, 0.9, 8)} p={cardsP} color={C.ink} width={2.6} opacity={0.45} />
          {it.node}
          <Ink d={rectD(it.x - 86, 438, 172, 48, 1510 + i, 0.7, 10)} p={cardsP} color={C.deep} width={2.4} fill={C.surface} fillOpacity={0.8} />
          <Txt x={it.x} y={463} size={38} color={C.ink} opacity={cardsP}>{it.label}</Txt>
        </g>
      ))}
      <Ink d={lineD(960, 500, 960, 590, 1520, 0.7)} p={netP} color={C.muted} width={2.4} opacity={0.45} />
      <Ink d={lineD(944, 574, 960, 594, 1521, 0.5) + ' ' + lineD(976, 574, 960, 594, 1522, 0.5)} p={netP} color={C.muted} width={2.4} opacity={0.45} />
      <g opacity={0.28}><Network x={960} y={690} s={0.86} p={slotP} layers={[3, 4, 2]} accent={C.deep} /></g>
      <Network x={960} y={690} s={0.86} p={netP} layers={[3, 4, 2]} accent={C.green} />
      {checkP > 0 ? (
        <g opacity={checkP}>
          <Ink d={lineD(930, 840, 956, 868, 1530, 0.7)} p={checkP} color={C.green} width={5} />
          <Ink d={lineD(956, 868, 1008, 790, 1531, 0.7)} p={checkP} color={C.green} width={5} />
        </g>
      ) : null}
      <Label x={960} y={200} size={32} at={137.8} color={C.muted} opacity={cardsP * 0.7}>
        one label per photo
      </Label>
      <Label x={960} y={930} size={32} at={143.8} color={C.green} opacity={checkP * 0.8}>
        correct label
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 11 — Assembly line / dog-ear neuron                                 */
/* ------------------------------------------------------------------ */

export const Scene11: React.FC = () => {
  const netP = useP(147.7, 0.8);
  const edgeP = useP(151.35, 0.7);
  const curveP = useP(154.15, 0.7);
  const furP = useP(156.55, 0.7);
  const partsP = useP(158.5, 0.6);
  const wholeP = useP(160.85, 0.7);
  const earP = useP(164.8, 0.8);
  const dogEarP = useP(167.6, 0.6);
  const ideaP = useP(170.8, 0.6);
  const t = useT();
  return (
    <g>
      <g opacity={netP * (1 - edgeP) * 0.45}>
        <Network x={960} y={520} s={1.15} p={netP} layers={[4, 5, 4, 3]} accent={C.deep} />
      </g>

      <g opacity={edgeP * (1 - curveP)}>
        <SourceIcon src="source/sprites/dog_edges.png" cx={930} cy={520} size={430} opacity={1} />
      </g>
      <g opacity={curveP * (1 - furP)}>
        <SourceIcon src="source/sprites/dog_curves.png" cx={930} cy={520} size={430} opacity={1} />
      </g>
      <g opacity={furP * (1 - partsP)}>
        <defs>
          <clipPath id="fur-zoom-scene11">
            <circle cx={930} cy={505} r={208} />
          </clipPath>
        </defs>
        <circle cx={930} cy={505} r={210} fill={C.recess} fillOpacity={0.72} stroke={C.deep} strokeWidth={2.2} opacity={0.9} />
        <g clipPath="url(#fur-zoom-scene11)">
          <SourceIcon src="source/sprites/dog_fur.png" cx={937} cy={616} size={980} opacity={1} />
        </g>
        <circle cx={930} cy={505} r={210} fill="none" stroke={C.cyan} strokeWidth={2.4} opacity={0.6} />
        <SourceIcon src="source/sprites/dog_curves.png" cx={1270} cy={800} size={180} opacity={0.65} />
        <circle cx={1262} cy={752} r={24} fill="none" stroke={C.cyan} strokeWidth={2.2} opacity={0.7} />
        <Ink d="M 1104 590 C 1150 650, 1190 710, 1236 740" p={furP} color={C.deep} width={2.2} dash="2 10" opacity={0.55} />
      </g>
      <g opacity={partsP * (1 - wholeP)}>
        <SourceIcon src="source/sprites/dog_parts.png" cx={930} cy={520} size={470} opacity={1} />
      </g>

      <g opacity={wholeP * (1 - earP)}>
        <Conveyor cx={930} topY={700} w={900} p={1} t={t} />
        <SourceIcon src="source/sprites/dog_whole.png" cx={930} cy={525} size={430} opacity={1} />
      </g>

      <g opacity={earP * (1 - dogEarP)}>
        <SourceIcon src="source/sprites/dog_ear.png" cx={800} cy={545} size={340} opacity={1} />
      </g>

      <g opacity={dogEarP}>
        <SourceIcon src="source/sprites/dog_ear.png" cx={800} cy={545} size={340} opacity={1} />
        <g transform="translate(1150 540) scale(1.35)">
          <NeuronGlyph small />
        </g>
        <Ink d="M 860 500 C 940 470, 1030 480, 1090 520" p={dogEarP} color={C.deep} width={2.2} dash="2 10" opacity={0.4} />
        {ideaP > 0 ? (
          <g opacity={ideaP}>
            <Ink d={ellipseD(1150, 250, 90, 58, 1660, 1.4)} p={ideaP} color={C.muted} width={2.6} opacity={0.55} />
            <Ink d={circleD(1056, 304, 8, 1661, 0.6)} p={ideaP} color={C.muted} width={2.4} opacity={0.55} />
            <Ink d={circleD(1018, 330, 4.5, 1662, 0.5)} p={ideaP} color={C.muted} width={2.2} opacity={0.55} />
          </g>
        ) : null}
      </g>

      <Label x={960} y={792} size={40} at={151.35} opacity={1 - curveP}>edges</Label>
      <Label x={960} y={792} size={40} at={154.3} opacity={1 - furP}>curves</Label>
      <Label x={960} y={772} size={40} at={156.7} opacity={1 - partsP}>fur</Label>
      <Label x={960} y={792} size={40} at={158.65} opacity={1 - wholeP}>parts</Label>
      <Label x={960} y={814} size={44} at={161.0} opacity={1 - earP}>dog</Label>
      <Label x={800} y={790} size={40} at={164.9} opacity={earP}>dog ear</Label>
    </g>
  );
};

const NeuronGlyph: React.FC<{small?: boolean}> = () => (
  <g>
    <Ink d={circleD(0, 0, 18, 1670, 0.7)} p={1} color={C.ink} width={3} fill={C.cyan} fillOpacity={0.12} />
    {[
      'M -14 -10 C -30 -18 -36 -36 -50 -40',
      'M -16 2 C -32 8 -42 22 -56 24',
      'M 14 -10 C 30 -22 36 -38 52 -40',
      'M 16 6 C 32 12 38 28 54 30',
      'M 0 18 C 4 36 0 48 8 58',
    ].map((d, i) => (
      <Ink key={i} d={d} p={1} color={C.ink} width={2.4} />
    ))}
  </g>
);

/* ------------------------------------------------------------------ */
/* 12 — CLIP, no fixed labels                                          */
/* ------------------------------------------------------------------ */

export const Scene12: React.FC = () => {
  const t = useT();
  const titleP = useP(172.95, 0.9);
  const labelsP = useP(179.0, 0.5);
  const strikeP = useP(179.7, 0.5);
  return (
    <g>
      <g opacity={titleP}>
        <Txt x={960} y={470} size={214} color={C.ink} font="display" weight={700} opacity={titleP}>
          CLIP
        </Txt>
        <Ink d={lineD(760, 580, 1160, 580, 1700, 0.7)} p={titleP} color={C.cyan} width={3.2} opacity={0.65} />
      </g>
      <g opacity={labelsP}>
        {['dog', 'toaster', 'volcano', 'cat'].map((label, i) => (
          <g key={label}>
            <Ink d={rectD(620 + i * 180, 690, 150, 54, 1710 + i, 0.7, 10)} p={labelsP} color={C.deep} width={2.4} fill={C.surface} fillOpacity={0.75} />
            <Txt x={695 + i * 180} y={722} size={38} color={C.muted} opacity={labelsP}>{label}</Txt>
          </g>
        ))}
        <Ink d={lineD(610, 718, 1250, 718, 1720, 1.2)} p={strikeP} color={C.red} width={4.2} />
      </g>
      <Label x={960} y={610} size={32} at={173.1} color={C.muted} opacity={titleP * 0.7}>
        January 2021
      </Label>
      <Label x={960} y={810} size={36} at={cue('labels', 179)} color={C.muted} opacity={labelsP}>
        no fixed labels
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 13 — Internet pairs                                                 */
/* ------------------------------------------------------------------ */

const Browser: React.FC<{children: React.ReactNode; p: number}> = ({children, p}) => (
  <g>
    <Ink d={rectD(550, 250, 820, 560, 1730, 1.3, 18)} p={p} color={C.ink} width={3.6} fill={C.recess} fillOpacity={0.55} />
    <Ink d={lineD(550, 312, 1370, 312, 1731, 0.7)} p={p} color={C.muted} width={2.2} opacity={0.35} />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={584 + i * 22} cy={281} r={5} fill={i === 0 ? C.red : i === 1 ? C.yellow : C.green} opacity={0.7 * p} />
    ))}
    <Ink d={rectD(690, 268, 640, 26, 1732, 0.5, 8)} p={p} color={C.muted} width={2} opacity={0.25} />
    {children}
  </g>
);

const BrowserCell: React.FC<{x: number; y: number; p: number; children: React.ReactNode; highlight?: boolean}> = ({x, y, p, children, highlight}) => (
  <g opacity={p}>
    <Ink d={rectD(x - 112, y - 76, 224, 152, 1740 + Math.round(x + y), 0.8, 6)} p={p} color={highlight ? C.cyan : C.deep} width={2.4} fill={C.surface} fillOpacity={0.5} />
    {children}
    <Ink d={lineD(x - 88, y + 48, x + 8, y + 48, 1750 + Math.round(x + y), 0.4)} p={p} color={highlight ? C.cyan : C.muted} width={2.2} opacity={0.5} />
    <Ink d={lineD(x - 88, y + 60, x + 42, y + 60, 1751 + Math.round(x + y), 0.4)} p={p} color={highlight ? C.cyan : C.muted} width={2} opacity={0.28} />
  </g>
);

export const Scene13: React.FC = () => {
  const browP = useP(181.25, 0.8);
  const cellP = useP(181.65, 0.8);
  const capP = useP(188.1, 0.5);
  const titleP = useP(188.7, 0.5);
  const commentP = useP(189.4, 0.5);
  const t = useT();
  const cells = [
    {x: 720, y: 400, icon: <SourceIcon src="source/icons/animal_cat.png" cx={720} cy={400} size={120} opacity={cellP} />},
    {x: 960, y: 400, icon: <SourceIcon src="source/icons/animal_dog.png" cx={960} cy={400} size={120} opacity={cellP} />},
    {x: 1200, y: 400, icon: <SourceIcon src="source/icons/icon_toaster.png" cx={1200} cy={400} size={120} opacity={cellP} />},
    {x: 720, y: 620, icon: <SourceIcon src="source/icons/face_happy.png" cx={720} cy={620} size={110} opacity={cellP} />},
    {x: 960, y: 620, icon: <SourceIcon src="source/icons/icon_cake.png" cx={960} cy={620} size={120} opacity={cellP} />},
    {x: 1200, y: 620, icon: <SourceIcon src="source/icons/icon_volcano.png" cx={1200} cy={620} size={120} opacity={cellP} />},
  ];
  return (
    <Browser p={browP}>
      {cells.map((c, i) => (
        <BrowserCell key={i} x={c.x} y={c.y} p={cellP} highlight={i === 0 && capP > 0.4 ? true : false}>
          {c.icon}
        </BrowserCell>
      ))}
      <g opacity={capP}>
        <Ink d={lineD(632, 460, 808, 460, 1800, 0.6)} p={capP} color={C.cyan} width={3} />
      </g>
      <g opacity={titleP}>
        <Ink d={lineD(872, 460, 1048, 460, 1801, 0.6)} p={titleP} color={C.pink} width={3} />
      </g>
      <g opacity={commentP}>
        <Ink d={lineD(1112, 460, 1288, 460, 1802, 0.6)} p={commentP} color={C.yellow} width={3} />
        
      </g>
      <Label x={960} y={220} size={34} at={181.6} color={C.muted} opacity={browP * 0.7}>
        internet pairs
      </Label>
      <Label x={720} y={520} size={26} at={cue('caption', 188)} color={C.cyan} opacity={capP}>
        caption
      </Label>
      <Label x={960} y={520} size={26} at={cue('title', 188.5)} color={C.pink} opacity={titleP}>
        title
      </Label>
      <Label x={1200} y={520} size={26} at={cue('comment', 189)} color={C.yellow} opacity={commentP}>
        comment
      </Label>
    </Browser>
  );
};

/* ------------------------------------------------------------------ */
/* 14 — The matching game                                              */
/* ------------------------------------------------------------------ */

const Stack: React.FC<{x: number; y: number; p: number; rotate: number; children?: React.ReactNode}> = ({x, y, p, rotate, children}) => (
  <g transform={`rotate(${rotate} ${x} ${y})`} opacity={p}>
    {[4, 3, 2, 1, 0].map((i) => (
      <Ink key={i} d={rectD(x - 130 + i * 8, y - 170 + i * 8, 260, 340, 1810 + i, 0.8, 10)} p={p} color={i === 0 ? C.ink : C.deep} width={i === 0 ? 3.2 : 2.2} fill={i === 0 ? C.surface : C.recess} fillOpacity={i === 0 ? 0.7 : 0.6} />
    ))}
    {children}
  </g>
);

export const Scene14: React.FC = () => {
  const stackP = useP(192.55, 0.8);
  const shuffleP = useP(195.2, 0.7);
  const matchP = useP(199.1, 0.6);
  const beachP = useP(200.8, 0.6);
  const bdayP = useP(203.6, 0.6);
  const scaleP = useP(208.6, 0.7);
  const t = useT();
  return (
    <g>
      <Stack x={690} y={520} p={stackP} rotate={-2}>
        <g opacity={stackP * (1 - beachP)}>
          <SourceIcon src="source/icons/animal_cat.png" cx={690} cy={520} size={130} opacity={stackP} />
        </g>
        <g opacity={beachP * (1 - bdayP)}>
          <Ink d={arcD(690, 470, 34, 0, Math.PI * 2, 1820, 1)} p={beachP} color={C.yellow} width={3} fill={C.yellow} fillOpacity={0.2} />
          <Ink d={waveD(640, 520, 740, 520, 12, 2, 1821)} p={beachP} color={C.cyan} width={3} />
          <Ink d={waveD(630, 545, 750, 545, 10, 2.5, 1822)} p={beachP} color={C.cyan} width={2.6} opacity={0.65} />
        </g>
        <g opacity={bdayP * (1 - scaleP * 0.0)}>
          <SourceIcon src="source/icons/icon_cake.png" cx={690} cy={500} size={230} opacity={bdayP} />
        </g>
      </Stack>

      <Stack x={1230} y={520} p={stackP} rotate={2}>
        <g opacity={stackP * (1 - beachP)}>
          {[0, 1, 2].map((i) => (
            <Ink key={i} d={lineD(1140, 440 + i * 34, 1310 - i * 20, 440 + i * 34, 1825 + i, 0.5)} p={stackP} color={C.muted} width={2.6} opacity={0.45} />
          ))}
        </g>
        <g opacity={beachP * (1 - bdayP)}>
          <Txt x={1230} y={520} size={58} color={C.cyan} opacity={beachP}>beach</Txt>
          <Ink d={lineD(1160, 550, 1300, 550, 1830, 0.6)} p={beachP} color={C.cyan} width={2.6} opacity={0.55} />
        </g>
        <g opacity={bdayP}>
          <Txt x={1230} y={520} size={92} color={C.pink} opacity={bdayP} font="display" weight={700}>!!!</Txt>
        </g>
      </Stack>

      {matchP > 0 ? (
        <g>
          <Ink d={`M 830 500 C 930 470, 1030 470, 1090 500`} p={matchP} color={C.green} width={3} opacity={0.6} />
          <Ink d={`M 830 570 C 930 600, 1030 600, 1090 570`} p={matchP} color={C.green} width={3} opacity={0.6} />
        </g>
      ) : null}
      {scaleP > 0 ? (
        <g opacity={scaleP}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Ink key={i} d={`M ${830} ${420 + i * 38} C 950 ${400 + i * 44}, 1030 ${400 + i * 44}, ${1090} ${420 + i * 38}`} p={scaleP} color={i % 2 ? C.deep : C.green} width={1.8} opacity={0.4} />
          ))}
        </g>
      ) : null}
      <Label x={690} y={760} size={28} at={194.45} color={C.muted} opacity={stackP}>
        10,000 photos
      </Label>
      <Label x={1230} y={760} size={28} at={195.68} color={C.muted} opacity={stackP}>
        10,000 captions
      </Label>
      <Label x={960} y={940} size={34} at={cue('shuffles', 195)} color={C.cyan} opacity={shuffleP * (1 - matchP)}>
        shuffle
      </Label>
      <Label x={960} y={940} size={34} at={cue('pair', 198)} color={C.green} opacity={matchP * (1 - beachP)}>
        pair them up
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 15 — Shared space                                                   */
/* ------------------------------------------------------------------ */

export const Scene15: React.FC = () => {
  const encP = useP(211.6, 0.8);
  const fieldP = useP(213.2, 0.9);
  const pulledP = useP(220.0, 0.6);
  const pushedP = useP(224.2, 0.6);
  const pairP = useP(226.6, 0.8);
  return (
    <g>
      <SourceIcon src="source/sprites/enc_image.png" cx={700} cy={330} size={360} opacity={encP * (1 - pairP)} />
      <SourceIcon src="source/sprites/enc_text.png" cx={1220} cy={330} size={360} opacity={encP * (1 - pairP)} />
      <SharedSpaceArrows p={encP * (1 - pairP)} />
      <g opacity={fieldP * (1 - pairP)}>
        <SourceIcon src="source/sprites/enc_field.png" cx={960} cy={720} size={520} opacity={1} />
        {pulledP > 0 ? (
          <g opacity={pulledP * (1 - pushedP)}>
            <Ink d={lineD(860, 740, 1070, 770, 1940, 0.6)} p={pulledP} color={C.green} width={2.8} opacity={0.7} />
            <Ink d={lineD(900, 690, 1010, 690, 1941, 0.6)} p={pulledP} color={C.green} width={2.4} opacity={0.5} />
          </g>
        ) : null}
        {pushedP > 0 ? (
          <g opacity={pushedP}>
            <Ink d={lineD(890, 720, 1030, 720, 1942, 0.6)} p={pushedP} color={C.red} width={2.6} opacity={0.65} dash="7 10" />
            <Ink d={lineD(1070, 770, 1160, 780, 1943, 0.5)} p={pushedP} color={C.red} width={2.4} opacity={0.55} dash="7 10" />
          </g>
        ) : null}
      </g>
      <SourceIcon src="source/sprites/enc_pair.png" cx={960} cy={590} size={620} opacity={pairP} />
      <Label x={960} y={906} size={42} at={214.0} opacity={fieldP * (1 - pairP) * 0.8}>shared space</Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 16 — Zero-shot classification                                       */
/* ------------------------------------------------------------------ */

const SentenceCard: React.FC<{x: number; y: number; p: number; text: string; active?: boolean}> = ({x, y, p, text, active}) => (
  <g opacity={p}>
    <Ink d={rectD(x - 215, y - 50, 430, 100, 1970 + Math.round(x), 0.9, 12)} p={p} color={active ? C.green : C.ink} width={2.8} fill={C.surface} fillOpacity={0.7} />
    <Txt x={x} y={y + 2} size={36} color={active ? C.green : C.ink} opacity={p}>{text}</Txt>
    {active ? (
      <g>
        <Ink d={lineD(x + 180, y - 18, x + 194, y - 2, 1980, 0.5)} p={p} color={C.green} width={3.2} />
        <Ink d={lineD(x + 194, y - 2, x + 216, y - 34, 1981, 0.5)} p={p} color={C.green} width={3.2} />
      </g>
    ) : null}
  </g>
);

export const Scene16: React.FC = () => {
  const imgP = useP(229.3, 0.8);
  const sentP = useP(233.2, 0.7);
  const subwayP = useP(251.8, 0.7);
  return (
    <g>
      <Panel x={960} y={295} w={420} h={310} p={imgP} seed={1990} fill={C.recess} fillOpacity={0.55} />
      <g opacity={imgP * (1 - subwayP)}>
        <SourceIcon src="source/icons/animal_dog.png" cx={960} cy={305} size={240} opacity={imgP} />
      </g>
      <g opacity={subwayP}>
        <SourceIcon src="source/sprites/metro_roundel.png" cx={960} cy={300} size={300} opacity={subwayP} />
      </g>

      <SentenceCard x={720} y={610} p={sentP} text="a photo of a dog" active={subwayP < 0.5} />
      <SentenceCard x={1200} y={610} p={sentP} text={subwayP > 0.5 ? 'a photo of a subway sign' : 'a photo of a toaster'} active={subwayP > 0.5} />
      <Link d="M 960 455 C 960 510, 820 530, 760 555" p={sentP} color={C.deep} dotted />
      <Link d="M 960 455 C 960 510, 1100 530, 1160 555" p={sentP} color={C.deep} dotted />

      <Label x={960} y={830} size={58} at={242.5} color={C.muted} letterSpacing={1} opacity={1 - subwayP * 0.7}>
        zero-shot classification
      </Label>
    </g>
  );
};
