import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notes } from "@/content/notes";

export function LatestNotes() {
  const latest = notes.slice(0, 3);

  return (
    <section className="section-pad compact alt" aria-labelledby="blog-title">
      <div className="container narrow">
        <div className="section-header">
          <p className="eyebrow">Writing</p>
          <h2 id="blog-title" className="display-serif">
            Lessons from systems I have <em>operated.</em>
          </h2>
        </div>
        <div className="notes-list">
          {latest.map((note) => (
            <Link href={`/notes#${note.id}`} className="note-row" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.dek}</p>
            </Link>
          ))}
        </div>
        <div className="card-footer-row">
          <Link className="button ghost" href="/notes">
            All writing
            <ArrowRight className="icon icon-md" />
          </Link>
        </div>
      </div>
    </section>
  );
}
