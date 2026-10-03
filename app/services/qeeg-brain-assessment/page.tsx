import React from "react";
import Link from "next/link";
import { Brain, Sparkles, ShieldCheck, ChevronRight } from "lucide-react";

export default function QEEGBrainAssessmentPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#ebebed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold uppercase tracking-wider mb-6">
            <Brain className="w-4 h-4" />
            <span>Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            QEEG Brain <span className="text-teal-600">Assessment</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            AI-Powered Brain Mapping. Measures your brain's electrical activity in real time — revealing patterns linked to focus, mood, memory, and mental clarity.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-white/80">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="p-2 bg-teal-50 rounded-xl text-teal-600">
                <Sparkles className="w-6 h-6" />
              </span>
              What is QEEG?
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Quantitative Electroencephalography (QEEG) is an advanced test that measures your brain's electrical activity. It analyses brainwave patterns to detect how well different parts of your brain are working — helping identify focus, mood, or sleep issues early. 
            </p>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium">
              Unlike CT or MRI scans that show structure, QEEG shows how your brain functions in real time.
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 border border-white/80">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="p-2 bg-teal-50 rounded-xl text-teal-600">
                <Brain className="w-6 h-6" />
              </span>
              Why It Matters
            </h2>
            <p className="text-slate-600 leading-relaxed">
              QEEG reveals brain function patterns that are invisible to standard imaging tests, giving doctors a clearer picture of cognitive and emotional health. This helps in early detection, precise diagnosis, and tracking treatment progress for a wide range of neurological and psychological conditions.
            </p>
          </div>
        </div>

        {/* Conditions Supported */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Conditions Supported</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                "Anxiety, depression, and mood swings",
                "ADHD and attention problems",
                "Sleep disorders and burnout",
                "Concussion and post-injury recovery",
                "Memory loss, dementia, and cognitive decline",
                "Post-stroke or head injury rehabilitation"
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-teal-400" />
                  <span className="text-slate-200 font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-colors">
                Book QEEG Assessment <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
