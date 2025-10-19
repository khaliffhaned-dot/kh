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
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const contactSchema = z.object({
    name: z.string().min(1, t.validation.name),
    email: z.string().email(t.validation.email),
    message: z.string().min(10, t.validation.message),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus(t.sending);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus(t.success);
      form.reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
            {t.title}
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <Card className="bg-secondary border-border p-2">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-white">
                {t.formTitle}
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
                        <FormLabel>{t.nameLabel}</FormLabel>
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
                        <FormLabel>{t.emailLabel}</FormLabel>
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
                        <FormLabel>{t.messageLabel}</FormLabel>
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
                    {isSubmitting ? t.sending : t.submitButton}
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
            <h3 className="font-headline text-3xl text-white">{t.visitTitle}</h3>
            <p className="mt-6 text-gray-300">
              Wise Aim Revolution Archery Club
              <br />
              123 Archery Lane, Bukit Jalil,
              <br />
              57000 Kuala Lumpur, Malaysia
            </p>
            <h4 className="font-bold mt-6 text-white">{t.hoursTitle}</h4>
            <p className="text-gray-300">
              {t.hours}
            </p>
            <div className="mt-6 w-full h-64 bg-secondary rounded-2xl flex items-center justify-center">
              <p className="text-gray-400">{t.mapPlaceholder}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
