import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import PortfolioImage from "./PortfolioImage";

const physics = { stiffness: 150, damping: 24, mass: 0.8 };

export default function ProfileCard({ src, alt }) {
  const enabled = useRef(false);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(50);
  const activity = useMotionValue(0);
  const rotateX = useSpring(tiltX, physics);
  const rotateY = useSpring(tiltY, physics);
  const highlightX = useSpring(lightX, physics);
  const highlightY = useSpring(lightY, physics);
  const lighting = useSpring(activity, { stiffness: 110, damping: 22 });
  const glow = useMotionTemplate`radial-gradient(circle at ${highlightX}% ${highlightY}%, rgba(255,255,255,0.45), rgba(174,186,255,0.12) 28%, transparent 64%)`;
  const foilPosition = useMotionTemplate`${highlightX}% ${highlightY}%`;

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const configure = () => {
      enabled.current = pointer.matches && !reducedMotion.matches;
      tiltX.set(0);
      tiltY.set(0);
      lightX.set(50);
      lightY.set(50);
      activity.set(0);
      // Preference changes immediately restore a stationary card.
      rotateX.jump(0);
      rotateY.jump(0);
      highlightX.jump(50);
      highlightY.jump(50);
      lighting.jump(0);
    };
    pointer.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    configure();
    return () => {
      enabled.current = false;
      pointer.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
    };
  }, [tiltX, tiltY, lightX, lightY, activity, rotateX, rotateY, highlightX, highlightY, lighting]);

  const reset = () => {
    tiltX.set(0);
    tiltY.set(0);
    lightX.set(50);
    lightY.set(50);
    activity.set(0);
  };

  const followPointer = (event) => {
    if (!enabled.current || event.pointerType !== "mouse" || event.buttons) return reset();
    // The stationary outer frame avoids feedback from the tilted card's bounds.
    const bounds = event.currentTarget.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    tiltX.set((0.5 - y) * 20);
    tiltY.set((x - 0.5) * 20);
    lightX.set(x * 100);
    lightY.set(y * 100);
    activity.set(1);
  };

  return (
    <figure className="profile-hero__visual profile-portrait"
      onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div className="profile-portrait__card" style={{ rotateX, rotateY }}>
        <div className="profile-portrait__image">
          <PortfolioImage
            src={src}
            alt={alt}
            width="853"
            height="1280"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="profile-portrait__finish" aria-hidden="true" />
        <motion.div className="profile-portrait__foil" aria-hidden="true"
          style={{ backgroundPosition: foilPosition, opacity: lighting }} />
        <motion.div className="profile-portrait__glare" aria-hidden="true"
          style={{ backgroundImage: glow, opacity: lighting }} />
        <figcaption className="profile-portrait__caption">
          <span>PROFILE / CHARLES</span>
          <strong>Charles.</strong>
        </figcaption>
      </motion.div>
    </figure>
  );
}
