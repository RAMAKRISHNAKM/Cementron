
"use client";

import { z } from "zod";
import { forecastMarket } from "@/ai/flows/market-forecasting";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AiOptimizer } from "./ai-optimizer";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FormSchema = z.object({
  historicalSalesData: z.string().min(1, "Historical sales data is required."),
  competitorPricing: z.string().min(1, "Competitor pricing data is required."),
  economicIndicators: z.string().min(1, "Economic indicators are required."),
  marketNews: z.string().min(1, "Market news is required."),
});

const defaultValues = {
  historicalSalesData: "Last 2 years: North Region avg. 50k tons/month @ ₹4800/ton. South Region avg. 75k tons/month @ ₹5200/ton. Growth in South is 15% YoY.",
  competitorPricing: "Competitor A (North): ₹4750/ton. Competitor B (South): ₹5150/ton. New entrant C in West with aggressive pricing at ₹4600/ton.",
  economicIndicators: "National infrastructure budget increased by 20%. Real estate registrations up 12% in South region. Monsoon forecast is normal.",
  marketNews: "Government announced new highway project connecting North and West. Competitor A facing production issues at their primary plant.",
};

const TrendIcon = ({ trend }: { trend: 'Increasing' | 'Decreasing' | 'Stable' }) => {
    if (trend === 'Increasing') return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === 'Decreasing') return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
}

export function MarketForecasting() {
  return (
    <AiOptimizer
      title="Market Demand & Pricing Forecaster"
      description="Analyze market data to forecast demand, recommend pricing, and identify new opportunities."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={forecastMarket}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="historicalSalesData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Historical Sales Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter historical sales data..." {...field} />
                </FormControl>
                <FormDescription>
                  Sales volume and price data from the last 2-3 years.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="competitorPricing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Competitor Pricing</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe competitor pricing..." {...field} />
                </FormControl>
                <FormDescription>
                  Current pricing for key competitors in major regions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="economicIndicators"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Economic Indicators</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter economic indicators..." {...field} />
                </FormControl>
                <FormDescription>
                  GDP growth, infrastructure spending, and real estate trends.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="marketNews"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market News & Events</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter relevant market news..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  News on construction projects, policies, or other events.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Next-Quarter Demand Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Predicted Demand (tons)</TableHead>
                                    <TableHead>Trend</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.demandForecast.map((item) => (
                                    <TableRow key={item.region}>
                                    <TableCell className="font-medium">{item.region}</TableCell>
                                    <TableCell>{item.predictedDemand.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <TrendIcon trend={item.trend} />
                                            <span>{item.trend}</span>
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Pricing Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Region</TableHead>
                                    <TableHead>Recommended Price (₹/ton)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result.pricingRecommendations.map((item) => (
                                    <TableRow key={item.region}>
                                    <TableCell className="font-medium">{item.region}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>₹{item.recommendedPrice.toLocaleString()}</span>
                                            <span className="text-xs text-muted-foreground">{item.strategy}</span>
                                        </div>
                                    </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
          <div>
            <h4 className="font-medium text-base mb-1">Market Opportunities</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.marketOpportunities}
            </p>
          </div>
        </div>
      )}
    />
  );
}
