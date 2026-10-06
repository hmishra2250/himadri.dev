export type Ref = { text: string; label: string; href: string };

/** Columns of references, such as pull requests, separated by space. */
export function RefGroups({
  intro,
  groups,
}: {
  intro?: string;
  groups: readonly { title: string; refs: readonly Ref[] }[];
}) {
  return (
    <div>
      {intro ? (
        <p className="hm-label hm-label--plain hm-groups-intro">{intro}</p>
      ) : null}
      <div className="hm-groups">
        {groups.map((group) => (
          <div className="hm-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="hm-ref-list">
              {group.refs.map((ref) => (
                <li key={ref.href}>
                  <span>{ref.text}</span>
                  <a className="hm-ref" href={ref.href}>
                    {ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
