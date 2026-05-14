import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { aboutPage } from "@/content/about";
import { costModels, debugScenarios } from "@/content/challenges";
import { caseStudies } from "@/content/case-studies";
import { flagshipDiagrams } from "@/content/diagrams";
import { hiringFit } from "@/content/hiring-fit";
import {
  answerById,
  interviewAnswers,
  interviewQuestions,
} from "@/content/interview";
import { metrics } from "@/content/metrics";
import type { Note } from "@/content/notes";
import { notes } from "@/content/notes";
import { principles } from "@/content/principles";
import { proofClaims } from "@/content/proof";
import { profile } from "@/content/profile";
import { stackOpinions } from "@/content/stack-opinions";
import { traceLabel } from "@/content/traces";
import {
  ASSISTANT_EVAL_REPORT_PATH,
  ASSISTANT_SERVER_ENABLE_FLAG,
  assistantApiEnabled,
} from "@/lib/assistant/config";
import {
  deferredRoutes,
  navRoutes,
  publicRoutes,
  requiredRoutes,
  robotsDisallowRoutes,
  routeIsEnabled,
  routeManifest,
} from "@/lib/routes";

const canonicalResumePath = "/resume/Himadri_Mishra_Resume.pdf";
const directCurrencyPattern =
  /(?:[$€£₹]\s?\d[\d,]*(?:\.\d+)?|\b(?:USD|EUR|GBP|INR)\s+\d[\d,]*(?:\.\d+)?(?:\/[a-z]+)?|\b\d[\d,]*(?:\.\d+)?\s+(?:dollars?|euros?|pounds?|rupees?)\b)/i;
const metricLikeClaimPattern =
  /\b\d+(?:\.\d+)?\s?(?:%|x|ms|k|m|users?|docs?|requests?|tokens?|charts?|tasks?|reports?|hours?)\b/i;
function collectProofIds() {
  return new Set(proofClaims.map((claim) => claim.id));
}

function checkProofRef(
  errors: string[],
  validProofIds: Set<string>,
  owner: string,
  proofId: string,
) {
  if (!validProofIds.has(proofId)) {
    errors.push(`${owner} references missing proof claim: ${proofId}`);
  }
}

function routePathFromHref(href: string) {
  return href.split("#")[0];
}

