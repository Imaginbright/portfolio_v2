import { getPostData, getRelatedPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import Navbar3 from "@/components/navigation/NavBar3";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import NewsletterForm from "@/components/blog/NewsletterForm";
import remarkGfm from "remark-gfm";
import { getBlurData } from "@/lib/blurhash";
import { Metadata } from "next";

// This is for SEO and Metadata generation

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  const siteUrl = "https://imaginbright.com";

  const description =
    post.frontmatter.description ||
    post.content.slice(0, 160).replace(/[#*]/g, "").trim() + "...";

  const ogImage = post.frontmatter.thumbnail
    ? `${siteUrl}${post.frontmatter.thumbnail}`
    : `${siteUrl}/images/og-default.png`;

  return {
    title: post.frontmatter.title,
    description: description,
    authors: [{ name: post.frontmatter.author }],

    // --- This section is for google discover --- //
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large", // <--- THE KEY TO DISCOVER
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: post.frontmatter.title,
      description: description,
      type: "article",
      url: `${siteUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
      publishedTime: post.frontmatter.date,
      section: post.frontmatter.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  };
}

// The types definition

interface ImageProps {
  src: string;
  alt?: string;
  blurDataURL?: string;
}

// Design and typography constants

const contentStyles = `
  xl:col-span-8 
  prose prose-invert prose-zinc max-w-none 
  text-left break-words 
  prose-p:font-lekton prose-p:text-[17px] md:prose-p:text-[18px] 
  prose-p:text-zinc-400 prose-p:leading-[1.8] prose-p:mb-8
  prose-h2:first-of-type:mt-0
  prose-table:w-full prose-table:border-collapse prose-table:my-10
  prose-th:text-primary prose-th:font-bold prose-th:text-left prose-th:pb-4 prose-th:border-b prose-th:border-zinc-800 prose-th:uppercase prose-th:tracking-widest prose-th:text-xs
  prose-td:py-4 prose-td:border-b prose-td:border-zinc-900 prose-td:font-lekton prose-td:text-sm md:prose-td:text-base
  [&_#white-heading]:text-white
  prose-h2:text-4xl prose-h2:font-cursive prose-h2:text-primary prose-h2:mb-6
  prose-h3:text-2xl prose-h3:text-white prose-h3:mt-8 prose-h3:mb-4
  prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-2xl
  prose-img:rounded-3xl prose-img:border-2 prose-img:border-zinc-800
`
  .replace(/\s+/g, " ")
  .trim();

// Custom MDX Components (Image & Callout)

const mdxComponents = (blurDataURL?: string) => ({
  img: (props: ImageProps) => (
    <span className="block my-12">
      <span className="relative block overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 leading-0">
        <Image
          src={props.src}
          alt={props.alt || "Blog content image"}
          width={1200}
          height={675}
          placeholder="blur"
          // This prevents huge downloads on mobile
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          blurDataURL={
            blurDataURL ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          }
          className="w-full h-auto object-cover m-0! rounded-lg!"
        />
      </span>
      {props.alt && (
        <span className="mt-4 block text-center font-lekton text-xs text-zinc-400 uppercase tracking-widest opacity-80">
          {props.alt}
        </span>
      )}
    </span>
  ),
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="p-6 my-8 rounded-2xl border-2 border-primary/30 bg-primary/5 font-lekton text-primary">
      {children}
    </div>
  ),
});

// This is the MAIN PAGE COMPONENT

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // --- Data Fetching ---
  const { slug } = await params;
  const post = getPostData(slug);
  const heroBlur = await getBlurData(post.frontmatter.thumbnail);
  const siteUrl = "https://imaginbright.com";

  // --- Calculate Reading Time ---
  // Assuming an average reading speed of 225 words per minute
  const wordCount = post.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 225);

  // --- Related Content Logic ---
  const relatedPosts = getRelatedPosts(slug, post.frontmatter.category, 2);

  // --- JSON-LD Structured Data ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    timeRequired: `PT${readingTime}M`,
    image: [post.frontmatter.thumbnail],
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: [
      {
        "@type": "Person",
        name: post.frontmatter.author,
        url: `${siteUrl}/about`,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "ImaginBright",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`, // Make sure i have a logo at this path or update it
      },
    },
    //
    description:
      post.frontmatter.description ||
      post.content.slice(0, 140).replace(/[#*]/g, "").trim(),
  };

  return (
    <main id="main-content">
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-black text-white pb-24 relative">
        <ScrollToTop />
        <div className="max-w-7xl mx-auto px-6">
          <Navbar3 />

          {/* --- Article Header (Metadata & Title) --- */}
          <header className="mb-12 max-w-4xl mt-2 md:mt-8">
            <Link
              href="/blog"
              aria-label="Return to the main blog list"
              className="group flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors mb-8 font-lekton text-sm w-fit"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              Back to all posts
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {post.frontmatter.category || "Hardware"}
              </span>
              <span className="text-zinc-400 text-sm font-lekton">
                {post.frontmatter.date}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-8 text-balance">
              {post.frontmatter.title}
            </h1>

            <div className="flex items-center gap-4 border-t border-zinc-800 pt-8 w-fit">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-primary shrink-0">
                {post.frontmatter.author[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-wider">
                  {post.frontmatter.author}
                </span>
                <span className="text-xs text-zinc-400 font-lekton">
                  Tech Creator
                </span>
              </div>
            </div>
          </header>

          {/* --- Featured Hero Image --- */}
          <div className="relative aspect-video w-full xl:w-[calc(66.66%-3rem)] rounded-3xl border-2 border-zinc-800 overflow-hidden bg-zinc-900 mb-16">
            <Image
              src={post.frontmatter.thumbnail || "/images/keyboard.png"}
              alt={post.frontmatter.title}
              fill
              placeholder="blur"
              blurDataURL={heroBlur}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 1000px"
              className="object-cover opacity-90"
            />
          </div>

          {/* --- Main Content Grid --- */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
            {/* --- Article Body --- */}
            <div className={contentStyles}>
              <MDXRemote
                source={post.content}
                components={mdxComponents(heroBlur)}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />

              {/* --- Mobile-Only Navigation (Related & Newsletter) --- */}
              <div className="mt-20 xl:hidden space-y-16">
                {relatedPosts.length > 0 && (
                  <section
                    aria-labelledby="related-posts-mobile"
                    className="not-prose"
                  >
                    <h4
                      id="related-posts-mobile"
                      className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-8 border-b border-zinc-800 pb-4"
                    >
                      Related posts
                    </h4>
                    <div className="grid grid-cols-1 gap-6">
                      {relatedPosts.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/blog/${related.slug}`}
                          className="flex items-center gap-4 group"
                        >
                          {/* Thumbnail */}
                          <div className="relative h-14 w-20 rounded-lg overflow-hidden border border-white/5 bg-zinc-900 flex-none">
                            <Image
                              src={related.thumbnail}
                              alt={related.title}
                              fill
                              sizes="80px"
                              className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="font-bold text-sm leading-tight text-white/90 group-hover:text-primary transition-colors">
                              {related.title}
                            </h5>
                            <span className="text-zinc-400 text-sm font-lekton">
                              <time dateTime={post.frontmatter.date}>
                                {post.frontmatter.date}
                              </time>
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
                <NewsletterForm />
              </div>

              {/* --- Footer CTA Section --- */}
              <div className="mt-24 pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <h3 className="text-2xl font-cursive text-white mb-2">
                    Thanks for reading
                  </h3>
                  <p className="text-zinc-400 font-lekton">
                    Check out my other deep dives into tech.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="px-8 py-4 bg-primary text-black font-bold rounded-2xl hover:bg-white transition-all hover:-translate-y-1 active:scale-95 shadow-lg shadow-primary/20"
                >
                  Explore More Posts
                </Link>
              </div>
            </div>

            {/* --- Desktop Sidebar (Article Details & Related) --- */}
            <aside className="xl:col-span-4 hidden xl:block sticky top-8">
              <div className="space-y-10 mt-0 max-h-[calc(100vh-4rem)] flex flex-col">
                <NewsletterForm />

                <div className="flex-1 flex flex-col overflow-hidden px-2">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 shrink-0">
                    Article Details
                  </h4>

                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-6">
                    <div className="space-y-3 font-lekton text-xs text-zinc-400 border-b border-zinc-800 pb-6">
                      <p className="flex justify-between">
                        <span>Reading Time</span>
                        <span className="text-white">
                          {readingTime} Min{readingTime !== 1 ? "s" : ""}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Released</span>
                        <span className="text-zinc-400 text-sm font-lekton">
                          <time dateTime={post.frontmatter.date}>
                            {post.frontmatter.date}
                          </time>
                        </span>
                      </p>
                    </div>

                    {relatedPosts.map((related, index) => (
                      <div key={index} className="flex flex-col">
                        <h4
                          id="related-posts-desktop"
                          className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 pb-2"
                        >
                          Related posts
                        </h4>

                        <Link
                          href={`/blog/${related.slug}`}
                          className="flex items-center gap-4 group py-2 transition-all"
                        >
                          <div className="relative h-14 w-20 bg-zinc-900 rounded-lg overflow-hidden border border-white/5 flex-none">
                            <Image
                              src={related.thumbnail}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-white/80 font-medium text-sm leading-snug line-clamp-2">
                              {related.title}
                            </h5>
                            <span className="text-[10px] text-zinc-400 font-lekton uppercase mt-1">
                              {related.category}
                            </span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}
