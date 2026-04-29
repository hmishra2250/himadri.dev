import { costModels, debugScenarios } from "@/content/challenges";
import { caseStudies } from "@/content/case-studies";
import { interviewAnswers } from "@/content/interview";
import { metrics } from "@/content/metrics";
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
    | "metric";
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
    text: `${profile.name} is a ${profile.role}. ${profile.positioning} Best fit roles include Senior AI Engineer, AI Platform Engineer, LLM Systems Architect, and Founding AI Engineer.`,
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

  for (const study of caseStudies.filter((item) => item.routeEnabled)) {
    chunks.push({
      id: `case-${study.slug}`,
      title: study.title,
      sourceType: "case-study",
      url: `/case-studies/${study.slug}`,
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
      url: principle.href ?? "/principles",
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

  for (const answer of interviewAnswers) {
    chunks.push({
      id: `interview-${answer.id}`,
      title: `Interview answer: ${answer.id}`,
      sourceType: "interview",
      url: "/interview-me",
      text: [answer.summary, ...answer.bullets].join(" "),
      tags: ["interview", "role fit", "answers"],
      priority: 8,
      confidentialityLevel: "public",
    });
  }

  for (const scenario of debugScenarios) {
    chunks.push({
      id: `debug-${scenario.id}`,
      title: scenario.title,
      sourceType: "challenge",
      url: "/challenges/debug-this-agent",
      text: `${scenario.title}. ${scenario.symptom}. ${scenario.diagnosis}. ${scenario.fix}`,
      tags: ["debugging", "agent trace", "model routing", "challenge"],
      priority: 8,
      confidentialityLevel: "sanitized",
    });
  }

  chunks.push({
    id: "cost-anatomy",
    title: "Cost Anatomy",
    sourceType: "challenge",
    url: "/challenges/cost-anatomy",
    text: `Cost Anatomy uses representative normalized units. ${costModels
      .map(
        (model) =>
          `${model.label}: ${model.totalUnits} units. ${model.summary}`,
      )
      .join(" ")}`,
    tags: ["cost", "unit economics", "normalized units", "challenge"],
    priority: 8,
    confidentialityLevel: "sanitized",
  });

  return chunks;
}

export const portfolioChunks = buildPortfolioChunks();
