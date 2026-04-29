import Link from "next/link";
import { ForkCard } from "@/components/ui/ForkCard";
import { SourceBadge } from "@/components/ui/SourceBadge";
import type { CaseStudy } from "@/content/case-studies";
import { flagshipDiagrams } from "@/content/diagrams";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <article className="section-pad case-study-page">
      <div className="container narrow">
        <Link href="/case-studies" className="back-link">
          ← All case studies
        </Link>
        <header className="case-header">
          <p className="eyebrow">
            {study.company} · {study.period}
          </p>
          <h1>{study.title}</h1>
          <p className="hero-subtitle">{study.subtitle}</p>
          <p className="muted">Role: {study.role}</p>
          <div className="tag-row">
            {study.domains.map((domain) => (
              <span className="tag" key={domain}>
                {domain}
              </span>
            ))}
          </div>
        </header>

        <section className="case-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Executive summary</h2>
          <p>{study.summary}</p>
          <div className="metric-list">
            {study.metrics.map((metric) => (
              <strong key={metric}>{metric}</strong>
            ))}
          </div>
        </section>

        <section className="case-section" aria-labelledby="problem-heading">
          <h2 id="problem-heading">Problem and constraints</h2>
          <p>{study.problem}</p>
          <ul className="check-list">
            {study.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </section>

        <section
          className="case-section"
          id="architecture"
          aria-labelledby="architecture-heading"
        >
          <h2 id="architecture-heading">Architecture</h2>
          <div className="architecture-card full">
            {study.architecture.map((step, index) => (
              <div className="architecture-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </section>

        {study.isFlagship ? (
          <section
            className="case-section"
            id="system-diagrams"
            aria-labelledby="diagram-heading"
          >
            <h2 id="diagram-heading">Improved system diagrams</h2>
            <div className="diagram-grid">
              {flagshipDiagrams.map((diagram) => (
                <article className="diagram-card" key={diagram.id}>
                  <h3>{diagram.title}</h3>
                  <p>{diagram.caption}</p>
                  <div className="diagram-flow" aria-label={diagram.caption}>
                    {diagram.nodes.map((node, index) => (
                      <div className="diagram-node" key={node.id}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <strong>{node.label}</strong>
                        <p>{node.detail}</p>
                      </div>
                    ))}
                  </div>
                  <p className="confidentiality-note">{diagram.publicLabel}</p>
                  <div className="source-list">
                    {diagram.proofIds.map((proofId) => (
                      <SourceBadge proofId={proofId} key={proofId} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section
          className="case-section"
          id="decision-theater"
          aria-labelledby="decision-heading"
        >
          <h2 id="decision-heading">Decision Theater</h2>
          <div className="decision-preview">
            {study.decisions.map((fork) => (
              <ForkCard fork={fork} key={fork.title} />
            ))}
          </div>
        </section>

        <section
          className="case-section split"
          id="evaluation"
          aria-labelledby="evaluation-heading"
        >
          <div>
            <h2 id="evaluation-heading">Evaluation and reliability</h2>
            <ul className="check-list">
              {study.evaluation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div id="observability">
            <h2>Observability and debugging</h2>
            <ul className="check-list">
              {study.observability.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-section" aria-labelledby="reflection-heading">
          <h2 id="reflection-heading">Reflection</h2>
          <p>{study.reflection}</p>
          <div className="source-list">
            {study.proofIds.map((proofId) => (
              <SourceBadge proofId={proofId} key={proofId} />
            ))}
          </div>
          <p className="confidentiality-note">
            This case study uses sanitized architecture and representative
            examples. It excludes confidential prompts, customer data,
            proprietary datasets, private implementation details, and internal
            traces.
          </p>
        </section>
      </div>
    </article>
  );
}
