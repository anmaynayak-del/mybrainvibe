"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useBooking } from "@/components/BookingProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openBooking } = useBooking();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [pathname]);

  // Body scroll lock & focus trap & Esc to close
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "What We Do", 
      href: "#",
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
      <div suppressHydrationWarning className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-[60]">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/logo.png" 
            alt="BrainVibe"
            width={160}
            height={48} 
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
          />
        </Link>

        {/* Desktop Navigation Links (hidden on mobile/tablet max-lg) */}
        <nav className="hidden md:flex max-lg:hidden items-center gap-1 p-1 rounded-full text-sm bg-transparent">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/") || (link.dropdown && link.dropdown.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")));
            
            if (link.dropdown) {
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    onClick={(e) => link.href === "#" && e.preventDefault()}
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

        {/* Right Action CTA (hidden on mobile/tablet max-lg) */}
        <div className="hidden sm:flex max-lg:hidden items-center gap-3">
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all duration-200 shadow-sm shadow-teal-600/25 hover:shadow-md hover:shadow-teal-600/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Book Assessment</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button (visible up to max-lg) */}
        <button
          ref={buttonRef}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden max-lg:flex p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors min-w-[44px] min-h-[44px] items-center justify-center"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu-drawer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-height slide-in drawer for mobile/tablet */}
      <div 
        id="mobile-menu-drawer"
        ref={menuRef}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col h-[100dvh] pt-[max(5rem,env(safe-area-inset-top,5rem))] pb-[env(safe-area-inset-bottom,1.5rem)]`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/") || (link.dropdown && link.dropdown.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")));
            
            if (link.dropdown) {
              return (
                <div key={link.name} className="flex flex-col gap-1 mb-2">
                  <div className="px-2 py-3 text-lg font-bold text-slate-900 border-b border-slate-100">
                    {link.name}
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    {link.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="px-4 py-3 text-base font-medium text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors min-h-[44px] flex items-center"
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
                className={`px-4 py-3 text-base font-medium rounded-xl transition-colors min-h-[44px] flex items-center ${
                  isActive
                    ? "text-teal-600 bg-teal-50 font-bold"
                    : "text-slate-700 hover:text-teal-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-6 border-t border-slate-100 bg-white">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openBooking();
            }}
            className="w-full py-4 px-6 rounded-full text-center text-sm font-bold bg-teal-600 text-white shadow-lg shadow-teal-600/20 hover:bg-teal-700 transition-colors min-h-[44px] flex items-center justify-center gap-2"
          >
            <span>Book Brain Assessment</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
