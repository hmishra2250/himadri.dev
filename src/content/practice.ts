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
  summary: string;
  engagements: PracticeEngagement[];
  recentContributions: PracticeContribution[];
  recentWorkCases: RecentWorkCase[];
  approach: PracticeApproach[];
};

export const practice: Practice = {
  eyebrow: "AI systems and developer infrastructure",
  headline: "I build AI products and developer tools.",
  summary:
    "From MCP interfaces and SDKs to production AI workflows, I work on the boundaries that make software usable, testable and reliable.",
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
      id: "cli-mcp-sdk-interfaces",
      title: "CLI, MCP and SDK interface work",
      summary:
        "Contributed to CLI, MCP and SDK interfaces, aligning tool descriptions, documentation navigation, routing behavior and API guidance for developer and agent workflows.",
      proofIds: ["recent-cli-mcp-sdk-interfaces"],
    },
    {
      id: "sdk-api-consistency",
      title: "SDK and API consistency",
      summary:
        "Contributed to SDK and API consistency so developer workflows can rely on clearer client behavior and guidance.",
      proofIds: ["recent-sdk-api-consistency"],
    },
    {
      id: "runtime-recovery-tests",
      title: "Runtime boundaries and recovery behavior",
      summary:
        "Repaired runtime request boundaries and recovery behavior with supporting regression tests across application and proxy configuration.",
      proofIds: ["recent-runtime-recovery-tests"],
    },
    {
      id: "browser-session-tooling",
      title: "Browser-session tooling entry points",
      summary:
        "Implemented browser-session entry points in MCP tooling for agent workflows that need controlled browser context.",
      proofIds: ["recent-browser-session-tooling"],
    },
  ],

  recentWorkCases: [
    {
      id: "interface-consistency-brief",
      title: "CLI, MCP and SDK consistency",
      summary:
        "I worked across CLI, MCP, SDK and documentation surfaces so developer and agent workflows were easier to configure, call and understand.",
      work: [
        "Built SDK client methods and kept API behavior consistent across client surfaces.",
        "Aligned tool descriptions, credential setup, documentation navigation, routing behavior and API guidance.",
      ],
      verification:
        "SDK client and credential setup changes included supporting regression tests.",
      proofIds: [
        "recent-cli-mcp-sdk-interfaces",
        "recent-sdk-api-consistency",
        "recent-cli-credential-setup",
      ],
    },
    {
      id: "reviewed-ai-workflows-brief",
      title: "AI workflows with human review",
      summary:
        "I built AI workflow paths where retrieved context, draft artifacts, claim checks and human review stay connected.",
      work: [
        "Implemented retrieval-backed context for draft generation.",
        "Added claim checks and a human-review gate before outputs were treated as ready.",
      ],
      verification:
        "Supporting regression tests covered the draft, claim-check and review-gate path.",
      proofIds: ["recent-reviewed-ai-workflows"],
    },
    {
      id: "browser-runtime-boundaries-brief",
      title: "MCP runtime and request recovery",
      summary:
        "I tightened MCP runtime behavior, browser-session entry points and recovery paths for agent workflows with clear request boundaries.",
      work: [
        "Migrated MCP server runtime behavior and added browser-session entry points.",
        "Repaired runtime request boundaries and recovery behavior.",
      ],
      verification:
        "Smoke tests and regression tests covered runtime, request and recovery boundaries across application and proxy configuration.",
      proofIds: [
        "recent-mcp-runtime-migration",
        "recent-browser-session-tooling",
        "recent-runtime-recovery-tests",
      ],
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
