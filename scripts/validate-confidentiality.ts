import { readFileSync } from "node:fs";
import { join } from "node:path";
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

const sourceBadge = readFileSync(
  join(process.cwd(), "src/components/ui/SourceBadge.tsx"),
  "utf8",
);
if (sourceBadge.includes("\u2014")) {
  errors.push("SourceBadge contains an em dash");
}

if (errors.length > 0) {
  console.error("Confidentiality validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Confidentiality validation passed.");
