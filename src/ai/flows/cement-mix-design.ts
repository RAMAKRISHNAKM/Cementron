'use server';

/**
 * @fileOverview An AI agent for optimizing cement mix designs.
 *
 * - optimizeCementMix - A function that recommends the most cost-effective and performant cement mix.
 * - CementMixDesignInput - The input type for the optimizeCementMix function.
 * - CementMixDesignOutput - The return type for the optimizeCementMix function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const CementMixDesignInputSchema = z.object({
  availableMaterials: z.string().describe('A JSON string detailing available raw materials, including their chemical composition and cost per ton. e.g., [{"name": "Limestone", "cost": 150, "composition": {"CaO": 52, "SiO2": 4, "Al2O3": 1.5, "Fe2O3": 0.5}}, ...]'),
  performanceTargets: z.string().describe('Desired performance characteristics for the final cement product, such as 3-day and 28-day compressive strength, setting time, and desired grade (e.g., OPC 53).'),
  productionConstraints: z.string().describe('Any constraints on the production process, such as equipment limitations, inventory caps, or regulatory requirements.'),
});
export type CementMixDesignInput = z.infer<typeof CementMixDesignInputSchema>;

const CementMixDesignOutputSchema = z.object({
  recommendedMix: z.array(z.object({
    material: z.string().describe('The name of the raw material.'),
    percentage: z.number().describe('The percentage of this material in the mix.'),
  })).describe('The recommended mix proportions for the raw materials.'),
  estimatedCost: z.number().describe('The estimated cost per ton of the final cement product based on the recommended mix.'),
  predictedPerformance: z.string().describe('A summary of the predicted performance characteristics of the cement produced with this mix (e.g., strength, setting time).'),
  rationale: z.string().describe('An explanation of why this mix is optimal, considering cost, performance, and constraints.'),
});
export type CementMixDesignOutput = z.infer<typeof CementMixDesignOutputSchema>;

export async function optimizeCementMix(input: CementMixDesignInput): Promise<CementMixDesignOutput> {
  return cementMixDesignFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cementMixDesignPrompt',
  input: {schema: CementMixDesignInputSchema},
  output: {schema: CementMixDesignOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert material scientist specializing in cement chemistry and concrete technology. Your task is to design the most cost-effective cement mix that meets specific performance targets, given a set of available raw materials and production constraints.

  Analyze the following information:
  - Available Raw Materials (JSON): {{{availableMaterials}}}
  - Performance Targets: {{{performanceTargets}}}
  - Production Constraints: {{{productionConstraints}}}

  Based on your analysis, provide the optimal mix proportions, the estimated cost per ton, a prediction of the final product's performance, and a clear rationale for your recommendation.
  `,
});

const cementMixDesignFlow = ai.defineFlow(
  {
    name: 'cementMixDesignFlow',
    inputSchema: CementMixDesignInputSchema,
    outputSchema: CementMixDesignOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
