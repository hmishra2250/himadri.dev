export type PracticeEngagement = {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
};

export type PracticeContribution = {
  id: string;
  title: string;
  summary: string;
  proofIds: string[];
};

export type PracticeApproach = {
  title: string;
  summary: string;
};

export type RecentWorkCase = {
  id: string;
  title: string;
  summary: string;
  work: string[];
  verification: string;
  proofIds: string[];
};

export type Practice = {
  eyebrow: string;
  headline: string;
  secondaryHeadline: string;
  summary: string;
  engagements: PracticeEngagement[];
  recentContributions: PracticeContribution[];
  recentWorkCases: RecentWorkCase[];
  approach: PracticeApproach[];
};

export const practice: Practice = {
  eyebrow: "Himadri Mishra",
  headline: "I build agents,",
  secondaryHeadline: "and the MCP servers, CLIs and SDKs they run on.",
  summary:
    "AI engineer, 8+ years. I build AI products at Mudita Studios and work on Agent Experience in the open. Previously at Firecrawl.",
  engagements: [
    {
      id: "agent-facing-tools",
      title: "Agent-facing tools",
      summary:
        "For teams building developer or agent workflows where CLI, MCP, SDK and API contracts need to stay understandable under real use.",
      deliverables: [
        "Interface audits and contract maps",
        "CLI, MCP, SDK and API consistency fixes",
        "Developer documentation paths and practical usage guidance",
      ],
    },
    {
      id: "ai-product-systems",
      title: "AI product systems",
      summary:
        "For workflows that need more than prompting: state, recovery, verification, observable execution, and useful downstream artifacts.",
      deliverables: [
        "Workflow architecture and orchestration boundaries",
        "Evaluation and reviewer escalation design",
        "Artifact generation paths for reports, decks, traces and previews",
      ],
    },
    {
      id: "platform-reliability",
      title: "Platform reliability",
      summary:
        "For ML, search or AI infrastructure that needs cost, latency, reliability and ownership brought back into the same operating model.",
      deliverables: [
        "Cost and latency tradeoff reviews",
        "Instrumentation and production-readiness notes",
        "Handover artifacts for the next engineer or owning team",
      ],
    },
  ],
  recentContributions: [
    {
      id: "agent-tool-discovery",
      title: "Agent Experience programme",
      summary:
        "Owned the work that measured and improved how AI agents discover, choose and correctly use a developer tool across its MCP server, CLI, SDKs and docs.",
      proofIds: ["recent-agent-tool-discovery"],
    },
    {
      id: "agent-benchmark",
      title: "Agent benchmark and experiments",
      summary:
        "Built a daily benchmark of whether coding agents pick and use a tool correctly, and a sandboxed experiment harness whose results drove shipped fixes.",
      proofIds: ["recent-agent-benchmark", "recent-experiment-harness"],
    },
    {
      id: "hosted-mcp-overhaul",
      title: "Hosted MCP overhaul",
      summary:
        "Separated keyless and OAuth paths, added an OAuth-only search endpoint, retired key-in-path auth and made onboarding adapt to each coding agent.",
      proofIds: ["recent-hosted-mcp-auth", "recent-mcp-onboarding"],
    },
    {
      id: "insights-rebuild",
      title: "Trace-insights rebuild",
      summary:
        "Rebuilt the engine that turns agent traces into quote-verified findings, with less than half the code and byte-identical replay as the check.",
      proofIds: ["recent-insights-rebuild"],
    },
  ],

  recentWorkCases: [
    {
      id: "interface-consistency-brief",
      title: "Hosted MCP and onboarding",
      summary:
        "Reworked how agents connect to a hosted MCP server: separate keyless and OAuth paths and onboarding that adapts to each agent.",
      work: [
        "Separated keyless and OAuth paths across the stack.",
        "Retired key-in-path auth and rebuilt onboarding per agent.",
      ],
      verification:
        "Local end-to-end runs and regression tests covered each connection mode.",
      proofIds: ["recent-hosted-mcp-auth", "recent-mcp-onboarding"],
    },
    {
      id: "reviewed-ai-workflows-brief",
      title: "Source checks and review",
      summary:
        "Connected sources to generated answers and report drafts, with claim checks and clear handling of missing evidence.",
      work: [
        "Added source context to draft generation.",
        "Checked citations, missing evidence and unsupported numbers.",
      ],
      verification:
        "Regression tests covered citations, missing evidence and unsupported numbers.",
      proofIds: ["recent-reviewed-ai-workflows"],
    },
    {
      id: "browser-runtime-boundaries-brief",
      title: "Agent behaviour experiments",
      summary:
        "Measured whether coding agents pick and use a tool correctly, then ran controlled experiments to decide which fixes to ship.",
      work: [
        "Built a daily benchmark with a scoring and judging layer.",
        "Built a sandboxed harness with cost limits and statistical controls.",
      ],
      verification:
        "Shipped fixes were decided by controlled experiments, with null results reported as such.",
      proofIds: ["recent-agent-benchmark", "recent-experiment-harness"],
    },
  ],
  approach: [
    {
      title: "Start with the system boundary",
      summary:
        "Define the user promise, system state, failure modes and owner before choosing the agent pattern, model route or interface shape.",
    },
    {
      title: "Make verification easy to inspect",
      summary:
        "Separate generation from checking with executable outputs, source cards, reviewer paths and test fixtures.",
    },
    {
      title: "Leave the system easier to inherit",
      summary:
        "Deliver typed contracts, concise documentation, observable paths and decision records so the next engineer can operate the work with less context loss.",
    },
  ],
};
