import React, { useEffect, useState } from "react";
import { Cpu, ShieldCheck, Loader2, Activity, Lock, Check, Compass, Terminal } from "lucide-react";
import { motion } from "motion/react";

export default function LoadingOverlay() {
  const [score, setScore] = useState(25);
  const [confidence, setConfidence] = useState(40);
  const [stepIdx, setStepIdx] = useState(0);
  const [ramStatus, setRamStatus] = useState("INITIALIZING");

  const messages = [
    "Establishing cabin focal calibration...",
    "Analyzing eye saccade velocity models...",
    "Parsing 10 behavioral inputs...",
    "Evaluating regional commute fatigue offsets...",
    "Executing 100% Isolated RAM security...",
  ];

  useEffect(() => {
    // 1. Score counter animation (up to 82)
    const scoreInterval = setInterval(() => {
      setScore(prev => {
        if (prev >= 82) {
          clearInterval(scoreInterval);
          return 82;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 80);

    // 2. Confidence rating animation (up to 94)
    const confidenceInterval = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 94) {
          clearInterval(confidenceInterval);
          return 94;
        }
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 60);

    // 3. Step messages sequence
    const stepInterval = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= messages.length - 1) {
          clearInterval(stepInterval);
          return messages.length - 1;
        }
        return prev + 1;
      });
    }, 650);

    // 4. RAM status sequencing
    const ramTimer1 = setTimeout(() => setRamStatus("ISOLATING MEMORY"), 1200);
    const ramTimer2 = setTimeout(() => setRamStatus("100% ISOLATED RAM"), 2600);

    return () => {
      clearInterval(scoreInterval);
      clearInterval(confidenceInterval);
      clearInterval(stepInterval);
      clearTimeout(ramTimer1);
      clearTimeout(ramTimer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070C15]/98 p-4 backdrop-blur-md transition-all duration-500">
      
      {/* Grid line background overlay for ultimate cyber design */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
      <div className="absolute top-[25%] left-[25%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[25%] right-[25%] w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0B1220]/90 p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(59,130,246,0.15)] relative">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30 rounded-tl" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30 rounded-tr" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30 rounded-bl" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/30 rounded-br" />

        {/* Engine Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono">ASTRATEQ ENGINE v1.04</span>
              <h2 className="text-xs font-bold text-slate-200 font-mono mt-0.5">COGNITIVE COMPILING ENGINE</h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 text-[8.5px] font-bold text-blue-400 font-mono uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
            </span>
            <span>CALCULATING COHORT</span>
          </div>
        </div>

        {/* Dynamic Mockup Diagnostic Panel Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          
          {/* Left Sub-Panel: Score Dial (Value locking to 82) */}
          <div className="rounded-xl bg-slate-950/80 p-5 border border-slate-800 flex flex-col items-center justify-center space-y-4">
            <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">DRIVER AWARENESS SCORE</span>
            
            {/* Cyber Ring */}
            <div className="relative flex items-center justify-center h-32 w-32 rounded-full bg-gradient-to-b from-slate-900 to-slate-950 border-4 border-blue-500/30 shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
              {/* Spinning dotted orbit */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-cyan-500/30 animate-[spin_20s_linear_infinite]" />
              
              {/* Dynamic Progress Indicator arc */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-500 animate-[spin_3s_linear_infinite] opacity-50" />
              
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black font-mono tracking-tight text-white leading-none">
                  {score}
                </span>
                <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest font-mono mt-1">
                  {score >= 82 ? "LOCKED IN" : "PARSING..."}
                </span>
              </div>
            </div>

            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider text-center">
              Calibrated against Canadian road safety indexes
            </p>
          </div>

          {/* Right Sub-Panel: Telemetry & Confidence Ratings */}
          <div className="rounded-xl bg-slate-950/80 p-5 border border-slate-800 flex flex-col justify-between space-y-4 font-mono text-xs">
            
            {/* Telemetry Indicator 1: Confidence Rating */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] uppercase text-slate-400 tracking-wider">
                <span>CONFIDENCE RATING</span>
                <span className="text-cyan-400 font-bold">{confidence}% FOCAL ALIGNMENT</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-150" 
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>

            {/* Telemetry Indicator 2: Privacy Execution */}
            <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">PRIVACY STANDARDS</p>
                <p className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">{ramStatus}</p>
              </div>
              <div className={`p-1.5 rounded bg-slate-950 border ${ramStatus === "100% ISOLATED RAM" ? "border-emerald-500/30 text-emerald-400" : "border-slate-800 text-slate-500"}`}>
                <Lock className={`h-4 w-4 ${ramStatus === "100% ISOLATED RAM" ? "animate-none" : "animate-pulse"}`} />
              </div>
            </div>

            {/* Diagnostic system output */}
            <div className="text-[8px] text-slate-500 border-t border-slate-900 pt-3 flex items-center justify-between uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-cyan-500 animate-pulse" />
                <span>Cabin Focal Scan Matrix</span>
              </div>
              <span className="text-blue-400 font-bold">READY TO MAP</span>
            </div>

          </div>
        </div>

        {/* Lower Terminal: Diagnostic Steps Progress List */}
        <div className="rounded-xl border border-slate-800 bg-[#070C15]/80 p-5 space-y-3.5 font-mono text-[10px]">
          <div className="flex items-center gap-1.5 border-b border-slate-900 pb-2 text-[8px] font-extrabold uppercase text-slate-400 tracking-widest">
            <Terminal className="h-3.5 w-3.5 text-slate-500" />
            <span>Telemetry Pipeline Diagnostics</span>
          </div>

          <div className="space-y-2.5">
            {messages.map((msg, idx) => {
              const isDone = idx < stepIdx;
              const isCurrent = idx === stepIdx;
              const isPending = idx > stepIdx;

              return (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between transition-opacity duration-200 ${
                    isPending ? "opacity-35" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isDone ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="h-3.5 w-3.5 text-cyan-400 animate-spin shrink-0" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-slate-800 shrink-0" />
                    )}
                    <span className={`${isCurrent ? "text-white font-bold" : "text-slate-400"}`}>
                      {msg}
                    </span>
                  </div>
                  
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${
                    isDone 
                      ? "text-emerald-400" 
                      : isCurrent 
                        ? "text-cyan-400 animate-pulse" 
                        : "text-slate-600"
                  }`}>
                    {isDone ? "COMPILED" : isCurrent ? "PARSING" : "PENDING"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer footer */}
        <p className="mt-5 text-center text-[8px] text-slate-500 font-mono uppercase tracking-widest">
          ASTRATEQ CORE ENGINE PRIVACY BOUNDARY • 100% LOCAL TEMPORARY BUFFER
        </p>

      </div>
    </div>
  );
}
