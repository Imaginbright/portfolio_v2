import React from "react";
import Image from "next/image";

const ThreeSection = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <Image
        src="/images/keyboard.png"
        alt="3D Portfolio Image"
        fill
        priority
        quality={90}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover brightness-[0.35] transition-transform duration-700 group-hover:scale-105"
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-7xl sm:text-8xl md:text-9xl xl:text-[120px] leading-none font-cursive text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] transition-all">
            3D
          </h1>

          <div className="relative w-16 sm:w-24 md:w-32 xl:w-[151px] aspect-151/167">
            <Image
              src="/icons/Rightarrow.svg"
              alt="Arrow signifying click to enter"
              fill
              className="object-contain group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"
            />
          </div>
        </div>

        <h2 className="font-cursive text-4xl sm:text-5xl md:text-6xl xl:text-[64px] leading-none -mt-2 md:-mt-4 text-transparent [-webkit-text-stroke:1px_white] md:[-webkit-text-stroke:2px_white] transition-all">
          Portfolio
        </h2>
      </div>
      <div className="absolute bottom-6 right-6 md:hidden opacity-50">
        <span className="text-[10px] uppercase tracking-widest text-white font-mono">
          Tap to View
        </span>
      </div>
    </div>
  );
};

export default ThreeSection;
