import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ForkCard } from "@/components/ui/ForkCard";
import { flagshipCaseStudy } from "@/content/case-studies";

export function DecisionTheaterPreview() {
  return (
    <section className="section-pad" aria-labelledby="decision-title">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">Decision theater</p>
          <h2 id="decision-title" className="display-serif">
            What I rejected matters as much as what I <em>shipped.</em>
          </h2>
          <p className="section-description">
            Staff-level judgment shows in trade-offs, not just outcomes.
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
            See more decisions
            <ArrowRight className="icon icon-md" />
          </Link>
        </div>
      </div>
    </section>
  );
}
