import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SplitText from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";
import { projects } from "../data/projects";

export default function Work() {
  return (
    <main className="work-page">
      <section className="work-hero" aria-labelledby="work-title">
        <span className="work-eyebrow">01 / SELECTED WORK</span>
        <div className="work-title" id="work-title">
          <svg className="work-title__star" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M50 0 58 35 85 15 65 42 100 50 65 58 85 85 58 65 50 100 42 65 15 85 35 58 0 50 35 42 15 15 42 35Z" />
          </svg>
          <SplitText as="h1">Work.</SplitText>
          <svg className="work-title__underline" viewBox="0 0 400 60" aria-hidden="true">
            <path d="M12 32 Q180 3 385 22 M40 45 Q210 22 355 35" />
          </svg>
        </div>
        <p>A selection of websites, applications and digital systems built across design, development and architecture.</p>
      </section>
      <section className="work-index" aria-label="Selected project case studies">
        {projects.map((project, index) => (
          <Link key={project.id} to={project.path}
            className={`work-card${index >= 2 ? " work-card--wide" : ""}`}
            aria-labelledby={`work-${project.id}-title`}>
            <div className="work-card__visual">
              <img src={project.image} alt={`${project.title} project preview`}
                loading={index < 2 ? "eager" : "lazy"} decoding="async" />
            </div>
            <div className="work-card__top">
              <span>{project.number} / {project.year}</span>
              <span className="work-card__category">{project.category}</span>
            </div>
            <div className="work-card__bottom">
              <span className="work-card__discipline">{project.discipline}</span>
              <h2 id={`work-${project.id}-title`}>{project.title}</h2>
              <p>{project.statement}</p>
              <span className="work-card__action">Explore project <ArrowUpRight size={18} aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </section>
      <section className="work-contact" aria-labelledby="work-contact-title">
        <h2 id="work-contact-title">Let’s work together.</h2>
        <MagneticButton to="/contact" className="work-contact__link">
          Let’s talk <ArrowUpRight size={22} aria-hidden="true" />
        </MagneticButton>
      </section>
      <Footer />
    </main>
  );
}
