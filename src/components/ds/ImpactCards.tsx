import { Disclosure } from "./Disclosure";
import type { MetricRef } from "./MetricTiles";
import { Refs } from "./Refs";

export type ImpactCardItem = {
  title: string;
  /** A measured before-and-after, shown first */
  result?: { value: string; label: string };
  line?: string;
  /** Smaller work gathered into one card, one line each */
  rows?: readonly { name: string; line: string; refs: readonly MetricRef[] }[];
  /** Collapsed: how it was done, and the evidence */
  more?: { text: string; refs: readonly MetricRef[] };
};

/**
 * Impact as cards, two to a row: the title, the result or one line, and a
 * collapsed "Details" with how it was done and the pull requests.
 */
export function ImpactCards({ items }: { items: readonly ImpactCardItem[] }) {
  return (
    <div className="hm-impact-cards">
      {items.map((item) => (
        <article className="hm-tile hm-impact-card" key={item.title}>
          <h3>{item.title}</h3>
          {item.result ? (
            <div className="hm-impact-result">
              <span className="hm-impact-result-value">
                {item.result.value}
              </span>
              <span className="hm-impact-result-label">
                {item.result.label}
              </span>
            </div>
          ) : null}
          {item.line ? <p className="hm-impact-line">{item.line}</p> : null}
          {item.rows ? (
            <ul className="hm-impact-rows">
              {item.rows.map((row) => (
                <li key={row.name}>
                  <span className="hm-impact-row-name">{row.name}</span>
                  <span>{row.line}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {item.more ? (
            <Disclosure label="Details">
              <p>{item.more.text}</p>
              <Refs refs={item.more.refs} />
            </Disclosure>
          ) : null}
          {item.rows ? (
            <Disclosure label="Pull requests">
              {item.rows.map((row) => (
                <div className="hm-impact-ref-group" key={row.name}>
                  <span className="hm-label">{row.name}</span>
                  <Refs refs={row.refs} />
                </div>
              ))}
            </Disclosure>
          ) : null}
        </article>
      ))}
    </div>
  );
}
