import type { ProofClaimId } from "./proof";

/**
 * Everything the one-page site says, in reading order.
 *
 * To add a side project, put a new entry at the top of `projects.side`: one line,
 * and a link once the repository is public. Company-specific statements and
 * numbers carry a `proof` id from ./proof.ts.
 */

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

/** A node in a diagram: a short name and up to two sublabel lines */
export type DiagramNode = { name: string; sub?: string[] };

/** The coding agent figure. Words only; the geometry lives in the component. */
export type CodingAgentDiagram = {
  label: string;
  title: string;
  /** One sentence for screen readers */
  desc: string;
  zone: string;
  nodes: Record<
    "request" | "agent" | "reviewer" | "checks" | "draft" | "person",
    DiagramNode
  >;
  edges: Record<"revise" | "patch" | "pass" | "reply", string>;
  note?: string;
};

/** A loop figure: six stations clockwise, an entry, a return and a side input */
export type LoopDiagram = {
  label: string;
  title: string;
  /** One sentence for screen readers */
  desc: string;
  entry: string;
  retest: string;
  stations: [
    DiagramNode,
    DiagramNode,
    DiagramNode,
    DiagramNode,
    DiagramNode,
    DiagramNode,
  ];
  side: DiagramNode;
  note?: string;
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
    "AI engineer, 8+ years. I build AI products at Mudita Studios and work in the open on Agent Experience: whether agents find, choose and correctly use the tools they are given. Previously at Firecrawl (YC S22).",
  proof: "resume-summary" satisfies ProofClaimId,
  ycProof: "firecrawl-yc" satisfies ProofClaimId,
};

export type ShippedItem = {
  when: string;
  /** Where it shipped, shown as the item's status */
  source: string;
  title: string;
  text: string;
  /** Where the evidence lives: a public link or a homepage section */
  href: string;
  /** Link text for href */
  go: string;
  proof?: ProofClaimId;
};

/** The hero's strip of recently shipped work, newest first. */
export const shipped = {
  label: "Recently shipped",
  period: "2026",
  items: [
    {
      when: "Sep",
      source: "agentexperience.tech",
      title: "A field guide to Agent Experience",
      text: "With a readiness rubric and a public MCP server.",
      href: "https://agentexperience.tech/",
      go: "Read the guide",
      proof: "public-agent-experience-guide",
    },
    {
      when: "Jul",
      source: "Mudita Studios",
      title: "A coding agent, from an empty repository",
      text: "From a Slack or Jira request to a tested draft pull request.",
      href: "/#now",
      go: "How it works",
      proof: "mudita-coding-agent",
    },
    {
      when: "Jul",
      source: "Firecrawl",
      title: "Firecrawl's hosted MCP server, rebuilt",
      text: "Firecrawl's Claude and Codex connectors run on it, and agents load half the tokens with no loss in task success.",
      href: "https://github.com/firecrawl/firecrawl-mcp-server/pull/308",
      go: "firecrawl-mcp-server #308",
      proof: "firecrawl-hosted-mcp",
    },
  ] satisfies ShippedItem[],
};

export const now = {
  label: "Now",
  title: "What I work on.",
  mudita: {
    name: "Mudita Studios",
    meta: "AI Product Engineer · since May 2026",
    items: [
      "Built a coding agent from an empty repository.",
      "Main engineer on a production AI product whose answers cite their sources: its data connectors, the end-to-end test harness and release gates, and security hardening.",
      "Set up the delivery platform for a second product: CI/CD, preview environments and daily browser smoke tests.",
    ],
    diagram: {
      label: "Inside the coding agent",
      title: "Inside the coding agent",
      desc: "A request in Slack starts a coding agent in a sandbox with no credentials; a second model reviews its diff and can send it back; only the patch leaves; checks outside the agent's reach run before a draft pull request goes to a person, whose reply sends the work back.",
      zone: "SANDBOX · NO KEYS",
      nodes: {
        request: { name: "Request", sub: ["Slack · Jira ticket"] },
        agent: { name: "Coding agent", sub: ["explores, codes, tests"] },
        reviewer: { name: "Second model", sub: ["reviews the diff"] },
        checks: {
          name: "Independent checks",
          sub: ["tests · browser · proof"],
        },
        draft: { name: "Draft pull request", sub: ["bot cannot merge"] },
        person: { name: "Person reviews", sub: ["merges or replies"] },
      },
      edges: {
        revise: "REVISE",
        patch: "PATCH ONLY",
        pass: "PASS",
        reply: "REPLY · SAME PR",
      },
      note: "The agent cannot commit or push, and each new test must fail on the old code before a pull request opens.",
    } satisfies CodingAgentDiagram,
    proof: [
      "mudita-coding-agent",
      "mudita-main-engineer",
      "mudita-delivery-platform",
    ] satisfies ProofClaimId[],
  },
};

