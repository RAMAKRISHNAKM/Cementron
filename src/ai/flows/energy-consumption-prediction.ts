'use server';

/**
 * @fileOverview Predicts and minimizes energy consumption in utilities and optimizes internal logistics flows.
 *
 * - predictEnergyConsumption - A function that handles the energy consumption prediction process.
 * - EnergyConsumptionPredictionInput - The input type for the predictEnergyConsumption function.
 * - EnergyConsumptionPredictionOutput - The return type for the predictEnergyConsumption function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const EnergyConsumptionPredictionInputSchema = z.object({
  utilityData: z.string().describe('Real-time data from plant utilities (e.g., electricity, water, gas consumption).'),
  logisticsData: z.string().describe('Real-time data on internal logistics flows (e.g., material transport, vehicle routes).'),
  productionSchedule: z.string().describe('Planned production schedule for the cement plant.'),
  environmentalConditions: z.string().describe('Current environmental conditions (e.g., temperature, humidity).'),
});
export type EnergyConsumptionPredictionInput = z.infer<typeof EnergyConsumptionPredictionInputSchema>;

const EnergyConsumptionPredictionOutputSchema = z.object({
  predictedConsumption: z.number().describe('Predicted energy consumption for the next hour (in kWh).'),
  optimizationRecommendations: z.string().describe('Recommendations for minimizing energy consumption and optimizing logistics flows.'),
  confidenceLevel: z.number().describe('Confidence level (0-1) for the predicted consumption and optimization recommendations.'),
});
export type EnergyConsumptionPredictionOutput = z.infer<typeof EnergyConsumptionPredictionOutputSchema>;

export async function predictEnergyConsumption(
  input: EnergyConsumptionPredictionInput
): Promise<EnergyConsumptionPredictionOutput> {
  return energyConsumptionPredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'energyConsumptionPredictionPrompt',
  input: {schema: EnergyConsumptionPredictionInputSchema},
  output: {schema: EnergyConsumptionPredictionOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert in energy management and logistics optimization for cement plants.

  Analyze the provided data to predict energy consumption and provide actionable recommendations for optimization.

  Utility Data: {{{utilityData}}}
  Logistics Data: {{{logisticsData}}}
  Production Schedule: {{{productionSchedule}}}
  Environmental Conditions: {{{environmentalConditions}}}

  Based on this information, predict the energy consumption for the next hour and provide specific recommendations to minimize energy use and optimize logistics.

  Ensure that the optimization recommendations are practical and can be implemented in a real-world cement plant setting.
  Also, provide a confidence level (0-1) for your prediction and recommendations.
  `,
});

const energyConsumptionPredictionFlow = ai.defineFlow(
  {
    name: 'energyConsumptionPredictionFlow',
    inputSchema: EnergyConsumptionPredictionInputSchema,
    outputSchema: EnergyConsumptionPredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
