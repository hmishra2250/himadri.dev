import { traceLabel, traceSpans } from "@/content/traces";

export function LiveSystemPulse() {
  return (
    <section className="section-pad compact" aria-labelledby="pulse-title">
      <div className="container">
        <div className="trace-card">
          <div className="trace-head">
            <div>
              <p className="eyebrow">Live System Pulse</p>
              <h2 id="pulse-title">Representative production AI trace</h2>
            </div>
            <span className="status-pill">representative</span>
          </div>
          <p className="trace-label">{traceLabel}</p>
          <div
            className="trace-rows"
            aria-label="Representative AI workflow trace spans"
          >
            {traceSpans.map((span, index) => (
              <div
                className="trace-row"
                key={span.id}
                style={{ "--trace-index": index } as React.CSSProperties}
              >
                <span
                  className={`trace-dot ${span.status}`}
                  aria-hidden="true"
                />
                <code>{span.name}</code>
                <span className="trace-field" data-label="duration">
                  {span.duration}
                </span>
                <span className="trace-field" data-label="model">
                  {span.model ?? span.type}
                </span>
                <strong className="trace-field" data-label="status">
                  {span.status}
                </strong>
                <em>{span.summary}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
