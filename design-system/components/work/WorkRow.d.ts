import * as React from "react";
/**
 * Index row: mono number, title, mono meta, + toggle. Expands in place (accordion) or acts as a link (href/onClick) with ↗.
 * @startingPoint section="Work" subtitle="Expandable work index rows" viewport="1000x420"
 */
export interface WorkRowProps {
  /** "01" */
  index?: string;
  title: string;
  /** Right-aligned mono metadata, e.g. "Shipped system" or "2023–2024" */
  meta?: string;
  /** Link rows only: one-line summary under the title */
  summary?: string;
  /** Accordion panel content */
  children?: React.ReactNode;
  /** Makes the row a link instead of an accordion */
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  defaultOpen?: boolean;
}
export declare function WorkRow(props: WorkRowProps): JSX.Element;
export interface WorkRowsProps { children?: React.ReactNode; }
/** Wrapper with the graphite top rule */
export declare function WorkRows(props: WorkRowsProps): JSX.Element;
