import type { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import { publicRoutes, routeManifest } from "@/lib/routes";

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  canonicalPath: string;
  openGraphTitle: string;
  openGraphDescription: string;
  lastModified: string;
};

const sharedLastModified = "2026-05-01";

const routeSeoData = {
  "/": {
    title: "Himadri Mishra | Senior AI Engineer",
    description:
      "Senior AI Engineer building production grade agentic systems across LLM orchestration, evaluation, observability, ML infrastructure, search, and computer vision.",
    canonicalPath: "/",
    openGraphTitle: "Himadri Mishra | Senior AI Engineer",
    openGraphDescription:
      "Evidence first portfolio for senior AI engineering, AI platform, and production LLM systems work.",
    lastModified: sharedLastModified,
  },
  "/case-studies": {
    title: "AI Case Studies",
    description:
      "Production AI systems, ML infrastructure, computer vision, and AR vision case studies from Himadri Mishra.",
    canonicalPath: "/case-studies",
    openGraphTitle: "Production AI case studies",
    openGraphDescription:
      "Evidence backed AI systems work across agentic research workflows, ML platforms, computer vision, and AR vision products.",
    lastModified: sharedLastModified,
  },
  "/case-studies/agentic-market-research-platform": {
    title: "Agentic Research Platform Case Study",
    description:
      "Case study on a production agentic research workflow for verified insights, charts, and consulting grade PPTX decks.",
    canonicalPath: "/case-studies/agentic-market-research-platform",
    openGraphTitle: "Agentic research platform case study",
    openGraphDescription:
      "How a production AI workflow used DAG execution, sandboxed analytics, independent judging, and deck automation.",
    lastModified: sharedLastModified,
  },
  "/case-studies/ml-infra-rescue": {
    title: "ML Infrastructure Rescue Case Study",
    description:
      "Case study on production ML platform ownership across cost, search, recommendations, infrastructure, and reliability.",
    canonicalPath: "/case-studies/ml-infra-rescue",
    openGraphTitle: "ML infrastructure rescue case study",
    openGraphDescription:
      "Production ML platform work covering cost reduction, Kubernetes simplification, search, recommendations, and reliability.",
    lastModified: sharedLastModified,
  },
  "/case-studies/computer-vision-product-systems": {
    title: "Computer Vision Product Systems Case Study",
    description:
      "Case study on real time computer vision systems for education products under device, latency, and usability constraints.",
    canonicalPath: "/case-studies/computer-vision-product-systems",
    openGraphTitle: "Computer vision product systems case study",
    openGraphDescription:
      "Production computer vision systems for education products with real time constraints and product feedback loops.",
    lastModified: sharedLastModified,
  },
  "/case-studies/high-performance-ar-and-vision": {
    title: "High Performance AR and Vision Case Study",
    description:
      "Case study on high performance AR and vision systems built under mobile, latency, and product interaction constraints.",
    canonicalPath: "/case-studies/high-performance-ar-and-vision",
    openGraphTitle: "High performance AR and vision case study",
    openGraphDescription:
      "AR and vision engineering work shaped by mobile performance, reliability, and interactive product constraints.",
    lastModified: sharedLastModified,
  },
  "/resume": {
    title: "Resume and Proof Summary",
    description:
      "Resume and proof summary for Himadri Mishra, Senior AI Engineer focused on production AI systems and AI platforms.",
    canonicalPath: "/resume",
    openGraphTitle: "Resume and proof summary",
    openGraphDescription:
      "Download the latest resume and review concise senior AI engineering proof points.",
    lastModified: sharedLastModified,
  },
  "/contact": {
    title: "Contact Himadri Mishra",
    description:
      "Contact Himadri Mishra for senior AI engineering, AI platform, LLM systems, and production AI systems conversations.",
    canonicalPath: "/contact",
    openGraphTitle: "Contact Himadri Mishra",
    openGraphDescription:
      "Reach out about senior AI engineering, AI platform, LLM systems, and production AI system reviews.",
    lastModified: sharedLastModified,
  },
  "/interview-me": {
    title: "Interview Himadri with Source Cards",
    description:
      "Curated answers to hard production AI and architecture questions with source cards and visible evidence links.",
    canonicalPath: "/interview-me",
    openGraphTitle: "Interview Himadri with source cards",
    openGraphDescription:
      "Hard production AI questions answered with source cards, evidence links, and safe assistant boundaries.",
    lastModified: sharedLastModified,
  },
  "/principles": {
    title: "Production AI Principles",
    description:
      "Evidence backed production AI beliefs about agents, evals, observability, cost, reliability, and architecture.",
    canonicalPath: "/principles",
    openGraphTitle: "Production AI principles",
    openGraphDescription:
      "Practical engineering principles for agents, evals, observability, cost control, and production AI architecture.",
    lastModified: sharedLastModified,
  },
  "/notes": {
    title: "Production AI Notes",
    description:
      "Public-safe notes on agent architecture, evaluation, observability, cost control, and evidence-backed production AI practice.",
    canonicalPath: "/notes",
    openGraphTitle: "Production AI notes",
    openGraphDescription:
      "Short notes on reliable AI systems with proof-backed claims and clear sanitized artifact labels.",
    lastModified: sharedLastModified,
  },
  "/challenges": {
    title: "Interactive AI Challenges",
    description:
      "Static production AI challenges for debugging, cost architecture, workflow recovery, and deck artifact review.",
    canonicalPath: "/challenges",
    openGraphTitle: "Interactive production AI challenges",
    openGraphDescription:
      "Inspect small production AI labs for trace debugging, cost design, workflow recovery, and deck IR review.",
    lastModified: sharedLastModified,
  },
  "/challenges/debug-this-agent": {
    title: "Debug This Agent Challenge",
    description:
      "Inspect a representative AI workflow trace and identify the production failure mode behind the agent behavior.",
    canonicalPath: "/challenges/debug-this-agent",
    openGraphTitle: "Debug This Agent challenge",
    openGraphDescription:
      "A representative trace diagnosis lab for production AI workflow failure modes.",
    lastModified: sharedLastModified,
  },
  "/challenges/cost-anatomy": {
    title: "Cost Anatomy Challenge",
    description:
      "A normalized static model of AI workflow unit economics and production cost control tradeoffs.",
    canonicalPath: "/challenges/cost-anatomy",
    openGraphTitle: "Cost Anatomy challenge",
    openGraphDescription:
      "Inspect how routing, retries, sandbox reuse, and judge coverage move normalized AI workflow cost units.",
    lastModified: sharedLastModified,
  },
  "/challenges/dag-execution-simulator": {
    title: "DAG Execution Simulator Challenge",
    description:
      "A static simulator explaining explicit production AI workflow execution, recovery, and downstream readiness.",
    canonicalPath: "/challenges/dag-execution-simulator",
    openGraphTitle: "DAG Execution Simulator challenge",
    openGraphDescription:
      "Step through workflow state, judge failure, recovery choices, and downstream readiness in a static simulator.",
    lastModified: sharedLastModified,
  },
  "/challenges/deck-ir-previewer": {
    title: "Deck IR Previewer Challenge",
    description:
      "A synthetic Deck IR previewer showing inspectable AI generated artifact structure, validation, and preview boundaries.",
    canonicalPath: "/challenges/deck-ir-previewer",
    openGraphTitle: "Deck IR Previewer challenge",
    openGraphDescription:
      "Inspect synthetic deck intermediate representation, validation warnings, outline, preview, and speaker notes.",
    lastModified: sharedLastModified,
  },
} satisfies Record<string, Omit<RouteSeo, "path">>;

