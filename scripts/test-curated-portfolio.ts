import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../src/app/page";
import { AllCaseStudies } from "../src/components/home/CaseStudyGrid";
import { Navbar } from "../src/components/layout/Navbar";
import { Footer } from "../src/components/layout/Footer";
import NotesPage from "../src/app/notes/page";
import sitemap from "../src/app/sitemap";
import { selectedWork } from "../src/content/selected-work";
import { currentWork } from "../src/content/current-work";
import { practice } from "../src/content/practice";
import { aboutPage } from "../src/content/about";
import { claimById } from "../src/content/proof";
import { metrics } from "../src/content/metrics";
import { caseStudies } from "../src/content/case-studies";
import { validateInternalHrefFragment } from "./lib/fragment-links";

const home = renderToStaticMarkup(createElement(Home));
const work = renderToStaticMarkup(createElement(AllCaseStudies));
const nav = renderToStaticMarkup(createElement(Navbar));
const footer = renderToStaticMarkup(createElement(Footer));
const axUrl = "https://agentexperience.tech/";
for (const [name, markup] of [
  ["header", nav],
  ["footer", footer],
]) {
  const hrefs = [...markup.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(
    hrefs.slice(
      hrefs.indexOf("/case-studies"),
      hrefs.indexOf("/case-studies") + 5,
    ),
    ["/case-studies", axUrl, "/about", "/resume", "/contact"],
    `${name}: shared navigation order`,
  );
  assert.equal(
    hrefs.filter((href) => href === axUrl).length,
    1,
    `${name}: one external guide link`,
  );
  assert.match(markup, /aria-label="Agent Experience \(external website\)"/);
  assert.match(markup, /Agent Experience <span aria-hidden="true">↗<\/span>/);
}
assert.ok(
  sitemap().every((entry) => new URL(entry.url).hostname === "www.himadri.dev"),
  "External navigation must not enter the portfolio sitemap",
);
const notesPage = renderToStaticMarkup(createElement(NotesPage));
assert.ok(
  notesPage.includes(`href="${axUrl}"`),
  "Notes connects readers to the field guide",
);

// Keep authored website copy direct, including content behind disabled routes.
const contractions =
  /\b(?:[a-z]+n['’]t|(?:i|you|we|they)['’](?:m|re|ve|ll|d)|(?:it|that|there|here|what|who|he|she|let)['’]s)\b/i;
for (const root of ["src/content", "src/components", "src/app"]) {
  for (const file of readdirSync(root, { recursive: true, encoding: "utf8" })) {
    if (!/\.(?:tsx?|mdx?)$/.test(file)) continue;
    const source = readFileSync(`${root}/${file}`, "utf8");
    assert.doesNotMatch(
      source,
      /\u2014|&mdash;|&#8212;|&#x2014;/i,
      `${file}: no em dashes`,
    );
    assert.doesNotMatch(
      source.replace(/&(?:apos|rsquo|#39|#x27|#8217|#x2019);/gi, "'"),
      contractions,
      `${file}: no contractions`,
    );
  }
}
assert.ok(practice.summary.split(/\s+/).length <= 24, "A short, direct intro");

assert.equal((home.match(/class="hero-text-link"/g) || []).length, 2);
currentWork.methodCards.push({
  ...currentWork.methodCards[0],
  id: "unlisted-method-fixture",
});
try {
  assert.throws(
    () => renderToStaticMarkup(createElement(AllCaseStudies)),
    /Unordered current-work method card: unlisted-method-fixture/,
  );
} finally {
  currentWork.methodCards.pop();
}
const escape = (text: string) =>
  renderToStaticMarkup(createElement("span", null, text)).slice(6, -7);
assert.equal(selectedWork.length, 3);
assert.ok(home.includes(escape(practice.headline)));
assert.ok(home.includes(escape(practice.secondaryHeadline)));
assert.equal(practice.headline, "Agent Experience Engineer.");
assert.equal(practice.secondaryHeadline, "AI Product Engineer.");
assert.ok(
  selectedWork.every((item) =>
    item.proofIds.every((id) => id.startsWith("method-")),
  ),
);
for (const metric of metrics)
  assert.ok(
    !home.includes(escape(metric.value)),
    `No historical homepage metric: ${metric.id}`,
  );
assert.ok(home.includes("project-feature"));
assert.ok(
  home.includes("Simplified method illustration, not a production trace."),
);
assert.ok(home.includes("backend, frontend, ML and computer vision"));
assert.ok(home.includes("More shipped agent systems."));
assert.ok(home.includes('class="button primary" href="/case-studies"'));
assert.equal((home.match(/class="system-link"/g) || []).length, 3);
for (const system of currentWork.reviewedSystems) {
  const tile = home.match(
    new RegExp(
      `<a[^>]+class="system-link"[^>]+href="/case-studies#${system.id}"[^>]*>([\\s\\S]*?)</a>`,
    ),
  )?.[1];
  assert.ok(tile, `Whole-tile native link for ${system.id}`);
  assert.ok(tile.includes(escape(system.title)));
  assert.ok(tile.includes(escape(system.summary)));
  assert.ok(tile.includes("Explore the system"));
  assert.ok(
    home.includes(
      `aria-labelledby="${system.id}-preview-title ${system.id}-preview-action"`,
    ),
  );
  assert.ok(home.includes(`href="/case-studies#${system.id}"`));
  assert.deepEqual(
    validateInternalHrefFragment({
      href: `/case-studies#${system.id}`,
      owner: system.id,
    }),
    [],
  );
}
assert.ok(
  validateInternalHrefFragment({
    href: "/case-studies#nonexistent-ax-fragment",
    owner: "negative fixture",
  }).length > 0,
);
assert.ok(work.indexOf('id="public-work"') < work.indexOf('id="earlier-work"'));
assert.equal((home.match(/<article\b/g) || []).length, 3);
assert.ok(nav.includes('href="/case-studies"'));
assert.ok(!nav.includes('href="/#work"'));
assert.ok(home.includes('id="work"'));
assert.ok(home.includes(escape(aboutPage.summary)));
for (const item of selectedWork) {
  for (const copy of [
    item.title,
    item.summary,
    item.engineering,
    item.category,
    item.linkLabel,
  ])
    assert.ok(home.includes(escape(copy)));
  assert.ok(home.includes(`href="${item.href}"`));
  assert.deepEqual(
    validateInternalHrefFragment({ href: item.href, owner: item.id }),
    [],
  );
  for (const id of item.proofIds) {
    const proof = claimById(id);
    assert.ok(proof.approvedForPublicUse);
    if (proof.publicLabelRequired)
      assert.ok(home.includes(escape(proof.publicLabel!)));
  }
}
for (const item of [
  ...currentWork.methodCards,
  ...currentWork.reviewedSystems,
  ...practice.recentWorkCases,
]) {
  assert.ok(
    !home.includes(`id="${item.id}"`),
    `Home must not duplicate archive: ${item.id}`,
  );
  assert.ok(work.includes(`id="${item.id}"`), `Work must retain ${item.id}`);
}
for (const brief of practice.recentWorkCases)
  for (const copy of [brief.title, brief.summary])
    assert.ok(work.includes(escape(copy)));
for (const project of currentWork.publicProjects)
  assert.ok(work.includes(`href="${project.href}"`));
for (const project of currentWork.publicProjects.slice(1))
  assert.ok(!home.includes(project.href));
for (const study of caseStudies) {
  assert.ok(work.includes(`id="${study.slug}"`));
  assert.ok(work.includes(escape(study.summary)));
  assert.ok(!work.includes(`href="/case-studies/${study.slug}"`));
}
assert.equal((work.match(/<h1[^>]*>Work<\/h1>/g) || []).length, 1);
assert.doesNotMatch(
  work,
  /class="eyebrow"|method-grid|work-column|secondary-grid|Detailed case study/,
);
assert.equal(
  (work.match(/class="work-record(?: work-record-featured)?"/g) || []).length,
  9,
);
assert.doesNotMatch(work, /<details|<button|\u2014|&mdash;/);
const supportingWork = work
  .split('id="supporting-contributions-title">Other work</h3>')[1]
  ?.split("</ul>")[0];
assert.ok(supportingWork, "Other work uses a short supporting list");
assert.equal((supportingWork.match(/<li /g) || []).length, 3);
assert.doesNotMatch(supportingWork, /<article|<h4|work-disclosure/);
for (const brief of practice.recentWorkCases) {
  assert.ok(!supportingWork.includes(escape(brief.verification)));
}

const words = (value: string) => value.trim().split(/\s+/).length;
for (const method of currentWork.methodCards) {
  assert.ok(
    words(method.summary) <= 40,
    `Focused engineering summary: ${method.id}`,
  );
  assert.ok(
    method.details.every((detail) => words(detail) <= 26),
    `Focused implementation bullets: ${method.id}`,
  );
}
assert.equal((work.match(/<h4>Impact<\/h4>/g) || []).length, 6);
assert.equal((work.match(/<h4>How I checked it<\/h4>/g) || []).length, 6);
for (const method of currentWork.methodCards) {
  assert.ok(method.details.length <= 3);
  assert.ok(words(method.impact) <= 36);
  assert.ok(words(method.measurement) <= 36);
  const article = work.split(`id="${method.id}">`)[1]?.split("</article>")[0];
  assert.ok(article, `Missing method article ${method.id}`);
  assert.doesNotMatch(article, /work-result-label/);
  assert.doesNotMatch(article.replace(/<[^>]*>|&#[^;]+;/g, ""), /\d/);
}
for (const brief of practice.recentWorkCases) {
  assert.ok(words(brief.summary) <= 25);
  assert.ok(brief.work.every((item) => words(item) <= 15));
}
for (const id of [
  "agent-tools",
  "ai-workflows",
  "earlier-work",
  "public-work",
]) {
  assert.equal((work.match(new RegExp(`id="${id}"`, "g")) || []).length, 1);
  assert.ok(work.includes(`href="#${id}"`));
}
assert.ok(home.includes('href="/case-studies#public-work"'));
assert.doesNotMatch(
  home,
  /Historical AI product system|Agent experience, end to end|Explore my public work|Shipped systems\./,
);
for (const file of ["src/app/page.tsx", "src/app/case-studies/page.tsx"]) {
  const source = readFileSync(file, "utf8");
  assert.ok(source.includes('export const dynamic = "error"'));
  assert.doesNotMatch(source, /["']use client["']/);
}
for (const file of [
  "src/components/home/SelectedWork.tsx",
  "src/components/home/CurrentWork.tsx",
  "src/components/home/CaseStudyGrid.tsx",
]) {
  assert.doesNotMatch(
    readFileSync(file, "utf8"),
    /["']use client["']|useEffect|useState|fetch\(/,
  );
}

assert.ok(
  work.indexOf('id="supporting-contributions-title"') >
    work.indexOf('id="governed-knowledge-mcp-service"'),
  "Supporting tool and API work follows all AI products",
);
assert.ok(
  work.indexOf('id="supporting-contributions-title"') <
    work.indexOf('id="public-work"'),
  "Supporting tool and API work precedes public work",
);

console.log(
  "Curated homepage, complete archive, proof and static-content contracts passed.",
);
