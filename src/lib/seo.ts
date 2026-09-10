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

const professionalPresenceLastModified = "2026-09-07";

const routeSeoData = {
  "/": {
    title: "Himadri Mishra | Agent Experience Engineer & AI Product Engineer",
    description:
      "Agent Experience Engineer and AI Product Engineer. Shipped MCP access, discovery and retrieval systems, state-based agent evaluation and insight reporting.",
    canonicalPath: "/",
    openGraphTitle: "Himadri Mishra | Agent Experience & AI Product Engineer",
    openGraphDescription:
      "Selected engineering work, qualified implementation summaries and public projects in Agent Experience, agentic systems and AI product engineering.",
    lastModified: "2026-09-11",
  },
  "/case-studies": {
    title: "Engineering Work",
    description:
      "Agent tools, AI products and public projects I built, with short summaries, test results and earlier engineering work.",
    canonicalPath: "/case-studies",
    openGraphTitle: "Engineering work | Himadri Mishra",
    openGraphDescription:
      "Agent tools, AI products and public projects I built, with short summaries, test results and earlier engineering work.",
    lastModified: "2026-09-11",
  },
  "/about": {
    title: "About Himadri Mishra",
    description:
      "AI product engineer focused on Agent Experience, agentic systems and evaluation, with a background in ML infrastructure, search and computer vision.",
    canonicalPath: "/about",
    openGraphTitle: "About Himadri Mishra",
    openGraphDescription:
      "Career arc from IIT-BHU through Microsoft, UC Berkeley, and production AI, ML infrastructure, search, and computer vision systems.",
    lastModified: "2026-09-11",
  },
  "/resume": {
    title: "Resume",
    description:
      "Read or download the resume for Himadri Mishra. AI systems and developer infrastructure work across agent-facing tools, production AI workflows, ML platform engineering, and reliability.",
    canonicalPath: "/resume",
    openGraphTitle: "Resume and proof summary",
    openGraphDescription:
      "Resume and selected proof for AI systems, agent-facing developer infrastructure, production AI workflows, and ML platform reliability.",
    lastModified: professionalPresenceLastModified,
  },
  "/contact": {
    title: "Contact Himadri Mishra",
    description:
      "Contact Himadri Mishra about agent-facing developer tools, AI systems architecture, evaluation, observability, and production reliability work.",
    canonicalPath: "/contact",
    openGraphTitle: "Contact Himadri Mishra",
    openGraphDescription:
      "Reach out about CLI, MCP, SDK/API interface work, AI product workflows, evaluation, observability, and ML platform reliability.",
    lastModified: professionalPresenceLastModified,
  },
  "/notes": {
    title: "Production AI Notes",
    description:
      "Public-safe notes on agent-facing tools, AI workflow architecture, evaluation, observability, cost control, and evidence-backed production AI practice.",
    canonicalPath: "/notes",
    openGraphTitle: "Production AI notes",
    openGraphDescription:
      "Short notes on reliable AI systems, developer workflows, proof-backed claims, and clear sanitized artifact labels.",
    lastModified: professionalPresenceLastModified,
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
