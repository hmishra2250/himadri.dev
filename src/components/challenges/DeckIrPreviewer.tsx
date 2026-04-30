"use client";

import { useMemo, useState } from "react";
import { trackPortfolioEvent } from "@/lib/analytics";

type Slide = {
  title?: string;
  layout?: string;
  body?: string;
  speakerNotes?: string;
};

type Deck = {
  title?: string;
  slides?: Slide[];
};

const samples = [
  {
    id: "research-summary",
    label: "Research summary",
    deck: {
      title: "Research report summary",
      slides: [
        {
          title: "Executive insight",
          layout: "hero_metric",
          body: "Segment A shows the strongest validated lift in the representative dataset.",
          speakerNotes:
            "Explain that the metric is representative and validated through a separate judge step.",
        },
        {
          title: "Evidence path",
          layout: "trace_table",
          body: "Analysis code, sandbox execution, judge verification, and chart scoring are separate inspectable steps.",
          speakerNotes:
            "Emphasize the boundary between generated reasoning and rendered artifact.",
        },
      ],
    },
  },
  {
    id: "risk-review",
    label: "Risk review",
    deck: {
      title: "Workflow risk review",
      slides: [
        {
          title: "Failure mode",
          layout: "incident_card",
          body: "A judge that checks execution but not intent can approve a wrong denominator.",
          speakerNotes:
            "Connect the failure back to semantic verification, not just code execution.",
        },
      ],
    },
  },
];

function inspectDeck(input: string) {
  const errors: string[] = [];
  const warnings: string[] = [];
  try {
    const parsed = JSON.parse(input) as Deck;
    if (!parsed || typeof parsed !== "object") {
      return {
        deck: null,
        errors: ["Deck IR must be a JSON object."],
        warnings,
      };
    }
    if (!parsed.title) warnings.push("Deck is missing a title.");
    if (!Array.isArray(parsed.slides) || parsed.slides.length === 0) {
      errors.push("Deck must include at least one slide.");
    }
    parsed.slides?.forEach((slide, index) => {
      if (!slide.title) warnings.push(`Slide ${index + 1} is missing title.`);
      if (!slide.layout) warnings.push(`Slide ${index + 1} is missing layout.`);
      if (!slide.body) warnings.push(`Slide ${index + 1} is missing body.`);
    });
    return { deck: errors.length ? null : parsed, errors, warnings };
  } catch {
    return { deck: null, errors: ["Deck IR is not valid JSON."], warnings };
  }
}

export function DeckIrPreviewer() {
  const [sampleId, setSampleId] = useState(samples[0].id);
  const [ir, setIr] = useState(JSON.stringify(samples[0].deck, null, 2));
  const [mode, setMode] = useState<"preview" | "outline" | "notes">("preview");
  const inspection = useMemo(() => inspectDeck(ir), [ir]);

  function loadSample(nextSampleId: string) {
    const sample =
      samples.find((item) => item.id === nextSampleId) ?? samples[0];
    setSampleId(sample.id);
    setIr(JSON.stringify(sample.deck, null, 2));
    trackPortfolioEvent("deck_ir_sample_selected", {
      route: "/challenges/deck-ir-previewer",
      feature_id: sample.id,
    });
  }

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Deck IR Previewer</p>
        <h1>Inspectable intermediate representation for AI-generated decks</h1>
        <p className="hero-subtitle">
          Edit a synthetic deck IR, inspect parser errors, review slide mapping,
          and see why renderer boundaries make generated artifacts debuggable.
        </p>
        <div className="toggle-row" role="group" aria-label="Deck IR samples">
          {samples.map((sample) => (
            <button
              aria-pressed={sample.id === sampleId}
              className={sample.id === sampleId ? "toggle active" : "toggle"}
              key={sample.id}
              onClick={() => loadSample(sample.id)}
              type="button"
            >
              {sample.label}
            </button>
          ))}
        </div>
        <div
          className="toggle-row"
          role="group"
          aria-label="Deck inspection modes"
        >
          {(["preview", "outline", "notes"] as const).map((nextMode) => (
            <button
              aria-pressed={mode === nextMode}
              className={mode === nextMode ? "toggle active" : "toggle"}
              key={nextMode}
              onClick={() => setMode(nextMode)}
              type="button"
            >
              {nextMode}
            </button>
          ))}
        </div>
        <div className="deck-grid">
          <label className="assistant-box">
            <span>Deck IR JSON</span>
            <textarea
              value={ir}
              onChange={(event) => setIr(event.target.value)}
              rows={18}
            />
          </label>
          <div className="slide-preview-stack" aria-label="Deck inspection">
            {inspection.errors.length > 0 ? (
              <article className="reveal-card">
                <h2>Parser errors</h2>
                <ul className="check-list">
                  {inspection.errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </article>
            ) : null}
            {inspection.warnings.length > 0 ? (
              <article className="reveal-card">
                <h2>Warnings</h2>
                <ul className="check-list">
                  {inspection.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              </article>
            ) : null}
            {inspection.deck ? (
              <>
                <h2>{inspection.deck.title}</h2>
                {mode === "outline" ? (
                  <ol className="check-list">
                    {inspection.deck.slides?.map((slide, index) => (
                      <li key={`${slide.title}-${index}`}>
                        {index + 1}. {slide.title} [{slide.layout}]
                      </li>
                    ))}
                  </ol>
                ) : null}
                {mode === "notes" ? (
                  <div className="slide-preview-stack">
                    {inspection.deck.slides?.map((slide, index) => (
                      <article
                        className="slide-preview"
                        key={`${slide.title}-${index}`}
                      >
                        <p className="eyebrow">Speaker note {index + 1}</p>
                        <h3>{slide.title}</h3>
                        <p>
                          {slide.speakerNotes ?? "No speaker note provided."}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}
                {mode === "preview" ? (
                  <div
                    className="slide-preview-stack"
                    aria-label="Deck preview"
                  >
                    {inspection.deck.slides?.map((slide, index) => (
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
                ) : null}
              </>
            ) : null}
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
