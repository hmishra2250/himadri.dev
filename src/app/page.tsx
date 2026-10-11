import type { Metadata } from "next";
import {
  ArrowLink,
  Button,
  Evidence,
  Label,
  Pipeline,
  Portrait,
  Section,
  ShipStrip,
  Status,
  SystemCard,
  SystemGrid,
  Timeline,
  WorkRows,
} from "@/components/ds";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import {
  before,
  firecrawl,
  hero,
  inTheOpen,
  links,
  now,
  pullRequestUrl,
  shipped,
  type OneLiner,
  type PullRequest,
  type WorkCard,
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

function Points({ card }: { card: WorkCard }) {
  return (
    <ul className="hm-bullets">
      {card.points.map((point) => (
        <li key={point.text}>
          {point.label ? <strong>{point.label}: </strong> : null}
          {point.text}
        </li>
      ))}
    </ul>
  );
}

function PullRequests({ prs }: { prs: readonly PullRequest[] }) {
  return (
    <div className="hm-evidence-block">
      <Evidence items={evidence(prs)} />
    </div>
  );
}

export default function Home() {
  const [lead, ...cards] = firecrawl.cards;

  return (
    <>
      <RouteJsonLd path="/" />

      <section className="hm-wrap hm-hero">
        <div className="hm-hero-id">
          <Portrait alt={hero.name} />
          <div className="hm-hero-who">
            <span className="hm-hero-name">{hero.name}</span>
            <Label>{hero.location}</Label>
          </div>
        </div>
        <h1 className="hm-display hm-hero-statement">{hero.punchline}</h1>
        <div className="hm-hero-foot">
          <p className="hm-lead">{hero.facts}</p>
          <div className="hm-page-actions">
            <Button href="#now" variant="primary" arrow="↓">
              Recent work
            </Button>
            <Button href={links.resume}>Resume</Button>
          </div>
        </div>
        <ShipStrip
          label={shipped.label}
          period={shipped.period}
          items={shipped.items}
        />
      </section>

      <Section id="now" index="01" label={now.label} title={now.title}>
        <article className="hm-split">
          <div className="hm-stack">
            <Status>{now.mudita.meta}</Status>
            <h3 className="hm-h3">{now.mudita.name}</h3>
            <ul className="hm-bullets">
              {now.mudita.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="hm-figure">
            <Label tone="ink" className="hm-figure-label">
              {now.mudita.figureLabel}
            </Label>
            <Pipeline vertical steps={now.mudita.steps} />
          </div>
        </article>
      </Section>

      <Section
        id="open"
        index="02"
        label={inTheOpen.label}
        title={inTheOpen.title}
        intro={inTheOpen.intro}
        aside={
          <ArrowLink href={links.agentExperience}>
            agentexperience.tech
          </ArrowLink>
        }
      >
        <WorkRows items={rows(inTheOpen.items)} />
        <div className="hm-sublist">
          <Label tone="ink">{inTheOpen.alsoLabel}</Label>
          <WorkRows items={rows(inTheOpen.also)} />
        </div>
      </Section>

      <Section
        id="firecrawl"
        index="03"
        label={firecrawl.label}
        title={firecrawl.title}
        intro={firecrawl.intro}
        aside={
          <ArrowLink href={links.firecrawlPullRequests}>
            Open-source pull requests
          </ArrowLink>
        }
      >
        <article className="hm-split">
          <div className="hm-stack">
            <Status>{lead.status}</Status>
            <h3 className="hm-h3">{lead.title}</h3>
            {lead.story ? <p className="hm-prose">{lead.story}</p> : null}
            <Points card={lead} />
            <PullRequests prs={lead.prs} />
          </div>
          {lead.steps ? (
            <div className="hm-figure">
              <Label tone="ink" className="hm-figure-label">
                {firecrawl.figureLabel}
              </Label>
              <Pipeline vertical steps={lead.steps} />
            </div>
          ) : null}
        </article>
        <div className="hm-follow">
          <SystemGrid columns={2}>
            {cards.map((card, index) =>
              index === 0 ? (
                <SystemCard
                  key={card.title}
                  status={card.status}
                  title={card.title}
                  wide
                >
                  <div className="hm-system-split">
                    <div className="hm-stack">
                      {card.story ? <p>{card.story}</p> : null}
                      <Points card={card} />
                    </div>
                    <Evidence items={evidence(card.prs)} />
                  </div>
                </SystemCard>
              ) : (
                <SystemCard
                  key={card.title}
                  status={card.status}
                  title={card.title}
                >
                  {card.story ? <p>{card.story}</p> : null}
                  <Points card={card} />
                  <PullRequests prs={card.prs} />
                </SystemCard>
              ),
            )}
          </SystemGrid>
        </div>
      </Section>

      <Section
        id="before"
        index="04"
        label={before.label}
        title={before.title}
        aside={
          <ArrowLink href={links.resume} arrow="→">
            Full resume
          </ArrowLink>
        }
      >
        <div className="hm-split hm-split--4-8">
          <div className="hm-stack">
            <p className="hm-prose">{before.intro}</p>
          </div>
          <Timeline
            items={before.timeline.map((entry) => ({
              years: entry.years,
              event: (
                <>
                  <strong>{entry.name}</strong>, {entry.line}
                </>
              ),
            }))}
          />
        </div>
        <div className="hm-sublist">
          <Label tone="ink">{before.openSourceLabel}</Label>
          <WorkRows items={rows(before.openSource)} />
        </div>
      </Section>
    </>
  );
}
