"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero/HeroSection";
import WhatWeDoSection from "@/components/WhatWeDo/WhatWeDoSection";
import AboutSection from "@/components/About/AboutSection";
import WhoWeServeSection from "@/components/WhoWeServe/WhoWeServeSection";
import TechnologySection from "@/components/Technology/TechnologySection";
import ClinicalInsightsSection from "@/components/ClinicalInsights/ClinicalInsightsSection";
import CtaSection from "@/components/CTA/CtaSection";
import Footer from "@/components/Footer/Footer";
import AssessmentModal from "@/components/CTA/AssessmentModal";

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#ebebed] text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* SECTION 01: HERO & CINEMATIC SCROLL SEQUENCE */}
      <HeroSection onOpenBooking={() => setBookingModalOpen(true)} />

      {/* SECTION 02: ABOUT US */}
      <AboutSection />

      {/* SECTION 03: WHAT WE DO */}
      <WhatWeDoSection />

      {/* SECTION 04: WHO WE SERVE */}
      <WhoWeServeSection onOpenBooking={() => setBookingModalOpen(true)} />

      {/* SECTION 04: OUR TECHNOLOGY & LIVE WAVE OSCILLOSCOPE */}
      <TechnologySection />

      {/* SECTION 05: CLINICAL & AI BIOMARKER INSIGHTS */}
      <ClinicalInsightsSection />

      {/* SECTION 06: FINAL CTA & CENTERS */}
      <CtaSection onOpenBooking={() => setBookingModalOpen(true)} />

      {/* FOOTER */}
      <Footer />

      {/* Interactive Booking Modal */}
      <AssessmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </main>
  );
}
