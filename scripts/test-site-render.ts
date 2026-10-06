import { readFileSync } from "node:fs";
import { before, firecrawl, hero, now, sections } from "../src/content/site";
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
assert(count(home.text, hero.facts) === 1, "facts line must appear once");
assert(
  (resume.html.match(/<h1[\s>]/g) ?? []).length === 1,
  "resume must have one h1",
);

for (const section of sections) {
  assert(home.ids.has(section.id), `home is missing section #${section.id}`);
}

for (const item of [...now.also, ...before.openSource]) {
  assert(home.text.includes(item.name), `one-liner not rendered: ${item.name}`);
  if (item.href) {
    assert(
      home.hrefs.includes(item.href),
      `one-liner link missing: ${item.name}`,
    );
  }
}

assert(
  home.text.includes(firecrawl.rewrite.title),
  "the hosted MCP rewrite must lead the Firecrawl panel",
);
for (const step of firecrawl.loop) {
  assert(home.text.includes(step.name), `loop step missing: ${step.name}`);
}
for (const change of firecrawl.changes) {
  assert(home.text.includes(change.title), `change missing: ${change.title}`);
  if (change.result) {
    assert(
      home.text.includes(change.result.label),
      `result missing: ${change.result.label}`,
    );
  }
}
const prLinks = home.hrefs.filter((href) => href.includes("/pull/"));
for (const href of prLinks) {
  assert(
    /^https:\/\/github\.com\/firecrawl\/[a-z0-9-]+\/pull\/\d+$/.test(href),
    `pull request link has an unexpected shape: ${href}`,
  );
}
assert(
  prLinks.length >= 10,
  `expected at least 10 pull request links, found ${prLinks.length}`,
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

const words = home.text.split(/\s+/).length;
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
