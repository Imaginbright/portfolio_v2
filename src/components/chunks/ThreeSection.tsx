import React from "react";
import Image from "next/image";

const ThreeSection = () => {
  return (
    <>
      <Image
        src="/images/keyboard.png"
        alt="3D Portfolio Image"
        fill
        priority
        quality={95}
        sizes="(max-width: 768px) 100vw, 75vw"
        className="object-cover transition-all duration-500 group-hover:brightness-35"
      />
      <div className="relative z-10 flex flex-col h-full items-center justify-center">
        <div className="flex items-center gap-4">
          <h1 className="text-9xl leading-none font-cursive text-transparent [-webkit-text-stroke:2px_white]">
            3D
          </h1>
          <Image
            src="/icons/Rightarrow.svg"
            alt="Arrow signifying click to enter"
            width={151}
            height={167}
          />
        </div>
        <h2 className="font-cursive text-[64px] leading-none -mt-4 text-transparent [-webkit-text-stroke:2px_white]">
          Portfolio
        </h2>
      </div>
    </>
  );
};

export default ThreeSection;
