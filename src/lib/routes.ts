export type RouteStatus = "required" | "conditional" | "deferred";

export type RouteManifestEntry = {
  path: string;
  status: RouteStatus;
  includeInSitemap: boolean;
  includeInNav: boolean;
  label?: string;
};

export const routeManifest: RouteManifestEntry[] = [
  {
    path: "/",
    status: "required",
    includeInSitemap: true,
    includeInNav: false,
    label: "Home",
  },
  {
    path: "/case-studies",
    status: "required",
    includeInSitemap: true,
    includeInNav: true,
    label: "Work",
  },
  {
    path: "/case-studies/agentic-market-research-platform",
    status: "required",
    includeInSitemap: true,
    includeInNav: false,
    label: "Agentic Market Research Platform",
  },
  {
    path: "/resume",
    status: "required",
    includeInSitemap: true,
    includeInNav: true,
    label: "Resume",
  },
  {
    path: "/contact",
    status: "required",
    includeInSitemap: true,
    includeInNav: true,
    label: "Contact",
  },
  {
    path: "/case-studies/ml-infra-rescue",
    status: "conditional",
    includeInSitemap: true,
    includeInNav: false,
    label: "ML Infrastructure Rescue",
  },
  {
    path: "/case-studies/computer-vision-product-systems",
    status: "conditional",
    includeInSitemap: true,
    includeInNav: false,
    label: "Computer Vision Product Systems",
  },
  {
    path: "/case-studies/high-performance-ar-and-vision",
    status: "conditional",
    includeInSitemap: true,
    includeInNav: false,
    label: "High-Performance AR and Vision",
  },
  {
    path: "/interview-me",
    status: "deferred",
    includeInSitemap: false,
    includeInNav: false,
  },
  {
    path: "/challenges",
    status: "deferred",
    includeInSitemap: false,
    includeInNav: false,
  },
  {
    path: "/principles",
    status: "deferred",
    includeInSitemap: false,
    includeInNav: false,
  },
];

export const publicRoutes = routeManifest.filter(
  (route) => route.includeInSitemap,
);
export const navRoutes = routeManifest.filter((route) => route.includeInNav);
export const requiredRoutes = routeManifest.filter(
  (route) => route.status === "required",
);
export const deferredRoutes = routeManifest.filter(
  (route) => route.status === "deferred",
);

export function routeIsPublic(path: string) {
  return publicRoutes.some((route) => route.path === path);
}
