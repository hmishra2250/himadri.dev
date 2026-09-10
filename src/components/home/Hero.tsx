import Image from "next/image";
import { profile } from "@/content/profile";
import { practice } from "@/content/practice";
import { TrackedAnchor } from "@/components/ui/TrackedLink";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <span className="portrait-frame">
          <Image
            className="portrait"
            src="/images/himadri-portrait.png"
            alt="Himadri Mishra"
            width={460}
            height={460}
            priority
            unoptimized
          />
        </span>
        <div className="hero-copy">
          <p className="eyebrow">{practice.eyebrow}</p>
          <h1 id="hero-title">{practice.headline}</h1>
          <p className="hero-summary">{practice.summary}</p>
          <div className="hero-actions" aria-label="Primary actions">
            <TrackedAnchor
              className="button primary"
              href={`mailto:${profile.email}`}
              eventName="contact_cta_clicked"
              eventParams={{ source_section: "hero" }}
            >
              Email Himadri
            </TrackedAnchor>
            <TrackedAnchor
              className="button secondary"
              href={profile.resumePath}
              eventName="resume_download_clicked"
              eventParams={{ source_section: "hero" }}
            >
              Download resume
            </TrackedAnchor>
            <a
              className="button tertiary"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
