import React from "react";
import { Award, Brain, Shield, ClipboardCheck, Cpu, BarChart3 } from "lucide-react";

interface ValuePropsProps {
  onStartSimulation: () => void;
}

export default function ValueProps({ onStartSimulation }: ValuePropsProps) {
  return (
    <section id="value-props" className="py-16 sm:py-24">
      {/* Upper Intro & Value Props */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono rounded">
            🍁 Behavioral Science Research Study
          </span>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight text-slate-900 sm:text-3xl">
            Core Validation Objectives
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            We are validating a next-generation software concept designed to explore, understand, and measure cognitive driving focus. Join the cohort to test the simulation model.
          </p>
        </div>

        {/* 3 Value Prop Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="relative flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 border border-slate-200 text-slate-900 mb-6 font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Hypothesis: Awareness scoring may correlate with safer driving awareness behavior
            </h3>
            <p className="mt-3 text-slate-500 text-xs leading-relaxed flex-grow">
              Validate whether a multi-factor numerical simulation score mapped to cognitive attentiveness can effectively reflect visual field checks and task-switching habits over typical travel durations.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-pulse" />
              Approved Research Objective
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 border border-slate-200 text-slate-900 mb-6 font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Hypothesis: fatigue context awareness may influence driving safety decisions
            </h3>
            <p className="mt-3 text-slate-500 text-xs leading-relaxed flex-grow">
              Analyze critical fatigue exposure timelines and cognitive sleep-debt vulnerability to validate whether highlighting precise fatigue risk thresholds can positively influence driver fatigue mitigation behaviors.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-pulse" />
              Behavioral Evaluation Area
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative flex flex-col rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 border border-slate-200 text-slate-900 mb-6 font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Hypothesis: drivers show different safety readiness patterns based on behavior inputs
            </h3>
            <p className="mt-3 text-slate-500 text-xs leading-relaxed flex-grow">
              Examine driver readiness indicators to evaluate how personal safety-readiness benchmarks and localized provincial guidelines correlate with standard visual field responses and hazard scan habits.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900 animate-pulse" />
              Cognitive Safety Standard
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="mt-20 bg-slate-100/60 py-16 sm:py-24 border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
              How the Validation Process Works
            </h2>
            <p className="mt-3 text-xs text-slate-500">
              Complete the rapid 60-second behavioral study and view your custom cognitive profile instantly.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-[1px] bg-slate-200 -z-10" />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-900 text-white font-mono text-sm z-10 shadow-sm border border-slate-800">
                01
              </div>
              <div className="flex items-center gap-1.5 mt-6 text-slate-900 font-bold uppercase tracking-wider text-xs">
                <ClipboardCheck className="h-4 w-4 text-slate-700" />
                <h4>Answer Questions</h4>
              </div>
              <p className="mt-2 text-xs text-slate-500 max-w-xs leading-relaxed">
                Provide basic answers regarding your standard driving frequency, commute times, fatigue signs, and distraction management habits.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-900 text-white font-mono text-sm z-10 shadow-sm border border-slate-800">
                02
              </div>
              <div className="flex items-center gap-1.5 mt-6 text-slate-900 font-bold uppercase tracking-wider text-xs">
                <Cpu className="h-4 w-4 text-slate-700" />
                <h4>Generate Simulated Profile</h4>
              </div>
              <p className="mt-2 text-xs text-slate-500 max-w-xs leading-relaxed">
                Our cognitive simulation model compiles your habits and scores your relative driving attention levels against regional baselines.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-slate-900 text-white font-mono text-sm z-10 shadow-sm border border-slate-800">
                03
              </div>
              <div className="flex items-center gap-1.5 mt-6 text-slate-900 font-bold uppercase tracking-wider text-xs">
                <BarChart3 className="h-4 w-4 text-slate-700" />
                <h4>View Awareness Results</h4>
              </div>
              <p className="mt-2 text-xs text-slate-500 max-w-xs leading-relaxed">
                Unlock your interactive report. Review fatigue risk analytics, view specific scores, and choose to enter our early-access research cohort.
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              onClick={onStartSimulation}
              className="inline-flex items-center justify-center gap-2 rounded bg-slate-900 px-6 py-4.5 text-xs font-bold uppercase tracking-wider text-white shadow transition-all hover:bg-slate-800 active:scale-95 cursor-pointer"
            >
              Start Awareness Simulation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
