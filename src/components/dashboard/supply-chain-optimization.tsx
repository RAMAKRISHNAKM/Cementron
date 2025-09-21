
"use client";

import { z } from "zod";
import { optimizeSupplyChain } from "@/ai/flows/supply-chain-optimization";
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
import { Badge } from "../ui/badge";

const FormSchema = z.object({
  inboundLogistics: z.string().min(1, "Inbound logistics data is required."),
  outboundLogistics: z.string().min(1, "Outbound logistics data is required."),
  inventoryLevels: z.string().min(1, "Inventory levels data is required."),
  demandForecast: z.string().min(1, "Demand forecast is required."),
});

const defaultValues = {
  inboundLogistics: "Limestone from local quarry (20km, ₹150/ton freight). Coal from Indonesia (sea freight, $12/ton).",
  outboundLogistics: "Primary markets: Delhi (500km, ₹1200/ton), Mumbai (1200km, ₹2200/ton). Average truck capacity: 30 tons.",
  inventoryLevels: "Clinker: 50,000 tons. OPC Cement: 15,000 tons. PPC Cement: 25,000 tons. Coal: 30,000 tons.",
  demandForecast: "Next quarter demand expected to rise by 15% in the Delhi region due to new infrastructure projects.",
};

export function SupplyChainOptimization() {
  return (
    <AiOptimizer
      title="Supply Chain Optimization"
      description="Analyze logistics data to find the most cost-effective sourcing and distribution strategies."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={optimizeSupplyChain}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="inboundLogistics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inbound Logistics</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter inbound logistics data..." {...field} />
                </FormControl>
                <FormDescription>
                  Data on inbound raw material logistics, suppliers, and costs.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="outboundLogistics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Outbound Logistics</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter outbound logistics data..." {...field} />
                </FormControl>
                <FormDescription>
                  Data on outbound product distribution, markets, and freight costs.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inventoryLevels"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inventory Levels</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter current inventory levels..." {...field} />
                </FormControl>
                <FormDescription>
                  Current inventory for raw materials and finished products.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="demandForecast"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demand Forecast</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter demand forecast..." {...field} />
                </FormControl>
                <FormDescription>
                  Market demand forecast for the next quarter.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
           <div>
              <h4 className="font-medium text-base mb-1">
                Estimated Monthly Cost Savings
              </h4>
              <Badge
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg"
              >
                ₹{result.estimatedCostSavings.toLocaleString()}
              </Badge>
            </div>
          <div>
            <h4 className="font-medium text-base mb-1">Sourcing Recommendations</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">{result.sourcingRecommendations}</p>
          </div>
           <div>
            <h4 className="font-medium text-base mb-1">Distribution Strategy</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">{result.distributionStrategy}</p>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Inventory Adjustments</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.inventoryAdjustments}
            </p>
          </div>
        </div>
      )}
    />
  );
}
