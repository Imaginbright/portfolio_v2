import Navbar2 from "@/components/navigation/NavBar2";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-8">
      {/* Your custom navigation component */}
      <Navbar2 />
      <main>{children}</main>
    </section>
  );
}
