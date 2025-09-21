'use server';

/**
 * @fileOverview A quality consistency assurance AI agent.
 *
 * - qualityConsistencyAssurance - A function that handles the quality consistency assurance process.
 * - QualityConsistencyAssuranceInput - The input type for the qualityConsistencyAssurance function.
 * - QualityConsistencyAssuranceOutput - The return type for the qualityConsistencyAssurance function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const QualityConsistencyAssuranceInputSchema = z.object({
  inputData: z.string().describe('Real-time input data from plant sensors, including parameters like temperature, pressure, and material composition.'),
  productSpecifications: z.string().describe('The desired specifications for the final cement product, including chemical composition and physical properties.'),
});
export type QualityConsistencyAssuranceInput = z.infer<typeof QualityConsistencyAssuranceInputSchema>;

const QualityConsistencyAssuranceOutputSchema = z.object({
  qualityAssessment: z.string().describe('An assessment of the current product quality based on the input data.'),
  recommendedCorrections: z.string().describe('Proactive corrections to maintain consistent product quality, including adjustments to process parameters.'),
});
export type QualityConsistencyAssuranceOutput = z.infer<typeof QualityConsistencyAssuranceOutputSchema>;

export async function qualityConsistencyAssurance(input: QualityConsistencyAssuranceInput): Promise<QualityConsistencyAssuranceOutput> {
  return qualityConsistencyAssuranceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'qualityConsistencyAssurancePrompt',
  input: {schema: QualityConsistencyAssuranceInputSchema},
  output: {schema: QualityConsistencyAssuranceOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert quality control engineer in a cement manufacturing plant.

You will use real-time input data from plant sensors and desired product specifications to assess the current product quality and provide proactive corrections to maintain consistent product quality.

Input Data: {{{inputData}}}
Product Specifications: {{{productSpecifications}}}

Based on the input data and product specifications, provide an assessment of the current product quality and recommend corrections to maintain consistency.
`,
});

const qualityConsistencyAssuranceFlow = ai.defineFlow(
  {
    name: 'qualityConsistencyAssuranceFlow',
    inputSchema: QualityConsistencyAssuranceInputSchema,
    outputSchema: QualityConsistencyAssuranceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
