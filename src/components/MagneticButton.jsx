import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const MagneticLink = motion.create(Link);

export default function MagneticButton({
  children,
  href = "#",
  to,
  ariaLabel,
  className = "",
}) {
  const ref = useRef(null);
  const enabled = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 16,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 16,
  });

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const configure = () => {
      enabled.current = pointer.matches && !reducedMotion.matches;
      x.set(0);
      y.set(0);
      springX.jump(0);
      springY.jump(0);
    };
    pointer.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    configure();
    return () => {
      pointer.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
      enabled.current = false;
    };
  }, [x, y, springX, springY]);

  const handleMove = (event) => {
    if (!enabled.current || event.pointerType !== "mouse" || ref.current.matches(":focus-visible")) return;
    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(Math.max(-8, Math.min(8, (event.clientX - centerX) * 0.22)));
    y.set(Math.max(-8, Math.min(8, (event.clientY - centerY) * 0.22)));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const Tag = to ? MagneticLink : motion.a;

  return (
    <Tag
      ref={ref}
      href={to ? undefined : href}
      to={to}
      aria-label={ariaLabel}
      className={`magnetic-button ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onFocus={() => { reset(); springX.jump(0); springY.jump(0); }}
      onBlur={reset}
    >
      {children}
    </Tag>
  );
}
