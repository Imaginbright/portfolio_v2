import { getPostData, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import Navbar3 from "@/components/navigation/NavBar3";
import ScrollToTop from "@/components/navigation/ScrollToTop";
import NewsletterForm from "@/components/blog/NewsletterForm";
import remarkGfm from "remark-gfm";
import { getBlurData } from "@/lib/blurhash";

interface ImageProps {
  src: string;
  alt?: string;
  blurDataURL?: string; // New prop
}

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

const mdxComponents = (blurDataURL?: string) => ({
  img: (props: ImageProps) => (
    <span className="block my-12">
      <span className="relative block overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 leading-0">
        <Image
          src={props.src}
          alt={props.alt || "Blog Image"}
          width={1200}
          height={675}
          placeholder="blur" // Enable blur
          blurDataURL={
            blurDataURL ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          }
          className="w-full h-auto object-cover m-0! rounded-lg!"
        />
      </span>
      {props.alt && (
        <span className="mt-4 block text-center font-lekton text-xs text-zinc-500 uppercase tracking-widest opacity-60">
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

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  const heroBlur = await getBlurData(post.frontmatter.thumbnail);

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.frontmatter.category)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-black text-white pb-24 relative">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-6">
        <Navbar3 />

        <header className="mb-12 max-w-4xl mt-8">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 font-lekton text-sm w-fit"
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

        <div className="relative aspect-video w-full xl:w-[calc(66.66%-3rem)] rounded-3xl border-2 border-zinc-800 overflow-hidden bg-zinc-900 mb-16">
          <Image
            src={post.frontmatter.thumbnail || "/images/keyboard.png"}
            alt={post.frontmatter.title}
            fill
            placeholder="blur"
            blurDataURL={heroBlur} // Hero image now blurs up!
            className="object-cover opacity-90"
            priority
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          <div className={contentStyles}>
            <MDXRemote
              source={post.content}
              // Pass the heroBlur as a fallback for MDX images
              // or generate specific ones for content (more complex)
              components={mdxComponents(heroBlur)}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />

            {/* MOBILE ONLY NAVIGATION SECTION */}
            <div className="mt-20 xl:hidden space-y-16">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
                    Related &ldquo;{post.frontmatter.category}&rdquo;
                  </h4>
                  <div className="grid grid-cols-1 gap-6">
                    {relatedPosts.map((related, index) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="flex items-center gap-4 group"
                      >
                        <div className="relative shrink-0">
                          <div className="relative h-16 w-24 bg-zinc-900 rounded-xl overflow-hidden border border-white/5">
                            <Image
                              src={related.thumbnail}
                              alt={related.title}
                              fill
                              className="object-cover opacity-80"
                            />
                          </div>
                          <div className="absolute -bottom-1.5 -left-1.5 w-7 h-7 bg-zinc-100 rounded-full flex items-center justify-center border-4 border-black z-20">
                            <span className="text-black font-bold text-[11px]">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="font-bold text-sm leading-tight text-white/90 group-hover:text-primary transition-colors">
                            {related.title}
                          </h5>
                          <span className="text-[10px] text-zinc-500 font-lekton uppercase mt-1">
                            {related.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Form for Mobile */}
              <NewsletterForm />
            </div>

            {/* End of Post CTA */}
            <div className="mt-24 pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h3 className="text-2xl font-cursive text-white mb-2">
                  Thanks for reading
                </h3>
                <p className="text-zinc-500 font-lekton">
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

          {/* DESKTOP SIDEBAR */}
          <aside className="xl:col-span-4 hidden xl:block sticky top-8">
            <div className="space-y-10 mt-0 max-h-[calc(100vh-4rem)] flex flex-col">
              <NewsletterForm />

              <div className="flex-1 flex flex-col overflow-hidden px-2">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 shrink-0">
                  Article Details & Related
                </h4>

                {/* The 'no-scrollbar' class here hides the bar but keeps the functionality */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-6">
                  <div className="space-y-3 font-lekton text-xs text-zinc-400 border-b border-zinc-800 pb-6">
                    <p className="flex justify-between">
                      <span>Reading Time</span>
                      <span className="text-white">5 Mins</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Released</span>
                      <span className="text-white">
                        {post.frontmatter.date}
                      </span>
                    </p>
                  </div>

                  {relatedPosts.map((related, index) => (
                    <div key={index} className="flex flex-col">
                      <Link
                        href={`/blog/${related.slug}`}
                        className="flex items-center gap-4 group py-2 transition-all"
                      >
                        <div className="relative shrink-0">
                          <div className="relative h-14 w-20 bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
                            <Image
                              src={related.thumbnail}
                              alt={related.title}
                              fill
                              className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-white/80 font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {related.title}
                          </h5>
                          <span className="text-[10px] text-zinc-600 font-lekton uppercase mt-1">
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
  );
}
