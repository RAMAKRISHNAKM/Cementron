
"use client";

import { z } from "zod";
import { predictRawMaterialVariability } from "@/ai/flows/raw-material-variability-prediction";
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
  sensorData: z.string().min(1, "Sensor data is required."),
});

const defaultValues = {
  sensorData:
    "Limestone from Rajasthan quarry. Moisture: 8%, Particle Size: 95µm, SiO2: 12%, Mill Power: 3600kW, Throughput: 200 TPH",
};

export function RawMaterials() {
  return (
    <AiOptimizer
      title="Raw Material & Grinding Optimization"
      description="Ingest real-time feed data to predict variability, fine-tune grinding efficiency, and minimize energy losses."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={predictRawMaterialVariability}
      formComponent={(form) => (
        <FormField
          control={form.control}
          name="sensorData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Real-time Sensor Data</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter sensor data..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide parameters like moisture, particle size, and chemical
                composition.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
          <div>
            <h4 className="font-medium text-base mb-1">Variability Prediction</h4>
            <p className="text-muted-foreground">
              {result.variabilityPrediction}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Suggested Adjustments for Grinding</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.suggestedAdjustments}
            </p>
          </div>
        </div>
      )}
    />
  );
}
