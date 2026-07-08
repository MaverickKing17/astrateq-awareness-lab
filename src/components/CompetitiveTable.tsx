import React from "react";
import { Check, X, Shield } from "lucide-react";

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
    <section id="competitive-positioning" className="py-24 bg-white border-b border-[#0E7C9E]/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#12233F_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.02] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#0E7C9E]/20 text-[10px] font-black uppercase tracking-widest text-[#12233F] font-mono shadow-xs">
            COMPETITIVE MATRIX
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-[#12233F] sm:text-4xl font-sans">
            Competitive Positioning
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed font-sans font-medium">
            Compare Astrateq Gadgets' modern, on-device intelligence model against invasive corporate diagnostics and traditional vehicle safety indicators.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-3xl border border-[#0E7C9E]/15 bg-white shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F2ED] border-b border-[#0E7C9E]/15">
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-slate-500 font-mono w-1/4">Feature / Protocol</th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-[#0E7C9E] bg-[#0E7C9E]/5 border-x border-[#0E7C9E]/15 font-mono w-1/4">
                  <div className="flex items-center gap-1.5 font-sans font-black">
                    <Shield className="h-4.5 w-4.5 text-[#0E7C9E]" />
                    ASTRATEQ GADGETS AWARE-1
                  </div>
                </th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-slate-400 font-mono w-1/4">Commercial Telemetry</th>
                <th className="p-6 sm:p-8 text-xs font-black uppercase tracking-widest text-slate-400 font-mono w-1/4">Built-in Auto Systems</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-xs sm:text-[13px] text-slate-600 font-medium">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F4F2ED]/30 transition-colors duration-150">
                  <td className="p-6 sm:p-8 text-[#12233F] font-bold uppercase tracking-wider font-mono text-[11px] border-b border-slate-100">
                    {row.feature}
                  </td>
                  <td className="p-6 sm:p-8 text-[#12233F] font-bold bg-[#0E7C9E]/5 border-x border-[#0E7C9E]/15">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-600 mt-0.5 font-bold">✓</span>
                      <span>{row.astrateq}</span>
                    </div>
                  </td>
                  <td className="p-6 sm:p-8 text-slate-500">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-500 mt-0.5 font-bold">✗</span>
                      <span>{row.telemetry}</span>
                    </div>
                  </td>
                  <td className="p-6 sm:p-8 text-slate-500">
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
