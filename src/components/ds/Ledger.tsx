import { Button } from "./Actions";

export type LedgerItem = {
  when: string;
  text: string;
  /** A public link or a homepage section such as /#now */
  href: string;
  source: string;
};

/**
 * A framed, dated list of shipped work. The last row fades and a full-width
 * call to action closes the panel, so it reads as a preview of the record.
 */
export function Ledger({
  label,
  items,
  note,
  cta,
}: {
  label: string;
  items: readonly LedgerItem[];
  note: string;
  cta: { label: string; href: string };
}) {
  return (
    <aside className="hm-panel hm-ledger" aria-labelledby="ledger-title">
      <p className="hm-panel-tab">
        <span id="ledger-title" className="hm-label hm-label--ink">
          {label}
        </span>
      </p>
      <ol className="hm-ledger-list">
        {items.map((item) => (
          <li key={item.text}>
            <a href={item.href} className="hm-ledger-link">
              <span
                className={
                  item.when === "Now"
                    ? "hm-ledger-when hm-ledger-when--now"
                    : "hm-ledger-when"
                }
              >
                {item.when === "Now" ? (
                  <span className="hm-dot" aria-hidden="true" />
                ) : null}
                {item.when}
              </span>
              <span className="hm-ledger-body">
                <span className="hm-ledger-text">{item.text}</span>
                <span className="hm-ledger-source">
                  {item.source}
                  <span className="hm-button-icon" aria-hidden="true">
                    {item.href.startsWith("/") ? "↓" : "↗"}
                  </span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div className="hm-ledger-foot">
        <p className="hm-ledger-note">{note}</p>
        <Button
          href={cta.href}
          variant="primary"
          arrow="↓"
          className="hm-ledger-cta"
        >
          {cta.label}
        </Button>
      </div>
    </aside>
  );
}
