import type { ReactNode } from "react";

/**
 * Content that stays collapsed until the reader asks for it, built on native
 * details and summary so it works without client JavaScript. `inline` is a
 * small mono toggle inside a card; `pane` is a full-width bar with a title and
 * one line, used at the bottom of a panel.
 */
export function Disclosure({
  label,
  summary,
  variant = "inline",
  children,
}: {
  label: string;
  /** One line under the label; pane variant only */
  summary?: string;
  variant?: "inline" | "pane";
  children: ReactNode;
}) {
  return (
    <details className={`hm-disclosure hm-disclosure--${variant}`}>
      <summary>
        {variant === "pane" ? (
          <span className="hm-disclosure-text">
            <span className="hm-disclosure-title">{label}</span>
            {summary ? (
              <span className="hm-disclosure-summary">{summary}</span>
            ) : null}
          </span>
        ) : (
          <span className="hm-disclosure-title">{label}</span>
        )}
        <span className="hm-disclosure-arrow" aria-hidden="true">
          ↓
        </span>
      </summary>
      <div className="hm-disclosure-body">{children}</div>
    </details>
  );
}
