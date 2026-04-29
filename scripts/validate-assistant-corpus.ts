import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ASSISTANT_CORPUS_PATH } from "../src/lib/assistant/config";
import type { PortfolioChunk } from "../src/content/assistant/chunks";

const errors: string[] = [];
const path = join(process.cwd(), ASSISTANT_CORPUS_PATH);
if (!existsSync(path)) {
  errors.push(`assistant corpus missing: ${ASSISTANT_CORPUS_PATH}`);
} else {
  const chunks = JSON.parse(readFileSync(path, "utf8")) as PortfolioChunk[];
  if (chunks.length < 20)
    errors.push(`assistant corpus too small: ${chunks.length}`);
  const ids = new Set<string>();
  for (const chunk of chunks) {
    if (ids.has(chunk.id)) errors.push(`duplicate chunk id: ${chunk.id}`);
    ids.add(chunk.id);
    if (!chunk.title || !chunk.url || !chunk.text) {
      errors.push(`chunk missing required fields: ${chunk.id}`);
    }
    if (!["public", "sanitized"].includes(chunk.confidentialityLevel)) {
      errors.push(`chunk has invalid confidentiality: ${chunk.id}`);
    }
    if (
      /secret key|database password|proprietary prompt|exact internal cost/i.test(
        chunk.text,
      )
    ) {
      errors.push(`chunk contains disallowed private wording: ${chunk.id}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Assistant corpus validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Assistant corpus validation passed.");
