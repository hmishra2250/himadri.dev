import Link from "next/link";
import { selectedWork } from "@/content/selected-work";
import { currentWork } from "@/content/current-work";
import { claimById } from "@/content/proof";

function EvaluationOutline() {
  return (
    <figure className="evaluation-outline">
      <figcaption>Inside the evaluation</figcaption>
      <ol>
        <li>
          <strong>Encode the starting state</strong>
          <span>Installation, access and available tools</span>
        </li>
        <li>
          <strong>Compare matched journeys</strong>
          <span>Control and treatment, across clients</span>
        </li>
        <li>
          <strong>Inspect the outcome</strong>
          <span>Tool choice, task completion and failures</span>
        </li>
      </ol>
      <p>Simplified method illustration, not a production trace.</p>
    </figure>
  );
}

export function SelectedWork() {
  return (
    <section
      className="work-section selected-work"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="container work-stack">
        <div className="section-heading">
          <p className="section-label">Selected engineering</p>
          <h2 id="work-title">Agent systems I’ve built.</h2>
        </div>
        <div className="selected-projects">
          {selectedWork.map((work, index) => {
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
                className={`selected-project ${index === 0 ? "project-feature" : "project-row"}`}
                id={work.id}
                key={work.id}
              >
                <div className="project-copy">
                  <p className="project-status">
                    <span aria-hidden="true">0{index + 1} / </span>
                    {work.category}
                  </p>
                  <h3>{work.title}</h3>
                  <p className="project-summary">{work.summary}</p>
                  <p className="project-engineering">{work.engineering}</p>
                  <Link className="project-link" href={work.href}>
                    {work.linkLabel} <span aria-hidden="true">↗</span>
                  </Link>
                  {labels.map((label) => (
                    <p className="work-source" key={label}>
                      {label}
                    </p>
                  ))}
                </div>
                {index === 0 && <EvaluationOutline />}
              </article>
            );
          })}
        </div>
        <div className="more-systems" aria-labelledby="more-systems-title">
          <div className="more-systems-heading">
            <p className="section-label">Shipped working versions</p>
            <h3 id="more-systems-title">More shipped agent systems.</h3>
            <p>
              Explore the implementation and engineering decisions behind each
              system.
            </p>
          </div>
          <ul className="system-links">
            {currentWork.reviewedSystems.map((system) => (
              <li key={system.id}>
                <Link
                  className="system-link"
                  href={`/case-studies#${system.id}`}
                  aria-labelledby={`${system.id}-preview-title ${system.id}-preview-action`}
                >
                  <h4 id={`${system.id}-preview-title`}>{system.title}</h4>
                  <p>{system.summary}</p>
                  <span
                    className="system-link-action"
                    id={`${system.id}-preview-action`}
                  >
                    Explore the system <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="work-source">
            {currentWork.reviewedSystems[0].publicLabel}
          </p>
          <div className="work-archive-link">
            <div>
              <h4>The complete engineering portfolio</h4>
              <p>
                Full technical detail, scoped results and broader work across
                backend, frontend, ML and computer vision.
              </p>
            </div>
            <Link className="button primary" href="/case-studies">
              View all engineering work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WritingFeature() {
  const guide = currentWork.publicProjects.find(
    (project) => project.id === "agent-experience-guide",
  );
  if (!guide) throw new Error("Missing Agent Experience field guide");
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
