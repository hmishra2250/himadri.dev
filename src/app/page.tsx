import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Hero } from "@/components/home/Hero";
import { SelectedWork, WritingFeature } from "@/components/home/SelectedWork";
import { aboutPage } from "@/content/about";

export const dynamic = "error";

export const metadata: Metadata = buildPageMetadata("/");

export default function Home() {
  return (
    <>
      <RouteJsonLd path="/" />
      <div className="home-page">
        <Hero />
        <SelectedWork />
        <WritingFeature />
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
              <p>{aboutPage.summary}</p>
            </div>
          </div>
        </section>
        <ContactCTA />
      </div>
    </>
  );
}
