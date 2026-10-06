import { Refs } from "./Refs";

export type MetricRef = { label: string; href: string; title?: string };

export type Metric = {
  value: string;
  label: string;
  refs?: readonly MetricRef[];
};

/** Outcome figures as tiles: mono value, plain label, optional source links. */
export function MetricTiles({ items }: { items: readonly Metric[] }) {
  return (
    <div className="hm-metric-tiles">
      {items.map((item) => (
        <div className="hm-metric-tile" key={item.label}>
          <span className="hm-metric-tile-value">{item.value}</span>
          <span className="hm-metric-tile-label">{item.label}</span>
          {item.refs ? <Refs refs={item.refs} /> : null}
        </div>
      ))}
    </div>
  );
}
