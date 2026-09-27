import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/constants/products";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = PRODUCTS.find((p) => p.slug === slug);
  return {
    title: p?.name,
    description: p?.description[0],
    alternates: { canonical: "/shop/" + slug },
  };
}
export default async function Product({ params }: Props) {
  const { slug } = await params,
    p = PRODUCTS.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-96px))] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]"
    >
      <Link
        className="mt-7 inline-flex min-h-11 items-center gap-3 whitespace-nowrap text-sm hover:text-[var(--accent)]"
        href="/shop"
      >
        ← Shop
      </Link>
      <article className="grid grid-cols-2 items-start gap-[70px] pt-[35px] pb-20 max-md:grid-cols-1 max-md:gap-[25px] max-md:pt-[25px] max-md:pb-[45px]">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-[var(--surface-1)]">
          <Image
            className="object-contain transition-transform duration-400"
            src={p.image}
            alt={p.name + " cover"}
            fill
            priority
            sizes="(max-width:767px) 100vw, 620px"
          />
        </div>
        <div className="pt-5 max-md:p-0">
          <h1 className="font-panton text-[38px] leading-[1.1] font-bold tracking-[-.02em] max-md:text-[32px]">
            {p.name}
          </h1>
          <p className="mt-5 font-manrope text-[22px] leading-[1.6] text-[var(--text-secondary)]">
            {p.price}
          </p>
          <a
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-[26px] rounded-sm border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-sm text-[var(--background)] transition-[background,transform] duration-200 hover:border-[#f4f3ef] hover:bg-[#f4f3ef] active:scale-[.97]"
            href={p.checkoutUrl}
          >
            Buy Now ↗
          </a>
          <div className="mt-8 font-manrope text-base leading-[1.8] text-[#c5c5ca] max-md:text-[15px]">
            {p.description.map((text) => (
              <p className="mb-[18px]" key={text}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
