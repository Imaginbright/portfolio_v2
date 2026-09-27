import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
// Display, reading/UI, and technical font voices
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/navigation/SiteNav";
import SiteFooter from "@/components/navigation/SiteFooter";

const panton = localFont({
  src: [
    { path: "./fonts/Panton-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/Panton-SemiBold.woff", weight: "600", style: "normal" },
    { path: "./fonts/Panton-Bold.woff", weight: "700", style: "normal" },
    { path: "./fonts/panton_extrablack.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-panton",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Technical and metadata voice
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
  variable: "--font-lekton-local",
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
    description:
      "Web Developer specializing in React, Next.js, and Tailwind CSS.",
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
    description:
      "Web Developer specializing in React, Next.js, and Tailwind CSS.",
    images: ["/og-image.png"],
    creator: "@imaginbright",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // 3. GOOGLE VERIFICATION for search console

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
      <body className={`${panton.variable} ${manrope.variable} ${lekton.variable} font-manrope bg-[var(--background)] text-[var(--text-primary)] antialiased`}>
        <a className="fixed top-2 left-2 z-100 -translate-y-[200%] bg-[var(--text-primary)] p-3 text-[var(--background)] focus:translate-y-0" href="#main-content">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
        <Toaster position="bottom-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
