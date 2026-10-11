import type { ReactNode } from "react";

/** Mono uppercase label; plain drops the case and tracking. */
export function Label({
  tone = "muted",
  plain,
  className,
  children,
}: {
  tone?: "muted" | "ink" | "cobalt";
  plain?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = [
    "hm-label",
    tone !== "muted" ? `hm-label--${tone}` : "",
    plain ? "hm-label--plain" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}

/** Mono status with a 7px square dot. */
export function Status({
  tone = "cobalt",
  children,
}: {
  tone?: "cobalt" | "green" | "warn" | "violet" | "muted";
  children: ReactNode;
}) {
  return (
    <span className={`hm-status hm-status--${tone}`}>
      <span className="hm-status-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
