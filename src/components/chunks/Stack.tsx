/* Stack.tsx */
import React from "react";
import Badge from "../buttons/Badge";

const Stack = () => {
  return (
    <div className="flex flex-col h-full justify-between pb-2">
      <div>
        <h2 className="text-[36px] xl:text-[40px] leading-none font-bold mb-1">
          Stack
        </h2>

        <div className="flex flex-col gap-2">
          <h4 className="text-white/55 font-lekton mb-3 text-sm uppercase tracking-widest">
            Web Development
          </h4>
          <div className="flex gap-2">
            <Badge
              className="w-full"
              width={22}
              height={22}
              icon="/icons/react.svg"
            >
              React
            </Badge>
            <Badge
              className="w-full"
              width={22}
              height={22}
              icon="/icons/next.svg"
            >
              Next.js
            </Badge>
          </div>
          <Badge
            className="w-full"
            width={32}
            height={18}
            icon="/icons/tailwind.svg"
          >
            Tailwind CSS
          </Badge>
          <div className="flex gap-2">
            <Badge
              className="w-full"
              width={18}
              height={22}
              icon="/icons/node.svg"
            >
              Node.js
            </Badge>
            <Badge
              className="w-full"
              width={20}
              height={22}
              icon="/icons/gsap.svg"
            >
              GSAP
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-white/55 font-lekton mb-3 text-sm uppercase tracking-widest">
          3D / Design
        </h4>
        <div className="flex flex-col gap-2">
          <Badge
            className="w-full"
            width={20}
            height={18}
            icon="/icons/affinity.svg"
          >
            Affinity Photo
          </Badge>
          <Badge
            className="w-full"
            width={24}
            height={18}
            icon="/icons/blender.svg"
          >
            Blender
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Stack;
