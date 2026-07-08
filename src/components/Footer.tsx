import React, { useState } from "react";
import { 
  Mail, Shield, Check, X, Cpu, Info, FileText, 
  Smartphone, Lock, UserCheck, Compass, EyeOff, Coins, Layers 
} from "lucide-react";

interface DocItem {
  title: string;
  category: string;
  icon: string;
  description: string;
  impact: string;
}

const DOC_ITEMS: Record<string, DocItem> = {
  "on-device-ai-coach": {
    title: "On-Device AI Coach",
    category: "Sovereign Products",
    icon: "Smartphone",
    description: "Our real-time driving assistant operates 100% on your local smartphone. It uses advanced spatial algorithms and device sensors to detect driver fatigue and road risks. Best of all, it performs all processing locally without requiring any cellular data.",
    impact: "Provides instant feedback to help keep you safe on long journeys, without ever streaming your driving feed to external servers."
  },
  "sovereign-os-sandbox": {
    title: "Sovereign OS Sandbox",
    category: "Sovereign Products",
    icon: "Lock",
    description: "A custom-designed, secure software container on your smartphone. This container isolates the Driver Coach program from other apps, ensuring that third-party trackers or malicious software cannot spy on your driving feeds.",
    impact: "Keeps your security analysis sealed in a private space that other smartphone apps cannot peek into."
  },
  "priority-alpha-cohorts": {
    title: "Priority Alpha Cohorts",
    category: "Sovereign Products",
    icon: "UserCheck",
    description: "An exclusive group of early adopters and safety enthusiasts on Canadian roads. Members of this cohort get first-hand access to early software versions, direct lines to the engineering team, and help refine our hazard models.",
    impact: "You get early access to life-saving driving assistance before it goes public, with dedicated support from our team."
  },
  "verification-queue": {
    title: "Verification Queue",
    category: "Sovereign Products",
    icon: "Check",
    description: "Our structured rollout system that manages access and priority based on your reservation number. This system ensures every participant is validated and assigned a spot safely as regional cohorts go live.",
    impact: "Guarantees a fair, first-come, first-served allocation of early software keys as space becomes available."
  },
  "visual-processing-edge": {
    title: "Visual Processing Edge",
    category: "Core Architecture",
    icon: "Cpu",
    description: "All visual hazard modeling is handled directly by your smartphone's dedicated neural hardware. No video feeds or images are ever transmitted to a cloud server to be analyzed or stored.",
    impact: "Zero cellular data usage, zero network lag, and absolute visual privacy during your drive."
  },
  "telemetry-shielding": {
    title: "Telemetry Shielding",
    category: "Core Architecture",
    icon: "Shield",
    description: "A protective cryptographic layer that instantly scrambles and isolates internal sensor signals. Raw accelerometer, gyroscope, and GPS indicators are encrypted to prevent unauthorized hardware sniffing.",
    impact: "Guarantees that your vehicle's physical movement patterns cannot be compiled or intercepted by trackers."
  },
  "localized-analytics": {
    title: "Localized Analytics",
    category: "Core Architecture",
    icon: "Info",
    description: "Your safe-driving scores, weekly metrics, and commute summaries are generated and saved purely in local storage. We have designed the system without any remote logging of your routes or history.",
    impact: "You get beautiful, personalized insights and progress charts that remain completely invisible to the outside world."
  },
  "volatile-ram-execution": {
    title: "100% Volatile RAM Execution",
    category: "Core Architecture",
    icon: "Layers",
    description: "The application processes driving frames and camera telemetry entirely within your phone's transient memory (RAM). Absolutely no temporary photos or raw sensor logs are written to permanent storage.",
    impact: "As soon as you turn off the app, every single frame processed is permanently erased from existence, leaving no digital footprint."
  },
  "absolute-data-sovereignty": {
    title: "Absolute Data Sovereignty",
    category: "Consumer Rights",
    icon: "Lock",
    description: "The fundamental human right to own your personal movement data. We build safety technology with the strict policy that you own 100% of your records. We will never buy, sell, or trade your telemetry.",
    impact: "No insurance companies, tech giants, or government agencies will ever have access to your private driving profile."
  },
  "zero-cloud-analytics": {
    title: "Zero Cloud Analytics",
    category: "Consumer Rights",
    icon: "EyeOff",
    description: "A complete bypass of central cloud reporting. Unlike standard driving companions that continuously send telemetry to corporate servers, Astrateq operates as a fully self-contained software suite.",
    impact: "No tracking cookies, no central user profiles, and no risk of database leaks exposing your driving habits."
  },
  "telemetry-bypass-protocol": {
    title: "Telemetry Bypass Protocol",
    category: "Consumer Rights",
    icon: "Compass",
    description: "An instant-toggle privacy shield. If you want to use the Driver Coach purely as a passive, visual dashboard helper without logging any trips or habits, you can activate this protocol with one tap.",
    impact: "Allows you to enjoy all real-time safety assistance while leaving absolutely zero historical logs on your phone."
  },
  "refundable-intent-filter": {
    title: "Refundable Intent Filter",
    category: "Consumer Rights",
    icon: "Coins",
    description: "Our policy for high-trust user reservations. The $5 CAD priority reservation fee is used purely to filter spam and verify real drivers, and it is 100% refundable at any time on request.",
    impact: "Zero financial commitment or risk. If you change your mind, we return your deposit immediately with zero questions asked."
  },
  "ontario-highway-act": {
    title: "Ontario Highway Act Alignment",
    category: "Canadian Compliance",
    icon: "FileText",
    description: "We design our interfaces to fully align with Ontario's strict distracted driving laws and the Highway Traffic Act. The interface uses passive alerts and operates hands-free to ensure perfect safety.",
    impact: "You can drive with confidence knowing your safety assistant fully respects Canadian road regulations and guidelines."
  },
  "no-obd-integration": {
    title: "No OBD Integration Limits",
    category: "Canadian Compliance",
    icon: "Shield",
    description: "Astrateq does not connect to your car's On-Board Diagnostics (OBD-II) port. Standard trackers plug in there, which can void warranties and create electrical faults or remote hacking vulnerabilities.",
    impact: "Protects your vehicle's factory warranty and onboard computers from unauthorized software interference."
  },
  "consumer-privacy-standard": {
    title: "Consumer Privacy Standard",
    category: "Canadian Compliance",
    icon: "UserCheck",
    description: "We adhere strictly to PIPEDA (Personal Information Protection and Electronic Documents Act) standards, going even further by completely eliminating remote data aggregation.",
    impact: "Guarantees that your biometric focus mapping and route histories are treated with the highest level of legal confidentiality."
  },
  "trans-canada-commute": {
    title: "Trans-Canada Commute Safe",
    category: "Canadian Compliance",
    icon: "Compass",
    description: "Engineered specifically for Canadian roads. Our algorithms are optimized for remote routes, dense winter low-visibility states, and long-range highway fatigue where internet connections may fail completely.",
    impact: "Works flawlessly in the deep Canadian wilderness or underground parking structures, with zero reliance on cell towers."
  }
};

