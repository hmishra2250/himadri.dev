import type { ReactNode } from "react";

type PanelProps = {
  id: string;
  /** Section number, e.g. "01" */
  index: string;
  label: string;
  /** Sentence headline ending in a period */
  title: string;
  intro?: string;
  /** Right-aligned beside the title, usually an ArrowLink */
  aside?: ReactNode;
  children: ReactNode;
};

/** A page section framed on all four sides, with its label cut into the top edge. */
export function Panel({
  id,
  index,
  label,
  title,
  intro,
  aside,
  children,
}: PanelProps) {
  const titleId = `${id}-title`;
  return (
    <section className="hm-panel-section" id={id} aria-labelledby={titleId}>
      <div className="hm-wrap">
        <div className="hm-panel">
          <p className="hm-panel-tab">
            <span className="hm-section-num">{index}</span>
            <span className="hm-label hm-label--ink">{label}</span>
          </p>
          <header className="hm-panel-head">
            <div className="hm-panel-titlebar">
              <h2 id={titleId} className="hm-h2">
                {title}
              </h2>
              {aside}
            </div>
            {intro ? <p className="hm-section-intro">{intro}</p> : null}
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
