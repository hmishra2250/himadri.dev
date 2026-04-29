export type SystemDiagram = {
  id: string;
  title: string;
  caption: string;
  publicLabel: string;
  proofIds: string[];
  nodes: { id: string; label: string; detail: string }[];
};

export const flagshipDiagrams: SystemDiagram[] = [
  {
    id: "research-workflow-boundaries",
    title: "Research workflow boundaries",
    caption:
      "A sanitized view of how raw survey data became verified insights, chart specs, and deck artifacts through explicit boundaries.",
    publicLabel:
      "Sanitized architecture diagram. Customer data, private prompts, internal datasets, and proprietary implementation details omitted.",
    proofIds: ["knit-turnaround", "knit-sandbox-tasks", "knit-charts"],
    nodes: [
      {
        id: "data",
        label: "Survey data",
        detail: "Ingest and normalize schema.",
      },
      {
        id: "plan",
        label: "Task plan",
        detail: "Break report into typed analysis tasks.",
      },
      {
        id: "execute",
        label: "Sandbox execution",
        detail: "Generate and run auditable Python.",
      },
      {
        id: "verify",
        label: "Independent judge",
        detail: "Recompute and inspect high-risk outputs.",
      },
      {
        id: "artifact",
        label: "Deck IR",
        detail: "Render charts and slides from inspectable structure.",
      },
    ],
  },
  {
    id: "observability-cost-loop",
    title: "Observability and cost loop",
    caption:
      "Trace spans, model routes, retry budgets, and normalized cost counters make production AI failures debuggable.",
    publicLabel:
      "Representative systems diagram. Exact company costs and internal traces omitted.",
    proofIds: ["knit-observability-platform", "representative-trace-label"],
    nodes: [
      {
        id: "span",
        label: "Span",
        detail: "Latency, model, status, and task class.",
      },
      {
        id: "route",
        label: "Route",
        detail: "Select model by risk and value.",
      },
      {
        id: "budget",
        label: "Budget",
        detail: "Detect node-level cost anomalies.",
      },
      { id: "retry", label: "Retry", detail: "Recover only where useful." },
      {
        id: "review",
        label: "Review",
        detail: "Improve routing and eval policy.",
      },
    ],
  },
];
