import { MetricCard } from "@/components/ui/MetricCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { metrics } from "@/content/metrics";

export function ProofWall() {
  const primaryMetrics = [...metrics]
    .sort((left, right) => left.priority - right.priority)
    .slice(0, 4);

  return (
    <section className="section-pad" aria-labelledby="proof-title">
      <div className="container">
        <SectionHeader
          eyebrow="Proof wall"
          title="Metrics with context, not isolated numbers."
          titleId="proof-title"
          description="The strongest claims connect outcomes to systems, constraints, and evidence."
        />
        <div className="metric-grid">
          {primaryMetrics.map((metric) => (
            <MetricCard metric={metric} key={metric.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
