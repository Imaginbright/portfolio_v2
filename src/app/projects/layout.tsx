import { navigation } from "@/constants/nav";
import Link from "next/link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8">
      {/* Your custom navigation component */}
      <nav className="flex items-center py-10 w-full">
        <div className="flex w-full justify-between items-center">
          <Link href="/" aria-label="Home">
            <p className="text-5xl font-heavy">亮</p>
          </Link>
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
        </div>
      </nav>

      <main>{children}</main>
    </section>
  );
}
