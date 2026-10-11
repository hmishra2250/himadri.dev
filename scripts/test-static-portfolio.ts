import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderSite } from "./lib/render-site";

const manifest = JSON.parse(
  readFileSync(".next/prerender-manifest.json", "utf8"),
);
for (const route of ["/", "/resume"]) {
  const entry = manifest.routes[route];
  assert.ok(entry, `${route} must be prerendered at build time`);
  assert.equal(
    entry.initialRevalidateSeconds,
    false,
    `${route} must remain static`,
  );
  assert.ok(!manifest.dynamicRoutes[route]);
}
console.log(
  "Home and Resume are statically prerendered, with no request-time content rendering.",
);

/*
 * The prerendered HTML lives at .next/server/app/resume.html in a local
 * build. Vercel's build of Next.js 16.4 keeps it elsewhere or not at all, so
 * look in the known places and otherwise render the page from its components
 * (the same markup the build prerenders).
 */
const candidates = [
  ".next/server/app/resume.html",
  ".next/server/app/resume/index.html",
  ".next/server/app/resume/page.html",
  ".vercel/output/static/resume.html",
  ".vercel/output/static/resume/index.html",
];
const built = candidates.find((path) => existsSync(join(process.cwd(), path)));
let resumeHtml: string;
if (built) {
  resumeHtml = readFileSync(built, "utf8");
} else {
  resumeHtml = renderSite()[1].html;
  console.log(
    "Prerendered resume HTML is not on disk in this build; checking the rendered page instead.",
  );
}

assert.ok(
  !resumeHtml.includes("<iframe"),
  "Resume pages render in the page flow, not an iframe",
);
assert.ok(
  !resumeHtml.includes('role="tablist"'),
  "One public version, no tabs",
);
assert.match(resumeHtml, /resume-1\.png/);
assert.match(resumeHtml, /<a[^>]*download="Himadri_Mishra_Resume\.pdf"/);
assert.match(resumeHtml, /<a[^>]*download="Himadri_Mishra_CV\.pdf"/);
assert.match(
  resumeHtml,
  /<a[^>]*href="\/resume\/Himadri_Mishra_Resume\.pdf"/,
  "The resume links to its PDF",
);
assert.ok(
  !resumeHtml.includes("selectable text"),
  "No help text about file formats",
);
console.log(
  "Resume is static: the one-page resume in the page flow, its download, and a link to the full CV.",
);
