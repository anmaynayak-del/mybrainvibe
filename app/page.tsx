"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#ebebed] text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* SECTION 01: HERO & CINEMATIC SCROLL SEQUENCE */}
      <HeroSection />
    </main>
  );
}
