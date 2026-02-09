"use client"; // Required for useState and useEffect

import { WebProjects } from "../../constants/WebProjects.js";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Navbar2 from "@/components/navigation/NavBar2";
import WebProjectsSkeleton from "@/components/ui/WebProjectsSkeleton"; // Import your skeleton

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading period (e.g., 1.5 seconds)
    // This ensures your "clean" shimmer is actually seen.
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 xl:px-12">
      <Navbar2 />

      <main className="h-dvh w-full flex flex-col">
        {isLoading ? (
          // 1. Show your imported skeleton while loading
          <WebProjectsSkeleton />
        ) : (
          // 2. Show your actual grid once loading is done
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-16 gap-y-8 md:gap-y-12 xl:gap-y-16 pb-20">
            {WebProjects.map((project) => (
              <Link
                href={project.link}
                key={project.id}
                className="group flex flex-col gap-4"
              >
                <section className="w-full min-h-[300px] rounded-2xl bg-zinc-900 border-2 border-zinc-800 overflow-hidden relative transition-transform duration-300 group-hover:-translate-y-2">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </section>

                <p className="font-lekton text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                  {project.title}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
