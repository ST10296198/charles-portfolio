import { useLayoutEffect, useRef } from "react";
import { motion, useIsPresent, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PageTransition({ children, location }) {
  const ref = useRef(null);
  const isPresent = useIsPresent();
  const reducedMotion = useReducedMotion();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isPresent || location.hash) return;
    const target = ref.current.querySelector("main");
    if (!target) return;
    const previous = target.getAttribute("tabindex");
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    return () => {
      if (previous === null) target.removeAttribute("tabindex");
      else target.setAttribute("tabindex", previous);
    };
  }, [isPresent, location.pathname, location.hash]);

  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.("a[href]");
    if (!link || link.hasAttribute("download") ||
      (link.target && link.target !== "_self") || link.relList.contains("external")) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin ||
      (url.pathname === location.pathname && url.search === location.search)) return;
    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  };

  return (
    <motion.div
      ref={ref}
      className="page-transition"
      inert={!isPresent}
      aria-hidden={isPresent ? undefined : true}
      onClick={onClick}
      initial={reducedMotion ? false : { opacity: 0.85 }}
      animate={{ opacity: 1, transition: {
        duration: reducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1],
      } }}
      exit={{ opacity: reducedMotion ? 1 : 0.85,
        transition: { duration: reducedMotion ? 0 : 0.16, ease: [0.4, 0, 1, 1] } }}
      onAnimationComplete={() => {
        if (isPresent) window.dispatchEvent(new Event("portfolio:route-ready"));
      }}
    >
      {children}
    </motion.div>
  );
}
