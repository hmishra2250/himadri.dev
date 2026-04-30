"use client";

import { useState } from "react";
import { costModels } from "@/content/challenges";
import { trackPortfolioEvent } from "@/lib/analytics";

export function CostAnatomy() {
  const [selectedId, setSelectedId] = useState(costModels[0]?.id ?? "");
  const selected =
    costModels.find((model) => model.id === selectedId) ?? costModels[0];

  return (
    <section className="section-pad">
      <div className="container narrow">
        <p className="eyebrow">Cost Anatomy</p>
        <h1>AI unit economics as an architecture problem</h1>
        <p className="hero-subtitle">
          Toggle between representative workflow designs and inspect where cost
          units move when routing, sandbox reuse, retries, and judge coverage
          become explicit.
        </p>
        <p className="confidentiality-note">
          Representative model using normalized units. Customer data, private
          prompts, internal traces, and exact company costs omitted.
        </p>

        <div className="toggle-row" role="group" aria-label="Cost model states">
          {costModels.map((model) => (
            <button
              aria-pressed={model.id === selected.id}
              className={model.id === selected.id ? "toggle active" : "toggle"}
              key={model.id}
              onClick={() => {
                setSelectedId(model.id);
                trackPortfolioEvent("cost_model_toggled", {
                  route: "/challenges/cost-anatomy",
                  feature_id: model.id,
                });
              }}
              type="button"
            >
              {model.label}
            </button>
          ))}
        </div>

        <article className="cost-panel">
          <div>
            <p className="eyebrow">Selected model</p>
            <h2>{selected.label}</h2>
            <p>{selected.summary}</p>
          </div>
          <strong className="cost-total">{selected.totalUnits} units</strong>
        </article>

        <div className="cost-grid">
          {selected.categories.map((category) => (
            <div className="cost-row" key={category.label}>
              <strong>{category.label}</strong>
              <span>{category.units} units</span>
              <p>{category.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
