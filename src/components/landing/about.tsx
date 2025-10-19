import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award, Shield } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";

export function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-range");
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section id="about" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline text-5xl md:text-6xl font-semibold text-white">
              {t.titlePrefix} <span className="text-primary">WARAC</span>
            </h2>
            <p className="mt-4 text-gray-300">
              {t.p1}
            </p>
            <p className="mt-4 text-gray-300">
              {t.p2}
            </p>
            <div className="mt-8 flex space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-bold text-white">{t.feature1Title}</p>
                  <p className="text-sm text-gray-400">{t.feature1Desc}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-bold text-white">{t.feature2Title}</p>
                  <p className="text-sm text-gray-400">{t.feature2Desc}</p>
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
