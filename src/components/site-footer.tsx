import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-card py-12">
      <div className="container mx-auto px-6 text-center text-muted-foreground">
        <Link
          href="/"
          className="font-headline text-4xl font-bold text-white tracking-wider"
        >
          <span className="text-primary animate-pulse-slow">NA</span><span className="text-accent">DI</span>
        </Link>
        <p className="mt-4 max-w-xl mx-auto text-sm italic text-gray-300">
          &ldquo;NADI&rsquo;s return is measured as objectives met and incidents
          avoided under AMEC evaluation — not as advertising-equivalent
          ringgit.&rdquo;
        </p>
        <p className="mt-6 text-sm">
          &copy; {new Date().getFullYear()} NADI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
