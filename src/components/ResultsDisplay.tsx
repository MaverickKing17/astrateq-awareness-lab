import React, { useState } from "react";
import { DriverInsights, DriverSimulationInputs } from "../types";
import { 
  Brain, Eye, ShieldCheck, Lock, Check, CheckCircle2, MapPinOff, ShieldAlert, Cpu, 
  Info, ChevronDown, ChevronUp, AlertCircle, Sparkles, ArrowRight
} from "lucide-react";

interface ResultsDisplayProps {
  insights: DriverInsights;
  inputs: DriverSimulationInputs;
  onNavigateToCohort: (tier?: string) => void;
  onReset: () => void;
}

export default function ResultsDisplay({ insights, inputs, onNavigateToCohort, onReset }: ResultsDisplayProps) {
  const { score, fatigueRiskProfile, attentionReadiness, safetyIntelligenceReadiness, overallEvaluation, isAiGenerated } = insights;
  
  // Accordion active state for individual cards
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const toggleTab = (tab: string) => {
    setActiveTab(prev => (prev === tab ? null : tab));
  };

  // Determine levels and badges
  const getLevel = (scoreValue: number) => {
    if (scoreValue >= 80) return { label: "Good", color: "text-emerald-800 bg-emerald-50/50 border-emerald-200 font-mono", border: "border-emerald-500", text: "You show strong awareness and good driving habits. Keep building on these positive patterns." };
    if (scoreValue >= 60) return { label: "Moderate", color: "text-amber-800 bg-amber-50/50 border-amber-200 font-mono", border: "border-amber-400", text: "Moderate fatigue exposure or focus variance detected. Opportunities to reinforce focus habits." };
    return { label: "Needs Review", color: "text-rose-800 bg-rose-50/50 border-rose-200 font-mono", border: "border-rose-400", text: "Cognitive focus limits indicate opportunities for risk reduction and schedule restructuring." };
  };

  const levelInfo = getLevel(score);

  // SVG parameters for circular indicator
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      {/* 🇨🇦 Badge & Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono">
            <span>🇨🇦</span> Post-Assessment Results
          </span>
          <h1 className="mt-4 text-2xl font-bold uppercase tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Driver Awareness Report
          </h1>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed max-w-2xl">
            Thank you for completing your assessment. Your results provide personalized insights into your driving readiness and help advance road safety research across Canada.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 items-center text-[10px] text-slate-400 font-mono">
            <span>METHOD: SIMULATED BEHAVIORAL AI</span>
            <span>•</span>
            <span>TARGET: CANADIAN COMMUTERS</span>
            <span>•</span>
            {isAiGenerated ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                <Sparkles className="h-3 w-3" /> PERSONALIZED COGNITIVE MODEL LIVE
              </span>
            ) : (
              <span>STANDARD CALIBRATION MODEL</span>
            )}
          </div>
        </div>

        {/* Right side Scenic Canada highway mockup */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl h-60 lg:h-72 shadow-sm group border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80"
              alt="Canada Winding Mountain Road"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded border border-slate-200/20 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white font-mono shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
              Pre-Launch Simulation Visual
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300 font-mono">Cognitive Driver Study</p>
              <h3 className="mt-1 text-base font-bold uppercase tracking-wide">Trans-Canada Highway Simulation</h3>
              <p className="text-[11px] text-slate-300 mt-1">Validating active attention cues over long continuous distances.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Grid: Score & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Score Card - Primary Visual (Takes 4 cols on desktop) */}
        <div className="lg:col-span-4 rounded-xl border-2 border-cyan-500/30 bg-white p-6 shadow-xl relative overflow-hidden h-full lg:sticky lg:top-20 ring-1 ring-cyan-500/10">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-500" />
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-6">
            Overall Awareness Readiness
          </h3>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-6">
            {/* Circular Gauge */}
            <div className="relative flex items-center justify-center">
              <svg height={radius * 2} width={radius * 2}>
                {/* Background circle */}
                <circle
                  stroke="#f1f5f9"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                {/* Colored progress circle */}
                <circle
                  stroke="url(#slateGradient)"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + " " + circumference}
                  style={{ strokeDashoffset }}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="rotate-[-90deg] origin-center transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="slateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900 leading-none font-mono">
                  {score}
                </span>
                <span className="text-[10px] font-bold text-slate-400 mt-0.5 font-mono">
                  /100
                </span>
              </div>
            </div>

            {/* Gauge evaluation summary */}
            <div className="flex-1 text-center sm:text-left lg:text-center">
              <span className={`inline-flex rounded border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${levelInfo.color}`}>
                {levelInfo.label}
              </span>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-800">
                Driver Awareness Score
              </h4>
              <p className="mt-1 text-[10px] font-mono text-slate-400 italic">
                Simulated Output — Conceptual Model (Not Real-World Data)
              </p>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                {levelInfo.text}
              </p>
              <p className="mt-2 text-[9px] font-mono text-slate-400 leading-tight">
                This is a simulated model output, not real-world measured data.
              </p>
            </div>
          </div>

          {/* Scale breakdown sub-panel */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5 font-mono">
              <Info className="h-3.5 w-3.5 text-slate-500" />
              Score Scale Interpretation
            </h4>
            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                <span className="font-bold text-slate-700">80 - 100</span>
                <span className="font-bold text-emerald-800 uppercase tracking-wide">Strong</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                <span className="font-bold text-slate-700">60 - 79</span>
                <span className="font-bold text-amber-800 uppercase tracking-wide">Moderate</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                <span className="font-bold text-slate-700">20 - 59</span>
                <span className="font-bold text-rose-800 uppercase tracking-wide">Needs Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Cards (Takes 8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Card 1: Fatigue Risk */}
          <div className="rounded-xl border-2 border-[#E6EDF5] bg-white p-6 shadow-sm transition-all hover:border-slate-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-900">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs font-mono">Fatigue Risk Awareness</h3>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Sleep debt, circadian alignments & transit times</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 border rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                inputs.fatigueAssessment === "rarely_tired" 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                  : inputs.fatigueAssessment === "sometimes_tired" 
                    ? "bg-amber-50 text-amber-800 border-amber-200" 
                    : "bg-rose-50 text-rose-800 border-rose-200"
              }`}>
                {inputs.fatigueAssessment === "rarely_tired" ? "Optimized" : inputs.fatigueAssessment === "sometimes_tired" ? "Moderate Exposure" : "High Risk"}
              </span>
            </div>
            
            <p className="text-slate-600 text-xs leading-relaxed">
              {fatigueRiskProfile}
            </p>
            <p className="mt-1 text-[9px] font-mono text-slate-400 italic">
              Simulated Output — Conceptual Model (Not Real Data)
            </p>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <button 
                onClick={() => toggleTab("fatigue")} 
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 hover:text-slate-700 cursor-pointer font-mono"
              >
                <span>{activeTab === "fatigue" ? "Collapse Details" : "View Details"}</span>
                {activeTab === "fatigue" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              
              {activeTab === "fatigue" && (
                <div className="mt-3 bg-slate-50 p-4 rounded text-xs text-slate-500 leading-relaxed border border-slate-200 font-mono animate-in slide-in-from-top-2 duration-150">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-1">Cognitive Risk Factor Analysis:</p>
                  Our research suggests that fatigue acts as a delayed feedback trigger. When driving during <strong className="text-slate-900">{inputs.timeOfDay}</strong> hours, biological circadian signals increase drowsiness cycles. Over long-distance Canadian commutes, this reduces split-second decision velocities.
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Attention Readiness */}
          <div className="rounded-xl border-2 border-[#E6EDF5] bg-white p-6 shadow-sm transition-all hover:border-slate-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-900">
                  <Eye className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs font-mono">Attention Readiness</h3>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Micro-distraction management & scanning behavior</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 border rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                inputs.attentionHabits === "always_focused" 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                  : inputs.attentionHabits === "frequent_radio_adjust"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
              }`}>
                {inputs.attentionHabits === "always_focused" ? "Highly Focused" : "Split Focus"}
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              {attentionReadiness}
            </p>
            <p className="mt-1 text-[9px] font-mono text-slate-400 italic">
              Simulated Output — Conceptual Model (Not Real Data)
            </p>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <button 
                onClick={() => toggleTab("attention")} 
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 hover:text-slate-700 cursor-pointer font-mono"
              >
                <span>{activeTab === "attention" ? "Collapse Details" : "View Details"}</span>
                {activeTab === "attention" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              
              {activeTab === "attention" && (
                <div className="mt-3 bg-slate-50 p-4 rounded text-xs text-slate-500 leading-relaxed border border-slate-200 font-mono animate-in slide-in-from-top-2 duration-150">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-1">Attention Allocation Dynamics:</p>
                  By responding that you utilize <strong className="text-slate-900">{inputs.attentionHabits.replace(/_/g, " ")}</strong>, your visual attention is frequently split. Taking your eyes off the visual field for just 1.5 seconds at 100 km/h means traveling over 40 meters blind. This highlights the vital importance of a hands-free, locked-in setup.
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Safety Intelligence Readiness */}
          <div className="rounded-xl border-2 border-[#E6EDF5] bg-white p-6 shadow-sm transition-all hover:border-slate-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-slate-100 border border-slate-200 text-slate-900">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs font-mono">Safety Readiness</h3>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Actionable recommendations & tactical improvements</p>
                </div>
              </div>
              <span className="px-2 py-0.5 border border-slate-200 bg-slate-50 rounded text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono">
                Action Tips
              </span>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              {safetyIntelligenceReadiness}
            </p>
            <p className="mt-1 text-[9px] font-mono text-slate-400 italic">
              Simulated Output — Conceptual Model (Not Real Data)
            </p>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <button 
                onClick={() => toggleTab("safety")} 
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 hover:text-slate-700 cursor-pointer font-mono"
              >
                <span>{activeTab === "safety" ? "Collapse Details" : "View Details"}</span>
                {activeTab === "safety" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              
              {activeTab === "safety" && (
                <div className="mt-3 bg-slate-50 p-4 rounded text-xs text-slate-500 leading-relaxed border border-slate-200 font-mono animate-in slide-in-from-top-2 duration-150">
                  <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-1">Tactical Focus Recommendation:</p>
                  Always pre-plan temperature, audio channels, and route coordinates BEFORE taking off. If long <strong className="text-slate-900">{inputs.commuteType}</strong> driving stretches cause mental drift, implement a standard 15-minute cognitive rest interval to break focus loops.
                </div>
              )}
            </div>
          </div>

          {/* Qualitative Overall Evaluation Panel */}
          <div className="rounded-xl bg-slate-950 p-6 text-white shadow-[0_0_25px_rgba(6,182,212,0.2)] relative overflow-hidden border-2 border-slate-800">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-2">Simulated Driver Assessment Summary</h4>
            <p className="text-[10px] font-mono text-slate-400 italic mb-2">Simulated Output — Conceptual Model (Not Real Data)</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              {overallEvaluation}
            </p>
          </div>

        </div>
      </div>

      {/* Accordion / Interpretation Panel */}
      <div className="mb-16 bg-[#D8E3EE] rounded-xl p-6 sm:p-8 border border-[#cbd5e1] shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
          <Info className="h-4 w-4 text-slate-700" />
          Pre-Launch Study Calibration & Scale Metrics
        </h3>
        <p className="text-xs text-slate-500 mb-6 max-w-4xl leading-relaxed">
          The <strong className="text-slate-900">Astrateq Gadgets Driver Awareness Score</strong> is calibrated using aggregated behavioral surveys from Canadian cohorts. Since this is a software-based study rather than hardware-integrated diagnostics, we evaluate focus using self-reported visual locking frequencies, diurnal scheduling conflicts, and typical fatigue events.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="bg-white p-5 rounded border border-[#E6EDF5] shadow-xs">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> High Score (80 - 100)
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Indicates excellent focus routines, zero smartphone interaction, and proactive fatigue planning. Standard cognitive response times remain highly optimal.
            </p>
          </div>
          <div className="bg-white p-5 rounded border border-[#E6EDF5] shadow-xs">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Medium Score (60 - 79)
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Highlights moderate distraction exposure (e.g., occasional dashboard scrolling) or suboptimal sleep windows. Minor cognitive drift indicators present.
            </p>
          </div>
          <div className="bg-white p-5 rounded border border-[#E6EDF5] shadow-xs">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Low Score (Under 60)
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Substantial risk vectors identified. Frequent visual field disconnection, driving during biological sleep dips, or persistent yawning. Needs behavioral adjustment.
            </p>
          </div>
        </div>
      </div>

      {/* Mockup's Bottom Card Modules (Three Grid Column Section) */}
      <div className="grid gap-8 md:grid-cols-3 items-stretch mb-12">
        
        {/* Module 1: Privacy Safeguards */}
        <div className="rounded-xl border-2 border-[#E6EDF5] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900 mb-4">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">Privacy First. Always.</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Your privacy is at the core of everything we do. Your data is used only for pre-launch research purposes and is never sold or shared with third parties. You're in control.
            </p>
          </div>
          <ul className="space-y-2 border-t border-slate-100 pt-4 text-[11px] text-slate-600 font-mono">
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-slate-900" />
              <span>100% anonymous assessment</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-slate-900" />
              <span>Encrypted & stored in Canada</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-slate-900" />
              <span>Full control over your deletion</span>
            </li>
          </ul>
        </div>

        {/* Module 2: Help Advance Road Safety (Main Highlighted CTA Card) */}
        <div className="rounded-xl border border-slate-900 bg-slate-950 p-6 shadow-md relative flex flex-col justify-between overflow-hidden text-white">
          <div>
            <span className="inline-flex items-center gap-1 rounded border border-slate-800 bg-slate-900 px-2 py-0.5 text-[9px] font-bold text-slate-300 uppercase font-mono mb-3">
              Research Study Signup
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-white">Help Advance Road Safety</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Join our Early Access Research Cohort and help shape the future of driver safety intelligence. Your insights contribute to smarter tools, safer roads, and stronger communities.
            </p>
            <ul className="space-y-2 text-[11px] text-slate-300 font-mono mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>First access to new insights</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Contribute to safety research</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>Impact with local researchers</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => onNavigateToCohort("guardian")}
              className="w-full inline-flex items-center justify-center rounded bg-blue-600 border border-blue-500 hover:bg-blue-700 hover:border-blue-600 px-5 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98] cursor-pointer font-mono"
            >
              Join Research Cohort
            </button>
            <p className="text-center text-[9px] text-slate-500 font-mono uppercase tracking-wider mt-1">
              SPOTS ARE LIMITED IN CA • FREE PARTICIPATION
            </p>
          </div>
        </div>

        {/* Module 3: What We Do NOT Do */}
        <div className="rounded-xl border-2 border-[#E6EDF5] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-slate-50 text-slate-900 mb-4">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">What We Do NOT Do</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-slate-100 border border-slate-200 text-slate-900 shrink-0">
                  <MapPinOff className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono leading-none">No Vehicle Tracking</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">We do not collect or track your location or driving routes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-slate-100 border border-slate-200 text-slate-900 shrink-0">
                  <ShieldAlert className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono leading-none">No Insurance Sharing</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">We do not share data with insurers or any third parties.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-slate-100 border border-slate-200 text-slate-900 shrink-0">
                  <Cpu className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-800 font-mono leading-none">Simulation Only</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">This assessment is simulation-based. No vehicle or device required.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={onReset}
              className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 cursor-pointer underline font-mono"
            >
              Restart Study
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
