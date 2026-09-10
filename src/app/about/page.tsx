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
      <div className="editorial-route about-route route-shell">
        <section className="route-hero" aria-labelledby="about-title">
          <div className="container secondary-grid route-hero-grid">
            <p className="eyebrow">{aboutPage.eyebrow}</p>
            <div className="editorial-prose route-copy-stack">
              <h1 id="about-title">{aboutPage.title}</h1>
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
                      className="button tertiary"
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

        <section className="route-section" aria-labelledby="timeline-title">
          <div className="container secondary-grid">
            <div className="section-heading compact-heading">
              <h2 className="modest-section-heading" id="timeline-title">
                Where the work comes from.
              </h2>
              <p>
                Public historical roles establish the proof base. Current-client
                work is summarized only as broad capability themes.
              </p>
            </div>
            <div className="timeline editorial-list">
              {careerTimeline.map((entry) => (
                <div className="timeline-entry editorial-row" key={entry.year}>
                  <span className="timeline-year">{entry.year}</span>
                  <span>{entry.event}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="route-section" aria-labelledby="approach-title">
          <div className="container secondary-grid">
            <div className="section-heading compact-heading">
              <h2 className="modest-section-heading" id="approach-title">
                How I work with teams.
              </h2>
              <p>
                These are the practical habits I bring to AI systems, developer
                infrastructure, and platform reliability work.
              </p>
            </div>
            <div className="route-copy-stack">
              <div className="approach-grid editorial-list">
                {practice.approach.map((item) => (
                  <article
                    className="approach-row editorial-row"
                    key={item.title}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                  </article>
                ))}
              </div>
              <div className="principle-records editorial-list">
                {aboutPage.principles.map((principle) => (
                  <article
                    className="principle-record editorial-row"
                    key={principle.title}
                  >
                    <h3>{principle.title}</h3>
                    <p>{principle.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
