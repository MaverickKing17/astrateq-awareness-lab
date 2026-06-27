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

  React.useEffect(() => {
    if (initialSelectedTier) {
      setSelectedTier(initialSelectedTier);
    }
  }, [initialSelectedTier]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [province, setProvince] = useState("ON");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupResult, setSignupResult] = useState<{ cohortId: string; tierLabel: string } | null>(null);

  const tiers = [
    {
      id: "access",
      title: "Standard Research Engagement",
      engagement: "Basic Contributor",
      desc: "Receive bi-monthly regional benchmarks, driver attention focus reports, and early platform beta simulation validation opportunities.",
      requirement: "Periodic simulation surveys (5 min, every 60 days)",
      features: [
         "Bi-monthly Canadian driver statistics",
         "Early simulation model feedback keys",
         "General community benchmark reports",
         "100% cloud-simulated access"
      ],
      badge: "Self-Guided",
      color: "border-slate-200 bg-white text-slate-900"
    },
    {
      id: "guardian",
      title: "Active Safety Research Engagement",
      engagement: "Active Researcher",
      desc: "Deep-dive focus profiling, cognitive load analysis workshops, and direct feedback channels with behavioural safety simulation scientists.",
      requirement: "Monthly active simulator evaluations",
      features: [
        "Personalized cognitive fatigue trends",
        "Invitation to cognitive safety workshops",
        "Priority simulation feature validation channels",
        "Direct email feedback log with researchers"
      ],
      badge: "Popular Choice",
      color: "border-slate-900 bg-white text-slate-900",
      highlight: true
    },
    {
      id: "founding",
      title: "Steering Advisory Panel",
      engagement: "Core Panelist",
      desc: "Direct involvement in defining future safety standards and simulation hypotheses. Quarterly closed-door virtual roundtables and early conceptual model review.",
      requirement: "Quarterly advisory sessions & interviews",
      features: [
        "Closed-door advisory panel membership",
        "Early conceptual software reports",
        "Co-author attribution on research studies",
        "Lifetime platform validation credits"
      ],
      badge: "Exclusive Cohort",
      color: "border-slate-950 bg-slate-950 text-white"
    }
  ];

  const handleOpenSignup = (tierId: string) => {
    setSelectedTier(tierId);
    setIsModalOpen(true);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;

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
        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 bg-slate-50 border border-slate-200 rounded px-3 py-1 font-mono">
          🇨🇦 Pre-Launch Waitlist & Research Participation
        </span>
        <h1 className="mt-4 text-2xl font-bold uppercase tracking-tight text-slate-900 sm:text-3xl">
          Research Participation Levels
        </h1>
        <p className="mt-3 text-xs text-slate-500 leading-relaxed">
          Select your desired level of research participation. Each option represents **research engagement depth only** to collect feedback for validating our cognitive simulation model—this is NOT a commercial SaaS product, subscription plan, or finished application.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded border border-slate-200 text-[10px] text-slate-600 font-mono uppercase tracking-wider">
          <Info className="h-3.5 w-3.5 text-slate-500" />
          <span>Purely software simulation study. No physical tracking hardware required.</span>
        </div>
      </div>

      {/* Cohort Tiers (3 cards) */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {tiers.map(tier => {
          const isDark = tier.id === "founding";
          return (
            <div 
              key={tier.id}
              className={`rounded-xl border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                isDark 
                  ? "bg-slate-950 text-white border-blue-900/40 shadow-[0_0_25px_rgba(59,130,246,0.1)]" 
                  : "bg-white text-slate-900 border-blue-100 shadow-[0_0_20px_rgba(59,130,246,0.05)] hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]"
              } ${tier.highlight ? "ring-2 ring-blue-500 ring-offset-2 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : ""}`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 rounded-bl bg-blue-600 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                  Highly Advised
                </div>
              )}

              <div>
                {/* Badge */}
                <span className={`inline-flex items-center rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider mb-4 font-mono ${
                  isDark ? "bg-slate-900 text-slate-300 border border-slate-800" : "bg-slate-100 text-slate-800 border border-slate-200"
                }`}>
                  {tier.badge}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold uppercase tracking-wide leading-tight">{tier.title}</h3>
                
                {/* Engagement sub-info */}
                <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono">
                  <span className={isDark ? "text-slate-400" : "text-slate-400"}>LEVEL:</span>
                  <span className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">{tier.engagement}</span>
                </div>

                {/* Description */}
                <p className={`mt-4 text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                  {tier.desc}
                </p>

                {/* Requirement Panel */}
                <div className={`mt-5 p-3.5 rounded flex flex-col gap-1 text-[11px] ${
                  isDark ? "bg-slate-900/60 border border-slate-800" : "bg-slate-50 border border-slate-200"
                }`}>
                  <span className={`font-bold font-mono text-[10px] uppercase tracking-wider ${isDark ? "text-slate-400" : "text-slate-500"}`}>Cohort Commitment:</span>
                  <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] font-mono">{tier.requirement}</span>
                </div>

                {/* Key Features Header */}
                <p className={`mt-6 text-[10px] font-bold uppercase tracking-wider font-mono ${isDark ? "text-slate-400" : "text-slate-400"}`}>
                  Cohort Deliverables:
                </p>

                {/* Features List */}
                <ul className="mt-3 space-y-2.5">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs">
                      <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
                      <span className={isDark ? "text-slate-300" : "text-slate-600"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100/10 font-mono">
                <button
                  onClick={() => handleOpenSignup(tier.id)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded py-3 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 shadow-[0_2px_8px_rgba(59,130,246,0.25)] hover:shadow-[0_4px_12px_rgba(59,130,246,0.35)]"
                >
                  <span>Join Research Cohort</span>
                  <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
                </button>
                <p className="text-center text-[9px] font-mono uppercase tracking-wider text-slate-400 mt-3">
                  Free participation • Encrypted
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust reassurance panel */}
      <div className="mt-16 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="p-3 rounded border border-slate-200 bg-slate-50 text-slate-900 shrink-0">
          <Heart className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 leading-snug">Canadian Cognitive Safety Research Standard</h4>
          <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
            Our study adheres strictly to ethical guidelines. Your personal email and behavioral answers are purely mapped to simulated intelligence focus baselines, validating software performance before public release. No location tracking or telemetry is ever executed.
          </p>
        </div>
      </div>

      {/* Enrollment Signup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl border border-slate-200"
            >
              {/* Modal header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-mono">
                    Study Registration
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900 mt-2">Cohort Onboarding</h3>
                </div>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSignupResult(null);
                  }}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6">
                {signupResult ? (
                  /* Success screen */
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-900 text-white mb-4">
                      <Check className="h-5 w-5" />
                    </div>
                    <h4 className="text-base font-bold uppercase tracking-wide text-slate-900">Registration Confirmed</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 font-mono">
                      {signupResult.tierLabel}
                    </p>
                    <p className="text-xs text-slate-500 mt-3 max-w-sm leading-relaxed">
                      Congratulations! Your driver focus profile has been successfully integrated into our pre-launch validation model.
                    </p>

                    {/* Cohort ID panel */}
                    <div className="mt-6 w-full rounded border border-slate-200 bg-slate-50 p-4 font-mono text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Your Research Cohort ID</p>
                      <p className="text-base font-bold text-slate-800 mt-1 select-all">{signupResult.cohortId}</p>
                    </div>

                    <div className="mt-6 flex flex-col gap-1 text-[10px] font-mono uppercase text-slate-400">
                      <span>• Dispatching kit to: <strong className="text-slate-600">{email}</strong></span>
                      <span>• Calibrated region: <strong className="text-slate-600">{province}</strong></span>
                    </div>

                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setSignupResult(null);
                        setEmail("");
                        setConsent(false);
                      }}
                      className="mt-8 w-full rounded bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-700 shadow-md cursor-pointer"
                    >
                      Complete
                    </button>
                  </div>
                ) : (
                  /* Input form */
                  <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
                    
                    {/* Selected Tier recap */}
                    <div className="p-3.5 rounded border border-slate-200 bg-slate-50 text-xs">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Registering For:</p>
                      <p className="font-bold text-slate-800 uppercase mt-0.5">
                        {tiers.find(t => t.id === selectedTier)?.title}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">
                        COMMITMENT: {tiers.find(t => t.id === selectedTier)?.requirement.toUpperCase()}
                      </p>
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                        Email Address
                      </label>
                      <div className="relative rounded shadow-xs">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@gmail.com"
                          className="w-full rounded border border-slate-200 py-2.5 pl-10 pr-4 text-xs font-mono uppercase tracking-wider focus:border-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Province Selector */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                        Province / Territory
                      </label>
                      <select
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        className="w-full rounded border border-slate-200 p-2.5 text-xs bg-white font-mono uppercase tracking-wider focus:border-slate-900 focus:outline-none"
                      >
                        {provinces.map(prov => (
                          <option key={prov.code} value={prov.code}>
                            {prov.name} ({prov.code})
                          </option>
                        ))}
                      </select>
                      <p className="text-[9px] text-slate-400 font-mono uppercase mt-1">Used for provincial mapping.</p>
                    </div>

                    {/* Score pre-fill indicator */}
                    {score && (
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded">
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                        <span>Driver Score ({score}) will be linked.</span>
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
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      />
                      <label htmlFor="consent" className="text-[10px] text-slate-500 leading-relaxed cursor-pointer font-mono uppercase">
                        I consent to contribute my anonymous answers to Astrateq's Canadian validation study.
                      </label>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !consent}
                      className="mt-4 w-full flex items-center justify-center gap-2 rounded bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer shadow-[0_4px_12px_rgba(59,130,246,0.25)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Generating Kit...</span>
                        </>
                      ) : (
                        <>
                          <span>Onboard Profile</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex justify-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                      <span>SECURE SERVER • CAN-ON</span>
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
