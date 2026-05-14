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
      "Reused a persistent E2B sandbox across 30-50 analytics tasks per report.",
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
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
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
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
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
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
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
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
    sourceLocator: "Tangible Play / Osmo experience, bullet 2",
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
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Tangible Play / Osmo experience, bullet 2",
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
    sourcePath: "public/resume/Himadri_Mishra_Resume.pdf",
    sourceLocator: "Tangible Play / Osmo experience, bullets 3-4",
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
    sourceLocator: "Projects and awards",
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
];

export function claimById(id: string) {
  const claim = proofClaims.find((item) => item.id === id);
  if (!claim) {
    throw new Error(`Missing proof claim: ${id}`);
  }
  return claim;
}
