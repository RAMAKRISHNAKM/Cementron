
"use client";

import { z } from "zod";
import { maximizeAlternativeFuelUse } from "@/ai/flows/alternative-fuel-maximization";
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
import { Badge } from "@/components/ui/badge";

const FormSchema = z.object({
  plantData: z.string().min(1, "Plant data is required."),
  fuelOptions: z.string().min(1, "Fuel options are required."),
  productionGoals: z.string().min(1, "Production goals are required."),
  environmentalRegulations: z
    .string()
    .min(1, "Environmental regulations are required."),
});

const defaultValues = {
  plantData:
    "Current mix: 85% Petcoke, 15% Imported Coal. TSR: 12%. Energy consumption: 3.4 GJ/ton clinker.",
  fuelOptions:
    "Available: Rice husk (₹2500/ton), bagasse (₹2200/ton), municipal solid waste (MSW) RDF (₹1800/ton).",
  productionGoals: "Clinker output: 6000 TPD. Quality: OPC 53 Grade.",
  environmentalRegulations: "CPCB norms: NOx < 600 mg/Nm3, SO2 < 200 mg/Nm3.",
};

export function AlternativeFuels() {
  return (
    <AiOptimizer
      title="Alternative Fuel Maximization"
      description="Model fuel combinations to optimize thermal substitution rates and reduce reliance on fossil fuels."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={maximizeAlternativeFuelUse}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="plantData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plant Data</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter current plant data..." {...field} />
                </FormControl>
                <FormDescription>
                  Provide the current fuel mix, TSR, and energy consumption.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelOptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Options</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe available fuels..." {...field} />
                </FormControl>
                 <FormDescription>
                  List available alternative fuels with their cost and energy content.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productionGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Production Goals</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter production goals..." {...field} />
                </FormControl>
                 <FormDescription>
                  Specify desired clinker output and quality targets.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="environmentalRegulations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environmental Regulations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter environmental regulations..."
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  Include relevant emissions limits and regulations.
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
            <h4 className="font-medium text-base mb-1">Optimized Fuel Mix</h4>
            <p className="text-muted-foreground">{result.optimizedFuelMix}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-base mb-1">
                Thermal Substitution Rate
              </h4>
              <Badge variant="secondary" className="text-lg">
                {result.thermalSubstitutionRate}%
              </Badge>
            </div>
            <div>
              <h4 className="font-medium text-base mb-1">
                Estimated Cost Savings
              </h4>
              <Badge
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg"
              >
                ₹{result.costSavings.toLocaleString()}
              </Badge>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Predicted Emissions</h4>
            <p className="text-muted-foreground">{result.predictedEmissions}</p>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Rationale</h4>
            <p className="text-muted-foreground">{result.rationale}</p>
          </div>
        </div>
      )}
    />
  );
}
