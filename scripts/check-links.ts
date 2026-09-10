import { existsSync } from "node:fs";
import { join } from "node:path";
import { caseStudies } from "../src/content/case-studies";
import { interviewAnswers } from "../src/content/interview";
import { notes } from "../src/content/notes";
import { principles } from "../src/content/principles";
import { profile } from "../src/content/profile";
import { stackOpinions } from "../src/content/stack-opinions";
import {
  publicRoutes,
  routeManifest,
  routeIsEnabled,
  retiredRedirectRoutes,
} from "../src/lib/routes";
import { validateInternalHrefFragment } from "./lib/fragment-links";

const errors: string[] = [];
const routePaths = new Set(routeManifest.map((route) => route.path));
const publicPaths = new Set(publicRoutes.map((route) => route.path));

for (const path of [
  "/",
  "/case-studies",
  "/resume",
  "/contact",
  "/notes",
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

for (const route of retiredRedirectRoutes) {
  if (route.redirectTo) {
    errors.push(
      ...validateInternalHrefFragment({
        href: route.redirectTo,
        owner: `retired route ${route.path}`,
      }),
    );
  }
}

for (const study of caseStudies) {
  const path = `/case-studies/${study.slug}`;
  if (study.routeEnabled && !routePaths.has(path))
    errors.push(`Enabled case study route missing from manifest: ${path}`);
}

for (const answer of interviewAnswers) {
  for (const source of answer.sourceCards) {
    errors.push(
      ...validateInternalHrefFragment({
        href: source.href,
        owner: `interview source card ${answer.id}`,
      }),
    );
  }
}

for (const note of notes) {
  for (const link of note.relatedLinks) {
    errors.push(
      ...validateInternalHrefFragment({
        href: link.href,
        owner: `note link ${note.id}`,
      }),
    );
  }
}

for (const principle of principles) {
  errors.push(
    ...validateInternalHrefFragment({
      href: principle.href,
      owner: `principle link ${principle.id}`,
    }),
  );
}

for (const opinion of stackOpinions) {
  errors.push(
    ...validateInternalHrefFragment({
      href: opinion.relatedHref,
      owner: `stack opinion link ${opinion.id}`,
    }),
  );
}

for (const retiredPath of [
  "/interview-me",
  "/principles",
  "/challenges",
  "/challenges/debug-this-agent",
  "/challenges/cost-anatomy",
  "/challenges/dag-execution-simulator",
  "/challenges/deck-ir-previewer",
]) {
  if (routeIsEnabled(retiredPath)) {
    errors.push(`Retired route remains enabled: ${retiredPath}`);
  }
  if (publicPaths.has(retiredPath)) {
    errors.push(`Retired route remains public: ${retiredPath}`);
  }
}

if (
  !profile.resumePath.startsWith("/resume/") ||
  !profile.resumePath.endsWith(".pdf")
) {
  errors.push(`Unexpected resume path: ${profile.resumePath}`);
}

const resumeAssetPath = join("public", profile.resumePath);
if (!existsSync(resumeAssetPath)) {
  errors.push(`Missing public resume asset: ${resumeAssetPath}`);
}

if (errors.length > 0) {
  console.error("Link validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Link validation passed.");
