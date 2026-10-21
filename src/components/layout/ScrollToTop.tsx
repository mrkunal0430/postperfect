"use client";

import { useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SmoothScrollContext } from "./SmoothScroll";

const ScrollToTop = () => {
  const pathname = usePathname();
  const lenisRef = useContext(SmoothScrollContext);
  const isPopRef = useRef(false);

  // Back/forward navigation fires popstate before the pathname changes.
  useEffect(() => {
    const onPop = () => {
      isPopRef.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    // Back/forward button — leave that scroll position alone.
    if (isPopRef.current) {
      isPopRef.current = false;
      return;
    }

    const toTop = () => {
      lenisRef?.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };

    // Lenis keeps its own scroll target, so reassert across the next few
    // frames in case it animates back towards the previous offset.
    toTop();
    let frame: number;
    let count = 0;
    const reassert = () => {
      toTop();
      if (++count < 5) frame = requestAnimationFrame(reassert);
    };
    frame = requestAnimationFrame(reassert);

    return () => cancelAnimationFrame(frame);
  }, [pathname, lenisRef]);

  return null;
};

export default ScrollToTop;
