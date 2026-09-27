import { getAllPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import NewsletterForm from "@/components/blog/NewsletterForm";
import Image from "next/image";
import Link from "next/link";
import { buildOpenGraph } from "@/lib/site";

const description =
  "Technology articles, reviews, guides, and explainers by Somto Okonkwo.";
export const metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: buildOpenGraph("Blog | Imaginbright", description, "/blog"),
};
export default function Blog() {
  const posts = getAllPosts().sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
  const featured = [
      ...posts.filter((p) => p.featured),
      ...posts.filter((p) => !p.featured),
    ].slice(0, 4),
    lead = featured[0];
  const shell =
    "mx-auto w-[min(1320px,calc(100%-96px))] max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]";
  const eyebrow =
    "font-lekton text-xs leading-[1.5] tracking-[.1em] uppercase text-[var(--text-secondary)]";
  const meta =
    "font-lekton text-[11px] leading-[1.5] text-[var(--text-secondary)]";
  return (
    <main
      id="main-content"
      className={`${shell} font-manrope`}
    >
      <header className="flex items-baseline justify-between border-b border-[var(--border)] pt-[35px] pb-6 max-md:pt-[25px] max-md:pb-[18px]">
        <h1 className="font-panton text-[58px] leading-[1.02] font-black tracking-[-.025em] max-md:text-[42px]">
          Blog
        </h1>
        <p className="font-lekton text-xs leading-[1.6] text-[var(--text-muted)] max-md:text-[10px]">
          Imaginbright
        </p>
      </header>
      <nav
        className="flex items-center gap-7 overflow-auto font-lekton tracking-[.04em] border-b border-[var(--border)] py-3 text-xs whitespace-nowrap text-[var(--text-secondary)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:gap-[22px] max-md:py-[7px] max-md:text-[11px] [&_a]:py-2.5 [&_a:hover]:text-[var(--accent)]"
        aria-label="Blog categories"
      >
        {Array.from(new Set(posts.map((p) => p.category))).map((c) => (
          <a href="#archive" key={c}>
            {c}
          </a>
        ))}
        <a href="#archive">Search &amp; archive ↗</a>
      </nav>
      {lead && (
        <section
          className="grid grid-cols-[1.6fr_1fr] gap-8 border-b border-[var(--border)] pt-8 pb-[38px] max-md:grid-cols-1 max-md:gap-[25px] max-md:py-[25px]"
          aria-label="Featured stories"
        >
          <Link className="group" href={"/blog/" + lead.slug}>
            <div className="relative aspect-video overflow-hidden bg-[var(--surface-2)]">
              <Image
                className="object-cover transition-transform duration-400 group-hover:scale-[1.02]"
                src={lead.thumbnail}
                alt=""
                fill
                priority
                sizes="(max-width:767px) 100vw, 800px"
              />
            </div>
            <p className={`${eyebrow} mt-5`}>{lead.category}</p>
            <h2 className="my-2.5 mb-4 font-panton text-4xl leading-[1.12] font-black tracking-[-.025em] max-md:text-[30px]">
              {lead.title}
            </h2>
            <p className={meta}>
              {lead.author} / {lead.date}
            </p>
          </Link>
          <div className="flex flex-col gap-6 border-l border-[var(--border)] pl-8 max-md:gap-[18px] max-md:border-l-0 max-md:pl-0">
            {featured.slice(1).map((post) => (
              <Link
                className="group grid grid-cols-[1fr_130px] gap-[18px] border-b border-[var(--border)] pb-6 last:border-0 last:pb-0 max-[1100px]:grid-cols-[1fr_85px] max-md:grid-cols-[1fr_100px] max-md:pb-[18px]"
                href={"/blog/" + post.slug}
                key={post.slug}
              >
                <div className="relative col-start-2 row-start-1 aspect-square overflow-hidden bg-[var(--surface-2)]">
                  <Image
                    className="object-cover transition-transform duration-400 group-hover:scale-[1.02]"
                    src={post.thumbnail}
                    alt=""
                    fill
                    sizes="130px"
                  />
                </div>
                <div className="col-start-1 row-start-1">
                  <p className={`${eyebrow} text-[10px]`}>{post.category}</p>
                  <h2 className="my-2 mb-3.5 font-panton text-[22px] leading-[1.22] font-bold tracking-[-.02em] max-[1100px]:text-xl max-md:my-1.5 max-md:mb-2.5">
                    {post.title}
                  </h2>
                  <p className={meta}>
                    {post.author} / {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="grid grid-cols-[minmax(0,2.2fr)_minmax(240px,1fr)] gap-[50px] pt-10 pb-[65px] max-[1100px]:grid-cols-1 max-md:gap-0 max-md:pt-[30px] max-md:pb-10">
        <BlogList allPosts={posts} />
        <aside className="border-l border-[var(--border)] pl-[30px] max-[1100px]:hidden">
          <h2 className="mb-[22px] font-panton text-[22px] leading-[1.12] font-semibold tracking-[-.02em]">
            Featured
          </h2>
          {featured.map((p, i) => (
            <Link
              className="grid grid-cols-[30px_1fr] gap-3 border-t border-[var(--border)] py-5"
              key={p.slug}
              href={"/blog/" + p.slug}
            >
              <span className="font-lekton text-[var(--text-muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-panton text-[17px] leading-[1.4] font-bold tracking-[-.01em]">
                  {p.title}
                </h3>
                <p className={`${meta} mt-2.5`}>{p.date}</p>
              </div>
            </Link>
          ))}
          <NewsletterForm />
        </aside>
      </div>
    </main>
  );
}
