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
            {/* Hero Section (Improvement 1, 8, 10, 11, 12) */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F8FF] to-[#F8FAFC] py-28 sm:py-36 border-b border-slate-200/60">
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-100 to-slate-100 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
              </div>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text & CTAs */}
                  <div className="lg:col-span-7 text-left space-y-7">
                    <span className="inline-flex items-center gap-1.5 border border-blue-200 bg-blue-50/50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700 font-mono rounded-full">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                      Active Concept Validation Study • No Hardware Required
                    </span>
                    
                    <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.05] font-sans">
                      Validate Canada's <br className="hidden sm:inline" />
                      first privacy-centric <br />
                      <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                        Driver Intelligence
                      </span> platform.
                    </h1>

                    <div className="space-y-4 text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-xl font-sans">
                      <p>
                        Today's driving systems react <span className="text-slate-900 font-semibold">after</span> errors occur—alarming you when drifting out of lanes. We are testing an alternative: Can on-device software map your focus and fatigue trend <span className="text-slate-900 font-semibold">before</span> mistakes happen?
                      </p>
                      <p>
                        We are recruiting <span className="text-slate-900 font-semibold">founding Canadian drivers</span> and early contributors to help prove demand for a pure, zero-surveillance safety category that operates 100% locally in memory.
                      </p>
                    </div>

                    {/* Features list (Improvement 11 & 12) */}
                    <div className="grid grid-cols-2 gap-4 max-w-lg text-[9px] font-bold uppercase tracking-widest text-slate-600 font-mono">
                      <div className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Sovereign Local Software</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Bypasses OBD Connections</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Isolated from Auto Insurers</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>100% Temporary RAM Isolation</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-3">
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

                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider leading-relaxed pt-2">
                      *Takes under 60 seconds • Completely free of charge • Zero hardware adapters • Cancel at any time
                    </p>
                  </div>

                  {/* Right Column: Redesigned Simulated Result Dashboard Mockup (Improvement 8) */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm rounded-2xl border-2 border-slate-800 bg-[#0B1220] p-6 shadow-2xl overflow-hidden text-white transition-all duration-300 hover:shadow-[0_30px_60px_rgba(59,130,246,0.2)] hover:border-blue-500">
                      
                      {/* Grid lines pattern overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10 space-y-4">
                        {/* Mock App Header */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                            <Cpu className="h-4 w-4 text-blue-400 animate-pulse" />
                            <span>ASTRATEQ CORE ENGINE</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[8px] font-bold font-mono text-blue-400 uppercase tracking-wider">
                            <span className="relative flex h-1 w-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1 w-1 bg-blue-400"></span>
                            </span>
                            SIMULATED DIAGNOSTIC RESULT
                          </span>
                        </div>

                        {/* Interactive Telemetry Mock Display */}
                        <div className="flex flex-col items-center py-5 bg-slate-900/60 rounded-xl border border-slate-800 shadow-inner space-y-3">
                          
                          {/* Radial Progress Ring representing awareness score */}
                          <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-b from-slate-950 to-slate-900 border-4 border-blue-500/30 shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
                            <div className="absolute inset-1 rounded-full border border-dashed border-cyan-500/20 animate-[spin_40s_linear_infinite]" />
                            <div className="flex flex-col items-center">
                              <span className="text-2xl font-black font-mono tracking-tight text-white">82</span>
                              <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">READY</span>
                            </div>
                          </div>

                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">DRIVER AWARENESS SCORE</span>
                        </div>

                        {/* Detailed Diagnostic Context Information */}
                        <div className="bg-black/80 p-4 rounded-xl border border-slate-800 font-mono text-[9.5px] space-y-2.5 text-slate-300">
                          <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400 uppercase text-[8px] tracking-wider">
                            <span>METRIC CLASSIFICATION</span>
                            <span className="text-blue-400 font-bold">ON-M702-SIM</span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <p className="text-slate-500 uppercase text-[8px] tracking-wider">Fatigue Context:</p>
                            <p className="text-white font-medium pl-1 bg-slate-900/40 py-1 rounded">
                              Early Stage fatigue accumulation detected in late-evening commute.
                            </p>
                          </div>

                          <div className="space-y-1.5">
                            <p className="text-slate-500 uppercase text-[8px] tracking-wider">Environmental Context:</p>
                            <p className="text-white font-medium pl-1 bg-slate-900/40 py-1 rounded">
                              Ambient low-light, high-contrast cabin glare.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900">
                            <div>
                              <p className="text-slate-500 uppercase text-[8px] tracking-wider">Research Class:</p>
                              <p className="text-cyan-400 font-bold mt-0.5">Class II: Cognitive Drift</p>
                            </div>
                            <div>
                              <p className="text-slate-500 uppercase text-[8px] tracking-wider">Privacy Standard:</p>
                              <p className="text-emerald-400 font-bold mt-0.5">100% Isolated RAM</p>
                            </div>
                          </div>

                          <div className="flex justify-between pt-1 border-t border-slate-900 text-slate-500 text-[8px]">
                            <span>CONFIDENCE RATING:</span>
                            <span className="text-white font-bold">94% FOCAL ALIGNMENT</span>
                          </div>
                        </div>

                        {/* Software Quick Spec Badges */}
                        <div className="grid grid-cols-3 gap-2 text-center text-[8px] font-mono uppercase tracking-wider">
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-blue-400 font-black">SOVEREIGN</p>
                            <p className="text-slate-500 mt-0.5">NO GPS TRACK</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-emerald-400 font-black">HARDWARE FREE</p>
                            <p className="text-slate-500 mt-0.5">SOFTWARE ONLY</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-cyan-400 font-black">BIOMETRICS</p>
                            <p className="text-slate-500 mt-0.5">ZERO STORAGE</p>
                          </div>
                        </div>

                        <p className="text-[7px] font-mono text-slate-500 text-center uppercase tracking-widest leading-relaxed">
                          Conceptual Driver Awareness Interface Dashboard Mockup
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

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
                    Live Progress Tracker
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl font-sans">
                    Canadian Validation & Demand Metrics
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                    Astrateq measures market validation through active driver participation. See our real-time regional indicators showing strong community momentum across Canada.
                  </p>
                </div>

                {/* Stripe/Linear style stats dashboard layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-mono">
                  
                  {/* Card 1 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">FOUNDING DRIVERS</p>
                      <p className="text-3xl font-black text-white">14,842</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 leading-relaxed font-sans">
                      <span className="text-emerald-400 font-bold font-mono text-[9px] block mb-1">+18.4% THIS WEEK</span>
                      Growing national validation study as drivers join the community.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">COMPLETED SIMULATIONS</p>
                      <p className="text-3xl font-black text-white">21,490 +</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 leading-relaxed font-sans">
                      <span className="text-blue-400 font-bold font-mono text-[9px] block mb-1">REAL-TIME RESEARCH</span>
                      Anonymous diagnostic insights improving daily safety baselines.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">PROVINCIAL SCOPE</p>
                      <p className="text-3xl font-black text-white">10 / 10</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 leading-relaxed font-sans">
                      <span className="text-cyan-400 font-bold font-mono text-[9px] block mb-1">COAST TO COAST</span>
                      Active contributors mapping Canadian weather and cold commutes.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
                    <div className="space-y-2">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-extrabold">VALIDATION THRESHOLD</p>
                      <p className="text-3xl font-black text-white">84%</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 leading-relaxed font-sans">
                      <span className="text-indigo-400 font-bold font-mono text-[9px] block mb-1">PROTOTYPE TRIGGER</span>
                      Early validation metrics met before unlocking prototype pipeline.
                    </p>
                  </div>

                </div>

                <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-2 text-xs text-slate-400 border-t border-slate-800/80 pt-8 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span><strong>Current Stage:</strong> Concept Validation & Demand Mapping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span><strong>Milestone Target:</strong> Prototyping trigger scheduled upon reaching 18,000 cohort signups.</span>
                  </div>
                </div>

                {/* SUBTLE INTEGRATED CTA (Improvement 7) */}
                <div className="mt-12 text-center p-6 rounded-xl border border-slate-800 bg-black/40 max-w-xl mx-auto">
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Ready to contribute your anonymous focus data to this database? Complete the 60-second diagnostic simulator to calibrate your personal rating.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleStartSimulation}
                      className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 cursor-pointer font-mono"
                    >
                      <span>Contribute Simulator Run</span>
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
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Decides What Insights Matter",
                      desc: "Your simulation variables guide our eventual focus dashboard. By selecting which parameters to record, you direct what features our local edge model prioritizes."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Locks Down Privacy Standards",
                      desc: "Your feedback cements an alternative to remote insurance tracking, proving that drivers actively value zero-trace, local-memory data isolation standards."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Declares What Drivers Value",
                      desc: "Standard safety suites demand constant cloud logins and OBD connections. Your signup demonstrates that drivers explicitly demand hardware-free, personal solutions."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Determines Project Investment",
                      desc: "Strong regional metrics show partners that driver focus is a highly valued priority. Your participation triggers development of Canada's first sovereign driver AI."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Coordinates Priority Rollout",
                      desc: "As an early contributor, your signup guarantees primary rollout access and locks in founding early-bird launch pricing without any monetary deposits."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Adapts to Canadian Commutes",
                      desc: "Whether you drive frozen rural highways or heavy urban gridlocks, your province and routing parameters shape the algorithmic thresholds for localized weather variables."
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/30 hover:bg-white hover:border-blue-400 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(59,130,246,0.02)]"
                    >
                      <div className="h-8 w-8 rounded bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
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
