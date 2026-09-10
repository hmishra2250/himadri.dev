import Link from "next/link";
import { selectedWork } from "@/content/selected-work";
import { currentWork } from "@/content/current-work";
import { metrics } from "@/content/metrics";
import { claimById } from "@/content/proof";

export function SelectedWork() {
  return (
    <section
      className="work-section selected-work"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container work-stack">
        <div className="section-heading compact-heading">
          <h2 id="work-title">Selected work.</h2>
          <p>
            Agent-facing products, production AI and the infrastructure behind
            them.
          </p>
        </div>
        <div className="work-grid selected-work-grid">
          {selectedWork.map((work) => {
            const metric = metrics.find((entry) => entry.id === work.metricId);
            if (work.metricId && !metric)
              throw new Error(`Missing selected work metric: ${work.metricId}`);
            const labels = [
              ...new Set(
                work.proofIds
                  .map(claimById)
                  .filter((proof) => proof.publicLabelRequired)
                  .map((proof) => proof.publicLabel!),
              ),
            ];
            return (
              <article
                className="work-column selected-work-card"
                id={work.id}
                key={work.id}
              >
                <p className="section-label">{work.category}</p>
                <h3>{work.title}</h3>
                <p className="work-summary">{work.summary}</p>
                <div className="selected-work-evidence">
                  {metric ? (
                    <>
                      <p className="selected-result">{metric.value}</p>
                      <p className="selected-result-label">{metric.label}</p>
                      <p className="work-source">{metric.context}</p>
                    </>
                  ) : (
                    <>
                      <p className="selected-result">Shipped</p>
                      <p className="selected-result-label">
                        MCP authentication and onboarding
                      </p>
                    </>
                  )}
                  {labels.map((label) => (
                    <p className="work-source" key={label}>
                      {label}
                    </p>
                  ))}
                </div>
                <Link className="selected-work-link" href={work.href}>
                  {work.linkLabel} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            );
          })}
        </div>
        <div className="work-archive-link">
          <Link className="button secondary" href="/case-studies">
            View all work <span aria-hidden="true">→</span>
          </Link>
          <p>
            Technical breakdowns, evaluation results, shipped systems and public
            projects.
          </p>
        </div>
      </div>
    </section>
  );
}

export function WritingFeature() {
  const guide = currentWork.publicProjects.find(
    (project) => project.id === "agent-experience-guide",
  )!;
  return (
    <section className="writing-feature" aria-labelledby="writing-title">
      <div className="container secondary-grid writing-row">
        <h2 className="modest-section-heading" id="writing-title">
          Writing
        </h2>
        <div className="writing-copy">
          <h3>
            <a href={guide.href}>{guide.title}</a>
          </h3>
          <p>{guide.summary}</p>
          <p className="work-source">{guide.limitations}</p>
          <Link href="/case-studies#public-work">
            More writing and open-source work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
