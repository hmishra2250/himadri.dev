import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { metrics } from "@/content/metrics";

export function ProofWall() {
  return (
    <section className="section-pad" aria-labelledby="proof-title">
      <div className="container">
        <SectionHeader
          eyebrow="Proof wall"
          title="Metrics with context, not isolated numbers."
          description="The strongest claims are resume-backed and tied to systems, constraints, and outcomes."
        />
        <div className="metric-grid" id="proof-title">
          {metrics.map((metric) => (
            <MetricCard metric={metric} key={metric.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
