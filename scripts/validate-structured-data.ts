import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/metadata";
import { buildRootJsonLd } from "@/lib/structured-data";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const jsonLd = buildRootJsonLd();
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
]);

const allowedTypes = new Set(["Person", "WebSite"]);
const allowedSitePaths = new Set(["/", "/#person", "/#website"]);
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

if (jsonLd["@context"] !== "https://schema.org") {
  errors.push("root @context must be https://schema.org");
}

const graph = jsonLd["@graph"];
if (!Array.isArray(graph)) {
  errors.push("root @graph must be an array");
} else {
  if (graph.length !== 2)
    errors.push("root @graph must contain Person and WebSite nodes");
  const types = new Set<string>();
  for (const node of graph) {
    if (!node || typeof node !== "object" || Array.isArray(node)) {
      errors.push("each @graph entry must be an object");
      continue;
    }
    const type = node["@type"];
    if (typeof type !== "string" || !allowedTypes.has(type)) {
      errors.push(`unsafe @graph node type: ${String(type)}`);
    } else {
      types.add(type);
    }
  }
  for (const type of allowedTypes) {
    if (!types.has(type)) errors.push(`missing @graph node type: ${type}`);
  }
}

walk(jsonLd);

if (errors.length > 0) {
  console.error("Structured data validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Structured data validation passed.");
