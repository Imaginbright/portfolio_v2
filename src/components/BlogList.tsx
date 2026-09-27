"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { IPost } from "@/lib/blog";
export default function BlogList({ allPosts }: { allPosts: IPost[] }) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All");
  const categories = Array.from(new Set(allPosts.map((p) => p.category)));
  const posts = allPosts.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.title.toLowerCase().includes(query.toLowerCase()),
  );
  const field =
    "min-h-11 min-w-0 rounded-[3px] border border-[var(--border)] bg-[var(--surface-2)] p-[11px] text-[13px] text-[var(--text-primary)]";
  return (
    <section id="archive">
      <div className="flex items-center justify-between gap-5 border-b border-[var(--border)] pb-[22px] max-md:flex-col max-md:items-start max-md:gap-[18px]">
        <h2 className="font-panton text-[28px] leading-[1.12] font-bold tracking-[-.02em] max-md:text-[26px]">
          Latest stories
        </h2>
        <div className="flex items-center gap-3 max-md:w-full max-md:gap-2">
          <label className="sr-only" htmlFor="post-search">
            Search posts
          </label>
          <input
            className={`${field} w-[180px] max-[1100px]:w-[220px] max-md:w-full max-md:flex-1`}
            id="post-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts..."
          />
          <label className="sr-only" htmlFor="post-category">
            Category
          </label>
          <select
            className={`${field} max-md:max-w-[130px]`}
            id="post-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <p
        className="py-3 font-lekton text-[11px] leading-[1.6] text-[var(--text-muted)]"
        aria-live="polite"
      >
        {posts.length} {posts.length === 1 ? "article" : "articles"}
      </p>
      <div>
        {posts.map((post) => (
          <Link
            className="group grid grid-cols-[180px_1fr] gap-6 border-b border-[var(--border)] py-[23px] max-md:grid-cols-[105px_1fr] max-md:gap-[15px] max-md:py-5"
            href={"/blog/" + post.slug}
            key={post.slug}
          >
            <div className="relative aspect-[1.55] overflow-hidden bg-[var(--surface-2)] max-md:aspect-[1.1]">
              <Image
                className="object-cover transition-transform duration-400"
                src={post.thumbnail}
                alt=""
                fill
                sizes="(max-width:767px) 105px, 180px"
              />
            </div>
            <div>
              <p className="font-lekton text-xs leading-[1.5] tracking-[.1em] uppercase text-[var(--text-secondary)] max-md:text-[10px]">
                {post.category}
              </p>
              <h3 className="my-2 font-panton text-[23px] leading-[1.23] font-bold tracking-[-.015em] group-hover:underline group-hover:underline-offset-4 max-md:my-[5px] max-md:mb-2.5 max-md:text-lg">
                {post.title}
              </h3>
              <p className="font-lekton text-[11px] leading-[1.5] text-[var(--text-secondary)] max-md:text-[10px]">
                {post.author} / <time dateTime={post.date}>{post.date}</time>
              </p>
            </div>
          </Link>
        ))}
      </div>
      {!posts.length && (
        <p className="leading-[1.6] text-[var(--text-secondary)]">
          No posts found.
        </p>
      )}
    </section>
  );
}
