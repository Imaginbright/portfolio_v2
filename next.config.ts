import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Enable AVIF support (Best for performance)/ fallback to WebP
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 2. This will reactCompiler
  reactCompiler: true,
};

export default nextConfig;
