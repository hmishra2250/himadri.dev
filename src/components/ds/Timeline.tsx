import type { ReactNode } from "react";

export type TimelineItem = { years: string; event: ReactNode };

/** Year and event rows separated by hairlines. */
export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className="hm-timeline">
      {items.map((item) => (
        <li key={item.years} data-now={item.years === "Now"}>
          <span className="hm-timeline-year">{item.years}</span>
          <span className="hm-timeline-event">{item.event}</span>
        </li>
      ))}
    </ol>
  );
}
