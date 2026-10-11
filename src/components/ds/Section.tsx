import type { ReactNode } from "react";

/**
 * A top-level section: a graphite rule carrying the mono index and label
 * (and an optional link on the right), a sentence headline, then content.
 */
export function Section({
  id,
  index,
  label,
  title,
  intro,
  aside,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="hm-section" id={id}>
      <div className="hm-wrap">
        <header className="hm-section-head">
          <div className="hm-section-bar">
            <div className="hm-section-index">
              <span className="hm-section-num">{index}</span>
              <span className="hm-label hm-label--ink">{label}</span>
            </div>
            {aside ? <div>{aside}</div> : null}
          </div>
          <h2 className="hm-h2">{title}</h2>
          {intro ? <p className="hm-section-intro">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}

/** The header of an inner page: cobalt label, h1, lead and actions. */
export function PageHeader({
  id,
  label,
  title,
  intro,
  actions,
}: {
  id?: string;
  label: string;
  title: string;
  intro?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="hm-page-header">
      <span className="hm-label hm-label--cobalt">{label}</span>
      <div className="hm-page-header-body">
        <h1 id={id} className="hm-h1">
          {title}
        </h1>
        {intro ? <p className="hm-lead">{intro}</p> : null}
        {actions ? <div className="hm-page-actions">{actions}</div> : null}
      </div>
    </div>
  );
}
