import {
  AgentToolsAndEvaluation,
  PublicWork,
  ReviewedSystems,
} from "@/components/home/CurrentWork";
import { caseStudies } from "@/content/case-studies";
import { practice } from "@/content/practice";

export function AllCaseStudies() {
  return (
    <div className="work-index">
      <div className="container">
        <header className="work-index-header">
          <h1 id="all-case-studies-title">Work</h1>
          <p>
            Recent agent tools and AI products, with test results and a short
            record of my earlier work.
          </p>
          <nav className="work-index-nav" aria-label="Work sections">
            <a href="#agent-tools">
              Agent experience <span aria-hidden="true">↓</span>
            </a>
            <a href="#ai-workflows">
              AI products <span aria-hidden="true">↓</span>
            </a>
            <a href="#public-work">
              Public work <span aria-hidden="true">↓</span>
            </a>
            <a href="#earlier-work">
              Earlier work <span aria-hidden="true">↓</span>
            </a>
          </nav>
        </header>
        <section
          className="work-index-section"
          id="agent-tools"
          aria-labelledby="agent-tools-title"
        >
          <AgentToolsAndEvaluation titleId="agent-tools-title" />
          <div
            className="work-supporting"
            aria-labelledby="supporting-contributions-title"
          >
            <h3 id="supporting-contributions-title">Other tool and API work</h3>
            {practice.recentWorkCases.map((brief) => (
              <article
                className="work-supporting-entry"
                id={brief.id}
                key={brief.id}
              >
                <h4>{brief.title}</h4>
                <p>{brief.summary}</p>
                <ul>
                  {brief.work.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="work-disclosure">{brief.verification}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="work-index-section"
          id="ai-workflows"
          aria-labelledby="ai-workflows-title"
        >
          <ReviewedSystems titleId="ai-workflows-title" />
        </section>
        <section
          className="work-index-section"
          id="public-work"
          aria-labelledby="public-work-title"
        >
          <PublicWork titleId="public-work-title" />
        </section>
        <section
          className="work-index-section"
          id="earlier-work"
          aria-labelledby="earlier-work-title"
        >
          <div className="work-section-heading">
            <h2 id="earlier-work-title">Earlier work</h2>
            <p>
              My background in AI reporting, ML infrastructure and computer
              vision.
            </p>
          </div>
          <div className="work-earlier-list">
            {caseStudies.map((study) => (
              <article
                className="work-earlier-entry"
                id={study.slug}
                key={study.slug}
              >
                <p className="work-status">{study.period}</p>
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