export const routeSeoEntries: RouteSeo[] = Object.entries(routeSeoData).map(
  ([path, seo]) => ({ path, ...seo }),
);

const routeSeoByPath = new Map(
  routeSeoEntries.map((entry) => [entry.path, entry] as const),
);

export function getRouteSeo(path: string): RouteSeo {
  const seo = routeSeoByPath.get(path);
  if (!seo) throw new Error(`Missing SEO registry entry for route: ${path}`);
  return seo;
}

export function buildCanonicalUrl(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error(`Canonical path must start with /: ${path}`);
  }
  return new URL(path, siteConfig.url).toString();
}

export function buildOpenGraphMetadata(path: string): Metadata["openGraph"] {
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
    title: path === "/" ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: {
      canonical: buildCanonicalUrl(seo.canonicalPath),
    },
    openGraph: buildOpenGraphMetadata(path),
    twitter: {
      card: "summary_large_image",
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      images: [
        {
          url: "/og-image.png",
          alt: "Himadri Mishra, senior AI engineer building production agentic systems.",
        },
      ],
    },
  };
}

export function assertSeoRegistryMatchesPublicRoutes(): string[] {
  const errors: string[] = [];
  const publicPaths = new Set(publicRoutes.map((route) => route.path));
  const manifestPaths = new Set(routeManifest.map((route) => route.path));

  for (const route of publicRoutes) {
    if (!routeSeoByPath.has(route.path)) {
      errors.push(`public route missing SEO registry entry: ${route.path}`);
    }
  }

  for (const entry of routeSeoEntries) {
    if (!manifestPaths.has(entry.path)) {
      errors.push(`SEO registry contains unknown route: ${entry.path}`);
    }
    if (!publicPaths.has(entry.path)) {
      errors.push(`SEO registry contains non-public route: ${entry.path}`);
    }
    if (entry.canonicalPath !== entry.path) {
      errors.push(`SEO canonical path must match route path: ${entry.path}`);
    }
  }

  return errors;
}
