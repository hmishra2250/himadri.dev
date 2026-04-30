import { SectionHeader } from "@/components/ui/SectionHeader";
import { hiringFit } from "@/content/hiring-fit";

export function HiringFitMatrix() {
  return (
    <section className="section-pad alt" aria-labelledby="fit-title">
      <div className="container">
        <SectionHeader
          eyebrow="Hiring fit matrix"
          title="Clear enough to pitch. Concrete enough to inspect."
          titleId="fit-title"
          description="Each signal is tied to a concrete evidence path instead of a generic skill label."
        />
        <div className="fit-table">
          {hiringFit.map((item) => (
            <div className="fit-row" key={item.signal}>
              <strong>{item.signal}</strong>
              <span>{item.evidence}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
