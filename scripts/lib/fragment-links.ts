import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AllCaseStudies } from "../../src/components/home/CaseStudyGrid";
import { notes } from "../../src/content/notes";
import { practice } from "../../src/content/practice";
import { publicRoutes } from "../../src/lib/routes";

const sourceExtensions = [".tsx", ".ts", ".jsx", ".js"];
const fragmentCache = new Map<string, Set<string>>();

export type FragmentLinkCheck = {
  href: string;
  owner: string;
  allowResumeAsset?: boolean;
};

function routeToPageFile(routePath: string) {
  if (routePath === "/") return path.join(process.cwd(), "src/app/page.tsx");
  const exact = path.join(
    process.cwd(),
    "src/app",
    routePath.slice(1),
    "page.tsx",
  );
  if (existsSync(exact)) return exact;
  if (routePath.startsWith("/case-studies/")) {
    return path.join(process.cwd(), "src/app/case-studies/[slug]/page.tsx");
  }
  return exact;
}

function resolveImport(fromFile: string, specifier: string) {
  if (specifier.startsWith("@/")) {
    return resolveSourcePath(
      path.join(process.cwd(), "src", specifier.slice(2)),
    );
  }
  if (specifier.startsWith(".")) {
    return resolveSourcePath(path.resolve(path.dirname(fromFile), specifier));
  }
  return null;
}

function resolveSourcePath(basePath: string) {
  if (sourceExtensions.some((extension) => basePath.endsWith(extension))) {
    return existsSync(basePath) ? basePath : null;
  }
  for (const extension of sourceExtensions) {
    const candidate = `${basePath}${extension}`;
    if (existsSync(candidate)) return candidate;
  }
  for (const extension of sourceExtensions) {
    const candidate = path.join(basePath, `index${extension}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function collectSourceFiles(entryFile: string) {
  const seen = new Set<string>();
  const queue = [entryFile, path.join(process.cwd(), "src/app/layout.tsx")];
  for (const file of queue) {
    if (seen.has(file) || !existsSync(file)) continue;
    seen.add(file);
    const source = readFileSync(file, "utf8");
    const importPattern =
      /from\s+["']([^"']+)["']|import\s*\(\s*["']([^"']+)["']\s*\)/g;
    let match: RegExpExecArray | null;
    while ((match = importPattern.exec(source))) {
      const specifier = match[1] ?? match[2];
      const resolved = resolveImport(file, specifier);
      if (resolved && !seen.has(resolved)) queue.push(resolved);
    }
  }
  return [...seen];
}

function extractLiteralIds(source: string) {
  const ids = new Set<string>();
  const patterns = [
    /\bid\s*=\s*["']([^"']+)["']/g,
    /\bid\s*=\s*{\s*["'`]([^"'`$]+)["'`]\s*}/g,
  ];
  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(source))) ids.add(match[1]);
  }
  return ids;
}

export function collectRouteFragments(routePath: string) {
  const cached = fragmentCache.get(routePath);
  if (cached) return cached;

  const fragments = new Set<string>();
  const entryFile = routeToPageFile(routePath);
  for (const file of collectSourceFiles(entryFile)) {
    const source = readFileSync(file, "utf8");
    for (const id of extractLiteralIds(source)) fragments.add(id);
    if (
      (routePath === "/case-studies" || routePath === "/") &&
      source.includes("practice.recentWorkCases") &&
      /id\s*=\s*{\s*brief\.id\s*}/.test(source)
    ) {
      for (const brief of practice.recentWorkCases) fragments.add(brief.id);
    }
  }

  // Work renders data-driven IDs. Inspect the actual markup rather than
  // requiring duplicated literal IDs in production components.
  if (routePath === "/case-studies") {
    for (const id of extractLiteralIds(
      renderToStaticMarkup(createElement(AllCaseStudies)),
    ))
      fragments.add(id);
  }

  if (routePath === "/notes") {
    for (const note of notes) fragments.add(note.id);
  }

  fragmentCache.set(routePath, fragments);
  return fragments;
}

export function validateInternalHrefFragment({
  href,
  owner,
  allowResumeAsset = true,
}: FragmentLinkCheck) {
  const errors: string[] = [];
  if (!href.startsWith("/")) return errors;

  const [routePath, fragment] = href.split("#", 2);
  if (
    allowResumeAsset &&
    routePath.startsWith("/resume/") &&
    routePath.endsWith(".pdf")
  ) {
    return errors;
  }

  if (!publicRoutes.some((route) => route.path === routePath)) {
    errors.push(`${owner} links to non-public route: ${href}`);
    return errors;
  }

  if (!fragment) return errors;
  const fragments = collectRouteFragments(routePath);
  if (!fragments.has(fragment)) {
    errors.push(`${owner} links to missing fragment: ${href}`);
  }
  return errors;
}
