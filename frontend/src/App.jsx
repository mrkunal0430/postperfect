import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/layout/SmoothScroll";
import ScrollToTop from "./components/layout/ScrollToTop";
import GrainOverlay from "./components/ui/GrainOverlay";
import BackgroundScene from "./components/three/BackgroundScene";

const App = () => {
  const location = useLocation();

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
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default App;
