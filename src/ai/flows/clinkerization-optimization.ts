'use server';

/**
 * @fileOverview A clinkerization parameter optimization AI agent.
 *
 * - optimizeClinkerization - A function that handles the clinkerization optimization process.
 * - OptimizeClinkerizationInput - The input type for the optimizeClinkerization function.
 * - OptimizeClinkerizationOutput - The return type for the optimizeClinkerization function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const OptimizeClinkerizationInputSchema = z.object({
  temperature: z.number().describe('The current temperature of the clinkerization process in Celsius.'),
  oxygenLevel: z.number().describe('The current oxygen level in the clinkerization process (percentage).'),
  feedRate: z.number().describe('The feed rate of raw materials into the kiln (tons per hour).'),
  kilnSpeed: z.number().describe('The rotation speed of the kiln (RPM).'),
  fuelType: z.string().describe('The type of fuel being used in the clinkerization process.'),
  fuelConsumption: z.number().describe('The current fuel consumption rate (tons per hour or equivalent).'),
});
export type OptimizeClinkerizationInput = z.infer<typeof OptimizeClinkerizationInputSchema>;

const OptimizeClinkerizationOutputSchema = z.object({
  adjustedKilnSpeed: z.number().describe('The suggested adjusted rotation speed of the kiln (RPM).'),
  adjustedFuelConsumption: z.number().describe('The suggested adjusted fuel consumption rate (tons per hour or equivalent).'),
  predictedEnergyDemandReduction: z.number().describe('The predicted percentage reduction in energy demand as a result of the adjustments.'),
  environmentalImpactAssessment: z.string().describe('An assessment of the environmental impact of the adjustments, including emissions estimates.'),
});
export type OptimizeClinkerizationOutput = z.infer<typeof OptimizeClinkerizationOutputSchema>;

export async function optimizeClinkerization(input: OptimizeClinkerizationInput): Promise<OptimizeClinkerizationOutput> {
  return optimizeClinkerizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeClinkerizationPrompt',
  input: {schema: OptimizeClinkerizationInputSchema},
  output: {schema: OptimizeClinkerizationOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert in cement clinkerization process optimization. Based on the current process parameters, you will provide adjustments to kiln speed and fuel consumption to lower energy demand and reduce environmental impact.

Current Process Parameters:
Temperature: {{{temperature}}} Celsius
Oxygen Level: {{{oxygenLevel}}}%
Feed Rate: {{{feedRate}}} tons/hour
Kiln Speed: {{{kilnSpeed}}} RPM
Fuel Type: {{{fuelType}}}
Fuel Consumption: {{{fuelConsumption}}} tons/hour

Provide the adjusted kiln speed and fuel consumption, the predicted percentage reduction in energy demand, and an assessment of the environmental impact of the adjustments.
`,
});

const optimizeClinkerizationFlow = ai.defineFlow(
  {
    name: 'optimizeClinkerizationFlow',
    inputSchema: OptimizeClinkerizationInputSchema,
    outputSchema: OptimizeClinkerizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
