import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { principles } from "@/content/principles";

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
                <Link href={principle.href}>Inspect evidence</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
