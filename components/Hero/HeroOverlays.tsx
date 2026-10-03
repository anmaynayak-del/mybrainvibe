"use client";

import React, { useState } from "react";
import { ArrowDown, ShieldCheck, Sparkles, Brain, HeartPulse, Building, Users } from "lucide-react";
import Link from "next/link";

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
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Phase calculations with smooth easing bounds
  
  // Phase 1: Intro Split (Visible 0.0 -> 0.12)
  const introOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.04) / 0.08));
  const introTranslateY = scrollProgress * 120;

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
      {/* 1. INTRO NARRATIVE LAYER — LEFT SPLIT (Phase 1) */}
      <div
        className="absolute left-0 top-[18%] sm:top-[25%] lg:top-[28%] pt-6 sm:pt-0 pl-6 sm:pl-12 lg:pl-16 w-full sm:w-[45%] xl:w-[40%] flex flex-col items-start transition-all duration-150 ease-out z-20 pointer-events-none"
        style={{
          opacity: introOpacity,
          transform: `translateY(-${introTranslateY}px)`,
          visibility: introOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        <h1 className="text-[3.5rem] sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.05] mb-5 sm:mb-6 pointer-events-auto">
          Transform Your<br />
          <span className="text-teal-600">Well-Being.</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[300px] sm:max-w-[360px] mb-6 sm:mb-8 pointer-events-auto">
          Advanced HRV & Brain Function Assessments for a Healthier, Balanced Mind-Body Connection.
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto">
          <button
            onClick={onExploreClick}
            className="px-5 py-2.5 rounded-full bg-teal-600 text-white font-semibold text-xs hover:bg-teal-700 transition-all duration-200 shadow-md shadow-teal-600/25 cursor-pointer"
          >
            Explore Our Technology
          </button>
          <button
            onClick={onBookClick}
            className="px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md text-slate-800 border border-slate-300/80 font-semibold text-xs hover:bg-white/80 transition-all duration-200 shadow-sm cursor-pointer"
          >
            Book Assessment
          </button>
        </div>
      </div>

      {/* 1. INTRO NARRATIVE LAYER — RIGHT SPLIT (Phase 1) */}
      <div
        className="absolute right-0 top-[65%] sm:top-[35%] lg:top-[40%] pr-6 sm:pr-12 lg:pr-16 w-full sm:w-[45%] xl:w-[40%] flex flex-col items-end sm:items-start text-right sm:text-left transition-all duration-150 ease-out z-20 pointer-events-none"
        style={{
          opacity: introOpacity,
          transform: `translateY(-${introTranslateY}px)`,
          visibility: introOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        <h1 className="text-[3.5rem] sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.05] pointer-events-auto">
          Understand Your<br />Stress.
        </h1>
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
        <div className="p-6 sm:p-8 rounded-3xl max-w-lg shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/80 pointer-events-auto bg-white/85 backdrop-blur-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 tracking-tight">
            <span className="text-teal-600">About</span> <span className="text-[#F5B041]">MyBrainVibe</span>
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
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
          <Link href="/about" className="inline-flex mt-6 px-6 py-2.5 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg cursor-pointer">
            Read More
          </Link>
        </div>
      </div>

      {/* 3. WHO WE SERVE — Interactive Circular Nodes (Phase 3) */}
      <div
        className="absolute inset-0 transition-all duration-300 pointer-events-none"
        style={{
          opacity: whoWeServeOpacity,
          visibility: whoWeServeOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        {/* Section eyebrow heading — top center */}
        <div 
          className="absolute top-6 sm:top-12 lg:top-16 left-0 right-0 text-center transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${(0.51 - scrollProgress) * 30}px)` }}
        >
          <span className="text-teal-700 font-semibold tracking-wider uppercase text-[10px] sm:text-xs block mb-1">Target Audience</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Who We Serve</h2>
        </div>

        {/* ── PATIENTS node — LEFT side, vertically centered ── */}
        <div
          className="absolute pointer-events-auto"
          style={{
            left: "6%",
            top: "50%",
            transform: `translateY(calc(-50% + ${(0.51 - scrollProgress) * 50}px))`,
          }}
        >
          <div 
            className="flex items-center gap-4"
            onMouseEnter={() => setActiveNode("patients")}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* The Circle */}
            <div
              className="relative cursor-pointer group"
              style={{
                width: activeNode === "patients" ? "120px" : "110px",
                height: activeNode === "patients" ? "120px" : "110px",
                transition: "all 350ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {/* Photo */}
              <img
                src="/who-patients.png"
                alt="Patients"
                className="absolute inset-0 w-full h-full rounded-full object-cover z-10"
              />
              {/* Border ring */}
              <div
                className="absolute -inset-[3px] rounded-full border-[3px] transition-all duration-300 z-20"
                style={{
                  borderColor: activeNode === "patients" ? "rgba(13, 148, 136, 0.9)" : "rgba(13, 148, 136, 0.45)",
                  boxShadow: activeNode === "patients"
                    ? "0 0 28px rgba(13, 148, 136, 0.25), 0 4px 20px rgba(0,0,0,0.08)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                }}
              />
              {/* Hover glow */}
              <div className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" style={{ boxShadow: "0 0 24px rgba(13, 148, 136, 0.2)" }} />
              {/* Status dot */}
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-teal-500 z-30 border-2 border-white" style={{ boxShadow: "0 0 6px rgba(13,148,136,0.5)" }} />
              {/* Label below */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold text-slate-800">Patients</span>
                <span className="text-[9px] text-slate-500 font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300">Hover to explore</span>
              </div>
            </div>

            {/* Expanded panel — expands to the RIGHT */}
            <div
              className="flex items-center gap-3 overflow-hidden"
              style={{
                maxWidth: activeNode === "patients" ? "320px" : "0px",
                opacity: activeNode === "patients" ? 1 : 0,
                transform: activeNode === "patients" ? "translateX(0)" : "translateX(-24px)",
                transition: "max-width 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 450ms ease-out 100ms, transform 450ms ease-out 80ms",
              }}
            >
              {/* Connector line */}
              <div className="w-6 h-px bg-teal-400/40 shrink-0" />
              <div
                className="p-4 sm:p-5 rounded-2xl min-w-[240px] sm:min-w-[280px]"
                style={{
                  background: "rgba(255,255,255,0.42)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <h3 className="text-teal-900 font-bold text-base sm:text-lg mb-1.5">Patients</h3>
                <p className="text-sm text-slate-700 leading-relaxed">Understand and manage chronic stress, fatigue, or brain fog through objective testing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CLINICS & PRACTITIONERS node — RIGHT side, upper-middle ── */}
        <div
          className="absolute pointer-events-auto"
          style={{
            right: "6%",
            top: "30%",
            transform: `translateY(calc(-50% + ${(0.51 - scrollProgress) * 65}px))`,
          }}
        >
          <div 
            className="flex flex-row-reverse items-center gap-4"
            onMouseEnter={() => setActiveNode("clinics")}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* The Circle */}
            <div
              className="relative cursor-pointer group"
              style={{
                width: activeNode === "clinics" ? "120px" : "110px",
                height: activeNode === "clinics" ? "120px" : "110px",
                transition: "all 350ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <img
                src="/who-clinics.png"
                alt="Clinics & Practitioners"
                className="absolute inset-0 w-full h-full rounded-full object-cover z-10"
              />
              <div
                className="absolute -inset-[3px] rounded-full border-[3px] transition-all duration-300 z-20"
                style={{
                  borderColor: activeNode === "clinics" ? "rgba(13, 148, 136, 0.9)" : "rgba(13, 148, 136, 0.45)",
                  boxShadow: activeNode === "clinics"
                    ? "0 0 28px rgba(13, 148, 136, 0.25), 0 4px 20px rgba(0,0,0,0.08)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                }}
              />
              <div className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" style={{ boxShadow: "0 0 24px rgba(13, 148, 136, 0.2)" }} />
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-teal-500 z-30 border-2 border-white" style={{ boxShadow: "0 0 6px rgba(13,148,136,0.5)" }} />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold text-slate-800">Clinics</span>
                <span className="text-[9px] text-slate-500 font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300">Hover to explore</span>
              </div>
            </div>

            {/* Expanded panel — expands to the LEFT */}
            <div
              className="flex items-center gap-3 overflow-hidden"
              style={{
                maxWidth: activeNode === "clinics" ? "320px" : "0px",
                opacity: activeNode === "clinics" ? 1 : 0,
                transform: activeNode === "clinics" ? "translateX(0)" : "translateX(24px)",
                transition: "max-width 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 450ms ease-out 100ms, transform 450ms ease-out 80ms",
              }}
            >
              <div
                className="p-4 sm:p-5 rounded-2xl min-w-[240px] sm:min-w-[280px]"
                style={{
                  background: "rgba(255,255,255,0.42)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <h3 className="text-teal-900 font-bold text-base sm:text-lg mb-1.5">Clinics & Practitioners</h3>
                <p className="text-sm text-slate-700 leading-relaxed">Integrate stress profiling into clinical decision-making for advanced heart and brain care.</p>
              </div>
              {/* Connector line */}
              <div className="w-6 h-px bg-teal-400/40 shrink-0" />
            </div>
          </div>
        </div>

        {/* ── CORPORATE WELLNESS node — RIGHT side, lower ── */}
        <div
          className="absolute pointer-events-auto"
          style={{
            right: "8%",
            top: "70%",
            transform: `translateY(calc(-50% + ${(0.51 - scrollProgress) * 90}px))`,
          }}
        >
          <div 
            className="flex flex-row-reverse items-center gap-4"
            onMouseEnter={() => setActiveNode("corporate")}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* The Circle */}
            <div
              className="relative cursor-pointer group"
              style={{
                width: activeNode === "corporate" ? "120px" : "110px",
                height: activeNode === "corporate" ? "120px" : "110px",
                transition: "all 350ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <img
                src="/who-corporate.png"
                alt="Corporate Wellness"
                className="absolute inset-0 w-full h-full rounded-full object-cover z-10"
              />
              <div
                className="absolute -inset-[3px] rounded-full border-[3px] transition-all duration-300 z-20"
                style={{
                  borderColor: activeNode === "corporate" ? "rgba(13, 148, 136, 0.9)" : "rgba(13, 148, 136, 0.45)",
                  boxShadow: activeNode === "corporate"
                    ? "0 0 28px rgba(13, 148, 136, 0.25), 0 4px 20px rgba(0,0,0,0.08)"
                    : "0 2px 12px rgba(0,0,0,0.06)",
                }}
              />
              <div className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" style={{ boxShadow: "0 0 24px rgba(13, 148, 136, 0.2)" }} />
              <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-teal-500 z-30 border-2 border-white" style={{ boxShadow: "0 0 6px rgba(13,148,136,0.5)" }} />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center whitespace-nowrap">
                <span className="text-xs sm:text-sm font-bold text-slate-800">Corporate</span>
                <span className="text-[9px] text-slate-500 font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300">Hover to explore</span>
              </div>
            </div>

            {/* Expanded panel — expands to the LEFT */}
            <div
              className="flex items-center gap-3 overflow-hidden"
              style={{
                maxWidth: activeNode === "corporate" ? "320px" : "0px",
                opacity: activeNode === "corporate" ? 1 : 0,
                transform: activeNode === "corporate" ? "translateX(0)" : "translateX(24px)",
                transition: "max-width 500ms cubic-bezier(0.23, 1, 0.32, 1), opacity 450ms ease-out 100ms, transform 450ms ease-out 80ms",
              }}
            >
              <div
                className="p-4 sm:p-5 rounded-2xl min-w-[240px] sm:min-w-[280px]"
                style={{
                  background: "rgba(255,255,255,0.42)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.55)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                }}
              >
                <h3 className="text-teal-900 font-bold text-base sm:text-lg mb-1.5">Corporate Wellness</h3>
                <p className="text-sm text-slate-700 leading-relaxed">Empower workforce well-being with early detection and preventive strategies for stress and burnout.</p>
              </div>
              {/* Connector line */}
              <div className="w-6 h-px bg-teal-400/40 shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. OUR OFFERINGS (Phase 4) */}
      <div
        className="absolute inset-0 flex items-center justify-end p-6 sm:p-12 lg:p-16 transition-all duration-300 pointer-events-none"
        style={{
          opacity: offeringsOpacity,
          visibility: offeringsOpacity > 0.01 ? "visible" : "hidden",
          transform: `translateY(${(0.77 - scrollProgress) * 60}px)`,
        }}
      >
        <div className="max-w-lg pointer-events-auto flex flex-col gap-5">
          <div className="mb-2 text-right">
            <span className="text-teal-600 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-1 block">Services</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Our Offerings</h2>
          </div>
          
          {/* Card 1 */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-4 relative overflow-hidden group cursor-default hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
            <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
              <HeartPulse className="w-40 h-40 text-teal-900" />
            </div>
            <div className="relative z-10 flex items-center gap-4 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white flex items-center justify-center shrink-0 border border-teal-100/50 shadow-sm group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-slate-900 font-bold text-xl sm:text-2xl">HRV StressCheck</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 relative z-10 leading-relaxed font-medium">
              Real-time <span className="font-semibold text-slate-900">Heart Rate Variability (HRV)</span> testing to understand how your body reacts to stress and manage it effectively.
            </p>
            <Link href="/services/hrv-stresscheck" className="mt-2 self-start px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md relative z-10 cursor-pointer inline-block">
              Know More &rarr;
            </Link>
          </div>

          {/* Card 2 */}
          <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-4 relative overflow-hidden group cursor-default hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
            <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
              <Brain className="w-40 h-40 text-teal-900" />
            </div>
            <div className="relative z-10 flex items-center gap-4 mb-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white flex items-center justify-center shrink-0 border border-teal-100/50 shadow-sm group-hover:scale-105 transition-transform">
                <Brain className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-slate-900 font-bold text-xl sm:text-2xl">QEEG Brain Mapping</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 relative z-10 leading-relaxed font-medium">
              Advanced <span className="font-semibold text-slate-900">Quantitative EEG</span> for analysing electrical brain activity and identifying cognitive imbalances.
            </p>
            <Link href="/services/qeeg-brain-assessment" className="mt-2 self-start px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md relative z-10 cursor-pointer inline-block">
              Know More &rarr;
            </Link>
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
        className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 flex items-center justify-end pt-4 border-t border-slate-300/60 text-xs text-slate-600 font-medium transition-opacity duration-300 pointer-events-none z-20"
        style={{
          opacity: Math.max(0, 1 - scrollProgress * 5.0),
        }}
      >
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
