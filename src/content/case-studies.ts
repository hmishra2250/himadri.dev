export type DecisionFork = {
  title: string;
  context: string;
  chosen: string;
  chosenOptionIndex: number;
  options: { label: string; pros: string[]; cons: string[] }[];
  why: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  period: string;
  role: string;
  domains: string[];
  summary: string;
  problem: string;
  constraints: string[];
  architecture: string[];
  decisions: DecisionFork[];
  evaluation: string[];
  observability: string[];
  metrics: string[];
  reflection: string;
  proofIds: string[];
  isFlagship?: boolean;
  routeEnabled: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "agentic-market-research-platform",
    title: "Agentic Market Research Platform",
    subtitle:
      "Raw survey data to verified insights, charts, and consulting-grade PPTX decks.",
    company: "Knit",
    period: "May 2025 – April 2026",
    role: "Senior AI Engineer / principal architect for India AI team",
    domains: [
      "LLM systems",
      "DAG orchestration",
      "Evals",
      "Sandbox execution",
      "Deck automation",
    ],
    summary:
      "Architected a production agentic research workflow that transformed analyst-heavy reporting into a verified AI execution pipeline.",
    problem:
      "Market research reporting required analysts to process survey data, write insights, generate charts, validate findings, and assemble polished decks. The bottleneck was not text generation alone; the system needed numerical correctness, artifact quality, observability, and recovery boundaries.",
    constraints: [
      "Insights needed numerical correctness, not fluent guesses.",
      "Charts needed to be visually usable and connected to evidence.",
      "Reports needed consulting-grade native PowerPoint output.",
      "Workflow execution needed parallelism, retries, and traceability.",
      "Private prompts, customer data, internal traces, and proprietary implementation details must remain omitted from public discussion.",
    ],
    architecture: [
      "Raw survey data",
      "Data ingestion and schema normalization",
      "Task planning",
      "DAG execution",
      "LLM Python code generation",
      "Persistent sandbox execution",
      "Independent judge verification",
      "Insight synthesis",
      "Highcharts chart generation",
      "Visual quality scoring",
      "Deck intermediate representation",
      "HTML preview",
      "Native PPTX export",
    ],
    decisions: [
      {
        title: "Free-form agents vs explicit DAG",
        context:
          "The workflow needed parallel execution and reliable recovery, not just autonomous behavior.",
        chosen: "Explicit DAG orchestration",
        chosenOptionIndex: 1,
        options: [
          {
            label: "Free-form autonomous loop",
            pros: ["Fast to prototype", "Flexible exploration"],
            cons: [
              "Hard to debug",
              "Hard to parallelize",
              "Unclear retry boundaries",
            ],
          },
          {
            label: "Explicit DAG execution",
            pros: [
              "Deterministic dependencies",
              "Node-level observability",
              "Parallel execution",
              "Clear retries",
            ],
            cons: ["More upfront structure", "Requires domain modeling"],
          },
        ],
        why: "Production workflows need predictable execution and debugging more than theatrical autonomy.",
      },
      {
        title: "LLM-only insights vs code-backed analysis",
        context:
          "Survey analytics cannot rely on plausible natural language when denominators and filters matter.",
        chosen: "LLM-generated Python with sandbox execution",
        chosenOptionIndex: 1,
        options: [
          {
            label: "Ask LLM from summaries",
            pros: ["Lower engineering complexity", "Fast response"],
            cons: [
              "Hallucinated metrics",
              "Unsupported conclusions",
              "Weak audit trail",
            ],
          },
          {
            label: "Generate and execute Python",
            pros: [
              "Evidence-backed outputs",
              "Inspectable calculations",
              "Better validation hooks",
            ],
            cons: ["Sandboxing required", "More latency and orchestration"],
          },
        ],
        why: "For business reporting, numerical correctness matters more than generation convenience.",
      },
      {
        title: "Self-check vs independent judge",
        context:
          "A system that verifies itself can still agree with its own mistakes.",
        chosen: "Independent judge with separate sandbox execution",
        chosenOptionIndex: 1,
        options: [
          {
            label: "Same-model self-check",
            pros: ["Cheaper", "Simple"],
            cons: ["Self-confirming errors", "Weak semantic validation"],
          },
          {
            label: "Independent judge",
            pros: [
              "Recomputes evidence",
              "Catches silent failures",
              "Improves trust",
            ],
            cons: ["Higher cost", "More latency"],
          },
        ],
        why: "Verification is the difference between a demo and a production AI system.",
      },
    ],
    evaluation: [
      "Independent judge verification recomputed results in a separate sandbox path.",
      "Chart outputs passed multi-threshold quality scoring before deck assembly.",
      "Retry semantics were tied to task boundaries rather than vague agent state.",
    ],
    observability: [
      "OpenTelemetry and Langfuse made model calls, spans, failures, and cost inspectable.",
      "Task-level traces exposed latency, retries, and model routing behavior.",
      "Generated APIs and SSE streaming made execution state visible to product surfaces.",
    ],
    metrics: [
      "48-72h → <1h report turnaround",
      "30-50 sandboxed analytics tasks per report",
      "15-25 Highcharts charts per report",
      "Multi-provider LLM routing and shared Python agent platform",
    ],
    reflection:
      "The durable lesson is that production AI systems are less about an agent loop and more about explicit boundaries: typed inputs, executable artifacts, independent verification, observability, and unit economics.",
    proofIds: [
      "knit-turnaround",
      "knit-sandbox-tasks",
      "knit-charts",
      "knit-observability-platform",
    ],
    isFlagship: true,
    routeEnabled: true,
  },
  {
    slug: "ml-infra-rescue",
    title: "ML Infrastructure Rescue",
    subtitle:
      "Production ML platform ownership across cost, search, recommendations, and reliability.",
    company: "Epic! for Kids",
    period: "February 2023 – May 2024",
    role: "Senior Research Engineer",
    domains: [
      "ML infra",
      "Kubernetes",
      "Search",
      "Recommendations",
      "Cost optimization",
    ],
    summary:
      "Took ownership of production ML systems after layoffs and reduced cost, complexity, and operational risk.",
    problem:
      "The ML platform needed ownership across discovery, recommendations, search, Docker builds, Kubernetes usage, spot instance stability, and product experiments.",
    constraints: [
      "Keep production systems running",
      "Reduce operational cost",
      "Improve search relevance",
      "Support backend/frontend/analytics needs",
    ],
    architecture: [
      "ML services",
      "Docker build pipeline",
      "Kubernetes deployment",
      "Spot compute",
      "Elasticsearch autocomplete",
      "Recommendations",
      "A/B testing",
    ],
    decisions: [
      {
        title: "Scale existing infrastructure vs simplify it",
        context:
          "Cost and reliability problems were symptoms of complexity, not just capacity.",
        chosen: "Simplify infrastructure",
        chosenOptionIndex: 1,
        options: [
          {
            label: "Scale existing pattern",
            pros: ["Less migration work"],
            cons: ["Preserves cost and fragility"],
          },
          {
            label: "Simplify usage",
            pros: ["Lower cost", "Smaller failure surface"],
            cons: ["Requires deeper investigation"],
          },
        ],
        why: "Reducing unnecessary infrastructure can be more powerful than tuning it.",
      },
    ],
    evaluation: [
      "Measured search relevance against the prior autocomplete solution.",
      "Tracked infrastructure cost and operational error reduction.",
    ],
    observability: [
      "Used production metrics and error behavior to prioritize high-impact infrastructure fixes.",
    ],
    metrics: [
      "10x ML platform cost reduction",
      "100x Kubernetes pod usage reduction",
      "99% spot instance error reduction",
      "50% Docker build-time reduction",
    ],
    reflection:
      "Senior ML ownership often means cleaning up cost, reliability, and product feedback loops, not only training models.",
    proofIds: [
      "epic-cost-reduction",
      "epic-pod-reduction",
      "epic-docker-build-time",
    ],
    routeEnabled: true,
  },
  {
    slug: "computer-vision-product-systems",
    title: "Computer Vision Product Systems",
    subtitle:
      "Real-time CV systems for education products under device and usability constraints.",
    company: "Tangible Play / Osmo",
    period: "September 2019 – February 2023",
    role: "Senior Research Engineer / CV lead",
    domains: [
      "Computer vision",
      "Real-time ML",
      "Java deployment",
      "Education products",
    ],
    summary:
      "Led CV systems that improved worksheet recognition accuracy and supported interactive learning workflows.",
    problem:
      "Education products required reliable computer vision under varied lighting, paper positions, device constraints, and real-time interaction expectations.",
    constraints: [
      "Device performance",
      "Real-world lighting",
      "Low-latency interaction",
      "High recognition accuracy",
      "Product feedback loops",
    ],
    architecture: [
      "Image/video input",
      "Detection and segmentation",
      "Post-processing",
      "Real-time inference",
      "Java deployment",
      "Product feedback",
    ],
    decisions: [
      {
        title: "Offline accuracy vs product-fit model",
        context:
          "A model that wins offline but misses latency constraints fails the product.",
        chosen: "Production-fit CV system",
        chosenOptionIndex: 1,
        options: [
          {
            label: "Larger model",
            pros: ["Higher offline ceiling"],
            cons: ["Latency/device risk"],
          },
          {
            label: "Production-fit model",
            pros: ["Better real-time usability"],
            cons: ["Requires careful tradeoffs"],
          },
        ],
        why: "Interactive learning depends on reliable user experience, not leaderboard-only accuracy.",
      },
    ],
    evaluation: [
      "Tracked worksheet recognition accuracy improvement and real-time shaded-region IoU.",
    ],
    observability: [
      "Product usage and engagement outcomes guided CV system iteration.",
    ],
    metrics: [
      "93% → 98% worksheet CV accuracy",
      "80% IoU shaded-region detection",
      "20% engagement improvement",
      "99% manual tagging effort reduction",
    ],
    reflection:
      "This work proves ML product depth outside the LLM trend cycle: real users, device constraints, deployment, and feedback loops.",
    proofIds: [
      "osmo-cv-accuracy",
      "osmo-shaded-region-iou",
      "osmo-engagement-tagging",
    ],
    routeEnabled: true,
  },
  {
    slug: "high-performance-ar-and-vision",
    title: "High-Performance AR and Vision",
    subtitle:
      "Low-level C++ vision and monocular depth research in an AR startup environment.",
    company: "Whodat",
    period: "July 2018 – August 2019",
    role: "Deep Learning Engineer",
    domains: ["C++", "ORB", "SLAM-style vision", "Monocular depth", "AR"],
    summary:
      "Built and researched performance-sensitive vision primitives before the team transitioned to Osmo after acquisition.",
    problem:
      "AR systems needed fast feature detection and research depth around monocular depth estimation.",
    constraints: [
      "Runtime performance",
      "C++ implementation",
      "Startup ambiguity",
      "Research-to-product translation",
    ],
    architecture: [
      "Camera input",
      "ORB feature detection",
      "Vision tracking primitives",
      "Depth estimation research",
      "AR product experiments",
    ],
    decisions: [
      {
        title: "Use standard primitive vs optimize core detector",
        context:
          "Vision performance depends on low-level primitives that run constantly.",
        chosen: "Optimized C++ detector",
        chosenOptionIndex: 1,
        options: [
          {
            label: "Use existing detector",
            pros: ["Lower engineering cost"],
            cons: ["Baseline performance only"],
          },
          {
            label: "Optimize detector",
            pros: ["Better runtime characteristics"],
            cons: ["Higher implementation effort"],
          },
        ],
        why: "Low-level performance work compounds across real-time AR pipelines.",
      },
    ],
    evaluation: ["Benchmarked detector speed against ORB-SLAM baseline."],
    observability: ["Performance measurement drove optimization choices."],
    metrics: ["20% faster ORB detector than ORB-SLAM baseline"],
    reflection:
      "This work gives the portfolio low-level systems depth alongside modern LLM platform work.",
    proofIds: ["whodat-orb"],
    routeEnabled: true,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug && study.routeEnabled);
}

export const flagshipCaseStudy = caseStudies.find((study) => study.isFlagship)!;
