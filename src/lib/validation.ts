import { existsSync } from "node:fs";
import { join } from "node:path";
import { proofClaims } from "@/content/proof";
import * as site from "@/content/site";
import {
  getRetiredRouteDestination,
  navRoutes,
  publicRoutes,
  requiredRoutes,
  retiredRedirectRoutes,
  robotsDisallowRoutes,
  routeIsEnabled,
  routeManifest,
} from "@/lib/routes";

export const emDashPattern = /\u2014|&mdash;|&#8212;|&#x2014;/i;

export const contractionPattern =
  /\b(?:[a-z]+n['’]t|(?:i|you|we|they)['’](?:m|re|ve|ll|d)|(?:it|that|there|here|what|who|he|she|let)['’]s)\b/i;

/** Copy the site must never carry, with the reason shown when it does. */
export const bannedCopyPatterns: ReadonlyArray<readonly [RegExp, string]> = [
  [
    /\bopen to (?:work|roles|new roles|opportunities|senior|staff)\b|\bhire me\b|\blooking for (?:my next|a new) role\b/i,
    "public job-search signal",
  ],
  [/jobhunt/i, "job-search email address"],
  [/mailto:/i, "public email address (none is published)"],
  [/\b(?:Forge|Zoe|StrikeArc|PID agent)\b/, "Mudita product name"],
  [/48\s*[-–]\s*72\s*h|\b10x\b|93%\s*(?:to|→)\s*98%/i, "retired legacy metric"],
  [
    /Anonymized (?:engineering|implementation) summary/i,
    "per-block anonymized caveat",
  ],
  [/\(Contract\)/, "contract label"],
  [
    /21%\s*(?:to|→)\s*100%|tool-naming fix took|became a company goal/i,
    "unsupported figure (see the work catalogue)",
  ],
  [
    /client work is private|work is private|not public|private repo|full record is below|a few highlights/i,
    "meta note about the page; say the work, not what is hidden",
  ],
];

export const homeSectionIds = new Set<string>(
  site.sections.map((section) => section.id),
);

type Found = { path: string; value: unknown };

function walk(value: unknown, path: string, out: Found[]) {
  out.push({ path, value });
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, out));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      walk(item, `${path}.${key}`, out);
    }
  }
}

export function collectSiteContent(): Found[] {
  const found: Found[] = [];
  for (const [name, value] of Object.entries(site)) {
    if (typeof value === "function") continue;
    walk(value, name, found);
  }
  return found;
}

export function checkCopy(text: string, where: string): string[] {
  const errors: string[] = [];
  if (emDashPattern.test(text)) errors.push(`${where}: uses an em dash`);
  if (contractionPattern.test(text)) {
    errors.push(`${where}: uses a contraction`);
  }
  for (const [pattern, reason] of bannedCopyPatterns) {
    if (pattern.test(text)) errors.push(`${where}: ${reason}`);
  }
  return errors;
}

export function checkHref(href: string, where: string): string[] {
  if (href.startsWith("https://")) return [];
  if (!href.startsWith("/")) {
    return [`${where}: link must be https or a local path: ${href}`];
  }
  const [path, fragment] = href.split("#");
  const errors: string[] = [];
  if (!routeIsEnabled(path || "/")) {
    errors.push(`${where}: links to a page that is not enabled: ${href}`);
  }
  if (fragment !== undefined && (path || "/") === "/") {
    if (!homeSectionIds.has(fragment)) {
      errors.push(`${where}: links to an unknown homepage section: ${href}`);
    }
  }
  return errors;
}

