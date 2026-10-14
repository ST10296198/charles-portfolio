import { Link } from "react-router-dom";
import SplitText from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";
import { projects } from "../data/projects";

import Footer from "../components/Footer";


const capabilities = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    description:
      "Responsive interfaces, interactive experiences, frontend architecture and API integration.",
  },
  {
    number: "02",
    title: "SOFTWARE ENGINEERING",
    description:
      "Application architecture, backend development, authentication and data modelling.",
  },
  {
    number: "03",
    title: "SYSTEM DESIGN",
    description:
      "Database architecture, cloud services, system modelling and technical planning.",
  },
  {
    number: "04",
    title: "PROJECT DELIVERY",
    description:
      "Requirements, architecture, development, testing and deployment.",
  },
];

export default function Profile() {
  const featured = projects.filter((project) => ["tci", "eddie"].includes(project.id));
  const visual = projects.find((project) => project.id === "agri");
  return (
    <main className="profile-page">
      <section className="profile-hero" aria-label="Charles — developer, architect, builder">
        <div className="profile-hero__identity">
          <span className="section-number">PROFILE / CHARLES</span>
          <SplitText as="h1" className="profile-display">
            DEVELOPER.<br />ARCHITECT.<br />BUILDER.
          </SplitText>
          <p className="profile-hero__note">Web development / Software engineering / System architecture</p>
        </div>
        <figure className="profile-hero__visual">
          <img src={visual.image} alt={visual.title + " — selected application work"} />
          <figcaption>
            <span>SELECTED APPLICATION / {visual.number}</span>
            <Link to={visual.path}>{visual.title} ↗</Link>
          </figcaption>
        </figure>
      </section>

      <section className="profile-introduction" aria-label="About Charles">
        <span className="section-number">01 / ABOUT</span>
        <p>
          I build digital products across web development,
          software engineering and system architecture. My work
          moves from the visual interface through application
          logic, data and deployment.
        </p>
      </section>

      <section className="profile-statement" aria-label="Design and engineering">
        <span className="section-number">02 / DESIGN + ENGINEERING</span>
        <SplitText as="p">GOOD DIGITAL PRODUCTS AREN'T JUST DESIGNED.</SplitText>
        <SplitText as="p" className="profile-muted">THEY'RE ENGINEERED.</SplitText>
      </section>

      <section className="profile-capabilities" aria-labelledby="profile-capabilities-heading">
        <div className="profile-section-heading">
          <span className="section-number">03 / CAPABILITIES</span>
          <h2 id="profile-capabilities-heading">From interface<br />to infrastructure.</h2>
        </div>
        {capabilities.map((item) => (
          <article className="profile-capability" key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="profile-process" aria-labelledby="profile-process-heading">
        <div className="profile-section-heading">
          <span className="section-number">04 / PROCESS</span>
          <h2 id="profile-process-heading">The work between<br />idea and experience.</h2>
          <p>{capabilities[3].description}</p>
        </div>
        <ol className="profile-process__sequence">
          {["Requirements", "Architecture", "Development", "Testing", "Deployment"].map((step, index) => (
            <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3></li>
          ))}
        </ol>
      </section>

      <section className="profile-experience" aria-labelledby="profile-experience-heading">
        <div className="profile-section-heading">
          <span className="section-number">05 / SELECTED WORK</span>
          <h2 id="profile-experience-heading">Different contexts.<br />Connected thinking.</h2>
        </div>
        <div className="profile-experience__projects">
          {featured.map((project) => (
            <Link key={project.id} to={project.path} className={"profile-project profile-project--" + project.id}>
              <figure>
                <img src={project.image} alt={project.title} loading="lazy" />
                <figcaption><span>{project.number} / {project.discipline}</span><h3>{project.title} ↗</h3><p>{project.statement}</p></figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </section>

      <section className="profile-invitation" aria-label="Contact">
        <span className="section-number">06 / LET'S TALK</span>
        <SplitText>Design meets<br />engineering.</SplitText>
        <MagneticButton to="/contact" className="profile-invitation__link">Let's talk ↗</MagneticButton>
      </section>
      <Footer />
    </main>
  );
}
