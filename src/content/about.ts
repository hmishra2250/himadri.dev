import { profile } from "@/content/profile";

export type AboutOperatingPrinciple = {
  title: string;
  body: string;
};

export const aboutPage = {
  eyebrow: "About",
  title: "8 years building AI systems that survive production.",
  intro: "I've worked across computer vision, ML infrastructure, search systems, and agentic AI platforms. My focus is the part most teams skip: making AI workflows observable, evaluable, recoverable, and affordable.",
  summary:
    "I'm currently looking for Staff/Principal AI engineering roles where reliability and cost matter as much as capability.",
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
      label: "See my work",
      href: "/case-studies",
    },
    {
      label: "Ask me anything",
      href: "/interview-me",
    },
    {
      label: "Download resume",
      href: profile.resumePath,
    },
  ],
};

export const careerTimeline = [
  { year: "2013-2018", event: "IIT-BHU Varanasi, Dual Degree in Computer Science (9.28/10)" },
  { year: "2016", event: "Microsoft Research intern: dialog systems and chatbots" },
  { year: "2017", event: "UC Berkeley research intern: neural programmer-interpreters (Prof. Dawn Song). SN Bose Scholar." },
  { year: "2018-2019", event: "Whodat: built C++ ORB detector 20% faster than ORB-SLAM for AR products" },
  { year: "2019-2023", event: "Osmo: CV technical lead across India and US teams. 93% → 98% worksheet recognition accuracy." },
  { year: "2023-2024", event: "Epic! for Kids: owned ML platform post-layoffs. 10x infrastructure cost reduction." },
  { year: "2025-2026", event: "Knit: principal architect for agentic market research platform. 48-72h → <1h report turnaround." },
  { year: "2025", event: "Kaggle top 6% globally. Open-source ML projects." },
  { year: "Now", event: "Open to Staff/Principal AI systems roles." },
];

