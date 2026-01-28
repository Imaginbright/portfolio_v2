import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/lib/blog";

export default function FeaturedSidebar({ posts }: { posts: IPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    // CHANGE 1: Removed the Fragment (<>) wrapper since the parent div can handle it
    <div className="flex flex-col h-full">
      {/* Title */}
      <h3 className="text-[40px] font-bold text-primary mb-4">Featured</h3>

      {/* Scrollable List container */}
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar">
        {posts.map((post, index) => (
          <div key={post.slug} className="flex flex-col">
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-4 group py-3 px-2"
            >
              {/* Thumbnail Box */}
              <div className="relative h-20 w-[110px] shrink-0 bg-gray-800 rounded-xl overflow-hidden">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Number Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <span className="text-white font-bold text-xl drop-shadow-md">
                    #{index + 1}
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

            {/* CHANGE 5: The divider is now INSIDE the loop. 
                I removed 'mt-4' and used 'border-b' (border-bottom) for a cleaner list look.
                The condition (index !== posts.length - 1) hides it for the very last item.
                Remove that condition if you truly want it under the last one too.
            */}
            {index !== posts.length - 1 && (
              <div className="border-b border-white/10 w-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
