import * as React from "react";
/**
 * Section block: graphite rule carrying the mono index + label (and an optional right-aligned link), then a sentence title and intro. Content spans the container on one left edge.
 * @startingPoint section="Layout" subtitle="Numbered section, single left edge" viewport="1100x300"
 */
export interface SectionProps {
  /** e.g. "01" */
  index?: string;
  label: string;
  /** Sentence headline ending in a period */
  title?: string;
  intro?: string;
  /** Right-aligned on the rule line (usually an ArrowLink) */
  aside?: React.ReactNode;
  id?: string;
  children?: React.ReactNode;
}
export declare function Section(props: SectionProps): JSX.Element;
