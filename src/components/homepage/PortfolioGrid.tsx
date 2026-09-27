import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { getAllPosts } from "@/lib/blog";
import Carousel from "@/components/Carousel";
import ProjectPreview from "@/components/ProjectPreview";
const videos = [
  {
    title: "I replaced my Computer with an iPad",
    image: "/youtube/ipadpc.jpg",
    duration: "4:19",
    url: "https://youtu.be/5jxAUn__TSA?si=GEX2UGCIOh3iCsYm",
  },
  {
    title: "Apple event leaks: iPhone 17, Watch 3 Ultra, AirPods Pro 3",
    image: "/youtube/appleevent.jpg",
    duration: "03:55",
    url: "https://youtu.be/KUUzetPyxKA?si=g4v3B-794dTvVoBO",
  },
  {
    title: "Don’t buy the S20 Ultra in 2026",
    image: "/youtube/s20.jpeg",
    duration: "04:41",
    url: "https://youtu.be/BAT3yC2zZMc?si=vn--0gXKVVY2C_Lc",
  },
];
const eyebrow =
  "font-lekton text-xs leading-[1.5] tracking-[.1em] uppercase text-[var(--text-secondary)]";
const textLink =
  "inline-flex min-h-11 items-center gap-3 whitespace-nowrap text-sm hover:text-[var(--accent)]";
const button =
  "inline-flex min-h-12 items-center justify-center gap-[26px] rounded-sm border border-[#4b4b50] px-5 py-3 text-sm transition-[background,transform] duration-200 hover:bg-[var(--surface-3)] active:scale-[.97]";
const section =
  "border-t border-[var(--border)] pt-10 pb-[54px] max-md:pt-7 max-md:pb-[34px]";
