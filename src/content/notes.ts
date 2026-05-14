export type NoteArtifactKind =
  | "synthetic"
  | "sanitized"
  | "normalized"
  | "representative";

export type NoteArtifact = {
  title: string;
  kind: NoteArtifactKind;
  visibleLabel: string;
  description: string;
};

export type NoteLink = {
  label: string;
  href: string;
};

export type Note = {
  id: string;
  title: string;
  dek: string;
  body: string[];
  proofIds: string[];
  publicLabel: string;
  artifacts: NoteArtifact[];
  relatedLinks: NoteLink[];
};

export const notePublicLabel =
  "Public note based on resume-backed experience and sanitized portfolio examples. Customer data, private prompts, proprietary traces, internal dashboards, and exact costs omitted.";

export const notes: Note[] = [
  {
    id: "state-before-autonomy",
    title: "State is the control surface for useful agents.",
    dek: "Autonomy works better when a system exposes state, retries, artifacts, and ownership boundaries instead of hiding them inside a chat transcript.",
    body: [
      "The most useful agent interfaces I have built or reviewed make progress inspectable. Plans, tool calls, intermediate artifacts, and reviewer decisions should be visible enough that a teammate can resume the work without guessing.",
      "That does not make the experience less intelligent. It makes the intelligence recoverable when model behavior, data quality, or product requirements shift.",
    ],
    proofIds: ["knit-observability-platform", "representative-trace-label"],
    publicLabel: notePublicLabel,
    artifacts: [
      {
        title: "Workflow trace sketch",
        kind: "representative",
        visibleLabel:
          "Representative sanitized workflow sketch. Customer data, private prompts, and proprietary traces omitted.",
        description:
          "A public-facing pattern for showing plan, execution, verification, and recovery states without exposing production logs.",
      },
    ],
    relatedLinks: [
      {
        label: "Read the production AI principles",
        href: "/principles",
      },
      {
        label: "Inspect the agent debugging challenge",
        href: "/challenges/debug-this-agent",
      },
    ],
  },
  {
    id: "cost-control-is-design",
    title: "Cost control belongs in product design, not after launch.",
    dek: "Routing, retry budgets, cache boundaries, and judge coverage are user-experience choices when they decide whether a workflow can run reliably.",
    body: [
      "Teams often discuss cost as an infrastructure cleanup. In AI products, cost is closer to interaction design because every extra retry, judge pass, sandbox setup, or premium model route changes who can use the system and how often.",
      "The durable pattern is to make cost tradeoffs explicit at the same layer where quality and latency tradeoffs are made.",
    ],
    proofIds: ["epic-cost-reduction", "knit-sandbox-tasks"],
    publicLabel: notePublicLabel,
    artifacts: [
      {
        title: "Cost anatomy model",
        kind: "normalized",
        visibleLabel:
          "Normalized cost model. Exact company costs, vendor prices, and private dashboards omitted.",
        description:
          "A public static model that compares architecture choices with normalized units instead of real currency.",
      },
    ],
    relatedLinks: [
      {
        label: "Open the normalized cost model",
        href: "/challenges/cost-anatomy",
      },
      {
        label: "Review the ML infrastructure case study",
        href: "/case-studies/ml-infra-rescue",
      },
    ],
  },
  {
    id: "evals-need-business-intent",
    title: "Evals should protect the business promise, not only the schema.",
    dek: "A valid JSON object can still answer the wrong question. Evaluation has to cover intent, provenance, and the artifact a user will trust.",
    body: [
      "Schema checks and execution checks are necessary, but they are not sufficient when the user cares about a decision. The verification path should know what the artifact is supposed to prove.",
      "For public portfolio examples, that also means marking synthetic and sanitized artifacts clearly so evidence does not imply access to private customer systems.",
    ],
    proofIds: ["knit-sandbox-tasks", "representative-trace-label"],
    publicLabel: notePublicLabel,
    artifacts: [
      {
        title: "Synthetic evaluation boundary",
        kind: "synthetic",
        visibleLabel:
          "Synthetic evaluation example. Customer data, private prompts, and internal reviewer notes omitted.",
        description:
          "A public-safe example for discussing judge coverage, reviewer escalation, and artifact correctness.",
      },
    ],
    relatedLinks: [
      {
        label: "Try the judge failure challenge",
        href: "/challenges/debug-this-agent",
      },
      {
        label: "Read the research platform case study",
        href: "/case-studies/agentic-market-research-platform#evaluation",
      },
    ],
  },
];
