export type RouteStatus = "required" | "retired";
export type RobotsPolicy = "allow" | "disallow" | "noindex";

export type RouteManifestEntry = {
  path: string;
  kind: "page";
  status: RouteStatus;
  enabled: boolean;
  includeInSitemap: boolean;
  includeInNav: boolean;
  robotsPolicy: RobotsPolicy;
  label: string;
  /** Retired routes only: a local page, optionally with a #fragment */
  redirectTo?: string;
};

const page = (
  path: string,
  label: string,
  options: { includeInNav?: boolean } = {},
): RouteManifestEntry => ({
  path,
  kind: "page",
  status: "required",
  enabled: true,
  includeInSitemap: true,
  includeInNav: options.includeInNav ?? false,
  robotsPolicy: "allow",
  label,
});

const retired = (
  path: string,
  label: string,
  redirectTo: string,
): RouteManifestEntry => ({
  path,
  kind: "page",
  status: "retired",
  enabled: false,
  includeInSitemap: false,
  includeInNav: false,
  robotsPolicy: "allow",
  label,
  redirectTo,
});

export const routeManifest: RouteManifestEntry[] = [
  page("/", "Home"),
  page("/resume", "Resume", { includeInNav: true }),

  // Retired in the October 2026 one-page redesign. Old links land on the
  // matching section of the homepage.
  retired("/case-studies", "Work", "/#firecrawl"),
  retired(
    "/case-studies/agentic-market-research-platform",
    "Agentic Market Research Platform",
    "/#before",
  ),
  retired(
    "/case-studies/ml-infra-rescue",
    "ML Infrastructure Rescue",
    "/#before",
  ),
  retired(
    "/case-studies/computer-vision-product-systems",
    "Computer Vision Product Systems",
    "/#before",
  ),
  retired(
    "/case-studies/high-performance-ar-and-vision",
    "High-Performance AR and Vision",
    "/#before",
  ),
  retired("/about", "About", "/#before"),
  retired("/notes", "Notes", "/"),
  retired("/contact", "Contact", "/"),
  retired("/interview-me", "Interview Me", "/"),
  retired("/principles", "Principles", "/"),
  retired("/challenges", "Challenges", "/"),
  retired("/challenges/debug-this-agent", "Debug This Agent", "/"),
  retired("/challenges/cost-anatomy", "Cost Anatomy", "/"),
  retired(
    "/challenges/dag-execution-simulator",
    "DAG Execution Simulator",
    "/",
  ),
  retired("/challenges/deck-ir-previewer", "Deck IR Previewer", "/"),
  retired("/hiring-packet", "Hiring Packet", "/"),
];

export const enabledRoutes = routeManifest.filter((route) => route.enabled);
export const publicRoutes = routeManifest.filter(
  (route) => route.enabled && route.includeInSitemap,
);
export const navRoutes = routeManifest.filter(
  (route) => route.enabled && route.includeInNav,
);
export const requiredRoutes = routeManifest.filter(
  (route) => route.enabled && route.status === "required",
);
export const robotsDisallowRoutes = routeManifest
  .filter((route) => route.robotsPolicy === "disallow")
  .map((route) => route.path);
export const retiredRedirectRoutes = routeManifest.filter(
  (route) => route.status === "retired",
);

export const resumeAssetRedirectRoute = {
  source: "/resume/Himadri_Latest_Resume_April_2026.pdf",
  destination: "/resume/Himadri_Mishra_Resume.pdf",
  permanent: true,
} as const;

export const assetRedirectRoutes = [resumeAssetRedirectRoute] as const;

export function routeIsPublic(path: string) {
  return publicRoutes.some((route) => route.path === path);
}

export function routeIsEnabled(path: string) {
  return enabledRoutes.some((route) => route.path === path);
}

export function getRetiredRouteDestination(path: string): string {
  const route = routeManifest.find((entry) => entry.path === path);
  if (!route) throw new Error(`Unknown route cannot redirect: ${path}`);
  if (route.status !== "retired") {
    throw new Error(`Route is not retired and cannot redirect: ${path}`);
  }
  if (!route.redirectTo?.startsWith("/")) {
    throw new Error(
      `Retired route missing local redirect destination: ${path}`,
    );
  }

  const destinationPath = route.redirectTo.split("#")[0];
  if (destinationPath === route.path) {
    throw new Error(`Retired route redirects to itself: ${path}`);
  }
  if (!routeIsEnabled(destinationPath)) {
    throw new Error(
      `Retired route redirects to non-enabled page: ${path} -> ${route.redirectTo}`,
    );
  }

  return route.redirectTo;
}
