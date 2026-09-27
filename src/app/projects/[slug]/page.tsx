import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/constants/projects";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = PROJECTS.find((p) => p.slug === slug);
  return {
    title: p?.title,
    description: p?.description,
    alternates: { canonical: "/projects/" + slug },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params,
    index = PROJECTS.findIndex((p) => p.slug === slug),
    project = PROJECTS[index];
  if (!project) notFound();
  const prev = PROJECTS[index - 1],
    next = PROJECTS[index + 1];
  const eyebrow =
    "font-lekton text-xs leading-[1.5] tracking-[.1em] uppercase text-[var(--text-secondary)]";
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-96px))] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]"
    >
      <header className="flex items-end justify-between gap-6 pt-[54px] pb-9 max-md:flex-col max-md:items-start max-md:gap-[18px] max-md:pt-[35px] max-md:pb-[26px]">
        <div>
          <Link href="/development" className={eyebrow}>
            ← Development / {String(index + 1).padStart(2, "0")}
          </Link>
          <h1 className="mt-3.5 font-panton text-[clamp(42px,5vw,68px)] leading-[1.03] font-black tracking-[-.025em] max-md:mt-2.5 max-md:text-[44px]">
            {project.title}
          </h1>
          <p className="mt-4 font-manrope text-xl leading-[1.55] font-medium text-[var(--text-secondary)] max-md:text-[17px]">
            {project.subtitle}
          </p>
        </div>
        <a
          className="inline-flex min-h-12 items-center justify-center gap-[26px] rounded-sm border border-[#4b4b50] px-5 py-3 text-sm transition-[background,transform] duration-200 hover:bg-[var(--surface-3)] active:scale-[.97]"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          Visit website ↗
        </a>
      </header>
      <div className="relative aspect-[2] overflow-hidden bg-[var(--surface-1)] max-md:aspect-[1.3]">
        <Image
          className="object-cover"
          src={project.images.main}
          alt={project.title + " website overview"}
          fill
          priority
          sizes="(max-width:767px) 100vw, 1320px"
        />
      </div>
      <section className="grid grid-cols-[1fr_2fr] gap-[60px] pt-[50px] pb-[60px] max-md:grid-cols-1 max-md:gap-[22px] max-md:pt-[30px] max-md:pb-[35px]">
        <h2 className="font-panton text-[30px] leading-[1.12] font-bold tracking-[-.02em] max-md:text-[25px]">
          {project.title}
        </h2>
        <div>
          <p className="max-w-[740px] font-manrope text-[19px] leading-[1.75] text-[#c3c3c8] max-md:text-base">
            {project.description}
          </p>
          <dl className="mt-8 grid grid-cols-2 font-lekton gap-6 border-t border-[var(--border)] pt-7 max-md:gap-x-4 max-md:gap-y-[22px] [&_dt]:mb-2 [&_dt]:font-lekton [&_dt]:text-xs [&_dt]:text-[var(--text-muted)] [&_dd]:m-0 [&_dd]:[overflow-wrap:anywhere] [&_dd]:text-sm max-md:[&_dd]:text-xs">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack.join(" / ")}</dd>
            </div>
            <div>
              <dt>URL</dt>
              <dd>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {project.url.replace("https://", "")} ↗
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <div className="grid gap-[42px] max-md:gap-6">
        {[project.images.screenshot1, project.images.screenshot2].map(
          (src, i) => (
            <figure key={src}>
              <Image
                className="block h-auto w-full"
                src={src}
                alt={project.title + " — screenshot " + (i + 1)}
                width={2000}
                height={1200}
                sizes="(max-width:767px) 100vw, 1320px"
              />
              <figcaption className="flex justify-between pt-3 font-lekton text-xs leading-[1.6] text-[var(--text-secondary)]">
                {project.title}
                <span>{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ),
        )}
      </div>
      <nav
        className="mt-[55px] flex items-center justify-between gap-6 border-t border-[var(--border)] py-[35px] font-lekton text-xs text-[var(--text-secondary)] max-md:mt-[30px] max-md:flex-wrap max-md:gap-3.5 max-md:text-[11px] [&_strong]:mt-2.5 [&_strong]:block [&_strong]:font-panton [&_strong]:text-[22px] [&_strong]:font-bold [&_strong]:text-[var(--text-primary)] max-md:[&_strong]:text-[17px] [&>a:last-child]:text-right [&>a:nth-child(2)]:max-md:order-3 [&>a:nth-child(2)]:max-md:w-full [&>a:nth-child(2)]:max-md:text-center"
        aria-label="Project navigation"
      >
        {prev ? (
          <Link href={"/projects/" + prev.slug}>
            ← Previous <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span />
        )}
        <Link href="/development">View all projects</Link>
        {next ? (
          <Link href={"/projects/" + next.slug}>
            Next →<strong>{next.title}</strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}
