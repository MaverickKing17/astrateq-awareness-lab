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
    <section id="competitive-positioning" className="py-24 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.012] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-300 font-mono">
            COMPETITIVE MATRIX
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl font-sans">
            Competitive Positioning
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed font-sans font-medium">
            Compare Astrateq Gadgets' modern, on-device intelligence model against invasive corporate diagnostics and traditional vehicle safety indicators.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-slate-400 font-mono w-1/4">Feature / Protocol</th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-950/20 border-x border-slate-800 font-mono w-1/4">
                  <div className="flex items-center gap-1.5 font-sans">
                    <Shield className="h-4.5 w-4.5 text-blue-400" />
                    ASTRATEQ GADGETS AWARE-1
                  </div>
                </th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-slate-500 font-mono w-1/4">Commercial Telemetry</th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-slate-500 font-mono w-1/4">Built-in Auto Systems</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans text-xs sm:text-[13px] text-slate-300 font-medium">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-950/45 transition-colors duration-150">
                  <td className="p-6 sm:p-8 text-white font-bold uppercase tracking-wider font-mono text-[11px] border-b border-slate-800/50">
                    {row.feature}
                  </td>
                  <td className="p-6 sm:p-8 text-blue-100 font-bold bg-blue-950/5 border-x border-slate-800">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                      <span>{row.astrateq}</span>
                    </div>
                  </td>
                  <td className="p-6 sm:p-8 text-slate-400">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5 font-bold">✗</span>
                      <span>{row.telemetry}</span>
                    </div>
                  </td>
                  <td className="p-6 sm:p-8 text-slate-400">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5 font-bold">✗</span>
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="mt-6 text-[10px] text-slate-500 font-mono text-center uppercase tracking-wider font-bold">
          * ALL ASTRATEQ GADGETS FEATURES DETECTED LOCALLY ON PHYSICAL DEV HARDWARE WITHOUT OBD SPLITTERS
        </p>

      </div>
    </section>
  );
}
