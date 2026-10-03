"use client";

import React from "react";
import { ArrowDown, ShieldCheck, Sparkles, Brain, HeartPulse, Building, Users } from "lucide-react";

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
  
  // Phase 1: Intro headline & CTA (Active 0.0 -> 0.12)
  const introOpacity = Math.max(0, Math.min(1, (0.12 - scrollProgress) / 0.08));
  const introTranslateY = Math.min(60, scrollProgress * 150);

  // Phase 2: About MyBrainVibe (Active 0.12 -> 0.38)
  const aboutOpacity =
    scrollProgress >= 0.12 && scrollProgress <= 0.38
      ? Math.sin(((scrollProgress - 0.12) / 0.26) * Math.PI)
      : 0;

  // Phase 3: Who We Serve (Active 0.38 -> 0.64)
  const whoWeServeOpacity =
    scrollProgress >= 0.38 && scrollProgress <= 0.64
      ? Math.sin(((scrollProgress - 0.38) / 0.26) * Math.PI)
      : 0;

  // Phase 4: Our Offerings (Active 0.64 -> 0.90)
  const offeringsOpacity =
    scrollProgress >= 0.64 && scrollProgress <= 0.90
      ? Math.sin(((scrollProgress - 0.64) / 0.26) * Math.PI)
      : 0;

  // Phase 5: Sequence Completed transition to next section (Active 0.90 -> 1.0)
  const completeOpacity = Math.max(
    0,
    Math.min(1, (scrollProgress - 0.90) / 0.05)
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16 max-w-7xl mx-auto overflow-hidden">
      {/* 1. INTRO NARRATIVE LAYER (Phase 1) */}
      <div
        className="w-full flex flex-col items-start justify-start pt-16 sm:pt-20 max-w-2xl transition-all duration-150 ease-out absolute"
        style={{
          opacity: introOpacity,
          transform: `translateY(-${introTranslateY}px)`,
          visibility: introOpacity > 0.01 ? "visible" : "hidden",
          pointerEvents: introOpacity > 0.3 ? "auto" : "none",
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-800 text-[10px] sm:text-xs font-semibold mb-5 shadow-xs backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Next-Generation QEEG & HRV Neurotechnology</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
          Understand Your Stress. <br />
          <span className="bg-gradient-to-r from-teal-600 via-teal-700 to-slate-800 bg-clip-text text-transparent">
            Transform Your Well-Being.
          </span>
        </h1>

        <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
          Advanced HRV &amp; Brain Function Assessments for a Healthier, Balanced Mind-Body Connection.
        </p>

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

      {/* 2. ABOUT MYBRAINVIBE (Phase 2) */}
      <div
        className="absolute inset-0 flex items-center justify-end p-6 sm:p-12 lg:p-16 transition-all duration-200 pointer-events-none"
        style={{
          opacity: aboutOpacity,
          visibility: aboutOpacity > 0.01 ? "visible" : "hidden",
          transform: `translateY(${(0.25 - scrollProgress) * 60}px)`,
        }}
      >
        <div className="p-6 sm:p-8 rounded-3xl max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 pointer-events-auto bg-white/55 backdrop-blur-md">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight">
            <span className="text-teal-600">About</span> <span className="text-[#F5B041]">MyBrainVibe</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            <p>
              In today&apos;s high-pressure world, MyBrainVibe is pioneering a new approach to stress assessment and brain function analysis. Using advanced, non-invasive technologies such as Heart Rate Variability (HRV) stress testing and AI-enabled QEEG brain mapping, we help individuals and clinicians understand the physiological and neurological impact of stress.
            </p>
            <p>
              Powered by 22Neuro, a team of neuroscientists, clinicians, and technology experts, MyBrainVibe combines clinical experience from leading neurologists and behavioural health experts with research collaborations from institutions like IIT Madras (HTIC) and SRMC, Chennai.
            </p>
            <p>
              Our mission is to bridge the gap between mental and physical health by offering safe, data-driven, and personalized insights into stress, autonomic balance, cognitive health, and overall well-being.
            </p>
          </div>
          <button className="mt-6 px-6 py-2.5 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer">
            Read More
          </button>
        </div>
      </div>

      {/* 3. WHO WE SERVE (Phase 3) */}
      <div
        className="absolute inset-0 flex items-center justify-start p-6 sm:p-12 lg:p-16 transition-all duration-200 pointer-events-none"
        style={{
          opacity: whoWeServeOpacity,
          visibility: whoWeServeOpacity > 0.01 ? "visible" : "hidden",
          transform: `translateY(${(0.51 - scrollProgress) * 60}px)`,
        }}
      >
        <div className="max-w-md pointer-events-auto flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-600 mb-2 tracking-tight drop-shadow-sm">Who We Serve</h2>
          
          {/* Card 1 */}
          <div className="p-4 sm:p-5 rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
               <Users className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-teal-700 font-bold text-lg sm:text-xl">Patients</h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-snug">Understand and manage chronic stress, fatigue, or brain fog through objective testing.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 sm:p-5 rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
               <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-teal-700 font-bold text-lg sm:text-xl">Clinics & Practitioners</h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-snug">Integrate stress profiling into clinical decision-making for advanced heart and brain care.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border-2 border-[#F5B041]/60 bg-white/90 shadow-xl flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-default">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
               <Building className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-teal-700 font-bold text-lg sm:text-xl">Corporate Wellness</h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-snug">Empower workforce well-being with early detection and preventive strategies for stress and burnout.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. OUR OFFERINGS (Phase 4) */}
      <div
        className="absolute inset-0 flex items-center justify-end p-6 sm:p-12 lg:p-16 transition-all duration-200 pointer-events-none"
        style={{
          opacity: offeringsOpacity,
          visibility: offeringsOpacity > 0.01 ? "visible" : "hidden",
          transform: `translateY(${(0.77 - scrollProgress) * 60}px)`,
        }}
      >
        <div className="max-w-md pointer-events-auto flex flex-col gap-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-teal-600 mb-1 tracking-tight drop-shadow-sm text-right">Our Offerings</h2>
          
          {/* Card 1 */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-3 relative overflow-hidden group cursor-default">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
              <HeartPulse className="w-32 h-32 text-teal-900" />
            </div>
            <div className="relative z-10 flex items-center gap-3 mb-1">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600 border border-teal-100">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="text-teal-700 font-bold text-xl sm:text-2xl">HRV StressCheck</h3>
            </div>
            <p className="text-sm text-slate-700 relative z-10 leading-relaxed">
              Real-time <span className="font-semibold text-slate-900">Heart Rate Variability (HRV)</span> testing to understand how your body reacts to stress and manage it effectively.
            </p>
            <button className="mt-2 self-start px-5 py-2 rounded-full bg-teal-600 text-white text-xs sm:text-sm font-semibold hover:bg-teal-700 transition-colors shadow-md relative z-10 cursor-pointer">
              Know More &rarr;
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-3 relative overflow-hidden group cursor-default">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
              <Brain className="w-32 h-32 text-teal-900" />
            </div>
            <div className="relative z-10 flex items-center gap-3 mb-1">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600 border border-teal-100">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-teal-700 font-bold text-xl sm:text-2xl">QEEG Brain Assessment</h3>
            </div>
            <p className="text-sm text-slate-700 relative z-10 leading-relaxed">
              Advanced <span className="font-semibold text-slate-900">Quantitative EEG</span> for analysing electrical brain activity and identifying cognitive or stress-related imbalances that MRI or CT may miss.
            </p>
            <button className="mt-2 self-start px-5 py-2 rounded-full bg-teal-600 text-white text-xs sm:text-sm font-semibold hover:bg-teal-700 transition-colors shadow-md relative z-10 cursor-pointer">
              Know More &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* 5. SEQUENCE COMPLETED (Phase 5) */}
      <div
        className="w-full h-full flex flex-col items-center justify-center text-center absolute inset-0 transition-all duration-300 pointer-events-none"
        style={{
          opacity: completeOpacity,
          visibility: completeOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        <div className="px-7 py-6 rounded-3xl max-w-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 pointer-events-auto bg-white/55 backdrop-blur-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Tour Complete</span>
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
        className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 flex items-center justify-between pt-4 border-t border-slate-300/60 text-xs text-slate-600 font-medium transition-opacity duration-300 pointer-events-none z-20"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 5.0),
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Interactive 3D Hardware Anatomy</span>
        </div>

        <button
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="flex items-center gap-1.5 text-slate-700 hover:text-teal-700 transition-colors pointer-events-auto cursor-pointer"
        >
          <span>Scroll to rotate &amp; explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </div>
    </div>
  );
}
