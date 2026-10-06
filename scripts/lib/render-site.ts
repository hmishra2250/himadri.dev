import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "../../src/app/page";
import ResumePage from "../../src/app/resume/page";
import { SiteFooter } from "../../src/components/site/SiteFooter";
import { SiteHeader } from "../../src/components/site/SiteHeader";

export type RenderedPage = {
  path: string;
  html: string;
  /** Visible text, tags stripped and entities decoded */
  text: string;
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
  const visible = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return {
    path,
    html,
    text: decode(visible).replace(/\s+/g, " ").trim(),
    ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
    hrefs: [...html.matchAll(/\shref="([^"]+)"/g)].map((m) => decode(m[1])),
  };
}

export function renderSite(): RenderedPage[] {
  return [render("/", Home), render("/resume", ResumePage)];
}
