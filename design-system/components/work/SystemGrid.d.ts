import * as React from "react";
/**
 * Shared-border 3-column grid of linked system cards; hover fills pearl-warm.
 * @startingPoint section="Work" subtitle="Shared-border grid of shipped systems" viewport="1200x460"
 */
export interface SystemCardProps {
  status?: string;
  title: string;
  summary: string;
  bullets?: string[];
  action?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}
export declare function SystemCard(props: SystemCardProps): JSX.Element;
export interface SystemGridProps { children?: React.ReactNode; }
export declare function SystemGrid(props: SystemGridProps): JSX.Element;
