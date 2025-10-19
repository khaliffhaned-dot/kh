"use client";

import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PaymentModal } from "./payment-modal";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

type Plan = {
  id: "sharpshooter" | "bullseye" | "olympian";
  name: string;
  price: number;
  description: string;
  features: { text: string; included: boolean }[];
  popular: boolean;
};

export function MembershipSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { language } = useLanguage();
  const t = translations[language].membership;

  const plans: Plan[] = [
    {
      id: "sharpshooter",
      name: t.plans.sharpshooter.name,
      price: 150,
      description: t.plans.sharpshooter.description,
      features: [
        { text: t.plans.sharpshooter.features[0], included: true },
        { text: t.plans.sharpshooter.features[1], included: true },
        { text: t.plans.sharpshooter.features[2], included: true },
        { text: t.plans.sharpshooter.features[3], included: false },
      ],
      popular: false,
    },
    {
      id: "bullseye",
      name: t.plans.bullseye.name,
      price: 250,
      description: t.plans.bullseye.description,
      features: [
        { text: t.plans.bullseye.features[0], included: true },
        { text: t.plans.bullseye.features[1], included: true },
        { text: t.plans.bullseye.features[2], included: true },
        { text: t.plans.bullseye.features[3], included: true },
      ],
      popular: true,
    },
    {
      id: "olympian",
      name: t.plans.olympian.name,
      price: 400,
      description: t.plans.olympian.description,
      features: [
        { text: t.plans.olympian.features[0], included: true },
        { text: t.plans.olympian.features[1], included: true },
        { text: t.plans.olympian.features[2], included: true },
        { text: t.plans.olympian.features[3], included: true },
      ],
      popular: false,
    },
  ];

  const openPaymentModal = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const closePaymentModal = () => {
    setSelectedPlan(null);
  };

  return (
    <>
      <section id="membership" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
              {t.title}
            </h2>
            <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "bg-secondary p-8 rounded-2xl border-2 border-transparent flex flex-col hover:border-primary transition-all duration-300",
                  plan.popular && "border-primary scale-105 shadow-2xl shadow-primary/10"
                )}
              >
                <div className="flex-grow">
                  {plan.popular && (
                    <p className="text-sm font-bold bg-primary text-primary-foreground rounded-full px-3 py-1 inline-block mb-4">
                      {t.mostPopular}
                    </p>
                  )}
                  <h3 className="font-headline text-4xl font-medium text-primary">
                    {plan.name}
                  </h3>
                  <p className="text-gray-300 mt-1">{plan.description}</p>
                  <p className="text-5xl font-bold text-white my-6">
                    RM {plan.price}
                    <span className="text-xl text-gray-300">/{t.perMonth}</span>
                  </p>
                  <ul className="space-y-4 text-gray-200">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-red-500" />
                        )}
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => openPaymentModal(plan)}
                  className={cn(
                    "w-full mt-8 font-bold rounded-lg text-base py-6",
                    !plan.popular && "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    )}
                >
                  {t.joinPlan}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          isOpen={!!selectedPlan}
          onClose={closePaymentModal}
        />
      )}
    </>
  );
}
