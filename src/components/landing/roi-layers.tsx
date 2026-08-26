import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type Layer = {
  id: "contribution" | "risk" | "efficiency";
  name: string;
  description: string;
  features: string[];
  formula?: string;
  formulaNote?: string;
  quote?: string;
  primary: boolean;
};

const layers: Layer[] = [
  {
    id: "contribution",
    name: "Contribution",
    description: "Already in product — from Evaluation / snap_",
    features: [
      "Objectives hit: O1–O5 green vs baseline",
      "Contribution score: weighted IEF ladder (15/25/35/25)",
      "Week-on-week delta from snapshot compare",
      "Board pack used: locked PDF actually went into a meeting",
    ],
    quote:
      "We moved O3 and O4; contribution 61 → 74; three moves executed. Not: “RM X of media value.”",
    primary: true,
  },
  {
    id: "risk",
    name: "Risk Cost Avoided",
    description: "Assign only when the desk agrees the catch was real",
    features: [
      "Residue cleared before a national query",
      "East MY gap fixed before a Malaysia Day story",
      "3R holding sent once, cleanly",
      "Journalist query closed on SLA",
    ],
    formula: "Risk avoided ≈ N_caught × C_typical_incident",
    formulaNote:
      "C is the client's figure (e.g. RM 30–150k for a messy week), not a NADI rate card.",
    primary: false,
  },
  {
    id: "efficiency",
    name: "Efficiency",
    description: "Hours and line items — only what the client stops paying for",
    features: [
      "Weekly pack auto — was junior clipping + Excel",
      "Contribution pack — was an AVE report nobody trusts",
      "War room + decision log — was WhatsApp",
      "Partial replace or re-scope — was the agency monitoring line",
    ],
    formula:
      "Efficiency ROI = (H_saved × loaded cost + displaced fees) / (NADI subscription + pilot)",
    primary: false,
  },
];

export function RoiLayersSection() {
  return (
    <section id="roi" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
            Three ROI Layers
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Only the third is &ldquo;money,&rdquo; and it stays conservative.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={cn(
                "bg-secondary/80 p-8 rounded-2xl border-2 border-transparent flex flex-col hover:border-primary transition-all duration-300 backdrop-blur-sm relative",
                layer.primary && "border-primary scale-105 shadow-2xl shadow-primary/10"
              )}
            >
              {layer.primary && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full blur opacity-75 animate-pulse-slow"></div>
                    <div className="relative bg-primary text-primary-foreground px-4 py-1.5 text-sm font-bold rounded-full">
                      Primary
                    </div>
                  </div>
                </div>
              )}
              <div className="flex-grow">
                <h3 className="font-headline text-3xl font-medium text-primary">
                  {layer.name}
                </h3>
                <p className="text-gray-300 mt-1">{layer.description}</p>
                <ul className="space-y-3 text-gray-200 mt-6">
                  {layer.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {layer.formula && (
                <div className="mt-6 rounded-lg bg-background/60 border border-border p-4">
                  <code className="text-sm text-primary block">{layer.formula}</code>
                  {layer.formulaNote && (
                    <p className="text-xs text-gray-400 mt-2">{layer.formulaNote}</p>
                  )}
                </div>
              )}
              {layer.quote && (
                <div className="mt-6 rounded-lg bg-background/60 border border-border p-4">
                  <Badge variant="outline" className="mb-2 border-primary text-primary">ROI language</Badge>
                  <p className="text-sm text-gray-300 italic">{layer.quote}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
