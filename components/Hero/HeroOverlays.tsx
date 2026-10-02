"use client";

import React from "react";
import { ArrowDown, Cpu, Activity, ShieldCheck, Sparkles } from "lucide-react";

interface HeroOverlaysProps {
  scrollProgress: number; // 0.0 to 1.0
  onExploreClick: () => void;
  onBookClick: () => void;
}

export default function HeroOverlays({
  scrollProgress,
  onExploreClick,
  onBookClick,
}: HeroOverlaysProps) {
  // Phase calculations with smooth easing bounds
  // Phase 1: Intro headline & CTA (Active 0.0 -> 0.24)
  const introOpacity = Math.max(0, Math.min(1, (0.20 - scrollProgress) / 0.12));
  const introTranslateY = Math.min(60, scrollProgress * 150);

  // Phase 2: Feature Callouts as device turns profile (Active 0.24 -> 0.68)
  const featureOpacity =
    scrollProgress >= 0.22 && scrollProgress <= 0.68
      ? Math.sin(((scrollProgress - 0.22) / 0.46) * Math.PI)
      : 0;

  // Phase 3: Clinical summary before transition (Active 0.68 -> 0.88)
  const summaryOpacity =
    scrollProgress >= 0.68 && scrollProgress <= 0.88
      ? Math.sin(((scrollProgress - 0.68) / 0.20) * Math.PI)
      : 0;

  // Phase 4: Sequence Completed transition to next section (Active 0.89 -> 1.0)
  const completeOpacity = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.88) / 0.08)
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-7xl mx-auto">
      {/* 1. INTRO NARRATIVE LAYER (Phase 1) */}
      <div
        className="w-full flex flex-col items-start justify-start pt-16 sm:pt-20 max-w-2xl transition-all duration-150 ease-out"
        style={{
          opacity: introOpacity,
          transform: `translateY(-${introTranslateY}px)`,
          visibility: introOpacity > 0.01 ? "visible" : "hidden",
          pointerEvents: introOpacity > 0.3 ? "auto" : "none",
        }}
      >
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-5 shadow-xs backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Next-Generation QEEG & HRV Neurotechnology</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
          Understand Your Brain. <br />
          <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-slate-800 bg-clip-text text-transparent">
            Transform Well-Being.
          </span>
        </h1>

        {/* Supporting description */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
          Advanced non-invasive brain function assessments designed to help clinicians,
          researchers, and individuals measure stress, cognitive load, and neural balance with clinical precision.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="px-6 py-3 rounded-full bg-teal-600 text-white font-medium text-sm hover:bg-teal-700 transition-all duration-200 shadow-md shadow-teal-600/25 hover:shadow-lg hover:shadow-teal-600/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Explore Our Technology
          </button>
          <button
            onClick={onBookClick}
            className="px-6 py-3 rounded-full bg-white/90 text-slate-800 border border-slate-200 font-medium text-sm hover:bg-slate-50 transition-all duration-200 shadow-xs cursor-pointer"
          >
            Book Assessment
          </button>
        </div>
      </div>

      {/* 2. CLINICAL HOTSPOT CALLOUTS (Phase 2) */}
      <div
        className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-6 sm:p-12 lg:p-16 transition-all duration-200 pointer-events-none"
        style={{
          opacity: featureOpacity,
          visibility: featureOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        {/* Left callout card */}
        <div className="glass-panel p-5 rounded-2xl max-w-xs shadow-lg shadow-slate-200/50 border border-white/90 mb-auto md:my-auto md:mr-auto pointer-events-auto transform -translate-y-4 md:translate-y-0">
          <div className="flex items-center gap-2.5 text-teal-700 font-semibold text-xs tracking-wider uppercase mb-1.5">
            <Cpu className="w-4 h-4 text-teal-600" />
            <span>19-Channel Dry QEEG</span>
          </div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">
            Gel-Free Sensor Array
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            High-density dry electrodes capture real-time 10-20 international standard EEG signals without messy conductive gels or hair wash.
          </p>
        </div>

        {/* Right callout card */}
        <div className="glass-panel p-5 rounded-2xl max-w-xs shadow-lg shadow-slate-200/50 border border-white/90 mt-auto md:my-auto md:ml-auto pointer-events-auto">
          <div className="flex items-center gap-2.5 text-teal-700 font-semibold text-xs tracking-wider uppercase mb-1.5">
            <Activity className="w-4 h-4 text-teal-600" />
            <span>Dual Heart-Brain Axis</span>
          </div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">
            Integrated HRV & QEEG
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Simultaneously maps autonomic nervous system balance (SNS vs PNS) and cortical wave oscillations in a single 10-minute session.
          </p>
        </div>
      </div>

      {/* 3. CLINICAL OUTCOME SUMMARY (Phase 3) */}
      <div
        className="w-full flex flex-col items-center justify-center text-center my-auto transition-all duration-200 pointer-events-none"
        style={{
          opacity: summaryOpacity,
          visibility: summaryOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        <div className="glass-panel px-8 py-7 rounded-3xl max-w-xl shadow-xl shadow-teal-900/5 border border-white/90 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Institutional Validation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            10,000+ Data Points / Sec
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Research-backed precision in collaboration with premier medical institutes including IIT Madras (HTIC) &amp; SRMC Chennai.
          </p>
        </div>
      </div>

      {/* 4. SEQUENCE COMPLETED / PROCEED TO NEXT SECTION (Phase 4) */}
      <div
        className="w-full flex flex-col items-center justify-center text-center my-auto transition-all duration-300 pointer-events-none"
        style={{
          opacity: completeOpacity,
          visibility: completeOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        <div className="glass-panel px-7 py-6 rounded-3xl max-w-md shadow-2xl shadow-teal-900/10 border border-white/95 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>360° Anatomy Inspection Complete</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1.5">
            Ready to Explore the Platform?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
            Scroll down or click below to discover clinical assessment workflows.
          </p>
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-medium text-xs sm:text-sm hover:bg-teal-700 transition-all duration-200 shadow-lg shadow-teal-600/30 hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Proceed to What We Do</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator (Active during intro) */}
      <div
        className="w-full flex items-center justify-between pt-4 border-t border-slate-300/60 text-xs text-slate-600 font-medium transition-opacity duration-300"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 3.0),
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500" />
          <span>Interactive 3D Hardware Anatomy</span>
        </div>

        <button
          onClick={onExploreClick}
          className="flex items-center gap-1.5 text-slate-700 hover:text-teal-700 transition-colors pointer-events-auto cursor-pointer"
        >
          <span>Scroll to rotate &amp; explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
