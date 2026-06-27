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
      <footer className="mt-auto border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm text-slate-500">
            {/* Left section: Canadian drivers */}
            <div className="flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label="Canada Flag">
                🇨🇦
              </span>
              <div>
                <p className="font-semibold text-slate-800 leading-tight">
                  Designed for Canadian Drivers
                </p>
                <p className="text-xs text-slate-500">
                  Built with local data, driving habits, and regional safety factors in mind.
                </p>
              </div>
            </div>

            {/* Center section: Questions */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
              <span className="font-medium text-slate-700">Questions?</span>
              <span>We're here to help. Contact our pre-launch study team.</span>
            </div>

            {/* Right section: Contact Support Link */}
            <div>
              <button
                onClick={() => setIsSupportOpen(true)}
                className="inline-flex items-center gap-1 font-semibold text-blue-600 transition-colors hover:text-blue-700 cursor-pointer"
              >
                Contact Support <span className="text-lg">→</span>
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Astrateq Gadgets. All rights reserved.</p>
            <p className="mt-1">
              This platform is a <strong>Simulation Model & Market Validation Study</strong>. It is not an OBD device,
              telematics tracking software, or auto insurance product.
            </p>
          </div>
        </div>
      </footer>

      {/* Support Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>Contact Research Support</span>
              </div>
              <button
                onClick={() => setIsSupportOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">Message Sent Successfully</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Thank you! Our research support coordinators will respond to your inquiry within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="driver@example.ca"
                      className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Inquiry or Feedback
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={supportMsg}
                      onChange={(e) => setSupportMsg(e.target.value)}
                      placeholder="Ask a question about the Driver Awareness Study or submit feedback..."
                      className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <p className="text-[11px] text-slate-400">
                    By submitting, you agree to have our coordinators contact you regarding this pre-launch behavioral study.
                  </p>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Send Message
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
