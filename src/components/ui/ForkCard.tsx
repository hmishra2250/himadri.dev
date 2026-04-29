import type { DecisionFork } from "@/content/case-studies";

export function ForkCard({ fork }: { fork: DecisionFork }) {
  return (
    <article
      className="fork-card"
      id={fork.title.toLowerCase().replaceAll(" ", "-")}
    >
      <p className="eyebrow">Decision fork</p>
      <h3>{fork.title}</h3>
      <p className="muted">{fork.context}</p>
      <div className="fork-options">
        {fork.options.map((option, index) => (
          <div
            className={
              index === fork.chosenOptionIndex
                ? "fork-option chosen"
                : "fork-option"
            }
            key={option.label}
          >
            <h4>{option.label}</h4>
            <div>
              <strong>Pros</strong>
              <ul>
                {option.pros.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Cons</strong>
              <ul>
                {option.cons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <p className="chosen-line">
        Chosen: <strong>{fork.chosen}</strong>. {fork.why}
      </p>
    </article>
  );
}
