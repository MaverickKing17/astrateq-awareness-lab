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
  Sparkles, ShieldCheck, Heart, Info, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Lock, Cpu, Star, Check, ArrowUp
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
      q: "Why are you building this?",
      a: "Today's driver safety systems are almost entirely reactive—sounding loud alarms or applying automatic brakes only after an error occurs. Driver Awareness Intelligence explores whether on-device, offline-first software can help drivers recognize and understand their own fatigue curves before those critical situations develop."
    },
    {
      q: "Why should I join the research cohort?",
      a: "Joining the cohort lets you actively participate in validating this new product category. It costs nothing, requires no deposit, and carries zero commitment. It secures your priority queue placement for the upcoming software rollout, locks in a high early-bird launch discount (up to 50%), and ensures your feedback directs our prototype development priorities."
    },
    {
      q: "How does my participation influence development?",
      a: "Your feedback and simulation outcomes provide critical real-world validation of demand, Canadian driving behaviors, regional fatigue risks, and local privacy expectations. This ensures we prioritize offline security and driver empowerment over invasive, tracking-based tech."
    },
    {
      q: "Why is this simulation valuable?",
      a: "The 60-second Driver Awareness Simulator acts as our diagnostic lead magnet. It allows you to experience the first conceptual version of driver fatigue assessment. It generates an exposure score that we pair with your reservation code to unlock early-bird discounts and help map provincial safety demand."
    },
    {
      q: "What happens after the validation phase?",
      a: "Once we confirm strong market interest across Canadian provinces, we will transition into our private offline prototype rollout. Cohort members will be the first to receive invitation keys, offline setup instructions, and direct development briefs."
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
            {/* Hero Section (Improvement 1, 2, 5, 6, 8, 10, 11, 12) */}
            <section className="relative overflow-hidden py-20 sm:py-24 border-b border-slate-200/60">
              {/* Cinematic Hero Background Integration */}
              <div 
                className="absolute inset-0 bg-cover bg-center -z-20"
                style={{ backgroundImage: `url(${HWY_404_POV_IMAGE})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/92 to-slate-50/95 -z-10" />
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-100 to-slate-100 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
              </div>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text & CTAs */}
                  <div className="lg:col-span-7 text-left space-y-6">
                    <span className="inline-flex items-center gap-1.5 border border-blue-200 bg-blue-50/50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700 font-mono rounded-full">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                      Active Category Validation Study • Zero Hardware Required
                    </span>
                    
                    <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.05] font-sans">
                      Driving is connected.<br className="hidden sm:inline" />
                      But is it <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">intelligent</span>?
                    </h1>

                    <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl font-sans font-medium">
                      <p>
                        Technology shouldn’t just collect driving data—it should help you understand yourself. We are validating a completely new technology category: <span className="text-slate-900 font-bold border-b-2 border-blue-500/25 pb-0.5">Privacy-First Driver Awareness Intelligence</span>.
                      </p>
                      <p>
                        Instead of loud, reactive alarms sounding <span className="text-slate-950 font-black border-b-2 border-indigo-500/35 pb-0.5">after</span> mistakes happen, Astrateq explores offline, local-first software that maps focus and fatigue trends <span className="text-slate-950 font-black border-b-2 border-cyan-500/35 pb-0.5">before</span> critical situations develop.
                      </p>
                    </div>

                    {/* Features list (Improvement 11 & 12) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 max-w-xl text-[11px] font-black uppercase tracking-wider text-slate-800 font-mono pt-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>Sovereign Local Software</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>Bypasses OBD Connections</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>Isolated from Auto Insurers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>100% Temporary RAM Isolation</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        onClick={handleStartSimulation}
                        className="group inline-flex items-center justify-center gap-2.5 rounded bg-blue-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_18px_rgba(59,130,246,0.25)] transition-all hover:bg-blue-700 hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] active:scale-95 cursor-pointer font-mono"
                      >
                        <span>Start 60s Diagnostic</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <button
                        onClick={() => handleNavigate("cohort")}
                        className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all hover:bg-slate-50 active:scale-95 cursor-pointer font-mono shadow-xs"
                      >
                        <span>Join Validation Community</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider leading-relaxed pt-1">
                      *Takes under 60 seconds • Completely free of charge • Zero hardware adapters • Cancel at any time
                    </p>
                  </div>

                  {/* Right Column: Redesigned Simulated Result Dashboard Mockup (Improvement 2, 8, 9) */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm rounded-2xl border-2 border-slate-800 bg-[#0B1220] p-6 shadow-2xl overflow-hidden text-white transition-all duration-300 hover:shadow-[0_30px_60px_rgba(59,130,246,0.25)] hover:border-blue-500">
                      
                      {/* Grid lines pattern overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10 space-y-4">
                        {/* Mock App Header */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                            <Cpu className="h-4 w-4 text-blue-400 animate-pulse" />
                            <span>ASTRATEQ ENGINE v1.2</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[8px] font-bold font-mono text-blue-400 uppercase tracking-wider animate-pulse">
                            <span className="relative flex h-1 w-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1 w-1 bg-emerald-400"></span>
                            </span>
                            LIVE SIMULATION COMPILING
                          </span>
                        </div>

                        {/* Interactive Telemetry Mock Display */}
                        <div className="flex flex-col items-center py-5 bg-slate-900/60 rounded-xl border border-slate-800 shadow-inner space-y-3 relative overflow-hidden group">
                          {/* Pulsing glow background */}
                          <div className="absolute inset-0 bg-cyan-500/[0.02] pointer-events-none animate-pulse" />
                          
                          {/* Radial Progress Ring representing awareness score */}
                          <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-b from-slate-950 to-slate-900 border-4 border-blue-500/40 shadow-[0_8px_20px_rgba(59,130,246,0.15)] transition-transform duration-500 group-hover:scale-105">
                            <div className="absolute inset-1 rounded-full border border-dashed border-cyan-400/30 animate-[spin_30s_linear_infinite]" />
                            <div className="flex flex-col items-center">
                              <span className="text-2xl font-black font-mono tracking-tight text-white transition-all duration-300">
                                {dashboardScore}
                              </span>
                              <span className="text-[7px] font-bold text-emerald-400 uppercase tracking-widest font-mono animate-pulse">
                                STABLE
                              </span>
                            </div>
                          </div>

                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                            DRIVER AWARENESS SCORE
                          </span>
                        </div>

                        {/* Detailed Diagnostic Context Information */}
                        <div className="bg-black/80 p-4 rounded-xl border border-slate-800 font-mono text-[9.5px] space-y-2.5 text-slate-300">
                          <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400 uppercase text-[8px] tracking-wider">
                            <span>METRIC CLASSIFICATION</span>
                            <span className="text-blue-400 font-bold">ON-COGNITIVE-M702</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <p className="text-slate-500 uppercase text-[8px] tracking-wider">System Live Logs:</p>
                            <p className="text-emerald-400 font-medium pl-2 bg-emerald-950/20 py-1.5 rounded border border-emerald-900/30 font-mono text-[8.5px] leading-relaxed transition-all duration-300 h-7 flex items-center">
                              &gt; {mockLogs[activeLogIdx]}
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-slate-500 uppercase text-[8px] tracking-wider">Active Baseline Metric:</p>
                            <p className="text-white font-medium pl-1 bg-slate-900/40 py-1 rounded">
                              Cognitive tracking running at {attentionLevel}% focal alignment.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900">
                            <div>
                              <p className="text-slate-500 uppercase text-[8px] tracking-wider">Blink Frame Rate:</p>
                              <p className="text-cyan-400 font-bold mt-0.5">{blinkRate} frames/sec</p>
                            </div>
                            <div>
                              <p className="text-slate-500 uppercase text-[8px] tracking-wider">Privacy Standard:</p>
                              <p className="text-emerald-400 font-bold mt-0.5">100% Isolated RAM</p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-1 border-t border-slate-900 text-slate-500 text-[8px]">
                            <span>CONFIDENCE RATING:</span>
                            <span className="text-white font-bold">{attentionLevel}% ATTENTION DENSITY</span>
                          </div>
                        </div>

                        {/* Software Quick Spec Badges */}
                        <div className="grid grid-cols-3 gap-2 text-center text-[8px] font-mono uppercase tracking-wider">
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60 transition-all hover:border-slate-700">
                            <p className="text-blue-400 font-black">SOVEREIGN</p>
                            <p className="text-slate-500 mt-0.5">NO GPS TRACK</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60 transition-all hover:border-slate-700">
                            <p className="text-emerald-400 font-black">HARDWARE FREE</p>
                            <p className="text-slate-500 mt-0.5">SOFTWARE ONLY</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60 transition-all hover:border-slate-700">
                            <p className="text-cyan-400 font-black">BIOMETRICS</p>
                            <p className="text-slate-500 mt-0.5">ZERO STORAGE</p>
                          </div>
                        </div>

                        <p className="text-[7.5px] font-mono text-slate-500 text-center uppercase tracking-widest leading-relaxed">
                          Conceptual Driver Awareness Interface Dashboard Mockup
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* TRUST & QUALITATIVE SOCIAL PROOF BANNER (Improvement 5, 6) */}
            <div className="bg-white border-b border-slate-200/50 py-6 relative z-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-center lg:justify-between gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🇨🇦</span>
                    <span>Built exclusively for Canadian drivers</span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-slate-300 hidden lg:block" />
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-slate-400" />
                    <span>Privacy-First By Design</span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-slate-300 hidden lg:block" />
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-slate-400" />
                    <span>Active concept validation study</span>
                  </div>
                  <div className="h-1 w-1 rounded-full bg-slate-300 hidden lg:block" />
                  <div className="flex items-center gap-2 text-blue-600 font-black">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Every simulation shapes the platform</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Value Props Cards & How It Works section */}
            <ValueProps onStartSimulation={handleStartSimulation} onNavigateToCohort={handleNavigateToCohort} />

            {/* NEW SECTION: VALIDATION PROGRESS DASHBOARD (Improvement 4, 7, 10, 11) */}
            {/* Psychological Question: "Is anyone else doing this?" */}
            <section className="py-24 sm:py-32 bg-slate-900 text-white relative border-y border-slate-950 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-extrabold uppercase tracking-widest text-blue-400 font-mono">
                    Validation Study Milestones
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl font-sans">
                    Canadian Pilot Cohort Targets
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
                    Astrateq is currently in the pre-launch validation phase. We are recruiting early pilot participants and gathering simulator diagnostics to establish localized safety baselines across Canada.
                  </p>
                </div>

                {/* Stripe/Linear style stats dashboard layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-mono">
                  
                  {/* Card 1 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-300 uppercase tracking-widest font-extrabold">PILOT COHORT LIMIT</p>
                      <p className="text-3xl font-black text-white">1,000</p>
                    </div>
                    <p className="text-[10px] text-slate-200 mt-4 leading-relaxed font-sans">
                      <span className="text-cyan-400 font-bold font-mono text-[9px] block mb-1">FOUNDING ALLOCATIONS</span>
                      Early pilot slots are capped to maintain direct developer communication and hardware support.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-300 uppercase tracking-widest font-extrabold">STUDY TARGET SIZE</p>
                      <p className="text-3xl font-black text-white">5,000</p>
                    </div>
                    <p className="text-[10px] text-slate-200 mt-4 leading-relaxed font-sans">
                      <span className="text-blue-400 font-bold font-mono text-[9px] block mb-1">SIMULATION RUNS</span>
                      Required anonymous driver focus runs to calibrate cognitive fatigue baselines on Canadian roads.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-300 uppercase tracking-widest font-extrabold">PROVINCIAL SCOPE</p>
                      <p className="text-3xl font-black text-white">10 / 10</p>
                    </div>
                    <p className="text-[10px] text-slate-200 mt-4 leading-relaxed font-sans">
                      <span className="text-indigo-400 font-bold font-mono text-[9px] block mb-1">COAST TO COAST</span>
                      Gathering telemetry to validate edge calculations in winter conditions across all provinces.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-300 uppercase tracking-widest font-extrabold">LAUNCH STAGE</p>
                      <p className="text-3xl font-black text-white">PHASE 1</p>
                    </div>
                    <p className="text-[10px] text-slate-200 mt-4 leading-relaxed font-sans">
                      <span className="text-emerald-400 font-bold font-mono text-[9px] block mb-1">CONCEPT VALIDATION</span>
                      Confirming demand and aggregating initial driver telemetry before starting hardware production.
                    </p>
                  </div>

                </div>

                <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-2 text-xs text-slate-200 border-t border-slate-800/80 pt-8 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span><strong>Current Stage:</strong> Active Pre-Launch Pilot Recruitment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    <span><strong>Milestone Target:</strong> Initial prototype manufacturing scheduled once target cohorts are secured.</span>
                  </div>
                </div>

                {/* SUBTLE INTEGRATED CTA (Improvement 7) */}
                <div className="mt-12 text-center p-6 rounded-xl border border-slate-800 bg-black/40 max-w-xl mx-auto">
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    Want to contribute to our early research and establish your custom driver focus score? Try the 60-second diagnostic simulator.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleStartSimulation}
                      className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 cursor-pointer font-mono"
                    >
                      <span>Start Anonymous Diagnostic</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* NEW SECTION: WHY YOUR PARTICIPATION MATTERS (Improvement 6, 7, 9, 10, 11) */}
            {/* Psychological Question: "Why should I help?" */}
            <section className="py-24 sm:py-32 bg-white border-b border-slate-200/50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
                    Meaningful Impact
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
                    Why your participation matters
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed font-sans">
                    We aren't asking for deposits, credit cards, or hardware purchases. Your engagement represents the ultimate democratic vote for modern, on-device safety software.
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Decides What Insights Matter",
                      desc: "Your simulation variables guide our eventual focus dashboard. By selecting which parameters to record, you direct what features our local edge model prioritizes.",
                      theme: {
                        bg: "from-blue-50/40 via-white to-blue-50/10",
                        border: "border-blue-200 hover:border-blue-400 hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)]",
                        topBar: "bg-blue-500",
                        iconColor: "text-blue-600",
                        iconBg: "bg-blue-100/60 border-blue-200",
                      }
                    },
                    {
                      title: "Locks Down Privacy Standards",
                      desc: "Your feedback cements an alternative to remote insurance tracking, proving that drivers actively value zero-trace, local-memory data isolation standards.",
                      theme: {
                        bg: "from-cyan-50/40 via-white to-cyan-50/10",
                        border: "border-cyan-200 hover:border-cyan-400 hover:shadow-[0_12px_30px_rgba(6,182,212,0.15)]",
                        topBar: "bg-cyan-500",
                        iconColor: "text-cyan-600",
                        iconBg: "bg-cyan-100/60 border-cyan-200",
                      }
                    },
                    {
                      title: "Declares What Drivers Value",
                      desc: "Standard safety suites demand constant cloud logins and OBD connections. Your signup demonstrates that drivers explicitly demand hardware-free, personal solutions.",
                      theme: {
                        bg: "from-indigo-50/40 via-white to-indigo-50/10",
                        border: "border-indigo-200 hover:border-indigo-400 hover:shadow-[0_12px_30px_rgba(99,102,241,0.15)]",
                        topBar: "bg-indigo-500",
                        iconColor: "text-indigo-600",
                        iconBg: "bg-indigo-100/60 border-indigo-200",
                      }
                    },
                    {
                      title: "Determines Project Investment",
                      desc: "Strong regional metrics show partners that driver focus is a highly valued priority. Your participation triggers development of Canada's first sovereign driver AI.",
                      theme: {
                        bg: "from-amber-50/40 via-white to-amber-50/10",
                        border: "border-amber-200 hover:border-amber-400 hover:shadow-[0_12px_30px_rgba(245,158,11,0.15)]",
                        topBar: "bg-amber-500",
                        iconColor: "text-amber-600",
                        iconBg: "bg-amber-100/60 border-amber-200",
                      }
                    },
                    {
                      title: "Coordinates Priority Rollout",
                      desc: "As an early contributor, your signup guarantees primary rollout access and locks in founding early-bird launch pricing without any monetary deposits.",
                      theme: {
                        bg: "from-emerald-50/40 via-white to-emerald-50/10",
                        border: "border-emerald-200 hover:border-emerald-400 hover:shadow-[0_12px_30px_rgba(16,185,129,0.15)]",
                        topBar: "bg-emerald-500",
                        iconColor: "text-emerald-600",
                        iconBg: "bg-emerald-100/60 border-emerald-200",
                      }
                    },
                    {
                      title: "Adapts to Canadian Commutes",
                      desc: "Whether you drive frozen rural highways or heavy urban gridlocks, your province and routing parameters shape the algorithmic thresholds for localized weather variables.",
                      theme: {
                        bg: "from-rose-50/40 via-white to-rose-50/10",
                        border: "border-rose-200 hover:border-rose-400 hover:shadow-[0_12px_30px_rgba(244,63,94,0.15)]",
                        topBar: "bg-rose-500",
                        iconColor: "text-rose-600",
                        iconBg: "bg-rose-100/60 border-rose-200",
                      }
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className={`relative pt-10 pb-8 px-8 rounded-2xl border bg-gradient-to-br ${item.theme.bg} shadow-lg text-slate-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl overflow-hidden ${item.theme.border}`}
                      id={`app-value-prop-card-${idx}`}
                    >
                      {/* Colorful top accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.theme.topBar}`} />
                      
                      <div className={`h-10 w-10 rounded-xl border flex items-center justify-center mb-6 ${item.theme.iconBg}`}>
                        <Check className={`h-5 w-5 ${item.theme.iconColor}`} />
                      </div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono mb-3">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* SUBTLE INTEGRATED CTA (Improvement 7) */}
                <div className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl border border-slate-200 bg-slate-50/40">
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Help us reach our Canadian prototyping threshold. Secure your placement in the validation community to demonstrate demand.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => handleNavigate("cohort")}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 cursor-pointer font-mono"
                    >
                      <span>Join Early Validation Cohort</span>
                    </button>
                    <button
                      onClick={handleStartSimulation}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all hover:bg-slate-50 active:scale-95 cursor-pointer font-mono"
                    >
                      <span>Simulate First</span>
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Privacy Section Highlight (Specific requirement to reinforce hardware-level privacy - Improvement 7, 9, 10, 11, 12) */}
            {/* Psychological Question: "Can I trust this?" */}
            <section id="privacy-info" className="relative bg-[#F8FAFC] py-24 sm:py-32 border-b border-slate-200/80">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-gradient-to-br from-[#0B1220] to-[#0C1424] text-white p-8 sm:p-12 relative overflow-hidden border border-[#0B1220] shadow-2xl">
                  {/* Gradient globes */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative max-w-3xl space-y-6">
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-blue-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full font-mono">
                      <Lock className="h-3.5 w-3.5 text-blue-400" /> Dynamic Privacy Manifesto
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white font-sans">Sovereign On-Device Privacy Architecture</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-sans">
                      Skepticism around telematics monitoring, OBD trackers, and commercial dash cams is entirely justified. Astrateq represents a complete structural alternative: a software-only suite operating with absolute local isolation boundaries. Your personal metrics never exit your hardware.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-3 text-xs pt-4">
                      <div className="p-4 rounded-xl border border-slate-800/60 bg-[#070D1A]/80 font-mono space-y-1.5">
                        <p className="font-extrabold uppercase text-[9px] tracking-wider text-blue-400">No Vehicle Connections</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">Bypasses OBD and OBD-II ports entirely. Reads zero speed parameters, vehicle logs, or dashboard telemetry.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-800/60 bg-[#070D1A]/80 font-mono space-y-1.5">
                        <p className="font-extrabold uppercase text-[9px] tracking-wider text-blue-400">No Insurance Sharing</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">Sovereign database structure. We never transmit focus data, route histories, or scoring details to insurance underwriters.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-800/60 bg-[#070D1A]/80 font-mono space-y-1.5">
                        <p className="font-extrabold uppercase text-[9px] tracking-wider text-blue-400">No Remote GPS Storage</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">No background route tracking or location telemetry. Focus evaluations are calculated locally and immediately discarded from memory.</p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 text-xs">
                      <div className="p-4 rounded-xl border border-slate-800/60 bg-[#070D1A]/80 font-mono space-y-1.5">
                        <p className="font-extrabold uppercase text-[9px] tracking-wider text-blue-400">Zero Face Recording</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">No video feeds, snapshots, or biometric images are ever saved or transmitted. Eye geometry is mapped in active RAM as floating-point vectors and immediately purged.</p>
                      </div>
                      <div className="p-4 rounded-xl border border-slate-800/60 bg-[#070D1A]/80 font-mono space-y-1.5">
                        <p className="font-extrabold uppercase text-[9px] tracking-wider text-blue-400">No Ad-Tracking Pixels</p>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-sans">Our builds contain zero commercial tracking codes, target pixels, or marketing brokers. Built exclusively for Canadian privacy compliance.</p>
                      </div>
                    </div>

                    {/* SUBTLE INTEGRATED CTA (Improvement 7) */}
                    <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                      <p className="text-slate-400 text-[11px] font-sans leading-relaxed max-w-md">
                        Help us validate that software-only driver safety can exist with absolute privacy respect. Join the early validation community.
                      </p>
                      <button
                        onClick={() => handleNavigate("cohort")}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 cursor-pointer font-mono shrink-0"
                      >
                        <span>Support Our Manifesto</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq-section" className="py-24 sm:py-32 bg-gradient-to-b from-slate-50/50 to-blue-50/20 border-t border-slate-200/60 relative overflow-hidden">
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

                <div className="space-y-4">
                  {faqItems.map((item, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`rounded-2xl border border-l-4 transition-all duration-300 overflow-hidden ${
                          isOpen 
                            ? "border-blue-300 border-l-blue-600 bg-white shadow-[0_12px_30px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200/80 border-l-slate-300 bg-white hover:bg-slate-50/30 hover:border-blue-200 hover:border-l-blue-400 hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)]"
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left transition-all cursor-pointer font-sans"
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-black font-mono px-2.5 py-1 rounded-md transition-all duration-250 shrink-0 ${
                              isOpen ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                            }`}>
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            <span className={`text-xs sm:text-[13px] font-black uppercase tracking-wider font-mono transition-colors duration-250 ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
                              {item.q}
                            </span>
                          </div>
                          <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen ? "bg-blue-50 border-blue-200 text-blue-600 rotate-180 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-400"
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
                              <div className="px-6 pb-6 pt-4 border-t border-slate-100 bg-gradient-to-b from-slate-50/50 to-white text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium pl-14 pr-10">
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
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-500 hover:shadow-blue-500/35 active:scale-95 transition-all cursor-pointer border border-blue-400/30"
            id="scroll-to-top-button"
            title="Scroll to top"
          >
            <ArrowUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
