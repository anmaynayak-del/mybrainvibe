"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import ClinicalInsightsSection from "@/components/ClinicalInsights/ClinicalInsightsSection";

export default function ClinicalAI() {
  return (
    <div className="min-h-screen bg-[#ebebed]">
      <Navbar  />
      <div className="pt-24">
        <ClinicalInsightsSection />
      </div>
      <Footer />
    </div>
  );
}
