import { navigation } from "@/constants/nav";
import { WebProjects } from "../../constants/WebProjects.js";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="max-w-[1600px] mx-auto w-full px-12">
      <nav className="flex items-center py-10 w-full">
        <div className="flex w-full justify-between items-center">
          <Link href="/" aria-label="Home">
            <p className="text-5xl font-heavy">亮</p>
          </Link>
          <div>
            {navigation.map((link, id) => (
              <Link
                key={id}
                href={link.url}
                className="ml-[30px] font-lekton text-[24px] font-bold"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="h-dvh w-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-24 pb-20">
          {WebProjects.map((project) => (
            <Link
              href={project.link}
              key={project.id}
              className="group flex flex-col gap-4"
            >
              <section className="w-full min-h-[300px] rounded-2xl bg-zinc-900 border-2 border-zinc-800 overflow-hidden relative transition-transform duration-300 group-hover:-translate-y-2">
                {/*actual Image component here when ready
                   <Image 
                     src={project.image} 
                     alt={project.title} 
                     fill 
                     className="object-cover"
                   /> 
                */}
                <div className="flex items-center justify-center h-full text-zinc-500">
                  {/* Placeholder text (remove this when you add real images) */}
                  {project.title} Preview
                </div>
              </section>

              <p className="font-lekton text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                {project.title}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default page;
