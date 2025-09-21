
"use client";

import { z } from "zod";
import { detectSafetyHazards, type SafetyHazardDetectionOutput } from "@/ai/flows/safety-hazard-detection";
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
import { Progress } from "../ui/progress";
import { Card, CardHeader, CardTitle } from "../ui/card";

const FormSchema = z.object({
  incidentReports: z.string().min(1, "Incident reports are required."),
  operationalContext: z.string().min(1, "Operational context is required."),
});

const defaultValues = {
  incidentReports: "Near-miss reported in VRM section: oil spill near the gearbox. Report of excessive dust near packing plant #2. Two workers reported slipping near the clinker cooler area last week, no injuries.",
  operationalContext: "Annual shutdown of Kiln #1 is ongoing. A new team of contract workers has been deployed for cleanup activities in the raw mill section.",
};

export function SafetyHazardDetection() {
  return (
    <AiOptimizer<typeof FormSchema, SafetyHazardDetectionOutput>
      title="Safety Hazard Analysis"
      description="Proactively identify potential safety risks and receive mitigation strategies to prevent accidents."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={detectSafetyHazards}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="incidentReports"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Incident Reports & Observations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter recent incident reports, near-misses, or safety observations..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  A collection of recent incident reports and safety observations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="operationalContext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Operational Context</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe any ongoing maintenance, shutdowns, or personnel changes..."
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                 <FormDescription>
                  Current context, such as maintenance or shift changes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium text-base mb-2">Overall Safety Score</h4>
                    <div className="flex items-center gap-2">
                        <Progress value={result.safetyScore} className="h-3" />
                        <span className="font-bold text-lg">{result.safetyScore}/100</span>
                    </div>
                </div>
            </div>
             <div>
                <h4 className="font-medium text-base mb-2">Identified Hazards</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result.identifiedHazards.map((item, index) => (
                        <Card key={index}>
                            <CardHeader className="p-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-base">{item.hazard}</CardTitle>
                                <Badge variant={
                                    item.riskLevel === 'Critical' || item.riskLevel === 'High' ? 'destructive' :
                                    item.riskLevel === 'Medium' ? 'default' : 'secondary'
                                } className="shrink-0">{item.riskLevel}</Badge>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">Mitigation Strategies</h4>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {result.mitigationStrategies}
            </p>
          </div>
        </div>
      )}
    />
  );
}
