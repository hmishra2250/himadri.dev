import Link from "next/link";
import { stackOpinions } from "@/content/stack-opinions";

function opinionCtaLabel(id: string) {
  if (id === "unit-economics") return "Open cost model";
  if (id === "highcharts-for-ai-products") return "See chart workflow";
  return "Read related case study";
}

export function StackOpinions() {
  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Production AI beliefs</p>
        <h1>Stack opinions backed by systems I have operated</h1>
        <p className="hero-subtitle">
          Strong opinions, lightly held. The point is not tool tribalism, it is
          knowing where correctness, cost, and recovery boundaries belong.
        </p>
        <div className="opinion-list">
          {stackOpinions.map((opinion) => (
            <article className="evidence-card" key={opinion.id}>
              <h2>{opinion.title}</h2>
              <p className="evidence">{opinion.statement}</p>
              <p>{opinion.nuance}</p>
              <p className="muted">Evidence: {opinion.evidence}</p>
              <div className="card-footer-row">
                <Link href={opinion.relatedHref}>
                  {opinionCtaLabel(opinion.id)}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
