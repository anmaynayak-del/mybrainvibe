"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import CtaSection from "@/components/CTA/CtaSection";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#ebebed]">
      <Navbar  />
      <div className="pt-24">
        <CtaSection  />
      </div>
      <Footer />
    </div>
  );
}
