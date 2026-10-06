import { existsSync } from "node:fs";
import { join } from "node:path";
import nextConfig from "../next.config";
import {
  assetRedirectRoutes,
  enabledRoutes,
  getRetiredRouteDestination,
  navRoutes,
  publicRoutes,
  retiredRedirectRoutes,
  routeManifest,
} from "../src/lib/routes";
import { profile } from "../src/content/profile";

const errors: string[] = [];

// Every retired URL and where it must land. Old links keep working.
const retiredRedirectExpectations = new Map<string, string>([
  ["/case-studies", "/#firecrawl"],
  ["/case-studies/agentic-market-research-platform", "/#before"],
  ["/case-studies/ml-infra-rescue", "/#before"],
  ["/case-studies/computer-vision-product-systems", "/#before"],
  ["/case-studies/high-performance-ar-and-vision", "/#before"],
  ["/about", "/#before"],
  ["/notes", "/"],
  ["/contact", "/"],
  ["/interview-me", "/"],
  ["/principles", "/"],
  ["/challenges", "/"],
  ["/challenges/debug-this-agent", "/"],
  ["/challenges/cost-anatomy", "/"],
  ["/challenges/dag-execution-simulator", "/"],
  ["/challenges/deck-ir-previewer", "/"],
  ["/hiring-packet", "/"],
]);

const appDir = join(process.cwd(), "src/app");
const pageFile = (path: string) =>
  join(appDir, ...path.split("/").filter(Boolean), "page.tsx");

for (const route of enabledRoutes) {
  if (!existsSync(pageFile(route.path))) {
    errors.push(`enabled route has no page: ${route.path}`);
  }
}
if (existsSync(join(appDir, "api"))) {
  errors.push("src/app/api must not exist: the site has no API routes");
}

const publicPaths = publicRoutes.map((route) => route.path).sort();
if (JSON.stringify(publicPaths) !== JSON.stringify(["/", "/resume"])) {
  errors.push(`public routes must be exactly / and /resume: ${publicPaths}`);
}
const navPaths = navRoutes.map((route) => route.path);
if (JSON.stringify(navPaths) !== JSON.stringify(["/resume"])) {
  errors.push(`nav routes must be exactly /resume: ${navPaths}`);
}

const retiredPaths = new Set(retiredRedirectRoutes.map((route) => route.path));
for (const [source, destination] of retiredRedirectExpectations) {
  if (!retiredPaths.has(source)) {
    errors.push(`missing retired route: ${source}`);
    continue;
  }
  const actual = getRetiredRouteDestination(source);
  if (actual !== destination) {
    errors.push(`${source} redirects to ${actual}, expected ${destination}`);
  }
}
for (const path of retiredPaths) {
  if (!retiredRedirectExpectations.has(path)) {
    errors.push(`retired route has no expectation in this test: ${path}`);
  }
}
for (const bad of ["/", "/does-not-exist"]) {
  try {
    getRetiredRouteDestination(bad);
    errors.push(`retired lookup must fail for ${bad}`);
  } catch {
    // expected
  }
}

async function main() {
  const redirects = await nextConfig.redirects!();
  for (const [source, destination] of retiredRedirectExpectations) {
    const redirect = redirects.find((entry) => entry.source === source);
    if (!redirect) errors.push(`next.config has no redirect for ${source}`);
    else if (redirect.destination !== destination || !redirect.permanent) {
      errors.push(`next.config redirect for ${source} is wrong`);
    }
  }
  for (const asset of assetRedirectRoutes) {
    const redirect = redirects.find((entry) => entry.source === asset.source);
    if (!redirect?.permanent || redirect.destination !== asset.destination) {
      errors.push(`asset redirect missing or not permanent: ${asset.source}`);
    }
  }

  if (
    existsSync(
      join(process.cwd(), "public/resume/Himadri_Latest_Resume_April_2026.pdf"),
    )
  ) {
    errors.push("legacy resume PDF must not be published");
  }
  if (!existsSync(join(process.cwd(), "public", profile.resumePath))) {
    errors.push(`canonical resume PDF is missing: ${profile.resumePath}`);
  }
  if (routeManifest.some((route) => route.path.startsWith("/api"))) {
    errors.push("route manifest must not contain API routes");
  }

  if (errors.length > 0) {
    console.error("Route smoke test failed:");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(
    `Route smoke test passed: 2 public pages, ${retiredRedirectExpectations.size} retired URLs redirect, resume asset in place.`,
  );
}

void main();
