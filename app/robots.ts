import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://true-tea.com.au";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/cart",
          "/checkout",
          "/orders",
          "/users/",
          "/verify-email",
          "/categories/",
          "/products/manage/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
