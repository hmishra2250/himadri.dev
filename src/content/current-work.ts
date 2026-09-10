export type ReviewedSystem = {
  id: string;
  title: string;
  summary: string;
  work: string[];
  status: "Shipped working version";
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
  impact: string;
  measurement: string;
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
      title: "Agent delivery platform",
      summary:
        "I built and shipped a working agent delivery platform, moving tasks through execution, artifact review and human approval.",
      work: [
        "Tracked runs, outputs, approvals and review decisions in shared state.",
        "Connected MCP tools to a web interface for reviewing the work.",
        "Added tests and docs for handoff and recovery.",
      ],
      status: "Shipped working version",
      limitations:
        "Runs tasks and supports review. A person still approves the result.",
      proofId: "current-agent-delivery-platform-foundations",
      publicLabel: reviewedWorkLabel,
    },
    {
      id: "coding-agent-browser-qa-safeguards",
      title: "Coding-agent browser QA safeguards",
      summary:
        "I implemented and shipped coding-agent safeguards: when browser checks should stop, what evidence to retain, and how a reviewer picks up the work.",
      work: [
        "Added guards against repeated actions and leaving the allowed website.",
        "Kept run traces and budget context for reviewers.",
        "Kept generated outputs when browser checks needed follow-up.",
      ],
      status: "Shipped working version",
      limitations:
        "These safeguards are my work within a larger coding-agent system.",
      proofId: "current-coding-agent-browser-qa-safeguards",
      publicLabel: reviewedWorkLabel,
    },
    {
      id: "governed-knowledge-mcp-service",
      title: "Governed knowledge MCP service",
      summary:
        "I built and shipped a read-only interface for agents to retrieve structured knowledge and propose changes without granting them write access.",
      work: [
        "Let agents read structured knowledge through MCP.",
        "Built repository scans and CI checks.",
        "Let agents propose updates without write access.",
      ],
      status: "Shipped working version",
      limitations:
        "Some checks need private access. The full service cannot be reproduced publicly.",
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
        "A draft checklist for making products easier for agents to find and use, with checks for safety and recovery.",
      status: "Draft rubric",
      limitations: "Draft checklist, not a certification.",
      href: "https://agentexperience.tech/insights/agent-readiness-rubric/",
      proofId: "public-agent-readiness-rubric",
    },
    {
      id: "awesome-agent-experience",
      title: "Awesome Agent Experience",
      summary:
        "A collection of useful tools, papers and guides on how agents find and use products.",
      status: "Curated collection",
      limitations: "Curated resources; linked tools belong to their authors.",
      href: "https://github.com/hmishra2250/awesome-agent-experience",
      proofId: "public-awesome-agent-experience",
    },
    {
      id: "consumer-gpu-inference",
      title: "Qwen on a consumer GPU",
      summary:
        "Scripts and notes for running a large open model on a consumer GPU, with saved test results.",
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
      title: "Capability-aware router cards",
      status: "Completed experiments",
      summary:
        "I built and evaluated router cards that matched an agent's available tools and access. The goal was useful tool choice and task completion, not simply more tool calls.",
      details: [
        "Matched card content to capability state, with explicit controls for user intent.",
        "Compared cards against no-card baselines on paired tasks, while letting each client discover tools through its normal path.",
        "Used routing, completion, safety and answer-quality checks to keep useful changes and reject ineffective or harmful defaults.",
      ],
      impact:
        "Observed better tool routing and task completion in the controlled study. The evaluation also showed why greater tool use alone was not a useful success measure.",
      measurement:
        "Compared correct tool choice and completed tasks across matched setups. Reviewed safety and answer quality separately rather than folding them into tool-call counts.",
      limitations:
        "The observed gain was directional, not statistically conclusive or a production conversion result.",
      metricIds: ["routing-task-gain"],
      proofId: "method-agent-routing-surfaces",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "auth-aware-onboarding",
      title: "Production MCP access and OAuth onboarding",
      status: "Shipped system",
      summary:
        "I shipped the cross-service access flow for hosted MCP, from account connection to usable tools. Connected accounts, search-only access and keyless trials needed different authorization paths.",
      details: [
        "Connected web OAuth, token and grant lifecycle, MCP profiles, backend authorization and CLI setup.",
        "Separated interactive account connection from headless access and limited trials, rather than treating every client as a browser login.",
        "Added recovery guidance for blocked credentials, permissions and unsupported client capabilities.",
      ],
      impact:
        "Put distinct access paths into live onboarding, with permission boundaries and recovery steps carried through the flow rather than left to manual setup.",
      measurement:
        "Checked account connection, credential handling and permitted tool access across the supported paths. Live onboarding use confirms delivery, not a conversion lift.",
      limitations:
        "Production delivery and onboarding use are supported; signup improvement is not claimed.",
      metricIds: [],
      proofId: "method-auth-aware-onboarding",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "discovery-retrieval-measurement",
      title: "Discovery and retrieval evaluation system",
      status: "Shipped system",
      summary:
        "I built the evaluation layer for whether agents can find a product, retrieve its content and use it. Each stage needed its own evidence, not a single visibility score.",
      details: [
        "Built versioned category, developer and goal-based test banks, deterministic retrieval probes, APIs and dashboard views.",
        "Kept eligible test cases, missing observations, citations and actual tool use separate in the results.",
        "Connected the evidence to reporting so a finding could point to the failed stage, not just an aggregate score.",
      ],
      impact:
        "Made discovery and retrieval failures easier to locate. Teams could tell missing evidence apart from failed retrieval or a tool that was found but never used.",
      measurement:
        "Tracked discovery observations, retrieval checks, source citations and tool calls against their eligible test cases. Missing results stayed visible instead of disappearing from the summary.",
      limitations:
        "These checks measure access and use, not traffic, adoption or revenue growth.",
      metricIds: [],
      proofId: "method-discovery-retrieval-measurement",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "multi-harness-ax-experiments",
      title: "Cross-client agent evaluation platform",
      status: "Shipped platform",
      summary:
        "I built the harness infrastructure for agent experience (AX) testing, so the same product journey could run across different clients and models under controlled A/B conditions.",
      details: [
        "Built client adapters and shared experiment contracts, with client-specific connections and evidence parsing.",
        "Encoded control and treatment runs with matched tasks, fixed fixtures and recorded runtime versions.",
        "Added statistical checks and failure accounting to separate product behavior from setup errors, incomplete pairs and invalid runs.",
      ],
      impact:
        "Made cross-client comparisons repeatable and inspectable, rather than a collection of one-off demos. Teams could distinguish a product failure from a broken test setup.",
      measurement:
        "Compared matched runs using saved evidence, completion checks and failure categories. Client connection support stayed explicit instead of assuming all adapters behaved alike.",
      limitations:
        "Results apply to the tested clients and supported connection types.",
      metricIds: ["agent-harness-coverage"],
      proofId: "method-multi-harness-ax-experiments",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "coded-journey-paths",
      title: "Executable journeys for agent A/B tests",
      status: "Implemented evaluation",
      summary:
        "I introduced the idea of treating onboarding as executable capability state. An experiment could then start from what an agent could actually access, not assume setup had worked.",
      details: [
        "Encoded installation, authentication, skills, MCP, plugins and read access as explicit states.",
        "Built state-matched payload selection and readiness checks so each test received the tools and guidance its setup allowed.",
        "Managed setup and cleanup to reproduce alternate journeys and inspect where their capabilities differed.",
      ],
      impact:
        "Turned onboarding paths into testable inputs. This made it possible to compare journey designs without confusing access differences with agent performance.",
      measurement:
        "Checked readiness and state-matched behavior before comparing control and treatment runs. Kept paused paths and no-card paths visible in the inventory.",
      limitations:
        "Mapped coverage is not a claim that every path was tested or improved.",
      metricIds: ["onboarding-surface-coverage"],
      proofId: "method-coded-journey-paths",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "evidence-grounded-insights",
      title: "Evidence-backed insight and reporting pipeline",
      status: "Shipped reporting",
      summary:
        "I built the pipeline that turns discovery, retrieval and journey evidence into product findings. The engineering work was keeping those findings tied to sources through synthesis, validation and recovery.",
      details: [
        "Connected evidence collection with synthesis within and across test banks.",
        "Added deterministic validation, report storage and publication gates so findings kept their evidence bindings.",
        "Shipped daily reporting and implemented weekly orchestration with checkpoints to recover failed stages and reconstruct reports.",
      ],
      impact:
        "Turned separate test outputs into traceable product findings. Checkpoint recovery let reporting continue from saved work instead of losing the whole run.",
      measurement:
        "Checked source bindings and validation results before publication. Used shipped daily reports and recovered weekly reports as evidence of delivery and recovery.",
      limitations:
        "Recovered weekly reports do not establish that every fresh weekly run completed uninterrupted.",
      metricIds: [],
      proofId: "method-evidence-grounded-insights",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
  ],
};
