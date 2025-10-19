"use client";

import { useLanguage } from "@/context/language-context";
import { translations } from "@/lib/translations";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-card py-12">
      <div className="container mx-auto px-6 text-center text-muted-foreground">
        <Link
          href="/"
          className="font-headline text-4xl font-bold text-white tracking-wider"
        >
          <span className="text-primary animate-pulse-slow">WAR</span><span className="text-accent">AC</span>
        </Link>
        <div className="flex justify-center space-x-6 mt-4">
          <Link href="#" className="hover:text-primary">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-primary">
            <Facebook className="w-6 h-6" />
          </Link>
          <Link href="#" className="hover:text-primary">
            <Twitter className="w-6 h-6" />
          </Link>
        </div>
        <p className="mt-6 text-sm">
          &copy; {new Date().getFullYear()} {t.copyright}
        </p>
      </div>
    </footer>
  );
}
