import {
  AgentToolsAndEvaluation,
  PublicWork,
  ReviewedSystems,
} from "@/components/home/CurrentWork";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { practice, type RecentWorkCase } from "@/content/practice";

function SupportingContribution({ brief }: { brief: RecentWorkCase }) {
  return (
    <article className="supporting-contribution" id={brief.id}>
      <h4>{brief.title}</h4>
      <p className="work-summary">{brief.summary}</p>
      <ul>
        {brief.work.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="verification">{brief.verification}</p>
    </article>
  );
}

function HistoricalCaseRow({ study }: { study: CaseStudy }) {
  const content = (
    <>
      <span className="earlier-label">
        {study.company}
        <span>{study.period}</span>
      </span>
      <span className="earlier-content">
        <span className="earlier-title-block">
          <strong>{study.title}</strong>
          <span>{study.subtitle}</span>
        </span>
        <span className="earlier-summary">{study.summary}</span>
        <span className="earlier-cta">Detailed case study</span>
      </span>
    </>
  );

  return study.routeEnabled ? (
    <a
      href={`/case-studies/${study.slug}`}
      className="earlier-row secondary-grid compact-case-row"
    >
      {content}
    </a>
  ) : (
    <article className="earlier-row secondary-grid compact-case-row">
      {content}
    </article>
  );
}

export function AllCaseStudies() {
  return (
    <div className="editorial-route case-index-route route-shell">
      <section className="route-hero" aria-labelledby="all-case-studies-title">
        <div className="container secondary-grid route-hero-grid">
          <p className="eyebrow">Work</p>
          <div className="editorial-prose route-copy-stack">
            <h1 id="all-case-studies-title">Work</h1>
            <p className="hero-subtitle">
              From agent-facing tools and evaluation to production AI, ML
              infrastructure and open-source projects.
            </p>
            <nav className="work-contents" aria-label="Work chapters">
              <a href="#agent-tools">Agent tools and evaluation</a>
              <a href="#ai-workflows">AI workflows and safeguards</a>
              <a href="#public-work">Writing and open source</a>
              <a href="#earlier-work">Broader engineering work</a>
            </nav>
          </div>
        </div>
      </section>

      <section
        className="route-section"
        id="agent-tools"
        aria-labelledby="agent-tools-title"
      >
        <div className="container work-stack">
          <AgentToolsAndEvaluation titleId="agent-tools-title" />
          <div
            className="supporting-contributions"
            aria-labelledby="supporting-contributions-title"
          >
            <div className="section-heading compact-heading">
              <h3 id="supporting-contributions-title">
                Interface and runtime work.
              </h3>
              <p>
                Additional contributions across developer interfaces, SDK/API
                touchpoints, backend runtime recovery, web review surfaces and
                frontend-facing workflow clarity.
              </p>
            </div>
            <div className="compact-contribution-list">
              {practice.recentWorkCases.map((brief) => (
                <SupportingContribution brief={brief} key={brief.id} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="route-section"
        id="ai-workflows"
        aria-labelledby="ai-workflows-title"
      >
        <div className="container work-stack">
          <ReviewedSystems titleId="ai-workflows-title" />
        </div>
      </section>

      <section
        className="route-section"
        id="public-work"
        aria-labelledby="public-work-title"
      >
        <div className="container work-stack">
          <PublicWork titleId="public-work-title" />
        </div>
      </section>

      <section
        className="route-section"
        id="earlier-work"
        aria-labelledby="earlier-work-title"
      >
        <div className="container work-stack">
          <div className="section-heading compact-heading">
            <h2 className="modest-section-heading" id="earlier-work-title">
              Broader engineering work.
            </h2>
            <p>
              Earlier production case studies across AI reporting, ML
              infrastructure, computer vision products and AR vision systems,
              kept as supporting evidence behind the agent experience focus.
            </p>
          </div>
          <div className="all-case-list compact-case-list">
            {caseStudies.map((study) => (
              <HistoricalCaseRow study={study} key={study.slug} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
