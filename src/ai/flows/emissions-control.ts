'use server';

/**
 * @fileOverview An AI agent for real-time emissions monitoring and forecasting.
 *
 * - controlEmissions - A function that predicts emission levels and recommends adjustments.
 * - EmissionsControlInput - The input type for the controlEmissions function.
 * - EmissionsControlOutput - The return type for the controlEmissions function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const EmissionsControlInputSchema = z.object({
  kilnTemperature: z.number().describe('The current temperature of the kiln in Celsius.'),
  fuelMix: z.string().describe('The current mix of fuels being used (e.g., 80% Coal, 20% RDF).'),
  rawMaterialComposition: z.string().describe('The chemical composition of the raw materials being fed into the kiln.'),
  oxygenLevel: z.number().describe('The current oxygen level in the kiln (percentage).'),
});
export type EmissionsControlInput = z.infer<typeof EmissionsControlInputSchema>;

const EmissionsControlOutputSchema = z.object({
  predictedNOx: z.number().describe('Predicted NOx emissions in mg/Nm3.'),
  predictedSOx: z.number().describe('Predicted SOx emissions in mg/Nm3.'),
  predictedCO2: z.number().describe('Predicted CO2 emissions in kg/ton of clinker.'),
  recommendations: z.string().describe('Recommendations for process adjustments to reduce emissions while maintaining operational efficiency.'),
});
export type EmissionsControlOutput = z.infer<typeof EmissionsControlOutputSchema>;

export async function controlEmissions(input: EmissionsControlInput): Promise<EmissionsControlOutput> {
  return emissionsControlFlow(input);
}

const prompt = ai.definePrompt({
  name: 'emissionsControlPrompt',
  input: {schema: EmissionsControlInputSchema},
  output: {schema: EmissionsControlOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an environmental engineer specializing in cement plant emissions control.

  Based on the following real-time operational data, predict the emission levels for NOx, SOx, and CO2. Also, provide actionable recommendations to reduce these emissions while maintaining operational efficiency.

  - Kiln Temperature: {{{kilnTemperature}}} °C
  - Fuel Mix: {{{fuelMix}}}
  - Raw Material Composition: {{{rawMaterialComposition}}}
  - Oxygen Level: {{{oxygenLevel}}}%

  Your recommendations should be practical and focus on process adjustments, such as modifying the fuel mix, adjusting kiln temperature, or altering the raw material feed.
  `,
});

const emissionsControlFlow = ai.defineFlow(
  {
    name: 'emissionsControlFlow',
    inputSchema: EmissionsControlInputSchema,
    outputSchema: EmissionsControlOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
