import type { Note } from "../src/content/notes";
import { notePublicLabel, notes } from "../src/content/notes";
import { validateNoteDraft } from "../src/lib/validation";

const baseNote: Note = {
  id: "negative-fixture",
  title: "Negative fixture",
  dek: "A controlled validation fixture.",
  body: ["This fixture should be overwritten by each negative case."],
  proofIds: ["representative-trace-label"],
  publicLabel: notePublicLabel,
  artifacts: [
    {
      title: "Representative fixture",
      kind: "representative",
      visibleLabel:
        "Representative sanitized fixture. Customer data and private prompts omitted.",
      description: "A public-safe fixture artifact.",
    },
  ],
  relatedLinks: [{ label: "Principles", href: "/principles" }],
};

const negativeCases: Array<{ name: string; note: Note; expected: string }> = [
  {
    name: "direct currency",
    note: {
      ...baseNote,
      body: ["This note claims a workflow saved $42,000 in a launch review."],
    },
    expected: "direct currency",
  },
  {
    name: "disabled route link",
    note: {
      ...baseNote,
      relatedLinks: [{ label: "Private packet", href: "/hiring-packet" }],
    },
    expected: "forbidden internal or disabled path",
  },
  {
    name: "missing artifact label",
    note: {
      ...baseNote,
      artifacts: [{ ...baseNote.artifacts[0], visibleLabel: "" }],
    },
    expected: "missing visible label",
  },
  {
    name: "unsupported metric-like claim",
    note: {
      ...baseNote,
      body: ["This note claims latency improved by 250ms."],
      proofIds: [],
    },
    expected: "metric-like claims",
  },
];

const errors: string[] = [];

for (const note of notes) {
  const noteErrors = validateNoteDraft(note);
  if (noteErrors.length > 0) {
    errors.push(`valid note ${note.id} failed: ${noteErrors.join("; ")}`);
  }
}

for (const testCase of negativeCases) {
  const noteErrors = validateNoteDraft(testCase.note);
  if (!noteErrors.some((error) => error.includes(testCase.expected))) {
    errors.push(
      `${testCase.name} did not produce expected error containing ${testCase.expected}. Actual: ${noteErrors.join("; ")}`,
    );
  }
}

if (errors.length > 0) {
  console.error("Notes validation self-test failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Notes validation self-test passed.");
