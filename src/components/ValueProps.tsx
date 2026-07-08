import React from "react";
import { Heart, Eye, Lock, Brain, Cpu } from "lucide-react";

interface ValuePropsProps {
  onStartSimulation: () => void;
  onNavigateToCohort: (tier?: string) => void;
}

export default function ValueProps({ onStartSimulation, onNavigateToCohort }: ValuePropsProps) {
  return (
    <div id="value-props" className="bg-[#F4F2ED]">
      
      {/* SECTION: WHY WE'RE BUILDING DRIVER AWARENESS INTELLIGENCE */}
      <section className="py-24 bg-[#F4F2ED] border-b border-[#0E7C9E]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#12233F_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <span className="inline-flex items-center gap-1.5 border border-[#0E7C9E]/20 bg-white px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#12233F] font-mono rounded-full shadow-xs">
              <Heart className="h-3.5 w-3.5 text-[#0E7C9E]" />
              The Sovereign Purpose
            </span>
            
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#0E7C9E] font-mono">
                Why we are building Driver Awareness Intelligence
              </h2>
              <p className="text-2xl sm:text-3xl font-black text-[#12233F] tracking-tight leading-tight max-w-3xl mx-auto uppercase">
                Technology should protect your attention, not commodify your personal life.
              </p>
            </div>

            <div className="max-w-2xl mx-auto text-left space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              <p>
                Today's standard automotive assistance is almost entirely reactive. Lane departure alerts and automatic emergency braking are engineered to sound loud, startling alarms <span className="text-[#12233F] font-semibold">only after a focus drop has already occurred</span>.
              </p>
              <div className="border-l-2 border-[#0E7C9E] pl-4 py-1 my-4 bg-white/60 rounded-r shadow-xs">
                <p className="font-medium text-[#12233F] italic">
                  We are asking a fundamentally different question: Can elegant, on-device software help drivers recognize and map their own cognitive fatigue curve before critical situations develop?
                </p>
              </div>
              <p>
                Astrateq Gadgets represents a shift away from cloud tracking. By exploring lightweight, offline-first awareness intelligence, we seek to empower drivers with personal insights—retaining absolute data sovereignty with zero remote tracking.
              </p>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                A pre-launch validation initiative for Canada’s next generation of driving safety
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: IMAGINE DRIVER AWARENESS INTELLIGENCE CENTERPIECE GRID */}
      <section id="capabilities-grid" className="py-28 bg-white border-b border-[#0E7C9E]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#12233F_0.5px,transparent_0.5px)] [background-size:40px_40px] opacity-[0.02] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0E7C9E]/5 border border-[#0E7C9E]/20 text-[10px] font-black uppercase tracking-widest text-[#0E7C9E] font-mono">
              <Cpu className="h-3.5 w-3.5 text-[#0E7C9E] animate-pulse" /> ON-DEVICE PERFORMANCE ARCHITECTURE
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#12233F] sm:text-5xl font-sans">
              Imagine Driver Awareness Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed font-sans font-medium">
              Astrateq Gadgets executes fully offline visual models directly on your hardware layer, converting complex raw behavioral parameters into real-time, high-fidelity security insights.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 text-left">
            
            {/* Card 1: Visual Processing Edge */}
            <div className="relative rounded-2xl border border-[#0E7C9E]/15 bg-[#F4F2ED]/40 hover:bg-[#F4F2ED]/70 p-8 sm:p-10 shadow-xs transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0E7C9E] to-blue-500" />
              
              {/* Ambient Orb */}
              <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-[#0E7C9E]/5 blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-500" />
              
              <div className="space-y-6 relative z-10">
                <div className="h-12 w-12 rounded-xl bg-white text-[#0E7C9E] border border-[#0E7C9E]/20 flex items-center justify-center shadow-xs group-hover:rotate-6 transition-all duration-300">
                  <Eye className="h-6 w-6 stroke-[2]" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-[#0E7C9E] font-mono uppercase tracking-widest block">CORE SYSTEM 01</span>
                  <h3 className="text-lg font-black uppercase tracking-wider text-[#12233F] font-sans">
                    Visual Processing Edge
                  </h3>
                </div>
                
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  On-device camera optics track ocular saccades, blink durations, and cognitive glance sweeps at 60 FPS. All calculations execute within local volatile RAM cache blocks, bypassing central server paths completely.
                </p>
              </div>
              
              <div className="mt-8 border-t border-slate-200 pt-5 text-left font-mono relative z-10">
                <span className="text-[9px] font-black text-[#0E7C9E] uppercase tracking-wider">Metrics Managed:</span>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  <span className="bg-white border border-[#0E7C9E]/20 px-2.5 py-1 rounded text-[9px] font-bold text-[#12233F] font-mono transition-colors">60FPS Ocular Track</span>
                  <span className="bg-white border border-[#0E7C9E]/20 px-2.5 py-1 rounded text-[9px] font-bold text-[#12233F] font-mono transition-colors">Gaze Angle Sampling</span>
                </div>
              </div>
            </div>

            {/* Card 2: Telemetry Shielding */}
            <div className="relative rounded-2xl border border-[#B8860B]/15 bg-[#F4F2ED]/40 hover:bg-[#F4F2ED]/70 p-8 sm:p-10 shadow-xs transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B8860B] to-amber-500" />
              
              {/* Ambient Orb */}
              <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-[#B8860B]/5 blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-500" />
              
              <div className="space-y-6 relative z-10">
                <div className="h-12 w-12 rounded-xl bg-white text-[#B8860B] border border-[#B8860B]/20 flex items-center justify-center shadow-xs group-hover:rotate-6 transition-all duration-300">
                  <Lock className="h-6 w-6 stroke-[2]" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-[#B8860B] font-mono uppercase tracking-widest block">CORE SYSTEM 02</span>
                  <h3 className="text-lg font-black uppercase tracking-wider text-[#12233F] font-sans">
                    Telemetry Shielding
                  </h3>
                </div>
                
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  Prevents corporate driver profile profiling. Astrateq Gadgets fully sanitizes, filters, and isolates acceleration, routing, and braking speed variables, ensuring zero raw data leaks to insurance cloud networks.
                </p>
              </div>
              
              <div className="mt-8 border-t border-slate-200 pt-5 text-left font-mono relative z-10">
                <span className="text-[9px] font-black text-[#B8860B] uppercase tracking-wider">Security Protocols:</span>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  <span className="bg-white border border-[#B8860B]/20 px-2.5 py-1 rounded text-[9px] font-bold text-[#12233F] font-mono transition-colors">OBD Port Bypass</span>
                  <span className="bg-white border border-[#B8860B]/20 px-2.5 py-1 rounded text-[9px] font-bold text-[#12233F] font-mono transition-colors">Insurance Firewall</span>
                </div>
              </div>
            </div>

            {/* Card 3: Localized Awareness Analytics */}
            <div className="relative rounded-2xl border border-[#0E7C9E]/15 bg-[#F4F2ED]/40 hover:bg-[#F4F2ED]/70 p-8 sm:p-10 shadow-xs transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5 overflow-hidden">
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0E7C9E] to-[#B8860B]" />
              
              {/* Ambient Orb */}
              <div className="absolute -right-16 -bottom-16 w-36 h-36 rounded-full bg-[#0E7C9E]/5 blur-2xl pointer-events-none group-hover:scale-125 transition-all duration-500" />
              
              <div className="space-y-6 relative z-10">
                <div className="h-12 w-12 rounded-xl bg-white text-[#0E7C9E] border border-[#0E7C9E]/20 flex items-center justify-center shadow-xs group-hover:rotate-6 transition-all duration-300">
                  <Brain className="h-6 w-6 stroke-[2]" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-[#0E7C9E] font-mono uppercase tracking-widest block">CORE SYSTEM 03</span>
                  <h3 className="text-lg font-black uppercase tracking-wider text-[#12233F] font-sans">
                    Localized Awareness Analytics
                  </h3>
                </div>
                
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                  Builds a sovereign model of your personal morning vs. evening alert patterns over time. Fatigue accumulation and attention drifts are processed exclusively locally, generating offline reports that are yours alone.
                </p>
              </div>
              
              <div className="mt-8 border-t border-slate-200 pt-5 text-left font-mono relative z-10">
                <span className="text-[9px] font-black text-[#0E7C9E] uppercase tracking-wider">Analysis Engines:</span>
                <div className="flex gap-2 mt-2.5 flex-wrap">
                  <span className="bg-white border border-[#0E7C9E]/20 px-2.5 py-1 rounded text-[9px] font-bold text-[#12233F] font-mono transition-colors">Offline History DB</span>
                  <span className="bg-white border border-[#0E7C9E]/20 px-2.5 py-1 rounded text-[9px] font-bold text-[#12233F] font-mono transition-colors">Personal alert curve</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
