import React from "react";
import { ShieldCheck, Eye, Lock, Zap, ShieldAlert, MapPin, Database, CloudOff } from "lucide-react";

export default function DataArchitectureTable() {
  const collectedItems = [
    {
      title: "Blink Rates & Duration",
      desc: "Visual tracking of eye state and blink speed to detect early circadian fatigue patterns.",
      icon: Eye
    },
    {
      title: "Ocular Saccades & Sweep Gaze",
      desc: "Local scan-angle vectors map horizontal glance sweeps to measure attention stability.",
      icon: Zap
    },
    {
      title: "Temporal Response Drift",
      desc: "Measures millisecond deviations in speed-adjustments to predict micro-sleep risks.",
      icon: ShieldCheck
    },
    {
      title: "Local Telemetry Parameters",
      desc: "Localized speed and braking curves used to calculate your current reactive index.",
      icon: Database
    }
  ];

  const prohibitedItems = [
    {
      title: "GPS & Location Routing",
      desc: "Astrateq Gadgets is completely blind to where you drive. No locations, coordinates, or routes are ever tracked.",
      icon: MapPin
    },
    {
      title: "Central Camera Streams",
      desc: "Visual feeds never leave your phone. Calculations run inside isolated, volatile memory blocks and vanish instantly.",
      icon: CloudOff
    },
    {
      title: "Identity & Personal Profiles",
      desc: "Diagnostics use randomized, anonymous hashes. No driver's license or personal name is linked to metrics.",
      icon: ShieldAlert
    },
    {
      title: "Insurance Cloud Feeds",
      desc: "An absolute hardware and network firewall blocks insurance databases, underwriters, and external analytics networks.",
      icon: Lock
    }
  ];

  return (
    <section id="data-architecture" className="py-24 bg-slate-900 border-b border-slate-850 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.015] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-850 border border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-300 font-mono">
            SECURITY BLUEPRINT
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl font-sans">
            Data Isolation Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed font-sans font-medium">
            Our strict sandboxing architecture draws a permanent hardware firewall between your cabin privacy and third-party monitors.
          </p>
        </div>

        {/* Dual Table Grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          
          {/* Column A: Processed On-Device */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/10 rounded-3xl border-2 border-emerald-900/40 p-8 sm:p-10 shadow-lg hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 overflow-hidden group">
            {/* Ambient top glowing bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
            
            <div>
              <div className="flex items-center gap-3.5 pb-6 border-b border-slate-850 mb-8">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white border border-emerald-450 shadow-md flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider text-white font-sans">
                    Processed 100% On-Device
                  </h3>
                  <p className="text-[10px] font-bold text-emerald-400 font-mono uppercase tracking-wide">
                    Never Leaves Volatile RAM • Zero Server Transfer
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {collectedItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className="h-9 w-9 rounded-lg bg-emerald-950/50 border border-emerald-900/30 flex items-center justify-center text-emerald-450 shrink-0 mt-0.5 group-hover/item:bg-emerald-500 group-hover/item:text-white group-hover/item:border-emerald-400 transition-all">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase text-emerald-300 tracking-wider font-mono">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-sans font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-850">
              <p className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest text-center leading-normal font-bold">
                * All active indicators vanish instantly upon app termination
              </p>
            </div>
          </div>

          {/* Column B: Never Collected */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-rose-950/10 rounded-3xl border-2 border-rose-900/40 p-8 sm:p-10 shadow-lg hover:border-rose-500/50 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 overflow-hidden group">
            {/* Ambient top glowing bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-orange-400" />
            
            <div>
              <div className="flex items-center gap-3.5 pb-6 border-b border-slate-850 mb-8">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white border border-rose-450 shadow-md flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider text-white font-sans">
                    Never Collected or Shared
                  </h3>
                  <p className="text-[10px] font-bold text-rose-400 font-mono uppercase tracking-wide">
                    Strict Hardware Firewall • Completely Prohibited
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {prohibitedItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4 group/item">
                      <div className="h-9 w-9 rounded-lg bg-rose-950/50 border border-rose-900/30 flex items-center justify-center text-rose-450 shrink-0 mt-0.5 group-hover/item:bg-rose-500 group-hover/item:text-white group-hover/item:border-rose-400 transition-all">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase text-rose-300 tracking-wider font-mono">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 font-sans font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-850">
              <p className="text-[10px] font-mono text-rose-500/80 font-bold uppercase tracking-widest text-center leading-normal">
                🛡️ Locked & Safe • Insurance Industry Firewall Enabled
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
