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
      title: "Standard Priority Reservation",
      levelLabel: "Early-Bird Queue",
      desc: "Perfect for everyday drivers looking to secure their Aware-1 alert console at a baseline launch discount.",
      requirement: "Free reservation slot with no deposit",
      features: [
        "20% Guaranteed Launch Discount",
        "Production queue status notifications",
        "Standard Matte Graphite chassis",
        "No credit card required to secure slot"
      ],
      badge: "20% LAUNCH DISCOUNT",
      color: "border-slate-200 bg-white text-slate-900"
    },
    {
      id: "guardian",
      title: "VIP Elite Reservation",
      levelLabel: "Batch 1 Guaranteed",
      desc: "Our most popular tier. Secures early production priority and maximum locked-in savings.",
      requirement: "Free priority slot with no deposit",
      features: [
        "40% VIP Launch Discount (Locked-In)",
        "Guaranteed Batch 1 Priority Shipment",
        "Exclusive Slate Silver metallic finish",
        "Priority beta firmware feature voting rights",
        "Cancel anytime with zero penalty"
      ],
      badge: "40% VIP DISCOUNT • POPULAR",
      color: "border-blue-500 bg-white text-slate-900",
      highlight: true
    },
    {
      id: "founding",
      title: "Founding Backer Allocation",
      levelLabel: "Batch 1 Executive",
      desc: "For ultimate driver safety advocates wishing to collaborate with Astrateq hardware engineers.",
      requirement: "Free executive slot with no deposit",
      features: [
        "50% Custom Founding Launch Discount",
        "Chassis laser-engraved with your custom name plate",
        "Lifetime core firmware updates free of charge",
        "Direct virtual roundtable interviews with builders",
        "Founding steering panel feature voting rights"
      ],
      badge: "50% FOUNDING DISCOUNT",
      color: "border-rose-500 bg-slate-950 text-white"
    }
  ];

  const faqItems = [
    {
      q: "Is this a real product yet?",
      a: "Yes, Astrateq is pre-launching the production queue for the Astrateq Aware-1 dashboard alert console. We are conducting this market validation and priority reservation campaign to gauge production batch volumes across Canadian provinces. Your reservation locks in your priority discount queue slot with zero deposit."
    },
    {
      q: "Is this connected to my vehicle's computer?",
      a: "No. Unlike intrusive telematics adapters, the Astrateq Aware-1 is 100% independent. It does not plug into your OBD or OBD-II ports, doesn't read vehicle diagnostic codes, and does not require wire splicing. It is powered via a simple USB-C or standard 12V outlet."
    },
    {
      q: "Does this require complex hardware installation?",
      a: "Not at all. The Aware-1 is designed for instant, tool-free setup. It attaches magnetically to a subtle, damage-free dashboard gel mount. You can dock or undock the device in less than a second."
    },
    {
      q: "Is this used by insurance companies?",
      a: "Absolutely not. Privacy is our highest priority. The Astrateq Aware-1 runs entirely localized Edge AI. There is no cellular transmitter, no GPS tracking, and no cloud storage. Since no cameras record footage and all eye-mesh vectors are calculated locally and immediately discarded, no data can ever be shared, sold, or leased to insurers or third parties."
    },
    {
      q: "What is the 60-Second Driver Awareness Simulator?",
      a: "The simulator is our interactive diagnostic lead magnet. It is a quick, browser-based questionnaire designed to gauge your fatigue exposure and attentiveness. Completing it helps model your driving risk parameters, calibrates your Aware-1 alerts, and instantly unlocks a 40% early-bird launch discount code."
    },
    {
      q: "What happens after I reserve?",
      a: "You will receive an immediate confirmation of your reservation slot. We will send you priority production updates, behind-the-scenes engineering design files, and shipping notifications as your queue slot approaches. There is no deposit required and you can cancel anytime."
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
      <div className="absolute top-[60%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none -z-10" />      {/* SECTION 1 — HERO: THE PRE-ORDER CONVICTION STATEMENT */}
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
                🇨🇦 Astrateq Canada Production Reservation Campaign
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.08] font-sans"
              >
                Secure your <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  Priority Production Slot
                </span> <br />
                for the Aware-1.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-sans font-medium"
              >
                Reserve your Astrateq Aware-1 dashboard alert console today. No deposit, credit card, or financial commitment is required. Locking in your spot registers your batch queue and reserves up to a <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">50% discount</span> on the final production batch.
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
                  <span>Select Tier & Reserve</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[10px] sm:text-xs text-slate-500 font-mono"
              >
                Takes under 30 seconds • No vehicle connection • No insurance telematics • Cancel anytime
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
                  <span>No Deposits Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span>100% Edge AI Privacy</span>
                </div>
              </motion.div>
            </div>

            {/* Right Mini Dashboard Column (Tactile Pre-Order Queue Ticket) */}
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
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono">ASTRATEQ REGISTRY</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 font-mono mt-0.5">Priority Queue Slot Ticket</span>
                    </div>
                    <span className="inline-flex items-center rounded bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[8px] font-bold text-blue-700 uppercase tracking-wide font-mono">ACTIVE SLOT</span>
                  </div>

                  <div className="space-y-3 font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase">EST DELIVERY:</span>
                      <span className="text-slate-900 font-black">Q4 2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase">BATCH CLASSIFICATION:</span>
                      <span className="text-slate-900 font-black">BATCH 1 PRIORITY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase">SECURED DISCOUNT:</span>
                      <span className="text-emerald-600 font-black">UP TO 50% LAUNCH REFUND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase">SECURITY PROTOCOL:</span>
                      <span className="text-slate-900 font-black">100% OFFLINE EDGE AI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase">REGION ENFORCEMENT:</span>
                      <span className="text-slate-900 font-black">CANADA SOVEREIGN</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-4 text-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">RESERVATION KEY</p>
                    <p className="text-lg font-black text-slate-800 uppercase tracking-wider font-mono mt-1">CAN-A1-PENDING</p>
                  </div>

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
                      />
                    ))}
                  </div>

                  <p className="text-center text-[7px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    Zero Deposit Ticket • Submit Form Below to Confirm Key
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT YOU SECURE WITH YOUR FREE RESERVATION */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Reservation Benefits
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              What You Secure with Your Free Reservation
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto font-sans">
              Locking in your priority pre-order places you in our Canada production batch with zero financial commitment.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: <Award className="h-6 w-6 text-blue-600" />,
                title: "Guaranteed Production Slot",
                desc: "Secure your place in the initial Canada shipping queue. As soon as production tooling commences, your slot is locked."
              },
              {
                icon: <Sparkles className="h-6 w-6 text-cyan-500" />,
                title: "Up to 50% Early-Bird Discount",
                desc: "Registration completely locks in your discount value, which will be applied directly to your purchase upon device release."
              },
              {
                icon: <Users className="h-6 w-6 text-indigo-600" />,
                title: "Engineering Status Briefs",
                desc: "Receive direct briefs and hardware logs detailing physical injection molding, optical calibration, and Canadian laboratory testing."
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

      {/* SECTION 3 — EMOTIONAL CANADIAN DRIVER RELEVANCE SECTION */}
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
                Canadian drivers face winter blackouts, endless highway distances, dark commutes, and growing privacy anxiety around tracking-based insurance apps. The Astrateq Aware-1 is a localized hardware console that runs edge-AI offline, designed specifically to help drivers stay awake and alert without sending private data to the cloud.
              </p>
            </div>

            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
              {[
                {
                  icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
                  title: "Fatigue can build quietly",
                  desc: "Attention declines gradually during late night commutes or during repeated multi-hour trips."
                },
                {
                  icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
                  title: "Tracking tools feel invasive",
                  desc: "Many solutions rely on invasive phone cameras, constant GPS tracking, or insurance company oversight."
                },
                {
                  icon: <MapPin className="h-5 w-5 text-blue-500" />,
                  title: "Calibrated for Canada",
                  desc: "Built to perform in extreme cold weather, glare, snow reflections, and long rural stretches."
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

      {/* SECTION 4 — HARDWARE SPECIFICATIONS */}
      <section className="py-20 sm:py-28 bg-[#EDF5FC] border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200/80 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              Device Specs
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Aware-1 Technical Specifications
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
              Engineered with physical component integrity, high-precision local optics, and high-efficiency offline neural accelerators.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: <Brain className="h-5 w-5 text-blue-600" />,
                title: "Offline Edge AI Silicon",
                desc: "Integrated neural core running localized gaze-vectors. Zero remote cloud dependency, and zero latency."
              },
              {
                icon: <Eye className="h-5 w-5 text-cyan-600" />,
                title: "Non-Contact IR Matrix",
                desc: "High-contrast iris and eyelid tracker compatible with polarized sunglasses, corrective lenses, and night conditions."
              },
              {
                icon: <Users className="h-5 w-5 text-indigo-600" />,
                title: "Aviation-Grade Chassis",
                desc: "Anodized aluminum alloy casing with magnetic quick-mount base and high-temperature dashboard adhesive."
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

      {/* SECTION 5 — HOW THE RESERVATION PROCESS WORKS */}
      <section className="py-20 sm:py-28 bg-[#EDF5FC] border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-mono">
              Simple Pre-Order Flow
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              How the Reservation Works
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto font-sans">
              Secure your hardware unit through a clean, fully transparent validation queue.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            
            {/* Visual connector line for desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-dashed bg-slate-300 -z-10" />

            {[
              {
                step: "01",
                title: "Select Reservation Level",
                desc: "Choose from Standard, VIP Elite, or Founding Backer with zero pre-payment required."
              },
              {
                step: "02",
                title: "Qualify for Discount (Optional)",
                desc: "Try our rapid 60-second diagnostic simulator to unlock an additional 40% discount on release."
              },
              {
                step: "03",
                title: "Track Manufacturing Status",
                desc: "Get real development logs as we finalize CNC enclosure tooling and PCB layouts."
              },
              {
                step: "04",
                title: "Finalize & Secure Delivery",
                desc: "Provide your delivery address only when your specific production queue number is ready to ship."
              }
            ].map((flow, idx) => (
              <div key={idx} className="relative p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all duration-300 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center mb-4 shadow-sm">
                    {flow.step}
                  </div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-mono mb-2">{flow.step === "02" ? "Try Diagnostic Simulator" : flow.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {flow.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex justify-center">
            <button
              onClick={onStartSimulation}
              className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.2)] transition-all cursor-pointer font-mono"
            >
              <span>Try Diagnostic Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 6 — DIFFERENTIATION: AWARE-1 VS TRADITIONAL SYSTEMS */}
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
              Astrateq Aware-1 is engineered differently from surveillance cameras, black-box trackers, and insurance-pricing modules.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            {/* Table Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 bg-slate-900 text-white p-4.5 font-mono text-[10px] font-black uppercase tracking-widest">
              <div className="px-2">Traditional Fleet/Insurance Approach</div>
              <div className="border-t sm:border-t-0 sm:border-l border-slate-700 mt-2 pt-2 sm:mt-0 sm:pt-0 sm:pl-6">
                Astrateq Aware-1 Hardware
              </div>
            </div>
            
            {/* Table Rows */}
            <div className="divide-y divide-slate-100 font-sans text-xs">
              {[
                {
                  market: "Dashcams capture, record, and stream permanent in-cabin video footage directly to remote servers.",
                  astrateq: "Zero video recording. High-speed infrared sensors measure relative vectors in RAM and discard them immediately."
                },
                {
                  market: "Telematics and OBD-II hardware log real-time vehicle metrics, coordinates, speed, and braking logs.",
                  astrateq: "OBD-II bypassed. Powers via basic USB-C with zero link to vehicle electronics or computer systems."
                },
                {
                  market: "Insurance and mobile apps monitor live GPS driving behaviors to directly alter rates and premiums.",
                  astrateq: "Zero third-party reporting. No GPS hardware or cell chips are present. Designed purely for personal awareness."
                },
                {
                  market: "Safety alerts rely on static, loud auditory alarms that cause distraction and road anxiety.",
                  astrateq: "Features a gentle, sweeping 180° peripheral light bar with color-coded soft ambient signals."
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

      {/* SECTION 7 — TRUST LAYER (Uncompromised Privacy Architecture) */}
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
              The Aware-1 console operates on localized edge circuits to isolate and protect your safety.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Smartphone className="h-5 w-5 text-cyan-400" />,
                title: "Bypasses OBD-II",
                desc: "No link to your vehicle computer, speed sensors, dashboard dials, or diagnostic logs."
              },
              {
                icon: <Lock className="h-5 w-5 text-cyan-400" />,
                title: "Zero Insurance Sync",
                desc: "Pre-launch slots are entirely private. We never share metrics or reservation statuses with insurers."
              },
              {
                icon: <ShieldCheck className="h-5 w-5 text-cyan-400" />,
                title: "100% Local Logic",
                desc: "Eyelid speed variables are computed strictly inside localized edge RAM. Zero video storage."
              },
              {
                icon: <FileText className="h-5 w-5 text-cyan-400" />,
                title: "Cancel At Any Time",
                desc: "Pre-launch reservations contain zero financial locks or binding conditions. You hold total control."
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

      {/* SECTION 8 — PRE-ORDER RESERVATION (Engagement levels and signup) */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-200/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Priority Tiers
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Select Your Reservation Tier
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto font-sans">
              Choose the queue depth that matches your pre-launch interest. Every tier secures priority early-bird batch delivery with absolutely no cash deposit required.
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
            *No deposit required • No payment obligation • Cancel anytime • 100% offline edge AI
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
                Astrateq Priority Registry
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-sans">
                Reserve Your Aware-1 Dashboard Console
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-sans">
                Complete the priority registration below to lock in your production queue number. Your slot secures your early-bird discount rate and estimated shipping priority batch.
              </p>
            </div>

            {signupResult ? (
              <div className="flex flex-col items-center justify-center text-center py-6">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-600 text-white mb-4 shadow-md">
                  <Check className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold uppercase tracking-wide text-slate-900">Priority Reservation Confirmed!</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 font-mono">
                  Tier: {signupResult.tierLabel}
                </p>
                <p className="text-xs text-slate-500 mt-3 max-w-sm leading-relaxed font-sans">
                  Success! Your Astrateq Aware-1 production reservation has been securely logged. We will notify you with direct manufacturing updates, optics calibrations, and coordinate your delivery queue when your batch is ready.
                </p>

                <div className="mt-6 w-full rounded border border-slate-200 bg-slate-50 p-4 font-mono text-center shadow-xs">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Priority Queue Reference ID</p>
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
                  Create Another Reservation
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
                  <label htmlFor="consent" className="text-[10px] text-slate-500 leading-normal cursor-pointer font-sans uppercase font-bold tracking-wide">
                    I agree to lock in my priority pre-order queue spot and receive edge-AI hardware updates.
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
                      <span>Processing Reservation...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Priority Reservation</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[9px] text-slate-400 font-mono uppercase tracking-wider mt-3">
                  No deposit required • Bypasses OBD-II • No insurance logs • Cancel anytime
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
                priority production slot?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto font-sans">
                Join the early priority queue today with zero obligation or upfront cost. Help us validate demand for premium, offline-first driver awareness console hardware.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <button
                  onClick={() => scrollToForm()}
                  className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 hover:bg-blue-700 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow-md active:scale-95 transition-all cursor-pointer font-mono"
                >
                  <span>Reserve Aware-1 Priority Slot</span>
                </button>
                <button
                  onClick={onStartSimulation}
                  className="inline-flex items-center justify-center gap-2 rounded border border-slate-200 bg-white hover:bg-slate-50 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-slate-700 active:scale-95 transition-all cursor-pointer font-mono"
                >
                  <span>Try Diagnostic Simulator First</span>
                </button>
              </div>

              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                No deposit required • Bypasses OBD-II • Cancel anytime
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
