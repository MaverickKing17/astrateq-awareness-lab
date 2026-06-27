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
    if (scoreValue >= 80) return { label: "Good", color: "text-emerald-700 bg-emerald-50 border-emerald-100", border: "border-emerald-500", text: "You show strong awareness and good driving habits. Keep building on these positive patterns." };
    if (scoreValue >= 60) return { label: "Moderate", color: "text-amber-700 bg-amber-50 border-amber-100", border: "border-amber-400", text: "Moderate fatigue exposure or focus variance detected. Opportunities to reinforce focus habits." };
    return { label: "Needs Review", color: "text-rose-700 bg-rose-50 border-rose-100", border: "border-rose-400", text: "Cognitive focus limits indicate opportunities for risk reduction and schedule restructuring." };
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
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1 text-xs font-semibold text-white">
            <span className="text-sm">🇨🇦</span> Post-Assessment Results
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Your Driver Awareness Report
          </h1>
          <p className="mt-4 text-base text-slate-500 leading-relaxed max-w-2xl">
            Thank you for completing your assessment. Your results provide personalized insights into your driving readiness and help advance road safety research across Canada.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
            <span>Method: Simulated Behavioral AI</span>
            <span>•</span>
            <span>Target Group: Canadian Commuters</span>
            <span>•</span>
            {isAiGenerated ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                <Sparkles className="h-3 w-3" /> Personalized AI Analysis Live
              </span>
            ) : (
              <span className="text-slate-400">Standard Calibration Model</span>
            )}
          </div>
        </div>

        {/* Right side Scenic Canada highway mockup */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl h-60 lg:h-72 shadow-lg group border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80"
              alt="Canada Winding Mountain Road"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-lg bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              Pre-Launch Simulation Visual
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Cognitive Driver Study</p>
              <h3 className="mt-1 text-lg font-bold">Trans-Canada Highway Simulation</h3>
              <p className="text-[11px] text-slate-200 mt-1">Validating active attention cues over long continuous distances.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Grid: Score & Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Score Card - Primary Visual (Takes 4 cols on desktop) */}
        <div className="lg:col-span-4 rounded-3xl border border-blue-100 bg-white p-6 shadow-md shadow-blue-500/5 relative overflow-hidden h-full lg:sticky lg:top-20">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
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
                  stroke="url(#blueGradient)"
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
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900 leading-none">
                  {score}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
                  /100
                </span>
              </div>
            </div>

            {/* Gauge evaluation summary */}
            <div className="flex-1 text-center sm:text-left lg:text-center">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold border ${levelInfo.color}`}>
                {levelInfo.label}
              </span>
              <h4 className="mt-3 text-sm font-semibold text-slate-800 leading-snug">
                Driver Awareness Score
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                {levelInfo.text}
              </p>
            </div>
          </div>

          {/* Scale breakdown sub-panel */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-blue-500" />
              Score Scale Interpretation
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                <span className="font-semibold text-slate-700">80 - 100</span>
                <span className="font-semibold text-emerald-600">Strong Awareness Patterns</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                <span className="font-semibold text-slate-700">60 - 79</span>
                <span className="font-semibold text-amber-600">Moderate Fatigue Exposure</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg">
                <span className="font-semibold text-slate-700">20 - 59</span>
                <span className="font-semibold text-rose-600">Improvement Opportunity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Cards (Takes 8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Card 1: Fatigue Risk */}
          <div className="rounded-2xl border border-slate-150 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Fatigue Risk Awareness</h3>
                  <p className="text-[10px] text-slate-400">Sleep debt, circadian alignments & transit times</p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                inputs.fatigueAssessment === "rarely_tired" 
                  ? "bg-emerald-50 text-emerald-700" 
                  : inputs.fatigueAssessment === "sometimes_tired" 
                    ? "bg-amber-50 text-amber-700" 
                    : "bg-rose-50 text-rose-700"
              }`}>
                {inputs.fatigueAssessment === "rarely_tired" ? "Optimized" : inputs.fatigueAssessment === "sometimes_tired" ? "Moderate Exposure" : "High Risk"}
              </span>
            </div>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {fatigueRiskProfile}
            </p>

            <div className="mt-4 border-t border-slate-50 pt-3">
              <button 
                onClick={() => toggleTab("fatigue")} 
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>{activeTab === "fatigue" ? "Collapse cognitive details" : "View cognitive details"}</span>
                {activeTab === "fatigue" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              
              {activeTab === "fatigue" && (
                <div className="mt-3 bg-slate-50 p-4 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100 animate-in slide-in-from-top-2 duration-200">
                  <p className="font-semibold text-slate-800 mb-1">Cognitive Risk Factor Analysis:</p>
                  Our research suggests that fatigue acts as a delayed feedback trigger. When driving during <strong>{inputs.timeOfDay}</strong> hours, biological circadian signals increase drowsiness cycles. Over long-distance Canadian commutes, this reduces split-second decision velocities.
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Attention Readiness */}
          <div className="rounded-2xl border border-slate-150 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Attention Readiness</h3>
                  <p className="text-[10px] text-slate-400">Micro-distraction management & scanning behavior</p>
                </div>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                inputs.attentionHabits === "always_focused" 
                  ? "bg-emerald-50 text-emerald-700" 
                  : inputs.attentionHabits === "frequent_radio_adjust"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-rose-50 text-rose-700"
              }`}>
                {inputs.attentionHabits === "always_focused" ? "Highly Focused" : "Split Focus"}
              </span>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {attentionReadiness}
            </p>

            <div className="mt-4 border-t border-slate-50 pt-3">
              <button 
                onClick={() => toggleTab("attention")} 
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>{activeTab === "attention" ? "Collapse distraction details" : "View distraction details"}</span>
                {activeTab === "attention" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              
              {activeTab === "attention" && (
                <div className="mt-3 bg-slate-50 p-4 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100 animate-in slide-in-from-top-2 duration-200">
                  <p className="font-semibold text-slate-800 mb-1">Attention Allocation Dynamics:</p>
                  By responding that you utilize <strong>{inputs.attentionHabits.replace(/_/g, " ")}</strong>, your visual attention is frequently split. Taking your eyes off the visual field for just 1.5 seconds at 100 km/h means traveling over 40 meters blind. This highlights the vital importance of a hands-free, locked-in setup.
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Safety Intelligence Readiness */}
          <div className="rounded-2xl border border-slate-150 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Safety Intelligence Readiness</h3>
                  <p className="text-[10px] text-slate-400">Actionable recommendations & tactical improvements</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                Action Tips
              </span>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {safetyIntelligenceReadiness}
            </p>

            <div className="mt-4 border-t border-slate-50 pt-3">
              <button 
                onClick={() => toggleTab("safety")} 
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>{activeTab === "safety" ? "Collapse actionable advice" : "View actionable advice"}</span>
                {activeTab === "safety" ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              
              {activeTab === "safety" && (
                <div className="mt-3 bg-slate-50 p-4 rounded-xl text-xs text-slate-500 leading-relaxed border border-slate-100 animate-in slide-in-from-top-2 duration-200">
                  <p className="font-semibold text-slate-800 mb-1">Tactical Focus Recommendation:</p>
                  Always pre-plan temperature, audio channels, and route coordinates BEFORE taking off. If long <strong>{inputs.commuteType}</strong> driving stretches cause mental drift, implement a standard 15-minute cognitive rest interval to break focus loops.
                </div>
              )}
            </div>
          </div>

          {/* Qualitative Overall Evaluation Panel */}
          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Simulated Driver Assessment Summary</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {overallEvaluation}
            </p>
          </div>

        </div>
      </div>

      {/* Accordion / Interpretation Panel (Required Section C on Page 4) */}
      <div className="mb-16 bg-blue-50/30 rounded-3xl p-6 sm:p-8 border border-blue-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          Pre-Launch Study Calibration & Scale Metrics
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-4xl">
          The <strong>Astrateq Driver Awareness Score</strong> is calibrated using aggregated behavioral surveys from Canadian cohorts. Since this is a software-based study rather than hardware-integrated diagnostics, we evaluate focus using self-reported visual locking frequencies, diurnal scheduling conflicts, and typical fatigue events.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            <h4 className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> High Score (80 - 100)
            </h4>
            <p className="text-xs text-slate-500 mt-2">
              Indicates excellent focus routines, zero smartphone interaction, and proactive fatigue planning. Standard cognitive response times remain highly optimal.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            <h4 className="text-xs font-bold text-amber-700 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Medium Score (60 - 79)
            </h4>
            <p className="text-xs text-slate-500 mt-2">
              Highlights moderate distraction exposure (e.g., occasional dashboard scrolling) or suboptimal sleep windows. Minor cognitive drift indicators present.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
            <h4 className="text-xs font-bold text-rose-700 flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> Low Score (Under 60)
            </h4>
            <p className="text-xs text-slate-500 mt-2">
              Substantial risk vectors identified. Frequent visual field disconnection, driving during biological sleep dips, or persistent yawning. Needs behavioral adjustment.
            </p>
          </div>
        </div>
      </div>

      {/* Mockup's Bottom Card Modules (Three Grid Column Section) */}
      <div className="grid gap-8 md:grid-cols-3 items-stretch mb-12">
        
        {/* Module 1: Privacy Safeguards */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Privacy First. Always.</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Your privacy is at the core of everything we do. Your data is used only for pre-launch research purposes and is never sold or shared with third parties. You're in control.
            </p>
          </div>
          <ul className="space-y-2 border-t border-slate-50 pt-4 text-xs text-slate-600 font-medium">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-600" />
              <span>100% anonymous assessment</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-600" />
              <span>Encrypted & securely stored in Canada</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-600" />
              <span>You control your data deletion</span>
            </li>
          </ul>
        </div>

        {/* Module 2: Help Advance Road Safety (Main Highlighted CTA Card) */}
        <div className="rounded-2xl border-2 border-blue-500 bg-white p-6 shadow-md shadow-blue-500/5 relative flex flex-col justify-between overflow-hidden">
          <div className="absolute -top-12 -right-12 h-24 w-24 bg-blue-500/10 rounded-full blur-xl" />
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 uppercase mb-3">
              Research Study Signup
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">Help Advance Road Safety in Canada</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Join our Early Access Research Cohort and help shape the future of driver safety intelligence. Your insights will contribute to smarter tools, safer roads, and stronger communities.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 font-medium mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>Be among the first to access new insights</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>Contribute to Canadian road safety research</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                <span>Make a real impact with local researchers</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => onNavigateToCohort()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <span>Join Early Access Research Cohort</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <p className="text-center text-[10px] text-slate-400">Spots are limited. Join the waitlist today.</p>
          </div>
        </div>

        {/* Module 3: What We Do NOT Do */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 mb-4">
              <ShieldAlert className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-4">What We Do NOT Do</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded-md bg-blue-50 text-blue-600 shrink-0">
                  <MapPinOff className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">No Vehicle Tracking</h4>
                  <p className="text-[11px] text-slate-500 mt-1">We do not collect or track your location or driving routes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded-md bg-blue-50 text-blue-600 shrink-0">
                  <ShieldAlert className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">No Insurance Sharing</h4>
                  <p className="text-[11px] text-slate-500 mt-1">We do not share data with insurers or any third parties.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded-md bg-blue-50 text-blue-600 shrink-0">
                  <Cpu className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-none">Simulation Only</h4>
                  <p className="text-[11px] text-slate-500 mt-1">This assessment is simulation-based. No vehicle or device required.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-50 text-center">
            <button
              onClick={onReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer underline"
            >
              Reset and take assessment again
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
