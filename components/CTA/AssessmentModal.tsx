"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Calendar, Clock, MapPin, User, Mail, Phone, Brain } from "lucide-react";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssessmentModal({ isOpen, onClose }: AssessmentModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assessmentType: "QEEG Brain Mapping + HRV StressCheck",
    location: "Q-Point Clinic, Lotus Hospital (Pimple Saudagar, Pune)",
    preferredDate: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-white border-b border-slate-100 text-slate-900">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="BrainVibe Logo" 
              className="h-8 w-auto object-contain"
            />
            <div className="border-l border-slate-200 pl-3">
              <h3 className="text-base font-bold text-slate-800">Book Assessment</h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Non-Invasive Brain &amp; Stress Mapping
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              Appointment Request Received!
            </h4>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed max-w-sm">
              Thank you, <strong>{formData.name || "Client"}</strong>. Our clinical coordinator from 22Neuro / BrainVibe will contact you at{" "}
              <strong>{formData.phone || formData.email}</strong> to confirm your slot.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Dr. John Doe / Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Service
              </label>
              <div className="relative">
                <Brain className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={formData.assessmentType}
                  onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                >
                  <option>QEEG Brain Mapping + HRV StressCheck</option>
                  <option>HRV StressCheck Only</option>
                  <option>QEEG Brain Mapping Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Center Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white"
                >
                  <option>Q-Point Clinic, Lotus Hospital (Pimple Saudagar, Pune)</option>
                  <option>22Neuro Lab, Mendeleev Block, IISER (Pashan, Pune)</option>
                  <option>Corporate / On-Site Institutional Demo</option>
                  <option>Online Clinical Consultation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Date &amp; Time
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical Objective / Notes
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Stress assessment, doctor referral, sleep tracking, research inquiry..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all cursor-pointer"
              >
                Confirm Assessment Request
              </button>
              <p className="text-[11px] text-center text-slate-600 mt-2">
                100% Non-invasive • No needles • No radiation
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
