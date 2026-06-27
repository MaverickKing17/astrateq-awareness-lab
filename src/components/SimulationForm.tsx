import React, { useState } from "react";
import { DriverSimulationInputs } from "../types";
import { 
  Car, Compass, Clock, AlertTriangle, Eye, ArrowRight, ArrowLeft, Sparkles, Check 
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
  });

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
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

  return (
    <div id="simulation-section" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
        
        {/* Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-blue-700" />

        {/* Form header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Driver Awareness Simulation
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Step {step} of 5
            </span>
          </div>
          <h2 className="mt-3 text-xl font-bold uppercase tracking-tight text-slate-900">
            Cognitive Driving Profile Assessment
          </h2>
          <p className="mt-1 text-[11px] text-slate-400 font-mono">
            SECURE PORT • SUBJECT: DS-2901-DELTA • HARDWARE-FREE VALIDATION
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-1 w-full rounded-full bg-slate-100">
            <div 
              className="h-1 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
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
                <p className="text-xs text-slate-500 mb-6">
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
                          <div className="text-[11px] text-slate-500 mt-1">{opt.desc}</div>
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
                <p className="text-xs text-slate-500 mb-6">
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
                          <div className="text-[11px] text-slate-500 mt-1">{opt.desc}</div>
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
                <p className="text-xs text-slate-500 mb-6">
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
                          <div className="text-[11px] text-slate-500 mt-1">{opt.desc}</div>
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
                <p className="text-xs text-slate-500 mb-6">
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
                          <div className="text-[11px] text-slate-500 mt-1">{opt.desc}</div>
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
                <p className="text-xs text-slate-500 mb-6">
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
                          <div className="text-[11px] text-slate-500 mt-1">{opt.desc}</div>
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
            <span>{step === 5 ? "Transmit Profile" : "Continue"}</span>
            {step === 5 ? <Sparkles className="h-4 w-4 animate-pulse" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
