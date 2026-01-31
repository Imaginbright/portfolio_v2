import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/constants/projects";

interface Props {
  params: { slug: string };
}

const Projectpage = async ({ params }: Props) => {
  const { slug } = await params;

  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find current index to determine next/prev projects
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = PROJECTS[currentIndex - 1];
  const nextProject = PROJECTS[currentIndex + 1];

  return (
    <div className="max-w-[1200px] mx-auto mt-20 px-4">
      <div className="flex flex-col md:flex-row items-end justify-between gap-10 md:gap-20">
        <div className="flex flex-col gap-6 flex-1 max-w-xl">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl leading-10">{project.title}</h1>
            <h2 className="text-white/55 text-xl">{project.subtitle}</h2>
          </div>

          <p className="text-[#979EA6] text-lg/6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-col gap-2 mt-4 text-[#979EA6]">
            <div className="grid grid-cols-[50px_1fr]">
              <span className="text-white/40">Role</span>
              <span>{project.role}</span>
            </div>
            <div className="grid grid-cols-[50px_1fr]">
              <span className="text-white/40">Year</span>
              <span>{project.year}</span>
            </div>

            <div className="grid grid-cols-[50px_1fr]">
              <span className="text-white/40">URL</span>
              <Link
                href={project.url}
                target="_blank"
                className="text-blue-400 hover:underline"
              >
                {project.url.replace("https://", "")}
              </Link>
            </div>
            <div className="grid grid-cols-[50px_1fr]">
              <span className="text-white/40">Stack</span>
              <span>{project.stack.join(" | ")}</span>
            </div>
          </div>
        </div>

        <div className="min-w-[390px] h-[480px] overflow-hidden rounded-2xl shrink-0">
          <Image
            src={project.images.main}
            alt={project.title}
            loading="eager"
            width={640}
            height={480}
            className="rounded-2xl h-full w-full object-cover object-[45%_center]"
          />
        </div>
      </div>

      <Image
        src={project.images.screenshot1}
        alt=""
        loading="eager"
        width={640}
        height={480}
        className="rounded-2xl h-full w-full object-cover object-[45%_center] mt-14"
      />

      <Image
        src={project.images.screenshot2}
        alt=""
        loading="eager"
        width={640}
        height={480}
        className="rounded-2xl h-full w-full object-cover object-[45%_center] mt-14 mb-14"
      />

      {/* Navigation Section */}
      <div className="flex max-w-[600px] mx-auto items-center justify-between mb-20 text-sm uppercase tracking-widest border-t border-white/10 pt-10">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="hover:text-blue-400 transition-colors"
          >
            ← Previous
          </Link>
        ) : (
          <span className="text-white/20 cursor-not-allowed">← Previous</span>
        )}

        <Link
          href="/development"
          className="text-white/50 hover:text-white transition-colors"
        >
          Browse portfolio
        </Link>

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="hover:text-blue-400 transition-colors"
          >
            Next →
          </Link>
        ) : (
          <span className="text-white/20 cursor-not-allowed">Next →</span>
        )}
      </div>
    </div>
  );
};

export default Projectpage;

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}
