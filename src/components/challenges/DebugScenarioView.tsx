import { SourceBadge } from "@/components/ui/SourceBadge";
import { debugScenarios } from "@/content/challenges";

export function DebugScenarioView() {
  const scenario = debugScenarios[0];
  const correct = scenario.choices.find(
    (choice) => choice.id === scenario.correctChoiceId,
  );

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Debug this agent</p>
        <h1>{scenario.title}</h1>
        <p className="hero-subtitle">{scenario.symptom}</p>
        <p className="confidentiality-note">{scenario.publicLabel}</p>

        <div
          className="trace-rows challenge-trace"
          aria-label="Agent trace spans"
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

        <section className="case-section" aria-labelledby="diagnosis-heading">
          <h2 id="diagnosis-heading">Choose the likely root cause</h2>
          <div className="choice-grid">
            {scenario.choices.map((choice) => (
              <article
                className={
                  choice.id === scenario.correctChoiceId
                    ? "choice-card correct"
                    : "choice-card"
                }
                key={choice.id}
              >
                <h3>{choice.label}</h3>
                <p>{choice.explanation}</p>
              </article>
            ))}
          </div>
          <details className="reveal-card">
            <summary>Reveal Himadri&apos;s diagnosis and fix</summary>
            <p>
              Correct answer: <strong>{correct?.label}</strong>
            </p>
            <p>{scenario.diagnosis}</p>
            <p>{scenario.fix}</p>
          </details>
        </section>

        <section className="case-section" aria-labelledby="review-heading">
          <h2 id="review-heading">Quality gate</h2>
          <p>
            This scenario passed the V1.5 challenge review gate on{" "}
            {scenario.reviewerSignoff.date}.
          </p>
          <ul className="check-list">
            {scenario.reviewerSignoff.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="source-list">
            {scenario.proofIds.map((proofId) => (
              <SourceBadge proofId={proofId} key={proofId} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
