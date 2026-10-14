import { ArrowUpRight } from "lucide-react";


import Footer from "../components/Footer";
import RevealText from "../components/RevealText";
import MagneticButton from "../components/MagneticButton";

export default function Contact() {
  return (
      <main className="contact-page">


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
              href="https://wa.me/27837781744"
              ariaLabel="Let's talk on WhatsApp at +27 83 778 1744"
              className="contact-main-button"
            >
              Let's talk
              <ArrowUpRight />
            </MagneticButton>
          </div>
        </section>

        <section className="contact-links">
          <a href="mailto:officcharles@gmail.com">
            <span>Email</span>
            <strong>officcharles@gmail.com</strong>
            <ArrowUpRight />
          </a>

          <a href="https://www.linkedin.com/in/charles-office-78b443293">
            <span>LinkedIn</span>
            <strong>Connect</strong>
            <ArrowUpRight />
          </a>

          <a href="https://github.com/ST10296198">
            <span>GitHub</span>
            <strong>View Code</strong>
            <ArrowUpRight />
          </a>
        </section>

        <Footer />
      </main>
  );
}
