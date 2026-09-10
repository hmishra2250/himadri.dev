import { caseStudies } from "@/content/case-studies";
import { practice } from "@/content/practice";
import {
  SystemSketch,
  type SystemSketchVariant,
} from "@/components/home/SystemSketch";
import { TrackedLink } from "@/components/ui/TrackedLink";

const aiProductSlug = "agentic-market-research-platform";

const workSketches: Record<string, SystemSketchVariant> = {
  "interface-consistency-brief": "interface-consistency-brief",
  "reviewed-ai-workflows-brief": "reviewed-ai-workflows-brief",
  "browser-runtime-boundaries-brief": "browser-runtime-boundaries-brief",
};

export function RecentWork() {
  const aiProductStudy = caseStudies.find(
    (study) => study.slug === aiProductSlug,
  );

  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="container work-stack">
        <div className="section-heading compact-heading">
          <h2 id="work-title">Recent work.</h2>
          <p>
            AI and developer systems made easier to call, inspect, recover and
            hand over.
          </p>
        </div>

        <div className="work-grid" aria-label="Recent engineering work">
          {practice.recentWorkCases.map((brief) => (
            <article className="work-column" id={brief.id} key={brief.id}>
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
          ))}
        </div>

        {aiProductStudy ? (
          <TrackedLink
            className="earlier-row secondary-grid"
            href={`/case-studies/${aiProductStudy.slug}`}
            eventName="case_study_opened"
            eventParams={{ feature_id: aiProductStudy.slug, route: "/" }}
          >
            <span className="earlier-label">Historical AI product system</span>
            <span className="earlier-content">
              <strong>{aiProductStudy.title}</strong>
              <span className="earlier-summary">{aiProductStudy.summary}</span>
              <em>Detailed case study</em>
            </span>
          </TrackedLink>
        ) : null}
      </div>
    </section>
  );
}
