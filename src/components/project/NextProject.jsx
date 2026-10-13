import React from "react";
import { Link } from "react-router-dom";

const NextProject = ({
  label = "Next Project",
  title,
  path,
  image,
}) => {
  return (
    <section className="next-project">
      <Link to={path} className="next-project__link">

        <div
          className="next-project__background"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />

        <div className="next-project__overlay" />

        <div className="next-project__content">
          <span>{label}</span>

          <h2>{title}</h2>

          <div className="next-project__arrow">
            ↗
          </div>
        </div>

      </Link>
    </section>
  );
};

export default NextProject;