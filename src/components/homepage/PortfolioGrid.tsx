import Image from "next/image";
import React from "react";
import Button from "../buttons/Button";
import Stack from "../chunks/Stack";
import ThreeSection from "../chunks/ThreeSection";
import DevSection from "../chunks/DevSection";
import FeaturedSidebar from "../FeaturedSidebar";

import { getFeaturedPostsByCategory } from "@/lib/blog";
import Link from "next/link";

// 2. MAKE COMPONENT ASYNC (Required to fetch data)
const PortfolioGrid = async () => {
  // 3. DEFINE THE VARIABLE HERE
  // This gets the posts labeled "featured" from your MDX files
  const featuredPosts = getFeaturedPostsByCategory("featured", 6);
  return (
    <main className="min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 xl:grid-cols-24 gap-4 md:gap-6 px-4 md:px-8 xl:px-[38px]">
        {/* Profile */}
        <section className="md:col-span-12 xl:col-span-13 min-h-fit xl:min-h-[392px] rounded-[30px]  border-2 border-zinc-800 p-6 md:p-9 bg-card">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-1 flex-col">
              <h1 className="font-bold text-3xl md:text-4xl xl:text-[40px]/12 leading-tight text-balance">
                Okonkwo Somto
              </h1>
              <h4 className="text-white/55 text-lg md:text-xl">
                @imaginbright
              </h4>

              <p className="mt-6 md:mt-9 text-[#979EA6] md:text-lg xl:text-[20px]/6 leading-relaxed max-w-prose">
                I’m a Web Developer dedicated to building seamless,
                high-performing websites that solve real problems. With
                expertise in React, Next.js, and GSAP, I transform ideas into
                responsive, engaging digital experiences that leave a lasting
                impact.
              </p>
              <Button
                href="/contact"
                className="mt-8 md:mt-10 h4 text-black rounded-2xl border border-black bg-primary w-full shadow-sharp sm:w-fit"
              >
                Get in touch
              </Button>
            </div>

            <div className="flex flex-col items-center lg:items-end shrink-0">
              <Image
                src="/images/profile.png"
                alt="Profile Picture"
                width={164}
                height={220}
                priority
                className="pt-2 object-contain w-32 md:w-41 xl:w-[164px]"
              />

              <div className="flex gap-3 mt-6 items-center bg-zinc-800/50 px-4 py-2 rounded-full lg:bg-transparent lg:p-0">
                <div className="bg-primary rounded-full w-2 h-2 animate-pulse"></div>
                <p className="text-[12px]">Available for work</p>
              </div>

              <p className="text-[12px] opacity-40 mt-1">19/11/2025</p>

              <Image
                src="/icons/Leftarrow.svg"
                alt="Arrow pointing to text that says that I'm Available for work"
                width={31}
                height={38}
                className="hidden xl:block ml-32"
              />
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="md:col-span-5 xl:col-span-5 min-h-[300px] xl:min-h-[392px] rounded-[30px] border-2 border-zinc-800 p-6 bg-card">
          <Stack />
        </section>

        {/* Featured */}
        <aside className="md:col-span-7 xl:col-span-6 xl:row-span-2 relative">
          {/* 2. THE VISUAL: Absolute positioned to overshoot the top */}

          <div className="w-full h-full rounded-[30px] border-2 border-zinc-800 p-5 bg-card xl:absolute xl:-top-18 xl:bottom-0 xl:h-auto overflow-hidden">
            <FeaturedSidebar posts={featuredPosts} />
          </div>
        </aside>

        {/* Dev Portfolio */}
        <section className="group relative w-full md:col-span-6 xl:col-span-9 min-h-[273px] rounded-[30px] bg-zinc-900 border-2 border-zinc-800 overflow-hidden">
          {/* We wrap the component in a div that is forced to be the exact size of the rounded section */}
          <div className="absolute inset-0">
            <DevSection />
          </div>

          <Link href="/development" className="absolute inset-0 z-20">
            <span className="sr-only">View Project</span>
          </Link>
        </section>

        {/* 3D Portfolio */}
        <section className="group relative w-full md:col-span-6 xl:col-span-9 min-h-[273px] rounded-[30px] bg-zinc-900 border2 overflow-hidden">
          {/* 1. Content */}
          <ThreeSection />

          {/* 2. Link Overlay */}
          <Link href="/development" className="absolute inset-0 z-20">
            <span className="sr-only">View Project</span>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default PortfolioGrid;
