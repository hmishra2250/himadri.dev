import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLink,
  Button,
  Evidence,
  Label,
  Section,
  SystemCard,
  SystemGrid,
  Timeline,
  WorkRows,
} from "@/components/ds";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import {
  BeforeAfterFigure,
  CodingAgentFigure,
  HarnessLoopFigure,
} from "@/components/site/Diagrams";
import {
  hero,
  latest,
  links,
  projects,
  pullRequestUrl,
  work,
  type OneLiner,
  type PullRequest,
  type Segment,
} from "@/content/site";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "error";

export const metadata: Metadata = buildPageMetadata("/");

const evidence = (prs: readonly PullRequest[]) =>
  prs.map((pr) => ({
    label: pr.summary,
    reference: `${pr.repo} #${pr.number}`,
    href: pullRequestUrl(pr),
  }));

const rows = (items: readonly OneLiner[]) =>
  items.map((item) => ({
    title: item.name,
    summary: item.line,
    meta: item.meta,
    href: item.href,
  }));

/** Running text with inline links */
function Text({ segments }: { segments: readonly Segment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <a key={index} className="hm-link" href={segment.href}>
            {segment.text}
          </a>
        ),
      )}
    </>
  );
}

function Points({ points }: { points: readonly string[] }) {
  return (
    <ul className="hm-bullets">
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { featured, mcp, harness } = work;

  return (
    <>
      <RouteJsonLd path="/" />

      <section className="hm-wrap hm-hero">
        <div className="hm-hero-id">
          <div className="hm-hero-who">
            <span className="hm-hero-name">{hero.name}</span>
            <Label>
              {hero.role}, 8+ years · {hero.location}
            </Label>
          </div>
        </div>
        <h1 className="hm-h1 hm-hero-statement">{hero.punchline}</h1>
        <div className="hm-hero-copy">
          <span className="hm-portrait hm-hero-photo">
            <Image
              src="/images/himadri-portrait.png"
              alt={hero.name}
              width={460}
              height={460}
              sizes="(max-width: 860px) 128px, 264px"
              priority
            />
          </span>
          <p className="hm-lead">
            <Text segments={hero.lead} />
          </p>
          <p className="hm-lead hm-lead--soft">
            <Text segments={hero.latest} />
          </p>
          <div className="hm-page-actions hm-hero-actions">
            <Button href="#work" variant="primary" arrow="↓">
              {hero.action}
            </Button>
          </div>
        </div>
        <div className="hm-hero-index">
          <SystemGrid>
            {hero.index.map((item) => (
              <SystemCard
                key={item.href}
                href={item.href}
                status={item.label}
                title={item.title}
              >
                <p>{item.line}</p>
              </SystemCard>
            ))}
          </SystemGrid>
        </div>
      </section>

      <Section
        id="work"
        index="01"
        label={work.label}
        title={work.title}
        aside={
          <ArrowLink href={links.firecrawlPullRequests}>
            Open-source pull requests
          </ArrowLink>
        }
      >
        <SystemGrid columns={2}>
          <SystemCard
            id={featured.id}
            status={featured.status}
            title={featured.title}
            wide
          >
            <div className="hm-system-split">
              <div className="hm-stack">
                <p>{featured.story}</p>
                <Points points={featured.points} />
              </div>
              <div className="hm-figure hm-figure--diagram">
                <Label tone="ink" className="hm-figure-label">
                  {featured.diagram.label}
                </Label>
                <CodingAgentFigure diagram={featured.diagram} />
              </div>
            </div>
          </SystemCard>
          <SystemCard id={mcp.id} status={mcp.status} title={mcp.title}>
            <div className="hm-figure hm-figure--diagram">
              <Label tone="ink" className="hm-figure-label">
                {mcp.diagram.label}
              </Label>
              <BeforeAfterFigure diagram={mcp.diagram} />
            </div>
            <p>{mcp.story}</p>
            {mcp.points.map((point) => (
              <p key={point}>{point}</p>
            ))}
            <div className="hm-evidence-block">
              <Evidence items={evidence(mcp.prs)} />
            </div>
          </SystemCard>
          <SystemCard
            id={harness.id}
            status={harness.status}
            title={harness.title}
          >
            <div className="hm-figure hm-figure--diagram">
              <Label tone="ink" className="hm-figure-label">
                {harness.diagram.label}
              </Label>
              <HarnessLoopFigure diagram={harness.diagram} />
            </div>
            <p>{harness.story}</p>
            <Points points={harness.points} />
            <div className="hm-evidence-block">
              <Evidence items={evidence(harness.prs)} />
            </div>
          </SystemCard>
        </SystemGrid>

        <div className="hm-sublist">
          <Label tone="ink">{work.alsoLabel}</Label>
          <Timeline
            items={work.also.map((row) => ({
              years: row.meta,
              event: (
                <>
                  <strong>{row.title}</strong>. {row.text}
                  {row.links.map((link) => (
                    <span key={link.href}>
                      {" "}
                      <a href={link.href}>
                        {link.label} <span aria-hidden="true">↗</span>
                      </a>
                    </span>
                  ))}
                </>
              ),
            }))}
          />
        </div>

        <div className="hm-sublist">
          <div className="hm-sublist-bar">
            <Label tone="ink">{work.beforeLabel}</Label>
            <ArrowLink href={links.resume} arrow="→">
              Full resume
            </ArrowLink>
          </div>
          <Timeline
            items={work.before.map((entry) => ({
              years: entry.years,
              event: (
                <>
                  <strong>{entry.name}</strong>, {entry.line}
                </>
              ),
            }))}
          />
        </div>
      </Section>

      <Section
        id="latest"
        index="02"
        label={latest.label}
        title={latest.title}
        aside={
          <ArrowLink href={links.agentExperienceGuides}>All guides</ArrowLink>
        }
      >
        <div className="hm-split hm-split--5-7">
          <div className="hm-stack">
            <p className="hm-prose">{latest.intro}</p>
            <ul className="hm-bullets">
              {latest.more.map((link) => (
                <li key={link.href}>
                  <a className="hm-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Timeline
            items={latest.items.map((item) => ({
              years: item.date,
              event: (
                <>
                  <a href={item.href}>{item.title}</a>{" "}
                  <span className="hm-label">{item.kind}</span>
                </>
              ),
            }))}
          />
        </div>
      </Section>

      <Section
        id="projects"
        index="03"
        label={projects.label}
        title={projects.title}
      >
        <WorkRows items={rows(projects.side)} />
        <p className="hm-prose hm-more">
          {projects.earlierLabel}:{" "}
          {projects.earlier.map((item, index) => (
            <span key={item.name}>
              {index ? ", " : ""}
              <a className="hm-link" href={item.href}>
                {item.name}
              </a>
              {item.line === "my bachelor's project"
                ? ", my bachelor's project"
                : ""}{" "}
              ({item.meta})
            </span>
          ))}
          .
        </p>
      </Section>
    </>
  );
}
