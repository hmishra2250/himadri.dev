import type { MetricRef } from "./MetricTiles";

export type LaunchItem = {
  title: string;
  line: string;
  refs: readonly MetricRef[];
};

/** Shipped work as tiles: a title, one line on what changed, and evidence links. */
export function Launches({ items }: { items: readonly LaunchItem[] }) {
  return (
    <div className="hm-launches">
      {items.map((item) => (
        <div className="hm-tile" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.line}</p>
          <span className="hm-refs">
            {item.refs.map((ref) => (
              <a
                key={ref.href}
                className="hm-ref"
                href={ref.href}
                title={ref.title}
              >
                {ref.label}
              </a>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
