import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[var(--background)]">
      <div className="mb-10">
        <img 
          src="/logo.png" 
          alt="BrainVibe Logo" 
          className="h-16 sm:h-20 w-auto object-contain"
        />
      </div>
      
      <h1 className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight mb-4">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
        Neural Pathway Not Found
      </h2>
      <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/30 hover:-translate-y-0.5"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
