import React from "react";

import ProjectHero from "../../components/project/ProjectHero";
import ProjectShowcase from "../../components/project/ProjectShowcase";
import ProjectDetails from "../../components/project/ProjectDetails";
import TechStory from "../../components/project/TechStory";
import NextProject from "../../components/project/NextProject";

const bccHero = "/images/bcc/bcc-hero.png";
const bccHome = "/images/bcc/bcc-home.png";
const bccMobile = "/images/bcc/bcc-mobile.png";
const bccDetail = "/images/bcc/bcc-detail.png";

const eddieHero = "/images/eddie/eddie-hero.png";

import "../../styles/project.css";

const BCC = () => {
  return (
    <main className="project-page project-bcc">

      <ProjectHero
        number="02 / 04"
        category="Commercial Web Experience"
        title="BCC."
        subtitle="Living Tomorrow, Today."
        description="A modern digital platform for Bethal Computer Centre, translating a broad technology and creative service offering into a clear commercial web experience."
        image={bccHero}
        imageAlt="BCC technology identity"
        accent="blue"
        links={[
          {
            label: "Visit live website",
            href: "https://bethalcomputercenter.netlify.app/",
          },
        ]}
      />

      <ProjectShowcase
        number="01"
        eyebrow="Commercial Experience"
        title="Complex services. Clear interface."
        description="BCC offers multiple technical and creative services. The challenge was to communicate that range without making the experience feel overloaded."
        image={bccHome}
        imageAlt="BCC website desktop interface"
        caption="BCC / Desktop Experience"
        points={[
          {
            title: "Service hierarchy",
            text: "Services are structured so users can quickly understand what BCC provides.",
          },
          {
            title: "Action-oriented UX",
            text: "Repair and service actions remain prominent throughout the interface.",
          },
          {
            title: "Trust signals",
            text: "Operational information supports credibility without dominating the page.",
          },
        ]}
      />

      <ProjectShowcase
        number="02"
        eyebrow="Mobile"
        title="The service desk in your pocket."
        description="The mobile experience preserves the same hierarchy and visual identity while prioritising immediate actions and readability."
        image={bccMobile}
        imageAlt="BCC website displayed on mobile device"
        align="right"
        theme="soft"
        caption="Mobile / Responsive"
        points={[
          {
            title: "Compact navigation",
            text: "The full navigation system transforms into a focused mobile control.",
          },
          {
            title: "Primary actions",
            text: "Booking and service discovery remain immediately accessible.",
          },
          {
            title: "Readable content",
            text: "Spacing and typography adapt instead of simply becoming smaller.",
          },
        ]}
      />

      <ProjectShowcase
        number="03"
        eyebrow="Responsive System"
        title="One platform across every device."
        description="The responsive system adapts the same service experience across laptop, tablet and mobile layouts."
        image={bccDetail}
        imageAlt="BCC laptop tablet and landscape mobile responsive presentation"
        theme="dark"
        caption="Laptop / Tablet / Mobile"
        points={[
          {
            title: "Laptop",
            text: "The complete commercial interface with maximum information visibility.",
          },
          {
            title: "Tablet",
            text: "A balanced middle state retaining both navigation and content clarity.",
          },
          {
            title: "Mobile",
            text: "A compact touch-first experience built around immediate user needs.",
          },
        ]}
      />

      <ProjectDetails
        title="Designed around real services."
        items={[
          {
            title: "Service architecture",
            text: "Different offerings are organised into understandable user journeys rather than one oversized service list.",
          },
          {
            title: "Repair journey",
            text: "Users are directed toward diagnosis and repair actions with minimal friction.",
          },
          {
            title: "Portfolio presentation",
            text: "Creative work is given its own visual environment while remaining part of the BCC ecosystem.",
          },
          {
            title: "Responsive behaviour",
            text: "Navigation, cards, typography and actions adapt according to available screen space.",
          },
        ]}
      />

      <TechStory
        title="Commercial design backed by frontend engineering."
        technologies={[
          "React",
          "CSS",
          "Responsive Design",
          "Component Architecture",
          "Netlify",
        ]}
      />

      <NextProject
        title="Eddie App"
        path="/projects/eddie"
        image={eddieHero}
      />

    </main>
  );
};

export default BCC;