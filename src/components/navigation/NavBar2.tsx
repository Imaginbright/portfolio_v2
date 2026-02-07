"use client";

import React, { useState, useEffect } from "react";
import { navigation } from "@/constants/nav";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu automatically on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <nav className="flex items-center py-10 w-full relative">
      <div className="flex w-full justify-between items-center">
        {/* Logo */}
        <Link href="/" aria-label="Home" onClick={() => setIsOpen(false)}>
          <p className="text-5xl font-heavy">亮</p>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden sm:block">
          {navigation.map((link, id) => (
            <Link
              key={id}
              href={link.url}
              className="ml-[30px] font-lekton text-[24px] font-bold"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button (Hidden on Desktop) */}
        <button
          className="sm:hidden text-white outline-none"
          onClick={() => setIsOpen(!isOpen)}
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
            className="absolute top-full left-0 w-full bg-[#0f0e11] border-b border-neutral-800 sm:hidden z-50 overflow-hidden"
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

export default Navbar2;
