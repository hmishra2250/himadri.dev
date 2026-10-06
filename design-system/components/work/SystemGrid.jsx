import React from "react";
export function SystemCard({ status = "Shipped working version", title, summary, bullets = [], action = "Explore the system", href = "#", onClick }) {
  return (
    <a className="hm-system" href={href} onClick={onClick}>
      <span className="hm-status hm-status--cobalt"><span className="hm-status-dot" aria-hidden="true"></span>{status}</span>
      <h3 className="hm-h4" style={{ fontSize: 20 }}>{title}</h3>
      <p>{summary}</p>
      {bullets.length ? <ul className="hm-bullets">{bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
      <span className="hm-system-action">{action}<span className="hm-button-icon" aria-hidden="true">→</span></span>
    </a>
  );
}
export function SystemGrid({ children }) { return <div className="hm-systems">{children}</div>; }
