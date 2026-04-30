import Link from "next/link";
import type { Metric } from "@/content/metrics";

export function MetricCard({ metric }: { metric: Metric }) {
  const content = (
    <article className="metric-card">
      <div className="metric-value">{metric.value}</div>
      <h3>{metric.label}</h3>
      <p>{metric.context}</p>
    </article>
  );

  if (!metric.href) return content;
  return (
    <Link
      href={metric.href}
      className="card-link"
      aria-label={`${metric.label}: ${metric.context}`}
    >
      {content}
    </Link>
  );
}
