import { notFound, permanentRedirect } from "next/navigation";
import { getRetiredRouteDestination, routeManifest } from "@/lib/routes";

export const metadata = { robots: { index: false, follow: true } };

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyRoute({ params }: PageProps) {
  const { slug } = await params;
  const path = `/case-studies/${slug}`;
  const route = routeManifest.find((entry) => entry.path === path);
  if (route?.status === "retired") {
    permanentRedirect(getRetiredRouteDestination(path));
  }
  notFound();
}
