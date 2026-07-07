import React, { useState } from "react";
import { Share2, Copy, Check, Users, Award, ShieldCheck, PlusCircle } from "lucide-react";

interface ReferralDashboardProps {
  referralCode: string;
  initialCount?: number;
}

export default function ReferralDashboard({ referralCode, initialCount = 0 }: ReferralDashboardProps) {
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState<number>(() => {
    const saved = localStorage.getItem("astrateq_referral_count");
    return saved !== null ? Number(saved) : initialCount;
  });

  const referralUrl = typeof window !== "undefined" 
    ? `${window.location.origin}?ref=${referralCode}`
    : `https://reserve.astrateqgadgets.com?ref=${referralCode}`;

  // Keep localStorage updated when state changes
  const updateReferrals = (newCount: number) => {
    setReferralCount(newCount);
    localStorage.setItem("astrateq_referral_count", String(newCount));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Astrateq - Driver Awareness Initiative",
          text: "Join the Astrateq Founding Research Cohort and secure your priority driver awareness slot.",
          url: referralUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopy();
    }
  };

  const getReferralTier = (count: number) => {
    if (count >= 5) {
      return {
        label: "Founding Ambassador",
        queue: "Fast-Track Queue (Tier 1 Priority)",
        badge: "Founding Ambassador Badge Active",
        progress: 100,
        nextMilestone: "Maximum tier reached!"
      };
    }
    if (count >= 3) {
      return {
        label: "Fast-Track Queue",
        queue: "Fast-Track Queue Status Secured",
        badge: "Fast-Track Active",
        progress: 60 + ((count - 3) / 2) * 40,
        nextMilestone: `${5 - count} more to Founding Ambassador`
      };
    }
    if (count >= 1) {
      return {
        label: "Priority Queue +1 Tier",
        queue: "Priority Queue +1 Status Active",
        badge: "Priority +1 Active",
        progress: 20 + ((count - 1) / 2) * 40,
        nextMilestone: `${3 - count} more to Fast-Track Queue`
      };
    }
    return {
      label: "Standard Waitlist Tier",
      queue: "Standard Priority Queue",
      badge: null,
      progress: 5,
      nextMilestone: "1 referral to Priority Queue +1 Tier"
    };
  };

  const tierInfo = getReferralTier(referralCount);

  return (
    <div className="mt-8 rounded-2xl border-2 border-cyan-500/20 bg-slate-50 p-6 sm:p-8 text-left space-y-6 relative overflow-hidden shadow-xs">
      <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-cyan-500" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-[9px] font-black uppercase tracking-widest text-cyan-800 font-mono">
            <Users className="h-3 w-3" /> Referral Ambassador Program
          </span>
          <h4 className="text-sm font-black uppercase text-slate-900 tracking-wide font-sans">
            Move Up the Priority Queue
          </h4>
          <p className="text-[11px] text-slate-500 max-w-md font-sans">
            Invite other Canadian drivers to join the research cohort. Every referral moves you up the priority queue.
          </p>
        </div>

        {/* Mock Simulator Button - helpful for visual testing */}
        <button
          onClick={() => updateReferrals(referralCount + 1)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[9px] font-bold font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer"
          title="Simulate a successful referral signup"
        >
          <PlusCircle className="h-3 w-3" />
          <span>Simulate Referral (+1)</span>
        </button>
      </div>

      {/* Referral Link & Sharing Block */}
      <div className="space-y-2">
        <label className="block text-[10px] font-black uppercase text-slate-400 font-mono">
          Your Unique Referral Link
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-600 truncate select-all flex items-center h-10">
            {referralUrl}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white px-4 h-10 text-xs font-bold uppercase tracking-wider text-slate-700 active:scale-98 transition-all cursor-pointer font-mono"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 h-10 text-xs font-bold uppercase tracking-wider text-white active:scale-98 transition-all cursor-pointer font-mono"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Stats Card */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 grid gap-4 sm:grid-cols-12 items-center">
        <div className="sm:col-span-4 space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Current Position</span>
          <h5 className="text-base font-black text-slate-900 uppercase font-sans tracking-tight">
            {tierInfo.label}
          </h5>
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase block">
            {tierInfo.queue}
          </span>
        </div>

        <div className="sm:col-span-8 space-y-2 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="font-bold text-slate-500 uppercase">ACTIVE REFERRALS: <strong className="text-slate-900 text-xs">{referralCount}</strong></span>
            <span className="font-bold text-blue-600 uppercase tracking-wide">{tierInfo.nextMilestone}</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${tierInfo.progress}%` }}
            />
          </div>

          {/* Milestone markers */}
          <div className="flex justify-between items-center text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">
            <span>0 (Standard)</span>
            <span>1 (+1 Tier)</span>
            <span>3 (Fast-Track)</span>
            <span>5 (Ambassador)</span>
          </div>
        </div>
      </div>

      {/* Reward Structure Rules (Scannable Bullet points) */}
      <div className="border-t border-slate-200/60 pt-4 space-y-3">
        <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">
          Ambassador Rewards Structure
        </h5>
        <div className="grid gap-2 sm:grid-cols-3 text-[10px] font-mono text-slate-600">
          <div className="flex items-start gap-1.5 p-2 rounded bg-white/50 border border-slate-100">
            <Award className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 uppercase">1 Referral</p>
              <p className="mt-0.5">Priority Queue +1 Tier</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5 p-2 rounded bg-white/50 border border-slate-100">
            <Award className="h-3.5 w-3.5 text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 uppercase">3 Referrals</p>
              <p className="mt-0.5">Fast-Track Queue Status</p>
            </div>
          </div>
          <div className="flex items-start gap-1.5 p-2 rounded bg-white/50 border border-slate-100">
            <Award className="h-3.5 w-3.5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900 uppercase">5+ Referrals</p>
              <p className="mt-0.5">Founding Ambassador Badge + Top Queue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Note */}
      <div className="flex gap-2 p-3.5 rounded-xl bg-slate-200/30 border border-slate-200/60 text-[10px] text-slate-500 leading-normal font-sans">
        <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <strong>Compliance & Trust:</strong> Referral tracking uses a randomly generated code only — no personal data is shared with the people you invite. CASL-compliant: your contacts are never emailed without their own consent. Sharing must be user-initiated.
        </p>
      </div>

      {/* TODO: replace with server-generated code */}
      {/* TODO: wire to backend referral tracking */}
    </div>
  );
}
