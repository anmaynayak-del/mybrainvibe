"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Activity, Brain, Shield, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";

import { useBooking } from "@/components/BookingProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "What We Do", 
      href: "/what-we-do",
      dropdown: [
        { name: "HRV StressCheck", href: "/services/hrv-stresscheck" },
        { name: "QEEG Brain Assessment", href: "/services/qeeg-brain-assessment" }
      ]
    },
    { name: "Who We Serve", href: "/who-we-serve" },
    { name: "Technology", href: "/technology" },
    { name: "Clinical AI", href: "/clinical-ai" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent py-4"
    >
      <div suppressHydrationWarning className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="BrainVibe" 
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full text-sm bg-transparent">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            
            if (link.dropdown) {
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium text-xs lg:text-sm inline-flex items-center gap-1 ${
                      isActive
                        ? "bg-white text-teal-600 shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {link.name}
                    <svg className="w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </Link>
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 p-2 z-50">
                    {link.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 font-medium text-xs lg:text-sm ${
                  isActive
                    ? "bg-white text-teal-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={openBooking}
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              
              if (link.dropdown) {
                return (
                  <div key={link.name} className="flex flex-col gap-1">
                    <div className="px-3 py-2 text-sm font-bold text-slate-900">
                      {link.name}
                    </div>
                    <div className="flex flex-col pl-4 gap-1 border-l-2 border-slate-100 ml-3">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-teal-600 bg-teal-50"
                      : "text-slate-700 hover:text-teal-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-slate-100 mt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBooking();
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
