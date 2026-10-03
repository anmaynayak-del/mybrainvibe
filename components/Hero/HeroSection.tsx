"use client";

import React, { useRef, useState } from "react";
import CanvasSequence from "./CanvasSequence";
import HeroOverlays from "./HeroOverlays";

import { useBooking } from "@/components/BookingProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const { openBooking } = useBooking();

  useGSAP(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const mm = gsap.matchMedia();

    // DESKTOP: (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      let ticking = false;
      const updateScroll = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;
        const progress = -rect.top / totalScrollable;
        setScrollProgress(Math.max(0, Math.min(1, progress)));
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
    });

    // MOBILE/TABLET: (max-width: 1023px)
    // Lighter variant: Shorter distance, GSAP ScrollTrigger to track progress, no sticky native pin.
    mm.add("(max-width: 1023px)", () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setScrollProgress(self.progress),
      });
      return () => st.kill();
    });

    // REDUCED MOTION
    mm.add("(prefers-reduced-motion: reduce)", () => {
      setScrollProgress(1); // static end state
    });

    // Refresh on orientation change to recalculate bounds
    const handleOrientation = () => ScrollTrigger.refresh();
    window.addEventListener("orientationchange", handleOrientation);

    return () => {
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, { scope: containerRef });

  const handleExploreClick = () => {
    window.location.assign("/what-we-do");
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full h-[500vh] max-lg:h-[250vh] bg-[#cbcdcf]"
    >
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 w-full h-screen max-lg:h-[100dvh] overflow-hidden flex items-center justify-center">
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
          onBookClick={openBooking}
        />
      </div>
    </div>
  );
}
