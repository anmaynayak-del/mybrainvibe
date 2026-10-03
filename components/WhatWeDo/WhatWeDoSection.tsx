"use client";

import React from "react";
import {
  Brain,
  Cpu,
  Activity,
  FileCheck2,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function WhatWeDoSection() {
  const features = [
    {
      id: "01",
      icon: Brain,
      title: "Brain Function Assessment",
      tagline: "Quantitative EEG & Cortical Mapping",
      description:
        "High-density dry QEEG captures frequency band power, functional connectivity, and hemispheric synchrony in real-time.",
      highlights: ["19 standard 10-20 channels", "Zero gel or head prep", "Safe & non-invasive"],
    },
    {
      id: "02",
      icon: Cpu,
      title: "AI-Powered Neural Analysis",
      tagline: "Machine Learning Biomarker Extraction",
      description:
        "Proprietary deep neural networks filter physiological artifacts and cross-reference age-normed clinical databases.",
      highlights: ["Sub-second processing", "Automated artifact filtration", "Stress pattern identification"],
    },
    {
      id: "03",
      icon: Activity,
      title: "Heart-Brain Dual Axis",
      tagline: "Integrated Autonomic HRV Analysis",
      description:
        "Simultaneously correlates sympathetic vs. parasympathetic tone with central nervous system stress reactivity.",
      highlights: ["Autonomic balance score", "Vagal tone quantification", "Mind-body coherence"],
    },
    {
      id: "04",
      icon: FileCheck2,
      title: "Clinical Decision Support",
      tagline: "Objective, Standardized Diagnostics",
      description:
        "Transforms complex microvolt waveforms into clear, interpretable visual reports for doctors and specialists.",
      highlights: ["Color-coded topographic maps", "Trend tracking over time", "Actionable clinical summaries"],
    },
  ];

  const metrics = [
    { value: "19", label: "Dry QEEG Channels", sub: "Standard 10-20 system" },
    { value: "< 10 min", label: "Assessment Time", sub: "Rapid clinical workflow" },
    { value: "0", label: "Radiation / Needles", sub: "100% Non-invasive" },
    { value: "98.4%", label: "Signal Fidelity", sub: "Active noise suppression" },
  ];

  return (
    <section id="what-we-do" className="relative py-28 max-lg:!py-16 bg-white border-t border-slate-100">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Section 01 // Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
            Turning Brain Signals Into{" "}
            <span className="text-teal-600">Meaningful Insights.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            By merging cutting-edge dry-sensor neurotechnology with validated clinical algorithms,
            BrainVibe translates complex neurological electrical signals into clear, actionable health metrics.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 max-lg:!mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-[#ebebed] hover:bg-white rounded-2xl p-8 max-sm:!p-6 border border-slate-200/70 hover:border-teal-300 shadow-xs hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-600 group-hover:text-white text-teal-700 flex items-center justify-center transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-teal-600">
                    {feature.id}
                  </span>
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 block mb-1">
                  {feature.tagline}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-950">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Feature Highlights */}
                <div className="pt-4 border-t border-slate-200/60 flex flex-wrap gap-2">
                  {feature.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white group-hover:bg-teal-50/50 border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinical Impact Metrics Strip */}
        <div className="mt-20 max-lg:!mt-12 rounded-3xl bg-slate-900 text-white p-8 sm:p-12 max-sm:!p-6 relative overflow-hidden shadow-2xl shadow-slate-900/10">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800 max-md:!divide-y-0 max-md:[&>div:nth-child(n+3)]:pt-8 max-md:[&>div:nth-child(n+3)]:border-t max-md:[&>div:nth-child(n+3)]:border-slate-800">
            {metrics.map((metric, i) => (
              <div key={i} className={`flex flex-col ${i > 0 ? "pt-6 md:pt-0 md:pl-8" : ""} max-md:!pt-0 max-md:!pl-0`}>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-teal-400 font-mono">
                  {metric.value}
                </span>
                <span className="mt-2 text-sm sm:text-base font-semibold text-white">
                  {metric.label}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  {metric.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
