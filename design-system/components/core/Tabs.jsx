import React from "react";
export function Tabs({ items = [], value, onChange }) {
  return (
    <div className="hm-tabs" role="tablist">
      {items.map((t) => (
        <button key={t.id} role="tab" className="hm-tab" aria-selected={value === t.id} onClick={() => onChange && onChange(t.id)}>
          {t.label}{t.count != null ? <span className="hm-tab-count">{t.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
