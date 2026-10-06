import type { ReactNode } from "react";

/** A mono label that introduces a list inside a panel. */
export function Subhead({ children }: { children: ReactNode }) {
  return <h3 className="hm-label hm-label--ink hm-subhead">{children}</h3>;
}
