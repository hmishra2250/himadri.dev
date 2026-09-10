import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { practice } from "../src/content/practice";
import { profile } from "../src/content/profile";
import { publicRoutes } from "../src/lib/routes";

const base = process.env.CHECK_BASE_URL || "http://127.0.0.1:3010";
function visibleText(markup: string) {
  return markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:#x27|#39|apos);/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ");
}
async function main() {
  const homeResponse = await fetch(base);
  assert.equal(homeResponse.status, 200);
  const home = await homeResponse.text();
  const text = visibleText(home);
  for (const copy of [practice.eyebrow, practice.headline, practice.summary]) {
    assert.ok(text.includes(copy), `Missing approved hero copy: ${copy}`);
  }
  for (const item of practice.recentWorkCases) {
    assert.ok(
      home.includes(`id="${item.id}"`),
      `Missing work anchor ${item.id}`,
    );
    for (const copy of [
      item.title,
      item.summary,
      ...item.work,
      item.verification,
    ]) {
      assert.ok(text.includes(copy), `Missing approved work copy: ${copy}`);
    }
  }
  assert.equal((home.match(/<figcaption\b/g) || []).length, 3);
  assert.equal((text.match(/Illustrative system sketch/g) || []).length, 3);
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
  console.log(
    `Design HTTP contracts passed for ${publicRoutes.length} public routes, approved work copy, original portrait and five contact actions.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
