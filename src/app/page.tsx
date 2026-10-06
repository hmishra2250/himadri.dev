import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLink,
  Button,
  InlineLinks,
  Launches,
  Ledger,
  MetricTiles,
  OneLiners,
  Panel,
  Subhead,
  Tile,
  Years,
} from "@/components/ds";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import {
  before,
  firecrawl,
  hero,
  links,
  now,
  pullRequestUrl,
  shipped,
} from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = buildPageMetadata("/");

export default function Home() {
  return (
    <>
      <RouteJsonLd path="/" />

      <section className="hm-wrap hm-hero">
        <div className="hm-hero-split">
          <div className="hm-hero-main">
            <div className="hm-hero-id">
              <span className="hm-portrait hm-hero-portrait">
                <Image
                  src="/images/himadri-portrait.png"
                  alt={hero.name}
                  width={460}
                  height={460}
                  priority
                />
              </span>
              <div className="hm-hero-who">
                <span className="hm-hero-name">{hero.name}</span>
                <span className="hm-label">{hero.location}</span>
              </div>
            </div>
            <h1 className="hm-display hm-hero-statement">{hero.punchline}</h1>
            <p className="hm-lead hm-hero-facts">{hero.facts}</p>
            <div className="hm-page-actions">
              <Button href={links.resume}>Resume</Button>
            </div>
          </div>

          <Ledger
            label={shipped.label}
            items={shipped.items}
            cta={{ label: "Recent work", href: "#now" }}
          />
        </div>
      </section>

      <Panel id="now" index="01" label="Now" title={now.title}>
        <div className="hm-split hm-split--even">
          <Tile title={now.mudita.name} meta={now.mudita.meta}>
            <ul className="hm-bullets">
              {now.mudita.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Tile>
          <Tile
            title={now.agentExperience.name}
            meta={now.agentExperience.meta}
          >
            <ul className="hm-bullets">
              {now.agentExperience.items.map((segments, index) => (
                <li key={index}>
                  <InlineLinks segments={segments} />
                </li>
              ))}
            </ul>
          </Tile>
        </div>
        <Subhead>{now.alsoLabel}</Subhead>
        <OneLiners items={now.also} />
      </Panel>

      <Panel
        id="firecrawl"
        index="02"
        label={firecrawl.label}
        title={firecrawl.title}
        intro={firecrawl.intro}
        aside={
          <ArrowLink href={links.firecrawlPullRequests}>
            Open-source pull requests
          </ArrowLink>
        }
      >
        <div className="hm-stack">
          <MetricTiles
            items={firecrawl.outcomes.map((outcome) => ({
              value: outcome.value,
              label: outcome.label,
              refs: outcome.prs?.map((pr) => ({
                label: `${pr.repo} #${pr.number}`,
                href: pullRequestUrl(pr),
                title: pr.summary,
              })),
            }))}
          />
          <div>
            <Subhead>{firecrawl.leadsLabel}</Subhead>
            <OneLiners items={firecrawl.leads} />
          </div>
          <div>
            <Subhead>{firecrawl.fixesLabel}</Subhead>
            <Launches
              items={firecrawl.fixes.map((fix) => ({
                title: fix.title,
                line: fix.line,
                refs: fix.prs.map((pr) => ({
                  label: `${pr.repo} #${pr.number}`,
                  href: pullRequestUrl(pr),
                  title: pr.summary,
                })),
              }))}
            />
          </div>
        </div>
      </Panel>

      <Panel
        id="before"
        index="03"
        label={before.label}
        title={before.title}
        aside={
          <ArrowLink href={links.resume} arrow="→">
            Full resume
          </ArrowLink>
        }
      >
        <Years items={before.timeline} />
        <Subhead>{before.openSourceLabel}</Subhead>
        <OneLiners items={before.openSource} />
      </Panel>
    </>
  );
}
