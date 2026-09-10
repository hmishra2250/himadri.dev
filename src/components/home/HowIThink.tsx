import { practice } from "@/content/practice";

export function HowIThink() {
  return (
    <section
      className="section-pad practice-section"
      id="thinking"
      aria-labelledby="thinking-title"
    >
      <div className="container">
        <div className="section-header wide">
          <h2 id="thinking-title">How I approach the work.</h2>
          <p className="section-description">
            The engagement starts with boundaries, verification, and handover,
            then uses the lightest architecture that can survive production
            pressure.
          </p>
        </div>
        <div className="approach-grid">
          {practice.approach.map((item) => (
            <article className="approach-row" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
