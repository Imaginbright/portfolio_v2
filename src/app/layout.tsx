import type { Metadata } from "next";
import { Toaster } from "sonner";
// 1. Import both fonts
import localFont from "next/font/local";
import "./globals.css";

const hiragino = localFont({
  src: "./fonts/Hiragino.woff",
  variable: "--font-hiragino",
  weight: "800",
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
  title: "Imaginbright | Web Developer Portfolio",
  description:
    "Web Developer specializing in React, Next.js, and Tailwind CSS. Feel free to explore my development and 3D design portfolio.",

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png", //
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
        className={`${lekton.variable} ${luckiest.variable} ${hiragino.variable} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
