import React from "react";
import { Sparkles, Brain, Lock, Eye, Check, ArrowRight, ShieldCheck, Heart } from "lucide-react";

interface ValuePropsProps {
  onStartSimulation: () => void;
}

export default function ValueProps({ onStartSimulation }: ValuePropsProps) {
  return (
    <div id="value-props" className="bg-[#F4F7FB]">
      
      {/* SECTION: WHY WE'RE BUILDING DRIVER AWARENESS INTELLIGENCE */}
      <section className="py-24 sm:py-32 bg-white border-b border-slate-200/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-[#EEF3F8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono rounded-full">
            <Heart className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            Our Vision & Purpose
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
            Why we're building Driver Awareness Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
            Today's driver technology mostly reacts after mistakes happen—beeping loudly when you drift out of your lane or automatically braking in an emergency. 
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans font-semibold">
            Driver Awareness Intelligence explores whether premium, offline-first software can help drivers understand and cultivate their own cognitive awareness before those critical moments occur.
          </p>
          <div className="pt-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              A New Category Built on Personal Empowerment, Not Surveillance
            </span>
          </div>
        </div>
      </section>

      {/* SECTION: REWRITTEN VALIDATION OBJECTIVES */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Core Inquiries
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
              What we are validating together
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              We translate rigorous cognitive science into real-world software tests. Every interaction helps answer vital questions about human-software collaboration.
            </p>
          </div>

          {/* Cards styled elegantly with Stripe/Linear-like premium borders */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_10px_30px_rgba(59,130,246,0.03)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.08)] hover:-translate-y-1">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
                  01
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-snug font-sans">
                  Can drivers recognize fatigue before it affects driving?
                </h3>
                <p className="mt-4 text-slate-500 text-xs leading-relaxed font-sans">
                  Standard safety alarms go off too late. We are evaluating whether clean, non-intrusive pre-trip check-ins and on-device behavioral telemetry can flag physical fatigue accumulation 15 minutes before the driver notices.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Active Human Calibration
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_10px_30px_rgba(59,130,246,0.03)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.08)] hover:-translate-y-1">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
                  02
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-snug font-sans">
                  Does instant, local analysis prevent attention gaps?
                </h3>
                <p className="mt-4 text-slate-500 text-xs leading-relaxed font-sans">
                  We are exploring if lightweight, highly optimized on-device computer vision models (utilizing your phone or vehicle's native front-facing setup) can reinforce focal alignment without sending sensitive data to the cloud.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                Zero-Latency Edge Processing
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_10px_30px_rgba(59,130,246,0.03)] transition-all duration-300 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.08)] hover:-translate-y-1">
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
                  03
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-snug font-sans">
                  Can we build complete safety loops without tracking?
                </h3>
                <p className="mt-4 text-slate-500 text-xs leading-relaxed font-sans">
                  Traditional companies demand constant GPS, OBD connections, and surveillance profiles. We are validating whether a pure privacy-first model—running 100% locally and isolated from cloud servers—can successfully empower drivers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Privacy-First Guarantee
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <div id="how-it-works" className="bg-[#F8FAFC] py-24 sm:py-32 border-b border-slate-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              The Path to Pure Awareness
            </span>
            <h2 className="mt-3 text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              How the Validation & Pre-Launch Works
            </h2>
            <p className="mt-3 text-xs text-slate-500 max-w-lg mx-auto font-sans">
              Help us prove there is demand for a software category that values your attention without compromising your digital sovereign rights.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-mono text-sm font-black shadow-md">
                01
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Simulate First</h4>
              <p className="mt-3 text-[11px] text-slate-500 leading-relaxed font-sans">
                Complete our rapid 60-second diagnostic simulator to establish your Fatigue Exposure baseline.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-mono text-sm font-black shadow-md">
                02
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Unlock Your Tier</h4>
              <p className="mt-3 text-[11px] text-slate-500 leading-relaxed font-sans">
                Review your simulated profile and match into a secure, free Priority queue reservation level.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-mono text-sm font-black shadow-md">
                03
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Shape the Build</h4>
              <p className="mt-3 text-[11px] text-slate-500 leading-relaxed font-sans">
                Participate in surveys, lock in launch pricing, and help direct prototype priority metrics.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-mono text-sm font-black shadow-md">
                04
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Receive Early Access</h4>
              <p className="mt-3 text-[11px] text-slate-500 leading-relaxed font-sans">
                Secure standard platform download credentials once our offline application is production-ready.
              </p>
            </div>

          </div>

          <div className="mt-14 flex justify-center">
            <button
              onClick={onStartSimulation}
              className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-8 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95 cursor-pointer font-mono"
            >
              Start Awareness Simulator
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
