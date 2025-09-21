
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PageHero } from "@/components/page-hero";
import { placeholderImages } from "@/lib/placeholder-images";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SupportPage() {
  const { toast } = useToast();
  const db = getFirestore(app);
  const heroImage = placeholderImages.find(p => p.id === 'page-hero-default');

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await addDoc(collection(db, "supportTickets"), {
        ...data,
        status: "new",
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Ticket Submitted",
        description: "Our support team will get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your ticket. Please try again.",
      });
    }
  };


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8">
      <PageHero title="Support" image={heroImage} />
       <div className="mx-auto w-full max-w-7xl grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Fill out the form below to submit a support ticket.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Your Email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                      </div>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Issue with Clinkerization Optimizer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Please describe your issue in detail." className="min-h-[150px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Submitting..." : "Submit Ticket"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
             <Card>
                <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                        <AccordionContent>
                        You can reset your password by clicking the "Forgot Password" link on the login page. An email will be sent to you with further instructions.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Where can I find my API key?</AccordionTrigger>
                        <AccordionContent>
                        Your API key can be found in the Settings page under the "API" section.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How does the AI Optimizer work?</AccordionTrigger>
                        <AccordionContent>
                        The AI Optimizer uses a powerful Generative AI model to analyze the data you provide and suggests optimized parameters based on pre-defined goals for efficiency, quality, and sustainability.
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-4">
                        <AccordionTrigger>Is my data secure?</AccordionTrigger>
                        <AccordionContent>
                        Yes, we take data security very seriously. All data is transmitted over SSL and stored in a secure, encrypted environment. Your operational data is only used for generating insights and is not shared.
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
