# Astrateq Driver Awareness Platform

> **Driver Awareness Intelligence Pre-Launch Validation Platform for Canadian Drivers.** A high-precision, software-only behavioral science research tool designed to evaluate driving safety indicators, focus thresholds, and fatigue risk metrics without any hardware tracking or telematics.

---

## 🍁 Project Overview

The **Astrateq Driver Awareness Platform** is a research validation web application. It allows Canadian drivers to complete an interactive 60-second cognitive simulation, receive a calculated **Driver Awareness Index (score)**, and register for official pre-launch research cohorts grouped by provincial road safety frameworks.

### 🛡️ Absolute Privacy Guarantee (Zero Telematics)
We understand that driver tracking tools have created massive skepticism. Astrateq is built strictly on behavioral cognitive science. It enforces:
- **Zero Location Tracking:** No GPS coordinates or commute routes are ever monitored.
- **Zero Auto Insurance Integration:** Individual performance data is private, anonymous, and protected from third-party lookup.
- **100% Software-Only Evaluation:** Purely cognitive surveys and attention checks without OBD2 hardware or camera-based driver-attention feeds.

---

## ✨ Core Features

1. **60-Second Driver Readiness Check**
   - Interactive, sleekly animated simulation questionnaire.
   - Measures critical safety vectors: sleep-debt vulnerability, visual field scan checks, typical trip duration, and driving fatigue threshold levels.
   - Real-time animated simulator with step-by-step cognitive analysis overlays.

2. **Dynamic Awareness Index & Analytics**
   - High-contrast visual dial showing the customized **Aware Index** score.
   - Detailed breakdown of metrics: fatigue exposure risk, cognitive attention percentage, and readiness diagnostics.
   - Actionable tips to improve road awareness habits.

3. **Canadian Research Cohorts Enrollment**
   - Fully interactive onboarding portal for three scientific engagement tiers:
     - **Self-Guided:** Bi-monthly statistics and 100% cloud-simulated access.
     - **Active Guardian (Popular Choice):** Dedicated software evaluation and priority validation channels.
     - **Steering Advisory Panel:** Closed-door panels, study co-authorship opportunities, and lifetime validation credits.
   - Smart Canadian Province mapping to align participants with local road safety guidelines (e.g., ON, BC, AB, QC).
   - Generates a unique, secure, copyable **Research Cohort ID** upon signup.

4. **Swiss-Modern Visual Style**
   - Impeccable high-contrast typographic hierarchy using "Space Grotesk", "Inter", and "JetBrains Mono" monospaced accents.
   - Sleek charcoal grays, borders, clean badge chips, and spacious layout paddings.
   - Staggered entrances and smooth micro-animations powered by **Motion**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 18 with Vite
- **Styling Engine:** Tailwind CSS
- **Animation Engine:** Motion (`motion/react`)
- **Iconography:** Lucide React
- **Build Utilities:** TypeScript for absolute type safety

### 📂 Directory Structure

```text
├── index.html                  # Main SPA entry page
├── server.ts                   # Optional Express server configuration
├── src/
│   ├── App.tsx                 # Main Application router & Landing layout
│   ├── main.tsx                # Client-side initialization
│   ├── index.css               # Global tailwind rules & custom font imports
│   └── components/
│       ├── Header.tsx          # Clean navigation header with active page indicator
│       ├── SimulationForm.tsx  # Multi-step cognitive simulator logic
│       ├── ResultsDisplay.tsx # Dynamic SVG score dial & cognitive breakdown panel
│       ├── ValueProps.tsx      # Core scientific validation objectives grid
│       ├── CohortPage.tsx      # Waitlist tiered registrations & province calibration
│       ├── LoadingOverlay.tsx  # Step-by-step cognitive analyzer screen
│       └── Footer.tsx          # Copyright info & academic compliance disclaimers
├── metadata.json               # Application platform metadata
└── package.json                # Project dependencies and script runner configurations
```

---

## 🚀 Getting Started

### 📦 Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher recommended)

### 💻 Installation
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Spin up the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to interact with the platform.

### 🏗️ Production Compilation
To build and optimize the application for production deployment:
```bash
npm run build
```
This script generates fully compressed static assets in the `/dist` directory.

---

## 📝 Compliance & Ethics Statement
This study is conducted strictly to collect cognitive habits for software validation purposes under Canadian standards. All answers are processed anonymously and voluntarily. Participants may remove their registered profiles from the waitlist database at any time.
