import React from "react";
export function Section({ index, label, title, intro, aside, id, children }) {
  return (
    <section className="hm-section" id={id}>
      <div className="hm-wrap">
        <header className="hm-section-head">
          <div className="hm-section-bar">
            <div className="hm-section-index">{index ? <span className="hm-section-num">{index}</span> : null}<span className="hm-label hm-label--ink">{label}</span></div>
            {aside ? <div>{aside}</div> : null}
          </div>
          {title ? <h2 className="hm-h2">{title}</h2> : null}
          {intro ? <p className="hm-section-intro">{intro}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
