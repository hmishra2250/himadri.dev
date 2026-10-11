export type EvidenceItem = {
  /** What the change did, in plain language */
  label: string;
  /** Mono reference, such as "firecrawl-mcp-server #308" */
  reference: string;
  href: string;
};

/** Evidence links as ruled rows: what changed, then the mono reference. */
export function Evidence({ items }: { items: readonly EvidenceItem[] }) {
  return (
    <ul className="hm-evidence">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href}>
            <span>{item.label}</span>
            <span className="hm-evidence-ref">
              {item.reference} <span aria-hidden="true">↗</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
