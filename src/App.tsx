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
            <section className="relative overflow-hidden bg-white pt-20 pb-24 border-b border-slate-200/80">
              {/* Subtle mesh background accent */}
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
              
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Direct and clear CTAs */}
                  <div className="lg:col-span-7 text-left space-y-6">
                    <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-800 font-mono rounded-full shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-slate-900 animate-pulse" />
                      PRE-LAUNCH VALIDATION • SMARTPHONE ONLY
                    </span>
                    
                    <h1 className="text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-[1.05] font-sans">
                      We already map routes.<br />
                      Now let's understand the <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">driver</span>.
                    </h1>

                    <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-sans font-medium">
                      <p>
                        Current driving software monitors speeds and brakes—actions taken after a lapse occurs. Astrateq is introducing a completely new category: <span className="text-slate-950 font-bold border-b-2 border-slate-300 pb-0.5">Privacy-First Driver Awareness Intelligence</span>.
                      </p>
                      <p>
                        We are validating an elegant, smartphone-based companion designed to anticipate focus drops and cognitive fatigue in real-time. Operating with absolute offline confidentiality, it requires no hardware, no adapters, and zero cellular connections.
                      </p>
                    </div>

                    {/* Features list - strictly hardware-free consumer benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 max-w-xl text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono pt-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-900 border border-slate-200">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>Zero External Accessories</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-900 border border-slate-200">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>Bypasses OBD Port Limits</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-900 border border-slate-200">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>No Insurance Telemetry Logs</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-900 border border-slate-200">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <span>Temporary Local RAM Isolation</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        onClick={handleStartSimulation}
                        className="group inline-flex items-center justify-center gap-2.5 rounded bg-slate-950 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 cursor-pointer font-mono"
                      >
                        <span>Begin Baseline Simulation</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                      <button
                        onClick={() => {
                          document.getElementById("prefinery-checkout")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all hover:bg-slate-50 active:scale-95 cursor-pointer font-mono shadow-xs"
                      >
                        <span>Reserve Priority Slot ($5)</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider leading-relaxed pt-1">
                      *60-Second Simulator • Secure Waitlist Placement • Fully Refundable Reservation
                    </p>
                  </div>

                  {/* Right Column: Premium Smartphone Dashboard Simulator */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    
                    {/* Compact 5-Second Explanation */}
                    <div className="w-full max-w-sm mb-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-sm text-left">
                      <div className="flex gap-2.5">
                        <Smartphone className="h-5 w-5 text-slate-900 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 font-sans">
                            Dashboard Setup in 5 Seconds:
                          </h4>
                          <p className="text-xs text-slate-600 font-sans mt-1 leading-relaxed">
                            No plugs or accessories. Simply mount your smartphone on your vehicle dashboard. Astrateq's local engine analyzes attention trends <span className="underline decoration-slate-400 font-extrabold text-slate-900">100% offline</span> using secure on-device memory.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Smartphone Bezel Wrapper */}
                    <div className="relative w-full max-w-[340px] rounded-[44px] border-[12px] border-slate-950 bg-[#070D19] p-4 shadow-2xl overflow-hidden text-white transition-all duration-300 hover:shadow-slate-200">
                      
                      {/* Grid lines background pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Phone Dynamic Notch & Front Camera Feed simulation */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-b-xl flex items-center justify-center gap-1.5 px-3 z-30">
                        <div className="h-2 w-2 rounded-full bg-slate-800" />
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[7.5px] font-black text-emerald-400 uppercase tracking-widest font-mono">RAM SCAN</span>
                      </div>

                      <div className="relative z-10 space-y-4 pt-4">
                        
                        {/* Phone Status bar */}
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 px-1 border-b border-slate-900 pb-2">
                          <span>10:45 AM</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] bg-slate-800 px-1 py-0.5 rounded text-slate-300 uppercase font-black">LOCAL ONLY</span>
                            <span className="text-[10px]">⚡ 100%</span>
                          </div>
                        </div>

                        {/* Dynamic Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[10.5px] font-black font-mono text-slate-100 uppercase tracking-widest">
                            <Cpu className="h-4 w-4 text-slate-300" />
                            <span>COACH ENGINE v1.2</span>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded bg-slate-800 border border-slate-700 px-2 py-0.5 text-[9px] font-black font-mono text-slate-300 uppercase tracking-wider animate-pulse">
                            ACTIVE DEMO
                          </span>
                        </div>

                        {/* High-Fidelity Interactive Widgets */}
                        <div className="space-y-3">
                          
                          {/* Widget 1: Driver Awareness Index (Primary Focal Score) */}
                          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col items-center space-y-2 text-center relative overflow-hidden">
                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-slate-700" />
                            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-slate-700" />
                            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-slate-700" />
                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-slate-700" />
                            
                            <span className="text-[9px] font-bold tracking-widest text-slate-400 font-mono uppercase">
                              Driver Awareness Index
                            </span>
                            
                            {/* Circular gauge representing score */}
                            <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-slate-950 border-4 border-white/10 shadow-sm">
                              <div className="absolute inset-1.5 rounded-full border border-dashed border-slate-400/10 animate-[spin_40s_linear_infinite]" />
                              <div className="flex flex-col items-center">
                                <span className="text-3xl font-black font-mono text-white">{dashboardScore}</span>
                                <span className="text-[8px] font-extrabold text-emerald-400 tracking-wider uppercase font-mono mt-0.5 animate-pulse">
                                  STABLE FOCUS
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Widget 2: Attention Stability & Scanning Level */}
                          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-300">
                              <span>ATTENTION STABILITY</span>
                              <span className="text-slate-200">{attentionLevel}% STABLE</span>
                            </div>
                            {/* Segmented bar indicator representing Cognitive Load */}
                            <div className="grid grid-cols-10 gap-1 h-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                                <div 
                                  key={bar} 
                                  className={`h-full rounded-sm ${
                                    bar <= Math.floor(attentionLevel / 10) 
                                      ? "bg-slate-150" 
                                      : "bg-slate-800"
                                  }`} 
                                />
                              ))}
                            </div>
                            <div className="flex justify-between text-[8px] font-mono text-slate-400">
                              <span>COGNITIVE LOAD: LOW</span>
                              <span>SAMPLING: 60FPS</span>
                            </div>
                          </div>

                          {/* Widget 3: Fatigue Pattern & Blink Interval */}
                          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 grid grid-cols-2 gap-4 text-left font-mono">
                            <div>
                              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Fatigue Risk</span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                                <span className="text-xs font-black text-emerald-400">MINIMAL</span>
                              </div>
                            </div>
                            <div className="border-l border-slate-800 pl-3">
                              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Blink Duration</span>
                              <div className="text-xs font-black text-slate-100 mt-1">
                                {blinkRate * 10}ms blinks
                              </div>
                            </div>
                          </div>

                          {/* Widget 4: Driving Context Log */}
                          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-left font-mono space-y-1.5">
                            <div className="flex justify-between items-center border-b border-slate-800/60 pb-1.5">
                              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Active Stream</span>
                              <span className="text-[8px] text-slate-400 font-bold bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">SANDBOX</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-300 h-8 flex items-center">
                              {mockLogs[activeLogIdx]}
                            </p>
                          </div>

                          {/* Widget 5: Driving Context Summary */}
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-center font-mono">
                            <p className="text-[8px] text-slate-400 leading-normal font-semibold">
                              Sovereign local analysis • zero telemetry leakage • 100% offline RAM protection
                            </p>
                          </div>

                        </div>

                        {/* Home Indicator */}
                        <div className="w-24 h-1 bg-slate-700 mx-auto rounded-full mt-2" />
                      </div>
                    </div>

                    <p className="text-[10px] font-mono text-slate-500 text-center uppercase tracking-widest leading-relaxed mt-2.5 font-bold bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                      📱 Active Smartphone Interface Mockup
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* 2. Trust Pillar Banner */}
            <div className="bg-white border-b border-slate-200 py-12 relative z-20">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { 
                      title: "Sovereign Local Processing", 
                      desc: "All algorithms run locally on your smartphone CPU. We bypass cloud databases entirely.", 
                      icon: Cpu 
                    },
                    { 
                      title: "No GPS Log Storage", 
                      desc: "Your historical route coordinate traces are never recorded, cached, or transmitted.", 
                      icon: Compass 
                    },
                    { 
                      title: "Zero Insurance Tracking", 
                      desc: "We are strictly consumer-first. Your focus curves are fully isolated from auto insurers.", 
                      icon: ShieldCheck 
                    },
                    { 
                      title: "No Accessories Required", 
                      desc: "Operates 100% independently of physical vehicle ports or custom electronic add-ons.", 
                      icon: Smartphone 
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 text-left">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-slate-50 border border-slate-200 text-slate-900">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-950 font-mono leading-tight">{item.title}</h4>
                        <p className="text-xs text-slate-500 font-sans leading-normal font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Human Editorial Lifestyle Block */}
            <section id="lifestyle-breakout" className="relative py-32 bg-slate-950 text-white overflow-hidden border-b border-slate-900">
              <div className="absolute inset-0 z-0">
                <img 
                  src={HWY_404_POV_IMAGE} 
                  alt="POV Canadian Driving" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-30 grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/60" />
              </div>

              <div className="relative z-10 mx-auto max-w-4xl px-4 text-center space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-widest text-slate-300 font-mono">
                  The Sovereign Commute
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight font-sans max-w-3xl mx-auto">
                  Protecting Focus Across Long Canadian Highways.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-sans font-medium">
                  Whether cruising across frozen rural corridors, negotiating trans-provincial highway stretches, or navigating dense city bottlenecks, driver focus remains your ultimate safety layer. Astrateq helps you preempt the slow onset of highway hypnosis and ocular fatigue.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={handleStartSimulation}
                    className="group inline-flex items-center gap-2 rounded bg-white text-slate-950 px-6 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-slate-100 active:scale-95 cursor-pointer font-mono transition-all"
                  >
                    <span>Simulate Baseline</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-slate-950" />
                  </button>
                </div>
              </div>
            </section>

            {/* 4. Core Capabilities (ValueProps integration) */}
            <ValueProps onStartSimulation={handleStartSimulation} onNavigateToCohort={() => {
              document.getElementById("prefinery-checkout")?.scrollIntoView({ behavior: "smooth" });
            }} />

            {/* 5. How It Works (Bento Grid / Steps) */}
            <section className="py-24 bg-slate-50 border-b border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 font-mono">
                    System Mechanics
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl font-sans">
                    The Early Validation Loop
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed font-sans">
                    We seek to validate genuine consumer demand to direct our upcoming product rollout. The process is completely simple, secure, and collaborative.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 font-mono text-left">
                  
                  {/* Step 1 */}
                  <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white font-mono text-xs font-black">
                        01
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">Establish Your Baseline</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                        Complete our 10-Question cognitive load simulation. It evaluates your typical commuting fatigue exposure and generates a personalized safety score.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-8 block">Estimated time: 60 seconds</span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white font-mono text-xs font-black">
                        02
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">Lock In Priority Queue</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                        Reserve your placement in our private sandbox waitlist with a $5 fully refundable priority slot. This secures up to 50% lifetime launch discounts.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-8 block">100% Fully Refundable</span>
                  </div>

                  {/* Step 3 */}
                  <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white font-mono text-xs font-black">
                        03
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">Unlock Direct Channel</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                        Gain direct developer communication access. Help coordinate testing variables, suggest interface modifications, and vote on immediate roadmap priorities.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase mt-8 block">Direct Advisor Access</span>
                  </div>

                </div>

              </div>
            </section>

            {/* 6. System Architecture Roadmap */}
            <section id="timeline-roadmap" className="py-24 bg-white border-b border-slate-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 font-mono">
                    Development Timeline
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl font-sans">
                    System Architecture Milestones
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Our targeted milestones are triggered as consumer validation grows across Canadian provinces. Follow our timeline to the public general release.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3 font-mono text-left">
                  
                  {/* Phase 1 */}
                  <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-950" />
                    <div className="space-y-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-950 text-[8px] font-bold text-white uppercase tracking-wider">
                        Phase 01 • Active
                      </span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-950">
                        Pre-Launch Market Validation
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                        Aggregating early simulation results and securing Priority Queue reservations to prove solid consumer demand for hardware-free, privacy-first software.
                      </p>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200" />
                    <div className="space-y-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                        Phase 02 • Upcoming
                      </span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-950">
                        Private Alpha Sandbox Rollout
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                        Deploying initial sandboxed mobile software invitations to early waitlist contributors. Real-time focus analysis with isolated local memory validation.
                      </p>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200" />
                    <div className="space-y-4">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[8px] font-bold text-slate-500 uppercase tracking-wider">
                        Phase 03 • Scheduled
                      </span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-950">
                        Sovereign Driver Coach Release
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                        Public general debut of the offline-first driver awareness companion. Completely client-side execution, fully isolated local state, and zero third-party telemetry hooks.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* 7. Conversion Block (Prefinery Form Integration) */}
            <section id="prefinery-checkout" className="py-24 bg-slate-50 border-b border-slate-200">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10 text-center">
                
                <div className="mb-12 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 border border-slate-300 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 font-mono">
                    Priority Waitlist
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl font-sans">
                    Secure Your Priority Placement
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Establish your driver focus baseline, or reserve a priority alpha slot directly. Your fully refundable $5 reservation secures a lifetime 50% discount and priority key access.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm text-left max-w-xl mx-auto space-y-6">
                  
                  {/* High Trust Reservation Description */}
                  <div className="border-b border-slate-100 pb-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider font-mono">Waitlist Slot Allocation</h4>
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase">Fully Refundable</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      Our initial alpha cohort is restricted to maintain direct engineering support. Reserving your waitlist slot secures your priority queue position and helps fund sovereign, offline-first development.
                    </p>
                  </div>

                  {/* PREFINERY EMBED CONTAINER */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] flex flex-col justify-center">
                    {/* The requested prefinery embed form */}
                    <div className="prefinery-form-embed"></div>
                    <p className="text-[10px] text-slate-400 font-mono text-center uppercase tracking-wider mt-2">
                      * waitlist form loading dynamically via prefinery CDN
                    </p>
                  </div>

                  {/* Dual path instructions */}
                  <div className="grid gap-4 sm:grid-cols-2 text-xs pt-4 border-t border-slate-100 font-mono">
                    <div>
                      <p className="font-extrabold uppercase text-[9px] tracking-wider text-slate-900 mb-1">Path A: Simulator</p>
                      <p className="text-[10px] text-slate-500 leading-normal font-sans">
                        Take the 10-Question simulation first to record your regional fatigue exposure baseline.
                      </p>
                      <button
                        onClick={handleStartSimulation}
                        className="mt-3 text-[10px] text-slate-950 font-black hover:underline tracking-wider uppercase flex items-center gap-1 cursor-pointer"
                      >
                        <span>Start Simulator</span>
                        <span>→</span>
                      </button>
                    </div>
                    <div className="border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-4">
                      <p className="font-extrabold uppercase text-[9px] tracking-wider text-slate-900 mb-1">Path B: Priority Key</p>
                      <p className="text-[10px] text-slate-500 leading-normal font-sans">
                        Submit the registration above to lock in up to 50% lifetime discount privileges directly.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* 8. FAQ Section */}
            <section id="faq-section" className="py-24 sm:py-32 bg-white border-b border-slate-200/80 relative overflow-hidden">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 font-mono mb-4">
                    Support & Transparency
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed">
                    Get transparent answers on our technology mechanics, waitlist parameters, and absolute on-device privacy architecture.
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
                            ? "border-slate-300 border-l-slate-900 bg-white" 
                            : "border-slate-200 border-l-slate-300 bg-white hover:bg-slate-50/50"
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left transition-all cursor-pointer font-sans"
                        >
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-black font-mono px-2.5 py-1 rounded-md transition-all duration-250 shrink-0 ${
                              isOpen ? "bg-slate-100 text-slate-900" : "bg-slate-100 text-slate-500"
                            }`}>
                              {(idx + 1).toString().padStart(2, "0")}
                            </span>
                            <span className={`text-xs sm:text-[13px] font-black uppercase tracking-wider font-mono transition-colors duration-250 ${isOpen ? 'text-slate-950' : 'text-slate-800'}`}>
                              {item.q}
                            </span>
                          </div>
                          <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                            isOpen ? "bg-slate-100 border-slate-200 text-slate-900 rotate-180" : "bg-slate-50 border-slate-200 text-slate-400"
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
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-4 border-t border-slate-100 bg-slate-50/20 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium pl-14 pr-10">
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
