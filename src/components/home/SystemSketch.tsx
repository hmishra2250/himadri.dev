import type { ReactNode } from "react";

export type SystemSketchVariant =
  | "interface-consistency-brief"
  | "reviewed-ai-workflows-brief"
  | "browser-runtime-boundaries-brief";

type SystemSketchProps = {
  variant: SystemSketchVariant;
};

const sketches: Record<SystemSketchProps["variant"], ReactNode> = {
  "interface-consistency-brief": (
    <>
      <title id="sketch1-title">
        Representative surface consistency sketch
      </title>
      <desc id="sketch1-desc">
        CLI, MCP and SDK surfaces connected by a shared consistency reference
        line.
      </desc>
      <line className="cobalt" x1="44" y1="108" x2="332" y2="108" />
      <rect x="22" y="40" width="82" height="52" />
      <rect x="147" y="40" width="82" height="52" />
      <rect x="272" y="40" width="82" height="52" />
      <text x="63" y="71" textAnchor="middle">
        CLI
      </text>
      <text x="188" y="71" textAnchor="middle">
        MCP
      </text>
      <text x="313" y="71" textAnchor="middle">
        SDK
      </text>
      <path d="M63 92v16M188 92v16M313 92v16" />
    </>
  ),
  "reviewed-ai-workflows-brief": (
    <>
      <title id="sketch2-title">Representative reviewed workflow sketch</title>
      <desc id="sketch2-desc">
        Retrieved context, draft, claim checks and human review connected before
        readiness.
      </desc>
      <path d="M146 36H226M221 32l5 4-5 4M292 62V84M288 79l4 5 4-5M230 114H150M155 110l-5 4 5 4" />
      <path className="cobalt" d="M188 88v52M181 99h14M181 129h14" />
      <rect x="22" y="10" width="124" height="52" />
      <rect x="230" y="10" width="124" height="52" />
      <rect x="230" y="88" width="124" height="52" />
      <rect x="22" y="88" width="124" height="52" />
      <text x="84" y="32" textAnchor="middle">
        retrieved
      </text>
      <text x="84" y="50" textAnchor="middle">
        context
      </text>
      <text x="292" y="41" textAnchor="middle">
        draft
      </text>
      <text x="292" y="110" textAnchor="middle">
        claim
      </text>
      <text x="292" y="128" textAnchor="middle">
        checks
      </text>
      <text x="84" y="110" textAnchor="middle">
        human
      </text>
      <text x="84" y="128" textAnchor="middle">
        review
      </text>
    </>
  ),
  "browser-runtime-boundaries-brief": (
    <>
      <title id="sketch3-title">
        Representative request boundary and recovery sketch
      </title>
      <desc id="sketch3-desc">
        A request boundary, runtime relationship and recovery loop are shown
        without product guarantees.
      </desc>
      <rect x="22" y="40" width="124" height="52" />
      <rect x="230" y="40" width="124" height="52" />
      <path d="M146 66H230" />
      <path className="cobalt" d="M188 28v78" />
      <path d="M292 103c0 22-40 28-68 12M224 115l13-2-7 11" />
      <text x="84" y="62" textAnchor="middle">
        request
      </text>
      <text x="84" y="80" textAnchor="middle">
        entry
      </text>
      <text x="292" y="62" textAnchor="middle">
        runtime
      </text>
      <text x="292" y="80" textAnchor="middle">
        boundary
      </text>
    </>
  ),
};

const ariaLabelledBy: Record<SystemSketchProps["variant"], string> = {
  "interface-consistency-brief": "sketch1-title sketch1-desc",
  "reviewed-ai-workflows-brief": "sketch2-title sketch2-desc",
  "browser-runtime-boundaries-brief": "sketch3-title sketch3-desc",
};

export function SystemSketch({ variant }: SystemSketchProps) {
  return (
    <figure className="sketch-frame">
      <svg
        className="system-sketch"
        viewBox="0 0 376 150"
        role="img"
        aria-labelledby={ariaLabelledBy[variant]}
      >
        {sketches[variant]}
      </svg>
      <figcaption>Illustrative system sketch</figcaption>
    </figure>
  );
}
