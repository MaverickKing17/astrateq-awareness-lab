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
    <section id="data-architecture" className="py-24 bg-zinc-50 border-b border-zinc-200/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#000000_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.015] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono">
            SECURITY BLUEPRINT
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl font-sans">
            Data Isolation Architecture
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed font-sans font-medium">
            Our strict sandboxing architecture draws a permanent hardware firewall between your cabin privacy and third-party monitors.
          </p>
        </div>

        {/* Dual Table Grid */}
        <div className="grid gap-10 lg:grid-cols-2">
          
          {/* Column A: Processed On-Device */}
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-zinc-100 mb-8">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider text-zinc-900 font-sans">
                    Processed 100% On-Device
                  </h3>
                  <p className="text-[10px] font-bold text-emerald-600 font-mono uppercase tracking-wide">
                    Never Leaves Volatile RAM • Zero Server Transfer
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {collectedItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="h-8 w-8 rounded bg-zinc-50 border border-zinc-200/60 flex items-center justify-center text-zinc-650 shrink-0 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase text-zinc-900 tracking-wider font-mono">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-500 font-sans font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-100">
              <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest text-center leading-normal">
                * All active indicators vanish instantly upon app termination
              </p>
            </div>
          </div>

          {/* Column B: Never Collected */}
          <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 sm:p-10 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 pb-6 border-b border-zinc-100 mb-8">
                <div className="h-9 w-9 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-wider text-zinc-900 font-sans">
                    Never Collected or Shared
                  </h3>
                  <p className="text-[10px] font-bold text-rose-600 font-mono uppercase tracking-wide">
                    Strict Hardware Firewall • Completely Prohibited
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {prohibitedItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="h-8 w-8 rounded bg-zinc-50 border border-zinc-200/60 flex items-center justify-center text-zinc-650 shrink-0 mt-0.5">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase text-zinc-900 tracking-wider font-mono">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-500 font-sans font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-zinc-100">
              <p className="text-[10px] font-mono text-rose-600/70 font-bold uppercase tracking-widest text-center leading-normal">
                🛡️ Locked & Safe • Insurance Industry Firewall Enabled
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
