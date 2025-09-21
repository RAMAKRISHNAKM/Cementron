'use server';

/**
 * @fileOverview An AI agent for proactive safety hazard detection in cement plants.
 *
 * - detectSafetyHazards - A function that analyzes reports to identify potential safety risks.
 * - SafetyHazardDetectionInput - The input type for the detectSafetyHazards function.
 * - SafetyHazardDetectionOutput - The return type for the detectSafetyHazards function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SafetyHazardDetectionInputSchema = z.object({
  incidentReports: z.string().describe('A collection of recent incident reports, near-miss descriptions, and safety observations from the plant floor.'),
  operationalContext: z.string().describe('The current operational context, such as major maintenance activities, new machinery commissioning, or changes in shift patterns.'),
});
export type SafetyHazardDetectionInput = z.infer<typeof SafetyHazardDetectionInputSchema>;

const SafetyHazardDetectionOutputSchema = z.object({
  identifiedHazards: z.array(z.object({
    hazard: z.string().describe('A specific potential hazard identified from the input.'),
    riskLevel: z.enum(['Low', 'Medium', 'High', 'Critical']).describe('The assessed risk level of the hazard.'),
  })).describe('A list of potential safety hazards identified.'),
  mitigationStrategies: z.string().describe('Actionable recommendations and mitigation strategies to prevent accidents and improve plant safety.'),
  safetyScore: z.number().min(0).max(100).describe('An overall safety score for the plant based on the provided data, from 0 (very unsafe) to 100 (very safe).'),
});
export type SafetyHazardDetectionOutput = z.infer<typeof SafetyHazardDetectionOutputSchema>;

export async function detectSafetyHazards(input: SafetyHazardDetectionInput): Promise<SafetyHazardDetectionOutput> {
  return safetyHazardDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'safetyHazardDetectionPrompt',
  input: {schema: SafetyHazardDetectionInputSchema},
  output: {schema: SafetyHazardDetectionOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are a certified safety officer with expertise in heavy industrial environments, specifically cement manufacturing. Your task is to proactively identify potential safety hazards and recommend mitigation strategies based on incident reports and operational context.

  Analyze the following information:
  - Incident Reports & Observations: {{{incidentReports}}}
  - Operational Context: {{{operationalContext}}}

  Based on your analysis, identify a list of specific hazards and their risk level. Then, provide concrete, actionable mitigation strategies to address these risks. Finally, calculate an overall safety score for the plant based on the inputs.
  `,
});

const safetyHazardDetectionFlow = ai.defineFlow(
  {
    name: 'safetyHazardDetectionFlow',
    inputSchema: SafetyHazardDetectionInputSchema,
    outputSchema: SafetyHazardDetectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
