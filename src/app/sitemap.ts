import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
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
    "/3d", // 3D Page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // 2. Generate Dynamic Blog Post URLs
  const blogRoutes = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 3. Generate Dynamic Project URLs
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Combine everything
  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
