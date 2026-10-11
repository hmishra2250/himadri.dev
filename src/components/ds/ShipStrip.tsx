import { Status } from "./Label";

export type ShipItem = {
  when: string;
  source: string;
  title: string;
  text: string;
  href: string;
  go: string;
};

const goArrow = (href: string) =>
  href.startsWith("/#") ? "↓" : href.startsWith("/") ? "→" : "↗";

/**
 * The hero's strip of recently shipped work: pearl-warm with a cobalt top
 * rule, one column per item, each a link to its evidence.
 */
export function ShipStrip({
  label,
  period,
  items,
}: {
  label: string;
  period: string;
  items: readonly ShipItem[];
}) {
  return (
    <aside className="hm-ship" aria-label={label}>
      <div className="hm-ship-head">
        <span className="hm-ship-label">
          <span className="hm-label hm-label--ink">{label}</span>
          <span className="hm-tab-count">{period}</span>
        </span>
      </div>
      <ol className="hm-ship-list">
        {items.map((item) => (
          <li key={item.title}>
            <a href={item.href}>
              <span className="hm-ship-top">
                <span className="hm-row-num">{item.when}</span>
                <Status>{item.source}</Status>
              </span>
              <span className="hm-ship-title">{item.title}</span>
              <span className="hm-ship-eng">{item.text}</span>
              <span className="hm-ship-go">
                {item.go}
                <span className="hm-button-icon" aria-hidden="true">
                  {goArrow(item.href)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
