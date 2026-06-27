export interface DriverSimulationInputs {
  drivingFrequency: string;
  commuteType: string;
  timeOfDay: string;
  fatigueAssessment: string;
  attentionHabits: string;
}

export interface DriverInsights {
  success: boolean;
  score: number;
  fatigueRiskProfile: string;
  attentionReadiness: string;
  safetyIntelligenceReadiness: string;
  overallEvaluation: string;
  isAiGenerated: boolean;
}

export interface CohortRegistration {
  success: boolean;
  message: string;
  cohortId: string;
  email: string;
  tier: string;
}

export type ActivePage = "landing" | "simulation" | "results" | "cohort";
