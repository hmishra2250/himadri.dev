export type TraceSpan = {
  id: string;
  name: string;
  type: "llm" | "tool" | "sandbox" | "judge" | "chart" | "render";
  durationMs: number;
  status: "success" | "warning" | "retry" | "failed";
  summary: string;
  costUnits?: number;
};

export type DiagnosisChoice = {
  id: string;
  label: string;
  explanation: string;
};

export type DebugScenario = {
  id: string;
  title: string;
  difficulty: "medium" | "hard";
  symptom: string;
  spans: TraceSpan[];
  choices: DiagnosisChoice[];
  correctChoiceId: string;
  diagnosis: string;
  fix: string;
  proofIds: string[];
  publicLabel: string;
  reviewerSignoff: {
    reviewer: string;
    date: string;
    decision: "approved";
    checklist: string[];
  };
};

export type CostModel = {
  id: string;
  label: string;
  totalUnits: number;
  summary: string;
  categories: { label: string; units: number; note: string }[];
};

export const challengePublicLabel =
  "Representative sanitized scenario. Customer data, private prompts, internal traces, and exact company costs omitted.";

export const debugScenarios: DebugScenario[] = [
  {
    id: "wrong-model-routing",
    title: "Wrong Model Routing",
    difficulty: "medium",
    symptom: "Report cost increased unexpectedly while quality stayed flat.",
    spans: [
      {
        id: "plan-insights",
        name: "plan_insights",
        type: "llm",
        durationMs: 1800,
        status: "success",
        summary:
          "Planner selected 24 low-risk summary tasks after schema inspection.",
        costUnits: 6,
      },
      {
        id: "rewrite-summaries",
        name: "summary.rewrite",
        type: "llm",
        durationMs: 9200,
        status: "warning",
        summary:
          "Premium model handled 240 low-value summary rewrites that should have used a cheaper route.",
        costUnits: 64,
      },
      {
        id: "judge-sampling",
        name: "judge.sample_high_risk",
        type: "judge",
        durationMs: 2400,
        status: "success",
        summary:
          "Judge coverage stayed correctly limited to high-risk insights.",
        costUnits: 9,
      },
      {
        id: "deck-render",
        name: "deck.render",
        type: "render",
        durationMs: 3100,
        status: "success",
        summary:
          "Deck rendered normally, so the cost anomaly came from model routing, not rendering.",
        costUnits: 4,
      },
    ],
    choices: [
      {
        id: "sandbox-reuse",
        label: "The sandbox was not reused across tasks.",
        explanation:
          "Plausible, but the trace does not show repeated sandbox setup or execution retries.",
      },
      {
        id: "model-routing",
        label:
          "Model routing failed to downgrade low-value summarization tasks.",
        explanation:
          "Correct. The suspicious span is summary.rewrite using a premium model for low-risk work.",
      },
      {
        id: "judge-coverage",
        label: "Judge coverage was too broad and verified every output.",
        explanation:
          "Plausible in many systems, but this trace says judge coverage stayed limited to high-risk insights.",
      },
      {
        id: "deck-rendering",
        label: "Deck rendering became the dominant cost center.",
        explanation:
          "The render span is normal and low cost relative to the summary rewrite span.",
      },
    ],
    correctChoiceId: "model-routing",
    diagnosis:
      "The routing policy treated summary rewrites like high-value reasoning tasks. Low-risk transforms should have used a cheaper model with explicit quality sampling.",
    fix: "Add task-class-based model routing, budget alerts per node type, and a regression test that fails when low-risk summary tasks use premium routes.",
    proofIds: ["knit-observability-platform", "representative-trace-label"],
    publicLabel: challengePublicLabel,
    reviewerSignoff: {
      reviewer: "Ralplan critic gate",
      date: "2026-04-30",
      decision: "approved",
      checklist: [
        "plausible distractors",
        "non-obvious but sufficient trace clues",
        "complete diagnosis and fix",
        "source and confidentiality labels present",
        "keyboard-operable static reveal",
        "standalone hiring signal",
      ],
    },
  },
  {
    id: "judge-false-positive",
    title: "Judge False Positive",
    difficulty: "hard",
    symptom:
      "An insight was marked verified, but a business reviewer flagged the conclusion as wrong.",
    spans: [
      {
        id: "select-denominator",
        name: "analysis.select_denominator",
        type: "llm",
        durationMs: 2100,
        status: "warning",
        summary:
          "Generated code used all respondents instead of the filtered buyer segment.",
        costUnits: 8,
      },
      {
        id: "execute-analysis",
        name: "sandbox.execute",
        type: "sandbox",
        durationMs: 3400,
        status: "success",
        summary: "Python executed successfully and produced a valid table.",
        costUnits: 7,
      },
      {
        id: "judge-code",
        name: "judge.verify_execution",
        type: "judge",
        durationMs: 2800,
        status: "success",
        summary:
          "Judge verified code execution but did not validate question intent.",
        costUnits: 10,
      },
      {
        id: "narrative",
        name: "narrative.summarize",
        type: "llm",
        durationMs: 1800,
        status: "failed",
        summary:
          "Narrative over-trusted the verified table and missed the denominator mismatch.",
        costUnits: 5,
      },
    ],
    choices: [
      {
        id: "execution-crash",
        label: "The generated Python crashed before producing a table.",
        explanation:
          "The sandbox span succeeded, so this is not an execution failure.",
      },
      {
        id: "semantic-judge-gap",
        label:
          "The judge checked execution but not semantic alignment to the question.",
        explanation:
          "Correct. The trace says the judge verified execution while denominator intent drifted.",
      },
      {
        id: "chart-render",
        label: "Chart rendering corrupted the table values.",
        explanation: "No chart render span appears in this failure path.",
      },
      {
        id: "retry-budget",
        label: "Retry budget was exhausted before verification.",
        explanation:
          "The trace shows verification ran and passed the wrong criterion.",
      },
    ],
    correctChoiceId: "semantic-judge-gap",
    diagnosis:
      "The verification path checked computational validity but not whether the selected denominator matched the business question.",
    fix: "Add question-intent assertions, denominator-specific checks, and judge prompts that compare the generated calculation against the user's segment definition.",
    proofIds: ["knit-sandbox-tasks", "representative-trace-label"],
    publicLabel: challengePublicLabel,
    reviewerSignoff: {
      reviewer: "Ralph V2 challenge gate",
      date: "2026-04-30",
      decision: "approved",
      checklist: [
        "plausible distractors",
        "non-obvious but sufficient trace clues",
        "complete diagnosis and fix",
        "source and confidentiality labels present",
        "keyboard-operable static reveal",
        "standalone hiring signal",
      ],
    },
  },
];

