import {
  DgEdge,
  DgLabel,
  DgNode,
  DgZone,
  DiagramFigure,
} from "@/components/ds";
import type { CodingAgentDiagram, LoopDiagram } from "@/content/site";

/*
 * The site's two system diagrams. Geometry lives here on a 4px grid in a
 * 384-unit viewBox (two 152-unit columns with a 56-unit gutter, 12-unit
 * margins); every word comes from src/content/site.ts.
 */

const A = 12; // left column x
const B = 220; // right column x
const W = 152; // column width

/**
 * The coding agent: a request enters a sandbox with no credentials; a second
 * model reviews the diff; only the patch leaves; checks outside the agent's
 * reach run before a draft pull request goes to a person, whose reply sends
 * it back.
 */
export function CodingAgentFigure({
  diagram,
}: {
  diagram: CodingAgentDiagram;
}) {
  const id = "coding-agent";
  const { nodes, edges } = diagram;
  return (
    <DiagramFigure
      id={id}
      title={diagram.title}
      desc={diagram.desc}
      width={384}
      height={396}
      note={diagram.note}
    >
      <DgZone x={1} y={92} w={382} h={116} label={diagram.zone} />

      <DgEdge diagram={id} d="M140,60 V124" />
      <DgEdge diagram={id} d="M164,140 H220" />
      <DgEdge diagram={id} d="M220,164 H164" tone="return" />
      <DgEdge diagram={id} d="M296,180 V244" />
      <DgEdge diagram={id} d="M296,300 V336" />
      <DgEdge diagram={id} d="M220,364 H164" />
      <DgEdge diagram={id} d="M40,336 V180" tone="return" />

      <DgNode x={A} y={4} w={W} h={56} tone="input" {...nodes.request} />
      <DgNode x={A} y={124} w={W} h={56} {...nodes.agent} />
      <DgNode x={B} y={124} w={W} h={56} {...nodes.reviewer} />
      <DgNode x={B} y={244} w={W} h={56} tone="focal" {...nodes.checks} />
      <DgNode x={B} y={336} w={W} h={56} {...nodes.draft} />
      <DgNode x={A} y={336} w={W} h={56} {...nodes.person} />

      <DgLabel x={167} y={178} text={edges.revise} />
      <DgLabel x={208} y={226} text={edges.patch} />
      <DgLabel x={304} y={318} text={edges.pass} />
      <DgLabel x={48} y={272} text={edges.reply} />
    </DiagramFigure>
  );
}

/**
 * The Agent Experience harness as a loop on a two-by-three grid, running
 * clockwise: new releases enter at the first station, the last station
 * feeds the first again, and search checks feed the findings.
 */
export function HarnessLoopFigure({ diagram }: { diagram: LoopDiagram }) {
  const id = "harness-loop";
  const [pin, run, keep, judge, report, fix] = diagram.stations;
  const station = (y: number) => ({ y, w: W, h: 56 });
  return (
    <DiagramFigure
      id={id}
      title={diagram.title}
      desc={diagram.desc}
      width={384}
      height={344}
      note={diagram.note}
    >
      <DgEdge diagram={id} d="M88,0 V36" />
      <DgEdge diagram={id} d="M164,64 H220" />
      <DgEdge diagram={id} d="M296,92 V124" />
      <DgEdge diagram={id} d="M296,180 V212" />
      <DgEdge diagram={id} d="M220,240 H164" />
      <DgEdge diagram={id} d="M88,212 V180" />
      <DgEdge diagram={id} d="M88,124 V92" tone="focal" />
      <DgEdge diagram={id} d="M88,300 V268" tone="return" />

      <DgNode x={A} {...station(36)} index="01" tone="focal" {...pin} />
      <DgNode x={B} {...station(36)} index="02" {...run} />
      <DgNode x={B} {...station(124)} index="03" {...keep} />
      <DgNode x={B} {...station(212)} index="04" {...judge} />
      <DgNode x={A} {...station(212)} index="05" {...report} />
      <DgNode x={A} {...station(124)} index="06" {...fix} />
      <DgNode x={A} y={300} w={W + 56} h={40} tone="dashed" {...diagram.side} />

      <DgLabel x={96} y={16} text={diagram.entry} />
      <DgLabel x={96} y={108} text={diagram.retest} tone="focal" />
    </DiagramFigure>
  );
}
