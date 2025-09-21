
"use client";

import { z } from "zod";
import { crossProcessOptimization } from "@/ai/flows/cross-process-optimization";
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

const FormSchema = z.object({
  rawMaterialData: z.string().min(1, "Raw material data is required."),
  clinkerData: z.string().min(1, "Clinker data is required."),
  utilitiesData: z.string().min(1, "Utilities data is required."),
  optimizationGoals: z.string().min(1, "Optimization goals are required."),
});

const defaultValues = {
  rawMaterialData:
    "Limestone feed rate: 250 t/h, Moisture: 5%, Fineness: 88% passing 90 micron sieve.",
  clinkerData:
    "Kiln production: 210 t/h, Free lime: 1.2%, LSF: 98, C3S: 62%.",
  utilitiesData: "Total plant power draw: 25 MW, Cooler fan power: 1.5 MW.",
  optimizationGoals: "Reduce specific energy consumption by 5%, reduce CO2 footprint by 3%, and increase usage of agricultural waste as fuel.",
};

export function CrossProcess() {
  return (
    <AiOptimizer
      title="Cross-Process Optimization"
      description="Fuse siloed data streams into a unified AI layer for holistic decision-making across the plant."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={crossProcessOptimization}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="rawMaterialData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw Material Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter raw material data..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Real-time data from raw material feed sensors.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clinkerData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clinker Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter clinker data..." {...field} />
                </FormControl>
                 <FormDescription>
                  Real-time data from clinker production sensors.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="utilitiesData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Utilities Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter utilities data..." {...field} />
                </FormControl>
                 <FormDescription>
                  Real-time data from plant utilities sensors.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="optimizationGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Optimization Goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe optimization goals..."
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  Specific goals, e.g., reduce energy, improve quality.
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
            <h4 className="font-medium text-base mb-1">AI-Driven Insights</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">{result.insights}</p>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Actionable Recommendations</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.recommendations}
            </p>
          </div>
        </div>
      )}
    />
  );
}
