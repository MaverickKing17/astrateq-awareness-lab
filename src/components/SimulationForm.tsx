import React, { useState } from "react";
import { DriverSimulationInputs } from "../types";
import { 
  Car, Compass, Clock, AlertTriangle, Eye, ArrowRight, ArrowLeft, Sparkles, Check, Brain, Shield, Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SimulationFormProps {
  onSubmit: (inputs: DriverSimulationInputs) => void;
  isSubmitting: boolean;
}

export default function SimulationForm({ onSubmit, isSubmitting }: SimulationFormProps) {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<DriverSimulationInputs>({
    drivingFrequency: "daily",
    commuteType: "mixed",
    timeOfDay: "morning",
    fatigueAssessment: "sometimes_tired",
    attentionHabits: "always_focused",
    hazardReaction: "scan_ahead",
    peripheralAwareness: "continuous_mirrors",
    cognitiveLoad: "terminate_task",
    microsleepRisk: "never_slipping",
    coachingPreference: "haptic_audio",
  });

  const nextStep = () => {
    if (step < 10) setStep(step + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const selectOption = (key: keyof DriverSimulationInputs, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit(inputs);
  };

  // Helper lists of options
  const frequencyOptions = [
    { value: "daily", label: "Daily Commute", desc: "Heavy driving exposure. Commutes or active school/work routines.", icon: Car },
    { value: "weekly", label: "Weekly/Occasional", desc: "Moderate driving exposure. Typical weekend trips or errands.", icon: Car },
    { value: "rarely", label: "Rarely/Infrequent", desc: "Low driving exposure. Under 5,000 km per year, mostly local.", icon: Car },
  ];

  const commuteOptions = [
    { value: "highway", label: "Highways & Expressways", desc: "High speeds, sustained lane discipline. High risk for highway hypnosis.", icon: Compass },
    { value: "city", label: "Busy City Streets", desc: "Frequent stops, high pedestrian density, complex intersection scanning.", icon: Compass },
    { value: "rural", label: "Rural / Country Roads", desc: "Unlit stretches, wildlife warning regions, variable road surfaces.", icon: Compass },
    { value: "mixed", label: "Mixed Commute", desc: "A blend of highway transition and dense suburban/city streets.", icon: Compass },
  ];

  const timeOptions = [
    { value: "morning", label: "Morning Peak (06:00 - 09:00)", desc: "High traffic density. Rush hour focus and typical peak tension.", icon: Clock },
    { value: "afternoon", label: "Afternoon Drive (12:00 - 16:00)", desc: "Post-lunch heavy circadian period. Higher natural fatigue dips.", icon: Clock },
    { value: "evening", label: "Evening Dusk (17:00 - 20:00)", desc: "Low daylight contrast, heavy glare. Transitioning fatigue profiles.", icon: Clock },
    { value: "night", label: "Late Night (22:00 - 05:00)", desc: "Deep physiological rest window. Extreme cognitive attention demand.", icon: Clock },
  ];

  const fatigueOptions = [
    { value: "rarely_tired", label: "Rarely / Never Tired", desc: "Generally alert. Experience yawning or attention slips less than once a month.", icon: AlertTriangle },
    { value: "sometimes_tired", label: "Sometimes Tired", desc: "Occasional fatigue. Experience heavy eyelids or micro-focus slips monthly.", icon: AlertTriangle },
    { value: "frequently_tired", label: "Frequently Tired", desc: "Frequent fatigue dips. Struggle to maintain consistent focus weekly.", icon: AlertTriangle },
    { value: "always_tired", label: "Always Tired / Exhausted", desc: "Constant chronic fatigue. Regularly battle heavy eyelids during drives.", icon: AlertTriangle },
  ];

  const attentionOptions = [
    { value: "always_focused", label: "Always Fully Locked In", desc: "No second-screen interaction. Active eye movement scanning, zero phone contact.", icon: Eye },
    { value: "occasional_phone_check", label: "Occasional Phone/GPS Adjust", desc: "Briefly interact with navigators or view mobile notifications on mounts.", icon: Eye },
    { value: "frequent_radio_adjust", label: "Frequent Cabin Interventions", desc: "Continually adjusting climate control, sound system, or passenger conversation.", icon: Eye },
    { value: "mind_wanders", label: "Mind Wanders / Autopilot", desc: "Often driving on mechanical auto-pilot. Lose recollection of the last few kilometers.", icon: Eye },
  ];

  const hazardOptions = [
    { value: "scan_ahead", label: "Scan 3-4 Vehicles Ahead", desc: "Keep eyes moving far down the roadway, identifying brake lights or swerves before the car in front reacts.", icon: Eye },
    { value: "bumper_focus", label: "Focus on Immediate Bumper", desc: "Tend to lock onto the vehicle directly ahead, relying primarily on their brake lights to alert you.", icon: AlertTriangle },
    { value: "delayed", label: "Delayed Scanning (Cabin Tasks)", desc: "Visual cycles are frequently interrupted by GPS, audio selectors, or conversational gaze shifts.", icon: Clock },
  ];

  const peripheralOptions = [
    { value: "continuous_mirrors", label: "Continuous Mirror Sweep (5-8s)", desc: "Maintain a persistent active sweep of rear and side mirrors to map adjacent lane positions in memory.", icon: Compass },
    { value: "transition_only", label: "Transition Checks Only", desc: "Only verify mirror states when preparing to execute a lane transition or exiting highways.", icon: Compass },
    { value: "passive_reliance", label: "Rely on Passive Vehicle Sensors", desc: "Rely heavily on automatic blind-spot indicators or proximity warnings to manage adjacent lane awareness.", icon: Sparkles },
  ];

  const cognitiveLoadOptions = [
    { value: "terminate_task", label: "Prioritize Safe Lane Control", desc: "Immediately mute conversations, cancel screen interaction, and maximize physical visual scans.", icon: Brain },
    { value: "handfree_call", label: "Sustained Dialogue (Hands-free)", desc: "Continue speaking on bluetooth/speakerphone while maintaining lane control, though attention feels split.", icon: Brain },
    { value: "frequent_distraction", label: "Active Mobile Multitasking", desc: "Glance down repeatedly to verify maps, review message popups, or adjust complex menu layers.", icon: Brain },
  ];

  const microsleepOptions = [
    { value: "never_slipping", label: "Zero Slips / Active Scanning", desc: "Never experience heavy eyelids or zoning out. Constant active eye-movement checks.", icon: Shield },
    { value: "occasional_tunnel", label: "Occasional Highway Tunnel Vision", desc: "Catch myself blankly staring at the car ahead without checking mirrors on long highway commutes.", icon: Shield },
    { value: "frequent_microsleeps", label: "Repeated Micro-sleep Triggers", desc: "Experience double-vision, head nods, or struggle to recall the last 2-3 km driven.", icon: AlertTriangle },
  ];

  const coachingOptions = [
    { value: "haptic_audio", label: "Ambient Spatial Audio + Haptics", desc: "Subtle non-jarring acoustic hums and steering-aligned haptic vibrations on drift.", icon: Volume2 },
    { value: "visual_only", label: "On-Device Visual Hud Indicator", desc: "Dashboard interface highlights attention indexes in peripheral field with zero noise.", icon: Volume2 },
    { value: "reactive_alarms", label: "High-Intensity Auditory Alarms", desc: "Loud sounding audio cues strictly reserved for emergency focus failures.", icon: Volume2 },
  ];

  return (
    <div id="simulation-section" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-blue-700" />

        {/* Form header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 font-mono">
              Driver Awareness Simulation
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-mono">
              Step {step} of 10
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold uppercase tracking-tight text-slate-900">
            Cognitive Driving Profile Assessment
          </h2>
          <p className="mt-1 text-[11px] text-slate-600 font-mono font-medium">
            SECURE PORT • MODEL: ASTRATEQ-GADGETS-M702-COGNITIVE • HARDWARE-FREE VALIDATION
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-1 w-full rounded-full bg-slate-100">
            <div 
              className="h-1 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 10) * 100}%` }}
            />
          </div>
        </div>

        {/* Wizard Steps with AnimatePresence */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Car className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">01. Driving Frequency</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  Select your typical driving frequency on Canadian roads to establish baseline cognitive exposure levels.
                </p>
                <div className="grid gap-3">
                  {frequencyOptions.map(opt => {
                    const isSelected = inputs.drivingFrequency === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("drivingFrequency", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Compass className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">02. Commute Environment</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  What type of route dominates your driving experience? Commute types indicate different cognitive workloads.
                </p>
                <div className="grid gap-3">
                  {commuteOptions.map(opt => {
                    const isSelected = inputs.commuteType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("commuteType", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Clock className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">03. Time-of-Day Driving</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  When do you perform the majority of your weekly driving? Light conditions heavily dictate visual attention fatigue.
                </p>
                <div className="grid gap-3">
                  {timeOptions.map(opt => {
                    const isSelected = inputs.timeOfDay === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("timeOfDay", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">04. Fatigue Assessment</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  How often do you experience fatigue indicators (yawning, drifting, heavy eyelids) while actively behind the wheel?
                </p>
                <div className="grid gap-3">
                  {fatigueOptions.map(opt => {
                    const isSelected = inputs.fatigueAssessment === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("fatigueAssessment", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Eye className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">05. Attention & Habits</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  Which description best fits your cognitive state and visual focus patterns on a typical drive?
                </p>
                <div className="grid gap-3">
                  {attentionOptions.map(opt => {
                    const isSelected = inputs.attentionHabits === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("attentionHabits", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Eye className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">06. Hazard Scanning</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  Where do you direct your visual scanning attention during continuous highway or urban driving?
                </p>
                <div className="grid gap-3">
                  {hazardOptions.map(opt => {
                    const isSelected = inputs.hazardReaction === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("hazardReaction", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Compass className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">07. Peripheral & Mirror Awareness</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  What strategy best represents your mirror usage and surrounding spatial awareness routines?
                </p>
                <div className="grid gap-3">
                  {peripheralOptions.map(opt => {
                    const isSelected = inputs.peripheralAwareness === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("peripheralAwareness", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Brain className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">08. Cognitive Load Response</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  When a complex task emerges (e.g., navigating tight work zones while on an active phone call), how do you react?
                </p>
                <div className="grid gap-3">
                  {cognitiveLoadOptions.map(opt => {
                    const isSelected = inputs.cognitiveLoad === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("cognitiveLoad", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Shield className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">09. Gaze & Microsleep Vulnerability</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  Have you ever experienced zoning out on long highways, missing exits, or fighting heavy eyes behind the wheel?
                </p>
                <div className="grid gap-3">
                  {microsleepOptions.map(opt => {
                    const isSelected = inputs.microsleepRisk === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("microsleepRisk", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 10 && (
              <motion.div
                key="step10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-1.5 rounded bg-slate-100 border border-slate-200 text-slate-900">
                    <Volume2 className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">10. Audio & Haptic Sensory Match</h3>
                </div>
                <p className="text-xs text-slate-700 mb-6 font-medium">
                  What style of live, on-device coaching alerts would you trust and prefer in your cockpit environment?
                </p>
                <div className="grid gap-3">
                  {coachingOptions.map(opt => {
                    const isSelected = inputs.coachingPreference === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("coachingPreference", opt.value)}
                        className={`flex items-start text-left p-4 rounded border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-400 bg-blue-50/40 shadow-[0_0_12px_rgba(59,130,246,0.06)]" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/30"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-4 w-4 items-center justify-center rounded border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-2.5 w-2.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">{opt.label}</div>
                          <div className="text-[11px] text-slate-700 mt-1 font-medium">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Controls */}
        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded border cursor-pointer transition-all ${
              step === 1 || isSubmitting
                ? "text-slate-300 border-slate-100 cursor-not-allowed"
                : "text-slate-600 border-slate-200 hover:bg-blue-50/40 hover:text-blue-600 hover:border-blue-200"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_2px_10px_rgba(59,130,246,0.2)] hover:bg-blue-700 hover:shadow-[0_4px_14px_rgba(59,130,246,0.3)] active:scale-95 cursor-pointer transition-all"
          >
            <span>{step === 10 ? "Transmit Profile" : "Continue"}</span>
            {step === 10 ? <Sparkles className="h-4 w-4 animate-pulse" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
