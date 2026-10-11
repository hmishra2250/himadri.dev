export type PipelineStep = { title: string; detail?: string };

/**
 * Numbered steps on a graphite rail with cobalt square nodes. Vertical inside
 * an hm-figure; horizontal across the width otherwise.
 */
export function Pipeline({
  steps,
  vertical,
}: {
  steps: readonly PipelineStep[];
  vertical?: boolean;
}) {
  return (
    <figure>
      <ol
        className={
          vertical ? "hm-pipeline hm-pipeline--vertical" : "hm-pipeline"
        }
        style={vertical ? undefined : { ["--n" as string]: steps.length }}
      >
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="hm-pipeline-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="hm-pipeline-title">{step.title}</span>
            {step.detail ? (
              <span className="hm-pipeline-detail">{step.detail}</span>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
