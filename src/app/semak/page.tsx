import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import { SemakDashboard } from "@/components/semak/semak-dashboard";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  title: "Semak — PR Intelligence Dashboard",
  description:
    "Campaign performance, media & social listening, sentiment analysis and AMEC-aligned ROI reporting for PR teams.",
};

export default function SemakPage() {
  return (
    <div className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
      <SemakDashboard />
    </div>
  );
}
