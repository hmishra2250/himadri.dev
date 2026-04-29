import { caseStudies } from "../src/content/case-studies";
import { profile } from "../src/content/profile";
import { publicRoutes, routeManifest } from "../src/lib/routes";

const errors: string[] = [];
const routePaths = new Set(routeManifest.map((route) => route.path));
const publicPaths = new Set(publicRoutes.map((route) => route.path));

for (const path of [
  "/",
  "/case-studies",
  "/resume",
  "/contact",
  "/case-studies/agentic-market-research-platform",
]) {
  if (!publicPaths.has(path))
    errors.push(`Required public path missing: ${path}`);
}

for (const study of caseStudies) {
  const path = `/case-studies/${study.slug}`;
  if (study.routeEnabled && !routePaths.has(path))
    errors.push(`Enabled case study route missing from manifest: ${path}`);
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
