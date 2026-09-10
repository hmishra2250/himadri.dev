import type { CurrentWork } from "@/content/current-work";
import { reviewedWorkLabel, methodWorkLabel } from "@/content/current-work";
import { currentWorkMetrics, type Metric } from "@/content/metrics";
import type { ProofClaim } from "@/content/proof";

const publicSources = new Map([
  ["https://agentexperience.tech/", "Published guide"],
  [
    "https://agentexperience.tech/insights/agent-readiness-rubric/",
    "Draft rubric",
  ],
  [
    "https://github.com/hmishra2250/awesome-agent-experience",
    "Curated collection",
  ],
  [
    "https://github.com/hmishra2250/qwen-3.6-35b-consumer-gpu",
    "Local experiment",
  ],
]);
const systemStatuses = new Set(["Shipped working version"]);
const methodStatuses = new Set([
  "Completed experiments",
  "Shipped system",
  "Shipped platform",
  "Implemented evaluation",
  "Shipped reporting",
]);

export function validateCurrentWork(
  content: CurrentWork,
  proofs: ProofClaim[],
  metricEntries: Metric[] = currentWorkMetrics,
) {
  const errors: string[] = [];
  const ids = new Set<string>();
  const proofById = new Map(proofs.map((proof) => [proof.id, proof]));

  function checkEntry(entry: object, keys: string[]) {
    const value = entry as Record<string, unknown>;
    const owner = String(value.id ?? "<missing-id>");
    if (
      Object.keys(value).length !== keys.length ||
      keys.some((key) => !(key in value))
    ) {
      errors.push(`${owner} has missing or unsupported fields`);
    }
    for (const key of keys) {
      const field = value[key];
      if (key === "work" || key === "details" || key === "metricIds") {
        if (
          !Array.isArray(field) ||
          (key !== "metricIds" && !field.length) ||
          field.some((item) => typeof item !== "string" || !item.trim())
        ) {
          errors.push(`${owner} missing ${key} detail`);
        }
      } else if (typeof field !== "string" || !field.trim()) {
        errors.push(`${owner} missing ${key}`);
      }
    }
    if (ids.has(owner)) errors.push(`${owner} duplicates current work id`);
    ids.add(owner);
    const proof = proofById.get(String(value.proofId));
    if (
      !proof ||
      !proof.approvedForPublicUse ||
      proof.confidentialityLevel === "private-do-not-publish"
    ) {
      errors.push(`${owner} missing approved public proof`);
      return undefined;
    }
    return proof;
  }

  for (const [key, entries] of Object.entries(content)) {
    if (!entries.length) errors.push(`current work missing ${key}`);
  }
  for (const system of content.reviewedSystems) {
    const proof = checkEntry(system, [
      "id",
      "title",
      "summary",
      "work",
      "status",
      "limitations",
      "proofId",
      "publicLabel",
    ]);
    if (!systemStatuses.has(system.status))
      errors.push(`${system.id} invalid implementation status`);
    if (system.publicLabel !== reviewedWorkLabel)
      errors.push(`${system.id} missing anonymized summary label`);
    const anonymousText = JSON.stringify([system, proof]);
    if (
      /https?:|www\.|github\.|\/Users\/|\.omx\/|scratchpad|\b(?:PR|commit)\s*#?\d|\d|[$€£₹]/i.test(
        anonymousText,
      )
    ) {
      errors.push(
        `${system.id} contains identifying locator or numeric detail`,
      );
    }
    if (
      proof &&
      (proof.sourceType !== "sanitized-artifact" ||
        proof.sourcePath !== "docs/evidence/current-systems.md" ||
        proof.confidentialityLevel !== "sanitized" ||
        !proof.publicLabelRequired ||
        proof.publicLabel !== reviewedWorkLabel)
    ) {
      errors.push(`${system.id} must use labeled sanitized summary proof`);
    }
  }
  for (const project of content.publicProjects) {
    const proof = checkEntry(project, [
      "id",
      "title",
      "summary",
      "status",
      "limitations",
      "href",
      "proofId",
    ]);
    if (publicSources.get(project.href) !== project.status)
      errors.push(`${project.id} invalid public project link or status`);
    if (
      proof &&
      (proof.sourceType !== "public-profile" ||
        proof.sourcePath !== project.href ||
        proof.confidentialityLevel !== "public")
    ) {
      errors.push(`${project.id} must use its public project source`);
    }
  }
  for (const method of content.methodCards) {
    const proof = checkEntry(method, [
      "id",
      "title",
      "summary",
      "details",
      "impact",
      "measurement",
      "metricIds",
      "status",
      "limitations",
      "publicLabel",
      "proofId",
    ]);
    if (!methodStatuses.has(method.status))
      errors.push(`${method.id} invalid method status`);
    if (method.publicLabel !== methodWorkLabel)
      errors.push(`${method.id} missing anonymized method label`);
    if (
      /https?:|www\.|github\.|\/Users\/|\.omx\/|scratchpad|\d|[$€£₹]/i.test(
        JSON.stringify([method, proof]),
      )
    )
      errors.push(
        `${method.id} contains identifying locator or numeric detail`,
      );
    if (
      proof &&
      (proof.sourceType !== "sanitized-artifact" ||
        proof.sourcePath !== "docs/evidence/current-methods.md" ||
        proof.confidentialityLevel !== "sanitized" ||
        !proof.publicLabelRequired ||
        proof.publicLabel !== methodWorkLabel)
    ) {
      errors.push(`${method.id} must use labeled sanitized method proof`);
    }
  }
  const metricOwners = new Map([
    ["routing-task-gain", ["agent-routing-surfaces", "current-routing-study"]],
    [
      "onboarding-surface-coverage",
      ["coded-journey-paths", "current-journey-coverage"],
    ],
    [
      "agent-harness-coverage",
      ["multi-harness-ax-experiments", "current-harness-coverage"],
    ],
  ]);
  const metricIds = new Set<string>();
  for (const metric of metricEntries) {
    if (metricIds.has(metric.id)) errors.push(`${metric.id} duplicate metric`);
    metricIds.add(metric.id);
    if (
      ![
        metric.id,
        metric.value,
        metric.label,
        metric.context,
        metric.proofId,
      ].every((value) => typeof value === "string" && value.trim())
    )
      errors.push(`${metric.id} missing metric context or field`);
    const proof = proofById.get(metric.proofId);
    if (
      !metricOwners.has(metric.id) ||
      metricOwners.get(metric.id)?.[1] !== metric.proofId ||
      !proof?.approvedForPublicUse ||
      proof.sourceType !== "sanitized-artifact" ||
      proof.sourcePath !== "docs/evidence/current-work-results.md" ||
      proof.confidentialityLevel !== "sanitized" ||
      !proof.publicLabelRequired ||
      proof.publicLabel !== methodWorkLabel
    )
      errors.push(`${metric.id} must use approved sanitized metric proof`);
    if (
      /https?:|www\.|github\.|\/Users\/|\.omx\/|scratchpad|[$€£₹]/i.test(
        JSON.stringify([metric, proof]),
      )
    )
      errors.push(`${metric.id} contains identifying locator or currency`);
    const owners = content.methodCards.filter((card) =>
      card.metricIds?.includes(metric.id),
    );
    if (
      owners.length !== 1 ||
      owners[0].id !== metricOwners.get(metric.id)?.[0]
    )
      errors.push(`${metric.id} invalid metric ownership`);
  }
  for (const card of content.methodCards) {
    for (const id of card.metricIds ?? []) {
      if (!metricIds.has(id)) errors.push(`${card.id} unknown metric ${id}`);
    }
    if (new Set(card.metricIds).size !== card.metricIds?.length)
      errors.push(`${card.id} duplicate metric reference`);
  }
  return errors;
}
