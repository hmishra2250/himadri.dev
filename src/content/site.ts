import type { ProofClaimId } from "./proof";

/**
 * Everything the one-page site says, in reading order.
 *
 * To add a side project, put a new entry at the top of `now.also`: one line,
 * and a link once the repository is public. Company-specific statements and
 * numbers carry a `proof` id from ./proof.ts.
 */

export type Segment = string | { text: string; href: string };

export type ExternalLink = {
  label: string;
  href: string;
};

export type OneLiner = {
  name: string;
  /** Omit while the repository is private; the name then renders as text */
  href?: string;
  line: string;
  /** Short mono note, e.g. a year or a star count */
  meta?: string;
  proof?: ProofClaimId;
};

export type PullRequest = {
  repo: string;
  number: number;
  /** Plain-language summary of what the change did */
  summary: string;
};

export type TimelineEntry = {
  years: string;
  name: string;
  line: string;
  proof: ProofClaimId;
};

const github = "https://github.com/hmishra2250";

export const links = {
  github,
  linkedin: "https://www.linkedin.com/in/hmishra2250/",
  x: "https://x.com/hmishra2250",
  agentExperience: "https://agentexperience.tech/",
  resume: "/resume",
  firecrawlPullRequests:
    "https://github.com/pulls?q=is%3Apr+author%3Ahmishra2250+org%3Afirecrawl+is%3Amerged",
} as const;

export const pullRequestUrl = (pr: PullRequest) =>
  `https://github.com/firecrawl/${pr.repo}/pull/${pr.number}`;

export const hero = {
  name: "Himadri Mishra",
  role: "AI engineer",
  location: "Remote, India",
  punchline: "I build agents, and the MCP servers, CLIs and SDKs they run on.",
  facts:
    "AI engineer, 8+ years. I build AI products at Mudita Studios and work on Agent Experience in the open. Previously at Firecrawl.",
  proof: "resume-summary" satisfies ProofClaimId,
};

export type ShippedItem = {
  when: string;
  text: string;
  /** Where the evidence lives: a public link or a homepage section */
  href: string;
  source: string;
  proof?: ProofClaimId;
};

/** The hero's proof panel: one line per item, newest first. */
export const shipped = {
  label: "Shipped in 2026",
  items: [
    {
      when: "Now",
      text: "Main engineer on a production AI product whose answers cite their sources",
      href: "/#now",
      source: "Mudita Studios",
      proof: "mudita-main-engineer",
    },
    {
      when: "Sep",
      text: "A field guide to Agent Experience, a readiness rubric and a public MCP server",
      href: "https://agentexperience.tech/",
      source: "agentexperience.tech",
      proof: "public-agent-experience-guide",
    },
    {
      when: "Jul",
      text: "A coding agent, built from an empty repository, that turns a chat or ticket request into a reviewed pull request",
      href: "/#now",
      source: "Mudita Studios",
      proof: "mudita-coding-agent",
    },
    {
      when: "Jul",
      text: "Rewrote Firecrawl's hosted MCP server, which its Claude and Codex connectors run on",
      href: "https://github.com/firecrawl/firecrawl-mcp-server/pull/308",
      source: "Firecrawl, open source",
      proof: "firecrawl-hosted-mcp-endpoints",
    },
  ] satisfies ShippedItem[],
};

export const now = {
  title: "What I work on.",
  mudita: {
    name: "Mudita Studios",
    meta: "AI Product Engineer · since May 2026",
    items: [
      "Built a coding agent from an empty repository: a Slack or Jira request becomes a tested draft pull request, checked in a real browser and by a second model before a person reviews it.",
      "Main engineer on a production AI product whose answers cite their sources: its data connectors, the end-to-end test harness and release gates, and security hardening.",
      "Set up the delivery platform for a second product: CI/CD, preview environments and daily browser smoke tests.",
    ],
    proof: [
      "mudita-coding-agent",
      "mudita-main-engineer",
      "mudita-delivery-platform",
    ] satisfies ProofClaimId[],
  },
  agentExperience: {
    name: "Agent Experience, in the open",
    meta: "How agents find, use and recover with the tools they are given",
    proof: "public-agent-experience-guide" satisfies ProofClaimId,
    items: [
      [
        { text: "agentexperience.tech", href: "https://agentexperience.tech/" },
        ": my field guide, with an ",
        {
          text: "agent-readiness rubric",
          href: "https://agentexperience.tech/insights/agent-readiness-rubric/",
        },
        " and guides on ",
        {
          text: "tool descriptions",
          href: "https://agentexperience.tech/insights/tool-descriptions/",
        },
        " and ",
        {
          text: "designing for recovery",
          href: "https://agentexperience.tech/insights/design-for-recovery/",
        },
        ".",
      ],
      [
        "A public, read-only MCP server any agent can query. ",
        { text: "Connect", href: "https://agentexperience.tech/connect/" },
        ".",
      ],
      [
        {
          text: "Test cases for MCP tool descriptions",
          href: "https://agentexperience.tech/resources/mcp-tool-description-test-cases/",
        },
        ".",
      ],
      [
        {
          text: "awesome-agent-experience",
          href: `${github}/awesome-agent-experience`,
        },
        ": sources on tool use, discovery and evaluation.",
      ],
    ] satisfies Segment[][],
  },
  alsoLabel: "Also",
  also: [
    {
      name: "Talkies",
      line: "Local dictation and meeting transcription for Linux: hold a key, speak, and the text lands where you are typing. No audio leaves the machine.",
      meta: "2026",
    },
    {
      name: "laptop-powersave",
      line: "Battery tiers for a laptop that doubles as an always-on server: it caps the CPU on battery and releases the GPU without a reboot.",
      meta: "2026",
    },
    {
      name: "cctv-edge",
      line: "A local-first CCTV console with live view and on-device object detection, built to run on a Raspberry Pi 5.",
      meta: "2026",
    },
    {
      name: "Qwen3.6-35B on an 8 GB laptop GPU",
      href: `${github}/qwen-3.6-35b-consumer-gpu`,
      line: "43 tokens per second with 128K context, with launch scripts, a tuning guide and a coding benchmark.",
      meta: "2026",
      proof: "public-consumer-gpu-inference",
    },
    {
      name: "ubuntu-maclike-touchpad",
      href: `${github}/ubuntu-maclike-touchpad`,
      line: "macOS-style touchpad gestures on Ubuntu: three-finger drag, four-finger workspace switching and pinch zoom.",
      meta: "2026",
    },
  ] satisfies OneLiner[],
};

/** One point inside a work card; an optional lead-in label. */
export type WorkPoint = { label?: string; text: string };

export type WorkCard = {
  title: string;
  meta?: string;
  /** What it is and why it mattered, in two or three sentences */
  story?: string;
  points: WorkPoint[];
  prs: PullRequest[];
  /** Full-width card for the largest pieces of work */
  wide?: boolean;
  proof: ProofClaimId[];
};

export const firecrawl = {
  label: "Previously",
  title: "Agent Experience at Firecrawl.",
  intro:
    "From May to September 2026 I owned Agent Experience at Firecrawl: whether coding agents find it, choose it and use it correctly.",
  proof: ["firecrawl-programme"] satisfies ProofClaimId[],
  cards: [
    {
      title: "The Agent Experience harness",
      meta: "Built from the first commit",
      story:
        "The lab behind the programme. It runs real coding agents (Claude Code, Codex, Cursor, OpenCode and others, on several models) in sandboxes against any version of Firecrawl's MCP server, CLI, SDKs and skills. The rule was that every release goes through an A/B test first, and for every launch it uncovered issues that went into the product.",
      points: [
        {
          label: "Daily discoverability",
          text: "runs across six agent lanes, on a dashboard whose discovery metric fed the company's top-of-funnel goals.",
        },
        {
          label: "Weekly Deep Insights",
          text: "reads every trace of the week, judges the pages agents read, and checks each quote against the raw runs.",
        },
        {
          label: "Retrievability",
          text: "shows where Firecrawl's pages rank for the questions agents search, through Firecrawl and a search-results API.",
        },
        {
          label: "Experiments",
          text: "pin the builds under test and use judges, cost caps and false-discovery-rate control.",
        },
        {
          label: "Access",
          text: "from a CLI, the dashboard, or the company's knowledge system, where other teams and their agents query results and draft experiments.",
        },
      ],
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 340,
          summary: "A/B test of neutral tool descriptions",
        },
        {
          repo: "skills",
          number: 10,
          summary: "A/B results for the research-index skill",
        },
      ],
      wide: true,
      proof: ["firecrawl-measurement", "firecrawl-harness"],
    },
    {
      title: "The hosted MCP server, rebuilt",
      meta: "Jul 2026",
      story:
        "The hosted server mixed API keys in URLs with an OAuth flow that was wired in wrong, and sign-in failed often. I rebuilt it from first principles on Firecrawl's OAuth, reusing what worked: the grants database, separate keyless and account endpoints, delegated credentials, infrastructure and CLI setup, shipped as one train of pull requests. It serves Firecrawl's Claude and Codex connectors.",
      points: [
        {
          label: "Leaner",
          text: "A/B tested before and after: half the tokens an agent loads from the server, with no loss in task success.",
        },
        {
          label: "Keyless",
          text: "agents start without an account, and when a tool needs one they finish with the keyless tools or hand the person a clear next step.",
        },
        {
          label: "Fewer errors",
          text: "sign-in no longer falls back to keys in URLs, and an invalid key no longer returns an empty tool list.",
        },
      ],
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 308,
          summary: "Keyless and account endpoints",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 332,
          summary: "OAuth-only search endpoint",
        },
        {
          repo: "firecrawl",
          number: 3973,
          summary: "MCP activity and OAuth revocation",
        },
        { repo: "cli", number: 155, summary: "Secure MCP credential setup" },
        {
          repo: "firecrawl-docs",
          number: 1158,
          summary: "Hosted connection modes",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 363,
          summary: "Keyless recovery",
        },
      ],
      wide: true,
      proof: [
        "firecrawl-hosted-mcp",
        "firecrawl-hosted-mcp-endpoints",
        "firecrawl-connectors",
        "firecrawl-neutral-metadata",
        "firecrawl-hosted-mcp-rebuild",
      ],
    },
    {
      title: "Launches, tool calls and recovery",
      points: [
        {
          label: "Launches",
          text: "Agent Experience DRI for Life Sciences, Developer Index, and Government and Legal. With the Life Sciences skill, agents reached the new paper index in 100% of test runs, up from 0%.",
        },
        {
          label: "Tool calls",
          text: "Claude Code sent 0% → 100% of searches to Firecrawl for MCP users (Codex: 0% → 67%).",
        },
        {
          label: "Recovery",
          text: "spent limits and wrong keys now tell the agent how to recover instead of ending the task.",
        },
      ],
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 368,
          summary: "Separate the paper tools from the research category",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 380,
          summary: "Name the developer index",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 240,
          summary: "Routing instructions for agents",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 365,
          summary: "Invalid-key recovery",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 359,
          summary: "Recovery links",
        },
        { repo: "firecrawl", number: 4211, summary: "Quota recovery details" },
      ],
      proof: [
        "firecrawl-launch-dri",
        "firecrawl-index-skill",
        "firecrawl-routing-instructions",
      ],
    },
    {
      title: "Insights that reached production",
      story:
        "Fixes from the daily runs, retrievability and Deep Insights, shipped across the docs, the API and the website.",
      points: [
        {
          text: "Pricing, billing and benchmark pages that agents quoted wrongly now state them correctly.",
        },
        {
          text: "Docs agents copy from: samples run in CI, API names left untranslated, legacy pages dated, and the capabilities page linked.",
        },
        { text: "API errors come back as JSON instead of HTML pages." },
        {
          text: "Website pricing and benchmark content rewritten as text agents can read.",
        },
      ],
      prs: [
        {
          repo: "firecrawl-docs",
          number: 1363,
          summary: "Benchmark date and scope",
        },
        {
          repo: "firecrawl-docs",
          number: 1370,
          summary: "Failed-request billing",
        },
        { repo: "firecrawl-docs", number: 1365, summary: "Crawl accounting" },
        { repo: "firecrawl-docs", number: 1380, summary: "Docs CI" },
        {
          repo: "firecrawl-docs",
          number: 1393,
          summary: "Untranslated API identifiers",
        },
        { repo: "firecrawl", number: 4552, summary: "JSON errors" },
      ],
      proof: ["firecrawl-insight-fixes"],
    },
  ] satisfies WorkCard[],
};

export const before = {
  label: "Before that",
  title: "Production ML, before agents.",
  timeline: [
    {
      years: "2025-2026",
      name: "Knit",
      line: "Senior AI Engineer. Architected the AI pipeline of the research platform: the shared core library, data ingestion, the analysis and memo pipeline, and agentic deck generation. Report turnaround went from 2-3 days to under an hour.",
      proof: "knit-turnaround",
    },
    {
      years: "2023-2024",
      name: "Epic! for Kids",
      line: "Senior Research Engineer. Search, recommendations and the ML platform behind them.",
      proof: "epic-search",
    },
    {
      years: "2019-2023",
      name: "Osmo",
      line: "Senior Research Engineer. Computer vision for educational worksheets, across India and US teams.",
      proof: "osmo-cv",
    },
    {
      years: "2018-2019",
      name: "Whodat",
      line: "Deep Learning Engineer. A C++ visual feature detector for augmented reality.",
      proof: "whodat-vision",
    },
    {
      years: "2013-2018",
      name: "IIT (BHU) Varanasi",
      line: "Computer Science. SN Bose Scholar: research intern at UC Berkeley with Professor Dawn Song.",
      proof: "education-sn-bose",
    },
  ] satisfies TimelineEntry[],
  openSourceLabel: "Earlier open source",
  openSource: [
    {
      name: "NTM-One-Shot-TF",
      href: `${github}/NTM-One-Shot-TF`,
      line: "One-shot learning with memory-augmented neural networks, in TensorFlow.",
      meta: "238 stars",
    },
    {
      name: "Botnet-Detection-using-Machine-Learning",
      href: `${github}/Botnet-Detection-using-Machine-Learning`,
      line: "My bachelor's project.",
      meta: "178 stars",
    },
    {
      name: "Parallel-Youtube-Titles-to-MP3",
      href: `${github}/Parallel-Youtube-Titles-to-MP3`,
      line: "Search YouTube by title and save the audio as tagged MP3s, in parallel.",
      meta: "14 stars",
    },
  ] satisfies OneLiner[],
};

export type SocialId = "github" | "linkedin" | "x";

/** Shown as icons in the header and with names in the footer. */
export const socials = [
  { id: "github", label: "GitHub", href: links.github },
  { id: "linkedin", label: "LinkedIn", href: links.linkedin },
  { id: "x", label: "X", href: links.x },
] as const satisfies readonly { id: SocialId; label: string; href: string }[];

export const footer = {
  role: "AI engineer. Agents, MCP servers, CLIs and SDKs.",
  elsewhere: [
    { label: "Agent Experience", href: links.agentExperience },
  ] satisfies ExternalLink[],
};

export const sections = [
  { id: "now", label: "Now" },
  { id: "firecrawl", label: "Previously" },
  { id: "before", label: "Before that" },
] as const;
