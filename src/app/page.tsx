import { AboutSection } from "@/components/landing/about";
import { ContactSection } from "@/components/landing/contact";
import { HeroSection } from "@/components/landing/hero";
import { RoiLayersSection } from "@/components/landing/roi-layers";
import { ScorecardSection } from "@/components/landing/scorecard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <HeroSection />
      <AboutSection />
      <RoiLayersSection />
      <ScorecardSection />
      <ContactSection />
    </div>
  );
}
