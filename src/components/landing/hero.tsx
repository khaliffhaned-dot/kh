import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { Button } from "../ui/button";

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-bg");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover -z-20"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/70 -z-10" />
      <div className="text-center text-white px-4">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-widest">
          Wise Aim Revolution
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mt-4 max-w-3xl mx-auto">
          Unleash your potential. Master the art of archery with Kuala Lumpur's
          premier archery club.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="text-xl h-14 px-8 font-bold rounded-lg transform hover:scale-105 transition-transform duration-300">
            <a href="#membership">Become a Member</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
