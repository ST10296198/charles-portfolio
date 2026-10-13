import React from "react";

const ProjectShowcase = ({
  number,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  align = "left",
  theme = "light",
  points = [],
  caption,
}) => {
  return (
    <section
      className={`showcase-section showcase-section--${align} showcase-section--${theme}`}
    >
      <div className="case-container">

        <div className="showcase-header">

          <div className="showcase-number reveal">
            {number}
          </div>

          <div className="showcase-copy">

            {eyebrow && (
              <span className="section-eyebrow reveal">
                {eyebrow}
              </span>
            )}

            <h2 className="reveal reveal-delay-1">
              {title}
            </h2>

            <p className="reveal reveal-delay-2">
              {description}
            </p>

          </div>
        </div>

        <div className="showcase-image image-reveal">
          <img src={image} alt={imageAlt} />

          {caption && (
            <span className="showcase-caption">
              {caption}
            </span>
          )}
        </div>

        {points.length > 0 && (
          <div className="story-points">
            {points.map((point, index) => (
              <article
                className="story-point reveal"
                key={point.title}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{point.title}</h3>

                <p>{point.text}</p>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectShowcase;