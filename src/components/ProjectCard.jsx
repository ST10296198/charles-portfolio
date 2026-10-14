import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ProjectCard({
  project,
  position,
  active,
  onClick,
}) {
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <motion.button
      className={`orbit-card orbit-card--${position} ${
        active ? "orbit-card--active" : ""
      }`}
      onClick={onClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label={`Select ${project.title}`}
      aria-pressed={active}
      animate={{
        scale: active ? 1 : 0.86,
        opacity: active || focused ? 1 : 0.48,
        filter: active || focused || reducedMotion ? "blur(0px)" : "blur(4px)",
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="orbit-card__image">
        <img src={project.image} alt={project.title} />
      </div>

      <span className="orbit-card__label">
        {project.number} / {project.shortTitle}
      </span>
    </motion.button>
  );
}
