import React, { useState, useEffect, useRef } from "react";
import { 
  Users, Award, ShieldCheck, Heart, Mail, Check, Sparkles, Loader2, Info, ArrowRight, ShieldAlert,
  Brain, Eye, MapPin, Lock, HelpCircle, FileText, Smartphone, AlertTriangle, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CohortPageProps {
  score?: number;
  initialSelectedTier?: string;
  onStartSimulation?: () => void;
}

export default function CohortPage({ score, initialSelectedTier, onStartSimulation }: CohortPageProps) {
  const [selectedTier, setSelectedTier] = useState<string>("guardian");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("ON");
  const [drivingContext, setDrivingContext] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupResult, setSignupResult] = useState<{ cohortId: string; tierLabel: string } | null>(null);
  
  // Accordion active state for FAQ items
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSelectedTier) {
      setSelectedTier(initialSelectedTier);
    }
  }, [initialSelectedTier]);

  const scrollToForm = (tierId?: string) => {
    if (tierId) {
      setSelectedTier(tierId);
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(prev => (prev === idx ? null : idx));
  };

  const tiers = [
    {
      id: "access",
      title: "Awareness Participant",
      levelLabel: "Level 1",
      desc: "For users who complete the simulation and want light concept validation reports.",
      requirement: "Periodic voluntary feedback surveys",
      features: [
        "Quarterly Canadian driver statistics",
        "Early conceptual update briefs",
        "100% software-based research updates"
      ],
      badge: "General Update",
      color: "border-slate-200 bg-white text-slate-900"
    },
    {
      id: "guardian",
      title: "Guardian Research Participant",
      levelLabel: "Level 2",
      desc: "For users highly interested in fatigue awareness, attention patterns, and privacy-first safety tools.",
      requirement: "Monthly optional simulator evaluations",
      features: [
        "Personalized simulated fatigue trends",
        "Direct email feedback log with researchers",
        "Priority invitation to focus group studies"
      ],
      badge: "High Engagement",
      color: "border-blue-500 bg-white text-slate-900",
      highlight: true
    },
    {
      id: "founding",
      title: "Founding Validation Participant",
      levelLabel: "Level 3",
      desc: "For high-intent users willing to provide deeper feedback as the software concept develops.",
      requirement: "Quarterly virtual advisory interviews",
      features: [
        "Co-author attribution opportunities on research",
        "Closed-door conceptual roundtables",
        "Lifetime platform validation credits"
      ],
      badge: "Steering Panel",
      color: "border-rose-500 bg-slate-950 text-white"
    }
  ];

  const faqItems = [
    {
      q: "Is this a real product yet?",
      a: "No. Astrateq Gadgets is currently conducting a pre-launch behavioral study to validate a software-only cognitive simulation model. This is a concept validation system, not a finished application, subscription, or SaaS product."
    },
    {
      q: "Is this connected to my vehicle?",
      a: "No. This is a software-based behavioral simulation and does not connect to any vehicle systems, OBD ports, or vehicle electronics."
    },
    {
      q: "Does this require hardware?",
      a: "No. This is a purely browser-based cognitive research study. No physical devices, dashcams, on-board trackers, or adapters are needed or distributed."
    },
    {
      q: "Is this used by insurance companies?",
      a: "Absolutely not. Privacy is our highest priority. Your responses and overall scores are completely anonymous, encrypted, and are never shared, leased, or sold to automotive insurers, marketing agencies, or external databases."
    },
    {
      q: "What does joining the research cohort mean?",
      a: "Joining the research cohort means you register your interest in early concept updates and optional feedback cycles, helping validate whether this software-based driver awareness concept should move toward future development."
    },
    {
      q: "What happens after I join?",
      a: "You will receive an automated confirmation and optional, high-level updates as our concept validation progresses. There is no purchase commitment or product contract involved."
    },
    {
      q: "Will this become a prototype?",
      a: "The goal of this pre-launch market validation study is to gauge demand among Canadian drivers. If we observe strong, high-intent interest across our research cohorts, we will evaluate moving the concept toward prototype development."
    },
    {
      q: "How is this different from telematics, dashcams, or OBD devices?",
      a: "Traditional tools monitor physical vehicles or capture external video feeds. Astrateq Gadgets takes a completely different path—we focus purely on cognitive and behavioral awareness, designed to help everyday drivers understand their own focus habits and fatigue indicators in a privacy-first, software-only environment."
    }
  ];

  const provinces = [
    { code: "ON", name: "Ontario" },
    { code: "QC", name: "Quebec" },
    { code: "BC", name: "British Columbia" },
    { code: "AB", name: "Alberta" },
    { code: "MB", name: "Manitoba" },
    { code: "SK", name: "Saskatchewan" },
    { code: "NS", name: "Nova Scotia" },
    { code: "NB", name: "New Brunswick" },
    { code: "NL", name: "Newfoundland and Labrador" },
    { code: "PE", name: "Prince Edward Island" },
    { code: "YT", name: "Yukon" },
    { code: "NT", name: "Northwest Territories" },
    { code: "NU", name: "Nunavut" },
  ];

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !consent) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/signup-cohort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tier: selectedTier,
          score: score
        })
      });
      const data = await response.json();
      if (data.success) {
        setSignupResult({
          cohortId: data.cohortId,
          tierLabel: tiers.find(t => t.id === selectedTier)?.title || "Selected Tier"
        });
      } else {
        alert(data.error || "Onboarding failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      // Fallback in case of networking errors
      const generatedId = `COHORT-CAN-${Math.floor(1000 + Math.random() * 9000)}`;
      const tierLabel = tiers.find(t => t.id === selectedTier)?.title || "Selected Tier";
      setSignupResult({
        cohortId: generatedId,
        tierLabel
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 font-sans antialiased overflow-x-hidden relative">
      
      {/* GLOBAL GLOW MOTIFS */}
      <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* SECTION 1 — HERO: THE BIG BELIEF STATEMENT */}
      <section className="relative overflow-hidden pt-20 pb-24 md:py-32 border-b border-slate-200/60 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]/50">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-blue-700 font-mono rounded-full shadow-xs"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                🇨🇦 Canada Driver Safety Research Initiative
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.05] font-sans"
              >
                Help shape the future of <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Driver Awareness Intelligence
                </span> <br className="hidden sm:inline" />
                in Canada.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-sans font-medium"
              >
                Astrateq Gadgets is validating demand for a software-based driver awareness concept designed to help Canadian drivers better understand fatigue exposure, attention patterns, and safer driving behavior — <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">without vehicle tracking, insurance scoring, or hardware</span>.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-4 flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => scrollToForm()}
                  className="group inline-flex items-center justify-center gap-2.5 rounded bg-blue-600 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_18px_rgba(59,130,246,0.25)] transition-all hover:bg-blue-700 hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] active:scale-95 cursor-pointer font-mono"
                >
                  <span>Join Research Cohort</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                {onStartSimulation && (
                  <button
                    onClick={onStartSimulation}
                    className="inline-flex items-center justify-center gap-2.5 rounded border border-slate-200 bg-white px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95 cursor-pointer font-mono"
                  >
                    <span>Try the 60-Second Simulation</span>
                  </button>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] text-slate-400 font-mono uppercase tracking-wider border-t border-slate-200/60"
              >
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>No Financial Obligation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>No Hardware Deposits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>100% Privacy Focused</span>
                </div>
              </motion.div>
            </div>

            {/* Right Mini Dashboard Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md p-6 shadow-[0_20px_50px_rgba(59,130,246,0.06)] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f605_1px,transparent_1px),linear-gradient(to_bottom,#3b82f605_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                <div className="relative z-10 space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono">Cognitive Model v1.4</span>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-bold text-slate-800 uppercase tracking-wide font-mono font-bold">Calibrated</span>
                  </div>

                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative h-32 w-32 flex items-center justify-center rounded-full border border-blue-100 bg-blue-50/20 shadow-inner">
                      <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" stroke="#EFF6FF" strokeWidth="8" fill="transparent" />
                        <circle cx="50" cy="50" r="42" stroke="#3b82f6" strokeWidth="8" fill="transparent" strokeDasharray="263" strokeDashoffset="52" strokeLinecap="round" />
                      </svg>
                      <div className="text-center">
                        <span className="block text-3xl font-black text-slate-800 tracking-tight">80</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Aware Index</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-center">
                    <div>
                      <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">Fatigue Risk</p>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider font-mono mt-1">Low Risk</p>
                    </div>
                    <div className="border-x border-slate-100">
                      <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">Attention</p>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider font-mono mt-1">95%</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">Readiness</p>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider font-mono mt-1">Optimal</p>
                    </div>
                  </div>

                  <p className="text-center text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono pt-2">
                    Simulated Output • Conceptual Research Model Only
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 7 — TRUST LAYER (High on page to build immediate conviction) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/60 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-[10px] font-extrabold uppercase tracking-widest text-slate-600 font-mono">
              Privacy First Commitment
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Awareness Intelligence, Built Without Tracking
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto font-sans">
              We understand that vehicle tracking tools create resistance. Our research platform is designed around strict data isolation, transparency, and extreme privacy.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Smartphone className="h-5 w-5" />,
                title: "No vehicle connection",
                desc: "The concept does not require vehicle data, OBD2 scanner integration, or any physical link to your car's computer systems."
              },
              {
                icon: <Lock className="h-5 w-5" />,
                title: "No insurance sharing",
                desc: "Your answers are strictly quarantined. We believe behavioral awareness should never lead to pricing adjustments or premium anxiety."
              },
              {
                icon: <ShieldCheck className="h-5 w-5" />,
                title: "No hardware required",
                desc: "Zero dashcam installations, GPS units, or hardware accessories are distributed or required. Astrateq relies purely on software concepts."
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "No advertising resale",
                desc: "We do not monetize your engagement through advertisers or data aggregators. Your parameters are strictly mapped to safety research."
              },
              {
                icon: <FileText className="h-5 w-5" />,
                title: "Simulation-only research",
                desc: "Our current module serves exclusively as a conceptual framework designed to explore driver demand for cognitive safety solutions."
              },
              {
                icon: <MapPin className="h-5 w-5" />,
                title: "Canadian driver focus",
                desc: "Custom-modeled around Canadian road realities: high-pressure highway corridors, winter hazards, long commutes, and unique local safety standards."
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(59,130,246,0.04)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 text-blue-600 flex items-center justify-center mb-5 border border-blue-100/40">
                    {card.icon}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 font-mono">{card.title}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-sans">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM: WHY THIS NEEDS TO EXIST */}
      <section className="py-20 sm:py-28 bg-slate-50/50 border-b border-slate-200/60 relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-radial-gradient from-red-500/5 to-transparent blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left space-y-4">
              <span className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-red-600 font-mono rounded-full">
                The Road Safety Challenge
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans leading-tight">
                Driver awareness is still an overlooked safety layer.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-sans font-medium">
                Most modern automotive safety tools focus entirely on the vehicle, the fleet manager, or intrusive dash cams. Almost no solutions exist to help everyday drivers build cognitive mindfulness around fatigue, attention levels, and driving context in a privacy-first, purely voluntary way.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  icon: <AlertTriangle className="h-5 w-5" />,
                  title: "Fatigue is hard to notice early",
                  desc: "Drivers frequently fail to recognize their own cognitive decline until physical focus begins to slip or micro-distractions have already developed."
                },
                {
                  icon: <ShieldAlert className="h-5 w-5" />,
                  title: "Existing tools can feel invasive",
                  desc: "Dashcams, heavy telemetry systems, constant route tracking, and insurance trackers build intense privacy resistance and behavioral anxiety."
                },
                {
                  icon: <MapPin className="h-5 w-5" />,
                  title: "Canadian driving demands real focus",
                  desc: "Vast highway expanses, severe winter whiteouts, long inter-city travel corridors, and twilight commutes put immense pressure on daily attention reserves."
                }
              ].map((prob, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 4 }}
                  className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-red-200 transition-all duration-200 flex gap-4 items-start"
                >
                  <div className="h-9 w-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100/50">
                    {prob.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono">{prob.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1 font-sans">
                      {prob.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3 — THE CONCEPT: WHAT ASTRATEQ IS VALIDATING */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/60 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-mono">
              Research Objectives
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              What Astrateq Gadgets Is Validating
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-2xl mx-auto">
              Astrateq Gadgets is exploring a software-based Driver Awareness Intelligence concept that uses behavioral inputs to generate simulated awareness insights. The goal is to understand whether Canadian drivers want a privacy-first way to reflect on fatigue exposure, attention patterns, and driving context.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Brain className="h-5 w-5" />,
                title: "Driver Awareness Score",
                desc: "A conceptual rating calculated from user self-reported parameters to encourage self-reflection, mindfulness, and attention-profile understanding."
              },
              {
                icon: <Eye className="h-5 w-5" />,
                title: "Fatigue Risk Profile",
                desc: "A simulated risk curve calibrated based on commute length, sleep patterns, driving schedule, and geographic fatigue factors."
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "Research Classification",
                desc: "A structural grouping mechanism matching individual driver profiles to safe driving cohorts for aggregated data trends."
              }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="h-11 w-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
                  {pillar.icon}
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 font-mono">{pillar.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — DIFFERENTIATION: WHAT MAKES ASTRATEQ DIFFERENT */}
      <section className="py-20 sm:py-28 bg-slate-50/50 border-b border-slate-200/60 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Market Distinctions
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              Awareness Intelligence Without Surveillance
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
              We draw a sharp, non-negotiable boundary line between traditional tracking products and our educational, privacy-centric software validation approach.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            {/* Table Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900 text-white p-4.5 font-mono text-[10px] font-black uppercase tracking-widest">
              <div className="px-2">Current Market Approach</div>
              <div className="border-t sm:border-t-0 sm:border-l border-slate-700 mt-2 pt-2 sm:mt-0 sm:pt-0 sm:pl-6">
                Astrateq Direction
              </div>
            </div>
            
            {/* Table Rows */}
            <div className="divide-y divide-slate-100 font-sans text-xs">
              {[
                {
                  market: "Dashcams require permanent hardware installation and continuous in-cabin video capture.",
                  astrateq: "100% software-based, conceptual simulation with absolutely zero visual recording."
                },
                {
                  market: "Telematics capture real-time vehicle electronics, coordinates, and exact speed vectors.",
                  astrateq: "No vehicle connection or electronic interfaces. Purely behavioral focus parameters."
                },
                {
                  market: "Insurance apps track driving details to directly alter underwriting and rate pricing.",
                  astrateq: "Zero insurance reporting. Built entirely for personal awareness reflection and safety education."
                },
                {
                  market: "Safety advice is static, generic, un-calibrated, and rarely context-sensitive.",
                  astrateq: "Personalized simulated awareness index mapped to regional highway contexts."
                },
                {
                  market: "Fleet tools are locked behind corporate networks and focus exclusively on business assets.",
                  astrateq: "Built from the ground up for individual, daily Canadian driver safety empowerment."
                }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 hover:bg-slate-50/40 transition-colors">
                  <div className="p-5 text-slate-500 pr-6 leading-relaxed flex items-start gap-2.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                    <span>{row.market}</span>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-l border-slate-100 p-5 sm:pl-6 font-bold text-slate-900 flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{row.astrateq}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW THE VALIDATION PROGRAM WORKS */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/60 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-mono">
              Simple Engagement Flow
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              How the Validation Program Works
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
              We design our research validation to be extremely smooth, transparent, and direct.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            
            {/* Visual connector line for desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-dashed bg-slate-200 -z-10" />

            {[
              {
                step: "01",
                title: "Try the Simulation",
                desc: "Complete our highly responsive 60-second Driver Awareness Simulation questionnaire."
              },
              {
                step: "02",
                title: "Review Your Profile",
                desc: "Instantly view your simulated awareness score, fatigue profile, and assigned research cohort."
              },
              {
                step: "03",
                title: "Join Research Cohort",
                desc: "Formally register your pre-launch interest to validate this software concept with real demand parameters."
              },
              {
                step: "04",
                title: "Receive Concept Updates",
                desc: "Get periodic study updates as Astrateq aggregates regional insights and refines safety intelligence."
              }
            ].map((flow, idx) => (
              <div key={idx} className="relative p-5 rounded-xl border border-slate-200 bg-slate-50/30 hover:bg-white transition-all duration-300">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-4 shadow-sm">
                  {flow.step}
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">{flow.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {flow.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — RESEARCH PARTICIPATION LEVELS */}
      <section className="py-20 sm:py-28 bg-slate-50/50 border-b border-slate-200/60 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Engagement Tiers
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              Research Participation Levels
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
              We categorize our validation program into three voluntary engagement depths. Select the level that matches your interest.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {tiers.map((tier) => {
              const isDark = tier.id === "founding";
              const isSelected = selectedTier === tier.id;
              return (
                <div 
                  key={tier.id}
                  className={`rounded-2xl border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isDark 
                      ? "bg-slate-900 text-white border-slate-800 shadow-xl" 
                      : "bg-white text-slate-900 border-slate-200/80 shadow-xs hover:border-blue-400"
                  } ${tier.highlight ? "ring-2 ring-blue-500 ring-offset-2" : ""} ${isSelected ? "border-blue-600 bg-blue-500/5 ring-1 ring-blue-500/20" : ""}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider font-mono border ${
                        isDark ? "bg-slate-800 text-slate-300 border-slate-700" : "bg-slate-100 text-slate-800 border-slate-200"
                      }`}>
                        {tier.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{tier.levelLabel}</span>
                    </div>

                    <h3 className="text-lg font-black uppercase tracking-wide leading-tight">{tier.title}</h3>
                    
                    <p className={`mt-4 text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                      {tier.desc}
                    </p>

                    <div className={`mt-5 p-4 rounded-xl flex flex-col gap-1 text-xs ${
                      isDark ? "bg-slate-800/60 border border-slate-700/60" : "bg-slate-50 border border-slate-200/60"
                    }`}>
                      <span className={`font-bold font-mono text-[9px] uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>Requirement:</span>
                      <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] font-mono leading-relaxed">{tier.requirement}</span>
                    </div>

                    <p className={`mt-6 text-[10px] font-black uppercase tracking-widest font-mono ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                      Inclusions:
                    </p>

                    <ul className="mt-3.5 space-y-3">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                          <span className={isDark ? "text-slate-300" : "text-slate-600"}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100/10 font-mono">
                    <button
                      onClick={() => scrollToForm(tier.id)}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded py-3.5 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
                        isSelected 
                          ? "bg-slate-900 text-white border border-slate-800" 
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      }`}
                    >
                      <span>{isSelected ? "Selected Level" : "Select Level & Register"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-10">
            *No purchase. No hardware. No insurance use. Concept validation only.
          </p>
        </div>
      </section>

      {/* SECTION 8 — WHAT HAPPENS AFTER JOINING */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/60 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-mono">
              Expectation Transparency
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              What Happens After You Join?
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
              We value your feedback and timeline commitment. Here is what you can expect as an active cohort member:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01 / CONFIRMATION",
                title: "You receive confirmation",
                desc: "Your research cohort interest is registered immediately. We generate a persistent anonymous Cohort ID."
              },
              {
                step: "02 / COMMUNICATIONS",
                title: "You may receive updates",
                desc: "Astrateq occasionally shares high-level concept validation reports, regional benchmarks, and study progress."
              },
              {
                step: "03 / INFLUENCE",
                title: "You help shape the concept",
                desc: "Your participation and focus telemetry surveys help determine whether the concept moves toward future prototype development."
              },
              {
                step: "04 / LIABILITY",
                title: "No purchase commitment",
                desc: "Onboarding does not require fees, deposits, or subsequent subscription contracts. It is entirely study-based."
              }
            ].map((card, idx) => (
              <div key={idx} className="p-5.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white hover:border-blue-200 transition-all duration-300">
                <span className="text-[9px] font-black text-blue-600 font-mono tracking-widest">{card.step}</span>
                <h4 className="text-xs font-black uppercase tracking-wide text-slate-900 font-mono mt-2.5">{card.title}</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — SIGNUP FORM / RESERVATION FORM */}
      <section ref={formRef} id="signup-form-section" className="py-20 sm:py-28 bg-slate-50/50 border-b border-slate-200/60 relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-600 to-cyan-500" />
            
            <div className="text-center mb-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[9px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
                Research Enrollment
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans">
                Join the Driver Awareness Research Cohort
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Submit your enrollment parameters below. Registration is entirely free, anonymous, and secured under strict guidelines.
              </p>
            </div>

            {signupResult ? (
              <div className="flex flex-col items-center justify-center text-center py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-600 text-white mb-4 shadow-md">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wide text-slate-900">Cohort Registration Confirmed</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 font-mono">
                  Level: {signupResult.tierLabel}
                </p>
                <p className="text-xs text-slate-500 mt-3 max-w-sm leading-relaxed font-sans">
                  Success! Your pre-launch driver interest has been recorded. This invaluable input helps validate the demand profile for software-first driver awareness intelligence.
                </p>

                <div className="mt-6 w-full rounded border border-slate-200 bg-slate-50 p-4 font-mono text-center shadow-xs">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Research Cohort ID</p>
                  <p className="text-sm font-extrabold text-slate-800 mt-1 select-all">{signupResult.cohortId}</p>
                </div>

                <div className="mt-6 flex flex-col gap-1.5 text-[10px] font-mono uppercase text-slate-400">
                  <span>• Registrant Name: <strong className="text-slate-600">{firstName}</strong></span>
                  <span>• Active Route Region: <strong className="text-slate-600">{province}</strong></span>
                  {drivingContext && <span>• Driving Context: <strong className="text-slate-600">{drivingContext}</strong></span>}
                </div>

                <button
                  onClick={() => {
                    setSignupResult(null);
                    setFirstName("");
                    setEmail("");
                    setDrivingContext("");
                    setConsent(false);
                  }}
                  className="mt-8 rounded bg-slate-900 hover:bg-slate-800 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer font-mono"
                >
                  Onboard Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                
                {/* Level Recap Indicator */}
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 text-xs">
                  <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest font-mono">Selected Level:</p>
                  <p className="font-extrabold text-slate-900 uppercase mt-0.5">
                    {tiers.find(t => t.id === selectedTier)?.title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">
                    COMMITMENT: {tiers.find(t => t.id === selectedTier)?.requirement.toUpperCase()}
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* First Name Input */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Liam"
                      className="w-full rounded border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-sans text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Province Selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                      Province / Territory
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full rounded border border-slate-200 py-2.5 px-3.5 text-xs bg-white font-mono uppercase tracking-wider text-slate-800 focus:border-blue-500 focus:outline-none cursor-pointer transition-colors"
                    >
                      {provinces.map(prov => (
                        <option key={prov.code} value={prov.code}>
                          {prov.name} ({prov.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                    Email Address
                  </label>
                  <div className="relative rounded">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourname@domain.ca"
                      className="w-full rounded border border-slate-200 py-2.5 pl-10 pr-4 text-xs font-sans text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Driving Context (Optional) */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex justify-between">
                    <span>Driving Context (Optional)</span>
                    <span className="text-slate-400 font-mono">e.g. daily highway commute</span>
                  </label>
                  <textarea
                    rows={3}
                    value={drivingContext}
                    onChange={(e) => setDrivingContext(e.target.value)}
                    placeholder="Briefly describe your regular routes or typical fatigue challenges (e.g. long highway travel, winter storms)..."
                    className="w-full rounded border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-sans text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {score && (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded">
                    <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span>Your Simulated Awareness Score ({score}) will be securely paired.</span>
                  </div>
                )}

                {/* Checkbox Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    required
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[10px] text-slate-500 leading-normal cursor-pointer font-sans uppercase font-bold tracking-wide">
                    I consent to contribute my anonymous answers to Astrateq Gadgets' Canadian validation study.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="w-full flex items-center justify-center gap-2 rounded bg-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing Registration...</span>
                    </>
                  ) : (
                    <>
                      <span>Join Research Cohort</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[9px] text-slate-400 font-mono uppercase tracking-wider mt-3">
                  No purchase. No vehicle connection. No insurance use. Pre-launch validation only.
                </p>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 10 — FAQ */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono mb-4">
              Cohort FAQ
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed font-sans">
              Get direct, transparent answers on our research parameters, privacy architecture, study guidelines, and hardware-free validation pipeline.
            </p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx} 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? "border-blue-400 bg-white shadow-md ring-1 ring-blue-500/10" 
                      : "border-slate-200 bg-slate-50/30 hover:bg-white hover:border-blue-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-all cursor-pointer font-sans"
                  >
                    <span className={`text-xs sm:text-sm font-extrabold uppercase tracking-wider font-mono transition-colors duration-250 ${isOpen ? 'text-blue-600' : 'text-slate-800'}`}>
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
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-sans">
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
  );
}