export default function PortfolioGrid() {
  const posts = getAllPosts()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 3);
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-96px))] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]"
    >
      <section className="grid grid-cols-[1.6fr_1fr] items-stretch gap-20 pt-[34px] pb-10 max-[1100px]:gap-[35px] max-lg:grid-cols-[minmax(0,1fr)_38%] max-lg:gap-x-[clamp(12px,3vw,24px)] max-lg:gap-y-0 max-lg:pt-6 max-md:pb-8">
        <div className="flex min-w-0 flex-col max-lg:contents">
          <div className="mb-6.5 flex items-center justify-between gap-5 max-lg:col-span-full max-lg:col-start-1 max-lg:row-start-1 max-lg:mt-0 max-lg:mb-3 max-lg:gap-2">
            <p
              className={`${eyebrow} max-lg:normal-case max-lg:text-[11px] max-lg:tracking-normal max-md:text-[10px]`}
            >
              @imaginbright
            </p>
            <span className="inline-flex items-center gap-2 whitespace-nowrap font-lekton text-[11px] text-[#c5c5c8] max-md:text-[10px]">
              <i className="h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
              Available for work
            </span>
          </div>
          <div className="contents max-lg:col-span-1 max-lg:col-start-1 max-lg:row-start-2 max-lg:block max-lg:self-start">
            <h1 className="font-panton text-[clamp(58px,5.5vw,80px)] leading-[.98] font-black tracking-[-.035em] max-[1100px]:text-[70px] max-lg:text-[clamp(36px,7vw,64px)] max-md:leading-none">
              Okonkwo
              <br />
              Somto<span className="text-[var(--text-secondary)]">.</span>
            </h1>
            <p className="mt-[22px] font-manrope text-xl leading-[1.5] font-medium tracking-[-.015em] max-lg:mt-3.5 max-md:text-[15px] max-md:leading-[1.4]">
              Developer, Designer &amp; 3D Artist
            </p>
          </div>
          <p className="mt-[18px] max-w-[580px] font-manrope text-[15px] leading-[1.75] text-[var(--text-secondary)] max-[1100px]:text-sm max-lg:col-span-full max-lg:row-start-3 max-lg:mt-6 max-lg:max-w-none max-md:leading-[1.75]">
            For me, it’s all about making cool things that work beautifully.
            Sometimes that means writing clean code in Next.js and Tailwind,
            sometimes it&apos;s sculpting a 3D scene, and other times it&apos;s
            hitting record to share my passions with my community.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-[30px] max-lg:col-span-full max-lg:row-start-4 max-lg:mt-4 max-md:gap-[23px]">
            <Link
              className={`${button} border-[var(--accent)] bg-[var(--accent)] text-[var(--background)] hover:border-[#f4f3ef] hover:bg-[#f4f3ef] hover:text-white max-md:gap-5 max-md:px-[15px]`}
              href="/contact"
            >
              Get in touch <ArrowUpRight size={18} />
            </Link>
            <a className={textLink} href="#development">
              Development <ArrowDown size={16} />
            </a>
          </div>
        </div>
        <figure className="relative min-h-[390px] overflow-hidden bg-[var(--surface-2)] after:absolute after:inset-x-0 after:top-[60%] after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-black/70 after:content-[''] max-[1100px]:min-h-[420px] max-lg:col-span-1 max-lg:col-start-2 max-lg:row-start-2 max-lg:mt-0 max-lg:h-[clamp(112px,18vw,184px)] max-lg:min-h-0 max-lg:self-start">
          <Image
            className="object-cover object-[center_30%] brightness-[.63] transition-[filter] duration-600 max-sm:object-center sm:max-lg:object-[center_55%]"
            src="/optimized/profile1.webp"
            alt="Okonkwo Somto in profile"
            fill
            priority
            sizes="(max-width:767px) calc((100vw - 36px) * 0.38), (max-width:1023px) calc((100vw - 56px) * 0.38), 440px"
          />
          <figcaption className="absolute right-6 bottom-[23px] left-6 z-1 flex justify-between font-lekton text-[11px] text-[#e6e6e8] max-lg:hidden">
            <span>Okonkwo Somto</span>
            <span>@imaginbright</span>
          </figcaption>
        </figure>
      </section>
      <section id="development" className={section}>
        <div className="mb-[26px] flex items-end justify-between gap-6 max-md:mb-[22px] max-md:gap-3.5">
          <div>
            <span
              className={`${eyebrow} mb-2 block max-md:mb-[5px] max-md:text-[10px]`}
            >
              Portfolio
            </span>
            <h2 className="font-panton text-4xl leading-[1.1] font-bold tracking-[-.025em] max-md:text-[28px]">
              Development
            </h2>
          </div>
          <Link
            className={`${textLink} max-md:gap-[7px] max-md:text-[11px]`}
            href="/development"
          >
            View all projects <ArrowUpRight size={17} />
          </Link>
        </div>
        <Carousel
          label="development projects"
          trackClassName="grid grid-cols-[1.7fr_1fr] gap-x-8 gap-y-7 max-md:flex"
        >
          {PROJECTS.slice(0, 3).map((project, index) => (
            <ProjectPreview
              key={project.slug}
              project={project}
              index={index}
              className={index === 0 ? "row-span-2" : ""}
              imageClassName={
                index === 0
                  ? "h-[calc(100%-73px)] [--project-aspect:auto] max-md:h-auto"
                  : "[--project-aspect:2.35]"
              }
              titleClassName={index === 0 ? "" : "[--project-title-size:21px]"}
            />
          ))}
        </Carousel>
      </section>
      <section
        className={`${section} grid grid-cols-[1fr_2fr] items-center gap-8 max-md:grid-cols-1 max-md:gap-[22px]`}
      >
        <div className="max-md:grid max-md:grid-cols-[1fr_auto] max-md:items-center">
          <span className={`${eyebrow} max-md:col-start-1`}>3D</span>
          <h2 className="mt-[15px] font-panton text-[56px] leading-[1.08] font-bold tracking-[-.025em] max-md:col-start-1 max-md:mt-2 max-md:text-[34px]">
            3D Lab
          </h2>
          <p className="mt-3.5 leading-[1.6] text-[var(--text-secondary)] max-md:col-start-1 max-md:mt-2 max-md:text-[13px]">
            Coming Soon
          </p>
          <Link
            className={`${textLink} mt-[35px] max-md:col-start-2 max-md:row-start-2 max-md:row-end-4 max-md:m-0 max-md:text-[13px]`}
            href="/3d"
          >
            View 3D <ArrowUpRight size={18} />
          </Link>
        </div>
        <Link
          className="relative block aspect-[2.1] overflow-hidden bg-[var(--surface-1)] max-md:aspect-[1.6]"
          href="/3d"
          aria-label="View the 3D Lab"
        >
          <Image
            className="object-cover"
            src="/optimized/keyboard.webp"
            alt="3D keyboard scene"
            fill
            sizes="(max-width:767px) 100vw, 850px"
          />
        </Link>
      </section>
      <section className={section}>
        <div className="mb-[26px] flex items-end justify-between gap-6 max-md:mb-[22px] max-md:gap-3.5">
          <h2 className="font-panton text-4xl leading-[1.1] font-bold tracking-[-.025em] max-md:text-[28px]">
            Videos
          </h2>
          <a
            className={`${textLink} max-md:gap-[7px] max-md:text-[11px]`}
            href="https://www.youtube.com/@imaginbright"
          >
            YouTube <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-7 max-md:grid-cols-1 max-md:gap-6">
          {videos.map((v) => (
            <a
              href={v.url}
              key={v.title}
              className="group max-md:grid max-md:grid-cols-[42%_1fr] max-md:items-center max-md:gap-4 max-md:first:block"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  className="object-cover"
                  src={v.image}
                  alt=""
                  fill
                  sizes="(max-width:767px) 90vw, 420px"
                />
                <span className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5 bg-[#101011c9] px-2 py-[5px] font-lekton text-[11px]">
                  <Play size={13} fill="currentColor" />
                  {v.duration}
                </span>
              </div>
              <h3 className="mt-3.5 max-w-[340px] font-manrope text-lg leading-[1.35] font-semibold tracking-[-.015em] group-hover:underline group-hover:underline-offset-4 max-md:m-0 max-md:text-[15px] max-md:group-first:mt-[15px] max-md:group-first:text-xl">
                {v.title}
              </h3>
            </a>
          ))}
        </div>
      </section>
      <section className={section}>
        <div className="mb-[26px] flex items-end justify-between gap-6 max-md:mb-[22px] max-md:gap-3.5">
          <h2 className="font-panton text-4xl leading-[1.1] font-bold tracking-[-.025em] max-md:text-[28px]">
            Latest writing
          </h2>
          <Link
            className={`${textLink} max-md:gap-[7px] max-md:text-[11px]`}
            href="/blog"
          >
            Blog <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-7 max-[1100px]:grid-cols-1 max-md:gap-0">
          {posts.map((post) => (
            <Link
              className="flex items-start gap-4 max-[1100px]:items-center max-[1100px]:border-b max-[1100px]:border-[var(--border)] max-[1100px]:py-3.75"
              key={post.slug}
              href={"/blog/" + post.slug}
            >
              <div className="relative aspect-square w-[78px] shrink-0 max-md:w-[68px]">
                <Image
                  className="object-cover"
                  src={post.thumbnail}
                  alt=""
                  fill
                  sizes="100px"
                />
              </div>
              <div>
                <p
                  className={`${eyebrow} text-[10px] tracking-[.04em] [&_span]:text-[var(--text-muted)] max-md:[&_span]:hidden`}
                >
                  {post.category} <span> / {post.date}</span>
                </p>
                <h3 className="mt-2 font-panton text-[17px] leading-[1.4] font-bold tracking-[-.015em] max-[1100px]:text-[21px] max-md:text-[17px]">
                  {post.title}
                </h3>
              </div>
              <ArrowUpRight
                className="ml-auto hidden shrink-0 max-[1100px]:block"
                size={20}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="flex items-center justify-between gap-[30px] border-t border-[var(--border)] pt-[45px] pb-16 max-md:flex-col max-md:items-start max-md:gap-[22px] max-md:pt-[30px] max-md:pb-10">
        <div>
          <p className={eyebrow}>Contact</p>
          <h2 className="mt-3 font-panton text-[40px] leading-[1.1] font-bold tracking-[-.025em] max-md:text-[32px]">
            Have a project in mind?
          </h2>
        </div>
        <Link className={button} href="/contact">
          Get in touch <ArrowUpRight size={20} />
        </Link>
      </section>
    </main>
  );
}
