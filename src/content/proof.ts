export type SourceType =
  | "resume"
  | "design-doc"
  | "case-study-draft"
  | "public-profile"
  | "sanitized-artifact"
  | "synthetic-example";

export type ConfidentialityLevel =
  | "public"
  | "sanitized"
  | "private-do-not-publish";

export type DisplayContext =
  | "hero"
  | "proof-wall"
  | "case-study"
  | "trace"
  | "decision-theater"
  | "hiring-fit"
  | "resume"
  | "source-card"
  | "interview"
  | "challenge"
  | "stack-opinion"
  | "diagram"
  | "assistant";

export type ProofClaim = {
  id: string;
  claim: string;
  sourcePath: string;
  sourceLocator: string;
  sourceType: SourceType;
  confidence: "high" | "medium" | "inferred";
  confidentialityLevel: ConfidentialityLevel;
  approvedForPublicUse: boolean;
  publicLabelRequired: boolean;
  publicLabel?: string;
  displayContexts: DisplayContext[];
};

export const proofClaims: ProofClaim[] = [
  {
    id: "knit-turnaround",
    claim:
      "Reduced market research report turnaround from 48-72 hours to under 1 hour.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Knit experience, bullet 1",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["hero", "proof-wall", "case-study", "hiring-fit"],
  },
  {
    id: "knit-sandbox-tasks",
    claim:
      "Built a sandboxed insight engine where LLMs generated and executed Python analyses across 30-50 tasks per report, with independent judge agents verifying each output.",
    sourcePath: "docs/evidence/resume-2026-09-07.pdf",
    sourceLocator: "Knit experience, bullet 2",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["hero", "proof-wall", "case-study"],
  },
  {
    id: "knit-charts",
    claim:
      "Produced 15-25 Highcharts charts per report with multi-threshold quality scoring.",
    sourcePath: "docs/evidence/resume-2026-09-07.pdf",
    sourceLocator: "Knit experience, bullet 3",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "case-study"],
  },
  {
    id: "knit-observability-platform",
    claim:
      "Unified agents on a shared platform with multi-provider LLM routing, OpenTelemetry, Langfuse, pgvector-backed RAG, SSE streaming, and generated REST APIs.",
    sourcePath: "docs/evidence/resume-2026-09-07.pdf",
    sourceLocator: "Knit experience, bullet 4",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study", "hiring-fit"],
  },
  {
    id: "epic-cost-reduction",
    claim:
      "Reduced ML infrastructure platform cost by 10x after taking over production ML systems.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Epic! experience, bullet 2",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["hero", "proof-wall", "case-study", "hiring-fit"],
  },
  {
    id: "epic-pod-reduction",
    claim:
      "Reduced Kubernetes pod usage by 100x and spot instance errors by 99%.",
    sourcePath: "docs/evidence/resume-2026-09-07.pdf",
    sourceLocator: "Epic! experience, bullet 2",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "case-study"],
  },
  {
    id: "epic-docker-build-time",
    claim:
      "Cut Docker build time by 50% while owning production ML infrastructure.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Epic! experience, bullet 2",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study"],
  },
  {
    id: "osmo-cv-accuracy",
    claim: "Raised worksheet computer-vision accuracy from 93% to 98%.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Tangible Play / Osmo experience, bullet 1",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["hero", "proof-wall", "case-study", "hiring-fit"],
  },
  {
    id: "osmo-shaded-region-iou",
    claim:
      "Built a real-time U-Net shaded-region detection model achieving 80% IoU.",
    sourcePath: "docs/evidence/resume-2026-09-07.pdf",
    sourceLocator: "Tangible Play / Osmo experience, bullet 1",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study"],
  },
  {
    id: "osmo-engagement-tagging",
    claim:
      "Boosted tracing-dots engagement by 20% and cut tagging manual effort by 99% through automation.",
    sourcePath: "docs/evidence/resume-2026-09-07.pdf",
    sourceLocator: "Tangible Play / Osmo experience, bullet 2",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "case-study"],
  },
  {
    id: "whodat-orb",
    claim: "Built a C++ ORB detector 20% faster than the ORB-SLAM baseline.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Whodat experience",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study", "hiring-fit"],
  },
  {
    id: "kaggle-top-six",
    claim:
      "Ranked top 6% globally in the Kaggle FIDE and Google Efficient Chess AI Challenge.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Education and recognition",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "resume"],
  },
  {
    id: "representative-trace-label",
    claim:
      "Live System Pulse uses sanitized representative trace events, not direct production logs.",
    sourcePath: "docs/portfolio_redesign_uiux_frontend_technical_design_doc.md",
    sourceLocator: "Sections 5.2 and 27.4-27.5",
    sourceType: "synthetic-example",
    confidence: "high",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel:
      "Sanitized representative trace. Customer data, private prompts, and internal implementation details omitted.",
    displayContexts: ["trace", "source-card"],
  },
  {
    id: "recent-cli-mcp-sdk-interfaces",
    claim:
      "Contributed to CLI, MCP and SDK interfaces, aligning tool descriptions, documentation navigation, routing behavior and API guidance.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Firecrawl, bullet 1",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["hero", "proof-wall", "hiring-fit", "interview"],
  },
  {
    id: "recent-sdk-api-consistency",
    claim: "Contributed to SDK and API consistency for developer workflows.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Firecrawl, bullet 2",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "hiring-fit", "interview"],
  },
  {
    id: "recent-browser-session-tooling",
    claim: "Implemented browser-session entry points in MCP tooling.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Firecrawl, bullet 3",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "hiring-fit", "interview"],
  },
  {
    id: "recent-runtime-recovery-tests",
    claim:
      "Repaired runtime request boundaries and recovery behavior with regression tests.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Firecrawl, bullet 3",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "hiring-fit", "interview"],
  },
  {
    id: "recent-mcp-runtime-migration",
    claim: "Migrated MCP server runtime behavior with smoke tests.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Firecrawl, bullet 3",
    sourceType: "resume",
    confidence: "medium",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "hiring-fit", "interview"],
  },
  {
    id: "recent-cli-credential-setup",
    claim: "Hardened CLI credential setup with regression tests.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Firecrawl, bullet 2",
    sourceType: "resume",
    confidence: "medium",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "hiring-fit", "interview"],
  },
  {
    id: "recent-reviewed-ai-workflows",
    claim:
      "Built source-backed answers, claim checks and report drafts, with regression tests for citations, missing evidence and unsupported numbers.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Mudita Studios, bullet 2",
    sourceType: "resume",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["proof-wall", "hiring-fit", "interview"],
  },

  {
    id: "current-agent-delivery-platform-foundations",
    claim:
      "Built and shipped a working agent delivery platform with orchestration boundaries, typed configuration, artifact review, human approval and operator-facing documentation.",
    sourcePath: "docs/evidence/current-systems.md",
    sourceLocator: "Reviewed implementation category: Agent delivery platform",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel:
      "Anonymized implementation summary; underlying code is private.",
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "current-coding-agent-browser-qa-safeguards",
    claim:
      "Implemented and shipped safeguards for coding-agent execution and browser-connected QA, including guard boundaries, trace preservation, reviewer handoff context and testable checkpoints.",
    sourcePath: "docs/evidence/current-systems.md",
    sourceLocator:
      "Reviewed implementation category: Coding-agent browser QA safeguards",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel:
      "Anonymized implementation summary; underlying code is private.",
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "current-governed-knowledge-mcp-service",
    claim:
      "Built and shipped read-only knowledge tooling with an MCP server, scan runner, CI checks, structured context, invariant checks and proposed-change workflows.",
    sourcePath: "docs/evidence/current-systems.md",
    sourceLocator:
      "Reviewed implementation category: Governed knowledge MCP service",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel:
      "Anonymized implementation summary; underlying code is private.",
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "public-agent-experience-guide",
    claim:
      "Published a public Agent Experience field guide focused on agent discovery, task understanding, capability use, recovery and handoff.",
    sourcePath: "https://agentexperience.tech/",
    sourceLocator: "Home page and guide index",
    sourceType: "public-profile",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "public-agent-readiness-rubric",
    claim:
      "Published a draft structural rubric for agent readiness, with dimensions for discovery, structure, machine-readable content, action safety, recovery and policy signals.",
    sourcePath: "https://agentexperience.tech/insights/agent-readiness-rubric/",
    sourceLocator: "Rubric overview, scoring model and dimensions",
    sourceType: "public-profile",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "public-awesome-agent-experience",
    claim:
      "Maintains a curated public Agent Experience collection covering discovery, tool schemas, evaluation, human control, recovery and protocol design.",
    sourcePath: "https://github.com/hmishra2250/awesome-agent-experience",
    sourceLocator: "README scope criteria and source sections",
    sourceType: "public-profile",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "public-consumer-gpu-inference",
    claim:
      "Published a local inference experiment with reproducible scripts and documentation for running a large open model on consumer hardware, with hardware-specific limits.",
    sourcePath: "https://github.com/hmishra2250/qwen-3.6-35b-consumer-gpu",
    sourceLocator:
      "README project overview, reproducibility notes and limitations",
    sourceType: "public-profile",
    confidence: "high",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
    publicLabelRequired: false,
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "method-agent-routing-surfaces",
    claim:
      "I built and evaluated capability-aware router cards so agents could choose the right installed tool and complete the task, not simply make more tool calls.",
    sourcePath: "docs/evidence/current-methods.md",
    sourceLocator: "Method category: Router cards and tool selection",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },

  {
    id: "method-auth-aware-onboarding",
    claim:
      "I implemented and shipped hosted MCP authentication and onboarding across account-connected, search-only and keyless entry points.",
    sourcePath: "docs/evidence/current-methods.md",
    sourceLocator: "Method category: MCP OAuth and auth-aware onboarding",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },

  {
    id: "method-discovery-retrieval-measurement",
    claim:
      "I owned and shipped measurement surfaces that show whether agents can find, retrieve and use a product, with evidence behind each reading.",
    sourcePath: "docs/evidence/current-methods.md",
    sourceLocator: "Method category: Discoverability and retrievability",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },

  {
    id: "method-multi-harness-ax-experiments",
    claim:
      "I built and shipped agent evaluation infrastructure for comparing discovery and usability across clients, models and tool surfaces.",
    sourcePath: "docs/evidence/current-methods.md",
    sourceLocator: "Method category: Multi-harness AX evaluation",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },

  {
    id: "method-coded-journey-paths",
    claim:
      "I introduced and implemented state-based journey testing: onboarding produces a capability state, and an A/B experiment consumes that state.",
    sourcePath: "docs/evidence/current-methods.md",
    sourceLocator: "Method category: Journey paths as executable state",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },

  {
    id: "method-evidence-grounded-insights",
    claim:
      "I built insight synthesis and shipped reporting that turns discovery, retrieval and journey evidence into reviewable product decisions.",
    sourcePath: "docs/evidence/current-methods.md",
    sourceLocator: "Method category: Evidence-grounded insight synthesis",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "current-routing-study",
    claim:
      "A controlled matched-pair study observed correct routing plus task completion rising from 90/118 to 99/118, a 7.63 percentage-point absolute gain across two clients. The result is directional, not statistically conclusive or a production conversion measure.",
    sourcePath: "docs/evidence/current-work-results.md",
    sourceLocator: "Controlled routing study",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "current-journey-coverage",
    claim:
      "Implemented a state-based inventory of 79 onboarding and integration surfaces, with held and no-card paths explicitly represented. This is coverage, not 79 successful experiments.",
    sourcePath: "docs/evidence/current-work-results.md",
    sourceLocator: "Journey inventory",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },
  {
    id: "current-harness-coverage",
    claim:
      "Implemented evaluation adapters for six agent clients, with client-specific transport support and evidence handling.",
    sourcePath: "docs/evidence/current-work-results.md",
    sourceLocator: "Harness coverage",
    sourceType: "sanitized-artifact",
    confidence: "medium",
    confidentialityLevel: "sanitized",
    approvedForPublicUse: true,
    publicLabelRequired: true,
    publicLabel: "Anonymized engineering summary; underlying work is private.",
    displayContexts: ["case-study", "source-card"],
  },
];

export function claimById(id: string) {
  const claim = proofClaims.find((item) => item.id === id);
  if (!claim) {
    throw new Error(`Missing proof claim: ${id}`);
  }
  return claim;
}
