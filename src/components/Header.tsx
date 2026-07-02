import React, { useState } from "react";
import { ShieldCheck, Info, Menu, X } from "lucide-react";

interface HeaderProps {
  onNavigate: (page: "landing" | "simulation" | "results" | "cohort") => void;
  activePage: string;
}

export default function Header({ onNavigate, activePage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    onNavigate("landing");
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleMobileNavigate = (page: "landing" | "simulation" | "results" | "cohort") => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => handleMobileNavigate("landing")}
          className="flex items-center gap-3 transition-opacity hover:opacity-90 text-left cursor-pointer"
        >
          <img
            src="https://i.ibb.co/DfpC9vNt/Astrateq.png"
            alt="Astrateq Gadgets Logo"
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <button
            onClick={() => scrollToSection("value-props")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            Device Specs
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("privacy-info")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            Privacy & Trust
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate("cohort")}
            className={`transition-colors cursor-pointer ${
              activePage === "cohort" ? "text-slate-900 font-bold" : "hover:text-slate-900"
            }`}
          >
            Reserve Aware-1
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => handleMobileNavigate("cohort")}
            className="hidden sm:inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-[10px] font-bold text-white shadow-[0_2px_8px_rgba(59,130,246,0.25)] transition-all hover:bg-blue-700 hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)] active:scale-95 cursor-pointer uppercase tracking-wider font-mono"
          >
            Reserve Aware-1
          </button>

          {/* Mobile indicator for study */}
          <div className="flex items-center gap-1.5 rounded bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider md:hidden border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AI ENGAGED
          </div>

          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none md:hidden transition-all duration-150 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
          <button
            onClick={() => scrollToSection("value-props")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            Device Specs
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("privacy-info")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            Privacy & Trust
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            FAQ
          </button>
          <button
            onClick={() => handleMobileNavigate("cohort")}
            className={`block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors font-mono ${
              activePage === "cohort" 
                ? "bg-blue-600 text-white font-black" 
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Reserve Aware-1
          </button>
          <div className="pt-2 px-3">
            <button
              onClick={() => handleMobileNavigate("simulation")}
              className="w-full flex items-center justify-center gap-1.5 rounded bg-blue-600 text-white font-mono text-xs font-bold uppercase tracking-wider py-3 shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
            >
              <span>Start Awareness Simulation</span>
              <span className="text-blue-200">→</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
