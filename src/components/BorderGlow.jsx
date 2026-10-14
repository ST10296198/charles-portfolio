import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const tracking = { stiffness: 180, damping: 28, mass: 0.6 };

export default function BorderGlow({ children, className = "" }) {
  const enabled = useRef(false);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const proximity = useMotionValue(0);
  const x = useSpring(pointerX, tracking);
  const y = useSpring(pointerY, tracking);
  const strength = useSpring(proximity, { stiffness: 140, damping: 24 });
  const glowX = useTransform(x, (value) => `${value}%`);
  const glowY = useTransform(y, (value) => `${value}%`);
  const borderOpacity = useTransform(strength, (value) => 0.28 + value * 0.72);
  const haloOpacity = useTransform(strength, (value) => 0.12 + value * 0.48);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const configure = () => {
      enabled.current = pointer.matches && !reducedMotion.matches;
      pointerX.set(50);
      pointerY.set(50);
      proximity.set(0);
      x.jump(50);
      y.jump(50);
      strength.jump(0);
    };
    pointer.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    configure();
    return () => {
      enabled.current = false;
      pointer.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
    };
  }, [pointerX, pointerY, proximity, x, y, strength]);

  const reset = () => { proximity.set(0); };
  const followPointer = (event) => {
    if (!enabled.current || event.pointerType !== "mouse") return reset();
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const localX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const localY = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
    pointerX.set(localX / rect.width * 100);
    pointerY.set(localY / rect.height * 100);
    const edgeDistance = Math.min(localX, rect.width - localX, localY, rect.height - localY);
    const edgeZone = Math.min(100, Math.min(rect.width, rect.height) * 0.25);
    proximity.set(Math.max(0, 1 - edgeDistance / edgeZone));
  };

  return (
    <motion.div className={`border-glow ${className}`}
      onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset}
      style={{ "--glow-x": glowX, "--glow-y": glowY,
        "--glow-border-opacity": borderOpacity, "--glow-halo-opacity": haloOpacity }}>
      <span className="border-glow__halo" aria-hidden="true" />
      <span className="border-glow__border" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
