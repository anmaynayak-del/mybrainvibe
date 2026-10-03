"use client";

import React, { useState } from "react";
import {
  Stethoscope,
  Building2,
  Microscope,
  UserCheck,
  ChevronRight,
  ArrowUpRight,
  Check,
} from "lucide-react";

import { useBooking } from "@/components/BookingProvider";

export default function WhoWeServeSection() {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState(0);

  const personas = [
    {
      id: "clinicians",
      icon: Stethoscope,
      title: "Doctors & Clinicians",
      category: "Neurologists & Psychiatrists",
      subtitle: "Objective neurological biomarkers to support clinical diagnosis.",
      description:
        "Equip your practice with quantitative brain mapping and stress indices that complement subjective clinical evaluations. Gain instant, standardized reports with normative database comparisons.",
      benefits: [
        "Rapid 10-minute non-invasive assessment workflow",
        "Standardized QEEG power spectrum & coherence metrics",
        "Assists in monitoring ADHD, sleep disorders, anxiety, and cognitive decline",
        "Clear comparative progress tracking across treatment sessions",
      ],
      cta: "Schedule Clinical Demo",
    },
    {
      id: "organizations",
      icon: Building2,
      title: "Healthcare Organizations",
      category: "Hospitals & Wellness Centers",
      subtitle: "Scalable, non-invasive neuro-assessment infrastructure.",
      description:
        "Seamlessly integrate brain and heart wellness screening into executive health checks, outpatient neurology, memory clinics, and corporate wellness initiatives.",
      benefits: [
        "Zero consumable gel costs or complex technical setup",
        "Seamless cloud EHR integration and exportable PDF summaries",
        "High-throughput screening capability with minimal staff training",
        "Enterprise-grade HIPAA & data security compliance",
      ],
      cta: "Partner With Us",
    },
    {
      id: "researchers",
      icon: Microscope,
      title: "Researchers & Academia",
      category: "Neuroscience Institutes",
      subtitle: "High-fidelity raw & pre-processed neurological data.",
      description:
        "Accelerate clinical trials and cognitive studies with research-grade 19-channel signal fidelity developed in collaboration with premier academic centers like IIT Madras HTIC and SRMC.",
      benefits: [
        "Exportable raw EDF/CSV data with millisecond timing precision",
        "Event-Related Potential (ERP) protocol compatibility",
        "Advanced noise cancellation & automated artifact removal pipelines",
        "Custom biomarker scoring algorithms available for clinical studies",
      ],
      cta: "Access Research Datasets",
    },
    {
      id: "individuals",
      icon: UserCheck,
      title: "Patients & Individuals",
      category: "Mind-Body Wellness",
      subtitle: "Personalized, data-driven insights into your stress and focus.",
      description:
        "Take proactive control of your mental performance and stress resilience. Understand how your brain and nervous system react to pressure, fatigue, and daily lifestyle factors.",
      benefits: [
        "100% painless and non-invasive — no needles, radiation, or residue",
        "Clear, easy-to-understand visual report of brain fatigue and stress",
        "Actionable lifestyle recommendations connecting brain and heart health",
        "Track improvement over time with periodic reassessments",
      ],
      cta: "Book Individual Assessment",
    },
  ];

  return (
    <section id="who-we-serve" className="py-28 max-lg:!py-16 bg-[#ebebed] border-t border-slate-200/70">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Section 02 // Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18]">
              Engineered For The <br />
              <span className="text-teal-600">Full Healthcare Spectrum.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-slate-600 max-w-md">
            From premier neurology departments to preventive corporate wellness,
            our platform adapts to your clinical and personal objectives.
          </p>
        </div>

        {/* Persona Selector Tabs (Desktop / Mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {personas.map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeTab === index;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col text-left p-5 max-sm:!p-3 rounded-xl transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? "bg-white border-teal-600 shadow-md shadow-teal-600/10 ring-1 ring-teal-600"
                    : "bg-white/60 hover:bg-white border-slate-200/80 text-slate-600 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-teal-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    0{index + 1}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider line-clamp-1">
                  {item.category}
                </span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 line-clamp-1">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Persona Editorial Detail Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-sm:!p-6 border border-slate-200/90 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-3">
                <span>{personas[activeTab].category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                {personas[activeTab].title}
              </h3>
              <p className="text-base font-medium text-teal-700 mb-4">
                {personas[activeTab].subtitle}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                {personas[activeTab].description}
              </p>

              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white text-xs sm:text-sm font-semibold hover:bg-teal-700 shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/30 transition-all duration-200 cursor-pointer"
              >
                <span>{personas[activeTab].cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-4">
                Key Clinical Advantages
              </h4>
              <ul className="space-y-3.5">
                {personas[activeTab].benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
