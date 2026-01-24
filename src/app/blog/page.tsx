// 1. This is the blog index page that lists all blog posts
import { getAllPosts } from "@/lib/blog";
import Image from "next/image";
import Link from "next/link";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-20">
      <div className="flex justify-between items-center my-5">
        <Link href="/" aria-label="Home">
          <p className="font-cursive text-5xl text-[#C4C4C4]">Home</p>
        </Link>
      </div>
      {/* 1. GRID SETUP: 
         - Use 'auto-rows' to ensure consistent heights.
         - 'dense' helps fill in gaps if sizes vary.
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(180px,auto)] gap-5">
        {posts.map((p, idx) => {
          // 2. LOGIC: Check if this is the first item
          const isHero = idx === 0;

          return (
            <Link
              key={idx}
              href={`/blog/${p.slug}`}
              // 3. CONDITIONAL CLASSES:
              // - Remove fixed width (w-[392px]) -> Use w-full
              // - If Hero: span 2 cols and 2 rows
              // - If Normal: span 1 col
              className={`group rounded-lg border border-white/25 bg-card overflow-hidden flex flex-col w-full
                ${isHero ? "md:col-span-2 md:row-span-2" : "col-span-1"}`}
            >
              {/* Thumbnail Container */}
              {/* If it's the hero, we let the image take up more height (e.g., 50% or more) */}
              <div
                className={`relative overflow-hidden w-full ${isHero ? "h-96 md:h-full md:basis-2/3" : "h-60"}`}
              >
                <Image
                  src={p.thumbnail}
                  alt={`${p.title} - thumbnail`}
                  fill
                  quality={95}
                  // Optimize sizes: Hero needs a bigger image
                  sizes={
                    isHero
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  className="group-hover:scale-105 duration-300 transition-all object-cover"
                />
              </div>

              {/* Content Container */}
              <div className="p-4 flex flex-col justify-center flex-1">
                <p className="text-sm bg-gray-100 dark:bg-gray-700/95 text-blue-700 dark:text-blue-500 font-semibold mb-2 w-fit px-2 py-1 rounded-sm">
                  {p.category}
                </p>

                {/* Larger title for the Hero */}
                <h2
                  className={`font-bold leading-tight mb-2 ${isHero ? "text-3xl md:text-4xl" : "text-xl line-clamp-2"}`}
                >
                  {p.title}
                </h2>

                <div className="text-gray-500 flex text-sm space-x-4 mt-auto">
                  <div>{p.author}</div>
                  <div>{p.date}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
