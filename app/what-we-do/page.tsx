"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatWeDoSection from "@/components/WhatWeDo/WhatWeDoSection";

export default function WhatWeDo() {
  return (
    <div className="min-h-screen bg-[#ebebed]">
      <Navbar  />
      <div className="pt-24">
        <WhatWeDoSection />
      </div>
      <Footer />
    </div>
  );
}
