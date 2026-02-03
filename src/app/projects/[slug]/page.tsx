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

  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = PROJECTS[currentIndex - 1];
  const nextProject = PROJECTS[currentIndex + 1];

  return (
    <div className="mt-4 md:mt-20">
      {/* Header Section: Stacked on mobile, Side-by-side on tablet/desktop */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 md:gap-16">
        {/* Project Info */}
        <div className="flex flex-col gap-6 w-full flex-1">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance">
              {project.title}
            </h1>
            <h2 className="text-white/55 text-lg md:text-xl font-medium">
              {project.subtitle}
            </h2>
          </div>

          <p className="text-[#979EA6] text-base md:text-lg leading-relaxed max-w-prose">
            {project.description}
          </p>

          {/* Meta Data Grid */}
          <div className="flex flex-col gap-3 mt-4 text-[#979EA6] border-t border-white/5 pt-6">
            <MetaRow label="Role" value={project.role} />
            <MetaRow label="Year" value={project.year} />
            <MetaRow
              label="URL"
              value={
                <Link
                  href={project.url}
                  target="_blank"
                  className="text-primary hover:underline transition-all"
                >
                  {project.url.replace("https://", "")}
                </Link>
              }
            />
            <MetaRow label="Stack" value={project.stack.join(" | ")} />
          </div>
        </div>

        {/* Main Hero Image: Aspect-ratio driven logic */}
        <div className="relative w-full lg:w-[450px] aspect-4/5 md:aspect-video lg:aspect-3/4 overflow-hidden rounded-3xl shrink-0 bg-zinc-900">
          <Image
            src={project.images.main}
            alt={project.title}
            priority
            fill
            className="object-cover object-[45%_center]"
          />
        </div>
      </div>

      {/* Gallery Screenshots: Fixed the "Beanstalk" stretching */}
      <div className="mt-16 md:mt-24 space-y-10 md:space-y-20 ">
        <GalleryImage src={project.images.screenshot1} alt="Screenshot 1" />
        <GalleryImage src={project.images.screenshot2} alt="Screenshot 2" />
      </div>

      {/* Navigation: Responsive spacing and touch targets */}
      <nav className="flex flex-col sm:flex-row gap-8 items-center justify-between mt-20 mb-20 py-10 border-t border-white/10">
        <div className="flex items-center justify-between w-full sm:w-auto sm:gap-12">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="text-sm uppercase tracking-widest hover:text-primary transition-colors py-2"
            >
              ← Prev
            </Link>
          ) : (
            <span className="text-sm uppercase tracking-widest text-white/10">
              ← Prev
            </span>
          )}

          <Link
            href="/development"
            className="text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors py-2 sm:hidden"
          >
            Portfolio
          </Link>

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="text-sm uppercase tracking-widest hover:text-primary transition-colors py-2"
            >
              Next →
            </Link>
          ) : (
            <span className="text-sm uppercase tracking-widest text-white/10">
              Next →
            </span>
          )}
        </div>

        <Link
          href="/development"
          className="hidden sm:block text-sm uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          Browse portfolio
        </Link>
      </nav>
    </div>
  );
};

// Helper Components for cleaner code
const MetaRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-[80px_1fr] text-sm md:text-base">
    <span className="text-white/30 font-medium uppercase tracking-tighter">
      {label}
    </span>
    <span className="text-white/80">{value}</span>
  </div>
);

const GalleryImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative w-full aspect-square md:aspect-video rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl">
    <Image src={src} alt={alt} fill className="object-cover object-top" />
  </div>
);

export default Projectpage;

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}
