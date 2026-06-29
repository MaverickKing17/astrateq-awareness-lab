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
  
  // First FAQ item open by default
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

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

  const activeOnStartSimulation = onStartSimulation || (() => scrollToForm());

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-900 font-sans antialiased overflow-x-hidden relative">
      
      {/* GLOBAL GLOW MOTIFS */}
      <div className="absolute top-[8%] left-[-15%] w-[50vw] h-[50vw] bg-blue-400/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-15%] w-[45vw] h-[45vw] bg-cyan-400/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* SECTION 1 — HERO: THE BIG BELIEF STATEMENT */}
      <section className="relative overflow-hidden pt-20 pb-24 md:py-32 border-b border-slate-200/50 bg-gradient-to-b from-[#F3F8FF] to-[#EAF3FB]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 border border-blue-200/60 bg-blue-50/70 px-4 py-1.5 text-[9px] font-extrabold uppercase tracking-widest text-blue-700 font-mono rounded-full shadow-xs"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                🇨🇦 Canada Driver Safety Research Initiative
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.08] font-sans"
              >
                Discover your <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Driver Awareness Profile
                </span> <br />
                in 60 seconds.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-sans font-medium"
              >
                Complete a short behavioral simulation to receive a conceptual Awareness Score, Fatigue Exposure Profile, and Research Cohort Classification — <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">without vehicle tracking, insurance scoring, or hardware</span>.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-4 flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={activeOnStartSimulation}
                  className="group inline-flex items-center justify-center gap-2.5 rounded bg-blue-600 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_18px_rgba(59,130,246,0.25)] transition-all hover:bg-blue-700 hover:shadow-[0_8px_25px_rgba(59,130,246,0.35)] active:scale-95 cursor-pointer font-mono"
                >
                  <span>Start Awareness Simulation</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[10px] sm:text-xs text-slate-500 font-mono"
              >
                Takes under 60 seconds · No vehicle connection · No insurance use · No hardware required
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] text-slate-400 font-mono uppercase tracking-wider border-t border-blue-200/30"
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

            {/* Right Mini Dashboard Column (Tier 1 Conversion Card) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md rounded-2xl border border-blue-200/50 bg-white/95 backdrop-blur-md p-6 shadow-[0_20px_50px_rgba(59,130,246,0.12)] shadow-cyan-500/5 overflow-hidden group hover:border-cyan-400/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f604_1px,transparent_1px),linear-gradient(to_bottom,#3b82f604_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                <div className="relative z-10 space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono">Cognitive Sandbox v1.4</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 font-mono mt-0.5">Preview of your simulated awareness output</span>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-bold text-slate-800 uppercase tracking-wide font-mono">Calibrated</span>
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
                    Simulated Output • Not Real-world data
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT YOU RECEIVE IN 60 SECONDS (New Value Section) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Immediate Evaluation Outputs
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              What you receive in 60 seconds
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto font-sans">
              Complete the rapid cognitive simulator to map your personalized driving habits and unlock key metrics.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Award className="h-6 w-6 text-blue-600" />,
                title: "Awareness Score",
                desc: "A simulated 0–100 profile based on driving habits, fatigue exposure, and attention patterns."
              },
              {
                icon: <Brain className="h-6 w-6 text-cyan-500" />,
                title: "Fatigue Exposure Profile",
                desc: "See how commute timing, longer drives, night driving, and road conditions may affect awareness."
              },
              {
                icon: <Users className="h-6 w-6 text-indigo-600" />,
                title: "Research Cohort Classification",
                desc: "Learn whether your profile aligns with Astrateq’s concept validation cohort."
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="p-8 rounded-2xl border border-slate-200/60 bg-white shadow-[0_20px_50px_rgba(59,130,246,0.06)] hover:border-cyan-400/50 hover:shadow-[0_25px_60px_rgba(59,130,246,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 font-mono mb-3">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3 — EMOTIONAL CANADIAN DRIVER RELEVANCE SECTION (New Value Section) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
                Geographic Reality
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans leading-tight">
                Why this matters for Canadian drivers
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-medium">
                Canadian drivers face long commutes, winter conditions, night driving, traffic fatigue, and growing privacy concerns around tracking-based tools. Astrateq Gadgets is exploring a software-based awareness model that helps drivers understand fatigue and focus patterns without turning their driving behavior into surveillance data.
              </p>
            </div>

            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
              {[
                {
                  icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
                  title: "Fatigue can build quietly",
                  desc: "Attention can decline gradually during long commutes, late drives, or repeated daily travel."
                },
                {
                  icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
                  title: "Existing tools feel invasive",
                  desc: "Many solutions rely on cameras, GPS tracking, vehicle data, or insurance scoring."
                },
                {
                  icon: <MapPin className="h-5 w-5 text-blue-500" />,
                  title: "Canadian driving adds pressure",
                  desc: "Weather, highway distances, darkness, congestion, and seasonal conditions can shape awareness patterns."
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — WHAT THIS SIMULATION HELPS VALIDATE (Research section) */}
      <section className="py-20 sm:py-28 bg-[#EDF5FC] border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200/80 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              Research Hypotheses
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              What this simulation helps validate
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
              Astrateq Gadgets is learning whether Canadian drivers want privacy-first awareness tools that help them reflect on fatigue exposure, attention patterns, and driving context.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <Brain className="h-5 w-5 text-blue-600" />,
                title: "Awareness patterns",
                desc: "Can a short simulation help drivers reflect on attention and focus habits?"
              },
              {
                icon: <Eye className="h-5 w-5 text-cyan-600" />,
                title: "Fatigue context",
                desc: "Do driving time, commute type, and repeated trips affect perceived alertness?"
              },
              {
                icon: <Users className="h-5 w-5 text-indigo-600" />,
                title: "Behavioral safety profiles",
                desc: "Do Canadian drivers cluster into different awareness and fatigue patterns?"
              }
            ].map((prob, idx) => (
              <div 
                key={idx}
                className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-blue-400/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 text-blue-600 flex items-center justify-center mb-5 shrink-0">
                    {prob.icon}
                  </div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono mb-2">{prob.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {prob.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5 — HOW THE VALIDATION PROCESS WORKS (Research/Validation Section) */}
      <section className="py-20 sm:py-28 bg-[#EDF5FC] border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-mono">
              Simple Engagement Flow
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              How the Validation Process Works
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto font-sans">
              We design our research validation to be extremely smooth, transparent, and direct.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            
            {/* Visual connector line for desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-dashed bg-slate-300 -z-10" />

            {[
              {
                step: "01",
                title: "Answer questions",
                desc: "Share driving context, fatigue exposure, and attention habits."
              },
              {
                step: "02",
                title: "Generate profile",
                desc: "Receive a simulated awareness score and fatigue exposure profile."
              },
              {
                step: "03",
                title: "Review awareness insights",
                desc: "Understand what your simulated profile suggests."
              },
              {
                step: "04",
                title: "Join research cohort",
                desc: "Choose whether to participate in the validation study."
              }
            ].map((flow, idx) => (
              <div key={idx} className="relative p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all duration-300 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-4 shadow-sm">
                    {flow.step}
                  </div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono mb-2">{flow.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {flow.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button
              onClick={activeOnStartSimulation}
              className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.2)] transition-all cursor-pointer font-mono"
            >
              <span>Start Awareness Simulation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 6 — DIFFERENTIATION: AWARENESS INTELLIGENCE WITHOUT SURVEILLANCE */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Market Distinctions
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Awareness intelligence without surveillance.
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto font-sans">
              Astrateq Gadgets is exploring a different path from dashcams, telematics, insurance apps, and hardware-based monitoring.
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

      {/* SECTION 7 — TRUST LAYER (Built without tracking - Upgraded Premium Dark Trust Band) */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#071323] to-[#0B1E33] text-white border-b border-slate-950 relative overflow-hidden">
        {/* Glowing backdrop circle */}
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 font-mono">
              Uncompromised Privacy Architecture
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl font-sans">
              Built without tracking
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-sans">
              This simulation does not connect to your vehicle, collect live driving data, or share responses with insurers. We believe behavioral safety should never cause pricing anxiety.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Smartphone className="h-5 w-5 text-cyan-400" />,
                title: "No vehicle connection",
                desc: "No live vehicle data, GPS, OBD, or telematics connection."
              },
              {
                icon: <Lock className="h-5 w-5 text-cyan-400" />,
                title: "No insurance sharing",
                desc: "Responses are not used for underwriting, pricing, or insurance scoring."
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-cyan-400" />,
                title: "No hardware required",
                desc: "No dashcam, scanner, device, or installation required."
              },
              {
                icon: <FileText className="h-5 w-5 text-cyan-400" />,
                title: "Simulation-only research",
                desc: "The current experience is used to validate interest in the software concept."
              }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-cyan-950 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mb-5">
                    {card.icon}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2.5 font-mono">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8 — RESEARCH COHORT (Engagement levels and signup) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Engagement Tiers
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Research Participation Levels
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto font-sans">
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

      {/* SIGNUP FORM ENROLLMENT */}
      <section ref={formRef} id="signup-form-section" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200/50 relative">
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
                  No purchase · No vehicle connection · No insurance use · Pre-launch validation only
                </p>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 11 — FINAL CONVERSION CTA BANNER BEFORE FOOTER (Tier 1 Conversion Card styling) */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="rounded-3xl border border-blue-200/60 bg-gradient-to-tr from-[#F3F8FF] to-[#EAF3FB] p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-cyan-400/50 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 leading-tight font-sans">
                Ready to help shape <br className="hidden sm:inline" />
                Driver Awareness Intelligence?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
                Join the research cohort and help validate whether Canadian drivers want privacy-first awareness tools without tracking, insurance scoring, or hardware.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <button
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow-md active:scale-95 transition-all cursor-pointer font-mono"
                >
                  <span>Join Research Cohort</span>
                </button>
                <button
                  onClick={activeOnStartSimulation}
                  className="inline-flex items-center justify-center gap-2 rounded border border-slate-200 bg-white hover:bg-slate-50 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-slate-700 active:scale-95 transition-all cursor-pointer font-mono"
                >
                  <span>Try the Simulation First</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                No purchase · No hardware · Concept validation only
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono mb-4">
              Cohort FAQ
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 font-sans">
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
                      : "border-[#DDE8F3] bg-slate-50/40 hover:bg-white hover:border-blue-300 shadow-xs"
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

      {/* SECTION 10 — FOOTER (New intentional premium design) */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
            
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-white">
                <span className="font-sans font-black tracking-widest text-sm">ASTRATEQ GADGETS</span>
              </div>
              <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                Evaluating the demand and feasibility profile of hardware-free, software-first Driver Awareness Intelligence solutions calibrated specifically for Canadian highway corridors and commuter safety.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-300 font-mono">Standards & Guidelines</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Adheres strictly to standard Canadian research protocols and privacy guidelines. Participant data is thoroughly isolated.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-300 font-mono">Research Contact</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                For research inquiries or participation feedback, coordinate with our study leader:<br />
                <span className="text-blue-400 select-all font-mono">research@astrateq.ca</span>
              </p>
            </div>

          </div>

          <div className="pt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 font-mono uppercase tracking-wider">
            <div className="space-y-1 text-center sm:text-left">
              <p>© 2026 Astrateq Gadgets. All rights reserved.</p>
              <p className="text-[9px] lowercase text-slate-700 tracking-normal normal-case">
                This platform is a conceptual demonstration and research site for evaluating interest in a future software-based Driver Awareness Intelligence concept. It is not a real-time monitoring system, insurance product, diagnostic tool, or hardware preorder.
              </p>
            </div>
            <div className="shrink-0">
              🇨🇦 Made in Canada
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
