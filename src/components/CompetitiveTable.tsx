import React from "react";
import { Check, X, Shield, RefreshCw, Smartphone } from "lucide-react";

export default function CompetitiveTable() {
  const comparisonRows = [
    {
      feature: "Data Processing Location",
      astrateq: "100% On-Device RAM (Completely Offline)",
      telemetry: "Central Cloud Servers (Continuous Uploads)",
      legacy: "Onboard ECU or Connected Automaker Cloud"
    },
    {
      feature: "Data Sharing & Privacy",
      astrateq: "Strict Local Firewall (No Insurance Access)",
      telemetry: "Monetized to Insurance / Fleet Owners",
      legacy: "Governed by Complex Manufacturer Privacy Policy"
    },
    {
      feature: "Focus Prevention Mode",
      astrateq: "Proactive Cognitive Fatigue Curve Coaching",
      telemetry: "Reactive Incident Recording & Compliance Logs",
      legacy: "Late Reactive Warnings (After Departure)"
    },
    {
      feature: "Installation & Hardware",
      astrateq: "Zero Hardware (Standard Smartphone Mount)",
      telemetry: "Intrusive Hardwired OBD Ports or Dash Cameras",
      legacy: "Expensive Factory Option Packages ($2,500+)"
    },
    {
      feature: "Cost Structure",
      astrateq: "Free Companion / Affordable Software Sub",
      telemetry: "High Contract Fees + Device Pricing",
      legacy: "Bundled into Luxury Vehicle Surcharges"
    }
  ];

  return (
    <section id="competitive-positioning" className="py-24 bg-white border-b border-zinc-200/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#000000_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.012] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] font-black uppercase tracking-widest text-zinc-800 font-mono">
            COMPETITIVE MATRIX
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl font-sans">
            Competitive Positioning
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed font-sans font-medium">
            Compare Astrateq Gadgets' modern, on-device intelligence model against invasive corporate diagnostics and traditional vehicle safety indicators.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-zinc-400 font-mono w-1/4">Feature / Protocol</th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50/30 border-x border-zinc-200/60 font-mono w-1/4">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-4.5 w-4.5 text-blue-600" />
                    ASTRATEQ GADGETS AWARE-1
                  </div>
                </th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-zinc-500 font-mono w-1/4">Commercial Telemetry</th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-zinc-500 font-mono w-1/4">Built-in Auto Systems</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/80 font-sans text-xs sm:text-[13px] text-zinc-750 font-medium">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/40 transition-colors duration-150">
                  <td className="p-6 sm:p-8 text-zinc-950 font-bold uppercase tracking-wider font-mono text-[11px] border-b border-zinc-200/50">
                    {row.feature}
                  </td>
                  <td className="p-6 sm:p-8 text-blue-950 font-bold bg-blue-50/10 border-x border-zinc-200/60">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5 font-bold">✓</span>
                      <span>{row.astrateq}</span>
                    </div>
                  </td>
                  <td className="p-6 sm:p-8 text-zinc-600">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">✗</span>
                      <span>{row.telemetry}</span>
                    </div>
                  </td>
                  <td className="p-6 sm:p-8 text-zinc-600">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5">✗</span>
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="mt-6 text-[10px] text-zinc-400 font-mono text-center uppercase tracking-wider">
          * ALL ASTRATEQ GADGETS FEATURES DETECTED LOCALLY ON PHYSICAL DEV HARDWARE WITHOUT OBD SPLITTERS
        </p>

      </div>
    </section>
  );
}
