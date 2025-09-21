
"use client";

import { z } from "zod";
import { controlEmissions } from "@/ai/flows/emissions-control";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AiOptimizer } from "./ai-optimizer";
import { GaugeCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
    kilnTemperature: z.coerce.number().min(1, "Kiln temperature is required."),
    fuelMix: z.string().min(1, "Fuel mix is required."),
    rawMaterialComposition: z.string().min(1, "Raw material composition is required."),
    oxygenLevel: z.coerce.number().min(0, "Oxygen level is required."),
});

const defaultValues = {
  kilnTemperature: 1460,
  fuelMix: "75% Indian Coal, 25% RDF",
  rawMaterialComposition: "High-grade limestone. LSF: 97, SM: 2.4, AM: 1.6",
  oxygenLevel: 2.3,
};

function EmissionGauge({
  label,
  value,
  unit,
  max,
}: {
  label: string;
  value: number;
  unit: string;
  max: number;
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const isHigh = percentage > 80;
  const isMedium = percentage > 50 && percentage <= 80;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-28 w-28">
        <svg className="h-full w-full" viewBox="0 0 36 36">
          <path
            className="text-muted/50 stroke-current"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="4"
          />
          <path
            className={cn(
                "stroke-current",
                isHigh ? "text-destructive" : isMedium ? "text-accent" : "text-primary"
            )}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="4"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}


export function EmissionsControl() {
  return (
    <AiOptimizer
      title="Emissions Monitoring & Forecasting"
      description="Analyze operational parameters to predict and control plant emissions, ensuring environmental compliance."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={controlEmissions}
      formComponent={(form) => (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="kilnTemperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kiln Temperature (°C)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                   <FormDescription>Current temperature of the kiln.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oxygenLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oxygen Level (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                   <FormDescription>Current oxygen level in the kiln.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fuelMix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Mix</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                 <FormDescription>The current mix of fuels being used.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rawMaterialComposition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raw Material Composition</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                 <FormDescription>The chemical composition of raw materials.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center p-4 bg-muted/30 rounded-lg">
                <EmissionGauge label="Predicted NOx" value={result.predictedNOx} unit="mg/Nm³" max={800} />
                <EmissionGauge label="Predicted SOx" value={result.predictedSOx} unit="mg/Nm³" max={600} />
                <EmissionGauge label="Predicted CO₂" value={result.predictedCO2} unit="kg/t" max={1} />
            </div>
          <div>
            <h4 className="font-medium text-base mb-1">
              Optimization Recommendations
            </h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.recommendations}
            </p>
          </div>
        </div>
      )}
    />
  );
}
