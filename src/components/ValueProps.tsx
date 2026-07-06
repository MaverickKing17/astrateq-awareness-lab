import React from "react";
import { Sparkles, Brain, Lock, Eye, Check, ArrowRight, ShieldCheck, Heart, Compass, Milestone, Cpu } from "lucide-react";

interface ValuePropsProps {
  onStartSimulation: () => void;
  onNavigateToCohort: (tier?: string) => void;
}

export default function ValueProps({ onStartSimulation, onNavigateToCohort }: ValuePropsProps) {
  return (
    <div id="value-props" className="bg-white">
      
      {/* SECTION: WHY WE'RE BUILDING DRIVER AWARENESS INTELLIGENCE */}
      <section className="py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#000000_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.015] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 font-mono rounded-full">
              <Heart className="h-3.5 w-3.5 text-slate-900" />
              The Sovereign Purpose
            </span>
            
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">
                Why we are building Driver Awareness Intelligence
              </h2>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto uppercase">
                Technology should protect your attention, not commodify your personal life.
              </p>
            </div>

            <div className="max-w-2xl mx-auto text-left space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              <p>
                Today's standard automotive assistance is almost entirely reactive. Lane departure alerts and automatic emergency braking are engineered to sound loud, startling alarms <span className="text-slate-900 font-semibold">only after a focus drop has already occurred</span>.
              </p>
              <div className="border-l-2 border-slate-900 pl-4 py-1 my-4 bg-slate-50 rounded-r">
                <p className="font-medium text-slate-800 italic">
                  We are asking a fundamentally different question: Can elegant, on-device software help drivers recognize and map their own cognitive fatigue curve before critical situations develop?
                </p>
              </div>
              <p>
                Astrateq represents a shift away from cloud tracking. By exploring lightweight, offline-first awareness intelligence, we seek to empower drivers with personal insights—retaining absolute data sovereignty with zero remote tracking.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                A pre-launch validation initiative for Canada’s next generation of driving safety
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VISION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 font-mono rounded-full">
                Founder Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 font-sans leading-tight">
                Why We Started Building the Driver Coach
              </h3>
              <div className="space-y-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                <p>
                  Every year, modern smartphones ship with faster processors, local neural engines, and sophisticated ambient optics. Yet almost none of this immense power is routed to help you protect yourself during long commutes.
                </p>
                <p>
                  We noticed that standard driving software is designed to feed advertisements or trace routes. It is not designed to help <span className="text-slate-900 font-bold border-b border-slate-200 pb-0.5">you better understand your own focus</span>.
                </p>
                <p className="font-bold text-slate-900">
                  We started Astrateq because we believe intelligence should serve and belong to the driver—fully offline, fully sovereign, with zero external surveillance.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-left">
              <div className="space-y-6">
                <span className="text-4xl font-serif text-slate-300 block leading-none select-none">“</span>
                <p className="text-xs sm:text-[13px] italic text-slate-600 leading-relaxed font-sans font-semibold">
                  “Our goal is to build a safety companion that works for you, not against you. We want to prove that driver safety can be elegant, highly precise, and completely disconnected from the cloud.”
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

      {/* SECTION: PRODUCT VISION / BENTO */}
      <section className="py-20 bg-white border-b border-slate-200/80 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-extrabold uppercase tracking-widest text-slate-800 font-mono">
              Product Concept
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl font-sans">
              Designed for Sovereign Performance
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed font-sans font-medium">
              A sovereign, hardware-free companion designed to translate complex micro-attentiveness behaviors into quiet, proactive safety feedback.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-left">
            
            {/* Bento 1: Left double span */}
            <div className="md:col-span-2 relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                  <Eye className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  Active Focal & Ocular Baselines
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium max-w-lg">
                  Instead of tracking where you are on a map, the offline engine maps the density of your visual field—assessing blink durations and subtle eye movement patterns to identify the micro-moments when attention begins to fragment.
                </p>
              </div>
              
              {/* Refined, high-contrast, clear metrics display */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 font-sans text-xs space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    On-Device Calibration Baseline
                  </span>
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-extrabold text-[9px]">Calibrated</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Blink Duration</p>
                    <p className="text-sm sm:text-base font-black text-slate-900 mt-1">140ms</p>
                    <span className="text-[8px] font-extrabold text-slate-500 font-mono">Safe baseline</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Scanning Rate</p>
                    <p className="text-sm sm:text-base font-black text-slate-900 mt-1">3.4 Hz</p>
                    <span className="text-[8px] font-extrabold text-slate-500 font-mono">Stable Focus</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center flex flex-col justify-between">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider font-mono">Attentive State</p>
                    <p className="text-[11px] sm:text-xs font-black text-slate-900 mt-1.5 uppercase font-mono tracking-tight">Optimal</p>
                    <span className="text-[8px] font-extrabold text-emerald-600 font-mono">100% Secure</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-slate-500 italic text-center">
                  💡 This metric loop runs safely inside your browser session, matching your direct focus baselines.
                </p>
              </div>
            </div>

            {/* Bento 2: Right single span */}
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                  <Brain className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  The Cognitive Attention Map
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  A personalized local threshold model that learns your morning vs. evening alert patterns. It avoids generic rules, recognizing your specific baseline habits over time.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-[10px] text-slate-700 font-bold font-mono uppercase tracking-widest bg-slate-100 border border-slate-200 rounded-lg px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-ping" />
                <span>Local neural baseline active</span>
              </div>
            </div>

            {/* Bento 3: Left single span */}
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
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
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                  <Sparkles className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  Silent Guidance Warnings
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  No sudden sirens or jarring bells that trigger adrenaline spikes. Astrateq relies on subtle audio tones or dashboard glimmers to softly prompt active awareness resets.
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-600 font-mono uppercase tracking-widest pt-4 flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-500" /> Non-intrusive safety curves
              </span>
            </div>

            {/* Bento 5: Right double span */}
            <div className="md:col-span-2 relative rounded-2xl border border-slate-200 bg-slate-50/20 p-8 shadow-sm flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                  <Lock className="h-5 w-5 stroke-[2]" />
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 font-sans">
                  Absolute Sovereignty
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium max-w-lg">
                  Our core philosophy is absolute: driver safety does not require cloud monetization or corporate risk profiling. Evaluated parameters run inside sandboxed volatile RAM and vanish the second the companion software closes.
                </p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-widest font-mono text-slate-700">
                <span className="bg-slate-100 border border-slate-250 px-2.5 py-1 rounded">No insurance sharing</span>
                <span className="bg-slate-100 border border-slate-250 px-2.5 py-1 rounded">No background tracking</span>
                <span className="bg-slate-100 border border-slate-250 px-2.5 py-1 rounded">Zero cloud leaks</span>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
