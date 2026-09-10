import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import nextConfig from "../next.config";
import { practice, type Practice } from "../src/content/practice";
import { proofClaims, type ProofClaim } from "../src/content/proof";
import { profile } from "../src/content/profile";
import {
  getNavHref,
  navRoutes,
  publicRoutes,
  routeManifest,
  routeIsEnabled,
} from "../src/lib/routes";
import { validatePracticeContract } from "../src/lib/practice-validation";
import {
  collectRouteFragments,
  validateInternalHrefFragment,
} from "./lib/fragment-links";
import { validateContent, validateRoutes } from "../src/lib/validation";

const canonicalResumePath = "/resume/Himadri_Mishra_Resume.pdf";
const publicResumeSourcePath = "public/resume/Himadri_Mishra_Resume.pdf";

type MutableProofClaim = ProofClaim;

const failures: string[] = [];

function assert(condition: unknown, message: string) {
  if (!condition) failures.push(message);
}

function assertIncludes(errors: string[], expected: RegExp, scenario: string) {
  assert(
    errors.some((error) => expected.test(error)),
    `${scenario} did not produce expected error. Saw: ${errors.join(" | ")}`,
  );
}

function clonePractice(value: Practice): Practice {
  return JSON.parse(JSON.stringify(value)) as Practice;
}

function cloneProofs(value: ProofClaim[]): MutableProofClaim[] {
  return JSON.parse(JSON.stringify(value)) as MutableProofClaim[];
}

const nextConfigForAssertions = nextConfig as {
  agentRules?: boolean;
  turbopack?: { root?: string };
};
assert(
  nextConfigForAssertions.turbopack?.root === path.resolve(process.cwd()),
  `next.config.ts must set turbopack.root to the absolute app root. Saw ${nextConfigForAssertions.turbopack?.root ?? "<missing>"}`,
);
assert(
  nextConfigForAssertions.agentRules === false,
  "next.config.ts must disable generated Next.js agentRules so framework tooling cannot rewrite AGENTS.md",
);

const eslintConfigText = readFileSync("eslint.config.mjs", "utf8");
assert(
  eslintConfigText.includes(`".claude/**"`),
  "ESLint must ignore .claude/** user-owned prototypes",
);
const prettierIgnore = readFileSync(".prettierignore", "utf8");
assert(
  prettierIgnore.split(/\r?\n/).includes(".claude/**"),
  "Prettier must ignore .claude/** user-owned prototypes",
);

const routeErrors = validateRoutes();
assert(
  routeErrors.length === 0,
  `route validation failed: ${routeErrors.join(" | ")}`,
);
const interviewApi = routeManifest.find(
  (route) => route.path === "/api/interview",
);
assert(interviewApi?.kind === "api", "/api/interview must remain an API route");
assert(
  interviewApi?.status === "internal",
  "/api/interview must remain internal",
);
assert(
  !interviewApi?.includeInSitemap,
  "/api/interview must stay out of sitemap",
);
assert(!interviewApi?.includeInNav, "/api/interview must stay out of nav");
assert(
  !publicRoutes.some((route) => route.path === "/api/interview"),
  "/api/interview must not be public",
);
assert(
  !navRoutes.some((route) => route.path === "/api/interview"),
  "/api/interview must not be navigable",
);
const hiringPacket = routeManifest.find(
  (route) => route.path === "/hiring-packet",
);
assert(hiringPacket?.enabled === false, "/hiring-packet must remain disabled");
assert(
  hiringPacket?.status === "deferred",
  "/hiring-packet must remain deferred",
);
assert(
  !hiringPacket?.includeInSitemap,
  "/hiring-packet must stay out of sitemap",
);
assert(!hiringPacket?.includeInNav, "/hiring-packet must stay out of nav");
assert(!routeIsEnabled("/hiring-packet"), "/hiring-packet must not be enabled");

const workIndexFragments = collectRouteFragments("/case-studies");
for (const fragment of [
  "agentic-market-research-platform",
  "ml-infra-rescue",
  "computer-vision-product-systems",
  "high-performance-ar-and-vision",
]) {
  assert(
    workIndexFragments.has(fragment),
    `work index must expose archived case anchor #${fragment}`,
  );
  assert(
    validateInternalHrefFragment({
      href: `/case-studies#${fragment}`,
      owner: `case index fragment fixture ${fragment}`,
    }).length === 0,
    `valid work index fragment should pass: #${fragment}`,
  );
}
assertIncludes(
  validateInternalHrefFragment({
    href: "/case-studies#not-a-real-fragment",
    owner: "nonexistent work fragment fixture",
  }),
  /missing fragment/,
  "nonexistent work fragment fixture",
);

