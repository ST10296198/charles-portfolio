import { motion } from "framer-motion";

export default function ProjectCard({
  project,
  position,
  active,
  onClick,
}) {
  return (
    <motion.button
      className={`orbit-card orbit-card--${position} ${
        active ? "orbit-card--active" : ""
      }`}
      onClick={onClick}
      animate={{
        scale: active ? 1 : 0.86,
        opacity: active ? 1 : 0.48,
        filter: active ? "blur(0px)" : "blur(4px)",
      }}
      transition={{
        duration: 0.9,
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