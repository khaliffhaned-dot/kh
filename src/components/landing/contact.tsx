"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const sellerMetrics = [
  { metric: "Paid pilots → conversion", meaning: "Product-market fit" },
  { metric: "Renewal / expansion Desk → Group", meaning: "Sticky job-to-be-done" },
  { metric: "Time-to-first-wow in demo", meaning: "Sales efficiency" },
  { metric: "Support hours per seat", meaning: "Margin" },
  { metric: "CAC vs first-year ACV", meaning: "Whether the wedge works" },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus("Sending...");
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("Your message has been sent successfully!");
      form.reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
            Talk to NADI
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Want the scorecard applied to your desk? Send us a message.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-secondary border-border p-2">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-white">
                Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
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
                        <FormLabel>What are you measuring today?</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full font-bold">
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
              {submitStatus && (
                <p className="mt-4 text-center text-green-400">
                  {submitStatus}
                </p>
              )}
            </CardContent>
          </Card>
          <div className="text-gray-200">
            <h3 className="font-headline text-3xl text-white">NADI&rsquo;s Own ROI</h3>
            <p className="mt-4 text-gray-400 text-sm">
              Separate from client ROI — how we measure ourselves as the
              company selling this.
            </p>
            <ul className="mt-6 space-y-4">
              {sellerMetrics.map((row) => (
                <li key={row.metric} className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                  <span className="text-gray-200">{row.metric}</span>
                  <span className="text-primary text-sm font-bold text-right">{row.meaning}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-300 italic">
              Early: one paid pilot that renews beats ten free demos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
