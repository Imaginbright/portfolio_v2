import React from "react";
import Image from "next/image";

const DevSection = () => {
  return (
    <>
      <Image
        src="/images/portfolio2.png"
        alt="Development Portfolio Image"
        fill
        priority
        quality={95}
        sizes="(max-width: 768px) 100vw, 75vw"
        className="object-cover brightness-28"
      />

      <div className="relative z-10 flex flex-col h-full items-center justify-center">
        <div className="flex items-center gap-2">
          <h1 className="text-[120px] leading-none font-cursive text-transparent [-webkit-text-stroke:2px_white]">
            DEV
          </h1>
          <Image
            src="/icons/Rightarrow.svg"
            alt="Arrow signifying click to enter"
            width={151}
            height={167}
          />
        </div>
        <h2 className="font-cursive text-[64px] leading-none -mt-4 text-transparent [-webkit-text-stroke:2px_white] -ml-12">
          Portfolio
        </h2>
      </div>
    </>
  );
};

export default DevSection;
