import React from "react";
import { ShieldCheck, Info } from "lucide-react";

interface HeaderProps {
  onNavigate: (page: "landing" | "simulation" | "results" | "cohort") => void;
  activePage: string;
}

export default function Header({ onNavigate, activePage }: HeaderProps) {
  const scrollToSection = (id: string) => {
    onNavigate("landing");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => onNavigate("landing")}
          className="flex items-center gap-3 transition-opacity hover:opacity-90 text-left"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-900 text-white font-bold text-xs">
            AQ
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-slate-900 leading-tight">
              ASTRATEQ <span className="text-blue-600 font-semibold text-xs ml-0.5 font-mono">V1</span>
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 leading-none">
              Validation Platform
            </div>
          </div>
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <button
            onClick={() => scrollToSection("value-props")}
            className="transition-colors hover:text-slate-900 cursor-pointer"
          >
            About
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
            Research Cohort
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("cohort")}
            className="hidden sm:inline-flex items-center justify-center rounded bg-slate-900 px-4 py-2 text-[10px] font-bold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 cursor-pointer uppercase tracking-wider font-mono"
          >
            Join Research Cohort
          </button>

          {/* Mobile indicator for study */}
          <div className="flex items-center gap-1.5 rounded bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider md:hidden border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            AI ENGAGED
          </div>
        </div>
      </div>
    </header>
  );
}
