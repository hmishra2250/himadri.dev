import { caseStudies } from "@/content/case-studies";
import { interviewAnswers } from "@/content/interview";
import { metrics } from "@/content/metrics";
import { notes } from "@/content/notes";
import { principles } from "@/content/principles";
import { profile } from "@/content/profile";
import { stackOpinions } from "@/content/stack-opinions";

export type PortfolioChunk = {
  id: string;
  title: string;
  sourceType:
    | "resume"
    | "case-study"
    | "principle"
    | "challenge"
    | "interview"
    | "metric"
    | "note";
  url: string;
  text: string;
  tags: string[];
  priority: number;
  confidentialityLevel: "public" | "sanitized";
};

export function buildPortfolioChunks(): PortfolioChunk[] {
  const chunks: PortfolioChunk[] = [];

  chunks.push({
    id: "profile-positioning",
    title: "Profile positioning",
    sourceType: "resume",
    url: "/resume",
    text: `${profile.name}. Role: ${profile.role}. ${profile.positioning} Best fit work includes agent-facing developer tools, AI product workflows, AI platform engineering, LLM systems architecture, and ML platform reliability.`,
    tags: ["role fit", "profile", "senior ai engineer", "llm systems"],
    priority: 10,
    confidentialityLevel: "public",
  });

  for (const metric of metrics) {
    chunks.push({
      id: `metric-${metric.id}`,
      title: metric.label,
      sourceType: "metric",
      url: metric.href ?? "/",
      text: `${metric.value} ${metric.label}. ${metric.context}`,
      tags: ["metric", metric.label.toLowerCase(), metric.value.toLowerCase()],
      priority: metric.priority,
      confidentialityLevel: "public",
    });
  }

  for (const study of caseStudies) {
    chunks.push({
      id: `case-${study.slug}`,
      title: study.title,
      sourceType: "case-study",
      url: `/case-studies#${study.slug}`,
      text: [
        study.title,
        study.subtitle,
        study.summary,
        study.problem,
        study.role,
        study.domains.join(" "),
        study.metrics.join(" "),
        study.architecture.join(" "),
        study.evaluation.join(" "),
        study.observability.join(" "),
        study.reflection,
      ].join(" "),
      tags: [study.company, ...study.domains, "case study"].map((item) =>
        item.toLowerCase(),
      ),
      priority: study.isFlagship ? 10 : 7,
      confidentialityLevel: "sanitized",
    });
  }

  for (const principle of principles) {
    chunks.push({
      id: `principle-${principle.id}`,
      title: principle.title,
      sourceType: "principle",
      url: principle.href ?? "/about",
      text: `${principle.title}. ${principle.statement}. Evidence: ${principle.evidence}`,
      tags: ["principle", principle.title.toLowerCase()],
      priority: 6,
      confidentialityLevel: "public",
    });
  }

  for (const opinion of stackOpinions) {
    chunks.push({
      id: `opinion-${opinion.id}`,
      title: opinion.title,
      sourceType: "principle",
      url: opinion.relatedHref,
      text: `${opinion.title}. ${opinion.statement}. ${opinion.nuance}. Evidence: ${opinion.evidence}`,
      tags: ["opinion", "production ai", opinion.id.replaceAll("-", " ")],
      priority: 7,
      confidentialityLevel: "public",
    });
  }

  for (const note of notes) {
    chunks.push({
      id: `note-${note.id}`,
      title: note.title,
      sourceType: "note",
      url: "/notes",
      text: [note.title, note.dek, ...note.body].join(" "),
      tags: ["note", note.id.replaceAll("-", " ")],
      priority: 7,
      confidentialityLevel: "public",
    });
  }

  for (const answer of interviewAnswers) {
    chunks.push({
      id: `interview-${answer.id}`,
      title: `Interview answer: ${answer.id}`,
      sourceType: "interview",
      url: answer.sourceCards[0]?.href ?? "/about",
      text: [answer.summary, ...answer.bullets].join(" "),
      tags: ["interview", "role fit", "answers"],
      priority: 8,
      confidentialityLevel: "public",
    });
  }

  return chunks;
}

export const portfolioChunks = buildPortfolioChunks();
