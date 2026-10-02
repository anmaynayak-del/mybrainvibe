"use client";

import React, { useEffect, useRef, useState } from "react";
import CanvasSequence from "./CanvasSequence";
import HeroOverlays from "./HeroOverlays";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export default function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleExploreClick = () => {
    window.location.href = "/what-we-do";
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[500vh] bg-[#cbcdcf]"
    >
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Subtle radial lighting for Apple-like product studio ambiance */}
        <div className="absolute inset-0 radial-glow pointer-events-none" />

        {/* Scroll Progress Indicator Bar at Top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-300/40 z-30">
          <div
            className="h-full bg-teal-600 transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Cinematic Canvas Frame Sequence */}
        <CanvasSequence scrollProgress={scrollProgress} />

        {/* Hero Narrative Overlays */}
        <HeroOverlays
          scrollProgress={scrollProgress}
          onExploreClick={handleExploreClick}
          onBookClick={onOpenBooking}
        />
      </div>
    </div>
  );
}
