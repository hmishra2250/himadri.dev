import { profile } from "@/content/profile";
import { claimById } from "@/content/proof";

export type AboutProofCard = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  proofId: string;
  href: string;
};

export type AboutOperatingPrinciple = {
  title: string;
  body: string;
};

const proofIds = {
  agenticResearch: "knit-turnaround",
  mlPlatform: "epic-cost-reduction",
  visionSystems: "osmo-cv-accuracy",
} as const;

export const aboutPage = {
  eyebrow: "About",
  title: "Production AI engineer with proof-backed systems range.",
  intro: profile.positioning,
  summary:
    "I work best where AI prototypes need to become reliable products: explicit workflows, observable model calls, evaluation loops, retrievable evidence, and product surfaces that explain what the system did.",
  proofCards: [
    {
      id: "agentic-research",
      eyebrow: "Agentic systems",
      title: "Research workflows that produce reviewable artifacts",
      summary:
        "Built around source tracking, sandboxed analysis, chart generation, independent judging, and deck-ready outputs rather than opaque chat transcripts.",
      proofId: proofIds.agenticResearch,
      href: "/case-studies/agentic-market-research-platform",
    },
    {
      id: "ml-platform",
      eyebrow: "Platform ownership",
      title: "ML infrastructure work tied to operational outcomes",
      summary:
        "Comfortable taking ownership of production ML systems where cost, reliability, Kubernetes operations, search, and recommendation behavior all interact.",
      proofId: proofIds.mlPlatform,
      href: "/case-studies/ml-infra-rescue",
    },
    {
      id: "vision-products",
      eyebrow: "Computer vision",
      title: "Vision systems shaped by product constraints",
      summary:
        "Experience connecting model quality, latency, device constraints, and user-facing education workflows instead of treating CV as an isolated model problem.",
      proofId: proofIds.visionSystems,
      href: "/case-studies/computer-vision-product-systems",
    },
  ] satisfies AboutProofCard[],
  principles: [
    {
      title: "Make claims traceable",
      body: "Public pages should point back to approved proof metadata, source cards, or visibly labeled representative artifacts.",
    },
    {
      title: "Prefer explicit workflows",
      body: "For production AI, I favor inspectable DAGs, recovery states, evals, and logs over unstructured prompt chains.",
    },
    {
      title: "Design for handoff",
      body: "The work is only durable when another engineer can understand the contract, failure mode, and evidence trail.",
    },
  ] satisfies AboutOperatingPrinciple[],
  ctas: [
    {
      label: "Review case studies",
      href: "/case-studies",
    },
    {
      label: "Interview with source cards",
      href: "/interview-me",
    },
    {
      label: "Download resume",
      href: profile.resumePath,
    },
  ],
};

export const aboutProofClaims = aboutPage.proofCards.map((card) => ({
  ...card,
  proof: claimById(card.proofId),
}));
