
"use client";

import { z } from "zod";
import { predictMaintenance } from "@/ai/flows/predictive-maintenance";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";

const FormSchema = z.object({
  machineId: z.string().min(1, "Machine ID is required."),
  vibrationLevel: z.coerce.number().min(0, "Vibration level must be positive."),
  temperature: z.coerce.number(),
  operatingHours: z.coerce.number().min(0, "Operating hours must be positive."),
  lastServiceDate: z.date({ required_error: "Last service date is required." }),
});

const defaultValues = {
  machineId: "VRM-02",
  vibrationLevel: 5.2,
  temperature: 85,
  operatingHours: 4200,
  lastServiceDate: new Date("2024-02-10"),
};

export function PredictiveMaintenance() {
  return (
    <AiOptimizer
      title="Predictive Maintenance"
      description="Analyze machinery data to predict failures and receive maintenance recommendations."
      formSchema={FormSchema}
      action={async (values) => {
        const formattedValues = {
          ...values,
          lastServiceDate: format(values.lastServiceDate, "yyyy-MM-dd"),
        };
        return await predictMaintenance(formattedValues);
      }}
      defaultValues={defaultValues}
      formComponent={(form) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="machineId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Machine ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Mill-01" {...field} />
                </FormControl>
                <FormDescription>The unique identifier for the machine.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vibrationLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vibration (mm/s)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormDescription>Current vibration level of the machine.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="temperature"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Temperature (°C)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Current temperature of the machine.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operatingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operating Hours</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Total hours since last service.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastServiceDate"
            render={({ field }) => (
              <FormItem className="col-span-1 sm:col-span-2 flex flex-col">
                <FormLabel>Last Service Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>The date of the last maintenance service.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      resultComponent={(result) => (
        <div className="space-y-6 text-sm">
          {result.maintenanceRequired && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Immediate Maintenance Required</AlertTitle>
              <AlertDescription>
                The model predicts a high probability of failure. See recommendations below.
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-base mb-1">
                Predicted Time to Failure
              </h4>
              <p className="text-2xl font-bold">
                {result.predictedFailureTime.toLocaleString()} hours
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-base mb-1">
              Maintenance Recommendations
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
