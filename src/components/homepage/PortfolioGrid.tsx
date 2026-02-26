import Image from "next/image";
import React from "react";
import Button from "../buttons/Button";
import Stack from "../chunks/Stack";
import ThreeSection from "../chunks/ThreeSection";
import DevSection from "../chunks/DevSection";
import FeaturedSidebar from "../FeaturedSidebar";
import { Suspense } from "react";
import FeaturedSidebarSkeleton from "@/components/ui/FeaturedSidebarSkeleton";
import { getFeaturedPosts } from "@/lib/blog";
import Link from "next/link";
import CurrentDate from "../ui/CurrentDate";

const PortfolioGrid = async () => {
  const featuredPosts = getFeaturedPosts(7);

  return (
    <main className="min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-24 gap-4 md:gap-6 px-4 md:px-8 xl:px-9.5">
        {/* Profile Section */}
        <section className="md:col-span-12 xl:col-span-13 min-h-fit xl:min-h-98 rounded-[30px] border-2 border-zinc-800 p-6 md:p-9 bg-card flex flex-col">
          <div className="flex flex-col lg:flex-row gap-8 xl:h-full">
            {/* Left Column */}
            <div className="flex flex-1 flex-col xl:justify-between">
              <div>
                <h1 className="font-bold text-3xl md:text-4xl xl:text-[40px]/12 leading-tight text-balance">
                  Okonkwo Somto
                </h1>
                {/* FIX 1: Changed H4 to a styled P tag to prevent heading skipping */}
                <p className="text-white/55 text-lg md:text-xl font-medium">
                  @imaginbright
                </p>

                {/* FIX 2: Changed P to H2 for better SEO and hierarchy flow */}
                <h2 className="mt-6 md:mt-9 text-[#979EA6] md:text-lg xl:text-[20px]/6 leading-relaxed max-w-prose font-normal">
                  I’m a Web Developer dedicated to building seamless,
                  high-performing websites that solve real problems. With
                  expertise in React, Next.js, and TailWind CSS, I transform
                  ideas into responsive, engaging digital experiences.
                </h2>
              </div>

              <Button
                href="/contact"
                className="mt-8 md:mt-10 py-3 font-bold text-black rounded-2xl xl:rounded-lg border border-black bg-primary hover:bg-white transition-colors w-full shadow-sharp sm:w-fit"
              >
                Get in touch
              </Button>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center lg:items-end xl:items-start shrink-0 xl:justify-between">
              <Image
                src="/images/profile.png"
                alt="Okonkwo Somto Profile Portrait"
                width={164}
                height={220}
                priority
                fetchPriority="high"
                className="pt-2 object-contain w-32 md:w-41 xl:w-41"
              />

              <div className="flex flex-col items-center lg:items-end xl:items-start mt-6 lg:mt-0 xl:h-13 xl:justify-start">
                <div className="flex gap-3 items-center bg-zinc-800/50 px-4 py-2 rounded-full lg:bg-transparent lg:p-0">
                  <div
                    className="bg-primary rounded-full w-2 h-2 animate-pulse"
                    aria-hidden="true"
                  ></div>
                  <p className="text-[12px] font-bold">Available for work</p>
                </div>
                <p className="text-[12px] opacity-70 mt-1 pl-5">
                  <CurrentDate />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stack Section */}
        <section className="md:col-span-5 xl:col-span-5 min-h-75 xl:min-h-98 rounded-[30px] border-2 border-zinc-800 p-6 bg-card">
          {/* Ensure the title inside <Stack /> is an <h3> */}
          <Stack />
        </section>

        {/* Featured Section */}
        <aside className="col-span-1 md:col-span-7 xl:col-span-6 xl:row-span-2 relative min-h-fit md:min-h-75 xl:min-h-192">
          <Suspense fallback={<FeaturedSidebarSkeleton />}>
            <div className="w-full h-full rounded-[30px] border-2 border-zinc-800 p-5 bg-card overflow-y-auto no-scrollbar xl:absolute xl:-top-18 xl:bottom-0 xl:h-auto xl:overflow-hidden">
              {/* Ensure the titles inside <FeaturedSidebar /> are <h3> */}
              <FeaturedSidebar posts={featuredPosts} />
            </div>
          </Suspense>
        </aside>

        {/* Dev Portfolio */}
        <section className="group relative w-full md:col-span-6 xl:col-span-9 min-h-68.25 rounded-[30px] bg-zinc-900 border-2 border-zinc-800 overflow-hidden">
          <div className="absolute inset-0">
            <DevSection />
          </div>
          <Link href="/development" className="absolute inset-0 z-20">
            <span className="sr-only">View Development Projects</span>
          </Link>
        </section>

        {/* 3D Portfolio */}
        <section className="group relative w-full md:col-span-6 xl:col-span-9 min-h-68.25 rounded-[30px] bg-zinc-900 border-2 border-zinc-800 overflow-hidden">
          <div className="absolute inset-0">
            <ThreeSection />
          </div>
          <Link href="/3d" className="absolute inset-0 z-20">
            <span className="sr-only">View 3D Design Projects</span>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default PortfolioGrid;
