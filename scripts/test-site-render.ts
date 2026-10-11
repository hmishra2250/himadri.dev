import { readFileSync } from "node:fs";
import { hero, latest, projects, sections, work } from "../src/content/site";
import { checkCopy } from "../src/lib/validation";
import { renderSite } from "./lib/render-site";

const failures: string[] = [];
const assert = (condition: unknown, message: string) => {
  if (!condition) failures.push(message);
};
const count = (text: string, needle: string) => text.split(needle).length - 1;

const [home, resume] = renderSite();

// One message per layer: the punchline is the h1, once; the facts line, once.
const h1s = [...home.html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
assert(h1s.length === 1, `home must have one h1, found ${h1s.length}`);
assert(
  h1s[0]?.[1].replace(/<[^>]+>/g, "") === hero.punchline,
  "home h1 must be the punchline",
);
assert(count(home.text, hero.punchline) === 1, "punchline must appear once");
// Links inside the paragraph render with spaces around them, so check each
// run of plain text, trimmed of its punctuation, appears exactly once
for (const segment of hero.lead) {
  if (typeof segment !== "string") continue;
  const run = segment.replace(/^[\s,.:;]+|[\s,.:;]+$/g, "").trim();
  if (run.length < 12) continue;
  assert(
    count(home.text, run) === 1,
    `the positioning paragraph must appear once: ${run.slice(0, 40)}`,
  );
}
assert(
  (resume.html.match(/<h1[\s>]/g) ?? []).length === 1,
  "resume must have one h1",
);

for (const section of sections) {
  assert(home.ids.has(section.id), `home is missing section #${section.id}`);
}

for (const item of [...projects.side, ...projects.earlier]) {
  assert(home.text.includes(item.name), `row not rendered: ${item.name}`);
  if (item.href) {
    assert(home.hrefs.includes(item.href), `row link missing: ${item.name}`);
  }
}

for (const record of [work.featured, work.mcp, work.harness]) {
  assert(home.text.includes(record.title), `record missing: ${record.title}`);
  for (const point of record.points) {
    assert(home.text.includes(point), `record point missing: ${point}`);
  }
}
for (const row of work.also) {
  assert(home.text.includes(row.title), `row missing: ${row.title}`);
  for (const link of row.links) {
    assert(home.hrefs.includes(link.href), `row link missing: ${link.label}`);
  }
}
for (const item of latest.items) {
  assert(home.hrefs.includes(item.href), `latest link missing: ${item.title}`);
}
const prLinks = home.hrefs.filter((href) => href.includes("/pull/"));
for (const href of prLinks) {
  assert(
    /^https:\/\/github\.com\/firecrawl\/[a-z0-9-]+\/pull\/\d+$/.test(href),
    `pull request link has an unexpected shape: ${href}`,
  );
}
assert(
  prLinks.length >= 8,
  `expected at least 8 pull request links, found ${prLinks.length}`,
);

for (const page of [home, resume]) {
  for (const error of checkCopy(page.text, `rendered ${page.path}`)) {
    failures.push(error);
  }
  assert(
    !page.html.includes("mailto:"),
    `${page.path} must not publish an email`,
  );
  assert(
    (page.html.match(/<main[\s>]/g) ?? []).length === 1,
    `${page.path} must have one main element`,
  );
}

// Words a reader sees, not glyphs: arrows and separators do not count, and
// SVG titles and descriptions are for screen readers, not on screen
const words = home.html
  .replace(/<(title|desc)\b[^>]*>[\s\S]*?<\/\1>/g, " ")
  .replace(/<script[\s\S]*?<\/script>/g, " ")
  .replace(/<[^>]+>/g, " ")
  .split(/\s+/)
  .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
assert(words <= 1200, `homepage has ${words} words; keep it under 1,200`);

const pageSource = readFileSync("src/app/page.tsx", "utf8");
assert(
  /export const dynamic = "error"/.test(pageSource),
  'src/app/page.tsx must export dynamic = "error" so it stays static',
);
assert(
  !/^"use client"/m.test(pageSource),
  "src/app/page.tsx must stay a server component",
);

if (failures.length > 0) {
  console.error("Site render test failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(
  `Site render test passed: one h1, ${sections.length} sections, ${prLinks.length} PR links, ${words} words on the homepage.`,
);
