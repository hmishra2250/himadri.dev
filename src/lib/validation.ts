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
import { principles } from "@/content/principles";
import { proofClaims } from "@/content/proof";
import { stackOpinions } from "@/content/stack-opinions";
import { traceLabel } from "@/content/traces";
import {
  deferredRoutes,
  publicRoutes,
  requiredRoutes,
  robotsDisallowRoutes,
  routeIsEnabled,
  routeManifest,
} from "@/lib/routes";

export function validateContent() {
  const errors: string[] = [];
  const ids = new Set<string>();
  const questionIds = new Set<string>();
  const answerIds = new Set(interviewAnswers.map((answer) => answer.id));

  for (const claim of proofClaims) {
    if (ids.has(claim.id)) errors.push(`Duplicate proof claim id: ${claim.id}`);
    ids.add(claim.id);
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

  const checkProofRef = (owner: string, proofId: string) => {
    if (!ids.has(proofId))
      errors.push(`${owner} references missing proof claim: ${proofId}`);
  };

  const checkEnabledHref = (owner: string, href: string) => {
    if (href.startsWith("/resume/") && href.endsWith(".pdf")) return;
    const routePath = href.split("#")[0];
    if (!routeIsEnabled(routePath))
      errors.push(`${owner} links to disabled route: ${href}`);
  };

  metrics.forEach((metric) => {
    checkProofRef(`metric ${metric.id}`, metric.proofId);
    if (!metric.context) errors.push(`metric ${metric.id} missing context`);
  });
  principles.forEach((principle) =>
    checkProofRef(`principle ${principle.id}`, principle.proofId),
  );
  hiringFit.forEach((fit) =>
    checkProofRef(`hiring fit ${fit.signal}`, fit.proofId),
  );
  caseStudies.forEach((study) => {
    study.proofIds.forEach((proofId) =>
      checkProofRef(`case study ${study.slug}`, proofId),
    );
    if (study.routeEnabled && !study.summary)
      errors.push(`case study ${study.slug} missing summary`);
  });

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
        checkProofRef(`interview source card ${card.title}`, proofId);
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
      checkProofRef(`stack opinion ${opinion.id}`, proofId),
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
      checkProofRef(`debug scenario ${scenario.id}`, proofId),
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
      checkProofRef(`diagram ${diagram.id}`, proofId),
    );
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
  return errors;
}
