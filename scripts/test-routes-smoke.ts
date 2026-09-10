import { existsSync } from "node:fs";
import { join } from "node:path";
import nextConfig from "../next.config";
import {
  assetRedirectRoutes,
  enabledRoutes,
  getNavHref,
  getRetiredRouteDestination,
  navRoutes,
  publicRoutes,
  retiredRedirectRoutes,
  routeManifest,
} from "../src/lib/routes";
import { profile } from "../src/content/profile";

const errors: string[] = [];
const retiredRedirectExpectations = new Map<string, string>([
  ["/interview-me", "/about"],
  ["/principles", "/about"],
  ["/challenges", "/case-studies/agentic-market-research-platform"],
  [
    "/challenges/debug-this-agent",
    "/case-studies/agentic-market-research-platform#observability",
  ],
  ["/challenges/cost-anatomy", "/case-studies/ml-infra-rescue"],
  [
    "/challenges/dag-execution-simulator",
    "/case-studies/agentic-market-research-platform#architecture",
  ],
  [
    "/challenges/deck-ir-previewer",
    "/case-studies/agentic-market-research-platform#architecture",
  ],
]);
const appDir = join(process.cwd(), "src/app");
const legacyResumeAssetSource = "/resume/Himadri_Latest_Resume_April_2026.pdf";
const legacyResumeAssetPath = join(
  process.cwd(),
  "public/resume/Himadri_Latest_Resume_April_2026.pdf",
);
const canonicalResumeAssetPath = join(
  process.cwd(),
  "public",
  profile.resumePath,
);

function routeToPageFile(path: string) {
  if (path === "/") return join(appDir, "page.tsx");
  return join(appDir, path.slice(1), "page.tsx");
}

function hasDynamicCaseStudyHandler(path: string) {
  return (
    path.startsWith("/case-studies/") &&
    existsSync(join(appDir, "case-studies/[slug]/page.tsx"))
  );
}

for (const route of enabledRoutes) {
  if (route.kind === "api") continue;
  const pageFile = routeToPageFile(route.path);
  if (!existsSync(pageFile) && !hasDynamicCaseStudyHandler(route.path)) {
    errors.push(`enabled route missing page implementation: ${route.path}`);
  }
}

for (const route of routeManifest) {
  if (!route.enabled && (route.includeInNav || route.includeInSitemap)) {
    errors.push(`disabled route exposed publicly: ${route.path}`);
  }
  if (route.kind === "api" && (route.includeInNav || route.includeInSitemap)) {
    errors.push(`api route exposed in nav or sitemap: ${route.path}`);
  }
}

const navHrefExpectations = new Map<string, string>([
  ["/case-studies", "/case-studies"],
  ["/about", "/#about"],
  ["/resume", "/resume"],
  ["/contact", "/#contact"],
]);
const navRoutePaths = new Set(navRoutes.map((route) => route.path));
for (const [path, destination] of navHrefExpectations) {
  const route = navRoutes.find((entry) => entry.path === path);
  if (!route) {
    errors.push(`expected nav route missing: ${path}`);
    continue;
  }
  const actualHref = getNavHref(route);
  if (actualHref !== destination) {
    errors.push(
      `nav route ${path} href is ${actualHref}, expected ${destination}`,
    );
  }
}
for (const route of navRoutes) {
  if (!navHrefExpectations.has(route.path)) {
    errors.push(`unexpected nav route: ${route.path}`);
  }
}
for (const route of routeManifest) {
  if (route.navHref && !navRoutePaths.has(route.path)) {
    errors.push(`navHref appears on non-nav route: ${route.path}`);
  }
}

const publicPaths = new Set(publicRoutes.map((route) => route.path));
for (const requiredPath of [
  "/",
  "/about",
  "/case-studies",
  "/notes",
  "/resume",
  "/contact",
  "/case-studies/agentic-market-research-platform",
  "/case-studies/ml-infra-rescue",
  "/case-studies/computer-vision-product-systems",
  "/case-studies/high-performance-ar-and-vision",
]) {
  if (!publicPaths.has(requiredPath)) {
    errors.push(
      `retained public route missing from sitemap set: ${requiredPath}`,
    );
  }
}

for (const [path, destination] of retiredRedirectExpectations) {
  if (publicPaths.has(path)) {
    errors.push(`retired route remains public: ${path}`);
  }
  const manifestRoute = retiredRedirectRoutes.find(
    (route) => route.path === path,
  );
  if (!manifestRoute) {
    errors.push(`retired route missing manifest redirect: ${path}`);
  }
  try {
    const actualDestination = getRetiredRouteDestination(path);
    if (actualDestination !== destination) {
      errors.push(
        `retired route ${path} redirects to ${actualDestination}, expected ${destination}`,
      );
    }
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
}

function expectRedirectLookupFailure(path: string, expected: RegExp) {
  try {
    getRetiredRouteDestination(path);
    errors.push(`expected retired redirect lookup to fail for ${path}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!expected.test(message)) {
      errors.push(
        `retired redirect lookup for ${path} failed with unexpected message: ${message}`,
      );
    }
  }
}

expectRedirectLookupFailure("/", /not retired/);
expectRedirectLookupFailure("/not-a-real-route", /Unknown route/);

if (existsSync(legacyResumeAssetPath)) {
  errors.push(
    `legacy resume asset is still publicly available: ${legacyResumeAssetPath}`,
  );
}

if (!existsSync(canonicalResumeAssetPath)) {
  errors.push(`canonical resume asset missing: ${canonicalResumeAssetPath}`);
}

const legacyResumeRedirect = assetRedirectRoutes.find(
  (route) => route.source === legacyResumeAssetSource,
);
if (!legacyResumeRedirect) {
  errors.push(
    `legacy resume asset redirect missing: ${legacyResumeAssetSource}`,
  );
} else {
  if (legacyResumeRedirect.destination !== profile.resumePath) {
    errors.push(
      `legacy resume asset redirects to ${legacyResumeRedirect.destination}, expected ${profile.resumePath}`,
    );
  }
  if (!legacyResumeRedirect.permanent) {
    errors.push(
      `legacy resume asset redirect must be permanent: ${legacyResumeAssetSource}`,
    );
  }
}

async function main() {
  const redirects = await nextConfig.redirects?.();
  const redirectMap = new Map(
    redirects?.map((redirect) => [redirect.source, redirect.destination]) ?? [],
  );
  for (const [path, destination] of retiredRedirectExpectations) {
    if (redirectMap.get(path) !== destination) {
      errors.push(
        `next.config redirect for ${path} is ${redirectMap.get(path) ?? "<missing>"}, expected ${destination}`,
      );
    }
  }

  const nextLegacyResumeRedirect = redirects?.find(
    (redirect) => redirect.source === legacyResumeAssetSource,
  );
  if (!nextLegacyResumeRedirect) {
    errors.push(
      `next.config redirect missing for legacy resume asset: ${legacyResumeAssetSource}`,
    );
  } else {
    if (nextLegacyResumeRedirect.destination !== profile.resumePath) {
      errors.push(
        `next.config legacy resume asset redirect is ${nextLegacyResumeRedirect.destination}, expected ${profile.resumePath}`,
      );
    }
    if (!nextLegacyResumeRedirect.permanent) {
      errors.push(
        `next.config legacy resume asset redirect must be permanent: ${legacyResumeAssetSource}`,
      );
    }
  }

  if (errors.length > 0) {
    console.error("Route smoke validation failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log("Route smoke validation passed.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
