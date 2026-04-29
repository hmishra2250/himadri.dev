import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { caseStudies } from "@/content/case-studies";

export function CaseStudyGrid() {
  return (
    <section className="section-pad" aria-labelledby="case-grid-title">
      <div className="container">
        <SectionHeader
          eyebrow="Work"
          title="Breadth after flagship depth."
          description="LLM systems, infrastructure, search, computer vision, and low-level AR performance."
        />
        <div className="case-grid" id="case-grid-title">
          {caseStudies.map((study) => (
            <article className="case-card" key={study.slug}>
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
