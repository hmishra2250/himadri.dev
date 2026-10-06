export type LoopSystem = { name?: string; line: string };

export type LoopStep = {
  name: string;
  cadence: string;
  systems: readonly LoopSystem[];
};

/**
 * A repeating sequence of numbered steps, each a tile listing the systems that
 * do it. A step with several systems spans the row. `shared` is a row under
 * the steps for what every step feeds.
 */
export function Loop({
  steps,
  shared,
}: {
  steps: readonly LoopStep[];
  shared?: { name: string; line: string };
}) {
  return (
    <div className="hm-loop-wrap">
      <ol className="hm-loop">
        {steps.map((step, index) => (
          <li
            key={step.name}
            className={
              step.systems.length > 1
                ? "hm-loop-step hm-loop-step--wide"
                : "hm-loop-step"
            }
          >
            <p className="hm-loop-head">
              <span className="hm-loop-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="hm-loop-name">{step.name}</span>
              <span className="hm-label">{step.cadence}</span>
            </p>
            <div className="hm-loop-systems">
              {step.systems.map((system) => (
                <div key={system.name ?? system.line}>
                  {system.name ? (
                    <h3 className="hm-loop-system">{system.name}</h3>
                  ) : null}
                  <p>{system.line}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
      {shared ? (
        <div className="hm-loop-shared">
          <h3 className="hm-loop-system">{shared.name}</h3>
          <p>{shared.line}</p>
        </div>
      ) : null}
    </div>
  );
}
