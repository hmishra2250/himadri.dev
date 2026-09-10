import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../src/app/page";
import { AllCaseStudies } from "../src/components/home/CaseStudyGrid";
import { currentWork, type CurrentWork } from "../src/content/current-work";
import { proofClaims, type ProofClaim } from "../src/content/proof";
import { currentWorkMetrics, type Metric } from "../src/content/metrics";
import { portfolioChunks } from "../src/content/assistant/chunks";
import { validateCurrentWork } from "../src/lib/current-work-validation";

assert.deepEqual(validateCurrentWork(currentWork, proofClaims), []);

function rejects(
  change: (
    content: CurrentWork,
    proofs: ProofClaim[],
    metrics: Metric[],
  ) => void,
  expected: RegExp,
) {
  const content = structuredClone(currentWork);
  const proofs = structuredClone(proofClaims);
  const metrics = structuredClone(currentWorkMetrics);
  change(content, proofs, metrics);
  assert.match(
    validateCurrentWork(content, proofs, metrics).join("\n"),
    expected,
  );
}

for (const key of [
  "title",
  "summary",
  "status",
  "limitations",
  "publicLabel",
] as const) {
  rejects((content) => {
    content.reviewedSystems[0][key] = "" as never;
  }, /missing|invalid/);
}
rejects((content) => {
  content.reviewedSystems[0].work = [];
}, /missing work/);
rejects((content) => {
  content.reviewedSystems[0].proofId = "unknown";
}, /missing approved public proof/);
rejects((content) => {
  Object.assign(content.reviewedSystems[0], {
    employer: "Synthetic organization",
  });
}, /unsupported fields/);
for (const value of [
  "See https://example.invalid/private",
  "Source /Users/example/work",
  "From .omx/research or scratchpad",
  "Improved conversion by 40%",
  "PR #123 is merged",
  "Costs $500",
]) {
  rejects((content) => {
    content.reviewedSystems[0].summary = value;
  }, /identifying locator or numeric detail/);
}
for (const change of [
  (proof: ProofClaim) => {
    proof.approvedForPublicUse = false;
  },
  (proof: ProofClaim) => {
    proof.confidentialityLevel = "private-do-not-publish";
  },
  (proof: ProofClaim) => {
    proof.sourcePath = "public/resume/Himadri_Mishra_Resume.pdf";
  },
  (proof: ProofClaim) => {
    proof.sourcePath = ".omx/research/private.md";
  },
  (proof: ProofClaim) => {
    proof.sourceType = "resume";
  },
  (proof: ProofClaim) => {
    proof.publicLabelRequired = false;
  },
  (proof: ProofClaim) => {
    proof.publicLabel = "";
  },
]) {
  rejects((content, proofs) => {
    change(
      proofs.find((proof) => proof.id === content.reviewedSystems[0].proofId)!,
    );
  }, /approved public proof|sanitized summary proof/);
}
rejects((content) => {
  content.publicProjects[0].href = "https://example.invalid/repo";
}, /invalid public project link/);
rejects((content) => {
  content.publicProjects[0].status = "Local experiment";
}, /invalid public project link or status/);
rejects((content) => {
  content.publicProjects[0].limitations = "";
}, /missing limitations/);
rejects((content, proofs) => {
  proofs.find(
    (proof) => proof.id === content.publicProjects[0].proofId,
  )!.sourcePath = "https://example.invalid/source";
}, /public project source/);
rejects((content, proofs) => {
  proofs.find(
    (proof) => proof.id === content.methodCards[0].proofId,
  )!.sourceType = "resume";
}, /sanitized method proof/);
rejects((content) => {
  content.methodCards[0].id = content.reviewedSystems[0].id;
}, /duplicates/);
rejects((content) => {
  content.methodCards = [];
}, /missing methodCards/);

for (const key of [
  "title",
  "summary",
  "status",
  "limitations",
  "publicLabel",
] as const) {
  rejects((content) => {
    content.methodCards[0][key] = "" as never;
  }, /missing|invalid/);
}
rejects((content) => {
  content.methodCards[0].details = [];
}, /missing details/);
rejects((content) => {
  content.methodCards[0].status = "Shipped" as never;
}, /invalid method status/);
for (const value of [
  "https://example.invalid/private",
  "/Users/example/work",
  "scratchpad",
  "Won by 40%",
  "Costs $500",
]) {
  rejects((content) => {
    content.methodCards[0].details = [value];
  }, /identifying locator or numeric detail/);
}
for (const change of [
  (proof: ProofClaim) => {
    proof.approvedForPublicUse = false;
  },
  (proof: ProofClaim) => {
    proof.confidentialityLevel = "public";
  },
  (proof: ProofClaim) => {
    proof.sourcePath = "https://agentexperience.tech/";
  },
  (proof: ProofClaim) => {
    proof.publicLabelRequired = false;
  },
  (proof: ProofClaim) => {
    proof.publicLabel = "";
  },
]) {
  rejects((content, proofs) => {
    change(
      proofs.find((proof) => proof.id === content.methodCards[0].proofId)!,
    );
  }, /approved public proof|sanitized method proof/);
}
const methodNote = readFileSync("docs/evidence/current-methods.md", "utf8");
for (const method of currentWork.methodCards) {
  assert.ok(methodNote.includes(method.title));
  assert.ok(methodNote.includes(method.limitations));
  assert.ok(
    !portfolioChunks.some((chunk) => chunk.text.includes(method.summary)),
    "private-source methods must not silently enter the assistant corpus",
  );
}

