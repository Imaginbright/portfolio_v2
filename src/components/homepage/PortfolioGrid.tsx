import React from "react";

const PortfolioGrid = () => {
  return (
    <main className="h-dvh w-full flex flex-col ">
      <div className="grid grid-cols-1 md:grid-cols-24 gap-6 px-[38px]">
        {/* Profile */}
        <section className="md:col-span-13 min-h-[392px] rounded-2xl bg-zinc-900 p-7">
          Profile
        </section>

        {/* Stack */}
        <section className="md:col-span-5 min-h-[392px] rounded-2xl bg-zinc-900 p-7">
          Stack
        </section>

        {/* Top Content */}
        <aside className="md:col-span-6 md:row-span-2 min-h-[768px] relative">
          {/* 2. THE VISUAL: Absolute positioned to overshoot the top */}
          <div className="w-full h-full bg-zinc-900 rounded-2xl p-7 md:absolute md:-top-18 md:bottom-0 md:h-auto">
            Top Content
          </div>
        </aside>

        {/* Dev Portfolio */}
        <section className="md:col-span-9 min-h-[273px] rounded-2xl bg-zinc-900 p-7">
          Dev Portfolio
        </section>

        {/* 3D Portfolio */}
        <section className="md:col-span-9 min-h-[273px] rounded-2xl bg-zinc-900 p-7">
          3D Portfolio
        </section>
      </div>
    </main>
  );
};

export default PortfolioGrid;
