import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/lib/blog";

export default function FeaturedSidebar({ posts }: { posts: IPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <h3 className="text-[40px] font-bold text-primary mb-2">
        Featured Posts
      </h3>

      {/* Scrollable List container */}
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
        {posts.map((post, index) => (
          <div key={post.slug} className="flex flex-col">
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-4 group py-3 px-2"
            >
              {/* Thumbnail Box - REFACTORED FOR "EATING INTO" EFFECT */}
              <div className="relative shrink-0">
                {/* Image Container */}
                <div className="relative h-20 w-[110px] bg-gray-800 rounded-xl overflow-hidden border border-white/5">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                {/* The "Knockout" Number Circle */}
                <div className="absolute -bottom-1.5 -left-1.5 w-9 h-9 bg-zinc-100 rounded-full flex items-center justify-center border-[5px] border-card z-20">
                  <span className="text-black font-lekton font-bold text-[14px]">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Title Text */}
              <div className="flex flex-col">
                <h4 className="text-white/80 font-medium text-sm leading-snug line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </Link>

            {/* Divider */}
            {index !== posts.length - 1 && (
              <div className="border-b border-white/10 w-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
