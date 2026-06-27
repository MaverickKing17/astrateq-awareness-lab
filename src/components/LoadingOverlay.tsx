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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 text-center shadow-2xl border border-slate-100">
        
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-blue-50 border-2 border-dashed border-blue-500 flex items-center justify-center animate-spin duration-[6000ms]">
              <Cpu className="h-10 w-10 text-blue-600 rotate-90" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-14 w-14 text-cyan-500 animate-spin" />
            </div>
          </div>
        </div>

        {/* Header */}
        <h3 className="text-xl font-bold text-slate-900">
          Analyzing Driver Profile
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Our software-only simulated intelligence model is evaluating your behavioral responses.
        </p>

        {/* Step List Container */}
        <div className="mt-8 text-left space-y-4 rounded-2xl bg-slate-50 p-6 border border-slate-100">
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
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 text-blue-600 animate-spin shrink-0" />
                ) : (
                  <div className="h-5 w-5 rounded-full border border-slate-300 shrink-0" />
                )}
                <span className={`text-xs font-medium ${isCurrent ? "text-blue-700 font-bold" : "text-slate-600"}`}>
                  {msg}
                </span>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <Shield className="h-3.5 w-3.5" />
          <span>Anonymous assessment. Encrypted & processed in Canada.</span>
        </div>
      </div>
    </div>
  );
}
