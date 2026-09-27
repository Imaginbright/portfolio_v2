"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
const routes = [
  ["Development", "/development"],
  ["3D", "/3d"],
  ["Blog", "/blog"],
  ["Shop", "/shop"],
  ["Links", "/links"],
  ["Contact", "/contact"],
];
export default function SiteNav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;

    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (
        !panel.current?.contains(e.target as Node) &&
        !toggle.current?.contains(e.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const shell =
    "mx-auto w-[min(1320px,calc(100%-96px))] max-[1100px]:w-[calc(100%-56px)] max-md:w-[calc(100%-36px)]";
  const navLink =
    "relative flex min-h-11 items-center gap-2 font-manrope text-[13px] font-medium text-[#bbbabe] hover:text-white aria-[current=page]:text-white aria-[current=page]:after:absolute aria-[current=page]:after:bottom-0 aria-[current=page]:after:left-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:w-[15px] aria-[current=page]:after:bg-[var(--accent)]";
  return (
    <header className="relative z-30 border-b border-[var(--border)] bg-[var(--background)] font-manrope">
      <div
        className={`${shell} flex min-h-[86px] items-center justify-between max-md:min-h-[72px]`}
      >
        <Link
          className="flex items-center py-2.5"
          href="/"
          aria-label="Imaginbright home"
          onClick={() => setOpen(false)}
        >
          <Image
            className="max-md:h-auto max-md:w-[108px]"
            src="/logo.svg"
            alt="Bright"
            width={130}
            height={45}
            priority
          />
        </Link>
        <nav
          className="flex items-center gap-[30px] max-[1100px]:gap-[22px] max-md:hidden"
          aria-label="Main navigation"
        >
          {routes.map(([label, url]) => (
            <Link
              className={navLink}
              key={url}
              href={url}
              aria-current={path.startsWith(url) ? "page" : undefined}
            >
              {label}
              {label === "Contact" && <ArrowUpRight size={14} />}
            </Link>
          ))}
        </nav>
        <button
          className="hidden h-11 w-11 items-center justify-center rounded-[3px] border border-[var(--border)] bg-transparent max-md:flex"
          ref={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          ref={panel}
          className={`${shell} hidden grid-cols-2 gap-x-[25px] pt-2.5 pb-5 max-md:grid`}
          aria-label="Mobile navigation"
        >
          {routes.map(([label, url]) => (
            <Link
              className="flex items-center justify-between border-b border-[var(--border)] py-4 font-manrope text-[15px] font-medium aria-[current=page]:text-[var(--accent)]"
              key={url}
              href={url}
              aria-current={path.startsWith(url) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
