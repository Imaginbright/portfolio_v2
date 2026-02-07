import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/lib/blog";

export default function FeaturedSidebar({ posts }: { posts: IPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="flex flex-col h-full max-h-[850px] xl:max-h-none">
      {/* Title - Responsive text size to match the Profile H1 on mobile */}
      <h3 className="text-3xl xl:text-[40px] font-bold text-primary mb-4 xl:mb-2">
        Featured Posts
      </h3>

      {/* Scrollable List container */}
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar pb-4">
        {posts.map((post, index) => (
          <div key={post.slug} className="flex flex-col">
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-4 group py-4 xl:py-3 px-2 transition-all"
            >
              {/* Thumbnail Box */}
              <div className="relative shrink-0">
                <div className="relative h-16 w-[90px] xl:h-20 xl:w-[110px] bg-gray-800 rounded-xl overflow-hidden border border-white/5">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* The "Knockout" Number Circle */}
                <div className="absolute -bottom-1.5 -left-1.5 w-8 h-8 xl:w-9 xl:h-9 bg-zinc-100 rounded-full flex items-center justify-center border-4 xl:border-[5px] border-card z-20">
                  <span className="text-black font-bold text-[12px] xl:text-[14px]">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Title Text */}
              <div className="flex flex-col">
                <h4 className="text-white/80 font-medium text-sm xl:text-base leading-snug line-clamp-2 transition-colors">
                  {post.title}
                </h4>
              </div>
            </Link>

            {index !== posts.length - 1 && (
              <div className="border-b border-white/10 w-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
