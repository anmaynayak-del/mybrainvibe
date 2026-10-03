import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, Heart, Stethoscope, ChevronRight } from "lucide-react";

import Navbar from "@/components/Navbar";

export default function HRVStressCheckPage() {
  return (
    <main className="min-h-screen bg-[#ebebed]">
      <Navbar />
      <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold uppercase tracking-wider mb-6">
            <Activity className="w-4 h-4" />
            <span>Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            HRV <span className="text-teal-600">StressCheck</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            Heart Rate Variability Test in Pashan for Stress Assessment. 
            Measures the small changes between each heartbeat — revealing how well your autonomic nervous system adapts to stress.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-white/80">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="p-2 bg-teal-50 rounded-xl text-teal-600">
                <Heart className="w-6 h-6" />
              </span>
              What is HRV?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Heart Rate Variability (HRV) measures the small changes between each heartbeat. It reflects how well your autonomic nervous system (ANS) — which controls stress, heart rate, and recovery — is functioning. Higher HRV means your body adapts better to stress, while lower HRV can indicate imbalance, fatigue, or early signs of disease.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-white/80">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="p-2 bg-teal-50 rounded-xl text-teal-600">
                <Stethoscope className="w-6 h-6" />
              </span>
              Why HRV Matters
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              HRV gives early warning signs of how stress affects your heart, brain, and metabolism. Doctors use HRV to:
            </p>
            <ul className="space-y-3">
              {[
                "Detect nerve-related heart problems in people with diabetes.",
                "Track stress imbalance linked to hypertension, anxiety, or sleep issues.",
                "Monitor recovery after heart attack or rehabilitation.",
                "Evaluate how lifestyle changes or therapies improve overall resilience.",
                "Support preventive care and stress management programs."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who Can Get */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">Who Can Get an HRV StressCheck?</h2>
            <p className="text-slate-300 text-lg mb-8">The test is ideal for:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Individuals with chronic stress, fatigue, or poor sleep.",
                "People with diabetes, heart, or lifestyle-related conditions.",
                "Those starting fitness, weight loss, or IVF programs.",
                "Anyone looking to improve focus, energy, and overall health."
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-colors">
                Book Assessment <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
      </div>
    </main>
  );
}
