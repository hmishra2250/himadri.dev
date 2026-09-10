import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(
  readFileSync(".next/prerender-manifest.json", "utf8"),
);
for (const route of ["/", "/case-studies", "/resume"]) {
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
  "Home and Work are statically prerendered, with no request-time content rendering.",
);

const resumeHtml = readFileSync(".next/server/app/resume.html", "utf8");
assert.match(resumeHtml, /<iframe[^>]*title="Himadri Mishra resume PDF"/);
assert.match(
  resumeHtml,
  /<iframe[^>]*src="\/resume\/Himadri_Mishra_Resume\.pdf#view=FitH"/,
);
assert.match(resumeHtml, /<a[^>]*download="Himadri_Mishra_Resume\.pdf"/);
assert.ok(
  resumeHtml.includes("Open the PDF directly"),
  "Embedded viewer needs a visible fallback",
);
console.log(
  "Resume is static with an inline canonical PDF, download and fallback.",
);
