import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ValueProps from "./components/ValueProps";
import SimulationForm from "./components/SimulationForm";
import ResultsDisplay from "./components/ResultsDisplay";
import CohortPage from "./components/CohortPage";
import LoadingOverlay from "./components/LoadingOverlay";
import HWY_404_POV_IMAGE from "./assets/images/driver_lifestyle_simulation_1783021555044.jpg";
import { DriverSimulationInputs, DriverInsights, ActivePage } from "./types";
import { 
  Sparkles, ShieldCheck, Heart, Info, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Lock, Cpu, Star, Check, ArrowUp, Smartphone, Camera, Eye, Activity, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>("landing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Simulation results state
  const [inputs, setInputs] = useState<DriverSimulationInputs | null>(null);
  const [insights, setInsights] = useState<DriverInsights | null>(null);
  
  // Cohort specific setup
  const [onboardedTier, setOnboardedTier] = useState<string | undefined>(undefined);

  // FAQ interactive state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Live Dashboard simulator mockup states
  const [dashboardScore, setDashboardScore] = useState(82);
  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const [attentionLevel, setAttentionLevel] = useState(94);
  const [blinkRate, setBlinkRate] = useState(12);

  const mockLogs = [
    "Analyzing saccadic alignment...",
    "Calibrating local ambient glare...",
    "Purging memory... 100% RAM isolation",
    "Mapping fatigue baseline trend...",
    "Driver focus state: STABLE & COHERENT",
    "No remote leaks... offline mode locked"
  ];

  useEffect(() => {
    if (activePage !== "landing") return;
    const scoreInterval = setInterval(() => {
      setDashboardScore(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next >= 81 && next <= 84 ? next : prev;
      });
      setAttentionLevel(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next >= 92 && next <= 96 ? next : prev;
      });
      setBlinkRate(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const next = prev + change;
        return next >= 10 && next <= 14 ? next : prev;
      });
    }, 4500);

    const logInterval = setInterval(() => {
      setActiveLogIdx(prev => (prev + 1) % mockLogs.length);
    }, 3500);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(logInterval);
    };
  }, [activePage]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  const faqItems = [
    {
      q: "How can this work without hardware accessories?",
      a: "The Astrateq Driver Coach runs entirely as software on your existing smartphone. When mounted on your dashboard, it utilizes advanced local computer vision through your device's camera to safely analyze micro-expressions, blink rate, and gaze focus. There are no OBD plugins, no custom dashcams, and zero physical dependencies."
    },
    {
      q: "What happens to the $5 reservation fee?",
      a: "The $5 reservation is 100% fully refundable at any time on request. It directly validates real human demand—securing your priority placement in our upcoming sandboxed alpha rollout, locking in a 50% lifetime subscription discount, and opening a direct communication line to our development team."
    },
    {
      q: "How is my personal driving privacy protected?",
      a: "Your privacy is protected by absolute hardware isolation. We have architected this software with zero cloud databases and zero remote telemetry. All focus assessments are processed entirely inside your device's local volatile RAM and are instantly destroyed. We never track your location, log your routes, or communicate with auto insurance companies."
    },
    {
      q: "When will the priority software keys be delivered?",
      a: "Delivery of sandboxed alpha builds is scheduled to begin following our pre-launch market validation phase. Priority members who reserved their spots will receive invitation keys, offline setup instructions, and direct development logs before general release."
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
            
            {/* 1. Direct-to-Consumer Hero Block */}
            <section className="relative overflow-hidden bg-white pt-24 pb-28 border-b border-zinc-200/80">
              {/* Subtle grid background accent */}
              <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
              
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  
                  {/* Left Column: Direct and clear CTAs */}
                  <div className="lg:col-span-7 text-left space-y-8">
                    <span className="inline-flex items-center gap-2 border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono rounded-full shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-zinc-950 animate-pulse" />
                      PRE-LAUNCH VALIDATION • HARDWARE-FREE COMPANION
                    </span>
                    
                    <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl leading-[1.02] font-sans">
                      Your car is watching you.<br />
                      Your insurance is tracking you.<br />
                      <span className="bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-600 bg-clip-text text-transparent">
                        Experience AI driver intelligence without the surveillance.
                      </span>
                    </h1>

                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl font-sans font-medium">
                      Astrateq transforms your phone into a sovereign, edge-compute AI driver coach. No cloud upload. No data brokers. Take our 10-question baseline simulation to lock in an exclusive priority alpha allocation.
                    </p>

                    {/* Quick validation bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 max-w-xl text-[10px] font-black uppercase tracking-wider text-zinc-800 font-mono pt-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 border border-zinc-250">
                          <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                        </div>
                        <span>Zero External Hardware</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 border border-zinc-250">
                          <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                        </div>
                        <span>100% Local On-Device GPU</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 border border-zinc-250">
                          <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                        </div>
                        <span>No Insurance Cloud Leaks</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-zinc-100 text-zinc-950 border border-zinc-250">
                          <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                        </div>
                        <span>Temporary Volatile RAM Only</span>
                      </div>
                    </div>
                    
                    {/* Primary CTA and Flanking Slots Remaining counter */}
                    <div className="flex flex-col sm:flex-row items-center gap-5 pt-3">
                      <button
                        onClick={handleStartSimulation}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded bg-blue-600 px-7 py-4.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all hover:bg-blue-500 active:scale-95 cursor-pointer font-mono"
                      >
                        <span>Start Driver Baseline Simulation</span>
                        <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                      </button>

                      {/* Founding Slots Remaining - Flanking elements */}
                      <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded px-4 py-3.5 w-full sm:w-auto justify-center">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider text-zinc-800 font-mono">
                          Founding Slots Remaining: <span className="text-zinc-950 font-black font-mono">142/500</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider leading-relaxed pt-1">
                      * 60-Second Simulator • Secures Priority Waitlist Position • $5 Fully Refundable
                    </p>
                  </div>

                  {/* Right Column: Premium Smartphone Dashboard Simulator with secure-data badge */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    
                    {/* 5-Second Explanation Widget */}
                    <div className="w-full max-w-sm mb-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-4.5 shadow-sm text-left">
                      <div className="flex gap-3">
                        <Smartphone className="h-5 w-5 text-zinc-900 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-zinc-950 font-sans">
                            Dashboard Setup in 5 Seconds:
                          </h4>
                          <p className="text-xs text-zinc-600 font-sans mt-1 leading-relaxed">
                            Zero adapters or OBD plugins. Simply mount your smartphone on your vehicle dashboard. Astrateq's local software engine analyzes focus trends <span className="underline decoration-zinc-400 font-extrabold text-zinc-950">100% offline</span> using secure on-device CPU cycles.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Smartphone Bezel Wrapper */}
                    <div className="relative w-full max-w-[340px] rounded-[44px] border-[12px] border-zinc-950 bg-[#070C16] p-4.5 shadow-2xl overflow-hidden text-white transition-all duration-300 hover:shadow-zinc-300/60">
                      
                      {/* Grid lines background pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Phone Notch & RAM Scan feed */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-zinc-950 rounded-b-xl flex items-center justify-center gap-1.5 px-3 z-30">
                        <div className="h-2 w-2 rounded-full bg-zinc-800" />
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[7.5px] font-black text-emerald-400 uppercase tracking-widest font-mono">RAM SCAN</span>
                      </div>

                      <div className="relative z-10 space-y-4 pt-3.5">
                        
                        {/* Phone Status bar */}
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-400 px-1 border-b border-zinc-900 pb-2.5">
                          <span>10:45 AM</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-300 uppercase font-black">LOCAL ONLY</span>
                            <span className="text-[10px]">⚡ 100%</span>
                          </div>
                        </div>

                        {/* Active Smartphone Interface Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[10px] font-black font-mono text-zinc-100 uppercase tracking-widest">
                            <Cpu className="h-4 w-4 text-zinc-400 animate-pulse" />
                            <span>COACH ENGINE v1.2</span>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-[8px] font-black font-mono text-zinc-300 uppercase tracking-wider">
                            ACTIVE DEMO
                          </span>
                        </div>

                        {/* On-device widgets */}
                        <div className="space-y-3">
                          
                          {/* Widget 1: Driver Awareness Index (Primary Focal Score) */}
                          <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center space-y-2 text-center relative overflow-hidden">
                            <span className="text-[9px] font-bold tracking-widest text-zinc-400 font-mono uppercase">
                              Driver Awareness Index
                            </span>
                            
                            {/* Circular gauge */}
                            <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-zinc-950 border-4 border-white/10 shadow-sm">
                              <div className="absolute inset-1.5 rounded-full border border-dashed border-zinc-400/10 animate-[spin_40s_linear_infinite]" />
                              <div className="flex flex-col items-center">
                                <span className="text-3xl font-black font-mono text-white">{dashboardScore}</span>
                                <span className="text-[8px] font-extrabold text-emerald-400 tracking-wider uppercase font-mono mt-0.5 animate-pulse">
                                  STABLE FOCUS
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Widget 2: Attention Stability progress bars */}
                          <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-3.5 space-y-2.5">
                            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-zinc-300">
                              <span>ATTENTION STABILITY</span>
                              <span className="text-zinc-200">{attentionLevel}% STABLE</span>
                            </div>
                            
                            {/* Segmented indicators representing Cognitive Load */}
                            <div className="grid grid-cols-10 gap-1 h-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                                <div 
                                  key={bar} 
                                  className={`h-full rounded-sm ${
                                    bar <= Math.floor(attentionLevel / 10) 
                                      ? "bg-zinc-350" 
                                      : "bg-zinc-800"
                                  }`} 
                                />
                              ))}
                            </div>
                            <div className="flex justify-between text-[8px] font-mono text-zinc-400">
                              <span>COGNITIVE LOAD: LOW</span>
                              <span>SAMPLING: 60FPS</span>
                            </div>
                          </div>

                          {/* Widget 3: Fatigue parameters */}
                          <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-3 grid grid-cols-2 gap-4 text-left font-mono">
                            <div>
                              <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider">Fatigue Risk</span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                                <span className="text-xs font-black text-emerald-400">MINIMAL</span>
                              </div>
                            </div>
                            <div className="border-l border-zinc-800 pl-3">
                              <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider">Blink Duration</span>
                              <div className="text-xs font-black text-zinc-100 mt-1">
                                {blinkRate * 10}ms blinks
                              </div>
                            </div>
                          </div>

                          {/* Widget 4: Stream Log */}
                          <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-3 text-left font-mono space-y-1.5">
                            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-1.5">
                              <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-wider">Active Stream</span>
                              <span className="text-[8px] text-zinc-400 font-bold bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">SANDBOX</span>
                            </div>
                            <p className="text-[10px] font-bold text-zinc-300 h-8 flex items-center leading-normal">
                              {mockLogs[activeLogIdx]}
                            </p>
                          </div>

                          {/* Widget 5: PROMINENT SECURE DATA-ISOLATION BADGE */}
                          <div className="bg-zinc-950/90 p-3 rounded-xl border border-emerald-500/25 text-center font-mono flex items-center justify-center gap-2">
                            <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <p className="text-[8.5px] font-black text-emerald-400 tracking-wider uppercase leading-none">
                              100% OFF-GRID DEVICE LAYER ISOLATED
                            </p>
                          </div>

                        </div>

                        {/* Home Bar mockup */}
                        <div className="w-24 h-1 bg-zinc-800 mx-auto rounded-full mt-2" />
                      </div>
                    </div>

                    <p className="text-[10px] font-mono text-zinc-500 text-center uppercase tracking-widest leading-relaxed mt-3.5 font-bold bg-zinc-50 border border-zinc-200 px-3.5 py-1.5 rounded-full">
                      📱 Active Smartphone Interface Mockup
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* 2. Horizontal Trust Pillar Banner */}
            <div className="bg-zinc-50 border-b border-zinc-200 py-6 relative z-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center font-mono">
                  
                  {/* Column 1: Designed for Canadian Roads */}
                  <div className="border-r border-zinc-200 last:border-r-0 px-2 flex flex-col items-center justify-center space-y-2 h-full lg:last:border-r-0">
                    <Compass className="h-4 w-4 text-zinc-900" />
                    <span className="text-[9.5px] font-black uppercase text-zinc-800 tracking-wider leading-tight">
                      Designed for Canadian Roads
                    </span>
                  </div>

                  {/* Column 2: 100% Edge-Compute */}
                  <div className="border-r border-zinc-200 last:border-r-0 px-2 flex flex-col items-center justify-center space-y-2 h-full md:border-r-0 lg:border-r">
                    <Cpu className="h-4 w-4 text-zinc-900" />
                    <span className="text-[9.5px] font-black uppercase text-zinc-800 tracking-wider leading-tight">
                      100% Edge-Compute
                    </span>
                  </div>

                  {/* Column 3: Insurance Telemetry Bypass */}
                  <div className="border-r border-zinc-200 last:border-r-0 px-2 flex flex-col items-center justify-center space-y-2 h-full lg:border-r">
                    <ShieldCheck className="h-4 w-4 text-zinc-900" />
                    <span className="text-[9.5px] font-black uppercase text-zinc-800 tracking-wider leading-tight">
                      Insurance Telemetry Bypass
                    </span>
                  </div>

                  {/* Column 4: Complete Data Isolation */}
                  <div className="border-r border-zinc-200 last:border-r-0 px-2 flex flex-col items-center justify-center space-y-2 h-full md:border-r-0 lg:border-r">
                    <Lock className="h-4 w-4 text-zinc-900" />
                    <span className="text-[9.5px] font-black uppercase text-zinc-800 tracking-wider leading-tight">
                      Complete Data Isolation
                    </span>
                  </div>

                  {/* Column 5: Refundable Verification Filter */}
                  <div className="border-r border-zinc-200 last:border-r-0 px-2 flex flex-col items-center justify-center space-y-2 h-full lg:border-r">
                    <Sparkles className="h-4 w-4 text-zinc-900" />
                    <span className="text-[9.5px] font-black uppercase text-zinc-800 tracking-wider leading-tight">
                      Refundable Verification Filter
                    </span>
                  </div>

                  {/* Column 6: Sovereign Data Ownership */}
                  <div className="last:border-r-0 px-2 flex flex-col items-center justify-center space-y-2 h-full">
                    <Heart className="h-4 w-4 text-zinc-900" />
                    <span className="text-[9.5px] font-black uppercase text-zinc-800 tracking-wider leading-tight">
                      Sovereign Data Ownership
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Emotional Full-Width Lifestyle Breakdown */}
            <section id="lifestyle-breakout" className="relative py-36 bg-zinc-50 text-zinc-950 overflow-hidden border-b border-zinc-200/80">
              <div className="absolute inset-0 z-0">
                <img 
                  src={HWY_404_POV_IMAGE} 
                  alt="POV Canadian Driving Commute" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-[0.06] grayscale contrast-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-zinc-50/70" />
              </div>
 
              <div className="relative z-10 mx-auto max-w-5xl px-4 text-center space-y-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/80 border border-zinc-300/60 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono">
                  Sovereign Commute POV
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-zinc-950 leading-tight font-sans max-w-4xl mx-auto">
                  "Your driving data belongs to you. Safe technology shouldn't cost you your privacy."
                </h2>
                <div className="pt-4 flex justify-center">
                  <button
                    onClick={handleStartSimulation}
                    className="group inline-flex items-center gap-2.5 rounded bg-blue-600 text-white px-7 py-4 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-blue-500 active:scale-95 cursor-pointer font-mono transition-all"
                  >
                    <span>Simulate Baseline Focus</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-white" />
                  </button>
                </div>
              </div>
            </section>

            {/* 4. "Imagine Driver Awareness Intelligence" Grid (Included inside modular ValueProps) */}
            <ValueProps 
              onStartSimulation={handleStartSimulation} 
              onNavigateToCohort={() => {
                document.getElementById("prefinery-checkout")?.scrollIntoView({ behavior: "smooth" });
              }} 
            />

            {/* 5. High-Contrast Value Proposition Cards (The Early Validation Loop) */}
            <section id="validation-loop" className="py-28 bg-zinc-50 border-b border-zinc-200/80">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono">
                    CONSUMER DECISION MATRIX
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl font-sans">
                    The Early Validation Loop
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed font-sans font-medium">
                    Analyze the friction between commercial vehicle monitoring and absolute on-device sovereignty.
                  </p>
                </div>

                {/* Grid of the three premium high-contrast floating cards */}
                <div className="grid gap-8 md:grid-cols-3 font-mono text-left">
                  
                  {/* Card 1: Attention */}
                  <div className="p-8 sm:p-10 rounded-2xl border border-zinc-200/60 bg-white shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                    <div className="space-y-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">COGNITIVE RATIO</span>
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-black text-red-600 tracking-wider">01 // THE QUESTION</p>
                        <h3 className="text-base font-black uppercase tracking-wider text-zinc-950 leading-snug font-sans">
                          Can daily commuting habits reveal cognitive fatigue patterns?
                        </h3>
                      </div>
                      <div className="space-y-2 pt-2 border-t border-zinc-100">
                        <p className="text-[10px] uppercase font-black text-emerald-600 tracking-wider">02 // THE TECHNOLOGY</p>
                        <p className="text-xs text-zinc-600 leading-relaxed font-sans font-medium">
                          Localized temporal tracking analyzes minute deviations in response timing safely.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 pt-5 border-t border-zinc-100">
                      <p className="text-[10px] uppercase font-black text-zinc-900 tracking-wider mb-1">03 // SOVEREIGN BENEFIT</p>
                      <p className="text-xs text-zinc-800 font-bold font-sans">
                        You receive real-time, completely private awareness alerts before critical risk situations occur.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Privacy */}
                  <div className="p-8 sm:p-10 rounded-2xl border border-zinc-200/60 bg-white shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                    <div className="space-y-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">TELEMETRY BYPASS</span>
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-black text-red-600 tracking-wider">01 // THE QUESTION</p>
                        <h3 className="text-base font-black uppercase tracking-wider text-zinc-950 leading-snug font-sans">
                          Why should automakers monetize your real-time speed profiles?
                        </h3>
                      </div>
                      <div className="space-y-2 pt-2 border-t border-zinc-100">
                        <p className="text-[10px] uppercase font-black text-emerald-600 tracking-wider">02 // THE TECHNOLOGY</p>
                        <p className="text-xs text-zinc-600 leading-relaxed font-sans font-medium">
                          Astrateq fully sanitizes and seals your telemetry data right on the physical device layer.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 pt-5 border-t border-zinc-100">
                      <p className="text-[10px] uppercase font-black text-zinc-900 tracking-wider mb-1">03 // SOVEREIGN BENEFIT</p>
                      <p className="text-xs text-zinc-800 font-bold font-sans">
                        Your profile remains 100% invisible to insurance algorithms and predictive pricing networks.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Sovereignty */}
                  <div className="p-8 sm:p-10 rounded-2xl border border-zinc-200/60 bg-white shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between">
                    <div className="space-y-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 font-mono">HARDWARE SECURITY</span>
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase font-black text-red-600 tracking-wider">01 // THE QUESTION</p>
                        <h3 className="text-base font-black uppercase tracking-wider text-zinc-950 leading-snug font-sans">
                          Why should in-cabin camera streams travel to commercial servers?
                        </h3>
                      </div>
                      <div className="space-y-2 pt-2 border-t border-zinc-100">
                        <p className="text-[10px] uppercase font-black text-emerald-600 tracking-wider">02 // THE TECHNOLOGY</p>
                        <p className="text-xs text-zinc-600 leading-relaxed font-sans font-medium">
                          Computations run purely inside standard sandbox volatile RAM and vanish instantly upon app termination.
                        </p>
                      </div>
                    </div>
                    <div className="mt-8 pt-5 border-t border-zinc-100">
                      <p className="text-[10px] uppercase font-black text-zinc-900 tracking-wider mb-1">03 // SOVEREIGN BENEFIT</p>
                      <p className="text-xs text-zinc-800 font-bold font-sans">
                        Your personal facial expressions, gaze traces, and cabin parameters remain your exclusive property.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* 6. Alpha Cohort Validation Roadmap */}
            <section id="timeline-roadmap" className="py-24 bg-white border-b border-zinc-200/80">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono">
                    Sovereign Milestones
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl font-sans">
                    Alpha Cohort Validation Roadmap
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">
                    Our validation timeline proves real consumer demand and maps regional safety requirements across Canadian provinces.
                  </p>
                </div>

                {/* Horizontal connected milestones timeline */}
                <div className="grid gap-8 md:grid-cols-3 font-mono text-left relative">
                  
                  {/* Phase 01 */}
                  <div className="p-8 rounded-2xl border border-zinc-200 bg-zinc-50/50 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-950" />
                    <div className="space-y-5">
                      <span className="inline-block px-2.5 py-1 rounded bg-zinc-950 text-[8.5px] font-black text-white uppercase tracking-wider">
                        Phase 01 • Active
                      </span>
                      <h4 className="text-sm font-black uppercase tracking-wider text-zinc-950 leading-tight">
                        Core Funnel Architecture Validation
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                        Capped at 500 Consumer Allocations with a refundable $5 cryptographic verification filter. Proving baseline market commitment without corporate fundraising.
                      </p>
                    </div>
                  </div>

                  {/* Phase 02 */}
                  <div className="p-8 rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-200" />
                    <div className="space-y-5">
                      <span className="inline-block px-2.5 py-1 rounded bg-zinc-100 text-[8.5px] font-black text-zinc-500 uppercase tracking-wider">
                        Phase 02 • Closed Sandbox
                      </span>
                      <h4 className="text-sm font-black uppercase tracking-wider text-zinc-950 leading-tight">
                        Closed Local Sandbox Flight Test
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                        Releasing sandboxed companion invitations to early waitlist reservation holders. Verifying local RAM isolation boundaries and ocular camera sampling frequencies on key handsets.
                      </p>
                    </div>
                  </div>

                  {/* Phase 03 */}
                  <div className="p-8 rounded-2xl border border-zinc-200 bg-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-200" />
                    <div className="space-y-5">
                      <span className="inline-block px-2.5 py-1 rounded bg-zinc-100 text-[8.5px] font-black text-zinc-500 uppercase tracking-wider">
                        Phase 03 • Deployment
                      </span>
                      <h4 className="text-sm font-black uppercase tracking-wider text-zinc-950 leading-tight">
                        Regional Canadian OS Deployment
                      </h4>
                      <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                        Public general debut of the offline driver safety application, optimizing specific focus baselines for Canadian weather conditions and highway configurations.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* 7. Direct Conversion Engine & Prefinery Gateway */}
            <section id="prefinery-checkout" className="py-28 bg-zinc-50 text-zinc-950 relative border-b border-zinc-200/80 overflow-hidden">
              {/* High-end tech blueprint backdrop overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:20px_20px] opacity-100 pointer-events-none" />
              <div className="absolute -left-24 top-12 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10 text-center">
                
                <div className="mb-14 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200 border border-zinc-300/80 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono">
                    SECURITY PRE-REGISTRATION
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-5xl font-sans">
                    Secure Your Priority Placement
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto leading-relaxed">
                    Reserve a priority alpha slot directly. Our initial validation filter ensures allocation goes strictly to dedicated, real early adopters.
                  </p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-md text-left max-w-xl mx-auto space-y-8">
                  
                  {/* Explanation layer */}
                  <div className="border-b border-zinc-100 pb-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black uppercase text-zinc-900 tracking-wider font-mono">Waitlist Filter Allocation</h4>
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase animate-pulse">Fully Refundable</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans font-medium">
                      The $5 reservation acts as an intent-validation layer. This guarantees our sandbox launcher allocations are committed to real, dedicated early adopters rather than scale-testing scripts, protecting developer bandwidth.
                    </p>
                  </div>

                  {/* PREFINERY EMBED CONTAINER WRAPPER */}
                  <div className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-wider text-zinc-500 font-mono">
                      Referral Gateway & Active Signup
                    </label>
                    <div className="bg-zinc-50 border border-zinc-200/60 rounded-2xl p-5 min-h-[140px] flex flex-col justify-center">
                      
                      {/* Required Prefinery headless anchor */}
                      <div className="prefinery-form-embed"></div>
                      
                      {/* High-Fidelity Interactive Conversion Form */}
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        handleNavigateToCohort("guardian");
                      }} className="space-y-4 mt-1">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input 
                            type="email" 
                            required 
                            placeholder="driver@example.ca" 
                            className="flex-grow rounded border border-zinc-250 bg-white px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20 font-mono"
                          />
                          <button 
                            type="submit" 
                            className="bg-blue-600 text-white hover:bg-blue-500 active:scale-98 transition-all px-6 py-3 rounded text-xs font-black uppercase tracking-wider cursor-pointer font-mono shadow-xs"
                          >
                            Secure Priority Alpha Slot ($5 Fully Refundable)
                          </button>
                        </div>
                      </form>

                      <p className="text-[10px] text-zinc-400 font-mono text-center uppercase tracking-wider mt-4">
                        * Referral waitlist engine active • fully secure connection
                      </p>
                    </div>
                  </div>

                  {/* Dual path instructions */}
                  <div className="grid gap-4 sm:grid-cols-2 text-xs pt-6 border-t border-zinc-100 font-mono">
                    <div>
                      <p className="font-extrabold uppercase text-[9px] tracking-wider text-zinc-900 mb-1">Path A: Interactive Simulation</p>
                      <p className="text-[10px] text-zinc-500 leading-normal font-sans font-medium">
                        Take the 10-Question simulation first to record your regional commute baseline.
                      </p>
                      <button
                        onClick={handleStartSimulation}
                        className="mt-3 text-[10px] text-zinc-950 hover:text-zinc-700 font-black hover:underline tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Start Simulator</span>
                        <span>→</span>
                      </button>
                    </div>
                    <div className="border-t sm:border-t-0 sm:border-l border-zinc-200 pt-4 sm:pt-0 sm:pl-4">
                      <p className="font-extrabold uppercase text-[9px] tracking-wider text-zinc-900 mb-1">Path B: Instant Priority Reservation</p>
                      <p className="text-[10px] text-zinc-500 leading-normal font-sans font-medium">
                        Complete the gateway above to secure direct access to development sandbox builds and 50% discount codes.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* 8. Consumer Friction FAQ Accordion */}
            <section id="faq-section" className="py-28 bg-white border-b border-zinc-200/80 relative overflow-hidden">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
                
                <div className="text-center mb-20">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono mb-4">
                    Support & Sovereignty Transparency
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-wider text-zinc-950 sm:text-4xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-zinc-500 mt-3 max-w-lg mx-auto leading-relaxed">
                    Clear, detailed answers regarding our smartphone resource parameters, intent deposits, and absolute data privacy isolation.
                  </p>
                </div>

                {/* FAQ group with minimal border style */}
                <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                  {faqItems.map((item, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className="py-1 transition-all duration-300 overflow-hidden text-left"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between py-6 text-left transition-all cursor-pointer font-sans"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-[10.5px] font-black font-mono text-zinc-400 shrink-0">
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            <span className={`text-xs sm:text-[13px] font-black uppercase tracking-wider font-mono transition-colors duration-200 ${isOpen ? 'text-zinc-950' : 'text-zinc-700 hover:text-zinc-950'}`}>
                              {item.q}
                            </span>
                          </div>
                          <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen ? "bg-zinc-100 border-zinc-200 text-zinc-950 rotate-180" : "bg-zinc-50 border-zinc-200 text-zinc-400"
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
                              <div className="pb-7 pt-1 text-xs sm:text-[13px] text-zinc-650 leading-relaxed font-sans font-medium pl-10 pr-6">
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

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 border-2 border-blue-200 shadow-lg hover:bg-blue-100 hover:border-blue-300 active:scale-95 transition-all cursor-pointer"
            id="scroll-to-top-button"
            title="Scroll to top"
          >
            <ArrowUp className="h-4.5 w-4.5 stroke-[3] text-blue-600" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
