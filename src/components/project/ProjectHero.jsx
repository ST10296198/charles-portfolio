import React from "react";
import PortfolioImage from "../PortfolioImage";

const ProjectHero = ({
  number,
  category,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  accent = "indigo",
  links = [],
}) => {
  return (
    <section className={`case-hero case-hero--${accent}`}>
      <div className="case-container">

        <div className="case-hero__meta reveal">
          <span>{number}</span>
          <span>{category}</span>
        </div>

        <div className="case-hero__heading">
          <h1 className="reveal reveal-delay-1">{title}</h1>

          {subtitle && (
            <p className="case-hero__subtitle reveal reveal-delay-2">
              {subtitle}
            </p>
          )}
        </div>

        <div className="case-hero__bottom reveal reveal-delay-3">
          <p>{description}</p>

          {links.length > 0 && (
            <div className="case-hero__links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="case-link"
                >
                  {link.label}
                  <span>↗</span>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>

      <div className="case-hero__visual image-reveal" data-parallax="6">
        <PortfolioImage src={image} alt={imageAlt} loading="eager" fetchPriority="high" />
      </div>
    </section>
  );
};

export default ProjectHero;
