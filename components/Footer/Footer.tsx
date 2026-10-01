"use client";

import React from "react";
import { Brain, Shield, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-950">
                <Brain className="w-4 h-4 stroke-[2.4]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-sans">
                BRAIN<span className="text-teal-400">VIBE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MyBrainVibe brings science-backed, non-invasive stress and brain health assessments to everyday healthcare. Powered by 22Neuro experts in collaboration with premier research institutions.
            </p>
            <div className="text-[11px] text-slate-500 pt-2">
              Research collaboration with IIT Madras (HTIC) &amp; SRMC Chennai.
            </div>
          </div>

          {/* Nav Col */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Quick Links
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#what-we-do" className="hover:text-teal-400 transition-colors">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#who-we-serve" className="hover:text-teal-400 transition-colors">
                  Who We Serve
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-teal-400 transition-colors">
                  Technology &amp; Waves
                </a>
              </li>
              <li>
                <a href="#clinical-insights" className="hover:text-teal-400 transition-colors">
                  Clinical Insights
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-teal-400 transition-colors">
                  Book Assessment
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Col */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Services
            </h5>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-400">QEEG Brain Mapping</span>
              </li>
              <li>
                <span className="text-slate-400">HRV StressCheck</span>
              </li>
              <li>
                <span className="text-slate-400">School Neuro Program</span>
              </li>
              <li>
                <span className="text-slate-400">Corporate Resilience</span>
              </li>
              <li>
                <span className="text-slate-400">Clinical Decision Support</span>
              </li>
            </ul>
          </div>

          {/* Legal / Regulatory */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Compliance &amp; Ethics
            </h5>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
              BrainVibe assessments are designed to support clinical evaluation and wellness tracking.
            </p>
            <div className="space-y-1.5 text-[11px]">
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Terms &amp; Conditions
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                Clinical Data Ethics
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 BrainVibe (Powered by 22Neuro TDPL). All Rights Reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
