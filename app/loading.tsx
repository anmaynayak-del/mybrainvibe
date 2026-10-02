import { Brain } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)]">
      <div className="relative w-20 h-20 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-3xl border-2 border-teal-200 animate-ping opacity-30" />
        <div className="relative w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center shadow-lg shadow-teal-500/10 border border-teal-100">
          <Brain className="w-8 h-8 text-teal-600 animate-pulse" />
        </div>
      </div>
      <h3 className="text-sm font-semibold tracking-widest text-slate-700 uppercase animate-pulse">
        Initializing...
      </h3>
    </div>
  );
}
