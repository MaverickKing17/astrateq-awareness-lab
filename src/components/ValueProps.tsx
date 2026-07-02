import React from "react";
import { ClipboardCheck, Cpu, BarChart3, Users } from "lucide-react";

interface ValuePropsProps {
  onStartSimulation: () => void;
}

export default function ValueProps({ onStartSimulation }: ValuePropsProps) {
  return (
    <section id="value-props" className="py-28 sm:py-44 bg-[#F4F7FB]">
      {/* Upper Intro & Value Props */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-[#EEF3F8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono rounded">
            🍁 Premium Driving Safety Hardware
          </span>
          <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl">
            Astrateq Aware-1 Core Specifications
          </h2>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xl mx-auto font-sans">
            A next-generation physical console engineered to prevent driver fatigue and distraction. It mounts cleanly on your dashboard, running fully localized edge AI with zero external tracking.
          </p>
        </div>

        {/* 3 Value Prop Cards - SECONDARY CARDS (With premium glowing blue borders) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="relative flex flex-col rounded-xl border border-blue-200/60 bg-white p-8 shadow-[0_0_25px_rgba(59,130,246,0.08)] ring-1 ring-blue-500/10 transition-all duration-300 hover:border-blue-500 hover:ring-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.20)] hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-snug">
              Infrared Optical Gaze-Mesh & Blink Sensor
            </h3>
            <p className="mt-4 text-slate-500 text-xs leading-relaxed flex-grow font-sans">
              Specialized sub-millimeter NIR micro-cameras continuously assess eye-blink duration patterns (PERCLOS) and gaze-scanning velocity fully offline. Works flawlessly under direct sunlight, pitch-black nights, or through heavy polarized sunglasses.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Continuous Active Scanning
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex flex-col rounded-xl border border-blue-200/60 bg-white p-8 shadow-[0_0_25px_rgba(59,130,246,0.08)] ring-1 ring-blue-500/10 transition-all duration-300 hover:border-blue-500 hover:ring-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.20)] hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-snug">
              Ambient Peripheral Aura Notifications
            </h3>
            <p className="mt-4 text-slate-500 text-xs leading-relaxed flex-grow font-sans">
              Our curved micro-LED lightbar transitions from a calming cyan to a pulsing warm amber when fatigue indicators trigger. Designed to be perceived instantly through your peripheral vision, eliminating the need to look down at a screen.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Non-Invasive Visual Cueing
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex flex-col rounded-xl border border-blue-200/60 bg-white p-8 shadow-[0_0_25px_rgba(59,130,246,0.08)] ring-1 ring-blue-500/10 transition-all duration-300 hover:border-blue-500 hover:ring-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.20)] hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 leading-snug">
              Total Privacy Offline Edge AI Engine
            </h3>
            <p className="mt-4 text-slate-500 text-xs leading-relaxed flex-grow font-sans">
              Powered by a proprietary localized neural microchip. Zero video recording, zero cloud storage, zero internet transmitters. All eye-mesh and posture vectors are calculated inside the device and immediately discarded. Total security from third parties and insurers.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Military-Grade Offline Trust
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - Alternate Section (Background: Premium Light Gradient & Tech Feel) */}
      <div id="how-it-works" className="mt-28 bg-gradient-to-b from-slate-50 to-slate-100/90 py-28 sm:py-44 border-y border-slate-200/80 relative overflow-hidden">
        {/* Subtle Tech Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              The Path to Aware-1
            </span>
            <h2 className="mt-3 text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              How the Pre-Launch Pipeline Works
            </h2>
            <p className="mt-3 text-xs text-slate-500 max-w-lg mx-auto font-sans">
              Secure your hardware allotment and calibrate your personal safety preferences in four simple steps.
            </p>
          </div>

          {/* 4 Steps Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            {/* Elegant connection line for desktop */}
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 border-t-2 border-dashed border-blue-300/40 -z-10" />

            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-blue-100/60 shadow-[0_10px_30px_rgba(59,130,246,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]">
              {/* Glow Badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-mono text-base font-black shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-400/30 z-10">
                01
              </div>
              <div className="flex flex-col items-center mt-6">
                <div className="mb-3 text-blue-600 bg-blue-50 border border-blue-100/50 p-2.5 rounded-xl">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Secure Slot</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-sans">
                Choose your pre-order tier (Standard, VIP Elite, or Founding Backer) to lock in your production queue placement. Zero deposit required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-blue-100/60 shadow-[0_10px_30px_rgba(59,130,246,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]">
              {/* Glow Badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-mono text-base font-black shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-400/30 z-10">
                02
              </div>
              <div className="flex flex-col items-center mt-6">
                <div className="mb-3 text-blue-600 bg-blue-50 border border-blue-100/50 p-2.5 rounded-xl">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Diagnostic Check</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-sans">
                Complete our rapid 60-second Driver Awareness Simulator (Lead Magnet check) to map your risk parameters and unlock a 40% launch discount code.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-blue-100/60 shadow-[0_10px_30px_rgba(59,130,246,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]">
              {/* Glow Badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-mono text-base font-black shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-400/30 z-10">
                03
              </div>
              <div className="flex flex-col items-center mt-6">
                <div className="mb-3 text-blue-600 bg-blue-50 border border-blue-100/50 p-2.5 rounded-xl">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Hardware Assembly</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-sans">
                Your custom console is assembled in our limited-edition batch-1 line with selected anodized frame plates and firmware integrations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center text-center bg-white rounded-2xl p-6 sm:p-8 border border-blue-100/60 shadow-[0_10px_30px_rgba(59,130,246,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)]">
              {/* Glow Badge */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-mono text-base font-black shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-blue-400/30 z-10">
                04
              </div>
              <div className="flex flex-col items-center mt-6">
                <div className="mb-3 text-blue-600 bg-blue-50 border border-blue-100/50 p-2.5 rounded-xl">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">Dock & Drive</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-sans">
                Mount magnetically onto your vehicle's dashboard, plug into standard 12V or USB-C power, and drive with absolute alertness and 100% offline privacy.
              </p>
            </div>
          </div>

          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartSimulation}
              className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-8 py-5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_6px_20px_rgba(59,130,246,0.35)] transition-all hover:bg-blue-700 hover:shadow-[0_10px_25px_rgba(59,130,246,0.45)] active:scale-95 cursor-pointer font-mono"
            >
              Start Awareness Simulator (Lead Magnet)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
