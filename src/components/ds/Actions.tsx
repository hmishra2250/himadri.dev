import type { ReactNode } from "react";

type Arrow = "→" | "↗" | "↓";

const isDown = (arrow: Arrow) => arrow === "↓";

/** Square 44px button. Primary is cobalt; at most one primary per view. */
export function Button({
  href,
  variant = "secondary",
  arrow = "→",
  className,
  children,
}: {
  href: string;
  variant?: "primary" | "secondary" | "quiet";
  arrow?: Arrow;
  className?: string;
  children: ReactNode;
}) {
  const classes = [
    "hm-button",
    variant === "primary" ? "hm-button--primary" : "",
    variant === "quiet" ? "hm-button--quiet hm-button--sm" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <a className={classes} href={href}>
      {children}
      <span
        className={
          isDown(arrow)
            ? "hm-button-icon hm-button-icon--down"
            : "hm-button-icon"
        }
        aria-hidden="true"
      >
        {arrow}
      </span>
    </a>
  );
}

/** Inline 15px link with a trailing arrow: → internal, ↗ external, ↓ in-page. */
export function ArrowLink({
  href,
  arrow = "↗",
  children,
}: {
  href: string;
  arrow?: Arrow;
  children: ReactNode;
}) {
  return (
    <a className="hm-arrow-link" href={href}>
      {children}
      <span className="hm-button-icon" aria-hidden="true">
        {arrow}
      </span>
    </a>
  );
}
