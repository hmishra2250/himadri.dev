import * as React from "react";
/** Method / architecture figure: steps on a 2px graphite rail with cobalt square nodes. Horizontal, or wrapping for long pipelines. */
export interface PipelineProps {
  steps: (string | { title: string; detail?: string })[];
  /** Auto-fill wrapping grid (min 168px) for 6+ steps */
  wrap?: boolean;
  /** Vertical rail, for a figure beside copy */
  vertical?: boolean;
  /** Mono caption; state honestly that it is an illustration */
  note?: string;
}
export declare function Pipeline(props: PipelineProps): JSX.Element;