export const costModels: CostModel[] = [
  {
    id: "naive",
    label: "Naive implementation",
    totalUnits: 100,
    summary:
      "Every step uses expensive defaults, retries are broad, and verification lacks risk targeting.",
    categories: [
      { label: "LLM planning", units: 12, note: "No task classification." },
      {
        label: "LLM code generation",
        units: 24,
        note: "Premium route used by default.",
      },
      {
        label: "Sandbox execution",
        units: 14,
        note: "Setup repeated too often.",
      },
      { label: "Judge verification", units: 22, note: "Broad judge coverage." },
      { label: "Chart rendering", units: 8, note: "No batching." },
      {
        label: "Deck rendering",
        units: 6,
        note: "Late failures are expensive.",
      },
      { label: "Retries", units: 10, note: "Retry policy is not task-aware." },
      { label: "Observability", units: 4, note: "Basic traces only." },
    ],
  },
  {
    id: "optimized",
    label: "Optimized implementation",
    totalUnits: 42,
    summary:
      "Routing, caching, sandbox reuse, and selective verification remove most waste while preserving quality.",
    categories: [
      {
        label: "LLM planning",
        units: 6,
        note: "Plan once, reuse task metadata.",
      },
      {
        label: "LLM code generation",
        units: 10,
        note: "Cheaper models for low-risk transforms.",
      },
      {
        label: "Sandbox execution",
        units: 6,
        note: "Persistent sandbox reuse.",
      },
      {
        label: "Judge verification",
        units: 8,
        note: "Risk-targeted coverage.",
      },
      { label: "Chart rendering", units: 4, note: "Batch validation." },
      { label: "Deck rendering", units: 3, note: "Earlier IR checks." },
      { label: "Retries", units: 3, note: "Bounded retries per task class." },
      {
        label: "Observability",
        units: 2,
        note: "Useful spans without noisy payloads.",
      },
    ],
  },
  {
    id: "production",
    label: "Final production pattern",
    totalUnits: 27,
    summary:
      "The system spends on high-risk reasoning and verification while keeping low-value transforms cheap.",
    categories: [
      { label: "LLM planning", units: 4, note: "Typed task plans." },
      {
        label: "LLM code generation",
        units: 7,
        note: "Model routing by risk.",
      },
      {
        label: "Sandbox execution",
        units: 4,
        note: "Warm reusable execution.",
      },
      {
        label: "Judge verification",
        units: 5,
        note: "High-risk only with sampling.",
      },
      { label: "Chart rendering", units: 2, note: "Validated chart specs." },
      {
        label: "Deck rendering",
        units: 2,
        note: "IR catches failures earlier.",
      },
      { label: "Retries", units: 2, note: "Strict retry budgets." },
      {
        label: "Observability",
        units: 1,
        note: "Lean traces and cost counters.",
      },
    ],
  },
];

export function getDebugScenario(id: string) {
  return debugScenarios.find((scenario) => scenario.id === id);
}
