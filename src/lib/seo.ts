import type { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import { publicRoutes } from "@/lib/routes";

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  canonicalPath: string;
  openGraphTitle: string;
  openGraphDescription: string;
  lastModified: string;
};

export const routeSeoRegistry = {
  "/": {
    path: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    canonicalPath: "/",
    openGraphTitle: siteConfig.title,
    openGraphDescription: siteConfig.description,
    lastModified: "2026-05-05",
  },
  "/case-studies": {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "Production AI systems, ML infrastructure, computer vision, and AR vision case studies from Himadri Mishra.",
    canonicalPath: "/case-studies",
    openGraphTitle: "Case Studies by Himadri Mishra",
    openGraphDescription:
      "Production AI, ML infrastructure, search, computer vision, and AR vision work with proof-focused case studies.",
    lastModified: "2026-05-05",
  },
  "/case-studies/agentic-market-research-platform": {
    path: "/case-studies/agentic-market-research-platform",
    title: "Agentic Market Research Platform",
    description:
      "Case study on a production agentic research workflow for verified insights, charts, and native deck automation.",
    canonicalPath: "/case-studies/agentic-market-research-platform",
    openGraphTitle: "Agentic Market Research Platform Case Study",
    openGraphDescription:
      "A sanitized case study on DAG orchestration, code-backed analytics, evals, charts, and deck automation.",
    lastModified: "2026-05-05",
  },
  "/case-studies/ml-infra-rescue": {
    path: "/case-studies/ml-infra-rescue",
    title: "ML Infrastructure Rescue",
    description:
      "Case study on production ML platform ownership across cost, search, recommendations, and reliability.",
    canonicalPath: "/case-studies/ml-infra-rescue",
    openGraphTitle: "ML Infrastructure Rescue Case Study",
    openGraphDescription:
      "A sanitized case study on ML infrastructure ownership, search, recommendations, Kubernetes, and cost control.",
    lastModified: "2026-05-05",
  },
  "/case-studies/computer-vision-product-systems": {
    path: "/case-studies/computer-vision-product-systems",
    title: "Computer Vision Product Systems",
    description:
      "Case study on production computer vision systems, product integration, and measurable AI delivery.",
    canonicalPath: "/case-studies/computer-vision-product-systems",
    openGraphTitle: "Computer Vision Product Systems Case Study",
    openGraphDescription:
      "A sanitized case study on computer vision delivery, model quality, product integration, and production ownership.",
    lastModified: "2026-05-05",
  },
  "/case-studies/high-performance-ar-and-vision": {
    path: "/case-studies/high-performance-ar-and-vision",
    title: "High Performance AR and Vision",
    description:
      "Case study on high performance AR and computer vision work across real-time product constraints.",
    canonicalPath: "/case-studies/high-performance-ar-and-vision",
    openGraphTitle: "High Performance AR and Vision Case Study",
    openGraphDescription:
      "A sanitized case study on AR, vision performance, real-time constraints, and product-grade engineering.",
    lastModified: "2026-05-05",
  },
  "/resume": {
    path: "/resume",
    title: "Resume",
    description:
      "Resume and proof summary for Himadri Mishra, Senior AI Engineer focused on production AI systems.",
    canonicalPath: "/resume",
    openGraphTitle: "Himadri Mishra Resume",
    openGraphDescription:
      "Resume, public metrics, and proof summary for senior AI engineering and AI platform roles.",
    lastModified: "2026-05-05",
  },
  "/contact": {
    path: "/contact",
    title: "Contact",
    description:
      "Contact Himadri Mishra for senior AI engineering, AI platform, and production LLM systems conversations.",
    canonicalPath: "/contact",
    openGraphTitle: "Contact Himadri Mishra",
    openGraphDescription:
      "Start a senior AI engineering, AI platform, LLM systems, or architecture review conversation.",
    lastModified: "2026-05-05",
  },
  "/interview-me": {
    path: "/interview-me",
    title: "Interview Me",
    description:
      "Curated answers to hard production AI and architecture questions with source cards from public portfolio content.",
    canonicalPath: "/interview-me",
    openGraphTitle: "Interview Me: Production AI Answers",
    openGraphDescription:
      "Source-backed answers about public resume facts, sanitized case studies, evals, observability, cost, and architecture.",
    lastModified: "2026-05-05",
  },
  "/principles": {
    path: "/principles",
    title: "Production AI Principles",
    description:
      "Evidence-backed production AI beliefs about agents, evals, observability, cost, and architecture.",
    canonicalPath: "/principles",
    openGraphTitle: "Production AI Principles",
    openGraphDescription:
      "Stack opinions and operating principles grounded in production AI systems Himadri has operated.",
    lastModified: "2026-05-05",
  },
  "/challenges": {
    path: "/challenges",
    title: "Interactive Challenges",
    description:
      "Static production AI challenges for debugging, cost architecture, workflow recovery, and artifact inspection.",
    canonicalPath: "/challenges",
    openGraphTitle: "Production AI Interactive Challenges",
    openGraphDescription:
      "Small static labs for trace diagnosis, unit economics, DAG recovery, and inspectable generated artifacts.",
    lastModified: "2026-05-05",
  },
  "/challenges/debug-this-agent": {
    path: "/challenges/debug-this-agent",
    title: "Debug This Agent",
    description:
      "Inspect representative AI workflow traces and identify production failure modes from visible evidence.",
    canonicalPath: "/challenges/debug-this-agent",
    openGraphTitle: "Debug This Agent Challenge",
    openGraphDescription:
      "A static trace-diagnosis lab for production AI debugging, model routing, and verification failures.",
    lastModified: "2026-05-05",
  },
  "/challenges/cost-anatomy": {
    path: "/challenges/cost-anatomy",
    title: "Cost Anatomy",
    description:
      "A normalized static model of AI workflow unit economics and production cost controls.",
    canonicalPath: "/challenges/cost-anatomy",
    openGraphTitle: "Cost Anatomy Challenge",
    openGraphDescription:
      "A static AI unit economics model showing how routing, retries, sandbox reuse, and judges affect cost units.",
    lastModified: "2026-05-05",
  },
  "/challenges/dag-execution-simulator": {
    path: "/challenges/dag-execution-simulator",
    title: "DAG Execution Simulator",
    description:
      "A static simulator explaining explicit production AI workflow execution, recovery, and verification boundaries.",
    canonicalPath: "/challenges/dag-execution-simulator",
    openGraphTitle: "DAG Execution Simulator",
    openGraphDescription:
      "A production AI workflow simulator for dependency state, judge failure, recovery choices, and readiness gates.",
    lastModified: "2026-05-05",
  },
  "/challenges/deck-ir-previewer": {
    path: "/challenges/deck-ir-previewer",
    title: "Deck IR Previewer",
    description:
      "A synthetic Deck IR previewer showing inspectable AI-generated artifact structure and validation boundaries.",
    canonicalPath: "/challenges/deck-ir-previewer",
    openGraphTitle: "Deck IR Previewer",
    openGraphDescription:
      "A static artifact-inspection lab for synthetic Deck IR, validation errors, outline previews, and speaker notes.",
    lastModified: "2026-05-05",
  },
} satisfies Record<string, RouteSeo>;

export type PublicRoutePath = keyof typeof routeSeoRegistry;

export function buildCanonicalUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function getRouteSeo(path: string): RouteSeo {
  const seo = routeSeoRegistry[path as PublicRoutePath];
  if (!seo) throw new Error(`Missing SEO registry entry for public route: ${path}`);
  return seo;
}

export function buildOpenGraphMetadata(path: string): NonNullable<Metadata["openGraph"]> {
  const seo = getRouteSeo(path);
  return {
    title: seo.openGraphTitle,
    description: seo.openGraphDescription,
    url: buildCanonicalUrl(seo.canonicalPath),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Himadri Mishra, senior AI engineer building production agentic systems.",
      },
    ],
  };
}

export function buildPageMetadata(path: string): Metadata {
  const seo = getRouteSeo(path);
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: buildCanonicalUrl(seo.canonicalPath),
    },
    openGraph: buildOpenGraphMetadata(path),
  };
}

export function getPublicRouteSeoEntries() {
  return publicRoutes.map((route) => getRouteSeo(route.path));
}