function isApprovedNoteHref(href: string) {
  if (href === canonicalResumePath) return true;
  if (href === profile.github || href === profile.linkedin) return true;
  if (/^https?:\/\//.test(href)) return false;

  const routePath = routePathFromHref(href);
  return (
    routeIsEnabled(routePath) &&
    publicRoutes.some((route) => route.path === routePath)
  );
}

export function validateNoteDraft(note: Note) {
  const errors: string[] = [];
  const validProofIds = collectProofIds();
  const owner = `note ${note.id}`;
  const serialized = JSON.stringify(note);

  if (!note.id) errors.push("note missing id");
  if (!note.title) errors.push(`${owner} missing title`);
  if (!note.dek) errors.push(`${owner} missing dek`);
  if (note.body.length === 0) errors.push(`${owner} missing body`);
  if (!note.publicLabel) errors.push(`${owner} missing public label`);

  if (directCurrencyPattern.test(serialized)) {
    errors.push(`${owner} contains direct currency or exact cost wording`);
  }

  if (metricLikeClaimPattern.test(serialized) && note.proofIds.length === 0) {
    errors.push(`${owner} contains metric-like claims without proof metadata`);
  }

  for (const proofId of note.proofIds) {
    checkProofRef(errors, validProofIds, owner, proofId);
  }

  for (const link of note.relatedLinks) {
    if (!isApprovedNoteHref(link.href)) {
      errors.push(
        `${owner} links to unapproved route or profile: ${link.href}`,
      );
    }
    if (
      link.href.includes("/hiring-packet") ||
      link.href.includes("/api/interview")
    ) {
      errors.push(
        `${owner} links to forbidden internal or disabled path: ${link.href}`,
      );
    }
    if (link.href.includes("Himadri_Latest_Resume_April_2026.pdf")) {
      errors.push(`${owner} links to legacy dated resume path: ${link.href}`);
    }
  }

  for (const artifact of note.artifacts) {
    const label = artifact.visibleLabel.toLowerCase();
    if (!artifact.visibleLabel.trim()) {
      errors.push(`${owner} artifact ${artifact.title} missing visible label`);
    }
    if (!label.includes(artifact.kind)) {
      errors.push(
        `${owner} artifact ${artifact.title} label must include ${artifact.kind}`,
      );
    }
  }

  return errors;
}

export function validateContent() {
  const errors: string[] = [];
  const ids = collectProofIds();
  const seenProofIds = new Set<string>();
  const questionIds = new Set<string>();
  const answerIds = new Set(interviewAnswers.map((answer) => answer.id));

  for (const claim of proofClaims) {
    if (seenProofIds.has(claim.id))
      errors.push(`Duplicate proof claim id: ${claim.id}`);
    seenProofIds.add(claim.id);
    if (!claim.sourcePath) errors.push(`${claim.id} missing sourcePath`);
    if (!claim.sourceLocator) errors.push(`${claim.id} missing sourceLocator`);
    if (!claim.approvedForPublicUse)
      errors.push(`${claim.id} is not approved for public use`);
    if (claim.confidentialityLevel === "private-do-not-publish") {
      errors.push(
        `${claim.id} is private-do-not-publish but present in public content`,
      );
    }
    if (claim.publicLabelRequired && !claim.publicLabel) {
      errors.push(`${claim.id} requires a public label but none is set`);
    }
  }

  const checkLocalProofRef = (owner: string, proofId: string) =>
    checkProofRef(errors, ids, owner, proofId);

  const checkEnabledHref = (owner: string, href: string) => {
    if (href.startsWith("/resume/") && href.endsWith(".pdf")) return;
    const routePath = href.split("#")[0];
    if (!routeIsEnabled(routePath))
      errors.push(`${owner} links to disabled route: ${href}`);
  };

  metrics.forEach((metric) => {
    checkLocalProofRef(`metric ${metric.id}`, metric.proofId);
    if (!metric.context) errors.push(`metric ${metric.id} missing context`);
  });
  principles.forEach((principle) =>
    checkLocalProofRef(`principle ${principle.id}`, principle.proofId),
  );
  hiringFit.forEach((fit) =>
    checkLocalProofRef(`hiring fit ${fit.signal}`, fit.proofId),
  );
  caseStudies.forEach((study) => {
    study.proofIds.forEach((proofId) =>
      checkLocalProofRef(`case study ${study.slug}`, proofId),
    );
    if (study.routeEnabled && !study.summary)
      errors.push(`case study ${study.slug} missing summary`);
  });

  aboutPage.proofCards.forEach((card) => {
    checkLocalProofRef(`about proof card ${card.id}`, card.proofId);
    checkEnabledHref(`about proof card ${card.id}`, card.href);
  });
  aboutPage.ctas.forEach((cta) =>
    checkEnabledHref(`about cta ${cta.label}`, cta.href),
  );

  for (const question of interviewQuestions) {
    if (questionIds.has(question.id))
      errors.push(`duplicate interview question id: ${question.id}`);
    questionIds.add(question.id);
    if (!answerIds.has(question.answerId))
      errors.push(
        `interview question ${question.id} references missing answer: ${question.answerId}`,
      );
    const answer = answerById(question.answerId);
    if (!question.category)
      errors.push(`interview question ${question.id} missing category`);
    if (answer.sourceCards.length === 0)
      errors.push(`interview answer ${answer.id} missing source cards`);
  }
  for (const answer of interviewAnswers) {
    if (!interviewQuestions.some((question) => question.answerId === answer.id))
      errors.push(`orphan interview answer: ${answer.id}`);
    for (const card of answer.sourceCards) {
      checkEnabledHref(`interview answer ${answer.id}`, card.href);
      card.proofIds.forEach((proofId) => {
        checkLocalProofRef(`interview source card ${card.title}`, proofId);
        const proof = proofClaims.find((claim) => claim.id === proofId);
        if (proof && !proof.approvedForPublicUse)
          errors.push(
            `interview source card ${card.title} uses unapproved proof: ${proofId}`,
          );
      });
    }
  }

  for (const opinion of stackOpinions) {
    if (!opinion.evidence)
      errors.push(`stack opinion ${opinion.id} missing evidence`);
    checkEnabledHref(`stack opinion ${opinion.id}`, opinion.relatedHref);
    opinion.proofIds.forEach((proofId) =>
      checkLocalProofRef(`stack opinion ${opinion.id}`, proofId),
    );
  }

  for (const scenario of debugScenarios) {
    if (
      scenario.choices.filter(
        (choice) => choice.id === scenario.correctChoiceId,
      ).length !== 1
    ) {
      errors.push(
        `debug scenario ${scenario.id} must have exactly one correct choice`,
      );
    }
    if (scenario.spans.length === 0)
      errors.push(`debug scenario ${scenario.id} missing spans`);
    if (!scenario.diagnosis || !scenario.fix)
      errors.push(`debug scenario ${scenario.id} missing diagnosis or fix`);
    if (
      !scenario.publicLabel.toLowerCase().includes("representative sanitized")
    )
      errors.push(
        `debug scenario ${scenario.id} missing representative sanitized label`,
      );
    if (scenario.reviewerSignoff.decision !== "approved")
      errors.push(
        `debug scenario ${scenario.id} missing approved reviewer signoff`,
      );
    scenario.proofIds.forEach((proofId) =>
      checkLocalProofRef(`debug scenario ${scenario.id}`, proofId),
    );
  }

  for (const model of costModels) {
    const total = model.categories.reduce(
      (sum, category) => sum + category.units,
      0,
    );
    if (total !== model.totalUnits)
      errors.push(
        `cost model ${model.id} totals ${total}, expected ${model.totalUnits}`,
      );
    const serialized = JSON.stringify(model);
    if (/[$€£₹]/.test(serialized))
      errors.push(`cost model ${model.id} contains currency symbol`);
  }

  for (const diagram of flagshipDiagrams) {
    if (!diagram.caption) errors.push(`diagram ${diagram.id} missing caption`);
    if (!diagram.publicLabel)
      errors.push(`diagram ${diagram.id} missing public label`);
    diagram.proofIds.forEach((proofId) =>
      checkLocalProofRef(`diagram ${diagram.id}`, proofId),
    );
  }

  for (const note of notes) {
    errors.push(...validateNoteDraft(note));
  }

  if (!traceLabel.toLowerCase().includes("sanitized representative")) {
    errors.push(
      "trace label must visibly identify sanitized representative trace data",
    );
  }

  return errors;
}

export function validateRoutes() {
  const errors: string[] = [];
  for (const route of requiredRoutes) {
    if (!route.includeInSitemap)
      errors.push(`required route missing from sitemap: ${route.path}`);
    if (route.robotsPolicy === "disallow")
      errors.push(`required route blocked by robots policy: ${route.path}`);
  }
  for (const route of deferredRoutes) {
    if (route.includeInSitemap)
      errors.push(`deferred route included in sitemap: ${route.path}`);
    if (route.includeInNav)
      errors.push(`deferred route included in nav: ${route.path}`);
  }
  for (const route of routeManifest) {
    if (route.includeInNav && !route.label)
      errors.push(`nav route missing label: ${route.path}`);
    if (
      route.kind === "api" &&
      (route.includeInSitemap || route.includeInNav)
    ) {
      errors.push(`api route cannot be in sitemap or nav: ${route.path}`);
    }
    if (
      route.enabled &&
      route.kind === "page" &&
      route.robotsPolicy === "disallow"
    ) {
      errors.push(`enabled page route is disallowed in robots: ${route.path}`);
    }
  }
  if (navRoutes.length > 9) {
    errors.push(`nav exposes ${navRoutes.length} routes; maximum is 9`);
  }
  const publicPaths = new Set(publicRoutes.map((route) => route.path));
  for (const study of caseStudies.filter((item) => item.routeEnabled)) {
    const path = `/case-studies/${study.slug}`;
    if (!publicPaths.has(path))
      errors.push(`enabled case study missing public manifest route: ${path}`);
  }
  if (routeIsEnabled("/challenges")) {
    const enabledChallengeChildren = routeManifest.filter(
      (route) =>
        route.enabled &&
        route.ownerFeature === "challenge" &&
        route.path !== "/challenges" &&
        route.phase === "v1.5b",
    );
    if (enabledChallengeChildren.length === 0)
      errors.push(
        "/challenges cannot be enabled without an enabled child challenge",
      );
  }
  for (const path of robotsDisallowRoutes) {
    if (publicPaths.has(path))
      errors.push(`public route disallowed by robots: ${path}`);
  }

  const interviewApi = routeManifest.find(
    (route) => route.path === "/api/interview",
  );
  if (interviewApi?.enabled) {
    if (!assistantApiEnabled()) {
      errors.push(
        `/api/interview is enabled but ${ASSISTANT_SERVER_ENABLE_FLAG} is not explicitly set to 1`,
      );
    }
    const reportPath = join(process.cwd(), ASSISTANT_EVAL_REPORT_PATH);
    if (!existsSync(reportPath)) {
      errors.push(
        `assistant eval report missing: ${ASSISTANT_EVAL_REPORT_PATH}`,
      );
    } else {
      const report = JSON.parse(readFileSync(reportPath, "utf8")) as {
        passed?: boolean;
        datasetSize?: number;
        corpusHash?: string;
        evalHash?: string;
      };
      if (report.passed !== true)
        errors.push("assistant eval report did not pass");
      if (!report.datasetSize || report.datasetSize < 40)
        errors.push("assistant eval dataset must contain at least 40 cases");
      if (!report.corpusHash || !report.evalHash)
        errors.push(
          "assistant eval report must include corpusHash and evalHash",
        );
    }
  }
  return errors;
}
