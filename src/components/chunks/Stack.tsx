import React from "react";
import Badge from "../buttons/Badge";

const Stack = () => {
  return (
    <div>
      {" "}
      <h2 className="text-[40px] leading-10 font-bold">Stack</h2>
      <h4 className="text-white/55">Web Development</h4>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2">
          <Badge
            className="mt-2.5 w-full"
            width={26}
            height={22}
            icon="/icons/react.svg"
          >
            React
          </Badge>

          <Badge
            className="mt-2.5 w-full"
            width={25}
            height={25}
            icon="/icons/next.svg"
          >
            Next.js
          </Badge>
        </div>

        <Badge
          className="mt-2.5 w-full"
          width={39}
          height={19}
          icon="/icons/tailwind.svg"
        >
          Tailwind CSS
        </Badge>

        <div className="flex gap-2">
          <Badge
            className="mt-2.5 w-full"
            width={20}
            height={24}
            icon="/icons/node.svg"
          >
            Node.js
          </Badge>

          <Badge
            className="mt-2.5 w-full"
            width={22}
            height={24}
            icon="/icons/gsap.svg"
          >
            GSAP
          </Badge>
        </div>

        <h4 className="text-white/55 mt-3.5">3D/Design</h4>

        <Badge
          className="mt-2.5 w-full"
          width={21}
          height={19}
          icon="/icons/affinity.svg"
        >
          Affinity Photo
        </Badge>

        <Badge
          className="mt-2.5 w-full"
          width={28}
          height={21}
          icon="/icons/blender.svg"
        >
          Blender
        </Badge>
      </div>
    </div>
  );
};

export default Stack;
