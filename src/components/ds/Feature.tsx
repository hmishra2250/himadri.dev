import type { MetricRef } from "./MetricTiles";
import { Refs } from "./Refs";

/** The lead piece of work in a panel: the story and its evidence on the left, before-and-after rows on the right. */
export function Feature({
  meta,
  title,
  line,
  rows,
  refs,
}: {
  meta: string;
  title: string;
  line: string;
  rows: readonly (readonly [label: string, text: string])[];
  refs: readonly MetricRef[];
}) {
  return (
    <div className="hm-feature">
      <div className="hm-feature-main">
        <div>
          <h3 className="hm-h3">{title}</h3>
          <p className="hm-meta">{meta}</p>
        </div>
        <p className="hm-feature-line">{line}</p>
        <Refs refs={refs} />
      </div>
      <dl className="hm-feature-rows">
        {rows.map(([label, text]) => (
          <div key={label}>
            <dt className="hm-label">{label}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
