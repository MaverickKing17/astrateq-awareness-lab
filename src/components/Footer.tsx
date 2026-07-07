import React, { useState } from "react";
import { Mail, Shield, Check, X } from "lucide-react";

export default function Footer() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportEmail, setSupportEmail] = useState("");
  const [supportMsg, setSupportMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportEmail && supportMsg) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSupportEmail("");
        setSupportMsg("");
        setIsSupportOpen(false);
      }, 2500);
    }
  };

  return (
    <>
      <footer className="mt-auto bg-slate-950 border-t border-slate-900 text-slate-400">
        {/* Pre-footer Call to Action Panel */}
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-8 sm:p-10 shadow-2xl">
            {/* Background decorative subtle gradients */}
            <div className="absolute -right-20 -top-20 -z-10 h-60 w-60 rounded-full bg-slate-950/60 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 -z-10 h-60 w-60 rounded-full bg-slate-950/40 blur-3xl" />
            
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Safety Badge & Context */}
              <div className="space-y-4 lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950 px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-300 font-mono">
                  <span className="text-sm">🇨🇦</span> Sovereign Driver Coach
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-white font-sans sm:text-xl">
                    Canadian Driving Dynamics
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans font-medium">
                    Designed explicitly for Canadian environmental hazards, long-range trans-provincial commutes, winter low-visibility states, and high-fatigue highway stretches.
                  </p>
                </div>
              </div>

              {/* Middle Column: Launch Coordinator Info */}
              <div className="lg:col-span-4 lg:border-l lg:border-slate-800 lg:pl-8">
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-slate-500 font-mono">
                  PRE-LAUNCH VERIFICATION
                </span>
                <h4 className="mt-1.5 text-sm font-bold uppercase tracking-wide text-slate-300 font-sans">
                  Direct Inquiries & Priority Support
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed font-sans">
                  The Astrateq Gadgets priority support team is available to assist with inquiries regarding the $5 refundable queue reservation, priority software keys, and rollout timelines.
                </p>
              </div>

              {/* Right Column: Dynamic Action Button */}
              <div className="flex items-center lg:col-span-3 lg:justify-end">
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-blue-500 active:scale-98 cursor-pointer font-mono shadow-md"
                >
                  <span>Contact Advisor</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-mono">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Structured Multi-Column Navigation Links */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-900 text-left">
            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-white font-mono">Sovereign Products</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#value-props" className="hover:text-white transition-colors">On-Device AI Coach</a></li>
                <li><a href="#timeline-roadmap" className="hover:text-white transition-colors">Sovereign OS Sandbox</a></li>
                <li><a href="#prefinery-checkout" className="hover:text-white transition-colors">Priority Alpha Cohorts</a></li>
                <li><a href="#faq-section" className="hover:text-white transition-colors">Verification Queue</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-white font-mono">Core Architecture</h5>
              <ul className="space-y-2 text-xs text-slate-550">
                <li><span className="text-slate-500 cursor-not-allowed">Visual Processing Edge</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">Telemetry Shielding</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">Localized Analytics</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">100% Volatile RAM Execution</span></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-white font-mono">Consumer Rights</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><span className="text-slate-400">Absolute Data Sovereignty</span></li>
                <li><span className="text-slate-400">Zero Cloud Analytics</span></li>
                <li><span className="text-slate-400">Telemetry Bypass Protocol</span></li>
                <li><span className="text-slate-400">Refundable Intent Filter</span></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-white font-mono">Canadian Compliance</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><span className="text-slate-400">Ontario Highway Act Alignment</span></li>
                <li><span className="text-slate-400">No OBD Integration Limits</span></li>
                <li><span className="text-slate-400">Consumer Privacy Standard</span></li>
                <li><span className="text-slate-400">Trans-Canada Commute Safe</span></li>
              </ul>
            </div>
          </div>
          
          {/* Main Footer Disclaimer & Copyright */}
          <div className="mt-12 text-center space-y-6">
            <p className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-wider">
              © {new Date().getFullYear()} ASTRATEQ GADGETS. All rights reserved.
            </p>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 max-w-4xl mx-auto shadow-2xl">
              <p className="text-[11px] uppercase tracking-wider leading-relaxed text-slate-400 font-mono font-bold">
                This platform is an independent <span className="text-white font-black underline decoration-slate-750 decoration-2 underline-offset-2">pre-launch market validation portal</span> evaluating demand for the upcoming Astrateq Gadgets Driver Coach software suite. All $5 priority reservation slots are fully refundable at any time on request. We do <span className="text-red-400 font-black">NOT</span> sell auto insurance, track or store persistent GPS routes on remote servers, or utilize physical electronic accessories.
              </p>
            </div>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-black pt-2">
              Astrateq Gadgets Consumer Safety Initiative. Managed, engineered, and deployed in Ontario, Canada.
            </p>
          </div>
        </div>
      </footer>

      {/* Support Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-slate-900 shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white font-mono">
                <Mail className="h-4 w-4 text-[#0E7C9E]" />
                <span>Contact Advisor</span>
              </div>
              <button
                onClick={() => setIsSupportOpen(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-850 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 bg-slate-900">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-500 text-emerald-400">
                     <Check className="h-5 w-5" />
                   </div>
                   <h3 className="mt-4 text-sm font-bold text-white uppercase tracking-wider font-sans">Inquiry Received</h3>
                   <p className="mt-2 text-xs text-slate-400 leading-relaxed max-w-xs">
                     Your transmission was saved. An advisor will respond at your registered email address.
                   </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="driver@example.ca"
                      className="w-full rounded border border-slate-800 bg-slate-950 p-2.5 text-xs text-white focus:border-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-750/20 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-mono">
                      Inquiry or Feedback
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={supportMsg}
                      onChange={(e) => setSupportMsg(e.target.value)}
                      placeholder="Submit your inquiry about priority waitlist slots, refund requests, or rollout details..."
                      className="w-full rounded border border-slate-800 bg-slate-950 p-2.5 text-xs text-white focus:border-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-750/20 font-sans"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                    By submitting, you agree to allow our team to contact you about your pre-launch reservation and priority waitlist status.
                  </p>

                  <button
                    type="submit"
                    className="w-full rounded bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-500 shadow-md cursor-pointer font-mono"
                  >
                    Transmit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
