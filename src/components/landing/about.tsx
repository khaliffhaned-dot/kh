import { ShieldCheck, ClipboardCheck } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
              What <span className="text-primary">NADI</span> Measures
            </h2>
            <p className="mt-4 text-gray-300">
              If you sell AVE as NADI&rsquo;s ROI, you kill the product
              thesis. NADI&rsquo;s return is measured as objectives met and
              incidents avoided under AMEC evaluation — not as
              advertising-equivalent ringgit.
            </p>
            <p className="mt-4 text-gray-300">
              Client ROI has three layers: contribution (already in
              product), risk cost avoided (the real wow), and efficiency
              (hours and line items). Only the third layer is money, and it
              stays conservative.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-white">AMEC-Aligned</p>
                  <p className="text-sm text-gray-400">Barcelona 4.0 evaluation</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ClipboardCheck className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <p className="font-bold text-white">Board-Ready</p>
                  <p className="text-sm text-gray-400">Locked PDF packs leadership uses</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/60 p-8">
            <p className="font-headline text-2xl text-primary">One sentence for the board pack</p>
            <p className="mt-4 text-lg text-gray-200">
              &ldquo;NADI&rsquo;s return is measured as objectives met and
              incidents avoided under AMEC evaluation — not as
              advertising-equivalent ringgit.&rdquo;
            </p>
            <p className="mt-6 text-sm text-gray-400">
              That is consistent with Evaluation, war room, holdings, and
              trust centre. Teach buyers that sentence; then the scorecard is
              just evidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
