import type { DecisionFork } from "@/content/case-studies";

export function ForkCard({ fork }: { fork: DecisionFork }) {
  const rejected = fork.options.find(
    (_, index) => index !== fork.chosenOptionIndex,
  );
  const chosen = fork.options[fork.chosenOptionIndex];

  return (
    <article
      className="fork-card"
      id={fork.title.toLowerCase().replaceAll(" ", "-")}
    >
      <header className="fork-header">
        <h3>{fork.title}</h3>
        <p>{fork.context}</p>
      </header>
      <div className="fork-options" aria-label="Decision options">
        {rejected ? (
          <section
            className="fork-option rejected"
            aria-label="Rejected option"
          >
            <span>Rejected</span>
            <h4>{rejected.label}</h4>
            <ul>
              {rejected.cons.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}
        <section className="fork-option chosen" aria-label="Chosen option">
          <span>Chosen</span>
          <h4>{chosen?.label ?? fork.chosen}</h4>
          <ul>
            {(chosen?.pros ?? []).slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <p className="chosen-line">{fork.why}</p>
    </article>
  );
}
