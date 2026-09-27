import Link from "next/link";
import { PROJECTS } from "@/constants/projects";
import ProjectPreview from "@/components/ProjectPreview";
import Carousel from "@/components/Carousel";
export const metadata = { title: "Development" };
export default function Development() {
  return (
    <main
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-96px))] pb-[70px] font-manrope max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)] max-md:pb-10"
    >
      <header className="flex items-end justify-between gap-6 pt-[54px] pb-9 max-md:flex-col max-md:items-start max-md:gap-[18px] max-md:pt-[35px] max-md:pb-[26px]">
        <div>
          <p className="font-lekton text-xs leading-[1.5] tracking-[.1em] uppercase text-[var(--text-secondary)]">
            Portfolio / {String(PROJECTS.length).padStart(2, "0")}
          </p>
          <h1 className="mt-3.5 font-panton text-[clamp(42px,5vw,68px)] leading-[1.03] font-black tracking-[-.025em] max-md:mt-2.5 max-md:text-[44px]">
            Development
          </h1>
        </div>
        <Link
          className="inline-flex min-h-11 items-center gap-3 whitespace-nowrap text-sm hover:text-[var(--accent)]"
          href="/contact"
        >
          Get in touch ↗
        </Link>
      </header>
      <Carousel
        label="development projects"
        trackClassName="grid grid-cols-12 gap-x-9 gap-y-16 max-md:flex"
      >
        {PROJECTS.map((project, index) => {
          const position = index % 4;
          const className = `${position === 0 || position === 3 ? "col-span-7" : "col-span-5"} ${position === 1 ? "pt-[95px]" : ""} ${position === 2 ? "pt-2.5" : ""} ${index === PROJECTS.length - 1 ? "col-span-8" : ""}`;
          return (
            <ProjectPreview
              className={className}
              key={project.slug}
              project={project}
              index={index}
              priority={index === 0}
            />
          );
        })}
      </Carousel>
    </main>
  );
}
