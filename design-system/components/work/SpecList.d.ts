import * as React from "react";
/** Hairline key/value list with mono keys: profile facts, case-study metadata, impact/checked/scope. */
export interface SpecListProps {
  /** [label, value] pairs; value may be a node */
  items: [string, React.ReactNode][];
  /** Label above value (for narrow columns and long values) */
  stacked?: boolean;
  /** Lay items out as N equal columns divided by hairlines */
  columns?: number;
}
export declare function SpecList(props: SpecListProps): JSX.Element;
