import React from "react";
import Image from "next/image";

const DevSection = () => {
  return (
    // We use h-full and w-full here to match the 'absolute inset-0' wrapper
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image: 'fill' now correctly targets the 273px parent height */}
      <Image
        src="/images/portfolio2.png"
        alt="Development Portfolio Image"
        fill
        priority
        quality={90}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover brightness-[0.28] transition-transform duration-700 group-hover:scale-105"
      />

      {/* Content Container: Centered on top of the full-bleed image */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-6xl sm:text-8xl md:text-9xl xl:text-[120px] leading-none font-cursive text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] transition-all">
            DEV
          </h1>

          <div className="relative w-16 sm:w-24 md:w-32 xl:w-[151px] aspect-[151/167] shrink-0">
            <Image
              src="/icons/Rightarrow.svg"
              alt="Arrow"
              fill
              className="object-contain group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"
            />
          </div>
        </div>

        <h2 className="font-cursive text-4xl sm:text-5xl md:text-6xl xl:text-[64px] leading-none -mt-2 md:-mt-4 text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] -ml-6 md:-ml-12 transition-all">
          Portfolio
        </h2>
      </div>

      {/* Mobile Hint */}
      <div className="absolute bottom-6 right-6 md:hidden opacity-50 z-20">
        <span className="text-[10px] uppercase tracking-widest text-white font-mono">
          Tap to View
        </span>
      </div>
    </div>
  );
};

export default DevSection;
