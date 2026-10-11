import type { ReactNode } from "react";
import { Status } from "./Label";

/** Cards in a grid with shared, table-like borders: three columns or two. */
export function SystemGrid({
  columns = 3,
  children,
}: {
  columns?: 2 | 3;
  children: ReactNode;
}) {
  return (
    <div className={columns === 2 ? "hm-systems hm-systems--2" : "hm-systems"}>
      {children}
    </div>
  );
}

/**
 * A system card that holds its own links (evidence), so the card itself is
 * not a link and does not fill on hover. A wide card spans the grid's row.
 */
export function SystemCard({
  status,
  title,
  wide,
  children,
}: {
  status: string;
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={
        wide
          ? "hm-system hm-system--static hm-system--wide"
          : "hm-system hm-system--static"
      }
    >
      <Status>{status}</Status>
      <h3 className="hm-h4 hm-system-title">{title}</h3>
      {children}
    </article>
  );
}
