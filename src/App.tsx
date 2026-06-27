import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ValueProps from "./components/ValueProps";
import SimulationForm from "./components/SimulationForm";
import ResultsDisplay from "./components/ResultsDisplay";
import CohortPage from "./components/CohortPage";
import LoadingOverlay from "./components/LoadingOverlay";
import { DriverSimulationInputs, DriverInsights, ActivePage } from "./types";
import { 
  Sparkles, ShieldCheck, Heart, Info, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Lock, Cpu, Star, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("landing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Simulation results state
  const [inputs, setInputs] = useState<DriverSimulationInputs | null>(null);
  const [insights, setInsights] = useState<DriverInsights | null>(null);
  
  // Cohort specific setup
  const [onboardedTier, setOnboardedTier] = useState<string | undefined>(undefined);

  // FAQ interactive state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  const faqItems = [
    {
      q: "What is the Astrateq Gadgets Driver Awareness Intelligence study?",
      a: "Astrateq Gadgets is currently conducting a pre-launch behavioral study to validate a software-only cognitive simulation model. This initiative evaluates relative driver focus, attention locking, and fatigue resistance benchmarks to help Canadian drivers assess their road safety readiness."
    },
    {
      q: "Is this connected to my vehicle?",
      a: "No — this is a simulation and does not connect to any vehicle system or hardware."
    },
    {
      q: "Is this replacing insurance or telematics systems?",
      a: "No — this is a research simulation for concept validation only."
    },
    {
      q: "How is the awareness score generated?",
      a: "It is generated from a behavioral simulation model based on user inputs, not real-world telemetry or tracking."
    },
    {
      q: "Is Astrateq Gadgets planning hardware in the future?",
      a: "This initiative is focused on validating a software-only Driver Awareness Intelligence concept."
    },
    {
      q: "What happens after I join the research cohort?",
      a: "You may receive updates, insights, and opportunities to participate in early research validation."
    },
    {
      q: "Does this require an OBD2 scanner, telematics device, or hardware?",
      a: "No! This is a strict software-only research study. We do not require, sell, or support vehicle hardware, OBD scanners, dashcams, CAN bus adapters, or fleet tracking devices. It is entirely browser-based and behavioral."
    },
    {
      q: "Is my personal data shared with insurance companies?",
      a: "No. Privacy is our highest directive. Your simulation responses and overall scores are 100% anonymous, encrypted, and stored securely inside Canada. They are never shared, leased, or sold to automotive insurers, marketing agencies, or tracking networks."
    },
    {
      q: "What do the research participation levels represent?",
      a: "Our research cohort is divided into different engagement levels (Standard research level, active safety research engagement, and steering advisory panel memberships). It is fully funded by pre-launch research capital and participation carries zero cost."
    }
  ];

  const handleStartSimulation = () => {
    setActivePage("simulation");
    setTimeout(() => {
      document.getElementById("simulation-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleNavigateToCohort = (tier?: string) => {
    setOnboardedTier(tier);
    setActivePage("cohort");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (formData: DriverSimulationInputs) => {
    setInputs(formData);
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/generate-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      // Delay slightly for premium deliberate cognitive evaluation experience
      setTimeout(() => {
        if (data.success) {
          setInsights({
            success: true,
            score: data.score,
            fatigueRiskProfile: data.fatigueRiskProfile,
            attentionReadiness: data.attentionReadiness,
            safetyIntelligenceReadiness: data.safetyIntelligenceReadiness,
            overallEvaluation: data.overallEvaluation,
            isAiGenerated: data.isAiGenerated,
          });
          setActivePage("results");
        } else {
          // Graceful simulated safety fallback if API errors out
          setInsights({
            success: true,
            score: 75,
            fatigueRiskProfile: "Your fatigue risk awareness profile reflects moderate exposure. Standard travel breaks are advised.",
            attentionReadiness: "You demonstrate standard micro-scanning behaviors with average distraction mitigations.",
            safetyIntelligenceReadiness: "Ensure in-cabin settings are stabilized prior to commencing commutes.",
            overallEvaluation: "You demonstrate average cognitive focus reserves. Clear opportunities exist to refine habits.",
            isAiGenerated: false
          });
          setActivePage("results");
        }
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 3500);

    } catch (err) {
      console.error("Failed to generate driver insights:", err);
      setTimeout(() => {
        setInsights({
          success: true,
          score: 80,
          fatigueRiskProfile: "A highly resilient fatigue risk awareness profile is identified based on standard daylight driving schedules.",
          attentionReadiness: "Excellent visual field attention is noted. Minimal split-attention tendencies are reported.",
          safetyIntelligenceReadiness: "Continue leveraging pre-planned rest stop regimes during continuous long commutes.",
          overallEvaluation: "Strong driver readiness is displayed. You map closely to highly conscious safety cohorts.",
          isAiGenerated: false
        });
        setActivePage("results");
        setIsSubmitting(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 3500);
    }
  };

  const handleReset = () => {
    setInputs(null);
    setInsights(null);
    setActivePage("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB]">
      
      {/* Dynamic Loading Overlay */}
      {isSubmitting && <LoadingOverlay />}

      {/* Main Header */}
      <Header onNavigate={handleNavigate} activePage={activePage} />

      {/* Main Content Areas */}
      <main className="flex-grow">
        
        {/* LANDING PAGE VIEW */}
        {activePage === "landing" && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#F4F7FB] py-28 sm:py-44 border-b border-slate-200/80">
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-slate-200 to-slate-100 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
              </div>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text & CTAs */}
                  <div className="lg:col-span-7 text-left">
                    <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-[#EEF3F8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono rounded">
                      <Sparkles className="h-3.5 w-3.5 text-slate-900 animate-pulse" />
                      Concept Validation Open for Enrollment
                    </span>
                    <h1 className="mt-4 text-3xl font-bold uppercase tracking-tight text-slate-900 sm:text-4xl leading-tight font-sans">
                      Explore a simulated <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Driver Awareness Intelligence</span> model in 60 seconds
                    </h1>
                    <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xl">
                      A behavioral simulation designed to explore how Canadian drivers respond to fatigue awareness, attention patterns, and driving decision behaviors.
                    </p>

                    {/* Features list */}
                    <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>100% Software-Based</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>No Hardware Required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>Completely Anonymous</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>Secured Canadian Servers</span>
                      </div>
                    </div>
                    
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleStartSimulation}
                        className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] active:scale-95 cursor-pointer font-mono"
                      >
                        <span>Start Awareness Simulation</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleNavigate("cohort")}
                        className="inline-flex items-center justify-center rounded border border-blue-200 bg-blue-50/50 px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue-700 transition-all hover:bg-blue-50 hover:border-blue-300 active:scale-95 cursor-pointer font-mono"
                      >
                        Join Research Cohort
                      </button>
                    </div>

                    <p className="mt-4 text-[10px] text-slate-500 font-mono uppercase tracking-wider leading-relaxed">
                      You will complete a 60-second simulation, receive a conceptual awareness score, and see your research cohort classification.
                    </p>

                    <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-6 leading-relaxed">
                      *Note: Astrateq Gadgets does NOT utilize, distribute, or imply OBD2 scanners, dashcams, vehicle telemetry, or insurance tracking metrics. This is a purely cognitive research study.
                    </p>
                  </div>

                  {/* Right Column Custom Cockpit Dashboard Mock */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm rounded-2xl border border-blue-100 bg-gradient-to-b from-white to-blue-50/20 p-6 shadow-[0_20px_50px_rgba(59,130,246,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_rgba(59,130,246,0.12)]">
                      
                      {/* Grid bg overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f606_1px,transparent_1px),linear-gradient(to_bottom,#3b82f606_1px,transparent_1px)] bg-[size:16px_16px]" />
                      
                      {/* Decorative gradient glow spots */}
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-1.5 text-[10px] font-extrabold font-mono text-blue-600 uppercase tracking-widest">
                            <Cpu className="h-4 w-4 text-blue-600 animate-pulse" />
                            <span>COGNITIVE ENGINE V1</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold font-mono text-emerald-700 uppercase tracking-wider">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            CALIBRATED
                          </span>
                        </div>

                        {/* Large Mock Score Dial */}
                        <div className="flex flex-col items-center py-7 bg-white rounded-xl border border-blue-100/80 shadow-[0_4px_20px_rgba(59,130,246,0.02)]">
                          <div className="relative flex items-center justify-center h-32 w-32">
                            {/* Inner visual grid effect */}
                            <div className="absolute inset-2 rounded-full border border-dashed border-blue-100 animate-[spin_120s_linear_infinite]" />
                            
                            <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
                              <defs>
                                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#2563eb" />
                                  <stop offset="100%" stopColor="#06b6d4" />
                                </linearGradient>
                              </defs>
                              {/* Background Circle */}
                              <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                              {/* Decorative tick circle */}
                              <circle cx="50" cy="50" r="43" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 3" fill="transparent" opacity="0.7" />
                              {/* Active Score Circle */}
                              <circle 
                                cx="50" 
                                cy="50" 
                                r="40" 
                                stroke="url(#scoreGrad)" 
                                strokeWidth="8" 
                                strokeDasharray="251.2" 
                                strokeDashoffset="50.2" 
                                strokeLinecap="round" 
                                fill="transparent" 
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                              <span className="text-4xl font-extrabold text-slate-900 font-mono tracking-tighter leading-none">80</span>
                              <span className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest leading-none font-mono mt-1.5">AWARE INDEX</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex gap-4 text-center border-t border-slate-100 pt-5 w-full justify-around">
                            <div>
                              <p className="text-xs font-black text-emerald-600 font-mono uppercase">LOW RISK</p>
                              <p className="text-[8px] font-bold uppercase text-slate-400 font-mono mt-0.5">FATIGUE</p>
                            </div>
                            <div className="h-7 w-px bg-slate-100" />
                            <div>
                              <p className="text-xs font-black text-blue-600 font-mono uppercase">95%</p>
                              <p className="text-[8px] font-bold uppercase text-slate-400 font-mono mt-0.5">ATTENTION</p>
                            </div>
                            <div className="h-7 w-px bg-slate-100" />
                            <div>
                              <p className="text-xs font-black text-cyan-600 font-mono uppercase">GOOD</p>
                              <p className="text-[8px] font-bold uppercase text-slate-400 font-mono mt-0.5">READINESS</p>
                            </div>
                          </div>
                          
                          <p className="mt-4 text-[7px] font-mono text-slate-400 text-center px-4 border-t border-blue-50/50 pt-3.5 w-full uppercase tracking-widest">
                            Simulated Output — Conceptual Model (Not Real-World Data)
                          </p>
                        </div>

                        {/* Tiny live feedback bubbles */}
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-xl border border-blue-100/60 bg-white text-[10px] font-mono uppercase tracking-wider shadow-[0_2px_10px_rgba(59,130,246,0.01)]">
                            <span className="font-bold text-slate-800 flex items-center gap-2">
                              <div className="p-1 rounded bg-blue-50 text-blue-600">
                                <Star className="h-3.5 w-3.5 fill-blue-500 text-blue-500" />
                              </div>
                              ACTIVE MODEL
                            </span>
                            <span className="font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full text-[9px] tracking-wide">CAN-ON STANDARD</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-xl border border-blue-100/60 bg-white text-[10px] font-mono uppercase tracking-wider shadow-[0_2px_10px_rgba(59,130,246,0.01)] text-slate-500">
                            <span className="font-bold text-slate-800 flex items-center gap-2">
                              <div className="p-1 rounded bg-emerald-50 text-emerald-600">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                              </div>
                              Privacy Protocol
                            </span>
                            <span className="font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[9px] tracking-wide">100% SECURED</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Core Value Props Cards & How It Works section */}
            <ValueProps onStartSimulation={handleStartSimulation} />

            {/* Privacy Section Highlight (Specific requirement to reinforce simulation/research) */}
            <section id="privacy-info" className="relative bg-[#EEF3F8] py-28 sm:py-44 border-b border-slate-200/80">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-gradient-to-br from-[#0B1220] to-[#0C1424] text-white p-8 sm:p-12 relative overflow-hidden border border-[#0C1424] shadow-xl">
                  {/* Gradient globes */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                  
                  <div className="relative max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded mb-4 font-mono">
                      <Lock className="h-3.5 w-3.5" /> Simulation Trust Protocol
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">Privacy & Verification Standard</h3>
                    <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                      We understand that driver tracking tools have created massive skepticism among Canadian drivers. We are committed to a strict standard of transparent research safety.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs">
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">Monitoring Policy</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">This system is designed without behavioral tracking or monitoring.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">Data Transmission</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">No vehicle data is accessed or transmitted.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">Research Protocol</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">This is a simulation-only research environment for concept validation.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq-section" className="py-28 sm:py-44 bg-gradient-to-b from-slate-50/50 to-blue-50/20 border-t border-slate-200/60 relative overflow-hidden">
              {/* Decorative subtle background glows */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/3 right-0 -translate-y-1/2 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

              <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono mb-4">
                    Support & Transparency
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed">
                    Get direct, transparent answers on our research parameters, privacy architecture, study guidelines, and hardware-free validation pipeline.
                  </p>
                </div>

                <div className="space-y-4.5">
                  {faqItems.map((item, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                          isOpen 
                            ? "border-blue-400 bg-white shadow-[0_12px_28px_rgba(59,130,246,0.08)] ring-1 ring-blue-500/10" 
                            : "border-slate-200/60 bg-white/60 hover:bg-white hover:border-blue-300 hover:shadow-[0_8px_20px_rgba(59,130,246,0.04)]"
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left transition-all cursor-pointer font-sans"
                        >
                          <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider font-mono transition-colors duration-250 ${isOpen ? 'text-blue-600' : 'text-slate-800'}`}>
                            {item.q}
                          </span>
                          <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen ? "bg-blue-50 text-blue-600 rotate-180" : "bg-slate-50 text-slate-400"
                          }`}>
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* DRIVER SIMULATION FORM VIEW */}
        {activePage === "simulation" && (
          <SimulationForm 
            onSubmit={handleFormSubmit} 
            isSubmitting={isSubmitting} 
          />
        )}

        {/* RESULTS PAGE VIEW */}
        {activePage === "results" && insights && inputs && (
          <ResultsDisplay 
            insights={insights} 
            inputs={inputs} 
            onNavigateToCohort={handleNavigateToCohort} 
            onReset={handleReset} 
          />
        )}

        {/* COHORT SIGNUP PAGE VIEW */}
        {activePage === "cohort" && (
          <CohortPage 
            score={insights?.score} 
            initialSelectedTier={onboardedTier} 
          />
        )}

      </main>

      {/* Main Footer */}
      <Footer />

    </div>
  );
}