assert(
  profile.resumePath === canonicalResumePath,
  `profile.resumePath must use canonical resume path ${canonicalResumePath}`,
);
const publicResumeFiles = readdirSync("public/resume", {
  recursive: true,
  encoding: "utf8",
}).filter((file) => file.toLowerCase().endsWith(".pdf"));
assert(
  publicResumeFiles.length === 1 &&
    publicResumeFiles[0] === path.basename(canonicalResumePath),
  "public/resume must contain only the canonical PDF; legacy URLs must redirect, not serve stale assets",
);

const runtimePracticeErrors = validatePracticeContract(practice, proofClaims);
assert(
  runtimePracticeErrors.length === 0,
  `practice contract failed on runtime data: ${runtimePracticeErrors.join(" | ")}`,
);
const contentErrors = validateContent();
assert(
  contentErrors.length === 0,
  `content validation failed: ${contentErrors.join(" | ")}`,
);

const recentProofIds = new Set(
  practice.recentContributions.flatMap((item) => item.proofIds),
);
for (const proofId of recentProofIds) {
  const claim = proofClaims.find((item) => item.id === proofId);
  assert(Boolean(claim), `recent contribution proof must exist: ${proofId}`);
  if (!claim) continue;
  assert(
    claim.approvedForPublicUse,
    `recent contribution proof must be approved: ${proofId}`,
  );
  assert(
    claim.sourcePath === publicResumeSourcePath,
    `recent contribution proof must use canonical resume source path: ${proofId}`,
  );
  assert(
    !/(https?:\/\/|github\.com|pull\/\d+|issues?\/\d+|\bPR\s*#?\d+\b|private|ledger)/i.test(
      claim.sourceLocator,
    ),
    `recent contribution proof locator must stay generic: ${proofId}`,
  );
}

const fixtureProofs = cloneProofs(proofClaims);
fixtureProofs.push({
  id: "synthetic-approved-recent-proof",
  claim: "Synthetic public-safe contribution statement for regression tests.",
  sourcePath: publicResumeSourcePath,
  sourceLocator: "Selected engineering contributions",
  sourceType: "resume",
  confidence: "high",
  confidentialityLevel: "public",
  approvedForPublicUse: true,
  publicLabelRequired: false,
  displayContexts: ["resume"],
});
const fixturePractice = clonePractice(practice);
fixturePractice.recentContributions = [
  {
    id: "synthetic-contribution",
    title: "Synthetic contribution",
    summary: "Improved tool guidance for agent workflows.",
    proofIds: ["synthetic-approved-recent-proof"],
  },
];
assert(
  validatePracticeContract(fixturePractice, fixtureProofs).length === 0,
  "synthetic safe fixture should pass practice validation",
);

const modalMay = clonePractice(fixturePractice);
modalMay.recentContributions[0].summary =
  "Teams may improve tool guidance for agent workflows.";
assert(
  validatePracticeContract(modalMay, fixtureProofs).length === 0,
  "modal may should not be treated as an explicit date",
);

const missingProof = clonePractice(fixturePractice);
missingProof.recentContributions[0].proofIds = ["synthetic-missing-proof"];
assertIncludes(
  validatePracticeContract(missingProof, fixtureProofs),
  /references missing proof claim/,
  "missing proof fixture",
);

const urlLeak = clonePractice(fixturePractice);
urlLeak.recentContributions[0].summary =
  "Improved synthetic workflows at https://example.invalid/private.";
assertIncludes(
  validatePracticeContract(urlLeak, fixtureProofs),
  /URL or repository host/,
  "URL leak fixture",
);

const metricLeak = clonePractice(fixturePractice);
metricLeak.recentContributions[0].summary =
  "Improved synthetic workflows across 12 tasks.";
assertIncludes(
  validatePracticeContract(metricLeak, fixtureProofs),
  /metric-like or count-like claim/,
  "metric leak fixture",
);

const attributionLeak = clonePractice(fixturePractice) as Practice & {
  recentContributions: Array<
    Practice["recentContributions"][number] & { attributionUrl?: string }
  >;
};
attributionLeak.recentContributions[0].attributionUrl = "synthetic-attribution";
assertIncludes(
  validatePracticeContract(attributionLeak, fixtureProofs),
  /must only expose id, title, summary and proofIds fields/,
  "attribution field fixture",
);

