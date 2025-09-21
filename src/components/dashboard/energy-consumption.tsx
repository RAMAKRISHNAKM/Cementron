
"use client";

import { z } from "zod";
import { predictEnergyConsumption } from "@/ai/flows/energy-consumption-prediction";
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
  utilityData: z.string().min(1, "Utility data is required."),
  logisticsData: z.string().min(1, "Logistics data is required."),
  productionSchedule: z.string().min(1, "Production schedule is required."),
  environmentalConditions: z
    .string()
    .min(1, "Environmental conditions are required."),
});

const defaultValues = {
  utilityData: "Grid draw: 28 MW (peak hours). Water consumption for cooling: 140 m3/hr.",
  logisticsData:
    "7 trucks on limestone route. Waiting time at crusher: 15 mins. Diesel consumption: 5 km/litre.",
  productionSchedule: "Planned shutdown for Mill-2 in 4 hours. Running at 98% capacity until then.",
  environmentalConditions: "Pre-monsoon season. Ambient temp: 38°C, Humidity: 75%.",
};

export function EnergyConsumption() {
  return (
    <AiOptimizer
      title="Plant Utilities & Material Handling"
      description="Predict and minimize energy consumption in utilities and optimize internal logistics flows."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={predictEnergyConsumption}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="utilityData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Utility Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter utility data..." {...field} />
                </FormControl>
                 <FormDescription>
                  Real-time data from plant utilities (e.g., electricity, water).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logisticsData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logistics Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter logistics data..." {...field} />
                </FormControl>
                 <FormDescription>
                  Data on internal logistics (e.g., material transport).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productionSchedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Production Schedule</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter production schedule..."
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  The planned production schedule for the plant.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="environmentalConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environmental Conditions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter environmental conditions..."
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  Current conditions like temperature and humidity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-base mb-1">
                Predicted Consumption (Next Hour)
              </h4>
              <p className="text-2xl font-bold">
                {result.predictedConsumption.toLocaleString()} kWh
              </p>
            </div>
            <div>
              <h4 className="font-medium text-base mb-1">Confidence Level</h4>
              <Badge variant="secondary" className="text-lg">
                {(result.confidenceLevel * 100).toFixed(0)}%
              </Badge>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">
              Optimization Recommendations
            </h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.optimizationRecommendations}
            </p>
          </div>
        </div>
      )}
    />
  );
}
