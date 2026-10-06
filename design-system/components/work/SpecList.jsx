import React from "react";
export function SpecList({ items = [], stacked, columns }) {
  if (columns) return <dl className="hm-facts" style={{ "--cols": columns }}>{items.map(([k, v], i) => <div className="hm-fact" key={i}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
  return <dl className={"hm-spec" + (stacked ? " hm-spec--stacked" : "")}>{items.map(([k, v], i) => <div className="hm-spec-row" key={i}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>;
}
