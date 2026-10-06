import type { ReactNode } from "react";

/** A soft-filled block inside a panel: title, mono meta line, then content. */
export function Tile({
  title,
  meta,
  className,
  children,
}: {
  title?: string;
  meta?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className ? `hm-tile ${className}` : "hm-tile"}>
      {title ? (
        <div>
          <h3 className="hm-h3">{title}</h3>
          {meta ? <p className="hm-meta">{meta}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/** A tile that carries a short note under a cobalt label. */
export function NoteTile({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="hm-tile hm-note-tile">
      <span className="hm-label hm-label--cobalt">{label}</span>
      {children}
    </div>
  );
}
