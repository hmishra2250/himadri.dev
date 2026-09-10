import { currentWork, type MethodCard } from "@/content/current-work";
import { currentWorkMetrics } from "@/content/metrics";

type SectionTitleProps = {
  titleId?: string;
};

const methodCardOrder = [
  "multi-harness-ax-experiments",
  "coded-journey-paths",
  "agent-routing-surfaces",
  "auth-aware-onboarding",
  "discovery-retrieval-measurement",
  "evidence-grounded-insights",
] as const;

function getOrderedMethodCards() {
  for (const method of currentWork.methodCards) {
    if (!methodCardOrder.some((id) => id === method.id)) {
      throw new Error(`Unordered current-work method card: ${method.id}`);
    }
  }

  const byId = new Map(
    currentWork.methodCards.map((method) => [method.id, method]),
  );

  return methodCardOrder.map((id) => {
    const method = byId.get(id);

    if (!method) throw new Error(`Missing current-work method card: ${id}`);

    return method;
  });
}

function WorkMetric({ id }: { id: string }) {
  const metric = currentWorkMetrics.find((entry) => entry.id === id);

  if (!metric) throw new Error(`Missing current-work metric: ${id}`);

  return (
    <div className="work-metric">
      <p>
        <strong>{metric.value}</strong> {metric.label}
      </p>
      <p className="work-source">{metric.context}</p>
    </div>
  );
}

function MethodCardBody({ method }: { method: MethodCard }) {
  return (
    <>
      <p className="work-status">{method.status}</p>
      <h3>{method.title}</h3>
      <p className="work-summary">{method.summary}</p>
      <ul>
        {method.details.map((detail) => (
          <li key={detail}>{detail}</li>
        ))}
      </ul>
      {method.metricIds.map((id) => (
        <WorkMetric id={id} key={id} />
      ))}
      <p className="verification">
        <strong>Scope:</strong> {method.limitations}
      </p>
      <p className="work-source">{method.publicLabel}</p>
    </>
  );
}

function MethodCardArticle({ method }: { method: MethodCard }) {
  return (
    <article
      className="work-column current-work-column method-card"
      id={method.id}
    >
      <MethodCardBody method={method} />
    </article>
  );
}

export function AgentToolsAndEvaluation({
  titleId = "agent-tools-title",
}: SectionTitleProps) {
  return (
    <div className="work-stack current-work-block" aria-labelledby={titleId}>
      <div className="section-heading compact-heading">
        <h2 className="modest-section-heading" id={titleId}>
          Agent tools and evaluation.
        </h2>
        <p>
          How agents find the right tool, get access and finish a task, plus the
          evaluation and reporting systems I built to improve that journey.
          Experimental gains are scoped to the tested tasks and clients.
        </p>
      </div>
      <div
        className="work-grid current-work-grid method-grid"
        aria-label="Agent tools and evaluation work"
      >
        {getOrderedMethodCards().map((method) => (
          <MethodCardArticle method={method} key={method.id} />
        ))}
      </div>
    </div>
  );
}

export function ReviewedSystems({
  titleId = "ai-workflows-title",
}: SectionTitleProps) {
  return (
    <div className="work-stack current-work-block" aria-labelledby={titleId}>
      <div className="section-heading compact-heading">
        <h2 className="modest-section-heading" id={titleId}>
          AI workflows and safeguards.
        </h2>
        <p>
          Working versions delivered across agent workflows, browser QA and
          governed knowledge access. These are shipped systems, with explicit
          human-control and access boundaries.
        </p>
      </div>
      <div
        className="work-grid current-work-grid"
        aria-label="Shipped engineering systems"
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
}: SectionTitleProps) {
  return (
    <div className="work-stack current-work-block" aria-labelledby={titleId}>
      <div className="section-heading compact-heading">
        <h2 className="modest-section-heading" id={titleId}>
          Writing and open source.
        </h2>
        <p>Writing, tools and experiments you can read, use and inspect.</p>
      </div>
      <div
        className="work-grid current-work-grid public-project-grid"
        aria-label="Public work links"
      >
        {currentWork.publicProjects.map((project) => (
          <article
            className="work-column current-work-column public-project"
            id={project.id}
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
  );
}
