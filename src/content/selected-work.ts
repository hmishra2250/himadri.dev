export type SelectedWork = {
  id: string;
  category: string;
  title: string;
  summary: string;
  engineering: string;
  href: string;
  linkLabel: string;
  proofIds: string[];
};

// Recent engineering establishes the identity; the full archive preserves breadth.
export const selectedWork: SelectedWork[] = [
  {
    id: "selected-agent-evaluation",
    category: "Shipped evaluation platform · completed studies",
    title: "Agent journeys, encoded as state.",
    summary:
      "I turned onboarding journeys into executable capability states, then used them to compare tool routing and task completion across agent clients. I built the evaluation infrastructure, state-matched router cards and evidence capture needed to inspect which journeys worked better.",
    engineering:
      "Capability-state contracts, multi-client harnesses, matched A/B tasks and trace-backed outcome checks.",
    href: "/case-studies#multi-harness-ax-experiments",
    linkLabel: "Explore the evaluation engineering",
    proofIds: [
      "method-coded-journey-paths",
      "method-multi-harness-ax-experiments",
      "method-agent-routing-surfaces",
    ],
  },
  {
    id: "selected-mcp-access",
    category: "Shipped system",
    title: "MCP access and onboarding.",
    summary:
      "I shipped hosted MCP authentication across account-connected, search-only and keyless entry points, connecting authorization, token lifecycle and CLI setup with explicit recovery paths.",
    engineering:
      "OAuth, scoped access, headless setup, token and grant lifecycle, actionable recovery.",
    href: "/case-studies#auth-aware-onboarding",
    linkLabel: "Explore access and recovery",
    proofIds: ["method-auth-aware-onboarding"],
  },
  {
    id: "selected-product-intelligence",
    category: "Shipped measurement and reporting",
    title: "From discovery to grounded insights.",
    summary:
      "I built measurement for whether agents could find, retrieve and use a product, then built evidence-grounded insight reporting on top of those observations. The work connects evaluation banks and retrieval probes to synthesis, validation and recoverable reporting.",
    engineering:
      "Category, developer and goal-led evaluations, retrieval APIs, evidence bindings and checkpoint recovery.",
    href: "/case-studies#discovery-retrieval-measurement",
    linkLabel: "Explore measurement and insights",
    proofIds: [
      "method-discovery-retrieval-measurement",
      "method-evidence-grounded-insights",
    ],
  },
];
