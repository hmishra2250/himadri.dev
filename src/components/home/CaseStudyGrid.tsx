import Link from "next/link";
import {
  SystemSketch,
  type SystemSketchVariant,
} from "@/components/home/SystemSketch";
import {
  EvaluationPractice,
  ReviewedSystems,
} from "@/components/home/CurrentWork";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { practice, type RecentWorkCase } from "@/content/practice";

const aiProductSlug = "agentic-market-research-platform";

const workSketches: Record<string, SystemSketchVariant> = {
  "interface-consistency-brief": "interface-consistency-brief",
  "reviewed-ai-workflows-brief": "reviewed-ai-workflows-brief",
  "browser-runtime-boundaries-brief": "browser-runtime-boundaries-brief",
};

function RecentWorkColumn({ brief }: { brief: RecentWorkCase }) {
  return (
    <article className="work-column" id={brief.id}>
      <SystemSketch variant={workSketches[brief.id]} />
      <h3>{brief.title}</h3>
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

function HistoricalCaseRow({
  study,
  sourceSection,
}: {
  study: CaseStudy;
  sourceSection: string;
}) {
  const content = (
    <>
      <span className="earlier-label">{study.company}</span>
      <span className="earlier-content">
        <strong>{study.title}</strong>
        <span className="earlier-summary">{study.summary}</span>
        <span className="earlier-cta">Detailed case study</span>
      </span>
    </>
  );

  return study.routeEnabled ? (
    <TrackedLink
      href={`/case-studies/${study.slug}`}
      className="earlier-row secondary-grid compact-case-row"
      eventName="case_study_opened"
      eventParams={{
        feature_id: study.slug,
        source_section: sourceSection,
      }}
    >
      {content}
    </TrackedLink>
  ) : (
    <article className="earlier-row secondary-grid compact-case-row">
      {content}
    </article>
  );
}

export function CaseStudyGrid() {
  const aiProductStudy = caseStudies.find(
    (study) => study.slug === aiProductSlug,
  );

  if (!aiProductStudy) return null;

  return (
    <section
      className="work-section selected-systems"
      aria-labelledby="case-grid-title"
    >
      <div className="container work-stack selected-work-shell">
        <div className="section-heading compact-heading">
          <h2 id="case-grid-title">Selected AI product work.</h2>
          <p>
            A deeper production workflow example with architecture, decisions,
            and results.
          </p>
        </div>
        <div className="selected-systems-list">
          <HistoricalCaseRow
            study={aiProductStudy}
            sourceSection="ai_product_case_link"
          />
        </div>
        <Link className="earlier-work-link" href="/case-studies#earlier-work">
          Earlier ML and computer vision work
        </Link>
      </div>
    </section>
  );
}

export function AllCaseStudies() {
  const aiProductStudy = caseStudies.find(
    (study) => study.slug === aiProductSlug,
  );
  const earlierStudies = caseStudies.filter(
    (study) => study.slug !== aiProductSlug,
  );

  return (
    <div className="editorial-route case-index-route route-shell">
      <section className="route-hero" aria-labelledby="all-case-studies-title">
        <div className="container secondary-grid route-hero-grid">
          <p className="eyebrow">Work</p>
          <div className="editorial-prose route-copy-stack">
            <h1 id="all-case-studies-title">Work.</h1>
            <p className="hero-subtitle">
              Selected contributions, shipped systems, and earlier production
              work.
            </p>
          </div>
        </div>
      </section>

      <section className="route-section" aria-labelledby="recent-briefs-title">
        <div className="container work-stack">
          <div className="section-heading compact-heading">
            <h2 className="modest-section-heading" id="recent-briefs-title">
              Recent engineering work.
            </h2>
            <p>
              AI and developer systems made easier to call, inspect, recover and
              hand over.
            </p>
          </div>
          <div className="work-grid case-index-recent-list">
            {practice.recentWorkCases.map((brief) => (
              <RecentWorkColumn brief={brief} key={brief.id} />
            ))}
          </div>
        </div>
      </section>

      <EvaluationPractice
        titleId="case-index-evaluation-title"
        className="route-section evaluation-practice"
      />

      <section className="route-section" aria-labelledby="work-systems-title">
        <div className="container work-stack">
          <ReviewedSystems titleId="work-systems-title" />
        </div>
      </section>

      {aiProductStudy ? (
        <section className="route-section" aria-labelledby="ai-product-title">
          <div className="container work-stack">
            <div className="section-heading compact-heading">
              <h2 className="modest-section-heading" id="ai-product-title">
                AI product system.
              </h2>
            </div>
            <div className="selected-systems-list">
              <HistoricalCaseRow
                study={aiProductStudy}
                sourceSection="case_index_ai_product"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="route-section"
        id="earlier-work"
        aria-labelledby="earlier-work-title"
      >
        <div className="container work-stack">
          <div className="section-heading compact-heading">
            <h2 className="modest-section-heading" id="earlier-work-title">
              Earlier ML and computer vision work.
            </h2>
          </div>
          <div className="all-case-list compact-case-list">
            {earlierStudies.map((study) => (
              <HistoricalCaseRow
                study={study}
                key={study.slug}
                sourceSection="case_index_earlier_work"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
