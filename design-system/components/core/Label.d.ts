import * as React from "react";
/** IBM Plex Mono 12px / 500 uppercase label for metadata, eyebrows and table headers. */
export interface LabelProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "muted" | "cobalt" | "ink";
  /** Sentence case, no tracking */
  plain?: boolean;
  as?: "span" | "p" | "div" | "h2" | "h3" | "dt";
  children?: React.ReactNode;
}
export declare function Label(props: LabelProps): JSX.Element;
