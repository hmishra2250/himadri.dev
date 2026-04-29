import Link from "next/link";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { stackOpinions } from "@/content/stack-opinions";

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
                <Link href={opinion.relatedHref}>Inspect the evidence</Link>
                {opinion.proofIds.map((proofId) => (
                  <SourceBadge proofId={proofId} key={proofId} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
