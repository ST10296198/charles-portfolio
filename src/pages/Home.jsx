import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useLayoutEffect, useRef } from "react";
import { initHomeAnimations } from "../animations/homeAnimations";


import ProjectOrbit from "../components/ProjectOrbit";
import RevealText from "../components/RevealText";
import SplitText from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";
import Footer from "../components/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.22],
    ["0%", "20%"]
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.16],
    [1, 0]
  );

  const pageRef = useRef(null);

useLayoutEffect(() => {
  return initHomeAnimations(pageRef.current);
}, []);

  return (
    <main className="home"  ref={pageRef}>


      {/* =========================
          HERO
      ========================== */}

      <section className="hero">
        <motion.div
          className="hero-background-word"
          style={{ y: heroY }}
        >
          BUILD
        </motion.div>

        <motion.div
          className="hero-inner"
          style={{ opacity: heroOpacity }}
        >
          <div className="hero-meta hero-meta--left">
            <span>Independent Developer</span>
            <span>Johannesburg / South Africa</span>
          </div>

          <div className="hero-meta hero-meta--right">
            <span>Web / Software / Systems</span>
            <span>Available for selected projects</span>
          </div>

          <div className="hero-title">
            <RevealText>
              <h1>CHARLES</h1>
            </RevealText>

            <RevealText>
              <h1 className="hero-title-outline">
                BUILDS DIGITAL
              </h1>
            </RevealText>

            <RevealText>
              <h1>EXPERIENCES.</h1>
            </RevealText>
          </div>

          <div className="hero-bottom">
            <p>
              I design and build digital products that connect
              thoughtful interfaces with real engineering.
            </p>

          </div>
        </motion.div>
      </section>

      {/* =========================
          INTRO
      ========================== */}

      <section className="introduction" id="introduction">
        <div className="section-number" data-home-reveal>
          01 / INTRODUCTION
        </div>

        <div className="intro-copy">
          <RevealText>
            <p>
              I work between
              <span> design</span>,
              <span> engineering</span>
              and
              <span> architecture</span>.
            </p>
          </RevealText>

          <RevealText>
            <p className="intro-copy-muted">
              From expressive websites to complete software
              systems, I turn ideas into digital products that
              are considered from interface to database.
            </p>
          </RevealText>
        </div>
      </section>

      {/* =========================
          ROTATING WORK
      ========================== */}

      <ProjectOrbit />

      {/* =========================
          WHAT I DO
      ========================== */}

      <section className="capabilities-preview">
        <div className="section-number" data-home-reveal>
          02 / CAPABILITIES
        </div>

        <div className="capability-header">
          <div className="reveal-mask">
            <SplitText>
              NOT JUST
              <br />
              THE INTERFACE.
            </SplitText>
          </div>

          <p data-home-reveal>
            I work across the layers that turn an interface into
            an actual product.
          </p>
        </div>

        <div className="capability-list">

          <a href="/code" className="capability-row" data-home-reveal="0">
            <span className="capability-number">01</span>

            <h3>Frontend Development</h3>

            <span className="capability-description">
              React / Next.js / JavaScript / Responsive UI
            </span>

            <ArrowUpRight />
          </a>

          <a href="/code" className="capability-row" data-home-reveal="1">
            <span className="capability-number">02</span>

            <h3>Software Engineering</h3>

            <span className="capability-description">
              C# / .NET / Kotlin / Node / APIs
            </span>

            <ArrowUpRight />
          </a>

          <a href="/code" className="capability-row" data-home-reveal="2">
            <span className="capability-number">03</span>

            <h3>Data & Architecture</h3>

            <span className="capability-description">
              SQL / MongoDB / Firebase / System Design
            </span>

            <ArrowUpRight />
          </a>

          <a href="/profile" className="capability-row" data-home-reveal="3">
            <span className="capability-number">04</span>

            <h3>Project Delivery</h3>

            <span className="capability-description">
              Requirements / Architecture / Testing / Deployment
            </span>

            <ArrowUpRight />
          </a>

        </div>
      </section>

      {/* =========================
          CODE TEASER
      ========================== */}

      <section className="code-teaser">

        <div className="code-copy">

          <span className="section-number" data-home-reveal>
            03 / UNDER THE SURFACE
          </span>

          <div className="reveal-mask">
            <SplitText>
              DESIGN IS ONLY
              <br />
              HALF THE STORY.
            </SplitText>
          </div>

          <p data-home-reveal>
            Behind the visual layer are APIs, databases,
            authentication, cloud services and application
            architecture.
          </p>

          <MagneticButton
            href="/code"
            className="primary-button"
          >
            Explore the code
            <ArrowUpRight size={18} />
          </MagneticButton>

        </div>

        <div className="code-window" data-home-reveal="1">

          <div className="code-window__top">
            <div className="code-dots">
              <span />
              <span />
              <span />
            </div>

            <span>charles.js</span>
          </div>

          <pre>
            <code>
{`const charles = {
  focus: "Digital Products",

  frontend: [
    "React",
    "JavaScript",
    "Next.js"
  ],

  backend: [
    ".NET",
    "C#",
    "Node.js"
  ],

  data: [
    "SQL",
    "MongoDB",
    "Firebase"
  ],

  builds: () => {
    return "ideas → systems";
  }
};`}
            </code>
          </pre>

        </div>

      </section>

      {/* =========================
          CONTACT CTA
      ========================== */}

      <section className="home-contact">

        <span className="section-number" data-home-reveal>
          04 / NEXT
        </span>

        <RevealText>
          <h2>
            HAVE AN IDEA?
          </h2>
        </RevealText>

        <RevealText>
          <h2 className="contact-outline">
            LET'S BUILD IT.
          </h2>
        </RevealText>

        <MagneticButton
          href="/contact"
          className="contact-button"
        >
          Start a conversation
          <ArrowUpRight />
        </MagneticButton>

      </section>

      <Footer />

    </main>
  );
}
