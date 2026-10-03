"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { Brain, Sparkles, ShieldCheck, ChevronRight, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";

const TOTAL_FRAMES = 240;

export default function QEEGBrainAssessmentPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const requestRef = useRef<number | null>(null);
  const layoutRef = useRef({
    width: 0, height: 0, drawWidth: 0, drawHeight: 0, offsetX: 0, offsetY: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Cached layout calculation
  const updateLayout = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const rect = canvas.getBoundingClientRect();
    const targetWidth = Math.max(1, Math.floor(rect.width * dpr));
    const targetHeight = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgRatio = 16 / 9;
    const canvasRatio = targetWidth / targetHeight;

    let drawWidth: number;
    let drawHeight: number;

    if (canvasRatio > imgRatio) {
      drawWidth = targetWidth;
      drawHeight = drawWidth / imgRatio;
    } else {
      drawHeight = targetHeight;
      drawWidth = drawHeight * imgRatio;
    }

    const offsetX = (targetWidth - drawWidth) / 2;
    let offsetY = (targetHeight - drawHeight) / 2;

    if (canvasRatio < 1) {
      offsetY += targetHeight * 0.15;
    }

    layoutRef.current = { width: targetWidth, height: targetHeight, drawWidth, drawHeight, offsetX, offsetY };
    lastRenderedFrameRef.current = -1;
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout, { passive: true });
    return () => window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  // Interleaved preloader
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;

    const order: number[] = [];
    const step = 4;
    for (let i = 0; i < TOTAL_FRAMES; i += step) order.push(i);
    for (let i = 2; i < TOTAL_FRAMES; i += step) { if (!order.includes(i)) order.push(i); }
    for (let i = 0; i < TOTAL_FRAMES; i++) { if (!order.includes(i)) order.push(i); }

    const loadFrame = async (index: number) => {
      if (isCancelled) return;
      const num = (index + 1).toString().padStart(4, "0");
      const img = new Image();
      img.decoding = "async";
      img.src = `/brain-frames/frame_${num}.jpg`;

      try {
        if ("decode" in img) await img.decode();
      } catch { /* fallback */ }

      if (isCancelled) return;
      imagesRef.current[index] = img;
      loaded++;
      setLoadedCount(loaded);
      if (index === 0 || loaded >= 4) setIsReady(true);
    };

    const CONCURRENCY = 6;
    let activeIndex = 0;
    const worker = async () => {
      while (activeIndex < order.length && !isCancelled) {
        const nextIdx = order[activeIndex++];
        await loadFrame(nextIdx);
      }
    };
    Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

    return () => { isCancelled = true; };
  }, []);

  // Scroll handler
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, progress));
      setScrollProgress(clamped);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map scroll progress to target frame
  useEffect(() => {
    const exactFrame = scrollProgress * (TOTAL_FRAMES - 1);
    targetFrameRef.current = Math.max(0, Math.min(TOTAL_FRAMES - 1, exactFrame));
  }, [scrollProgress]);

  // 60fps render loop with cross-fading
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current += diff * 0.16;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const exactFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current));
      const frameDelta = Math.abs(exactFrame - lastRenderedFrameRef.current);

      if (frameDelta > 0.001 || lastRenderedFrameRef.current === -1) {
        const frameIndex1 = Math.floor(exactFrame);
        const frameIndex2 = Math.min(TOTAL_FRAMES - 1, frameIndex1 + 1);
        const blend = exactFrame - frameIndex1;

        let img1 = imagesRef.current[frameIndex1];
        if (!img1 || !img1.complete || img1.naturalWidth === 0) {
          for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
            const prev = imagesRef.current[frameIndex1 - offset];
            if (prev && prev.complete && prev.naturalWidth > 0) { img1 = prev; break; }
            const next = imagesRef.current[frameIndex1 + offset];
            if (next && next.complete && next.naturalWidth > 0) { img1 = next; break; }
          }
        }

        const img2 = imagesRef.current[frameIndex2];
        const layout = layoutRef.current;

        if (layout.width > 0) {
          ctx.fillStyle = "#cbcdcf";
          ctx.fillRect(0, 0, layout.width, layout.height);

          if (img1 && img1.complete && img1.naturalWidth > 0) {
            lastRenderedFrameRef.current = exactFrame;
            ctx.globalAlpha = 1.0;
            ctx.drawImage(img1, layout.offsetX, layout.offsetY, layout.drawWidth, layout.drawHeight);

            if (blend > 0.02 && img2 && img2.complete && img2.naturalWidth > 0) {
              ctx.globalAlpha = blend;
              ctx.drawImage(img2, layout.offsetX, layout.offsetY, layout.drawWidth, layout.drawHeight);
              ctx.globalAlpha = 1.0;
            }
          }
        }
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isReady]);

  // --- CALCULATE OPACITIES AND TRANSFORMS ---
  
  // Phase 1: Intro (0.0 to 0.12)
  const introOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.04) / 0.08));
  const introTranslateY = scrollProgress * 120;

  // Phase 2: Why It Matters (0.12 to 0.38)
  const whyOpacity =
    scrollProgress >= 0.12 && scrollProgress <= 0.38
      ? Math.sin(((scrollProgress - 0.12) / 0.26) * Math.PI)
      : 0;

  // Phase 3: Conditions Supported (0.38 to 0.64)
  const conditionsOpacity =
    scrollProgress >= 0.38 && scrollProgress <= 0.64
      ? Math.sin(((scrollProgress - 0.38) / 0.26) * Math.PI)
      : 0;

  // Phase 4: Book Assessment (0.64 to 0.90)
  const offeringsOpacity =
    scrollProgress >= 0.64 && scrollProgress <= 0.90
      ? Math.sin(((scrollProgress - 0.64) / 0.26) * Math.PI)
      : 0;

  // Phase 5: CTA (0.90 to 1.0)
  const completeOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.90) / 0.05));


  return (
    <main className="relative min-h-screen bg-[#cbcdcf] text-slate-900 font-sans selection:bg-teal-600 selection:text-white">
      <Navbar />

      {/* SCROLL CONTAINER */}
      <div
        ref={containerRef}
        className="relative w-full h-[500vh] bg-[#cbcdcf]"
      >
        {/* STICKY VIEWPORT */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          {/* Radial glow — same as homepage */}
          <div className="absolute inset-0 radial-glow pointer-events-none" />

          {/* Scroll Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-slate-300/40 z-30">
            <div
              className="h-full bg-teal-600 transition-all duration-75 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Canvas */}
          <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
            {!isReady && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#cbcdcf]/90 backdrop-blur-sm transition-opacity duration-500">
                <div className="relative w-16 h-16 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border-2 border-teal-200 animate-ping opacity-30" />
                  <div className="w-12 h-12 rounded-full border-3 border-teal-600 border-t-transparent animate-spin" />
                </div>
                <p className="text-xs font-semibold tracking-wider text-slate-700 uppercase">
                  Calibrating Brain Model
                </p>
                <div className="w-48 h-1.5 bg-slate-300 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-teal-600 transition-all duration-200 ease-out"
                    style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-700 mt-1.5">
                  {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
                </span>
              </div>
            )}

            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain block pointer-events-none transition-opacity duration-500 ease-out"
              style={{ opacity: isReady ? 1 : 0 }}
            />
          </div>

          {/* OVERLAY LAYER */}
          <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16 w-full overflow-hidden">

            {/* --- PHASE 1: INTRO SPLIT --- */}
            <div
              className="absolute left-0 top-[18%] sm:top-[25%] lg:top-[28%] pt-6 sm:pt-0 pl-2 sm:pl-4 lg:pl-4 w-full sm:w-[45%] xl:w-[40%] flex flex-col items-start transition-all duration-150 ease-out z-20 pointer-events-none"
              style={{
                opacity: introOpacity,
                transform: `translateY(-${introTranslateY}px)`,
                visibility: introOpacity > 0.01 ? "visible" : "hidden",
              }}
            >
              <h1 className="text-[3.5rem] sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.05] mb-5 sm:mb-6 pointer-events-auto">
                QEEG Brain<br />
                <span className="text-teal-600">Assessment.</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-[300px] sm:max-w-[360px] mb-6 sm:mb-8 pointer-events-auto">
                AI-Powered Brain Mapping. Measures your brain&apos;s electrical activity in real time — revealing patterns linked to focus, mood, memory, and mental clarity.
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pointer-events-auto">
                <Link
                  href="/what-we-do"
                  className="px-5 py-2.5 rounded-full bg-teal-600 text-white font-semibold text-xs hover:bg-teal-700 transition-all duration-200 shadow-md shadow-teal-600/25 cursor-pointer"
                >
                  Explore Our Technology
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md text-slate-800 border border-slate-300/80 font-semibold text-xs hover:bg-white/80 transition-all duration-200 shadow-sm cursor-pointer"
                >
                  Book Assessment
                </Link>
              </div>
            </div>

            <div
              className="absolute right-0 top-[65%] sm:top-[35%] lg:top-[40%] pr-2 sm:pr-4 lg:pr-4 w-full sm:w-[45%] xl:w-[40%] flex flex-col items-end text-right transition-all duration-150 ease-out z-20 pointer-events-none"
              style={{
                opacity: introOpacity,
                transform: `translateY(-${introTranslateY}px)`,
                visibility: introOpacity > 0.01 ? "visible" : "hidden",
              }}
            >
              <h1 className="text-[3.5rem] sm:text-6xl lg:text-[5.5rem] font-extrabold tracking-tighter text-slate-900 leading-[1.05] pointer-events-auto">
                Understand Your<br />Brain.
              </h1>
            </div>

            {/* --- PHASE 2: WHY IT MATTERS --- */}
            <div
              className="absolute inset-0 transition-all duration-200 pointer-events-none"
              style={{
                opacity: whyOpacity,
                visibility: whyOpacity > 0.01 ? "visible" : "hidden",
                transform: `translateY(${(0.25 - scrollProgress) * 60}px)`,
              }}
            >
              {/* Heading */}
              <div className="absolute top-6 sm:top-12 lg:top-16 left-0 right-0 text-center flex justify-center z-10">
                <div
                  className="inline-block px-6 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="text-teal-600 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-1 block">Understand</span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Why <span className="text-[#F5B041]">QEEG</span> Matters
                  </h2>
                </div>
              </div>

              {/* LEFT */}
              <div className="absolute left-0 top-[50%] -translate-y-1/2 pl-6 sm:pl-12 lg:pl-16 w-full sm:w-[48%] lg:w-[42%] max-w-lg pointer-events-auto">
                <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-3 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white flex items-center justify-center shrink-0 border border-teal-100/50 shadow-sm">
                      <Brain className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-xl sm:text-2xl">What is QEEG?</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium relative z-10">
                    Quantitative Electroencephalography (QEEG) is an advanced test that measures your brain&apos;s electrical activity. Unlike CT or MRI scans that show structure, QEEG shows how your brain <span className="font-semibold text-slate-900">functions in real time</span>.
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="absolute right-0 top-[50%] -translate-y-1/2 pr-6 sm:pr-12 lg:pr-16 w-full sm:w-[48%] lg:w-[42%] max-w-lg pointer-events-auto">
                <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-3 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white flex items-center justify-center shrink-0 border border-teal-100/50 shadow-sm">
                      <Sparkles className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-xl sm:text-2xl">Why It Matters</h3>
                  </div>
                  <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium relative z-10">
                    <p>
                      QEEG reveals brain function patterns that are <span className="font-semibold text-slate-900">invisible to standard imaging tests</span>, giving doctors a clearer picture of cognitive and emotional health.
                    </p>
                    <p>
                      This helps in early detection, precise diagnosis, and tracking treatment progress for neurological and psychological conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* --- PHASE 3: CONDITIONS SUPPORTED --- */}
            <div
              className="absolute inset-0 transition-all duration-200 pointer-events-none"
              style={{
                opacity: conditionsOpacity,
                visibility: conditionsOpacity > 0.01 ? "visible" : "hidden",
                transform: `translateY(${(0.51 - scrollProgress) * 60}px)`,
              }}
            >
              {/* Heading */}
              <div className="absolute top-6 sm:top-12 lg:top-16 left-0 right-0 text-center flex justify-center z-10">
                <div
                  className="inline-block px-6 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="text-teal-700 font-semibold tracking-wider uppercase text-[10px] sm:text-xs block mb-1">Applications</span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Conditions Supported</h2>
                </div>
              </div>

              {/* LEFT */}
              <div className="absolute left-0 top-[50%] -translate-y-1/2 pl-6 sm:pl-12 lg:pl-16 w-full sm:w-[48%] lg:w-[42%] max-w-lg pointer-events-auto">
                <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
                  {[
                    "Anxiety, depression, and mood swings",
                    "ADHD and attention problems",
                    "Sleep disorders and burnout"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="absolute right-0 top-[50%] -translate-y-1/2 pr-6 sm:pr-12 lg:pr-16 w-full sm:w-[48%] lg:w-[42%] max-w-lg pointer-events-auto">
                <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
                  {[
                    "Concussion and post-injury recovery",
                    "Memory loss, dementia, and cognitive decline",
                    "Post-stroke or head injury rehabilitation"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* --- PHASE 4: WHO CAN BENEFIT --- */}
            <div
              className="absolute inset-0 transition-all duration-300 pointer-events-none"
              style={{
                opacity: offeringsOpacity,
                visibility: offeringsOpacity > 0.01 ? "visible" : "hidden",
                transform: `translateY(${(0.77 - scrollProgress) * 60}px)`,
              }}
            >
              {/* Heading */}
              <div className="absolute top-6 sm:top-12 lg:top-16 left-0 right-0 text-center flex justify-center z-10">
                <div
                  className="inline-block px-6 py-3 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.55)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                >
                  <span className="text-teal-600 font-semibold tracking-wider uppercase text-xs sm:text-sm mb-1 block">Eligibility</span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">Who Can Benefit</h2>
                </div>
              </div>

              {/* LEFT */}
              <div className="absolute left-0 top-[50%] -translate-y-1/2 pl-6 sm:pl-12 lg:pl-16 w-full sm:w-[48%] lg:w-[42%] max-w-lg pointer-events-auto">
                <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-4 relative overflow-hidden group cursor-default hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
                  <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                    <Brain className="w-40 h-40 text-teal-900" />
                  </div>
                  <div className="relative z-10 flex items-center gap-4 mb-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white flex items-center justify-center shrink-0 border border-teal-100/50 shadow-sm group-hover:scale-105 transition-transform">
                      <Brain className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-xl sm:text-2xl">Ideal For</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 relative z-10 leading-relaxed font-medium">
                    Individuals experiencing <span className="font-semibold text-slate-900">chronic stress, brain fog, focus issues</span>, or those recovering from head injuries and neurological events.
                  </p>
                  <Link href="/contact" className="mt-2 self-start px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md relative z-10 cursor-pointer inline-block">
                    Book Assessment &rarr;
                  </Link>
                </div>
              </div>

              {/* RIGHT */}
              <div className="absolute right-0 top-[50%] -translate-y-1/2 pr-6 sm:pr-12 lg:pr-16 w-full sm:w-[48%] lg:w-[42%] max-w-lg pointer-events-auto">
                <div className="p-6 sm:p-7 rounded-3xl border border-white/80 bg-white/85 backdrop-blur-xl shadow-xl shadow-slate-200/40 flex flex-col gap-4 relative overflow-hidden group cursor-default hover:-translate-y-1 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-300">
                  <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                    <Sparkles className="w-40 h-40 text-teal-900" />
                  </div>
                  <div className="relative z-10 flex items-center gap-4 mb-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-50 to-white flex items-center justify-center shrink-0 border border-teal-100/50 shadow-sm group-hover:scale-105 transition-transform">
                      <Sparkles className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-xl sm:text-2xl">What You Get</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 relative z-10 leading-relaxed font-medium">
                    A comprehensive <span className="font-semibold text-slate-900">AI-powered brain map</span> with actionable insights into your cognitive health, attention patterns, and emotional well-being — all in a single non-invasive session.
                  </p>
                  <Link href="/technology" className="mt-2 self-start px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md relative z-10 cursor-pointer inline-block">
                    Our Technology &rarr;
                  </Link>
                </div>
              </div>
            </div>

            {/* --- PHASE 5: BOOK CTA --- */}
            <div
              className="w-full h-full flex flex-col items-center justify-end pb-16 sm:pb-24 text-center absolute inset-0 transition-all duration-300 pointer-events-none z-30"
              style={{
                opacity: completeOpacity,
                visibility: completeOpacity > 0.01 ? "visible" : "hidden",
              }}
            >
              <div className="p-2.5 rounded-full border border-white/60 pointer-events-auto bg-white/40 backdrop-blur-xl shadow-2xl">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-extrabold text-lg sm:text-xl transition-all duration-300 hover:from-teal-700 hover:to-teal-900 shadow-lg hover:shadow-[0_0_40px_rgba(13,148,136,0.6)] hover:scale-105 cursor-pointer"
                >
                  <Sparkles className="w-6 h-6 text-teal-300" />
                  <span className="tracking-wide">Book QEEG Assessment</span>
                </Link>
              </div>
            </div>

            {/* Bottom Scroll Indicator */}
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
        </div>
      </div>
      
    </main>
  );
}
