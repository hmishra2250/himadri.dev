import Link from "next/link";
import { profile } from "@/content/profile";
import { metrics } from "@/content/metrics";

export function Hero() {
  const heroMetrics = metrics.slice(0, 4);
  return (
    <section className="hero section-pad">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            Senior AI Engineer · AI Platform · LLM Systems
          </p>
          <h1>{profile.headline}</h1>
          <p className="hero-subtitle">{profile.positioning}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/case-studies">
              Explore systems I built
            </Link>
            <Link className="button secondary" href="/interview-me">
              Interview me
            </Link>
            <Link className="button ghost" href="/contact">
              Start a conversation
            </Link>
            <a className="button ghost" href={profile.resumePath}>
              Download resume
            </a>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Top proof points">
          <p className="panel-title">Proof in the first scroll</p>
          <div className="hero-metrics">
            {heroMetrics.map((metric) => (
              <div key={metric.id}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
