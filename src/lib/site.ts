import type { Metadata } from "next";

export const SITE_URL = "https://www.imaginbright.com";

export function buildOpenGraph(
  title: string,
  description: string,
  path: string,
): Metadata["openGraph"] {
  return {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}${path}`,
    title,
    description,
    siteName: "Imaginbright",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imaginbright Portfolio",
      },
    ],
  };
}

