"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import ScrollToTop from "./ScrollToTop";
import GrainOverlay from "../ui/GrainOverlay";

// WebGL needs the browser, so the scene is only rendered on the client.
const BackgroundScene = dynamic(() => import("../three/BackgroundScene"), {
  ssr: false,
});

const SiteShell = ({ children }: { children: ReactNode }) => {
  return (
    <SmoothScroll>
      <ScrollToTop />
      {/* 3D animated background — fixed, z-0, transparent canvas */}
      <BackgroundScene />

      {/* Film grain texture — fixed, z-9999 */}
      <GrainOverlay />

      {/* All page content above the 3D canvas */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default SiteShell;
