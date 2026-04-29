import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { portfolioChunks } from "../src/content/assistant/chunks";
import { ASSISTANT_CORPUS_PATH } from "../src/lib/assistant/config";

const outputPath = join(process.cwd(), ASSISTANT_CORPUS_PATH);
mkdirSync(dirname(outputPath), { recursive: true });
const json = JSON.stringify(portfolioChunks, null, 2);
writeFileSync(outputPath, `${json}\n`);
const hash = createHash("sha256").update(json).digest("hex");
console.log(`Assistant corpus written to ${ASSISTANT_CORPUS_PATH}`);
console.log(`corpusHash=sha256:${hash}`);
