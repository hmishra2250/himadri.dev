import {
  portfolioChunks,
  type PortfolioChunk,
} from "@/content/assistant/chunks";

const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "that",
  "with",
  "what",
  "how",
  "did",
  "does",
  "his",
  "himadri",
  "from",
  "into",
  "are",
  "you",
  "use",
  "why",
  "not",
]);

export function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9%!. -]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

export function retrievePortfolioChunks(
  question: string,
  limit = 4,
): PortfolioChunk[] {
  const terms = tokenize(question);
  if (terms.length === 0) return [];

  return portfolioChunks
    .map((chunk) => {
      const haystack =
        `${chunk.title} ${chunk.text} ${chunk.tags.join(" ")}`.toLowerCase();
      const score = terms.reduce((sum, term) => {
        if (haystack.includes(term)) return sum + 2;
        if (chunk.tags.some((tag) => tag.includes(term))) return sum + 3;
        return sum;
      }, chunk.priority / 10);
      return { chunk, score };
    })
    .filter((item) => item.score > 0.8)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);
}
