import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { principles } from "@/content/principles";

function principleCtaLabel(id: string) {
  if (id === "unit-economics") return "Open cost model";
  if (id === "intermediate-representations") return "See workflow";
  return "Read case study";
}

export function HowIThink() {
  return (
    <section
      className="section-pad alt"
      id="thinking"
      aria-labelledby="thinking-title"
    >
      <div className="container">
        <SectionHeader
          eyebrow="How I think"
          title="Production AI is a systems discipline."
          titleId="thinking-title"
          description="The best AI systems are observable, evaluable, controllable, and useful under real constraints."
        />
        <div className="principle-grid">
          {principles.map((principle) => (
            <article className="principle-card" key={principle.id}>
              <h3>{principle.title}</h3>
              <p>{principle.statement}</p>
              <p className="evidence">Evidence: {principle.evidence}</p>
              <div className="card-footer-row">
                <Link href={principle.href}>
                  {principleCtaLabel(principle.id)}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
