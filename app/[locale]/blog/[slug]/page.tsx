import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/schema";
import { eq, ne, desc } from "drizzle-orm";
import { BlogNav } from "@/components/navbar";
import { BlogFooter } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogImageMap } from "@/lib/blog-images";
import { BlogContent } from "@/components/blog-content";
import { isValidLocale, defaultLocale } from "@/lib/i18n/config";
import { getTranslationsSync } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import type { BlogPost } from "@/lib/schema";

// Force dynamic rendering — fetch from Turso at request time, not build time
export const dynamic = "force-dynamic";

interface ArticleTranslation {
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  readTime?: string;
}

function getArticleTranslation(
  locale: string,
  slug: string
): ArticleTranslation | null {
  if (locale === defaultLocale) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(`@/lib/i18n/articles/${locale}/${slug}.json`);
  } catch {
    return null;
  }
}

function Calendar({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}
function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  );
}
function Apple({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"/>
      <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
    </svg>
  );
}
function PlayStore({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3.18 1.52L13.58 12 3.18 22.48a1.04 1.04 0 0 1-.18-.6V2.12c0-.22.06-.42.18-.6z" fill="#4285F4"/>
      <path d="M17.34 8.15L13.58 12l3.76 3.85 4.28-2.43c.78-.44.78-1.4 0-1.84l-4.28-2.43z" fill="#FBBC04"/>
      <path d="M3.18 22.48c.2.3.5.5.86.52l13.3-7.15L13.58 12 3.18 22.48z" fill="#EA4335"/>
      <path d="M3.18 1.52L13.58 12l3.76-3.85L4.04 1c-.36.02-.66.22-.86.52z" fill="#34A853"/>
    </svg>
  );
}
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}

async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return post || null;
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(ne(blogPosts.slug, currentSlug))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(2);
    return posts;
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Article Not Found" };

  const translation = getArticleTranslation(params.locale, params.slug);
  const title = translation?.title || post.title;
  const excerpt = translation?.excerpt || post.excerpt;
  const imageUrl = post.featuredImageUrl || blogImageMap[post.slug];

  return {
    title,
    description: excerpt,
    alternates: {
      canonical: `https://photovaultapp.com/${params.locale}/blog/${params.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description: excerpt,
      publishedTime: post.publishedAt,
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function ArticleCTA({
  t,
}: {
  t: {
    title: string;
    subtitle: string;
    appStore: string;
    googlePlay: string;
  };
}) {
  return (
    <div className="mt-12 rounded-2xl bg-gradient-to-br from-[#E53935]/20 to-[#B71C1C]/10 border border-[#E53935]/20 p-8 sm:p-10 text-center">
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">{t.title}</h3>
      <p className="text-[#999] mb-6 max-w-md mx-auto text-sm leading-relaxed">
        {t.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 font-semibold bg-white text-[#0F0F0F] hover:bg-white/90 transition-colors"
        >
          <Apple className="w-4 h-4" />
          {t.appStore}
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 rounded-full h-11 px-6 font-semibold bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
        >
          <PlayStore className="w-4 h-4" />
          {t.googlePlay}
        </a>
      </div>
    </div>
  );
}

function RelatedPostCard({
  post,
  locale,
  readArticle,
}: {
  post: BlogPost;
  locale: Locale;
  readArticle: string;
}) {
  const imageUrl = post.featuredImageUrl || blogImageMap[post.slug];
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group">
      <Card className="h-full bg-[#1C1C1E] border-white/5 hover:border-[#E53935]/30 transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden">
        {imageUrl && (
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <CardContent className="p-5">
          <Badge variant="secondary" className="text-xs font-medium mb-3 bg-[#E53935]/10 text-[#E53935] border-0">
            {post.category}
          </Badge>
          <h4 className="font-semibold text-sm mb-1.5 group-hover:text-[#E53935] transition-colors leading-snug text-white">
            {post.title}
          </h4>
          <p className="text-xs text-[#999] line-clamp-2">
            {post.excerpt}
          </p>
          <span className="mt-3 text-xs font-medium text-[#E53935] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {readArticle} <ArrowRight className="w-3 h-3" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

// JSON-LD structured data for SEO
function ArticleJsonLd({ post }: { post: BlogPost }) {
  const imageUrl = post.featuredImageUrl || blogImageMap[post.slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: imageUrl ? `https://photovaultapp.com${imageUrl}` : undefined,
    publisher: {
      "@type": "Organization",
      name: "Photo Vault",
      url: "https://photovaultapp.com",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogArticlePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  if (!isValidLocale(locale)) notFound();

  const post = await getPost(slug);
  if (!post) notFound();

  const t = getTranslationsSync(locale as Locale);
  const relatedPosts = await getRelatedPosts(slug);
  const imageUrl = post.featuredImageUrl || blogImageMap[post.slug];

  const translation = getArticleTranslation(locale, slug);
  const displayTitle = translation?.title || post.title;
  const displayExcerpt = translation?.excerpt || post.excerpt;
  const displayContent = translation?.content || post.content;
  const displayCategory = translation?.category || post.category;
  const displayReadTime = translation?.readTime || post.readTime;

  // Strip the first H1 from content (it's already shown as the title)
  const contentWithoutH1 = displayContent.replace(/^#\s+.+\n+/, "");

  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F0F]">
      <ArticleJsonLd post={post} />
      <BlogNav locale={locale as Locale} t={t} />
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1 text-sm text-[#666] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {t.blog.backToBlog}
          </Link>

          <article>
            <header className="mb-10">
              <Badge variant="secondary" className="text-xs font-medium mb-4 bg-[#E53935]/10 text-[#E53935] border-0">
                {displayCategory}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4 text-white">
                {displayTitle}
              </h1>
              <div className="flex items-center gap-4 text-sm text-[#666] mb-8">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {displayReadTime}
                </span>
              </div>
              {imageUrl && (
                <div className="rounded-xl overflow-hidden aspect-[16/9] mb-2">
                  <Image
                    src={imageUrl}
                    alt={displayTitle}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              )}
            </header>

            <BlogContent content={contentWithoutH1} />

            <ArticleCTA t={t.articleCta} />

            {relatedPosts.length > 0 && (
              <div className="mt-14">
                <h3 className="text-lg font-bold mb-5 text-white">{t.blog.relatedArticles}</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedPosts.map((rPost) => (
                    <RelatedPostCard
                      key={rPost.id}
                      post={rPost}
                      locale={locale as Locale}
                      readArticle={t.blog.readArticle}
                    />
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </main>
      <BlogFooter t={t} />
    </div>
  );
}
