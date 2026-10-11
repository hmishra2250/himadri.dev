export type WorkRowItem = {
  title: string;
  summary?: string;
  /** Mono note on the right: a status, a year or a star count */
  meta?: string;
  /** Omit for work without a public link; the row renders as text */
  href?: string;
};

/**
 * Numbered rows under a graphite rule, compact for long lists. A row with a
 * link opens it (↗); a row without one is plain text. Summaries are always
 * visible.
 */
export function WorkRows({ items }: { items: readonly WorkRowItem[] }) {
  return (
    <div className="hm-rows hm-rows--compact">
      {items.map((item, index) => {
        const num = String(index + 1).padStart(2, "0");
        const cells = (
          <>
            <span className="hm-row-num">{num}</span>
            <span className="hm-row-title">{item.title}</span>
            <span className="hm-row-meta">{item.meta}</span>
            <span className="hm-row-toggle" aria-hidden="true">
              {item.href ? "↗" : ""}
            </span>
          </>
        );
        return (
          <div
            key={item.title}
            className={
              item.href ? "hm-row hm-row--link" : "hm-row hm-row--static"
            }
          >
            {item.href ? (
              <a className="hm-row-trigger" href={item.href}>
                {cells}
              </a>
            ) : (
              <div className="hm-row-trigger">{cells}</div>
            )}
            {item.summary ? (
              <div className="hm-row-summary-wrap">
                <p className="hm-row-summary">{item.summary}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
