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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20 text-white">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 16.5L12 3l7.5 13.5M12 3v18M8 12h8" />
            </svg>
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
              ASTRATEQ
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-600 leading-none">
              Gadgets
            </div>
          </div>
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollToSection("value-props")}
            className="transition-colors hover:text-blue-600 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="transition-colors hover:text-blue-600 cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("privacy-info")}
            className="transition-colors hover:text-blue-600 cursor-pointer"
          >
            Privacy
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="transition-colors hover:text-blue-600 cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate("cohort")}
            className={`transition-colors cursor-pointer ${
              activePage === "cohort" ? "text-blue-600 font-semibold" : "hover:text-blue-600"
            }`}
          >
            Research
          </button>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("cohort")}
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/10 transition-all hover:bg-blue-700 hover:shadow-blue-600/20 active:scale-95 cursor-pointer"
          >
            Join Early Access
          </button>

          {/* Mobile indicator for study */}
          <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 md:hidden">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            Study Model
          </div>
        </div>
      </div>
    </header>
  );
}
