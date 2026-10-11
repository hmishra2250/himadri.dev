import type { ProofClaimId } from "./proof";

/**
 * Everything the one-page site says, in reading order: the introduction,
 * selected work, what is new, and side projects.
 *
 * To add a side project, put a new entry at the top of `projects.side`: one
 * line, and a link once the repository is public. Company-specific statements
 * and numbers carry a `proof` id from ./proof.ts.
 */

/** Running text with inline links */
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

/** A before-and-after figure: one server, then two endpoints */
export type BeforeAfterDiagram = {
  label: string;
  title: string;
  desc: string;
  before: { label: string; agent: DiagramNode; server: DiagramNode };
  after: {
    label: string;
    agent: DiagramNode;
    account: DiagramNode;
    keyless: DiagramNode;
  };
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
  agentExperienceGuides: "https://agentexperience.tech/insights/",
  resume: "/resume",
  firecrawlPullRequests:
    "https://github.com/pulls?q=is%3Apr+author%3Ahmishra2250+org%3Afirecrawl+is%3Amerged",
} as const;

export const pullRequestUrl = (pr: PullRequest) =>
  `https://github.com/firecrawl/${pr.repo}/pull/${pr.number}`;

const prLink = (repo: string, number: number) =>
  pullRequestUrl({ repo, number, summary: "" });

export const hero = {
  name: "Himadri Mishra",
  role: "AI engineer",
  location: "Remote, India",
  punchline: "I build agents, and the MCP servers, CLIs and SDKs they run on.",
  /** One positioning paragraph: now, in the open, before */
  lead: [
    "I build AI products at ",
    { text: "Mudita Studios", href: "/#coding-agent" },
    " and write ",
    { text: "Agent Experience", href: links.agentExperience },
    ", a guide to how agents find, choose and use software. Before that I was at Firecrawl (YC S22), and before agents I did production ML, starting in 2018.",
  ] satisfies Segment[],
  /** One proof line with its evidence */
  latest: [
    "The last big thing I shipped: ",
    { text: "Firecrawl's hosted MCP server", href: "/#hosted-mcp" },
    ", rebuilt so sign-in works and agents load half the tool-metadata tokens, with no drop in task success in a ",
    { text: "paired A/B test", href: prLink("firecrawl-mcp-server", 340) },
    ". Firecrawl's Claude and Codex connectors run on it.",
  ] satisfies Segment[],
  action: "See selected work",
  /** The selected work, as an index at the foot of the first screen */
  index: [
    {
      label: "01 · Mudita Studios",
      title: "A coding agent for Slack and Jira requests",
      line: "A ticket in, a draft pull request out, checked outside the sandbox.",
      href: "/#coding-agent",
    },
    {
      label: "02 · Firecrawl",
      title: "The hosted MCP server, rebuilt",
      line: "Sign-in that works, and agents load half the tokens.",
      href: "/#hosted-mcp",
    },
    {
      label: "03 · Firecrawl",
      title: "The Agent Experience harness",
      line: "Real coding agents test every release before it ships.",
      href: "/#harness",
    },
  ] satisfies { label: string; title: string; line: string; href: string }[],
  proof: [
    "resume-summary",
    "firecrawl-yc",
    "firecrawl-hosted-mcp",
    "firecrawl-neutral-metadata",
    "firecrawl-connectors",
  ] satisfies ProofClaimId[],
};

/** A substantial piece of work: a figure, what it does, and its evidence. */
export type WorkRecord = {
  /** Anchor on the home page */
  id: string;
  status: string;
  title: string;
  story: string;
  points: string[];
  prs: PullRequest[];
  proof: ProofClaimId[];
};

/** A compact row of supporting work with its own links */
export type WorkRow = {
  meta: string;
  title: string;
  text: string;
  links: ExternalLink[];
  proof: ProofClaimId[];
};

