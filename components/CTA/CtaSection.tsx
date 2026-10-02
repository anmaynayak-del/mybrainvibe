"use client";

import React from "react";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Brain,
} from "lucide-react";

import { useBooking } from "@/components/BookingProvider";

export default function CtaSection() {
  const { openBooking } = useBooking();
  return (
    <section id="contact" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Hero Card */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-900/50 border border-slate-800 p-8 sm:p-14 text-center max-w-4xl mx-auto backdrop-blur-xl shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Brain className="w-3.5 h-3.5" />
            <span>Begin Your Assessment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            Book Your Stress &amp; Brain Function <br />
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Assessment Today!
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Take the first step towards personalized, preventive healthcare.
            Gain objective, data-backed insights into your cognitive resilience,
            autonomic stress levels, and brain health in just 10 minutes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openBooking}
              className="px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm sm:text-base transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2"
            >
              <span>Book Appointment Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              Non-Invasive &amp; 100% Safe
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              Standardized QEEG Analysis
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              Instant Detailed Report
            </span>
          </div>
        </div>

        {/* Clinical Centers & Direct Contact Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Location 1: IISER Pune */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Registered Research Office
                </h4>
                <p className="text-[11px] text-teal-400 font-mono">22Neuro (TDPL)</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              POD 3, Mendeleev Block, IISER, Ward No. 8, NCL Colony, Pashan, Pune, Maharashtra 411008
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-400">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <a href="tel:7758850500" className="hover:text-white transition-colors">
                +91 7758850500
              </a>
            </div>
          </div>

          {/* Location 2: Lotus Hospital Pune */}
          <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Clinical Assessment Center
                </h4>
                <p className="text-[11px] text-teal-400 font-mono">Q-Point Clinic</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Lotus Hospital, Dwarka Sai Wonders, Commercial Complex Survey no 173, Shiv Sai Road, Pimple Saudagar, Pune 411027
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-400">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <a href="tel:9028454965" className="hover:text-white transition-colors">
                +91 9028454965
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
