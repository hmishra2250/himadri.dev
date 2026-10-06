import * as React from "react";
/** Inline 15px medium link with a trailing unicode arrow that nudges on hover. */
export interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** → internal, ↗ external, ↓ in-page */
  arrow?: string;
  tone?: "cobalt" | "ink";
  children?: React.ReactNode;
}
export declare function ArrowLink(props: ArrowLinkProps): JSX.Element;
