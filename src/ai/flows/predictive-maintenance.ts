'use server';

/**
 * @fileOverview An AI agent for predictive maintenance of cement plant machinery.
 *
 * - predictMaintenance - A function that predicts machinery failures and recommends maintenance.
 * - PredictiveMaintenanceInput - The input type for the predictMaintenance function.
 * - PredictiveMaintenanceOutput - The return type for the predictMaintenance function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const PredictiveMaintenanceInputSchema = z.object({
  machineId: z.string().describe('The ID of the machine being analyzed.'),
  vibrationLevel: z.number().describe('Current vibration level of the machine (in mm/s).'),
  temperature: z.number().describe('Current temperature of the machine (in Celsius).'),
  operatingHours: z.number().describe('Total operating hours since the last service.'),
  lastServiceDate: z.string().describe('The date of the last service (YYYY-MM-DD).'),
});
export type PredictiveMaintenanceInput = z.infer<typeof PredictiveMaintenanceInputSchema>;

const PredictiveMaintenanceOutputSchema = z.object({
  maintenanceRequired: z.boolean().describe('Whether immediate maintenance is required.'),
  predictedFailureTime: z.number().describe('Predicted time until failure (in operating hours).'),
  recommendations: z.string().describe('Specific maintenance recommendations and rationale.'),
});
export type PredictiveMaintenanceOutput = z.infer<typeof PredictiveMaintenanceOutputSchema>;

export async function predictMaintenance(input: PredictiveMaintenanceInput): Promise<PredictiveMaintenanceOutput> {
  return predictMaintenanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictMaintenancePrompt',
  input: {schema: PredictiveMaintenanceInputSchema},
  output: {schema: PredictiveMaintenanceOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are a predictive maintenance expert for heavy machinery in a cement plant.

  Based on the following data for machine {{{machineId}}}, predict potential failures and recommend maintenance actions.

  - Vibration Level: {{{vibrationLevel}}} mm/s
  - Temperature: {{{temperature}}} °C
  - Operating Hours: {{{operatingHours}}}
  - Last Service Date: {{{lastServiceDate}}}

  Determine if immediate maintenance is required, predict the time until a potential failure in operating hours, and provide specific, actionable maintenance recommendations. The primary goal is to prevent unplanned downtime.
  `,
});

const predictMaintenanceFlow = ai.defineFlow(
  {
    name: 'predictMaintenanceFlow',
    inputSchema: PredictiveMaintenanceInputSchema,
    outputSchema: PredictiveMaintenanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
