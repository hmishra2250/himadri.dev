import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { currentWork } from "../src/content/current-work";
import { selectedWork } from "../src/content/selected-work";
import { currentWorkMetrics, metrics } from "../src/content/metrics";
import { practice } from "../src/content/practice";
import { profile } from "../src/content/profile";
import { buildCanonicalUrl, getRouteSeo } from "../src/lib/seo";
import { claimById } from "../src/content/proof";
import {
  publicRoutes,
  retiredRedirectRoutes,
  getRetiredRouteDestination,
} from "../src/lib/routes";

const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3010";
function visibleText(markup: string) {
  return markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:#x27|#39|apos);/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ");
}
async function main() {
  const homeResponse = await fetch(base);
  assert.equal(homeResponse.status, 200);
  const home = await homeResponse.text();
  const stylesheets = [
    ...new Set(
      [
        ...home.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g),
      ].map((match) => match[1].replace(/&amp;/g, "&")),
    ),
  ];
  assert.ok(stylesheets.length, "Homepage references a stylesheet");
  const styles: string[] = [];
  for (const path of stylesheets) {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, `Stylesheet ${path}`);
    styles.push(await response.text());
  }
  const css = styles.join("\n");
  assert.match(css, /--pearl:\s*#f6f7f8\b/i, "Deployed pearl shell");
  assert.match(css, /--cobalt:\s*#2855d8\b/i, "Deployed cobalt accent");
  for (const selector of [
    ".home-page",
    ".editorial-route",
    ".contact-resume",
    ".contact-linkedin",
  ]) {
    assert.ok(css.includes(selector), `Missing design styles: ${selector}`);
  }
  const text = visibleText(home);
  for (const copy of [
    practice.eyebrow,
    practice.headline,
    practice.secondaryHeadline,
    practice.summary,
  ]) {
    assert.ok(text.includes(copy), `Missing approved hero copy: ${copy}`);
  }
  for (const item of selectedWork) {
    assert.ok(home.includes(`id="${item.id}"`));
    for (const copy of [
      item.title,
      item.summary,
      item.engineering,
      item.category,
      item.linkLabel,
    ])
      assert.ok(text.includes(copy), `Missing static highlight ${copy}`);
    assert.ok(home.includes(`href="${item.href}"`));
    for (const proof of item.proofIds.map(claimById))
      if (proof.publicLabelRequired)
        assert.ok(text.includes(proof.publicLabel!));
  }
  for (const metric of metrics)
    assert.ok(
      !text.includes(metric.value),
      `No historical metric on Home: ${metric.id}`,
    );
  for (const system of currentWork.reviewedSystems) {
    assert.ok(home.includes(`href="/case-studies#${system.id}"`));
    assert.ok(text.includes(system.summary));
    assert.ok(text.includes(system.publicLabel));
  }
  assert.equal((home.match(/class="system-link"/g) || []).length, 3);
  assert.ok(home.includes('class="button primary" href="/case-studies"'));
  assert.ok(text.includes("More shipped agent systems."));
  assert.ok(home.includes("project-feature"));
  assert.ok(text.includes("backend, frontend, ML and computer vision"));
  assert.equal((home.match(/<article\b/g) || []).length, 3);
  assert.doesNotMatch(
    text,
    /Historical AI product system|Agent experience, end to end|Shipped systems\.|Explore my public work/,
  );
  assert.ok(text.includes(currentWork.publicProjects[0].summary));
  assert.ok(home.includes('href="/case-studies"'));
  assert.ok(
    home.includes('class="home-page"'),
    "Homepage uses accepted design",
  );
  assert.ok(
    home.includes("/images/himadri-portrait.png"),
    "Original portrait is rendered",
  );
  const portrait = await fetch(`${base}/images/himadri-portrait.png`);
  assert.equal(portrait.status, 200);
  assert.deepEqual(
    Buffer.from(await portrait.arrayBuffer()),
    readFileSync("public/images/himadri-portrait.png"),
  );
  for (const route of publicRoutes) {
    const response = await fetch(`${base}${route.path}`);
    assert.equal(response.status, 200, route.path);
    const html = await response.text();
    assert.doesNotMatch(
      visibleText(html),
      /\u2014|&mdash;|&#8212;|&#x2014;/i,
      `${route.path}: no em dashes`,
    );
    const seo = getRouteSeo(route.path);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical, `${route.path}: static canonical`);
    assert.equal(
      new URL(canonical[1]).href,
      buildCanonicalUrl(seo.canonicalPath),
      `${route.path}: canonical destination`,
    );
    const description = html.match(
      /<meta name="description" content="([^"]+)"/,
    );
    assert.equal(
      description && visibleText(description[1]),
      seo.description,
      `${route.path}: static description`,
    );
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/);
    if (route.path === "/case-studies") {
      const rendered = visibleText(html);
      assert.ok(rendered.includes("AI products"));
      assert.ok(html.includes('class="work-index"'));
      assert.equal(
        (html.match(/class="work-record(?: work-record-featured)?"/g) || [])
          .length,
        9,
      );
      assert.doesNotMatch(
        html,
        /class="eyebrow"|method-grid|work-column|Detailed case study/,
      );
      for (const item of [
        ...currentWork.reviewedSystems,
        ...currentWork.methodCards,
      ])
        for (const copy of [
          item.title,
          item.summary,
          item.status,
          item.limitations,
          item.publicLabel,
        ])
          assert.ok(rendered.includes(copy), `Missing archive copy ${copy}`);
      for (const brief of practice.recentWorkCases) {
        assert.ok(html.includes(`id="${brief.id}"`));
        for (const copy of [
          brief.title,
          brief.summary,
          ...brief.work,
          brief.verification,
        ])
          assert.ok(rendered.includes(copy), `Missing contribution ${copy}`);
      }
      for (const project of currentWork.publicProjects) {
        assert.ok(html.includes(`href="${project.href}"`));
        for (const copy of [
          project.title,
          project.summary,
          project.status,
          project.limitations,
        ])
          assert.ok(rendered.includes(copy), `Missing public project ${copy}`);
      }
      for (const id of [
        "agent-tools",
        "ai-workflows",
        "earlier-work",
        "public-work",
      ])
        assert.ok(html.includes(`id="${id}"`));
      assert.doesNotMatch(
        rendered,
        /systems (?:currently )?in development|not deployed|integration remains gated/i,
      );
      for (const system of currentWork.reviewedSystems)
        assert.ok(rendered.includes(system.status));
      for (const method of currentWork.methodCards) {
        for (const copy of [
          method.impact,
          method.measurement,
          ...method.details,
        ])
          assert.ok(
            rendered.includes(copy),
            `Missing engineering detail ${copy}`,
          );
        const article = html
          .split(`id="${method.id}">`)[1]
          ?.split("</article>")[0];
        assert.ok(article, `Missing method ${method.id}`);
        assert.doesNotMatch(article, /work-result-label/);
        assert.doesNotMatch(article.replace(/<[^>]*>|&#[^;]+;/g, ""), /\d/);
      }
      for (const metric of currentWorkMetrics)
        for (const copy of [metric.label, metric.context])
          assert.ok(
            !rendered.includes(copy),
            `Unexpected numeric panel ${copy}`,
          );
    }
    assert.equal(
      (html.match(/<main\b/g) || []).length,
      1,
      `${route.path}: one main landmark`,
    );
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `${route.path}: one H1`,
    );
    assert.ok(
      html.includes('class="site-header"'),
      `${route.path}: shared header`,
    );
    assert.ok(html.includes('class="footer"'), `${route.path}: shared footer`);
    assert.ok(
      html.includes(`href="${profile.x}"`),
      `${route.path}: X link in shell`,
    );
  }
  for (const pathname of ["/", "/contact"]) {
    const html = await (await fetch(`${base}${pathname}`)).text();
    for (const kind of ["email", "github", "resume", "x", "linkedin"]) {
      assert.ok(
        html.includes(`contact-${kind}`),
        `${pathname}: ${kind} button`,
      );
    }
    for (const href of [
      `mailto:${profile.email}`,
      profile.github,
      profile.resumePath,
      profile.x,
      profile.linkedin,
    ]) {
      assert.ok(html.includes(`href="${href}"`), `${pathname}: ${href}`);
    }
  }
  for (const route of retiredRedirectRoutes) {
    const response = await fetch(`${base}${route.path}`, {
      redirect: "manual",
    });
    assert.equal(response.status, 308, `${route.path}: permanent redirect`);
    const location = response.headers.get("location");
    assert.ok(location, `${route.path}: redirect destination`);
    const destination = new URL(location, base);
    const expected = new URL(getRetiredRouteDestination(route.path), base);
    assert.equal(
      destination.pathname + destination.hash,
      expected.pathname + expected.hash,
    );
  }
  const missingStudy = await fetch(`${base}/case-studies/not-a-real-study`, {
    redirect: "manual",
  });
  assert.equal(missingStudy.status, 404, "Unknown studies remain missing");
  console.log(
    `Design HTTP contracts passed for ${publicRoutes.length} public routes, served design CSS, approved work copy, original portrait and five contact actions.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
