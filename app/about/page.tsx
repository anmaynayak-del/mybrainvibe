"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import AboutSection from "@/components/About/AboutSection";

export default function About() {
  return (
    <div className="min-h-screen bg-[#ebebed]">
      <Navbar  />
      <div className="pt-24">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}
