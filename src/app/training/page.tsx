"use client";

import { TrainingForm } from "@/components/training/training-form";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export default function TrainingPage() {
  const { language } = useLanguage();
  const t = translations[language].training;
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="font-headline text-5xl md:text-6xl font-semibold text-white">
          {t.title}
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          {t.subtitle}
        </p>
      </div>
      <TrainingForm />
    </div>
  );
}
