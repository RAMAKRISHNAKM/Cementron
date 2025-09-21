
"use client";

import { z } from "zod";
import { optimizeCementMix } from "@/ai/flows/cement-mix-design";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

const FormSchema = z.object({
  availableMaterials: z.string().min(1, "Available materials data is required."),
  performanceTargets: z.string().min(1, "Performance targets are required."),
  productionConstraints: z.string().min(1, "Production constraints are required."),
});

const defaultValues = {
  availableMaterials: `[
  {"name": "Limestone", "cost": 150, "composition": {"CaO": 52, "SiO2": 4, "Al2O3": 1.5, "Fe2O3": 0.5}},
  {"name": "Clay", "cost": 80, "composition": {"CaO": 5, "SiO2": 58, "Al2O3": 18, "Fe2O3": 8}},
  {"name": "Fly Ash (Class F)", "cost": 50, "composition": {"SiO2": 55, "Al2O3": 25, "Fe2O3": 10}},
  {"name": "Gypsum", "cost": 200, "composition": {"CaO": 32, "SO3": 46}}
]`,
  performanceTargets: "OPC 53 Grade. Target 28-day compressive strength > 53 MPa. Initial setting time > 30 mins, final setting time < 600 mins.",
  productionConstraints: "Maximum Fly Ash content cannot exceed 25% by mass. Grinding mill has a capacity of 250 TPH.",
};

export function CementMixDesign() {

  const chartConfig = {
    percentage: {
      label: "Percentage",
    },
    Limestone: {
      label: "Limestone",
      color: "hsl(var(--chart-1))",
    },
    Clay: {
      label: "Clay",
      color: "hsl(var(--chart-2))",
    },
    "Fly Ash (Class F)": {
      label: "Fly Ash (Class F)",
      color: "hsl(var(--chart-3))",
    },
    Gypsum: {
        label: "Gypsum",
        color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig

  return (
    <AiOptimizer
      title="Cement Mix Design Optimizer"
      description="Design the most cost-effective cement mix that meets performance targets based on available raw materials."
      formSchema={FormSchema}
      defaultValues={defaultValues}
      action={optimizeCementMix}
      formComponent={(form) => (
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="availableMaterials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Raw Materials (JSON)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter material data as JSON..." {...field} rows={8} />
                </FormControl>
                 <FormDescription>
                  JSON data of materials with composition and cost.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="performanceTargets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Performance Targets</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe performance targets..." {...field} />
                </FormControl>
                 <FormDescription>
                  Desired final product characteristics (e.g., strength, setting time).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productionConstraints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Production Constraints</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter production constraints..." {...field} />
                </FormControl>
                 <FormDescription>
                  Any equipment limitations or regulatory constraints.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-base mb-2">
                Recommended Mix Proportions
              </h4>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead className="text-right">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.recommendedMix.map((item) => (
                    <TableRow key={item.material}>
                      <TableCell className="font-medium">{item.material}</TableCell>
                      <TableCell className="text-right">{item.percentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-4">
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full aspect-auto">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="material" hideLabel />} />
                            <Pie data={result.recommendedMix} dataKey="percentage" nameKey="material" innerRadius="60%">
                                {result.recommendedMix.map((entry) => (
                                    <Cell key={`cell-${entry.material}`} fill={`var(--color-${entry.material})`} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h4 className="font-medium text-base mb-1">
                Estimated Cost per Ton
                </h4>
                <Badge
                variant="default"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg"
                >
                ₹{result.estimatedCost.toLocaleString()}
                </Badge>
            </div>
            <div>
                <h4 className="font-medium text-base mb-1">Predicted Performance</h4>
                <p className="text-muted-foreground">{result.predictedPerformance}</p>
            </div>
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
