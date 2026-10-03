"use client";

import { useState, useEffect } from "react";
import { WifiOff, X } from "lucide-react";

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Initialize with current state safely after hydration
    if (typeof window !== "undefined" && "onLine" in navigator) {
      if (!navigator.onLine) {
        // Double check because navigator.onLine can be unreliable on some VPNs/OS
        fetch("/favicon.ico?ping=" + Date.now(), { method: "HEAD", cache: "no-store" })
          .then(() => setIsOffline(false))
          .catch(() => setIsOffline(true));
      }
    }

    const handleOnline = () => {
      setIsOffline(false);
      setDismissed(false); // Reset dismissal state when they come back online
    };
    
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline || dismissed) return null;

  return (
    <div className="fixed bottom-6 max-lg:bottom-auto max-lg:top-[max(5rem,env(safe-area-inset-top,5rem))] left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 animate-in slide-in-from-bottom-5 max-lg:slide-in-from-top-5 fade-in duration-300">
      <div className="glass-panel-dark flex items-center justify-between gap-4 px-4 py-3 rounded-2xl shadow-2xl shadow-slate-900/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
            <WifiOff className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">No Internet Connection</span>
            <span className="text-xs text-slate-300">You are viewing cached data.</span>
          </div>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