// A summary is not independently reproducible public code. Keep that distinction visible.
const summaryNote = readFileSync("docs/evidence/current-systems.md", "utf8");
for (const system of currentWork.reviewedSystems) {
  assert.ok(
    summaryNote.includes(system.title),
    `summary source missing ${system.title}`,
  );
  assert.ok(
    system.limitations.length > 20,
    `${system.id} needs a meaningful scope limit`,
  );
  assert.ok(
    !portfolioChunks.some((chunk) => chunk.text.includes(system.summary)),
    "private-source systems must not silently enter the assistant corpus",
  );
}
assert.equal(currentWork.publicProjects.length, 4);
assert.equal(
  new Set(currentWork.publicProjects.map((project) => project.status)).size,
  4,
);

for (const system of currentWork.reviewedSystems) {
  assert.equal(system.status, "Shipped working version");
  assert.doesNotMatch(
    JSON.stringify(system),
    /not deployed|integration remains gated|systems in development/i,
  );
}

const homeHtml = renderToStaticMarkup(createElement(Home));
const workHtml = renderToStaticMarkup(createElement(AllCaseStudies));
function renderedText(text: string) {
  return renderToStaticMarkup(createElement("span", null, text)).slice(6, -7);
}
for (const html of [homeHtml, workHtml]) {
  for (const system of currentWork.reviewedSystems) {
    for (const text of [
      system.title,
      system.status,
      system.limitations,
      system.publicLabel,
    ]) {
      assert.ok(
        html.includes(renderedText(text)),
        `rendered work missing ${text}`,
      );
    }
  }
}
for (const project of currentWork.publicProjects) {
  assert.ok(homeHtml.includes(`href="${project.href}"`));
  assert.ok(homeHtml.includes(renderedText(project.status)));
  assert.ok(homeHtml.includes(renderedText(project.limitations)));
}
for (const method of currentWork.methodCards) {
  for (const text of [
    method.title,
    method.summary,
    method.status,
    method.limitations,
    method.publicLabel,
    ...method.details,
  ]) {
    for (const html of [homeHtml, workHtml]) {
      assert.ok(
        html.includes(renderedText(text)),
        `rendered method missing ${text}`,
      );
    }
  }
}
assert.ok(homeHtml.includes("Systems I implemented and shipped"));
for (const html of [homeHtml, workHtml]) {
  assert.ok(html.includes("Shipped systems."));
  assert.doesNotMatch(
    html,
    /systems (?:currently )?in development|not deployed|integration remains gated/i,
  );
  assert.ok(
    html.indexOf("Agent experience, end to end.") <
      html.indexOf("Shipped systems."),
  );
  for (const metric of currentWorkMetrics) {
    for (const text of [metric.value, metric.label, metric.context])
      assert.ok(
        html.includes(renderedText(text)),
        `missing visible metric ${text}`,
      );
    assert.ok(
      !portfolioChunks.some((chunk) => chunk.text.includes(metric.context)),
    );
  }
}
rejects((content) => {
  content.methodCards[0].metricIds = ["unknown"];
}, /unknown metric/);
rejects((content) => {
  content.methodCards[1].metricIds = ["routing-task-gain"];
}, /metric ownership/);
rejects((content) => {
  content.methodCards[0].metricIds.push("routing-task-gain");
}, /duplicate metric/);
rejects((_c, _p, metrics) => {
  metrics[0].context = "";
}, /missing metric context/);
rejects((_c, _p, metrics) => {
  metrics[0].proofId = "current-harness-coverage";
}, /sanitized metric proof/);
rejects((_c, _p, metrics) => {
  metrics[0].context = "/Users/example/private $100";
}, /identifying locator or currency/);
rejects((_c, proofs) => {
  proofs.find((p) => p.id === "current-routing-study")!.approvedForPublicUse =
    false;
}, /sanitized metric proof/);
// Lock the approved publication values, rather than accepting arbitrary numbers.
assert.deepEqual(
  currentWorkMetrics.map(({ id, value }) => [id, value]),
  [
    ["routing-task-gain", "~8 pp"],
    ["onboarding-surface-coverage", "79"],
    ["agent-harness-coverage", "6"],
  ],
);
rejects((_c, _p, metrics) => {
  metrics.push(structuredClone(metrics[0]));
}, /duplicate metric/);
for (const change of [
  (proof: ProofClaim) => {
    proof.sourcePath = "docs/evidence/current-methods.md";
  },
  (proof: ProofClaim) => {
    proof.confidentialityLevel = "public";
  },
  (proof: ProofClaim) => {
    proof.publicLabelRequired = false;
  },
  (proof: ProofClaim) => {
    proof.publicLabel = "";
  },
]) {
  rejects((_c, proofs) => {
    change(proofs.find((p) => p.id === "current-routing-study")!);
  }, /sanitized metric proof/);
}
const resultsNote = readFileSync(
  "docs/evidence/current-work-results.md",
  "utf8",
);
assert.equal(Math.round(((99 - 90) / 118) * 100), 8);
for (const count of ["90/118", "99/118", "79", "6"])
  assert.ok(resultsNote.includes(count), `missing aggregate source ${count}`);

console.log("Current work provenance, status and disclosure tests passed.");
