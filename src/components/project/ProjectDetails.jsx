import React from "react";

const ProjectDetails = ({
  eyebrow = "Under the surface",
  title,
  intro,
  items = [],
}) => {
  return (
    <section className="project-details">
      <div className="case-container">

        <div className="details-intro">
          <span className="section-eyebrow reveal">
            {eyebrow}
          </span>

          <h2 className="reveal reveal-delay-1">
            {title}
          </h2>

          {intro && (
            <p className="reveal reveal-delay-2">
              {intro}
            </p>
          )}
        </div>

        <div className="details-list">
          {items.map((item, index) => (
            <article
              className="detail-row reveal"
              key={item.title}
            >
              <span className="detail-row__number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              <span className="detail-row__symbol">
                ↗
              </span>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectDetails;
