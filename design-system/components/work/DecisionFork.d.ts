import * as React from "react";
/** Architecture decision record: context, two options with +/− lists, chosen option marked with a cobalt top rule, and the reason. */
export interface DecisionForkProps {
  index?: string;
  title: string;
  context?: string;
  options: { label: string; pros: string[]; cons: string[] }[];
  /** Index of the chosen option */
  chosen?: number;
  why?: string;
}
export declare function DecisionFork(props: DecisionForkProps): JSX.Element;
