import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Resend client
let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not defined in the environment. Email notifications are inactive.");
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

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
      hazardReaction,
      peripheralAwareness,
      cognitiveLoad,
      microsleepRisk,
      coachingPreference,
    } = req.body;

    // Calculate base score deterministically based on user responses
    let score = 50;

    // 1. Frequency factor
    if (drivingFrequency === "daily") score += 5;
    else if (drivingFrequency === "weekly") score += 2;
    else score -= 3;

    // 2. Commute complexity factor
    if (commuteType === "highway") score -= 2; // high concentration needed
    else if (commuteType === "city") score -= 5; // heavy stop-and-go stress
    else if (commuteType === "rural") score += 3; // lower density but high speed

    // 3. Time-of-day driving
    if (timeOfDay === "night") score -= 10;
    else if (timeOfDay === "evening") score -= 4;
    else if (timeOfDay === "morning") score += 3;

    // 4. Fatigue self-assessment
    if (fatigueAssessment === "rarely_tired") score += 10;
    else if (fatigueAssessment === "sometimes_tired") score += 2;
    else if (fatigueAssessment === "frequently_tired") score -= 12;
    else if (fatigueAssessment === "always_tired") score -= 20;

    // 5. Attention habits
    if (attentionHabits === "always_focused") score += 10;
    else if (attentionHabits === "occasional_phone_check") score -= 12;
    else if (attentionHabits === "frequent_radio_adjust") score -= 6;
    else if (attentionHabits === "mind_wanders") score -= 10;

    // 6. Hazard Scanning Habits
    if (hazardReaction === "scan_ahead") score += 10;
    else if (hazardReaction === "bumper_focus") score -= 5;
    else if (hazardReaction === "delayed") score -= 15;

    // 7. Mirror Checking & Peripheral Awareness
    if (peripheralAwareness === "continuous_mirrors") score += 10;
    else if (peripheralAwareness === "transition_only") score -= 5;
    else if (peripheralAwareness === "passive_reliance") score -= 10;

    // 8. Cognitive Load Response
    if (cognitiveLoad === "terminate_task") score += 10;
    else if (cognitiveLoad === "handfree_call") score -= 4;
    else if (cognitiveLoad === "frequent_distraction") score -= 12;

    // 9. Blink & Microsleep Susceptibility
    if (microsleepRisk === "never_slipping") score += 10;
    else if (microsleepRisk === "occasional_tunnel") score -= 5;
    else if (microsleepRisk === "frequent_microsleeps") score -= 15;

    // 10. Real-time Coaching Interface Preference
    if (coachingPreference === "haptic_audio") score += 5;
    else if (coachingPreference === "visual_only") score += 2;
    else if (coachingPreference === "reactive_alarms") score -= 3;

    // Constrain score between 20 and 98
    score = Math.max(20, Math.min(98, score));

    const ai = getGeminiClient();

    if (ai) {
      // Build prompt using premium, privacy-first consumer AI Coach terminology
      const prompt = `Analyze this simulated driver's cognitive and behavioral awareness profile to generate high-end, premium personalized safety intelligence.
      
      User Profile Inputs:
      - Driving Frequency: ${drivingFrequency}
      - Commute Type: ${commuteType}
      - Time-of-Day Driving: ${timeOfDay}
      - Fatigue Self-Assessment: ${fatigueAssessment}
      - Attention Habits: ${attentionHabits}
      - Hazard Scanning Habits: ${hazardReaction}
      - Mirror Checking & Peripheral Awareness: ${peripheralAwareness}
      - Cognitive Multi-tasking Load: ${cognitiveLoad}
      - Microsleep & Blink Pattern Risk: ${microsleepRisk}
      - Real-time Coaching Preference: ${coachingPreference}
      
      CRITICAL INSTRUCTIONS:
      1. You are generating personalized insights for "Astrateq AI Driver Coach" — a premium, edge-compute, offline-first smartphone application that runs biometrics on-device.
      2. Keep the tone sophisticated, exclusive, premium, helpful, and scientific. Focus on cognitive response times, peripheral mapping, blink rate patterns, and telemetry-shielding benefits.
      3. Do NOT mention academic terms like "research cohort", "study study", "academic initiative", or "subjects". Position it as an exclusive priority customer validation profile.
      4. Do NOT mention vehicle diagnostics OBD adapters, dashcams, cloud telemetry trackers, or fleet monitoring.
      
      Provide:
      - fatigueRiskProfile: Evaluation of their fatigue vulnerability and micro-sleep indicators based on commute windows, self-reported fatigue levels, and blink behaviors.
      - attentionReadiness: Evaluation of attention mapping, visual focus patterns, and cognitive multi-tasking load under stress.
      - safetyIntelligenceReadiness: Actionable on-device tips for managing scanning fields and mirror cycles to optimize their awareness index.
      - overallEvaluation: A cohesive, high-end summary of what their score represents (strong cognitive habits, moderate vulnerability, or substantial attention optimization opportunities).
      - scoreModifier: A small integer adjustment between -5 and +5 based on your qualitative evaluation.`;

      try {
        const aiResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are a senior behavioral scientist and cognitive AI designer for premium on-device consumer driving safety applications.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                fatigueRiskProfile: {
                  type: Type.STRING,
                  description: "Professional consumer-focused evaluation of fatigue exposure and blink risk parameters. Zero hardware/OBD references."
                },
                attentionReadiness: {
                  type: Type.STRING,
                  description: "Sophisticated review of multitasking load and focal visual attention. Zero hardware/OBD references."
                },
                safetyIntelligenceReadiness: {
                  type: Type.STRING,
                  description: "Actionable, premium safety tips on visual cycles and mirror scanning. Zero hardware/OBD references."
                },
                overallEvaluation: {
                  type: Type.STRING,
                  description: "High-end cohesive evaluation of the driver's current cognitive state and potential. Zero hardware/OBD references."
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
    if (fatigueAssessment === "rarely_tired" && microsleepRisk === "never_slipping") {
      fatigueRiskText = "You maintain an exceptional fatigue-resilience profile. Your circadian rhythm is highly stable, and your eye-movement cycles indicate high physical readiness. The Astrateq edge-compute coach will continuously monitor blink speed to preserve this state.";
    } else if (fatigueAssessment === "sometimes_tired" || microsleepRisk === "occasional_tunnel") {
      fatigueRiskText = "You show moderate fatigue exposure during long commutes. High speeds can induce highway hypnosis, leading to occasional visual focal lock. We recommend activating Astrateq's subtle haptic/audio pulse reminders to break repetitive gaze states.";
    } else {
      fatigueRiskText = "Your profile shows significant fatigue and micro-sleep risk. Driving during circadian dips creates severe cognitive delay. Astrateq's real-time optical blink sensor is highly recommended to provide proactive warning patterns before critical drift occurs.";
    }

    if (attentionHabits === "always_focused" && cognitiveLoad === "terminate_task") {
      attentionText = "Your focus mapping is exemplary. You maintain absolute visual field isolation and immediately terminate secondary tasks to navigate heavy traffic. This keeps your cognitive reaction time optimal.";
    } else if (attentionHabits === "mind_wanders" || cognitiveLoad === "handfree_call") {
      attentionText = "You show moderate distraction risk from split-attention multitasking or autopilot drift. While physical devices are mounted, processing conversational dialogue while scanning road vectors reduces hazard reactions.";
    } else {
      attentionText = "You exhibit behavioral distraction risks from high multitasking loads. Checking maps, manual cabin adjustments, or holding phone conversations delays eye transition times by up to 1.8 seconds.";
    }

    if (score >= 82) {
      evaluationText = "You demonstrate highly stable, proactive driving habits. Your baseline index represents the upper percentile of cognitive focus, indicating outstanding spatial awareness and defense readiness.";
      safetyText = "To lock in your optimal profile, practice deliberate mirror-sweep cycles every 5-8 seconds, and configure Astrateq to silent ambient alert mode for maximum sensory calm.";
    } else if (score >= 62) {
      evaluationText = "You demonstrate moderate spatial awareness with notable exposure to fatigue and multitasking drift. Your cognitive safety margin can be heightened with systematic habits.";
      safetyText = "Incorporate proactive far-horizon scanning (3-4 vehicles ahead) to extend your visual reaction buffer. Establish a zero-second device adjustment rule prior to starting your commute.";
    } else {
      evaluationText = "Your profile indicates major opportunities for focus optimization. Elevated multitasking load, frequent fatigue, and delayed scanning habits substantially reduce reaction times.";
      safetyText = "Focus on strict physical device isolation. We recommend using Astrateq's real-time, on-device audio alerts to rebuild consistent scanning patterns and protect your lateral lanes.";
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
app.post("/api/signup-cohort", async (req, res) => {
  const { email, tier, score } = req.body;
  if (!email || !tier) {
    return res.status(400).json({ success: false, error: "Email and Tier are required fields." });
  }

  // Simulate storing in database
  const cohortId = `COHORT-CAN-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Get Tier name
  let tierName = "Standard Research Engagement";
  if (tier === "guardian") {
    tierName = "Active Safety Research Engagement";
  } else if (tier === "founding") {
    tierName = "Steering Advisory Panel";
  }

  let emailSent = false;
  let emailError = null;

  const resend = getResendClient();
  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: "Astrateq Gadgets <onboarding@resend.dev>",
        to: email,
        subject: `[ASTRATEQ GADGETS] Research Cohort Enrollment Confirmation: ${cohortId}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e6edf5; border-radius: 8px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.025em; text-transform: uppercase;">ASTRATEQ GADGETS</h2>
              <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Driver Awareness & Intelligence Study</p>
            </div>
            
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Hello,</p>
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">Thank you for registering to join the Astrateq Gadgets pre-launch driver awareness research cohort. Your enrollment has been successfully logged.</p>
            
            <div style="background-color: #f4f7fb; border: 1px solid #e2e8f0; border-radius: 6px; padding: 18px; margin: 24px 0;">
              <h3 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px;">Enrollment Details</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500; width: 40%;">Cohort ID:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: bold; font-family: monospace;">${cohortId}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Participation Level:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${tierName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Simulated Score:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${score !== undefined ? `${score} / 100` : "Pending Simulation"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Status:</td>
                  <td style="padding: 6px 0; color: #10b981; font-weight: bold; text-transform: uppercase; font-size: 11px;">Active & Verified</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #475569;"><strong>What happens next?</strong></p>
            <p style="font-size: 13px; line-height: 1.6; color: #475569; margin-bottom: 24px;">Our research team is currently onboarding Canadian drivers block-by-block. You will receive updates, localized focus insights, and opportunities to validate early software builds as they become available. No action is required from you at this time.</p>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 32px; font-size: 11px; color: #94a3b8; text-align: center; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em;">
              This is a pre-launch behavioral simulation and concept validation study.<br>
              ASTRATEQ GADGETS CANADA • COGNITIVE SAFETY RESEARCH
            </div>
          </div>
        `
      });

      if (error) {
        if (error.name === "validation_error" || (error.message && error.message.includes("Single Sender"))) {
          console.log("\n[RESEND SANDBOX NOTICE]");
          console.log(`The Resend API key is currently in Sandbox/Onboarding mode. Email could not be delivered to "${email}" because it is not a verified recipient in your Resend account.`);
          console.log("This is the EXPECTED behavior for unverified Resend domains. The registration was registered successfully in-memory.\n");
        } else {
          console.error("Resend sendEmail error object:", error);
        }
        emailError = error.message;
      } else {
        emailSent = true;
        console.log(`[RESEND] Email successfully sent to ${email} for cohort ID ${cohortId}`);
      }
    } catch (err: any) {
      console.error("Resend API request crashed:", err);
      emailError = err.message || "Request failed";
    }
  }

  return res.json({
    success: true,
    message: `Successfully registered for the ${tierName}!`,
    cohortId,
    email,
    tier,
    emailSent,
    emailError
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
