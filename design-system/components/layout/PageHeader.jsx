import React from "react";
export function PageHeader({ label, title, intro, actions, children }) {
  return (
    <header className="hm-wrap">
      <div className="hm-page-header">
        <span className="hm-label hm-label--cobalt">{label}</span>
        <div className="hm-page-header-body">
          <h1 className="hm-h1">{title}</h1>
          {intro ? <p className="hm-lead">{intro}</p> : null}
          {actions ? <div className="hm-page-actions">{actions}</div> : null}
        </div>
        {children}
      </div>
    </header>
  );
}
