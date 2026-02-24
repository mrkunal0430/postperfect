import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../utils/constants";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#04060B]/93 backdrop-blur-2xl border-b border-[#38BDF8]/10 shadow-[0_1px_32px_rgba(0,0,0,0.7)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="relative group">
              <span className="font-heading text-2xl font-bold tracking-tight text-text-primary">
                POST
                <span className="relative inline-block">
                  <span className="text-accent">P</span>
                  <motion.span
                    className="absolute -inset-1 rounded-full border-2 border-accent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ display: "inline-block" }}
                  />
                </span>
                ERFECT
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative group py-2"
                >
                  <span
                    className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                      location.pathname === link.path
                        ? "text-accent"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${
                      location.pathname === link.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
              <Link
                to="/contact"
                className="px-5 py-2.5 bg-accent text-[#060E1B] text-sm font-semibold rounded-full hover:bg-accent-light transition-colors duration-300"
              >
                Start a Project
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
                className="w-6 h-[2px] bg-text-primary block transition-transform"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[2px] bg-text-primary block"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="w-6 h-[2px] bg-text-primary block transition-transform"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={link.path}
                    className={`text-3xl font-heading font-semibold ${
                      location.pathname === link.path
                        ? "text-accent"
                        : "text-text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link
                  to="/contact"
                  className="mt-4 px-8 py-3 bg-accent text-[#060E1B] text-lg font-semibold rounded-full"
                >
                  Start a Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
