import PortfolioGrid from "@/components/homepage/PortfolioGrid";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {
  return (
    <div className="max-w-[1600px] mx-auto w-full">
      <Navbar />
      <PortfolioGrid />
    </div>
  );
}
