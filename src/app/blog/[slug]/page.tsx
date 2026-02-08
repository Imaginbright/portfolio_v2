import fs from "fs";
import path from "path";
import { getPostData } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import Navbar3 from "@/components/navigation/NavBar3";

const contentStyles = `
  xl:col-span-8 
  prose prose-invert prose-zinc max-w-none 
  
  /* 1. Alignment & Width Control */
  text-left 
  break-words 
  
  /* 2. Standard Body Typography */
  prose-p:font-lekton 
  prose-p:text-[17px] md:prose-p:text-[18px] 
  prose-p:text-zinc-400 
  prose-p:leading-[1.8] 
  prose-p:mb-8
  
  /* 3. Headers & Hierarchy */
  prose-h2:text-4xl prose-h2:font-cursive prose-h2:text-primary prose-h2:mt-12 prose-h2:mb-6
  prose-h3:text-2xl prose-h3:text-white prose-h3:mt-8 prose-h3:mb-4
  
  /* 4. Code & Media */
  prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-2xl
  prose-img:rounded-3xl prose-img:border-2 prose-img:border-zinc-800
`
  .replace(/\s+/g, " ")
  .trim();

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  return (
    <article className="min-h-screen bg-black text-white pb-24">
      {/* 1. FULL WIDTH HEADER & IMAGE (Aligned to Left) */}
      <div className="max-w-7xl mx-auto px-6 ">
        <Navbar3 />
        <header className="mb-12 max-w-4xl mt-2">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {post.frontmatter.category || "Hardware"}
            </span>
            <span className="text-zinc-500 text-sm font-lekton">
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
              <span className="text-xs text-zinc-500 font-lekton">
                Tech Reviewer
              </span>
            </div>
          </div>
        </header>

        {/* Hero Image Spans the Main Column Width */}
        <div className="relative aspect-video w-full xl:w-[calc(66.66%-3rem)] rounded-3xl border-2 border-zinc-800 overflow-hidden bg-zinc-900 mb-16">
          <Image
            src={post.frontmatter.thumbnail || "/images/keyboard.png"}
            alt={post.frontmatter.title}
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>

        {/* 2. THE GRID: Entry Point & Sidebar Start Here Together */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
          {/* Main Content Body */}
          <div className={contentStyles}>
            <MDXRemote source={post.content} />
          </div>

          {/* Sidebar - Static & Level with Entry Point */}
          <aside className="xl:col-span-4 hidden xl:block">
            <div className="space-y-10">
              <div className="p-8 rounded-3xl border-2 border-zinc-800 bg-card shadow-sharp">
                <h4 className="font-cursive text-2xl text-primary mb-4">
                  The Verdict
                </h4>
                <p className="text-sm text-zinc-400 font-lekton mb-6">
                  Check out the full spec sheet and performance metrics for this
                  build in the Lab.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center py-3 bg-white text-black font-bold rounded-xl hover:bg-primary transition-colors"
                >
                  View Specs
                </Link>
              </div>

              <div className="px-2">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-6">
                  Article Details
                </h4>
                <div className="space-y-4 font-lekton text-sm text-zinc-400">
                  <p className="flex justify-between border-b border-zinc-800 pb-2">
                    <span>Reading Time</span>
                    <span className="text-white">5 Mins</span>
                  </p>
                  <p className="flex justify-between border-b border-zinc-800 pb-2">
                    <span>Released</span>
                    <span className="text-white">Feb 2026</span>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"));
  return files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}
