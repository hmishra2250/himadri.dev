import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { TrackedLink } from "@/components/ui/TrackedLink";

const homepageSlugs = [
  "agentic-market-research-platform",
  "ml-infra-rescue",
  "computer-vision-product-systems",
];

function CaseCard({ study }: { study: CaseStudy }) {
  const content = (
    <>
      <div>
        <p className="eyebrow">
          {study.company} · {study.period}
        </p>
        <h3>{study.title}</h3>
        <p>{study.summary}</p>
      </div>
      {study.metrics.length > 0 ? (
        <div className="metric-chip-row" aria-label="Selected metrics">
          {study.metrics.slice(0, 2).map((metric) => (
            <span className="metric-chip" key={metric}>
              {metric}
            </span>
          ))}
        </div>
      ) : null}
      <span className="link-with-icon card-link-label">
        Read case study
        <ArrowRight className="icon icon-sm" />
      </span>
    </>
  );

  return study.routeEnabled ? (
    <TrackedLink
      href={`/case-studies/${study.slug}`}
      className="case-card card-link"
      eventName="case_study_opened"
      eventParams={{ feature_id: study.slug, source_section: "case_grid" }}
    >
      {content}
    </TrackedLink>
  ) : (
    <article className="case-card">
      {content}
    </article>
  );
}

export function CaseStudyGrid() {
  const featured = homepageSlugs.flatMap((slug) => {
    const study = caseStudies.find((s) => s.slug === slug);
    return study ? [study] : [];
  });

  return (
    <section className="section-pad" aria-labelledby="case-grid-title">
      <div className="container">
        <p className="eyebrow">Systems I shipped</p>
        <h2 id="case-grid-title" className="display-serif">
          Agentic AI, ML infrastructure, and <em>computer vision.</em>
        </h2>
        <div className="case-grid trio">
          {featured.map((study) => (
            <CaseCard study={study} key={study.slug} />
          ))}
        </div>
        <div className="card-footer-row">
          <Link className="button ghost" href="/case-studies">
            View all case studies
            <ArrowRight className="icon icon-md" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AllCaseStudies() {
  return (
    <section className="section-pad" aria-labelledby="all-case-studies-title">
      <div className="container">
        <p className="eyebrow">Systems I shipped</p>
        <h1 id="all-case-studies-title" className="display-serif">
          Agentic AI, ML infrastructure, and <em>computer vision.</em>
        </h1>
        <div className="case-grid trio">
          {caseStudies.map((study) => (
            <CaseCard study={study} key={study.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
