import Link from "next/link";
import { navigation } from "@/constants/nav.js";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center pt-10 pb-5 px-4 md:px-[38px] w-full">
      <div className="flex xl:w-[78%] md:w-full justify-between items-center xl:pr-8 md:pr-0">
        <Link href="/" aria-label="Home">
          <p className="text-5xl font-heavy">亮</p>
        </Link>
        <div className="hidden sm:block">
          {navigation.map((link, id) => (
            <Link
              key={id}
              href={link.url}
              className="xl:mx-[30px] md:ml-[30px] font-lekton text-[24px] font-bold"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
