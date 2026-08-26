"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#roi", label: "ROI Framework" },
  { href: "#scorecard", label: "Scorecard" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    if (isHomePage && href.startsWith("#")) {
      return (
        <a
          href={href}
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-lg text-gray-200 hover:text-primary transition-colors duration-300"
        >
          {label}
        </a>
      );
    }
    if (!href.startsWith("#")) {
      return (
        <Link
          href={href}
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-lg text-gray-200 hover:text-primary transition-colors duration-300"
        >
          {label}
        </Link>
      );
    }
    return null;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-background/50 border-b border-white/10 shadow-lg backdrop-blur-lg",
        isScrolled ? "py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-headline text-4xl font-bold text-white tracking-wider">
            <span className="text-primary animate-pulse-slow">NA</span><span className="text-accent">DI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button asChild className="font-bold rounded-lg transform hover:scale-105 transition-transform duration-300 text-sm">
                <a href="#contact">Talk to Us</a>
            </Button>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-l-border">
                <div className="flex flex-col space-y-6 pt-16 items-center">
                    {navLinks.map(link => (
                        <NavLink key={link.href} {...link} />
                    ))}
                     <Button asChild className="font-bold rounded-lg w-full text-center mt-2">
                        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Talk to Us</a>
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
