import React, { useLayoutEffect, useRef } from "react";
import { initProjectAnimations } from "../../animations/projectAnimations";

import ProjectHero from "../../components/project/ProjectHero";
import ProjectShowcase from "../../components/project/ProjectShowcase";
import ProjectDetails from "../../components/project/ProjectDetails";
import TechStory from "../../components/project/TechStory";
import NextProject from "../../components/project/NextProject";

const tciHero = "/images/tci/tci-hero.png";
const tciHome = "/images/tci/tci-home.png";
const tciMobile = "/images/tci/tci-mobile.png";
const tciDetail = "/images/tci/tci-detail.png";

const bccHero = "/images/bcc/bcc-hero.png";

import "../../styles/project.css";

const TCI = () => {
  const pageRef = useRef(null);
  useLayoutEffect(() => initProjectAnimations(pageRef.current), []);

  return (
    <main className="project-page project-tci project-editorial" ref={pageRef}>

      <ProjectHero
        number="01 / 04"
        category="Web Design · Development"
        title="Testimony of Christ."
        subtitle="Faith expressed through digital design."
        description="A modern digital experience created for Testimony of Christ International, bringing its identity, message and congregation into a responsive web experience."
        image={tciHero}
        imageAlt="Testimony of Christ International digital identity"
        accent="gold"
        links={[
          {
            label: "Visit live website",
            href: "https://tciweb.netlify.app/",
          },
        ]}
      />

      <ProjectShowcase
        sticky
        number="01"
        eyebrow="Digital Experience"
        title="A digital home built around identity."
        description="The website combines TCI's visual identity with a clear content hierarchy, expressive typography and purposeful calls to action."
        image={tciHome}
        imageAlt="TCI desktop website experience"
        caption="Desktop Experience / TCI"
        points={[
          {
            title: "Navigation",
            text: "A clear structure gives visitors direct access to the most important areas of the experience.",
          },
          {
            title: "Visual hierarchy",
            text: "Scale, typography and imagery guide attention without overwhelming the message.",
          },
          {
            title: "Brand implementation",
            text: "Gold, black and warm neutral tones extend the church identity throughout the interface.",
          },
          {
            title: "Calls to action",
            text: "Important actions remain visible while still belonging naturally to the visual system.",
          },
        ]}
      />

      <ProjectShowcase
        number="02"
        eyebrow="Mobile Experience"
        title="Designed down. Not squeezed down."
        description="The mobile experience was treated as its own composition rather than simply compressing the desktop interface."
        image={tciMobile}
        imageAlt="TCI website presented on mobile"
        align="right"
        theme="soft"
        caption="Responsive Mobile Experience"
        points={[
          {
            title: "Adaptive navigation",
            text: "Navigation simplifies naturally for smaller displays.",
          },
          {
            title: "Touch interaction",
            text: "Interactive elements maintain comfortable touch areas and visual clarity.",
          },
          {
            title: "Fluid typography",
            text: "Type scales according to available space while retaining the hierarchy of the desktop design.",
          },
        ]}
      />

      <ProjectShowcase
        number="03"
        eyebrow="Responsive System"
        title="One experience. Every screen."
        description="Desktop, tablet and mobile layouts form one responsive design system while adapting composition, scale and interaction for each device."
        image={tciDetail}
        imageAlt="TCI responsive desktop tablet and mobile presentation"
        theme="dark"
        caption="Desktop / Tablet / Mobile"
        points={[
          {
            title: "Desktop",
            text: "Large-format storytelling with full visual hierarchy and immersive imagery.",
          },
          {
            title: "Tablet",
            text: "A rebalanced composition designed around medium-width displays.",
          },
          {
            title: "Mobile",
            text: "A focused vertical experience built around accessibility and touch.",
          },
        ]}
      />

      <ProjectDetails
        title="More than a visual refresh."
        intro="The interface was designed as a complete digital experience rather than a collection of independent screens."
        items={[
          {
            title: "Responsive architecture",
            text: "Layouts restructure across breakpoints instead of relying on simple proportional scaling.",
          },
          {
            title: "Interaction design",
            text: "Hover states, navigation behaviour and transitions reinforce the visual identity.",
          },
          {
            title: "Content architecture",
            text: "Information is organised around what visitors need to understand and access quickly.",
          },
          {
            title: "Deployment",
            text: "The completed experience was prepared and deployed as a production-facing web project.",
          },
        ]}
      />

      <TechStory
        title="The technology stays behind the experience."
        technologies={[
          "HTML",
          "CSS",
          "JavaScript",
          "Responsive UI",
          "Netlify",
        ]}
      />

      <NextProject
        title="BCC"
        path="/projects/bcc"
        image={bccHero}
      />

    </main>
  );
};

export default TCI;
