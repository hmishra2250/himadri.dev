import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  /** Right-aligned on the rule line, usually an arrow link */
  aside?: ReactNode;
  children: ReactNode;
};

export function Section({
  id,
  index,
  label,
  title,
  intro,
  aside,
  children,
}: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section className="hm-section" id={id} aria-labelledby={titleId}>
      <div className="hm-wrap">
        <header className="hm-section-head">
          <div className="hm-section-bar">
            <div className="hm-section-index">
              <span className="hm-section-num">{index}</span>
              <span className="hm-label hm-label--ink">{label}</span>
            </div>
            {aside}
          </div>
          <h2 id={titleId} className="hm-h2">
            {title}
          </h2>
          {intro ? <p className="hm-section-intro">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

export function ArrowLink({
  href,
  children,
  arrow = "↗",
}: {
  href: string;
  children: ReactNode;
  arrow?: string;
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
