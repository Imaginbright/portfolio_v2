import React from "react";
import Image from "next/image";

const ThreeSection = () => {
  return (
    // w-full h-full ensures it stretches to the 'absolute inset-0' wrapper
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image: Now fills the parent 273px height perfectly */}
      <Image
        src="/images/keyboard.png"
        alt="3D Portfolio Image"
        fill
        priority
        quality={90}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover brightness-[0.35] transition-transform duration-700 group-hover:scale-105"
      />

      {/* Content Container: Centered on top */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-7xl sm:text-8xl md:text-9xl xl:text-[120px] leading-none font-cursive text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] transition-all">
            3D
          </h1>

          {/* Arrow Container: Preserves aspect ratio while scaling */}
          <div className="relative w-16 sm:w-24 md:w-32 xl:w-[151px] aspect-151/167 shrink-0">
            <Image
              src="/icons/Rightarrow.svg"
              alt="Arrow"
              fill
              className="object-contain group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"
            />
          </div>
        </div>

        <h2 className="font-cursive text-4xl sm:text-5xl md:text-6xl xl:text-[64px] leading-none -mt-2 md:-mt-4 text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] transition-all">
          Portfolio
        </h2>
      </div>

      {/* Mobile Indicator */}
      <div className="absolute bottom-6 right-6 md:hidden opacity-50 z-20">
        <span className="text-[10px] uppercase tracking-widest text-white font-mono">
          Tap to View
        </span>
      </div>
    </div>
  );
};

export default ThreeSection;
