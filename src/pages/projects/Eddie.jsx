import React, { useLayoutEffect, useRef } from "react";
import { initProjectAnimations } from "../../animations/projectAnimations";
import ArchitectureDiagram from "../../components/ArchitectureDiagram";

import ProjectHero from "../../components/project/ProjectHero";
import ProjectShowcase from "../../components/project/ProjectShowcase";
import ProjectDetails from "../../components/project/ProjectDetails";
import TechStory from "../../components/project/TechStory";
import NextProject from "../../components/project/NextProject";

const eddieHero = "/images/eddie/eddie-hero.webp";
const eddieHome = "/images/eddie/eddie-home.webp";
const eddieMobile = "/images/eddie/eddie-mobile.webp";
const eddieDetail = "/images/eddie/eddie-detail.webp";

const agriHero = "/images/agri/agri-hero.webp";

import "../../styles/project.css";

const architectureNodes = [
  { id: "student", label: "Student", description: "User Experience", column: 1, row: 1 },
  { id: "eddie", label: "Eddie", description: "Android Application", column: 2, row: 1 },
  { id: "firebase", label: "Firebase", description: "Authentication + Data", column: 3, row: 1 },
  { id: "ai", label: "AI", description: "Intelligent Assistance", column: 3, row: 2 },
];
const architectureConnections = [
  { id: "student-eddie", from: "student", to: "eddie", label: "Student workspace" },
  { id: "eddie-firebase", from: "eddie", to: "firebase", label: "Authentication and cloud data" },
  { id: "eddie-ai", from: "eddie", to: "ai", label: "AI assistance" },
];

const Eddie = () => {
  const pageRef = useRef(null);
  useLayoutEffect(() => initProjectAnimations(pageRef.current), []);

  return (
    <main className="project-page project-eddie" ref={pageRef}>

      <ProjectHero
        number="03 / 04"
        category="Android · AI · Education"
        title="Eddie App."
        subtitle="A smarter workspace for students."
        description="An Android-first educational application bringing study tools, organisation and AI-powered assistance into one student-focused environment."
        image={eddieHero}
        imageAlt="Eddie educational application visual identity"
        accent="green"
      />

      <ProjectShowcase
        number="01"
        eyebrow="The Product"
        title="Student tools. One environment."
        description="Eddie was designed around the daily workflow of a student, bringing frequently used academic tools together rather than scattering them across separate applications."
        image={eddieHome}
        imageAlt="Original Eddie Android application home interface"
        caption="Eddie / Application Home"
        points={[
          {
            title: "Calendar",
            text: "Academic events and important dates can be organised from within the application.",
          },
          {
            title: "Notes",
            text: "Students can capture and organise study information.",
          },
          {
            title: "Textbook",
            text: "Study material is accessible from the central student workspace.",
          },
          {
            title: "AI Assistant",
            text: "AI functionality provides students with an intelligent support layer.",
          },
          {
            title: "Quiz",
            text: "Knowledge can be reinforced through interactive assessment.",
          },
        ]}
      />

      <ProjectShowcase
        number="02"
        eyebrow="Android Experience"
        title="Built for mobile."
        description="Eddie was an Android application from the beginning. Its interface therefore prioritises mobile navigation, touch interaction and quick access to everyday student tools."
        image={eddieMobile}
        imageAlt="Eddie Android application displayed on Samsung mobile device"
        align="right"
        theme="soft"
        caption="Android / Mobile"
        points={[
          {
            title: "Touch first",
            text: "Primary functions use clear tap targets and straightforward navigation.",
          },
          {
            title: "Fast access",
            text: "Core student tools remain accessible directly from the home experience.",
          },
          {
            title: "Consistent system",
            text: "The green visual language connects navigation, actions and application identity.",
          },
        ]}
      />

      <ProjectShowcase
        sticky
        number="03"
        eyebrow="Product System"
        title="More than the screen."
        description="The interface is only the visible layer. Eddie combines authentication, cloud data, AI functionality and application state into one connected educational product."
        image={eddieDetail}
        imageAlt="Eddie Android application product system"
        theme="dark"
        caption="Android Product Ecosystem"
        points={[
          {
            title: "Authentication",
            text: "SSO and login flows create a secure entry point into the student experience.",
          },
          {
            title: "Cloud data",
            text: "Firebase supports connected application data and user-specific information.",
          },
          {
            title: "AI layer",
            text: "The assistant extends the application beyond conventional note and calendar functionality.",
          },
        ]}
      />

      <section className="architecture-section">
        <div className="case-container">

          <span className="section-eyebrow reveal">
            Application Architecture
          </span>

          <h2 className="architecture-title reveal reveal-delay-1">
            Behind the interface.
          </h2>

          <ArchitectureDiagram label="Eddie Android application architecture"
            nodes={architectureNodes} connections={architectureConnections} />

        </div>
      </section>

      <ProjectDetails
        title="A connected student ecosystem."
        items={[
          {
            title: "SSO & authentication",
            text: "Authentication was designed to give students secure and convenient access to their workspace.",
          },
          {
            title: "Notes & study management",
            text: "Students can organise academic information within the same environment used for their other study tools.",
          },
          {
            title: "AI assistance",
            text: "Artificial intelligence provides an additional support layer for learning and study workflows.",
          },
          {
            title: "Offline thinking",
            text: "The wider product architecture considered connectivity and synchronisation rather than assuming constant network availability.",
          },
          {
            title: "Application architecture",
            text: "UI, application logic, authentication and data services were considered as connected parts of the same product.",
          },
        ]}
      />

      <TechStory
        title="Product engineering behind a simple interface."
        technologies={[
          "Android",
          "Firebase",
          "Authentication / SSO",
          "AI Integration",
          "Cloud Data",
          "Application Architecture",
        ]}
      />

      <NextProject
        title="Agri-Energy Connect"
        path="/projects/agri-energy"
        image={agriHero}
      />

    </main>
  );
};

export default Eddie;
