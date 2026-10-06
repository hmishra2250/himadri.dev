/**
 * Checks a running server (next start or next dev). It does not start one.
 *   CHECK_BASE_URL=http://127.0.0.1:3010 npm run test:design:http
 */
import {
  getRetiredRouteDestination,
  publicRoutes,
  retiredRedirectRoutes,
} from "../src/lib/routes";
import { siteConfig } from "../src/lib/metadata";
import { checkCopy } from "../src/lib/validation";

const base = process.env.CHECK_BASE_URL ?? "http://127.0.0.1:3010";
const failures: string[] = [];
const assert = (condition: unknown, message: string) => {
  if (!condition) failures.push(message);
};

const visibleText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ");

async function main() {
  const stylesheets = new Set<string>();

  for (const route of publicRoutes) {
    const response = await fetch(new URL(route.path, base));
    assert(
      response.status === 200,
      `${route.path} returned ${response.status}`,
    );
    const html = await response.text();
    assert(
      (html.match(/<main[\s>]/g) ?? []).length === 1,
      `${route.path}: one main`,
    );
    assert(
      (html.match(/<h1[\s>]/g) ?? []).length === 1,
      `${route.path}: one h1`,
    );
    const canonical = new URL(route.path, siteConfig.url).toString();
    assert(
      [canonical, canonical.replace(/\/$/, "")].some((href) =>
        html.includes(`<link rel="canonical" href="${href}"`),
      ),
      `${route.path}: canonical link missing`,
    );
    assert(
      /<meta name="description" content="[^"]+"/.test(html),
      `${route.path}: description missing`,
    );
    assert(!html.includes("mailto:"), `${route.path}: publishes an email`);
    for (const error of checkCopy(visibleText(html), `served ${route.path}`)) {
      failures.push(error);
    }
    for (const match of html.matchAll(
      /<link rel="stylesheet" href="([^"]+)"/g,
    )) {
      stylesheets.add(match[1]);
    }
  }

  let css = "";
  for (const href of stylesheets) {
    css += await (await fetch(new URL(href, base))).text();
  }
  for (const token of [
    "--pearl:#f6f7f8",
    "--cobalt:#2855d8",
    ".hm-section-bar",
    ".site-oneliners",
  ]) {
    assert(
      css.replace(/\s/g, "").includes(token),
      `served CSS is missing ${token}`,
    );
  }

  const portrait = await fetch(new URL("/images/himadri-portrait.png", base));
  assert(portrait.status === 200, "portrait is not served");

  for (const route of retiredRedirectRoutes) {
    const response = await fetch(new URL(route.path, base), {
      redirect: "manual",
    });
    assert(
      response.status === 308,
      `${route.path} returned ${response.status}, expected 308`,
    );
    const location = response.headers.get("location") ?? "";
    const expected = getRetiredRouteDestination(route.path);
    assert(
      location === expected || location.endsWith(expected),
      `${route.path} redirects to ${location}, expected ${expected}`,
    );
  }

  const unknown = await fetch(new URL("/case-studies/not-a-page", base), {
    redirect: "manual",
  });
  assert(
    unknown.status === 404,
    `unknown case-study URL returned ${unknown.status}, expected 404`,
  );

  if (failures.length > 0) {
    console.error(`HTTP design check failed against ${base}:`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(
    `HTTP design check passed against ${base}: ${publicRoutes.length} pages, ${retiredRedirectRoutes.length} redirects, design tokens served.`,
  );
}

void main();
