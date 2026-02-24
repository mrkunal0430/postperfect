import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/layout/SmoothScroll";
import GrainOverlay from "./components/ui/GrainOverlay";

const App = () => {
  const location = useLocation();

  return (
    <SmoothScroll>
      <GrainOverlay />
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      <Footer />
    </SmoothScroll>
  );
};

export default App;
