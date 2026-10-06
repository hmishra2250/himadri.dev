import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import nextConfig from "../next.config";
import {
  checkCopy,
  checkHref,
  validateContent,
  validateRoutes,
} from "../src/lib/validation";

const failures: string[] = [];
const assert = (condition: unknown, message: string) => {
  if (!condition) failures.push(message);
};

// Repository contracts.
const config = nextConfig as {
  agentRules?: boolean;
  turbopack?: { root?: string };
};
assert(
  config.turbopack?.root === path.resolve(process.cwd()),
  "next.config.ts must set turbopack.root to the app root",
);
assert(
  config.agentRules === false,
  "next.config.ts must disable generated agentRules so tooling cannot rewrite AGENTS.md",
);
const eslintConfig = readFileSync("eslint.config.mjs", "utf8");
const prettierIgnore = readFileSync(".prettierignore", "utf8").split(/\r?\n/);
for (const ignored of [".claude/**", "design-system/**"]) {
  assert(
    eslintConfig.includes(`"${ignored}"`),
    `ESLint must ignore ${ignored}`,
  );
  assert(prettierIgnore.includes(ignored), `Prettier must ignore ${ignored}`);
}
const resumeFiles = readdirSync("public/resume");
assert(
  resumeFiles.length === 1 && resumeFiles[0] === "Himadri_Mishra_Resume.pdf",
  `public/resume must hold only the canonical PDF, found ${resumeFiles.join(", ")}`,
);

// The real content and routes pass.
const contentErrors = validateContent();
assert(contentErrors.length === 0, `content: ${contentErrors.join(" | ")}`);
const routeErrors = validateRoutes();
assert(routeErrors.length === 0, `routes: ${routeErrors.join(" | ")}`);

// The copy rules catch what they are meant to catch.
const mustFail: Array<[string, string]> = [
  ["I am open to senior and staff roles.", "job-search signal"],
  ["Hire me for your next agent project.", "job-search signal"],
  ["Email himadri.jobhunt@gmail.com", "job-search email"],
  ["Write to mailto:someone@example.com", "public email"],
  ["Built Forge, a Slack-to-PR agent.", "Mudita product name"],
  ["Cut report turnaround from 48-72h to under an hour.", "legacy metric"],
  ["Reduced platform cost by 10x.", "legacy metric"],
  ["Accuracy rose from 93% to 98%.", "legacy metric"],
  [
    "Anonymized engineering summary; underlying work is private.",
    "anonymized caveat",
  ],
  ["AI Product Engineer (Contract)", "contract label"],
  ["Agents \u2014 and tools.", "em dash"],
  ["It's an agent.", "contraction"],
];
for (const [text, reason] of mustFail) {
  assert(
    checkCopy(text, "fixture").length > 0,
    `copy check missed a ${reason}: ${text}`,
  );
}
const mustPass = [
  "I build agents, and the MCP servers, CLIs and SDKs they run on.",
  "Agent discovery rate, 158-run experiment",
  "cut report turnaround from 2-3 days to under an hour.",
];
for (const text of mustPass) {
  assert(
    checkCopy(text, "fixture").length === 0,
    `copy check rejected valid text: ${text}`,
  );
}

assert(
  checkHref("https://github.com/hmishra2250", "fixture").length === 0,
  "https link rejected",
);
assert(checkHref("/#now", "fixture").length === 0, "/#now rejected");
assert(
  checkHref("/#missing", "fixture").length > 0,
  "unknown section accepted",
);
assert(
  checkHref("/case-studies", "fixture").length > 0,
  "retired page accepted",
);
assert(
  checkHref("http://example.com", "fixture").length > 0,
  "plain http accepted",
);

if (failures.length > 0) {
  console.error("Site contract test failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(
  `Site contract test passed: repository contracts, content, routes, and ${mustFail.length} copy-rule fixtures.`,
);
