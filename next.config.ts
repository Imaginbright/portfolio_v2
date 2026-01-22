import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // 1. Enable AVIF support (Best for performance)/ fallback to WebP
  images: {
    qualities: [100, 75, 95],
    formats: ["image/avif", "image/webp"],
  },

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below

  // 2. This will reactCompiler
  reactCompiler: true,
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
