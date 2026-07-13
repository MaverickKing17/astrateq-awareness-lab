import React, { useState } from "react";
import { DriverInsights, DriverSimulationInputs } from "../types";
import { 
  Brain, Eye, ShieldCheck, Lock, Check, MapPin, Cpu, 
  Info, ChevronDown, ChevronUp, Sparkles, ArrowRight, RefreshCw, Compass
} from "lucide-react";

import HWY_404_POV_IMAGE from "../assets/images/driver_lifestyle_simulation_1783021555044.jpg";

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

  // Determine levels and badges based on the new behavioral score scale
  const getLevel = (scoreValue: number) => {
    if (scoreValue >= 80) {
      return { 
        label: "Strong Focus", 
        color: "text-blue-800 bg-blue-50/80 border-blue-200 font-mono", 
        border: "border-blue-500", 
        text: "Strong awareness patterns and stable attention behavior under driving conditions" 
      };
    }
    if (scoreValue >= 40) {
      return { 
        label: "Variable Focus", 
        color: "text-amber-800 bg-amber-50/80 border-amber-200 font-mono", 
        border: "border-amber-400", 
        text: "Moderate awareness patterns with variable attention exposure" 
      };
    }
    return { 
      label: "Elevated Opportunity", 
      color: "text-rose-800 bg-rose-50/80 border-rose-200 font-mono", 
      border: "border-rose-400", 
      text: "Elevated opportunity for awareness improvement in driving behavior patterns" 
    };
  };

  const levelInfo = getLevel(score);

  // Determine Priority Queue Reservation Tier based on simulated score
  const getCohortAssignment = (scoreValue: number) => {
    if (scoreValue >= 80) {
      return {
        id: "access",
        name: "Priority Reservation — Fast-Track Queue",
        desc: "Guarantees a production slot in our initial Canada shipping queue with a 20% early-bird discount.",
        colorClass: "border-[#0E7C9E]/20 bg-[#0E7C9E]/5 text-[#12233F]",
        badgeColor: "bg-[#0E7C9E] text-white",
        textColor: "text-[#12233F]",
        bulletColor: "bg-[#0E7C9E]"
      };
    }
    if (scoreValue >= 40) {
      return {
        id: "guardian",
        name: "Standard Priority Reservation",
        desc: "Secures Batch 1 priority shipping, Slate Silver chassis, and a locked-in 40% VIP launch discount.",
        colorClass: "border-[#B8860B]/20 bg-[#B8860B]/5 text-[#12233F]",
        badgeColor: "bg-[#B8860B] text-white",
        textColor: "text-[#12233F]",
        bulletColor: "bg-[#B8860B]"
      };
    }
    return {
      id: "founding",
      name: "Standard Reservation",
      desc: "For ultimate driver advocates wishing to collaborate with builders. Secures a 50% launch discount and custom laser-engraved name plate.",
      colorClass: "border-slate-300 bg-slate-50 text-[#12233F]",
      badgeColor: "bg-slate-600 text-white",
      textColor: "text-[#12233F]",
      bulletColor: "bg-slate-550"
    };
  };

  const cohort = getCohortAssignment(score);

  // SVG parameters for circular indicator
  const radius = 60;
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
            Driver Awareness Simulation Output
          </h1>
          <p className="mt-3 text-xs text-slate-700 leading-relaxed max-w-2xl font-medium">
            Thank you for completing your assessment. Your results provide personalized insights into your driving readiness and help advance road safety research across Canada.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 items-center text-[10px] text-slate-400 font-mono">
            <span>METHOD: SIMULATED BEHAVIORAL MODEL</span>
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
              src={HWY_404_POV_IMAGE}
              alt="Driver Lifestyle AR HUD Simulation"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded border border-slate-200/20 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white font-mono shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
              Pre-Launch Simulation Visual
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300 font-mono">Cognitive Driver Cabin Study</p>
              <h3 className="mt-1 text-base font-bold uppercase tracking-wide">Driver Cabin HUD Simulation</h3>
              <p className="text-[11px] text-slate-300 mt-1">Active driver-gaze behavioral model mapping situational awareness in high-density Canadian transit.</p>
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
            <div className="relative flex items-center justify-center p-2 rounded-full bg-cyan-500/[0.03] shadow-[0_0_30px_rgba(6,182,212,0.1)]">
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
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900 leading-none font-mono">
                  {score}
                </span>
                <span className="text-[8px] font-black text-slate-400 mt-1 uppercase tracking-widest font-mono">
                  Simulated Index
                </span>
              </div>
            </div>

            {/* Gauge evaluation summary */}
            <div className="flex-1 text-center sm:text-left lg:text-center">
              <span className={`inline-flex rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider ${levelInfo.color}`}>
                {levelInfo.label}
              </span>
              <h4 className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-800">
                Simulated Awareness Index
              </h4>
              <p className="mt-2 text-[10px] text-slate-700 leading-relaxed font-sans font-medium">
                {levelInfo.text}
              </p>
            </div>
          </div>

          {/* CRITICAL SUPPORTING LABEL */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center bg-slate-50/60 p-3 rounded-lg border border-slate-100">
            <p className="text-[9px] font-bold font-mono text-slate-700 uppercase tracking-wider">
              Critical Disclaimer
            </p>
            <p className="mt-1 text-[10px] font-mono font-medium text-slate-800 leading-normal">
              Simulated Output — Conceptual Behavioral Model (Not Real-World Measurement)
            </p>
          </div>

          {/* Small Trust Disclaimer under Score Section */}
          <p className="mt-4 text-[9px] text-slate-400 font-medium text-center font-sans">
            This is a simulated behavioral research model. No vehicle data is accessed, tracked, or transmitted.
          </p>

          {/* Scale breakdown sub-panel */}
          <div className="mt-6 border-t border-slate-100 pt-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5 font-mono">
              <Info className="h-3.5 w-3.5 text-slate-700" />
              Score Scale Interpretation
            </h4>
            <div className="space-y-1.5 text-[10px] font-mono">
              <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                <span className="font-bold text-slate-700">80 - 100</span>
                <span className="font-bold text-blue-700 uppercase tracking-wide">Strong</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                <span className="font-bold text-slate-700">40 - 79</span>
                <span className="font-bold text-amber-700 uppercase tracking-wide">Moderate</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-2 border border-slate-100 rounded">
                <span className="font-bold text-slate-700">0 - 39</span>
                <span className="font-bold text-rose-700 uppercase tracking-wide">Opportunity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Cards (Takes 8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* COHORT CLASSIFICATION BLOCK (CRITICAL FOR CONVERSION - SECOND MOST IMPORTANT) */}
          <div className={`rounded-xl border-2 p-6 sm:p-8 shadow-xs relative overflow-hidden bg-white ${score >= 80 ? 'border-[#0E7C9E]/30' : score >= 40 ? 'border-[#B8860B]/30' : 'border-slate-300'}`}>
            <div className={`absolute top-0 right-0 rounded-bl px-3.5 py-1 text-[9px] font-bold text-white uppercase tracking-widest font-mono ${cohort.badgeColor}`}>
              {cohort.id === "access" ? "Fast-Track Tier" : cohort.id === "guardian" ? "Priority Tier" : "Standard Tier"} Qualified
            </div>
            
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-[#12233F]/70 font-mono mb-2">
              Your Qualified Priority Pre-Order Tier
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mt-4">
              <div className={`rounded-xl border p-4 w-full sm:w-auto shrink-0 ${cohort.colorClass}`}>
                <span className="text-[10px] font-extrabold uppercase tracking-widest block font-mono">Secured Level</span>
                <h4 className="text-base font-black uppercase mt-1 tracking-tight font-sans">
                  {cohort.name}
                </h4>
              </div>
              
              <div className="flex-1">
                <p className="text-xs text-slate-700 font-sans leading-relaxed">
                  {cohort.desc}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[9px] text-slate-700 font-mono uppercase tracking-wide font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Reservation tier unlocked
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-blue-100/60 pt-4">
              <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider text-center sm:text-left font-semibold font-sans">
                *IMPORTANT LABEL: Qualified pre-order tier is calculated based on simulated behavioral modeling inputs. A refundable $5 CAD deposit secures priority reservation. It is fully refundable at any time prior to Alpha software deployment.
              </p>
            </div>
          </div>

          {/* INTERPRETATION PANEL */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 font-mono">
              What your awareness result suggests
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Based on your answers, your current cognitive awareness profile indicates a score of <strong className="text-slate-900">{score}/100</strong>. This qualifies you for the <strong className="text-slate-900">{cohort.name}</strong>, securing your priority queue slot and manufacturing updates for the physical Astrateq Gadgets Aware-1 dashboard console.
            </p>
          </div>

          {/* 3 BEHAVIORAL INSIGHT CARDS */}
          <div className="grid gap-6">
            
            {/* Card 1: Fatigue Exposure Pattern */}
            <div className="rounded-xl border-2 border-blue-500/80 bg-slate-900 p-6 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-white text-xs font-mono">Fatigue Exposure Pattern</h3>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide font-medium">Based on driving time and frequency inputs</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 border border-blue-500/30 bg-blue-500/10 rounded text-[9px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  Input Mapping
                </span>
              </div>
              
              <p className="text-slate-200 text-xs leading-relaxed font-sans font-medium">
                {fatigueRiskProfile}
              </p>
              <p className="mt-1.5 text-[9px] font-mono text-slate-500 italic">
                Simulated Output — Conceptual Behavioral Model (Not Real-World Measurement)
              </p>

              <div className="mt-4 border-t border-slate-800 pt-3">
                <button 
                  onClick={() => toggleTab("fatigue")} 
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 cursor-pointer font-mono animate-none"
                >
                  <span>{activeTab === "fatigue" ? "Collapse Details" : "View Details"}</span>
                  {activeTab === "fatigue" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                
                {activeTab === "fatigue" && (
                  <div className="mt-3 bg-slate-950 px-6 py-4 rounded text-xs text-slate-300 leading-relaxed border border-slate-800 font-mono font-medium">
                    <p className="font-bold text-blue-400 uppercase tracking-wider text-[10px] mb-1">Fatigue Exposure Metrics:</p>
                    Your self-reported frequency of driving (especially during <strong className="text-white">{inputs.timeOfDay}</strong> hours) directly models standard biological fatigue waves. This behavioral simulation evaluates these indicators against established pre-launch Canadian safety baselines.
                  </div>
                )}
              </div>
            </div>

            {/* Card 2: Attention Stability Profile */}
            <div className="rounded-xl border-2 border-cyan-500/80 bg-slate-900 p-6 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-white text-xs font-mono">Attention Stability Profile</h3>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Based on self-reported focus behavior indicators</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 border border-cyan-500/30 bg-cyan-500/10 rounded text-[9px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Input Mapping
                </span>
              </div>

              <p className="text-slate-200 text-xs leading-relaxed font-sans font-medium">
                {attentionReadiness}
              </p>
              <p className="mt-1.5 text-[9px] font-mono text-slate-500 italic">
                Simulated Output — Conceptual Behavioral Model (Not Real-World Measurement)
              </p>

              <div className="mt-4 border-t border-slate-800 pt-3">
                <button 
                  onClick={() => toggleTab("attention")} 
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 cursor-pointer font-mono animate-none"
                >
                  <span>{activeTab === "attention" ? "Collapse Details" : "View Details"}</span>
                  {activeTab === "attention" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                
                {activeTab === "attention" && (
                  <div className="mt-3 bg-slate-950 px-6 py-4 rounded text-xs text-slate-300 leading-relaxed border border-slate-800 font-mono">
                    <p className="font-bold text-cyan-400 uppercase tracking-wider text-[10px] mb-1">Attention Allocation Dynamics:</p>
                    By indicating your habit of <strong className="text-white">{inputs.attentionHabits.replace(/_/g, " ")}</strong>, our simulated focus matrix estimates visual locking stability rates over typical commutes to help you reflect on micro-distractions.
                  </div>
                )}
              </div>
            </div>

            {/* Card 3: Driving Context Sensitivity */}
            <div className="rounded-xl border-2 border-indigo-500/80 bg-slate-900 p-6 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <Compass className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider text-white text-xs font-mono">Driving Context Sensitivity</h3>
                    <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Based on environmental and commute conditions</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 border border-indigo-500/30 bg-indigo-500/10 rounded text-[9px] font-bold uppercase tracking-wider text-indigo-400 font-mono">
                  Input Mapping
                </span>
              </div>

              <p className="text-slate-200 text-xs leading-relaxed font-sans font-medium">
                {safetyIntelligenceReadiness}
              </p>
              <p className="mt-1.5 text-[9px] font-mono text-slate-500 italic">
                Simulated Output — Conceptual Behavioral Model (Not Real-World Measurement)
              </p>

              <div className="mt-4 border-t border-slate-800 pt-3">
                <button 
                  onClick={() => toggleTab("safety")} 
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 cursor-pointer font-mono animate-none"
                >
                  <span>{activeTab === "safety" ? "Collapse Details" : "View Details"}</span>
                  {activeTab === "safety" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>
                
                {activeTab === "safety" && (
                  <div className="mt-3 bg-slate-950 px-6 py-4 rounded text-xs text-slate-300 leading-relaxed border border-slate-800 font-mono">
                    <p className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] mb-1">Contextual Response Factors:</p>
                    Commutes structured as <strong className="text-white">{inputs.commuteType.replace(/_/g, " ")}</strong> across various provincial routes introduce external cognitive strains. Pre-planning rest frequencies acts as a powerful offset.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Qualitative Overall Evaluation Panel */}
          <div className="rounded-xl bg-slate-950 px-6 py-5 text-white shadow-[0_0_25px_rgba(59,130,246,0.15)] relative overflow-hidden border-2 border-slate-800">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono mb-2">Simulated Driver Assessment Summary</h4>
            <p className="text-[10px] font-mono text-slate-400 italic mb-2">Simulated Output — Conceptual Behavioral Model (Not Real-World Measurement)</p>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {overallEvaluation}
            </p>
          </div>

        </div>
      </div>

      {/* WHAT THIS MEANS SECTION (CONVERSION BRIDGE) */}
      <div className="mb-16 rounded-xl border border-blue-100 bg-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-500" />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 font-mono mb-4">
          Framework Explanation & Next Steps
        </span>
        <h3 className="text-lg font-bold uppercase tracking-wider text-slate-950 mb-2 font-sans">
          What this result means
        </h3>
        <p className="text-xs text-slate-700 mb-6 max-w-2xl leading-relaxed font-medium">
          Please review the foundational details of this cognitive research initiative:
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="p-4 rounded border border-slate-100 bg-slate-50/50">
            <span className="text-[10px] font-bold text-blue-600 font-mono block mb-1">01 / BEHAVIORAL PATTERNS</span>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
              This is a simulation of driver awareness behavior patterns designed around self-reported focus reserves and circadian alignments.
            </p>
          </div>
          <div className="p-4 rounded border border-slate-100 bg-slate-50/50">
            <span className="text-[10px] font-bold text-blue-600 font-mono block mb-1">02 / CONTEXTUAL INPUTS</span>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
              It reflects how users respond to contextual driving inputs, evaluating focus thresholds over typical continuous commutes.
            </p>
          </div>
          <div className="p-4 rounded border border-slate-100 bg-slate-50/50">
            <span className="text-[10px] font-bold text-blue-600 font-mono block mb-1">03 / CONCEPT VALIDATION</span>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">
              It helps validate user interest in future driver awareness intelligence systems without relying on invasive hardware tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Scale breakdown panel */}
      <div className="mb-16 bg-[#EEF3F8] rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2 font-mono">
          <Info className="h-4 w-4 text-slate-700" />
          Pre-Launch Study Calibration & Metrics
        </h3>
        <p className="text-xs text-slate-700 mb-6 max-w-4xl leading-relaxed font-sans font-medium">
          The <strong className="text-slate-900">Driver Awareness Intelligence</strong> model is calibrated using behavioral surveys from Canadian cohorts. Since this is a software-based study rather than hardware-integrated assessment, we evaluate focus using self-reported visual locking frequencies, diurnal scheduling conflicts, and typical fatigue events.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="bg-white p-5 rounded border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Strong Score (80 - 100)
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
              Indicates excellent focus routines, zero smartphone interaction, and proactive fatigue planning. Standard cognitive response times remain highly optimal.
            </p>
          </div>
          <div className="bg-white p-5 rounded border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Moderate Score (40 - 79)
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
              Highlights moderate distraction exposure (e.g., occasional dashboard scrolling) or suboptimal sleep windows. Minor cognitive drift indicators present.
            </p>
          </div>
          <div className="bg-white p-5 rounded border border-slate-100 shadow-sm">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Opportunity Score (Under 40)
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed font-sans">
              Substantial focus vectors identified. Frequent visual field disconnection, driving during biological sleep dips, or persistent fatigue signals. Needs behavioral adjustment.
            </p>
          </div>
        </div>
      </div>

      {/* Mockup's Bottom Card Modules (Three Grid Column Section) */}
      <div className="grid gap-8 md:grid-cols-3 items-stretch mb-12">
        
        {/* Module 1: Privacy Safeguards */}
        <div className="rounded-xl border-2 border-cyan-500/80 bg-slate-900 p-6 text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 mb-4">
              <Lock className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-mono">Privacy First. Always.</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans font-medium">
              Your privacy is at the core of everything we do. Your data is used only for pre-launch research purposes and is never sold or shared with third parties. You're in control.
            </p>
          </div>
          <ul className="space-y-2 border-t border-slate-800 pt-4 text-[11px] text-slate-300 font-mono">
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-cyan-400" />
              <span>100% anonymous assessment</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-cyan-400" />
              <span>Encrypted & stored in Canada</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-cyan-400" />
              <span>Full control over your data deletion</span>
            </li>
          </ul>
        </div>

        {/* Module 2: Help Advance Road Safety (Main Highlighted CTA Card with ONE dominant CTA) */}
        <div className="rounded-xl border-2 border-rose-500 bg-slate-950 p-6 shadow-xl relative flex flex-col justify-between overflow-hidden text-white ring-2 ring-rose-500/50 ring-offset-2 ring-offset-slate-950 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.25)] transition-all duration-300">
          <div>
            <span className="inline-flex items-center gap-1 rounded border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-[9px] font-bold text-rose-400 uppercase font-mono mb-3">
              Research Study Signup
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-2 text-white font-mono">Help Advance Road Safety</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
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
              onClick={() => onNavigateToCohort(cohort.id)}
              className="w-full inline-flex items-center justify-center rounded bg-blue-600 border border-blue-500 hover:bg-blue-700 hover:border-blue-600 px-5 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98] cursor-pointer font-mono"
            >
              Unlock Full Report
            </button>
            <p className="text-center text-[9px] text-slate-400 font-mono uppercase tracking-wider mt-1 leading-normal">
              A refundable $5 CAD deposit secures priority reservation. It is fully refundable at any time prior to Alpha software deployment.
            </p>
          </div>
        </div>

        {/* Module 3: What We Do NOT Do */}
        <div className="rounded-xl border-2 border-indigo-500/80 bg-slate-900 p-6 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all hover:border-indigo-400 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] flex flex-col justify-between">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 mb-4">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">What We Do NOT Do</h3>
            <div className="space-y-4 font-sans">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                  <MapPin className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-white font-mono leading-none">No Location Tracking</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-medium">We do not collect or track your location, GPS, or driving routes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                  <Lock className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-white font-mono leading-none">No Insurance Sharing</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-medium">We do not share any data with insurance underwriters or providers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                  <Cpu className="h-3 w-3" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-white font-mono leading-none">Simulation Only</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-medium">This assessment is simulation-only. No vehicle connection is required.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-center">
            <button
              onClick={onReset}
              className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 cursor-pointer underline font-mono"
            >
              Reset Questionnaire
            </button>
          </div>
        </div>

      </div>

      {/* PRIMARY CTA SECTION (CRITICAL CONVERSION POINT) */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-xl p-8 sm:p-12 text-center max-w-3xl mx-auto my-12 text-white shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-3 font-sans relative z-10">
          Ready to Secure Your Aware-1 Priority Slot?
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 relative z-10">
          <button
            onClick={() => onNavigateToCohort(cohort.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all active:scale-[0.98] cursor-pointer font-mono"
          >
            Unlock Full Report
          </button>
          
          <button
            onClick={onReset}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-transparent border border-white/20 text-slate-400 hover:text-white hover:border-white/40 px-8 py-4 text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer font-mono"
          >
            RESET QUESTIONNAIRE
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-300 font-sans font-bold relative z-10">
          A refundable $5 CAD deposit secures priority reservation. It is fully refundable at any time prior to Alpha software deployment.
        </p>

        <p className="text-xs text-slate-400 mt-5 text-center leading-relaxed max-w-2xl mx-auto relative z-10">
          *Validation data is aggregated completely anonymously under local Canadian privacy guidelines. No active vehicular telemetry, GPS coordinates, or biometric profiles are captured, cached, or transmitted during this software-demand study.
        </p>
      </div>

    </div>
  );
}
