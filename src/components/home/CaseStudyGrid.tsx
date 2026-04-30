import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies } from "@/content/case-studies";

function caseCardClass(slug: string) {
  if (slug === "agentic-market-research-platform") return "case-card featured";
  if (slug === "ml-infra-rescue") return "case-card priority";
  return "case-card";
}

export function CaseStudyGrid() {
  return (
    <section className="section-pad" aria-labelledby="case-grid-title">
      <div className="container">
        <SectionHeader
          eyebrow="Work"
          title="Breadth after flagship depth."
          titleId="case-grid-title"
          description="LLM systems, infrastructure, search, computer vision, and low-level AR performance."
        />
        <div className="case-grid">
          {caseStudies.map((study) => (
            <article className={caseCardClass(study.slug)} key={study.slug}>
              <div>
                <p className="eyebrow">{study.company}</p>
                <h3>{study.title}</h3>
                <p>{study.summary}</p>
              </div>
              <div className="tag-row">
                {study.domains.slice(0, 4).map((domain) => (
                  <span className="tag" key={domain}>
                    {domain}
                  </span>
                ))}
              </div>
              {study.routeEnabled ? (
                <Link href={`/case-studies/${study.slug}`}>
                  Read case study
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
