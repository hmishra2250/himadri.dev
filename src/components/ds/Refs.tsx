import type { MetricRef } from "./MetricTiles";

/** A wrapping row of mono evidence links, such as pull requests. */
export function Refs({ refs }: { refs: readonly MetricRef[] }) {
  if (!refs.length) return null;
  return (
    <span className="hm-refs">
      {refs.map((ref) => (
        <a key={ref.href} className="hm-ref" href={ref.href} title={ref.title}>
          {ref.label}
        </a>
      ))}
    </span>
  );
}