export function validateProofClaims(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const claim of proofClaims) {
    if (ids.has(claim.id)) errors.push(`duplicate proof claim id: ${claim.id}`);
    ids.add(claim.id);
    if (!claim.approvedForPublicUse) {
      errors.push(`proof claim is not approved for public use: ${claim.id}`);
    }
    if (claim.confidentialityLevel !== "public") {
      errors.push(`proof claim is not public: ${claim.id}`);
    }
    if (!claim.sourceLocator.trim()) {
      errors.push(`proof claim has no source locator: ${claim.id}`);
    }
    if (claim.sourceType === "resume") {
      if (!existsSync(join(process.cwd(), claim.sourcePath))) {
        errors.push(`proof claim source is missing: ${claim.sourcePath}`);
      }
    } else if (claim.sourceType === "work-record") {
      if (/\d/.test(claim.claim)) {
        errors.push(
          `work-record claim carries a figure; cite the resume or a public source: ${claim.id}`,
        );
      }
    } else if (!claim.sourcePath.startsWith("https://")) {
      errors.push(`public proof source must be an https URL: ${claim.id}`);
    }
  }
  return errors;
}

export function validateContent(): string[] {
  const errors = validateProofClaims();
  const proofIds = new Set<string>(proofClaims.map((claim) => claim.id));

  for (const { path, value } of collectSiteContent()) {
    if (typeof value !== "string") continue;
    errors.push(...checkCopy(value, path));
    if (path.endsWith(".href") || /^links\./.test(path)) {
      errors.push(...checkHref(value, path));
    }
    if (/\.proof(?:\[\d+\])?$|Proof$/.test(path) && !proofIds.has(value)) {
      errors.push(`${path}: unknown proof claim ${value}`);
    }
  }

  const prKeys = new Set<string>();
  const allPrs = [
    ...site.firecrawl.rewrite.prs,
    ...site.firecrawl.changes.flatMap((change) => change.prs),
  ];
  for (const pr of allPrs) {
    const key = `${pr.repo}#${pr.number}`;
    if (!Number.isInteger(pr.number) || pr.number <= 0) {
      errors.push(`invalid pull request number: ${key}`);
    }
    if (!/^[a-z0-9-]+$/.test(pr.repo)) {
      errors.push(`invalid repository name: ${key}`);
    }
    if (prKeys.has(key)) errors.push(`pull request listed twice: ${key}`);
    prKeys.add(key);
  }

  if (site.now.also.length === 0) {
    errors.push("now.also must list at least one project");
  }

  return errors;
}

export function validateRoutes(): string[] {
  const errors: string[] = [];
  const appDir = join(process.cwd(), "src", "app");
  const pageFile = (path: string) =>
    join(appDir, ...path.split("/").filter(Boolean), "page.tsx");

  for (const required of ["/", "/resume"]) {
    if (!requiredRoutes.some((route) => route.path === required)) {
      errors.push(`required route missing or disabled: ${required}`);
    }
    if (!publicRoutes.some((route) => route.path === required)) {
      errors.push(`required route missing from sitemap: ${required}`);
    }
  }

  for (const route of routeManifest) {
    const hasPage = existsSync(pageFile(route.path));
    if (route.enabled && !hasPage) {
      errors.push(`enabled route has no page.tsx: ${route.path}`);
    }
    if (!route.enabled && hasPage) {
      errors.push(`retired route still has a page.tsx: ${route.path}`);
    }
  }

  for (const route of retiredRedirectRoutes) {
    if (route.enabled || route.includeInSitemap || route.includeInNav) {
      errors.push(`retired route is still exposed: ${route.path}`);
    }
    try {
      const destination = getRetiredRouteDestination(route.path);
      errors.push(...checkHref(destination, `redirect ${route.path}`));
    } catch (error) {
      errors.push((error as Error).message);
    }
  }

  if (navRoutes.length > 3) errors.push("navigation has more than 3 routes");
  for (const route of navRoutes) {
    if (!route.enabled) errors.push(`nav route is disabled: ${route.path}`);
  }

  for (const path of robotsDisallowRoutes) {
    if (publicRoutes.some((route) => route.path === path)) {
      errors.push(`robots disallows a public route: ${path}`);
    }
  }

  return errors;
}
