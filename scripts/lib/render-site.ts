import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../../src/app/page";
import ResumePage from "../../src/app/resume/page";
import { SiteFooter } from "../../src/components/site/SiteFooter";
import { SiteHeader } from "../../src/components/site/SiteHeader";

export type RenderedPage = {
  path: string;
  html: string;
  /** All text, tags stripped and entities decoded */
  text: string;
  /** Text a reader sees before opening any disclosure */
  glance: string;
  ids: Set<string>;
  hrefs: string[];
};

const decode = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

function render(path: string, page: () => React.ReactNode): RenderedPage {
  const html = renderToStaticMarkup(
    createElement(
      Fragment,
      null,
      createElement(SiteHeader),
      createElement("main", { id: "main-content" }, page()),
      createElement(SiteFooter),
    ),
  );
  const toText = (markup: string) =>
    decode(
      markup
        .replace(/<script[\s\S]*?<\/script>/g, " ")
        .replace(/<[^>]+>/g, " "),
    )
      .replace(/\s+/g, " ")
      .trim();
  // Disclosures are not nested, so a lazy match keeps only each summary.
  const collapsed = html.replace(
    /<details[^>]*>\s*(<summary>[\s\S]*?<\/summary>)[\s\S]*?<\/details>/g,
    "$1",
  );
  return {
    path,
    html,
    text: toText(html),
    glance: toText(collapsed),
    ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
    hrefs: [...html.matchAll(/\shref="([^"]+)"/g)].map((m) => decode(m[1])),
  };
}

export function renderSite(): RenderedPage[] {
  return [render("/", Home), render("/resume", ResumePage)];
}
