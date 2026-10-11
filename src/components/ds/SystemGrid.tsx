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
 * A system card. With an href it is v2's link card: the whole card links,
 * fills pearl-warm on hover and ends with an action line. Without one it
 * holds its own links (evidence) and does not fill. A wide card spans the row.
 */
export function SystemCard({
  id,
  status,
  title,
  wide,
  href,
  action = "Read more",
  children,
}: {
  id?: string;
  status: string;
  title: string;
  wide?: boolean;
  href?: string;
  action?: string;
  children: ReactNode;
}) {
  if (href) {
    return (
      <a className="hm-system" href={href}>
        <Status>{status}</Status>
        <h3 className="hm-h4 hm-system-title">{title}</h3>
        {children}
        <span className="hm-system-action">
          {action}
          <span className="hm-button-icon" aria-hidden="true">
            →
          </span>
        </span>
      </a>
    );
  }
  return (
    <article
      id={id}
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
