"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
export default function Carousel({
  children,
  label,
  className = "",
  trackClassName = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
  trackClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null),
    id = useId();
  const [position, setPosition] = useState({ index: 0, count: 1 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const slides = Array.from(el.children) as HTMLElement[];
      const start = el.getBoundingClientRect().left;
      let nearest = 0,
        distance = Infinity;
      slides.forEach((slide, index) => {
        const d = Math.abs(slide.getBoundingClientRect().left - start);
        if (d < distance) {
          distance = d;
          nearest = index;
        }
      });
      setPosition({ index: nearest, count: slides.length });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  const move = (step: number) => {
    const el = ref.current;
    if (!el) return;
    const target = el.children[
      Math.max(0, Math.min(position.count - 1, position.index + step))
    ] as HTMLElement;
    el.scrollTo({
      left:
        el.scrollLeft +
        target.getBoundingClientRect().left -
        el.getBoundingClientRect().left,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  const track = `min-w-0 md:focus-visible:outline-offset-8 max-md:flex max-md:gap-3.5 max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:overscroll-x-contain max-md:scroll-smooth max-md:pr-[18px] max-md:pb-2 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto ${trackClassName}`;
  const controlButton =
    "flex h-[42px] w-11 items-center justify-center rounded-full border-0 bg-transparent transition-[transform,background] duration-160 active:scale-[.86] active:bg-white/13 disabled:opacity-25";
  return (
    <div className={`relative min-w-0 max-md:mr-[-18px] ${className}`}>
      <div
        id={id}
        ref={ref}
        className={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {children}
      </div>
      <div className="mr-[18px] ml-auto mt-[18px] hidden w-fit items-center rounded-[30px] border border-white/18 bg-[rgba(40,40,44,.6)] p-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-[14px] max-md:flex">
        <button
          className={controlButton}
          aria-label={"Previous " + label}
          aria-controls={id}
          disabled={position.index === 0}
          onClick={() => move(-1)}
        >
          <ArrowLeft size={18} />
        </button>
        <span
          className="min-w-12 text-center font-lekton text-[11px] text-[#c8c8cc]"
          aria-live="polite"
        >
          {position.index + 1} / {position.count}
        </span>
        <button
          className={controlButton}
          aria-label={"Next " + label}
          aria-controls={id}
          disabled={position.index === position.count - 1}
          onClick={() => move(1)}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
