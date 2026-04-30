import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/metadata";

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

export function buildRootJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [buildPersonJsonLd(), buildWebSiteJsonLd()],
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
