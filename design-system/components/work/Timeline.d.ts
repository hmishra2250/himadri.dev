import * as React from "react";
/** Year/event list with tabular mono years; a "Now" row is highlighted in cobalt. */
export interface TimelineProps { items: [string, string][]; }
export declare function Timeline(props: TimelineProps): JSX.Element;
/** Row of mono figures under a graphite rule. Only for historical, sourced results. */
export interface MetricStripProps { items: [string, string][]; }
export declare function MetricStrip(props: MetricStripProps): JSX.Element;
/** Pearl-warm callout with a 2px cobalt left rule, for provenance and privacy notes. */
export interface NoteProps { label?: string; children?: React.ReactNode; }
export declare function Note(props: NoteProps): JSX.Element;
