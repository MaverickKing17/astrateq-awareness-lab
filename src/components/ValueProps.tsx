import React from "react";
import { Sparkles, Brain, Lock, Eye, Check, ArrowRight, ShieldCheck, Heart, GitMerge, Compass, Milestone } from "lucide-react";

interface ValuePropsProps {
  onStartSimulation: () => void;
  onNavigateToCohort: (tier?: string) => void;
}

export default function ValueProps({ onStartSimulation, onNavigateToCohort }: ValuePropsProps) {
  return (
    <div id="value-props" className="bg-[#F8FAFC]">
      
      {/* SECTION: WHY WE'RE BUILDING DRIVER AWARENESS INTELLIGENCE (Improvement 2 & 10) */}
      {/* Psychological Question: "Why does this exist?" */}
      <section className="py-24 sm:py-32 bg-white border-b border-slate-200/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.015] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50/50 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono rounded-full">
              <Heart className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
              The Sovereign Purpose
            </span>
            
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                Why we are building Driver Awareness Intelligence
              </h2>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto uppercase">
                Technology should protect your attention, not commodify your privacy.
              </p>
            </div>

            <div className="max-w-2xl mx-auto text-left space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              <p>
                Today's standard driver technology is almost entirely reactive. Lane departure warnings, forward collision alerts, and automatic emergency braking are engineered to sound loud, startling alarms <span className="text-slate-900 font-semibold">only after an error has already occurred</span>.
              </p>
              <div className="border-l-2 border-blue-500 pl-4 py-1 my-4 bg-slate-50/55 rounded-r">
                <p className="font-medium text-slate-800 italic">
                  We are asking a fundamentally different question: Can elegant, on-device software help drivers recognize and map their own cognitive fatigue curve before critical situations develop on the road?
                </p>
              </div>
              <p>
                Astrateq represents a shift away from black-box telemetry and invasive surveillance. By exploring lightweight, offline-first awareness intelligence, we seek to empower drivers with personal insights—retaining absolute data sovereignty with zero remote tracking.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                A validation study for Canada’s next generation of driving safety
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: REWRITTEN VALIDATION OBJECTIVES (Improvement 3 & 10) */}
      {/* Psychological Question: "What are you learning?" */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-[#F8FAFC] border-b border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/50 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              Research Enquiries
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              What we are validating together
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed font-sans font-medium">
              We translate rigorous cognitive science into real-world software tests. Every participant signup contributes to vital baseline benchmarks.
            </p>
          </div>

          {/* Cards styled elegantly with Stripe/Linear-like premium borders and generous breathing room */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1 */}
            <div className="relative flex flex-col justify-between rounded-2xl border-x border-b border-slate-800 border-t-4 border-t-blue-500 bg-[#0F172A] p-8 shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]">
              <div className="space-y-5">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono font-bold text-xs">
                  01
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-white leading-snug font-sans">
                  Can drivers preempt fatigue before it impairs steering?
                </h3>
                <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                  We are assessing whether brief, local pre-trip focus check-ins can flag cognitive attention drift 15 minutes before the driver feels tired.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 space-y-1.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">PRIMARY OUTCOME TARGET</p>
                <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider font-mono">92% Precision in Early Accumulation Warning</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative flex flex-col justify-between rounded-2xl border-x border-b border-slate-800 border-t-4 border-t-cyan-500 bg-[#0F172A] p-8 shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.35)]">
              <div className="space-y-5">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs">
                  02
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-white leading-snug font-sans">
                  Does instant, on-device analysis correct split focus?
                </h3>
                <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                  We are validating if highly-optimized, lightweight machine learning models can run in memory to support eye-scanning cycles with zero lag.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 space-y-1.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">PRIMARY OUTCOME TARGET</p>
                <p className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider font-mono">100% Offline Edge Gaze Focal Verification</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative flex flex-col justify-between rounded-2xl border-x border-b border-slate-800 border-t-4 border-t-indigo-500 bg-[#0F172A] p-8 shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 hover:border-indigo-400 hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]">
              <div className="space-y-5">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono font-bold text-xs">
                  03
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-white leading-snug font-sans">
                  Can we establish driver safety limits without tracking?
                </h3>
                <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                  Instead of demanding constant GPS, OBD connections, and telematics logs, we test if a fully isolated software model successfully protects driver welfare.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 space-y-1.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">PRIMARY OUTCOME TARGET</p>
                <p className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider font-mono">Zero Network Footprint with 100% RAM Privacy</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      {/* Psychological Question: "How does it work?" */}
      <div id="how-it-works" className="bg-[#F8FAFC] py-24 sm:py-32 border-b border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/50 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              The Path to Pure Awareness
            </span>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-900 font-sans">
              The Early Validation Pipeline
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-700 max-w-lg mx-auto font-sans leading-relaxed font-medium">
              Our validation model guarantees your direct influence over our eventual prototype architecture. No deposits, no binding commitments.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center bg-[#0F172A] rounded-2xl p-6 sm:p-8 border border-slate-800 border-t-2 border-t-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)]">
              <div className="flex h-11 w-11 items-center justify-center rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono text-xs font-black shadow-sm">
                01
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-white font-mono">Simulate First</h4>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans font-medium">
                Complete the 60-second diagnostic simulator to establish your baseline fatigue exposure score.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center bg-[#0F172A] rounded-2xl p-6 sm:p-8 border border-slate-800 border-t-2 border-t-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]">
              <div className="flex h-11 w-11 items-center justify-center rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-black shadow-sm">
                02
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-white font-mono">Choose Priority Level</h4>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans font-medium">
                Review your results and match with a secure early priority level that guarantees launch discount access.
              </p>
            </div>

            {/* Step-3 */}
            <div className="relative flex flex-col items-center text-center bg-[#0F172A] rounded-2xl p-6 sm:p-8 border border-slate-800 border-t-2 border-t-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]">
              <div className="flex h-11 w-11 items-center justify-center rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-black shadow-sm">
                03
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-white font-mono">Provide Driving Context</h4>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans font-medium">
                Register your typical regional route variables to help tailor our localized neural logic profiles.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center bg-[#0F172A] rounded-2xl p-6 sm:p-8 border border-slate-800 border-t-2 border-t-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]">
              <div className="flex h-11 w-11 items-center justify-center rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-black shadow-sm">
                04
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-white font-mono">Unlock Sandboxed Builds</h4>
              <p className="mt-3 text-xs text-slate-300 leading-relaxed font-sans font-medium">
                Receive initial sandboxed software invitations and developmental briefs once the study confirms demand.
              </p>
            </div>

          </div>

          {/* SUBTLE INTEGRATED CTA (Improvement 7) */}
          <div className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl border border-slate-200 bg-slate-50/50">
            <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
              Curious how your own focus habits compare? Complete our interactive diagnostic simulator in under a minute to assess your baseline fatigue profile.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onStartSimulation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 cursor-pointer font-mono"
              >
                <span>Evaluate Your Awareness</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onNavigateToCohort()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 transition-all hover:bg-slate-50 active:scale-95 cursor-pointer font-mono"
              >
                <span>View Priority Tiers</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: FUTURE VISION ROADMAP (Improvement 5 & 10) */}
      {/* Psychological Question: "Where could this go?" */}
      <section className="py-24 sm:py-32 bg-white border-b border-slate-200/50 relative overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              The Path Forward
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              What Happens If Validation Succeeds?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed font-sans font-medium">
              Your engagement directly directs our next milestones. Today's collaborative insights fuel tomorrow's production software builds.
            </p>
          </div>

          {/* ROADMAP TIMELINE (Improvement 5) */}
          <div className="max-w-5xl mx-auto relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-0.5 border-t border-dashed border-slate-200" />
            
            <div className="grid gap-8 lg:grid-cols-6 relative z-10">
              {[
                {
                  phase: "01",
                  title: "Diagnostic Simulation",
                  status: "Completed",
                  desc: "Drivers explore fatigue concepts and submit exposure evaluations.",
                  isActive: true,
                  isCurrent: false
                },
                {
                  phase: "02",
                  title: "Market Validation",
                  status: "We Are Here",
                  desc: "Analyzing regional demands and gathering early validation signups.",
                  isActive: true,
                  isCurrent: true
                },
                {
                  phase: "03",
                  title: "Prototype Dev",
                  status: "Phase 3 Trigger",
                  desc: "Compiling optimized, 100% offline Edge-AI neural networks.",
                  isActive: false,
                  isCurrent: false
                },
                {
                  phase: "04",
                  title: "Pilot Testing",
                  status: "Canada Elite",
                  desc: "Releasing early test builds to registered founding contributors.",
                  isActive: false,
                  isCurrent: false
                },
                {
                  phase: "05",
                  title: "Sovereign Launch",
                  status: "Production Ready",
                  desc: "Releasing the first complete hardware-free driver safety suite.",
                  isActive: false,
                  isCurrent: false
                },
                {
                  phase: "06",
                  title: "Future Integration",
                  status: "Smart Ecosystem",
                  desc: "Direct native dashboard support for automotive screens.",
                  isActive: false,
                  isCurrent: false
                }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl border font-mono text-sm font-black transition-all ${
                    step.isCurrent 
                      ? "bg-blue-600 border-blue-600 text-white shadow-[0_4px_15px_rgba(59,130,246,0.3)]" 
                      : step.isActive 
                        ? "bg-blue-50 border-blue-200 text-blue-600" 
                        : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    {step.phase}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-center lg:justify-start gap-1.5">
                      <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-900 font-sans">{step.title}</h4>
                    </div>
                    <span className={`inline-block text-[8px] font-bold uppercase tracking-widest font-mono ${
                      step.isCurrent 
                        ? "text-blue-600" 
                        : step.isActive 
                          ? "text-emerald-500" 
                          : "text-slate-400"
                    }`}>
                      {step.status}
                    </span>
                    <p className="text-[11px] text-slate-700 leading-relaxed font-sans font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUBTLE INTEGRATED CTA (Improvement 7) */}
          <div className="mt-16 text-center">
            <p className="text-xs text-slate-700 leading-relaxed font-sans max-w-md mx-auto font-medium">
              Our pre-launch milestones are triggered when community support reaches critical mass. Secure your early validation placement today to hasten progress.
            </p>
            <div className="mt-5">
              <button
                onClick={() => onNavigateToCohort()}
                className="inline-flex items-center justify-center gap-2 rounded bg-slate-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 cursor-pointer font-mono"
              >
                <span>Select Collaboration Level</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
