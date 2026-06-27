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
      <footer className="mt-auto border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-xs text-slate-500">
            {/* Left section: Canadian drivers */}
            <div className="flex items-center gap-3">
              <span className="text-xl px-2.5 py-1 bg-slate-100 rounded border border-slate-200" role="img" aria-label="Canada Flag">
                🇨🇦
              </span>
              <div>
                <p className="font-bold text-slate-800 tracking-tight text-sm uppercase">
                  Canadian Safety Standards
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pre-launch validation platform utilizing localized regional road risk assessments.
                </p>
              </div>
            </div>

            {/* Center section: Questions */}
            <div className="flex flex-col gap-0.5 text-left md:text-right">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">Research Inquiries</span>
              <span className="text-[11px] text-slate-400">Our evaluation team answers questions regarding simulation criteria.</span>
            </div>

            {/* Right section: Contact Support Link */}
            <div>
              <button
                onClick={() => setIsSupportOpen(true)}
                className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition-colors cursor-pointer"
              >
                <span>Contact Study Coordinator</span>
                <span className="text-blue-200 font-mono">→</span>
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-[10px] text-slate-400 font-mono">
            <p>© {new Date().getFullYear()} ASTRATEQ GADGETS. All rights reserved.</p>
            <p className="mt-2 text-[9px] uppercase tracking-wider leading-relaxed text-slate-400 max-w-3xl mx-auto">
              This platform is an <strong>educational questionnaire and research study</strong> to evaluate driver focus. We do NOT sell auto insurance, we do NOT track your GPS location, and we do NOT require any physical hardware plugins in your vehicle.
            </p>
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
                <span>Contact Study Coordinator</span>
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
                    Your transmission was saved. A research coordinator will respond at your registered email address.
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
                      className="w-full rounded border border-slate-200 p-2.5 text-xs focus:border-slate-400 focus:outline-none"
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
                      placeholder="Ask a question about the Driver Awareness Study or submit feedback..."
                      className="w-full rounded border border-slate-200 p-2.5 text-xs focus:border-slate-400 focus:outline-none"
                    />
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    By submitting, you agree to allow our study coordinators to review and link your simulator evaluation questions.
                  </p>

                  <button
                    type="submit"
                    className="w-full rounded bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-blue-700 shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer"
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
