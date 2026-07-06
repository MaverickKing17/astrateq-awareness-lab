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
      <footer className="mt-auto bg-slate-50 border-t border-slate-200">
        {/* Pre-footer Call to Action Panel */}
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
            {/* Background decorative glowing circles */}
            <div className="absolute -right-20 -top-20 -z-10 h-60 w-60 rounded-full bg-slate-50 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 -z-10 h-60 w-60 rounded-full bg-slate-50/50 blur-3xl" />
            
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Safety Badge & Context */}
              <div className="space-y-4 lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-800 font-mono">
                  <span className="text-sm">🇨🇦</span> Sovereign Driver Coach
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 font-sans sm:text-xl">
                    Canadian Driving Dynamics
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans font-medium">
                    Designed explicitly for Canadian environmental hazards, long-range trans-provincial commutes, winter low-visibility states, and high-fatigue highway stretches.
                  </p>
                </div>
              </div>

              {/* Middle Column: Launch Coordinator Info */}
              <div className="lg:col-span-4 lg:border-l lg:border-slate-100 lg:pl-8">
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                  PRE-LAUNCH VERIFICATION
                </span>
                <h4 className="mt-1.5 text-sm font-bold uppercase tracking-wide text-slate-800">
                  Direct Inquiries & Priority Support
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed font-sans">
                  The Astrateq priority support team is available to assist with inquiries regarding the $5 refundable queue reservation, priority software keys, and rollout timelines.
                </p>
              </div>

              {/* Right Column: Dynamic Action Button */}
              <div className="flex items-center lg:col-span-3 lg:justify-end">
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-slate-950 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-slate-800 active:scale-98 cursor-pointer font-sans"
                >
                  <span>Contact Advisor</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-mono text-slate-300">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Footer Disclaimer & Copyright */}
          <div className="mt-12 border-t border-slate-200 pt-10 text-center">
            <p className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
              © {new Date().getFullYear()} ASTRATEQ. All rights reserved.
            </p>
            <div className="mt-5 rounded-xl bg-slate-100/50 border border-slate-200 p-6 max-w-4xl mx-auto">
              <p className="text-[11px] sm:text-xs uppercase tracking-wider leading-relaxed text-slate-600 font-mono font-bold">
                This platform is an independent <span className="text-slate-900 font-black underline decoration-slate-400 decoration-2 underline-offset-2">pre-launch market validation portal</span> evaluating demand for the upcoming Astrateq Driver Coach software suite. All $5 priority reservation slots are fully refundable at any time on request. We do <span className="text-red-700 font-black">NOT</span> sell auto insurance, track or store persistent GPS routes on remote servers, or utilize physical electronic accessories.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Support Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                <Mail className="h-4 w-4 text-slate-900" />
                <span>Contact Advisor</span>
              </div>
              <button
                onClick={() => setIsSupportOpen(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                     <Check className="h-5 w-5" />
                   </div>
                   <h3 className="mt-4 text-sm font-bold text-slate-900 uppercase tracking-wider">Inquiry Received</h3>
                   <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs">
                     Your transmission was saved. An advisor will respond at your registered email address.
                   </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="driver@example.ca"
                      className="w-full rounded border border-slate-200 p-2.5 text-xs focus:border-slate-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      Inquiry or Feedback
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={supportMsg}
                      onChange={(e) => setSupportMsg(e.target.value)}
                      placeholder="Submit your inquiry about priority waitlist slots, refund requests, or rollout details..."
                      className="w-full rounded border border-slate-200 p-2.5 text-xs focus:border-slate-400 focus:outline-none"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                    By submitting, you agree to allow our team to contact you about your pre-launch reservation and priority waitlist status.
                  </p>

                  <button
                    type="submit"
                    className="w-full rounded bg-slate-950 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-800 shadow-sm cursor-pointer font-mono"
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
