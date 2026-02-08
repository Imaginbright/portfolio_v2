import React from "react";
import Image from "next/image";
import Button from "@/components/buttons/Button";

const WorkInProgress = () => {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: The Visual */}
        <div className="flex-1 flex justify-center items-center order-1 md:order-1">
          <div className="relative w-[250px] h-[250px] md:w-[450px] md:h-[450px] animate-pulse">
            <Image
              src="/images/wip.svg"
              alt="Under Construction"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: The Message */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-2">
          <h1 className="text-5xl md:text-7xl xl:text-7xl font-cursive text-primary uppercase leading-[0.9]">
            3D Lab <br />
            <span className="text-white">Coming Soon</span>
          </h1>

          <p className="mt-6 text-[#979EA6] font-lekton text-lg md:text-xl max-w-md leading-relaxed">
            I&apos;m currently rendering some high-quality experiences and
            fine-tuning the 3D models. Check back soon to see the full lab in
            action! 🛠️
          </p>

          <div className="mt-8">
            <Button
              href="/"
              className="px-12 h-16 bg-primary text-black font-bold rounded-2xl shadow-sharp border-2 border-black transition-all hover:-translate-y-1 active:translate-y-0.5"
            >
              Back to Home
            </Button>
          </div>

          <div className="flex gap-3 mt-12 items-center opacity-40">
            <div className="bg-primary rounded-full w-2 h-2 animate-pulse"></div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-mono">
              Build v1
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkInProgress;