export const work = {
  label: "Selected work",
  title: "What I built.",
  featured: {
    id: "coding-agent",
    status: "Mudita Studios · since May 2026",
    title:
      "A coding agent that answers Slack and Jira requests with pull requests",
    story:
      "Someone asks for a change in Slack or Jira. The agent reads the ticket, works in a fresh sandbox with no credentials, writes the change and its tests, and runs them. A second model that did not write the code reviews the diff and can send it back. Only a patch leaves the sandbox.",
    points: [
      "Then the checks the agent cannot touch: the project's tests run again outside the sandbox, pages are checked in a real browser, and a new test must fail on the old code before a pull request opens.",
      "The bot cannot merge. A person reviews the draft, and a reply in the same Slack thread updates the same pull request.",
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
    proof: ["mudita-coding-agent"] satisfies ProofClaimId[],
  },
  mcp: {
    id: "hosted-mcp",
    status: "Firecrawl · July 2026",
    title: "Firecrawl's hosted MCP server, rebuilt",
    story:
      "The old server took the API key in the URL, and its OAuth flow was wired wrong, so sign-in failed a lot. I rebuilt it on Firecrawl's own OAuth with two endpoints: one for accounts and one that needs none. An agent can start without signing up, and when a tool needs an account it is told what to do next.",
    points: [
      "Agents now load half the tool-metadata tokens, and task success stayed the same in a paired A/B test. Firecrawl's Claude and Codex connectors run on it.",
    ],
    diagram: {
      label: "Before and after",
      title: "The hosted MCP server, before and after",
      desc: "Before, an agent reached one server with an API key in the URL and an OAuth flow that was mis-wired and often failed. After, an agent signs in with Firecrawl OAuth to an account endpoint, or uses a keyless endpoint that needs no account.",
      before: {
        label: "BEFORE",
        agent: { name: "Agent", sub: ["any client"] },
        server: {
          name: "One server",
          sub: ["key in the URL", "OAuth mis-wired"],
        },
      },
      after: {
        label: "AFTER",
        agent: { name: "Agent", sub: ["any client"] },
        account: { name: "Account endpoint", sub: ["Firecrawl OAuth"] },
        keyless: { name: "Keyless endpoint", sub: ["no account needed"] },
      },
    } satisfies BeforeAfterDiagram,
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
        repo: "firecrawl-mcp-server",
        number: 363,
        summary: "Keyless recovery",
      },
      {
        repo: "firecrawl-docs",
        number: 1158,
        summary: "Hosted connection modes",
      },
    ],
    proof: [
      "firecrawl-hosted-mcp",
      "firecrawl-hosted-mcp-endpoints",
      "firecrawl-hosted-mcp-rebuild",
      "firecrawl-connectors",
      "firecrawl-neutral-metadata",
    ] satisfies ProofClaimId[],
  } satisfies WorkRecord & { diagram: BeforeAfterDiagram },
  harness: {
    id: "harness",
    status: "Firecrawl · May to September 2026",
    title: "The Agent Experience harness",
    story:
      "This is how Firecrawl found out whether agents could actually use its tools. Before a release shipped, real coding agents (Claude Code, Codex, Cursor, OpenCode) ran the candidate build against the published one in sandboxes set up like a user's, and a paired A/B test compared them.",
    points: [
      "Every tool call, page read and answer was kept raw, and every quote in a weekly report was checked against the run it came from.",
      "What the runs found went into the docs, API, MCP server and website, and the next run tested the fix.",
    ],
    diagram: {
      label: "Inside the harness",
      title: "Inside the Agent Experience harness",
      desc: "A loop of six steps, pin the builds, run real agents, keep every trace, check then judge, report findings and fix the product, then back to the first step to re-test; new releases enter at the first step, and search checks without agents feed the findings.",
      entry: "NEW RELEASES",
      retest: "RE-TEST",
      stations: [
        { name: "Pin the builds" },
        { name: "Run real agents" },
        { name: "Keep every trace" },
        { name: "Check, then judge" },
        { name: "Report findings" },
        { name: "Fix the product" },
      ],
      side: { name: "Search checks, no agents" },
      note: "Agents: Claude Code, Codex, Cursor and OpenCode, in sandboxes.",
    } satisfies LoopDiagram,
    prs: [
      {
        repo: "firecrawl-mcp-server",
        number: 340,
        summary: "A/B test of neutral tool descriptions",
      },
    ],
    proof: [
      "firecrawl-programme",
      "firecrawl-measurement",
      "firecrawl-harness",
      "firecrawl-insight-fixes",
    ] satisfies ProofClaimId[],
  } satisfies WorkRecord & { diagram: LoopDiagram },
  alsoLabel: "Also",
  also: [
    {
      meta: "Mudita Studios",
      title: "The research product",
      text: "Main engineer on a product whose answers cite their sources: data connectors, the test harness and release gates. I also set up CI/CD, preview environments and daily browser smoke tests for a second product.",
      links: [],
      proof: ["mudita-main-engineer", "mudita-delivery-platform"],
    },
    {
      meta: "Firecrawl · launches",
      title: "The paper index",
      text: "With the research-index skill, agents reached Firecrawl's new biomedical paper index in all 48 test runs. Without it, none did.",
      links: [{ label: "skills #10", href: prLink("skills", 10) }],
      proof: ["firecrawl-index-skill", "firecrawl-launch-dri"],
    },
    {
      meta: "Firecrawl · tool calls",
      title: "Search routing",
      text: "With routing instructions in the server, every Claude Code run and two thirds of Codex runs used Firecrawl's search instead of the built-in one, over 15 runs each.",
      links: [
        {
          label: "firecrawl-mcp-server #240",
          href: prLink("firecrawl-mcp-server", 240),
        },
      ],
      proof: ["firecrawl-routing-instructions"],
    },
    {
      meta: "Firecrawl · recovery",
      title: "Errors an agent can act on",
      text: "A spent limit or a wrong key now returns what to do next instead of ending the task, and API errors come back as JSON, not HTML pages.",
      links: [
        {
          label: "firecrawl-mcp-server #365",
          href: prLink("firecrawl-mcp-server", 365),
        },
        { label: "firecrawl #4211", href: prLink("firecrawl", 4211) },
        { label: "firecrawl #4552", href: prLink("firecrawl", 4552) },
      ],
      proof: ["firecrawl-insight-fixes"],
    },
  ] satisfies WorkRow[],
  beforeLabel: "Before agents",
  before: [
    {
      years: "2025 to 2026",
      name: "Knit",
      line: "Senior AI Engineer. I designed the AI pipeline of its research platform; reports that took 2-3 days now take under an hour.",
      proof: "knit-turnaround",
    },
    {
      years: "2023 to 2024",
      name: "Epic! for Kids",
      line: "Senior Research Engineer. Search and recommendations for a children's reading app, and the ML platform under them.",
      proof: "epic-search",
    },
    {
      years: "2018 to 2023",
      name: "Osmo and Whodat",
      line: "Computer vision: worksheet recognition for a kids' learning product, and feature detection for augmented reality.",
      proof: "osmo-cv",
    },
    {
      years: "2013 to 2018",
      name: "IIT (BHU) Varanasi",
      line: "Computer Science. SN Bose Scholar, with a research internship at UC Berkeley under Professor Dawn Song.",
      proof: "education-sn-bose",
    },
  ] satisfies TimelineEntry[],
};

