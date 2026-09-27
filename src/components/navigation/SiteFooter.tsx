import Image from "next/image";
import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="mx-auto flex w-[min(1320px,calc(100%-96px))] items-center justify-between gap-6 border-t border-[var(--border)] py-[30px] font-manrope text-xs text-[var(--text-secondary)] max-[1100px]:w-[calc(100%-56px)] max-md:grid max-md:w-[calc(100%-36px)] max-md:grid-cols-2 max-md:gap-5 max-md:py-[25px] max-md:text-[11px] [&_a:hover]:text-white">
      <Link href="/" aria-label="Imaginbright home">
        <Image src="/logo.svg" width={108} height={38} alt="Bright" />
      </Link>
      <p className="leading-[1.6] max-md:text-right">
        © {new Date().getFullYear()} Imaginbright
      </p>
      <div className="flex flex-wrap gap-6 max-md:col-span-full max-md:justify-between">
        <a href="https://github.com/Imaginbright">GitHub</a>
        <a href="https://www.youtube.com/@imaginbright">YouTube</a>
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/contact">Contact ↗</Link>
      </div>
    </footer>
  );
}
