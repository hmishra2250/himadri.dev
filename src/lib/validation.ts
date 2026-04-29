import { caseStudies } from "@/content/case-studies";
import { hiringFit } from "@/content/hiring-fit";
import { metrics } from "@/content/metrics";
import { principles } from "@/content/principles";
import { proofClaims } from "@/content/proof";
import { traceLabel } from "@/content/traces";
import {
  deferredRoutes,
  publicRoutes,
  requiredRoutes,
  routeManifest,
} from "@/lib/routes";

export function validateContent() {
  const errors: string[] = [];
  const ids = new Set<string>();

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
  }
  const publicPaths = new Set(publicRoutes.map((route) => route.path));
  for (const study of caseStudies.filter((item) => item.routeEnabled)) {
    const path = `/case-studies/${study.slug}`;
    if (!publicPaths.has(path))
      errors.push(`enabled case study missing public manifest route: ${path}`);
  }
  return errors;
}
