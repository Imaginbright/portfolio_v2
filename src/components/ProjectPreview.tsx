import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
export default function ProjectPreview({
  project,
  index = 0,
  priority = false,
  className = "",
  imageClassName = "",
  titleClassName = "",
}: {
  project: (typeof PROJECTS)[number];
  index?: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
}) {
  return (
    <Link className={`group block min-w-0 max-md:flex-[0_0_90vw] max-md:snap-start max-md:pt-0! ${className}`} href={"/projects/" + project.slug}>
      <div className={`relative aspect-[var(--project-aspect,16/10)] overflow-hidden border border-[var(--border)] bg-[var(--surface-2)] max-md:h-auto max-md:[--project-aspect:1.25] ${imageClassName}`}>
        <Image
          className="object-cover transition-transform duration-600 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.025]"
          src={project.images.main}
          alt={project.title + " website preview"}
          fill
          priority={priority}
          sizes="(max-width: 767px) 90vw, (max-width: 1100px) 60vw, 850px"
        />
        <span className="absolute right-4 bottom-4 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/20 bg-[rgba(18,18,20,.65)] text-white backdrop-blur-[8px]" aria-hidden="true">
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="flex items-baseline gap-4 pt-[17px] max-md:gap-3 max-md:pt-3.5">
        <span className="font-lekton text-xs text-[var(--text-muted)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className={`font-panton text-[length:var(--project-title-size,25px)] leading-[1.12] font-bold tracking-[-.02em] max-md:[--project-title-size:23px] ${titleClassName}`}>{project.title}</h3>
          <p className="mt-1 font-manrope text-xs leading-[1.6] text-[var(--text-secondary)] max-md:text-[11px]">{project.subtitle}</p>
        </div>
        <span className="ml-auto font-lekton text-xs text-[var(--text-muted)] max-md:pr-1">{project.year}</span>
      </div>
    </Link>
  );
}
