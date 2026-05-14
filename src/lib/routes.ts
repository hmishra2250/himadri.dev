export type RoutePhase = "v1" | "v1.5a" | "v1.5b" | "v2a" | "v2b" | "v2c";
export type RouteKind = "page" | "api";
export type RouteStatus = "required" | "conditional" | "deferred" | "internal";
export type RobotsPolicy = "allow" | "disallow" | "noindex";
export type RouteOwnerFeature =
  | "core"
  | "case-study"
  | "interview"
  | "challenge"
  | "assistant"
  | "principles"
  | "notes";

export type RouteManifestEntry = {
  path: string;
  kind: RouteKind;
  phase: RoutePhase;
  status: RouteStatus;
  enabled: boolean;
  includeInSitemap: boolean;
  includeInNav: boolean;
  robotsPolicy: RobotsPolicy;
  requiresProofGate: boolean;
  requiresSourceCards?: boolean;
  requiresPublicLabel?: boolean;
  label?: string;
  ownerFeature: RouteOwnerFeature;
};

export const routeManifest: RouteManifestEntry[] = [
  {
    path: "/",
    kind: "page",
    phase: "v1",
    status: "required",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "Home",
    ownerFeature: "core",
  },
  {
    path: "/case-studies",
    kind: "page",
    phase: "v1",
    status: "required",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "Work",
    ownerFeature: "case-study",
  },
  {
    path: "/case-studies/agentic-market-research-platform",
    kind: "page",
    phase: "v1",
    status: "required",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "Agentic Market Research Platform",
    ownerFeature: "case-study",
  },

  {
    path: "/about",
    kind: "page",
    phase: "v2c",
    status: "required",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "About",
    ownerFeature: "profile",
  },
  {
    path: "/resume",
    kind: "page",
    phase: "v1",
    status: "required",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "Resume",
    ownerFeature: "core",
  },
  {
    path: "/contact",
    kind: "page",
    phase: "v1",
    status: "required",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: false,
    label: "Contact",
    ownerFeature: "core",
  },
  {
    path: "/case-studies/ml-infra-rescue",
    kind: "page",
    phase: "v1",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "ML Infrastructure Rescue",
    ownerFeature: "case-study",
  },
  {
    path: "/case-studies/computer-vision-product-systems",
    kind: "page",
    phase: "v1",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "Computer Vision Product Systems",
    ownerFeature: "case-study",
  },
  {
    path: "/case-studies/high-performance-ar-and-vision",
    kind: "page",
    phase: "v1",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "High-Performance AR and Vision",
    ownerFeature: "case-study",
  },
  {
    path: "/interview-me",
    kind: "page",
    phase: "v1.5a",
    status: "required",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: true,
    requiresSourceCards: true,
    label: "Interview Me",
    ownerFeature: "interview",
  },
  {
    path: "/principles",
    kind: "page",
    phase: "v1.5a",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "Principles",
    ownerFeature: "principles",
  },
  {
    path: "/notes",
    kind: "page",
    phase: "v2c",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: true,
    label: "Notes",
    ownerFeature: "notes",
  },
  {
    path: "/challenges",
    kind: "page",
    phase: "v1.5b",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: true,
    robotsPolicy: "allow",
    requiresProofGate: true,
    requiresPublicLabel: true,
    label: "Challenges",
    ownerFeature: "challenge",
  },
  {
    path: "/challenges/debug-this-agent",
    kind: "page",
    phase: "v1.5b",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    requiresPublicLabel: true,
    label: "Debug This Agent",
    ownerFeature: "challenge",
  },
  {
    path: "/challenges/cost-anatomy",
    kind: "page",
    phase: "v1.5b",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    requiresPublicLabel: true,
    label: "Cost Anatomy",
    ownerFeature: "challenge",
  },
  {
    path: "/api/interview",
    kind: "api",
    phase: "v2b",
    status: "internal",
    enabled: process.env.ENABLE_INTERVIEW_ASSISTANT_API === "1",
    includeInSitemap: false,
    includeInNav: false,
    robotsPolicy: "noindex",
    requiresProofGate: true,
    requiresSourceCards: true,
    label: "Interview API",
    ownerFeature: "assistant",
  },
  {
    path: "/challenges/dag-execution-simulator",
    kind: "page",
    phase: "v2c",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    requiresPublicLabel: true,
    label: "DAG Execution Simulator",
    ownerFeature: "challenge",
  },
  {
    path: "/challenges/deck-ir-previewer",
    kind: "page",
    phase: "v2c",
    status: "conditional",
    enabled: true,
    includeInSitemap: true,
    includeInNav: false,
    robotsPolicy: "allow",
    requiresProofGate: true,
    requiresPublicLabel: true,
    label: "Deck IR Previewer",
    ownerFeature: "challenge",
  },
  {
    path: "/hiring-packet",
    kind: "page",
    phase: "v2c",
    status: "deferred",
    enabled: false,
    includeInSitemap: false,
    includeInNav: false,
    robotsPolicy: "noindex",
    requiresProofGate: true,
    requiresPublicLabel: true,
    label: "Hiring Packet",
    ownerFeature: "core",
  },
];

export const enabledRoutes = routeManifest.filter((route) => route.enabled);
export const publicRoutes = routeManifest.filter(
  (route) => route.enabled && route.kind === "page" && route.includeInSitemap,
);
export const navRoutes = routeManifest.filter(
  (route) => route.enabled && route.kind === "page" && route.includeInNav,
);
export const requiredRoutes = routeManifest.filter(
  (route) => route.enabled && route.status === "required",
);
export const deferredRoutes = routeManifest.filter(
  (route) => !route.enabled || route.status === "deferred",
);
export const robotsDisallowRoutes = routeManifest
  .filter((route) => route.robotsPolicy === "disallow")
  .map((route) => route.path);

export function routeIsPublic(path: string) {
  return publicRoutes.some((route) => route.path === path);
}

export function routeIsEnabled(path: string) {
  return enabledRoutes.some((route) => route.path === path);
}
