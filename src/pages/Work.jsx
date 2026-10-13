import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import RevealText from "../components/RevealText";

import { projects } from "../data/projects";

export default function Work() {
  const [preview, setPreview] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <PageTransition>
      <main
        className="work-page"
        onMouseMove={handleMouseMove}
      >
        <Navbar />

        <section className="work-hero">
          <span className="section-number">
            01 / SELECTED WORK
          </span>

          <RevealText>
            <h1>SELECTED</h1>
          </RevealText>

          <RevealText>
            <h1 className="outline-heading">
              WORK.
            </h1>
          </RevealText>

          <p>
            A selection of websites, applications and digital
            systems built across design, development and
            architecture.
          </p>
        </section>

        <section className="work-index">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={project.path}
              className="work-row"
              onMouseEnter={() => setPreview(project)}
              onMouseLeave={() => setPreview(null)}
            >
              <span>{project.number}</span>

              <div>
                <h2>{project.title}</h2>
                <small>{project.category}</small>
              </div>

              <span className="work-discipline">
                {project.discipline}
              </span>

              <span>{project.year}</span>

              <ArrowUpRight />
            </Link>
          ))}
        </section>

        {preview && (
          <motion.div
            className="cursor-project-preview"
            animate={{
              x: mouse.x + 30,
              y: mouse.y - 120,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            exit={{ opacity: 0 }}
          >
            <img
              src={preview.image}
              alt={preview.title}
            />
          </motion.div>
        )}

        <Footer />
      </main>
    </PageTransition>
  );
}
