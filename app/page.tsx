"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero/HeroSection";
import AssessmentModal from "@/components/CTA/AssessmentModal";

export default function Home() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#ebebed] text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      {/* Navigation */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* SECTION 01: HERO & CINEMATIC SCROLL SEQUENCE */}
      <HeroSection onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Interactive Booking Modal */}
      <AssessmentModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </main>
  );
}
