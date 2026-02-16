"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { navigation } from "@/constants/nav";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu Whn i scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <nav className="flex items-center pt-10 pb-5 px-4 md:px-9.5 w-full xl:pb-7">
      <div className="flex xl:w-[78%] md:w-full w-full justify-between items-center xl:pr-8 md:pr-0">
        <Link href="/" aria-label="Home" onClick={() => setIsOpen(false)}>
          <p className="text-4xl font-heavy max-sm:text-3xl">Bright</p>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:block">
          {navigation.map((link, id) => (
            <Link
              key={id}
              href={link.url}
              className="xl:mx-7.5 md:ml-7.5 font-lekton text-[24px] font-bold hover:text-primary transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-white outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      {/* Mobile Menu Expansion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-25 left-0 w-full bg-[#0f0e11] border-b border-neutral-800 sm:hidden z-50 overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-8">
              {navigation.map((link, id) => (
                <Link
                  key={id}
                  href={link.url}
                  onClick={() => setIsOpen(false)}
                  className="font-lekton text-4xl font-bold text-white"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
