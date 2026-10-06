/**
 * Approved sources for every company-specific statement and number on the site.
 * Content in ./site.ts references these by id; scripts/validate-content.ts fails
 * the build when a reference is missing, unapproved or not public.
 */

export type SourceType = "resume" | "public-profile";

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
      "Built a daily benchmark of whether agents recommend and correctly use Firecrawl, weekly reports with quote-checked findings, and a sandboxed experiment harness.",
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
