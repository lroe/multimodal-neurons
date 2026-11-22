import React from 'react';
import {C} from '../theme';
import {Ink, Label, Pop, useP, useScene, useT} from '../scene';
import {cue} from '../timings';
import {
  Brain,
  Building,
  Cat,
  Dog,
  Face,
  FiringNeuron,
  Head,
  HospitalHead,
  IPod,
  Link,
  Monitor,
  Network,
  Neuron,
  Panel,
  Photo,
  Profile,
  SourceIcon,
  SourceImage,
  SoundWave,
  Txt,
} from '../components/drawings';
import {arcD, circleD, ellipseD, lineD, polyD, rectD, spikesD, waveD} from '../sketch/rough';

/* ------------------------------------------------------------------ */
/* 04 — Hospital, epilepsy, electrode                                  */
/* ------------------------------------------------------------------ */

export const Scene04: React.FC = () => {
  const headP = useP(33.15, 0.8);
  const electrodeP = useP(38.2, 0.9);
  const e1P = useP(38.2, 0.55);
  const e2P = useP(38.55, 0.55);
  const e3P = useP(38.9, 0.55);
  const openingP = useP(43.8, 0.7);
  const neuronP = useP(44.75, 0.9);
  const buildingP = useP(30.95, 0.9);
  const t = useT();

  return (
    <g>
      <g opacity={1 - headP}>
        <Building x={960} y={520} floors={2} p={buildingP} />
      </g>

      <g opacity={headP * (1 - neuronP)}>
        <Ink d={circleD(960, 500, 300, 900, 1.4)} p={headP} color={C.ink} width={3} opacity={0.22} />
        <HospitalHead cx={960} cy={500} w={620} p={headP} e1={e1P} e2={e2P} e3={e3P} />
        {electrodeP > 0 ? (
          <g opacity={electrodeP}>
            <Ink d={lineD(1300, 180, 1278, 220, 901, 0.5)} p={electrodeP} color={C.pink} width={2.2} opacity={0.55} />
            <Txt x={1320} y={175} size={38} color={C.pink} opacity={electrodeP * 0.9} anchor="start">
              electrode
            </Txt>
          </g>
        ) : null}
        {openingP > 0 ? (
          <g opacity={openingP * (1 - neuronP)}>
            <circle cx={1040} cy={452} r={54 + openingP * 26} fill="none" stroke={C.cyan} strokeWidth={2.6} opacity={0.45 * (1 - openingP * 0.4)} />
            <circle cx={1040} cy={452} r={86} fill="none" stroke={C.cyan} strokeWidth={2} opacity={0.18} />
          </g>
        ) : null}
      </g>

      <g opacity={neuronP}>
        <Neuron x={960} y={520} scale={1.35} p={neuronP} color={C.ink} accent={C.cyan} />
        <circle cx={978} cy={506} r={4.5} fill={C.pink} opacity={neuronP} />
        <circle cx={978} cy={506} r={24} fill="none" stroke={C.cyan} strokeWidth={2.5} opacity={0.35} />
        <circle cx={978} cy={506} r={68} fill="none" stroke={C.cyan} strokeWidth={2.4} opacity={0.22} />
        <circle cx={978} cy={506} r={108} fill="none" stroke={C.cyan} strokeWidth={2} opacity={0.12} />
      </g>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 05 — Listening to single neurons                                    */
/* ------------------------------------------------------------------ */

const ScreenIcon: React.FC<{p: number; children: React.ReactNode}> = ({p, children}) => <g opacity={p}>{children}</g>;

export const Scene05: React.FC = () => {
  const t = useT();
  const screenP = useP(46.45, 0.8);
  const buildingP = useP(52.05, 0.5);
  const dogP = useP(53.15, 0.5);
  const faceP = useP(54.25, 0.5);
  const cellsP = useP(56.35, 0.7);
  const fireP = useP(58.85, 0.5);
  const leanP = useP(61.4, 0.7);
  const buildingOp = buildingP * (1 - dogP);
  const dogOp = dogP * (1 - faceP);
  const faceOp = faceP;

  const cells = Array.from({length: 9}).map((_, i) => 560 + i * 100);
  return (
    <g>
      <Monitor x={960} y={340} w={520} h={300} p={screenP} color={C.ink}>
        <ScreenIcon p={buildingOp}>
          <Building x={960} y={352} floors={1} s={0.62} p={buildingP} />
        </ScreenIcon>
        <ScreenIcon p={dogOp}>
          <SourceIcon src="source/icons/animal_dog.png" cx={960} cy={352} size={300} opacity={dogOp} />
        </ScreenIcon>
        <ScreenIcon p={faceOp}>
          <SourceIcon src="source/icons/face_neutral.png" cx={960} cy={345} size={245} opacity={faceOp} />
        </ScreenIcon>
      </Monitor>

      {cells.map((x, i) => {
        const isCenter = i === 4;
        const cellP = cellsP;
        return (
          <g key={i} opacity={cellP}>
            <Ink d={circleD(x, 720, 12, 930 + i, 0.8)} p={cellP} color={isCenter ? C.orange : C.deep} width={3} fill={isCenter ? C.orange : C.bg} fillOpacity={isCenter ? 0.2 : 0.4} />
            {isCenter ? (
              <>
                <circle cx={x} cy={720} r={22 + (fireP > 0 ? 0 : 0)} fill="none" stroke={C.orange} strokeWidth={2.4} opacity={fireP * 0.5} />
                <circle cx={x} cy={720} r={30} fill="none" stroke={C.orange} strokeWidth={2} opacity={fireP * 0.18} />
              </>
            ) : null}
          </g>
        );
      })}

      {leanP > 0 ? (
        <g opacity={leanP}>
          <Ink
            d={arcD(960, 720, 70, Math.PI * 0.15, Math.PI * 0.85, 940, 0.8)}
            p={leanP}
            color={C.yellow}
            width={2.8}
            opacity={0.35}
          />
          <Ink
            d={arcD(960, 720, 46, Math.PI * 0.15, Math.PI * 0.85, 941, 0.6)}
            p={leanP}
            color={C.yellow}
            width={2.2}
            opacity={0.25}
          />
        </g>
      ) : null}

      {fireP > 0 ? (
        <g>
          <Ink
            d={spikesD(600, 860, 720, [
              {at: 0.08, h: 12},
              {at: 0.2, h: 20},
              {at: 0.33, h: 10},
              {at: 0.48, h: 22},
              {at: 0.5, h: 38},
              {at: 0.56, h: 18},
              {at: 0.72, h: 12},
              {at: 0.86, h: 24},
            ], 950)}
            p={fireP}
            color={C.orange}
            width={3}
          />
          <Ink d={lineD(600, 862, 1320, 862, 951, 0.6)} p={fireP} color={C.muted} width={2.6} opacity={0.3} />
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 06 — The Halle Berry evidence viewer                                */
/* ------------------------------------------------------------------ */

export const Scene06: React.FC = () => {
  const cardP = useP(65.9, 0.8);
  const neuronP = useP(64.8, 0.7);
  const photoP = useP(66.4, 0.4);
  const sketchP = useP(68.4, 0.3);
  const maskP = useP(70.5, 0.3);
  const nameP = useP(74.4, 0.3);
  const soundP = useP(79.5, 0.55);
  const t = useT();

  const photoOp = photoP * (1 - sketchP);
  const sketchOp = sketchP * (1 - maskP);
  const maskOp = maskP * (1 - nameP);
  const nameOp = nameP;

  return (
    <g>
      <g opacity={neuronP}>
        <Neuron x={960} y={226} scale={0.62} p={neuronP} color={C.ink} accent={C.pink} />
        <Ink d={lineD(960, 338, 960, 392, 960, 0.6)} p={neuronP} color={C.deep} width={2.4} dash="1 12" />
      </g>

      <Panel x={960} y={610} w={560} h={420} p={cardP} seed={961} fill={C.recess} fillOpacity={0.55} />

      <g opacity={photoOp}>
        <Panel x={960} y={610} w={400} h={400} p={photoP} seed={962} />
        <SourceImage src="source/halle_photo.jpg" x={770} y={420} w={380} h={380} opacity={photoP} fit="slice" />
        <Ink d={rectD(770, 420, 380, 380, 9621, 0.6, 3)} p={photoP} color={C.ink} width={2} opacity={0.35} />
      </g>

      <g opacity={sketchOp}>
        <Panel x={960} y={610} w={400} h={400} p={sketchP} seed={963} />
        <SourceImage src="source/halle_sketch.png" x={770} y={420} w={380} h={380} opacity={sketchP} fit="slice" />
        <Ink d={rectD(770, 420, 380, 380, 964, 0.6, 3)} p={sketchP} color={C.ink} width={2} opacity={0.3} />
      </g>

      <g opacity={maskOp}>
        <Panel x={960} y={610} w={400} h={400} p={maskP} seed={965} />
        <SourceImage src="source/halle_photo.jpg" x={770} y={420} w={380} h={380} opacity={maskP} fit="slice" />
        <SourceImage src="source/icons/cat_mask.png" x={810} y={452} w={300} h={218} opacity={maskP * 0.95} fit="meet" />
        <Ink d={rectD(770, 420, 380, 380, 9651, 0.6, 3)} p={maskP} color={C.ink} width={2} opacity={0.35} />
      </g>

      <g opacity={nameOp}>
        <Panel x={960} y={610} w={420} h={310} p={nameP} seed={966} />
        <Txt x={960} y={568} size={64} color={C.ink} opacity={nameP}>
          Halle
        </Txt>
        <Txt x={960} y={640} size={64} color={C.ink} opacity={nameP}>
          Berry
        </Txt>
        <Ink d={lineD(836, 680, 1084, 680, 967, 0.7)} p={nameP} color={C.purple} width={3} opacity={0.7} />
        {soundP > 0 ? <SoundWave x={960} y={734} w={210} p={soundP} color={C.cyan} /> : null}
      </g>

      <g opacity={cardP * 0.9}>
        {[photoP, sketchP, maskP, nameP].map((p, i) => (
          <Ink
            key={i}
            d={rectD(878 + i * 54, 848, 28, 10, 970 + i, 0.5, 2)}
            p={1}
            color={i < 4 && p > 0.5 ? C.pink : C.deep}
            width={2.2}
            fill={p > 0.5 ? C.pink : C.bg}
            fillOpacity={p > 0.5 ? 0.5 : 0}
            opacity={0.7}
          />
        ))}
      </g>
      <Label x={960} y={128} size={32} at={64.9} color={C.muted} opacity={neuronP}>
        one neuron
      </Label>
      <Label x={960} y={900} size={34} at={cue('Photos', 67)} color={C.muted} opacity={photoOp}>
        photo
      </Label>
      <Label x={960} y={900} size={34} at={cue('pencil', 69)} color={C.muted} opacity={sketchOp}>
        sketch
      </Label>
      <Label x={960} y={900} size={34} at={cue('catwoman', 71)} color={C.muted} opacity={maskOp}>
        catwoman mask
      </Label>
      <Label x={960} y={900} size={34} at={cue('name', 75)} color={C.muted} opacity={nameOp * (1 - soundP)}>
        written name
      </Label>
      <Label x={960} y={900} size={34} at={cue('spoken', 79.5)} color={C.muted} opacity={soundP}>
        spoken name
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 07 — Rules out face detector and pixels; concept                    */
/* ------------------------------------------------------------------ */

export const Scene07: React.FC = () => {
  const detP = useP(82.95, 0.5);
  const x1P = useP(83.5, 0.45);
  const pixelP = useP(85.1, 0.7);
  const x2P = useP(86.6, 0.45);
  const conceptP = useP(89.75, 0.8);
  const labelP = useP(90.7, 0.5);
  const multiP = useP(95.0, 0.7);
  const t = useT();

  return (
    <g>
      {/* face detector */}
      <g opacity={detP * (1 - pixelP)}>
        <Panel x={960} y={480} w={330} h={330} p={detP} seed={980} />
        <SourceIcon src="source/icons/face_neutral.png" cx={960} cy={470} size={160} opacity={detP} />
        <Ink d={rectD(812, 330, 296, 296, 981, 0.8, 4)} p={detP} color={C.cyan} width={2.6} opacity={0.5} />
        <Ink d={lineD(960, 300, 960, 360, 982, 0.5)} p={detP} color={C.cyan} width={2.2} opacity={0.4} />
        <Ink d={lineD(960, 596, 960, 656, 983, 0.5)} p={detP} color={C.cyan} width={2.2} opacity={0.4} />
        <Ink d={lineD(780, 478, 830, 478, 984, 0.5)} p={detP} color={C.cyan} width={2.2} opacity={0.4} />
        <Ink d={lineD(1090, 478, 1140, 478, 985, 0.5)} p={detP} color={C.cyan} width={2.2} opacity={0.4} />
        <Ink d={lineD(842, 350, 1078, 606, 986, 1.2)} p={x1P} color={C.red} width={5} />
        <Ink d={lineD(1078, 350, 842, 606, 987, 1.2)} p={x1P} color={C.red} width={5} />
      </g>

      {/* pixel grid */}
      <g opacity={pixelP * (1 - conceptP)}>
        {Array.from({length: 10}).map((_, r) =>
          Array.from({length: 10}).map((__, c) => {
            const px = 960 - 180 + c * 40;
            const py = 480 - 180 + r * 40;
            const fill = (r * 7 + c * 3) % 5 === 0;
            return (
              <Ink
                key={`${r}-${c}`}
                d={rectD(px - 16, py - 16, 32, 32, 1000 + r * 10 + c, 0.6, 2)}
                p={pixelP}
                color={fill ? C.cyan : C.deep}
                width={2.2}
                fill={fill ? C.cyan : C.bg}
                fillOpacity={fill ? 0.22 : 0}
                opacity={fill ? 0.9 : 0.45}
              />
            );
          }),
        )}
        <Ink d={lineD(760, 300, 1160, 660, 1100, 1.2)} p={x2P} color={C.red} width={5} />
        <Ink d={lineD(1160, 300, 760, 660, 1101, 1.2)} p={x2P} color={C.red} width={5} />
      </g>

      {/* concept */}
      <g opacity={conceptP}>
        <Ink d={circleD(960, 500, 82, 1110, 1.3)} p={conceptP} color={C.ink} width={4} fill={C.purple} fillOpacity={0.1} />
        <Ink d={circleD(960, 500, 24, 1111, 0.8)} p={conceptP} color={C.purple} width={3.2} fill={C.purple} fillOpacity={0.18} />
        {[
          {x: 960, y: 268, icon: 'photo'},
          {x: 1210, y: 500, icon: 'sketch'},
          {x: 960, y: 748, icon: 'name'},
          {x: 710, y: 500, icon: 'voice'},
        ].map((it, i) => (
          <g key={i}>
            <Ink
              d={lineD(960 + (it.x - 960) * 0.25, 500 + (it.y - 500) * 0.25, it.x + (960 - it.x) * 0.17, it.y + (500 - it.y) * 0.17, 1120 + i, 0.8)}
              p={conceptP}
              color={C.deep}
              width={2.4}
              dash="1 12"
            />
            <Panel x={it.x} y={it.y} w={154} h={154} p={conceptP} seed={1130 + i} fill={C.surface} fillOpacity={0.75}>
              {it.icon === 'photo' ? <SourceImage src="source/halle_photo.jpg" x={it.x - 55} y={it.y - 55} w={110} h={110} opacity={conceptP} fit="slice" /> : null}
              {it.icon === 'sketch' ? <SourceImage src="source/halle_sketch.png" x={it.x - 55} y={it.y - 55} w={110} h={110} opacity={conceptP} fit="slice" /> : null}
              {it.icon === 'name' ? (
                <>
                  <Txt x={it.x} y={it.y - 16} size={30} color={C.ink} opacity={conceptP}>Halle</Txt>
                  <Txt x={it.x} y={it.y + 20} size={30} color={C.ink} opacity={conceptP}>Berry</Txt>
                </>
              ) : null}
              {it.icon === 'voice' ? <SoundWave x={it.x} y={it.y} w={106} p={conceptP} color={C.cyan} /> : null}
            </Panel>
          </g>
        ))}
        <Label x={960} y={636} size={46} at={90.7} color={C.muted} letterSpacing={3} opacity={1 - multiP}>
          concept
        </Label>
      </g>

      <Label x={960} y={930} size={70} at={95.0} color={C.ink} letterSpacing={1}>
        multimodal neurons
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 08 — Grandmother cell caution, sparse groups, brain                 */
/* ------------------------------------------------------------------ */

export const Scene08: React.FC = () => {
  const gridP = useP(100.35, 0.8);
  const xP = useP(107.25, 0.5);
  const sparseP = useP(109.7, 0.7);
  const brainP = useP(115.9, 0.9);
  const inputP = useP(117.0, 0.8);
  const cluster = [
    [4, 5],
    [5, 4],
    [5, 5],
    [5, 6],
    [6, 5],
    [4, 6],
    [6, 4],
  ];
  const clusterSet = new Set(cluster.map(([r, c]) => `${r}-${c}`));
  return (
    <g>
      <g opacity={gridP * (1 - brainP)}>
        {Array.from({length: 11}).map((_, r) =>
          Array.from({length: 11}).map((__, c) => {
            const cx = 960 + (c - 5) * 54;
            const cy = 500 + (r - 5) * 48;
            const isCenter = r === 5 && c === 5;
            const isCluster = clusterSet.has(`${r}-${c}`);
            return (
              <g key={`${r}-${c}`} opacity={gridP}>
                <Ink
                  d={circleD(cx, cy, 9, 1200 + r * 11 + c, 0.7)}
                  p={gridP}
                  color={isCluster && sparseP > 0.3 ? C.green : isCenter ? C.orange : C.deep}
                  width={2.4}
                  fill={isCluster && sparseP > 0.3 ? C.green : isCenter ? C.orange : C.bg}
                  fillOpacity={isCluster && sparseP > 0.3 ? 0.2 : isCenter ? 0.25 : 0.3}
                  opacity={sparseP > 0.3 && !isCluster ? 0.35 : 1}
                />
                {isCenter ? <circle cx={cx} cy={cy} r={16} fill="none" stroke={C.orange} strokeWidth={2.2} opacity={0.7} /> : null}
              </g>
            );
          }),
        )}
        {xP > 0 ? (
          <g opacity={xP * (1 - sparseP)}>
            <Ink d={lineD(900, 452, 1020, 548, 1300, 1.2)} p={xP} color={C.red} width={4.4} />
            <Ink d={lineD(1020, 452, 900, 548, 1301, 1.2)} p={xP} color={C.red} width={4.4} />
          </g>
        ) : null}
        {sparseP > 0 ? (
          <g opacity={sparseP}>
            <Ink d={arcD(960, 500, 112, Math.PI * 1.08, Math.PI * 1.52, 1310, 1)} p={sparseP} color={C.green} width={3} opacity={0.6} />
            <Ink d={arcD(960, 500, 112, Math.PI * 1.92, Math.PI * 2.36, 1311, 1)} p={sparseP} color={C.green} width={3} opacity={0.6} />
          </g>
        ) : null}
      </g>

      <g opacity={brainP}>
        <SourceIcon src="source/icons/animal_brain.png" cx={960} cy={540} size={420} opacity={brainP} />
        {[
          {x: 700, y: 270, kind: 'photo'},
          {x: 1220, y: 270, kind: 'name'},
          {x: 960, y: 850, kind: 'sketch'},
        ].map((it, i) => (
          <g key={i} opacity={inputP}>
            {it.kind === 'photo' ? (
              <Ink d={lineD(700, 345, 830, 470, 1320, 0.8)} p={inputP} color={C.deep} width={2.4} dash="1 12" opacity={0.55} />
            ) : it.kind === 'name' ? (
              <Ink d={lineD(1220, 345, 1090, 470, 1321, 0.8)} p={inputP} color={C.deep} width={2.4} dash="1 12" opacity={0.55} />
            ) : (
              <Ink d={lineD(960, 775, 960, 730, 1322, 0.8)} p={inputP} color={C.deep} width={2.4} dash="1 12" opacity={0.55} />
            )}
            <Panel x={it.x} y={it.y} w={150} h={150} p={inputP} seed={1330 + i} fill={C.surface} fillOpacity={0.75}>
              {it.kind === 'photo' ? <SourceImage src="source/halle_photo.jpg" x={it.x - 55} y={it.y - 55} w={110} h={110} opacity={inputP} fit="slice" /> : null}
              {it.kind === 'name' ? (
                <>
                  <Txt x={it.x} y={it.y - 16} size={28} color={C.ink} opacity={inputP}>Halle</Txt>
                  <Txt x={it.x} y={it.y + 18} size={28} color={C.ink} opacity={inputP}>Berry</Txt>
                </>
              ) : null}
              {it.kind === 'sketch' ? <SourceImage src="source/halle_sketch.png" x={it.x - 55} y={it.y - 55} w={110} h={110} opacity={inputP} fit="slice" /> : null}
            </Panel>
          </g>
        ))}
      </g>
      <Label x={700} y={375} size={26} at={cue('face', 117)} color={C.muted} opacity={inputP}>
        photo
      </Label>
      <Label x={1220} y={375} size={26} at={cue('name', 118)} color={C.muted} opacity={inputP}>
        name
      </Label>
      <Label x={960} y={955} size={26} at={cue('sketch', 119)} color={C.muted} opacity={inputP}>
        sketch
      </Label>
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* 09 — The AI question                                                */
/* ------------------------------------------------------------------ */

export const Scene09: React.FC = () => {
  const brainP = useP(122.7, 0.8);
  const netP = useP(125.6, 0.8);
  const qP = useP(129.2, 0.6);
  const t = useT();
  return (
    <g>
      <g opacity={brainP * (1 - qP * 0.35)}>
        <SourceIcon src="source/icons/animal_brain.png" cx={720} cy={560} size={340} opacity={brainP * (1 - qP * 0.35)} />
      </g>
      <g opacity={netP * (1 - qP * 0.35)}>
        <Network x={1200} y={560} s={1.0} p={netP} layers={[4, 5, 3]} accent={C.cyan} />
      </g>
      <Ink d={lineD(870, 560, 1050, 560, 1380, 0.8)} p={Math.min(brainP, netP)} color={C.deep} width={2.4} dash="1 14" opacity={0.6} />
      <Label x={960} y={330} size={150} at={129.2} color={C.yellow} font="display" weight={700}>
        ?
      </Label>
      <Label x={720} y={760} size={30} at={cue('brain', 123)} color={C.muted} opacity={brainP}>
        brain
      </Label>
      <Label x={1200} y={760} size={30} at={cue('neural', 126)} color={C.muted} opacity={netP}>
        neural network
      </Label>
      <Label x={960} y={900} size={36} at={cue('same', 130)} color={C.yellow} opacity={qP}>
        same concepts?
      </Label>
    </g>
  );
};
