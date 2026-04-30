"use client";

import { useState } from "react";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { debugScenarios } from "@/content/challenges";

export function DebugScenarioView() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Debug this agent</p>
        <h1>Multiple production AI failure modes</h1>
        <p className="hero-subtitle">
          Inspect representative traces, choose the likely root cause, and
          compare your diagnosis against production fixes.
        </p>
        {debugScenarios.map((scenario) => {
          const selectedChoiceId = answers[scenario.id];
          const answered = Boolean(selectedChoiceId);
          const correct = scenario.choices.find(
            (choice) => choice.id === scenario.correctChoiceId,
          );
          return (
            <article className="case-section" key={scenario.id}>
              <p className="eyebrow">{scenario.difficulty} scenario</p>
              <h2>{scenario.title}</h2>
              <p>{scenario.symptom}</p>
              <p className="confidentiality-note">{scenario.publicLabel}</p>

              <div
                className="trace-rows challenge-trace"
                aria-label={`${scenario.title} trace spans`}
              >
                {scenario.spans.map((span) => (
                  <div className="trace-row" key={span.id}>
                    <span className={`trace-dot ${span.status}`} />
                    <code>{span.name}</code>
                    <span>{span.type}</span>
                    <strong>{span.durationMs}ms</strong>
                    <em>{span.costUnits ?? 0} units</em>
                    <span>{span.summary}</span>
                  </div>
                ))}
              </div>

              <h3>Choose the likely root cause</h3>
              <div
                className="choice-grid"
                role="group"
                aria-label="Diagnosis choices"
              >
                {scenario.choices.map((choice) => {
                  const isSelected = selectedChoiceId === choice.id;
                  const isCorrect = choice.id === scenario.correctChoiceId;
                  const resultClass = answered
                    ? isCorrect
                      ? " correct"
                      : isSelected
                        ? " incorrect"
                        : ""
                    : "";
                  return (
                    <button
                      aria-pressed={isSelected}
                      className={`choice-card choice-button${resultClass}`}
                      key={choice.id}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [scenario.id]: choice.id,
                        }))
                      }
                      type="button"
                    >
                      <h4>{choice.label}</h4>
                      <p>
                        {answered
                          ? choice.explanation
                          : "Choose this diagnosis"}
                      </p>
                    </button>
                  );
                })}
              </div>
              <details className="reveal-card" open={answered}>
                <summary>Reveal diagnosis and fix</summary>
                {answered ? (
                  <>
                    <p>
                      Correct answer: <strong>{correct?.label}</strong>
                    </p>
                    <p>{scenario.diagnosis}</p>
                    <p>{scenario.fix}</p>
                  </>
                ) : (
                  <p>Pick a diagnosis first, then compare your answer.</p>
                )}
              </details>
              <div className="source-list">
                {scenario.proofIds.map((proofId) => (
                  <SourceBadge proofId={proofId} key={proofId} />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
