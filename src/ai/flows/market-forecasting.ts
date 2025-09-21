'use server';

/**
 * @fileOverview An AI agent for forecasting market demand and recommending pricing strategies.
 *
 * - forecastMarket - A function that analyzes market data to predict demand and suggest pricing.
 * - MarketForecastingInput - The input type for the forecastMarket function.
 * - MarketForecastingOutput - The return type for the forecastMarket function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const MarketForecastingInputSchema = z.object({
  historicalSalesData: z.string().describe('Historical sales data, including volume and price per ton, broken down by region and month for the last 2-3 years.'),
  competitorPricing: z.string().describe('Current pricing information for key competitors in each major region.'),
  economicIndicators: z.string().describe('Key economic indicators such as regional GDP growth, infrastructure spending announcements, and real estate market trends.'),
  marketNews: z.string().describe('Recent news articles or reports related to construction projects, government policies, or other market-moving events.'),
});
export type MarketForecastingInput = z.infer<typeof MarketForecastingInputSchema>;

const MarketForecastingOutputSchema = z.object({
  demandForecast: z.array(z.object({
    region: z.string().describe('The geographical region for the forecast.'),
    predictedDemand: z.number().describe('The predicted cement demand in tons for the next quarter.'),
    trend: z.enum(['Increasing', 'Decreasing', 'Stable']).describe('The expected market trend in this region.'),
  })).describe('A forecast of cement demand for the next quarter, broken down by region.'),
  pricingRecommendations: z.array(z.object({
    region: z.string().describe('The geographical region for the pricing recommendation.'),
    recommendedPrice: z.number().describe('The recommended price per ton in local currency.'),
    strategy: z.string().describe('The rationale behind the recommended price (e.g., "Penetration pricing to gain market share", "Premium pricing based on high demand").'),
  })).describe('Optimal pricing strategies for each region.'),
  marketOpportunities: z.string().describe('A summary of potential new market opportunities, such as untapped regions or upcoming large-scale projects.'),
});
export type MarketForecastingOutput = z.infer<typeof MarketForecastingOutputSchema>;

export async function forecastMarket(input: MarketForecastingInput): Promise<MarketForecastingOutput> {
  return marketForecastingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'marketForecastingPrompt',
  input: {schema: MarketForecastingInputSchema},
  output: {schema: MarketForecastingOutputSchema},
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert market analyst specializing in the construction and commodities sector, with a deep understanding of the cement industry. Your task is to forecast market demand and recommend optimal pricing strategies.

  Analyze the following data:
  - Historical Sales Data: {{{historicalSalesData}}}
  - Competitor Pricing: {{{competitorPricing}}}
  - Economic Indicators: {{{economicIndicators}}}
  - Market News: {{{marketNews}}}

  Based on your comprehensive analysis, provide:
  1. A regional demand forecast for the next quarter.
  2. Specific pricing recommendations for each key region.
  3. A summary of any identified market opportunities.
  `,
});

const marketForecastingFlow = ai.defineFlow(
  {
    name: 'marketForecastingFlow',
    inputSchema: MarketForecastingInputSchema,
    outputSchema: MarketForecastingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
