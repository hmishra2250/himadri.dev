import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLink,
  Button,
  InlineLinks,
  Ledger,
  MetricTiles,
  NoteTile,
  OneLiners,
  Panel,
  RefGroups,
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
  type PullRequest,
} from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = buildPageMetadata("/");

const prRef = (pr: PullRequest) => ({
  text: pr.summary,
  label: `${pr.repo} #${pr.number}`,
  href: pullRequestUrl(pr),
});

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
            note={shipped.note}
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
            <span className="hm-label hm-label--plain">{now.mudita.note}</span>
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
            All {firecrawl.pullRequestCount} merged PRs
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
          <RefGroups
            intro={`${firecrawl.pullRequestCount} pull requests merged across ${firecrawl.repositoryCount} open-source repositories. A selection:`}
            groups={firecrawl.groups.map((group) => ({
              title: group.title,
              refs: group.prs.map(prRef),
            }))}
          />
          <NoteTile label="Not public">{firecrawl.notPublic}</NoteTile>
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
