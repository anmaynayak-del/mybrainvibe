"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  BarChart3,
  HeartPulse,
  Brain,
  Zap,
  CheckCircle2,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function ClinicalInsightsSection() {
  const [selectedMetric, setSelectedMetric] = useState<"stress" | "focus" | "coherence">("stress");

  return (
    <section id="clinical-insights" className="py-28 max-lg:!py-16 bg-[#ebebed] border-t border-slate-200/70">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Section 04 // Clinical Validation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
            Validated Science. <br />
            <span className="text-teal-600">Objective Biomarkers.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Developed in close collaboration with premier neuroscientists, clinicians, and researchers
            at IIT Madras (HTIC) and SRMC Chennai to bring hospital-grade diagnostics to everyday wellness.
          </p>
        </div>

        {/* Interactive Clinical Report Mockup & Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Interactive Metric Explorer */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-mono text-teal-600 font-semibold uppercase tracking-wider">
                  Live Assessment Report Synthesizer
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Sample Neurological Biomarker Profile
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold max-sm:hidden">
                Status: Calibrated
              </span>
            </div>

            {/* Metric Switcher Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1.5 gap-1.5 mb-8 max-sm:!flex-col">
              <button
                onClick={() => setSelectedMetric("stress")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedMetric === "stress"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Autonomic Stress
              </button>
              <button
                onClick={() => setSelectedMetric("focus")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedMetric === "focus"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Cognitive Focus
              </button>
              <button
                onClick={() => setSelectedMetric("coherence")}
                className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedMetric === "coherence"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Heart-Brain Axis
              </button>
            </div>

            {/* Dynamic Metric Display */}
            {selectedMetric === "stress" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-800">
                      Sympathetic Tone (Fight / Flight)
                    </span>
                    <span className="font-mono text-amber-600 font-bold">42% (Optimal &lt; 50%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "42%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-800">
                      Parasympathetic Tone (Vagal Recovery)
                    </span>
                    <span className="font-mono text-teal-600 font-bold">58% (Resilient)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: "58%" }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-teal-900 leading-relaxed">
                  <strong>Clinical Summary:</strong> Autonomic nervous system exhibits high adaptive flexibility. Vagal brake operates efficiently under resting state conditions.
                </div>
              </div>
            )}

            {selectedMetric === "focus" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-800">
                      Theta / Beta Power Ratio (Attention Index)
                    </span>
                    <span className="font-mono text-teal-600 font-bold">1.82 (Normal Range 1.5 - 2.2)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: "65%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-800">
                      Peak Alpha Frequency (PAF)
                    </span>
                    <span className="font-mono text-indigo-600 font-bold">10.4 Hz (High Processing Speed)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                  <strong>Clinical Summary:</strong> Sustained attention biomarkers indicate robust executive control without signs of neuro-cognitive exhaustion.
                </div>
              </div>
            )}

            {selectedMetric === "coherence" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-800">
                      Heart Rate Variability (SDNN / RMSSD)
                    </span>
                    <span className="font-mono text-teal-600 font-bold">64 ms (High Adaptability)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-600 rounded-full" style={{ width: "76%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-800">
                      Cardioneural Synchronization Index
                    </span>
                    <span className="font-mono text-emerald-600 font-bold">0.89 (High Coherence)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: "89%" }} />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
                  <strong>Clinical Summary:</strong> Respiratory sinus arrhythmia is tightly synchronized with central alpha rhythms, indicating optimal mind-body balance.
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Why MyBrainVibe Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Non-Invasive &amp; 100% Safe
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero needles, zero ionizing radiation, and zero scalp preparation. Just science-backed, data-driven assessments suitable for all ages.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <Award className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Academic &amp; Clinical Collaboration
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Developed in research partnership with prestigious institutions including <strong>IIT Madras (HTIC)</strong> and <strong>SRMC Chennai</strong>.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                <HeartPulse className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Early Stress &amp; Imbalance Detection
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Identify neuro-autonomic exhaustion before it manifests as physical symptoms, enabling timely preventive interventions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
