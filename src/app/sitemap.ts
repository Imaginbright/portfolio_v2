import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { PRODUCTS } from "@/constants/products";
import { PROJECTS } from "@/constants/projects";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/development",
    "/contact",
    "/links",
    "/privacy",
    "/shop",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const blogRoutes = getAllPosts().map((post) => {
    const date = new Date(post.updated ?? post.date);

    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      ...(Number.isNaN(date.getTime())
        ? {}
        : { lastModified: date.toISOString() }),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...productRoutes];
}
