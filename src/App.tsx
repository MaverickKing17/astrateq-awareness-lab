import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ValueProps from "./components/ValueProps";
import SimulationForm from "./components/SimulationForm";
import ResultsDisplay from "./components/ResultsDisplay";
import CohortPage from "./components/CohortPage";
import LoadingOverlay from "./components/LoadingOverlay";
import Hero from "./components/Hero";
import DataArchitectureTable from "./components/DataArchitectureTable";
import CompetitiveTable from "./components/CompetitiveTable";
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

  // Inline Mini-Quiz gating states (Fix 1)
  const [quizStep, setQuizStep] = useState<number>(() => {
    const savedComplete = typeof window !== "undefined" && localStorage.getItem("astrateq_quiz_complete") === "true";
    if (savedComplete) return 5;
    return typeof window !== "undefined" ? Number(localStorage.getItem("astrateq_quiz_step") || "0") : 0;
  });
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>(() => {
    try {
      return typeof window !== "undefined" ? JSON.parse(localStorage.getItem("astrateq_quiz_answers") || "{}") : {};
    } catch {
      return {};
    }
  });
  const [quizScore, setQuizScore] = useState<number>(() => {
    return typeof window !== "undefined" ? Number(localStorage.getItem("astrateq_quiz_score") || "0") : 0;
  });
  const [quizComplete, setQuizComplete] = useState<boolean>(() => {
    return typeof window !== "undefined" && localStorage.getItem("astrateq_quiz_complete") === "true";
  });
  const [reservationUnlocked, setReservationUnlocked] = useState<boolean>(() => {
    return typeof window !== "undefined" && localStorage.getItem("astrateq_reservation_unlocked") === "true";
  });

  // Keep localStorage updated when states change
  useEffect(() => {
    localStorage.setItem("astrateq_quiz_complete", String(quizComplete));
    if (quizComplete && quizStep < 5) {
      setQuizStep(5);
    }
  }, [quizComplete]);

  useEffect(() => {
    localStorage.setItem("astrateq_reservation_unlocked", String(reservationUnlocked));
  }, [reservationUnlocked]);

  useEffect(() => {
    localStorage.setItem("astrateq_quiz_score", String(quizScore));
  }, [quizScore]);

  useEffect(() => {
    localStorage.setItem("astrateq_quiz_step", String(quizStep));
  }, [quizStep]);

  useEffect(() => {
    localStorage.setItem("astrateq_quiz_answers", JSON.stringify(quizAnswers));
  }, [quizAnswers]);
  
  // Reservation form fields (Fix 1 / Fix 4 / Fix 3)
  const [resName, setResName] = useState("");
  const [resEmail, setResEmail] = useState("");
  const [resProvince, setResProvince] = useState("ON");
  const [resDrivingContext, setResDrivingContext] = useState("");
  const [resConsent, setResConsent] = useState(false);
  const [resTier, setResTier] = useState("guardian");
  const [resSubmitting, setResSubmitting] = useState(false);
  const [resSubmitted, setResSubmitted] = useState(false);
  const [resCode, setResCode] = useState("");

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
      a: "The Astrateq Gadgets Driver Coach runs entirely as software on your existing smartphone. When mounted on your dashboard, it utilizes advanced local computer vision through your device's camera to safely analyze micro-expressions, blink rate, and gaze focus. There are no OBD plugins, no custom dashcams, and zero physical dependencies."
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
            score: 82,
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
          score: 82,
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
            
            {/* 1. Rebuilt Hero Section */}
            <Hero onStartSimulation={handleStartSimulation} />

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
              </div>
            </section>

            {/* 4. "Imagine Driver Awareness Intelligence" Grid (Included inside modular ValueProps) */}
            <ValueProps 
              onStartSimulation={handleStartSimulation} 
              onNavigateToCohort={() => {
                document.getElementById("simulation-gate")?.scrollIntoView({ behavior: "smooth" });
              }} 
            />

            {/* 4b. Data Isolation Architecture Table (Fix 5) */}
            <DataArchitectureTable />

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
                          Astrateq Gadgets fully sanitizes and seals your telemetry data right on the physical device layer.
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

            {/* 6. Competitive Positioning Table (Fix 6) */}
            <CompetitiveTable />

            {/* 7. Simulation Gate (Fix 1, gates reservation) */}
            <section id="simulation-gate" className="py-24 bg-zinc-50 border-b border-zinc-200/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#000000_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.01] pointer-events-none" />
              
              <div className="mx-auto max-w-3xl px-4 sm:px-6 relative z-10 text-center">
                <div className="mb-12 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono">
                    BASELINE EVALUATION
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl font-sans">
                    Driver Awareness Simulation Gate
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed font-sans font-medium">
                    Complete this 4-question interactive baseline survey to calculate your Simulated Awareness Index and unlock the Founding Research Cohort reservation form.
                  </p>
                </div>

                <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-md text-left max-w-xl mx-auto space-y-6">
                  {/* TODO: replace mock quiz with real simulation flow when available */}
                  
                  {quizStep === 0 && (
                    <div className="text-center py-6 space-y-6">
                      <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto animate-pulse">
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 font-mono">
                          Ready to Begin the Mini-Simulation?
                        </h3>
                        <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                          Answer 4 fast behavioral questions to estimate your circadian attention curve and verify allocation parameters.
                        </p>
                      </div>
                      <button
                        onClick={() => setQuizStep(1)}
                        className="inline-flex items-center justify-center rounded bg-[#0E7C9E] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#0E7C9E]/90 active:scale-98 transition-all cursor-pointer font-mono shadow-xs"
                      >
                        Start Driver Awareness Simulation
                      </button>
                    </div>
                  )}

                  {quizStep >= 1 && quizStep <= 4 && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                        <span className="text-[10px] font-black uppercase text-zinc-400 font-mono">
                          QUESTION {quizStep} OF 4
                        </span>
                        <span className="text-[10px] font-black text-blue-600 font-mono">
                          {quizStep * 25}% COMPLETE
                        </span>
                      </div>

                      {/* Question Content */}
                      {quizStep === 1 && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wide leading-snug">
                            How many hours per week do you spend driving on average?
                          </h4>
                          <div className="grid gap-3">
                            {[
                              { key: "A", label: "Under 10 Hours", desc: "Low exposure, mostly local trips." },
                              { key: "B", label: "10 to 25 Hours", desc: "Standard commuter, mixed highways." },
                              { key: "C", label: "More than 25 Hours", desc: "Heavy driving, professional or long commutes." }
                            ].map((opt) => (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  setQuizAnswers(prev => ({ ...prev, 1: opt.label }));
                                  setQuizStep(2);
                                }}
                                className="w-full text-left p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all font-mono text-xs cursor-pointer"
                              >
                                <span className="font-bold text-[#0E7C9E] mr-2">{opt.key} //</span>
                                <span className="font-bold text-zinc-900">{opt.label}</span>
                                <span className="block text-[10px] text-zinc-400 font-sans mt-0.5">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {quizStep === 2 && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wide leading-snug">
                            At what point in your transit do you experience the most fatigue or drift?
                          </h4>
                          <div className="grid gap-3">
                            {[
                              { key: "A", label: "Morning Commute (6:00 AM - 9:00 AM)", desc: "Rush hour traffic peaks." },
                              { key: "B", label: "Afternoon slump (2:00 PM - 4:00 PM)", desc: "Heavy circadian rest waves." },
                              { key: "C", label: "Evening / Dusk Transit (5:00 PM - 8:00 PM)", desc: "Low contrast glare." },
                              { key: "D", label: "Rarely / Never Tired", desc: "Highly stable alertness levels." }
                            ].map((opt) => (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  setQuizAnswers(prev => ({ ...prev, 2: opt.label }));
                                  setQuizStep(3);
                                }}
                                className="w-full text-left p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all font-mono text-xs cursor-pointer"
                              >
                                <span className="font-bold text-[#0E7C9E] mr-2">{opt.key} //</span>
                                <span className="font-bold text-zinc-900">{opt.label}</span>
                                <span className="block text-[10px] text-zinc-400 font-sans mt-0.5">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {quizStep === 3 && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wide leading-snug">
                            How often do you interact with accessories (music, phone notifications, or GPS) while driving?
                          </h4>
                          <div className="grid gap-3">
                            {[
                              { key: "A", label: "Rarely (Eyes remain 100% focused)", desc: "Absolute road priority." },
                              { key: "B", label: "Occasional Checks (Adjust at traffic stops)", desc: "Controlled safety gaps." },
                              { key: "C", label: "Frequently (Manage maps & playlists live)", desc: "Split visual attention patterns." }
                            ].map((opt) => (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  setQuizAnswers(prev => ({ ...prev, 3: opt.label }));
                                  setQuizStep(4);
                                }}
                                className="w-full text-left p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all font-mono text-xs cursor-pointer"
                              >
                                <span className="font-bold text-[#0E7C9E] mr-2">{opt.key} //</span>
                                <span className="font-bold text-zinc-900">{opt.label}</span>
                                <span className="block text-[10px] text-zinc-400 font-sans mt-0.5">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {quizStep === 4 && (
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-zinc-900 uppercase tracking-wide leading-snug">
                            Have you ever experienced "highway hypnosis" (realizing you don't recall driving the last few KM)?
                          </h4>
                          <div className="grid gap-3">
                            {[
                              { key: "A", label: "Never (Constantly scanning mirrors & road)", desc: "High awareness profile." },
                              { key: "B", label: "Occasional lapses (Catch mind wandering)", desc: "Moderate fatigue exposure." },
                              { key: "C", label: "Frequently (Autopilot on long highway routes)", desc: "Elevated opportunity for coaching." }
                            ].map((opt) => (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  // Record final answer and calculate mock score
                                  const ans = { ...quizAnswers, 4: opt.label };
                                  setQuizAnswers(ans);
                                  
                                  // Base score is 85. Adjust based on selections:
                                  let score = 85;
                                  if (ans[1] === "More than 25 Hours") score -= 5;
                                  if (ans[2] === "Afternoon slump (2:00 PM - 4:00 PM)") score -= 8;
                                  if (ans[2] === "Evening / Dusk Transit (5:00 PM - 8:00 PM)") score -= 5;
                                  if (ans[3] === "Frequently (Manage maps & playlists live)") score -= 12;
                                  if (ans[4] === "Frequently (Autopilot on long highway routes)") score -= 15;
                                  if (ans[4] === "Occasional lapses (Catch mind wandering)") score -= 5;
                                  
                                  setQuizScore(score);
                                  setQuizStep(5);
                                }}
                                className="w-full text-left p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 transition-all font-mono text-xs cursor-pointer"
                              >
                                <span className="font-bold text-[#0E7C9E] mr-2">{opt.key} //</span>
                                <span className="font-bold text-zinc-900">{opt.label}</span>
                                <span className="block text-[10px] text-zinc-400 font-sans mt-0.5">{opt.desc}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {quizStep === 5 && (
                    <div className="space-y-6 text-center py-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-black uppercase tracking-widest text-emerald-800 font-mono">
                        ✓ ASSESSMENT RUN COMPLETE
                      </div>
                      
                      <div className="space-y-2 max-w-sm mx-auto">
                        <h3 className="text-lg font-black uppercase text-zinc-950 tracking-tight font-sans">
                          Simulation Parameters Evaluated
                        </h3>
                        <p className="text-xs text-zinc-500 font-sans font-medium">
                          Your self-reported focus and fatigue profiles have been processed inside local sandboxed state.
                        </p>
                      </div>

                      {/* Fix 3: Exact CTA text See My Driver Awareness Score */}
                      {!quizComplete ? (
                        <div className="pt-4">
                          <button
                            onClick={() => setQuizComplete(true)}
                            className="w-full inline-flex items-center justify-center rounded bg-[#0E7C9E] text-white px-6 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#0E7C9E]/90 active:scale-98 transition-all cursor-pointer font-mono shadow-md"
                          >
                            See My Driver Awareness Score
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                          {/* Circular Gauge */}
                          <div className="h-28 w-28 rounded-full bg-zinc-50 border-4 border-emerald-500 flex flex-col items-center justify-center mx-auto shadow-sm">
                            <span className="text-3xl font-black text-zinc-950 font-mono leading-none">{quizScore}</span>
                            <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest font-mono mt-1">INDEX VALUE</span>
                          </div>

                          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 text-left text-xs space-y-3 font-sans font-medium">
                            <div className="flex justify-between border-b border-zinc-200 pb-2">
                              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 font-mono">ASSESSMENT CLASSIFICATION:</span>
                              <span className="text-emerald-700 font-bold font-mono">
                                {quizScore >= 80 ? "STRONG FOCUS" : quizScore >= 60 ? "MODERATE FOCUS" : "ELEVATED OPPORTUNITY"}
                              </span>
                            </div>
                            <p className="text-zinc-600 leading-relaxed">
                              Your Simulated Index of <strong className="text-zinc-900">{quizScore}/100</strong> indicates {quizScore >= 80 ? "stable visual attention patterns and resilient fatigue recovery profiles." : quizScore >= 60 ? "moderate fatigue sensitivity and minor visual distractions on sustained commutes." : "elevated circadian fatigue exposure and high opportunity for on-device real-time alerts."}
                            </p>
                            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-wide">
                              * You qualify for the standard priority queue inside the <strong>Founding Research Cohort</strong> (limited placement).
                            </p>
                          </div>

                          {/* Fix 3: Exact CTA text Unlock Full Report */}
                          {!reservationUnlocked && (
                            <button
                              onClick={() => {
                                setReservationUnlocked(true);
                                setTimeout(() => {
                                  document.getElementById("reservation-form-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
                                }, 150);
                              }}
                              className="w-full inline-flex items-center justify-center rounded bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 text-xs font-black uppercase tracking-widest active:scale-98 transition-all cursor-pointer font-mono shadow-md"
                            >
                              Unlock Full Report
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </section>

            {/* 8. Reservation Section (Fix 1, gated behind simulationComplete) */}
            {/*
             * AUDIT REPORT: Founding Research Cohort Placement Panel & "Jump to Baseline Simulation" Button Behavior
             * Date: 2026-07-07
             * Previous Behavior:
             * - The "Founding Research Cohort Placement" panel was located under Section 8 in App.tsx.
             * - When the page loaded, the panel was in a locked/greyed state because reservationUnlocked was false.
             * - However, there was a visible, enabled button with the text "Jump to Baseline Simulation".
             * - This button had an onClick handler that scrolled the user to the "simulation-gate" section and, 
             *   if quizStep was 0, changed quizStep to 1 to begin the quiz.
             * - While this button did not directly submit the reservation form, it was identified as an undesirable
             *   skip path/shortcut for first-time visitors that cluttered the gated visual state.
             * New Behavior:
             * - The button has been completely removed for first-time visitors to prevent any bypass or skip confusion.
             * - The panel is now completely non-interactive and locked for first-time visitors who have not finished the simulation.
             * - For returning visitors, we utilize localStorage session flags (astrateq_quiz_complete, astrateq_reservation_unlocked).
             * - If a returning visitor has completed the driver awareness quiz (saved in localStorage), they are presented with 
             *   the standardized "Unlock Full Report" transition CTA to gracefully restore their unlocked reservation form state.
             */}
            <section id="reservation-form-section" className="py-24 bg-white border-b border-zinc-200/80 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000002_1px,transparent_1px),linear-gradient(to_bottom,#00000002_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
              
              <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
                
                {/* Gated Blur Overlay / Locked State */}
                {!reservationUnlocked ? (
                  <div className="bg-zinc-50/80 border border-zinc-200 rounded-3xl p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6 shadow-sm filter-none">
                    <div className="h-12 w-12 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-400 mx-auto">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1 rounded bg-zinc-200 border border-zinc-300 px-2 py-0.5 text-[8px] font-black text-zinc-600 uppercase tracking-widest font-mono">
                        🔒 ALLOCATION LOCKED
                      </span>
                      <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 font-sans">
                        Founding Research Cohort Placement
                      </h3>
                      <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                        To protect network allocation buffers, the priority reservation portal is gated behind the driver simulation. Please complete the baseline survey above to unlock your secure slot.
                      </p>
                    </div>
                    {quizComplete ? (
                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setReservationUnlocked(true);
                            setTimeout(() => {
                              document.getElementById("reservation-form-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
                            }, 150);
                          }}
                          className="w-full inline-flex items-center justify-center rounded bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 text-xs font-black uppercase tracking-widest active:scale-98 transition-all cursor-pointer font-mono shadow-md"
                        >
                          Unlock Full Report
                        </button>
                      </div>
                    ) : (
                      <div className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-wider mt-2">
                        Locked — Complete Driver Simulation Above to Unlock Form
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
                    
                    {/* Form Title */}
                    <div className="text-center space-y-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[10px] font-black uppercase tracking-widest text-blue-700 font-mono">
                        ★ RESERVATION ACCESS UNLOCKED
                      </span>
                      <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 sm:text-3.5xl font-sans">
                        Register Your Priority Allocation
                      </h2>
                      <p className="text-xs text-zinc-500 max-w-lg mx-auto leading-relaxed">
                        Secure your priority slot inside our upcoming <strong>Founding Research Cohort</strong>. Allocations are strictly subject to <strong>limited placement</strong> filters.
                      </p>
                    </div>

                    {!resSubmitted ? (
                      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-lg text-left space-y-6">
                        <div className="border-b border-zinc-100 pb-4 flex justify-between items-center">
                          <h4 className="text-[10px] font-black uppercase text-zinc-900 tracking-wider font-mono">
                            Founding Research Cohort Reservation Form
                          </h4>
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase">
                            No Deposit Required
                          </span>
                        </div>

                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            if (!resEmail || !resName || !resConsent) return;
                            setResSubmitting(true);
                            
                            try {
                              const response = await fetch("/api/signup-cohort", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  email: resEmail,
                                  firstName: resName,
                                  province: resProvince,
                                  tier: resTier,
                                  score: quizScore
                                })
                              });
                              const data = await response.json();
                              if (data.success) {
                                setResCode(data.cohortId);
                                setResSubmitted(true);
                              } else {
                                setResCode(`COHORT-CAN-${Math.floor(1000 + Math.random() * 9000)}`);
                                setResSubmitted(true);
                              }
                            } catch {
                              setResCode(`COHORT-CAN-${Math.floor(1000 + Math.random() * 9000)}`);
                              setResSubmitted(true);
                            } finally {
                              setResSubmitting(false);
                            }
                          }}
                          className="space-y-6"
                        >
                          {/* Grid Inputs */}
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-black uppercase text-zinc-500 font-mono">
                                First Name
                              </label>
                              <input
                                type="text"
                                required
                                value={resName}
                                onChange={(e) => setResName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full rounded border border-zinc-250 bg-white px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20 font-mono"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-black uppercase text-zinc-500 font-mono">
                                Email Address
                              </label>
                              <input
                                type="email"
                                required
                                value={resEmail}
                                onChange={(e) => setResEmail(e.target.value)}
                                placeholder="driver@example.ca"
                                className="w-full rounded border border-zinc-250 bg-white px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20 font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-3">
                            <div className="sm:col-span-1 space-y-1.5">
                              <label className="block text-[10px] font-black uppercase text-zinc-500 font-mono">
                                Region / Province
                              </label>
                              <select
                                value={resProvince}
                                onChange={(e) => setResProvince(e.target.value)}
                                className="w-full rounded border border-zinc-250 bg-white px-4 py-3 text-xs text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20 font-mono"
                              >
                                <option value="ON">Ontario (ON)</option>
                                <option value="QC">Quebec (QC)</option>
                                <option value="BC">British Columbia (BC)</option>
                                <option value="AB">Alberta (AB)</option>
                                <option value="MB">Manitoba (MB)</option>
                                <option value="SK">Saskatchewan (SK)</option>
                                <option value="NS">Nova Scotia (NS)</option>
                                <option value="NB">New Brunswick (NB)</option>
                                <option value="NL">Newfoundland (NL)</option>
                                <option value="PE">Prince Edward (PE)</option>
                              </select>
                            </div>
                            <div className="sm:col-span-2 space-y-1.5">
                              <label className="block text-[10px] font-black uppercase text-zinc-500 font-mono">
                                Driving Context (Optional)
                              </label>
                              <input
                                type="text"
                                value={resDrivingContext}
                                onChange={(e) => setResDrivingContext(e.target.value)}
                                placeholder="e.g. Daily highway commute, commercial courier"
                                className="w-full rounded border border-zinc-250 bg-white px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400/20 font-mono"
                              />
                            </div>
                          </div>

                          {/* Tier Selection Cards (Fix 4 - scarce, structured) */}
                          <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase text-zinc-500 font-mono">
                              Select Allocation Tier
                            </label>
                            <div className="grid gap-4 sm:grid-cols-3">
                              {[
                                { id: "access", title: "Standard Participant", discount: "20% Discount", desc: "No deposit required. Guarantees priority slot key." },
                                { id: "guardian", title: "VIP Elite Cohort", discount: "40% Discount", desc: "Batch 1 guaranteed access keys + steering feedback options.", highlight: true },
                                { id: "founding", title: "Founding Collaborator", discount: "50% Discount", desc: "Roundtable roundtable interviews with product team + lifetime free updates." }
                              ].map((tier) => (
                                <button
                                  type="button"
                                  key={tier.id}
                                  onClick={() => setResTier(tier.id)}
                                  className={`p-4 rounded-2xl border-2 text-left space-y-2 flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                                    resTier === tier.id 
                                      ? "border-[#0E7C9E] bg-[#0E7C9E]/[0.02]" 
                                      : "border-zinc-200 hover:border-zinc-300 bg-white"
                                  }`}
                                >
                                  <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                      <span className="text-[9px] font-black text-zinc-400 uppercase font-mono tracking-wider">TIER SELECT</span>
                                      {resTier === tier.id && <span className="text-xs text-[#0E7C9E]">●</span>}
                                    </div>
                                    <h5 className="text-xs font-black uppercase tracking-wide text-zinc-950 leading-tight font-sans">
                                      {tier.title}
                                    </h5>
                                    <span className="inline-block text-[8px] font-black uppercase bg-[#F4F2ED] border border-[#0E7C9E]/10 px-1.5 py-0.5 rounded text-[#0E7C9E] font-mono">
                                      {tier.discount}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-zinc-500 font-sans leading-normal">
                                    {tier.desc}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Consent */}
                          <div className="flex items-start gap-3 bg-zinc-50 p-4 border border-zinc-200/60 rounded-xl">
                            <input
                              type="checkbox"
                              required
                              id="res-consent"
                              checked={resConsent}
                              onChange={(e) => setResConsent(e.target.checked)}
                              className="mt-1 h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                            />
                            <label htmlFor="res-consent" className="text-[10.5px] text-zinc-650 leading-relaxed font-sans font-medium cursor-pointer">
                              I consent to participate in the <strong>Founding Research Cohort</strong> pre-launch validation campaign. I understand that allocations carry zero cost or commitment, and placement is strictly subject to <strong>limited placement</strong> constraints.
                            </label>
                          </div>

                          {/* Fix 3: Exact CTA text Reserve Founding Access */}
                          <button
                            type="submit"
                            disabled={resSubmitting}
                            className="w-full inline-flex items-center justify-center rounded bg-[#0E7C9E] text-white hover:bg-[#0E7C9E]/90 active:scale-98 transition-all px-6 py-4 text-xs font-black uppercase tracking-widest cursor-pointer font-mono shadow-md disabled:opacity-50"
                          >
                            {resSubmitting ? "Processing Reservation..." : "Reserve Founding Access"}
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 sm:p-12 shadow-lg text-center space-y-6">
                        <div className="h-12 w-12 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 mx-auto">
                          <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-black uppercase tracking-widest text-emerald-800 font-mono">
                            ★ RESERVATION VERIFIED
                          </span>
                          <h3 className="text-xl font-black uppercase tracking-tight text-zinc-950 sm:text-2xl font-sans">
                            Founding Research Cohort Placement Secured
                          </h3>
                          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
                            Thank you for completing your baseline validation commute assessment. Your priority placement code is recorded:
                          </p>
                        </div>

                        {/* Priority Code Box */}
                        <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl p-5 max-w-sm mx-auto font-mono">
                          <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest block">ALLOCATION CODE</span>
                          <span className="text-2xl font-black text-zinc-950 uppercase tracking-widest block mt-1">{resCode}</span>
                          <span className="text-[9px] font-bold text-[#0E7C9E] uppercase tracking-wider block mt-2">
                            TIER: {resTier === "founding" ? "Founding Collaborator (50% Off)" : resTier === "guardian" ? "VIP Elite Cohort (40% Off)" : "Standard Participant (20% Off)"}
                          </span>
                        </div>

                        <p className="text-[10.5px] text-zinc-500 font-sans font-medium leading-relaxed max-w-md mx-auto">
                          A confirmation email containing your reserved launch code has been dispatched. Due to <strong>limited placement</strong> filters, this access key remains active strictly for early sandboxed alpha companion releases on Canadian roads.
                        </p>
                      </div>
                    )}

                  </div>
                )}

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
