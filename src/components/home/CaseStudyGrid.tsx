import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { practice } from "@/content/practice";
import { TrackedLink } from "@/components/ui/TrackedLink";

const aiProductSlug = "agentic-market-research-platform";

function HistoricalCaseRow({
  study,
  sourceSection,
}: {
  study: CaseStudy;
  sourceSection: string;
}) {
  const content = (
    <>
      <div className="case-memo-body">
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
      </div>
      <dl className="case-memo-facts" aria-label="Selected case study facts">
        <div>
          <dt>Scope</dt>
          <dd>{study.domains.slice(0, 3).join(" / ")}</dd>
        </div>
        <div>
          <dt>Result</dt>
          <dd>{study.metrics[0]}</dd>
        </div>
      </dl>
      <span className="case-memo-link">Read case study</span>
    </>
  );

  return study.routeEnabled ? (
    <TrackedLink
      href={`/case-studies/${study.slug}`}
      className="case-memo compact-case-row"
      eventName="case_study_opened"
      eventParams={{
        feature_id: study.slug,
        source_section: sourceSection,
      }}
    >
      {content}
    </TrackedLink>
  ) : (
    <article className="case-memo compact-case-row">{content}</article>
  );
}

export function CaseStudyGrid() {
  const aiProductStudy = caseStudies.find(
    (study) => study.slug === aiProductSlug,
  );

  if (!aiProductStudy) return null;

  return (
    <section
      className="section-pad selected-systems"
      aria-labelledby="case-grid-title"
    >
      <div className="container selected-work-shell">
        <div className="section-header compact-header">
          <h2 id="case-grid-title">Selected AI product work.</h2>
          <p className="section-description">
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
    <section
      className="section-pad selected-systems"
      aria-labelledby="all-case-studies-title"
    >
      <div className="container case-index-shell">
        <div className="section-header wide">
          <h1 id="all-case-studies-title">Work.</h1>
          <p className="section-description">
            Selected contributions and production systems.
          </p>
        </div>

        <div className="case-index-block" aria-labelledby="recent-briefs-title">
          <div className="section-header compact-header">
            <h2 id="recent-briefs-title">Recent engineering work.</h2>
          </div>
          <div className="recent-work-list case-index-recent-list">
            {practice.recentWorkCases.map((brief) => (
              <article className="recent-work-row" id={brief.id} key={brief.id}>
                <div>
                  <h3>{brief.title}</h3>
                  <p>{brief.summary}</p>
                </div>
                <div className="recent-work-detail">
                  <ul>
                    {brief.work.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>{brief.verification}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {aiProductStudy ? (
          <div className="case-index-block" aria-labelledby="ai-product-title">
            <div className="section-header compact-header">
              <h2 id="ai-product-title">AI product system.</h2>
            </div>
            <div className="selected-systems-list">
              <HistoricalCaseRow
                study={aiProductStudy}
                sourceSection="case_index_ai_product"
              />
            </div>
          </div>
        ) : null}

        <div
          className="case-index-block"
          id="earlier-work"
          aria-labelledby="earlier-work-title"
        >
          <div className="section-header compact-header">
            <h2 id="earlier-work-title">
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
      </div>
    </section>
  );
}
