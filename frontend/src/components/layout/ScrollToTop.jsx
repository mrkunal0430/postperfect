import { useContext, useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { SmoothScrollContext } from "./SmoothScroll";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const lenisRef = useContext(SmoothScrollContext);

  // Let us drive the scroll position instead of the browser restoring the
  // previous offset once a lazy page finishes mounting.
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    // POP is the back/forward button — leave that scroll position alone.
    if (navigationType === "POP") return;

    const toTop = () => {
      lenisRef?.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };

    // Pages are lazy-loaded, so at this point the Suspense fallback may still
    // be mounted and the document too short to scroll. Reassert across the
    // next few frames, once the real page has grown the document.
    toTop();
    let frame;
    let count = 0;
    const reassert = () => {
      toTop();
      if (++count < 5) frame = requestAnimationFrame(reassert);
    };
    frame = requestAnimationFrame(reassert);

    return () => cancelAnimationFrame(frame);
  }, [pathname, navigationType, lenisRef]);

  return null;
};

export default ScrollToTop;
