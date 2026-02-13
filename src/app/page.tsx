import PortfolioGrid from "@/components/homepage/PortfolioGrid";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  // JSON-LD for "Person"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Somto",
    alternateName: "Imaginbright",
    url: "https://imaginbright.com",
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

      <Navbar />
      <PortfolioGrid />
    </div>
  );
}
