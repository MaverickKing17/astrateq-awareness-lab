import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Cpu, Lock, Smartphone, RefreshCw } from "lucide-react";

interface HeroProps {
  onStartSimulation: () => void;
}

export default function Hero({ onStartSimulation }: HeroProps) {
  // Mock live metrics state for the dashboard preview
  const [liveScore, setLiveScore] = useState(82);
  const [liveStatus, setLiveStatus] = useState("Optimal");
  const [pulseScale, setPulseScale] = useState(1);
  const [activeLogIdx, setActiveLogIdx] = useState(0);

  const telemetryLogs = [
    "Initializing local focal scanning...",
    "Calibrating micro-saccade offset...",
    "Purging volatile memory stack...",
    "Telemetry protection locked.",
    "Status: 100% On-Device RAM Isolation"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Subtle variations to show active device telemetry without distracting
      setLiveScore(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 81 && next <= 83 ? next : prev;
      });
      setPulseScale(prev => (prev === 1 ? 1.03 : 1));
    }, 3000);

    const logInterval = setInterval(() => {
      setActiveLogIdx(prev => (prev + 1) % telemetryLogs.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-16 pb-24 md:pt-24 md:pb-32 border-b border-slate-900">
      {/* Subtle deep-tinted background elements */}
      <div className="absolute inset-0 bg-slate-950 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Content - Left Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-8"
          >
            {/* Header / Sub-tag */}
            <span className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-950/40 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-400 font-sans rounded-full shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Sovereign Driver Intelligence
            </span>

            {/* Headline Block (H1) */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-bold tracking-tight text-white leading-[1.08] font-sans">
                Sustained attention guides every Canadian road.
                <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl text-blue-400 font-normal tracking-tight">
                  Privacy-first Driver Awareness Intelligence for Canadian roads.
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-sans font-normal">
              Astrateq Gadgets operates as a completely local edge-compute driver coach that processes safety metrics inside your device's volatile RAM. By analyzing attention patterns 100% on-device, your driving insights remain private and never touch the cloud or insurance networks.
            </p>

            {/* Single Funnel Primary CTA */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  onStartSimulation();
                }}
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white px-8 py-4.5 text-xs font-black uppercase tracking-widest transition-all duration-200 active:scale-98 cursor-pointer font-mono shadow-lg shadow-blue-500/25"
              >
                <span>Start Driver Awareness Simulation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Inline Trust Row */}
            <div className="border-t border-slate-900 pt-6 grid grid-cols-3 gap-4 max-w-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-300 font-sans">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-blue-400 shrink-0 border border-slate-800">
                  <Cpu className="h-3 w-3 stroke-[2.5]" />
                </div>
                <span>Zero External Hardware</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-blue-400 shrink-0 border border-slate-800">
                  <Lock className="h-3 w-3 stroke-[2.5]" />
                </div>
                <span>100% On-Device Processing</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-blue-400 shrink-0 border border-slate-800">
                  <ShieldCheck className="h-3 w-3 stroke-[2.5]" />
                </div>
                <span>No Insurance Data Sharing</span>
              </div>
            </div>

            {/* Scarcity / Cohort Line */}
            <div className="pt-2 text-[11px] text-slate-500 font-sans flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Founding Research Cohort — limited placement</span>
            </div>
          </motion.div>

          {/* Right Column: Premium Smartphone Dashboard Simulator */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            {/* Quick Calibration Indicator */}
            <div className="w-full max-w-sm mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm text-left">
              <div className="flex gap-4">
                <Smartphone className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-sans">
                    Calibration complete in seconds:
                  </h4>
                  <p className="text-xs text-slate-400 font-sans mt-1.5 leading-relaxed">
                    Simply secure your phone in your vehicle mount. Astrateq Gadgets maps facial indicators locally and runs fully offline inside RAM. No custom plugins or wires required.
                  </p>
                </div>
              </div>
            </div>

            {/* High-End Smartphone Chassis */}
            <div className="relative w-full max-w-[330px] rounded-[48px] border-[12px] border-slate-900 bg-[#0C1524] p-4.5 shadow-2xl overflow-hidden text-white transition-all duration-300 hover:shadow-blue-500/10 hover:border-blue-500/30 group">
              {/* Subtle inner ambient grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Dynamic Camera Notch / RAM Scanning Banner */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl flex items-center justify-center gap-2 px-3.5 z-30">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                <div className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </div>
                <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest font-mono">ON-DEVICE</span>
              </div>

              {/* Inner screen contents */}
              <div className="relative z-10 space-y-4 pt-3">
                
                {/* Simulated status bar */}
                <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 px-1 border-b border-white/5 pb-2">
                  <span>10:45 AM</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[7.5px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded uppercase font-bold border border-blue-500/20">LOCAL</span>
                    <span className="text-[9px]">100%</span>
                  </div>
                </div>

                {/* Simulated Core Engine Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold font-mono text-slate-300 uppercase tracking-wider">
                    <Cpu className="h-3.5 w-3.5 text-blue-400" />
                    <span>ASTRATEQ GADGETS ENGINE v1.2</span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[7px] font-bold font-mono text-zinc-400 uppercase tracking-wider">
                    SIMULATOR
                  </span>
                </div>

                {/* Telemetry Widgets Grid */}
                <div className="space-y-3">
                  
                  {/* Gauge Widget */}
                  <div className="bg-zinc-950/80 border border-white/5 rounded-2xl p-4.5 flex flex-col items-center space-y-3 text-center relative overflow-hidden">
                    <span className="text-[8px] font-bold tracking-widest text-slate-400 font-mono uppercase">
                      Driver Awareness Score
                    </span>
                    
                    {/* Ring gauge */}
                    <div 
                      style={{ transform: `scale(${pulseScale})` }}
                      className="relative flex items-center justify-center h-24 w-24 rounded-full bg-blue-950/40 border-4 border-blue-500/30 shadow-md transition-transform duration-700"
                    >
                      <div className="absolute inset-1 rounded-full border border-dashed border-blue-500/10 animate-[spin_60s_linear_infinite]" />
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-3xl font-black font-mono text-white leading-none">{liveScore}</span>
                        <span className="text-[7.5px] font-bold text-emerald-400 tracking-wider uppercase font-mono mt-1.5 animate-pulse">
                          {liveStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Widget */}
                  <div className="bg-zinc-950/80 border border-white/5 rounded-xl p-3.5 space-y-2.5 text-left">
                    <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-300">
                      <span>ATTENTION STABILITY</span>
                      <span className="text-blue-400">94% STABLE</span>
                    </div>
                    
                    <div className="grid grid-cols-10 gap-1 h-1.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                        <div 
                          key={bar} 
                          className={`h-full rounded-xs ${
                            bar <= 9 
                              ? "bg-blue-500" 
                              : "bg-white/10"
                          }`} 
                        />
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-[7px] font-mono text-slate-400">
                      <span>COGNITIVE LOAD: LOW</span>
                      <span>SAMPLING: 60FPS</span>
                    </div>
                  </div>

                  {/* Dual sub-parameters */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-zinc-950/80 border border-white/5 rounded-xl p-3 text-left font-mono">
                      <span className="text-[7px] text-slate-400 font-bold uppercase tracking-wider block">Fatigue Index</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-500">MINIMAL</span>
                      </div>
                    </div>
                    <div className="bg-zinc-950/80 border border-white/5 rounded-xl p-3 text-left font-mono">
                      <span className="text-[7px] text-slate-400 font-bold uppercase tracking-wider block">Status Code</span>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] font-bold text-emerald-400">OPTIMAL</span>
                      </div>
                    </div>
                  </div>

                  {/* Volatile Stream Log */}
                  <div className="bg-zinc-950/80 border border-white/5 rounded-xl p-3 text-left font-mono space-y-1">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">SECURE RAM STREAM</span>
                      <span className="text-[7px] text-blue-400 font-bold">LIVE</span>
                    </div>
                    <p className="text-[9px] text-slate-300 h-6 flex items-center leading-relaxed truncate">
                      {telemetryLogs[activeLogIdx]}
                    </p>
                  </div>

                  {/* Isolation Badge */}
                  <div className="bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/10 text-center font-mono flex items-center justify-center gap-1.5">
                    <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="text-[8px] font-bold text-emerald-400 tracking-wider uppercase leading-none">
                      VOLATILE RAM MODE LOCKED
                    </span>
                  </div>

                </div>

                {/* Device Home Indicator Bar */}
                <div className="w-20 h-1 bg-white/10 mx-auto rounded-full mt-2" />
              </div>
            </div>

            {/* Sub-note */}
            <p className="text-[9px] font-mono text-slate-400 text-center uppercase tracking-widest mt-4 font-bold bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full">
              📱 Local Telemetry Mockup (Status: Optimal)
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
