import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in the environment. Running in high-fidelity fallback simulation mode.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// 2. Driver Awareness Insights generator using Gemini AI
app.post("/api/generate-insights", async (req, res) => {
  try {
    const {
      drivingFrequency,
      commuteType,
      timeOfDay,
      fatigueAssessment,
      attentionHabits,
    } = req.body;

    // Calculate base score deterministically based on user responses
    let score = 75;

    // Frequency factor
    if (drivingFrequency === "daily") score += 5;
    else if (drivingFrequency === "weekly") score += 2;
    else score -= 3;

    // Commute complexity factor
    if (commuteType === "highway") score -= 2; // high concentration needed
    else if (commuteType === "city") score -= 5; // heavy stop-and-go stress
    else if (commuteType === "rural") score += 3; // lower density but high speed

    // Time-of-day driving
    if (timeOfDay === "night") score -= 10;
    else if (timeOfDay === "evening") score -= 4;
    else if (timeOfDay === "morning") score += 3;

    // Fatigue self-assessment
    if (fatigueAssessment === "rarely_tired") score += 10;
    else if (fatigueAssessment === "sometimes_tired") score += 0;
    else if (fatigueAssessment === "frequently_tired") score -= 15;
    else if (fatigueAssessment === "always_tired") score -= 25;

    // Attention habits
    if (attentionHabits === "always_focused") score += 15;
    else if (attentionHabits === "occasional_phone_check") score -= 15;
    else if (attentionHabits === "frequent_radio_adjust") score -= 8;
    else if (attentionHabits === "mind_wanders") score -= 12;

    // Constrain score between 20 and 98
    score = Math.max(20, Math.min(98, score));

    const ai = getGeminiClient();

    if (ai) {
      // Build prompt using APPROVED LANGUAGE and avoiding FORBIDDEN LANGUAGE
      const prompt = `Analyze this simulated Canadian driver's behavioral characteristics and provide professional research-oriented feedback.
      
      User Profile Inputs:
      - Driving Frequency: ${drivingFrequency}
      - Commute Type: ${commuteType}
      - Time-of-Day Driving: ${timeOfDay}
      - Fatigue Self-Assessment: ${fatigueAssessment}
      - Attention Habits: ${attentionHabits}
      
      CRITICAL INSTRUCTIONS:
      1. You are generating content for the "Astrateq Driver Awareness Platform", which is a software-based behavioral intelligence research system and validation funnel.
      2. You MUST use approved terminology: "Driver Awareness Intelligence", "Simulation Model", "Behavioral Safety Insights", "Fatigue Risk Awareness", "Attention Readiness Profile", "Market Validation Study", "Research Cohort", "Awareness Score".
      3. Do NOT use or imply forbidden hardware terms: "OBD", "dashcam", "CAN bus", "vehicle diagnostics", "insurance tracking", "telematics", "hardware device", "fleet monitoring", "automotive scanner". This is a purely software-based, behavioral assessment.
      4. Your tone must be premium, professional, calm, research-validated, and supportive. Emphasize behavioral science, fatigue mitigation, and attention management in Canada (mentioning Canadian weather/road contexts like winter preparedness or long Trans-Canada distances where relevant).
      
      Provide:
      - fatigueRiskProfile: An evaluation of their fatigue vulnerability based on when they drive and how often they feel tired, including a practical fatigue-management insight.
      - attentionReadiness: An analysis of their attention habits and distraction risks, highlighting behavioral focus patterns.
      - safetyIntelligenceReadiness: Direct behavioral recommendations and actionable tips for safer driving decisions.
      - overallEvaluation: A cohesive summary of what their score represents (strong patterns, moderate exposure, or substantial improvement opportunity).
      - scoreModifier: A small integer adjustment between -5 and +5 based on your qualitative evaluation.`;

      try {
        const aiResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are a senior cognitive scientist specializing in driver attention, fatigue risk assessment, and behavioral safety insights for Canadian road safety research.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                fatigueRiskProfile: {
                  type: Type.STRING,
                  description: "A professional, Canadian-context review of fatigue exposure. No hardware references."
                },
                attentionReadiness: {
                  type: Type.STRING,
                  description: "A professional evaluation of distraction risk and focus patterns. No hardware references."
                },
                safetyIntelligenceReadiness: {
                  type: Type.STRING,
                  description: "Key behavioral safety recommendations for cognitive readiness. No hardware references."
                },
                overallEvaluation: {
                  type: Type.STRING,
                  description: "An evaluation summary reflecting whether they have strong awareness, moderate fatigue, or improvement opportunities."
                },
                scoreModifier: {
                  type: Type.INTEGER,
                  description: "An integer adjustment from -5 to +5."
                }
              },
              required: [
                "fatigueRiskProfile",
                "attentionReadiness",
                "safetyIntelligenceReadiness",
                "overallEvaluation",
                "scoreModifier"
              ]
            }
          }
        });

        const text = aiResponse.text;
        if (text) {
          const parsed = JSON.parse(text);
          const finalScore = Math.max(15, Math.min(100, score + (parsed.scoreModifier || 0)));
          return res.json({
            success: true,
            score: finalScore,
            fatigueRiskProfile: parsed.fatigueRiskProfile,
            attentionReadiness: parsed.attentionReadiness,
            safetyIntelligenceReadiness: parsed.safetyIntelligenceReadiness,
            overallEvaluation: parsed.overallEvaluation,
            isAiGenerated: true
          });
        }
      } catch (aiErr) {
        console.error("Gemini AI API execution failed, using high-fidelity fallback.", aiErr);
      }
    }

    // High-fidelity fallback generation when API key is missing or call fails
    let fatigueRiskText = "";
    let attentionText = "";
    let safetyText = "";
    let evaluationText = "";

    // Generate custom text deterministically so it matches user inputs beautifully
    if (fatigueAssessment === "rarely_tired") {
      fatigueRiskText = "You maintain an excellent fatigue risk awareness profile. Driving primarily during daylight hours or maintaining a consistent sleep hygiene schedule keeps cognitive fatigue indicators low. Keep utilizing rest stops on long Canadian journeys.";
    } else if (fatigueAssessment === "sometimes_tired") {
      fatigueRiskText = "You show moderate fatigue exposure. Long commutes or repetitive routes across Canadian highways can induce highway hypnosis. Consider scheduling routine cognitive breaks every 2 hours of driving.";
    } else {
      fatigueRiskText = "Your profile shows high fatigue exposure. Operating during high-fatigue hours or regular tired driving significantly increases cognitive delay. Incorporating deliberate active monitoring and scheduling travel around natural sleep windows is highly recommended.";
    }

    if (attentionHabits === "always_focused") {
      attentionText = "Your attention readiness is exemplary. You actively manage your visual and cognitive field, maintaining a zero-tolerance policy for micro-distractions. This keeps your situational awareness levels highly protective.";
    } else if (attentionHabits === "mind_wanders") {
      attentionText = "You show moderate distraction risk from cognitive drift. While physical distractions are managed, passive mind-wandering reduces micro-reaction speeds. Active hazard scanning techniques can keep your focus locked.";
    } else {
      attentionText = "You exhibit behavioral distraction risks from split attention. Checking communication channels or making manual adjustments during driving increases cognitive workload, delaying hazard recognition times.";
    }

    if (score >= 80) {
      evaluationText = "You show strong awareness patterns and excellent behavioral safety habits. Your readiness is highly suited for complex driving environments, establishing a benchmark for road safety.";
      safetyText = "To maintain your outstanding profile, we recommend acting as an active research contributor. Continue practicing early hazard prediction and share safety-first mental models with peers.";
    } else if (score >= 60) {
      evaluationText = "You demonstrate moderate fatigue exposure and average attention levels. There are clear opportunities to reinforce focus habits and build stronger defenses against fatigue.";
      safetyText = "Focus on eliminating secondary visual tasks. Incorporate proactive scanning sequences and establish clear trip-planning routines prior to starting your commute.";
    } else {
      evaluationText = "Your results indicate substantial improvement opportunities in fatigue management and attention locking. Your current risk exposure can be significantly lowered through active behavioral changes.";
      safetyText = "Prioritize strict sleep-readiness audits before trips. Transition your workspace or in-cabin atmosphere into a high-engagement focus zone, eliminating any secondary smartphone triggers entirely.";
    }

    return res.json({
      success: true,
      score: score,
      fatigueRiskProfile: fatigueRiskText,
      attentionReadiness: attentionText,
      safetyIntelligenceReadiness: safetyText,
      overallEvaluation: evaluationText,
      isAiGenerated: false
    });

  } catch (err: any) {
    console.error("Critical error in driver insights endpoint:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// 3. Research Cohort Registration
app.post("/api/signup-cohort", (req, res) => {
  const { email, tier, score } = req.body;
  if (!email || !tier) {
    return res.status(400).json({ success: false, error: "Email and Tier are required fields." });
  }

  // Simulate storing in database
  const cohortId = `COHORT-CAN-${Math.floor(1000 + Math.random() * 9000)}`;
  return res.json({
    success: true,
    message: `Successfully registered for the ${tier} research tier!`,
    cohortId,
    email,
    tier
  });
});

// Mount Vite middleware / static assets
async function setupRouting() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ASTRATEQ SERVER] Running on port ${PORT} (Node Env: ${process.env.NODE_ENV || "development"})`);
  });
}

setupRouting();
