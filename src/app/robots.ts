import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://imaginbright.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Adjust if you have private routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
