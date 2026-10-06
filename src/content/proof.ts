/**
 * Approved sources for every company-specific statement and number on the site.
 * Content in ./site.ts references these by id; scripts/validate-content.ts fails
 * the build when a reference is missing, unapproved or not public.
 *
 * Source types:
 * - resume: the published resume PDF
 * - public-profile: a public page or pull request (an https URL)
 * - work-record: the owner's description of private work, by what it does.
 *   It may not carry figures; every number needs a resume or public source.
 * Resume locators point at the two-page CV (public/resume/Himadri_Mishra_CV.pdf).
 */

export type SourceType = "resume" | "public-profile" | "work-record";

export type ConfidentialityLevel = "public" | "private-do-not-publish";

export type ProofClaim = {
  id: string;
  claim: string;
  sourcePath: string;
  sourceLocator: string;
  sourceType: SourceType;
  confidentialityLevel: ConfidentialityLevel;
  approvedForPublicUse: boolean;
};

/** The two-page CV is the complete record; the one-page resume carries a subset of it. */
const resume = "public/resume/Himadri_Mishra_CV.pdf";

export const proofClaims = [
  {
    id: "resume-summary",
    claim:
      "AI engineer since 2018. Builds AI products at Mudita Studios, works on Agent Experience in the open, and previously owned the Agent Experience programme at Firecrawl.",
    sourcePath: resume,
    sourceLocator: "Summary",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "mudita-coding-agent",
    claim:
      "Built a coding agent from an empty repository that turns Slack and Jira requests into GitHub draft pull requests, with sandboxed execution, browser checks, a second-model judge and human review.",
    sourcePath: resume,
    sourceLocator: "Mudita Studios, bullets 2 and 3",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "mudita-main-engineer",
    claim:
      "Main engineer on a research product in production: data connectors, source-backed answers, claim checks, citation regression tests, and the end-to-end test harness and release gates.",
    sourcePath: resume,
    sourceLocator: "Mudita Studios, bullet 4",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "mudita-delivery-platform",
    claim:
      "Set up the delivery platform for a second product: CI/CD, preview environments and daily smoke tests.",
    sourcePath: resume,
    sourceLocator: "Mudita Studios, bullet 5",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-routing-instructions",
    claim:
      "Before the routing instructions, 0% of search queries from MCP-only users went to Firecrawl; after them, Claude Code used Firecrawl instead of its built-in web search in 100% of trials and Codex used Firecrawl in 67%.",
    sourcePath: "https://github.com/firecrawl/firecrawl-mcp-server/pull/240",
    sourceLocator: "Pull request description, test results",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-index-skill",
    claim:
      "With the research-index skill installed, agents reached the paper index in 100% of biomedical test runs, against 0% without it.",
    sourcePath: "https://github.com/firecrawl/skills/pull/10",
    sourceLocator: "Pull request description, measured results",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-hosted-mcp",
    claim:
      "Rebuilt the hosted MCP server from first principles on Firecrawl OAuth, replacing API keys in URLs and a mis-wired sign-in: grants database, keyless and account endpoints, and infrastructure. It serves the Claude and Codex connectors and loads half the tokens with no loss in task success.",
    sourcePath: resume,
    sourceLocator: "Firecrawl, bullet 4",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-hosted-mcp-endpoints",
    claim:
      "Shipped the hosted MCP server's keyless endpoint and its account endpoint with OAuth, then an OAuth-only search endpoint for connector directories.",
    sourcePath: "https://github.com/firecrawl/firecrawl-mcp-server/pull/308",
    sourceLocator: "Pull request #308 and #332 descriptions",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-connectors",
    claim:
      "Firecrawl's Claude and Codex connectors run on the hosted MCP account endpoint with OAuth.",
    sourcePath:
      "https://www.firecrawl.dev/blog/best-mcp-servers-for-developers",
    sourceLocator:
      "FAQ: account OAuth works with interactive clients like Claude and Codex",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-neutral-metadata",
    claim:
      "Rewrote the MCP tool descriptions in neutral terms for the OpenAI tool-metadata review, halving the tool-metadata tokens an agent loads; a paired A/B test found task success equivalent to the baseline.",
    sourcePath: "https://github.com/firecrawl/firecrawl-mcp-server/pull/340",
    sourceLocator:
      "Pull request description (A/B result); token sizes from the merged commit against its parent",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-harness",
    claim:
      "Built the Agent Experience harness from its first commit: real coding agents in sandboxes against any version of the MCP server, CLI, SDKs and skills; daily discoverability runs on a dashboard that fed the company's top-of-funnel goals; weekly Deep Insights; retrievability; experiments with judges, cost caps and false-discovery-rate control; access from a CLI, the dashboard and the company's knowledge system. The rule was that every release goes through an A/B test first.",
    sourcePath: "Firecrawl Agent Experience work, May to September 2026",
    sourceLocator: "Owner's account; agent-experience history",
    sourceType: "work-record",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-hosted-mcp-rebuild",
    claim:
      "Rebuilt the hosted MCP server from first principles on Firecrawl's OAuth, replacing a mix of API keys in URLs and a mis-wired OAuth flow; sign-in errors fell.",
    sourcePath: "Firecrawl Agent Experience work, May to September 2026",
    sourceLocator: "Owner's account; hosted MCP pull request train",
    sourceType: "work-record",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-insight-fixes",
    claim:
      "Shipped the fixes the insights found: pricing, billing, and benchmark pages agents cite, docs samples run in CI, JSON API errors, and recovery messages that tell agents how to handle spent limits and wrong keys.",
    sourcePath: resume,
    sourceLocator: "Firecrawl, bullet 6",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-launch-dri",
    claim:
      "Agent Experience DRI for the Developer Index, Life Sciences, and Government and Legal launches.",
    sourcePath: resume,
    sourceLocator: "Firecrawl, bullet 5",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-programme",
    claim:
      "Owned the Agent Experience programme at Firecrawl: measuring and improving how AI agents discover, choose and correctly use Firecrawl.",
    sourcePath: resume,
    sourceLocator: "Firecrawl, bullet 1",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-measurement",
    claim:
      "Built the Agent Experience harness from the first commit, with judges, cost caps and false-discovery-rate control, and A/B tests before releases; built daily discoverability runs, retrievability tracking and weekly Deep Insights checked against raw agent runs, whose discovery metric joined the Q3 top-of-funnel dashboard.",
    sourcePath: resume,
    sourceLocator: "Firecrawl, bullets 2 and 3",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "knit-turnaround",
    claim:
      "Architected the AI pipeline of the Knit research platform and wrote its core: the shared library, data ingestion, the analysis pipeline and agentic deck generation. Survey data becomes checked insights, memos and decks, cutting report turnaround from 2-3 days to under an hour.",
    sourcePath: resume,
    sourceLocator: "Knit, bullets 1 to 4",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "epic-search",
    claim:
      "Owned machine learning pipelines for discovery, recommendations and search.",
    sourcePath: resume,
    sourceLocator: "Epic! for Kids, bullet 1",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "osmo-cv",
    claim:
      "Led computer vision work for educational worksheets across India and US teams.",
    sourcePath: resume,
    sourceLocator: "Tangible Play (Osmo), bullet 1",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "whodat-vision",
    claim: "Built a C++ visual feature detector for augmented reality.",
    sourcePath: resume,
    sourceLocator: "Whodat",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "education-sn-bose",
    claim:
      "IIT (BHU) Varanasi, Computer Science and Engineering; SN Bose Scholar and UC Berkeley research intern with Professor Dawn Song.",
    sourcePath: resume,
    sourceLocator: "Education and recognition",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "public-agent-experience-guide",
    claim:
      "Publishes the Agent Experience field guide, an agent-readiness rubric and a public read-only MCP server.",
    sourcePath: "https://agentexperience.tech/",
    sourceLocator: "Home page, rubric and connect pages",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "public-consumer-gpu-inference",
    claim:
      "Ran Qwen3.6-35B at 43 tokens per second with 128K context on an 8 GB laptop GPU and published the scripts, guide and benchmark.",
    sourcePath: "https://github.com/hmishra2250/qwen-3.6-35b-consumer-gpu",
    sourceLocator: "README",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
] as const satisfies readonly ProofClaim[];

export type ProofClaimId = (typeof proofClaims)[number]["id"];

export const claimById = (id: ProofClaimId): ProofClaim => {
  const claim = proofClaims.find((entry) => entry.id === id);
  if (!claim) {
    throw new Error(`Unknown proof claim: ${id}`);
  }
  return claim;
};
