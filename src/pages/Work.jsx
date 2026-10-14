import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";


import Footer from "../components/Footer";
import RevealText from "../components/RevealText";

import { projects } from "../data/projects";

export default function Work() {
  return (
      <main
        className="work-page"
      >


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
            >
              <span>{project.number}</span>
              <div className="work-row__visual">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>

              <div>
                <h2>{project.title}</h2>
                <small>{project.category}</small>
                <p className="work-row__description">{project.statement}</p>
              </div>

              <span className="work-discipline">
                {project.discipline}
              </span>

              <span>{project.year}</span>

              <ArrowUpRight />
            </Link>
          ))}
        </section>


        <Footer />
      </main>
  );
}
