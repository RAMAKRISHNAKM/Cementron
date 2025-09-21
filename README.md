# Cementron - AI-Powered Cement Manufacturing Optimization Platform

Cementron is a comprehensive web application built with Next.js and powered by Google's Generative AI (Genkit). It serves as an advanced dashboard for optimizing every facet of cement plant operations, from raw material processing to market forecasting.

The platform integrates a suite of 12 specialized AI agents, each designed to tackle a specific challenge in the cement industry, providing actionable insights to enhance efficiency, sustainability, and profitability.

## Core Technologies

- **Frontend**: Next.js, React, TypeScript
- **UI Components**: ShadCN UI, Tailwind CSS
- **AI/Backend**: Google's Genkit (with Gemini models)
- **Database & Auth**: Firebase (Firestore, Authentication)
- **Charting**: Recharts
- **Form Management**: React Hook Form, Zod

## Features

The platform includes 12 powerful AI-driven dashboards:

1.  **Raw Material & Grinding Optimization**: Optimizes grinding efficiency based on real-time feed data.
2.  **Clinkerization Optimization**: Fine-tunes kiln parameters to reduce energy consumption.
3.  **Quality Consistency Assurance**: Proactively corrects for input fluctuations to maintain product quality.
4.  **Alternative Fuel Maximization**: Optimizes the use of alternative fuels to reduce costs and emissions.
5.  **Cross-Process Optimization**: Provides holistic, plant-wide recommendations by unifying siloed data.
6.  **Energy Consumption Prediction**: Minimizes energy use in utilities and internal logistics.
7.  **Emissions Control**: Monitors and forecasts emissions to ensure environmental compliance.
8.  **Predictive Maintenance**: Predicts machinery failures and schedules maintenance to prevent downtime.
9.  **Supply Chain Optimization**: Recommends cost-effective sourcing and distribution strategies.
10. **Safety Hazard Detection**: Proactively identifies and mitigates safety risks.
11. **Cement Mix Design**: Designs optimal, cost-effective cement mixes based on available materials.
12. **Market Forecasting**: Forecasts market demand and recommends pricing strategies.

---

## Project Setup & Migration

Follow these steps to set up the project locally, run it, or migrate it to a new environment (e.g., a different computer or a new Firebase account).

### Step 1: Get the Code

You can transfer the project files by either:
- **Using GitHub (Recommended)**: Push the entire project folder to a new GitHub repository and clone it to your new environment. This preserves version history.
- **Manual Copy**: Copy the entire project folder to your local machine.

### Step 2: Install Dependencies

Once you have the code, open a terminal in the project's root directory and run the following command to install all the necessary packages:

```bash
npm install
```

### Step 3: Configure Environment Variables (Crucial for Migration)

The application uses environment variables to securely manage API keys. This is the most important step for connecting the app to your own services.

1.  In the root of the project, create a new file named `.env`.
2.  Add the following line to the `.env` file:

    ```
    GEMINI_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```

3.  **Get Your API Key**:
    *   Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Sign in and create a new API key.
    *   Copy the key and paste it as the value for `GEMINI_API_KEY`.

### Step 4: Update the Firebase Configuration

To connect the application to **your own Firebase project**, you must update the configuration in the code.

1.  **Locate Your Firebase Config Object**:
    *   Go to the [Firebase Console](https://console.firebase.google.com/) and sign in.
    *   Select the Firebase project you want to use.
    *   Click the **gear icon** (Project settings) in the top left.
    *   In the **General** tab, scroll down to the **Your apps** section.
    *   Select your web app (or create one if you haven't).
    *   Under **SDK setup and configuration**, select **Config** and copy the entire `firebaseConfig` object.

2.  **Update the Code**:
    *   Open the file at `src/lib/firebase.ts`.
    *   You will see an existing `firebaseConfig` object. **Replace it entirely** with the object you copied from your Firebase project.

    Your `src/lib/firebase.ts` file should look like this with your new config:
    ```typescript
    import { initializeApp, getApps, getApp } from 'firebase/app';

    // Replace this with the config from YOUR Firebase project
    const firebaseConfig = {
      apiKey: "...",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "...",
      appId: "1:...",
      measurementId: "G-..."
    };

    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

    export { app };
    ```

### Step 5: Run the Development Server

After completing the configuration, run the following command in your terminal to start the application:

```bash
npm run dev
```

The application should now be running locally (typically at `http://localhost:9002`) and will be fully connected to your Google AI and Firebase accounts.
