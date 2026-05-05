import { buildPageMetadata } from "@/lib/seo";
import { InterviewMe } from "@/components/interview/InterviewMe";

export const metadata = buildPageMetadata("/interview-me");

export default function InterviewMePage() {
  return <InterviewMe />;
}
