export type StackOpinion = {
  id: string;
  title: string;
  statement: string;
  nuance: string;
  evidence: string;
  proofIds: string[];
  relatedHref: string;
};

export const stackOpinions: StackOpinion[] = [
  {
    id: "explicit-boundaries",
    title: "Production agents need explicit boundaries.",
    statement:
      "Free-form loops are useful for exploration, but production systems need inspectable state, typed interfaces, retries, and failure recovery.",
    nuance:
      "Autonomy is valuable only when the surrounding system makes behavior observable and recoverable.",
    evidence:
      "DAG orchestration and task-level execution in the market research platform.",
    proofIds: ["knit-observability-platform"],
    relatedHref: "/case-studies/agentic-market-research-platform#architecture",
  },
  {
    id: "frameworks-are-not-architecture",
    title: "Frameworks help prototypes, but architecture lives in boundaries.",
    statement:
      "LangChain and LangGraph can be useful, but durable systems need domain-specific evaluation, observability, retry, and cost boundaries.",
    nuance:
      "The strongest question is not which library is fashionable. The question is where correctness, state, and recovery live.",
    evidence:
      "Shared Python agent platform with multi-provider routing, tracing, and generated APIs.",
    proofIds: ["knit-observability-platform"],
    relatedHref:
      "/case-studies/agentic-market-research-platform#decision-theater",
  },
  {
    id: "observability-beyond-prompts",
    title: "AI observability should be artifact-aware, not only prompt-aware.",
    statement:
      "Prompts matter, but debugging production AI needs spans, costs, retries, model routing, generated artifacts, and business correctness checks.",
    nuance:
      "A pretty trace is not enough unless it helps explain and fix the failure mode.",
    evidence:
      "OpenTelemetry and Langfuse-backed instrumentation for AI workflow execution.",
    proofIds: ["knit-observability-platform"],
    relatedHref: "/case-studies/agentic-market-research-platform#observability",
  },
  {
    id: "intermediate-representations",
    title: "Intermediate representations make AI artifacts debuggable.",
    statement:
      "When AI generates complex deliverables, direct output is fragile. IRs make systems inspectable, testable, and renderer-agnostic.",
    nuance:
      "Deck IR separated reasoning about slide structure from rendering into HTML preview and native PowerPoint.",
    evidence:
      "Deck IR to HTML preview to native PPTX export in the market research platform.",
    proofIds: ["knit-charts"],
    relatedHref: "/case-studies/agentic-market-research-platform#architecture",
  },

  {
    id: "highcharts-for-ai-products",
    title: "Highcharts is underrated for AI products.",
    statement:
      "AI products often need trustworthy analytical artifacts more than novelty charts. Mature charting tools help turn generated analysis into reviewable product output.",
    nuance:
      "The important part is not the library brand. It is the boundary between generated insight, chart specification, visual quality scoring, and final artifact rendering.",
    evidence:
      "15-25 Highcharts charts per report with multi-threshold quality scoring in the market research workflow.",
    proofIds: ["knit-charts"],
    relatedHref: "/case-studies/agentic-market-research-platform#architecture",
  },
  {
    id: "unit-economics",
    title: "Unit economics are part of AI architecture.",
    statement:
      "A workflow that works but cannot be afforded is not production-ready.",
    nuance:
      "Cost controls belong in routing, caching, retry limits, judge coverage, and infra choices, not in a post-launch spreadsheet.",
    evidence:
      "ML infrastructure cost reduction and cost-aware AI workflow patterns.",
    proofIds: ["epic-cost-reduction", "epic-pod-reduction"],
    relatedHref: "/challenges/cost-anatomy",
  },
];
