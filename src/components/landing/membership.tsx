"use client";

import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { PaymentModal } from "./payment-modal";

type Plan = {
  name: string;
  price: number;
  description: string;
  features: { text: string; included: boolean }[];
  popular: boolean;
};

const plans: Plan[] = [
  {
    name: "Sharpshooter",
    price: 150,
    description: "Perfect for beginners",
    features: [
      { text: "8 Hours Range Access", included: true },
      { text: "Basic Gear Rental", included: true },
      { text: "1x Group Lesson", included: true },
      { text: "Personal Locker", included: false },
    ],
    popular: false,
  },
  {
    name: "Bullseye",
    price: 250,
    description: "For the dedicated archer",
    features: [
      { text: "20 Hours Range Access", included: true },
      { text: "Advanced Gear Rental", included: true },
      { text: "4x Group Lessons", included: true },
      { text: "Personal Locker", included: true },
    ],
    popular: true,
  },
  {
    name: "Olympian",
    price: 400,
    description: "For the competitive spirit",
    features: [
      { text: "Unlimited Range Access", included: true },
      { text: "Pro-Grade Gear Rental", included: true },
      { text: "Unlimited Group Lessons", included: true },
      { text: "Personal Locker & Tuning", included: true },
    ],
    popular: false,
  },
];

export function MembershipSection() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

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
              Membership Plans
            </h2>
            <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your aim. All plans include gear rental
              and range access.
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
                      Most Popular
                    </p>
                  )}
                  <h3 className="font-headline text-4xl font-medium text-primary">
                    {plan.name}
                  </h3>
                  <p className="text-gray-300 mt-1">{plan.description}</p>
                  <p className="text-5xl font-bold text-white my-6">
                    RM {plan.price}
                    <span className="text-xl text-gray-300">/month</span>
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
                  Join Plan
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
