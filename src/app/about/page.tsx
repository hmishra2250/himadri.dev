import type { Metadata } from "next";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { aboutPage, aboutProofClaims } from "@/content/about";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <RouteJsonLd path="/about" />
      <section className="section-pad about-section">
        <div className="container narrow about-page">
          <p className="eyebrow">{aboutPage.eyebrow}</p>
          <h1>{aboutPage.title}</h1>
          <p className="hero-subtitle">{aboutPage.intro}</p>
          <p className="section-description">{aboutPage.summary}</p>
          <div className="hero-actions about-actions" aria-label="About links">
            {aboutPage.ctas.map((cta) => (
              <a className="button secondary" href={cta.href} key={cta.href}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad compact alt">
        <div className="container about-page">
          <div className="section-header">
            <p className="eyebrow">Proof-backed range</p>
            <h2>Claims on this page are tied to approved proof metadata.</h2>
          </div>
          <div className="case-grid">
            {aboutProofClaims.map((card) => (
              <a className="card-link" href={card.href} key={card.id}>
                <article className="case-card">
                  <span className="tag">{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.summary}</p>
                  <p className="evidence">Evidence: {card.proof.claim}</p>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad compact">
        <div className="container about-page">
          <div className="section-header">
            <p className="eyebrow">Operating style</p>
            <h2>How I approach production AI work.</h2>
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
