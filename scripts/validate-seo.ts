import sitemap from "../src/app/sitemap";
import { siteConfig } from "../src/lib/metadata";
import {
  assertSeoRegistryMatchesPublicRoutes,
  buildCanonicalUrl,
  buildOpenGraphMetadata,
  routeSeoEntries,
} from "../src/lib/seo";
import { publicRoutes, routeManifest } from "../src/lib/routes";

const errors: string[] = [];
const currentYear = new Date().getUTCFullYear();
const titles = new Map<string, string>();
const publicPaths = new Set(publicRoutes.map((route) => route.path));
const disallowedFragments = [
  "/api/interview",
  "/hiring-packet",
  "localhost",
  "127.0.0.1",
  "GEMINI",
  "GA_MEASUREMENT",
  "NEXT_PUBLIC",
  "ENABLE_",
  "API_KEY",
  "SECRET",
  "TOKEN",
  "PASSWORD",
  "process.env",
  ".env",
];

errors.push(...assertSeoRegistryMatchesPublicRoutes());

for (const route of routeManifest) {
  if (
    (route.kind === "api" ||
      route.status === "internal" ||
      route.status === "deferred" ||
      !route.enabled) &&
    routeSeoEntries.some((entry) => entry.path === route.path)
  ) {
    errors.push(`SEO registry exposes non-public route: ${route.path}`);
  }
}

for (const entry of routeSeoEntries) {
  const serialized = JSON.stringify(entry);
  if (!entry.title.trim()) errors.push(`${entry.path} missing SEO title`);
  if (!entry.description.trim())
    errors.push(`${entry.path} missing SEO description`);
  if (!entry.openGraphTitle.trim())
    errors.push(`${entry.path} missing OpenGraph title`);
  if (!entry.openGraphDescription.trim())
    errors.push(`${entry.path} missing OpenGraph description`);

  if (titles.has(entry.title)) {
    errors.push(
      `duplicate SEO title: ${entry.title} on ${titles.get(entry.title)} and ${entry.path}`,
    );
  }
  titles.set(entry.title, entry.path);

  if (entry.title.includes("—") || entry.description.includes("—")) {
    errors.push(`${entry.path} contains an em dash in authored SEO strings`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastModified)) {
    errors.push(`${entry.path} lastModified must be a stable ISO date`);
  } else {
    const parsed = new Date(`${entry.lastModified}T00:00:00.000Z`);
    if (Number.isNaN(parsed.valueOf())) {
      errors.push(`${entry.path} lastModified is not parseable`);
    }
    if (parsed.getUTCFullYear() > currentYear) {
      errors.push(`${entry.path} lastModified is in the future`);
    }
  }

  const canonicalUrl = buildCanonicalUrl(entry.canonicalPath);
  if (!canonicalUrl.startsWith(siteConfig.url)) {
    errors.push(`${entry.path} canonical URL does not use siteConfig.url`);
  }

  const openGraph = buildOpenGraphMetadata(entry.path);
  if (!openGraph?.url) errors.push(`${entry.path} missing OpenGraph URL`);

  for (const fragment of disallowedFragments) {
    if (serialized.includes(fragment)) {
      errors.push(`${entry.path} SEO output contains ${fragment}`);
    }
  }
}

const firstSitemap = sitemap();
const secondSitemap = sitemap();
if (JSON.stringify(firstSitemap) !== JSON.stringify(secondSitemap)) {
  errors.push("sitemap output must be deterministic across calls");
}

for (const entry of firstSitemap) {
  const url = typeof entry.url === "string" ? entry.url : String(entry.url);
  const path = new URL(url).pathname;
  if (!publicPaths.has(path)) errors.push(`sitemap contains non-public path: ${path}`);
  if (path === "/api/interview" || path === "/hiring-packet") {
    errors.push(`sitemap contains forbidden path: ${path}`);
  }
  if (!(entry.lastModified instanceof Date)) {
    errors.push(`sitemap entry ${path} lastModified must be a Date`);
  }
}

if (errors.length > 0) {
  console.error("SEO validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("SEO validation passed.");
