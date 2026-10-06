import React from "react";
export function WorkRow({ index, title, meta, summary, children, href, defaultOpen = false, onClick }) {
  const [open, setOpen] = React.useState(defaultOpen);
  if (href || onClick) {
    return (
      <div className="hm-row hm-row--link">
        <a className="hm-row-trigger" href={href || "#"} onClick={onClick}>
          <span className="hm-row-num">{index}</span><span className="hm-row-title">{title}</span><span className="hm-row-meta">{meta}</span><span className="hm-row-toggle" aria-hidden="true">↗</span>
        </a>
        {summary ? <div className="hm-grid" style={{ display: "grid", gridTemplateColumns: "56px minmax(0,1fr)", columnGap: 20 }}><p className="hm-row-summary" style={{ gridColumn: 2 }}>{summary}</p></div> : null}
      </div>
    );
  }
  return (
    <div className="hm-row" data-open={open}>
      <button className="hm-row-trigger" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span className="hm-row-num">{index}</span><span className="hm-row-title">{title}</span><span className="hm-row-meta">{meta}</span><span className="hm-row-toggle" aria-hidden="true">+</span>
      </button>
      {open ? <div className="hm-row-panel"><span></span><div className="hm-row-panel-body">{children}</div></div> : null}
    </div>
  );
}
export function WorkRows({ children }) { return <div className="hm-rows">{children}</div>; }
