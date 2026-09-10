import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(
  readFileSync(".next/prerender-manifest.json", "utf8"),
);
for (const route of ["/", "/case-studies"]) {
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
