import { costModels, debugScenarios } from "../src/content/challenges";
import { caseStudies } from "../src/content/case-studies";
import { interviewAnswers } from "../src/content/interview";
import { profile } from "../src/content/profile";
import { publicRoutes, routeManifest, routeIsEnabled } from "../src/lib/routes";

const errors: string[] = [];
const routePaths = new Set(routeManifest.map((route) => route.path));
const publicPaths = new Set(publicRoutes.map((route) => route.path));

for (const path of [
  "/",
  "/case-studies",
  "/resume",
  "/contact",
  "/interview-me",
  "/principles",
  "/challenges",
  "/challenges/debug-this-agent",
  "/challenges/cost-anatomy",
  "/case-studies/agentic-market-research-platform",
]) {
  if (!publicPaths.has(path))
    errors.push(`Required public path missing: ${path}`);
}

for (const route of routeManifest) {
  if (!route.enabled && (route.includeInSitemap || route.includeInNav)) {
    errors.push(`Disabled route exposed in sitemap or nav: ${route.path}`);
  }
}

for (const study of caseStudies) {
  const path = `/case-studies/${study.slug}`;
  if (study.routeEnabled && !routePaths.has(path))
    errors.push(`Enabled case study route missing from manifest: ${path}`);
}

for (const answer of interviewAnswers) {
  for (const source of answer.sourceCards) {
    const path = source.href.split("#")[0];
    if (!publicPaths.has(path) && !path.startsWith("/resume/")) {
      errors.push(
        `Interview source card links to non-public route: ${source.href}`,
      );
    }
  }
}

if (debugScenarios.length < 1)
  errors.push("At least one debug scenario is required");
if (!routeIsEnabled("/challenges/debug-this-agent")) {
  errors.push("Debug This Agent route must stay enabled for V1.5");
}
if (costModels.length < 3)
  errors.push("Cost Anatomy requires three static states");
if (!routeIsEnabled("/challenges/cost-anatomy")) {
  errors.push("Cost Anatomy route must stay enabled for V1.5");
}

if (
  !profile.resumePath.startsWith("/resume/") ||
  !profile.resumePath.endsWith(".pdf")
) {
  errors.push(`Unexpected resume path: ${profile.resumePath}`);
}

if (errors.length > 0) {
  console.error("Link validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Link validation passed.");
