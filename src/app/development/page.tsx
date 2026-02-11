import { WebProjects } from "../../constants/WebProjects.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Navbar2 from "@/components/navigation/NavBar2";
import { getBlurData } from "@/lib/blurhash";

// 1. Convert to Server Component for maximum speed
const Page = async () => {
  // 2. Pre-generate blurs on the server
  const projectsWithBlur = await Promise.all(
    WebProjects.map(async (project) => ({
      ...project,
      blurDataURL: await getBlurData(project.image),
    })),
  );

  return (
    <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 xl:px-12">
      <Navbar2 />

      <main className="min-h-screen w-full flex flex-col pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-8 md:gap-y-12 xl:gap-y-16 pb-20">
          {projectsWithBlur.map((project, index) => (
            <Link
              href={project.link}
              key={project.id}
              className="group flex flex-col gap-4"
            >
              <section className="w-full min-h-[300px] aspect-video rounded-2xl bg-zinc-900 border-2 border-zinc-800 overflow-hidden relative transition-transform duration-300 group-hover:-translate-y-2">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  // OPTIMIZATION 1: Responsive sizing (Kills the 671KB waste)
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  // OPTIMIZATION 2: LCP priority for the first project
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  // OPTIMIZATION 3: Blur-up effect
                  placeholder="blur"
                  blurDataURL={project.blurDataURL}
                  className="object-cover"
                />
              </section>

              <p className="font-lekton text-2xl font-bold text-white group-hover:text-primary transition-colors">
                {project.title}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Page;
