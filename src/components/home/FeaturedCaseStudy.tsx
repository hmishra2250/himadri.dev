import Link from "next/link";
import { flagshipCaseStudy } from "@/content/case-studies";

export function FeaturedCaseStudy() {
  return (
    <section className="section-pad" aria-labelledby="featured-case-study">
      <div className="container featured-grid">
        <div>
          <p className="eyebrow">Featured case study</p>
          <h2 id="featured-case-study">{flagshipCaseStudy.title}</h2>
          <p className="section-description">{flagshipCaseStudy.subtitle}</p>
          <p>{flagshipCaseStudy.problem}</p>
          <div className="tag-row">
            {flagshipCaseStudy.domains.map((domain) => (
              <span className="tag" key={domain}>
                {domain}
              </span>
            ))}
          </div>
          <Link
            className="button primary"
            href={`/case-studies/${flagshipCaseStudy.slug}`}
          >
            Read the full case study
          </Link>
        </div>
        <div
          className="architecture-card"
          aria-label="Simplified architecture preview"
        >
          {flagshipCaseStudy.architecture.slice(0, 9).map((step, index) => (
            <div className="architecture-step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
