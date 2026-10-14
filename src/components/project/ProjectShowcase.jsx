import React, { useLayoutEffect, useRef } from "react";
import SplitText from "../SplitText";

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
  sticky = false,
}) => {
  const sectionRef = useRef(null);
  const stickyEnabled = sticky && points.length > 1;

  useLayoutEffect(() => {
    if (!stickyEnabled) return;
    const visual = sectionRef.current.querySelector(".showcase-visual");
    // Never force an oversized image into the viewport or crop it to make it stick.
    const measure = () => {
      const height = visual.getBoundingClientRect().height;
      visual.dataset.stickyFit = String(height > 0 && height + 144 <= window.innerHeight);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(visual);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      delete visual.dataset.stickyFit;
    };
  }, [stickyEnabled]);

  return (
    <section
      ref={sectionRef}
      className={`showcase-section showcase-section--${align} showcase-section--${theme}${stickyEnabled ? " showcase-section--sticky" : ""}`}
    >
      <div className="case-container">
        <div className="showcase-body">
          <div className="showcase-visual">
            <div className="showcase-image image-reveal" data-parallax="8">
              <img src={image} alt={imageAlt} />
            </div>
            {caption && <p className="showcase-caption">{caption}</p>}
          </div>
          <div className="showcase-narrative">
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

            {stickyEnabled ? (
              <SplitText>{title}</SplitText>
            ) : (
              <h2 className="reveal reveal-delay-1">{title}</h2>
            )}

            <p className="reveal reveal-delay-2">
              {description}
            </p>

          </div>
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
        </div>

      </div>
    </section>
  );
};

export default ProjectShowcase;
