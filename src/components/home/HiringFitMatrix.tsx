import { SectionHeader } from "@/components/ui/SectionHeader";
import { hiringFit } from "@/content/hiring-fit";

export function HiringFitMatrix() {
  const usefulSignals = hiringFit.slice(0, 4);

  return (
    <section
      className="section-pad alt"
      id="hiring-fit"
      aria-labelledby="fit-title"
    >
      <div className="container">
        <SectionHeader
          eyebrow="Where I am useful"
          title="The work is strongest when AI needs ownership, not theater."
          titleId="fit-title"
          description="The best fit is a team turning messy workflows into reliable AI software with artifacts, evals, observability, and cost control."
        />
        <div className="fit-table">
          {usefulSignals.map((item) => (
            <article className="fit-row" key={item.signal}>
              <strong>{item.signal}</strong>
              <span>{item.evidence}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
