import { existsSync } from "node:fs";
import { join } from "node:path";
import { enabledRoutes, publicRoutes, routeManifest } from "../src/lib/routes";

const errors: string[] = [];
const appDir = join(process.cwd(), "src/app");

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

const publicPaths = new Set(publicRoutes.map((route) => route.path));
for (const requiredPath of [
  "/interview-me",
  "/principles",
  "/challenges",
  "/challenges/debug-this-agent",
  "/challenges/cost-anatomy",
]) {
  if (!publicPaths.has(requiredPath)) {
    errors.push(`V1.5 public route missing from sitemap set: ${requiredPath}`);
  }
}

if (errors.length > 0) {
  console.error("Route smoke validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Route smoke validation passed.");
