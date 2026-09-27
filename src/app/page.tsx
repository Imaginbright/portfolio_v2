import PortfolioGrid from "@/components/homepage/PortfolioGrid";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // JSON-LD for "Person"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Somto",
    alternateName: "Imaginbright",
    url: SITE_URL,
    jobTitle: "Web Developer",
    sameAs: [
      "https://github.com/Imaginbright",
      "https://x.com/imaginbright",
      "https://www.youtube.com/@imaginbright",
      "https://www.instagram.com/imaginbright/",
      "https://www.tiktok.com/@imaginbright",
      "https://www.linkedin.com/in/somto-okonkwo-34519823a/",
    ],
    description:
      "Web Developer specializing in React, Next.js, and Tailwind CSS.",
  };

  return (
    <div className="max-w-400 mx-auto w-full">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />


      <PortfolioGrid />
    </div>
  );
}
