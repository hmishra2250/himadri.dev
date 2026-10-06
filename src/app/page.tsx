import type { Metadata } from "next";
import Image from "next/image";
import { OneLiners } from "@/components/site/OneLiners";
import { RichText } from "@/components/site/RichText";
import { ArrowLink, Section } from "@/components/site/Section";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import {
  before,
  firecrawl,
  hero,
  links,
  now,
  pullRequestUrl,
} from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = buildPageMetadata("/");

export default function Home() {
  return (
    <>
      <RouteJsonLd path="/" />

      <section className="hm-wrap site-hero">
        <div className="hm-hero-id">
          <span className="hm-portrait site-hero-portrait">
            <Image
              src="/images/himadri-portrait.png"
              alt={hero.name}
              width={460}
              height={460}
              priority
            />
          </span>
          <div className="site-hero-who">
            <span className="site-hero-name">{hero.name}</span>
            <span className="hm-label">{hero.location}</span>
          </div>
        </div>
        <h1 className="hm-display hm-hero-statement">{hero.punchline}</h1>
        <div className="hm-hero-foot">
          <p className="hm-lead">{hero.facts}</p>
          <div className="hm-page-actions">
            <a className="hm-button hm-button--primary" href="#now">
              Recent work
              <span
                className="hm-button-icon hm-button-icon--down"
                aria-hidden="true"
              >
                ↓
              </span>
            </a>
            <a className="hm-button" href={links.github}>
              GitHub
              <span className="hm-button-icon" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="hm-arrow-link hm-arrow-link--ink" href={links.resume}>
              Resume
              <span className="hm-button-icon" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      <Section id="now" index="01" label="Now" title={now.title}>
        <div className="hm-split hm-split--even">
          <div className="site-col">
            <div>
              <h3 className="hm-h3">{now.mudita.name}</h3>
              <p className="site-meta">{now.mudita.meta}</p>
            </div>
            <ul className="hm-bullets">
              {now.mudita.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span className="hm-label hm-label--plain">{now.mudita.note}</span>
          </div>
          <div className="site-col">
            <div>
              <h3 className="hm-h3">{now.agentExperience.name}</h3>
              <p className="site-meta">{now.agentExperience.meta}</p>
            </div>
            <ul className="hm-bullets">
              {now.agentExperience.items.map((segments, index) => (
                <li key={index}>
                  <RichText segments={segments} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <h3 className="hm-label hm-label--ink site-subhead">{now.alsoLabel}</h3>
        <OneLiners items={now.also} />
      </Section>

      <Section
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
        <div className="site-stack">
          <div className="hm-metrics">
            {firecrawl.outcomes.map((outcome) => (
              <div className="hm-metric" key={outcome.label}>
                <span className="hm-metric-value">{outcome.value}</span>
                <span className="hm-metric-label">{outcome.label}</span>
                {outcome.prs?.length ? (
                  <span className="site-metric-prs">
                    {outcome.prs.map((pr) => (
                      <a
                        key={pr.number}
                        className="site-pr-ref"
                        href={pullRequestUrl(pr)}
                        title={pr.summary}
                      >
                        {pr.repo} #{pr.number}
                      </a>
                    ))}
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <div>
            <p className="hm-label hm-label--plain site-groups-intro">
              {firecrawl.pullRequestCount} pull requests merged across{" "}
              {firecrawl.repositoryCount} open-source repositories. A selection:
            </p>
            <div className="site-groups">
              {firecrawl.groups.map((group) => (
                <div className="site-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul className="site-prs">
                    {group.prs.map((pr) => (
                      <li key={`${pr.repo}-${pr.number}`}>
                        <span>{pr.summary}</span>
                        <a className="site-pr-ref" href={pullRequestUrl(pr)}>
                          {pr.repo} #{pr.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="hm-note site-note">
            <span className="hm-label hm-label--cobalt">Not public</span>
            {firecrawl.notPublic}
          </div>
        </div>
      </Section>

      <Section
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
        <ol className="hm-timeline">
          {before.timeline.map((entry) => (
            <li key={entry.name}>
              <span className="hm-timeline-year">{entry.years}</span>
              <span className="hm-timeline-event">
                <strong className="site-timeline-name">{entry.name}</strong>,{" "}
                {entry.line}
              </span>
            </li>
          ))}
        </ol>
        <h3 className="hm-label hm-label--ink site-subhead">
          {before.openSourceLabel}
        </h3>
        <OneLiners items={before.openSource} />
      </Section>
    </>
  );
}
