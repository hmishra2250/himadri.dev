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

export const now = {
  title: "What I work on.",
  mudita: {
    name: "Mudita Studios",
    meta: "AI Product Engineer · since May 2026",
    items: [
      "A coding agent that takes a Slack or Jira request to a tested, reviewed draft pull request. It works in a sandbox, tests its change in a real browser, and a second model checks the result before a person reviews it.",
      "A research product in production where every claim in a report cites a source or is marked unverifiable, on a sandboxed agent runtime with spend limits and tracing.",
    ],
    note: "Client work is private, so I describe what it does.",
    proof: [
      "mudita-coding-agent",
      "mudita-research-product",
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
      line: "Local dictation and meeting transcription for Linux. Hold a key, speak, and the text is pasted where you are typing; Whisper runs on my own GPU, so no audio leaves the machine.",
      meta: "Private repo",
    },
    {
      name: "laptop-powersave",
      line: "Battery tiers for a laptop that doubles as an always-on server. Losing AC power caps the CPU and powers down idle devices on its own; one command then releases the GPU without a reboot.",
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

export const firecrawl = {
  label: "Previously",
  title: "Agent Experience at Firecrawl.",
  intro:
    "From May to September 2026 I owned the Agent Experience programme: measuring how agents discover and use Firecrawl, and shipping the fixes across its open-source MCP server, CLI, SDKs and docs.",
  proof: "firecrawl-programme" satisfies ProofClaimId,
  outcomes: [
    {
      value: "21% → 100%",
      label: "Agent discovery rate, 158-run experiment",
      proof: "firecrawl-discovery-and-skills",
    },
    {
      value: "3% → 82%",
      label: "Skill delivery rate",
      proof: "firecrawl-discovery-and-skills",
    },
    {
      value: "0% → 100%",
      label: "Life Sciences index adoption after a tool-naming fix, 48 runs",
      proof: "firecrawl-index-adoption",
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
  ] satisfies Outcome[],
  pullRequestCount: 87,
  repositoryCount: 6,
  groups: [
    {
      title: "Hosted MCP access",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 332,
          summary: "An OAuth-only search profile for the hosted server",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 308,
          summary: "Deterministic keyless and account endpoints",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 304,
          summary: "Moved the server onto upstream FastMCP",
        },
        {
          repo: "cli",
          number: 155,
          summary: "Secure credential setup for hosted MCP in the CLI",
        },
      ],
    },
    {
      title: "Errors an agent can recover from",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 359,
          summary: "Recovery links in the message text agents actually read",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 365,
          summary: "Invalid-key recovery that reaches the agent",
        },
        {
          repo: "firecrawl",
          number: 4552,
          summary: "JSON answers for unknown and wrong-method API paths",
        },
        {
          repo: "firecrawl",
          number: 3579,
          summary:
            "A helpful SDK error when an agent reads the wrong search field",
        },
      ],
    },
    {
      title: "Tools and docs written for agents",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 361,
          summary: "Hid the deprecated Extract tool, with migration guidance",
        },
        {
          repo: "firecrawl-docs",
          number: 1380,
          summary: "Docs checks in CI, with a lint that runs the code samples",
        },
        {
          repo: "firecrawl",
          number: 3577,
          summary: "Top-level V2 methods on the JavaScript SDK client",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 397,
          summary: "A 'when to use this server' section in the README",
        },
      ],
    },
  ] satisfies { title: string; prs: PullRequest[] }[],
  notPublicProof: "firecrawl-not-public" satisfies ProofClaimId,
  notPublic:
    "A daily benchmark of whether agents pick and correctly use Firecrawl, the sandboxed experiment harness behind these results, and Agent Experience ownership of the Developer Index and the Government and Legal launches.",
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
