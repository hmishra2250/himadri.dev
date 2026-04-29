"use client";

import { useMemo, useState } from "react";

const sampleDeck = {
  title: "Research report summary",
  slides: [
    {
      title: "Executive insight",
      layout: "hero_metric",
      body: "Segment A shows the strongest validated lift in the representative dataset.",
    },
    {
      title: "Evidence path",
      layout: "trace_table",
      body: "Analysis code, sandbox execution, judge verification, and chart scoring are separate inspectable steps.",
    },
  ],
};

function safeParse(input: string) {
  try {
    const parsed = JSON.parse(input) as typeof sampleDeck;
    if (!Array.isArray(parsed.slides)) return sampleDeck;
    return parsed;
  } catch {
    return sampleDeck;
  }
}

export function DeckIrPreviewer() {
  const [ir, setIr] = useState(JSON.stringify(sampleDeck, null, 2));
  const deck = useMemo(() => safeParse(ir), [ir]);

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Deck IR Previewer</p>
        <h1>Inspectable intermediate representation for AI-generated decks</h1>
        <p className="hero-subtitle">
          Edit a synthetic deck IR and inspect the rendered preview. The editor
          parses JSON only and never executes scripts.
        </p>
        <div className="deck-grid">
          <label className="assistant-box">
            <span>Deck IR JSON</span>
            <textarea
              value={ir}
              onChange={(event) => setIr(event.target.value)}
              rows={16}
            />
          </label>
          <div className="slide-preview-stack" aria-label="Deck preview">
            <h2>{deck.title}</h2>
            {deck.slides.map((slide, index) => (
              <article
                className="slide-preview"
                key={`${slide.title}-${index}`}
              >
                <p className="eyebrow">Slide {index + 1}</p>
                <h3>{slide.title}</h3>
                <p>{slide.body}</p>
                <span className="tag">{slide.layout}</span>
              </article>
            ))}
          </div>
        </div>
        <p className="confidentiality-note">
          Synthetic sample IR only. No private deck outputs, customer data, or
          proprietary templates are included.
        </p>
      </div>
    </section>
  );
}
