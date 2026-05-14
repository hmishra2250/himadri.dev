import { claimById } from "./proof";

export type Metric = {
  id: string;
  value: string;
  label: string;
  context: string;
  proofId: string;
  href?: string;
  priority: number;
};

export const metrics: Metric[] = [
  {
    id: "turnaround",
    value: "48-72h → <1h",
    label: "Report turnaround",
    context:
      "Consulting-grade market research reports with insights, charts, and native PPTX output.",
    proofId: "knit-turnaround",
    href: "/case-studies/agentic-market-research-platform",
    priority: 1,
  },
  {
    id: "infra-cost",
    value: "10x",
    label: "ML infra cost reduction",
    context:
      "Production ML platform simplification after taking ownership of search, discovery, and recommendations.",
    proofId: "epic-cost-reduction",
    href: "/case-studies/ml-infra-rescue",
    priority: 2,
  },
  {
    id: "cv-accuracy",
    value: "93% → 98%",
    label: "CV accuracy lift",
    context:
      "Worksheet recognition improvement for education products used by real learners.",
    proofId: "osmo-cv-accuracy",
    href: "/case-studies/computer-vision-product-systems",
    priority: 3,
  },
  {
    id: "kaggle",
    value: "Top 6%",
    label: "Global Kaggle rank",
    context: "FIDE and Google Efficient Chess AI Challenge, 2025.",
    proofId: "kaggle-top-six",
    href: "/resume",
    priority: 4,
  },
  {
    id: "sandbox-tasks",
    value: "30-50",
    label: "Sandbox tasks per report",
    context:
      "Persistent analytics sandbox execution with independent judge verification.",
    proofId: "knit-sandbox-tasks",
    href: "/case-studies/agentic-market-research-platform",
    priority: 5,
  },
  {
    id: "charts",
    value: "15-25",
    label: "Charts per report",
    context:
      "Highcharts visualizations generated with multi-threshold scoring.",
    proofId: "knit-charts",
    href: "/case-studies/agentic-market-research-platform",
    priority: 6,
  },
];

export const metricProofs = metrics.map((metric) => claimById(metric.proofId));
