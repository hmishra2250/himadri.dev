import { profile } from "@/content/profile";

export type AboutOperatingPrinciple = {
  title: string;
  body: string;
};

export const aboutPage = {
  eyebrow: "About",
  title:
    "AI products, agent-facing tools, and the work between a request and a useful result.",
  intro:
    "I work on Agent Experience (AX): can an agent use a product to finish the task a person asked for? That means connecting discovery, access, tool use, checks and human handoffs, not just making a tool call succeed.",
  summary:
    "My earlier work spans automated research, ML infrastructure, search and computer vision. I bring the same questions to agentic systems: does it work, what does it cost, how does it fail, and can the next engineer operate it?",
  principles: [
    {
      title: "I trace every claim to evidence",
      body: "Public pages point to approved proof, source cards, or clearly labeled representative artifacts. I don't make claims I can't back.",
    },
    {
      title: "I prefer explicit workflows",
      body: "DAGs, recovery states, evals, and logs over unstructured prompt chains. If I can't debug it, I won't ship it.",
    },
    {
      title: "I design for the next engineer",
      body: "The work only lasts when someone else can understand the contract, failure mode, and evidence trail without asking me.",
    },
  ] satisfies AboutOperatingPrinciple[],
  ctas: [
    {
      label: "Review selected work",
      href: "/case-studies",
    },
    {
      label: "Read technical notes",
      href: "/notes",
    },
    {
      label: "Download resume",
      href: profile.resumePath,
    },
  ],
};

export const careerTimeline = [
  {
    year: "2013-2018",
    event: "IIT-BHU Varanasi, Dual Degree in Computer Science (9.28/10)",
  },
  { year: "2016", event: "Microsoft intern: dialog systems and chatbots" },
  {
    year: "2017",
    event:
      "UC Berkeley research intern: neural programmer-interpreters (Prof. Dawn Song). SN Bose Scholar.",
  },
  {
    year: "2018-2019",
    event:
      "Whodat: built C++ ORB detector 20% faster than ORB-SLAM for AR products",
  },
  {
    year: "2019-2023",
    event:
      "Osmo: CV technical lead across India and US teams. 93% → 98% worksheet recognition accuracy.",
  },
  {
    year: "2023-2024",
    event:
      "Epic! for Kids: owned ML platform after team reductions. 10x infrastructure cost reduction.",
  },
  {
    year: "2025-2026",
    event:
      "Knit: Senior AI Engineer driving senior IC architecture for agentic market research workflows. 48-72h → <1h report turnaround.",
  },
  { year: "2025", event: "Kaggle top 6% globally. Open-source ML projects." },
  {
    year: "Now",
    event:
      "Focus: AI systems architecture, agent-facing developer infrastructure, and production reliability work.",
  },
];
