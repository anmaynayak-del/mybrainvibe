"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ShieldCheck, Heart, Stethoscope, ChevronRight, Users } from "lucide-react";

import Navbar from "@/components/Navbar";

export default function HRVStressCheckPage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is 500vh tall to allow enough scroll room for 4 phases
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScroll = windowHeight * 4.0; // 400vh scrollable
      
      let progress = scrollY / maxScroll;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // --- CALCULATE OPACITIES AND TRANSFORMS ---
  
  // Phase 1: Intro (0.0 to 0.15)
  const introOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.05) / 0.1));
  const introTranslateY = scrollProgress * 200;

  // Phase 2: Why HRV Matters (0.15 to 0.5)
  let whyLeftOpacity = 0;
  if (scrollProgress >= 0.15 && scrollProgress <= 0.25) whyLeftOpacity = (scrollProgress - 0.15) / 0.1;
  else if (scrollProgress > 0.25 && scrollProgress <= 0.4) whyLeftOpacity = 1;
  else if (scrollProgress > 0.4 && scrollProgress <= 0.5) whyLeftOpacity = 1 - (scrollProgress - 0.4) / 0.1;
  const whyLeftTranslateY = (0.3 - scrollProgress) * 200;

  let whyRightOpacity = 0;
  if (scrollProgress >= 0.2 && scrollProgress <= 0.3) whyRightOpacity = (scrollProgress - 0.2) / 0.1;
  else if (scrollProgress > 0.3 && scrollProgress <= 0.45) whyRightOpacity = 1;
  else if (scrollProgress > 0.45 && scrollProgress <= 0.55) whyRightOpacity = 1 - (scrollProgress - 0.45) / 0.1;
  const whyRightTranslateY = (0.35 - scrollProgress) * 200;

  // Phase 3: Who Can Get (same animation pattern as Phase 2, shifted by 0.35)
  let whoLeftOpacity = 0;
  if (scrollProgress >= 0.5 && scrollProgress <= 0.6) whoLeftOpacity = (scrollProgress - 0.5) / 0.1;
  else if (scrollProgress > 0.6 && scrollProgress <= 0.75) whoLeftOpacity = 1;
  else if (scrollProgress > 0.75 && scrollProgress <= 0.85) whoLeftOpacity = 1 - (scrollProgress - 0.75) / 0.1;
  const whoLeftTranslateY = (0.65 - scrollProgress) * 200;

  let whoRightOpacity = 0;
  if (scrollProgress >= 0.55 && scrollProgress <= 0.65) whoRightOpacity = (scrollProgress - 0.55) / 0.1;
  else if (scrollProgress > 0.65 && scrollProgress <= 0.8) whoRightOpacity = 1;
  else if (scrollProgress > 0.8 && scrollProgress <= 0.9) whoRightOpacity = 1 - (scrollProgress - 0.8) / 0.1;
  const whoRightTranslateY = (0.7 - scrollProgress) * 200;

  // Phase 4: Book Assessment (0.85 to 1.0)
  const bookOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.85) / 0.1));
  const bookTranslateY = (1.0 - scrollProgress) * 150;


  return (
    <main className="min-h-screen bg-[#ebebed] relative">
      <Navbar />

      <style>{`
        @keyframes heartbeat {
          0% { transform: translate(-50%, -50%) scale(1); }
          14% { transform: translate(-50%, -50%) scale(1.15); }
          28% { transform: translate(-50%, -50%) scale(1); }
          42% { transform: translate(-50%, -50%) scale(1.15); }
          70% { transform: translate(-50%, -50%) scale(1); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        @keyframes ecgScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-ecg-scroll {
          animation: ecgScroll 4s linear infinite;
        }
      `}</style>

      {/* 
        SCROLL CONTAINER
        We make this container 500vh tall to allow scrolling through 4 phases.
      */}
      <div className="relative w-full h-[500vh]">
        
        {/* STICKY VIEWPORT */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          
          {/* ECG Line Background - Infinite Scroll like a medical monitor */}
          <div className="absolute inset-0 flex items-center z-0 overflow-hidden pointer-events-none opacity-50">
            <div className="flex animate-ecg-scroll" style={{ width: '400vw' }}>
              
              <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="flex-shrink-0 h-[200px]" style={{ width: '100vw' }}>
                 <polyline 
                   points="0,100 150,100 180,70 200,140 240,30 270,160 300,100 400,100 430,70 450,140 490,30 520,160 550,100 700,100 730,70 750,140 790,30 820,160 850,100 1000,100" 
                   fill="none" stroke="#0d9488" strokeWidth="3" 
                 />
              </svg>

              <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="flex-shrink-0 h-[200px]" style={{ width: '100vw' }}>
                 <polyline 
                   points="0,100 150,100 180,70 200,140 240,30 270,160 300,100 400,100 430,70 450,140 490,30 520,160 550,100 700,100 730,70 750,140 790,30 820,160 850,100 1000,100" 
                   fill="none" stroke="#0d9488" strokeWidth="3" 
                 />
              </svg>

              <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="flex-shrink-0 h-[200px]" style={{ width: '100vw' }}>
                 <polyline 
                   points="0,100 150,100 180,70 200,140 240,30 270,160 300,100 400,100 430,70 450,140 490,30 520,160 550,100 700,100 730,70 750,140 790,30 820,160 850,100 1000,100" 
                   fill="none" stroke="#0d9488" strokeWidth="3" 
                 />
              </svg>

              <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="flex-shrink-0 h-[200px]" style={{ width: '100vw' }}>
                 <polyline 
                   points="0,100 150,100 180,70 200,140 240,30 270,160 300,100 400,100 430,70 450,140 490,30 520,160 550,100 700,100 730,70 750,140 790,30 820,160 850,100 1000,100" 
                   fill="none" stroke="#0d9488" strokeWidth="3" 
                 />
              </svg>

            </div>
          </div>

          {/* Center Heart - Continuous HRV Animation */}
          <div className="absolute z-10 pointer-events-none" style={{ top: '50%', left: '50%', marginTop: '10px' }}>
            <div 
              className="text-[8rem] sm:text-[11rem] md:text-[14rem] leading-none select-none drop-shadow-xl animate-heartbeat"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              ❤️
            </div>
          </div>


          {/* --- PHASE 1: INTRO (Fades out as you scroll) --- */}
          <div 
            className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none"
            style={{
              opacity: introOpacity,
              visibility: introOpacity > 0.01 ? "visible" : "hidden",
              transform: `translateY(-${introTranslateY}px)`
            }}
          >
            {/* Left Text */}
            <div className="w-full md:w-[35%] lg:w-[32%] flex flex-col items-start pt-32 md:pt-0 pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold uppercase tracking-wider mb-4 border border-teal-100">
                <Activity className="w-4 h-4" />
                <span>Service</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05] mb-6">
                HRV <br/>
                <span className="text-teal-600">StressCheck</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-sm bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                Heart Rate Variability Test in Pashan for Stress Assessment. Measures the small changes between each heartbeat — revealing how well your autonomic nervous system adapts to stress.
              </p>
            </div>

            {/* Right Text */}
            <div className="w-full md:w-[35%] lg:w-[32%] flex flex-col items-end pb-12 md:pb-0 pointer-events-auto mt-auto md:mt-0 text-right">
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center justify-end gap-2">
                    What is HRV?
                    <Heart className="w-5 h-5 text-teal-600" />
                  </h2>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    Heart Rate Variability (HRV) measures the small changes between each heartbeat. Higher HRV means your body adapts better to stress, while lower HRV can indicate imbalance, fatigue, or early signs of disease.
                  </p>
               </div>
            </div>
          </div>


          {/* --- PHASE 2: WHY HRV MATTERS (SPLIT LEFT AND RIGHT) --- */}
          <div className="absolute inset-0 z-30 flex flex-col md:flex-row items-center justify-between w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none">
            
            {/* CENTER HEADING PILL */}
            <div 
              className="absolute top-[12%] sm:top-[15%] left-1/2 w-max pointer-events-auto"
              style={{
                opacity: Math.max(whyLeftOpacity, whyRightOpacity),
                visibility: Math.max(whyLeftOpacity, whyRightOpacity) > 0.01 ? "visible" : "hidden",
                transform: `translate(-50%, ${whyLeftTranslateY}px)`
              }}
            >
              <div className="bg-white shadow-sm border border-slate-200 px-8 py-4 rounded-full text-center">
                 <span className="text-xs font-bold uppercase tracking-widest text-teal-600 block mb-1">UNDERSTAND</span>
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-3">
                   <Stethoscope className="w-7 h-7 text-teal-600" />
                   Why HRV Matters
                 </h2>
              </div>
            </div>

            {/* LEFT HALF */}
            <div 
              className="w-full md:w-[35%] lg:w-[35%] flex flex-col pointer-events-auto mt-16 md:mt-0"
              style={{
                opacity: whyLeftOpacity,
                visibility: whyLeftOpacity > 0.01 ? "visible" : "hidden",
                transform: `translateY(${whyLeftTranslateY}px)`
              }}
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <p className="text-slate-700 text-sm leading-relaxed mb-5 font-medium">
                  HRV gives early warning signs of how stress affects your heart, brain, and metabolism. Doctors use HRV to:
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Detect nerve-related heart problems in people with diabetes.",
                    "Track stress imbalance linked to hypertension, anxiety, or sleep issues."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT HALF */}
            <div 
              className="w-full md:w-[35%] lg:w-[35%] flex flex-col pointer-events-auto mt-4 md:mt-0"
              style={{
                opacity: whyRightOpacity,
                visibility: whyRightOpacity > 0.01 ? "visible" : "hidden",
                transform: `translateY(${whyRightTranslateY}px)`
              }}
            >
               <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                 <div className="flex flex-col gap-3">
                  {[
                    "Monitor recovery after heart attack or rehabilitation.",
                    "Evaluate how lifestyle changes or therapies improve overall resilience.",
                    "Support preventive care and stress management programs."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
               </div>
            </div>
          </div>


          {/* --- PHASE 3: WHO CAN GET (SPLIT LEFT AND RIGHT — same style as Phase 2) --- */}
          <div className="absolute inset-0 z-40 flex flex-col md:flex-row items-center justify-between w-full h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none">
            
            {/* CENTER HEADING PILL */}
            <div 
              className="absolute top-[12%] sm:top-[15%] left-1/2 w-max pointer-events-auto"
              style={{
                opacity: Math.max(whoLeftOpacity, whoRightOpacity),
                visibility: Math.max(whoLeftOpacity, whoRightOpacity) > 0.01 ? "visible" : "hidden",
                transform: `translate(-50%, ${whoLeftTranslateY}px)`
              }}
            >
              <div className="bg-white shadow-sm border border-slate-200 px-8 py-4 rounded-full text-center">
                 <span className="text-xs font-bold uppercase tracking-widest text-teal-600 block mb-1">ELIGIBILITY</span>
                 <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 flex items-center justify-center gap-3">
                   <Users className="w-7 h-7 text-teal-600" />
                   Who Can Get an HRV StressCheck?
                 </h2>
              </div>
            </div>

            {/* LEFT HALF */}
            <div 
              className="w-full md:w-[35%] lg:w-[35%] flex flex-col pointer-events-auto mt-16 md:mt-0"
              style={{
                opacity: whoLeftOpacity,
                visibility: whoLeftOpacity > 0.01 ? "visible" : "hidden",
                transform: `translateY(${whoLeftTranslateY}px)`
              }}
            >
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                <p className="text-teal-600 text-sm leading-relaxed mb-5 font-semibold">
                  The test is ideal for:
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    "Individuals with chronic stress, fatigue, or poor sleep.",
                    "People with diabetes, heart, or lifestyle-related conditions."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT HALF */}
            <div 
              className="w-full md:w-[35%] lg:w-[35%] flex flex-col pointer-events-auto mt-4 md:mt-0"
              style={{
                opacity: whoRightOpacity,
                visibility: whoRightOpacity > 0.01 ? "visible" : "hidden",
                transform: `translateY(${whoRightTranslateY}px)`
              }}
            >
               <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg">
                 <div className="flex flex-col gap-3">
                  {[
                    "Those starting fitness, weight loss, or IVF programs.",
                    "Anyone looking to improve focus, energy, and overall health."
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
               </div>
            </div>
          </div>

          {/* --- PHASE 4: BOOK ASSESSMENT (Fades in at the bottom at the very end) --- */}
          <div 
            className="absolute inset-0 z-50 flex items-end justify-center w-full h-full max-w-4xl mx-auto px-6 pb-24 pointer-events-none"
            style={{
              opacity: bookOpacity,
              visibility: bookOpacity > 0.01 ? "visible" : "hidden",
              transform: `translateY(${bookTranslateY}px)`
            }}
          >
            <div className="pointer-events-auto flex flex-col items-center gap-6">
              <Link href="/" className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-teal-600 text-white font-extrabold text-xl hover:bg-teal-700 transition-colors shadow-2xl hover:scale-105 duration-200">
                Book Assessment <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>

        </div>
      </div>
      
    </main>
  );
}
