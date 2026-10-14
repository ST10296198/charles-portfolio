import React, { useLayoutEffect, useRef } from "react";
import { initProjectAnimations } from "../../animations/projectAnimations";
import ArchitectureDiagram from "../../components/ArchitectureDiagram";

import ProjectHero from "../../components/project/ProjectHero";
import ProjectShowcase from "../../components/project/ProjectShowcase";
import ProjectDetails from "../../components/project/ProjectDetails";
import TechStory from "../../components/project/TechStory";
import NextProject from "../../components/project/NextProject";

const agriHero = "/images/agri/agri-hero.png";
const agriHome = "/images/agri/agri-home.png";
const agriMobile = "/images/agri/agri-mobile.png";
const agriDetail = "/images/agri/.agri-detail.png";

const tciHero = "/images/tci/tci-hero.png";

import "../../styles/project.css";

const architectureNodes = [
  { id: "farmer", label: "Farmer", description: "User Role", column: 1, row: 1 },
  { id: "employee", label: "Employee", description: "Management Role", column: 1, row: 2 },
  { id: "application", label: "ASP.NET Core MVC", description: "Application / Business Logic", column: 2, row: "1 / span 2" },
  { id: "identity", label: "Identity", description: "Authentication + Authorization", column: 3, row: 1 },
  { id: "products", label: "Products", description: "Crop & Stock Data", column: 3, row: 2 },
  { id: "sql", label: "SQL", description: "Relational Database", column: 4, row: 2 },
];
const architectureConnections = [
  { id: "farmer-application", from: "farmer", to: "application", label: "Farmer product management" },
  { id: "employee-application", from: "employee", to: "application", label: "Employee management" },
  { id: "application-identity", from: "application", to: "identity", label: "Authentication and role-based access" },
  { id: "application-products", from: "application", to: "products", label: "Product management and filtering" },
  { id: "products-sql", from: "products", to: "sql", label: "SQL Server relational records" },
];

const AgriEnergy = () => {
  const pageRef = useRef(null);
  useLayoutEffect(() => initProjectAnimations(pageRef.current), []);

  return (
    <main className="project-page project-agri" ref={pageRef}>

      <ProjectHero
        number="04 / 04"
        category="Web Application · Agriculture"
        title="Agri-Energy Connect."
        subtitle="Where farmers meet innovation."
        description="A web application designed to connect farmers, products and agricultural opportunities through a structured digital platform."
        image={agriHero}
        imageAlt="Agri-Energy Connect agricultural platform"
        accent="agri"
      />

      <ProjectShowcase
        sticky
        number="01"
        eyebrow="Product Vision"
        title="Movement in farming."
        description="Agri-Energy Connect explores how a digital platform can help farmers showcase agricultural products while giving employees the tools needed to manage and discover information."
        image={agriHome}
        imageAlt="Agri-Energy Connect main web experience"
        caption="Agriculture / Digital Platform"
        points={[
          {
            title: "Farmer experience",
            text: "Farmers can add and manage the products associated with their profile.",
          },
          {
            title: "Product discovery",
            text: "Agricultural products can be explored through structured information rather than unorganised listings.",
          },
          {
            title: "Digital connection",
            text: "The platform creates a shared environment connecting agricultural users and information.",
          },
        ]}
      />

      <ProjectShowcase
        number="02"
        eyebrow="Mobile Experience"
        title="Agriculture without the desk."
        description="The mobile presentation carries the same product experience into a format that better reflects how users may access agricultural information away from a traditional workstation."
        image={agriMobile}
        imageAlt="Agri-Energy Connect mobile experience"
        align="right"
        theme="soft"
        caption="Mobile / Responsive"
        points={[
          {
            title: "Responsive access",
            text: "Core content adapts to narrow displays while preserving hierarchy.",
          },
          {
            title: "Touch interaction",
            text: "Navigation and actions remain accessible on touch-based devices.",
          },
          {
            title: "Visual continuity",
            text: "The agricultural identity remains consistent from desktop to mobile.",
          },
        ]}
      />

      <ProjectShowcase
        number="03"
        eyebrow="Responsive Platform"
        title="One platform. Every screen."
        description="Phone, tablet and laptop layouts demonstrate a responsive interface designed to adapt without losing the character of the product."
        image={agriDetail}
        imageAlt="Agri-Energy Connect responsive mobile tablet and laptop experience"
        theme="dark"
        caption="Mobile / Tablet / Laptop"
        points={[
          {
            title: "Mobile",
            text: "Focused access for smaller screens and touch interaction.",
          },
          {
            title: "Tablet",
            text: "A balanced layout for browsing products and application content.",
          },
          {
            title: "Laptop",
            text: "The complete management and discovery environment.",
          },
        ]}
      />

      <section className="architecture-section agri-architecture">
        <div className="case-container">

          <span className="section-eyebrow reveal">
            Data Architecture
          </span>

          <h2 className="architecture-title reveal reveal-delay-1">
            From farmer to database.
          </h2>

          <ArchitectureDiagram label="Agri-Energy roles, application and data architecture"
            nodes={architectureNodes} connections={architectureConnections} columns={4} />

        </div>
      </section>

      <ProjectDetails
        title="The application behind the visuals."
        items={[
          {
            title: "Farmer product management",
            text: "Farmers can add products, view their own listings and remove products through their authenticated account.",
          },
          {
            title: "Employee management",
            text: "Employee users can register users, view farmers and inspect the products associated with each farmer.",
          },
          {
            title: "Filtering",
            text: "Products can be filtered using category and production date information.",
          },
          {
            title: "Role-based access",
            text: "Farmer and Employee roles expose different functionality according to user responsibilities.",
          },
          {
            title: "Relational data",
            text: "Products are connected to farmer records through a structured SQL Server data model.",
          },
        ]}
      />

      <TechStory
        title="A full-stack application, not just an interface."
        technologies={[
          "ASP.NET Core MVC",
          "C#",
          "SQL Server",
          "Entity Framework",
          "Identity",
          "Role-Based Access",
        ]}
      />

      <NextProject
        label="Back to the beginning"
        title="TCI"
        path="/projects/tci"
        image={tciHero}
      />

    </main>
  );
};

export default AgriEnergy;
