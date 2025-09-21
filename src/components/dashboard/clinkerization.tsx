
"use client";

import { z } from "zod";
import { optimizeClinkerization } from "@/ai/flows/clinkerization-optimization";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOptimizer } from "./ai-optimizer";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";

const FormSchema = z.object({
  temperature: z.coerce.number().min(1, "Temperature is required."),
  oxygenLevel: z.coerce.number().min(1, "Oxygen level is required."),
  feedRate: z.coerce.number().min(1, "Feed rate is required."),
  kilnSpeed: z.coerce.number().min(1, "Kiln speed is required."),
  fuelType: z.string().min(1, "Fuel type is required."),
  fuelConsumption: z.coerce.number().min(1, "Fuel consumption is required."),
});

const defaultValues = {
  temperature: 1450,
  oxygenLevel: 2.5,
  feedRate: 220,
  kilnSpeed: 3.5,
  fuelType: "70% Indian Coal, 30% Biomass Pellets",
  fuelConsumption: 18,
};

export function Clinkerization() {
  return (
    <AiOptimizer
      title="Clinkerization Parameter Optimization"
      description="Continuously monitor and adjust high-temperature operations to lower energy demand and environmental impact."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={optimizeClinkerization}
      formComponent={(form) => (
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-baseline">
                    <FormLabel>Temperature</FormLabel>
                    <span className="text-sm text-muted-foreground">{field.value}°C</span>
                </div>
                <FormControl>
                  <Slider 
                    min={1300}
                    max={1600}
                    step={10}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
                </FormControl>
                <FormDescription>Adjust the current kiln temperature.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oxygenLevel"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-baseline">
                    <FormLabel>Oxygen Level</FormLabel>
                    <span className="text-sm text-muted-foreground">{field.value}%</span>
                </div>
                <FormControl>
                    <Slider 
                        min={1}
                        max={5}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                    />
                </FormControl>
                 <FormDescription>Adjust the current oxygen level in the kiln.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kilnSpeed"
            render={({ field }) => (
              <FormItem>
                 <div className="flex justify-between items-baseline">
                    <FormLabel>Kiln Speed</FormLabel>
                    <span className="text-sm text-muted-foreground">{field.value} RPM</span>
                </div>
                <FormControl>
                   <Slider 
                        min={1}
                        max={6}
                        step={0.1}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                    />
                </FormControl>
                 <FormDescription>Adjust the rotations per minute of the kiln.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <FormField
                control={form.control}
                name="feedRate"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Feed Rate (t/h)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="220" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="fuelConsumption"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Fuel Consumption (t/h)</FormLabel>
                    <FormControl>
                    <Input type="number" placeholder="20" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                <FormItem className="sm:col-span-2">
                    <FormLabel>Fuel Type</FormLabel>
                    <FormControl>
                    <Input placeholder="Coal" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div>
                <h4 className="font-medium text-base mb-1">Adjusted Kiln Speed</h4>
                <p className="text-muted-foreground text-lg font-semibold">{result.adjustedKilnSpeed} RPM</p>
             </div>
             <div>
                <h4 className="font-medium text-base mb-1">Adjusted Fuel Consumption</h4>
                <p className="text-muted-foreground text-lg font-semibold">{result.adjustedFuelConsumption} t/h</p>
             </div>
             <div>
              <h4 className="font-medium text-base mb-1">Energy Demand Reduction</h4>
              <Badge variant="secondary" className="text-lg">
                {result.predictedEnergyDemandReduction}%
              </Badge>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Environmental Impact Assessment</h4>
            <p className="text-muted-foreground">
              {result.environmentalImpactAssessment}
            </p>
          </div>
        </div>
      )}
    />
  );
}
