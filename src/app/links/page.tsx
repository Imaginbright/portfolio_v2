import Image from "next/image";
import {
  Youtube,
  Instagram,
  Twitter,
  Github,
  Music2, // Used for TikTok
  Globe,
  Mail,
  BookOpen,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

// Main Link Cards (The "Website Side")
const featuredLinks = [
  {
    title: "My Website",
    url: "/",
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
    bgColor: "bg-emerald-400/10",
  },
  {
    title: "Join my Newsletter",
    url: "https://newsletter.com",
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
    url: "https://imaginbrights-store.lemonsqueezy.com/",
    icon: <ShoppingBag className="w-5 h-5 text-purple-400" />,
    bgColor: "bg-purple-400/10",
  },
];

// Social Row (The "Twitter Side")
const socialLinks = [
  { icon: <Youtube size={30} />, label: "Subscribe on YouTube", url: "#" },
  { icon: <Instagram size={22} />, label: "Follow on Instagram", url: "#" },
  { icon: <Twitter size={22} />, label: "Follow me on Twitter", url: "#" },
  { icon: <Github size={21} />, label: "View my code", url: "#" },
  { icon: <Music2 size={21} />, label: "Watch on TikTok", url: "#" },
];

export default function LinkTree() {
  return (
    <div className="min-h-screen bg-[#18181B] text-white flex flex-col items-center px-6 py-20 font-lekton">
      {/* Profile Header */}
      <section className="flex flex-col items-center text-center max-w-sm mb-12">
        <div className="relative w-26 h-26 mb-6 rounded-full overflow-hidden ring-1 ring-zinc-800 ring-offset-1 ring-offset-[#0F0F0F]">
          <Image
            src="/images/profile1.png"
            alt="Profile Avatar"
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Okonkwo Somto
        </h1>

        <p className="text-white/75 text-[16px] leading-relaxed mb-5">
          A self-taught Developer, Designer & 3d Artist. Currently studying my
          head off for my Finals.
        </p>

        {/* Social Navigation */}
        <nav className="flex items-center gap-3">
          {socialLinks.map((social, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center"
            >
              {/* The Tooltip Box */}
              <div className="absolute bottom-full hidden group-hover:flex flex-col items-center animate-in fade-in zoom-in duration-200">
                <div className="relative z-10 p-2 text-[11px] font-medium font-lekton leading-none text-white whitespace-nowrap bg-zinc-800 border border-zinc-700 shadow-xl">
                  {social.label}
                </div>
              </div>
              <a
                key={idx}
                href={social.url}
                className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 hover:text-primary`}
              >
                {social.icon}
              </a>
            </div>
          ))}
        </nav>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-[550px]">
        <h2 className="text-[14px] uppercase tracking-[0.35em] text-white/75 font-bold mb-6 text-center">
          Featured Links
        </h2>

        <div className="flex flex-col gap-4">
          {featuredLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-300 ease-out"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2.5 rounded-full ${link.bgColor} group-hover:scale-110 transition-transform`}
                >
                  {link.icon}
                </div>
                <span className="text-[18px] tracking-wide">{link.title}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}
        </div>
      </section>

      {/* Footer Branding (Optional) */}
      <footer className="mt-20">
        <p className="text-zinc-700 text-xs font-medium tracking-widest uppercase">
          © 2026 • Imaginbright
        </p>
      </footer>
    </div>
  );
}
