'use server';

/**
 * @fileOverview This flow integrates data from siloed streams (raw material to clinker to utilities) into a unified platform for holistic decision-making in cement plant operations.
 *
 * - crossProcessOptimization - A function that orchestrates the cross-process optimization flow.
 * - CrossProcessOptimizationInput - The input type for the crossProcessOptimization function.
 * - CrossProcessOptimizationOutput - The return type for the crossProcessOptimization function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const CrossProcessOptimizationInputSchema = z.object({
  rawMaterialData: z.string().describe('Real-time data from raw material feed sensors.'),
  clinkerData: z.string().describe('Real-time data from clinker production sensors.'),
  utilitiesData: z.string().describe('Real-time data from plant utilities sensors.'),
  optimizationGoals: z
    .string()
    .describe(
      'Specific optimization goals, such as reducing energy consumption or improving product quality.'
    ),
});
export type CrossProcessOptimizationInput = z.infer<typeof CrossProcessOptimizationInputSchema>;

const CrossProcessOptimizationOutputSchema = z.object({
  insights: z.string().describe('AI-driven insights for holistic decision-making.'),
  recommendations: z
    .string()
    .describe('Actionable recommendations for optimizing the cement plant operation.'),
});
export type CrossProcessOptimizationOutput = z.infer<typeof CrossProcessOptimizationOutputSchema>;

export async function crossProcessOptimization(
  input: CrossProcessOptimizationInput
): Promise<CrossProcessOptimizationOutput> {
  return crossProcessOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'crossProcessOptimizationPrompt',
  input: {schema: CrossProcessOptimizationInputSchema},
  output: {schema: CrossProcessOptimizationOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert in optimizing cement plant operations. You will receive data from various siloed streams in the plant, including raw material feed, clinker production, and plant utilities.

  Your goal is to provide AI-driven insights and actionable recommendations for holistic decision-making across the entire cement plant operation, considering the specified optimization goals.

  Raw Material Data: {{{rawMaterialData}}}
  Clinker Data: {{{clinkerData}}}
  Utilities Data: {{{utilitiesData}}}
  Optimization Goals: {{{optimizationGoals}}}

  Based on this information, provide insights and recommendations to optimize the cement plant operation.
  Make sure the output is well structured, human readable and actionable.
  `,
});

const crossProcessOptimizationFlow = ai.defineFlow(
  {
    name: 'crossProcessOptimizationFlow',
    inputSchema: CrossProcessOptimizationInputSchema,
    outputSchema: CrossProcessOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
