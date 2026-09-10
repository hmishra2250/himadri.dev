import Link from "next/link";
import { ForkCard } from "@/components/ui/ForkCard";
import type { CaseStudy } from "@/content/case-studies";
import { flagshipDiagrams } from "@/content/diagrams";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const outline = [
    { href: "#summary-heading", label: "Summary" },
    { href: "#problem-heading", label: "Constraints" },
    { href: "#architecture-heading", label: "Architecture" },
    { href: "#decision-theater", label: "Decisions" },
    { href: "#evaluation", label: "Evaluation" },
  ];

  return (
    <article className="editorial-route case-study-page route-shell">
      <div className="container case-layout">
        <aside className="case-outline" aria-label="Case study outline">
          <Link href="/case-studies" className="back-link">
            All case studies
          </Link>
          <nav>
            {outline.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="case-main route-copy-stack">
          <header className="case-header route-copy-stack">
            <div className="case-memo-topline">
              <span>{study.company}</span>
              <span>{study.period}</span>
            </div>
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
            <div className="secondary-grid">
              <h2 className="modest-section-heading" id="summary-heading">
                What changed.
              </h2>
              <div className="route-copy-stack">
                <p>{study.summary}</p>
                <div className="metric-list case-metric-list">
                  {study.metrics.map((metric) => (
                    <strong key={metric}>{metric}</strong>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="case-section" aria-labelledby="problem-heading">
            <div className="secondary-grid">
              <h2 className="modest-section-heading" id="problem-heading">
                Problem and constraints.
              </h2>
              <div className="route-copy-stack">
                <p>{study.problem}</p>
                <ul className="check-list">
                  {study.constraints.map((constraint) => (
                    <li key={constraint}>{constraint}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            className="case-section"
            id="architecture"
            aria-labelledby="architecture-heading"
          >
            <div className="secondary-grid">
              <h2 className="modest-section-heading" id="architecture-heading">
                System boundary.
              </h2>
              <div className="architecture-card full system-boundary-grid">
                {study.architecture.map((step, index) => (
                  <div className="architecture-step" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {study.isFlagship ? (
            <section
              className="case-section"
              id="system-diagrams"
              aria-labelledby="diagram-heading"
            >
              <div className="secondary-grid">
                <h2 className="modest-section-heading" id="diagram-heading">
                  Representative diagrams.
                </h2>
                <div className="diagram-grid">
                  {flagshipDiagrams.map((diagram) => (
                    <article className="diagram-card" key={diagram.id}>
                      <h3>{diagram.title}</h3>
                      <p>{diagram.caption}</p>
                      <div
                        className="diagram-flow"
                        aria-label={diagram.caption}
                      >
                        {diagram.nodes.map((node, index) => (
                          <div className="diagram-node" key={node.id}>
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <strong>{node.label}</strong>
                            <p>{node.detail}</p>
                          </div>
                        ))}
                      </div>
                      <p className="confidentiality-note">
                        {diagram.publicLabel}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section
            className="case-section"
            id="decision-theater"
            aria-labelledby="decision-heading"
          >
            <div className="secondary-grid">
              <h2 className="modest-section-heading" id="decision-heading">
                Decision record.
              </h2>
              <div className="decision-preview">
                {study.decisions.map((fork) => (
                  <ForkCard fork={fork} key={fork.title} />
                ))}
              </div>
            </div>
          </section>

          <section
            className="case-section"
            id="evaluation"
            aria-labelledby="evaluation-heading"
          >
            <div className="secondary-grid">
              <h2 className="modest-section-heading" id="evaluation-heading">
                Evaluation and reliability.
              </h2>
              <div className="case-two-column">
                <ul className="check-list">
                  {study.evaluation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div id="observability" className="route-copy-stack">
                  <h3>Observability and debugging.</h3>
                  <ul className="check-list">
                    {study.observability.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section
            className="case-section"
            aria-labelledby="reflection-heading"
          >
            <div className="secondary-grid">
              <h2 className="modest-section-heading" id="reflection-heading">
                Reflection.
              </h2>
              <div className="route-copy-stack">
                <p>{study.reflection}</p>
                <p className="confidentiality-note">
                  This case study uses sanitized architecture and representative
                  examples. It excludes confidential prompts, customer data,
                  proprietary datasets, private implementation details, and
                  internal traces.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
