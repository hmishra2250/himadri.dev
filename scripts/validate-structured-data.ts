import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/metadata";
import { buildCanonicalUrl } from "@/lib/seo";
import { publicRoutes } from "@/lib/routes";
import { buildRootJsonLd, buildRouteJsonLd } from "@/lib/structured-data";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const jsonLdDocuments = [
  { label: "root", value: buildRootJsonLd() },
  ...publicRoutes.map((route) => ({
    label: route.path,
    value: buildRouteJsonLd(route.path),
  })),
];
const errors: string[] = [];

const allowedKeys = new Set([
  "@context",
  "@graph",
  "@type",
  "@id",
  "name",
  "url",
  "jobTitle",
  "description",
  "email",
  "sameAs",
  "publisher",
  "inLanguage",
  "isPartOf",
  "about",
  "itemListElement",
  "position",
  "item",
]);

const allowedTypes = new Set([
  "Person",
  "WebSite",
  "ProfilePage",
  "WebPage",
  "BreadcrumbList",
  "ListItem",
]);
const allowedSitePaths = new Set<string>([
  "/",
  "/#person",
  "/#website",
  "/#profilepage",
]);
for (const route of publicRoutes) {
  allowedSitePaths.add(route.path);
  allowedSitePaths.add(`${route.path}#webpage`);
  allowedSitePaths.add(`${route.path}#breadcrumb`);
}
const allowedExternalValues = new Set([
  "https://schema.org",
  profile.linkedin,
  profile.github,
  `mailto:${profile.email}`,
]);
const disallowedSubstrings = [
  "/api/interview",
  "/hiring-packet",
  "GEMINI",
  "GA_MEASUREMENT",
  "NEXT_PUBLIC",
  "ENABLE_",
  "API_KEY",
  "SECRET",
  "TOKEN",
  "PASSWORD",
  "process.env",
  ".env",
  "localhost",
  "127.0.0.1",
];
const disallowedKeyPattern =
  /api|key|token|secret|password|private|internal|env/i;

function describePath(path: Array<string | number>) {
  return path.map((part) => `[${String(part)}]`).join("");
}

function checkString(value: string, path: Array<string | number>) {
  for (const fragment of disallowedSubstrings) {
    if (value.includes(fragment)) {
      errors.push(
        `${describePath(path)} contains disallowed value: ${fragment}`,
      );
    }
  }

  if (value.startsWith(siteConfig.url)) {
    const parsed = new URL(value);
    const pathWithHash = `${parsed.pathname}${parsed.hash}`;
    if (!allowedSitePaths.has(pathWithHash)) {
      errors.push(
        `${describePath(path)} uses non-allowlisted site URL: ${value}`,
      );
    }
    return;
  }

  if (/^https?:\/\//.test(value) && !allowedExternalValues.has(value)) {
    errors.push(
      `${describePath(path)} uses non-allowlisted external URL: ${value}`,
    );
  }
}

function walk(value: JsonValue, path: Array<string | number> = []) {
  if (typeof value === "string") {
    checkString(value, path);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, [...path, index]));
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, child] of Object.entries(value)) {
    if (!allowedKeys.has(key)) {
      errors.push(`${describePath(path)} has non-allowlisted key: ${key}`);
    }
    if (disallowedKeyPattern.test(key) && !key.startsWith("@")) {
      errors.push(`${describePath(path)} has private-looking key: ${key}`);
    }
    walk(child, [...path, key]);
  }
}

for (const document of jsonLdDocuments) {
  const jsonLd = document.value;
  if (jsonLd["@context"] !== "https://schema.org") {
    errors.push(`${document.label} @context must be https://schema.org`);
  }

  const graph = jsonLd["@graph"];
  if (!Array.isArray(graph)) {
    errors.push(`${document.label} @graph must be an array`);
  } else {
    for (const node of graph) {
      if (!node || typeof node !== "object" || Array.isArray(node)) {
        errors.push(`${document.label} @graph entries must be objects`);
        continue;
      }
      const type = node["@type"];
      if (typeof type !== "string" || !allowedTypes.has(type)) {
        errors.push(
          `${document.label} has unsafe @graph node type: ${String(type)}`,
        );
      }
    }
  }

  walk(jsonLd, [document.label]);
}

const rootGraph = buildRootJsonLd()["@graph"];
if (Array.isArray(rootGraph)) {
  const rootTypes = new Set(
    rootGraph
      .map((node) =>
        node && typeof node === "object" && !Array.isArray(node)
          ? node["@type"]
          : null,
      )
      .filter(Boolean),
  );
  for (const requiredType of ["Person", "WebSite", "ProfilePage"]) {
    if (!rootTypes.has(requiredType)) {
      errors.push(`root JSON-LD missing ${requiredType}`);
    }
  }
}

for (const route of publicRoutes) {
  const routeJsonLd = buildRouteJsonLd(route.path);
  const graph = routeJsonLd["@graph"];
  if (!Array.isArray(graph)) continue;
  const pageId =
    route.path === "/"
      ? `${buildCanonicalUrl("/")}#profilepage`
      : `${buildCanonicalUrl(route.path)}#webpage`;
  if (!JSON.stringify(graph).includes(pageId)) {
    errors.push(`${route.path} route JSON-LD missing page node`);
  }
  if (route.path !== "/" && !JSON.stringify(graph).includes("BreadcrumbList")) {
    errors.push(`${route.path} route JSON-LD missing breadcrumb node`);
  }
}

if (errors.length > 0) {
  console.error("Structured data validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Structured data validation passed.");
