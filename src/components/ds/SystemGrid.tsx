import type { ReactNode } from "react";
import { Status } from "./Label";

/** Cards in a three-column grid with shared, table-like borders. */
export function SystemGrid({ children }: { children: ReactNode }) {
  return <div className="hm-systems">{children}</div>;
}

/**
 * A system card that holds its own links (evidence), so the card itself is
 * not a link and does not fill on hover.
 */
export function SystemCard({
  status,
  title,
  children,
}: {
  status: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="hm-system hm-system--static">
      <Status>{status}</Status>
      <h3 className="hm-h4 hm-system-title">{title}</h3>
      {children}
    </article>
  );
}
