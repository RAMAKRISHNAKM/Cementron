'use server';
/**
 * @fileOverview Predicts variability in raw material feed and suggests adjustments for grinding efficiency.
 *
 * - predictRawMaterialVariability - A function that handles the prediction of raw material variability and suggests adjustments.
 * - PredictRawMaterialVariabilityInput - The input type for the predictRawMaterialVariability function.
 * - PredictRawMaterialVariabilityOutput - The return type for the predictRawMaterialVariability function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const PredictRawMaterialVariabilityInputSchema = z.object({
  sensorData: z.string().describe('Real-time feed data from plant sensors, including parameters like moisture, particle size, and chemical composition.'),
});
export type PredictRawMaterialVariabilityInput = z.infer<typeof PredictRawMaterialVariabilityInputSchema>;

const PredictRawMaterialVariabilityOutputSchema = z.object({
  variabilityPrediction: z.string().describe('Predicted variability in raw material feed.'),
  suggestedAdjustments: z.string().describe('Suggested adjustments for grinding efficiency to minimize energy losses, including specific parameter adjustments for the grinding process.'),
});
export type PredictRawMaterialVariabilityOutput = z.infer<typeof PredictRawMaterialVariabilityOutputSchema>;

export async function predictRawMaterialVariability(input: PredictRawMaterialVariabilityInput): Promise<PredictRawMaterialVariabilityOutput> {
  return predictRawMaterialVariabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRawMaterialVariabilityPrompt',
  input: {schema: PredictRawMaterialVariabilityInputSchema},
  output: {schema: PredictRawMaterialVariabilityOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert in cement manufacturing processes, specializing in raw material handling and grinding.

  Based on the real-time sensor data provided, predict the variability in the raw material feed and suggest adjustments for grinding efficiency to minimize energy losses.

  Sensor Data: {{{sensorData}}}

  Consider the following factors when making your prediction and suggesting adjustments:
  - Moisture content
  - Particle size distribution
  - Chemical composition
  - Grinding mill performance

  Provide a detailed variability prediction and specific, actionable adjustments for the grinding process parameters.
`,
});

const predictRawMaterialVariabilityFlow = ai.defineFlow(
  {
    name: 'predictRawMaterialVariabilityFlow',
    inputSchema: PredictRawMaterialVariabilityInputSchema,
    outputSchema: PredictRawMaterialVariabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
