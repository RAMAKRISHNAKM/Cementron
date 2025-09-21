
'use client';

import { useState } from 'react';
import { useForm, type UseFormReturn, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface AiOptimizerProps<TFormValues extends z.ZodType, TResult> {
  title: string;
  description: string;
  formSchema: TFormValues;
  defaultValues: z.infer<TFormValues>;
  formComponent: (form: UseFormReturn<z.infer<TFormValues>>) => React.ReactNode;
  action: (values: z.infer<TFormValues>) => Promise<TResult>;
  resultComponent: (result: TResult) => React.ReactNode;
}

export function AiOptimizer<TFormValues extends z.ZodType, TResult>({
  title,
  description,
  formSchema,
  defaultValues,
  formComponent,
  action,
  resultComponent,
}: AiOptimizerProps<TFormValues, TResult>) {
  const [result, setResult] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<TFormValues>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<TFormValues>> = async (values) => {
    setIsLoading(true);
    setResult(null);
    try {
      const res = await action(values);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get optimization suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">{formComponent(form)}</CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Insights
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>
            AI-powered insights and adjustments based on your input.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {isLoading && (
            <div className="flex min-h-[300px] items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {result ? (
            resultComponent(result)
          ) : (
            !isLoading && (
              <div className="flex min-h-[300px] items-center justify-center p-8">
                <p className="text-muted-foreground">Results will be displayed here.</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
