import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/lib/metadata";
import { buildRootJsonLd, escapeJsonLd } from "@/lib/structured-data";

const ebGaramond = localFont({
  src: [
    {
      path: "./fonts/EBGaramond08-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/EBGaramond08-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-eb-garamond",
  display: "swap",
});

const go = localFont({
  src: [
    {
      path: "./fonts/Go-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Go-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-go",
  display: "swap",
});

const goMono = localFont({
  preload: false,
  src: [
    {
      path: "./fonts/Go-Mono.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-go-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Himadri Mishra, senior AI engineer building production agentic systems.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        alt: "Himadri Mishra, senior AI engineer building production agentic systems.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const analyticsEnabled =
    process.env.ENABLE_ANALYTICS === "1" &&
    process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER === "google_analytics" &&
    Boolean(gaMeasurementId);
  const jsonLd = escapeJsonLd(JSON.stringify(buildRootJsonLd()));

  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${go.variable} ${goMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        {analyticsEnabled && gaMeasurementId ? (
          <GoogleAnalytics measurementId={gaMeasurementId} />
        ) : null}
      </body>
    </html>
  );
}
