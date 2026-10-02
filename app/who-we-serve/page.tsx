"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import WhoWeServeSection from "@/components/WhoWeServe/WhoWeServeSection";

export default function WhoWeServe() {
  return (
    <div className="min-h-screen bg-[#ebebed]">
      <Navbar onOpenBooking={() => {}} />
      <div className="pt-24">
        <WhoWeServeSection onOpenBooking={() => {}} />
      </div>
      <Footer />
    </div>
  );
}
