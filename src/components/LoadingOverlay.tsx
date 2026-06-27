import React, { useEffect, useState } from "react";
import { Cpu, CheckCircle2, Shield, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingOverlay() {
  const [msgIdx, setMsgIdx] = useState(0);

  const messages = [
    "Compiling driver behavioral parameters...",
    "Running driver attention cognitive neural networks...",
    "Evaluating regional Canadian commute fatigue thresholds...",
    "Simulating driver focus limits against standard highway speeds...",
    "Synthesizing personal Behavioral Safety Insights...",
    "Finalizing Driver Awareness Score and report cards...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx(prev => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white p-8 text-center shadow-xl border border-slate-200">
        
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center animate-spin duration-[6000ms]">
              <Cpu className="h-8 w-8 text-slate-800 rotate-90" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-slate-400 animate-spin" />
            </div>
          </div>
        </div>

        {/* Header */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
          Analyzing Driver Profile
        </h3>
        <p className="mt-2 text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          Our software simulated intelligence model is evaluating your safety inputs.
        </p>

        {/* Step List Container */}
        <div className="mt-8 text-left space-y-4 rounded border border-slate-200 bg-slate-50 p-6">
          {messages.map((msg, idx) => {
            const isDone = idx < msgIdx;
            const isCurrent = idx === msgIdx;
            const isPending = idx > msgIdx;

            return (
              <div 
                key={idx} 
                className={`flex items-center gap-3 transition-opacity duration-300 ${
                  isPending ? "opacity-30" : "opacity-100"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-slate-900 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 text-slate-500 animate-spin shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={`text-[11px] font-mono uppercase tracking-wide ${isCurrent ? "text-slate-900 font-bold" : "text-slate-500"}`}>
                  {msg}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono uppercase text-slate-400">
          <Shield className="h-3.5 w-3.5" />
          <span>Secured Server • Verified in Canada</span>
        </div>
      </div>
    </div>
  );
}
