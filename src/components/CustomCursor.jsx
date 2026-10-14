import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const hideRef = useRef(null);
  const location = useLocation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 35 });
  const springY = useSpring(y, { stiffness: 350, damping: 35 });

  useEffect(() => {
    if (!window.PointerEvent || !window.matchMedia) return;
    const pointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hide = () => opacity.set(0);
    hideRef.current = hide;
    const onMove = (event) => {
      if (event.pointerType !== "mouse" || event.buttons || document.hidden) return hide();
      const target = event.target;
      if (target.closest?.("input, textarea, select, [contenteditable]:not([contenteditable='false'])")) return hide();
      const interactive = target.closest?.("a[href], button:not(:disabled), [role='button'], [data-cursor]");
      let label = "";
      if (interactive?.matches(".orbit-card")) label = "Select";
      else if (interactive?.matches(".architecture-node")) label = "Connect";
      else if (interactive?.matches(".next-project__link, .orbit-view-project")) label = "Open";
      else if (interactive?.matches(".magnetic-button")) label = "Explore";
      else if (interactive?.closest(".navbar")) label = "Go";
      const cursor = cursorRef.current;
      cursor.dataset.interactive = String(Boolean(interactive));
      if (labelRef.current.textContent !== label) labelRef.current.textContent = label;
      x.set(event.clientX);
      y.set(event.clientY);
      if (!opacity.get()) {
        springX.jump(event.clientX);
        springY.jump(event.clientY);
      }
      opacity.set(1);
    };
    const onOut = (event) => { if (!event.relatedTarget) hide(); };
    const onKeyDown = (event) => { if (event.key === "Tab") hide(); };
    const removePointerListeners = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", hide);
      document.removeEventListener("keydown", onKeyDown);
    };
    const configure = () => {
      removePointerListeners();
      hide();
      if (!pointer.matches || reducedMotion.matches) return;
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onOut, { passive: true });
      window.addEventListener("blur", hide);
      document.addEventListener("visibilitychange", hide);
      document.addEventListener("keydown", onKeyDown);
    };
    pointer.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    configure();
    return () => {
      removePointerListeners();
      pointer.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
      hideRef.current = null;
      hide();
      x.set(0);
      y.set(0);
      springX.jump(0);
      springY.jump(0);
    };
  }, [x, y, opacity, springX, springY]);

  useEffect(() => { hideRef.current?.(); }, [location.key]);

  return (
    <motion.div className="custom-cursor" ref={cursorRef} aria-hidden="true"
      style={{ x: springX, y: springY, opacity }}>
      <span className="custom-cursor__ring"><span ref={labelRef} /></span>
    </motion.div>
  );
}
