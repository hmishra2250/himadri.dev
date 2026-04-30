import Link from "next/link";
import { ForkCard } from "@/components/ui/ForkCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { flagshipCaseStudy } from "@/content/case-studies";

export function DecisionTheaterPreview() {
  return (
    <section className="section-pad alt" aria-labelledby="decision-title">
      <div className="container">
        <SectionHeader
          eyebrow="Decision Theater"
          title="What was rejected matters as much as what shipped."
          titleId="decision-title"
          description="Senior engineering signal comes from tradeoffs: control flow, verification, cost, artifact boundaries, and recovery behavior."
        />
        <div className="decision-preview">
          {flagshipCaseStudy.decisions.slice(0, 2).map((fork) => (
            <ForkCard fork={fork} key={fork.title} />
          ))}
        </div>
        <Link
          className="button secondary"
          href={`/case-studies/${flagshipCaseStudy.slug}#decision-theater`}
        >
          See Knit decision forks
        </Link>
      </div>
    </section>
  );
}
