import React from "react";
import { Button } from "../core/Button.jsx";
export function SiteHeader({ name = "Himadri Mishra", role = "Agent Experience · AI Product", links = [], active, resumeHref = "#", onNavigate }) {
  const nav = (id) => onNavigate ? (e) => { e.preventDefault(); onNavigate(id); } : undefined;
  return (
    <header className="hm-header">
      <div className="hm-wrap hm-header-inner">
        <a href="#" className="hm-brand" onClick={nav("home")}><span className="hm-brand-name">{name}</span><span className="hm-brand-role">{role}</span></a>
        <nav className="hm-nav" aria-label="Primary">
          {links.map((l) => <a key={l.id || l.label} href={l.href || "#"} aria-current={active === l.id ? "page" : undefined} onClick={l.id ? nav(l.id) : undefined}>{l.label}</a>)}
          <Button size="sm" variant="quiet" href={resumeHref} icon="↗">Resume</Button>
        </nav>
      </div>
    </header>
  );
}
