import Image from "next/image";
import Link from "next/link";

import {
  Youtube,
  Instagram,
  Twitter,
  Github,
  Music2,
  Globe,
  Mail,
  BookOpen,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";
import { buildOpenGraph } from "@/lib/site";

const featuredLinks = [
  {
    title: "My Website",
    url: "/",
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
    bgColor: "bg-emerald-400/10",
  },
  {
    title: "Contact Me",
    url: "/contact",
    icon: <Mail className="w-5 h-5 text-orange-400" />,
    bgColor: "bg-orange-400/10",
  },
  {
    title: "Blog",
    url: "/blog",
    icon: <BookOpen className="w-5 h-5 text-blue-400" />,
    bgColor: "bg-blue-400/10",
  },
  {
    title: "Shop",
    url: "/shop",
    icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
    bgColor: "bg-purple-400/10",
  },
];

const socialLinks = [
  {
    icon: <Youtube size={30} />,
    label: "Subscribe on YouTube",
    url: "https://www.youtube.com/@imaginbright",
  },
  {
    icon: <Instagram size={22} />,
    label: "Follow on Instagram",
    url: "https://www.instagram.com/imaginbright/",
  },
  {
    icon: <Twitter size={22} />,
    label: "Follow me on Twitter",
    url: "https://x.com/imaginbright",
  },
  {
    icon: <Github size={21} />,
    label: "View my code",
    url: "https://github.com/Imaginbright",
  },
  {
    icon: <Music2 size={21} />,
    label: "Watch on TikTok",
    url: "https://www.tiktok.com/@imaginbright",
  },
];

const description =
  "Imaginbright links, social profiles, Blog, Shop, and contact page.";

export const metadata = {
  title: "Links",
  description,
  alternates: { canonical: "/links" },
  openGraph: buildOpenGraph("Links | Imaginbright", description, "/links"),
};

export default function Links() {
  return (
    <main
      id="main-content"
      className="min-h-screen text-white flex flex-col items-center px-6 py-20 font-lekton"
    >
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center max-w-sm mb-12">
        <div className="relative w-26 h-26 mb-6 rounded-full overflow-hidden ring-1 ring-zinc-800 ring-offset-1 ring-offset-[#0F0F0F]">
          <Image
            src="/optimized/profile1.webp"
            alt="Profile Avatar"
            fill
            sizes="104px"
            className="object-cover"
            priority
          />
        </div>

        <h1 className="font-panton text-2xl font-black! tracking-tight! mb-1! leading-8!">
          Okonkwo Somto
        </h1>

        <p className="font-manrope text-white/75 text-[16px] leading-relaxed mb-5">
          A self-taught Developer, Designer &amp; 3d Artist. Currently studying
          my head off for my Finals.
        </p>

        {/* Social Navigation */}
        <nav className="flex items-center gap-3" aria-label="Social links">
          {socialLinks.map((social, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center"
            >
              {/* Tooltip */}
              <div className="absolute bottom-full hidden group-hover:flex flex-col items-center animate-in fade-in zoom-in duration-200">
                <div className="relative z-10 p-2 text-[11px] font-medium font-manrope leading-none text-white whitespace-nowrap bg-zinc-800 border border-zinc-700 shadow-xl">
                  {social.label}
                </div>
              </div>

              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-3 rounded-xl transition-all duration-200 hover:scale-105 hover:text-[#FF9D52]"
              >
                {social.icon}
              </a>
            </div>
          ))}
        </nav>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-137.5">
        <h2 className="font-lekton text-[14px] uppercase tracking-[0.35em] text-white/75 font-bold mb-6 text-center">
          Featured Links
        </h2>

        <div className="flex flex-col gap-4">
          {featuredLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.url}
              className="group flex items-center justify-between p-4 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 ease-out"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2.5 rounded-full ${link.bgColor} group-hover:scale-110 transition-transform`}
                >
                  {link.icon}
                </div>

                <span className="font-panton font-semibold text-[18px] tracking-wide">{link.title}</span>
              </div>

              <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
