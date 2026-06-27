import React from "react";
import { ClipboardCheck, Cpu, BarChart3, Users } from "lucide-react";

interface ValuePropsProps {
  onStartSimulation: () => void;
}

export default function ValueProps({ onStartSimulation }: ValuePropsProps) {
  return (
    <section id="value-props" className="py-24 sm:py-36 bg-[#F4F7FB]">
      {/* Upper Intro & Value Props */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-[#EEF3F8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono rounded">
            🍁 Behavioral Science Research Study
          </span>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight text-slate-900 sm:text-3xl">
            Core Validation Objectives
          </h2>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xl mx-auto">
            We are validating a next-generation software concept designed to explore, understand, and measure cognitive driving focus. Join the cohort to test the simulation model.
          </p>
        </div>

        {/* 3 Value Prop Cards - SECONDARY CARDS (With premium glowing blue borders) */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="relative flex flex-col rounded-xl border border-blue-200/60 bg-white p-8 shadow-[0_0_25px_rgba(59,130,246,0.08)] ring-1 ring-blue-500/10 transition-all duration-300 hover:border-blue-500 hover:ring-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.20)] hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 leading-snug">
              How does awareness scoring correlate with driver attention behavior patterns?
            </h3>
            <p className="mt-4 text-slate-500 text-xs leading-relaxed flex-grow">
              Validate whether a multi-factor numerical simulation score mapped to cognitive attentiveness can effectively reflect visual field checks and task-switching habits over typical travel durations.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Approved Research Objective
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex flex-col rounded-xl border border-blue-200/60 bg-white p-8 shadow-[0_0_25px_rgba(59,130,246,0.08)] ring-1 ring-blue-500/10 transition-all duration-300 hover:border-blue-500 hover:ring-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.20)] hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 leading-snug">
              Does fatigue-related context awareness influence driving decision quality?
            </h3>
            <p className="mt-4 text-slate-500 text-xs leading-relaxed flex-grow">
              Analyze critical fatigue exposure timelines and cognitive sleep-debt vulnerability to validate whether highlighting precise fatigue risk thresholds can positively influence driver fatigue mitigation behaviors.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Behavioral Evaluation Area
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex flex-col rounded-xl border border-blue-200/60 bg-white p-8 shadow-[0_0_25px_rgba(59,130,246,0.08)] ring-1 ring-blue-500/10 transition-all duration-300 hover:border-blue-500 hover:ring-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.20)] hover:-translate-y-1">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-50 border border-blue-100 text-blue-600 mb-6 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 leading-snug">
              Do drivers cluster into distinct behavioral safety profiles based on input data?
            </h3>
            <p className="mt-4 text-slate-500 text-xs leading-relaxed flex-grow">
              Examine driver readiness indicators to evaluate how personal safety-readiness benchmarks and localized provincial guidelines correlate with standard visual field responses and hazard scan habits.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Cognitive Safety Standard
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section - Alternate Section (Background: Premium Light Gradient & Tech Feel) */}
      <div id="how-it-works" className="mt-28 bg-gradient-to-b from-slate-50 to-slate-100/90 py-24 sm:py-36 border-y border-slate-200/80 relative overflow-hidden">
        {/* Subtle Tech Accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono">
              Research Pipeline
            </span>
            <h2 className="mt-3 text-2xl font-black uppercase tracking-wider text-slate-900 sm:text-3xl">
              How the Validation Process Works
            </h2>
            <p className="mt-3 text-xs text-slate-500 max-w-lg mx-auto">
              Complete the rapid 60-second behavioral study and view your custom cognitive profile instantly.
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
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Answer Questions</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Answer behavioral and contextual questions regarding standard driving frequencies, sleep windows, and typical in-cabin focus habits.
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
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Generate Profile</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Generate simulated driver awareness profile based on calibrated Canadian regional baselines and focus allocation models.
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
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Conceptual Safety</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Display conceptual safety intelligence output, detailing fatigue exposure risks and relative distraction resistance tips.
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
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Research Cohort</h4>
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Offer research cohort participation to select a self-guided or steering advisory engagement level with zero cost or hardware.
              </p>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <button
              onClick={onStartSimulation}
              className="inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-8 py-5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_6px_20px_rgba(59,130,246,0.35)] transition-all hover:bg-blue-700 hover:shadow-[0_10px_25px_rgba(59,130,246,0.45)] active:scale-95 cursor-pointer font-mono"
            >
              Start Awareness Simulation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
