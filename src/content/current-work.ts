export type ReviewedSystem = {
  id: string;
  title: string;
  summary: string;
  work: string[];
  status:
    | "Implemented foundations"
    | "Implemented components"
    | "Implemented service";
  limitations: string;
  proofId: string;
  publicLabel: string;
};

export type PublicProject = {
  id: string;
  title: string;
  summary: string;
  status:
    | "Published guide"
    | "Draft rubric"
    | "Curated collection"
    | "Local experiment";
  limitations: string;
  href: string;
  proofId: string;
};

export type MethodCard = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  status:
    | "Completed experiments"
    | "Shipped system"
    | "Shipped platform"
    | "Implemented evaluation"
    | "Shipped reporting";
  metricIds: string[];
  limitations: string;
  publicLabel: string;
  proofId: string;
};

export type CurrentWork = {
  reviewedSystems: ReviewedSystem[];
  publicProjects: PublicProject[];
  methodCards: MethodCard[];
};

export const reviewedWorkLabel =
  "Anonymized implementation summary; underlying code is private.";

export const methodWorkLabel =
  "Anonymized engineering summary; underlying work is private.";

export const currentWork: CurrentWork = {
  reviewedSystems: [
    {
      id: "agent-delivery-platform-foundations",
      title: "Agent delivery platform foundations",
      summary:
        "I built platform foundations for moving an agent task through execution, artifact review and human approval.",
      work: [
        "Built shared state contracts for runs, artifacts, approvals, and reviewer decisions.",
        "Wired MCP orchestration and web review surfaces around the delivery flow.",
        "Added test fixtures and operator documentation for handoff and recovery.",
      ],
      status: "Implemented foundations",
      limitations: "Workflow templates are scaffolded, not deployed.",
      proofId: "current-agent-delivery-platform-foundations",
      publicLabel: reviewedWorkLabel,
    },
    {
      id: "coding-agent-browser-qa-safeguards",
      title: "Coding-agent browser QA safeguards",
      summary:
        "I worked on coding-agent safeguards: when browser checks should stop, what evidence to retain, and how a reviewer picks up the work.",
      work: [
        "Implemented repeated-action and off-origin guards for browser-connected runs.",
        "Preserved budget and trace context for reviewer inspection.",
        "Kept generated outputs available when browser QA needed follow-up.",
      ],
      status: "Implemented components",
      limitations:
        "Contributed components; end-to-end production integration remains gated.",
      proofId: "current-coding-agent-browser-qa-safeguards",
      publicLabel: reviewedWorkLabel,
    },
    {
      id: "governed-knowledge-mcp-service",
      title: "Governed knowledge MCP service",
      summary:
        "I built a read-only interface for agents to retrieve structured knowledge and propose changes without granting them write access.",
      work: [
        "Served structured context through a read-only MCP boundary.",
        "Built scan-runner and CI checks around repository review.",
        "Returned proposed updates without taking write authority.",
      ],
      status: "Implemented service",
      limitations:
        "External checks depend on access; public reproduction is limited.",
      proofId: "current-governed-knowledge-mcp-service",
      publicLabel: reviewedWorkLabel,
    },
  ],
  publicProjects: [
    {
      id: "agent-experience-guide",
      title: "Agent Experience field guide",
      summary:
        "Practical guides to discovery, tool use, evaluation and recovery, with a read-only MCP service for searching and retrieving the content.",
      status: "Published guide",
      limitations:
        "Independent guidance, with explicit human-control boundaries.",
      href: "https://agentexperience.tech/",
      proofId: "public-agent-experience-guide",
    },
    {
      id: "agent-readiness-rubric",
      title: "Open Agent-Readiness Rubric",
      summary:
        "A public draft rubric for inspecting discovery, structure, machine-readable content, action safety, recovery, and policy signals on agent-facing surfaces.",
      status: "Draft rubric",
      limitations: "Draft checklist, not a certification.",
      href: "https://agentexperience.tech/insights/agent-readiness-rubric/",
      proofId: "public-agent-readiness-rubric",
    },
    {
      id: "awesome-agent-experience",
      title: "Awesome Agent Experience",
      summary:
        "A curated public collection of agent experience sources covering tool use, discovery, protocols, evaluation, human control, recovery, and accessibility.",
      status: "Curated collection",
      limitations: "Curated resources; linked tools belong to their authors.",
      href: "https://github.com/hmishra2250/awesome-agent-experience",
      proofId: "public-awesome-agent-experience",
    },
    {
      id: "consumer-gpu-inference",
      title: "Qwen on a consumer GPU",
      summary:
        "A public local experiment with scripts and documentation for running a large open model on consumer hardware and recording reproducible evaluation artifacts.",
      status: "Local experiment",
      limitations:
        "Results apply to the documented hardware and model configuration.",
      href: "https://github.com/hmishra2250/qwen-3.6-35b-consumer-gpu",
      proofId: "public-consumer-gpu-inference",
    },
  ],
  methodCards: [
    {
      id: "agent-routing-surfaces",
      title: "Router cards and tool selection",
      status: "Completed experiments",
      summary:
        "I built and evaluated capability-aware router cards so agents could choose the right installed tool and complete the task, not simply make more tool calls.",
      details: [
        "Compared state-matched cards against no-card baselines using paired tasks, natural client discovery and explicit user-intent controls.",
        "Used routing, task completion, safety and answer-quality checks to select useful interventions and reject ineffective or harmful defaults.",
      ],
      limitations:
        "The observed gain is specific to the tested states and clients; it does not establish a universal routing or conversion lift.",
      metricIds: ["routing-task-gain"],
      proofId: "method-agent-routing-surfaces",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "auth-aware-onboarding",
      title: "MCP OAuth and auth-aware onboarding",
      status: "Shipped system",
      summary:
        "I implemented and shipped hosted MCP authentication and onboarding across account-connected, search-only and keyless entry points.",
      details: [
        "Connected Web OAuth, token and grant lifecycle, MCP profiles, backend authorization and CLI setup into a cross-service flow.",
        "Separated interactive account connection from headless access and limited trials, with actionable recovery when credentials, permissions or client capabilities blocked progress.",
      ],
      limitations:
        "Live onboarding supports real usage; no signup-conversion improvement is claimed.",
      metricIds: [],
      proofId: "method-auth-aware-onboarding",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "discovery-retrieval-measurement",
      title: "Discoverability and retrievability",
      status: "Shipped system",
      summary:
        "I owned and shipped measurement surfaces that show whether agents can find, retrieve and use a product, with evidence behind each reading.",
      details: [
        "Built versioned category, developer and goal-led evaluation banks, deterministic retrieval probes, APIs and dashboard views.",
        "Kept eligible populations, missing observations, citations and actual tool use distinct so teams could diagnose the failure stage instead of acting on a misleading aggregate.",
      ],
      limitations:
        "Measurement and diagnostic value are established; traffic, adoption and revenue lift are not inferred from visibility scores.",
      metricIds: [],
      proofId: "method-discovery-retrieval-measurement",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "multi-harness-ax-experiments",
      title: "Multi-harness AX evaluation",
      status: "Shipped platform",
      summary:
        "I built and shipped agent evaluation infrastructure for comparing discovery and usability across clients, models and tool surfaces.",
      details: [
        "Encoded control and treatment matrices with matched tasks, frozen fixtures, versioned runtime evidence and repeatable execution.",
        "Implemented evidence capture, statistical checks and failure accounting that distinguish product behavior from setup failures, incomplete pairs and invalid runs.",
      ],
      limitations:
        "Transport support varies by client; an implemented adapter is not a guarantee of identical behavior across every surface.",
      metricIds: ["agent-harness-coverage"],
      proofId: "method-multi-harness-ax-experiments",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "coded-journey-paths",
      title: "Journey paths as executable state",
      status: "Implemented evaluation",
      summary:
        "I introduced and implemented state-based journey testing: onboarding produces a capability state, and an A/B experiment consumes that state.",
      details: [
        "Mapped installation, authentication, skills, MCP, plugins and reader scope into explicit capability states rather than inferring readiness from a command name.",
        "Built state-matched payload selection, certification checks and managed lifecycle controls, making alternate journeys reproducible and their differences inspectable.",
      ],
      limitations:
        "The inventory includes held and no-card paths; mapped coverage is not a claim that every path was tested or improved.",
      metricIds: ["onboarding-surface-coverage"],
      proofId: "method-coded-journey-paths",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "evidence-grounded-insights",
      title: "Evidence-grounded insight synthesis",
      status: "Shipped reporting",
      summary:
        "I built insight synthesis and shipped reporting that turns discovery, retrieval and journey evidence into reviewable product decisions.",
      details: [
        "Integrated evidence acquisition, bank-level and cross-bank synthesis, deterministic validation, report storage and publication gates.",
        "Shipped daily reporting and implemented weekly orchestration with checkpoint recovery, preserving evidence bindings through failed stages and report reconstruction.",
      ],
      limitations:
        "Daily reporting and recovered weekly report artifacts are evidenced; uninterrupted fresh weekly completion is not claimed.",
      metricIds: [],
      proofId: "method-evidence-grounded-insights",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
  ],
};
