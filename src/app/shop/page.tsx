import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/constants/products";
import { buildOpenGraph } from "@/lib/site";

const description = "Digital products from Imaginbright.";
export const metadata = {
  title: "Shop",
  description,
  alternates: { canonical: "/shop" },
  openGraph: buildOpenGraph("Shop | Imaginbright", description, "/shop"),
};
export default function Shop() {
  return (
    <main
      id="main-content"
      className="mx-auto min-h-[65vh] w-[min(1320px,calc(100%-96px))] pb-[70px] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]"
    >
      <header className="border-b border-[var(--border)] pt-[45px] pb-7 max-md:pt-[30px] max-md:pb-[22px]">
        <h1 className="font-panton text-[52px] leading-[1.03] font-black tracking-[-.025em] max-md:text-[42px]">
          Shop
        </h1>
      </header>
      <div className="grid grid-cols-3 gap-[30px] pt-8 max-md:max-w-[430px] max-md:grid-cols-1 max-md:gap-6">
        {PRODUCTS.map((p) => (
          <Link className="group" key={p.slug} href={"/shop/" + p.slug}>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--surface-1)]">
              <Image
                className="object-contain transition-transform duration-400 group-hover:scale-[1.025]"
                src={p.image}
                alt={p.name + " cover"}
                fill
                priority
                sizes="(max-width:767px) 100vw, 420px"
              />
            </div>
            <h2 className="mt-[18px] max-w-[300px] font-panton text-xl leading-[1.25] font-bold tracking-[-.015em] max-md:text-[23px]">
              {p.name}
            </h2>
            <p className="mt-2.5 text-sm leading-[1.6] text-[var(--text-secondary)]">
              {p.price}
            </p>
            <span className="mt-2 inline-flex min-h-11 items-center gap-3 whitespace-nowrap text-xs hover:text-[var(--accent)]">
              View Product ↗
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
