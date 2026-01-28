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
    <main className="h-dvh w-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-24 gap-6 px-[38px]">
        {/* Profile */}
        <section className="md:col-span-13 min-h-[392px] rounded-[30px]  border-2 border-zinc-800 pt-9.5 px-9 bg-card">
          <div className="flex">
            <div className="flex flex-1 flex-col">
              <h1 className="font-bold text-[40px]/12">Okonkwo Somto</h1>
              <h4 className="text-white/55 text-[20px]">@imaginbright</h4>

              <p className="mt-9 text-[#979EA6] text-[20px]/6 ">
                I’m a Web Developer dedicated to building seamless,
                high-performing websites that solve real problems. With
                expertise in React, Next.js, and GSAP, I transform ideas into
                responsive, engaging digital experiences that leave a lasting
                impact.
              </p>
              <Button
                href="#contactMe"
                className="mt-12.5 h4 text-black rounded-2xl border border-black bg-primary shadow-sharp w-fit"
              >
                Get in touch
              </Button>
            </div>

            <div className="flex flex-col">
              <Image
                src="/images/profile.png"
                alt="Profile Picture"
                width={164}
                height={220}
                className="pt-2 loading=eager"
              />

              <div className="flex gap-3 mt-12 items-center">
                <div className="bg-primary rounded-full w-1.5 h-1.5"></div>
                <p className="text-[12px]">Available for work</p>
              </div>

              <p className="text-[12px] ml-[17px]">19/11/2025</p>

              <Image
                src="/icons/Leftarrow.svg"
                alt="Arrow pointing to text that says that I'm Available for work"
                width={31}
                height={38}
                className="ml-32"
              />
            </div>
          </div>
        </section>

        {/* Stack */}
        <section className="md:col-span-5 min-h-[392px] rounded-[30px] border-2 border-zinc-800 px-6 pt-7 bg-card">
          <Stack />
        </section>

        {/* Featured */}
        <aside className="md:col-span-6 md:row-span-2 min-h-[768px] relative">
          {/* 2. THE VISUAL: Absolute positioned to overshoot the top */}

          <div className="w-full h-full rounded-[30px] md:absolute md:-top-18 md:bottom-0 md:h-auto border-2 border-zinc-800 pt-5 px-5 bg-card">
            <FeaturedSidebar posts={featuredPosts} />
          </div>
        </aside>

        {/* Dev Portfolio */}
        <section className="group relative w-full md:col-span-9 min-h-[273px] rounded-[30px] bg-zinc-900 border2 overflow-hidden">
          <Link href="/development" className="absolute inset-0 z-10">
            <span className="sr-only">View Project</span>{" "}
            {/* Accessibility text */}
            <DevSection />
          </Link>
        </section>

        {/* 3D Portfolio */}
        <section className="group relative w-full md:col-span-9 min-h-[273px] rounded-[30px] bg-zinc-900 border2 overflow-hidden">
          <ThreeSection />
        </section>
      </div>
    </main>
  );
};

export default PortfolioGrid;
