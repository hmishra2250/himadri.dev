import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

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

const resumeHtml = readFileSync(".next/server/app/resume.html", "utf8");
assert.ok(
  !resumeHtml.includes("<iframe"),
  "Resume pages render in the page flow, not an iframe",
);
assert.match(resumeHtml, /role="tablist"/);
assert.match(resumeHtml, /resume-1\.png/);
assert.match(resumeHtml, /cv-1\.png/);
assert.match(resumeHtml, /cv-2\.png/);
assert.match(resumeHtml, /<a[^>]*download="Himadri_Mishra_Resume\.pdf"/);
assert.ok(
  resumeHtml.includes("Open the PDF"),
  "Each document needs a link to its selectable-text PDF",
);
console.log(
  "Resume is static: tabs for the resume and CV, pages in the page flow, and a PDF link for each.",
);
