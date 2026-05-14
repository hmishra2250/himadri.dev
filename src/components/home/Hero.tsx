import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { metrics } from "@/content/metrics";
import { MetricValue } from "@/components/ui/MetricValue";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

export function Hero() {
  const heroMetrics = metrics.slice(0, 4);
  return (
    <section className="hero section-pad">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Senior AI Engineer</p>
          <h1 className="display-serif">I build AI systems that work under <em>real</em> constraints.</h1>
          <p className="career-trail">
            IIT-BHU · UC Berkeley · Microsoft · Osmo · Epic! · Knit
          </p>
          <p className="hero-subtitle">{profile.positioning}</p>
          <div className="hero-actions">
            <Link className="button primary" href="/case-studies">
              Explore my work
              <ArrowRight className="icon icon-md" />
            </Link>
            <TrackedAnchor
              className="button ghost"
              href={profile.resumePath}
              eventName="resume_download_clicked"
              eventParams={{ source_section: "hero" }}
            >
              Download resume
              <Download className="icon icon-md" />
            </TrackedAnchor>
          </div>
        </div>
        <aside className="hero-panel" aria-label="Top proof points">
          <div className="hero-metrics">
            {heroMetrics.map((metric) =>
              metric.href ? (
                <Link href={metric.href} className="hero-metric-card" key={metric.id}>
                  <MetricValue value={metric.value} tone="hero" />
                  <span>{metric.label}</span>
                  <p>{metric.context}</p>
                </Link>
              ) : (
                <div className="hero-metric-card" key={metric.id}>
                  <MetricValue value={metric.value} tone="hero" />
                  <span>{metric.label}</span>
                  <p>{metric.context}</p>
                </div>
              ),
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
