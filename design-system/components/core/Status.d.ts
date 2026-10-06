import * as React from "react";
/** Square-dot mono status marker. The text always carries the meaning; color is secondary. */
export interface StatusProps {
  /** cobalt shipped/primary · green completed/verified · warn draft · violet experiment · muted earlier */
  tone?: "cobalt" | "green" | "warn" | "violet" | "muted";
  boxed?: boolean;
  children?: React.ReactNode;
}
export declare function Status(props: StatusProps): JSX.Element;
