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
                Astrateq Gadgets represents a shift away from cloud tracking. By exploring lightweight, offline-first awareness intelligence, we seek to empower drivers with personal insights—retaining absolute data sovereignty with zero remote tracking.
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
                  We started Astrateq Gadgets because we believe intelligence should serve and belong to the driver—fully offline, fully sovereign, with zero external surveillance.
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
                    <p className="text-[9px] font-extrabold uppercase text-slate-400 font-mono tracking-widest mt-0.5">Founder, Astrateq Gadgets Technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: IMAGINE DRIVER AWARENESS INTELLIGENCE CENTERPIECE GRID */}
      <section id="capabilities-grid" className="py-28 bg-slate-50/90 border-b border-zinc-200/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#000000_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.02] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-black uppercase tracking-widest text-blue-800 font-mono">
              <Cpu className="h-3.5 w-3.5 text-blue-600 animate-pulse" /> ON-DEVICE PERFORMANCE ARCHITECTURE
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-5xl font-sans">
              Imagine Driver Awareness Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed font-sans font-medium">
              Astrateq Gadgets executes fully offline visual models directly on your hardware layer, converting complex raw behavioral parameters into real-time, high-fidelity security insights.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 text-left">
            
            {/* Card 1: Visual Processing Edge */}
            <div className="relative rounded-2xl border-2 border-blue-200/80 bg-gradient-to-br from-blue-50 via-sky-50/40 to-cyan-100/30 p-8 sm:p-10 shadow-[0_12px_30px_rgba(59,130,246,0.06)] hover:shadow-[0_20px_45px_rgba(59,130,246,0.16)] hover:border-blue-500 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
              
              {/* Ambient Orb */}
              <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-blue-500/20 blur-2xl pointer-events-none group-hover:bg-cyan-500/30 group-hover:scale-125 transition-all duration-500" />
              
              <div className="space-y-6 relative z-10">
                <div className="h-12 w-12 rounded-xl bg-blue-600 text-white border-2 border-blue-400/50 flex items-center justify-center shadow-md group-hover:bg-cyan-600 group-hover:border-cyan-400 group-hover:rotate-6 transition-all duration-300">
                  <Eye className="h-6 w-6 stroke-[2]" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-blue-600 font-mono uppercase tracking-widest block">CORE SYSTEM 01</span>
                  <h3 className="text-lg font-black uppercase tracking-wider text-blue-950 font-sans group-hover:text-blue-700 transition-colors">
                    Visual Processing Edge
                  </h3>
                </div>
                
                <p className="text-xs sm:text-[13px] text-blue-900/80 leading-relaxed font-sans font-medium">
                  On-device camera optics track ocular saccades, blink durations, and cognitive glance sweeps at 60 FPS. All calculations execute within local volatile RAM cache blocks, bypassing central server paths completely.
                </p>
              </div>
              
              <div className="mt-8 border-t border-blue-200/60 pt-5 text-left font-mono relative z-10">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider">Metrics Managed:</span>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  <span className="bg-blue-100/60 border border-blue-300/40 px-2.5 py-1 rounded text-[9px] font-bold text-blue-800 font-mono hover:bg-blue-200/50 transition-colors">60FPS Ocular Track</span>
                  <span className="bg-blue-100/60 border border-blue-300/40 px-2.5 py-1 rounded text-[9px] font-bold text-blue-800 font-mono hover:bg-blue-200/50 transition-colors">Gaze Angle Sampling</span>
                </div>
              </div>
            </div>

            {/* Card 2: Telemetry Shielding */}
            <div className="relative rounded-2xl border-2 border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-purple-50/40 to-violet-100/30 p-8 sm:p-10 shadow-[0_12px_30px_rgba(99,102,241,0.06)] hover:shadow-[0_20px_45px_rgba(99,102,241,0.16)] hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-500" />
              
              {/* Ambient Orb */}
              <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none group-hover:bg-purple-500/30 group-hover:scale-125 transition-all duration-500" />
              
              <div className="space-y-6 relative z-10">
                <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white border-2 border-indigo-400/50 flex items-center justify-center shadow-md group-hover:bg-purple-600 group-hover:border-purple-400 group-hover:rotate-6 transition-all duration-300">
                  <Lock className="h-6 w-6 stroke-[2]" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-indigo-600 font-mono uppercase tracking-widest block">CORE SYSTEM 02</span>
                  <h3 className="text-lg font-black uppercase tracking-wider text-indigo-950 font-sans group-hover:text-indigo-700 transition-colors">
                    Telemetry Shielding
                  </h3>
                </div>
                
                <p className="text-xs sm:text-[13px] text-indigo-900/80 leading-relaxed font-sans font-medium">
                  Prevents corporate driver profile profiling. Astrateq Gadgets fully sanitizes, filters, and isolates acceleration, routing, and braking speed variables, ensuring zero raw data leaks to insurance cloud networks.
                </p>
              </div>
              
              <div className="mt-8 border-t border-indigo-200/60 pt-5 text-left font-mono relative z-10">
                <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">Security Protocols:</span>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  <span className="bg-indigo-100/60 border border-indigo-300/40 px-2.5 py-1 rounded text-[9px] font-bold text-indigo-800 font-mono hover:bg-indigo-200/50 transition-colors">OBD Port Bypass</span>
                  <span className="bg-indigo-100/60 border border-indigo-300/40 px-2.5 py-1 rounded text-[9px] font-bold text-indigo-800 font-mono hover:bg-indigo-200/50 transition-colors">Insurance Firewall</span>
                </div>
              </div>
            </div>

            {/* Card 3: Localized Awareness Analytics */}
            <div className="relative rounded-2xl border-2 border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-green-100/30 p-8 sm:p-10 shadow-[0_12px_30px_rgba(16,185,129,0.06)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.16)] hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-500" />
              
              {/* Ambient Orb */}
              <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none group-hover:bg-teal-500/30 group-hover:scale-125 transition-all duration-500" />
              
              <div className="space-y-6 relative z-10">
                <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white border-2 border-emerald-400/50 flex items-center justify-center shadow-md group-hover:bg-teal-600 group-hover:border-teal-400 group-hover:rotate-6 transition-all duration-300">
                  <Brain className="h-6 w-6 stroke-[2]" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-emerald-600 font-mono uppercase tracking-widest block">CORE SYSTEM 03</span>
                  <h3 className="text-lg font-black uppercase tracking-wider text-emerald-950 font-sans group-hover:text-emerald-700 transition-colors">
                    Localized Awareness Analytics
                  </h3>
                </div>
                
                <p className="text-xs sm:text-[13px] text-emerald-900/80 leading-relaxed font-sans font-medium">
                  Builds a sovereign model of your personal morning vs. evening alert patterns over time. Fatigue accumulation and attention drifts are processed exclusively locally, generating offline reports that are yours alone.
                </p>
              </div>
              
              <div className="mt-8 border-t border-emerald-200/60 pt-5 text-left font-mono relative z-10">
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">Analysis Engines:</span>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  <span className="bg-emerald-100/60 border border-emerald-300/40 px-2.5 py-1 rounded text-[9px] font-bold text-emerald-800 font-mono hover:bg-emerald-200/50 transition-colors">Offline History DB</span>
                  <span className="bg-emerald-100/60 border border-emerald-300/40 px-2.5 py-1 rounded text-[9px] font-bold text-emerald-800 font-mono hover:bg-emerald-200/50 transition-colors">Personal alert curve</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
