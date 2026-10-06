import * as React from "react";
interface FooterLink { label: string; href?: string; id?: string; external?: boolean; }
/** Graphite-ruled footer: name + role, Pages and Elsewhere columns, mono colophon row. */
export interface SiteFooterProps {
  name?: string;
  role?: string;
  pages?: FooterLink[];
  elsewhere?: FooterLink[];
  year?: number;
  colophon?: string;
  onNavigate?: (id: string) => void;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;
