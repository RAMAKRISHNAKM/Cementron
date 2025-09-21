// src/ai/flows/alternative-fuel-maximization.ts
'use server';

/**
 * @fileOverview An AI agent to optimize alternative fuel usage in cement plants.
 *
 * - maximizeAlternativeFuelUse - A function that optimizes fuel combinations and thermal substitution rates.
 * - MaximizeAlternativeFuelUseInput - The input type for the maximizeAlternativeFuelUse function.
 * - MaximizeAlternativeFuelUseOutput - The return type for the maximizeAlternativeFuelUse function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const MaximizeAlternativeFuelUseInputSchema = z.object({
  plantData: z
    .string()
    .describe('Real-time operational data from the cement plant, including current fuel mix, thermal substitution rate, and energy consumption.'),
  fuelOptions: z
    .string()
    .describe('A description of available alternative fuels, including their cost, availability, and energy content.'),
  productionGoals: z
    .string()
    .describe('Production goals and constraints, such as desired clinker output and quality targets.'),
  environmentalRegulations: z
    .string()
    .describe('Relevant environmental regulations and emissions limits.'),
});
export type MaximizeAlternativeFuelUseInput = z.infer<
  typeof MaximizeAlternativeFuelUseInputSchema
>;

const MaximizeAlternativeFuelUseOutputSchema = z.object({
  optimizedFuelMix: z
    .string()
    .describe('The optimized mix of alternative fuels to minimize costs and emissions while meeting production goals.'),
  thermalSubstitutionRate: z
    .number()
    .describe('The recommended thermal substitution rate achieved by the optimized fuel mix.'),
  predictedEmissions: z
    .string()
    .describe('Predicted emissions levels for the optimized fuel mix.'),
  costSavings: z
    .number()
    .describe('Estimated cost savings resulting from the optimized fuel mix.'),
  rationale: z
    .string()
    .describe('Explanation of why the suggested fuel mix is optimal.'),
});
export type MaximizeAlternativeFuelUseOutput = z.infer<
  typeof MaximizeAlternativeFuelUseOutputSchema
>;

export async function maximizeAlternativeFuelUse(
  input: MaximizeAlternativeFuelUseInput
): Promise<MaximizeAlternativeFuelUseOutput> {
  return maximizeAlternativeFuelUseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maximizeAlternativeFuelUsePrompt',
  input: {schema: MaximizeAlternativeFuelUseInputSchema},
  output: {schema: MaximizeAlternativeFuelUseOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert in cement plant operations, specializing in optimizing fuel mixes for cost savings and environmental sustainability.

  Based on the following information, determine the optimal mix of alternative fuels to minimize costs and emissions while meeting production goals and environmental regulations.

  Plant Data: {{{plantData}}}
  Fuel Options: {{{fuelOptions}}}
  Production Goals: {{{productionGoals}}}
  Environmental Regulations: {{{environmentalRegulations}}}

  Provide the optimized fuel mix, the expected thermal substitution rate, predicted emissions levels, estimated cost savings, and a rationale for your recommendation.

  Ensure that the optimized fuel mix adheres to all environmental regulations and emissions limits.`,
});

const maximizeAlternativeFuelUseFlow = ai.defineFlow(
  {
    name: 'maximizeAlternativeFuelUseFlow',
    inputSchema: MaximizeAlternativeFuelUseInputSchema,
    outputSchema: MaximizeAlternativeFuelUseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
