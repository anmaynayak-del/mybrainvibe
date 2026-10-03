"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useBooking } from "@/components/BookingProvider";

export default function Footer() {
  const { openBooking } = useBooking();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex">
                <Image 
                  src="/logo.png" 
                  alt="BrainVibe"
                  width={160}
                  height={48} 
                  className="h-10 sm:h-12 w-auto object-contain brightness-[1.3] drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                />
              </div>
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
                <Link href="/who-we-serve" className="hover:text-teal-400 transition-colors">
                  Who We Serve
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-teal-400 transition-colors">
                  Technology &amp; Waves
                </Link>
              </li>
              <li>
                <Link href="/clinical-ai" className="hover:text-teal-400 transition-colors">
                  Clinical Insights
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <button onClick={openBooking} className="hover:text-teal-400 transition-colors text-left">
                  Book Assessment
                </button>
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
                <Link href="/services/qeeg-brain-assessment" className="text-slate-400 hover:text-teal-400 transition-colors">
                  QEEG Brain Mapping
                </Link>
              </li>
              <li>
                <Link href="/services/hrv-stresscheck" className="text-slate-400 hover:text-teal-400 transition-colors">
                  HRV StressCheck
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Contact Us
            </h5>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-semibold text-slate-300 mb-1">Registered Office</p>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-1">
                  22Neuro (TDPL), POD 3, MENDELEEV BLOCK, IISER, Ward No. 8, NCL Colony, Pashan, Pune, Maharashtra 411008
                </p>
                <p className="text-[11px] text-teal-400 font-mono">7758850500</p>
              </div>
              
              <div>
                <p className="text-[11px] font-semibold text-slate-300 mb-1">Q-Point Clinic</p>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-1">
                  Lotus Hospital, Dwarka Sai Wonders, Commercial Complex Survey no 173, Shiv Sai Road, Pimple Saudagar, Pune, Maharashtra 411027
                </p>
                <p className="text-[11px] text-teal-400 font-mono">9028454965</p>
              </div>
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
