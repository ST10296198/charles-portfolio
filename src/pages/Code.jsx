import { motion } from "framer-motion";


import Footer from "../components/Footer";
import RevealText from "../components/RevealText";

const groups = [
  {
    number: "01",
    name: "FRONTEND",
    items: [
      "React",
      "Next.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Responsive UI",
    ],
  },

  {
    number: "02",
    name: "BACKEND",
    items: [
      "C#",
      ".NET",
      "Node.js",
      "REST APIs",
      "Authentication",
    ],
  },

  {
    number: "03",
    name: "DATA",
    items: [
      "SQL Server",
      "MySQL",
      "MongoDB",
      "Firebase",
      "Data Modelling",
    ],
  },

  {
    number: "04",
    name: "ARCHITECTURE",
    items: [
      "System Design",
      "Cloud Services",
      "Database Architecture",
      "Deployment",
      "Technical Planning",
    ],
  },
];

export default function Code() {
  return (
      <main className="code-page">


        <section className="code-page-hero">
          <span className="section-number">
            CODE / SYSTEMS
          </span>

          <RevealText>
            <h1>I DESIGN</h1>
          </RevealText>

          <RevealText>
            <h1 className="code-outline">
              SYSTEMS.
            </h1>
          </RevealText>

          <RevealText>
            <h1>I BUILD THEM.</h1>
          </RevealText>
        </section>

        <section className="terminal-section">
          <div className="terminal-window">
            <div className="terminal-top">
              <span>portfolio / charles.js</span>
            </div>

            <motion.pre
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            >
{`const developer = {
  role: "Software Developer",

  builds: [
    "Web Experiences",
    "Applications",
    "APIs",
    "Database Systems"
  ],

  philosophy:
    "Design the interface.
     Understand the system."
};`}
            </motion.pre>
          </div>
        </section>

        <section className="technology-groups">
          {groups.map((group) => (
            <article
              className="technology-group"
              key={group.name}
            >
              <span>{group.number}</span>

              <h2>{group.name}</h2>

              <div className="technology-tags">
                {group.items.map((item) => (
                  <span key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <Footer />
      </main>
  );
}
