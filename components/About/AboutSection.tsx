import React from "react";
import { BrainCircuit, HeartPulse, ActivitySquare } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 max-lg:!py-16 bg-[#ebebed] border-t border-slate-200/70">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-lg:!gap-10 items-center">
          
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <span>Section 02 // About Us</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.18] mb-8">
              Understand Your Stress. <br />
              <span className="text-teal-600">Transform Your Well-Being.</span>
            </h2>
            
            <div className="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                In today&apos;s high-pressure world, <strong>MyBrainVibe</strong> is pioneering a new approach to stress assessment and brain function analysis. Using advanced, non-invasive technologies such as Heart Rate Variability (HRV) stress testing and AI-enabled QEEG brain mapping, we help individuals and clinicians understand the physiological and neurological impact of stress.
              </p>
              <p>
                Powered by <strong>22Neuro</strong>, a team of neuroscientists, clinicians, and technology experts, MyBrainVibe combines clinical experience from leading neurologists and behavioural health experts with research collaborations from institutions like <strong>IIT Madras (HTIC)</strong> and <strong>SRMC, Chennai</strong>.
              </p>
              <p className="font-medium text-slate-800 border-l-4 border-teal-500 pl-4">
                Our mission is to bridge the gap between mental and physical health by offering safe, data-driven, and personalized insights into stress, autonomic balance, cognitive health, and overall well-being.
              </p>
            </div>
          </div>

          {/* Right Highlights/Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">HRV StressCheck</h3>
              <p className="text-sm text-slate-600">
                Real-time Heart Rate Variability testing to understand how your body reacts to stress and manage it effectively.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-lg hover:border-teal-300 transition-all duration-300 sm:translate-y-8 max-lg:!translate-y-0">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">QEEG Assessment</h3>
              <p className="text-sm text-slate-600">
                Advanced Quantitative EEG for analysing electrical brain activity and identifying cognitive or stress-related imbalances.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
