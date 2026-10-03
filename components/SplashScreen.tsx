"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Wait 2.5 seconds, then start fading out
    const timer1 = setTimeout(() => {
      setIsFading(true);
    }, 2500);

    // After fade transition completes (500ms), unmount
    const timer2 = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#ebebed] transition-opacity duration-500 h-[100dvh] overflow-y-auto ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center min-h-full py-8">
        <Image 
          src="/logo.png" 
          alt="Loading BrainVibe" 
          width={160}
          height={80}
          className="h-12 sm:h-20 w-auto object-contain animate-pulse"
        />
        <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-slate-500 uppercase animate-pulse mt-4">
          Initializing...
        </h3>
      </div>
    </div>
  );
}
