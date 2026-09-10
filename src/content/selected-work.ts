export type SelectedWork = {
  id: string;
  category: string;
  title: string;
  summary: string;
  href: string;
  linkLabel: string;
  proofIds: string[];
  metricId?: string;
};

// A curated introduction, not another copy of the complete work archive.
export const selectedWork: SelectedWork[] = [
  {
    id: "selected-agent-tools",
    category: "Agent-facing products",
    title: "Tools agents can use.",
    summary:
      "I shipped MCP authentication and onboarding, and built the discovery, routing and evaluation systems around them. The work connects getting access to choosing the right tool and checking the result.",
    href: "/case-studies#agent-tools",
    linkLabel: "Explore the agent tooling work",
    proofIds: [
      "method-auth-aware-onboarding",
      "method-discovery-retrieval-measurement",
      "method-agent-routing-surfaces",
      "method-multi-harness-ax-experiments",
    ],
  },
  {
    id: "selected-research-platform",
    category: "Production AI",
    title: "Research turned into finished reports.",
    summary:
      "I architected a production research workflow that connects analysis, independent checks, charts and report generation. The engineering challenge was making the whole output trustworthy, not just generating fluent text.",
    href: "/case-studies/agentic-market-research-platform",
    linkLabel: "Read the research platform case study",
    proofIds: [
      "knit-turnaround",
      "knit-sandbox-tasks",
      "knit-charts",
      "knit-observability-platform",
    ],
    metricId: "turnaround",
  },
  {
    id: "selected-ml-infrastructure",
    category: "Production ML",
    title: "ML infrastructure rebuilt for efficiency.",
    summary:
      "I took ownership of production ML infrastructure supporting search, discovery and recommendations, then simplified the platform to reduce cost and operational overhead.",
    href: "/case-studies/ml-infra-rescue",
    linkLabel: "Read the ML infrastructure case study",
    proofIds: ["epic-cost-reduction", "epic-pod-reduction"],
    metricId: "infra-cost",
  },
];
