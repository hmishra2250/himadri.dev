import type { Metadata } from "next";
import Link from "next/link";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { notes } from "@/content/notes";
import { profile } from "@/content/profile";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/notes");

export default function NotesPage() {
  return (
    <>
      <RouteJsonLd path="/notes" />
      <div className="editorial-route notes-route route-shell">
        <section className="route-hero" aria-labelledby="notes-title">
          <div className="container secondary-grid route-hero-grid">
            <p className="eyebrow">Notes</p>
            <div className="editorial-prose route-copy-stack">
              <h1 id="notes-title">Field notes on production AI systems.</h1>
              <p className="hero-subtitle">
                Short, public-safe notes about agent architecture, evaluation,
                observability, and cost control. Each note stays tied to
                approved proof metadata and labels sanitized or synthetic
                artifacts clearly.
              </p>
              <div className="hero-actions">
                <a className="button tertiary" href={profile.agentExperience}>
                  Read the Agent Experience field guide{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="route-section" aria-label="Public notes">
          <div className="container notes-list-shell">
            <div className="opinion-list editorial-list">
              {notes.map((note) => (
                <article
                  className="evidence-card note-row"
                  id={note.id}
                  key={note.id}
                >
                  <div className="secondary-grid note-row-grid">
                    <div>
                      <p className="eyebrow">Public note</p>
                      <h2 className="modest-section-heading">{note.title}</h2>
                    </div>
                    <div className="route-copy-stack">
                      <p className="evidence">{note.dek}</p>
                      {note.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      <p className="muted">{note.publicLabel}</p>
                      {note.artifacts.length > 0 ? (
                        <div
                          className="metric-list artifact-list"
                          aria-label={`${note.title} artifacts`}
                        >
                          {note.artifacts.map((artifact) => (
                            <div
                              className="metric-card artifact-row"
                              key={artifact.title}
                            >
                              <span className="eyebrow">
                                {artifact.visibleLabel}
                              </span>
                              <strong>{artifact.title}</strong>
                              <p>{artifact.description}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <div className="card-footer-row">
                        {note.relatedLinks.map((link) => (
                          <Link
                            href={link.href}
                            key={link.href}
                            className="text-link"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
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
