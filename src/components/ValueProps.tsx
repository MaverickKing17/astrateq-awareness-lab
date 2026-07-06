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

      {/* SECTION: FOUNDER VISION (Improvement 3, 6, 9) */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono rounded-full">
                Founder Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 font-sans leading-tight">
                Why We Started Building Driver Awareness Intelligence
              </h3>
              <div className="space-y-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                <p>
                  Every year, modern vehicles ship with more cameras, radar hubs, and continuous cellular data channels. Yet almost 100% of this hardware innovation is routed toward convenience features or uploaded back to cloud servers for corporate profiling, monetization, and insurer tracking.
                </p>
                <p>
                  We noticed that almost nothing is engineered to help <span className="text-slate-900 font-bold border-b border-blue-500/20 pb-0.5">drivers better understand themselves</span>. If your car has the technology to scan your surroundings, it should have the intelligence to help you recognize when your own attention is drifting before a hazardous situation develops.
                </p>
                <p className="font-bold text-slate-900">
                  We started Astrateq because we believe intelligence should serve and belong to the driver—fully offline, fully sovereign, with zero external surveillance.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-8 shadow-xl shadow-slate-100/40 relative overflow-hidden text-left">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
              <div className="space-y-6">
                <span className="text-4xl font-serif text-blue-500/20 block leading-none select-none">“</span>
                <p className="text-xs sm:text-[13px] italic text-slate-600 leading-relaxed font-sans font-semibold">
                  “Our goal is to build a safety shield that works for you, not against you. We want to prove that driver safety can be elegant, highly precise, and completely disconnected from the cloud.”
                </p>
                <div className="border-t border-slate-100 pt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-mono font-black text-xs text-slate-700 border border-slate-200 uppercase">
                    MK
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-slate-900 tracking-wider">Marc-Olivier Kovacs</h5>
                    <p className="text-[9px] font-extrabold uppercase text-slate-400 font-mono tracking-widest mt-0.5">Founder, Astrateq Technologies</p>
                  </div>
                </div>
              </div>
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

          {/* Cards styled elegantly with premium fully colorful Microsoft-style borders and generous breathing room */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Card 1 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-blue-50/10 pt-10 pb-8 px-8 shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl overflow-hidden" id="value-prop-card-1">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500" />
              <div className="space-y-5">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-blue-100/60 border border-blue-200 text-blue-700 font-mono font-bold text-xs">
                  01
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 leading-snug font-sans">
                  Can drivers preempt fatigue before it impairs steering?
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                  We are assessing whether brief, local pre-trip focus check-ins can flag cognitive attention drift 15 minutes before the driver feels tired.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-blue-100 space-y-1.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">PRIMARY OUTCOME TARGET</p>
                <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider font-mono">92% Precision in Early Accumulation Warning</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50/40 via-white to-cyan-50/10 pt-10 pb-8 px-8 shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-xl overflow-hidden" id="value-prop-card-2">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-500" />
              <div className="space-y-5">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-100/60 border border-cyan-200 text-cyan-700 font-mono font-bold text-xs">
                  02
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 leading-snug font-sans">
                  Does instant, on-device analysis correct split focus?
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                  We are validating if highly-optimized, lightweight machine learning models can run in memory to support eye-scanning cycles with zero lag.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-cyan-100 space-y-1.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">PRIMARY OUTCOME TARGET</p>
                <p className="text-[10px] font-extrabold text-cyan-600 uppercase tracking-wider font-mono">100% Offline Edge Gaze Focal Verification</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/40 via-white to-indigo-50/10 pt-10 pb-8 px-8 shadow-lg transition-all duration-300 hover:border-indigo-400 hover:shadow-xl overflow-hidden" id="value-prop-card-3">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-indigo-500" />
              <div className="space-y-5">
                <div className="flex h-9 w-9 items-center justify-center rounded bg-indigo-100/60 border border-indigo-200 text-indigo-700 font-mono font-bold text-xs">
                  03
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 leading-snug font-sans">
                  Can we establish driver safety limits without tracking?
                </h3>
                <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed font-sans font-medium">
                  Instead of demanding constant GPS, OBD connections, and telematics logs, we test if a fully isolated software model successfully protects driver welfare.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-indigo-100 space-y-1.5">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">PRIMARY OUTCOME TARGET</p>
                <p className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider font-mono">Zero Network Footprint with 100% RAM Privacy</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: PRODUCT VISION (Improvement 6, 8, 9) */}
      <section className="py-20 sm:py-24 bg-white border-b border-slate-200/50 relative overflow-hidden">
        <div className="absolute top-[30%] left-[-10%] w-[35vw] h-[35vw] bg-indigo-400/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-700 font-mono">
              Product Concept
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Imagine Driver Awareness Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed font-sans font-medium">
              A sovereign, hardware-free companion designed to translate complex micro-attentiveness behaviors into quiet, proactive safety feedback.
            </p>
          </div>

          {/* Premium Apple/Linear-style Bento Grid Layout */}
          <div className="grid gap-6 md:grid-cols-3 text-left">
            
            {/* Bento 1: Left double span */}
            <div className="md:col-span-2 relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-lg overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-xl flex flex-col justify-between group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-all duration-500" />
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-blue-100/60 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Eye className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  Active Focal & Ocular Baselines
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium max-w-lg">
                  Instead of tracking where you are on a map, the offline engine maps the density of your visual field—assessing blink durations and subtle eye movement saccades to identify the micro-moments when attention begins to fragment.
                </p>
              </div>
              
              {/* Refined, high-contrast, clear metrics display (Improvement 12) */}
              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4 font-sans text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-blue-100/80 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    On-Device Calibration Baseline
                  </span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-extrabold text-[9px]">Calibrated</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-sm text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Blink Duration</p>
                    <p className="text-sm sm:text-base font-black text-slate-900 mt-1">140ms</p>
                    <span className="text-[8px] font-extrabold text-slate-500 font-mono">Safe baseline</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-sm text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Saccade Rate</p>
                    <p className="text-sm sm:text-base font-black text-slate-900 mt-1">3.4 Hz</p>
                    <span className="text-[8px] font-extrabold text-slate-500 font-mono">Stable Focus</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100 shadow-sm text-center flex flex-col justify-between">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Attentive State</p>
                    <p className="text-[11px] sm:text-xs font-black text-blue-700 mt-1.5 uppercase font-mono tracking-tight">Optimal</p>
                    <span className="text-[8px] font-extrabold text-emerald-600 font-mono">100% Secure</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-slate-500 italic text-center">
                  💡 This metric loop runs safely inside your browser session, matching your direct ocular baselines.
                </p>
              </div>
            </div>

            {/* Bento 2: Right single span */}
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-lg overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-xl flex flex-col justify-between group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-cyan-100/60 border border-cyan-200 flex items-center justify-center text-cyan-700">
                  <Brain className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  The Cognitive Attention Map
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  A personalized local threshold model that learns your morning vs. evening alert patterns. It avoids generic rules, recognizing your specific baseline habits over time.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[10px] text-cyan-700 font-bold font-mono uppercase tracking-widest bg-cyan-50 border border-cyan-100 rounded-lg px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
                <span>Local neural baseline active</span>
              </div>
            </div>

            {/* Bento 3: Left single span */}
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-lg overflow-hidden transition-all duration-300 hover:border-indigo-400 hover:shadow-xl flex flex-col justify-between group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-indigo-100/60 border border-indigo-200 flex items-center justify-center text-indigo-700">
                  <Compass className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  Historical Offline Trends
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  Trace fatigue trends over days, weeks, and seasons. Pinpoint your exact cognitive drift points across recurrent commutes to restructure break times.
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest pt-4">
                Saved 100% locally in local memory
              </span>
            </div>

            {/* Bento 4: Middle single span */}
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-lg overflow-hidden transition-all duration-300 hover:border-emerald-400 hover:shadow-xl flex flex-col justify-between group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-emerald-100/60 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Sparkles className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  Silent Guidance Warnings
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  No sudden sirens or jarring bells that trigger adrenaline spikes. Astrateq relies on subtle audio tones or dashboard glimmers to softly prompt active awareness resets.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 font-mono uppercase tracking-widest pt-4 flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Non-intrusive safety curves
              </span>
            </div>

            {/* Bento 5: Right double span */}
            <div className="md:col-span-2 relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-lg overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-xl flex flex-col justify-between group">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-purple-100/60 border border-purple-200 flex items-center justify-center text-purple-700">
                  <Lock className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  Absolute Sovereignty
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium max-w-lg">
                  Our core philosophy is absolute: driver safety does not require cloud monetization or corporate risk profiling. Evaluated parameters run inside sandboxed volatile RAM and vanish the second the companion software closes.
                </p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-widest font-mono text-purple-700">
                <span className="bg-purple-100/60 border border-purple-200 px-2.5 py-1 rounded">No insurance sharing</span>
                <span className="bg-purple-100/60 border border-purple-200 px-2.5 py-1 rounded">No background tracking</span>
                <span className="bg-purple-100/60 border border-purple-200 px-2.5 py-1 rounded">Zero cloud leaks</span>
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
            <div className="relative flex flex-col items-center text-center bg-gradient-to-b from-blue-50/60 to-white rounded-2xl p-6 sm:p-8 border border-blue-200 border-t-4 border-t-blue-500 shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl overflow-hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 border border-blue-300 text-blue-700 font-mono text-xs font-black shadow-sm">
                01
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Simulate First</h4>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans font-medium">
                Complete the 60-second diagnostic simulator to establish your baseline fatigue exposure score.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center bg-gradient-to-b from-cyan-50/60 to-white rounded-2xl p-6 sm:p-8 border border-cyan-200 border-t-4 border-t-cyan-500 shadow-lg transition-all duration-300 hover:border-cyan-400 hover:shadow-xl overflow-hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 border border-cyan-300 text-cyan-700 font-mono text-xs font-black shadow-sm">
                02
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Choose Priority Level</h4>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans font-medium">
                Review your results and match with a secure early priority level that guarantees launch discount access.
              </p>
            </div>

            {/* Step-3 */}
            <div className="relative flex flex-col items-center text-center bg-gradient-to-b from-purple-50/60 to-white rounded-2xl p-6 sm:p-8 border border-purple-200 border-t-4 border-t-purple-500 shadow-lg transition-all duration-300 hover:border-purple-400 hover:shadow-xl overflow-hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 border border-purple-300 text-purple-700 font-mono text-xs font-black shadow-sm">
                03
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Provide Driving Context</h4>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans font-medium">
                Register your typical regional route variables to help tailor our localized neural logic profiles.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center bg-gradient-to-b from-emerald-50/60 to-white rounded-2xl p-6 sm:p-8 border border-emerald-200 border-t-4 border-t-emerald-500 shadow-lg transition-all duration-300 hover:border-emerald-400 hover:shadow-xl overflow-hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 font-mono text-xs font-black shadow-sm">
                04
              </div>
              <h4 className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Unlock Sandboxed Builds</h4>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans font-medium">
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

          {/* ROADMAP TIMELINE (Improvement 4, 6, 9) */}
          <div className="max-w-6xl mx-auto relative">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              {[
                {
                  phase: "01",
                  title: "Current Validation",
                  status: "Active Study",
                  desc: "Collecting early simulation metrics and provincial safety demand to establish solid concept baselines.",
                  isActive: true,
                  isCurrent: true,
                  theme: {
                    bg: "from-blue-50/40 via-white to-blue-50/15",
                    border: "border-blue-300 hover:border-blue-500 shadow-md shadow-blue-500/5 hover:shadow-[0_12px_30px_rgba(59,130,246,0.15)] ring-2 ring-blue-500/5",
                    topBar: "bg-blue-600",
                    numBadge: "bg-blue-600 border-blue-600 text-white",
                    statusBadge: "bg-blue-50 border-blue-200 text-blue-700"
                  }
                },
                {
                  phase: "02",
                  title: "Research Platform",
                  status: "Upcoming Phase",
                  desc: "Releasing academic diagnostic tools to early validation community members across Canada.",
                  isActive: false,
                  isCurrent: false,
                  theme: {
                    bg: "from-slate-50/50 via-white to-slate-50/10",
                    border: "border-slate-200 hover:border-slate-350 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
                    topBar: "bg-slate-300",
                    numBadge: "bg-slate-100 border-slate-250 text-slate-400",
                    statusBadge: "bg-slate-50 border-slate-200 text-slate-500"
                  }
                },
                {
                  phase: "03",
                  title: "Prototype",
                  status: "Engineering",
                  desc: "Developing lightweight, local-first machine learning models compiled for on-device processing.",
                  isActive: false,
                  isCurrent: false,
                  theme: {
                    bg: "from-slate-50/50 via-white to-slate-50/10",
                    border: "border-slate-200 hover:border-slate-350 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
                    topBar: "bg-slate-300",
                    numBadge: "bg-slate-100 border-slate-250 text-slate-400",
                    statusBadge: "bg-slate-50 border-slate-200 text-slate-500"
                  }
                },
                {
                  phase: "04",
                  title: "Canadian Pilot",
                  status: "Cohort Stage",
                  desc: "Launching a restricted field test with 1,000 registered drivers evaluating memory-isolated telemetry.",
                  isActive: false,
                  isCurrent: false,
                  theme: {
                    bg: "from-slate-50/50 via-white to-slate-50/10",
                    border: "border-slate-200 hover:border-slate-350 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
                    topBar: "bg-slate-300",
                    numBadge: "bg-slate-100 border-slate-250 text-slate-400",
                    statusBadge: "bg-slate-50 border-slate-200 text-slate-500"
                  }
                },
                {
                  phase: "05",
                  title: "Driver Awareness Companion",
                  status: "Sovereign Build",
                  desc: "Public debut of the sovereign client application with zero remote logs or cloud dependency.",
                  isActive: false,
                  isCurrent: false,
                  theme: {
                    bg: "from-slate-50/50 via-white to-slate-50/10",
                    border: "border-slate-200 hover:border-slate-350 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
                    topBar: "bg-slate-300",
                    numBadge: "bg-slate-100 border-slate-250 text-slate-400",
                    statusBadge: "bg-slate-50 border-slate-200 text-slate-500"
                  }
                },
                {
                  phase: "06",
                  title: "Driver Intelligence Platform",
                  status: "Platform Debut",
                  desc: "Establishing the core, hardware-free category for localized driving safety metrics.",
                  isActive: false,
                  isCurrent: false,
                  theme: {
                    bg: "from-slate-50/50 via-white to-slate-50/10",
                    border: "border-slate-200 hover:border-slate-350 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
                    topBar: "bg-slate-300",
                    numBadge: "bg-slate-100 border-slate-250 text-slate-400",
                    statusBadge: "bg-slate-50 border-slate-200 text-slate-500"
                  }
                },
                {
                  phase: "07",
                  title: "Future HUD Integration",
                  status: "Optics Phase",
                  desc: "Projection layers for compatible head-up-displays to deliver real-time focal advice securely.",
                  isActive: false,
                  isCurrent: false,
                  theme: {
                    bg: "from-slate-50/50 via-white to-slate-50/10",
                    border: "border-slate-200 hover:border-slate-350 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
                    topBar: "bg-slate-300",
                    numBadge: "bg-slate-100 border-slate-250 text-slate-400",
                    statusBadge: "bg-slate-50 border-slate-200 text-slate-500"
                  }
                },
                {
                  phase: "08",
                  title: "Future Vehicle Integration",
                  status: "Native Core",
                  desc: "Exploring native, hardware-level partnerships to route local signals directly into vehicle interfaces.",
                  isActive: false,
                  isCurrent: false,
                  theme: {
                    bg: "from-slate-50/50 via-white to-slate-50/10",
                    border: "border-slate-200 hover:border-slate-350 hover:shadow-[0_12px_24px_rgba(0,0,0,0.04)]",
                    topBar: "bg-slate-300",
                    numBadge: "bg-slate-100 border-slate-250 text-slate-400",
                    statusBadge: "bg-slate-50 border-slate-200 text-slate-500"
                  }
                }
              ].map((step, idx) => (
                <div 
                  key={idx} 
                  className={`relative flex flex-col justify-between pt-10 pb-7 px-5 rounded-2xl border bg-gradient-to-br ${step.theme.bg} shadow-md transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden ${step.theme.border}`}
                  id={`timeline-card-${idx}`}
                >
                  {/* Top Accent Color Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${step.theme.topBar}`} />
                  
                  <div className="space-y-4">
                    {/* Circle Indicator Header */}
                    <div className="flex items-center justify-between">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-xs font-black shadow-sm ${step.theme.numBadge}`}>
                        {step.phase}
                      </div>
                      
                      {/* Active Beacon Dot for Current step */}
                      {step.isCurrent && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      )}
                    </div>

                    {/* Typography block */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-slate-900 font-sans leading-tight">
                        {step.title}
                      </h4>
                      <div className="inline-block">
                        <span className={`inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border font-mono ${step.theme.statusBadge}`}>
                          {step.isCurrent && <span className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />}
                          {step.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-sans font-semibold pt-1">
                        {step.desc}
                      </p>
                    </div>
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
