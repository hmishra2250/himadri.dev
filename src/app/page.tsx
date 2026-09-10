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
      <div className="home-page">
        <Hero />
        <RecentWork />
        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="container about-grid secondary-grid">
            <h2 className="modest-section-heading" id="about-title">
              About
            </h2>
            <div>
              <p>
                I am an AI systems engineer working across agent workflows,
                developer interfaces, ML infrastructure, search, and computer
                vision. I care about software that can be inspected, tested,
                recovered, and handed over.
              </p>
            </div>
          </div>
        </section>
        <ContactCTA />
      </div>
    </>
  );
}
