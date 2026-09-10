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
    <div className="work-result">
      <p className="work-result-label">
        <strong>{metric.value}</strong> {metric.label}
      </p>
      <p>{metric.context}</p>
    </div>
  );
}

function MethodCardArticle({
  method,
  featured,
}: {
  method: MethodCard;
  featured: boolean;
}) {
  return (
    <article
      className={`work-record${featured ? " work-record-featured" : ""}`}
      id={method.id}
    >
      <div className="work-record-copy">
        <p className="work-status">{method.status}</p>
        <h3>{method.title}</h3>
        <p>{method.summary}</p>
        <ul>
          {method.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
      <div className="work-evidence" aria-label="Results and limits">
        {method.metricIds.map((id) => (
          <WorkMetric id={id} key={id} />
        ))}
        <p className="work-scope">
          {method.metricIds.length === 0 && <strong>Scope</strong>}
          {method.limitations}
        </p>
      </div>
    </article>
  );
}

export function AgentToolsAndEvaluation({
  titleId = "agent-tools-title",
}: SectionTitleProps) {
  return (
    <div className="work-chapter">
      <div className="work-section-heading">
        <h2 id={titleId}>Agent experience</h2>
        <p>Helping agents find tools, get access and finish tasks.</p>
        <p className="work-disclosure">
          {currentWork.methodCards[0].publicLabel}
        </p>
      </div>
      <div className="work-record-list">
        {getOrderedMethodCards().map((method, index) => (
          <MethodCardArticle
            method={method}
            featured={index < 3}
            key={method.id}
          />
        ))}
      </div>
    </div>
  );
}

export function ReviewedSystems({
  titleId = "ai-workflows-title",
}: SectionTitleProps) {
  return (
    <div className="work-chapter">
      <div className="work-section-heading">
        <h2 id={titleId}>AI products</h2>
        <p>Working systems for agent tasks, review and safe access.</p>
        <p className="work-disclosure">
          {currentWork.reviewedSystems[0].publicLabel}
        </p>
      </div>
      <div className="work-record-list">
        {currentWork.reviewedSystems.map((system) => (
          <article className="work-record" id={system.id} key={system.id}>
            <div className="work-record-copy">
              <p className="work-status">{system.status}</p>
              <h3>{system.title}</h3>
              <p>{system.summary}</p>
              <ul>
                {system.work.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="work-evidence">
              <p className="work-scope">
                <strong>What this covers</strong>
                {system.limitations}
              </p>
            </div>
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
    <div className="work-chapter">
      <div className="work-section-heading">
        <h2 id={titleId}>Public work</h2>
        <p>Guides, code and experiments you can explore.</p>
      </div>
      <div className="work-public-list">
        {currentWork.publicProjects.map((project) => (
          <article
            className="work-public-entry"
            id={project.id}
            key={project.id}
          >
            <p className="work-status">{project.status}</p>
            <h3>
              <a href={project.href}>
                {project.title}
                <span aria-hidden="true"> ↗</span>
              </a>
            </h3>
            <p>{project.summary}</p>
            <p className="work-disclosure">{project.limitations}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
