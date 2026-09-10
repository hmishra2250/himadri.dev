import type { Practice } from "@/content/practice";
import type { ProofClaim } from "@/content/proof";

const canonicalResumePath = "/resume/Himadri_Mishra_Resume.pdf";
const publicResumeSourcePath = "public/resume/Himadri_Mishra_Resume.pdf";
const legacyDatedResumePath = "Himadri_Latest_Resume_April_2026.pdf";
const urlPattern =
  /(?:https?:\/\/|www\.|github\.com|gitlab\.com|bitbucket\.org)/i;
const numericDetailPattern = /\d/;
const metricLikePattern =
  /\b\d+(?:\.\d+)?\s?(?:%|x|ms|s|sec|seconds?|m|min|minutes?|h|hours?|k|users?|docs?|requests?|tokens?|charts?|tasks?|reports?|PRs?|pull requests?|issues?|commits?)\b/i;
const monthDatePattern =
  /\b(?:(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{1,2}(?:,?\s+(?:19|20)\d{2})?|\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?)\b/i;
const explicitDatePattern =
  /\b(?:19|20)\d{2}\b|\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b/i;
const privateLocatorPattern =
  /(?:https?:\/\/|github\.com|pull\/\d+|issues?\/\d+|\bPR\s*#?\d+\b|private|ledger|verified-public-contributions\.json)/i;

const recentContributionKeys = ["id", "title", "summary", "proofIds"] as const;
const recentCaseKeys = [
  "id",
  "title",
  "summary",
  "work",
  "verification",
  "proofIds",
] as const;

function hasOnlyRecentContributionKeys(value: Record<string, unknown>) {
  const keys = Object.keys(value).sort();
  return (
    keys.length === recentContributionKeys.length &&
    recentContributionKeys.every((key) => keys.includes(key))
  );
}

function validateRecentText(errors: string[], owner: string, value: string) {
  if (urlPattern.test(value))
    errors.push(`${owner} contains a URL or repository host`);
  if (numericDetailPattern.test(value)) {
    errors.push(`${owner} contains numeric detail`);
  }
  if (metricLikePattern.test(value)) {
    errors.push(`${owner} contains a metric-like or count-like claim`);
  }
  if (explicitDatePattern.test(value) || monthDatePattern.test(value)) {
    errors.push(`${owner} contains an explicit date or timeline`);
  }
}

function validateRecentLocatorText(
  errors: string[],
  owner: string,
  value: string,
) {
  if (urlPattern.test(value))
    errors.push(`${owner} contains a URL or repository host`);
  if (metricLikePattern.test(value)) {
    errors.push(`${owner} contains a metric-like or count-like claim`);
  }
  if (explicitDatePattern.test(value) || monthDatePattern.test(value)) {
    errors.push(`${owner} contains an explicit date or timeline`);
  }
}

export function validatePracticeContract(
  practice: Practice,
  proofClaims: ProofClaim[],
) {
  const errors: string[] = [];
  const proofById = new Map(proofClaims.map((claim) => [claim.id, claim]));
  const seenContributionIds = new Set<string>();

  if (!practice.eyebrow.trim()) errors.push("practice missing eyebrow");
  if (!practice.headline.trim()) errors.push("practice missing headline");
  if (!practice.summary.trim()) errors.push("practice missing summary");

  if (practice.engagements.length === 0) {
    errors.push("practice engagements must not be empty");
  }
  for (const engagement of practice.engagements) {
    const owner = `practice engagement ${engagement.id || "<missing-id>"}`;
    if (!engagement.id.trim()) errors.push(`${owner} missing id`);
    if (!engagement.title.trim()) errors.push(`${owner} missing title`);
    if (!engagement.summary.trim()) errors.push(`${owner} missing summary`);
    if (engagement.deliverables.length === 0) {
      errors.push(`${owner} missing deliverables`);
    }
  }

  if (practice.recentContributions.length === 0) {
    errors.push("practice recent contributions must not be empty");
  }
  if (practice.recentWorkCases.length === 0) {
    errors.push("practice recent work cases must not be empty");
  }
  for (const brief of practice.recentWorkCases) {
    const keys = Object.keys(brief);
    if (
      keys.length !== recentCaseKeys.length ||
      !recentCaseKeys.every((key) => keys.includes(key))
    ) {
      errors.push(
        `recent work case ${brief.id} has unsupported attribution fields`,
      );
    }
    if (!brief.verification.trim()) {
      errors.push(`recent work case ${brief.id} missing verification`);
    }
    if (brief.work.length === 0 || brief.work.some((item) => !item.trim())) {
      errors.push(`recent work case ${brief.id} missing work detail`);
    }
  }
  const recentEntries = [
    ...practice.recentContributions,
    ...practice.recentWorkCases.map((brief) => ({
      id: brief.id,
      title: brief.title,
      summary: [brief.summary, ...brief.work, brief.verification].join(" "),
      proofIds: brief.proofIds,
    })),
  ];
  for (const contribution of recentEntries) {
    const owner = `practice recent contribution ${contribution.id || "<missing-id>"}`;
    if (
      !hasOnlyRecentContributionKeys(
        contribution as unknown as Record<string, unknown>,
      )
    ) {
      errors.push(
        `${owner} must only expose id, title, summary and proofIds fields`,
      );
    }
    if (!contribution.id.trim()) errors.push(`${owner} missing id`);
    if (seenContributionIds.has(contribution.id)) {
      errors.push(`${owner} duplicates contribution id`);
    }
    seenContributionIds.add(contribution.id);
    if (!contribution.title.trim()) errors.push(`${owner} missing title`);
    if (!contribution.summary.trim()) errors.push(`${owner} missing summary`);
    validateRecentText(errors, `${owner} title`, contribution.title);
    validateRecentText(errors, `${owner} summary`, contribution.summary);
    if (contribution.proofIds.length === 0) {
      errors.push(`${owner} missing proofIds`);
    }
    for (const proofId of contribution.proofIds) {
      const proof = proofById.get(proofId);
      if (!proof) {
        errors.push(`${owner} references missing proof claim: ${proofId}`);
        continue;
      }
      if (!proof.approvedForPublicUse) {
        errors.push(`${owner} references unapproved proof claim: ${proofId}`);
      }
      if (proof.confidentialityLevel === "private-do-not-publish") {
        errors.push(`${owner} references private proof claim: ${proofId}`);
      }
      if (proof.sourcePath !== publicResumeSourcePath) {
        errors.push(
          `${owner} proof ${proofId} must use canonical public resume source path`,
        );
      }
      if (proof.sourcePath.includes(legacyDatedResumePath)) {
        errors.push(`${owner} proof ${proofId} uses legacy dated resume path`);
      }
      if (privateLocatorPattern.test(proof.sourceLocator)) {
        errors.push(
          `${owner} proof ${proofId} source locator exposes private or identifying detail`,
        );
      }
      validateRecentText(
        errors,
        `${owner} proof ${proofId} claim`,
        proof.claim,
      );
      validateRecentLocatorText(
        errors,
        `${owner} proof ${proofId} source locator`,
        proof.sourceLocator,
      );
      if (proof.publicLabel) {
        validateRecentLocatorText(
          errors,
          `${owner} proof ${proofId} public label`,
          proof.publicLabel,
        );
      }
    }
  }

  if (practice.summary.includes(canonicalResumePath)) {
    errors.push("practice summary must not embed resume asset paths");
  }

  if (practice.approach.length === 0)
    errors.push("practice approach must not be empty");
  for (const item of practice.approach) {
    if (!item.title.trim()) errors.push("practice approach item missing title");
    if (!item.summary.trim())
      errors.push(`practice approach ${item.title} missing summary`);
  }

  return errors;
}
