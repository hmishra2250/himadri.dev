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

const resume = "public/resume/Himadri_Mishra_Resume.pdf";

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
      "Drove the hosted MCP overhaul across seven repositories: separate keyless and OAuth paths, an OAuth-only search endpoint, and onboarding that adapts to each coding agent.",
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
      "Rewrote the MCP tool descriptions in neutral terms for the OpenAI tool-metadata review; a paired A/B test found task success equivalent to the baseline.",
    sourcePath: "https://github.com/firecrawl/firecrawl-mcp-server/pull/340",
    sourceLocator: "Pull request description, AX R02 confirmation",
    sourceType: "public-profile",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-retrievability",
    claim:
      "Built retrievability tracking: searches through Firecrawl and a search-results API to see where Firecrawl's pages rank for the questions agents ask, and which pages need SEO work.",
    sourcePath: "Firecrawl Agent Experience work, May to September 2026",
    sourceLocator: "Retrievability system",
    sourceType: "work-record",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-market-intelligence",
    claim:
      "Built market intelligence that tracks competitors' launches, posts, repositories and events on one timeline.",
    sourcePath: "Firecrawl Agent Experience work, May to September 2026",
    sourceLocator: "Competitor intelligence system",
    sourceType: "work-record",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "firecrawl-company-knowledge",
    claim:
      "Connected Agent Experience findings and experiment results to the company's internal knowledge system.",
    sourcePath: "Firecrawl Agent Experience work, May to September 2026",
    sourceLocator: "Knowledge system provider",
    sourceType: "work-record",
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
      "Built a daily benchmark of whether agents recommend and correctly use Firecrawl, whose discovery metric joined the Q3 top-of-funnel dashboard; weekly reports with quote-checked findings; and a sandboxed experiment harness with traces, cost caps and false-discovery-rate control.",
    sourcePath: resume,
    sourceLocator: "Firecrawl, bullets 2, 3 and 6",
    sourceType: "resume",
    confidentialityLevel: "public",
    approvedForPublicUse: true,
  },
  {
    id: "knit-turnaround",
    claim:
      "Built an agentic research platform that cut report turnaround from 2-3 days to under an hour.",
    sourcePath: resume,
    sourceLocator: "Knit, bullet 1",
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
