import Link from "next/link";
import { ForkCard } from "@/components/ui/ForkCard";
import { flagshipCaseStudy } from "@/content/case-studies";

export function DecisionTheaterPreview() {
  return (
    <section
      className="section-pad decision-section"
      aria-labelledby="decision-title"
    >
      <div className="container">
        <div className="section-header wide">
          <h2 id="decision-title">
            The useful signal is often what gets rejected.
          </h2>
          <p className="section-description">
            Production AI work needs explicit tradeoffs: what is safer, what is
            faster, and what the system can actually verify.
          </p>
        </div>
        <div className="decision-preview">
          {flagshipCaseStudy.decisions.slice(0, 1).map((fork) => (
            <ForkCard fork={fork} key={fork.title} />
          ))}
        </div>
        <div className="card-footer-row">
          <Link
            className="button ghost"
            href={`/case-studies/${flagshipCaseStudy.slug}#decision-theater`}
          >
            Read the decision trail
          </Link>
        </div>
      </div>
    </section>
  );
}
