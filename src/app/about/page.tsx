import type { Metadata } from "next";
import Link from "next/link";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { aboutPage, careerTimeline } from "@/content/about";
import { practice } from "@/content/practice";
import { buildPageMetadata } from "@/lib/seo";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

export const metadata: Metadata = buildPageMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <RouteJsonLd path="/about" />
      <div className="editorial-route about-route">
        <section className="section-pad">
          <div className="container">
            <div className="editorial-prose">
              <h1>{aboutPage.title}</h1>
              <p className="hero-subtitle">{aboutPage.intro}</p>
              <p className="section-description">{aboutPage.summary}</p>
              <div className="hero-actions" aria-label="About links">
                {aboutPage.ctas.map((cta) => {
                  if (cta.label === "Download resume") {
                    return (
                      <TrackedAnchor
                        className="button secondary"
                        href={cta.href}
                        key={cta.href}
                        eventName="resume_download_clicked"
                        eventParams={{ source_section: "about_page" }}
                      >
                        {cta.label}
                      </TrackedAnchor>
                    );
                  }
                  return (
                    <Link
                      className="button primary"
                      href={cta.href}
                      key={cta.href}
                    >
                      {cta.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad compact alt">
          <div className="container">
            <div className="section-header editorial-prose">
              <h2>Where the work comes from.</h2>
              <p className="section-description">
                Public historical roles establish the proof base. Current-client
                work is summarized only as broad capability themes.
              </p>
            </div>
            <div className="timeline">
              {careerTimeline.map((entry) => (
                <div className="timeline-entry" key={entry.year}>
                  <span className="timeline-year">{entry.year}</span>
                  <span>{entry.event}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad compact">
          <div className="container">
            <div className="section-header wide editorial-prose">
              <h2>How I work with teams.</h2>
              <p className="section-description">
                These are the practical habits I bring to AI systems, developer
                infrastructure, and platform reliability work.
              </p>
            </div>
            <div className="approach-grid">
              {practice.approach.map((item) => (
                <article className="approach-row" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
            <div className="principle-records">
              {aboutPage.principles.map((principle) => (
                <article className="principle-record" key={principle.title}>
                  <div>
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
