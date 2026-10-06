import { existsSync } from "node:fs";
import { join } from "node:path";
import { profile } from "../src/content/profile";
import {
  publicRoutes,
  retiredRedirectRoutes,
  routeIsEnabled,
} from "../src/lib/routes";
import { renderSite } from "./lib/render-site";

const errors: string[] = [];

for (const required of ["/", "/resume"]) {
  if (!publicRoutes.some((route) => route.path === required)) {
    errors.push(`required public route missing: ${required}`);
  }
}
for (const route of retiredRedirectRoutes) {
  if (routeIsEnabled(route.path)) {
    errors.push(`retired route is enabled: ${route.path}`);
  }
}
if (!existsSync(join(process.cwd(), "public", profile.resumePath))) {
  errors.push(`resume PDF missing: public${profile.resumePath}`);
}
if (!existsSync(join(process.cwd(), "public/images/himadri-portrait.png"))) {
  errors.push("portrait missing: public/images/himadri-portrait.png");
}

const pages = renderSite();
const idsByPath = new Map(pages.map((page) => [page.path, page.ids]));
let checked = 0;

for (const page of pages) {
  for (const href of page.hrefs) {
    checked += 1;
    if (href.startsWith("https://")) continue;
    if (href.startsWith("/_next/")) continue;
    if (href.startsWith("#")) {
      if (!page.ids.has(href.slice(1))) {
        errors.push(`${page.path}: in-page link to missing id ${href}`);
      }
      continue;
    }
    if (!href.startsWith("/")) {
      errors.push(`${page.path}: link must be https or local: ${href}`);
      continue;
    }
    const [path, fragment] = href.split("#");
    const target = path || "/";
    const isAsset = /\.(pdf|png)$/.test(target);
    if (isAsset) {
      if (!existsSync(join(process.cwd(), "public", target))) {
        errors.push(`${page.path}: link to missing file ${href}`);
      }
      continue;
    }
    if (!routeIsEnabled(target)) {
      errors.push(`${page.path}: link to a page that is not enabled: ${href}`);
      continue;
    }
    if (fragment && !idsByPath.get(target)?.has(fragment)) {
      errors.push(`${page.path}: link to missing section ${href}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Link check failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `Link check passed: ${checked} links across ${pages.length} pages; every local link and section exists.`,
);