export default function Footer() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportEmail, setSupportEmail] = useState("");
  const [supportMsg, setSupportMsg] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDocKey, setSelectedDocKey] = useState<string | null>(null);

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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone": return <Smartphone className="h-6 w-6 text-[#0E7C9E]" />;
      case "Lock": return <Lock className="h-6 w-6 text-[#0E7C9E]" />;
      case "UserCheck": return <UserCheck className="h-6 w-6 text-[#0E7C9E]" />;
      case "Check": return <Check className="h-6 w-6 text-[#0E7C9E]" />;
      case "Cpu": return <Cpu className="h-6 w-6 text-[#0E7C9E]" />;
      case "Shield": return <Shield className="h-6 w-6 text-[#0E7C9E]" />;
      case "Info": return <Info className="h-6 w-6 text-[#0E7C9E]" />;
      case "Layers": return <Layers className="h-6 w-6 text-[#0E7C9E]" />;
      case "EyeOff": return <EyeOff className="h-6 w-6 text-[#0E7C9E]" />;
      case "Compass": return <Compass className="h-6 w-6 text-[#0E7C9E]" />;
      case "Coins": return <Coins className="h-6 w-6 text-[#0E7C9E]" />;
      case "FileText": return <FileText className="h-6 w-6 text-[#0E7C9E]" />;
      default: return <Info className="h-6 w-6 text-[#0E7C9E]" />;
    }
  };

  const selectedDoc = selectedDocKey ? DOC_ITEMS[selectedDocKey] : null;

  return (
    <>
      <footer className="mt-auto bg-[#F4F2ED] border-t border-[#0E7C9E]/10 text-slate-600">
        {/* Pre-footer Call to Action Panel */}
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#0E7C9E]/15 bg-white p-8 sm:p-10 shadow-xs text-left">
            
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Safety Badge & Context */}
              <div className="space-y-4 lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0E7C9E]/20 bg-[#F4F2ED] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#12233F] font-mono shadow-2xs">
                  <span className="text-sm">🇨🇦</span> Sovereign Driver Coach
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#12233F] font-sans sm:text-xl">
                    Canadian Driving Dynamics
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans font-medium">
                    Designed explicitly for Canadian environmental hazards, long-range trans-provincial commutes, winter low-visibility states, and high-fatigue highway stretches.
                  </p>
                </div>
              </div>

              {/* Middle Column: Launch Coordinator Info */}
              <div className="lg:col-span-4 lg:border-l lg:border-slate-100 lg:pl-8">
                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[#0E7C9E] font-mono">
                  PRE-LAUNCH VERIFICATION
                </span>
                <h4 className="mt-1.5 text-sm font-bold uppercase tracking-wide text-[#12233F] font-sans">
                  Direct Inquiries & Priority Support
                </h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed font-sans font-medium">
                  The Astrateq Gadgets priority support team is available to assist with inquiries regarding the $5 refundable queue reservation, priority software keys, and rollout timelines.
                </p>
              </div>

              {/* Right Column: Dynamic Action Button */}
              <div className="flex items-center lg:col-span-3 lg:justify-end">
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-[#0E7C9E] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition-all hover:bg-[#0E7C9E]/90 active:scale-98 cursor-pointer font-mono shadow-xs"
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
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200/60 text-left">
            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-[#12233F] font-mono">Sovereign Products</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("on-device-ai-coach")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/40">●</span> On-Device AI Coach
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("sovereign-os-sandbox")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/40">●</span> Sovereign OS Sandbox
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("priority-alpha-cohorts")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/40">●</span> Priority Alpha Cohorts
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("verification-queue")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/40">●</span> Verification Queue
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-[#12233F] font-mono">Core Architecture</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("visual-processing-edge")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Visual Processing Edge
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("telemetry-shielding")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Telemetry Shielding
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("localized-analytics")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Localized Analytics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("volatile-ram-execution")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> 100% Volatile RAM Execution
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-[#12233F] font-mono">Consumer Rights</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("absolute-data-sovereignty")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Absolute Data Sovereignty
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("zero-cloud-analytics")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Zero Cloud Analytics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("telemetry-bypass-protocol")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Telemetry Bypass Protocol
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("refundable-intent-filter")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Refundable Intent Filter
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-black uppercase tracking-wider text-[#12233F] font-mono">Canadian Compliance</h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("ontario-highway-act")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Ontario Highway Act Alignment
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("no-obd-integration")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> No OBD Integration Limits
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("consumer-privacy-standard")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Consumer Privacy Standard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setSelectedDocKey("trans-canada-commute")}
                    className="text-left text-slate-500 hover:text-[#0E7C9E] transition-colors cursor-pointer flex items-center gap-1.5 hover:underline font-sans font-medium"
                  >
                    <span className="text-[9px] text-[#0E7C9E]/60">●</span> Trans-Canada Commute Safe
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Main Footer Disclaimer & Copyright */}
          <div className="mt-12 text-center space-y-6">
            <p className="text-[10px] font-bold text-slate-550 font-mono uppercase tracking-wider">
              © {new Date().getFullYear()} ASTRATEQ GADGETS. All rights reserved.
            </p>
            <div className="rounded-xl bg-white border border-[#0E7C9E]/15 p-6 max-w-4xl mx-auto shadow-xs">
              <p className="text-[11px] uppercase tracking-wider leading-relaxed text-slate-500 font-mono font-bold">
                This platform is an independent <span className="text-[#12233F] font-black underline decoration-[#0E7C9E]/30 decoration-2 underline-offset-2">pre-launch market validation portal</span> evaluating demand for the upcoming Astrateq Gadgets Driver Coach software suite. All $5 priority reservation slots are fully refundable at any time on request. We do <span className="text-rose-600 font-black">NOT</span> sell auto insurance, track or store persistent GPS routes on remote servers, or utilize physical electronic accessories.
              </p>
            </div>
            <p className="text-[11px] font-mono text-slate-550 uppercase tracking-widest font-black pt-2">
              Astrateq Gadgets Consumer Safety Initiative. Managed, engineered, and deployed in Ontario, Canada.
            </p>
          </div>
        </div>
      </footer>

      {/* Detailed Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl border border-[#0E7C9E]/20 animate-in fade-in zoom-in-95 duration-150 text-left">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-[#F4F2ED] px-6 py-4.5">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-[#0E7C9E]">
                  {selectedDoc.category} Specifications
                </span>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#12233F] font-sans mt-0.5">
                  {selectedDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDocKey(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Close details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0E7C9E]/10 border border-[#0E7C9E]/20 text-[#0E7C9E]">
                  {getIcon(selectedDoc.icon)}
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-1.5">
                      What this means
                    </h4>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans font-medium">
                      {selectedDoc.description}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F4F2ED] border border-[#0E7C9E]/15 p-4 space-y-1.5">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#0E7C9E] font-mono">
                      Your Direct Benefit
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {selectedDoc.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 bg-[#F4F2ED] px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedDocKey(null)}
                className="rounded bg-[#0E7C9E] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0E7C9E]/90 transition-all cursor-pointer font-mono shadow-xs"
              >
                Close Explainer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl border border-[#0E7C9E]/20 animate-in fade-in zoom-in duration-150 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 bg-[#F4F2ED] px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#12233F] font-mono">
                <Mail className="h-4 w-4 text-[#0E7C9E]" />
                <span>Contact Advisor</span>
              </div>
              <button
                onClick={() => setIsSupportOpen(false)}
                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-950 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 bg-white">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600">
                     <Check className="h-5 w-5" />
                   </div>
                   <h3 className="mt-4 text-sm font-bold text-[#12233F] uppercase tracking-wider font-sans">Inquiry Received</h3>
                   <p className="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs">
                     Your transmission was saved. An advisor will respond at your registered email address.
                   </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      placeholder="driver@example.ca"
                      className="w-full rounded border border-slate-200 bg-[#F4F2ED]/50 p-2.5 text-xs text-[#12233F] focus:border-[#0E7C9E] focus:outline-none focus:ring-1 focus:ring-[#0E7C9E]/20 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">
                      Inquiry or Feedback
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={supportMsg}
                      onChange={(e) => setSupportMsg(e.target.value)}
                      placeholder="Submit your inquiry about priority waitlist slots, refund requests, or rollout details..."
                      className="w-full rounded border border-slate-200 bg-[#F4F2ED]/50 p-2.5 text-xs text-[#12233F] focus:border-[#0E7C9E] focus:outline-none focus:ring-1 focus:ring-[#0E7C9E]/20 font-sans"
                    />
                  </div>

                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                    By submitting, you agree to allow our team to contact you about your pre-launch reservation and priority waitlist status.
                  </p>

                  <button
                    type="submit"
                    className="w-full rounded bg-[#0E7C9E] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#0E7C9E]/90 shadow-xs cursor-pointer font-mono"
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
