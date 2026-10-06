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

const routeSeoData = {
  "/": {
    title: "Himadri Mishra | AI Engineer: Agents, MCP Servers, CLIs and SDKs",
    description:
      "I build AI products at Mudita Studios and work on Agent Experience in the open: agents, MCP servers, CLIs and SDKs.",
    canonicalPath: "/",
    openGraphTitle: "Himadri Mishra | AI Engineer",
    openGraphDescription:
      "What I work on now, the Agent Experience programme I ran at Firecrawl with its merged pull requests, and the production ML before that.",
    lastModified: "2026-10-06",
  },
  "/resume": {
    title: "Resume",
    description:
      "Read or download the resume for Himadri Mishra, AI engineer: agents, MCP servers, CLIs and SDKs, and production ML before that.",
    canonicalPath: "/resume",
    openGraphTitle: "Resume | Himadri Mishra",
    openGraphDescription:
      "Read or download the resume for Himadri Mishra, AI engineer: agents, MCP servers, CLIs and SDKs.",
    lastModified: "2026-10-06",
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
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
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
          url: siteConfig.ogImage,
          alt: siteConfig.ogImageAlt,
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
