import { hero, links } from "./site";

export const profile = {
  name: hero.name,
  role: "AI Engineer",
  headline: hero.punchline,
  positioning: hero.facts,
  location: hero.location,
  linkedin: links.linkedin,
  github: links.github,
  x: links.x,
  agentExperience: links.agentExperience,
  /** One-page resume: the default download */
  resumePath: "/resume/Himadri_Mishra_Resume.pdf",
  /** Two-page CV: the complete record */
  cvPath: "/resume/Himadri_Mishra_CV.pdf",
};
