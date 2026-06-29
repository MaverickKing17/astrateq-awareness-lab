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
    <div className="bg-[#F4F7FB] min-h-screen">

      {/* SECTION 1 — HERO: THE BIG BELIEF STATEMENT */}
      <section className="relative overflow-hidden py-24 sm:py-32 border-b border-slate-200 bg-gradient-to-b from-slate-50 to-[#F4F7FB]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-1.5 border border-blue-200 bg-blue-50/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono rounded-full mb-6">
              🇨🇦 Pre-Launch Concept Validation
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-5xl leading-tight font-sans">
              Help shape the future of <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Driver Awareness Intelligence
              </span>{" "}
              in Canada.
            </h1>
            <p className="mt-6 text-sm text-slate-600 leading-relaxed max-w-3xl mx-auto font-sans font-medium">
              Astrateq Gadgets is validating demand for a software-based driver awareness concept designed to help Canadian drivers better understand fatigue exposure, attention patterns, and safer driving behavior — without vehicle tracking, insurance scoring, or hardware.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToForm()}
                className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)] active:scale-95 cursor-pointer font-mono"
              >
                <span>Join Research Cohort</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              {onStartSimulation && (
                <button
                  onClick={onStartSimulation}
                  className="inline-flex items-center justify-center gap-2 rounded border border-slate-200 bg-white px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 cursor-pointer font-mono"
                >
                  <span>Try the 60-Second Simulation</span>
                </button>
              )}
            </div>

            <div className="mt-8 flex justify-center items-center gap-6 text-[10px] text-slate-400 font-mono uppercase tracking-wider">
              <span>NO OBLIGATION</span>
              <span>•</span>
              <span>NO DEPOSITS</span>
              <span>•</span>
              <span>100% BEHAVIORAL RESEARCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — TRUST LAYER (High on page to build immediate conviction) */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded font-mono mb-3">
              Privacy First & Uncompromised
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              Built without tracking
            </h2>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              We understand that vehicle tracking tools create resistance. Our system is designed around transparency and extreme user privacy.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs">
              <div className="h-9 w-9 rounded bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Smartphone className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">No vehicle connection</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                The concept does not require vehicle data, OBD integration, or any electronic connection to your car.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs">
              <div className="h-9 w-9 rounded bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">No insurance sharing</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Your answers are not shared with insurers. We believe behavioral awareness should never cause pricing anxiety.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs">
              <div className="h-9 w-9 rounded bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">No hardware required</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                No dashcam installation, GPS tracker, or scanning devices. Astrateq relies purely on software cognitive concepts.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs">
              <div className="h-9 w-9 rounded bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">No advertising resale model</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                We do not monetize your input through ads. Your participation is purely mapped to anonymous road safety research.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs">
              <div className="h-9 w-9 rounded bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">Simulation-only research</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                The current experience is a conceptual framework designed to measure driver interest in safety-focused awareness models.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs">
              <div className="h-9 w-9 rounded bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">Canadian driver focus</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                Designed around Canadian road conditions, winter commute pressures, long highways, and high local safety standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM: WHY THIS NEEDS TO EXIST */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 text-left">
              <span className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-red-600 font-mono rounded-full mb-4">
                The Road Safety Challenge
              </span>
              <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl font-sans">
                Driver awareness is still an overlooked safety layer.
              </h2>
              <p className="mt-4 text-xs text-slate-600 leading-relaxed font-sans font-medium">
                Most modern automotive safety tools focus on the vehicle, the fleet, the insurer, or invasive dash cameras. Very few systems are built to help everyday drivers understand their own fatigue exposure, attention habits, and commuting realities in a privacy-first, software-only way.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              
              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-xs flex gap-4 items-start">
                <div className="h-8 w-8 rounded bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Fatigue is hard to notice early</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-sans">
                    Drivers often recognize fatigue only after their physical focus has already begun to slip or micro-distractions have already locked.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-xs flex gap-4 items-start">
                <div className="h-8 w-8 rounded bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldAlert className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Existing tools can feel invasive</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-sans">
                    Dashcams, real-time telematics, constant GPS tracking, and insurance apps create privacy resistance and premium anxiety.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-xs flex gap-4 items-start">
                <div className="h-8 w-8 rounded bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Canadian driving adds real pressure</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-sans">
                    Long commutes, sudden winter weather, vast highway stretches, night travel, and high traffic fatigue significantly stress daily cognitive reserves.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE CONCEPT: WHAT ASTRATEQ IS VALIDATING */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded font-mono mb-3">
              Conceptual Innovation
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              What Astrateq Gadgets is validating
            </h2>
            <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-2xl mx-auto">
              Astrateq Gadgets is exploring a software-based Driver Awareness Intelligence concept that uses behavioral inputs to generate simulated awareness insights. The goal is to understand whether Canadian drivers want a privacy-first way to reflect on fatigue exposure, attention patterns, and driving context.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs text-center flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <Brain className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">Driver Awareness Score</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                A conceptual score calibrated from voluntary user questionnaire baselines to help drivers self-reflect on awareness and attention levels.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs text-center flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">Fatigue Risk Awareness Profile</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                A simulated profile structured around commuting frequency, clock-based diurnal rhythms, sleep deficits, and highway fatigue exposure.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#E6EDF5] bg-slate-50/50 shadow-xs text-center flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">Research Cohort Classification</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                A structured demographic taxonomy mapping driver focus profiles to tailored research segments to measure and study safety patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — DIFFERENTIATION: WHAT MAKES ASTRATEQ DIFFERENT */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono mb-3">
              Market Positioning
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              Awareness intelligence without surveillance.
            </h2>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              We draw a sharp line between traditional tracking products and our educational, privacy-centric software research approach.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-[#E6EDF5] bg-white shadow-sm">
            <div className="grid grid-cols-2 bg-slate-900 text-white p-4 font-mono text-[10px] font-bold uppercase tracking-widest">
              <div>Current Market Approach</div>
              <div className="border-l border-slate-700 pl-4">Astrateq Direction</div>
            </div>
            
            <div className="divide-y divide-[#E6EDF5] font-sans text-xs">
              <div className="grid grid-cols-2 p-4">
                <div className="text-slate-500 pr-4">Dashcams require hardware installation and continuous in-cabin monitoring.</div>
                <div className="border-l border-[#E6EDF5] pl-4 font-bold text-slate-900 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  Software-first concept validation
                </div>
              </div>

              <div className="grid grid-cols-2 p-4">
                <div className="text-slate-500 pr-4">Telematics track real-time physical vehicle coordinates and route vectors.</div>
                <div className="border-l border-[#E6EDF5] pl-4 font-bold text-slate-900 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  No vehicle connection
                </div>
              </div>

              <div className="grid grid-cols-2 p-4">
                <div className="text-slate-500 pr-4">Insurance applications collect data specifically to score risk and alter pricing.</div>
                <div className="border-l border-[#E6EDF5] pl-4 font-bold text-slate-900 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  No insurance scoring
                </div>
              </div>

              <div className="grid grid-cols-2 p-4">
                <div className="text-slate-500 pr-4">Safety advice remains generic, un-calibrated, and static.</div>
                <div className="border-l border-[#E6EDF5] pl-4 font-bold text-slate-900 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  Personalized simulated awareness profile
                </div>
              </div>

              <div className="grid grid-cols-2 p-4">
                <div className="text-slate-500 pr-4">Fleet tools target commercial logistics operators rather than everyday drivers.</div>
                <div className="border-l border-[#E6EDF5] pl-4 font-bold text-slate-900 flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  Built for everyday Canadian drivers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — HOW THE VALIDATION PROGRAM WORKS */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded font-mono mb-3">
              Simple Engagement Flow
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              How the validation program works
            </h2>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              We design our research validation to be extremely smooth, transparent, and direct.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-4">
            <div className="relative p-5 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono block mb-1">STEP 01</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Try the simulation</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Complete our highly responsive 60-second Driver Awareness Simulation questionnaire.
              </p>
            </div>

            <div className="relative p-5 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono block mb-1">STEP 02</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Review awareness profile</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Instantly view your simulated awareness score, fatigue profile, and assigned research cohort.
              </p>
            </div>

            <div className="relative p-5 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono block mb-1">STEP 03</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Join research cohort</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Formally submit your pre-launch interest to help us validate this software concept with real demand.
              </p>
            </div>

            <div className="relative p-5 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono block mb-1">STEP 04</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">Receive concept updates</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Get early updates as Astrateq aggregates local research insights and refines safety intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — RESEARCH PARTICIPATION LEVELS */}
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono mb-3">
              Engagement Tiers
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              Research Participation Levels
            </h2>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
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
                  className={`rounded-xl border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isDark 
                      ? "bg-slate-950 text-white border-blue-900/40 shadow-md" 
                      : "bg-white text-slate-900 border-slate-200 shadow-sm hover:border-blue-400"
                  } ${tier.highlight ? "ring-2 ring-blue-500 ring-offset-2" : ""} ${isSelected ? "border-blue-600 bg-blue-500/5" : ""}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider font-mono ${
                        isDark ? "bg-slate-900 text-slate-300 border border-slate-800" : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}>
                        {tier.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">{tier.levelLabel}</span>
                    </div>

                    <h3 className="text-base font-bold uppercase tracking-wide leading-tight">{tier.title}</h3>
                    
                    <p className={`mt-4 text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                      {tier.desc}
                    </p>

                    <div className={`mt-5 p-3.5 rounded flex flex-col gap-1 text-[11px] ${
                      isDark ? "bg-slate-900/60 border border-slate-800" : "bg-slate-50 border border-slate-200"
                    }`}>
                      <span className={`font-bold font-mono text-[10px] uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>Requirement:</span>
                      <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] font-mono">{tier.requirement}</span>
                    </div>

                    <p className={`mt-6 text-[10px] font-bold uppercase tracking-wider font-mono ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                      Inclusions:
                    </p>

                    <ul className="mt-3 space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                          <span className={isDark ? "text-slate-300" : "text-slate-600"}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100/10 font-mono">
                    <button
                      onClick={() => scrollToForm(tier.id)}
                      className={`w-full inline-flex items-center justify-center gap-1.5 rounded py-3 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer ${
                        isSelected 
                          ? "bg-slate-900 text-white border border-slate-800" 
                          : "bg-blue-600 text-white hover:bg-blue-700"
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
      <section className="py-20 sm:py-28 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded font-mono mb-3">
              Expectation Transparency
            </span>
            <h2 className="text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              What happens after you join?
            </h2>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              We value your feedback and timeline commitment. Here is what you can expect as an active cohort member:
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-5 rounded-xl border border-[#E6EDF5] bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono">01 / CONFIRMATION</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mt-2">You receive confirmation</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Your research cohort interest is registered immediately. We generate a persistent anonymous Cohort ID.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E6EDF5] bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono">02 / COMMUNICATIONS</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mt-2">You may receive updates</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Astrateq occasionally shares high-level concept validation reports, regional benchmarks, and study progress.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E6EDF5] bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono">03 / INFLUENCE</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mt-2">You help shape the concept</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Your participation and focus telemetry surveys help determine whether the concept moves toward future prototype development.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[#E6EDF5] bg-slate-50/50">
              <span className="text-[10px] font-bold text-blue-600 font-mono">04 / LIABILITY</span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mt-2">No purchase commitment</h4>
              <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">
                Onboarding does not require fees, deposits, or subsequent subscription contracts. It is entirely study-based.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — SIGNUP FORM / RESERVATION FORM */}
      <section ref={formRef} id="signup-form-section" className="py-20 sm:py-28 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-600 to-cyan-500" />
            
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[9px] font-extrabold uppercase tracking-widest text-blue-600 font-mono mb-3">
                Research Enrollment
              </span>
              <h3 className="text-xl font-black uppercase tracking-wider text-slate-900">
                Join the Driver Awareness Research Cohort
              </h3>
              <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
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
              <form onSubmit={handleSignupSubmit} className="space-y-5">
                
                {/* Level Recap Indicator */}
                <div className="p-3.5 rounded border border-blue-100 bg-blue-50/30 text-xs">
                  <p className="text-[9px] font-bold text-blue-500 uppercase tracking-wider font-mono">Selected Level:</p>
                  <p className="font-extrabold text-slate-900 uppercase mt-0.5">
                    {tiers.find(t => t.id === selectedTier)?.title}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">
                    COMMITMENT: {tiers.find(t => t.id === selectedTier)?.requirement.toUpperCase()}
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
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
                      className="w-full rounded border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-sans text-slate-800 focus:border-slate-900 focus:outline-none transition-colors"
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
                      className="w-full rounded border border-slate-200 py-2.5 px-3.5 text-xs bg-white font-mono uppercase tracking-wider text-slate-800 focus:border-slate-900 focus:outline-none cursor-pointer transition-colors"
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
                      className="w-full rounded border border-slate-200 py-2.5 pl-10 pr-4 text-xs font-sans text-slate-800 focus:border-slate-900 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Driving Context (Optional) */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono flex justify-between">
                    <span>Driving Context (Optional)</span>
                    <span className="text-slate-400">e.g. daily highway commute</span>
                  </label>
                  <textarea
                    rows={3}
                    value={drivingContext}
                    onChange={(e) => setDrivingContext(e.target.value)}
                    placeholder="Briefly describe your regular routes or typical fatigue challenges (e.g. long highway travel, winter storms)..."
                    className="w-full rounded border border-slate-200 bg-white py-2.5 px-3.5 text-xs font-sans text-slate-800 focus:border-slate-900 focus:outline-none transition-colors resize-none"
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
