"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import TechnologySection from "@/components/Technology/TechnologySection";

export default function Technology() {
  return (
    <div className="min-h-screen bg-[#ebebed]">
      <Navbar onOpenBooking={() => {}} />
      <div className="pt-24">
        <TechnologySection />
      </div>
      <Footer />
    </div>
  );
}
