import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import IntroLoader from "@/components/ui/IntroLoader";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ian Kinoti — Creative Developer",
  description:
    "I craft modern web experiences for startups and creators. Building fast, creative, AI-powered digital products.",
  keywords: ["creative developer", "web developer", "Kenya", "UI/UX", "React", "Next.js"],
  authors: [{ name: "Ian Kinoti" }],
  openGraph: {
    title: "Ian Kinoti — Creative Developer",
    description: "Crafting modern web experiences for startups and creators.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
