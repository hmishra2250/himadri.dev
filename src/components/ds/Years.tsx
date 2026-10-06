export type YearEntry = { years: string; name: string; line: string };

/** Year and one-line rows, without rules between them. */
export function Years({ items }: { items: readonly YearEntry[] }) {
  return (
    <ol className="hm-years">
      {items.map((item) => (
        <li key={item.name}>
          <span className="hm-years-year">{item.years}</span>
          <span>
            <strong className="hm-years-name">{item.name}</strong>, {item.line}
          </span>
        </li>
      ))}
    </ol>
  );
}
