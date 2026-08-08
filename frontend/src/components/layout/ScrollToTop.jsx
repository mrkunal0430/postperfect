import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SmoothScrollContext } from "./SmoothScroll";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenisRef = useContext(SmoothScrollContext);

  useEffect(() => {
    lenisRef?.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
