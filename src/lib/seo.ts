import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
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

const SEO_LAST_MODIFIED = "2026-05-05T00:00:00.000Z";

const staticRouteSeo = {
  "/": {
    path: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    canonicalPath: "/",
    openGraphTitle: siteConfig.title,
    openGraphDescription: siteConfig.description,
    lastModified: SEO_LAST_MODIFIED,
  },
  "/case-studies": {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "Production AI systems, ML infrastructure, computer vision, and AR vision case studies from Himadri Mishra.",
    canonicalPath: "/case-studies",
    openGraphTitle: "Case Studies | Himadri Mishra",
    openGraphDescription:
      "Evidence-backed case studies across production AI systems, ML infrastructure, computer vision, and AR vision work.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/resume": {
    path: "/resume",
    title: "Resume",
    description:
      "Resume and proof summary for Himadri Mishra, Senior AI Engineer.",
    canonicalPath: "/resume",
    openGraphTitle: "Resume | Himadri Mishra",
    openGraphDescription:
      "Download the latest resume and review evidence-backed senior AI engineering proof points.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/contact": {
    path: "/contact",
    title: "Contact",
    description:
      "Contact Himadri Mishra for senior AI engineering, AI platform, and production LLM systems conversations.",
    canonicalPath: "/contact",
    openGraphTitle: "Contact | Himadri Mishra",
    openGraphDescription:
      "Reach Himadri Mishra for production AI systems, AI platform, and senior engineering conversations.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/interview-me": {
    path: "/interview-me",
    title: "Interview Me",
    description:
      "Curated answers to hard production AI and architecture questions with source cards.",
    canonicalPath: "/interview-me",
    openGraphTitle: "Interview Me | Himadri Mishra",
    openGraphDescription:
      "Source-backed answers to production AI, architecture, evaluation, cost, and platform interview questions.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/principles": {
    path: "/principles",
    title: "Production AI Principles",
    description:
      "Evidence-backed production AI beliefs about agents, evals, observability, cost, and architecture.",
    canonicalPath: "/principles",
    openGraphTitle: "Production AI Principles | Himadri Mishra",
    openGraphDescription:
      "Operational principles for production AI systems, agents, evals, observability, and cost control.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/challenges": {
    path: "/challenges",
    title: "Interactive Challenges",
    description:
      "Static production AI challenges for debugging and cost architecture review.",
    canonicalPath: "/challenges",
    openGraphTitle: "Interactive Challenges | Himadri Mishra",
    openGraphDescription:
      "Inspectable production AI challenges for debugging traces, cost architecture, workflow recovery, and artifact validation.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/challenges/debug-this-agent": {
    path: "/challenges/debug-this-agent",
    title: "Debug This Agent",
    description:
      "Inspect a representative AI workflow trace and identify the production failure mode.",
    canonicalPath: "/challenges/debug-this-agent",
    openGraphTitle: "Debug This Agent | Himadri Mishra",
    openGraphDescription:
      "Practice production AI debugging with representative traces, root-cause choices, and visible fixes.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/challenges/cost-anatomy": {
    path: "/challenges/cost-anatomy",
    title: "Cost Anatomy",
    description:
      "A normalized static model of AI workflow unit economics and production cost controls.",
    canonicalPath: "/challenges/cost-anatomy",
    openGraphTitle: "Cost Anatomy | Himadri Mishra",
    openGraphDescription:
      "Inspect how routing, retries, sandbox reuse, and judge coverage change AI workflow cost units.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/challenges/dag-execution-simulator": {
    path: "/challenges/dag-execution-simulator",
    title: "DAG Execution Simulator",
    description:
      "A static simulator explaining explicit production AI workflow execution.",
    canonicalPath: "/challenges/dag-execution-simulator",
    openGraphTitle: "DAG Execution Simulator | Himadri Mishra",
    openGraphDescription:
      "Step through explicit workflow dependencies, judge failures, recovery choices, and downstream readiness.",
    lastModified: SEO_LAST_MODIFIED,
  },
  "/challenges/deck-ir-previewer": {
    path: "/challenges/deck-ir-previewer",
    title: "Deck IR Previewer",
    description:
      "A synthetic Deck IR previewer showing inspectable AI-generated artifact structure.",
    canonicalPath: "/challenges/deck-ir-previewer",
    openGraphTitle: "Deck IR Previewer | Himadri Mishra",
    openGraphDescription:
      "Inspect synthetic deck intermediate representation, validation errors, outline structure, and speaker notes.",
    lastModified: SEO_LAST_MODIFIED,
  },
} satisfies Record<string, RouteSeo>;

const caseStudyRouteSeo = Object.fromEntries(
  caseStudies
    .filter((study) => study.routeEnabled)
    .map((study) => {
      const path = `/case-studies/${study.slug}`;
      return [
        path,
        {
          path,
          title: study.title,
          description: study.subtitle,
          canonicalPath: path,
          openGraphTitle: `${study.title} | Himadri Mishra`,
          openGraphDescription: study.summary,
          lastModified: SEO_LAST_MODIFIED,
        },
      ];
    }),
) as Record<string, RouteSeo>;

export const routeSeoRegistry = {
  ...staticRouteSeo,
  ...caseStudyRouteSeo,
} satisfies Record<string, RouteSeo>;

export function buildCanonicalUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function getRouteSeo(path: string): RouteSeo {
  const seo = routeSeoRegistry[path];
  if (!seo) throw new Error(`Missing SEO registry entry for route: ${path}`);
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
      canonical: seo.canonicalPath,
    },
    openGraph: buildOpenGraphMetadata(path),
  };
}

export function getPublicRouteSeo() {
  return publicRoutes.map((route) => getRouteSeo(route.path));
}
