import type { Metadata } from "next";
import { InterviewMe } from "@/components/interview/InterviewMe";

export const metadata: Metadata = {
  title: "Interview Me",
  description:
    "Curated answers to hard production AI and architecture questions with source cards.",
};

export default function InterviewMePage() {
  return <InterviewMe />;
}
