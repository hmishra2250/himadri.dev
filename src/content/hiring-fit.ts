export type HiringFit = {
  signal: string;
  evidence: string;
  proofId: string;
};

export const hiringFit: HiringFit[] = [
  {
    signal: "Can shape agent-facing developer tools",
    evidence:
      "Recent public contribution themes include CLI, MCP, SDK and API interface consistency for developer and agent workflows.",
    proofId: "recent-cli-mcp-sdk-interfaces",
  },
  {
    signal: "Can design production agent workflows",
    evidence:
      "Agentic market research platform work used explicit DAG orchestration, sandbox execution, judge verification and observable node boundaries.",
    proofId: "knit-observability-platform",
  },
  {
    signal: "Can keep AI output tied to artifacts",
    evidence:
      "Built workflows around executable analysis, chart quality gates, deck artifacts and source-grounded review rather than fluent text alone.",
    proofId: "knit-sandbox-tasks",
  },
  {
    signal: "Can repair runtime and recovery boundaries",
    evidence:
      "Recent public contribution themes include runtime request boundaries, recovery behavior and supporting regression tests.",
    proofId: "recent-runtime-recovery-tests",
  },
  {
    signal: "Can own infrastructure and reduce cost",
    evidence:
      "Reduced ML platform cost by 10x while taking ownership of production search, recommendations, Kubernetes usage and operational reliability.",
    proofId: "epic-cost-reduction",
  },
  {
    signal: "Understands evals and observability",
    evidence:
      "Designed reliability paths around model routing, sandboxed analysis, tracing, independent judge verification and visible quality gates.",
    proofId: "knit-observability-platform",
  },
  {
    signal: "Has shipped ML beyond LLM demos",
    evidence:
      "Computer vision product systems improved worksheet recognition accuracy from 93% to 98% under real-time education-product constraints.",
    proofId: "osmo-cv-accuracy",
  },
  {
    signal: "Can bridge product, data and platform layers",
    evidence:
      "Work spans LLM orchestration, Python execution, charting, deck generation, search, recommendations, CV deployment and product feedback loops.",
    proofId: "knit-turnaround",
  },
  {
    signal: "Has low-level performance depth",
    evidence: "Built a C++ ORB detector 20% faster than the ORB-SLAM baseline.",
    proofId: "whodat-orb",
  },
];
