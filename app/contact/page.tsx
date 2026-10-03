"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { useBooking } from "@/components/BookingProvider";

export default function Contact() {
  const { openBooking } = useBooking();

  return (
    <main className="min-h-screen bg-[#ebebed] flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold uppercase tracking-wider mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Get in <span className="text-teal-600">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium">
              We&apos;re here to answer any questions about our assessments, technology, and clinical services.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
            {/* Card 1: Registered Office */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Registered Research Office</h3>
              <p className="text-sm font-semibold text-teal-600 mb-4">22Neuro (TDPL)</p>
              <p className="text-slate-600 leading-relaxed mb-6">
                POD 3, Mendeleev Block, IISER, Ward No. 8, NCL Colony, Pashan, Pune, Maharashtra 411008
              </p>
              <div className="flex items-center gap-3 text-slate-700 font-medium">
                <Phone className="w-5 h-5 text-teal-500" />
                <a href="tel:7758850500" className="hover:text-teal-600 transition-colors">+91 7758850500</a>
              </div>
            </div>

            {/* Card 2: Clinical Center */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Clinical Assessment Center</h3>
              <p className="text-sm font-semibold text-teal-600 mb-4">Q-Point Clinic</p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Lotus Hospital, Dwarka Sai Wonders, Commercial Complex Survey no 173, Shiv Sai Road, Pimple Saudagar, Pune 411027
              </p>
              <div className="flex items-center gap-3 text-slate-700 font-medium">
                <Phone className="w-5 h-5 text-teal-500" />
                <a href="tel:9028454965" className="hover:text-teal-600 transition-colors">+91 9028454965</a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={openBooking}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              Book Your Assessment Now
            </button>
          </div>
          
        </div>
      </div>

      <Footer />
    </main>
  );
}
