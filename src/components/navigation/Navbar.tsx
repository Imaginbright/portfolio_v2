import Link from "next/link";
import { navigation } from "@/constants/nav.js";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center pt-10 pb-5 px-[38px] w-full">
      <div className="flex w-[78%] justify-between items-center pr-8">
        <Link href="/" aria-label="Home">
          <p className="text-5xl font-heavy">亮</p>
        </Link>
        <div>
          {navigation.map((link, id) => (
            <Link
              key={id}
              href={link.url}
              className="mx-[30px] font-lekton text-[24px] font-bold"
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
