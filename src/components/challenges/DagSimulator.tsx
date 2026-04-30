"use client";

import { useMemo, useState } from "react";
import { trackPortfolioEvent } from "@/lib/analytics";

type DagDecision = "retry" | "skip" | null;

const nodes = [
  {
    id: "load_data",
    label: "Load representative data",
    deps: [],
    latency: "180ms",
    cost: "1 unit",
    output: "Typed source table",
  },
  {
    id: "infer_schema",
    label: "Infer schema",
    deps: ["load_data"],
    latency: "420ms",
    cost: "2 units",
    output: "Column map and field types",
  },
  {
    id: "plan_insights",
    label: "Plan insight DAG",
    deps: ["infer_schema"],
    latency: "910ms",
    cost: "6 units",
    output: "Parallel insight tasks",
  },
  {
    id: "execute_analysis",
    label: "Execute analysis code",
    deps: ["plan_insights"],
    latency: "5.2s",
    cost: "7 units",
    output: "Verified tables",
  },
  {
    id: "judge_verify",
    label: "Judge verification",
    deps: ["execute_analysis"],
    latency: "2.8s",
    cost: "10 units",
    output: "Semantic pass or failure",
  },
  {
    id: "generate_chart",
    label: "Generate chart spec",
    deps: ["judge_verify"],
    latency: "730ms",
    cost: "3 units",
    output: "Chart config",
  },
  {
    id: "compile_deck_ir",
    label: "Compile Deck IR",
    deps: ["generate_chart"],
    latency: "1.1s",
    cost: "4 units",
    output: "Inspectable slide IR",
  },
] as const;

function nodeStatus(index: number, step: number, decision: DagDecision) {
  const judgeIndex = nodes.findIndex((node) => node.id === "judge_verify");
  if (index < step) return "complete";
  if (index === judgeIndex && step === judgeIndex && decision === null)
    return "failed";
  if (index > judgeIndex && step === judgeIndex && decision === null)
    return "blocked";
  if (index === step) return "active";
  return "queued";
}

export function DagSimulator() {
  const [step, setStep] = useState(0);
  const [decision, setDecision] = useState<DagDecision>(null);
  const judgeIndex = nodes.findIndex((node) => node.id === "judge_verify");
  const statuses = useMemo(
    () =>
      nodes.map((node, index) => ({
        ...node,
        status: nodeStatus(index, step, decision),
      })),
    [decision, step],
  );
  const blockedOnDecision = step === judgeIndex && decision === null;
  const completed = step >= nodes.length;

  function advance() {
    if (blockedOnDecision) return;
    setStep((value) => Math.min(value + 1, nodes.length));
    trackPortfolioEvent("dag_step_advanced", {
      route: "/challenges/dag-execution-simulator",
      feature_id: nodes[Math.min(step, nodes.length - 1)]?.id,
    });
  }

  function chooseDecision(nextDecision: Exclude<DagDecision, null>) {
    setDecision(nextDecision);
    setStep(judgeIndex + 1);
  }

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">DAG Execution Simulator</p>
        <h1>Why explicit workflows beat vague agents in production</h1>
        <p className="hero-subtitle">
          This local simulator shows dependency state, failure handling, cost,
          latency, and downstream readiness. It never executes code or processes
          private data.
        </p>
        <div className="toggle-row" role="group" aria-label="DAG controls">
          <button
            className="button primary"
            disabled={blockedOnDecision || completed}
            onClick={advance}
            type="button"
          >
            Advance ready node
          </button>
          <button
            className="button secondary"
            onClick={() => {
              setStep(0);
              setDecision(null);
            }}
            type="button"
          >
            Reset
          </button>
        </div>

        {blockedOnDecision ? (
          <article className="reveal-card">
            <p className="eyebrow">Failure decision</p>
            <h2>Judge verification found a semantic mismatch.</h2>
            <p>
              The workflow is blocked because chart and deck generation depend
              on verified analysis. Choose how the system should recover.
            </p>
            <div className="card-footer-row">
              <button
                className="button primary"
                onClick={() => chooseDecision("retry")}
                type="button"
              >
                Retry with targeted assertion
              </button>
              <button
                className="button secondary"
                onClick={() => chooseDecision("skip")}
                type="button"
              >
                Skip verification and mark risk
              </button>
            </div>
          </article>
        ) : null}

        <div className="dag-grid" aria-label="Research report workflow DAG">
          {statuses.map((item) => (
            <article className={`dag-node ${item.status}`} key={item.id}>
              <span>{item.id}</span>
              <h3>{item.label}</h3>
              <p>Status: {item.status}</p>
              <p>
                Depends on: {item.deps.length ? item.deps.join(", ") : "start"}
              </p>
              <p>
                {item.latency} · {item.cost}
              </p>
              <p>{item.output}</p>
            </article>
          ))}
        </div>

        <section className="case-section" aria-labelledby="dag-lesson-title">
          <h2 id="dag-lesson-title">Production lesson</h2>
          <p>
            A DAG makes readiness, failure, retries, and risk explicit. If the
            judge fails, downstream chart and deck nodes stop until the system
            either retries with a narrower assertion or marks the artifact as
            risky.
          </p>
          {decision ? (
            <p className="confidentiality-note">
              Decision selected:{" "}
              {decision === "retry" ? "targeted retry" : "risk-marked skip"}.
              This changes downstream readiness without using private data.
            </p>
          ) : null}
        </section>
        <p className="confidentiality-note">
          Representative workflow. Customer data, private prompts, internal
          datasets, and exact costs omitted.
        </p>
      </div>
    </section>
  );
}
