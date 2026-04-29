import { traceLabel, traceSpans } from "@/content/traces";

export function LiveSystemPulse() {
  return (
    <section className="section-pad compact" aria-labelledby="pulse-title">
      <div className="container">
        <div className="trace-card">
          <div className="trace-head">
            <div>
              <p className="eyebrow">Live System Pulse</p>
              <h2 id="pulse-title">
                A calm observability strip, not a fake sci-fi dashboard.
              </h2>
            </div>
            <span className="status-pill">representative</span>
          </div>
          <p className="trace-label">{traceLabel}</p>
          <div
            className="trace-rows"
            aria-label="Representative AI workflow trace spans"
          >
            {traceSpans.map((span) => (
              <div className="trace-row" key={span.id}>
                <span
                  className={`trace-dot ${span.status}`}
                  aria-hidden="true"
                />
                <code>{span.name}</code>
                <span>{span.duration}</span>
                <span>{span.model ?? span.type}</span>
                <strong>{span.status}</strong>
                <em>{span.summary}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
