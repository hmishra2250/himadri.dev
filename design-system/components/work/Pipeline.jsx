import React from "react";
export function Pipeline({ steps = [], wrap, vertical, note }) {
  const cls = "hm-pipeline" + (wrap ? " hm-pipeline--wrap" : "") + (vertical ? " hm-pipeline--vertical" : "");
  return (
    <figure>
      <ol className={cls} style={{ "--n": steps.length }}>
        {steps.map((s, i) => <li key={i}><span className="hm-pipeline-num">{String(i + 1).padStart(2, "0")}</span><span className="hm-pipeline-title">{typeof s === "string" ? s : s.title}</span>{s.detail ? <span className="hm-pipeline-detail">{s.detail}</span> : null}</li>)}
      </ol>
      {note ? <figcaption className="hm-figure-note">{note}</figcaption> : null}
    </figure>
  );
}
