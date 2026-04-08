import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { locales } from "@/lib/i18n/config";

const BASE_URL = "https://calcsafe.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Landing pages for all locales
  const landingPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1 : 0.9,
  }));

  // Blog listing pages for all locales
  const blogListingPages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}/blog`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: locale === "en" ? 0.8 : 0.7,
  }));

  // Dynamic blog posts for all locales
  let blogPostPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await db
      .select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt })
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt));

    blogPostPages = locales.flatMap((locale) =>
      posts.map((post) => ({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: locale === "en" ? 0.6 : 0.5,
      }))
    );
  } catch {
    // DB not available at build time — return static pages only
  }

  return [...landingPages, ...blogListingPages, ...blogPostPages];
}
