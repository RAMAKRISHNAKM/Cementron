'use server';

/**
 * @fileOverview An AI agent for optimizing cement plant supply chains.
 *
 * - optimizeSupplyChain - A function that analyzes logistics data to recommend cost-effective strategies.
 * - SupplyChainOptimizationInput - The input type for the optimizeSupplyChain function.
 * - SupplyChainOptimizationOutput - The return type for the optimizeSupplyChain function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SupplyChainOptimizationInputSchema = z.object({
  inboundLogistics: z.string().describe('Data on inbound raw material logistics, including supplier locations, transportation costs, and lead times.'),
  outboundLogistics: z.string().describe('Data on outbound finished product distribution, including market locations, freight costs, and delivery timelines.'),
  inventoryLevels: z.string().describe('Current inventory levels for key raw materials (e.g., limestone, coal) and finished products (e.g., OPC, PPC).'),
  demandForecast: z.string().describe('Market demand forecast for the next quarter, including regional demand variations.'),
});
export type SupplyChainOptimizationInput = z.infer<typeof SupplyChainOptimizationInputSchema>;

const SupplyChainOptimizationOutputSchema = z.object({
  sourcingRecommendations: z.string().describe('Recommendations for the most cost-effective raw material sourcing strategy, including optimal supplier mix and transportation modes.'),
  distributionStrategy: z.string().describe('The most efficient distribution strategy for finished products to minimize freight costs and meet market demand.'),
  inventoryAdjustments: z.string().describe('Suggested adjustments to inventory levels to reduce carrying costs while ensuring supply continuity.'),
  estimatedCostSavings: z.number().describe('The total estimated monthly cost savings from implementing the recommended optimizations.'),
});
export type SupplyChainOptimizationOutput = z.infer<typeof SupplyChainOptimizationOutputSchema>;

export async function optimizeSupplyChain(input: SupplyChainOptimizationInput): Promise<SupplyChainOptimizationOutput> {
  return supplyChainOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'supplyChainOptimizationPrompt',
  input: {schema: SupplyChainOptimizationInputSchema},
  output: {schema: SupplyChainOptimizationOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are a supply chain and logistics expert specializing in the cement industry. Your goal is to analyze the provided data to recommend the most cost-effective and efficient strategies for raw material sourcing and finished product distribution.

  Analyze the following logistics and market data:
  - Inbound Logistics: {{{inboundLogistics}}}
  - Outbound Logistics: {{{outboundLogistics}}}
  - Inventory Levels: {{{inventoryLevels}}}
  - Demand Forecast: {{{demandForecast}}}

  Based on this data, provide actionable recommendations for sourcing, distribution, and inventory management. Conclude with an estimated total monthly cost saving.
  `,
});

const supplyChainOptimizationFlow = ai.defineFlow(
  {
    name: 'supplyChainOptimizationFlow',
    inputSchema: SupplyChainOptimizationInputSchema,
    outputSchema: SupplyChainOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
