import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, Shield } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-range");

  return (
    <section id="about" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
              Welcome to <span className="text-primary">WARAC</span>
            </h2>
            <p className="mt-4 text-gray-300">
              Wise Aim Revolution Archery Club (WARAC) is more than just a
              range; it's a community dedicated to the timeless sport of
              archery. Founded in 2020 in the heart of Kuala Lumpur, our
              mission is to provide a safe, welcoming, and professional
              environment for archers of all ages and skill levels.
            </p>
            <p className="mt-4 text-gray-300">
              Our state-of-the-art facilities, certified coaches, and vibrant
              community are here to support your journey, whether you're picking
              up a bow for the first time or training for your next competition.
            </p>
            <div className="mt-8 flex space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-bold text-white">Certified Coaches</p>
                  <p className="text-sm text-gray-400">Expert-led training</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-bold text-white">Safety First</p>
                  <p className="text-sm text-gray-400">Secure environment</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={400}
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
