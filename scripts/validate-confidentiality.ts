import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import { costModels, debugScenarios } from "../src/content/challenges";
import { flagshipDiagrams } from "../src/content/diagrams";
import { proofClaims } from "../src/content/proof";

const errors: string[] = [];

for (const claim of proofClaims) {
  if (claim.confidentialityLevel === "private-do-not-publish") {
    errors.push(
      `private proof claim is present in public content: ${claim.id}`,
    );
  }
  if (claim.publicLabelRequired && !claim.publicLabel) {
    errors.push(`proof claim requires public label: ${claim.id}`);
  }
}

for (const scenario of debugScenarios) {
  if (!scenario.publicLabel.toLowerCase().includes("customer data")) {
    errors.push(
      `debug scenario ${scenario.id} label must mention customer data omission`,
    );
  }
  if (!scenario.publicLabel.toLowerCase().includes("private prompts")) {
    errors.push(
      `debug scenario ${scenario.id} label must mention private prompt omission`,
    );
  }
}

for (const model of costModels) {
  const serialized = JSON.stringify(model);
  if (/[$€£₹]/.test(serialized)) {
    errors.push(`cost model ${model.id} contains a currency symbol`);
  }
  if (/\bUSD\b|\bdollars?\b|\brupees?\b/i.test(serialized)) {
    errors.push(`cost model ${model.id} contains real-currency wording`);
  }
}

for (const diagram of flagshipDiagrams) {
  if (!diagram.publicLabel.toLowerCase().includes("omitted")) {
    errors.push(
      `diagram ${diagram.id} public label must say private details are omitted`,
    );
  }
}

const emDashScanRoots = [
  "src/content",
  "src/components",
  "src/app",
  "AGENTS.md",
  "docs/plans/README.md",
  "docs/plans/portfolio-gap-remediation-ralplan.md",
  "docs/plans/prd-portfolio-gap-remediation.md",
  "docs/plans/test-spec-portfolio-gap-remediation.md",
];
const emDashExtensions = new Set([".ts", ".tsx", ".md"]);
const ignoredPathParts = new Set(["node_modules", ".next", ".git", "reports"]);

function scanForEmDash(path: string) {
  if (path.split("/").some((part) => ignoredPathParts.has(part))) return;
  const absolute = join(process.cwd(), path);
  const stat = statSync(absolute);
  if (stat.isDirectory()) {
    for (const child of readdirSync(absolute))
      scanForEmDash(`${path}/${child}`);
    return;
  }
  if (!emDashExtensions.has(extname(path))) return;
  const text = readFileSync(absolute, "utf8");
  if (text.includes("\u2014")) errors.push(`${path} contains an em dash`);
}

for (const path of emDashScanRoots) scanForEmDash(path);

if (errors.length > 0) {
  console.error("Confidentiality validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Confidentiality validation passed.");
