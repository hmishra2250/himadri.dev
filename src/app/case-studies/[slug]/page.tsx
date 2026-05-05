import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies
    .filter((study) => study.routeEnabled)
    .map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildPageMetadata(`/case-studies/${study.slug}`);
}

export default async function CaseStudyRoute({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
