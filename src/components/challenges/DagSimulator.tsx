"use client";

import { useMemo, useState } from "react";

const nodes = [
  "load_data",
  "infer_schema",
  "plan_insights",
  "generate_analysis_code",
  "execute_analysis",
  "judge_verify",
  "generate_chart",
  "score_chart",
  "compile_deck_ir",
  "render_pptx",
];

export function DagSimulator() {
  const [step, setStep] = useState(0);
  const statuses = useMemo(
    () =>
      nodes.map((node, index) => ({
        node,
        status:
          index < step ? "complete" : index === step ? "active" : "queued",
      })),
    [step],
  );

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">DAG Execution Simulator</p>
        <h1>Why explicit workflows beat vague agents in production</h1>
        <p className="hero-subtitle">
          This is a local static simulator. It animates workflow state only. It
          does not execute code, call tools, or process private data.
        </p>
        <div className="toggle-row" role="group" aria-label="DAG controls">
          <button
            className="button primary"
            onClick={() =>
              setStep((value) => Math.min(value + 1, nodes.length))
            }
            type="button"
          >
            Advance node
          </button>
          <button
            className="button secondary"
            onClick={() => setStep(0)}
            type="button"
          >
            Reset
          </button>
        </div>
        <div className="dag-grid" aria-label="Research report workflow DAG">
          {statuses.map((item, index) => (
            <div className={`dag-node ${item.status}`} key={item.node}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.node}</strong>
              <p>{item.status}</p>
            </div>
          ))}
        </div>
        <p className="confidentiality-note">
          Representative workflow. Customer data, private prompts, internal
          datasets, and exact costs omitted.
        </p>
      </div>
    </section>
  );
}
