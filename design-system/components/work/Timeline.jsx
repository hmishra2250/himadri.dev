import React from "react";
export function Timeline({ items = [] }) {
  return <ol className="hm-timeline">{items.map(([y, e]) => <li key={y + e} data-now={y === "Now"}><span className="hm-timeline-year">{y}</span><span className="hm-timeline-event">{e}</span></li>)}</ol>;
}
export function MetricStrip({ items = [] }) {
  return <div className="hm-metrics">{items.map(([v, l]) => <div className="hm-metric" key={l}><span className="hm-metric-value">{v}</span><span className="hm-metric-label">{l}</span></div>)}</div>;
}
export function Note({ label, children }) {
  return <div className="hm-note">{label ? <span className="hm-label hm-label--cobalt">{label}</span> : null}{children}</div>;
}
