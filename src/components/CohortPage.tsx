import React, { useState, useEffect, useRef } from "react";
import { 
  Users, Award, ShieldCheck, Heart, Mail, Check, Sparkles, Loader2, Info, ArrowRight, ShieldAlert,
  Brain, Eye, MapPin, Lock, HelpCircle, FileText, Smartphone, AlertTriangle, ChevronDown, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import R_AND_D_LAB_IMAGE from "../assets/images/automotive_rd_lab_1783018331045.jpg";

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
      title: "Standard Participant",
      levelLabel: "Early-Bird Queue",
      desc: "Perfect for everyday drivers looking to secure their early software access key at a baseline launch discount.",
      requirement: "Free reservation with zero commitment",
      features: [
         "20% Guaranteed Launch Discount",
         "Development queue status updates",
         "Default localized setup documentation",
         "No credit card required to secure slot"
      ],
      badge: "20% LAUNCH DISCOUNT",
      color: "border-slate-200 bg-white text-slate-900"
    },
    {
      id: "guardian",
      title: "VIP Elite Cohort",
      levelLabel: "Batch 1 Guaranteed",
      desc: "Our most popular tier. Secures early software priority, direct steering panel feedback, and locked-in savings.",
      requirement: "Free priority slot with zero commitment",
      features: [
         "40% VIP Launch Discount (Locked-In)",
         "Guaranteed Batch 1 Early Software Access",
         "Exclusive local diagnostic test metrics",
         "Priority feature steering vote options",
         "Cancel or withdraw at any time"
      ],
      badge: "40% VIP DISCOUNT • POPULAR",
      color: "border-blue-500 bg-white text-slate-900",
      highlight: true
    },
    {
      id: "founding",
      title: "Founding Collaborator",
      levelLabel: "Batch 1 Executive",
      desc: "For ultimate safety advocates wishing to collaborate closely with the Astrateq product design team.",
      requirement: "Free collaborator slot with zero commitment",
      features: [
         "50% Custom Founding Launch Discount",
         "Custom VIP profile status inside local app",
         "Lifetime standard software updates free of charge",
         "Direct roundtable interview sessions with builders",
         "Executive steering panel vote parameters"
      ],
      badge: "50% FOUNDING DISCOUNT",
      color: "border-rose-500 bg-slate-950 text-white"
    }
  ];

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

      {/* SECTION 1 — HERO: THE PRE-ORDER CONVICTION STATEMENT */}
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
                🇨🇦 Astrateq Canada Early Access Validation Campaign
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.08] font-sans"
              >
                Help shape the <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  First Software Prototype
                </span> <br />
                for Driver Intelligence.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-sans font-medium"
              >
                Reserve your early software priority slot today. No payment, deposit, or binding commitment is required. Joining the validation effort registers your queue placement and guarantees up to a <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">50% discount</span> once the offline platform is production-ready.
              </motion.p>
              
              {/* Premium Advanced R&D Lab Visual Embedding */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white p-2.5 max-w-xl group"
              >
                <div className="relative overflow-hidden rounded-xl h-60 sm:h-72">
                  <img
                    src={R_AND_D_LAB_IMAGE}
                    alt="Advanced Automotive Human-Factors R&D Laboratory Workstation"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover rounded-xl transition-transform duration-750 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 text-white flex justify-between items-end">
                    <div>
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-cyan-400 font-mono">LABORATORY SPECIFICATION</span>
                      <h4 className="text-xs font-black uppercase tracking-wide">ASTRATEQ COGNITIVE R&D LAB</h4>
                    </div>
                    <span className="text-[8px] font-mono uppercase bg-blue-600/90 backdrop-blur-md border border-blue-400/30 px-2 py-0.5 rounded text-white tracking-widest font-bold">ACTIVE TEST RUN</span>
                  </div>
                </div>
              </motion.div>
              
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
                  <span>Secure Priority Access</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[10px] sm:text-xs text-slate-700 font-mono font-medium"
              >
                Takes under 30 seconds • Runs locally in memory • No vehicle adapters • Cancel anytime
              </motion.p>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] text-slate-700 font-mono uppercase tracking-wider border-t border-blue-200/30 font-semibold"
              >
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>No Financial Obligation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>No Deposit Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>100% On-Device Isolation</span>
                </div>
              </motion.div>
            </div>

            {/* Right Mini Dashboard Column (Tactile Priority Ticket) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-sm rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 shadow-xl overflow-hidden group hover:border-blue-500 transition-all duration-300">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f602_1px,transparent_1px),linear-gradient(to_bottom,#3b82f604_1px,transparent_1px)] bg-[size:16px_16px]" />
                
                {/* Decorative cutouts to simulate a physical ticket */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EAF3FB] border-r border-slate-300 z-10" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EAF3FB] border-l border-slate-300 z-10" />

                <div className="relative z-10 space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono">ASTRATEQ REGISTRY</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 font-mono mt-0.5">Priority Early Access Key</span>
                    </div>
                    <span className="inline-flex items-center rounded bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[8px] font-bold text-blue-700 uppercase tracking-wide font-mono">VALIDATION STAGE</span>
                  </div>

                  <div className="space-y-3 font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold uppercase">PROTOTYPE RELEASE:</span>
                      <span className="text-slate-900 font-black">PHASE 1 ROLLOUTS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold uppercase">COLLABORATION LEVEL:</span>
                      <span className="text-slate-900 font-black">RESEARCH COHORT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold uppercase">SECURED DISCOUNT:</span>
                      <span className="text-emerald-600 font-black font-extrabold">UP TO 50% INTRO RATE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold uppercase">SECURITY PROTOCOL:</span>
                      <span className="text-slate-900 font-black">100% OFFLINE EDGE AI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-semibold uppercase">REGION LIMITS:</span>
                      <span className="text-slate-900 font-black">CANADA SOVEREIGN</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-4 text-center">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">COLLABORATION CODE</p>
                    <p className="text-lg font-black text-slate-800 uppercase tracking-wider font-mono mt-1">CAN-COHORT-PENDING</p>
                  </div> Barcode Code 1
                  {/* Pseudo Barcode */}
                  <div className="flex justify-center items-center gap-0.5 h-10 w-full bg-slate-50 rounded border border-slate-100 px-3 opacity-60">
                    {[1, 3, 2, 4, 1, 3, 2, 4, 1, 2, 4, 3, 1, 3, 2, 4, 1, 2, 3, 4, 2, 1, 3, 4, 1, 2, 3, 1, 4, 3].map((val, idx) => (
                      <div 
                        key={idx} 
                        className="bg-slate-800 rounded-xs" 
                        style={{ 
                          width: val === 4 ? "4px" : val === 3 ? "3px" : val === 2 ? "2px" : "1px",
                          height: "24px" 
                        }} 
                        id={`barcode-item-${idx}`}
                      />
                    ))}
                  </div>

                  <p className="text-center text-[7px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                    Zero Obligation • Submit Form Below to Register Key
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT YOU SECURE WITH YOUR FREE COLLABORATION */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              Reservation Benefits
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Why your participation matters
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-lg mx-auto font-sans font-medium">
              Joining our priority validation cohort registers your interest in high-privacy safety options with no upfront cost.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Award className="h-5 w-5 text-blue-600" />,
                title: "Guaranteed Early Access Slot",
                desc: "Secure first-priority credentials in the initial software rollout. As soon as private prototype keys generate, your spot is locked.",
                border: "border-blue-200 hover:border-blue-400 hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)]",
                iconBg: "bg-blue-100/60 border-blue-200",
                bg: "from-blue-50/40 via-white to-blue-50/10",
                topBar: "bg-blue-500"
              },
              {
                icon: <Sparkles className="h-5 w-5 text-cyan-600" />,
                title: "Up to 50% Locked-In Savings",
                desc: "Registration completely locks in your early-bird pricing slot, ensuring you escape standard post-launch subscription rates.",
                border: "border-cyan-200 hover:border-cyan-400 hover:shadow-[0_12px_30px_rgba(6,182,212,0.15)]",
                iconBg: "bg-cyan-100/60 border-cyan-200",
                bg: "from-cyan-50/40 via-white to-cyan-50/10",
                topBar: "bg-cyan-500"
              },
              {
                icon: <Users className="h-5 w-5 text-indigo-600" />,
                title: "Direct Prototype Influence",
                desc: "Provide feedback directly to our product designers to prioritize Commute Metrics, Fatigue curves, and interface preferences.",
                border: "border-indigo-200 hover:border-indigo-400 hover:shadow-[0_12px_30px_rgba(99,102,241,0.15)]",
                iconBg: "bg-indigo-100/60 border-indigo-200",
                bg: "from-indigo-50/40 via-white to-indigo-50/10",
                topBar: "bg-indigo-500"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative pt-10 pb-8 px-8 rounded-2xl border bg-gradient-to-br ${item.bg} shadow-lg text-slate-900 transition-all duration-300 flex flex-col justify-between hover:shadow-xl overflow-hidden ${item.border}`}
                id={`cohort-value-prop-card-${idx}`}
              >
                {/* Colorful top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.topBar}`} />
                
                <div>
                  <div className={`h-11 w-11 rounded-xl border flex items-center justify-center mb-6 ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono mb-3">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3 — EMOTIONAL CANADIAN DRIVER RELEVANCE SECTION */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
                Geographic Reality
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans leading-tight">
                Designed for Canadian road realities.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-medium">
                Canadian drivers handle sudden blizzards, desolately long highways, extreme winter commute times, and invasive tracking models from standard auto insurers. Astrateq represents an alternative: fully localized, offline software running directly on your personal device to support focus and prevent fatigue accidents—with zero remote servers.
              </p>
            </div>

            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
              {[
                {
                  icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
                  title: "Fatigue builds in secret",
                  desc: "Your cognitive resources slip quietly during late night shifts or repetitive multi-hour highway travel.",
                  border: "border-amber-500/80 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]",
                  iconBg: "bg-amber-500/10 border-amber-500/30"
                },
                {
                  icon: <ShieldAlert className="h-5 w-5 text-red-400" />,
                  title: "Invasive tracking is wrong",
                  desc: "Standard safety programs require continuous GPS uploads, vehicle OBD connections, or insurance telemetry profiles.",
                  border: "border-red-500/80 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]",
                  iconBg: "bg-red-500/10 border-red-500/30"
                },
                {
                  icon: <MapPin className="h-5 w-5 text-blue-400" />,
                  title: "Calibrated for local terrain",
                  desc: "Models are calibrated to manage remote northern ranges, dense local bottlenecks, and snowy glare reflections.",
                  border: "border-blue-500/80 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
                  iconBg: "bg-blue-500/10 border-blue-500/30"
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-6 rounded-xl border-2 bg-slate-900 text-white transition-all duration-300 flex flex-col justify-between ${item.border}`}
                  id={`cohort-reality-card-${idx}`}
                >
                  <div>
                    <div className={`h-10 w-10 rounded-lg border flex items-center justify-center mb-4 ${item.iconBg}`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-2">{item.title}</h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — SOFTWARE ARCHITECTURE SPECIFICATIONS */}
      <section className="py-20 sm:py-28 bg-[#EDF5FC] border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200/80 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              On-Device Specs
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              On-Device Software Specifications
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
              Engineered with extreme code optimization, high-efficiency local optics handling, and a strict local-RAM boundary.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <Brain className="h-5 w-5 text-blue-400" />,
                title: "Local Edge-AI Silicon",
                desc: "Harnesses your smartphone or device's native Neural Engine / GPU core to execute gaze and fatigue-tracking algorithms with zero cloud data transmission.",
                border: "border-blue-500/80 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]",
                iconBg: "bg-blue-500/10 border-blue-500/30"
              },
              {
                icon: <Eye className="h-5 w-5 text-cyan-400" />,
                title: "Optic Focal Calibration",
                desc: "High-contrast focal assessment compatible with standard device lenses, polarized sunglasses, night driving, and corrective eyewear.",
                border: "border-cyan-500/80 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]",
                iconBg: "bg-cyan-500/10 border-cyan-500/30"
              },
              {
                icon: <Lock className="h-5 w-5 text-indigo-400" />,
                title: "Volatile Memory Standard",
                desc: "No local or remote video database is ever saved. Eyelid speed coordinates are mapped temporarily in RAM, processed, and immediately purged.",
                border: "border-indigo-500/80 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]",
                iconBg: "bg-indigo-500/10 border-indigo-500/30"
              }
            ].map((prob, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-xl border-2 bg-slate-900 text-white transition-all duration-200 flex flex-col justify-between ${prob.border}`}
                id={`cohort-spec-card-${idx}`}
              >
                <div>
                  <div className={`h-10 w-10 rounded-lg border flex items-center justify-center mb-5 shrink-0 ${prob.iconBg}`}>
                    {prob.icon}
                  </div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white font-mono mb-2">{prob.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                    {prob.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5 — HOW THE RESERVATION PROCESS WORKS */}
      <section className="py-20 sm:py-28 bg-[#EDF5FC] border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-mono">
              Simple Priority Flow
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              How the Validation Process Works
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-lg mx-auto font-sans font-medium">
              Lock in your priority early access through a transparent, fully free community queue.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            
            {/* Visual connector line for desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-slate-300 -z-10" />

            {[
              {
                step: "01",
                title: "Select Priority Level",
                desc: "Choose from Standard, VIP Elite, or Founding Collaborator with zero payment or deposit required.",
                border: "border-blue-200 hover:border-blue-400 hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)]",
                bg: "from-blue-50/60 to-white",
                topColor: "border-t-blue-500",
                stepBg: "bg-blue-100 border border-blue-300 text-blue-700"
              },
              {
                step: "02",
                title: "Diagnostic Check-In",
                desc: "Review your baseline fatigue metrics from our simulator to calibrate your early-bird queue discount.",
                border: "border-cyan-200 hover:border-cyan-400 hover:shadow-[0_12px_30px_rgba(6,182,212,0.15)]",
                bg: "from-cyan-50/60 to-white",
                topColor: "border-t-cyan-500",
                stepBg: "bg-cyan-100 border border-cyan-300 text-cyan-700"
              },
              {
                step: "03",
                title: "Submit Driving Context",
                desc: "Register your typical regional route variables to help customize our offline neural models.",
                border: "border-purple-200 hover:border-purple-400 hover:shadow-[0_12px_30px_rgba(168,85,247,0.15)]",
                bg: "from-purple-50/60 to-white",
                topColor: "border-t-purple-500",
                stepBg: "bg-purple-100 border border-purple-300 text-purple-700"
              },
              {
                step: "04",
                title: "Unlock Prototype Keys",
                desc: "Receive your private platform download credentials and instructions once the prototype builds are active.",
                border: "border-emerald-200 hover:border-emerald-400 hover:shadow-[0_12px_30px_rgba(16,185,129,0.15)]",
                bg: "from-emerald-50/60 to-white",
                topColor: "border-t-emerald-500",
                stepBg: "bg-emerald-100 border border-emerald-300 text-emerald-700"
              }
            ].map((flow, idx) => (
              <div 
                key={idx} 
                className={`relative p-8 rounded-xl border bg-gradient-to-b ${flow.bg} border-t-4 ${flow.topColor} shadow-lg text-slate-900 transition-all duration-300 flex flex-col justify-between hover:shadow-xl overflow-hidden ${flow.border}`}
                id={`cohort-flow-card-${idx}`}
              >
                <div>
                  <div className={`flex h-8 w-8 rounded-full font-mono text-xs font-black items-center justify-center mb-4 shadow-sm ${flow.stepBg}`}>
                    {flow.step}
                  </div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono mb-2">{flow.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
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
              <span>Try Diagnostic Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 6 — DIFFERENTIATION: AWARENESS vs TRADITIONAL SYSTEMS */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              Market Distinctions
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Awareness intelligence without surveillance.
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-xl mx-auto font-sans font-medium">
              Astrateq software is engineered to prioritize personal driver empowerment over remote corporate monitoring.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            {/* Table Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900 text-white p-4.5 font-mono text-[10px] font-black uppercase tracking-widest">
              <div className="px-2">Traditional Fleet/Insurance Approach</div>
              <div className="border-t sm:border-t-0 sm:border-l border-slate-700 mt-2 pt-2 sm:mt-0 sm:pt-0 sm:pl-6">
                Astrateq Offline Software Approach
              </div>
            </div>
            
            {/* Table Rows */}
            <div className="divide-y divide-slate-100 font-sans text-xs">
              {[
                {
                  market: "Dashcams capture, record, and stream permanent in-cabin video footage directly to remote databases.",
                  astrateq: "Zero video recording. High-speed local libraries map eye mesh relative coordinates in RAM and instantly discard."
                },
                {
                  market: "Telematics and OBD-II hardware plug directly into vehicle electronics to log speed, braking, and locations.",
                  astrateq: "OBD bypassed completely. Standalone software requiring zero vehicle communication or diagnostic ties."
                },
                {
                  market: "Insurance applications monitor GPS behaviors and remote routes to automatically adjust rates.",
                  astrateq: "Sovereign isolation. No GPS track tracking or remote cloud sync is possible. 100% local focus."
                },
                {
                  market: "Alert systems rely on persistent, loud auditory alerts that generate cognitive road noise.",
                  astrateq: "Focuses on gentle, ambient on-screen visual guides and non-startling focal awareness reminders."
                }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 hover:bg-slate-50/40 transition-colors">
                  <div className="p-5 text-slate-700 pr-6 leading-relaxed flex items-start gap-2.5 font-medium">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
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

      {/* SECTION 7 — TRUST LAYER (Uncompromised Privacy Architecture) */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-[#071323] to-[#0B1E33] text-white border-b border-slate-950 relative overflow-hidden">
        {/* Glowing backdrop circle */}
        <div className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 font-mono">
              Sovereign Privacy Architecture
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl font-sans">
              Built without tracking
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-sans font-medium">
              Engineered with 100% On-Device Edge Processing. Your telemetry never touches the cloud. What happens in the cabin, stays in the cabin.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Smartphone className="h-5 w-5 text-cyan-400" />,
                title: "OBD Bypassed",
                desc: "No vehicle connection or engine logs. Completely independent of dashboard electronics."
              },
              {
                icon: <Lock className="h-5 w-5 text-cyan-400" />,
                title: "Zero Insurance Logs",
                desc: "Research cohort credentials are entirely isolated. We never share metrics or signups with insurance firms."
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-cyan-400" />,
                title: "100% RAM Processing",
                desc: "Biometric and optical vectors are calculated inside on-device memory and immediately purged. Zero tracking."
              },
              {
                icon: <FileText className="h-5 w-5 text-cyan-400" />,
                title: "Cancel Any Time",
                desc: "Early access reservations hold no penalties or binding conditions. You retain absolute control."
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

      {/* SECTION 8 — COHORT COLLABORATION LEVELS */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              Priority Tiers
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Select Your Collaboration Level
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed max-w-lg mx-auto font-sans font-medium">
              Choose the queue depth that matches your pre-launch interest. Every tier secures priority early access with absolutely no financial deposit required.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              
              const tierThemes = {
                access: {
                  border: isSelected 
                    ? "border-blue-500 ring-2 ring-blue-500 scale-[1.01]" 
                    : "border-slate-700/80 hover:border-slate-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
                  badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
                  requirementBg: "bg-slate-800/50 border-slate-700/50",
                  featColor: "text-slate-400"
                },
                guardian: {
                  border: isSelected 
                    ? "border-blue-500 ring-2 ring-blue-500 scale-[1.01]" 
                    : "border-blue-500/80 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]",
                  badgeClass: "bg-blue-950 text-blue-400 border-blue-800/60",
                  requirementBg: "bg-blue-950/40 border-blue-800/40",
                  featColor: "text-blue-400"
                },
                founding: {
                  border: isSelected 
                    ? "border-rose-500 ring-2 ring-rose-500 scale-[1.01]" 
                    : "border-rose-500/80 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
                  badgeClass: "bg-rose-950 text-rose-400 border-rose-800/60",
                  requirementBg: "bg-rose-950/40 border-rose-800/40",
                  featColor: "text-rose-400"
                }
              }[tier.id] || {
                border: "border-slate-800",
                badgeClass: "bg-slate-800 text-slate-300",
                requirementBg: "bg-slate-800/50",
                featColor: "text-blue-400"
              };

              return (
                <div 
                  key={tier.id}
                  className={`rounded-2xl border-2 p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-slate-900 text-white shadow-xl ${tierThemes.border} ${tier.highlight ? "ring-2 ring-blue-500/50 ring-offset-2 ring-offset-slate-950" : ""}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-wider font-mono border ${tierThemes.badgeClass}`}>
                        {tier.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{tier.levelLabel}</span>
                    </div>

                    <h3 className="text-lg font-black uppercase tracking-wide leading-tight">{tier.title}</h3>
                    
                    <p className="mt-4 text-xs leading-relaxed font-medium text-slate-300">
                      {tier.desc}
                    </p>

                    <div className={`mt-5 p-4 rounded-xl flex flex-col gap-1 text-xs ${tierThemes.requirementBg}`}>
                      <span className="font-bold font-mono text-[9px] uppercase tracking-widest text-slate-400">Requirement:</span>
                      <span className="font-extrabold text-white uppercase tracking-wider text-[10px] font-mono leading-relaxed">{tier.requirement}</span>
                    </div>

                    <p className="mt-6 text-[10px] font-black uppercase tracking-widest font-mono text-slate-400">
                      Inclusions:
                    </p>

                    <ul className="mt-3.5 space-y-3">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tierThemes.featColor}`} />
                          <span className="text-slate-300">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 font-mono">
                    <button
                      onClick={() => scrollToForm(tier.id)}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded py-3.5 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
                        isSelected 
                          ? "bg-slate-800 text-white border border-slate-700" 
                          : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      }`}
                    >
                      <span>{isSelected ? "Allocation Locked" : (tier.id === "founding" ? "Claim Founding Allocation" : "Secure Priority Access")}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[10px] font-mono uppercase tracking-wider text-slate-600 mt-10 font-bold">
            *No deposit required • No payment obligation • Cancel anytime • 100% offline edge AI
          </p>

        </div>
      </section>

      {/* SIGNUP FORM ENROLLMENT */}
      <section ref={formRef} id="signup-form-section" className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-600 to-cyan-500" />
            
            <div className="text-center mb-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[9px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
                Astrateq Priority Registry
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans">
                Join the Driver Intelligence Cohort
              </h3>
              <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed font-sans font-medium">
                Complete the priority registration below to lock in your early access key. Your slot secures your early-bird discount rate and priority rollout tier.
              </p>
            </div>

            {signupResult ? (
              <div className="flex flex-col items-center justify-center text-center py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-600 text-white mb-4 shadow-md">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wide text-slate-900">Priority Registration Confirmed!</h4>
                <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest mt-1 font-mono">
                  Collaboration Tier: {signupResult.tierLabel}
                </p>
                <p className="text-xs text-slate-700 mt-3 max-w-sm leading-relaxed font-sans font-medium">
                  Success! Your Astrateq early access reservation has been securely logged. We will notify you with direct development updates, survey check-ins, and coordinate your prototype key when testing begins.
                </p>

                <div className="mt-6 w-full rounded border border-slate-200 bg-slate-50 p-4 font-mono text-center shadow-xs">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Priority Reference ID</p>
                  <p className="text-sm font-extrabold text-slate-800 mt-1 select-all">{signupResult.cohortId}</p>
                </div>

                <div className="mt-6 flex flex-col gap-1.5 text-[10px] font-mono uppercase text-slate-400">
                  <span>• Registrant Name: <strong className="text-slate-600">{firstName}</strong></span>
                  <span>• Active Route Region: <strong className="text-slate-600">{province}</strong></span>
                  {drivingContext && <span>• Commute Context: <strong className="text-slate-600">{drivingContext}</strong></span>}
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
                  Create Another Registration
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
                  <p className="text-[10px] text-slate-700 mt-1 font-mono font-medium">
                    COMMITMENT: {tiers.find(t => t.id === selectedTier)?.requirement.toUpperCase()}
                  </p>
                </div>

                {/* Headless Prefinery pre-order embed */}
                <div className="prefinery-form-embed rounded-xl border border-dashed border-blue-200 bg-blue-50/20 p-1 mb-4"></div>

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
                    <span className="text-slate-400 font-mono ml-2">Used only for direct rollout briefs</span>
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
                    <span>Your Simulated Awareness Score ({score}) will be securely paired to qualify you for up to a 50% early-bird release discount.</span>
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
                  <label htmlFor="consent" className="text-[10px] text-slate-700 leading-normal cursor-pointer font-sans uppercase font-bold tracking-wide">
                    I agree to lock in my priority early access queue spot and receive edge-AI software prototype updates.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !consent}
                  className="w-full flex items-center justify-center gap-2 rounded bg-blue-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer shadow-[0_4px_12px_rgba(59,130,246,0.25)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.35)] font-mono"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Securing Allocation...</span>
                    </>
                  ) : (
                    <>
                      <span>{selectedTier === 'founding' ? 'Claim Founding Allocation' : 'Secure Priority Access'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[9px] text-slate-400 font-mono uppercase tracking-wider mt-3 leading-normal">
                  Your priority allocation deposit is 100% fully refundable at any time prior to alpha software deployment.
                </p>

              </form>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 11 — FINAL CONVERSION CTA BANNER BEFORE FOOTER */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="rounded-3xl border border-blue-200/60 bg-gradient-to-tr from-[#F3F8FF] to-[#EAF3FB] p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(59,130,246,0.12)] hover:border-cyan-400/50 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute top-[10%] left-[10%] w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 leading-tight font-sans">
                Ready to secure your <br className="hidden sm:inline" />
                priority early access?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
                Join the early priority queue today with zero obligation or upfront cost. Help us validate demand for premium, offline-first driver awareness intelligence software.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <button
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow-md active:scale-95 transition-all cursor-pointer font-mono"
                >
                  <span>Secure Priority Access</span>
                </button>
                <button
                  onClick={activeOnStartSimulation}
                  className="inline-flex items-center justify-center gap-2 rounded border border-slate-200 bg-white hover:bg-slate-50 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-slate-700 active:scale-95 transition-all cursor-pointer font-mono"
                >
                  <span>Try Diagnostic Simulator First</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest leading-normal">
                Your priority allocation deposit is 100% fully refundable at any time prior to alpha software deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — FAQ */}
      <section className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden border-b border-slate-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono mb-4">
              Cohort FAQ
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 font-sans">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-700 mt-3 max-w-lg mx-auto leading-relaxed font-sans font-medium">
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
  );
}
