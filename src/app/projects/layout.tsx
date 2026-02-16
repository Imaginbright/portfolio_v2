import Navbar2 from "@/components/navigation/NavBar2";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-300 mx-auto px-5 md:px-8">
      {/* My custom navigation component */}
      <Navbar2 />
      <main>{children}</main>
    </section>
  );
}
