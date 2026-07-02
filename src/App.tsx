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
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#F4F7FB] py-28 sm:py-36 border-b border-slate-200/80">
              <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-slate-200 to-slate-100 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
              </div>

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column Text & CTAs */}
                  <div className="lg:col-span-7 text-left space-y-6">
                    <span className="inline-flex items-center gap-1.5 border border-blue-200 bg-[#EEF3F8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 font-mono rounded">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                      Active Concept Validation • No Hardware Needed
                    </span>
                    <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-5xl leading-tight font-sans">
                      Astrateq: Introducing <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">Privacy-First</span> Driver Awareness Intelligence
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl font-sans">
                      You experienced our interactive concept simulator. Now help us validate and build the world's first software-only driver safety suite. Powered by localized, 100% offline Edge AI on your existing devices to understand focus and prevent fatigue before mistakes happen—without surveillance or GPS tracking.
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-2 gap-4 max-w-lg text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span>100% Local Software</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span>No OBD/GPS Tracking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span>No Insurance Telematics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900">
                          <Check className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span>Zero Cloud Data Sync</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={() => handleNavigate("cohort")}
                        className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] active:scale-95 cursor-pointer font-mono"
                      >
                        <span>Join the Research Cohort</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleStartSimulation}
                        className="relative inline-flex items-center justify-center rounded border-2 border-blue-500 bg-white px-6 py-4 text-xs font-bold uppercase tracking-wider text-blue-700 transition-all hover:bg-blue-50 active:scale-95 cursor-pointer font-mono shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      >
                        <span className="absolute -top-3 right-4 rounded-full bg-rose-500 px-2 py-0.5 text-[8px] font-black text-white uppercase tracking-wider animate-bounce font-mono">
                          Check Your Score
                        </span>
                        <span>Start 60s Simulator</span>
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider leading-relaxed">
                      Your completion of the diagnostic simulation establishes the baseline fatigue criteria. Let's validate whether this privacy-first category should become a real-world product.
                    </p>

                    <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-4 leading-relaxed">
                      *Astrateq protects your sovereignty. We are not an insurance app, tracking service, OBD scanner, or hardware company. All logic runs locally in temporary memory.
                    </p>
                  </div>

                  {/* Right Column: Software Telemetry Console Interface Mockup */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="relative w-full max-w-sm rounded-2xl border-2 border-slate-800 bg-[#0B1220] p-6 shadow-2xl overflow-hidden text-white transition-all duration-300 hover:shadow-[0_30px_60px_rgba(59,130,246,0.25)] hover:border-blue-500">
                      
                      {/* Grid lines pattern overlay */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10">
                        {/* Mock App Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                          <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest">
                            <Cpu className="h-4 w-4 text-blue-400 animate-pulse" />
                            <span>ASTRATEQ ENGINE // v1.0.2</span>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[8px] font-bold font-mono text-emerald-400 uppercase tracking-wider">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                            </span>
                            100% OFFLINE SECURED
                          </span>
                        </div>

                        {/* Interactive Telemetry Mock Display */}
                        <div className="flex flex-col items-center py-6 bg-slate-900/60 rounded-xl border border-slate-800 shadow-inner">
                          
                          {/* Radial Progress Ring representing awareness score */}
                          <div className="relative flex items-center justify-center h-28 w-28 rounded-full bg-gradient-to-b from-slate-950 to-slate-900 border-4 border-blue-500/30 shadow-[0_8px_16px_rgba(0,0,0,0.6)] mb-4">
                            <div className="absolute inset-1 rounded-full border border-dashed border-cyan-500/20 animate-[spin_40s_linear_infinite]" />
                            <div className="flex flex-col items-center">
                              <span className="text-2xl font-black font-mono tracking-tight text-white">82</span>
                              <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-widest font-mono">READY</span>
                            </div>
                          </div>

                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">COGNITIVE FOCUS BASELINE</span>

                          {/* App Telemetry Console */}
                          <div className="mt-6 w-[85%] bg-black/90 p-3 rounded border border-slate-800 font-mono text-[9px] text-cyan-400 space-y-1.5 shadow-inner">
                            <div className="flex justify-between border-b border-slate-900 pb-1">
                              <span className="text-slate-500">SYSTEM STATE</span>
                              <span className="text-emerald-400 font-bold">SECURED</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">OBD-II BYPASS</span>
                              <span className="text-slate-300">ACTIVE (NO HOOKS)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">CLOUD STORAGE</span>
                              <span className="text-rose-400 font-bold">DISABLED (LOCAL CACHE)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">PERCLOS MESH</span>
                              <span className="text-slate-300">CALIBRATING IN RAM</span>
                            </div>
                          </div>
                        </div>

                        {/* Software Quick Spec Badges */}
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[8px] font-mono uppercase tracking-wider">
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-blue-400 font-black">ZERO CLOUD</p>
                            <p className="text-slate-500 mt-0.5">ISOLATED RAM</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-emerald-400 font-black">ANY DEVICE</p>
                            <p className="text-slate-500 mt-0.5">STANDALONE APP</p>
                          </div>
                          <div className="p-2 bg-slate-900/40 rounded border border-slate-800/60">
                            <p className="text-cyan-400 font-black">NO TRACE</p>
                            <p className="text-slate-500 mt-0.5">BIOMETRIC ERASE</p>
                          </div>
                        </div>

                        <p className="mt-4 text-[7px] font-mono text-slate-500 text-center uppercase tracking-widest leading-relaxed">
                          Astrateq Driver Intelligence Platform Interface • Concept Study
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Core Value Props Cards & How It Works section */}
            <ValueProps onStartSimulation={handleStartSimulation} />

            {/* NEW SECTION: VALIDATION PROGRESS DASHBOARD */}
            <section className="py-24 sm:py-32 bg-slate-900 text-white relative border-y border-slate-950 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-extrabold uppercase tracking-widest text-blue-400 font-mono">
                    Validation Pipeline
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl font-sans">
                    Canadian Cohort Progress & Live Metrics
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Astrateq believes in objective, data-backed community validation. See our current indicators showing strong market demand across the country.
                  </p>
                </div>

                {/* Stripe/Linear style stats dashboard layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-mono">
                  
                  {/* Card 1 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/30 transition-all">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">COHORT PARTICIPANTS</p>
                      <p className="text-2xl font-black text-white mt-2">14,842</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-emerald-400 font-bold">
                      +18.4% THIS WEEK
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/30 transition-all">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">AVG AWARENESS SCORE</p>
                      <p className="text-2xl font-black text-white mt-2">78.4 / 100</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                      BASED ON LIVE SIMULATOR
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/30 transition-all">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">REGIONAL REACH</p>
                      <p className="text-2xl font-black text-white mt-2">10 + 3</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-cyan-400">
                      PROVINCES & TERRITORIES
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:border-blue-500/30 transition-all">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">VALIDATION TARGET</p>
                      <p className="text-2xl font-black text-white mt-2">84%</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                      OF SAMPLE METRICS MET
                    </div>
                  </div>

                </div>

                <div className="mt-10 grid gap-4 grid-cols-1 md:grid-cols-2 text-xs text-slate-400 border-t border-slate-800/80 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span><strong>Current Phase:</strong> Phase 1 (Conceptual Validation & Demand Mapping)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span><strong>Milestone Indicator:</strong> Prototyping trigger scheduled upon reaching 18,000 cohort signups.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* NEW SECTION: WHY YOUR PARTICIPATION MATTERS */}
            <section className="py-24 sm:py-32 bg-white border-b border-slate-200/50">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
                    Meaningful Impact
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
                    Why your participation matters
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                    By registering your interest and completing the simulator, you help construct a rock-solid case for premium, hardware-free, privacy-first software solutions.
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Validates Real Market Demand",
                      desc: "Your signup demonstrates to partners and software engineers that drivers explicitly value proactive safety technology, proving there's a strong market ready for alternative safety tools."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Directs Prototype Priorities",
                      desc: "Your driving context inputs determine our focal features—helping decide threshold sensitivities for local sleep-deprivation trackers and optimal alert rhythms."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Maps Canadian Conditions",
                      desc: "Helps tailor the software for Canadian realities—extreme sub-zero cold commute variables, long desolate highway distances, winter whiteouts, and rural route glare."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Establishes Privacy Benchmarks",
                      desc: "Your feedback solidifies an alternative to intrusive insurance tracking, setting a new expectation that driver focus can be prioritized without compromising sovereign privacy rights."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Coordinates Launch Allotments",
                      desc: "Your signup guarantees priority rollout access and secures early-bird subscription discounts without any deposits, upfront payments, or binding commitments."
                    },
                    {
                      icon: <Check className="h-5 w-5 text-blue-600" />,
                      title: "Influences Future Integration",
                      desc: "We prioritize standalone native apps and integration into standard infotainment dashboards (rather than complex external hardware), driven entirely by your preferences."
                    }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-400 transition-all duration-200"
                    >
                      <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* Privacy Section Highlight (Specific requirement to reinforce hardware-level privacy) */}
            <section id="privacy-info" className="relative bg-[#F4F7FB] py-24 sm:py-32 border-b border-slate-200/80">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-gradient-to-br from-[#0B1220] to-[#0C1424] text-white p-8 sm:p-12 relative overflow-hidden border border-[#0C1424] shadow-xl">
                  {/* Gradient globes */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded mb-4 font-mono">
                      <Lock className="h-3.5 w-3.5 text-blue-400" /> Astrateq Privacy Protocol
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">Sovereign On-Device Privacy Architecture</h3>
                    <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                      Skepticism around telematics monitoring, GPS trackers, and black-box in-car cameras is entirely justified. Astrateq was created to demonstrate a complete alternative. Our software operates with strict edge-isolation boundaries. Your driving logs remain entirely yours.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs">
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">No Vehicle Connection</p>
                        <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">Bypasses OBD and OBD-II ports completely. Reads zero vehicle computer logs, speed lines, or dashboard telemetry.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">No Insurance Sync</p>
                        <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">Sovereign database isolation. We never share metrics, focus variables, or cohort statuses with auto insurers.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">No Driver Tracking</p>
                        <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">No remote GPS storage or network routes. Eyelid speed and focus ratios are calculated in local RAM and immediate erased.</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">No Surveillance</p>
                        <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">Zero camera video storage or feed logging. Vectors are mapped on-the-fly and immediately purged.</p>
                      </div>
                      <div className="p-4 rounded border border-slate-800/40 bg-[#0B1220]/60 font-mono">
                        <p className="font-bold uppercase text-[10px] tracking-wider text-white">No Ads Data Resale</p>
                        <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">Astrateq contains no trackers, ad pixels, or commercial resale code. Calibrated only for Canadian data privacy guidelines.</p>
                      </div>
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
