export type InterviewCategory =
  | "production-ai"
  | "architecture"
  | "evals-reliability"
  | "cost-infra"
  | "full-stack"
  | "leadership"
  | "risk-weaknesses"
  | "role-fit";

export type SourceCard = {
  title: string;
  href: string;
  snippet: string;
  proofIds: string[];
};

export type InterviewQuestion = {
  id: string;
  category: InterviewCategory;
  question: string;
  answerId: string;
  recommendedAudience: string;
};

export type InterviewAnswer = {
  id: string;
  summary: string;
  bullets: string[];
  sourceCards: SourceCard[];
};

export const interviewCategories: Record<InterviewCategory, string> = {
  "production-ai": "Production AI",
  architecture: "Architecture",
  "evals-reliability": "Evals and reliability",
  "cost-infra": "Cost and infra",
  "full-stack": "Full-stack execution",
  leadership: "Leadership and seniority",
  "risk-weaknesses": "Risk and weaknesses",
  "role-fit": "Role fit",
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: "why-not-langgraph",
    category: "architecture",
    question: "Why should we not just use LangGraph for orchestration?",
    answerId: "explicit-boundaries",
    recommendedAudience: "AI platform lead",
  },
  {
    id: "control-llm-costs",
    category: "cost-infra",
    question: "How do you control LLM and ML infrastructure costs?",
    answerId: "cost-as-architecture",
    recommendedAudience: "VP Engineering or platform lead",
  },
  {
    id: "avoid-hallucinated-insights",
    category: "evals-reliability",
    question:
      "How do you keep AI-generated analysis from becoming fluent but wrong?",
    answerId: "verification-boundaries",
    recommendedAudience: "Senior AI engineer",
  },
  {
    id: "full-stack-ai-execution",
    category: "full-stack",
    question: "Can you own the whole product path, not only the model layer?",
    answerId: "full-stack-ownership",
    recommendedAudience: "Hiring manager",
  },
  {
    id: "weakness-or-risk",
    category: "risk-weaknesses",
    question: "What is the risk in hiring you, and how do you manage it?",
    answerId: "risk-management",
    recommendedAudience: "Hiring manager",
  },
  {
    id: "best-fit-role",
    category: "role-fit",
    question: "What roles are the strongest fit?",
    answerId: "role-fit",
    recommendedAudience: "Recruiter or hiring lead",
  },
];

export const interviewAnswers: InterviewAnswer[] = [
  {
    id: "explicit-boundaries",
    summary:
      "The library is not the architecture. Production systems need explicit state, typed interfaces, retry boundaries, observability, evaluation hooks, and cost controls regardless of the orchestration framework.",
    bullets: [
      "At Knit, the durable unit was a DAG of inspectable tasks, not a vague autonomous loop.",
      "Explicit workflows made parallel execution, retries, judge verification, and debugging practical.",
      "Frameworks can help, but production ownership lives in the domain-specific boundaries around them.",
    ],
    sourceCards: [
      {
        title: "Agentic Market Research Platform",
        href: "/case-studies/agentic-market-research-platform#decision-theater",
        snippet:
          "Decision fork comparing free-form agents with explicit DAG execution.",
        proofIds: ["knit-turnaround", "knit-observability-platform"],
      },
    ],
  },
  {
    id: "cost-as-architecture",
    summary:
      "I treat cost as an architectural constraint. Cost control comes from task classification, model routing, sandbox reuse, caching, selective judge coverage, retry limits, and visibility into unit economics.",
    bullets: [
      "Knit required model routing, persistent sandbox reuse, and task-level observability.",
      "Epic required infrastructure ownership that reduced cost by 10x and pod usage by 100x.",
      "The Cost Anatomy challenge shows normalized cost units only, never actual internal figures.",
    ],
    sourceCards: [
      {
        title: "ML Infrastructure Rescue",
        href: "/case-studies/ml-infra-rescue",
        snippet: "Production ML ownership across cost and reliability.",
        proofIds: ["epic-cost-reduction", "epic-pod-reduction"],
      },
      {
        title: "Cost Anatomy",
        href: "/challenges/cost-anatomy",
        snippet:
          "Workflow unit economics model for routing and verification tradeoffs.",
        proofIds: ["representative-trace-label"],
      },
    ],
  },
  {
    id: "verification-boundaries",
    summary:
      "I separate generation from verification. For analytics, that means executable artifacts, independent checks, source-linked outputs, and failure modes that can be inspected instead of trusted blindly.",
    bullets: [
      "Generated Python gave analysis an executable audit path.",
      "Independent judge verification reduced self-confirming errors.",
      "Chart and narrative quality gates made artifact quality visible before deck assembly.",
    ],
    sourceCards: [
      {
        title: "Agentic Market Research Platform",
        href: "/case-studies/agentic-market-research-platform#evaluation",
        snippet: "Evaluation and reliability section for the flagship system.",
        proofIds: ["knit-sandbox-tasks", "knit-charts"],
      },
    ],
  },
  {
    id: "full-stack-ownership",
    summary:
      "My strongest work sits across product, backend, ML, data, frontend, and operations. I can connect model behavior to user-facing artifacts and production constraints.",
    bullets: [
      "Knit combined LLM orchestration, Python execution, charting, Deck IR, APIs, streaming, and observability.",
      "Epic combined ML infra, Elasticsearch, recommendations, Kubernetes, and product experiments.",
      "Osmo combined computer vision, learning-product UX, data collection, and real-time constraints.",
    ],
    sourceCards: [
      {
        title: "Case study grid",
        href: "/case-studies",
        snippet:
          "Breadth across LLM systems, infrastructure, search, CV, and product systems.",
        proofIds: [
          "knit-observability-platform",
          "epic-cost-reduction",
          "osmo-cv-accuracy",
        ],
      },
    ],
  },
  {
    id: "risk-management",
    summary:
      "The risk is that I can bias toward building robust systems when a team only needs a quick demo. I manage that by making scope gates explicit and choosing the lightest system that preserves correctness.",
    bullets: [
      "V1 of this portfolio deliberately avoided a live assistant until content and evals were ready.",
      "I prefer static, typed, reviewable artifacts first, then add dynamic systems when the proof is stable.",
      "That same discipline applies to product work: prototype quickly, but do not confuse a prototype with the architecture.",
    ],
    sourceCards: [
      {
        title: "Portfolio execution alignment",
        href: "/case-studies/agentic-market-research-platform#decision-theater",
        snippet: "The site itself stages static proof before live AI behavior.",
        proofIds: ["representative-trace-label"],
      },
    ],
  },
  {
    id: "role-fit",
    summary:
      "The strongest fit is a senior AI engineering role where production LLM systems, evaluation, observability, workflow architecture, and full-stack execution matter.",
    bullets: [
      "Strong fit: AI Platform Engineer, Senior AI Engineer, or LLM Systems Architect.",
      "Strong environments: serious AI products, workflow automation, analytics, research tooling, infra-heavy AI applications.",
      "Less ideal: pure research roles, frontend-only roles, or teams optimizing for demos over production systems.",
    ],
    sourceCards: [
      {
        title: "Case studies and proof points",
        href: "/case-studies",
        snippet: "Production systems across agentic AI, ML infrastructure, and computer vision.",
        proofIds: [
          "knit-turnaround",
          "epic-cost-reduction",
          "osmo-cv-accuracy",
        ],
      },
    ],
  },
];

export function answerById(id: string) {
  const answer = interviewAnswers.find((item) => item.id === id);
  if (!answer) throw new Error(`Missing interview answer: ${id}`);
  return answer;
}
