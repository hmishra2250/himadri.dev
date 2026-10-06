import * as React from "react";
/** Underlined text tabs with mono counts, used to filter the Work index. */
export interface TabsProps {
  items: { id: string; label: string; count?: number }[];
  value?: string;
  onChange?: (id: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
