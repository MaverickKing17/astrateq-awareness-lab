import React, { useState } from "react";
import { 
  Users, Award, ShieldCheck, Heart, Mail, Check, Sparkles, Loader2, Info, ArrowRight, ShieldAlert
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CohortPageProps {
  score?: number;
  initialSelectedTier?: string;
}

export default function CohortPage({ score, initialSelectedTier }: CohortPageProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(initialSelectedTier || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("ON");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupResult, setSignupResult] = useState<{ cohortId: string; tierLabel: string } | null>(null);

  const tiers = [
    {
      id: "access",
      title: "Awareness Access Tier",
      engagement: "Basic Contributor",
      desc: "Receive bi-monthly regional benchmarks, driver attention focus reports, and early platform beta opportunities.",
      requirement: "Periodic surveys (5 min, every 60 days)",
      features: [
        "Bi-monthly Canadian driver statistics",
        "Early software beta access keys",
        "General community benchmark reports",
        "100% cloud-simulated access"
      ],
      badge: "Self-Guided",
      color: "border-slate-200"
    },
    {
      id: "guardian",
      title: "Guardian Research Tier",
      engagement: "Active Researcher",
      desc: "Deep-dive focus profiling, cognitive load analysis workshops, and direct feedback channels with behavioural safety scientists.",
      requirement: "Monthly active simulator evaluations",
      features: [
        "Personalized cognitive fatigue trends",
        "Invitation to cognitive safety workshops",
        "Priority beta feature validation channels",
        "Direct email feedback log with researchers"
      ],
      badge: "Popular Support",
      color: "border-blue-300 shadow-md shadow-blue-500/5",
      highlight: true
    },
    {
      id: "founding",
      title: "Founding Intelligence Cohort",
      engagement: "Advisory Panelist",
      desc: "Direct involvement in defining future safety standards. Quarterly closed-door virtual roundtables and early conceptual review.",
      requirement: "Quarterly advisory sessions & interviews",
      features: [
        "Closed-door advisory panel membership",
        "Early-stage conceptual hardware validation reports",
        "Co-author attribution on research abstracts (optional)",
        "Lifetime platform validation credits"
      ],
      badge: "Exclusive Cohort",
      color: "border-slate-900 bg-slate-950 text-white"
    }
  ];

  const handleOpenSignup = (tierId: string) => {
    setSelectedTier(tierId);
    setIsModalOpen(true);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

    setIsSubmitting(true);
    
    // Simulate API registration call
    setTimeout(() => {
      const generatedId = `COHORT-CAN-${Math.floor(1000 + Math.random() * 9000)}`;
      const tierLabel = tiers.find(t => t.id === selectedTier)?.title || "Selected Tier";
      
      setSignupResult({
        cohortId: generatedId,
        tierLabel
      });
      setIsSubmitting(false);
    }, 1800);
  };

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1.5 rounded-full">
          🇨🇦 Pre-Launch Waitlist & Engagement
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Join Research Cohort
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
          Select your desired research engagement tier. We are enrolling Canadian drivers to validate the 
          <strong> Driver Awareness Intelligence</strong> simulation model and collect feedback for safer road habits.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-xs text-slate-600 font-semibold">
          <Info className="h-4 w-4 text-blue-600" />
          <span>This is purely a software behavioral study. No vehicle hardware is required.</span>
        </div>
      </div>

      {/* Cohort Tiers (3 cards) */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {tiers.map(tier => {
          const isDark = tier.id === "founding";
          return (
            <div 
              key={tier.id}
              className={`rounded-3xl border p-8 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-lg relative overflow-hidden ${
                isDark ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
              } ${tier.highlight ? "ring-2 ring-blue-500" : ""}`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 rounded-bl-xl bg-blue-500 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                  Highly Advised
                </div>
              )}

              <div>
                {/* Badge */}
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider mb-4 ${
                  isDark ? "bg-slate-800 text-cyan-400" : "bg-blue-50 text-blue-700"
                }`}>
                  {tier.badge}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold leading-tight">{tier.title}</h3>
                
                {/* Engagement sub-info */}
                <div className="mt-1 flex items-center gap-1.5 text-xs">
                  <span className={isDark ? "text-slate-400" : "text-slate-500"}>Engagement Level:</span>
                  <span className="font-bold text-blue-500">{tier.engagement}</span>
                </div>

                {/* Description */}
                <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                  {tier.desc}
                </p>

                {/* Requirement Panel */}
                <div className={`mt-5 p-3 rounded-xl flex flex-col gap-1 text-xs ${
                  isDark ? "bg-slate-800/60 border border-slate-700/50" : "bg-slate-50 border border-slate-100"
                }`}>
                  <span className={`font-bold ${isDark ? "text-slate-300" : "text-slate-600"}`}>Cohort Commitment:</span>
                  <span className="font-medium text-blue-600">{tier.requirement}</span>
                </div>

                {/* Key Features Header */}
                <p className={`mt-6 text-xs font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                  Cohort Deliverables:
                </p>

                {/* Features List */}
                <ul className="mt-4 space-y-3">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs">
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${isDark ? "text-cyan-400" : "text-blue-600"}`} />
                      <span className={isDark ? "text-slate-300" : "text-slate-600"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100/10">
                <button
                  onClick={() => handleOpenSignup(tier.id)}
                  className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                    isDark 
                      ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-sm shadow-cyan-400/10" 
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-600/10"
                  }`}
                >
                  <span>Join Research Cohort</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <p className={`text-center text-[10px] mt-2 ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                  Free participation • Encrypted data storage
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust reassurance panel */}
      <div className="mt-16 rounded-3xl border border-slate-150 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="p-3 rounded-full bg-blue-50 text-blue-600 shrink-0">
          <Heart className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-900 leading-snug">Canadian Cognitive Safety Research Standard</h4>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            Our study adheres strictly to ethics guidelines. Your personal email and behavioral answers are purely mapped to simulated intelligence focus baselines, validating software performance before public release. No location tracking or telemetry is ever executed.
          </p>
        </div>
      </div>

      {/* Enrollment Signup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 animate-in fade-in duration-200"
            >
              {/* Modal header */}
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Study Registration
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">Cohort Onboarding</h3>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSignupResult(null);
                  }}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6">
                {signupResult ? (
                  /* Success screen */
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Registration Confirmed</h4>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">
                      {signupResult.tierLabel}
                    </p>
                    <p className="text-xs text-slate-500 mt-3 max-w-sm">
                      Congratulations! Your driver focus profile has been successfully integrated into our pre-launch validation model.
                    </p>

                    {/* Cohort ID panel */}
                    <div className="mt-6 w-full rounded-xl bg-slate-50 border border-slate-200/60 p-4 font-mono text-center">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Your Research Cohort ID</p>
                      <p className="text-lg font-bold text-slate-800 mt-1 select-all">{signupResult.cohortId}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-1 text-[11px] text-slate-400">
                      <span>• An onboarding email has been dispatched to <strong className="text-slate-600">{email}</strong>.</span>
                      <span>• Your results were mapped against provincial guidelines in <strong className="text-slate-600">{province}</strong>.</span>
                    </div>

                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setSignupResult(null);
                        setEmail("");
                        setConsent(false);
                      }}
                      className="mt-8 w-full rounded-xl bg-slate-900 py-3 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  /* Input form */
                  <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                    
                    {/* Selected Tier recap */}
                    <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 text-xs">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Registering For:</p>
                      <p className="font-bold text-slate-800 mt-0.5">
                        {tiers.find(t => t.id === selectedTier)?.title}
                      </p>
                      <p className="text-slate-500 mt-1">
                        Commitment: {tiers.find(t => t.id === selectedTier)?.requirement}
                      </p>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Email Address
                      </label>
                      <div className="relative rounded-lg shadow-xs">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Province Selector */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Canadian Province / Territory
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-sm bg-white focus:border-blue-500 focus:outline-none"
                      >
                        {provinces.map(prov => (
                          <option key={prov.code} value={prov.code}>
                            {prov.name} ({prov.code})
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] text-slate-400 mt-1">Used to group results against provincial road safety frameworks.</p>
                    </div>

                    {/* Score pre-fill indicator */}
                    {score && (
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                        <Sparkles className="h-3.5 w-3.5 shrink-0" />
                        <span>Your Driver Awareness Score ({score}) will be attached to your research profile.</span>
                      </div>
                    )}

                    {/* Consent Checkbox */}
                    <div className="flex items-start gap-2.5 mt-2">
                      <input
                        type="checkbox"
                        required
                        id="consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <label htmlFor="consent" className="text-[11px] text-slate-500 leading-relaxed cursor-pointer">
                        I consent to contribute my anonymous simulation answers to Astrateq's Canadian road safety validation study.
                      </label>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !consent}
                      className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-all hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating Onboarding Kit...</span>
                        </>
                      ) : (
                        <>
                          <span>Join Waitlist & Onboard</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex justify-center gap-1.5 text-[10px] text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
                      <span>No charge • Secure server • Remove anytime</span>
                    </div>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
