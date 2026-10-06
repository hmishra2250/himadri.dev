import * as React from "react";
/** Route title block stacked on one left edge: cobalt mono label, h1 (max 780px), lead, actions, then optional full-width children such as <SpecList columns={3}/>. */
export interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  intro?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
