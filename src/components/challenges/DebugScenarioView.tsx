"use client";

import { useState } from "react";
import { trackPortfolioEvent } from "@/lib/analytics";
import { debugScenarios } from "@/content/challenges";

export function DebugScenarioView() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Debug this agent</p>
        <h1>Multiple production AI failure modes</h1>
        <p className="hero-subtitle">
          Follow the trace clues, choose a root cause, then compare your answer
          with the diagnosis and production fix.
        </p>
        {debugScenarios.map((scenario) => {
          const selectedChoiceId = answers[scenario.id];
          const answered = Boolean(selectedChoiceId);
          const selected = scenario.choices.find(
            (choice) => choice.id === selectedChoiceId,
          );
          const correct = scenario.choices.find(
            (choice) => choice.id === scenario.correctChoiceId,
          );
          return (
            <article className="case-section" key={scenario.id}>
              <p className="eyebrow">{scenario.difficulty} scenario</p>
              <h2>{scenario.title}</h2>
              <p>{scenario.symptom}</p>
              <p className="confidentiality-note compact-label">
                {scenario.publicLabel}
              </p>

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

              <h3>Choose the root cause</h3>
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
                      onClick={() => {
                        setAnswers((current) => ({
                          ...current,
                          [scenario.id]: choice.id,
                        }));
                        trackPortfolioEvent("debug_choice_submitted", {
                          route: "/challenges/debug-this-agent",
                          scenario_id: scenario.id,
                          outcome: isCorrect,
                        });
                      }}
                      type="button"
                    >
                      <h4>{choice.label}</h4>
                      <p>
                        {answered
                          ? choice.explanation
                          : "Select this diagnosis"}
                      </p>
                    </button>
                  );
                })}
              </div>
              <details className="reveal-card result-panel" open={answered}>
                <summary>Diagnosis result</summary>
                {answered ? (
                  <>
                    <p>
                      Your answer: <strong>{selected?.label}</strong>
                    </p>
                    <p>
                      Correct answer: <strong>{correct?.label}</strong>
                    </p>
                    <h3>Why this matters</h3>
                    <p>{scenario.diagnosis}</p>
                    <h3>Production fix</h3>
                    <p>{scenario.fix}</p>
                  </>
                ) : (
                  <p>
                    Pick a diagnosis first, then compare your answer with the
                    production fix.
                  </p>
                )}
              </details>
            </article>
          );
        })}
      </div>
    </section>
  );
}
