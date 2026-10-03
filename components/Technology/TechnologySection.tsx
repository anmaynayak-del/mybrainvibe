"use client";

import React from "react";
import {
  Sparkles,
  Cpu,
  Layers,
  Activity,
  ArrowRight,
  Radio,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import NeuralWaveViewer from "./NeuralWaveViewer";

export default function TechnologySection() {
  const steps = [
    {
      num: "01",
      title: "Rapid Ergonomic Placement",
      description:
        "The self-adjusting medical headset conforms to any adult cranial morphology in under 60 seconds with zero skin preparation or conductive gels.",
      tag: "Hardware Architecture",
    },
    {
      num: "02",
      title: "Dual-Modal Biosignal Acquisition",
      description:
        "High-density dry electrodes record 19-channel EEG signals simultaneously with photoplethysmography (PPG) for heart rate variability (HRV).",
      tag: "Sensor Array",
    },
    {
      num: "03",
      title: "Edge AI Artifact Suppression",
      description:
        "Proprietary deep neural networks strip eye blinks, muscle twitches, and 50/60Hz electromagnetic line noise in real-time.",
      tag: "Neural Processing",
    },
    {
      num: "04",
      title: "Quantitative Clinical Synthesis",
      description:
        "Extracts spectral power ratios (Theta/Beta, Alpha peak), autonomic stress index, and cognitive fatigue into a validated standardized report.",
      tag: "Diagnostic Output",
    },
  ];

  return (
    <section id="technology" className="py-28 bg-white border-t border-slate-200/70">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>Section 03 // Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
            Medical-Grade Precision. <br />
            <span className="text-teal-600">Zero Invasiveness.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Traditional clinical EEG requires abrasive pastes, extensive scalp preparation,
            and hours of manual cleanup. BrainVibe transforms this paradigm into a frictionless
            10-minute workflow.
          </p>
        </div>

        {/* 4-Step Engineering Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#ebebed] p-6 sm:p-7 rounded-2xl border border-slate-200/80 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-900/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-teal-600/80 group-hover:text-teal-600">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-semibold text-teal-700 group-hover:translate-x-1 transition-transform">
                <span>Phase Complete</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Oscilloscope Simulator */}
        <div className="my-10">
          <NeuralWaveViewer />
        </div>
      </div>
    </section>
  );
}
