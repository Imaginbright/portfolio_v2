import Image from "next/image";
import Link from "next/link";
export const metadata = { title: "3D Lab" };
export default function ThreeD() {
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-96px))] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]"
    >
      <header className="flex items-end justify-between gap-6 pt-[54px] pb-9 max-md:flex-col max-md:items-start max-md:gap-[18px] max-md:pt-[35px] max-md:pb-[26px]">
        <div>
          <p className="font-lekton text-xs leading-[1.5] tracking-[.1em] uppercase text-[var(--text-secondary)]">
            3D
          </p>
          <h1 className="mt-3.5 font-panton text-[clamp(42px,5vw,68px)] leading-[1.03] font-black tracking-[-.025em] max-md:mt-2.5 max-md:text-[44px]">
            3D Lab
          </h1>
        </div>
        <p className="font-lekton text-sm leading-[1.6] text-[var(--text-secondary)]">
          Coming Soon
        </p>
      </header>
      <div className="relative aspect-[2.2] max-md:aspect-[1.3]">
        <Image
          className="object-cover"
          src="/optimized/keyboard.webp"
          alt="3D keyboard scene preview"
          fill
          priority
          sizes="(max-width:767px) 100vw, 1200px"
        />
      </div>
      <div className="flex items-center justify-between gap-[35px] pt-[35px] pb-[65px] max-md:flex-col max-md:items-start max-md:pt-[25px] max-md:pb-10">
        <p className="max-w-[630px] leading-[1.6] text-[var(--text-secondary)] max-md:text-[15px]">
          I&apos;m currently rendering some high-quality experiences and
          fine-tuning the 3D models. Check back soon to see the full lab in
          action! 🛠️
        </p>
        <Link
          className="inline-flex min-h-12 items-center justify-center gap-[26px] rounded-sm border border-[#4b4b50] px-5 py-3 text-sm transition-[background,transform] duration-200 hover:bg-[var(--surface-3)] active:scale-[.97]"
          href="/"
        >
          Back to Home ↗
        </Link>
      </div>
    </main>
  );
}
