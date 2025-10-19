"use client";

import { AboutSection } from "@/components/landing/about";
import { ContactSection } from "@/components/landing/contact";
import { GallerySection } from "@/components/landing/gallery";
import { HeroSection } from "@/components/landing/hero";
import { MembershipSection } from "@/components/landing/membership";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <HeroSection />
      <AboutSection />
      <MembershipSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
