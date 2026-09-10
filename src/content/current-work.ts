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
      title: "Router cards and tool choice",
      status: "Completed experiments",
      summary:
        "I built router cards that help agents choose an available tool and finish the task.",
      details: [
        "Compared cards with a no-card baseline using the same tasks and setups.",
        "Checked tool choice, task completion, safety and answer quality before keeping a change.",
      ],
      limitations:
        "The gain applies to the tested setups and clients, not every tool or signup flow.",
      metricIds: ["routing-task-gain"],
      proofId: "method-agent-routing-surfaces",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "auth-aware-onboarding",
      title: "MCP login and onboarding",
      status: "Shipped system",
      summary:
        "I shipped MCP login and setup for connected accounts, search-only access and keyless trials.",
      details: [
        "Connected OAuth, tokens, permissions and CLI setup across services.",
        "Separated interactive login from headless access, with recovery steps when setup failed.",
      ],
      limitations:
        "Used in live onboarding. No claim of higher signup conversion.",
      metricIds: [],
      proofId: "method-auth-aware-onboarding",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "discovery-retrieval-measurement",
      title: "Discovery and retrieval tests",
      status: "Shipped system",
      summary:
        "I built tests and dashboards that show whether agents can find, read and use a product.",
      details: [
        "Built category, developer and goal-based test sets, retrieval checks and APIs.",
        "Tracked missing results, sources and tool calls so teams could find the failure.",
      ],
      limitations:
        "Measures access and use, not traffic, adoption or revenue growth.",
      metricIds: [],
      proofId: "method-discovery-retrieval-measurement",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "multi-harness-ax-experiments",
      title: "Testing agents across clients",
      status: "Shipped platform",
      summary:
        "I built a test platform to compare how agents find and use tools across clients and models.",
      details: [
        "Ran A/B tests with matched tasks, fixed inputs and saved run evidence.",
        "Separated tool failures from setup problems and incomplete runs.",
      ],
      limitations:
        "Clients support different connection types. An adapter does not mean every feature works in every client.",
      metricIds: ["agent-harness-coverage"],
      proofId: "method-multi-harness-ax-experiments",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "coded-journey-paths",
      title: "Journey paths as code",
      status: "Implemented evaluation",
      summary:
        "I turned onboarding steps into saved states so different paths could be tested and compared.",
      details: [
        "Recorded installed tools, login status, skills, plugins and access permissions.",
        "Built state-matched card selection, readiness checks and repeatable setup and cleanup.",
      ],
      limitations:
        "Includes paused paths and paths without router cards. Not every mapped path was tested or improved.",
      metricIds: ["onboarding-surface-coverage"],
      proofId: "method-coded-journey-paths",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
    {
      id: "evidence-grounded-insights",
      title: "Turning test results into insights",
      status: "Shipped reporting",
      summary:
        "I built reports that turn discovery, retrieval and journey tests into clear product findings.",
      details: [
        "Connected evidence collection, report writing, source checks and publishing.",
        "Shipped daily reports and built weekly runs that could resume after failures.",
      ],
      limitations:
        "Daily reports shipped; weekly reports were recovered after failures. This does not prove every fresh weekly run completed.",
      metricIds: [],
      proofId: "method-evidence-grounded-insights",
      publicLabel:
        "Anonymized engineering summary; underlying work is private.",
    },
  ],
};
