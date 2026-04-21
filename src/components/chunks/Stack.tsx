import React from "react";
import Image from "next/image";
import Link from "next/link";

const RECENT_VIDEOS = [
  {
    id: "1",
    title: "I replaced my Computer with an iPad",
    thumbnail: "/youtube/ipadpc.jpg",
    duration: "4:19",
    link: "https://youtu.be/5jxAUn__TSA?si=GEX2UGCIOh3iCsYm",
  },
  {
    id: "2",
    title: "Apple event leaks: iPhone 17, Watch 3 Ultra, AirPods Pro 3",
    thumbnail: "/youtube/appleevent.jpg",
    duration: "03:55",
    link: "https://youtu.be/KUUzetPyxKA?si=g4v3B-794dTvVoBO",
  },
  {
    id: "3",
    title: "Don’t buy the S20 Ultra in 2026",
    thumbnail: "/youtube/s20.jpeg",
    duration: "04:41",
    link: "https://youtu.be/BAT3yC2zZMc?si=vn--0gXKVVY2C_Lc",
  },
];

const Stack = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header - Reduced mb-4 to mb-2 to pull the content up */}
      <div className="shrink-0 mb-2">
        <h3 className="text-[36px] xl:text-[40px] leading-none font-bold mb-1">
          Videos
        </h3>
        <p className="text-white/40 font-lekton text-[11px] uppercase tracking-[0.2em]">
          Recent Content
        </p>
      </div>

      {/* 3-Item Container - Replaced py-2 with pt-0 and pb-5 to shift the spacing downward */}
      <div className="flex-1 flex flex-col justify-between pt-0 pb-3">
        {RECENT_VIDEOS.slice(0, 3).map((video) => (
          <Link
            key={video.id}
            href={video.link}
            target="_blank"
            className="group flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
          >
            {/* Thumbnail: Changed rounded-xl to rounded-md for proper proportion */}
            <div className="relative shrink-0 w-24 h-15 rounded-md overflow-hidden bg-zinc-800 border border-white/10">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-110"
              />
              <span className="absolute bottom-1 right-1 text-[9px] bg-black/80 px-1.5 py-0.5 rounded-sm font-mono text-white/90">
                {video.duration}
              </span>
            </div>

            {/* Video Title */}
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-semibold leading-snug text-zinc-300 group-hover:text-primary transition-colors line-clamp-2">
                {video.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer - Remains untouched */}
      <div className="shrink-0 pt-4 border-t border-white/5">
        <Link
          href="https://www.youtube.com/@imaginbright"
          target="_blank"
          className="flex items-center justify-between group"
        >
          <span className="text-[11px] font-lekton uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
            YouTube Channel
          </span>
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-primary transition-all">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-white group-hover:text-black"
            >
              <path
                d="M1 11L11 1M11 1H1M11 1V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Stack;
