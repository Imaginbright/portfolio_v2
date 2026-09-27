import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { PRODUCTS } from "@/constants/products";
import { PROJECTS } from "@/constants/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://imaginbright.com";

  // 1. Define your Static Pages manually
  const staticRoutes = [
    "", // Homepage
    "/blog", // Blog Index
    "/development", // Portfolio/Projects Index
    "/contact", // Contact Page
    "/links", // Linktree/About Page
    "/shop",
    "/3d", // 3D Page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Generate Dynamic Blog Post URLs (WITH SAFETY CHECK)
  const blogRoutes = getAllPosts().map((post) => {
    // Try to parse the date
    let date = new Date(post.date);

    // Safety Check: If date is invalid (NaN), use today's date
    if (isNaN(date.getTime())) {
      console.warn(
        `⚠️ Invalid date found for post: ${post.slug}. Using current date.`,
      );
      date = new Date();
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: date.toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  // 3. Generate Dynamic Project URLs
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Combine everything
  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...PRODUCTS.map(p => ({url: baseUrl + "/shop/" + p.slug, changeFrequency: "monthly" as const, priority: 0.7}))];
}
