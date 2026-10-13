import { ArrowUpRight } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import RevealText from "../components/RevealText";
import MagneticButton from "../components/MagneticButton";

export default function Contact() {
  return (
    <PageTransition>
      <main className="contact-page">
        <Navbar />

        <section className="contact-hero">
          <span className="section-number">
            CONTACT / START SOMETHING
          </span>

          <RevealText>
            <h1>HAVE AN</h1>
          </RevealText>

          <RevealText>
            <h1 className="contact-page-outline">
              IDEA?
            </h1>
          </RevealText>

          <div className="contact-bottom">
            <p>
              Websites, applications, digital products or
              technical collaboration.
            </p>

            <MagneticButton
              href="mailto:YOUR-EMAIL-HERE"
              className="contact-main-button"
            >
              Let's talk
              <ArrowUpRight />
            </MagneticButton>
          </div>
        </section>

        <section className="contact-links">
          <a href="#">
            <span>Email</span>
            <strong>YOUR EMAIL</strong>
            <ArrowUpRight />
          </a>

          <a href="#">
            <span>LinkedIn</span>
            <strong>Connect</strong>
            <ArrowUpRight />
          </a>

          <a href="#">
            <span>GitHub</span>
            <strong>View Code</strong>
            <ArrowUpRight />
          </a>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}