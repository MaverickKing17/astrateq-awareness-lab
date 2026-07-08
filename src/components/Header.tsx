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
    <header className="sticky top-0 z-40 w-full border-b border-[#0E7C9E]/20 bg-[#F4F2ED]/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Stark minimalist logo */}
        <button
          onClick={() => handleMobileNavigate("landing")}
          className="flex items-center transition-all hover:opacity-100 hover:scale-[1.02] text-left cursor-pointer"
        >
          <img 
            src="https://i.ibb.co/kVx4pbMs/Astrateq.png" 
            alt="Astrateq Gadgets" 
            className="h-10 w-auto" 
            referrerPolicy="no-referrer" 
          />
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-extrabold uppercase tracking-widest text-[#12233F]">
          <button
            onClick={() => scrollToSection("value-props")}
            className="relative py-2 transition-all hover:text-[#0E7C9E] cursor-pointer group"
          >
            Capabilities
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0E7C9E] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("lifestyle-breakout")}
            className="relative py-2 transition-all hover:text-[#0E7C9E] cursor-pointer group"
          >
            Sovereign Commute
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0E7C9E] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("timeline-roadmap")}
            className="relative py-2 transition-all hover:text-[#0E7C9E] cursor-pointer group"
          >
            System Architecture
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0E7C9E] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="relative py-2 transition-all hover:text-[#0E7C9E] cursor-pointer group"
          >
            FAQ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0E7C9E] transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => handleMobileNavigate("simulation")}
            className="inline-flex items-center justify-center rounded bg-[#0E7C9E] px-4.5 py-2.5 text-[10px] font-black text-white shadow-xs transition-all hover:bg-[#0E7C9E]/90 active:scale-95 cursor-pointer uppercase tracking-wider font-mono border border-cyan-600/20"
          >
            Start Driver Awareness Simulation
          </button>

          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded text-[#12233F] hover:text-[#0E7C9E] hover:bg-slate-200 focus:outline-none md:hidden transition-all duration-150 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#0E7C9E]/20 bg-[#F4F2ED] px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-3 duration-200">
          <button
            onClick={() => scrollToSection("value-props")}
            className="block w-full text-left px-3 py-2.5 text-xs font-black uppercase tracking-wider text-[#12233F] hover:text-[#0E7C9E] hover:bg-slate-200 rounded transition-colors font-mono"
          >
            Capabilities
          </button>
          <button
            onClick={() => scrollToSection("lifestyle-breakout")}
            className="block w-full text-left px-3 py-2.5 text-xs font-black uppercase tracking-wider text-[#12233F] hover:text-[#0E7C9E] hover:bg-slate-200 rounded transition-colors font-mono"
          >
            Sovereign Commute
          </button>
          <button
            onClick={() => scrollToSection("timeline-roadmap")}
            className="block w-full text-left px-3 py-2.5 text-xs font-black uppercase tracking-wider text-[#12233F] hover:text-[#0E7C9E] hover:bg-slate-200 rounded transition-colors font-mono"
          >
            System Architecture
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="block w-full text-left px-3 py-2.5 text-xs font-black uppercase tracking-wider text-[#12233F] hover:text-[#0E7C9E] hover:bg-slate-200 rounded transition-colors font-mono"
          >
            FAQ
          </button>
          <div className="pt-2 px-3">
            <button
              onClick={() => handleMobileNavigate("simulation")}
              className="w-full flex items-center justify-center gap-1.5 rounded bg-[#0E7C9E] text-white font-mono text-xs font-bold uppercase tracking-wider py-3 shadow-xs hover:bg-[#0E7C9E]/90 active:scale-95 transition-all cursor-pointer"
            >
              <span>Start Driver Awareness Simulation</span>
              <span className="text-white/85">→</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
