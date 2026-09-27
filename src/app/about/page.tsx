import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildOpenGraph } from "@/lib/site";

const description =
  "About Somto Okonkwo, the developer, designer, 3D artist, and technology creator behind Imaginbright.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: buildOpenGraph("About | Imaginbright", description, "/about"),
};

export default function About() {
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(980px,calc(100%-96px))] py-[54px] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)] max-md:py-[35px]"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_300px] items-start gap-[70px] max-md:grid-cols-1 max-md:gap-8">
        <article>
          <p className="font-lekton text-xs tracking-[.1em] uppercase text-[var(--text-secondary)]">
            About
          </p>
          <h1 className="mt-3 font-panton text-[clamp(42px,5vw,68px)] leading-[1.03] font-black tracking-[-.025em]">
            Okonkwo Somto.
          </h1>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.8] text-[#d1d1d6] max-md:text-base">
            <p>
              I&apos;m Somto, the person behind Imaginbright. I&apos;m a
              self-taught developer, designer, 3D artist, and technology
              creator.
            </p>
            <p>
              Imaginbright is where I bring together my development work and my
              writing about technology, including firsthand hardware reviews,
              app guides, and practical buying advice.
            </p>
          </div>
          <nav
            className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm"
            aria-label="About links"
          >
            <Link className="hover:text-[var(--accent)]" href="/development">
              Development ↗
            </Link>
            <Link className="hover:text-[var(--accent)]" href="/blog">
              Blog ↗
            </Link>
            <Link className="hover:text-[var(--accent)]" href="/contact">
              Contact ↗
            </Link>
          </nav>
        </article>
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-2)] max-md:max-w-[360px]">
          <Image
            className="object-cover object-center"
            src="/optimized/profile1.webp"
            alt="Okonkwo Somto"
            fill
            priority
            sizes="(max-width:767px) 90vw, 300px"
          />
        </div>
      </div>
    </main>
  );
}
