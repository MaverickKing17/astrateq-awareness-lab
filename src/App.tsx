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
      q: "Is this a real product yet?",
      a: "Yes, Astrateq is pre-launching the production queue for the Astrateq Aware-1 dashboard alert console. We are conducting this market validation and priority reservation campaign to gauge production batch volumes across Canadian provinces. Your reservation locks in your priority discount queue slot with zero deposit."
    },
    {
      q: "Is this connected to my vehicle's computer?",
      a: "No. Unlike intrusive telematics adapters, the Astrateq Aware-1 is 100% independent. It does not plug into your OBD or OBD-II ports, doesn't read vehicle diagnostic codes, and does not require wire splicing. It is powered via a simple USB-C or standard 12V outlet."
    },
    {
      q: "Does this require complex hardware installation?",
      a: "Not at all. The Aware-1 is designed for instant, tool-free setup. It attaches magnetically to a subtle, damage-free dashboard gel mount. You can dock or undock the device in less than a second."
    },
    {
      q: "Is this used by insurance companies?",
      a: "Absolutely not. Privacy is our highest priority. The Astrateq Aware-1 runs entirely localized Edge AI. There is no cellular transmitter, no GPS tracking, and no cloud storage. Since no cameras record footage and all eye-mesh vectors are calculated locally and immediately discarded, no data can ever be shared, sold, or leased to insurers or third parties."
    },
    {
      q: "What is the 60-Second Driver Awareness Simulator?",
      a: "The simulator is our interactive diagnostic lead magnet. It is a quick, browser-based questionnaire designed to gauge your fatigue exposure and attentiveness. Completing it helps model your driving risk parameters, calibrates your Aware-1 alerts, and instantly unlocks a 40% early-bird launch discount code."
    },
    {
      q: "What happens after I reserve?",
      a: "You will receive an immediate confirmation of your reservation slot. We will send you priority production updates, behind-the-scenes engineering design files, and shipping notifications as your queue slot approaches. There is no deposit required and you can cancel anytime."
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
                      Aware-1 Priority Pre-Order Now Open
                    </span>
                    <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-5xl leading-tight font-sans">
                      Astrateq Aware-1: The World's First <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">Privacy-First</span> Driver Awareness Dashboard Gadget
                    </h1>
                    <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xl font-sans">
                      A sleek, dashboard-mounted physical console powered by localized, offline Edge AI. It monitors driver blink-velocity and visual field checks to prevent fatigue-related accidents—completely independent of car telematics, OBD ports, or intrusive internet cameras.
                    </p>

                    {/* Features list */}
                    <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>100% Offline Edge AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>No OBD/GPS Tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>Curved Ambient LED Aura</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>Magnetic Dash Mount</span>
                      </div>
                    </div>
                    
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => handleNavigate("cohort")}
                        className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] active:scale-95 cursor-pointer font-mono"
                      >
                        <span>Reserve Your Aware-1</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleStartSimulation}
                        className="relative inline-flex items-center justify-center rounded border-2 border-blue-500 bg-white px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue-700 transition-all hover:bg-blue-50 active:scale-95 cursor-pointer font-mono shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      >
                        <span className="absolute -top-3 right-4 rounded-full bg-rose-500 px-2 py-0.5 text-[8px] font-black text-white uppercase tracking-wider animate-bounce font-mono">
                          Unlock 40% Off
                        </span>
                        <span>Start 60s Simulator (Lead Magnet)</span>
                      </button>
                    </div>

                    <p className="mt-4 text-[10px] text-slate-500 font-mono uppercase tracking-wider leading-relaxed">
                      Complete our rapid 60-second Driver Awareness Questionnaire to check your focus score and automatically upgrade your pre-order to the 40% VIP early-bird rate.
                    </p>

                    <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-6 leading-relaxed">
                      *Note: Astrateq Gadgets does NOT utilize, distribute, or imply OBD2 scanners, cellular trackers, dashcams, or insurance telematics. All calculations occur offline inside local hardware.
                    </p>
                  </div>

                  {/* Right Column Custom Hardware Device Mockup */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm rounded-2xl border-2 border-slate-800 bg-[#0B1220] p-6 shadow-2xl overflow-hidden text-white transition-all duration-300 hover:shadow-[0_30px_60px_rgba(59,130,246,0.25)] hover:border-blue-500">
                      
                      {/* Technical Blueprint lines overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      
                      {/* Decorative ambient device glows */}
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10">
                        {/* Device Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                            <Cpu className="h-4 w-4 text-blue-400 animate-pulse" />
                            <span>ASTRATEQ // AWARE-1</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[8px] font-bold font-mono text-emerald-400 uppercase tracking-wider">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                            </span>
                            OFFLINE EDGE AI
                          </span>
                        </div>

                        {/* Physical Hardware Representation Card */}
                        <div className="flex flex-col items-center py-6 bg-slate-900/60 rounded-xl border border-slate-800 shadow-inner">
                          {/* Curved LED Aura Bar */}
                          <div className="w-[85%] h-2.5 bg-slate-950 rounded-full overflow-hidden relative border border-slate-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,211,238,0.8)]" style={{ width: "100%" }} />
                          </div>

                          {/* Optical Infrared Lens Sensor Assembly */}
                          <div className="relative flex items-center justify-center h-28 w-28 rounded-full bg-gradient-to-b from-slate-950 to-slate-900 border-4 border-slate-800 shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
                            {/* Lens glass reflection sweep */}
                            <div className="absolute inset-1 rounded-full border border-white/5 bg-radial-gradient" />
                            <div className="absolute top-2 right-4 w-6 h-1 bg-white/20 rounded-full rotate-45" />

                            {/* Center Infrared Diode (Glowing softly) */}
                            <div className="absolute h-6 w-6 rounded-full bg-rose-950 border border-rose-900 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,1)]" />
                            </div>

                            {/* Visual grid lines representing optical mesh */}
                            <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/20 animate-[spin_40s_linear_infinite]" />
                          </div>
                          <span className="text-[7.5px] font-bold text-slate-500 uppercase tracking-widest font-mono mt-3">NON-CONTACT IR OPTICAL FLOW</span>

                          {/* Digital OLED Micro-Screen display */}
                          <div className="mt-6 w-[85%] bg-black/90 p-3 rounded border border-slate-800 font-mono text-[9px] text-cyan-400 space-y-1.5 shadow-inner">
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-500">ENGINE STATUS</span>
                              <span className="text-emerald-400 font-bold">SECURED</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">DIAGNOSTICS</span>
                              <span className="text-slate-300">OBD BYPASSED</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">CAMERA STREAM</span>
                              <span className="text-rose-400 font-bold">DISABLED (LOCAL AI ONLY)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">ALERT PRESETS</span>
                              <span className="text-slate-300">CANADIAN PORTFOLIO</span>
                            </div>
                          </div>
                        </div>

                        {/* Hardware Features Quick Bar */}
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[8px] font-mono uppercase tracking-wider">
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-blue-400 font-black">SLATE FRAME</p>
                            <p className="text-slate-500 mt-0.5">AIRCRAFT ALUM</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-emerald-400 font-black">100% OFFLINE</p>
                            <p className="text-slate-500 mt-0.5">ZERO TELEMETRY</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-cyan-400 font-black">MAG MOUNT</p>
                            <p className="text-slate-500 mt-0.5">DOCK SECONDS</p>
                          </div>
                        </div>

                        <p className="mt-4 text-[7px] font-mono text-slate-500 text-center uppercase tracking-widest leading-relaxed">
                          Astrateq Aware-1 Physical Enclosure Layout • Patent Pending
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Core Value Props Cards & How It Works section */}
            <ValueProps onStartSimulation={handleStartSimulation} />

            {/* Privacy Section Highlight (Specific requirement to reinforce hardware-level privacy) */}
            <section id="privacy-info" className="relative bg-[#EEF3F8] py-28 sm:py-44 border-b border-slate-200/80">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-gradient-to-br from-[#0B1220] to-[#0C1424] text-white p-8 sm:p-12 relative overflow-hidden border border-[#0C1424] shadow-xl">
                  {/* Gradient globes */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded mb-4 font-mono">
                      <Lock className="h-3.5 w-3.5" /> Astrateq Security Protocol
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">Astrateq Offline AI Security Standard</h3>
                    <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                      We understand that in-cabin driver cameras and black-box insurance trackers have created massive skepticism among Canadian drivers. We built the Astrateq Aware-1 to completely defy that standard—protecting your safety without sacrificing your dignity or selling your driving history.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs">
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">Zero Cloud Sync</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">All pupillary vectors and blink speeds are computed inside localized edge silicon. No server transmission.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">No OBD-II Connection</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">Powered via a clean USB-C or standard 12V adapter. It never reads vehicle computer data or GPS positions.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">100% Privacy Lock</p>
                        <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">Because no footage is saved or transmitted, your data remains fully yours—completely secure from insurers.</p>
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
            onStartSimulation={handleStartSimulation}
          />
        )}

      </main>

      {/* Main Footer */}
      <Footer />

    </div>
  );
}
