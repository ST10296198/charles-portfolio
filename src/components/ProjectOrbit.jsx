import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const positions = ["top", "right", "bottom", "left"];

export default function ProjectOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (paused || focusWithin || reducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % projects.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [paused, focusWithin, reducedMotion]);

  const activeProject = projects[activeIndex];

  const getPosition = (index) => {
    const relative =
      (index - activeIndex + projects.length) % projects.length;

    return positions[relative];
  };

  const nextProject = () => {
    setActiveIndex((current) => (current + 1) % projects.length);
  };

  return (
    <section
      className="project-orbit-section"
      id="work"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => setFocusWithin(event.currentTarget.contains(event.relatedTarget))}
    >
      <div className="orbit-heading">
        <span>SELECTED</span>
        <span>WORK</span>
      </div>

      <div className="orbit-stage">
        <div className="orbit-ring orbit-ring--one" />
        <div className="orbit-ring orbit-ring--two" />

        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            position={getPosition(index)}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}

        <div className="orbit-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={reducedMotion ? false : {
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={reducedMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : {
                opacity: 0,
                y: -20,
                filter: "blur(8px)",
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="orbit-project-info"
            >
              <span className="orbit-project-number">
                {activeProject.number} / 04
              </span>

              <span className="orbit-project-discipline">
                {activeProject.discipline}
              </span>

              <h2>{activeProject.title}</h2>

              <p>{activeProject.statement}</p>

              <a
                className="orbit-view-project"
                href={activeProject.path}
              >
                Explore project
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="orbit-next"
          onClick={nextProject}
          aria-label="Next project"
        >
          <ArrowDownRight />
        </button>
      </div>

      <div className="orbit-counter">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => setActiveIndex(index)}
            className={index === activeIndex ? "active" : ""}
            aria-label={`Select ${project.title}`}
            aria-pressed={index === activeIndex}
          >
            {project.number}
          </button>
        ))}
      </div>
    </section>
  );
}
