"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollToTop from "./ScrollToTop";
import GrainOverlay from "../ui/GrainOverlay";
import IntroLoader from "../intro/IntroLoader";

// WebGL needs the browser, so the background is only rendered on the client.
const FlutedGlassBackground = dynamic(() => import("../three/FlutedGlassBackground"), {
  ssr: false,
});

const SiteShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // Lab prototypes bring their own chrome and background.
  if (pathname?.startsWith("/lab")) {
    return <SmoothScroll>{children}</SmoothScroll>;
  }

  return (
    <SmoothScroll>
      <ScrollToTop />
      {/* Fluted glass shader background — fixed, z-0 */}
      <FlutedGlassBackground />

      {/* Film grain texture — fixed, z-9999 */}
      <GrainOverlay />

      {/* First-visit particle loader that flies into the navbar logo — fixed, z-200 */}
      <IntroLoader />

      {/* All page content above the background canvas */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default SiteShell;
