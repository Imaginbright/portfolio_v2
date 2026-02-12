import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
// 1. Import both fonts
import localFont from "next/font/local";
import "./globals.css";

const whisper = localFont({
  src: "./fonts/NewfieldRegular.woff",
  variable: "--font-whisper",
  weight: "400",
});

//Configured Lekton
const lekton = localFont({
  src: [
    {
      path: "./fonts/Lektonregular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lektonbold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-lekton",
});

// 3. Configured Luckiest Guy
const luckiest = localFont({
  src: "./fonts/Luckiestguy.woff",
  weight: "400",
  style: "normal",
  variable: "--font-luckiest",
});

export const metadata: Metadata = {
  // This will allow Next.js to resolve absolute URLs for images
  metadataBase: new URL("https://imaginbright.com"),

  title: {
    default: "Imaginbright | Web Developer Portfolio",
    template: "%s | Imaginbright", // Example: "Contact | Imaginbright"
  },
  description:
    "Web Developer specializing in React, Next.js, and Tailwind CSS. Feel free to explore my development and 3D design portfolio.",

  keywords: [
    "Web Developer",
    "Next.js",
    "React",
    "3D Design",
    "Portfolio",
    "Somto",
    "Frontend Engineer",
  ],

  authors: [{ name: "Somto", url: "https://imaginbright.com" }],
  creator: "Somto",

  alternates: {
    canonical: "./",
  },

  // 2. SOCIAL MEDIA CARDS (Open Graph)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imaginbright.com",
    title: "Imaginbright | Web Developer Portfolio",
    description: "Turning complex ideas into seamless digital experiences.",
    siteName: "Imaginbright",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imaginbright Portfolio",
      },
    ],
  },

  // 3. TWITTER CARDS
  twitter: {
    card: "summary_large_image",
    title: "Imaginbright | Web Developer Portfolio",
    description: "Turning complex ideas into seamless digital experiences.",
    images: ["/og-image.png"],
    creator: "@imaginbright",
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  // 3. GOOGLE VERIFICATION for search console
  verification: {
    google: "google-site-verification=YOUR_CODE_HERE", // I will add this later if Google asks for it
  },

  // 4. GLOBAL ROBOTS CONTROL (Backup for robots.ts)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lekton.variable} ${luckiest.variable} ${whisper.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
