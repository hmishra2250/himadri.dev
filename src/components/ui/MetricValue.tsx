type MetricValueProps = {
  value: string;
  tone?: "hero" | "card";
};

export function MetricValue({ value, tone = "card" }: MetricValueProps) {
  const [before, after] = value.split("→").map((part) => part.trim());
  const className = `metric-value ${tone === "hero" ? "hero-metric-value" : ""}`;

  if (!before || !after) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={`${className} metric-value-comparison`}>
      <span className="metric-number">{before}</span>
      <span className="metric-arrow" aria-hidden="true">
        →
      </span>
      <span className="metric-number">{after}</span>
    </span>
  );
}
