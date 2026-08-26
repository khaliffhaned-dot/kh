import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const scorecard = [
  { metric: "Weekly Evaluation opened by lead", target: "≥ 80% of weeks" },
  { metric: "Locked board PDF used once", target: "≥ 1" },
  { metric: "Residue / East MY / 3R catches client confirms", target: "≥ 1 material" },
  { metric: "Objectives moved (any O)", target: "≥ 2" },
  { metric: "Hours/week monitoring labour", target: "−30% or more" },
  { metric: "AVE requests fulfilled by NADI", target: "0" },
];

const doNotUse = [
  {
    metric: "AVE / EMV / “PR value RM”",
    reason: "Barcelona 4.0; contradicts NADI",
  },
  {
    metric: "Impressions as ROI",
    reason: "Output, not outcome",
  },
  {
    metric: "“AI accuracy %” alone",
    reason: "Not a business result",
  },
  {
    metric: "Sentiment up = RM sales",
    reason: "Only if client has a closed attribution model",
  },
];

export function ScorecardSection() {
  return (
    <section id="scorecard" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
            Pilot Scorecard
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            8–12 weeks. Agree this on day one.
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-secondary/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-white">Metric</TableHead>
                <TableHead className="text-white text-right">Target</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scorecard.map((row) => (
                <TableRow key={row.metric} className="border-border">
                  <TableCell className="text-gray-200">{row.metric}</TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {row.target}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="max-w-2xl mx-auto mt-8 text-center text-gray-300 italic">
          &ldquo;Subscription RM X. We avoided one residue escalation (est.
          RM Y on your scale), cut Z hours/week, and produced N contribution
          packs leadership actually used.&rdquo;
        </p>

        <div className="mt-20 text-center mb-12">
          <h3 className="font-headline text-3xl md:text-4xl font-semibold text-white">
            What Not to Use
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {doNotUse.map((item) => (
            <div
              key={item.metric}
              className="flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-5"
            >
              <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">{item.metric}</p>
                <p className="text-sm text-gray-400 mt-1">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
