export type TraceSpan = {
  id: string;
  name: string;
  type: "llm" | "tool" | "sandbox" | "judge" | "chart" | "render" | "db";
  model?: string;
  duration: string;
  status: "success" | "retry" | "verified" | "saved";
  summary: string;
};

export const traceLabel =
  "Sanitized representative trace. Customer data, private prompts, and internal implementation details omitted.";

export const traceSpans: TraceSpan[] = [
  {
    id: "schema-normalize",
    name: "schema.normalize_survey",
    type: "db",
    duration: "184ms",
    status: "success",
    summary: "Survey columns mapped into typed analysis inputs.",
  },
  {
    id: "planner",
    name: "planner.expand_questions",
    type: "llm",
    model: "premium-reasoning",
    duration: "912ms",
    status: "success",
    summary: "14 insight tasks generated with dependency boundaries.",
  },
  {
    id: "codegen",
    name: "llm.generate_python",
    type: "llm",
    model: "sonnet-class",
    duration: "2.8s",
    status: "success",
    summary: "Python analysis code emitted for sandbox execution.",
  },
  {
    id: "sandbox",
    name: "sandbox.exec_analysis",
    type: "sandbox",
    duration: "5.2s",
    status: "success",
    summary: "Persistent sandbox reused across report tasks.",
  },
  {
    id: "judge",
    name: "judge.recompute_metric",
    type: "judge",
    model: "fast-verifier",
    duration: "3.4s",
    status: "verified",
    summary: "Independent verification recomputed the denominator.",
  },
  {
    id: "chart",
    name: "chart.score_visual_quality",
    type: "chart",
    duration: "730ms",
    status: "verified",
    summary: "Chart passed visual and semantic thresholds: 0.89.",
  },
  {
    id: "render",
    name: "pptx.render_native_slide",
    type: "render",
    duration: "1.1s",
    status: "success",
    summary: "Slide compiled from deck IR to native PowerPoint.",
  },
  {
    id: "router",
    name: "router.downgrade_model",
    type: "tool",
    duration: "saved 62%",
    status: "saved",
    summary: "Low-risk summarization moved to cheaper model tier.",
  },
];
