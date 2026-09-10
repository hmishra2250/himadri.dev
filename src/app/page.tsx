import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Hero } from "@/components/home/Hero";
import { RecentWork } from "@/components/home/RecentWork";

export const metadata: Metadata = buildPageMetadata("/");

export default function Home() {
  return (
    <>
      <RouteJsonLd path="/" />
      <Hero />
      <RecentWork />
      <section
        className="section-pad compact home-about"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="container about-inline">
          <h2 id="about-title">About.</h2>
          <p>
            I am an AI systems engineer working across agent workflows,
            developer interfaces, ML infrastructure, search, and computer
            vision. I care about software that can be inspected, tested,
            recovered, and handed over.
          </p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
