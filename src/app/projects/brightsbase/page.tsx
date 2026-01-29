import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col md:flex-row items-end justify-between gap-10 md:gap-20 max-w-[1200px] mx-auto mt-20 px-4">
      <div className="flex flex-col gap-6 flex-1 max-w-xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl leading-10">BrightsBase</h1>
          <h2 className="text-white/55 text-xl">FullStack Application</h2>
        </div>

        <p className="text-[#979EA6] text-lg/6 leading-relaxed">
          Brightbase is a student-centric question and answer platform that
          connects learners with answers — modeled after community sites like
          Reddit but focused on academic help. Students can ask questions,
          browse answers, and engage with a knowledge-sharing community.
        </p>

        <div className="flex flex-col gap-2 mt-4 text-[#979EA6]">
          <div className="grid grid-cols-[50px_1fr]">
            <span className="text-white/40">Role</span>
            <span>Full Stack Developer</span>
          </div>
          <div className="grid grid-cols-[50px_1fr]">
            <span className="text-white/40">Year</span>
            <span>2026</span>
          </div>

          <div className="grid grid-cols-[50px_1fr]">
            <span className="text-white/40">URL</span>
            <Link href="#" className="text-blue-400 hover:underline">
              brightsbase.com
            </Link>
          </div>
          <div className="grid grid-cols-[50px_1fr]">
            <span className="text-white/40">Stack</span>
            <span>Next.Js | Tailwind CSS | MongoDB Atlas | Node.JS</span>
          </div>
        </div>
      </div>

      <div className="min-w-[390px] h-[480px] overflow-hidden rounded-2xl shrink-0">
        <Image
          src="/images/bb.png"
          alt=""
          loading="eager"
          width={640}
          height={480}
          className="rounded-2xl h-full w-full object-cover object-[45%_center]"
        />
      </div>
    </div>
  );
};

export default page;
