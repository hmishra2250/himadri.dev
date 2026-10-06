import type { MetricRef } from "./MetricTiles";
import { Refs } from "./Refs";

export type WorkCardItem = {
  title: string;
  meta?: string;
  story?: string;
  points: readonly { label?: string; text: string }[];
  refs: readonly MetricRef[];
  /** Spans the row, with the story beside the points */
  wide?: boolean;
};

/**
 * Work as cards on a pearl-warm fill. Only the title is set large; the story,
 * the points (with an optional lead-in label) and the evidence stay small.
 * Wide cards hold the largest pieces of work.
 */
export function WorkCards({ items }: { items: readonly WorkCardItem[] }) {
  return (
    <div className="hm-work-cards">
      {items.map((item) => (
        <article
          key={item.title}
          className={
            item.wide
              ? "hm-tile hm-work-card hm-work-card--wide"
              : "hm-tile hm-work-card"
          }
        >
          <div>
            <h3>{item.title}</h3>
            {item.meta ? <p className="hm-meta">{item.meta}</p> : null}
          </div>
          <div className="hm-work-card-body">
            {item.story ? (
              <p className="hm-work-card-story">{item.story}</p>
            ) : null}
            <ul className="hm-bullets">
              {item.points.map((point) => (
                <li key={point.text}>
                  {point.label ? (
                    <span className="hm-work-card-label">{point.label}: </span>
                  ) : null}
                  {point.text}
                </li>
              ))}
            </ul>
          </div>
          <Refs refs={item.refs} />
        </article>
      ))}
    </div>
  );
}
