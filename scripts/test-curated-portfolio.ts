import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../src/app/page";
import { AllCaseStudies } from "../src/components/home/CaseStudyGrid";
import { Navbar } from "../src/components/layout/Navbar";
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
for (const system of currentWork.reviewedSystems) {
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
  for (const copy of [
    brief.title,
    brief.summary,
    ...brief.work,
    brief.verification,
  ])
    assert.ok(work.includes(escape(copy)));
for (const project of currentWork.publicProjects)
  assert.ok(work.includes(`href="${project.href}"`));
for (const project of currentWork.publicProjects.slice(1))
  assert.ok(!home.includes(project.href));
for (const study of caseStudies.filter((study) => study.routeEnabled))
  assert.ok(work.includes(`href="/case-studies/${study.slug}"`));
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
console.log(
  "Curated homepage, complete archive, proof and static-content contracts passed.",
);
