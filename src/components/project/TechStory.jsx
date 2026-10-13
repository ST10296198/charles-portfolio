import React from "react";

const TechStory = ({
  title = "Built with purpose.",
  technologies = [],
}) => {
  return (
    <section className="tech-story">
      <div className="case-container">

        <div className="tech-story__heading">
          <span className="section-eyebrow reveal">
            Technology
          </span>

          <h2 className="reveal reveal-delay-1">
            {title}
          </h2>
        </div>

        <div className="tech-story__list">
          {technologies.map((technology, index) => (
            <div
              className="tech-story__item reveal"
              key={technology}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{technology}</h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStory;