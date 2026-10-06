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

export type Outcome = {
  value: string;
  label: string;
  proof: ProofClaimId;
  /** Pull requests that delivered the result, when public */
  prs?: PullRequest[];
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
  note: "A few highlights. The full record is below.",
  items: [
    {
      when: "Now",
      text: "Main engineer on a production AI product whose answers cite their sources",
      href: "/#now",
      source: "Mudita Studios",
      proof: "mudita-main-engineer",
    },
    {
      when: "Jul",
      text: "A coding agent, built from an empty repository, that turns a chat or ticket request into a reviewed pull request",
      href: "/#now",
      source: "Mudita Studios",
      proof: "mudita-coding-agent",
    },
    {
      when: "Aug",
      text: "Agents reached Firecrawl's paper index in 48 of 48 test runs, up from 0, after a six-repository launch in one day",
      href: "https://github.com/firecrawl/skills/pull/10",
      source: "Firecrawl, open source",
      proof: "firecrawl-index-skill",
    },
    {
      when: "Sep",
      text: "A field guide to Agent Experience, a readiness rubric and a public MCP server",
      href: "https://agentexperience.tech/",
      source: "agentexperience.tech",
      proof: "public-agent-experience-guide",
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
    note: "Client work is private, so I describe what it does.",
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
      meta: "Private repo",
    },
    {
      name: "laptop-powersave",
      line: "Battery tiers for a laptop that doubles as an always-on server: it caps the CPU on battery and releases the GPU without a reboot.",
      meta: "Private repo",
    },
    {
      name: "cctv-edge",
      line: "A local-first CCTV console with live view and on-device object detection, built to run on a Raspberry Pi 5.",
      meta: "Private repo",
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

export type Launch = {
  title: string;
  line: string;
  prs: PullRequest[];
};

export const firecrawl = {
  label: "Previously",
  title: "Agent Experience at Firecrawl.",
  intro:
    "From May to September 2026 I owned the Agent Experience programme: measuring whether AI agents find, choose and correctly use Firecrawl, then shipping the fixes across its MCP server, CLI, SDKs, docs and website.",
  proof: "firecrawl-programme" satisfies ProofClaimId,
  outcomes: [
    {
      value: "15 / 15",
      label:
        "Claude Code trials that chose Firecrawl over its built-in web search after I added routing instructions to the MCP server",
      proof: "firecrawl-routing-instructions",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 240,
          summary: "Routing instructions for agents",
        },
      ],
    },
    {
      value: "0 → 48 / 48",
      label:
        "Test runs where agents reached the research paper index, before and after the skill shipped",
      proof: "firecrawl-index-skill",
      prs: [
        {
          repo: "skills",
          number: 10,
          summary: "Deliver the research-index skill",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 368,
          summary: "Separate the paper tools from the research category",
        },
      ],
    },
    {
      value: "21",
      label:
        "Fixes to docs, website and API in one week, each traced to a finding in the weekly agent reports I built",
      proof: "firecrawl-insights-to-fixes",
      prs: [
        {
          repo: "firecrawl",
          number: 4552,
          summary: "JSON answers for unknown API paths",
        },
        {
          repo: "firecrawl-docs",
          number: 1365,
          summary: "Crawl accounting matched to the API",
        },
      ],
    },
  ] satisfies Outcome[],
  launchesLabel: "What shipped",
  launches: [
    {
      title: "Hosted MCP for every way agents connect",
      line: "A keyless trial, OAuth sign-in for connector directories, and an OAuth-only search profile for the marketplace, across seven repositories, without breaking existing users.",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 308,
          summary: "Hosted endpoints",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 332,
          summary: "OAuth-only search",
        },
        { repo: "cli", number: 155, summary: "Secure setup" },
      ],
    },
    {
      title: "Errors an agent can recover from",
      line: "Quota, invalid-key and account-only failures now tell the agent what to do next, in the text it actually reads.",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 359,
          summary: "Recovery links",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 365,
          summary: "Invalid-key recovery",
        },
        { repo: "firecrawl", number: 4211, summary: "Quota recovery details" },
      ],
    },
    {
      title: "Tool text written for agents",
      line: "Neutral tool descriptions guarded in CI, deprecated tools hidden with migration guidance, and SDK fixes for calls agents often get wrong.",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 340,
          summary: "Neutral metadata",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 361,
          summary: "Extract deprecation",
        },
        {
          repo: "firecrawl",
          number: 3579,
          summary: "SDK error agents can read",
        },
      ],
    },
    {
      title: "Docs that match the product",
      line: "Removed documentation for tools that did not exist, aligned billing and crawl rules with the API, and added CI that runs the code samples.",
      prs: [
        { repo: "firecrawl-docs", number: 1380, summary: "Docs CI" },
        { repo: "firecrawl-docs", number: 1234, summary: "Setup by outcome" },
      ],
    },
  ] satisfies Launch[],
  notPublicProof: "firecrawl-not-public" satisfies ProofClaimId,
  notPublic:
    "The measurement behind these changes: a daily benchmark of whether six coding agents choose Firecrawl, weekly reports with every quote checked against the raw run, and a sandboxed experiment harness.",
};

export const before = {
  label: "Before that",
  title: "Production ML, before agents.",
  timeline: [
    {
      years: "2025-2026",
      name: "Knit",
      line: "Senior AI Engineer. Built the agentic research platform that cut report turnaround from 2-3 days to under an hour.",
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
  privacy:
    "Some of my work is private. I share the ideas, not client code, names or internal results.",
  elsewhere: [
    { label: "Agent Experience", href: links.agentExperience },
  ] satisfies ExternalLink[],
};

export const sections = [
  { id: "now", label: "Now" },
  { id: "firecrawl", label: "Previously" },
  { id: "before", label: "Before that" },
] as const;
