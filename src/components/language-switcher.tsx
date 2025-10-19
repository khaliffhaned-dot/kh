"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "my" : "en");
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className="text-gray-200 hover:text-primary"
    >
      {language === "en" ? "BM" : "EN"}
    </Button>
  );
}
