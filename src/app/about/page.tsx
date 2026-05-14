import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, Download } from "lucide-react";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { aboutPage, careerTimeline } from "@/content/about";
import { buildPageMetadata } from "@/lib/seo";
import { TrackedAnchor, TrackedLink } from "@/components/ui/TrackedLink";

const ctaIcons: Record<string, React.ReactNode> = {
  "See my work": <ArrowRight className="icon icon-md" />,
  "Ask me anything": <MessageSquare className="icon icon-md" />,
  "Download resume": <Download className="icon icon-md" />,
};

export const metadata: Metadata = buildPageMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <RouteJsonLd path="/about" />
      <section className="section-pad">
        <div className="container narrow">
          <p className="eyebrow">{aboutPage.eyebrow}</p>
          <h1 className="display-serif">8 years building AI systems that survive <em>production.</em></h1>
          <p className="hero-subtitle">{aboutPage.intro}</p>
          <p className="section-description">{aboutPage.summary}</p>
          <div className="hero-actions" aria-label="About links">
            {aboutPage.ctas.map((cta) => {
              const isResume = cta.label === "Download resume";
              const isContact = cta.label === "Ask me anything";
              if (isResume) {
                return (
                  <TrackedAnchor
                    className="button secondary"
                    href={cta.href}
                    key={cta.href}
                    eventName="resume_download_clicked"
                    eventParams={{ source_section: "about_page" }}
                  >
                    {cta.label}
                    {ctaIcons[cta.label]}
                  </TrackedAnchor>
                );
              }
              if (isContact) {
                return (
                  <TrackedLink
                    className="button secondary"
                    href={cta.href}
                    key={cta.href}
                    eventName="contact_cta_clicked"
                    eventParams={{ source_section: "about_page" }}
                  >
                    {cta.label}
                    {ctaIcons[cta.label]}
                  </TrackedLink>
                );
              }
              return (
                <Link className="button secondary" href={cta.href} key={cta.href}>
                  {cta.label}
                  {ctaIcons[cta.label]}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad compact alt">
        <div className="container narrow">
          <div className="section-header">
            <p className="eyebrow">The arc</p>
            <h2 className="display-serif">Where I&apos;ve <em>been.</em></h2>
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
        <div className="container narrow">
          <div className="section-header">
            <p className="eyebrow">How I work</p>
            <h2 className="display-serif">Beliefs shaped by <em>production.</em></h2>
          </div>
          <div className="principle-grid">
            {aboutPage.principles.map((principle) => (
              <article className="principle-card" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