const unsafeProofs = cloneProofs(fixtureProofs);
const unsafeProof = unsafeProofs.find(
  (item) => item.id === "synthetic-approved-recent-proof",
);
if (unsafeProof) {
  unsafeProof.sourcePath = "reports/private-ledger.json";
  unsafeProof.sourceLocator = "PR #123";
}
assertIncludes(
  validatePracticeContract(fixturePractice, unsafeProofs),
  /canonical public resume source path/,
  "unsafe proof source fixture",
);
assertIncludes(
  validatePracticeContract(fixturePractice, unsafeProofs),
  /private or identifying detail/,
  "unsafe proof locator fixture",
);

const proofMetricLeak = cloneProofs(fixtureProofs);
const proofWithMetric = proofMetricLeak.find(
  (item) => item.id === "synthetic-approved-recent-proof",
);
if (proofWithMetric) {
  proofWithMetric.claim = "Improved synthetic workflows across 12 tasks.";
}
assertIncludes(
  validatePracticeContract(fixturePractice, proofMetricLeak),
  /metric-like or count-like claim/,
  "proof claim metric fixture",
);

const proofDateLocatorLeak = cloneProofs(fixtureProofs);
const proofWithDatedLocator = proofDateLocatorLeak.find(
  (item) => item.id === "synthetic-approved-recent-proof",
);
if (proofWithDatedLocator) {
  proofWithDatedLocator.sourceLocator =
    "Selected engineering contributions, September 2026";
}
assertIncludes(
  validatePracticeContract(fixturePractice, proofDateLocatorLeak),
  /explicit date or timeline/,
  "proof locator date fixture",
);

const proofPublicLabelLeak = cloneProofs(fixtureProofs);
const proofWithPublicLabel = proofPublicLabelLeak.find(
  (item) => item.id === "synthetic-approved-recent-proof",
);
if (proofWithPublicLabel) {
  proofWithPublicLabel.publicLabel = "Synthetic label updated in 2026";
}
assertIncludes(
  validatePracticeContract(fixturePractice, proofPublicLabelLeak),
  /explicit date or timeline/,
  "proof public label date fixture",
);

for (const brief of practice.recentWorkCases) {
  assert(
    validateInternalHrefFragment({
      href: `/case-studies#${brief.id}`,
      owner: `recent engineering brief ${brief.id}`,
    }).length === 0,
    `recent engineering brief must render a case-index anchor: ${brief.id}`,
  );
}
for (const route of navRoutes) {
  assert(
    validateInternalHrefFragment({
      href: getNavHref(route),
      owner: `navigation ${route.label}`,
    }).length === 0,
    `navigation destination must exist: ${getNavHref(route)}`,
  );
}
assert(
  validateInternalHrefFragment({
    href: "/case-studies#earlier-work",
    owner: "earlier work link",
  }).length === 0,
  "earlier work index anchor must exist",
);

for (const field of ["summary", "verification"] as const) {
  const unsafeCase = clonePractice(practice);
  unsafeCase.recentWorkCases[0][field] =
    "Details at https://example.invalid/project";
  assertIncludes(
    validatePracticeContract(unsafeCase, proofClaims),
    /URL or repository host/,
    `recent case ${field} URL fixture`,
  );
}
const unsafeCaseWork = clonePractice(practice);
unsafeCaseWork.recentWorkCases[0].work = ["Shipped for 12 clients in 2026"];
assertIncludes(
  validatePracticeContract(unsafeCaseWork, proofClaims),
  /numeric detail/,
  "recent case work metric fixture",
);
const unprovenCase = clonePractice(practice);
unprovenCase.recentWorkCases[0].proofIds = ["nonexistent-case-proof"];
assertIncludes(
  validatePracticeContract(unprovenCase, proofClaims),
  /references missing proof claim/,
  "recent case missing proof fixture",
);
const attributedCase = clonePractice(practice);
Object.assign(attributedCase.recentWorkCases[0], {
  employer: "Synthetic client",
});
assertIncludes(
  validatePracticeContract(attributedCase, proofClaims),
  /unsupported attribution/,
  "recent case attribution fixture",
);
const emptyCase = clonePractice(practice);
emptyCase.recentWorkCases[0].verification = "";
assertIncludes(
  validatePracticeContract(emptyCase, proofClaims),
  /missing verification/,
  "recent case empty verification fixture",
);

if (failures.length > 0) {
  console.error("Professional presence contract tests failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Professional presence contract tests passed.");
