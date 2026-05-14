import type { Metadata } from "next";
import Link from "next/link";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { notes } from "@/content/notes";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/notes");

export default function NotesPage() {
  return (
    <>
      <RouteJsonLd path="/notes" />
      <section className="section-pad">
        <div className="container narrow">
          <p className="eyebrow">Notes</p>
          <h1>Field notes on production AI systems.</h1>
          <p className="hero-subtitle">
            Short, public-safe notes about agent architecture, evaluation,
            observability, and cost control. Each note stays tied to approved
            proof metadata and labels sanitized or synthetic artifacts clearly.
          </p>
          <div className="opinion-list">
            {notes.map((note) => (
              <article className="evidence-card" key={note.id}>
                <p className="eyebrow">Public note</p>
                <h2>{note.title}</h2>
                <p className="evidence">{note.dek}</p>
                {note.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="muted">{note.publicLabel}</p>
                {note.artifacts.length > 0 ? (
                  <div className="metric-list" aria-label={`${note.title} artifacts`}>
                    {note.artifacts.map((artifact) => (
                      <div className="metric-card" key={artifact.title}>
                        <span>{artifact.visibleLabel}</span>
                        <strong>{artifact.title}</strong>
                        <p>{artifact.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="card-footer-row">
                  {note.relatedLinks.map((link) => (
                    <Link href={link.href} key={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
