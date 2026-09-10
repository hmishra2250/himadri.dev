import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { practice } from "@/content/practice";

const aiProductSlug = "agentic-market-research-platform";

export function RecentWork() {
  const aiProductStudy = caseStudies.find(
    (study) => study.slug === aiProductSlug,
  );

  return (
    <section
      className="section-pad compact recent-work"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container work-stack">
        <div className="section-header compact-header work-intro">
          <h2 id="work-title">Recent work.</h2>
          <p className="section-description">
            AI and developer systems made easier to call, inspect, recover and
            hand over.
          </p>
        </div>

        <div className="recent-work-list" aria-label="Recent engineering work">
          {practice.recentWorkCases.map((brief) => (
            <article className="recent-work-row" id={brief.id} key={brief.id}>
              <div className="recent-work-title">
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

        {aiProductStudy ? (
          <Link
            className="ai-product-link"
            href={`/case-studies/${aiProductStudy.slug}`}
          >
            <span>Historical AI product system</span>
            <strong>{aiProductStudy.title}</strong>
            <p>{aiProductStudy.summary}</p>
            <em>Detailed case study</em>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
