import { getAllPosts, getPostData, getRelatedPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterForm from "@/components/blog/NewsletterForm";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import styles from "./Article.module.css";
const siteUrl = "https://imaginbright.com";
type Props = { params: Promise<{ slug: string }> };
function readPost(slug: string) {
  if (!getAllPosts().some((p) => p.slug === slug)) notFound();
  return getPostData(slug);
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params,
    post = readPost(slug),
    p = post.frontmatter,
    description =
      p.description || post.content.slice(0, 160).replace(/[#*]/g, "").trim(),
    image = new URL(p.thumbnail, siteUrl).href;
  return {
    title: p.title,
    description,
    authors: [{ name: p.author, url: siteUrl }],
    alternates: { canonical: siteUrl + "/blog/" + slug },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: p.title,
      description,
      type: "article",
      url: siteUrl + "/blog/" + slug,
      images: [{ url: image, width: 1200, height: 630, alt: p.title }],
      publishedTime: p.date,
      section: p.category,
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description,
      images: [image],
    },
  };
}
const components = {
  img: ({ src, alt = "" }: { src?: string; alt?: string }) =>
    src ? (
      <span className="my-[35px] block">
        <Image
          className="h-auto w-full"
          src={src}
          alt={alt}
          width={1200}
          height={675}
          sizes="(max-width:767px) 100vw, 780px"
        />
        {alt && (
          <small className="mt-2.5 block font-lekton text-xs leading-[1.5] text-[var(--text-secondary)]">
            {alt}
          </small>
        )}
      </span>
    ) : null,
  Callout: ({ children }: { children: ReactNode }) => (
    <div className={styles.callout}>{children}</div>
  ),
  table: ({ children }: { children: ReactNode }) => (
    <div
      className="my-[30px] overflow-x-auto"
      tabIndex={0}
      role="region"
      aria-label="Scrollable data table"
    >
      <table>{children}</table>
    </div>
  ),
};
export default async function Article({ params }: Props) {
  const { slug } = await params,
    post = readPost(slug),
    p = post.frontmatter,
    readingTime = Math.ceil(post.content.trim().split(/\s+/).length / 225),
    related = getRelatedPosts(slug, p.category, 3);
  const excerpt =
    p.description ||
    post.content
      .split(/\n\s*\n/)
      .map((x) => x.trim())
      .find(
        (x) =>
          x.length > 80 &&
          !x.startsWith("#") &&
          !x.startsWith("<") &&
          !x.startsWith("!"),
      );
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    url: siteUrl + "/blog/" + slug,
    mainEntityOfPage: siteUrl + "/blog/" + slug,
    timeRequired: "PT" + readingTime + "M",
    image: [new URL(p.thumbnail, siteUrl).href],
    datePublished: p.date,
    dateModified: p.date,
    author: { "@type": "Person", name: p.author, url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "Imaginbright",
      logo: { "@type": "ImageObject", url: siteUrl + "/publisher-logo.png" },
    },
    description:
      p.description || post.content.slice(0, 140).replace(/[#*]/g, "").trim(),
  };
  const eyebrow =
    "font-lekton text-xs leading-[1.5] tracking-[.1em] uppercase text-[var(--text-secondary)]";
  const textLink =
    "inline-flex min-h-11 items-center gap-3 whitespace-nowrap text-sm hover:text-[var(--accent)]";
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-96px))] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <article>
        <header className="pt-[35px] max-md:pt-[26px]">
          <Link className={`${eyebrow} mb-6 block`} href="/blog">
            ← Blog
          </Link>
          <div className="mb-4 flex items-center gap-[18px]">
            <p className={eyebrow}>{p.category}</p>
            <span className="font-lekton text-[11px] leading-[1.5] text-[var(--text-secondary)]">
              {readingTime} min read
            </span>
          </div>
          <h1 className="max-w-[1050px] font-panton text-[clamp(36px,4.4vw,62px)] leading-[1.06] font-black tracking-[-.025em] max-md:text-4xl">
            {p.title}
          </h1>
        </header>
        <div className="my-[30px] mb-12 grid grid-cols-[1.65fr_1fr] gap-[35px] max-[1100px]:grid-cols-[1.6fr_1fr] max-md:my-6 max-md:mb-8 max-md:grid-cols-1 max-md:gap-5">
          <div className="relative aspect-[16/10] bg-[var(--surface-2)] max-md:aspect-[1.5]">
            <Image
              className="object-cover"
              src={p.thumbnail}
              alt={p.title}
              fill
              priority
              sizes="(max-width:767px) 100vw, 820px"
            />
          </div>
          <div className="flex flex-col justify-between border-t border-[var(--border)] pt-[22px] max-md:pt-[18px]">
            {excerpt && (
              <p className="font-manrope text-[22px] leading-[1.55] font-medium tracking-[-.012em] max-[1100px]:text-[19px] max-md:text-lg">
                {excerpt}
              </p>
            )}
            <div className="mt-[25px] flex items-center gap-3">
              <Link href="/" aria-label="About the author">
                <Image
                  className="h-11 w-11 rounded-full object-cover"
                  src="/optimized/profile1.webp"
                  alt="Okonkwo Somto"
                  width={44}
                  height={44}
                />
              </Link>
              <div>
                <strong className="block font-manrope text-[13px] font-semibold">{p.author}</strong>
                <p className="mt-[5px] font-lekton text-[11px] leading-[1.6] text-[var(--text-secondary)]">
                  Tech Creator / <time dateTime={p.date}>{p.date}</time>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-[70px] grid grid-cols-[minmax(0,780px)_minmax(240px,1fr)] items-start gap-[70px] max-[1100px]:grid-cols-[minmax(0,1fr)_260px] max-[1100px]:gap-[35px] max-md:grid-cols-1 max-md:gap-[35px] max-md:[&_aside]:border-t max-md:[&_aside]:border-[var(--border)] max-md:[&_aside]:pt-[25px]">
          <div
            className={`${styles.prose} min-w-0 font-manrope [overflow-wrap:anywhere] text-lg leading-[1.85] text-[#d1d1d6] max-md:text-[17px]`}
          >
            <MDXRemote
              source={post.content}
              components={components}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
            <div className="mt-10 border-t border-[var(--border)] pt-6">
              <Link className={textLink} href="/blog">
                Explore More Posts ↗
              </Link>
            </div>
          </div>
          <aside>
            {related.length > 0 && (
              <section>
                <h2 className={eyebrow}>Related posts</h2>
                {related.map((r) => (
                  <Link
                    className="flex gap-3.5 border-b border-[var(--border)] py-[18px]"
                    href={"/blog/" + r.slug}
                    key={r.slug}
                  >
                    <Image
                      className="h-[72px] w-[90px] object-cover"
                      src={r.thumbnail}
                      alt=""
                      width={90}
                      height={72}
                      sizes="90px"
                    />
                    <div>
                      <h3 className="font-panton text-[17px] leading-[1.3] font-semibold tracking-[-.01em]">
                        {r.title}
                      </h3>
                      <time
                        className="mt-[9px] block font-lekton text-[11px] text-[var(--text-secondary)]"
                        dateTime={r.date}
                      >
                        {r.date}
                      </time>
                    </div>
                  </Link>
                ))}
              </section>
            )}
            <NewsletterForm />
          </aside>
        </div>
      </article>
    </main>
  );
}
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}
