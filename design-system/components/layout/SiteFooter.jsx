import React from "react";
export function SiteFooter({ name = "Himadri Mishra", role = "Agent Experience Engineer and AI Product Engineer", pages = [], elsewhere = [], year = 2026, colophon = "Set in IBM Plex Sans and IBM Plex Mono.", onNavigate }) {
  const L = (l) => <li key={l.label}><a href={l.href || "#"} onClick={onNavigate && l.id ? (e) => { e.preventDefault(); onNavigate(l.id); } : undefined}>{l.label}{l.external ? " ↗" : ""}</a></li>;
  return (
    <footer className="hm-footer">
      <div className="hm-wrap">
        <div className="hm-grid" style={{ rowGap: 32 }}>
          <div style={{ gridColumn: "1 / 7" }}><div className="hm-footer-name">{name}</div><div className="hm-footer-role">{role}</div></div>
          <div style={{ gridColumn: "7 / 10" }}><span className="hm-label">Pages</span><ul className="hm-footer-list">{pages.map(L)}</ul></div>
          <div style={{ gridColumn: "10 / 13" }}><span className="hm-label">Elsewhere</span><ul className="hm-footer-list">{elsewhere.map(L)}</ul></div>
        </div>
        <div className="hm-footer-bottom"><span>© {year} {name}</span><span>{colophon}</span></div>
      </div>
    </footer>
  );
}
