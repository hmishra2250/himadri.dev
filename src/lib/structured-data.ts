import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/metadata";
import { publicRoutes } from "@/lib/routes";
import { buildCanonicalUrl, getRouteSeo } from "@/lib/seo";

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

function pageId(path: string) {
  return `${buildCanonicalUrl(path)}#webpage`;
}

function breadcrumbId(path: string) {
  return `${buildCanonicalUrl(path)}#breadcrumb`;
}

function routeLabel(path: string) {
  const route = publicRoutes.find((item) => item.path === path);
  return route?.label ?? getRouteSeo(path).title;
}

function parentPaths(path: string) {
  if (path === "/") return ["/"];
  const parts = path.split("/").filter(Boolean);
  const paths = ["/"];
  for (let index = 0; index < parts.length; index += 1) {
    paths.push(`/${parts.slice(0, index + 1).join("/")}`);
  }
  return paths.filter((item) => publicRoutes.some((route) => route.path === item));
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
  const type = path === "/" ? "ProfilePage" : "WebPage";
  return {
    "@type": type,
    "@id": pageId(path),
    name: seo.title,
    description: seo.description,
    url: buildCanonicalUrl(seo.canonicalPath),
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: "en",
  };
}

export function buildBreadcrumbListJsonLd(path: string): JsonLdObject | null {
  if (path === "/") return null;
  const itemListElement = parentPaths(path).map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item === "/" ? "Home" : routeLabel(item),
    item: buildCanonicalUrl(item),
  }));
  if (itemListElement.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement,
  };
}

export function buildRouteJsonLd(path: string): JsonLdObject {
  const graph = [buildWebPageJsonLd(path)];
  const breadcrumbs = buildBreadcrumbListJsonLd(path);
  if (breadcrumbs) graph.push(breadcrumbs);
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
