import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/metadata";
import { buildCanonicalUrl, getRouteSeo } from "@/lib/seo";
import { publicRoutes, routeManifest } from "@/lib/routes";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export type JsonLdObject = { [key: string]: JsonLdValue };

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;

function buildPageId(path: string) {
  const suffix = path === "/" ? "#profilepage" : "#webpage";
  return `${buildCanonicalUrl(path)}${suffix}`;
}

function routeLabel(path: string) {
  if (path === "/") return "Home";
  const route = routeManifest.find((entry) => entry.path === path);
  if (route?.label) return route.label;
  return getRouteSeo(path).title;
}

function buildBreadcrumbJsonLd(path: string): JsonLdObject | null {
  if (path === "/") return null;

  const segments = path.split("/").filter(Boolean);
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: buildCanonicalUrl("/"),
    },
  ];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath = `${currentPath}/${segment}`;
    const isPublic = publicRoutes.some((route) => route.path === currentPath);
    if (!isPublic) return;
    itemListElement.push({
      "@type": "ListItem",
      position: itemListElement.length + 1,
      name: routeLabel(currentPath),
      item: buildCanonicalUrl(currentPath),
    });
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${buildCanonicalUrl(path)}#breadcrumb`,
    itemListElement,
  };
}

export function buildPersonJsonLd(): JsonLdObject {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: siteConfig.url,
    jobTitle: profile.role,
    description: profile.positioning,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github],
  };
}

export function buildWebSiteJsonLd(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": personId },
    inLanguage: "en",
  };
}

export function buildWebPageJsonLd(path: string): JsonLdObject {
  const seo = getRouteSeo(path);
  return {
    "@type": path === "/" ? "ProfilePage" : "WebPage",
    "@id": buildPageId(path),
    name: seo.title,
    description: seo.description,
    url: buildCanonicalUrl(path),
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en",
  };
}

export function buildRouteJsonLd(path: string): JsonLdObject {
  const graph = [buildWebPageJsonLd(path)];
  const breadcrumb = buildBreadcrumbJsonLd(path);
  if (breadcrumb) graph.push(breadcrumb);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildRootJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [buildPersonJsonLd(), buildWebSiteJsonLd(), buildWebPageJsonLd("/")],
  };
}

export function escapeJsonLd(json: string) {
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
