import * as React from "react";
/**
 * Sticky 64px frosted header: name + mono role on the left, text nav + quiet Resume button on the right.
 * @startingPoint section="Layout" subtitle="Sticky frosted header" viewport="1200x80"
 */
export interface SiteHeaderProps {
  name?: string;
  /** Mono role line next to the name (hidden under 720px) */
  role?: string;
  links?: { label: string; id?: string; href?: string }[];
  active?: string;
  resumeHref?: string;
  /** Prototype hook; called with link id ("home" for the brand) */
  onNavigate?: (id: string) => void;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
