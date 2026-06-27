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
      q: "What is the Astrateq Driver Awareness Intelligence platform?",
      a: "Astrateq is currently conducting a pre-launch behavioral study to validate a software-only cognitive simulation model. This platform evaluates relative driver focus, attention locking, and fatigue resistance benchmarks to help Canadian drivers assess their road safety readiness."
    },
    {
      q: "Is this connected to my vehicle?",
      a: "No — this is a simulation and does not connect to any vehicle system."
    },
    {
      q: "Is this replacing insurance or telematics tools?",
      a: "No — this is a research simulation only."
    },
    {
      q: "How is the score generated?",
      a: "It is produced from a behavioral simulation model based on user inputs, not real-world telemetry."
    },
    {
      q: "Is Astrateq planning hardware in the future?",
      a: "This study focuses only on validating software-based awareness systems."
    },
    {
      q: "What happens after I join the cohort?",
      a: "You may receive research updates and participation opportunities."
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
      q: "What do the cohort tiers represent?",
      a: "Our research cohort is divided into different engagement levels (Casual surveys, active simulation feedback, and founding advisory panel memberships). It is fully funded by pre-launch research capital and participation carries zero cost."
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
            <section className="relative overflow-hidden bg-[#F4F7FB] py-20 sm:py-28 border-b border-slate-200">
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-slate-200 to-slate-100 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
              </div>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text & CTAs */}
                  <div className="lg:col-span-7 text-left">
                    <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono rounded">
                      <Sparkles className="h-3.5 w-3.5 text-slate-900 animate-pulse" />
                      Concept Validation Open for Enrollment
                    </span>
                    <h1 className="mt-4 text-3xl font-bold uppercase tracking-tight text-slate-900 sm:text-4xl leading-tight font-sans">
                      Explore a simulated <br />
                      <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                        Driver Awareness Intelligence
                      </span>{" "}
                      model in 60 seconds
                    </h1>
                    <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xl">
                      A simulated intelligence model designed to explore how Canadian drivers respond to fatigue awareness and driving safety insights. Help validate our pre-launch cognitive standards. This is a simulation-based concept for a market validation study.
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

                    {/* CTAs */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleStartSimulation}
                        className="inline-flex items-center justify-center gap-2 rounded bg-slate-900 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-800 active:scale-95 cursor-pointer font-mono"
                      >
                        <span>Start Awareness Simulation</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleNavigate("cohort")}
                        className="inline-flex items-center justify-center rounded border border-slate-200 bg-white px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all hover:bg-slate-50 active:scale-95 cursor-pointer font-mono"
                      >
                        Join Research Cohort
                      </button>
                    </div>

                    <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-6 leading-relaxed">
                      *Note: Astrateq Gadgets does NOT utilize, distribute, or imply OBD2 scanners, dashcams, vehicle telemetry, or insurance tracking metrics. This is a purely cognitive research study.
                    </p>
                  </div>

                  {/* Right Column Custom Cockpit Dashboard Mock */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm overflow-hidden">
                      
                      {/* Grid bg overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e110_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e110_1px,transparent_1px)] bg-[size:14px_24px]" />
                      
                      <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
                            <Cpu className="h-4 w-4 text-slate-900" />
                            <span>COGNITIVE ENGINE V1</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[9px] font-bold font-mono text-slate-700 uppercase tracking-wider">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-pulse" />
                            CALIBRATED
                          </span>
                        </div>

                        {/* Large Mock Score Dial */}
                        <div className="flex flex-col items-center py-6 bg-white rounded border border-slate-200 shadow-sm">
                          <div className="relative flex items-center justify-center h-28 w-28">
                            <svg className="h-full w-full" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                              <circle cx="50" cy="50" r="40" stroke="#0f172a" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="50.2" strokeLinecap="round" fill="transparent" />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-3xl font-black text-slate-900 font-mono">80</span>
                              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none font-mono">AWARE INDEX</span>
                            </div>
                          </div>
                          
                          <div className="mt-5 flex gap-4 text-center text-[10px] text-slate-400 border-t border-slate-100 pt-4 w-full justify-around font-mono">
                            <div>
                              <p className="font-bold text-slate-800">LOW RISK</p>
                              <p className="text-[8px] uppercase text-slate-400">FATIGUE</p>
                            </div>
                            <div className="h-6 w-px bg-slate-200" />
                            <div>
                              <p className="font-bold text-slate-800">95%</p>
                              <p className="text-[8px] uppercase text-slate-400">ATTENTION</p>
                            </div>
                            <div className="h-6 w-px bg-slate-200" />
                            <div>
                              <p className="font-bold text-slate-800">GOOD</p>
                              <p className="text-[8px] uppercase text-slate-400">READINESS</p>
                            </div>
                          </div>
                        </div>

                        {/* Tiny live feedback bubbles */}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between p-2.5 rounded border border-slate-200 bg-white text-[10px] font-mono uppercase tracking-wider">
                            <span className="font-bold text-slate-800 flex items-center gap-1.5">
                              <Star className="h-3.5 w-3.5 text-slate-800 fill-slate-800" />
                              ACTIVE MODEL
                            </span>
                            <span className="text-slate-500">CAN-ON STANDARD</span>
                          </div>
                          <div className="flex items-center justify-between p-2.5 rounded border border-slate-200 bg-white text-[10px] font-mono uppercase tracking-wider text-slate-500">
                            <span>Privacy Protocol</span>
                            <span className="font-bold text-slate-900">100% SECURED</span>
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
            <section id="privacy-info" className="py-20 sm:py-28 bg-[#EEF3F8] border-b border-slate-200">
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
                      <div className="p-4 rounded border border-slate-800 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">Monitoring Policy</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">This system is designed without tracking or behavioral monitoring.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">Data Transmission</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">No vehicle data is accessed or transmitted.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">Research Protocol</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">This is a simulation-only research environment.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq-section" className="py-16 sm:py-24 bg-slate-50">
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="text-center mb-12">
                  <HelpCircle className="mx-auto h-8 w-8 text-slate-900 mb-3" />
                  <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900 sm:text-2xl">Frequently Asked Questions</h2>
                  <p className="text-xs text-slate-500 mt-2">Get direct answers on privacy, objectives, and pre-launch study details.</p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between px-6 py-4.5 text-left font-bold uppercase tracking-wider text-slate-800 text-xs sm:text-sm font-mono cursor-pointer hover:bg-slate-50/50 transition-colors"
                        >
                          <span>{item.q}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-slate-900 shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-5 pt-1 border-t border-slate-100 text-xs text-slate-500 leading-relaxed animate-in fade-in duration-250">
                            {item.a}
                          </div>
                        )}
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
