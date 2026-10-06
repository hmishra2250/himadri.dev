import type { MetricRef } from "./MetricTiles";
import { Refs } from "./Refs";

export type LaunchItem = {
  title: string;
  line: string;
  /** A measured before-and-after, shown above the line */
  result?: { value: string; label: string };
  refs: readonly MetricRef[];
};

/** Shipped work as tiles: a title, the result, one line on what changed, and evidence links. */
export function Launches({ items }: { items: readonly LaunchItem[] }) {
  return (
    <div className="hm-launches">
      {items.map((item) => (
        <div className="hm-tile" key={item.title}>
          <h3>{item.title}</h3>
          {item.result ? (
            <div className="hm-launch-result">
              <span className="hm-launch-result-value">
                {item.result.value}
              </span>
              <span className="hm-launch-result-label">
                {item.result.label}
              </span>
            </div>
          ) : null}
          <p>{item.line}</p>
          <Refs refs={item.refs} />
        </div>
      ))}
    </div>
  );
}
