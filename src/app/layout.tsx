import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import { INTRO_SCRIPT } from "@/components/intro/introScript";
import "@/index.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const description =
  "PostPerfect — We craft digital experiences that defy convention. Web development, app development, video editing, marketing, ERP solutions, and custom software.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://postperfect.in"),
  title: {
    default: "PostPerfect — Digital Agency",
    template: "%s — PostPerfect",
  },
  description,
  icons: { icon: "/Postperfect_Logo.png" },
  openGraph: {
    type: "website",
    siteName: "PostPerfect",
    title: "PostPerfect — Digital Agency",
    description,
    images: ["/Postperfect_Logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#08101E",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      // The intro script sets data-intro before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
