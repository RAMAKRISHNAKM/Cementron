
"use client";

import { z } from "zod";
import { qualityConsistencyAssurance } from "@/ai/flows/quality-consistency-assurance";
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
  inputData: z.string().min(1, "Input data is required."),
  productSpecifications: z
    .string()
    .min(1, "Product specifications are required."),
});

const defaultValues = {
  inputData:
    "Raw mill fineness: 92%, Kiln temp: 1455°C, Free lime: 1.1%, Cooler pressure: 5.2 mbar.",
  productSpecifications: "Targeting PPC grade cement. Target Blaine: 370 m2/kg, Target SO3: 2.7%, Fly Ash blend: 25%.",
};

export function QualityAssurance() {
  return (
    <AiOptimizer
      title="Quality Consistency Assurance"
      description="Use Generative AI to detect fluctuations in inputs and provide proactive quality corrections."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={qualityConsistencyAssurance}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="inputData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Real-time Input Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter real-time input data from sensors..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a summary of current operational data from plant sensors.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productSpecifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Specifications</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe desired product specifications..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  Define the target chemical and physical properties of the final product.
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
            <h4 className="font-medium text-base mb-1">Quality Assessment</h4>
            <p className="text-muted-foreground">
              {result.qualityAssessment}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Recommended Corrections</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.recommendedCorrections}
            </p>
          </div>
        </div>
      )}
    />
  );
}
