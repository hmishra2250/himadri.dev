import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { proofClaims } from "../src/content/proof";
import { collectSiteContent } from "../src/lib/validation";

const errors: string[] = [];

for (const claim of proofClaims) {
  if (claim.confidentialityLevel !== "public") {
    errors.push(`non-public proof claim is present: ${claim.id}`);
  }
}

// Identifiers that point at private work, machines or infrastructure.
const privateIdentifiers: ReadonlyArray<readonly [RegExp, string]> = [
  [
    /mudita-forge|zoe-ui-design|agent-experience-lab|firebrain/i,
    "private repository name",
  ],
  [/\/Users\/|\/home\/|\.omx\/|scratchpad/i, "local path"],
  [
    /localhost|127\.0\.0\.1|process\.env|\b(?:api|secret|access|auth)[_-]?(?:key|token)\b|\bbearer\b|password/i,
    "secret or endpoint",
  ],
  [
    /[$€£₹]\s?\d|\b\d[\d,.]*\s?(?:USD|dollars?|rupees?)\b/i,
    "real currency amount",
  ],
];

for (const { path, value } of collectSiteContent()) {
  if (typeof value !== "string") continue;
  for (const [pattern, reason] of privateIdentifiers) {
    if (pattern.test(value)) errors.push(`${path}: ${reason}`);
  }
}

const emDashScanRoots = [
  "src/content",
  "src/components",
  "src/app",
  "AGENTS.md",
  "docs/plans/README.md",
  "docs/plans/portfolio-one-page-2026-10.md",
];
const emDashExtensions = new Set([".ts", ".tsx", ".md"]);

function scanForEmDash(path: string) {
  const absolute = join(process.cwd(), path);
  if (!existsSync(absolute)) {
    errors.push(`em-dash scan root is missing: ${path}`);
    return;
  }
  if (statSync(absolute).isDirectory()) {
    for (const child of readdirSync(absolute)) {
      scanForEmDash(`${path}/${child}`);
    }
    return;
  }
  if (!emDashExtensions.has(extname(path))) return;
  if (readFileSync(absolute, "utf8").includes("\u2014")) {
    errors.push(`${path} contains an em dash`);
  }
}

for (const path of emDashScanRoots) scanForEmDash(path);

if (errors.length > 0) {
  console.error("Confidentiality validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Confidentiality validation passed.");
