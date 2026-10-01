"use client";

import { useEffect, useState } from "react";
import { Activity, Brain, Shield, ChevronRight, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "What We Do", href: "#what-we-do" },
    { name: "Who We Serve", href: "#who-we-serve" },
    { name: "Technology", href: "#technology" },
    { name: "Clinical AI", href: "#clinical-insights" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3.5"
          : "bg-white/40 backdrop-blur-xs py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-300">
            <Brain className="w-5 h-5 text-white stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                BRAIN<span className="text-teal-600">VIBE</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
                22Neuro
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-slate-500 font-medium hidden sm:block">
              Redefining Neuro Detection
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xs transition-all duration-200 font-medium text-xs lg:text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200 shadow-sm shadow-teal-600/25 hover:shadow-md hover:shadow-teal-600/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Book Assessment</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 py-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 mt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 rounded-full text-center text-xs font-semibold bg-teal-600 text-white shadow-sm hover:bg-teal-700 transition-colors"
              >
                Book Brain Assessment
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