export type LatestItem = {
  date: string;
  title: string;
  href: string;
  /** Mono label: Guide, Release, Experiment */
  kind: string;
};

/** What is new, selected by hand; newest first. */
export const latest = {
  label: "Latest",
  title: "What I have written lately.",
  intro:
    "Agent Experience is my guide to how agents use software. It comes with an open readiness rubric and a public MCP server any agent can query.",
  proof: "public-agent-experience-guide" satisfies ProofClaimId,
  items: [
    {
      date: "08 Oct 2026",
      title: "Five meanings of agent experience",
      href: "https://agentexperience.tech/insights/meanings-of-agent-experience/",
      kind: "Guide",
    },
    {
      date: "08 Oct 2026",
      title: "What does an AX engineer do?",
      href: "https://agentexperience.tech/insights/what-does-an-ax-engineer-do/",
      kind: "Guide",
    },
    {
      date: "08 Oct 2026",
      title: "Agent readiness scores compared",
      href: "https://agentexperience.tech/insights/agent-readiness-scores-compared/",
      kind: "Guide",
    },
    {
      date: "08 Oct 2026",
      title: "How to expose a 3,000-operation API to agents",
      href: "https://agentexperience.tech/insights/large-api-surfaces-for-agents/",
      kind: "Guide",
    },
  ] satisfies LatestItem[],
  more: [
    {
      label: "The Open Agent-Readiness Rubric",
      href: "https://agentexperience.tech/insights/agent-readiness-rubric/",
    },
    {
      label: "Connect to the public MCP server",
      href: "https://agentexperience.tech/connect/",
    },
    {
      label: "MCP tool-description test cases",
      href: "https://agentexperience.tech/resources/mcp-tool-description-test-cases/",
    },
  ] satisfies ExternalLink[],
};

/** Side projects, the distinctive ones first, then earlier open source. */
export const projects = {
  label: "Built on the side",
  title: "Built on the side.",
  side: [
    {
      name: "Talkies",
      line: "Dictation for Linux: hold a key, speak, and the text is pasted at your cursor. Speech is transcribed on your own machine.",
      meta: "2026",
    },
    {
      name: "Qwen3.6-35B on an 8 GB laptop GPU",
      href: `${github}/qwen-3.6-35b-consumer-gpu`,
      line: "A 35B model running on a laptop GPU at 43 tokens per second with 128K context, with the launch scripts, a tuning guide and a coding benchmark.",
      meta: "2026",
      proof: "public-consumer-gpu-inference",
    },
    {
      name: "ubuntu-maclike-touchpad",
      href: `${github}/ubuntu-maclike-touchpad`,
      line: "Mac-style touchpad gestures on Ubuntu: three-finger drag, four-finger workspace switching, pinch to zoom.",
      meta: "2026",
    },
    {
      name: "laptop-powersave",
      line: "Battery modes for a Linux laptop that doubles as a home server: it caps the CPU when the charger is unplugged and powers down the idle NVIDIA GPU without a reboot.",
      meta: "2026",
    },
    {
      name: "cctv-edge",
      line: "A local web console for a Dahua-compatible NVR: live view, Frigate detection and archive backfill, nothing exposed to the internet.",
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
      line: "Botnet detection with classical machine learning, my bachelor's project.",
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
  { id: "work", label: "Selected work" },
  { id: "latest", label: "Latest" },
  { id: "projects", label: "Built on the side" },
] as const;

/** Every in-page anchor besides the sections, for link validation */
export const anchors = [work.featured.id, work.mcp.id, work.harness.id];

/** Every pull request the page cites, for validation */
export const pullRequests = (): PullRequest[] => [
  ...work.mcp.prs,
  ...work.harness.prs,
];
