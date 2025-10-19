import { TrainingForm } from "@/components/training/training-form";

export default function TrainingPage() {
  return (
    <div className="container mx-auto px-6 py-32">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="font-headline text-5xl md:text-6xl font-semibold text-white">
          Adaptive Training Hub
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Craft your personalized training schedule. Enter your details below, and
          our AI coach will generate a plan tailored to your needs.
        </p>
      </div>
      <TrainingForm />
    </div>
  );
}
