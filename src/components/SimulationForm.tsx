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
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg relative overflow-hidden">
        
        {/* Glow Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500" />

        {/* Form header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Driver Awareness Simulation
            </span>
            <span className="text-sm font-semibold text-slate-500">
              Question {step} of 5
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Cognitive Driving Profile Assessment
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Your anonymous responses are processed instantly by our software-based behavioral validation model.
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100">
            <div 
              className="h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
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
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Car className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">1. Driving Frequency</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Select your typical driving frequency on Canadian roads to establish baseline cognitive exposure levels.
                </p>
                <div className="grid gap-4">
                  {frequencyOptions.map(opt => {
                    const SelectedIcon = opt.icon;
                    const isSelected = inputs.drivingFrequency === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("drivingFrequency", opt.value)}
                        className={`flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-500 bg-blue-50/40 shadow-sm" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{opt.label}</div>
                          <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
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
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">2. Commute Environment</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  What type of route dominates your driving experience? Commute types indicate different cognitive workloads.
                </p>
                <div className="grid gap-4">
                  {commuteOptions.map(opt => {
                    const isSelected = inputs.commuteType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("commuteType", opt.value)}
                        className={`flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-500 bg-blue-50/40 shadow-sm" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{opt.label}</div>
                          <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
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
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">3. Time-of-Day Driving</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  When do you perform the majority of your weekly driving? Light conditions heavily dictate visual attention fatigue.
                </p>
                <div className="grid gap-4">
                  {timeOptions.map(opt => {
                    const isSelected = inputs.timeOfDay === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("timeOfDay", opt.value)}
                        className={`flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-500 bg-blue-50/40 shadow-sm" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{opt.label}</div>
                          <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
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
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">4. Fatigue Self-Assessment</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  How often do you experience fatigue indicators (yawning, drifting, heavy eyelids) while actively behind the wheel?
                </p>
                <div className="grid gap-4">
                  {fatigueOptions.map(opt => {
                    const isSelected = inputs.fatigueAssessment === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("fatigueAssessment", opt.value)}
                        className={`flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-500 bg-blue-50/40 shadow-sm" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{opt.label}</div>
                          <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
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
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">5. Driving Attention & Habits</h3>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Which description best fits your cognitive state and visual focus patterns on a typical drive?
                </p>
                <div className="grid gap-4">
                  {attentionOptions.map(opt => {
                    const isSelected = inputs.attentionHabits === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => selectOption("attentionHabits", opt.value)}
                        className={`flex items-start text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? "border-blue-500 bg-blue-50/40 shadow-sm" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className={`mt-0.5 mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
                          isSelected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{opt.label}</div>
                          <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
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
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border cursor-pointer ${
              step === 1 || isSubmitting
                ? "text-slate-300 border-slate-100 cursor-not-allowed"
                : "text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 cursor-pointer"
          >
            <span>{step === 5 ? "Submit Assessment" : "Continue"}</span>
            {step === 5 ? <Sparkles className="h-4 w-4 animate-pulse" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
