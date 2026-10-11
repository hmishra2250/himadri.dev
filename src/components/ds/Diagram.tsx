import type { ReactNode } from "react";

/*
 * Diagrams drawn with the diagram-design method (one accent, hairlines,
 * orthogonal connectors, labels on masks, a 4px grid) in the v2 tokens:
 * Plex Sans names, Plex Mono labels, square corners, cobalt for the focal
 * path only. Coordinates are SVG units; the figure scales to its column.
 */

/** Width of a 10.5px uppercase Plex Mono label with its tracking and padding. */
const labelWidth = (text: string) => Math.ceil(text.length * 7) + 8;

export type DiagramTone = "default" | "focal" | "input" | "dashed";

/** An accessible inline SVG figure with arrow markers and an optional note. */
export function DiagramFigure({
  id,
  title,
  desc,
  width,
  height,
  note,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  width: number;
  height: number;
  note?: string;
  children: ReactNode;
}) {
  return (
    <figure className="hm-diagram">
      <svg
        className="hm-diagram-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby={`${id}-title ${id}-desc`}
      >
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{desc}</desc>
        <defs>
          {(["arrow", "arrow-focal"] as const).map((kind) => (
            <marker
              key={kind}
              id={`${id}-${kind}`}
              viewBox="0 0 8 8"
              refX="7.5"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path
                d="M0,0 L8,4 L0,8 z"
                className={
                  kind === "arrow"
                    ? "hm-dg-head"
                    : "hm-dg-head hm-dg-head--focal"
                }
              />
            </marker>
          ))}
        </defs>
        {children}
      </svg>
      {note ? <figcaption className="hm-figure-note">{note}</figcaption> : null}
    </figure>
  );
}

/** A node: optional mono index, a Plex Sans name and up to two sublabel lines. */
export function DgNode({
  x,
  y,
  w,
  h,
  name,
  sub,
  index,
  tone = "default",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  sub?: readonly string[];
  index?: string;
  tone?: DiagramTone;
}) {
  const nameY = index ? y + 40 : y + 25;
  return (
    <g className={`hm-dg-node hm-dg-node--${tone}`}>
      <rect className="hm-dg-box" x={x} y={y} width={w} height={h} />
      {index ? (
        <text className="hm-dg-index" x={x + 10} y={y + 20}>
          {index}
        </text>
      ) : null}
      <text className="hm-dg-name" x={x + 10} y={nameY}>
        {name}
      </text>
      {(sub ?? []).map((line, i) => (
        <text
          key={line}
          className="hm-dg-sub"
          x={x + 10}
          y={nameY + 20 + i * 15}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** A dashed boundary, such as a sandbox, with a mono label inside its top edge. */
export function DgZone({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g className="hm-dg-zone">
      <rect className="hm-dg-zone-box" x={x} y={y} width={w} height={h} />
      <text className="hm-dg-label" x={x + 12} y={y + 20}>
        {label}
      </text>
    </g>
  );
}

/** A connector; draw connectors before nodes so lines sit behind boxes. */
export function DgEdge({
  diagram,
  d,
  tone = "default",
}: {
  diagram: string;
  d: string;
  tone?: "default" | "focal" | "return";
}) {
  return (
    <path
      className={`hm-dg-edge hm-dg-edge--${tone}`}
      d={d}
      markerEnd={`url(#${diagram}-${tone === "focal" ? "arrow-focal" : "arrow"})`}
    />
  );
}

/** An arrow label on an opaque mask, set beside its connector. */
export function DgLabel({
  x,
  y,
  text,
  tone = "default",
}: {
  /** Left edge of the label */
  x: number;
  /** Vertical centre of the label */
  y: number;
  text: string;
  tone?: "default" | "focal";
}) {
  const w = labelWidth(text);
  return (
    <g className={`hm-dg-tag hm-dg-tag--${tone}`}>
      <rect className="hm-dg-mask" x={x} y={y - 8} width={w} height={16} />
      <text className="hm-dg-label" x={x + 4} y={y + 4}>
        {text}
      </text>
    </g>
  );
}
