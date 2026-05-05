import { buildPageMetadata } from "@/lib/seo";
import { CaseStudyGrid } from "@/components/home/CaseStudyGrid";
import { ChallengesPreview } from "@/components/home/ChallengesPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { DecisionTheaterPreview } from "@/components/home/DecisionTheaterPreview";
import { FeaturedCaseStudy } from "@/components/home/FeaturedCaseStudy";
import { Hero } from "@/components/home/Hero";
import { HiringFitMatrix } from "@/components/home/HiringFitMatrix";
import { HowIThink } from "@/components/home/HowIThink";
import { InterviewMePreview } from "@/components/home/InterviewMePreview";
import { LiveSystemPulse } from "@/components/home/LiveSystemPulse";
import { ProofWall } from "@/components/home/ProofWall";
export const metadata = buildPageMetadata("/");


export default function Home() {
  return (
    <>
      <Hero />
      <LiveSystemPulse />
      <ProofWall />
      <HowIThink />
      <FeaturedCaseStudy />
      <DecisionTheaterPreview />
      <CaseStudyGrid />
      <ChallengesPreview />
      <InterviewMePreview />
      <HiringFitMatrix />
      <ContactCTA />
    </>
  );
}