export const inTheOpen = {
  label: "In the open",
  title: "Agent Experience, in the open.",
  proof: "public-agent-experience-guide" satisfies ProofClaimId,
  items: [
    {
      name: "Agent Experience field guide",
      href: "https://agentexperience.tech/",
      line: "How AI agents experience a product while acting for a person.",
      meta: "Published guide",
    },
    {
      name: "Open Agent-Readiness Rubric",
      href: "https://agentexperience.tech/insights/agent-readiness-rubric/",
      line: "Checks one real job an agent does across six tracks and gives a profile, not one score.",
      meta: "Open rubric",
    },
    {
      name: "Public MCP server",
      href: "https://agentexperience.tech/connect/",
      line: "A read-only endpoint any agent can query for a bounded audit.",
      meta: "MCP server",
    },
    {
      name: "MCP tool-description test cases",
      href: "https://agentexperience.tech/resources/mcp-tool-description-test-cases/",
      line: "Copyable cases for tool selection, inputs, results and recovery.",
      meta: "Test cases",
    },
    {
      name: "awesome-agent-experience",
      href: `${github}/awesome-agent-experience`,
      line: "Sources on tool use, discovery and evaluation.",
      meta: "Curated list",
    },
  ] satisfies OneLiner[],
};

/** One point inside a work card; an optional lead-in label. */
export type WorkPoint = { label?: string; text: string };

export type WorkCard = {
  title: string;
  /** Mono status above the title */
  status: string;
  /** What it is and why it mattered, in two or three sentences */
  story?: string;
  points: WorkPoint[];
  prs: PullRequest[];
  proof: ProofClaimId[];
};

export const firecrawl = {
  label: "Previously",
  title: "Agent Experience at Firecrawl.",
  intro: "From May to September 2026 I owned Agent Experience at Firecrawl.",
  proof: ["firecrawl-programme"] satisfies ProofClaimId[],
  harness: {
    label: "Inside the harness",
    title: "Inside the Agent Experience harness",
    desc: "A loop of six steps, pin the builds, run real agents, keep every trace, check then judge, report findings and fix the product, then back to the first step to re-test; new releases enter at the first step, and search checks without agents feed the findings.",
    entry: "NEW RELEASES",
    retest: "RE-TEST",
    stations: [
      {
        name: "Pin the builds",
      },
      {
        name: "Run real agents",
      },
      {
        name: "Keep every trace",
      },
      {
        name: "Check, then judge",
      },
      {
        name: "Report findings",
      },
      { name: "Fix the product" },
    ],
    side: { name: "Search checks, no agents" },
    note: "Agents: Claude Code, Codex, Cursor and OpenCode, in sandboxes.",
  } satisfies LoopDiagram,
  cards: [
    {
      title: "The Agent Experience harness",
      status: "Built from the first commit",
      story:
        "The lab behind the programme. The rule was that every release goes through an A/B test first, and for every launch it uncovered issues that went into the product.",
      points: [
        {
          label: "Daily discoverability",
          text: "runs across six agent lanes, on a dashboard whose discovery metric fed the company's top-of-funnel goals.",
        },
        {
          label: "Weekly Deep Insights",
          text: "reads every trace from one full daily run, judges the pages agents read, and checks each quote against the raw runs.",
        },
        {
          label: "Retrievability",
          text: "whether Firecrawl's pages show up in search, load and carry the answer, with no agents involved.",
        },
        {
          label: "Experiments",
          text: "pre-registered statistics, judges, cost caps and false-discovery-rate control.",
        },
        {
          label: "Access",
          text: "a CLI, the dashboard and the company's knowledge system, where other teams query results and draft experiments.",
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
      proof: ["firecrawl-measurement", "firecrawl-harness"],
    },
    {
      title: "The hosted MCP server, rebuilt",
      status: "Shipped system, Jul 2026",
      story:
        "The hosted server mixed API keys in URLs with an OAuth flow that was wired in wrong, and sign-in failed often. I rebuilt it from first principles on Firecrawl's OAuth, reusing what worked, as one train of pull requests.",
      points: [
        {
          label: "Leaner",
          text: "A/B tested before and after: half the tokens an agent loads from the server, with no loss in task success.",
        },
        {
          label: "Keyless",
          text: "agents start without an account; when a tool needs one, they finish with keyless tools or give the person a clear next step.",
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
      status: "Launch DRI",
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
      status: "Shipped fixes",
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
};

/** After the main work: side projects, then earlier open source. */
export const projects = {
  label: "Side projects",
  title: "Built on the side.",
  side: [
    {
      name: "Talkies",
      line: "Local dictation and meeting transcription for Linux: hold a key, speak, and the text lands where you type.",
      meta: "2026",
    },
    {
      name: "laptop-powersave",
      line: "Battery tiers for a laptop that doubles as a server: it caps the CPU and releases the GPU without a reboot.",
      meta: "2026",
    },
    {
      name: "cctv-edge",
      line: "A local-first CCTV console with on-device object detection, on a Raspberry Pi 5.",
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
  earlierLabel: "Earlier open source",
  earlier: [
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
  role: "AI engineer.",
  elsewhere: [
    { label: "Agent Experience", href: links.agentExperience },
  ] satisfies ExternalLink[],
};

export const sections = [
  { id: "now", label: "Now" },
  { id: "open", label: "In the open" },
  { id: "firecrawl", label: "Previously" },
  { id: "before", label: "Before that" },
  { id: "projects", label: "Side projects" },
] as const;
