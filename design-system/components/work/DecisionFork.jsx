import React from "react";
export function DecisionFork({ index, title, context, options = [], chosen = 1, why }) {
  return (
    <article className="hm-fork">
      <div className="hm-fork-head">
        <span className="hm-label hm-label--cobalt">Decision {index}</span>
        <h3 className="hm-h3">{title}</h3>
        {context ? <p>{context}</p> : null}
      </div>
      <div className="hm-fork-options">
        {options.map((o, i) => (
          <div className="hm-fork-option" data-chosen={i === chosen} key={o.label}>
            <div className="hm-fork-option-head"><span className="hm-h4" style={{ fontSize: 16 }}>{o.label}</span>{i === chosen ? <span className="hm-status hm-status--cobalt"><span className="hm-status-dot"></span>Chosen</span> : <span className="hm-label">Considered</span>}</div>
            <ul className="hm-fork-list hm-fork-list--pro">{o.pros.map((p) => <li key={p}><span>+</span>{p}</li>)}</ul>
            <ul className="hm-fork-list hm-fork-list--con">{o.cons.map((p) => <li key={p}><span>−</span>{p}</li>)}</ul>
          </div>
        ))}
      </div>
      {why ? <div className="hm-fork-why"><span className="hm-label">Why</span><span>{why}</span></div> : null}
    </article>
  );
}
