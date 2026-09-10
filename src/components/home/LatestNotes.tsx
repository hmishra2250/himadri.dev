import Link from "next/link";
import { notes } from "@/content/notes";

export function LatestNotes() {
  const latest = notes.slice(0, 2);

  return (
    <section
      className="section-pad compact alt"
      aria-labelledby="writing-title"
    >
      <div className="container writing-section">
        <div className="section-header compact-header">
          <h2 id="writing-title">Writing.</h2>
          <p className="section-description">
            Occasional notes on engineering judgment, AI systems, and product
            boundaries.
          </p>
        </div>
        <div className="notes-list writing-list">
          {latest.map((note) => (
            <Link href={`/notes#${note.id}`} className="note-row" key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.dek}</p>
            </Link>
          ))}
          <Link className="button ghost align-start" href="/notes">
            All writing
          </Link>
        </div>
      </div>
    </section>
  );
}
