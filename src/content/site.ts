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

export type Cluster = {
  title: string;
  line: string;
  /** A measured before-and-after, as percentages, when one exists */
  result?: { value: string; label: string; proof: ProofClaimId };
  prs: PullRequest[];
  proof?: ProofClaimId;
};

export type System = {
  /** Omit when the step name already says it */
  name?: string;
  line: string;
  proof: ProofClaimId;
};

export type LoopStep = {
  name: string;
  cadence: string;
  systems: System[];
};

export const firecrawl = {
  label: "Previously",
  title: "Agent Experience at Firecrawl.",
  intro:
    "From May to September 2026 I owned Agent Experience at Firecrawl: whether coding agents find it, choose it and use it correctly.",
  proof: ["firecrawl-programme"] satisfies ProofClaimId[],
  rewrite: {
    meta: "Jul 2026",
    title: "Rewrote the hosted MCP server",
    line: "I rewrote how agents connect, from scratch, and shipped it as one coordinated train of pull requests across the MCP server, API, web app, CLI, infrastructure and docs.",
    rows: [
      ["Before", "The API key sat in the URL, and sign-in was broken."],
      [
        "After",
        "Agents start without a key and sign in with OAuth when they need an account; connector directories get a search endpoint that accepts OAuth alone. Existing users kept working.",
      ],
      [
        "Led to",
        "Firecrawl's Claude and Codex connector launches. For the OpenAI review I made the tool descriptions neutral, and an A/B test on paired agent runs showed no loss in task success.",
      ],
    ] as const,
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
        number: 340,
        summary: "Neutral tool descriptions, A/B tested",
      },
    ] satisfies PullRequest[],
    proof: [
      "firecrawl-hosted-mcp",
      "firecrawl-hosted-mcp-endpoints",
      "firecrawl-connectors",
      "firecrawl-neutral-metadata",
    ] satisfies ProofClaimId[],
  },
  loopLabel: "How I found what to fix",
  loop: [
    {
      name: "Measure",
      cadence: "Daily",
      systems: [
        {
          name: "Discoverability benchmark",
          line: "Coding agents answer real developer questions, and it records whether they find, choose and correctly use Firecrawl. Its discovery metric joined the Q3 top-of-funnel dashboard.",
          proof: "firecrawl-measurement",
        },
        {
          name: "Retrievability",
          line: "Searches through Firecrawl and a search-results API show where Firecrawl's pages rank for the questions agents ask, and which pages need SEO work.",
          proof: "firecrawl-retrievability",
        },
        {
          name: "Market intelligence",
          line: "Competitors' launches, posts, repositories and events, tracked on one timeline.",
          proof: "firecrawl-market-intelligence",
        },
      ],
    },
    {
      name: "Explain",
      cadence: "Weekly",
      systems: [
        {
          name: "Deep Insights",
          line: "Reads the week's traces for what no single run shows: what agents read, quote and get wrong, with every quote checked against the raw runs.",
          proof: "firecrawl-measurement",
        },
      ],
    },
    {
      name: "Test",
      cadence: "Before a change ships",
      systems: [
        {
          name: "Agent harness",
          line: "Runs any coding agent in a sandbox from a chosen starting state (tools, sign-in, skills), with traces and cost caps, and compares A and B with false-discovery-rate control.",
          proof: "firecrawl-measurement",
        },
      ],
    },
    {
      name: "Ship",
      cadence: "Every surface",
      systems: [
        {
          line: "Fixes go out to the MCP server, CLI, SDKs, skills, docs and website. The next day's run shows whether they worked.",
          proof: "firecrawl-programme",
        },
      ],
    },
  ] satisfies LoopStep[],
  shared: {
    name: "Company knowledge",
    line: "Findings and results fed the company's internal knowledge system, where other teams and their agents could query them.",
    proof: "firecrawl-company-knowledge",
  } satisfies System,
  changesLabel: "What it changed",
  changes: [
    {
      title: "Starting without an account",
      line: "Agents can use Firecrawl before anyone signs up. Setup no longer opens a surprise sign-in, and when a tool needs an account, the agent finishes with keyless tools if it can.",
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 364,
          summary: "Keyless setup without a surprise sign-in",
        },
        {
          repo: "firecrawl-mcp-server",
          number: 363,
          summary: "Fallback-first keyless recovery",
        },
        {
          repo: "firecrawl-docs",
          number: 1077,
          summary: "Keyless availability in the CLI",
        },
      ],
    },
    {
      title: "Errors an agent can recover from",
      line: "Real agent runs showed spent limits and wrong keys ending the task. Now the fix is in the text the agent reads, and the user recovers.",
      prs: [
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
    },
    {
      title: "Tools agents choose",
      line: "Instructions on when Firecrawl applies, deprecated tools hidden with a path to their replacement, and SDK errors that name the right field.",
      result: {
        value: "0% → 100%",
        label:
          "Claude Code searches that go to Firecrawl for MCP users (Codex: 0% → 67%)",
        proof: "firecrawl-routing-instructions",
      },
      prs: [
        {
          repo: "firecrawl-mcp-server",
          number: 240,
          summary: "Routing instructions for agents",
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
      title: "Launches agents can find",
      line: "I owned the agent-facing side of the Life Sciences, Developer Index, and Government and Legal launches. The skill wording was picked by A/B test and did not fire on unrelated tasks.",
      result: {
        value: "0% → 100%",
        label:
          "Biomedical test runs that reach the new paper index, with the skill installed",
        proof: "firecrawl-index-skill",
      },
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
        {
          repo: "firecrawl-mcp-server",
          number: 380,
          summary: "Name the developer index",
        },
      ],
      proof: "firecrawl-launch-dri",
    },
    {
      title: "Pages agents quote, made accurate",
      line: "Deep Insights caught agents repeating wrong prices, benchmark claims and billing rules. Those pages now state them correctly, in text agents can read.",
      prs: [
        {
          repo: "firecrawl-docs",
          number: 1363,
          summary: "Benchmark date and scope",
        },
        { repo: "firecrawl-docs", number: 1365, summary: "Crawl accounting" },
        {
          repo: "firecrawl-docs",
          number: 1370,
          summary: "Failed-request billing",
        },
      ],
    },
    {
      title: "Docs agents copy from",
      line: "No instructions for tools that do not exist, API names left untranslated in localized docs, JSON errors instead of HTML pages, and every code sample run in CI.",
      prs: [
        {
          repo: "firecrawl-docs",
          number: 1393,
          summary: "Untranslated API identifiers",
        },
        { repo: "firecrawl", number: 4552, summary: "JSON errors" },
        { repo: "firecrawl-docs", number: 1380, summary: "Docs CI" },
      ],
    },
  ] satisfies Cluster[],
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
  elsewhere: [
    { label: "Agent Experience", href: links.agentExperience },
  ] satisfies ExternalLink[],
};

export const sections = [
  { id: "now", label: "Now" },
  { id: "firecrawl", label: "Previously" },
  { id: "before", label: "Before that" },
] as const;
