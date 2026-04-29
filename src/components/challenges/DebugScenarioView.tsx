import { SourceBadge } from "@/components/ui/SourceBadge";
import { debugScenarios } from "@/content/challenges";

export function DebugScenarioView() {
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
                    <h4>{choice.label}</h4>
                    <p>{choice.explanation}</p>
                  </article>
                ))}
              </div>
              <details className="reveal-card">
                <summary>Reveal diagnosis and fix</summary>
                <p>
                  Correct answer: <strong>{correct?.label}</strong>
                </p>
                <p>{scenario.diagnosis}</p>
                <p>{scenario.fix}</p>
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
