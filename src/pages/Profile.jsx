import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import RevealText from "../components/RevealText";

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
  return (
    <PageTransition>
      <main className="profile-page">
        <Navbar />

        <section className="profile-hero">
          <span className="section-number">
            PROFILE / CHARLES
          </span>

          <RevealText>
            <h1>DEVELOPER.</h1>
          </RevealText>

          <RevealText>
            <h1 className="profile-outline">
              ARCHITECT.
            </h1>
          </RevealText>

          <RevealText>
            <h1>BUILDER.</h1>
          </RevealText>
        </section>

        <section className="profile-introduction">
          <span>ABOUT</span>

          <p>
            I build digital products across web development,
            software engineering and system architecture. My work
            moves from the visual interface through application
            logic, data and deployment.
          </p>
        </section>

        <section className="profile-capabilities">
          {capabilities.map((item) => (
            <article
              className="profile-capability"
              key={item.number}
            >
              <span>{item.number}</span>

              <h2>{item.title}</h2>

              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <section className="profile-statement">
          <RevealText>
            <p>
              GOOD DIGITAL PRODUCTS AREN'T JUST DESIGNED.
            </p>
          </RevealText>

          <RevealText>
            <p className="profile-muted">
              THEY'RE ENGINEERED.
            </p>
          </RevealText>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
