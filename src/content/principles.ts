export type Principle = {
  id: string;
  title: string;
  statement: string;
  evidence: string;
  proofId: string;
  href: string;
};

export const principles: Principle[] = [
  {
    id: "explicit-control-flow",
    title: "Production agents need explicit control flow.",
    statement:
      "Free-form loops are useful for prototypes; production workflows need debuggable state, retries, dependency control, and observable execution.",
    evidence:
      "Built DAG-based orchestration for parallel AI insight execution.",
    proofId: "knit-observability-platform",
    href: "/case-studies/agentic-market-research-platform#decision-theater",
  },
  {
    id: "evaluation-path",
    title: "Every LLM output needs an evaluation path.",
    statement:
      "If a system cannot verify outputs, it cannot be trusted for business-critical work.",
    evidence:
      "Implemented independent judge verification with separate sandbox execution.",
    proofId: "knit-sandbox-tasks",
    href: "/case-studies/agentic-market-research-platform#evaluation",
  },
  {
    id: "observability-product",
    title: "Observability is part of the product.",
    statement:
      "LLM systems are not production-ready until prompts, calls, traces, failures, latency, cost, and business correctness can be inspected.",
    evidence:
      "Unified agents with Langfuse, OpenTelemetry, structured traces, and cost visibility.",
    proofId: "knit-observability-platform",
    href: "/case-studies/agentic-market-research-platform#observability",
  },
  {
    id: "intermediate-representations",
    title: "Intermediate representations make AI systems debuggable.",
    statement:
      "Direct generation is fragile. IRs create inspectable boundaries between reasoning, rendering, and export.",
    evidence:
      "Built memo-to-deck and HTML-to-native-PPTX pipeline around a deck IR.",
    proofId: "knit-observability-platform",
    href: "/case-studies/agentic-market-research-platform#architecture",
  },
  {
    id: "unit-economics",
    title: "Cost and latency are product features.",
    statement:
      "A system that works but cannot be afforded or debugged is not production-ready.",
    evidence:
      "Reduced ML infra costs by 10x and designed reusable sandbox execution patterns.",
    proofId: "epic-cost-reduction",
    href: "/case-studies/ml-infra-rescue",
  },
];
