import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div
        className="absolute inset-0 -z-20 bg-background"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.18), transparent 45%), radial-gradient(circle at 80% 30%, hsl(var(--accent) / 0.15), transparent 40%)",
        }}
      />
      <div className="absolute inset-0 bg-black/40 -z-10" />
      <div className="text-center text-white px-4">
        <p className="uppercase tracking-[0.3em] text-sm md:text-base text-primary font-bold">
          NADI ROI Framework
        </p>
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-widest mt-4">
          Not Media Value
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mt-6 max-w-3xl mx-auto">
          Cost avoided + contribution proven + hours returned — under AMEC
          rules you already locked.
        </p>
        <p className="text-base md:text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          If you sell AVE as NADI&rsquo;s ROI, you kill the product thesis.
          Measure what a CCO can defend upstairs.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="text-xl h-14 px-8 font-bold rounded-lg transform hover:scale-105 transition-transform duration-300">
            <a href="#roi">See the Framework</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
