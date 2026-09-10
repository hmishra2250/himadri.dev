import { currentWork } from "@/content/current-work";

import { currentWorkMetrics } from "@/content/metrics";

type SectionTitleProps = {
  titleId?: string;
};

type SectionShellProps = SectionTitleProps & {
  className?: string;
};

export function ReviewedSystems({
  titleId = "systems-title",
}: SectionTitleProps) {
  return (
    <div className="work-stack current-work-block" aria-labelledby={titleId}>
      <div className="section-heading compact-heading">
        <h2 id={titleId}>Systems in development.</h2>
        <p>
          Implementation work, with the boundary between built components and
          production operation made explicit.
        </p>
      </div>
      <div
        className="work-grid current-work-grid"
        aria-label="Systems currently in development"
      >
        {currentWork.reviewedSystems.map((system) => (
          <article
            className="work-column current-work-column"
            id={system.id}
            key={system.id}
          >
            <p className="work-status">{system.status}</p>
            <h3>{system.title}</h3>
            <p className="work-summary">{system.summary}</p>
            <ul>
              {system.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="verification">
              <strong>Scope:</strong> {system.limitations}
            </p>
            <p className="work-source">{system.publicLabel}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PublicWork({
  titleId = "public-work-title",
  className = "work-section public-work",
}: SectionShellProps) {
  return (
    <section className={className} aria-labelledby={titleId}>
      <div className="container work-stack">
        <div className="section-heading compact-heading">
          <h2 id={titleId}>Explore my public work.</h2>
          <p>Writing, tools and experiments you can inspect.</p>
        </div>
        <div
          className="work-grid current-work-grid public-project-grid"
          aria-label="Public work links"
        >
          {currentWork.publicProjects.map((project) => (
            <article
              className="work-column current-work-column public-project"
              key={project.id}
            >
              <p className="work-status">{project.status}</p>
              <h3>
                <a href={project.href}>{project.title}</a>
              </h3>
              <p className="work-summary">{project.summary}</p>
              <p className="work-source">{project.limitations}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EvaluationPractice({
  titleId = "evaluation-practice-title",
  className = "work-section evaluation-practice",
}: SectionShellProps) {
  return (
    <section className={className} aria-labelledby={titleId}>
      <div className="container work-stack">
        <div className="section-heading compact-heading">
          <h2 id={titleId}>Agent experience, end to end.</h2>
          <p>
            Systems I implemented and shipped, plus completed evaluations of
            routing and journey design. Experimental gains are scoped to the
            tested tasks and clients.
          </p>
        </div>
        <div
          className="work-grid current-work-grid method-grid"
          aria-label="Agent experience engineering work"
        >
          {currentWork.methodCards.map((method) => (
            <article
              className="work-column current-work-column method-card"
              id={method.id}
              key={method.id}
            >
              <p className="work-status">{method.status}</p>
              <h3>{method.title}</h3>
              <p className="work-summary">{method.summary}</p>
              <ul>
                {method.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {method.metricIds.map((id) => {
                const metric = currentWorkMetrics.find(
                  (entry) => entry.id === id,
                )!;
                return (
                  <div className="work-metric" key={id}>
                    <p>
                      <strong>{metric.value}</strong> {metric.label}
                    </p>
                    <p className="work-source">{metric.context}</p>
                  </div>
                );
              })}
              <p className="verification">
                <strong>Scope:</strong> {method.limitations}
              </p>
              <p className="work-source">{method.publicLabel}</p>
            </article>
          ))}
        </div>
        <p>
          <a href="https://agentexperience.tech/">
            Read my Agent Experience field guide
          </a>
        </p>
      </div>
    </section>
  );
}
