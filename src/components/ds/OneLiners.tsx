import type { OneLiner } from "@/content/site";

/** One line per project; a name links only when the repository is public. */
export function OneLiners({ items }: { items: readonly OneLiner[] }) {
  return (
    <ul className="hm-oneliners">
      {items.map((item) => (
        <li key={item.name}>
          <span>
            {item.href ? (
              <a href={item.href}>{item.name}</a>
            ) : (
              <span className="hm-oneliner-name">{item.name}</span>
            )}
            {": "}
            {item.line}
          </span>
          {item.meta ? (
            <span className="hm-oneliner-meta">{item.meta}</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
