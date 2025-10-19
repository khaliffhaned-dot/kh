import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-card py-12">
      <div className="container mx-auto px-6 text-center text-muted-foreground">
        <Link
          href="/"
          className="font-headline text-4xl font-bold text-white tracking-wider"
        >
          WAR<span className="text-primary">AC</span>
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
          &copy; {new Date().getFullYear()} Wise Aim Revolution Archery Club. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
