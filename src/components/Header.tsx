import React, { useState } from "react";
import { ShieldCheck, Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Stark minimalist logo */}
        <button
          onClick={() => handleMobileNavigate("landing")}
          className="flex items-center transition-opacity hover:opacity-85 text-left cursor-pointer"
        >
          <img 
            src="https://i.ibb.co/kVx4pbMs/Astrateq.png" 
            alt="Astrateq Gadgets" 
            className="h-10 w-auto" 
            referrerPolicy="no-referrer" 
          />
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-wider text-slate-600">
          <button
            onClick={() => scrollToSection("value-props")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollToSection("lifestyle-breakout")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            Sovereign Commute
          </button>
          <button
            onClick={() => scrollToSection("timeline-roadmap")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            System Architecture
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => handleMobileNavigate("simulation")}
            className="inline-flex items-center justify-center rounded bg-[#0E7C9E] px-4.5 py-2.5 text-[10px] font-black text-white shadow-sm transition-all hover:bg-[#0E7C9E]/90 active:scale-95 cursor-pointer uppercase tracking-wider font-mono border border-[#0E7C9E] hover:border-[#0E7C9E]/90"
          >
            Start Driver Awareness Simulation
          </button>

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
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-md animate-in fade-in slide-in-from-top-3 duration-200">
          <button
            onClick={() => scrollToSection("value-props")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollToSection("lifestyle-breakout")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            Sovereign Commute
          </button>
          <button
            onClick={() => scrollToSection("timeline-roadmap")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            System Architecture
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="block w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors font-mono"
          >
            FAQ
          </button>
          <div className="pt-2 px-3">
            <button
              onClick={() => handleMobileNavigate("simulation")}
              className="w-full flex items-center justify-center gap-1.5 rounded bg-[#0E7C9E] text-white font-mono text-xs font-bold uppercase tracking-wider py-3 shadow-[0_4px_12px_rgba(14,124,158,0.25)] hover:bg-[#0E7C9E]/90 active:scale-95 transition-all cursor-pointer"
            >
              <span>Start Driver Awareness Simulation</span>
              <span className="text-white/80">→</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
